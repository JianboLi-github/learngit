## express

- Express
- 基于文件做 CRUD（增上改查）
- res.send，res.redirect这些方法在express中都会自动结束响应



## 1. 修改完代码自动重启

​	使用第三方命令行工具，nodemon.

- nodemon 是一个基于nodejs开发的一个第三方命令行工具`npm install --global nodemon`

- 安装完毕后，使用

  ```shell
  # node app.js
  # 使用nodemon
  nodemon app.js
  ```

- 只要是通过`nodemon app.js`启动的服务，则它会监视你的文件变化，当文件发生变化的时候，自动重启服务器

  

# 2. express起步

- hello world

- ```javascript
  const express = require('express')
  const app = express()
  
  app.get('/', (req, res) => res.end('hello world'))
  ```

- 基本路由

  - 请求方法
  - 请求路径
  - 请求处理函数

- ```javascript
  //get
  app.get('/', function(req, res) {
      res.send('hello world')
  })
  
  //post
  app.post('/', function (req, res) {
      res.send('got a post request')
  })
  
  ```

- 静态服务

- ```javascript
  app.use(express.static('public'))
  app.use(express.static('files'))
  
  app.use('/static', express.static('public'))
  
  app.use('/static', express.static(path.jon(__dirname, 'public')))
  ```

- 当省略第一个参数的时候，则可以通过省略/public的方式来访问

- 例如：访问公开资源`./public/login.html`则可以在省略第一个参数的情况下，通过url`IP:port/login.html`就可以访问到

- express修改留言板



## 3. 在Express中使用art-template

​	参见art-template 官方文档

- 安装；配置；使用
  - [Express](https://aui.github.io/art-template/)
  - Koa也在这里可以找到

其中最终纲要的一句话`app.engine('art', require('express-art-template'))`

- 第一个参数表示，当渲染以.`art`结尾的文件的时候，使用art-template模板引擎
- express-art-template是专门用来在express中把art-template整合到express中
- `express-art-template`包依赖了`art-template`包，使用时要确保art-template包已经安装
- Express为Response响应对象提供了一个方法：render。render方法默认时不可以使用，但是如果配置了模板引擎就可以使用了
- `res.render('html模板名'， {模板数据})`
- 第一个参数不能写路径，默认去项目的views目录下查找改模板文件。也就是说Express有一个约定：开发人员把所有的视图文件都放到views目录中

```javascript
var express = require('express')
var app = express()


// 模板引擎后缀名也可以为其它
// app.engine('art', require('express-art-template'))
app.engine('html', require('express-art-template'))


app.use('/public', express.static('./public/'))

app.get('/', function(req, res) {
	// res.render('404.art')
	res.render('404.html')
})

app.get('/post', function(req, res) {
	res.send('post page')
})

app.listen(3000, function() {
	console.log('running....')
})
```

模板文件: `./views/404.html`

- 如果想要修改视图渲染存储目录，默认的views目录，则可以`app.set('views', render函数的默认路径)`

#### 3.1 feadback-express， get方式获取表单数据

```javascript
var express = require('express')
var app = express()


// 模板引擎后缀名也可以为其它
// app.engine('art', require('express-art-template'))
app.engine('html', require('express-art-template'))


app.use('/public', express.static('./public/'))



var comments = [
	{
		name:'张三',
		message: '我张三曾经来过， 你呢？',
		dateTime: '2103-12-33'
	},
	{
		name:'张三',
		message: '我张三曾经来过， 你呢？',
		dateTime: '2103-12-33'
	},
	{
		name:'张三',
		message: '我张三曾经来过， 你呢？',
		dateTime: '2103-12-33'
	}
]

app.get('/', function(req, res) {
	// res.render('404.art')
	res.render('index.html', {
		comments: comments
	})
})

app.get('/pinglun', function(req, res) {
	var comment = req.query
	comment.dateTime = '15点52分'
	comments.unshift(comment)
	
	// res.statusCode = 302
	// res.setHeader('Location', '/')
	res.redirect('/')
})


app.get('/post', function(req, res) {
	res.render('post.html')
})

app.listen(3000, function() {
	console.log('running....')
})
```

#### 3.2 在express获取理表单post请求`体`数据

```html
<form action='/post' method='post'>
    <hr>
</form>
```

```javascript
// app.get()
app.post('/post'， function(req, res) {
    console.log('收到表单post请求了')
    //1. 获取表单post请求数据
    //2. 处理
    //3. 发送响应
    // 注意，req.query只能拿get请求参数
    console.log(req.query)
    
})
// 当以post请求 /post的时候，执行指定的处理函数
// 不同的请求方法使用同一个请求路径
```

- 在Express中没有内置获取表单POST请求体的API，这里需要使用第三方包`body-paser`

- 配置body-parser后，req请求对象会添加一个属性:`body`，也即是说可以通过`req.body`来获取表单POST请求体数据了

- ```javascript
  var express = require('express')
  var bodyParser = require('body-parser')
  
  var app = express()
  
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }))
  
  // parse application/json
  app.use(bodyParser.json())
  
  app.use(function (req, res) {
    res.setHeader('Content-Type', 'text/plain')
    res.write('you posted:\n')
    res.end(JSON.stringify(req.body, null, 2))
  })
  ```

- [middleware](http://www.expressjs.com.cn/en/resources/middleware/body-parser.html)

  - ```javascript
    var express = require('express')
    var app = express()
    var bodyParser = require('body-parser')
    
    // 模板引擎后缀名也可以为其它
    // app.engine('art', require('express-art-template'))
    app.engine('html', require('express-art-template'))
    
    
    app.use('/public', express.static('./public/'))
    
    // 配置body-parser中间件 
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())
    
    var comments = [
    	{
    		name:'张三',
    		message: '我张三曾经来过， 你呢？',
    		dateTime: '2103-12-33'
    	},
    	{
    		name:'张三',
    		message: '我张三曾经来过， 你呢？',
    		dateTime: '2103-12-33'
    	},
    	{
    		name:'张三',
    		message: '我张三曾经来过， 你呢？',
    		dateTime: '2103-12-33'
    	}
    ]
    
    app.get('/', function(req, res) {
    	// res.render('404.art')
    	res.render('index.html', {
    		comments: comments
    	})
    })
    
    app.get('/post', function(req, res) {
    	res.render('post.html')
    })
    
    
    app.post('/post', function(req, res) {
    	
    	//1. 获取表单post请求数据
        //2. 处理
        //3. 发送响应
        var comment = req.body
    	comment.dateTime = '16点44分'
    	comments.unshift(comment)
    	res.redirect('/')
    })
    
    app.listen(3000, function() {
    	console.log('running....')
    })
    ```

  - 