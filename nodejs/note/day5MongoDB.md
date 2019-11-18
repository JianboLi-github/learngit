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

### 3. MongoDB

​	简单体会一下，具体到菜鸟教程详细学习

- 关系型数据库和非关系型数据库

  - 表就是关系，或者说表与表之间存在关系

    - 所有的关系型数据库都需要通过sql语言来操作

    - 所有的关系型数据库在操作之前都需要设计表结构

    - 数据表还支持约束

      - 唯一、主键、默认值、非空

    - 非关系型数据库非常灵活

    - 有的非关系型数据库就是key-value对儿

    - **在mongoDB是最像关系型数据库的非关系型数据库**

      - 数据库 -->数据库

      - 数据表 --> 集合（数组）没有结构 [集合](就是相同结构或属性的不同对象构成的整体)

      - 表记录 --> 文档对象(没有任何限制)

      - ```shell
        {# mongodb
          数据库1: {
            集合1：[
              {name: '张三', age: 10}, # 文档对象
              {name: '张三', age: 10, gender: 1},
              {name: '张三3'},
              ...
            ],
            集合2：[],
            集合3：[],
            ...
          },
          数据库2: {},
          数据库3: {},
          ...
        }
        ```

      - **MongoDB非常灵活，不和Mysql一样需要创建数据库、表、设计表结构，在插入数据的时候，指定数据库的集合就可以了。一切都是MongoDB自动完成建库建表**

    - MongoDB不需要设计表结构

    - 可以任意的存储数据，没有结构性

- 安装 `mongod --version`测试是否安装成功

#### 3.1 启动mongodb

```shell
# mongodb默认使用执行mongodb命令所处盘符根目录下的/data/db作为存储目录
# 在第一次执行mongod的时候先手动新建一个目录`/data/db`
mongod
```

​	如果想要修改默认的数据存储目录，可以：

```shell
mongod --dbpath=数据存储路径
```

#### 3.2 连接mongodb

```shell
# 新建一个命令行
# 默认连接本机的MongoDB。exit退出连接
mongo
```

#### 3.3 基本命令

- `show dbs`

  - 查看显示所有的数据库

- `db`

  - 查看当前操作的数据库

- `use dbname`

  - 切换到指定的数据库
  - 如果dbname不存在则会新建

- 插入数据

- ```shell
  db.people.insertOne({'name': 'Jack'})
  ```

- `show collections`

  - 查看数据库下的集合（类似表tables）

```shell
> db
firstMongo
> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
> db
firstMongo
> db.people.insertOne({'name': 'jack'})
{
        "acknowledged" : true,
        "insertedId" : ObjectId("5dd24990283c13a803183720")
}
> show dbs
admin       0.000GB
config      0.000GB
firstMongo  0.000GB
local       0.000GB
> db
firstMongo
> show collections
people
> db.people.find()
{ "_id" : ObjectId("5dd24990283c13a803183720"), "name" : "jack" }

> db.people.insertOne({'name': 'jack', 'age': 18})
{
        "acknowledged" : true,
        "insertedId" : ObjectId("5dd24c0e283c13a803183721")
}
> db.people.find()
{ "_id" : ObjectId("5dd24990283c13a803183720"), "name" : "jack" }
{ "_id" : ObjectId("5dd24c0e283c13a803183721"), "name" : "jack", "age" : 18 }
>
```

#### 3.4 在node中如何操作数据库

##### 3.4.1 使用官方的`mongodb`包来操作

- [MongoDB Node.JS Drvier](https://www.npmjs.com/package/mongodb)
- [source](https://github.com/mongodb/node-mongodb-native)使用方法
- 一般不使用，原生的native

##### 3.4.2 使用第三方`mongoose`来操作MongoDB数据库

​	第三方包：mongooes基于MongoDB官方的mongodb包再一次做了封装。[click here](https://mongoosejs.com/)

- [官方示例](/code/day05/mongoose-demo/demo1.js)

- ```javascript
  const mongoose = require('mongoose');
  // 连接数据库，不存在则在插入数据后自动创建
  mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});
  
  
  // 创建一个模型，也就是设计数据库
  // MongoDB是动态的，非常灵活，在代码中就可一设计数据库
  // mongoose可以简化这个过程
  const Cat = mongoose.model('Cat', { name: String });
  
  // 实例化一个Cat
  const kitty = new Cat({ name: 'Zildjian' });
  // 持久化保存kitty实例
  kitty.save().then(() => console.log('meow'));
  ```

- ```shell
  > use test
  switched to db test
  > db
  test
  > show collections
  cats
  > db.cats.find()
  { "_id" : ObjectId("5dd255447e5edb3b414ec68b"), "name" : "Zildjian", "__v" : 0 }
  >
  ```

- 数据库中的`cats`和代码中的`Cat`对应



#### 3.4.3 官方指南

[官方示例](/code/day05/mongoose-demo/demo2.js)

```javascript
var mongoose = require('mongoose')

// 1. 连接数据库，不存在则在插入数据后自动创建
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});

// 2. 设计集合结构（表结构）
var Schema = mongoose.Schema

var blogSchema = new Schema({
    title:  String,
    author: String,
    body:   String,
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now }, // 设置约束
    hidden: Boolean,
    meta: {
        votes: Number,
        favs:  Number
}
});

// 3. 将文档结构发布为模型
// mongoose.model方法就是用来将一个架构发布为model
//      第一个参数；传入一个大写单词单数字符用来表示数据库名称
//          mongoose会自动将大写名字的字符串生成 小写复数 的集合名称
//          例如这里User最终会变成users集合名称
//      第二个参数：架构
//      return: 模型构造函数
var blog = mongoose.model('Blog', blogSchema)

// 4. 当有了模型函数后，就可以使用这个构造函数对users集合操作了。
```





