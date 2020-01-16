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