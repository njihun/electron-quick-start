// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')
const fs = require('fs');

let mainWindow;
function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 900,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    autoHideMenuBar: true,
    center: true,
    resizable: false,
    alwaysOnTop: true,
  })
  mainWindow.maximizable = true;

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}
// 렌더러에서 전환 요청을 받는 이벤트 리스너 설정
ipcMain.on('navigate-to', (event, filename) => {
  if (mainWindow) {
    if (!filename) {
      mainWindow.loadFile('404.html');
      return;
    }
    // 파일 존재 여부 확인
    fs.access(path.join(__dirname, filename), fs.constants.F_OK, (err) => {
      if (err) {
        mainWindow.loadFile('404.html');
      } else {
        mainWindow.loadFile(filename);
      }
    });
  }
});
//터미널 출력
ipcMain.on('print', (event, text) => {
  process.stdout.write(JSON.stringify(text));
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
