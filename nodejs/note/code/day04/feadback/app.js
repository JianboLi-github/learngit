var express = require('express')
var app = express()
var bodyParser = require('body-parser')

// 模板引擎后缀名也可以为其它
// app.engine('art', require('express-art-template'))
app.engine('html', require('express-art-template'))


app.use('/public', express.static('./public/'))

// 配置body-parser中间件 
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

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

app.get('/', function(req, res) {
	// res.render('404.art')
	res.render('index.html', {
		comments: comments
	})
})

app.get('/post', function(req, res) {
	res.render('post.html')
})


app.post('/post', function(req, res) {
	
	//1. 获取表单post请求数据
    //2. 处理
    //3. 发送响应
    var comment = req.body
	comment.dateTime = '16点44分'
	comments.unshift(comment)
	res.redirect('/')
})

app.listen(3000, function() {
	console.log('running....')
})