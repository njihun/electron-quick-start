/**
 * The preload script runs before `index.html` is loaded
 * in the renderer. It has access to web APIs as well as
 * Electron's renderer process modules and some polyfilled
 * Node.js functions.
 *
 * https://www.electronjs.org/docs/latest/tutorial/sandbox
 */
const { contextBridge, ipcRenderer } = require('electron');

// contextBridge를 사용하여 ipcRenderer를 안전하게 노출
contextBridge.exposeInMainWorld('electronAPI', {
  closeWindow: () => ipcRenderer.send('close-window'),
  startGame: () => ipcRenderer.send('start-game'),
  navigateTo: (filename, window) => ipcRenderer.send('navigate-to', filename, window),
  print: (text = 'Test') => ipcRenderer.send('print', text),
  loadGH: (url) => ipcRenderer.send('loadGH', url),
  quit: () => ipcRenderer.send('quit'),
  logIn: (id, pwd) => ipcRenderer.invoke('log-in', id, pwd), // 성공 여부 반환을 위해 렌더러 프로세스에서 비동기로 처리할 것!
  signUp: (id, pwd) => ipcRenderer.invoke('sign-up', id, pwd), // 성공 여부 반환을 위해 렌더러 프로세스에서 비동기로 처리할 것!
});

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})
