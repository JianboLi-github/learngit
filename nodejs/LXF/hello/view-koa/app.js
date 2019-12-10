const path = require('path')
const Koa = require('koa')

const bodyParser = require('koa-bodyparser')
const controller = require('./controller')
const templating = require('./templating')

const app = new Koa()

const isProduction = process.env.NODE_ENV === 'production'

app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.mothodd} ${ctx.request.url}...`)
    var
        start = new Date().getTime(),
        exectime
    await next()
    execTime = new Date().getTime() - start
    ctx.response.set('X-Response-Time', `${execTime}ms`)
})

if (! isProduction) {
    let staticFiles = require('./static-files')
    app.use(staticFiles('/static/', path.join(__dirname,'../', 'node_modules/bootstrap/dist/')))
}

app.use(bodyParser())
app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction
}))
app.use(controller())
.listen(3000, function() {
    console.log('app start at port 3000')
})