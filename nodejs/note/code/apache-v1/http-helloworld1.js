var http = require('http')
var fs = require('fs')


// 1. 创建Server
var server = http.createServer()

// 2. 监听Server的request请求事件，兵设置请求处理函数


// 为了方便可以设置一个变量存放服路径
// var wwwDir = 'C:/hello/app'
// fs.readFile(wwwDir+'/apple/login.html'), function(err, data){})


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