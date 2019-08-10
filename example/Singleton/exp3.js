'use strict'
var singletonAccepter =(function(){
    //默认将instance赋予null
    var instance = null;
    //类：SupposeClass
    function SupposeClass( args ){
        var args = args || {};
        this.name = args.name || 'Monkey';
        this.age = args.age || 24;
         //检验单例模式
         console.log('this is created!');
    };
    SupposeClass.prototype = {
        constructor: SupposeClass,
        displayInfo: function(){
            console.log('name: ' + this.name + '   age: ' + this.age);
        }
    };
    return {
        //类的名字
        name: 'SupposeClass',
        //创建类的实例方法
        getInstance: function( args ){
            //利用私有变量instance实现单例模式
            if( instance === null ){
                instance = new SupposeClass( args );
            }
            return instance;
        }
    };
})();

singletonAccepter.getInstance();
singletonAccepter.getInstance();