// app application 应用程序

// 为了让目录结构保持统一清洗，约定把所有的HTML文件放到views文件夹

var http = require('http')
var fs = require('fs')
// 导入最外面的模板引擎。
// 一般第三方的包需要放在项目的子目录中
var template = require('art-template')

var comments = [
	{
		name:'张三',
		message: '我张三曾经来过， 你呢？',
		dateTime: '2103-12-33'
	},
	{
		name:'张三',
		message: '我张三曾经来过， 你呢？',
		dateTime: '2103-12-33'
	},
	{
		name:'张三',
		message: '我张三曾经来过， 你呢？',
		dateTime: '2103-12-33'
	}
]

// 一般
// var server = http.createServer()
// server.on('request', function(req, res) {
//	
//})
// server.listen(3000, function(){})

// 简写方式
http.
  createServer(function(req, res) {
	var url = req.url
	if(url === '/') {
		fs.readFile('./views/index.html', function(err, data) {
			if(err) {
				return res.end('404 Not Found')
			}
			var htmlStr = template.render(data.toString(), {
				comments: comments
			})
			res.end(htmlStr)
		})
	}else if(url === '/post') {
		fs.readFile('./views/post.html', function(err, data) {
			if(err) {
				return res.end('404 not found')
			}
			res.end(data)
		})
		
	}else if(url.indexOf('/public/') === 0) { // 请求路径以/public/开头
		// 将一些静态资源放到public中
		// 统一处理：
		// 如果请求路径是以/public/开头的，则可以认为是要获取public中的某个资源，
		// 所以可以直接把请求路径当作文件路径来进行读取
		console.log(url)
		fs.readFile('.' +url, function(err, data) {
			if(err) {
			return res.end('404 Not Found')
			}
			res.end(data)
		})
	}else {
		// 其它的情况全部处理成404
		fs.readFile('./views/404.html', function(err, data) {
			if(err) {
				return res.end('404 Not Found')
			}
			res.end(data)
		})
	}
})
  .listen(3000, function() {
	console.log('server running..')
})