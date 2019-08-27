
var ws = require("nodejs-websocket")
//导入nodejs-websocket包，创建一个监听3000端口的服务器被连接时回调的函数（事件处理程序）

var PORT = 3000
// Scream server example: "hi" -> "HI!!!"
//创建一个服务器对象监听3000端口
var server = ws.createServer(function (conn) {
    //每当有一个新用户请求连接服务器会调用这个回调函数
    console.log("New connection")
    conn.on("text", function (str) {
        console.log("Received " + str)
        //服务器把用户发来的信息原封不动发回给用户
        conn.sendText(str)
    })
    conn.on("close", function (code, reason) {
        console.log("Connection closed")
    })
    conn.on("error", function (err) {
        console.log("handle err");
        console.log(err);
    })
}).listen(PORT)

console.log("websocket server listening on port " + PORT);