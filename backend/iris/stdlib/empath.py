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

class EmpathAnalysis(IrisCommand):
    title = "analyze topics in {documents}"
    examples = [ "empath {documents}" ]
    argument_types = {
        "documents": t.EnvVar("Where is the collection of documents?")
    }
    def command(self, documents):
        documents = documents.to_matrix().flatten()
        import numpy as np
        from empath import Empath
        lexicon = Empath()
        to_df = []
        out_dict = lexicon.analyze(documents.tolist(), normalize=True)
        for k,v in sorted(out_dict.items(), key=lambda x: x[1], reverse=True):
            to_df.append([k,v])
        #to_df = np.array(to_df)
        return iris_objects.IrisDataframe(column_names=["category", "normalized_count"], column_types=["String", "Number"], data=to_df, do_conversion=False)
        # data = np.array([order_keys(lexicon.analyze(doc, normalize=True)) for doc in documents])
        # types_ = ["Number" for _ in order_keys.s_keys]
        # return top_n, iris_objects.IrisDataframe(column_names=order_keys.s_keys, column_types=types_, data=data, do_conversion=False)

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
