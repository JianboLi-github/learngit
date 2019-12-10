module.exports = {
    'POST /signin': async (ctx, next) => {
        var 
            email = ctx.request.body.email || '',
            password = ctx.request.body.password || ''
        if (email === 'admin@somewhere.com' && password === 'administrator') {
            console.log('signin ok!')
            ctx.render('signin-ok.html', {
                title: 'Sign In OK',
                name: 'Burch',
            })
        }else {
            console.log('signin failed!')
            ctx.render('signin-failed.html', {
                title: 'Sign In Failed'
            })
        }
    }
}