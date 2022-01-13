const { app, BrowserWindow } = require('electron')
const path = require('path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    resizable: true,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false
    }
  })

  win.loadURL('https://mail.zoho.com')

  // ipcMain.handle('dark-mode:toggle', () => {
  //   if (nativeTheme.shouldUseDarkColors) {
  //     nativeTheme.themeSource = 'light'
  //   } else {
  //     nativeTheme.themeSource = 'dark'
  //   }
  //   return nativeTheme.shouldUseDarkColors
  // })

  // ipcMain.handle('dark-mode:system', () => {
  //   nativeTheme.themeSource = 'system'
  // })

  win.once('ready-to-show',()=>{
    win.show()
  });
}

app.whenReady().then(() => {
  createWindow()

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})