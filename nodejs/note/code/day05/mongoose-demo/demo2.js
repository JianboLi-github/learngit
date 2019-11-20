var mongoose = require('mongoose')

// 1. 连接数据库，不存在则在插入数据后自动创建
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});

// 2. 设计集合结构（表结构）
var Schema = mongoose.Schema

var blogSchema = new Schema({
    title:  String,
    author: String,
    body:   String,
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now }, // 设置约束
    hidden: Boolean,
    meta: {
        votes: Number,
        favs:  Number
}
});

// 3. 将文档结构发布为模型
// mongoose.model方法就是用来将一个架构发布为model
//      第一个参数；传入一个大写单词单数字符用来表示数据库名称
//          mongoose会自动将大写名字的字符串生成 小写复数 的集合名称
//          例如这里User最终会变成users集合名称
//      第二个参数：架构
//      return: 模型构造函数
var Blog = mongoose.model('Blog', blogSchema)

// 4. 当有了模型函数后，就可以使用这个构造函数对users集合操作了。

// 增加数据
var oneBlog = new Blog({
    title: 'lisi',
    author: 'zhangsan',
    body: 'nothing is possible。',
    comments: {no:1}
})

/*
oneBlog.save(function(err, result) {
    if(err) {
        console.log('保存失败')
    }else {
        console.log('保存成功')
        // console.log(result)
    }
})
*/


// 查询所有数据，返回一个数组
Blog.find(function(err, result){
    if(err) {
        console.log('查询失败')
    }else {
        console.log(result)
    }
})

// 按条件查询数据，返回一个数组
Blog.find({
    title: 'lisi'
},function(err, result){
    if(err) {
        console.log('查询失败')
    }else {
        console.log(result)
    }
})

// 按条件查询一条数据，**返回一个对象**
// 无条件，返回第一条数据
Blog.findOne({
    title: 'lisi',
    author: 'zhangsan'  //复合查询
},function(err, result){
    if(err) {
        console.log('查询失败')
    }else {
        console.log(result)
    }
})