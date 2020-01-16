// 0. 安装
// 1. 引包
var express = require('express')

// 2. 创建服务器应用程序
//	也就是原来的http.createServe
var app = express()


// 当服务器收到get请求 / 的时候，执行回调处理函数
app.get('/', function(req, res) {
	
	// express中通过req.query 获取请求的查询字符串参数
	// 返回的是一个对象
	console.log(req.query)
	
	res.send(`hello express!
	<!DOCTYPE html>
	<html lang='en'>
	<head><meta charset='utf-8'>
		<title> Document </title>
	</head>
	<body>
		<h1> hello express! 你好</h1>
	</body>
	</heml>	
	`)
})

app.get('/about', function(req, res) {
	// res的send方法已经把中文乱码问题处理了
	res.send('我们的目标是星辰大海')
	
	//在express中使用模板引擎有更好的方式：res.render('文件名',{模板对象})

})


// 公开指定目录, 开放资源
// 通过url的/public/xxx就可以访问本地public目录下的所有资源了
app.use('/public/', express.static('./public/'))
app.use('/static/', express.static('./static/'))
// ..




app.listen(3000, function() {
	console.log('app is running at port 3000.')
})