//判断果实与大鱼的距离
function momFruitCollision() {
    if (!data.gameOver) {
        for (var i = 0; i < fruit.num; i++) {
            if (fruit.alive[i]) {
                //计算长度
                var l = calLength2(fruit.x[i], fruit.y[i], mom.x, mom.y);
                if (l < 900) {
                    //fruit eaten
                    data.fruitNum++;
                    mom.momBodyCount++;
                    if (mom.momBodyCount > 7) {
                        mom.momBodyCount = 7;
                    }
                    fruit.dead(i);
                    
                    if (fruit.fruitType[i] == "blue" && data.double == 1) {
                        data.double = 2;
                        mom.momBodyCount = 1;
                    }
                    else if (fruit.fruitType[i] == "orange" && data.double == 2) {
                        data.double = 1;
                        mom.momBodyCount = 1;
                    }
                    wave.born(fruit.x[i],fruit.y[i]);
                }
            }
        }
    }
}

//mom baby collision
function momBabyCollision() {
    if (!data.gameOver) {
        if (data.fruitNum > 0) {
            var l = calLength2(mom.x, mom.y, baby.x, baby.y);
            if (l < 900) {
                //baby recover
                baby.babyBodyCount = 0;
                //data => 0
                // data.reset();
                mom.momBodyCount = 0;
                data.addScore();
                halo.born(baby.x,baby.y);
            }
        }
    }


}