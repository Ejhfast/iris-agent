from .. import IrisCommand
from .. import state_types as t
from .. import state_machine as sm
from .. import util as util
from .. import iris_objects

class GetUserTweets(IrisCommand):
    title = "get tweets from {user}"
    examples = ["tweet from {user}", "what has {user} tweeted on twitter"]
    argument_types = {
        "user": t.String("What user do you want to get the tweets from? (Without @)")
    }
    def command(self, user):
        import twitter
        api = twitter.Api(consumer_key='aKCQbgWoesaFSCVZAp9T77n7v',
                  consumer_secret='5DVr2Mmf2mgBoyncd6QfbVmOaVwRHdFTdpVoajFLeiDZOuuM6O',
                  access_token_key='13945192-1yCb1WdgVCzjHwMlSUC8v2HAHuJD382jyAk5ZipKA',
                  access_token_secret='BOmqOw31TGIHR2QFIbTiGmQZmiJLbp4JudQiMiJK7j1gD')
        tweets = api.GetUserTimeline(screen_name=user, count=200)
        tweet_text = [x.text for x in tweets]
        import numpy as np
        tweet_frame =np.array(tweet_text)#.reshape(-1,1)
        return tweet_frame#iris_objects.IrisDataframe(column_names=["tweet_text"], column_types=["Text"], data=tweet_frame, do_conversion=False)
    # def explanation(self, results):
    #     return ["I stored the tweets in a new dataframe:",
    #             results,
    #             "You can see them by looking at the 'tweet_text' column."]

getUserTweets = GetUserTweets()

class SearchTweets(IrisCommand):
    title = "search tweets"
    examples = ["search tweet for term on twitter"]
    argument_types = {
        "term": t.String("What is the search term?")
    }
    def command(self, term):
        import twitter
        api = twitter.Api(consumer_key='aKCQbgWoesaFSCVZAp9T77n7v',
                  consumer_secret='5DVr2Mmf2mgBoyncd6QfbVmOaVwRHdFTdpVoajFLeiDZOuuM6O',
                  access_token_key='13945192-1yCb1WdgVCzjHwMlSUC8v2HAHuJD382jyAk5ZipKA',
                  access_token_secret='BOmqOw31TGIHR2QFIbTiGmQZmiJLbp4JudQiMiJK7j1gD')
        tweets = api.GetSearch(term=term, count=100)
        tweet_text = [x.text for x in tweets]
        import numpy as np
        tweet_frame =np.array(tweet_text)
        return tweet_frame#iris_objects.IrisDataframe(column_names=["tweet_text"], column_types=["Text"], data=tweet_frame, do_conversion=False)


searchTweets = SearchTweets()
