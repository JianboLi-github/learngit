// 在node中使用模板引擎
// art-template 模板引擎


//安装：
//	npm install art-template
//	模板引擎会下载到当前目录。并生成一个node_modules目录存放依赖包
//	node_modules 不要改动


// 在nodejs中也可使用模板引擎art-template
// 模板引擎最早诞生于服务器领域，后来发展到前端
//
// 1. 安装
// 2. 在需要的文件模块中加载art- template
//		只需要使用require方法加载就可以了：require('art-template')
//		参数中的art-template 就是下载的包的名字
// 3. 查文档，使用模板引擎的API


var template = require('art-template')
var fs = require('fs')
// node中使用模板和浏览器中的不同，类似下面对的定义是不可以的
// template('script 标签 id', { 对象 } )

// template.render('{{}}', 替换对象)
// var ret = template.render('hello {{ name }}', {
	// name: '张三'
// })

// var tplStr = `
	
		// hello {{ name }}
		// 大噶好， 我是：{{ name1 }}
// `
// 可以将模板提出来放到外面，用fs.readFile()来读取
// var tplStr = ''

// fs.readFile()第二个参数是回调函数，不可以在回调函数内赋值，在函数外处理
fs.readFile('./tpl.html', function(err, data) {
	if(err) {
		console.log('读取文件失败')
	}
	//默认读取到的data是二进制数据
	// 而模板引擎render方法需要接收的是字符串
	var ret = template.render(data.toString(), {
	name: 'Jack',
	name1: 'zhazhahui',
	age: 18,
	province: 'hongkong',
	hobbies: [
	  '代言网游',
	  '唱歌',
	  '表演'
	]
	})
	console.log(ret)
})



