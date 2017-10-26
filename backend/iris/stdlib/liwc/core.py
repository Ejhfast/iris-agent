from ... import IrisCommand
from ... import state_types as t
from ... import state_machine as sm
from ... import util as util
from ... import iris_objects

import dill
from collections import defaultdict

liwc_path = "/".join(__file__.split("/")[:-1])

data = dill.load(open(liwc_path+"/liwc_data/liwc-data.pkl","rb"))

cat2word = data["cat2word"]
word2cat = data["word2cat"]

liwc_keys = sorted(list(cat2word.keys()))

def order_liwc(d,keys=None):
  if not keys:
    keys = d.keys()
  order_liwc.s_keys = sorted(keys)
  return [d[k] for k in order_liwc.s_keys]

def analyze(doc,normalize=False,lex=word2cat,keys=liwc_keys):
  cats = defaultdict(float)
  words = 0.0
  for w in doc.lower().split():
    for c in lex[w]:
      cats[c] += 1.0
    words += 1.0
  if normalize:
    for k in keys:
      cats[k] = cats[k] / words
  return cats

class LiwcAnalysis(IrisCommand):
    title = "run liwc analysis on {dataframe}"
    examples = [ "liwc {dataframe}" ]
    argument_types = {
        "dataframe": t.Dataframe("What dataframe would you like to analyze?"),
        "selector": t.DataframeSelector("What column would you like to analyze?", dataframe="dataframe"),
        "aggregate_scores": t.YesNo(question="Aggregate counts?", yes="aggregate", no="documents")
    }
    def command(self, dataframe, selector, aggregate_scores):
        documents = selector.to_matrix().flatten()
        import numpy as np
        to_df = []
        if aggregate_scores == "aggregate":
            out_dict = analyze(documents.tolist(), normalize=True)
            for k,v in sorted(out_dict.items(), key=lambda x: x[1], reverse=True):
                to_df.append([k,v])
            return iris_objects.IrisDataframe(column_names=["category", "normalized_count"], column_types=["String", "Number"], data=to_df)
        else:
            out_scores = [order_liwc(analyze(d, normalize=True)) for d in documents.tolist()]
            return iris_objects.IrisDataframe(column_names=order_liwc.s_keys, data=out_scores)
        # import numpy as np
        # data = np.array([order_liwc(analyze(doc, normalize=True), liwc_keys) for doc in documents])
        # liwc_types = ["Number" for _ in order_liwc.s_keys]
        # return top_n, iris_objects.IrisDataframe(column_names=order_liwc.s_keys, column_types=liwc_types, data=data)

liwcAnalysis = LiwcAnalysis()
