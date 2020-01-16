const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});


// 创建一个模型，也就是设计数据库
// MongoDB是动态的，非常灵活，在代码中就可一设计数据库
// mongoose可以简化这个过程
const Cat = mongoose.model('Cat', { name: String });

// 实例化一个Cat
const kitty = new Cat({ name: 'Zildjian' });
// 持久化保存kitty实例
kitty.save().then(() => console.log('meow'));