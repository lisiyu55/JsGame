//有一个食物池，有足够的食物在排队
//屏幕果实=15
//出现在屏幕中的食物有两种状态，一、在水草上生长 二、向上浮动

var fruitObj = function () {
    this.alive = [];
    this.x = [];
    this.y = [];
    this.l = [];
    this.fruitType = [];
    this.spd = [];
    this.orange = new Image();
    this.blue = new Image();
    this.aneNo = [];
}
fruitObj.prototype.num = 30;
fruitObj.prototype.init = function () {
    for (var i = 0; i < this.num; i++) {
        this.alive[i] = false;
        this.x[i] = 0;
        this.y[i] = 0;
        this.aneNo[i] = 0;
        this.fruitType[i] = "";
        this.spd[i] = Math.random() * 0.017 + 0.003;
    }
    this.orange.src = "./image/fruit.png";
    this.blue.src = "./image/blue.png";
}
fruitObj.prototype.draw = function () {
    for (var i = 0; i < this.num; i++) {
        //console.log(this.l[i]);
        if (this.alive[i]) {
            if(this.fruitType[i]== "blue"){
                var pic = this.blue;
            }
            else{
                var pic = this.orange;
            }
            if (this.l[i] <= 11) {//grow
                this.x[i] = ane.headx[this.aneNo[i]];
                this.y[i] = ane.heady[this.aneNo[i]];
                this.l[i] += this.spd[i] * deltaTime;
            }
            else {
                this.y[i] -= this.spd[i] * 7 * deltaTime;
            }
            //console.log(this.l[i]);

            ctx2.drawImage(pic, this.x[i] - this.l[i] * 0.5, this.y[i] - this.l[i] * 0.5, this.l[i], this.l[i]);
            if (this.y[i] < 10) {
                this.alive[i] = false;
            }
        }

    }
}
fruitObj.prototype.born = function (i) {
    this.aneNo[i] = Math.floor(Math.random() * ane.num);
    this.l[i] = 0;
    this.alive[i] = true;
    var ran = Math.random();
    if(ran <0.2){
        this.fruitType[i] = "blue";
    }
    else{
        this.fruitType[i] = "orange";
    }
}
fruitObj.prototype.dead = function(i){
    this.alive[i] = false;
}


function fruitMonitor() {
    var num = 0;
    for (var i = 0; i < fruit.num; i++) {
        if (fruit.alive[i]) num++;
    }
    if (num < 15) {
        //send fruit
        sendFruit();
        return;
    }
}

function sendFruit() {
    for (var i = 0; i < fruit.num; i++) {
        if (!fruit.alive[i]) {
            fruit.born(i);
            return;
        }
    }
}