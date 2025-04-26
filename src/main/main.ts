import { app, BrowserWindow, ipcMain } from 'electron'
import started from 'electron-squirrel-startup'
import path from 'node:path'

if (started) {
  app.quit()
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.setMenu(null)

  mainWindow.on('minimize', () => {
    mainWindow.webContents.send('window-state-change', { minimized: mainWindow.isMinimized(), maximized: mainWindow.isMaximized() })
  })

  mainWindow.on('maximize', () => {
    mainWindow.webContents.send('window-state-change', { minimized: mainWindow.isMinimized(), maximized: mainWindow.isMaximized() })
  })

  mainWindow.on('unmaximize', () => {
    mainWindow.webContents.send('window-state-change', { minimized: mainWindow.isMinimized(), maximized: mainWindow.isMaximized() })
  })

  mainWindow.on('restore', () => {
    mainWindow.webContents.send('window-state-change', { minimized: mainWindow.isMinimized(), maximized: mainWindow.isMaximized() })
  })

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL)
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`))
  }

  if (import.meta.env.DEV) {
    mainWindow.webContents.openDevTools()
  }
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipcMain.on('toggle-dev-tools', (event) => {
  if (import.meta.env.DEV) {
    event.sender.toggleDevTools()
  }
})

ipcMain.handle('get-window-state', (event) => {
  const window = BrowserWindow.fromWebContents(event.sender)
  if (window) {
    return { minimized: window.isMinimized(), maximized: window.isMaximized() }
  }
  return { minimized: false, maximized: false }
})

ipcMain.on('window-minimize', (event) => {
  BrowserWindow.fromWebContents(event.sender)?.minimize()
})

ipcMain.on('window-maximize', (event) => {
  const window = BrowserWindow.fromWebContents(event.sender)
  if (!window) {
    return
  }
  if (window.isMaximized()) {
    window.unmaximize()
  } else {
    window.maximize()
  }
})

ipcMain.on('window-close', (event) => {
  BrowserWindow.fromWebContents(event.sender)?.close()
})
