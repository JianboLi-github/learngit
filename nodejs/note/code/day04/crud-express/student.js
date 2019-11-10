/*
	- student.js
	- 数据操作文件模块
	- 功能：操作文件中的数据，只处理数据，不关心业务
*/

var fs = require('fs')
var dbPath = './db.json'

/**
	- 获取所有学生列表
	- callback中的参数：
		+ 第一个参数是err
			* 成功是null
			* 错误是错误对象
		+ 第二个参数是结果
			* 成功是数组
			* 错误是undefined
	- return []
*/
exports.find = function(callback) {
	fs.readFile(dbPath, 'utf-8', function(err, data) {
		// JSON.parse(data).students
		// readFile是异步函数，在这里不能通过find函数
		// 直接获取到readFile读取的结果data
		if(err) {
			return callback(err)
		}
		callback(null, JSON.parse(data).students)
	})
}
	/*
	// 使用的时候
	find(function(err, data) {
		// 通过回调函数，读取异步函数的成员
	})
	*/
	
// 根据id获取学生信息对象	
exports.findById = function(id, callback) {
	fs.readFile(dbPath, 'utf8', function(err, data) {
		if(err) {
			return callback(err)
		}
		var students = JSON.parse(data).students
		var result = students.find(function(item) {
			return item.id === id
		})
		callback(null, result)
	})
}

/**
	添加保存学生	
*/
exports.save = function(student, callback) {
	fs.readFile(dbPath, 'utf-8', function(err, data) {
		if(err) {
			return callback(err)
		}
		var students = JSON.parse(data).students
		//处理id，唯一
		student.id = students[students.length - 1].id + 1
		
		students.push(student)
		
		
		
		
		// 把独享数据转换成字符串
		var fileData = JSON.stringify({ //注意此处json文件保存的格式`{对象}`
			students: students
		})
		
		// 把字符串保存到文件中
		fs.writeFile(dbPath, fileData, function(err) {
			if(err) {
				return callback(err)
			}
			callback(null)
		})
	})
}
	/*
		save({
			name： 'xx',
			age: 20, 
			...: xxx
		}, function(err) {
			if(err) {
				console.log('保存失败！')
			}else{
				console.log('保存成功！')
			}
		})
	*/

/**
	更新学生
*/
exports.updateById = function(student, callback) {
	fs.readFile(dbPath, 'utf-8', function(err, data) {
		if(err) {
			return callback(err)
		}
		var students = JSON.parse(data).students
		// 使用EcmaScript 6 的一个数组方法：find
		// 需要接收一个函数作为参数
		// 当某个遍历项符合item.id ===student.id条件的时候
		// find会终止遍历，返回遍历项
		var stu = students.find(function(item) {
			return item.id === student.id
		})
		
		// 拷贝复制
		
		for (var key in student) {
			stu[key] = student[key]
		}
		
		
		
		var fileData = JSON.stringify({
			students: students
		})
		
		fs.writeFile(dbPath, fileData, function(err) {
			if(err) {
				return callback(err)
			}
			callback(null)
		})
	})
}
	/*
		updateById({
			id: 1,
			name: 'xx',
			age: 15
		}, function(err) {
			
		})
	*/

/**
	删除学生
*/
exports.delte = function() {
	
}