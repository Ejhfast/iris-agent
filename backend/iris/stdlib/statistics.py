from .. import IrisCommand
from .. import state_types as t
from .. import state_machine as sm
from .. import util as util
from .. import iris_objects

class Mean(IrisCommand):
    title = "take mean of {array}"
    examples = [
        "mean of {array} of numbers",
        "mean {array}",
        "average of {array}",
        "average value of {array}",
    ]
    help_text = [
        "This computes the average values of an array of numbers"
    ]
    argument_types = {
        "array": t.Array("What is the array you'd like to analyze?")
    }
    def command(self, array):
        import numpy as np
        return np.average(array)
    def explanation(self, val):
        return "The mean is {}".format(round(val, 6))

mean = Mean()

class LogTransform(IrisCommand):
    title = "log-transform {dataframe}"
    examples = [
        "log-transform {dataframe} of numbers",
        "log {dataframe}",
        "log of {dataframe}",
        "log value of {dataframe}",
    ]
    help_text = [
        "This computes the log values of an array of numbers"
    ]
    argument_types = {
        "dataframe": t.Dataframe("What dataframe would you like to analyze?"),
        "selector": t.DataframeSelector("What are the columns you'd like to transform?", dataframe="dataframe")
    }
    def command(self, dataframe, selector):
        import numpy as np
        data = selector.to_matrix()
        data_out = []
        for col in range(0,data.shape[1]):
            data_out.append(np.log(data[:,col]))
        data_out = np.array(data_out).T
        return iris_objects.IrisDataframe(column_names=selector.column_names, column_types=selector.column_types, data=data_out)

log = LogTransform()

class PearsonCorrelation(IrisCommand):
    title = "compute pearson correlation: {x} and {y}"
    examples = [ "pearson correlation between {x} and {y}",
                 "pearson correlation {x} {y}",
                 "how are {x} and {y} correlated" ]
    help_text = [
        "A pearson correlation coefficient is a measure of linear dependence between two variables.",
        "A coefficient greater than 0 indicates a positive linear relationship",
        "A coefficient less than 0 indicates a negative relationship",
        "And a coefficient near 0 indicates the absence of any relationship.",
        "This command returns a coefficient and a p-value that measures the degree of confidence in its significance."
    ]
    argument_help = {
        "x": "The x value should be an array from the current environment",
        "y": "The y value should be an array from the current environment",
    }
    def command(self, x : t.Array("What is the first array?"), y : t.Array("The second array?")):
        from scipy.stats import pearsonr
        return pearsonr(x,y)
    def explanation(self, corr_pval):
        corr = round(corr_pval[0],4)
        pval = round(corr_pval[1],4)
        return "Correlation of {} with p-value of {}".format(corr, pval)

pearsonCorrelation = PearsonCorrelation()

class FindQuartiles(IrisCommand):
    title = "find quartiles {array}"
    expamples = ["quartiles {array}", "Q1 Q2 Q3 Q4 {array}"]
    argument_types ={
        "array": t.Array("What array do you want to use?")
    }
    def command(self, array):
        import numpy as np
        min_, max_ = min(array), max(array)
        q25, q50, q75 = np.percentile(array, [25, 50, 75])
        return (min_, q25, q50, q75, max_)
    def explanation(self, results):
        out_s = "Q1 is from {} to {}, Q2 is from {} to {}, Q3 is from {} to {}, and Q4 is from {} to {}"
        return out_s.format(results[0], results[1], results[1], results[2], results[2], results[3], results[3], results[4])

findQuartiles = FindQuartiles()

class StatisticalTestDataframe(IrisCommand):
    title = "two-sample statistical test {stats_test} on columns in {data1} and {data2}"
    examples = ["two-sample {stats_test} on columns in {data1} {data2}"]
    argument_types = {
        "stats_test": t.Select(options={
            "Mann-Whitney U test (does not assume data is normally distributed)": "mann_whitney",
            "Welch's t-test (assumes normal distibution, not equal variance)": "welch",
            "Student's t-test (assumes normal distribution and equal variance)": "student_t"
        }),
        "data1": t.Dataframe("What data for first population?"),
        "data2": t.Dataframe("What data for second population?")
    }
    def command(self, stats_test, data1, data2):
        from scipy.stats import ttest_ind, mannwhitneyu
        from collections import namedtuple
        import numpy as np
        if stats_test == "mann_whitney":
            ttest = mannwhitneyu
        elif stats_test == "welch":
            ttest = lambda x,y: ttest_ind(x,y,equal_var=False)
        else:
            ttest = ttest_ind
        data1M, data2M = [data.to_matrix() for data in [data1, data2]]
        results = []
        Statistic = namedtuple('Statistic', ['stat', 'p_val', 'odds'])
        for i in range(0, data1M.shape[1]):
            stat_val = ttest(data1M[:,i], data2M[:,i])
            results.append(Statistic(stat_val[0], stat_val[1], np.average(data1M[:,i].flatten())/np.average(data2M[:,i].flatten())))
        results = np.array(results).reshape(1, data1M.shape[1], 3)
        df = iris_objects.IrisDataframe(column_names=list(data1.column_names), column_types=[], data=results)
        df.pops = [data1.name, data2.name]
        return df

statisticalTestDataframe = StatisticalTestDataframe()

class BonferroniCorrection(IrisCommand):
    title = "apply bonferroni correction to {data}"
    examples = [ "bonferroni {data}" ]
    argument_types = {
        "data": t.Dataframe("Where is the collection of statistics?")
    }
    def command(self, data):
        import numpy as np
        dataM = data.to_matrix()
        num_tests = dataM.shape[1]
        new_data = np.copy(dataM)
        for i in range(0, num_tests):
            new_data[0,i,1] = new_data[0,i,1] * num_tests
        df = iris_objects.IrisDataframe(column_names=list(data.column_names), column_types=[], data=new_data)
        df.pops = list(data.pops)
        return df

bonferroniCorrection = BonferroniCorrection()

class HolmCorrection(IrisCommand):
    title = "apply holm correction to {data}"
    examples = [ "holm {data}" ]
    argument_types = {
        "data": t.Dataframe("Where is the collection of statistics?")
    }
    def command(self, data):
        import numpy as np
        dataM = data.to_matrix()
        num_tests = dataM.shape[1]
        new_data = np.copy(dataM)
        pvals = sorted([(i, new_data[0,i,1]) for i in range(0, num_tests)], key=lambda x: x[1])
        p2i = {k[0]:i for i,k in enumerate(pvals)}
        for i in range(0, num_tests):
            new_data[0,i,1] = new_data[0,i,1] * (num_tests-p2i[i]+1)
        df = iris_objects.IrisDataframe(column_names=list(data.column_names), column_types=[], data=new_data)
        df.pops = list(data.pops)
        return df

holmesCorrection = HolmCorrection()

class ShowSignificantValues(IrisCommand):
    title = "show significant values for {data}"
    examples = [ "significant values {data}"]
    argument_types = {
        "data": t.Dataframe("Where is the collection of statistics?")
    }
    def command(self, data):
        dmatrix = data.to_matrix()
        pvals = [dmatrix[0, i, 1] for i in range(0, dmatrix.shape[1])]
        odds = [dmatrix[0, i, 2] for i in range(0, dmatrix.shape[1])]
        results = [(p_val, odds[i], data.column_names[i]) for i, p_val in enumerate(pvals) if p_val < 0.05]
        return (results, data.pops)
    def explanation(self, results):
        stats, pops = results
        new_results = []
        for r in stats:
            if r[1] < 1:
                direction = "{} more likely in \"{}\"".format(round(1.0/r[1],6), pops[1])
            else:
                direction = "{} more likely in \"{}\"".format(round(r[1],6), pops[0])
            new_results.append("\"{}\" with p-value of {} is {}".format(r[2], round(r[0],6), direction))
        return new_results

showSignificantValues = ShowSignificantValues()

class StudentTTest(IrisCommand):
    title = "student t-test on {dataframe}"
    argument_types = {
        "dataframe": t.Dataframe("What dataframe contains the data?"),
        "pop1": t.DataframeSelector("What is the first population to analyze?", dataframe="dataframe"),
        "pop2": t.DataframeSelector("What is the second population to analyze?", dataframe="dataframe"),
    }
    def command(self, dataframe, pop1, pop2):
        from scipy.stats import ttest_ind
        data_pop1 = pop1.to_matrix().flatten() # TODO: in future, force single column selection
        data_pop2 = pop2.to_matrix().flatten()
        return ttest_ind(data_pop1, data_pop2)
    def explanation(self, results):
        return "The p-value is {:.2e} and t-statistic is {}.".format(results[1], round(results[0],6))

studentTTest = StudentTTest()

# class StudentTTest(IrisCommand):
#     title = "calculate two sample Student t-test on {x} and {y}"
#     examples = [
#         "Student t-test on {x} {y}",
#         "statistical test",
#         "two sample statistical test",
#         "test statistic"
#     ]
#     help_text = [
#         "This test determines whether two independent samples are significantly different from one another.",
#         "It assumes that both samples are normally distributed with equal variance."
#     ]
#     def command(self, x : t.Array(), y : t.Array()):
#         from scipy.stats import ttest_ind
#         return ttest_ind(x,y)
#     def explanation(self, results):
#         pval = round(results[1], 4)
#         if pval < 0.05:
#             return "These distributions are significantly different, with p-value of {}.".format(pval)
#         else:
#             return "These distributions are not significantly different, with p-value of {}.".format(pval)
#
# studentTTest = StudentTTest()

class WelchTTest(IrisCommand):
    title = "calculate Welch t-test on {x} and {y}"
    examples = [
        "Welch t-test on {x} and {y}",
        "statistical test",
        "two sample statistical test",
        "statistical"
    ]
    help_text = [
        "This test determines whether two independent samples are significantly different from one another.",
        "It assumes that both samples are normally distributed, but does not assume they have equal variance."
    ]
    def command(self, x : t.Array(), y : t.Array()):
        from scipy.stats import ttest_ind
        return ttest_ind(x,y, equal_var=False)
    def explanation(self, results):
        pval = round(results[1], 4)
        if pval < 0.05:
            return "These distributions are significantly different, with p-value of {}.".format(pval)
        else:
            return "These distributions are not significantly different, with p-value of {}.".format(pval)

welchTTest = WelchTTest()

class MannWhitney(IrisCommand):
    title = "calculate Mann-Whitney U test on {x} and {y}"
    examples = [
        "Mann-Whitney U test on {x} and {y}",
        "statistical test",
        "two sample statistical test"
    ]
    help_text = [
        "This test determines whether two independent samples are significantly different from one another.",
        "It does not assume that both samples are normally distributed."
    ]
    def command(self, x : t.Array(), y : t.Array()):
        from scipy.stats import mannwhitneyu
        return mannwhitneyu(x,y)
    def explanation(self, results):
        pval = round(results[1], 4)
        if pval < 0.05:
            return "These distributions are significantly different, with p-value of {}.".format(pval)
        else:
            return "These distributions are not significantly different, with p-value of {}.".format(pval)

mannWhitney = MannWhitney()

class TTestHelp(IrisCommand):
    title = "help me run a t-test"
    example = [
        "which t-test should I use?"
    ]
    help_text = [
        "This command walks you through choosing a t-test"
    ]
    argument_types = {
        "choice": t.YesNo("Is your data normally distributed?",
            yes=t.YesNo("Do your samples have equal variance?",
                yes="use student's t-test",
                no="use welch's t-test"
            ),
            no="use mann-whitney u test"
        )
    }
    def command(self, choice):
        return choice

tTestHelp = TTestHelp()
