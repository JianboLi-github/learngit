/*
	- router.js 路由模块
	- 职责：
		+ 处理路由
		+ 根据不同的请求方法+请求路径设置具体的请求处理函数
	- 模块职责要单一
*/

var fs = require('fs')

// 普通处理
/*
module.exports = function(app) {
	
	app.get('/students', function(req, res) {})
	
	app.get('/students/new', function(req, res) {})
	
	app.post('/students/new', function(req, res) {})
	
	app.get('/students/edit', function(req, res) {})
	
	app.post('/students/edit', function(req, res) {})
	
	app.get('/students/delete', function(req, res) {})	
}
*/

// Express提供了一种更好的方式
// 抓门用来包装路由的

var express = require('express')
var Student = require('./student')
/*
// 写在最外面的代码，用来测试update
Student.updateById({
	id: 1,
	name: '王小二',
	age: 10.9
}, function(err) {
	if(err) {
		return console.log('修改失败')
	}
	console.log('修改成功')
})

*/

// 1. 创建一个路由容器
var router = express.Router()

// 2. 把路由都该再到router路由容器中
router.get('/', function(req, res) {
	/*
	// 渲染首页
	fs.readFile('./db.json', 'utf-8', function(err, data) {
		if(err) {
			return res.status(500).send('server error')
		}
		var students = JSON.parse(data).students
		res.render('index.html', {
			fruits: [
				'苹果',
				'香蕉',
				'句子'
			],
			students: students
		})
	})
	*/
	
	// 优化，抽取文件读取
	Student.find(function(err, students) {
		if(err) {
			return res.status(500).send('server error')
		}
		res.render('index.html', {
			fruits: [
				'苹果',
				'香蕉',
				'句子'
			],
			students: students
		})
	})
})
router.get('/students', function(req, res) {
	res.redirect('/')
})

router.get('/students/new', function(req, res) {
	res.render('new.html')
})

router.post('/students/new', function(req, res) {
	// 1. 获取表单数据
	//		使用body-parser获取表单请求体
	// 2. 处理
	//		保存到json文件中，用以持久化
	// 3. 发送响应
	console.log(req.body)
	
	// 先读取文件数据，然后转换为对象
	// 向对象中push（unshift）数据
	// 对象转换为字符串
	// 字符串写入文件
	
	var student = req.body
	Student.save(student, function(err) {
		if(err) {
			return res.status(500).send('server error')
		}
		res.redirect('/students')
	})
	
	
})

router.get('/students/edit', function(req, res) {
	// 1. 在客户端的列表页中处理链接问题（需要有id参数）
	// 2. 获取编辑的学生id
	// 3. 渲染编辑页面
	// 		根据id查询学生信息
	console.log(req.query.id)
	
	Student.findById(parseInt(req.query.id), function(err, student) {
		if(err) {
			return res.status(500).send('server error')
		}
		console.log(student)
		res.render('edit.html', {
			student: student
		})
	})
	
})

router.post('/students/edit', function(req, res) {
	// 1. 获取表单数据
	// 		req.body
	// 2. 更新
	// 		Student.update()
	// 3. 发送响应
	console.log(req.body)
	Student.updateById(req.body, function(err) {
		if(err) {
			return res.status(500).send('server error')
		}
		res.redirect('/students')
	})
	
})

router.get('/students/delete', function(req, res) {
	// 1. 获取要删除的id
	// 2. 根据id执行删除操作
	// 3. 根据操作结果发送响应数据
	console.log(req.query.id)
	Student.deleteById(req.query.id, function(err) {
		if(err) {
			return res.status(500).send('server error')
		}
		res.redirect('/students')
	})
})	

// 3. 把router导出
module.exports= router
