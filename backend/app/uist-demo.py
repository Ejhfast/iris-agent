iris_env = {}
def store_command(value, name):
    iris_env[name] = value
def make_feature_group(feature_set : t.DataframeSelector("From what dataframe?")):
        return feature_set
def add_two_numbers(x, y):
        return x + y
def see_code():
        return transform_ast(self.iris.env["__MEMORY_FUNC__"])
def make_classifier(model_type, features, classes, name = None):
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
def load_c_s_v_data(file):
        from .fileupload import file_state
        # file_state is a custom state machine, built using Iris low-level library
        # allows for injection of user input into code logic
        return file_state(file)
def load_env(name : t.String(question="What filename to load?")):
        import dill as pickle
        with open(name, 'rb') as f:
            data = pickle.load(f)
            self.iris.load_state(data)
            return "Loaded environment from \"{}\".".format(name)
def save_env(name : t.String(question="What filename to save under?")):
        import dill as pickle
        with open(name, 'wb') as f:
            print(self.iris.env)
            pickle.dump(self.iris.serialize_state(), f)
            return "Saved to {}.".format(name)
iris_env["__MEMORY__"]=add_two_numbers(2.0,3.0)
iris_env["__MEMORY__"]=load_c_s_v_data(junk)
iris_env["__MEMORY__"]=save_env("iris")
iris_env["__MEMORY__"]=make_classifier("logistic",make_feature_group(junk),make_feature_group(junk),"sepal_model")
iris_env["__MEMORY__"]=see_code()
iris_env["__MEMORY__"]=make_feature_group(junk)
iris_env["__MEMORY__"]=store_command(iris_env["__MEMORY__"],"sepal_features")
iris_env["__MEMORY__"]=make_feature_group(junk)
iris_env["__MEMORY__"]=store_command(iris_env["__MEMORY__"],"flower-type")
iris_env["__MEMORY__"]=load_env("iris-plain")
iris_env["__MEMORY__"]=make_classifier("logistic",iris_env["sepal_features"],iris_env["flower-type"],"sepal_model")
