
// 程序即将退出时的回调函数：
process.on('exit', function(code) {
    console.log('about to exit with code:' + code)
    console.log('最后的声音。。')
})


process.nextTick(function() {
    console.log('nextTick callback')
})

console.log('nextTick was set!')

