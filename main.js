// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, shell, dialog } = require('electron')
const path = require('node:path')
const fs = require('fs');

let mainWindow;
function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
  })
  mainWindow.removeMenu();
  mainWindow.maximize();

  // and load the index.html of the app.
  mainWindow.loadFile('view/launcher.html');

  // 종료 이벤트 가로채기
  mainWindow.on('close', (e) => {
    e.preventDefault();
    const response = dialog.showMessageBoxSync(mainWindow, {
      type: 'question',
      buttons: ['Cancel', 'Yes'],
      title: 'Confirm',
      message: 'Do you want to exit?',
    });

    if (response === 1) { // 'Yes' 선택 시 종료
      mainWindow.destroy();
    }
  });

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

ipcMain.on('close-window', (event) => {
  const window = BrowserWindow.getFocusedWindow(); // 현재 포커스된 창
  if (window) {
    window.close();
  }
});

let gameWindow;
ipcMain.on('start-game', () => {
  gameWindow = new BrowserWindow({
    width: 900,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    center: true,
    resizable: false,
    // alwaysOnTop: true,
  });
  gameWindow.removeMenu();
  gameWindow.maximizable = true;

  gameWindow.loadFile('view/game.html');

  gameWindow.on('close', (e) => {
    
    e.preventDefault();
    const response = dialog.showMessageBoxSync(mainWindow, {
      type: 'question',
      buttons: ['Cancel', 'Yes'],
      title: 'Confirm',
      message: 'Do you want to exit?',
    });

    if (response === 1) { // 'Yes' 선택 시 종료
      gameWindow.destroy();
    }
  });

  gameWindow.on('closed', (e) => {
    e.preventDefault();
    exitWindow = new BrowserWindow({
      width: 728,//400
      height: 430,//300
      modal: true,
      parent: gameWindow,
      alwaysOnTop: true,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      },
      resizable: false,
    });
    exitWindow.removeMenu();
  
    exitWindow.loadFile('view/close.html');
  
    exitWindow.on('closed', () => {
      exitWindow = null;
    });
  });

  if (mainWindow) mainWindow.destroy();
});

// 렌더러에서 전환 요청을 받는 이벤트 리스너 설정
ipcMain.on('navigate-to', (event, filename, window) => {
  let focusWindow = BrowserWindow.getFocusedWindow(); // 현재 포커스된 창
  switch (window) {
    case 'main':
      focusWindow = mainWindow;
      break;

    case 'game':
      focusWindow = gameWindow;
      break;
  
    default:
      break;
  }
  if (focusWindow) {
    if (!filename) {
      focusWindow.loadFile('view/404.html');
      return;
    }
    // 파일 존재 여부 확인
    fs.access(path.join(__dirname, filename), fs.constants.F_OK, (err) => {
      if (err) {
        focusWindow.loadFile('view/404.html');
      } else {
        focusWindow.loadFile(filename);
      }
    });
  }
});
//터미널 출력
ipcMain.on('print', (event, text) => {
  process.stdout.write(JSON.stringify(text));
});

ipcMain.on('loadGH', (event, url) => {
  shell.openExternal(url);
});

ipcMain.on('quit', () => {
  app.quit();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
