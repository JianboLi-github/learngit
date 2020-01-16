// 用来获取系统信息
var os = require('os')

// 用来操作路径的
var path = require('path')

// 获取当前机器的CPU信息
console.log(os.cpus())
// 获取总内存的大小
console.log(os.totalmem())

// extname extension name
console.log(path.extname('somewhere/filename.txt'))