var http = require('http')
var fs = require('fs')

var server = http.createServer()
var wwwDir = '../apache2-app'

server.on('request', function(req, res) {
	var url = req.url
	
	fs.readFile('../template/template.html', function(err, data) {
		if(err) {
			return res.end('404 not found')
		}
		// 1. 如何得到wwwDir目录中的文件名和目录名
		//		fs.readdir
		// 2. 如何将得到的文件名和目录名替换到template.html中
		//		2.1 在template.html中需要替换的位置预留一个特殊标记
		//		2.2 根据files生成需要的html内容
		
		fs.readdir(wwwDir, function(err, files) {
			if(err) {
				return res.end('Can\'t find catalog')
			}
			// console.log(files) //将列出的文件名列出
			var content = ''
			files.forEach(function (item) {
				// 在EcmaScript 6 的反引号字符串中，可以使用${}来引用变量
				// 2.1 
				content += `
				<tr>
				<td data-value="login.html"><a class="icon file" draggable="true" href="/D:/PyCharm/github/learngit/nodejs/note/code/apache2-app/apple/login.html">${item}</a></td><td class="detailsColumn" data-value="126">126 B</td><td class="detailsColumn" data-value="1571640180">2019/10/21 下午2:43:00</td>
				</tr>
				`
			})
			// 把特殊位置的字符串替换 --2.3
			data = data.toString()
			data = data.replace('^_^', content)
			// 发送解析替换后的响应数据
			res.end(data)		
		})		
	})	
})

server.listen(3000, function() {
	console.log('server is running...')
})

// 中文文件名识别失败
// console.log(filePath)