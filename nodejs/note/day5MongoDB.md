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

```javascript
function add(x, y) {
    console.log(1)
    setTimeout(function() {
        console.log(2)
        var result = x + y
        return result //
    }, 1000)
    console.log(3)
    // 到这里执行就结束了，不会等到前面的定时器，所以直接就返回了默认值undefined
}
console.log(add(10, 20))
```

```shell
# 输出结果
1
3
undefined
2

```

- setTimeout
- readFile
- writeFile
- ajax

这种情况必须通过：回调函数

```javascript
function add(x, y, callback) {
    // callback 就是回调函数
    // var x = 10
    // var y = 20
    // var callback = function(result) {console.log(result)}
    cosole.log(1)
    setTimeout(function() {
        var result = x + y
        callback(result)
    }, 1000)
}

// 调用
add(10, 20, function(result) {
    console.log(result) //在此处（是一个确定的位置确定的时间）拿到数据
    // 而在异步函数中，因为函数结束的时间不确定，所以并不能在确定的位置拿到想要的数据
})
```

JavaScript 编程对的一大特色：异步编程。

- setTimeout
- readFile/writeFile/readdir
- ajax

### 1. 封装ajax

```html
<!DOCTYPE html>
<html lang='en'>
<head>
  <meta charset='utf-8'>
  <title>封装ajax方法</title>
  
  <script>
    function get(url, callback) {
        var oReq = new XMLHttpRequest()
        // 当请求加载成功之后要调用指定的函数
        oReq.onload = function() {
            // 现在需要在这里得到oReq.ressponseText
            console.log(oReq.responseText)
            callback(oReq.responseText)
        }
        oReq.open('get', url, true)
        oReq.send()
    }
    // 封装ajax方法，调用get方法，
    // get(url, function(data) {
    // })
    
    
    get('data.json', function(data) {
        console.log('heizhu')
        console.log(data)
    })
  </script>
</head>
<body>
 
</body>
</html>
```

### 2. 关于JavaScript模块化问题

- JavaScript不支持模块化

