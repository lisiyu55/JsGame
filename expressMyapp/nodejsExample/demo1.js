//阻塞与非阻塞调用   阻塞调用时按顺序执行 会比较费时
//非阻塞是可以让一边读文件一边执行其他操作，（使用回调函数将读取内容作为参数返回给回调函数）
//在读取完成之后再操作，不会浪费时间
var fs = require("fs");

// var data = fs.readFileSync('E:\\Front-endStudy\\JsGame\\tetris\\expressMyapp\\nodejsExample\\input.txt');

// console.log(data.toString());
// console.log("程序执行结束!");

fs.readFile('E:\\Front-endStudy\\JsGame\\tetris\\expressMyapp\\nodejsExample\\input.txt', function (err, data) {
    if (err) return console.error(err);
    console.log(data.toString());
});

console.log("程序执行结束!");