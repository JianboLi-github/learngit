var http = require('http')
var server = http.createServer()

server.on('request', function(request, response) {
	console.log('收到客户端的请求, 路径是：'+request.url)
	
	if(request.url == '/') {
		console.log('跳转到index页面')
		response.write('this is index page')
	}else if(request.url == '/login') {
		console.log('跳转到登陆页面')
		response.write('this is login page')
	}else if(request.url == '/register') {
		console.log('跳转到注册页面')
		response.write('this is register page')
	}else {
		response.write('505， 访问的页面不存在')
	}
	response.end()
})

server.listen(3000, function() {
	console.log('服务器启动成功')
})