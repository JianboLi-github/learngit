- MongoDB
- 项目



​	callback回调函数，函数也是一种数据类型，既可以当作参数进行传递也可以当作方法返回值。

​	在JavaScript中函数是一等公民，也是一种数据类型。一般情况下，把函数作为参数的目的就是为了获取函数内部的异步操作结果。

​	Javascript 单线程 事件循环

```javascript
// 同步函数
function add(x, y) {
    return x + y
}
add(1, 2)

//异步函数
console.log(1)
setTimeout(function() {
    console.log(2)
}, 1000)
console.log(3)
// 结果 1 3 2
```

异步函数的执行结果总会是132， 哪怕setTimeout设置的时间为0.