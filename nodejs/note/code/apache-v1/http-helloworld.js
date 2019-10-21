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