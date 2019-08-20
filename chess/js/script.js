var over = false;
var chessBoard = [];
for (var i = 0; i < 15; i++) {
    chessBoard[i] = [];
    for (var j = 0; j < 15; j++) {
        chessBoard[i][j] = 0;
    }
}
var me = true;

//赢法的数组  一个三维数组
var win = [];
for (var i = 0; i < 15; i++) {
    win[i] = [];
    for (var j = 0; j < 15; j++) {
        win[i][j] = [];
    }
}
var count = 0;
//count表示的是第几种赢法
//前面二维数组中为true的点表示放上棋子  五个连成一条线
//所有的横线赢法
for (var i = 0; i < 15; i++) {
    for (var j = 0; j < 11; j++) {
        
        for (var k = 0; k < 5; k++) {
            win[i][j + k][count] = true;
        }
        count++;
    }
}

//所有的竖线赢法
for (var i = 0; i < 15; i++) {
    for (var j = 0; j < 11; j++) {
        
        for (var k = 0; k < 5; k++) {
            win[j + k][i][count] = true;
        }
        count++;
    }
}

//所有的斜线
for (var i = 0; i < 11; i++) {
    for (var j = 0; j < 11; j++) {
        
        for (var k = 0; k < 5; k++) {
            win[i + k][j + k][count] = true;
        }
        count++;
    }
}
//所有的反斜线
for (var i = 0; i < 11; i++) {
    for (var j = 14; j > 3; j--) {
        
        for (var k = 0; k < 5; k++) {
            win[i + k][j - k][count] = true;
        }
        count++;
    }
}
//赢法统计数组 记录的是第几种赢法对应棋盘上的棋子数量
var myWin = [];
var computerWin = [];

for (var i = 0; i < count; i++) {
    myWin[i] = 0;
    computerWin[i] = 0;
}

var chess = document.getElementById("chess");
var context = chess.getContext("2d");

context.strokeStyle = "#BFBFBF";
//直接定义图片之后，无法绘制出来
//因为图片加载需要时间，所以用一个回调函数
//让加载图片的同时先执行下面的代码
var logo = new Image();
logo.src = "image/logo.png";
logo.onload = function () {
    drawChessBoard();
}
//如果出现图片加载在绘制表格之后
//图片会遮挡住表格一部分  这时需要把绘制表格的代码放入回调函数中
var drawChessBoard = function () {
    for (var i = 0; i < 15; i++) {
        context.moveTo(15 + i * 30, 15);
        context.lineTo(15 + i * 30, 435);
        context.stroke();
        context.moveTo(15, 15 + i * 30);
        context.lineTo(435, 15 + i * 30);
        context.stroke();
    }
}

var oneStep = function (i, j, me) {
    context.beginPath();
    context.arc(15 + i * 30, 15 + j * 30, 13, 0, 2 * Math.PI);
    //两个圆的圆心坐标及半径，绘制两个圆的颜色
    //两个圆之间的颜色有定义的两种颜色渐变填充
    context.closePath();
    var gradient = context.createRadialGradient(15 + i * 30 + 2, 15 + j * 30 - 2, 13, 15 + i * 30 + 2, 15 + j * 30 - 2, 0);
    if (me) {
        gradient.addColorStop(0, "#0A0A0A");
        gradient.addColorStop(1, "#636766");
    }
    else {
        gradient.addColorStop(0, "#D1D1D1");
        gradient.addColorStop(1, "#F9F9F9");
    }
    context.fillStyle = gradient;
    context.fill();
    // console.log("fsf");
}

// chess.addEventListener("click",);

chess.onclick = function (e) {
    if (over) {
        return;
    }
    if (!me) {
        return;
    }

    var x = e.offsetX;
    var y = e.offsetY;
    var i = Math.floor(x / 30);
    var j = Math.floor(y / 30);
    if (chessBoard[i][j] == 0) {
        oneStep(i, j, me);
        chessBoard[i][j] = 1;
        for (var k = 0; k < count; k++) {
            if (win[i][j][k]) {
                myWin[k]++;
                computerWin[k] = 6;
                //如果存在myWin[k]==5说明第k种赢法被实现
                if (myWin[k] == 5) {
                    setTimeout(function () {
                        window.alert("你赢了");
                    }, 0);
                    over = true;
                }
            }

        }
        if (!over) {
            me = !me;
            computerAI();
        }

    }

}

var computerAI = function () {
    var myScore = [];
    var computerScore = [];
    var max = 0;
    var u = 0, v = 0;
    for (var i = 0; i < 15; i++) {
        myScore[i] = [];
        computerScore[i] = [];
        for (var j = 0; j < 15; j++) {
            myScore[i][j] = 0;
            computerScore[i][j] = 0;
        }
    }
    for (var i = 0; i < 15; i++) {
        for (var j = 0; j < 15; j++) {
            if (chessBoard[i][j] == 0) {
                for (var k = 0; k < count; k++) {
                    if (win[i][j][k]) {
                        if (myWin[k] == 1) {
                            myScore[i][j] += 200;
                        } else if (myWin[k] == 2) {
                            myScore[i][j] += 400;
                        } else if (myWin[k] == 3) {
                            myScore[i][j] += 2000;
                        } else if (myWin[k] == 4) {
                            myScore[i][j] += 10000;
                        }

                        if (computerWin[k] == 1) {
                            computerScore[i][j] += 220;
                        } else if (computerWin[k] == 2) {
                            computerScore[i][j] += 420;
                        } else if (computerWin[k] == 3) {
                            computerScore[i][j] += 2100;
                        } else if (computerWin[k] == 4) {
                            computerScore[i][j] += 20000;
                        }
                    }
                }
                if (myScore[i][j] > max) {
                    max = myScore[i][j];
                    u = i;
                    v = j;
                } else if (myScore[i][j] == max) {
                    if (computerScore[i][j] > computerScore[u][v]) {
                        u = i;
                        v = j;
                    }
                }
                if (computerScore[i][j] > max) {
                    max = computerScore[i][j];
                    u = i;
                    v = j;
                } else if (computerScore[i][j] == max) {
                    if (myScore[i][j] > myScore[u][v]) {
                        u = i;
                        v = j;
                    }
                }
            }
        }
    }
    oneStep(u, v, false);
    chessBoard[u][v] = 2;
    for (var k = 0; k < count; k++) {
        if (win[u][v][k]) {
            computerWin[k]++;
            myWin[k] = 6;
            //如果存在myWin[k]==5说明第k种赢法被实现
            if (computerWin[k] == 5) {
                setTimeout(function () {
                    window.alert("计算机赢了");
                }, 0);
                over = true;
            }
        }
    }
    if (!over) {
        me = !me;
    }
}


