const fs = require('fs')
const path = require('path')

function addMapping(router, mapping) {
    for(var url in mapping) {
        // console.log(url)
        // console.log(mapping[url])
        if(url.startsWith('GET')) {
            var path = url.substring(4)
            router.get(path, mapping[url])
            console.log(`register url mapping:GET ${path}`)
        }else if(url.startsWith('POST')) {
            var path = url.substring(5)
            router.post(path, mapping[url]) 
            console.log(`register url mapping: POST ${path}`)
        }else if(url.startsWith('PUT')) {
            var path = url.substring(4) 
            router.put(path, mapping[url])
            console.log(`register url mpaping: PUT ${path}`)
        }else if(url.startsWith('DELETE')) {
            var path = url.substring(7)
            router.del(path, mapping[url])
            console.log(`register url mapping: DELETE ${path}`)
        }else {
            console.log('Invalid url:'+url)
        }
    }
}

function addControllers(router, dir) {
    fs.readdirSync(path.join(__dirname, dir))
    .filter((f) => {
        return f.endsWith('.js')
    })
    .forEach((f) => {
        console.log(`--proess controller:${f}....`)
        let mapping = require(path.join(__dirname, dir,f))
       
        addMapping(router, mapping)
    })
}

module.exports = function(dir) {
    let 
        controllers_dir = dir || `controllers`,
        router = require('koa-router')()
    addControllers(router, controllers_dir)
    return router.routes()
}
