var app = require('http').createServer();
//通过socket.io把http包装成io的形式
var io = require('socket.io')(app);

var PORT = 3000

var clientCount = 0
app.listen(PORT);

io.on('connection',function(socket){
    clientCount++;
    socket.nickname = 'user' + clientCount;
    io.emit('enter',socket.nickname + ' comes in');

    socket.on('message',function(str){
        io.emit('message',socket.nickname + ' says: ' + str)
    })

    socket.on('disconnect',function(){
        io.emit('leave',socket.nickname + ' left')
    })

})


console.log("websocket server listening on port " + PORT);
