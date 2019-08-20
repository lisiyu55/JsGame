var can1;
var can2;

var ctx1;
var ctx2;

var wave;
var halo;
var dust;
var dustPic = [];

var mx;
var my;

var canWidth;
var canHeight;

var bgPic = new Image();

var ane;
var fruit;
var mom;
var baby;

var babyTail = [];
var babyEye = [];
var babyBody = [];

var momTail = [];
var momEye = [];
var momBodyOrange = [];
var momBodyBlue = [];

var data;

var lastTime;
var deltaTime;

document.body.onload = game;
function game() {
    init();
    lastTime = new Date();
    gameloop();
}

function init() {
    can1 = document.getElementById("canvas1");//fishes,dust,UI,circle
    ctx1 = can1.getContext("2d");
    can2 = document.getElementById("canvas2");//background,ane,fruits
    ctx2 = can2.getContext("2d");

    can1.addEventListener('mousemove', onMouseMove, false);

    bgPic.src = "./image/background.jpg";
    canWidth = can1.width;
    canHeight = can1.height;
    ane = new aneObj();
    ane.init();
    fruit = new fruitObj();
    fruit.init();
    mom = new momObj();
    mom.init();
    baby = new babyObj();
    baby.init();
    wave = new waveObj();
    wave.init();
    halo = new haloObj();
    halo.init();
    for (var i = 0; i < 7; i++) {
        dustPic[i] = new Image();
        dustPic[i].src = "./image/dust" + i + ".png";
    }
    dust = new dustObj();
    dust.init();


    data = new dataObj();
    mx = canWidth * 0.5;
    my = canHeight * 0.5;
    //用一个数组来存放鱼尾巴的所有帧
    for (var i = 0; i < 8; i++) {
        babyTail[i] = new Image();
        babyTail[i].src = "./image/babyTail" + i + ".png";
    }

    for (var i = 0; i < 2; i++) {
        babyEye[i] = new Image();
        babyEye[i].src = "./image/babyEye" + i + ".png";
    }

    for (var i = 0; i < 20; i++) {
        babyBody[i] = new Image();
        babyBody[i].src = "./image/babyFade" + i + ".png";
    }

    for (var i = 0; i < 8; i++) {
        momTail[i] = new Image();
        momTail[i].src = "./image/bigTail" + i + ".png";
    }

    for (var i = 0; i < 2; i++) {
        momEye[i] = new Image();
        momEye[i].src = "./image/bigEye" + i + ".png";
    }

    for (var i = 0; i < 8; i++) {
        momBodyOrange[i] = new Image();
        momBodyOrange[i].src = "./image/bigSwim" + i + ".png";
        momBodyBlue[i] = new Image();
        momBodyBlue[i].src = "./image/bigSwimBlue" + i + ".png";

    }
    ctx1.font = "30px Verdana";
    ctx1.textAlign = "center";

}
//为什么绘制背景只能放在loop里面才可以画出来，水草就不是??
function gameloop() {
    // 根据机器性能计算绘制下一帧
    window.requestAnimFrame(gameloop);
    var now = Date.now();
    deltaTime = now - lastTime;
    lastTime = now;
    if (deltaTime > 40) deltaTime = 40;
    drawBackground();

    ane.draw();
    fruitMonitor();
    fruit.draw();
    ctx1.clearRect(0, 0, canWidth, canHeight);
    mom.draw();
    baby.draw();
    momFruitCollision();
    momBabyCollision();
    data.draw();
    wave.draw();
    halo.draw();
    dust.draw();
}

function onMouseMove(e) {
    //在mousemove事件中，上述代码描述的是can1触发事件，
    //其中offSetX表示鼠标相对于画布的横坐标
    if (!data.gameOver) {
        if (e.offSetX || e.layerX) {
            mx = e.offSetX == undefined ? e.layerX : e.offSetX;
            my = e.offSetY == undefined ? e.layerY : e.offSetY;
            // console.log(mx);
        }
    }

}