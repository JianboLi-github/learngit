const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const controller = require('./controller')

const app = new Koa()

app.use(async(ctx, nexxt) => {
    console.log(`process ${ctx.request.method} ${ctx.request.url}...`)
    await nexxt()
})

app.use(bodyParser())
app.use(controller())
app.listen(3000, function() {
    console.log('app started at prot 3000...')
})