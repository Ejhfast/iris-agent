from .. import IrisCommand
from .. import state_types as t
from .. import state_machine as sm
from .. import util as util
from .. import iris_objects

class GenerateCategory(IrisCommand):
    title = "generate empath category"
    examples = ["empath category"]
    argument_types = {
        "name": t.String(),
        "seed_terms": t.StrList()
    }
    def command(self, name, seed_terms):
        from empath import Empath
        lexicon = Empath()
        lexicon.create_category(name, seed_terms, model="reddit")
        out = lexicon.cats[name]
        return name, out
    def explanation(self, result):
        return [
            "Saved category '{}':".format(result[0]),
            ", ".join(result[1])
        ]
generateCategory = GenerateCategory()

def order_keys(d,keys=None):
  if not keys:
    keys = d.keys()
  order_keys.s_keys = sorted(keys)
  return [d[k] for k in order_keys.s_keys]

class AnalyzeCategoryEmpath(IrisCommand):
     title = "empath category in document"
     examples = ["empath category category in documents"]
     argument_types = {
        "category": t.String(),
        "document": t.String(),
     }
     def command(self, category, document):
         from empath import Empath
         lexicon = Empath()
         return lexicon.analyze(document, normalize=True)[category]

analyzeCategoryEmpath = AnalyzeCategoryEmpath()

class EmpathAnalysis(IrisCommand):
    title = "analyze topics in {dataframe}"
    examples = [ "empath {dataframe}" ]
    argument_types = {
        "dataframe": t.Dataframe("What dataframe would you like to analyze?"),
        "selector": t.DataframeSelector("What column would you like to analyze?", dataframe="dataframe"),
        "aggregate_scores": t.YesNo(question="Aggregate counts?", yes="aggregate", no="documents")
    }
    def command(self, dataframe, selector, aggregate_scores):
        documents = selector.to_matrix().flatten()
        print(documents)
        import numpy as np
        from empath import Empath
        lexicon = Empath()
        to_df = []
        if aggregate_scores == "aggregate":
            out_dict = lexicon.analyze(documents.tolist(), normalize=True)
            for k,v in sorted(out_dict.items(), key=lambda x: x[1], reverse=True):
                to_df.append([k,v])
            return iris_objects.IrisDataframe(column_names=["category", "normalized_count"], column_types=["String", "Number"], data=to_df)
        else:
            out_scores = [order_keys(lexicon.analyze(d, normalize=True)) for d in documents.tolist()]
            return iris_objects.IrisDataframe(column_names=order_keys.s_keys, data=out_scores)


    # def explanation(self, result):
    #     top_n = result[0]
    #     result = result[1]
    #     import numpy as np
    #     data = result.to_matrix()
    #     cat_hash = {}
    #     for i,name in enumerate(result.column_names):
    #         score = np.mean(data[:,i])
    #         cat_hash[name] = score
    #     out_text = []
    #     for name, score in sorted(cat_hash.items(), key=lambda x: x[1], reverse=True)[:top_n]:
    #         out_text.append([name, score])
    #     return ["Here are the top {} categories:".format(top_n)] + [np.array(out_text)]

empathAnalysis = EmpathAnalysis()
