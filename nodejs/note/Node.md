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

	5. 写文件

    * [writefile.js](writefile.js)

    * 读写文件的时候要加上判断

      **ps: node.js因为是异步的，有很多的回调函数**

    * 简单的http服务（20191016）



## Node中的JavaScript





 