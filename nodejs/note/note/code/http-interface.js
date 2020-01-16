var http = require('http')

var server = http.createServer()

server.on('request', function(req, res) {
	url = req.url
	if(url === '/') {
		res.end('this is index page.')
	}
	// 一个简版的接口服务器
	//		外部请求想要拿服务器上的商品数据
	var products = [
		{
			name: 'apple',
			price: 22222
		},
		{
			name: 'banana',
			price: 222
		},
		{
			name: 'orange',
			price: 20
		}
	]
	
	if(url === '/products') {
		res.end(JSON.stringify(products))
	}
	
	// res.end()响应的内容只能是二进制数据或者字符串，
	// number，object，array，Boolean都不可以作为返回值
})

server.listen(3000, function() {
	console.log('服务器启动成功')
})