const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  onQRCode: (callback) => ipcRenderer.on('qr-code', (event, data) => callback(data)),
});
