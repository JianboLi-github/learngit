var foo = 'bar'


function add(x, y) {
	return x+y
}


// 外部引用只能得到放到exports对象的成员
// 解决变量命令冲突

// expots是一个对象
// 可以通过多次为这个对象添加成员，实现对外导出多个内部成员
exports.add = add
exports.str = 'hello'

// 现阶段外部引用foo模块的时候，默认得到的是exports对象
// 访问时候，需要通过对象访问属性
// 需求：希望外部引用的时候直接获得一个方法/字符串/数字/数组
// 而不是包含所有成员的对象


// 如果模块需要直接到处某个成员，而不是挂载到exports对象中
// 就必须使用module.exports = function/string/array/number
module.exports = add
// module.exports = 'hello'