function Restaurant(resobject) {

    this.resobject = resobject || {}
    this.cash = resobject.cash || 0;
    this.seats = resobject.seats || 5;
    this.staff = resobject.staff || [];
    this.cusNum = 0;//当前店内顾客数量
    this.hire = function (staff) {
        console.log(this.staff);
        this.staff.push(staff.name);
    }
    this.fire = function (staff) {
        var index = this.staff.indexOf(staff.name);
        this.staff.splice(index, 1);
    }
}

function staff(name, salary) {
    this.name = name;
    this.salary = salary;
    this.finishATask = function () {
    }
}

function shuffle(arr) {
    let i = arr.length;
    while (i) {
        let j = Math.floor(Math.random() * i--);
        [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
}

function Customer(id) {
    this.id = id || 1;
    this.notEatDishes = [];
    this.incompleteDishes = [];
    this.iseat = "no";
    this.list = [];
    //wu个列表分别代表 点的菜列表 吃完了的菜列表  上了还没吃的菜 正在吃的菜  未上来的菜  
    //console.log('this customer is created!');
}

Customer.prototype = {
    constructor: Customer,
    MoveIn: function (ifeRestaurant) {
        console.log(new Date());
        console.log(this.id + "号客人进入餐厅");
        ifeRestaurant.cusNum++;

    },
    orderDish: function () {
        var index = [0, 1, 2, 3, 4, 5, 6];
        var n = 1;
        var num = Math.floor(Math.random() * menu.length);
        if (num != 0) {
            n = num;
        }
        var orderList = [];

        index = shuffle(index);
        //var dish = menu[Math.floor(Math.random() * menu.length)];
        for (var i = 0; i < n; i++) {
            orderList.push(menu[index[i]]);
        }
        this.list = orderList.slice(0);
        return orderList;
    },
    eatDish: function (ifeRestaurant, server) {
        var cus = this;
        var t = setInterval(function () {
            if (cus.notEatDishes.length != 0) {
                this.iseat = "yes";
                console.log(new Date());
                console.log(cus.id + "号顾客：吃完了" + cus.notEatDishes[0].name);
                cus.notEatDishes.splice(0, 1);
            }
            else if (cus.notEatDishes.length == 0 && cus.incompleteDishes.length != 0) {
                console.log(new Date());
                console.log(cus.id + "号顾客：等菜中。。");
                cus.iseat = "no";
            }
            else if (cus.incompleteDishes.length == 0) {
                console.log(new Date());
                console.log(cus.id + "号顾客：吃完啦！");
                //结账后离开餐厅
                server.recieveBill(ifeRestaurant, cus);
                cus.MoveOut();
                ifeRestaurant.cusNum--;
                clearInterval(t);
            }
        }, 3000);

    },
    MoveOut: function () {
        console.log(new Date());
        console.log(this.id + "号顾客：离开餐厅");
    },
};

function Dish(dishobj) {
    this.name = dishobj.name;
    this.cost = dishobj.cost;
    this.price = dishobj.price;
    this.time = dishobj.time;
}

var singletonCook = (function () {
    //默认将cook赋予null
    var cook = null;

    //类：Cook
    function Cook(name, salary) {

        staff.call(this, name, salary);
        this.cookList = [];
        //检验单例模式
        //console.log('this cook is created!');
    };
    Cook.prototype = {
        constructor: Cook,

        displayInfo: function () {
            console.log('name: ' + this.name + '   salary: ' + this.salary);
        },
        cookDish: function (customer, server) {
            var time = 6;

            var s = setInterval(function () {

                if (customer.incompleteDishes.length != 0) {
                    time = customer.incompleteDishes[0].time;
                    console.log(new Date());
                    console.log("厨师：厨师开始做" + customer.incompleteDishes[0].name);
                    console.log(new Date());
                    console.log("厨师：厨师做好了" + customer.incompleteDishes[0].name);
                    console.log("厨师：告诉服务员" + customer.id + "号顾客的" + customer.incompleteDishes[0].name + "做好了，上菜！");
                    server.servingDish(customer, customer.incompleteDishes[0]);
                }
                else {
                    time = 6;
                    clearInterval(s);
                }

            }, time * 1000);


        },

    };
    return {
        //类的名字
        name: 'Cook',
        //创建类的实例方法
        getInstance: function (name, salary) {
            //利用私有变量instance实现单例模式
            if (cook === null) {
                cook = new Cook(name, salary);
            }
            return cook;
        }
    };
})();

var singletonServer = (function () {
    //默认将server赋予null
    var server = null;

    //类：server
    function Server(name, salary) {
        staff.call(this, name, salary);
        this.customerList = [];
        //检验单例模式
        //console.log('this server is created!');
    };
    Server.prototype = {
        constructor: Server,
        serveOrder: function (customer) {
            var cust = this;
            this.customerList.push(customer);
            setTimeout(function () {
                customer.incompleteDishes = customer.orderDish();
                var str = "服务员：记录" + customer.id + "号顾客点了";
                for (var i = 0; i < customer.incompleteDishes.length; i++) {
                    str += customer.incompleteDishes[i].name;
                }
                console.log(str);
                cust.tellCookDish(customer);
            }, 3000);

        },
        tellCookDish: function (customer) {
            var str = "服务员：告诉厨师" + customer.id + "顾客需要做";
            for (var i = 0; i < customer.incompleteDishes.length; i++) {
                str += customer.incompleteDishes[i].name;
            }
            console.log(str);
        },
        servingDish: function (customer, dish) {
            console.log("服务员：给" + customer.id + "号客人上菜:" + dish.name);
            //上菜以后在这里处理每个顾客对应的上了还没吃的菜以及未上来的菜
            //新上的菜加入上了还没吃的菜列表里并且把未上来的菜列表中的这一项删除
            customer.notEatDishes.push(dish);
            var index = customer.incompleteDishes.indexOf(dish);
            customer.incompleteDishes.splice(index, 1);
            customer.iseat = "yes";
            //customer.eatDish();
        },
        recieveBill: function (ifeRestaurant, customer) {

            var value = 0;
            for (var j = 0; j < customer.list.length; j++) {
                value += customer.list[j].price;
            }
            ifeRestaurant.cash = (ifeRestaurant.cash-0)+(value -0);
            console.log(customer.id + "号顾客买单" + value + "元");
            console.log("店里总金额为" + ifeRestaurant.cash);
        }
    };
    return {
        //类的名字
        name: 'Server',
        //创建类的实例方法
        getInstance: function (name, salary) {
            //利用私有变量server实现单例模式
            if (server === null) {
                server = new Server(name, salary);
            }
            return server;
        }
    };
})();


var ifeRestaurant = new Restaurant({
    cash: 1000000,
    seats: 5,
    staff: []
});
//console.log(ifeRestaurant);

//var newCook = new Cook("Tony", 10000);
var Tom = singletonCook.getInstance("Tom", 10000);
//var newCook = singletonCook.getInstance("Tommy",10000);

//var newServer = new Server("jimmie",20000);
var Jimmie = singletonServer.getInstance("Jimmie", 5000);
//var newServer = singletonServer.getInstance("sam",5000);

// console.log(newCook);
// ifeRestaurant.hire(newCook);
// ifeRestaurant.hire(newServer);
// console.log(ifeRestaurant.staff);

//function Dish(name, cost, price, time) 
var menu = [];//实现菜单
menu.push(new Dish({
    name: "水煮鱼",
    cost: 15,
    price: 30,
    time: 5
}));
menu.push(new Dish({
    name: "地三鲜",
    cost: 5,
    price: 20,
    time: 3
}));
menu.push(new Dish({
    name: "宫保鸡丁",
    cost: 10,
    price: 25,
    time: 4
}));
menu.push(new Dish({
    name: "南瓜饼",
    cost: 2,
    price: 6,
    time: 2
}));
menu.push(new Dish({
    name: "小米粥",
    cost: 1,
    price: 5,
    time: 3
}));
menu.push(new Dish({
    name: "土豆泥",
    cost: 8,
    price: 18,
    time: 6
}));
menu.push(new Dish({
    name: "小龙虾",
    cost: 38,
    price: 88,
    time: 10
}));

var customerList = [];
for (var i = 1; i <= 15; i++) {//实现顾客序列
    customerList.push(new Customer(i));
}
function wholeProcedure(ifeRestaurant, customerList, Tom, Jimmie) {
    customer = customerList[0];
    customer.MoveIn(ifeRestaurant);
    Jimmie.serveOrder(customer);
    Tom.cookDish(customer, Jimmie);
    customer.eatDish(ifeRestaurant, Jimmie);
    customerList.splice(0, 1);
}
function random(n) {//实现随机等待n秒
    var time = new Date().getTime();
    while (new Date().getTime() - time < 1000 * n) { }
}
//随机产生客人并进入餐厅，进入之前判断店内是否还有座位，若没有，则等待，
//直到有人离开产生空位，再进入餐厅

// while (customerList.length != 0) {
//     if (ifeRestaurant.seats - ifeRestaurant.cusNum > 0) {
//         random(Math.random() * 3);
//         wholeProcedure(ifeRestaurant, customerList, Tom, Jimmie);
//     }
//     else {
//         random(Math.random() * 15);
//     }
// }




for (var j = 0; j < 2; j++) {
    customerList[j].MoveIn(ifeRestaurant);
    Jimmie.serveOrder(customerList[j]);
    Tom.cookDish(customerList[j], Jimmie);
    customerList[j].eatDish(ifeRestaurant, Jimmie);
}


