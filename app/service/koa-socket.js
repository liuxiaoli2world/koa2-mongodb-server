/**
 * koa 实现socket通信
 */
const path = require('path');
const Koa = require('koa');
const static = require('koa-static');

const app = new Koa();
const server = app.listen(8000, () => {
  console.log('listening to requests on 8000.');
});

app.use(static(path.join(__dirname, '../../public')));

const io = require('socket.io')(server);
io.on('connection', socket => {
  console.log('初始化成功！下面可以用socket绑定事件和触发事件了');
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function(data) {
    console.log(data);
  });
});
