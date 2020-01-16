// require 是一个方法
// 他的作用就是用来加载模块的
// 在Node中，模块有三种:
//		具名的合兴模块， fs，http
//		用户自己编写的文件模块
//			相对路径必须加 ./
//			可以省略后缀名.js
// require('package')

var foo = 'aaa'
console.log('a.js start.')

require('./b.js')
console.log('a.js end.')

console.log(foo)

