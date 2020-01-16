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