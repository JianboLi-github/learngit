var url = require('url')

// 默认情况不会把url里的查询字符串转换成对象
// pathname?查询字符串&查询字符串
var str = url.parse('/pinglun?name=电风扇犯得上的&message=发的发都是我')
console.log(str)
console.log(str.query)

var obj = url.parse('/pinglun?name=电风扇犯得上的&message=发的发都是我', true)
console.log(obj)
console.log(obj.query)