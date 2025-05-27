const express = require('express');
const app = express();
const PORT=3000;
const path = require('path');
const {WebSocketServer}=require('ws')



app.use(express.static(path.join(__dirname, '../../mobile-interface')));


app.get('/', (req, res) => {
  res.send('hello world');
});

const server=app.listen(PORT,()=>{
    console.log("console started on port 3000");
});

const wss = new WebSocketServer({server});

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

  ws.send('something');
});
