var app = require('http').createServer();
var io = require('socket.io')(app);

app.listen(3000);

io.on('connection', function (socket) {
  //emit发送数据，socket是连接
  //socket可以直接发送对象，不需要用json解析反解析  可以on任何东西，可以添加自定义事件处理程序
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});