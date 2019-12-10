const path = require('path')
const mime = require('mime')
const fs =require('fs')

// 指定静态资源的本地路径
function staticFiles(url, dir) {
    return async (ctx, next) => {
        let rpath = ctx.request.path
        if (rpath.startsWith(url)) {
            let fp = path.join(dir, rpath.substring(url.length))
            
            if(fs.existsSync(fp)) {
                // mime 2.x lookup renamed to getType() 
                ctx.response.type = mime.getType(rpath)
                ctx.response.body = await fs.readFile(fp)
            }else {
                ctx.response.status = 404
            }
        }else {
            await next()
        }
    }
}
module.exports = staticFiles
