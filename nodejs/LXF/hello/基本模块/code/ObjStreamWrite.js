'use strict'

var fs = require('fs')

var writeStream1 = fs.createWriteStream('./data/output1.txt', 'utf-8')
writeStream1.write('使用Stream写入文本数据。。。\n')
writeStream1.write('end')
writeStream1.end()

var writeStream2 = fs.createWriteStream('./data/output2.txt', 'utf-8')
writeStream2.write(new Buffer.from('使用Stream写入二进制数据..\n', 'utf-8'))
writeStream2.write(new Buffer.from('end', 'utf-8'))
writeStream2.end()