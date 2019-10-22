
var http = require('http')
var fs = require('fs')

var template = require('art-template')

var server = http.createServer()
var wwwDir = '..'

server.on('request', function(req, res) {
	var url = req.url
	
	fs.readFile('../template/template-v3.html', function(err, data) {
		if(err) {
			return res.end('404 not found')
		}
		
		fs.readdir(wwwDir, function(err, files) {
			if(err) {
				return res.end('Can\'t find catalog')
			}
			
			//这里只需要使用模板引擎解析替换data中的模板字符串就可以了
			// 数据就是files
			// 然后区tempate.html文件中编写模板语法就可以了
			// 核心：服务端渲染
			console.log(files)
			var htmlStr = template.render(data.toString(),{
				文件夹: files
			})
			// 发送解析替换后的响应数据
			res.end(htmlStr)		
		})		
	})	
})

server.listen(3000, function() {
	console.log('server is running...')
})

// 中文文件名识别失败
// console.log(filePath)