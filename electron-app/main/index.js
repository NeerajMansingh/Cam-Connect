const { app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const {generate_QR_code} = require('./qr_code_generator');



const { startServer } = require('./server');
const { port_getter } = require('./port_finder');
const { start_tunnel } = require('./pairing');

async function init() {
  const PORT = await port_getter();

  startServer(PORT);
  const tunnelUrl = await start_tunnel(PORT);

  //set_url(tunnelUrl);

  console.log("Tunnel available at:", tunnelUrl);
  const qr_code_url=await generate_QR_code(tunnelUrl);
  return qr_code_url;

}

async function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, '../preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    },
  });

  win.loadFile(path.join(__dirname, '../renderer/index.html'));

  const qr_code_url = await init();  // await init here to get QR code

  win.webContents.on('did-finish-load', () => {
    // Send QR code to renderer
    win.webContents.send('qr-code', qr_code_url);
  });
}


app.whenReady().then(() => {
  createWindow();  
});





