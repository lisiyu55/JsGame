var boxObj = function () {//boxObj是每次出来的一个方块对象
    this.x;//记录shape所在的行和列  x是列  y是行
    this.y;
    this.alive;
    this.type;
    this.shape;
    this.shapeInd;
    this.spd;
    //计时器
    this.timer;
    this.boxSize;
}
boxObj.prototype.init = function () {
    var pos = Math.floor(Math.random() * 6);
    this.timer = 0;
    this.x = pos;
    this.y = 0;
    this.boxSize = 100;
    this.shapeInd = 0;
    this.type = Math.floor(Math.random() * 6);
    this.alive = true;
    this.spd = 300;
    this.shape = [];
    for (var k = 0; k < 4; k++) {
        this.shape[k] = [];
        for (var j = 0; j < 4; j++) {
            this.shape[k][j] = [];
            for (var t = 0; t < 4; t++) {
                this.shape[k][j][t] = 0;
            }
        }
    }
    if (this.type == 0) {
        this.shape[0][0][1] = 1;
        this.shape[0][0][2] = 1;
        this.shape[0][1][1] = 1;
        this.shape[0][1][2] = 1;

        this.shape[1][0][1] = 1;
        this.shape[1][0][2] = 1;
        this.shape[1][1][1] = 1;
        this.shape[1][1][2] = 1;

        this.shape[2][0][1] = 1;
        this.shape[2][0][2] = 1;
        this.shape[2][1][1] = 1;
        this.shape[2][1][2] = 1;

        this.shape[3][0][1] = 1;
        this.shape[3][0][2] = 1;
        this.shape[3][1][1] = 1;
        this.shape[3][1][2] = 1;
    }
    else if (this.type == 1) {
        this.shape[0][0][3] = 1;
        this.shape[0][1][1] = 1;
        this.shape[0][1][2] = 1;
        this.shape[0][1][3] = 1;

        this.shape[1][0][1] = 1;
        this.shape[1][0][2] = 1;
        this.shape[1][1][2] = 1;
        this.shape[1][2][2] = 1;

        this.shape[2][0][1] = 1;
        this.shape[2][1][1] = 1;
        this.shape[2][0][2] = 1;
        this.shape[2][0][3] = 1;

        this.shape[3][0][1] = 1;
        this.shape[3][1][1] = 1;
        this.shape[3][2][1] = 1;
        this.shape[3][2][2] = 1;
    }
    else if (this.type == 2) {
        this.shape[0][0][0] = 1;
        this.shape[0][1][0] = 1;
        this.shape[0][1][1] = 1;
        this.shape[0][1][2] = 1;

        this.shape[1][0][1] = 1;
        this.shape[1][1][1] = 1;
        this.shape[1][2][1] = 1;
        this.shape[1][2][0] = 1;

        this.shape[2][0][0] = 1;
        this.shape[2][0][1] = 1;
        this.shape[2][0][2] = 1;
        this.shape[2][1][2] = 1;

        this.shape[3][0][0] = 1;
        this.shape[3][0][1] = 1;
        this.shape[3][1][0] = 1;
        this.shape[3][2][0] = 1;
    }
    else if (this.type == 3) {
        this.shape[0][0][1] = 1;
        this.shape[0][1][1] = 1;
        this.shape[0][2][1] = 1;
        this.shape[0][3][1] = 1;

        this.shape[1][1][0] = 1;
        this.shape[1][1][1] = 1;
        this.shape[1][1][2] = 1;
        this.shape[1][1][3] = 1;

        this.shape[2][0][1] = 1;
        this.shape[2][1][1] = 1;
        this.shape[2][2][1] = 1;
        this.shape[2][3][1] = 1;

        this.shape[3][1][0] = 1;
        this.shape[3][1][1] = 1;
        this.shape[3][1][2] = 1;
        this.shape[3][1][3] = 1;
    }
    else if (this.type == 4) {

        this.shape[0][0][1] = 1;
        this.shape[0][1][0] = 1;
        this.shape[0][1][1] = 1;
        this.shape[0][1][2] = 1;

        this.shape[1][0][1] = 1;
        this.shape[1][1][0] = 1;
        this.shape[1][1][1] = 1;
        this.shape[1][2][1] = 1;

        this.shape[2][2][1] = 1;
        this.shape[2][1][0] = 1;
        this.shape[2][1][1] = 1;
        this.shape[2][1][2] = 1;

        this.shape[3][0][1] = 1;
        this.shape[3][1][1] = 1;
        this.shape[3][1][2] = 1;
        this.shape[3][2][1] = 1;
    }
    else if (this.type == 5) {
        this.shape[0][0][0] = 1;
        this.shape[0][0][1] = 1;
        this.shape[0][1][1] = 1;
        this.shape[0][1][2] = 1;

        this.shape[1][0][1] = 1;
        this.shape[1][1][1] = 1;
        this.shape[1][1][0] = 1;
        this.shape[1][2][0] = 1;

        this.shape[2][0][0] = 1;
        this.shape[2][0][1] = 1;
        this.shape[2][1][1] = 1;
        this.shape[2][1][2] = 1;

        this.shape[3][0][1] = 1;
        this.shape[3][1][1] = 1;
        this.shape[3][1][0] = 1;
        this.shape[3][2][0] = 1;
    }
    else if (this.type == 6) {
        this.shape[0][0][2] = 1;
        this.shape[0][0][3] = 1;
        this.shape[0][1][1] = 1;
        this.shape[0][1][2] = 1;

        this.shape[1][0][2] = 1;
        this.shape[1][1][3] = 1;
        this.shape[1][2][3] = 1;
        this.shape[1][1][2] = 1;

        this.shape[2][0][2] = 1;
        this.shape[2][0][3] = 1;
        this.shape[2][1][1] = 1;
        this.shape[2][1][2] = 1;

        this.shape[3][0][2] = 1;
        this.shape[3][1][3] = 1;
        this.shape[3][2][3] = 1;
        this.shape[3][1][2] = 1;
    }
}



boxObj.prototype.draw = function () {
    //每种方块对应自己的颜色"purple""blue""red""orange""yellow""green""grey"
    ctx.save();
    ctx.fillStyle = colors[this.type];

    ctx.strokeStyle = "rgb(139,144,163)";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var j = 0; j < 4; j++) {
        for (var k = 0; k < 4; k++) {
            if (this.shape[this.shapeInd][j][k] == 1) {
                ctx.fillRect((this.x + k) * squareSize + canMarwidth, (this.y + j) * squareSize + canMarheight, squareSize, squareSize);
            }
            ctx.stroke();
        }
    }
    for (var j = 0; j < 19; j++) {
        for (var k = 1; k < 11; k++) {
            if (globalBox[j][k] >= 1) {
                var index = globalBox[j][k] - 1
                ctx.fillStyle = colors[index];
                ctx.strokeStyle = "rgb(139,144,163)";
                var locY = j * squareSize + canMarheight;
                var locX = (k - 1) * squareSize + canMarwidth;
                ctx.fillRect(locX, locY, squareSize, squareSize);
                ctx.stroke();
            }
        }
    }
    ctx.restore();

    this.timer += deltaTime;

    if (this.timer > 500) {
        box.downOne();
        this.timer %= 500;
    }
    ctx.save();
    ctx.fillStyle = "white";
    ctx.font = "30px Calibri";
    ctx.shadowBlur = 10;
    ctx.shadowColor = "white";
    ctx.fillText("score     ", 0.8 * canWidth, 0.2 * canHeight);
    ctx.fillText(score, 0.85 * canWidth, 0.29 * canHeight);
    ctx.font = "20px Calibri";
    ctx.fillText("下一个", 0.81 * canWidth, 0.4 * canHeight);
    ctx.restore();

    for (var j = 0; j < 4; j++) {
        for (var k = 0; k < 4; k++) {
            ctx.fillStyle = colors[next.type];
            if (next.shape[next.shapeInd][j][k] == 1) {
                ctx.fillRect(0.78 * canWidth + k * squareSize, j * squareSize + 0.44 * canHeight, squareSize - 1, squareSize - 1);
                ctx.strokeStyle = "rgb(139,144,163)";
                ctx.stroke();
            }
        }
    }

}

boxObj.prototype.downTwo = function () {
    for (var i = 0; i < 2; i++) {
        this.y += 1;
        if (this.detect()) {
            this.y -= 1;
            this.copyGlobal();
            eliminate();
            collisionFlag = true;
            break;
        }
    }

}

boxObj.prototype.left = function () {
    //把shape往左移一格 比较shape和globalBox是否有冲突
    this.x--;
    if (this.detect()) {
        this.x++;
    }
}

boxObj.prototype.right = function () {
    //把shape往左移一格 比较shape和globalBox是否有冲突
    this.x++;
    if (this.detect()) {
        this.x--;
    }
}

boxObj.prototype.downOne = function () {
    this.y++;
    if (this.detect()) {
        this.y--;
        this.copyGlobal();
        eliminate();
        collisionFlag = true;
    }

}
boxObj.prototype.detect = function () {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (this.shape[this.shapeInd][i][j] == 1 && globalBox[this.y + i][this.x + j + 1] >= 1) {
                return true;
            }
        }
    }
    return false;
}


boxObj.prototype.copyGlobal = function () {
    this.alive = false;
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (this.shape[this.shapeInd][i][j] == 1) {
                globalBox[this.y + i][this.x + j + 1] = this.type + 1;
            }
        }
    }
    // console.log(globalBox);
}



boxObj.prototype.transform = function () {
    this.shapeInd += 1;
    this.shapeInd %= 4;
    // for(var )
}

