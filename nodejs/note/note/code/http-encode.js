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