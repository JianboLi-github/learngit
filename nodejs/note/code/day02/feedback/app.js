// app application 应用程序

// 为了让目录结构保持统一清洗，约定把所有的HTML文件放到views文件夹

var http = require('http')
var fs = require('fs')
var url = require('url')
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

// pinglun?name=大大大实打实&message=dfadafasdfasfas
// 对于这种表单提交的请求路径，由于其中具有用户动态填写的内容
// 所以不可能通过判断完整url路径的方式来处理这个请求
//
// 结论：所以只需要判断请求路径是 /pinglun的时候，就可以认为请求为提交表单请求



// 一般
// var server = http.createServer()
// server.on('request', function(req, res) {
//	
//})
// server.listen(3000, function(){})

// 简写方式
http.
  createServer(function(req, res) {
	
	//使用url.parse 方法将路径解析为一个方便操作的对象, 第二个参数为true
	// 通过query属性访问解析后，查询字符串转换成的对象
	var parseObj = url.parse(req.url, true)
	// 单独获取不包含查询字符串的路径部分
	var pathname = parseObj.pathname
	if(pathname === '/') {
		fs.readFile('./views/index.html', function(err, data) {
			if(err) {
				return res.end('404 Not Found')
			}
			var htmlStr = template.render(data.toString(), {
				comments: comments
			})
			res.end(htmlStr)
		})
	}else if(pathname === '/post') {
		fs.readFile('./views/post.html', function(err, data) {
			if(err) {
				return res.end('404 not found')
			}
			res.end(data)
		})
		
	}else if(pathname.indexOf('/public/') === 0) { // 请求路径以/public/开头
		// 将一些静态资源放到public中
		// 统一处理：
		// 如果请求路径是以/public/开头的，则可以认为是要获取public中的某个资源，
		// 所以可以直接把请求路径当作文件路径来进行读取
		console.log(pathname)
		fs.readFile('.' +pathname, function(err, data) {
			if(err) {
			return res.end('404 Not Found')
			}
			res.end(data)
		})
	}else if (pathname === '/pinglun') {
		
		res.setHeader('Content-Type', 'text/plain; charset=utf-8')
		// 注意：这个时候无论查询字符串是什么都可以。因为pathname不包含拆线呢字符串
		
		// console.log('收到表单请求了', parseObj.query)
		// 一次请求对应一次响应，响应结束请求也就结束了。
		// res.end()后，其他的内容客户端不会收到
		// res.end(JSON.stringify(parseObj.query))
		
		// 接下来：
		// 1. 获取表单提交的数据 parseObj.query
		// 2. 将当前的时间添加到数据对象中，存储到数组
		// 3. 表单重定向：提交完数据跳转到首页
		
		var comment = parseObj.query
		comment.dateTime = '20点22分'
		comments.unshift(comment)
		// 服务端这个时候已经把数据存储好了。
		// 服务端重定向--表单重定向
		
		// 如何通过服务器，让客户端重定向？
		// 1. 状态吗设置为302  临时重定向
		// 		statusCode //查文档
		// 2. 在响应头通过location 确定重定向地址
		//		setHeader 如果客户端中发现收到服务器的响应状态码为302就会自动去响应头中招Location， 然后对该地址发起新请求
		// 客户端会自动跳转
		res.statusCode = 302
		// res.setHeader('Location', '127.0.0.1:3000')
		res.setHeader('Location', '/')
		res.end()
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