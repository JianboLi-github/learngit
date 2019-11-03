var express = require('express')

var app = express()

app.get('/', function(req, res) {
	// 原来的req.write(), req.end()也是可以用的
	res.send('hello world' )	
})

app.listen(3000, function(){
	console.log('express app is running...')
})