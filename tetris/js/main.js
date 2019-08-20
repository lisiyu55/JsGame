
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var canvas2 = document.getElementById("canvas2");
var ctx2 = canvas.getContext("2d");
canvas.addEventListener('keydown', onKeyDown, false);
canvas.focus();
canvas2.addEventListener('keydown', onKeyDown, false);
canvas2.focus();

var score;
var next;

var lastTime, deltaTime;
var canWidth, canHeight;
var colors;
var box;
var now;
var gameover;
var canMarwidth;
var canMarheight;
var squareSize;
var collisionFlag;
var boxes;
//19*10的二维数组（值为 0/1表示该位置有没有格子）
var globalBox = [];
document.body.onload = function () {
    init();
    lastTime = new Date();
    drawBoard();
    drawloop();
    // drawBox();
}
//绘制表格
var drawBoard = function () {
    ctx2.strokeStyle = "white";
    for (var i = 0; i < 20; i++) {
        ctx.moveTo(125, 10 + i * 25);
        ctx.lineTo(375, 10 + i * 25);
        ctx.stroke();
    }
    for (var i = 0; i < 11; i++) {
        ctx.moveTo(125 + i * 25, 10);
        ctx.lineTo(125 + i * 25, 485);
        ctx.stroke();
    }
}
//init
function init() {
    //globalBox  20*12  多一行 两列
    //0表示没有格子，1-7表示紫、蓝、红、橙、黄、绿、灰
    colors = ["rgb(48,134,253)", "rgb(124,209,66)", "rgb(143,205,204)", "rgb(160,69,51)", "rgb(3,57,142)", "rgb(199,199,65)", "rgb(93,155,116)"];
    collisionFlag = false;
    score = 0;
    squareSize = 25;
    gameover = false;
    canMarwidth = 125;
    canMarheight = 10;

    for (var i = 0; i < 20; i++) {
        globalBox[i] = [];
        for (var j = 0; j < 12; j++) {
            globalBox[i][j] = 0;
        }
    }
    for (var i = 0; i < 20; i++) {
        globalBox[i][0] = 1;
        globalBox[i][11] = 1;
    }
    for (var i = 0; i < 12; i++) {
        globalBox[19][i] = 1;
    }
    canHeight = canvas.height;
    canWidth = canvas.width;

    box = new boxObj();
    box.init();
    next = new boxObj();
    next.init();
    // ctx1.fillText("num    " + this.fruitNum, w * 0.5, h - 50);

}
function drawloop() {
    // if (!gameover) {
    window.requestAnimationFrame(drawloop);
    now = Date.now();
    deltaTime = now - lastTime;
    lastTime = now;
    if (deltaTime > 40) deltaTime = 40;
    box.draw();

    if (collisionFlag) {
        box = next;
        next = new boxObj();
        next.init();
        if (box.detect()) {
            alert("Game over!");
            for (var i = 0; i < 20; i++) {
                for (var j = 0; j < 12; j++) {
                    globalBox[i][j] = 0;
                }
            }
            for (var i = 0; i < 20; i++) {
                globalBox[i][0] = 1;
                globalBox[i][11] = 1;
            }
            for (var i = 0; i < 12; i++) {
                globalBox[19][i] = 1;
            }
        }
        collisionFlag = false;
    }
    // }

}
// document.onkeydown = function (event) {
function onKeyDown(event) {
    var code = window.event ? event.keyCode : event.which;
    if (code == 38) {//up
        box.transform();
    }
    else if (code == 40) {//down
        box.downTwo();
    }
    else if (code == 39) {//right
        box.right();
    }
    else if (code == 37) {//left
        box.left();
    }
}

