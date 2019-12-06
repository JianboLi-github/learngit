const Koa = require('koa')

// require('koa-router')返回的是函数而不是一个对象，
// 在使用的时候需要执行
const router = require('koa-router')()
const bodyParser = require('koa-bodyparser')


const app = new Koa()

// log request URL
app.use(async(ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}`)
    await next()
})

// add url-router
router.get('/hello/:name', async(ctx, next) => {
    var name = ctx.params.name
    ctx.response.body = `<h1>Hello, ${name}</h1>`
})
router.get('/', async(ctx, next) => {
    ctx.response.body = `
    <h1>Index.html</h1>
    <form action='/signin' method='post'>
        <p>name: <input name='name' value = 'koa'></p>
        <p>password: <input name='password' type='password'></p>
        <p><input type='submit' value='Submit'></p>
    </form>
    `
})

router.post('/sigin', async(ctx, next) => {
    
})

//koa-bodyparser必须在 router之前
app.use(bodyParser())

// add router middleware
app.use(router.routes())
.listen(3000, function() {
    console.log('app started at port 3000...')
})