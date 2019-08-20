var momObj = function () {
    this.x;
    this.y;
    this.angle;
    // this.bigEye = new Image();
    // this.bigBody = new Image();
    // this.bigTail = new Image();
    //计时器
    this.momTailTimer = 0;
    this.momTailCount = 0;
    this.momBodyCount = 0;

    //对于睁开眼睛和闭着眼睛两种状态持续时间固定，但是切换时间间隔不固定
    this.momEyeTimer = 0;
    this.momEyeCount = 0;
    this.momEyeInterval = 1000;
}

momObj.prototype.init = function () {
    this.x = canWidth * 0.5;
    this.y = canHeight * 0.5;
    this.angle = 0;
    // this.bigEye.src = "./image/bigEye0.png";
    // this.bigBody.src = "./image/bigSwim0.png";
    // this.bigTail.src = "./image/bigTail0.png";
}
momObj.prototype.draw = function () {
    //lerp x,y
    //将this.x变为mx + (this.x - mx)*0.97
    //将this.y变为my + (this.y - my)*0.97
    // this.x = lerpDistance(mx, this.x, 0.97);
    // this.y = lerpDistance(my, this.y, 0.97);
    this.x = this.x + (mx - this.x) * 0.03;
    this.y = this.y + (my - this.y) * 0.03;
    //delta angle
    //Math.atan2(y,x)
    var deltaY = my - this.y;
    var deltaX = mx - this.x;
    var beta = Math.atan2(-deltaY, -deltaX);
    //lerp angle
    //this.angle = beta + (this.angle - beta)*0.6;
    this.angle = lerpAngle(beta, this.angle, 0.6);
    // this.angle = this.angle + (beta - this.angle) * 0.6;

    //tail babyTailCount
    //deltaTime表示的是相邻两帧之间的间隔
    this.momTailTimer += deltaTime;
    if (this.momTailTimer > 50) {
        this.momTailCount = (this.momTailCount + 1) % 8;
        this.momTailTimer %= 50;
    }

    this.momEyeTimer += deltaTime;
    if (this.momEyeTimer > this.momEyeInterval) {
        this.momEyeCount = (this.momEyeCount + 1) % 2;
        this.momEyeTimer %= this.momEyeInterval;

        if (this.momEyeCount == 0) {
            this.momEyeInterval = Math.random() * 1500 + 2000;
        }
        else {
            this.momEyeInterval = 200;
        }
    }

    ctx1.save();
    //translate 重新映射画布上的原点位置
    ctx1.translate(this.x, this.y);
    ctx1.rotate(this.angle);
    var momTailCount = this.momTailCount;
    var momEyeCount = this.momEyeCount;
    var momBodyCount = this.momBodyCount;
    if (data.double == 1) {
        ctx1.drawImage(momBodyOrange[momBodyCount], -momBodyOrange[momBodyCount].width * 0.5, -momBodyOrange[momBodyCount].height * 0.5);
    }
    else {
        ctx1.drawImage(momBodyBlue[momBodyCount], -momBodyBlue[momBodyCount].width * 0.5, -momBodyBlue[momBodyCount].height * 0.5);
    }
    ctx1.drawImage(momEye[momEyeCount], -momEye[momEyeCount].width * 0.5, -momEye[momEyeCount].height * 0.5);

    ctx1.drawImage(momTail[momTailCount], -momTail[momTailCount].width * 0.5 + 30, -momTail[momTailCount].height * 0.5);

    ctx1.restore();
}