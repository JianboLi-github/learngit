'use strict'

var 
    fs = require('fs'),
    url = require('url'),
    path = require('path'),
    http = require('http')


var root = path.resolve(process.argv[2] || '.')
console.log('static root dir:' + root)

http.createServer(function (request, response) {
    var pathname = url.parse(request.url).pathname
    var filename = path.join(root, pathname)

    fs.stat(filename, function(err, stats) {
        if(!err && stats.isFile()) {
            console.log('200' + request.url)
            response.writeHead(400)
            fs.createReadStream(filename).pipe(response)
        }else {
            console.log('404' + request.url)
            response.writeHead(404)
            fs.createReadStream(path.join(filename, 'output.txt')).pipe(response)
            // response.end('404 not found')

        }
    })

}).listen(8080, function() {
    console.log('Server is running at 8080')
})