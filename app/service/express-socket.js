/**
 * express 实现socket通信
 */
const path = require('path');
const express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8000, function() {
  console.log('listening on 8000 ...');
});

app.use(express.static(path.join(__dirname, '../../public')));

io.on('connection', function(socket) {
  console.log('socket connected');
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function(data) {
    console.log(data);
  });
});
