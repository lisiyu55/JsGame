function eliminate() {
    var num = 0;
    for (var i = 18; i >= 0; i--) {
        num = 0;
        for (var j = 1; j < 11; j++) {
            if (globalBox[i][j] >= 1) {
                num++;
            }
            else {
                break;
            }
        }
        if (num == 10) {
            for (var j = i - 1; j >= 0 && j < 18; j--) {
                for (var k = 1; k < 11; k++) {
                    globalBox[j + 1][k] = globalBox[j][k];
                }
            }
            for (var t = 1; t < 11; t++) {
                globalBox[0][t] = 0;
            }
            i++;
            score +=20;
        }
    }
}
