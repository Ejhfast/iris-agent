const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    height: 800,
    width: 1200
  })

  // load the local HTML file
  let url = require('url').format({
    protocol: 'file',
    slashes: true,
    pathname: require('path').join(__dirname, '/dist/index.html')
  })
  console.log(url)
  mainWindow.loadURL(url)
})

pyProc = null;

const createPyProc = () => {
  const path = require('path').join(__dirname, '');
  console.log(pyProc);
  if (pyProc === null){
    pyProc = require('child_process').spawn('bash', [path+'/'+'start_backend.sh', path])
    console.log(pyProc);
  }
  if (pyProc != null) {
    console.log('child process success')
  }
}

const exitPyProc = () => {
  const path = require('path').join(__dirname, '');
  killit = require('child_process').spawn('bash', [path+'/'+'stop_backend.sh'])
  pyProc.kill()
}

app.on('ready', createPyProc)
app.on('will-quit', exitPyProc)
