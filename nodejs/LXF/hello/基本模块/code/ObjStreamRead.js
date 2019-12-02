'use strict'

var fs = require('fs')

// 打开一个流
// var rs = fs.createReadStream('/data/output.txt', 'utf-8')
// error:Error: ENOENT: no such file or directory, open 'F:\data\output.txt'
var rs = fs.createReadStream('./data/output.txt', 'utf-8')

rs.on('data', function(chunk) {
    console.log('data:')
    console.log(chunk)
})

rs.on('end', function() {
    console.log('end')
})

rs.on('error', function(err) {
    console.log('error:'+err)
})