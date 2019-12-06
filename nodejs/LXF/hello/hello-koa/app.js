const Koa = require('koa')

const app = new Koa()

app
.use(async(ctx, next) => {
    console.log(`${ctx.request.method} ${ctx.request.url}`)
    await next()
    console.log('第一个异步函数')
})
.use(async(ctx, next) => {
    const start = new Date().getTime() // 当前时间
    await next() // 调用下一个middleware
    const ms = new Date().getTime() - start // 耗费时间

    console.log('第二个异步函数')
    console.log(`Time: ${ms}ms`) // 打印耗费的时间

})
.use(async(ctx, next) => {
    console.log('第三个异步函数1')
    await next()
    ctx.response.type = 'text/html'
    ctx.response.body = '<h1>Hello, koa2!</h1>'
    console.log('第三个异步函数2')
})
.listen(3000, function() {
    console.log('app started at port 3000...')
})