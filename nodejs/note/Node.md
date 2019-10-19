# Node.js

## 1. Node.js介绍

### 1.1 Node.js是什么

​	nodejs.org

 * Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine.
   	* Node.js 不是一门语言
      	* Node.js 不是库，不是框架
      * Node.js 是一个JavaScript 运行时环境(一个平台)
      	* 简而言之，Node.js可以解析和执行JavaScript代码
   	* 以前只有浏览器可以解析执行JavaScript代码，现在的JavaScript可以完全脱离浏览器来运行，一切都归功于Node.js
    * **浏览器中的JavaScript**
       * EcmaScript
         	* 基本的语法：
         	* if
         	* var
         	* function
         	* Object
          * Array
       * BOM
      * DOM
    * **Node.js中的JavaScript**
      	* 没有 BOM、DOM
          	* EcmaScript
       * 在Node这个JavaScript执行环境中提供了一些服务器级别的操作API
         	* 例如文件读写
          * 网络服务的构建
         * 网络通信
        * http服务器
        * 。。。
        * 学node.js就是学web服务器开发
       * 构建与Chrome's V8浏览引擎
         	* 代码只是具有特定格式的字符串
          * 引擎认识它，可以解析和执行
         * V8是目前公认的解析执行JavaScript代码最快的
         	* Node.js移植了V8引擎，开发了一个独立的JavaScript运行时环境
 * Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient.
   	*  event-driven：node.js使用事件驱动
      	*  non-blocking I/O model ：非阻塞IO模型（异步）
              	* lightweight and efficient: 轻量和高效
 * Node.js' package ecosystem, **npm**（node package manage）, is the largest ecosystem of open source libraries in the world.
   	* npm是世界上最大的开源库生态系统
      	* 大多数JavaScript相关的第三方包在npm上都可以找到
      	* npm install jquery

### 1.2 Node.js能做什么

	* Web服务器后台
 * 开发命令行工具：
   	* git(c语言开发)
    * npm(node)
   * hexo(node)
 * 对于前端开发接触node最多的是它的命令行工具
   	* webpack
    * gulp
   * npm
   	* hexo

### 1.3 一些资源

 * 《深入浅出Node.js》--朴灵
   	* 偏理论底层，没有实战内容
 * 《Node.js权威指南》
   	* API讲解，没有业务，没有实战
	* Node入门：nodebeginner.org.index-zh-cn.html
	* cnode社区：cnodejs.org
	* cnode-新手入门: cnodejs.org/getstart



### 1.4 这门课科学到什么

 * B/S编程模型
   	* back-end
      	* 任何服务端技术BS编程模型都是一样的，和语言无关
      * 开发语言是一种工具
 * 模块化编程
   	* 在Node中可以像@import()一样引用加载javaScript脚本文件
	* Node常用API
 * 异步编程
   	* 回调换数
    * Promise
   * async
   	* generator
	* Express Web开发框架
	* EcmaScript 6
 * Node.js帮助学习前端高级内容
   	* Vue.js
    * React
   * angular

## 2. 起步

###  2.1 Node环境安装

* 一路`next`;
* 打开命令行，`node --version`验证

### 2.2 Hello World

 1. 创建编写 [JavaScript脚本](code/helloworld.js '。。')

 2. 打开终端，定位到脚本文件所属目录

 3. 输入`node文件名`执行对应的文件

    * 脚本文件名不要是：`node.js`
    * 避免使用中文名字
    * 在Node中，采用EcmaScript进行编码，没有BOM、DOM，和浏览器中的JavaScript不一样
    * 类似<font color='#f00'>`console.log(window)`和`console.log(document)`</font>会出错

4. 读写文件

   * 浏览器中的JavaScript是没有文件操作能力的，但是Node中的JavaScript具有文件操作的能力

   * [readfile.js](code/readfile.js)

     ```JavaScript
     // fs是file-system的简写,文件系统
     // 在Node中如果想要进行文件操作，
     // 就必须引入fs这个核心模块
     // 在fs这个核心模块中，就提供了所有的文件
     // 操作相关的API
     
     // 1. 使用require方法加载fs核心模块
     var fs = require('fs')
     
     // 2. read file
     // fs.readFile(filepath, 回调函数)
     // 回调函数接受两个参数：
     //		error:读取成功，error就是null
     //			读取失败，error就是错误对象
     //		data：读取成功，data就是读取到的数据
     //			读取失败，data就是undefined 没有数据
     fs.readFile('helloworld.js', function (error, data) {
     	// <Buffer 20 76 61 72 20 66 6f 6f 20 3d 20 27 62 61 72 27 0d 0a 20 63 6f 6e 73 6f 6c 65 2e 6c 6f 67 28 66 6f 6f 29>
     	// 读取到的是文件存储的二进制数据
     	if(error) {
     		console.log('读取文件失败')
     	}else {
     		console.log(data)
     		console.log(data.toString())
     	}
     })
     ```

     

5. 写文件

   * [writefile.js](writefile.js)

     ```javascript
     var fs = require('fs')
     // 第一个参数：filepath
     // 第二个参数：filedata
     // 第三个参数：回调函数
     //	成功： error null
     //	失败： error 错误对象
     data = 'nodejs向文件写入内容'
     fs.writeFile('test.txt', data, function(error) {
     	if(error) {
     		console.log('文件写入失败')
     	}else {
     		console.log('文件写入成功')
     	}
     })
     ```

   * 读写文件的时候要加上判断

   * **ps: node.js因为是异步的，有很多的回调函数**

6. 简单的http服务（20191016）

   * [http.js](code/http.js)

     ```JavaScript
     // 下面使用Node构建服务器，非常简单的一个web服务器
     
     // 在Node中专门提供了一个分厂核心的模块：http
     // http这模块的职责就是帮助创建编写一个服务器
     
     // 1. 加载http核心模块
     var http = require('http')
     
     // 2. 使用http.createServer() 方法创建要给web服务器
     // 		返回一个Server实例
     var server = http.createServer()
     
     // 3. 服务器做什么？
     //		提供服务：对数据的服务
     //		发请求
     //		接受请求
     //		处理请求
     //		做出反馈（发送响应）
     
     // 注册request请求事件
     // 当接收到客户端请求，就会自动触发服务器的request请求事件，
     // 然后执行第二个参数：回调处理函数
     server.on('request', function() {
     	console.log('收到客户端的请求了')
     })
     
     // 4. 绑定端口号，启动服务器
     server.listen(3000, function() {
     	console.log('服务器启动成功了，可以通过http://127.0.0.1:3000/来进行访问')
     })
     ```

     

   * 对客户端的请求给一个响应

     * [http-response.js](code/http-resposne.js)

       ```JavaScript
       var http = require('http')
       var server = http.createServer()
        
       // request 请求时间处理函数，需要接受两个参数：
       //		Request 请求对象
       //			请求对象可以用来获取客户端的一些请求信息，例如请求路径
       //		Response 相应对象
       //			响应对象可以用来给客户端发送响应消息，
       server.on('request', function(request, response) {
       	console.log('收到客户端的请求了。请求路径是：'+ request.url)
       		//	http://127.0.0.1:3000
       		// 	http://127.0.0.1:3000/a/a....		
       	
       	// response 对象有一个方法：write 可以用来给客户端发送响应数据
       	// write 可以使用多次，但是最后一次一定要使用end来结束响应，否则
       	// 客户端会一直等待
       	response.write('hello')
       	response.write(' nodejs')  //此处有一个空格
       	
       	// 告诉客户端，响应结束，可以把数据呈递给用户了
       	response.end()
       	
       	// 现在服务器可以给客户端响应了，但是无论什么请求都只能响应 hello nodejs..
       	// 如何对不同请求返回不同的响应？
       	// 例如：
       	//	/  index
       	//	/login 登陆
       	//  /register 注册
       	//	/hha	哈哈哈
       	
       	/// request.url
       })
       
       server.listen(3000, function() {
       	console.log('服务器启动成功, 可以通过：http://127.0.0.1:3000来访问')
       })
       ```

       

     * 对不同的请求做出不同的响应

       * [http-response-v2.js](code/http-response-v2.js)

         ```JavaScript
         var http = require('http')
         
         // 创建Server
         var server = http.createServer()
         
         // 监听request请求时间，设置请求处理函数
         server.on('request', function(req, res) {
         	console.log('收到客户端的请求, 路径是：'+req.url)
         	// 获取请求路径；判断处理响应
         	if(req.url == '/') {
         		console.log('跳转到index页面')
         		res.write('this is index page')
         	}else if(req.url == '/login') {
         		console.log('跳转到登陆页面')
         		res.write('this is login page')
         	}else if(req.url == '/register') {
         		console.log('跳转到注册页面')
         		res.write('this is register page')
         	}else {
         		res.write('505， 访问的页面不存在')
         	}
         	res.end()
             // 上面的response 多次write最后end可以简写为：
             // res.end('hello world!!!!')
             /*
             var url = req.url
             if(url === '/') {
             	res.end('This is index page.')
             }else if(url === '/login') {
             	res.end('This is login page.')
             }else {
             	res.end('404 Not Found.')
             }
             */
         })
         // 绑定端口号
         server.listen(3000, function() {
         	console.log('服务器启动成功')
         })
         ```

       * 关于一个简单的接口服务器
         [http-interface.js](code/http-interface.js)

         ```JavaScript
         var http = require('http')
         
         var server = http.createServer()
         
         server.on('request', function(req, res) {
         	url = req.url
         	if(url === '/') {
         		res.end('this is index page.')
         	}
         	// 一个简版的接口服务器
         	//		外部请求想要拿服务器上的商品数据
         	var products = [
         		{
         			name: 'apple',
         			price: 22222
         		},
         		{
         			name: 'banana',
         			price: 222
         		},
         		{
         			name: 'orange',
         			price: 20
         		}
         	]
         	
         	if(url === '/products') {
         		res.end(JSON.stringify(products))
         	}
         	
         	// res.end()响应的内容只能是二进制数据或者字符串，
         	// number，object，array，Boolean都不可以作为返回值
         })
         
         server.listen(3000, function() {
         	console.log('服务器启动成功')
         })
         ```

         <font color='#f00'>res.end()响应的内容只能是二进制或者字符串</font>



## 3. Node中的JavaScript

 * EcmaScript
   	* 没有DOM、BOM
	* 核心模块
	* 第三方模块
	* 用户自定义模块

#### 3.1 核心模块

​	Node为JavaScript提供了很多服务器级别的API，这写API绝大多数都被包装到了一个具名的核心模块中了。

​	例如，文件操作的`fs`核心模块，http操作的`http`模块， `path`路径操作模块，`os`操作系统信息模块。。。

​	如果想要使用核心模块，就必须引入：

```JavaScript
var fs = require('fs')
var http = require('http')


// 用来获取系统信息
var os = require('os')

// 用来操作路径的
var path = require('path')

// 获取当前机器的CPU信息
console.log(os.cpus())
// 获取总内存的大小
console.log(os.totalmem())

// extname extension name
console.log(path.extname('somewhere/filename.txt'))
```

nodejs.org

#### 3.2 用户自定义模块

	* require
	* exports

 * [js简单的模块化](js简单的模块化)
    
   ```JavaScript
   // a.js
   
   // require 是一个方法
   // 它的作用就是用来加载模块的
   // 在Node中，模块有三种:
   //		具名的合兴模块， fs，http
   //		用户自己编写的文件模块
   //			相对路径必须加 ./
   //			可以省略后缀名.js
   // require('package')
   console.log('a.js start.')
require('./b.js')
   console.log('a.js end.')
   
   // b.js
   console.log('b.js start.')
   require('./c.js')
   console.log('b.js end.')
   // c.js
   console.log('c.js start')
   console.log('c.js end.')
   ```
   
* <font color='#f00'>在Node中，没有全局作用域，只有模块作用域</font>，模块可以简单理解为一个js文件

     * 外部访问不到内部
     * 内部也访问不到外部
     * 默认都是封闭的，a引入b，a也无法访问b的成员

* 如何让模块与模块之间进行通信？

     * require方法有两个作用：

          * 加载文件模块兵执行里面的代码
          * 拿到被加载文件模块导出的接口对象

     * 在每一个文件模块中都提供了一个对象：exports

          * exports的作用就是把需要被外部访问的成员挂载到这个exports对象中。也就是说把成员（包括函数）保存为exports的成员属性或者成员方法，暴露出去
          * exports 默认是一个空对象，打印出来值{}

          ```JavaScript
          // aa.js
          var ret = require('./bb')
          console.log(ret)
          console.log(ret.foo)
          console.log(ret.add(30, 10))
          
          // bb.js
          var foo = 'bbb'
          exports.foo = 'hello'
          exports.add = function(x, y){
              return 'x+y='+(x+y)
          }
          
          function add(x, y) {
              return 'x-y='+(x -y)
          }
          
          // 执行aa.js 结果为：
          // {foo: 'hello'}
          // hello
          // x+y=40
          ```

          

#### 3.3 第三方模块





### 4. Node中的模块系统

 