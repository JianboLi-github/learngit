var fs = require('fs')
// 第一个参数：filepath
// 第二个参数：filedata
// 第三个参数：回调函数
//	成功： error null
//	失败： error 错误对象
data = 'nodejs向文件写入内容'
fs.writeFile('test.txt', data, function(error) {
	if(error) {
		console.log('文件写入失败')
	}else {
		console.log('文件写入成功')
	}
})