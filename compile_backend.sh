pushd backend/app
pyinstaller app.py --distpath ../../python_compiled_backend --hidden-import twitter --hidden-import empath --hidden-import matplotlib --hidden-import matplotlib.pyplot --hidden-import sklearn.neighbors.typedefs --hidden-import sklearn.feature_extraction --hidden-import sklearn.ensemble --hidden-import sklearn.tree._utils --hidden-import sklearn.cross_validation
popd
mkdir python_compiled_backend/app/iris
cp -r backend/iris/* python_compiled_backend/app/iris
# super hack for matplotlib
cp ~/miniconda2/envs/py3/lib/libmkl_avx2.dylib python_compiled_backend/app/
cp ~/miniconda2/envs/py3/lib/libmkl_mc.dylib python_compiled_backend/app/
# another hack: copy over empath data
mkdir python_compiled_backend/app/empath
mkdir python_compiled_backend/app/empath/data
mkdir python_compiled_backend/app/empath/data/user
cp /Users/ethanfast/miniconda2/envs/py3/lib/python3.5/site-packages/empath/data/categories.tsv python_compiled_backend/app/empath/data/
