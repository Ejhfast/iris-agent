from .. import IrisCommand
from .. import state_types as t
from .. import state_machine as sm
from .. import util as util
from .. import iris_objects

class MakeClassifier(IrisCommand):
    title = "make a classification model: {features} to predict {classes}"
    examples = [ "build a new classification model",
                 "make a new classification model",
                 "classifier using {features} to predict {classes}",
                 "logistic regression model",
                 "logistic classifier" ]
    argument_types = {
        "model_type": t.Select(options={
            "Logistic Regression classifier": "logistic",
            "Random Forest classifier": "random_forest"
        }),
        "features": t.Dataframe("What do you want to use as features?"), #t.DataframeSelector("What dataframe do you want to use to select the features?"), #t.ArgList(question="Please give me a comma-separated list of features"),
        "classes": t.Dataframe("What do you want to predict?"),
        "name": t.String("What would you like to call the model?")
    }
    help_text = [
        "A classification model is designed to predict a categorical variable, like eye color or gender.",
        "This command takes a list of input features, as arrays, that will be used to predict the category in question.",
        "It then takes the name of an array that corresponds to the category to be predicted."
    ]
    def command(self, model_type, features, classes, name = None):
        from sklearn.linear_model import LogisticRegression
        from sklearn.ensemble import RandomForestClassifier
        if model_type == "random_forest":
                model = RandomForestClassifier()
        else:
            model = LogisticRegression()
        model = iris_objects.IrisModel(model, features, classes, name=name)
        if name:
            self.iris.add_to_env(name, model)
        return model

makeClassifier = MakeClassifier()

class MakeRegression(IrisCommand):
    title = "make a regression model: {features} to predict {classes}"
    examples = [ "build a new regression model",
                 "make a new regression model",
                 "regression using {features} to predict {classes}" ]
    argument_types = {
        "features": t.Dataframe("What do you want to use as features?"), #t.DataframeSelector("What dataframe do you want to use to select the features?"), #t.ArgList(question="Please give me a comma-separated list of features"),
        "classes": t.Dataframe("What do you want to predict?"),
        "name": t.String("What would you like to call the model?")
    }
    help_text = [
        "A regression model is designed to predict a continues variable, like height or income.",
        "This command takes a list of input features, as arrays, that will be used to predict the value in question.",
        "It then takes the name of an array that corresponds to the values to be predicted."
    ]
    def command(self, features, classes, name = None):
        from sklearn.linear_model import LinearRegression
        model = LinearRegression()
        model = iris_objects.IrisModel(model, features, classes, name=name)
        if name:
            self.iris.add_to_env(name, model)
        return model

makeRegression = MakeRegression()

class LassoFeatures(IrisCommand):
    title = "lasso feature selection for {model} with L1 of {regularization}"
    examples = [
        "feature selection for {model} via lasso"
    ]
    argument_types = {
        "model": t.EnvVar("What model would you like to use?"),
        "regularization": t.Float("With regularization of?"),
        "num_f": t.Int("How many features would you like to see?")
    }
    def command(self, model, regularization, num_f):
        from sklearn.linear_model import LogisticRegression
        new_model = LogisticRegression(penalty="l1", C=regularization)
        new_model.fit(model.X, model.y)
        results = []
        feature2name = {i:name for i,name in enumerate(model.dataframe_X.column_names)}
        class2name = {i:value for value,i in model.dataframe_y.cat2index[0].items()}#{i:name for i,name in enumerate(model.dataframe_y.column_names)}
        coefObj = iris_objects.CoefficientResults()
        print(class2name)
        for class_ in range(0, new_model.coef_.shape[0]):
            most_pos = sorted([(feature2name[i], value) for i,value in enumerate(new_model.coef_[class_])], key=lambda x: x[1], reverse=True)[:int(num_f/2)]
            most_neg = sorted([(feature2name[i], value) for i,value in enumerate(new_model.coef_[class_])], key=lambda x: x[1])[:int(num_f/2)]
            if class_ in class2name:
                class_name = class2name[class_]
            else:
                class_name = str(class_)
            for f in most_pos:
                coefObj.add_pos_feature(class_name, f[0], f[1])
            for f in most_neg:
                coefObj.add_neg_feature(class_name, f[0], f[1])
        print("computed features")
        return coefObj
    def explanation(self, result):
        return result.explanation()

lassoFeatures = LassoFeatures()

class ChangeFeatureType(IrisCommand):
    title = "change {feature} in {dataframe} to {new_type}"
    examples = [
        "change feature {feature} in dataframe {dataframe} to {type}"
    ]
    argument_types = {
        "dataframe": t.Dataframe("From what dataframe?"),
        "feature": t.String("What feature do you want to change?"),
        "new_type": t.Select(options={
            "Categorical": "Categorical",
            "String": "String",
            "Number": "Number"
        })
    }
    def command(self, dataframe, feature, new_type):
        return dataframe.change_type(feature, new_type)

changeFeatureType = ChangeFeatureType()

class RemoveFeature(IrisCommand):
    title = "remove {feature} from {dataframe}"
    examples = [
        "remove feature {feature} from {dataframe}"
    ]
    argument_types = {
        "dataframe": t.Dataframe("From what dataframe?"),
        "feature": t.String("Except what feature?")
    }
    def command(self, dataframe, feature):
        return dataframe.remove_column(feature)

removeFeature = RemoveFeature()

class VectorizeTextColumn(IrisCommand):
    title = "vectorize {column} in {dataframe}"
    examples = [
        "make word vectors for {feature} in dataframe {dataframe}"
    ]
    argument_types = {
        "dataframe": t.Dataframe("From what dataframe?"),
        "column": t.String("What feature do you want to change?"),
    }
    def command(self, dataframe, column):
        from sklearn.feature_extraction.text import CountVectorizer
        vectorizer = CountVectorizer()
        documents = dataframe.get_column(column)
        tfidf = vectorizer.fit_transform(documents).toarray()
        vocab = {i:v for v,i in vectorizer.vocabulary_.items()}
        new_frame = iris_objects.IrisDataframe()
        new_frame.data = tfidf
        new_frame.column_names = [vocab[i] for i in range(0, tfidf.shape[1])]
        return new_frame

vectorizeTextColumn = VectorizeTextColumn()

class MakeFeatureGroup(IrisCommand):
    title = "select one or more features / columns"
    examples = [
        "create a new group of features",
        "create a feature set",
        "select columns from dataframe",
        "select a group of features"
    ]
    def command(self, feature_set : t.DataframeSelector("From what dataframe?")):
        return feature_set

makeFeatureGroup = MakeFeatureGroup()

class GetCoefficients(IrisCommand):
    title = "show {model} coefficients"
    examples = [
        "feature coefficients for model {model}",
        "feature relationship coefficients",
        "features coefficients",
        "get coefficient"
    ]
    argument_types = {
        "model": t.EnvVar("What model would you like to get the coefficients from?")
    }
    def command(self, model):
        import numpy as np
        feature_names = model.dataframe_X.column_names
        model.fit()
        coefs = model.model.coef_
        class2name = {i:value for value,i in model.dataframe_y.cat2index[0].items()}
        results = []
        results.append("Columns are: {}".format(", ".join(feature_names)))
        for class_ in range(0, model.model.coef_.shape[0]):
            if class_ in class2name:
                class_name = class2name[class_]
            else:
                class_name = str(class_)
            results.append("For class "+class_name)
            results.append(model.model.coef_[class_])
        return results

getCoefficients = GetCoefficients()

class TrainTestSplit(IrisCommand):
    title = "create training and test data splits"
    examples = [ "create train test data",
                 "split data into train and test" ]
    store_result = [ t.VarName(question="Where to store training data?"),
                     t.VarName(question="Where to store testing data?") ]
    help_text = [
        "This command takes a dataset and splits it into training and testing data.",
        "By convention, training data is used to train a model, and testing data is used to evaluate a model's performance."
    ]
    def command(self, x_features : t.ArgList(), y_classes : t.ArgList()):
        from sklearn.model_selection import train_test_split
        xvals = np.array(x_features).T
        yvals = np.array(y_classes).T
        yvals = yvals.reshape(yvals.shape[0])
        x_train, x_test, y_train, y_test = train_test_split(xvals, yvals, train_size=0.25)
        train_data = iris_objects.IrisData(x_train, y_train)
        test_data = iris_objects.IrisData(x_test, y_test)
        return train_data, test_data

trainTestSplit = TrainTestSplit()

class TrainModel(IrisCommand):
    title = "train {model} on {data}"
    examples = [ "train {model} {data}",
                 "train model {model} on data {data}" ]
    help_text = [
        "This command trains a model on a dataset. The model will be fit on the provided data."
    ]
    def command(self, iris_model : t.EnvVar(), iris_data : t.EnvVar()):
        iris_model.model.fit(iris_data.X, iris_data.y)
    def explanation(self, *args):
        return "I fit the model."

trainModel = TrainModel()

class TestModelF1(IrisCommand):
    title = "test {iris_model} on {iris_data} using f1 score with {weighting}"
    examples = [ "test {iris_model} {iris_data} with {weighting}",
                 "test model {iris_model} on data {data} with {weighting}" ]
    help_text = [
        "This command evaluates a model on a dataset using the F1 metric.",
        "F1 is a common metric that balances precision and recall."
        "When you evaluate a model, you should not use data the model has seen during training."
    ]
    def __init__(self):
        metrics = { "Binary: report results for the class specified by pos_label. Data must be binary.": "binary",
                    "Micro: calculate metrics globally by counting the total true positives, false negatives and false positives.": "micro",
                    "Macro: calculate metrics for each label, and find their unweighted mean (does not take label imbalance into account).": "macro" }
        select_classifier = t.Select(options=metrics, default="binary")
        self.argument_types = { "iris_model": t.EnvVar(),
                                "iris_data": t.EnvVar(),
                                "weighting": select_classifier }
        super().__init__()
    def command(self, iris_model, iris_data, weighting):
        from sklearn.metrics import f1_score
        pred_y = iris_model.model.predict(iris_data.X)
        score = f1_score(iris_data.y, pred_y, average=weighting)
        return score
    def explanation(self, score):
        score = round(score, 4)
        return "F1 score of {}".format(score)

testModelF1 = TestModelF1()

class CrossValidateClassifier(IrisCommand):
    title = "cross-validate classification {model} with {score} and {n} folds"
    examples = [ "cross-validate classification {model} {score} {n}",
                 "evaluate classifier performance", "cross-validate {model}" ]
    help_text = [
        "This command evaluates a model through cross-validation, using either accuracy or F1 score.",
        "Cross-validation is a common way to evaluate a model.",
        "For each fold in n fold cross-validation, this command will train on n-1 folds and evaluate the model on the held out fold.",
        "The resulting scores will be averaged together as a measure of overall performance."
    ]
    argument_types = {
        "model": t.EnvVar(),
        "score": t.Select(options={
            "Accuracy: correct predictions / incorrect predictions": "accuracy",
            "F1 macro: f1 score computed with average across classes": "f1_macro",
            "F1 binary: f1 score computed on the positive class": "f1",
            "AUC: Area under the ROC curve": "roc_auc"
        }, default="accuracy"),
        "n": t.Int()
    }
    argument_help = {
        "score": t.YesNo(["I'm happy to help.",
                          "Are the classes balanced in the data (does each class have the same number of examples)?"],
                    yes=sm.DoAll([sm.Print(["Great, let's use accuracy"]), sm.ValueState("accuracy")]),
                    no=t.YesNo("Do you have more than two classes?",
                            yes=sm.DoAll([sm.Print(["Great, let's use f1_macro.",
                                                    "That's a standard metric for multi-class analysis"]),
                                              sm.ValueState("f1_macro")]),
                            no=sm.DoAll([sm.Print(["Great, let's use f1 (defaults to binary).",
                                                   "That's the conventional metric for binary data."]),
                                             sm.ValueState("f1_binary")])))
    }
    def command(self, model, score, n):
        from sklearn.cross_validation import cross_val_score
        return cross_val_score(model.model, model.X, model.y, scoring = score, cv=n)
    def explanation(self, score):
        import numpy as np
        score = round(np.average(score), 4)
        return "Average performance of {} across the folds".format(score)

crossValidateClassifier = CrossValidateClassifier()

class CrossValidateRegression(IrisCommand):
    title = "cross-validate regression {model} with {score} and {n} folds"
    examples = [ "cross-validate regression {model} {score} {n}", "evaluate regression performance" ]
    argument_types = {
        "model": t.EnvVar(),
        "score": t.Select(options={
            "R^2": "r2",
            "MSE": "neg_mean_squared_error",
            "MAE": "neg_mean_absolute_error",
        }, default="r2"),
        "n": t.Int()
    }
    def command(self, model, score, n):
        from sklearn.cross_validation import cross_val_score
        return score, cross_val_score(model.model, model.X, model.y, scoring = score, cv=n)
    def explanation(self, results):
        metric, scores = results
        import numpy as np
        score = round(np.average(scores), 4)
        return "Average performance of {} {} across the folds".format(score, metric)

crossValidateRegression = CrossValidateRegression()

class CompareModels(IrisCommand):
    title = "compare {model1} and {model2} using {metric}"
    examples = [ "compare {model1} {model2} using {metric}",
                 "which model is better under {metric}, {model1} or {model2}" ]
    def __init__(self):
        metrics = { "Accuracy: correct predictions / incorrect predictions": "accuracy",
                    "F1 macro: f1 score computed with average across classes": "f1_macro",
                    "F1 micro: f1 score computed with weighted average": "f1_micro" }
        select_metric = t.Select(options=metrics, default="accuracy")
        self.argument_types = { "model1": t.EnvVar(),
                                "model2": t.EnvVar(),
                                "metric": select_metric }
        super().__init__()
    help_text = [
        "This command takes two models, and determines which performs better under a given metric."
    ]
    def command(self, model1, model2, metric):
        import numpy as np
        m1_scores = np.average(crossValidateModel(model1, metric, 10))
        m2_scores = np.average(crossValidateModel(model2, metric, 10))
        if m1_scores > m2_scores:
            higher_m, lower_m = model1, model2
            higher_s, lower_s = m1_scores, m2_scores
        else:
            higher_m, lower_m = model2, model1
            higher_s, lower_s = m2_scores, m1_scores
        return (higher_m.name, higher_s), (lower_m.name, lower_s)
    def explanation(self, results):
        higher_tuple, lower_tuple = results
        higher_name, lower_name = [x[0] for x in [higher_tuple, lower_tuple]]
        higher_score, lower_score = [round(x[1],4) for x in [higher_tuple, lower_tuple]]
        return "I'd say \"{}\" is better than \"{}\", with {} vs. {}".format(higher_name, lower_name, higher_score, lower_score)

compareModels = CompareModels()


class FindRegularization(IrisCommand):
    title = "find the best l2 regularization parameter for {model} with {metric}"
    examples = [ "best regularization for {model} {metric}",
                 "best l2 parameter for {model} under {metric}" ]
    def __init__(self):
        metrics = { "Accuracy: correct predictions / incorrect predictions": "accuracy",
                    "F1 macro: f1 score computed with average across classes": "f1_macro",
                    "F1 micro: f1 score computed with weighted average": "f1_micro" }
        select_metric = t.Select(options=metrics, default="accuracy")
        self.argument_types = { "model": t.EnvVar(),
                                "metric": select_metric }
        super().__init__()
    help_text = [
        "This command finds the best L2 parameter for a model, under accuracy or F1.",
        "Regularization parameters are useful to prevent a model from overfitting.",
        "Finding a good parameter can improve model performance."
    ]
    def command(self, model, metric):
        from sklearn.cross_validation import cross_val_score
        import numpy as np
        best_score = 0
        best_c = None
        for c in [0.01, 0.1, 1, 10, 100]:
            score = np.average(crossValidateModel(model, metric, 5))
            if score > best_score:
                best_score = score
                best_c = c
        return best_c, best_score, metric
    def explanation(self, results):
        best_c, best_score, metric = results
        best_score = round(best_score, 4)
        return "Best L2 of {} with {} {}".format(best_c, best_score, metric)

findRegularization = FindRegularization()
