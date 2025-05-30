// server.js
const express = require('express');
const path = require('path');
const { WebSocketServer } = require('ws');
const { convert_and_paste_clipboard } = require('./clipboard.js');

function startServer(PORT) {
  const app = express();
  app.use(express.static(path.join(__dirname, '../../mobile-interface')));

  

  const server = app.listen(PORT, () => {
    console.log("Server started on port", PORT);
  });

  const wss = new WebSocketServer({ server });

  wss.on('connection', function connection(ws) {
    ws.on('error', console.error);

    ws.on('message', function message(data) {
      console.log('Received data:', data);
      const parsed_data = JSON.parse(data);

      if (parsed_data.type === "image" && parsed_data.data) {
        convert_and_paste_clipboard(parsed_data.data);
        console.log("Image set to clipboard");
      } else {
        console.log("Invalid data type or missing image");
      }
    });
  });

  return server;
}

module.exports = {
  startServer,
};
