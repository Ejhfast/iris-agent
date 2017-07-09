from .. import IrisCommand
from .. import state_types as t
from .. import state_machine as sm
from .. import util as util
from .. import iris_objects
import seaborn
import matplotlib
matplotlib.use('AGG')
import matplotlib.pyplot as plt

class BarChart(IrisCommand):
    title = "make a barchart using {dataframe}"
    examples = ["bar plot {dataframe}"]
    argument_types = {
        "dataframe": t.Dataframe("What dataframe?"),
        "selector_names": t.DataframeSelector("Please choose a column with labels for the bars.", dataframe="dataframe"),
        "selector_values": t.DataframeSelector("Now tell me a column for the values.", dataframe="dataframe")
    }
    def command(self, dataframe, selector_names, selector_values):
        return iris_objects.IrisBar("name", selector_names.to_matrix().flatten(), selector_values.to_matrix().flatten(), bar_label=selector_names.column_names[0], value_label=selector_values.column_names[0])

barChart = BarChart()

class ComputeAUC(IrisCommand):
    title = "compute auc curve data for {model}"
    examples = [ "auc curve {model}",
                 "auc data for {model}" ]
    help_text = [
        "This command will compute the necessary data to plot an AUROC curve for a model."
    ]
    def command(self, model : t.EnvVar()):
        from sklearn.metrics import roc_curve, auc
        from sklearn.model_selection import train_test_split
        from sklearn.preprocessing import label_binarize
        from scipy import interp
        classes = set(model.y)
        n_classes = len(classes)
        X_train, X_test, y_train, y_test = train_test_split(model.X, model.y, test_size=0.1, random_state=0)
        y_score = model.model.fit(X_train, y_train).decision_function(X_test)
        fpr = {}
        tpr = {}
        roc_auc = {}
        binary_ytest = label_binarize(y_test, classes=list(classes))
        for i in range(n_classes):
            fpr[i], tpr[i], _ = roc_curve(binary_ytest[:, i], y_score[:, i])
            roc_auc[i] = auc(fpr[i], tpr[i])
        # Compute micro-average ROC curve and ROC area
        fpr["micro"], tpr["micro"], _ = roc_curve(binary_ytest.ravel(), y_score.ravel())
        roc_auc["micro"] = auc(fpr["micro"], tpr["micro"])
        # Compute macro-average ROC curve and ROC area
        # First aggregate all false positive rates
        all_fpr = np.unique(np.concatenate([fpr[i] for i in range(n_classes)]))
        # Then interpolate all ROC curves at this points
        mean_tpr = np.zeros_like(all_fpr)
        for i in range(n_classes):
            mean_tpr += interp(all_fpr, fpr[i], tpr[i])
        # Finally average it and compute AUC
        mean_tpr /= n_classes
        fpr["macro"] = all_fpr
        tpr["macro"] = mean_tpr
        roc_auc["macro"] = auc(fpr["macro"], tpr["macro"])
        package_data = {"fpr": fpr, "tpr": tpr, "roc_auc": roc_auc, "n_classes": n_classes}
        return package_data
    def explanation(self, data):
        return "Computed the auc curve data."

computeAUC = ComputeAUC()

# TODO: port to vega
class PlotAUCFromData(IrisCommand):
    title = "plot auc curve from {data}"
    examples = [ "plot auc data {data}",
                 "plot {data} auc" ]
    argument_types = { "data": t.EnvVar(question="Where is the auc curve data?"),  "name": t.String("What would you like to name the plot?")}
    help_text = [
        "This command takes pre-computed AUROC data and makes a plot."
    ]
    def command(self, data, name):
        import matplotlib
        matplotlib.use('AGG')
        import matplotlib.pyplot as plt
        fpr, tpr, roc_auc, n_classes = data["fpr"], data["tpr"], data["roc_auc"], data["n_classes"]
        # this is annoyingly magical, we want to pull the user-specified 'VarName' to label the figure
        name = self.context["names"][0]
        # Plot all ROC curves
        f = plt.figure(name.id)
        plt.plot(fpr["micro"], tpr["micro"],
                 label='micro-average ROC curve (area = {0:0.2f})'
                       ''.format(roc_auc["micro"]),
                 color='deeppink', linestyle=':', linewidth=4)
        plt.plot(fpr["macro"], tpr["macro"],
                 label='macro-average ROC curve (area = {0:0.2f})'
                       ''.format(roc_auc["macro"]),
                 color='navy', linestyle=':', linewidth=4)
        for i in range(n_classes):
            plt.plot(fpr[i], tpr[i],
                     label='ROC curve of class {0} (area = {1:0.2f})'
                     ''.format(i, roc_auc[i]))
        plt.plot([0, 1], [0, 1], 'k--')
        plt.xlim([0.0, 1.0])
        plt.ylim([0.0, 1.05])
        plt.xlabel('False Positive Rate')
        plt.ylabel('True Positive Rate')
        plt.title('Some extension of Receiver operating characteristic to multi-class')
        plt.legend(loc="lower right")
        return iris_objects.IrisImage(f, name.name)

plotAUCFromData = PlotAUCFromData()

# NEW

class PlotAUC(IrisCommand):
    title = "plot auc curve for {model}"
    examples = [ "plot auc curve for model {model}" ]
    help_text = [
        "This command will plot an AUROC curve for a model.",
        "An AUROC curve shows the tradeoff between true positive and false positive rates for a model."
    ]
    def command(self, model : t.EnvVar(), name : t.String("What would you like to name the plot?")):
        import matplotlib
        matplotlib.use('AGG')
        import matplotlib.pyplot as plt
        data = computeAUC(model)
        # thread through the 'name' from self
        return plotAUCFromData(data, name)

plotAUC = PlotAUC()

# TODO: port to vega
class PlotStats(IrisCommand):
    title = "plot two-sample test {data}"
    examples = [ "plot p-values {data}" ]
    argument_types = {
        "data": t.EnvVar("What would you like to plot?"),
        "n": t.Int("How many relationships would you like to plot?"),
        "name": t.String("Where would you like to save the plot?")
    }
    def command(self, data, n, name):
        import matplotlib
        matplotlib.use('AGG')
        import matplotlib.pyplot as plt
        import numpy as np
        dataM = data.to_matrix()
        odds = dataM[0,:,2]
        oddsI = [(i, odd) for i,odd in enumerate(odds) if dataM[0,i,1] <= 0.05]
        oddsH = sorted([x for x in oddsI if x[1] > 1], key=lambda x: x[1], reverse=True)[:n]
        oddsL = sorted([(x[0], 1.0/x[1]) for x in oddsI if x[1] < 1], key=lambda x: x[1], reverse=True)[:n]
        valuesH, valuesL = [[x[1] for x in y] for y in [oddsH, oddsL]]
        indexesH, indexesL = [[x[0] for x in y] for y in [oddsH, oddsL]]
        namesH, namesL = [[data.column_names[i] for i in y] for y in [indexesH, indexesL]]
        valuesH, valuesL, namesH, namesL = [list(reversed(x)) for x in [valuesH, valuesL, namesH, namesL]]
        f = plt.figure(self.iris.gen_plot_id(name))
        ax1 = f.add_subplot(211)
        ax1.barh(np.arange(len(namesH)), valuesH, color=['green'])
        ax1.set_yticks(np.arange(len(namesH)))
        ax1.set_yticklabels(namesH)
        ax1.set_title(data.pops[0])
        ax1.set_xlabel("odds associated with {}".format(data.pops[0]))
        ax2 = f.add_subplot(212)
        ax2.barh(np.arange(len(namesL)), valuesL)
        ax2.set_yticks(np.arange(len(namesL)))
        ax2.set_yticklabels(namesL)
        ax2.set_title(data.pops[1])
        ax2.set_xlabel("odds associated with {}".format(data.pops[1]))
        plt.tight_layout()
        plot_data = iris_objects.IrisImage(f, name)
        self.iris.add_to_env(name, plot_data)
        return plot_data

plotStats = PlotStats()

# TODO: port to vega
class PlotHistogram(IrisCommand):
    title = "plot a histogram on {data}"
    examples = [ "plot histogram {data}",
                 "histogram {data}" ]
    help_text = [
        "This command plots a histogram on the provided data.",
        "A histogram counts the number of datapoints that hold certain values."
    ]
    argument_types = {
        "data": t.Array("What would you like to plot?"),
        "name": t.String("Where would you like to save the plot?")
    }
    def command(self, data, name):
        import matplotlib
        matplotlib.use('AGG')
        import matplotlib.pyplot as plt
        f = plt.figure(self.iris.gen_plot_id(name))
        plt.hist(data)#.to_matrix())
        plot_data = iris_objects.IrisImage(f, name)
        self.iris.add_to_env(name, plot_data)
        return plot_data

plotHistogram = PlotHistogram()

# TODO: port to vega
class PlotBar(IrisCommand):
    title = "plot bars {data1} {data2}"
    examples = [ "plot barchart {data1} {data2}",
                 "barchart {data1} {data2}" ]
    help_text = [
        "This command plots a histogram on the provided data.",
        "A histogram counts the number of datapoints that hold certain values."
    ]
    argument_types = {
        "data1": t.Array("What would you like to plot?"),
        "data2": t.Array("What would you like to plot?"),
        "name": t.String("Where would you like to save the plot?")
    }
    def command(self, data1, data2, name):
        import matplotlib
        import numpy as np
        matplotlib.use('AGG')
        import matplotlib.pyplot as plt
        ind = np.arange(data1.shape[0])
        width = 0.35
        f = plt.figure(self.iris.gen_plot_id(name))
        plt.bar(ind, data1, width, color='r')#.to_matrix())
        plt.bar(ind + width, data2, width, color='y')
        plot_data = iris_objects.IrisImage(f, name)
        self.iris.add_to_env(name, plot_data)
        return plot_data

plotBar = PlotBar()
