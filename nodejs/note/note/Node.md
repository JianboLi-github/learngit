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



## 3.  Node中的JavaScript



* * EcmaScript
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



### 4. Web服务器开发

#### 4.1 IP地址和端口号

	* IP地址用来定位计算机
	* 端口号用来定位具体的应用程序

* 所有需要联网通信的应用程序都会占用一个端口号
* 端口号的范围从0 - 65535之间
* 在计算机中有一些默认端口号，最好不要去使用



#### 4.2 响应内容类型



* 关于中文乱码的问题，设置header头信息

 * [http-encode.js](./code/http-encode.js)

   ```JavaScript
   var http = require('http')
   
   var server = http.createServer()
   
   server.on('request', function(req, res) {
   	
   	/*
   	res.setHeader('Content-Type', 'text/plain; charset=utf-8')
   	
   	res.write('hello world')
   	// 在服务器默认发送的数据，是utf-8编码的内容
   	// 浏览器会按照当前操作系统的默认编码（gbk）去解析，
   	// 不知道接收到的数据是utf-8编码的内容
   	// 解决方法就是将编码格式同时发送给浏览器
   	// 内容类型， 普通文本；编码格式
   	
   	
   	// res.setHeader('Content-Type', 'text/plain; charset=utf-8')
   	// Cannot set headers after they are sent to the client
   	// 头信息设置要放在前面
   	
   	res.write('<br>你好，世界')
   	res.write('\n 哈哈哈hhh')
   	res.end('...')
   	*/
   	var url = req.url
   	
   	if (url === '/plain') {
   		// text/plain 普通文本，简单的，不加修饰的
   		res.setHeader('Content-Type', 'text/plain; charset=utf-8')
   		res.end('hello, world.<br> 你好，世界\nhhhhh哈哈哈')
   	}else if(url === '/html') {
   		// text/html html格式的文本
   		res.setHeader('Content-Type', 'text/html; charset=utf-8')
   		res.end('<h2> hello html <a href="#">点击</a></h2>')
   	}
   })
   
   server.listen(80, function() { //浏览器默认访问80端口，如果服务器上线，服务程序绑定80端口更方便访问
   	console.log('server in running...')
   })
   
   /*
   	在http协议中，Content-Type用来设置内容类型
   */
   ```

* 发送文件中的数据及Content-Type内容类型

  * 在线查询工具：http://tool.oschina.net/commons
  * 不同的文档对应的不同类型：.text--> text/plain; .html-->text/html;.jpg-->img/jpeg，其中，图片不需要指定编码，一般只为字符数据指定编码
  * 结合fs核心模块将页面发送到浏览器

* 在HTML中设置

  * 除了Content-Tpye可以用来指定编码，也可以在HTML页面中通过meta元数据来声明当前文本的编码格式[index.html](./code/resource/index.html)
    * `<meta charset='utf-8'>`

* [http-fs.js](./code/http-fs.js)

```JavaScript

var http = require('http')
var fs = require('fs')

var server = http.createServer()

server.on('request', function(req, res) {
	// / index.html
	var url = req.url
	
	if(url === '/') {
		fs.readFile('./resource/index.html', function(err, data) { // 动态读取文件，修改index.html文件后不需要重启服务器
			if(err) {
				res.setHeader('Content-Type', 'text/plain; charset=utf-8')
				res.end('文件读取失败， 请稍后重试!')	
			}else {
				// data 默认是二进制数据，可以通过.toString 转换
				// end支持两种数据类型，一种是二进制，一种是字符串，可以不转换
				res.setHeader('Content-Type', 'text/html; charset=utf-8')
				res.end(data)
			}
		})
	}else if(url === '/wolf.jpg') {
		// wolf.jpg只是一个标识不是文件路径，可以为任意变量
		// wolf，sheep，jpg。。。。
		fs.readFile('./resource/wolf.jpg', function(err, data) {
			if(err) {
				res.setHeader('Content-Type', 'text/plain; charset=utf-8')
				res.end('文件读取失败')
			}else {
				// 图片不需要指定编码，编码是字符编码，图片设定编码会出现问题
				res.setHeader('Content-Type', 'image/jpeg;')
				res.end(data)
			}
		})
	}
})

server.listen(80, function() {
	console.log('Server is running...')
})
```

#### 1-4 总结



- Node.js是什么

  + JavaScript 运行时
  + 既不是语言，也不是框架，它是一个平台

- Node.js 中的JavaScript

  - 没有BOM，DOM
  - EcmaScript 基本的JavaScript部分
  - 在Node中为JavaScript提供了一些服务器级别的API
    - 文件操作能力
    - http服务能力

- Node中的JavaScript

  - EcmaScript
    - 变量，方法，数据类型，内置对象，Array，Object，Date， Math
  - Node中的模块系统
    - 在Node中没有全局作用域的概念
    - 在Node中只能通过require方法来加载执行多个JavaScript文件
    - require加载只能是执行其中的代码，文件与文件之间由于模块作用域，所以没有污染的问题
      - 模块是完全封闭的
      - 外部无法访问内部
      - 内部无法访问外部
    - 模块作用域：
      - 可以加载执行多个文件，可以完全避免变量命名冲突污染的问题
      - 某些情况下的模块与模块之间的通信，可以通过`exports`完成
        - 每个模块中，都提供了一个对象`exports`
        - `exports`默认是要给空对象{}
        - 需要被外部访问使用的成员手动挂载到`exports`接口对象中
        - 在外部使用的时候`require`指定模块，就可以拿到挂载到`exports`接口对象中的成员
        - 其它规则和使用见后
  - 核心模块
    - 核心模块是由Node提供了一个个的具名的模块，它们都有自己特殊的名称标识
      - fs 文件操作模块
      - http 网络服务构建模块
      - os 操作i系统信息模块
      - path 路径处理模块
    - 所有核心模块在使用的时候都必须手动的使用`require`方法来加载
      - 例如：`var fs = require('fs')`

- http

  - 端口号
    - 端口号定位具体的应用程序
  - ip定位计算机
  - Content-Type
    - 服务器通过头信息设置每次响应的数据类型
    - 不同的资源对应的Content-Type不同
    - 文本类型的数据， 加上编码格式
  - 通过网络发送文件
    - 本质上发送的不是文件，而是文件的内容
    - 浏览器会根据Content-Type解析响应数据

- 代码风格及代码中的分号问题

  - ```javascript
    var foo = 'bar'
    var foo='bar'
    var foo= 'bar'
    var foo ='bar'
    
    if (true) {
        console.log('hello')
    }
    ```

  - 社区诞生的一些比较规范的代码风格

    - [JavaScript Standard Style](https://standardjs.com/)
    - [Airbnb JavaScript Style]

  - ```javascript
    function say() {
        console.log('hello world')
    }
    say()
    
    ;(function() {
        console.log('hello')
    })() //匿名函数不执行
    //匿名函数前面如果没有分号，程序会报错
    
    ;['苹果', '香蕉'].forEach(function (item) {
        console.log(item)
    })
    
    // ` 反引号是EcmaScript 6中新增的一种字符串包裹形式，叫做：模板字符串
    // 它支持换行和非常方便拼接变量
    var foo = `bar
    	大家好
    	hello 				就是这么突出
    	world`
    console.log(foo)
    
    
    ;`hello`.toString()	//前面的；很重要
    ```

  - 当采用无分号的代码风格的时候，只需要注意一下情况就可以了：

    - 当一行代码是以`(`, `[`,  ` 开头的时候，则在前面补上一个分号，避免一些语法解析错误 
    - 有些人也会使用! , ~, &代替；放到一行代码前面

- 一个案例apache

  - [apache-v1/http-helloworld.js](./code/apache-v1)

  - ```javascript
    var http = require('http')
    var fs = require('fs')
    
    
    // 1. 创建Server
    var server = http.createServer()
    
    // 2. 监听Server的request请求事件，兵设置请求处理函数
    // 		一个请求对应一个响应，如果在一个请求的过程中，已经结束响应了，则不能重复
    //		发送响应。没有请求就没有响应。
    //	Apache 服务器软件，默认有一个www目录，所有存放在www目录下的资源
    //	都可以通过网址来浏览
    //	127.0.0.1:80/a.txt
    
    // 为了方便可以设置一个变量存放服路径
    // var wwwDir = 'C://hello/app'
    // fs.readFile(wwwDir+'/apple/login.html'), function(err, data){})
    
    
    // 再进一步
    // 由访问url
    // /--> /index.html
    // /index --> /index.html
    // /apple/login --> /apple/login.html
    // /image/abc.jpg --> /image/abc.jpg
    
    server.on('request', function(req, res) {
    	
    	var url = req.url
    	if(url === '/') {
    		fs.readFile('../app/index.html', function(err, data) {
    			if(err) {
    				res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    				// return 有两个作用：
    				// 1. 方法返回值
    				// 2. 阻止代码继续向后执行
    				return res.end('404 Not Found.')
    			}
    			res.setHeader('Content-Type', 'text/html; charset=utf-8')
    			res.end(data)			
    		})
    	}else if(url === '/txt-a') {
    		fs.readFile('../app/a.txt', function(err, data) {
    			if(err) {
    				res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    				return res.end('404 Not Found.')
    			}
    			// res.setHeader('Content-Type', 'text/html; charset=utf-8')
    			// 设置后就乱码了
    			res.end(data)			
    		})
    	}else if(url === '/login') {
    		fs.readFile('../app/apple/login.html', function(err, data) {
    			if(err) {
    				res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    				return res.end('404 Not Found.')
    			}
    			res.setHeader('Content-Type', 'text/html; charset=utf-8')
    			res.end(data)			
    		})
    	}else if(url === '/index') {
    		fs.readFile('../app/index.html', function(err, data) {
    			if(err) {
    				res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    				return res.end('404 Not Found.')
    			}
    			res.setHeader('Content-Type', 'text/html; charset=utf-8')
    			res.end(data)			
    		})
    	}
    	
    	
    })
    // 3. 绑定端口号， 启动服务
    server.listen(3000, function() {
    	console.log('server running...')
    })
    ```

  - [apachev1.1/http-helloworld1.js](./code/apache-v1)

  - ```javascript
    var http = require('http')
    var fs = require('fs')
    
    
    // 1. 创建Server
    var server = http.createServer()
    
    // 2. 监听Server的request请求事件，兵设置请求处理函数
    
    // 再进一步
    // 由访问url
    // /--> /index.html
    // /index --> /index.html
    // /apple/login --> /apple/login.html
    // /image/abc.jpg --> /image/abc.jpg
    
    server.on('request', function(req, res) {
    	
    	var wwwDir = 'F:/learn/github/learn/nodejs/note/code/app'
    	var url = req.url
    	var filePath = '/index.html'
    	
    	if(url !== '/') {
    		filePath = url
    		
    	}
    	
    	fs.readFile(wwwDir + filePath, function(err, data) {
    	if(err) {
    		return res.end('404 not found')
    	}
    	res.end(data)
    })
    	//console.log(filePath, wwwDir + filePath)
    })
    
    // 3. 绑定端口号， 启动服务
    server.listen(3000, function() {
    	console.log('server running...')
    })
    ```

    





#### 4.3 请求对象Request



#### 4.4 响应对象Response



#### 4.5 在Node中使用模板引擎



#### 4.6 同意处理静态资源



#### 4.7 服务端渲染



### 5 留言本

### 6 Node中的模块系统







## 接下来

* 模块系统
* Node中的其它核心模块
* 做一个小管理系统
  * CRUD(create read update delete)
* Express Web开发框架





