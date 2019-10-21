var fs = require('fs')
fs.readdir('.', function(err, files) {
	if(err) {return }
	console.log(files)
})