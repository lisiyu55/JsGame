// setTimeout(function(){
//     for(var i = 0; i < 100000000; i++){}
//     console.log('timer a');
// }, 0)

// for(var j = 0; j < 5; j++){
//     console.log(j);
// }

// setTimeout(function(){
//     console.log('timer b');
// }, 0)

// function waitFiveSeconds(){
//     var now = (new Date()).getTime();
//     while(((new Date()).getTime() - now) < 5000){}
//     console.log('finished waiting');
// }

// document.addEventListener('click', function(){
//     console.log('click');
// })

// console.log('click begin');
// waitFiveSeconds();

// setTimeout(function () { console.log('end 3'); }, 1000);

// setTimeout(function () { console.log('end 2'); }, 2000);

// setTimeout(function () { console.log('end 1'); }, 100);

// console.log("end");

var obj = {
    value: null
};
var queue = function (funcs, scope) {
    (function next() {
        if (funcs.length > 0) {
            var f = funcs.shift();
            f.apply(scope, [next].concat(Array.prototype.slice.call(arguments, 0)));
        }
    })();
};
queue([
    function (callback) {
        var self = this;
        setTimeout(function () {
            self.value = 10;
            callback(20);
        }, 200);
    },
    function (callback, add) {
        console.log(this.value + add);
        callback();
    },
    function () {
        console.log(obj.value);
    }
], obj);

const a = {
    num: 0,
    valueOf: function() {
      return this.num += 1
    }
  };
  const equality = (a==1 && a==2 && a==3);
  console.log(equality); // true
  