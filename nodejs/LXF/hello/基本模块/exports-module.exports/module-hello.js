console.log('hello world')
var name = '模块'
var module = {
    id: 'hello',
    exports:{}
}

var load = function(module) {
    function greet(name) {
        console.log('hello,' + name + '!')
    }

    module.exports = greet
    return module.exports
}

var exproted = load(module)

save(module, exported)


// ** module.exports vs expots
// Node默认准备了一个空对象{}exports，可以直接向里面添加东西，
//   返回值也是一个对象 exports
// 但是如果要输出一个函数或者数组，那么只能修改默认的对象module.exports
// 向exports对象添加成员的时候，调用的是module对象的成员exports对象
// 如果给exports赋值`exports = [1,2,4]`，就相当于创建了一个新的变量
// exports并初始化为一个数组，这并没有改变module对象的成员expors对象
