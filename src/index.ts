import { app, BrowserWindow, globalShortcut, ipcMain, screen } from 'electron';
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import { enableLiveReload } from 'electron-compile';
import * as path from 'path';
import * as url from 'url';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: Electron.BrowserWindow | null = null;

const isDevMode = process.execPath.match(/[\\/]electron/);

if (isDevMode) {
  enableLiveReload({ strategy: 'react-hmr' });
}

const createWindow = async () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 600,
    height: 700,
    frame: false,
    icon: path.join(__dirname, '../assets/icons/win/logo.ico'), //for windows
  });

  mainWindow.maximize();

  console.log(screen.getPrimaryDisplay().size);

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';

  //mainWindow.maximize();

  // Open the DevTools.
  if (isDevMode) {
    await installExtension(REACT_DEVELOPER_TOOLS);
    mainWindow.webContents.openDevTools();
  }

  //Dev global shortcuts
  globalShortcut.register('f5', function () {
    if (mainWindow != null) {
      mainWindow.reload();
    }
  });

  globalShortcut.register('CommandOrControl+R', function () {
    if (mainWindow != null) {
      mainWindow.reload();
    }
  });

  globalShortcut.register('CommandOrControl+I', function () {
    if (mainWindow != null) {
      mainWindow.webContents.toggleDevTools();
    }
  });

  //globalShortcut.register('CommandOrControl+W', close);

  // Emitted when the window is closed.
  mainWindow.on('closed', close);
};

//Catch Quit callback
ipcMain.on('closed', close);

// Dereference the window object, usually you would store windows
// in an array if your app supports multi windows, this is the time
// when you should delete the corresponding element.
function close() {
  mainWindow = null;
  app.quit();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});