// fs是file-system的简写,文件系统
// 在Node中如果想要进行文件操作，
// 就必须引入fs这个核心模块
// 在fs这个核心模块中，就提供了所有的文件
// 操作相关的API

// 1. 使用require方法加载fs核心模块
var fs = require('fs')

// 2. read file
// fs.readFile(filepath, 回调函数)
// 回调函数接受两个参数：
//		error:读取成功，error就是null
//			读取失败，error就是错误对象
//		data：读取成功，data就是读取到的数据
//			读取失败，data就是undefined 没有数据
fs.readFile('helloworld.js', function (error, data) {
	// <Buffer 20 76 61 72 20 66 6f 6f 20 3d 20 27 62 61 72 27 0d 0a 20 63 6f 6e 73 6f 6c 65 2e 6c 6f 67 28 66 6f 6f 29>
	// 读取到的是文件存储的二进制数据
	if(error) {
		console.log('读取文件失败')
	}else {
		console.log(data)
		console.log(data.toString())
	}
})


