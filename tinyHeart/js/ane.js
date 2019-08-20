var aneObj = function () {
    //使用贝塞尔曲线和正弦曲线来绘制飘来飘去的海草
    //有一个起始点、控制点、结束点（结束点是用正弦曲线）

    this.rootx = [];
    this.headx = [];
    this.heady = [];
    this.alpha = 0;
    this.amp = [];
}
aneObj.prototype.num = 50;
aneObj.prototype.init = function () {
    for (var i = 0; i < this.num; i++) {
        this.rootx[i] = i * 16 + Math.random() * 20;
        this.headx[i] = this.rootx[i];
        this.heady[i] = canHeight - 250 + Math.random() * 50;
        this.amp[i] = Math.random() * 50 + 50;
    }
}
aneObj.prototype.draw = function () {
    ctx2.save();
    ctx2.globalAlpha = 0.6;
    ctx2.lineWidth = 20;
    ctx2.lineCap = "round";
    ctx2.strokeStyle = "#3b154e";
    this.alpha += deltaTime * 0.0008;
    var l = Math.sin(this.alpha);
    for (var i = 0; i < this.num; i++) {
        ctx2.beginPath();
        ctx2.moveTo(this.rootx[i], canHeight);
        this.headx[i] = this.rootx[i] + l * this.amp[i];
        ctx2.quadraticCurveTo(this.rootx[i], canHeight - 100, this.headx[i], this.heady[i]);

        ctx2.stroke();
    }
    ctx2.restore();
    //对于save\restore表示的是一对之间的样式只在他们两个之间起作用
}

