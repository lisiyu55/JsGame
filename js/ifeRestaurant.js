function ifeRestaurant(profit, seatNum, staffList) {
    this.profit = profit;
    this.seatNum = seatNum;
    this.staffList = staffList;

    this.hire = function (staff) {
        this.staffList.push(staff.name);
    }
    this.fire = function (staff) {
        var index = this.staffList.indexOf(staff.name);
        this.staffList.splice(index, 1);
    }
}

function staff(name, salary) {
    this.name = name;
    this.salary = salary;
    this.finishATask = function () {
    }
}

function customer(sex, firstname) {
    this.sex = sex;
    this.firstname = firstname;
    this.eat = function (dish) {
        if (this.sex == "f") {
            console.log('这位女顾客开始吃' + dish.name);
        }
        else {
            console.log('这位男顾客开始吃' + dish.name);
        }
    }

    this.order = function (dish) {
        if (this.sex == "f") {
            console.log('这位女顾客点了一道' + dish.name);
        }
        else {
            console.log('这位男顾客点了一道' + dish.name);
        }
    }
}

function Dish(name, cost, price, time) {
    this.name = name;
    this.cost = cost;
    this.price = price;
    this.time = time;
}

function Cook(name, salary) {
    staff.call(this, name, salary);
    this.finishATask = function () {
        this.cookDish();
    }
    this.cookDish = function (dish) {
        console.log("厨师开始做" + dish.name);
        console.log("厨师做完了" + dish.name);
    }
}
Cook.prototype = new staff();
Cook.prototype.constructor = Cook;

function Server(name, salary) {
    staff.call(this, name, salary);
    this.finishATask = function () {
        if (arguments[0] instanceof Array) {
            this.recordOrder();
        }
        else {
            this.servingDish();
        }
    }
    this.recordOrder = function (dish) {
        console.log("服务员记录客人的点单" + dish.name);
    }
    this.servingDish = function (dish) {
        console.log("服务员给客人上菜" + dish.name);
    }

}
Server.prototype = new staff();
Server.prototype.constructor = Server;

// var menu = new Array();
// menu.push(new Dish("鱼香肉丝", "10", "20", "3"));//花费时间均以秒为单位
// menu.push(["宫保鸡丁", "8", "25", "3"]);
// menu.push(["地三鲜", "7", "18", "2"]);
// menu.push(["水煮肉片", "15", "30", "4"]);
// menu.push(["毛血旺", "16", "30", "3"]);

var menu={
    "dish1":{
        "name": "鱼香肉丝",
        "cost":10,
        "price":20,
        "time":3
    }
    
}

// //menu.forEach(Dish);
var dish = new Array();
var obj = require("./menu.json");
console.log(obj);
// for (var i = 0; i < menu.length; i++) {
//     dish.push(new Dish(menu[i][0], menu[i][1], menu[i][2], menu[i][3]));
// }
// console.log(dish);//dish[0],dish[1]
// var ifeRestaurant = new ifeRestaurant(1000000, 20, []);
// var newCook = new Cook("Tony", 10000);
// ifeRestaurant.hire(newCook);
// var newServer = new Server("David", 5000);
// ifeRestaurant.hire(newServer);
// var customer1 = new customer("f", "li");
// var index = Math.ceil(Math.random() * dish.length);
// customer1.order(dish[index]);



