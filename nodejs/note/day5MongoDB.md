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

- JavaScript不支持模块化，像

  - require
  - exports

  都是在node中才有的，node环境对JavaScript进行了特殊的模块化支持CommonJS

- 在浏览器中也可以像在Node中的模块一样进行编程，但是需要第三方库

  - require.js  术语：AMD
  - sea.js  CMD

  都可以实现

- 无论是CommonJS、AMD、CMD、UMD、EcmaScript 6 Modules官方规范都是为了解决JavaScript的模块化问题

  - 其中EcmaScript是官方定义。
  - EcmaScript在2015年发布了EcmapScript 2016 官方标准，其中就包含了官方对JavaScript模块化的支持，但是很多JavaScript运行环境还不支持
  - Node在8.5版本后才对EcmaScript 6 module进行了支持
  - 可以使用预编译器将EcmaScript 6 ---> EcmaScript 5
  - 目前的前端情况都是使用很多新技术，然后利用编译器工具打包运行在低版本浏览器中
  - 使用新技术是为了提高效率，增加可维护性

- app.use不仅仅是用来开放静态资源的，还可以做很多工作，配置body-parser也是通过app.use来配置的，这里涉及到中间件的一套规则



- package.json 和package-lock.json
  - 在npm5之前不会有package-lock.json这个文件的
  - npm5 之后的版本 安装包不需要加--save参数，它会自动保存依赖信息
  - 当安装报的时候，会自动出创建或者更新pack-lock.json文件
  - `package-lock.json`文件会保存node_modules中所有包的信息（版本、下载地址）这样重新按装的时候`npm install` 速度就会可以提升
  - 这个文件也可以锁定依赖包的版本，防止项目依赖包自动上级到最新版本
  - 