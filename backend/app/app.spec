# -*- mode: python -*-

block_cipher = None


a = Analysis(['app.py'],
             pathex=['/Users/ethanfast/Desktop/Code/iris-electron/backend/app'],
             binaries=[],
             datas=[],
             hiddenimports=['twitter', 'empath', 'matplotlib', 'matplotlib.pyplot', 'sklearn.neighbors.typedefs', 'sklearn.feature_extraction', 'sklearn.ensemble', 'sklearn.tree._utils', 'sklearn.cross_validation'],
             hookspath=[],
             runtime_hooks=[],
             excludes=[],
             win_no_prefer_redirects=False,
             win_private_assemblies=False,
             cipher=block_cipher)
pyz = PYZ(a.pure, a.zipped_data,
             cipher=block_cipher)
exe = EXE(pyz,
          a.scripts,
          exclude_binaries=True,
          name='app',
          debug=False,
          strip=False,
          upx=True,
          console=True )
coll = COLLECT(exe,
               a.binaries,
               a.zipfiles,
               a.datas,
               strip=False,
               upx=True,
               name='app')
