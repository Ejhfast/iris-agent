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
    title = "run liwc analysis on {documents}"
    examples = [ "liwc {documents}" ]
    argument_types = {
        "documents": t.Array("Where is the collection of documents?"),
        "top_n": t.Int("How many categories would you like to see?")
    }
    def command(self, documents, top_n):
        import numpy as np
        data = np.array([order_liwc(analyze(doc, normalize=True), liwc_keys) for doc in documents])
        liwc_types = ["Number" for _ in order_liwc.s_keys]
        return top_n, iris_objects.IrisDataframe(column_names=order_liwc.s_keys, column_types=liwc_types, data=data)
    def explanation(self, result):
        top_n = result[0]
        result = result[1]
        import numpy as np
        data = result.to_matrix()
        cat_hash = {}
        for i,name in enumerate(result.column_names):
            score = np.mean(data[:,i])
            cat_hash[name] = score
        out_text = []
        for name, score in sorted(cat_hash.items(), key=lambda x: x[1], reverse=True)[:top_n]:
            out_text.append([name, score])
        return ["Here are the top 10 categories:"] + [np.array(out_text)]

liwcAnalysis = LiwcAnalysis()
