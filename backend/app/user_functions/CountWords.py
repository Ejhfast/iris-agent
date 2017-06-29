from iris import state_types as t
from iris import IrisCommand

class CountWords(IrisCommand):
    title = "count words in {doc}"
    examples = ["count words {doc}", "word count {doc}"]
    argument_types = {"doc":t.String("What is the string you want to anaylze?")}
    def command(self, doc):
        return len(doc.split())
    def explanation(self, result):
        return "{} words in doc".format(result)
_CountWords = CountWords()

