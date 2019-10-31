day03-模块系统和express

- 模块系统
  - 核心模块
  - 第三方模块
  - 自定义模块
  - 加载规则以及加载机制
  - 循环加载（错误的设计）
- npm
- package.json
- Express
  - 高度封装了http模块
  - 第三方web开发框架
- 增删改查
  - 使用文件存储数据
  - 使用异步编码
- MongoDB
- 书籍
  - 《JavaScript 高级编程》第三版
  - 《JavaScript语言精粹》
- seo资料（搜索引擎优化）



### each和foreach

- each是art-template的模板语法，专属的。只能在模板字符串中去使用

  - ```javascript
    {{each 数组}}
    <li>{{$value}}</li>
    {{/each}}
    ```

  - ```javascript
    // forEach是EcmaScript 5中的一个数组遍历函数，是JavaScript原生支持的语法.可以遍历任何可遍历的成员
    ```

  - ```jQuery
    $.each(数组, function)
    $(.div).each(function)  // 一种用于遍历jQuery选择器选择道德伪数组实力对象
    ```

  - jQuery的each方法和forEach几乎一致

  - 低版本浏览器有时会不支持EcmaScritp 5的forEach

- 杂记

  - 伪数组是对象
  - 对象的原型链中没有forEach
  - 对象的原型链是Object.prototype

- ```javascript
  <script>
      <div></div>
  <div></div><div></div>
      <div></div>
  
  $('div').each(function (index, item) {
      console.log(item)
  })
  
  
  // - 这个each是jQuery提供的
  // - 这个each在jQuery的原型链中
  ;[].slice.call($('div')).forEach(function(item) {
      console.log(item)
  })
  
  </script>
  ```

- 网页中的路径都是url路径，不是文件路径



### 网站开发模型

- 黑盒子 
- 丰富功能
- 按照设计的套路供用户使用

### day02 内容要点

-  在node中使用art-template模板引擎
  - install；require；
  - template.render()
- 客户端渲染和服务端你渲染的区别
  - 最少请求两次，发起ajax在客户端使用模板引擎渲染
  - 客户端直接拿到服务端已经渲染的页面
- 处理留言本案例首页数据首页渲染
  - 解析字符串split
- 处理留言本案例发表留言功能
- 掌握如何解析请求路径中的查询字符串
- 如何在Node实现服务器重定向
  - 301 永久重定向 浏览器会保存
  - 302 临时重定向 浏览器不会保存重定向
- Node中的Console（REPL）使用
  - cmd



## 6. 模块系统

使用Node编写应用程序主要就是在使用

- EcmaScript 语言
  - 没有BOM、DOM
- 核心模块
  - 文件操作 js
  - http服务 http
  - url路径操作模块
  - path路径处理模块
  - os操作系统i洗脑洗
- 第三方模块
  - art-template
- 自定义模块

### 6.1 什么是模块化

- 文件作用域
- 通信规则
  - 加载 
  - 导出 

### 6.2 CommonJS模块规范

- 模块作用域
- 使用require方法加载模块
- 使用exports接口对象到处模块中的成员

#### 6.2.1 加载`require`

语法：

```javascript
var 自定义变量名称 = require('模块')
```

- 两个作用
  - 执行被加载模块中的代码
  - 得到被加载模块中的`exports`导出接口对象

#### 6.2.2 导出`exports`

- Node中是模块作用，默认文件中所有的成员只在当前文件中有效

- 对于希望可以被其他模块访问的成员，就需要把这些公开的成员挂载到`exports`接口对象中

- 导出多个成员（挂载到对象中）：

  ```javascript
  exports.a = 22
  exports.b = 'hello'
  exports.c = function(){}
  exports.d = {
      foo: 'bar'
  }
  
  ```

- 导出单个成员（拿到函数/字符串/..）：

```javascript
module.exports = 'hello'
module.exports = function() {
    console.log('I\'m function')
}
// 此处拿到的只有最后一个导出，前面的都被覆盖到了
// module.exports而不是
// exports = function(){}
```

#### 6.2.3 exports和module.exports 解析

- 原理：

  - 在node中，每个模块内部都有一个自己的module对象

  - module对象中，有一个成员：exports对象（默认为空）,代码最后return module.exports

  - ```javascript
    // var module = {
    //     exports: {}
    // }
    
    module.exports.foo = 'bar'
    module.exports.add = function(x,y) {
        return x + y
    }
    
    
    
    // 默认在代码的最有有一句
    return module.exports
    ```

  - 每次导出接口成员的时候都通过`module.exports = xxx`为了简化，node专门提供了一个变量`exports = module.exports `,也就是说在模块中还有`var exports = module.exports`。exports ===module.exports

  - `exports` 是`module.exports的一个引用`

  - 所以，当导出单个成员的时候，需要修改对象`module.exports`，而不是修改`module.exports`的引用`exports`。

  - 导出单个成员的时候修改`exports`就会出错，注意模块内最后一条语句`return module.exports`，只有当exports是module.exports的引用的时候，对exports对象的修改才会被外部模块感知

  - ```javascript
    //foo.js
    
    exports.foo = 'bar'
    // 外部模块可访问到：{foo: bar}
    module.exports.a = 123
    // {foo: bar, a:123}
    
    exports = {
        a:456
    }
    // 此时，exports ！== module.exports
    // exports变为一个对象，不再是引用，exports对象的成员不可被外部访问到
    
    module.exports.foo = 'haha'
    // {foo:'haha', a:123}
    exports.c = 456
    // exports对象增加成员c，同样不可被外部访问到
    exports = module.exports
    // 重新建立module.exports引用的关系
    exports.a = 789
    // {foo: 'haha', a: 789}
    // 导出的对象成员a值被修改
    
    module.exports = function() {
        console.log('一锤定江山')
    }
    // 导出的对象重新赋值，无论前面怎么变换，最终得到是function
    ```

  - 实际开发使用的时候不会那么复杂

  - ```javascript
    // 导出多个成员：
    exports.xxx = xxx
    //或者
    module.exports = {
        xxx: xxx
    }
    // 导出单个成员:
    module.exports = xxx
    ```


#### 6.2.4 require 方法加载规则

- 核心模块

  - 模块名

- 第三方魔魁啊

  - 模块名

- 自定义模块

  - 路径

- 优先从缓存加载

  - 由于在a中已经加载过b，所以main不会重复加载，main可以拿到其中的接口对象，但是不会执行b里面的代码
  - 目的是避免重复模块加载，提高模块加载效率

- 判断模块标识

  - 核心模块
  - 第三方模块
  - 自定义模块

  路径形式的模块：

  ```javascript
  // ./   当前目录，是不可省略的
  // ../
  // /xxx
  // 	在这里的 / 表示的是当前文件模块所属磁盘的根路径
  // d:/a/foo.js 几乎不用绝对路径
  // .js可以省略
  ```

- 核心模块

  - 核心模块的本质也是文件
  - 核心模块文件已经被编译到了二进制文件中了，使用时可以按照名字直接加载

- 第三方模块(art-template)

  - 使用的时候可以通过require('包名')的方式进行加载才可以使用

  - 第三方包不可能和核心包的名字是一样的

  - 既不是核心模块，也不是路径形式的模块

    1. 首先会找当前文件所处目录的node_modules目录

    2. 然后，查找node_modules/art-template/package.json文件

    3. 接下来查找package.json文件中的main属性
    4. main属性中就记录了art-template模块的入口模块
    5. 如果package.json文件不存在或者main指定的入口模块不存在，则node 会默认查找该目录下的index.js
    6. 如果当前目录下不存在node_modules(上述条件不成立),则会进入上一级node_modules目录查找
    7. 如此逐级向上查找，直到当前磁盘根目录。如果不存在，最后报错：`can not find module xxx`

  - 一个项目有且只有一个node_modules,放在项目根目录中，这样项目中的所有的子目录中的代码都可以加载到第三方包。不会出现多个node_modules

- 所以，模块查找机制：

  - 优先从缓存加载
  -  核心模块
  - 路径形式的文件模块
  - 第三方模块

​	

### 6.3 npm

- node package manager
- package.json 包说明文件
  - 初始值为一个空对象`{}`
  - `npm install art-template --save`安装第三方报的时候添加参数save就会向包说明文件中添加依赖项信息（--save可以放前放后都可以）
  - 这个文件可以通过`npm init`初始化生成
  - `npm install` 可以根据包说明文件安装项目所有的依赖项dependencies

### 6.4 package.json