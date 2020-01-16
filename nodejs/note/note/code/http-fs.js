
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