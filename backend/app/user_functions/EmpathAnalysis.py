from iris import state_types as t
from iris import IrisCommand

from iris import iris_objects
class EmpathAnalysis(IrisCommand):
    title = "analyze {documents} with empath"
    examples = ["empath {documents}", "analyze topics in {documents}", "lexical analysis on {documents}"]
    argument_types = {"documents":t.Dataframe("Where is the collection of documents?")}
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
        return iris_objects.IrisDataframe(column_names=["category", "normalized_count"], column_types=["String", "Number"], data=to_df)
    def explanation(self, result):
        return result
_EmpathAnalysis = EmpathAnalysis()
