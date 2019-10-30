day03-模块系统和express

- 模块系统
  - 核心模块
  - 第三方模块
  - 自定义模块
- npm
- package.json
- Express
  - 高度封装了http模块
  - 第三方web开发框架
- 增删改查
  - 使用文件存储数据
  - 使用异步编码
- MongoDB
- 书籍
  - 《JavaScript 高级编程》第三版
  - 《JavaScript语言精粹》
- seo资料（搜索引擎优化）



### each和foreach

- each是art-template的模板语法，专属的。只能在模板字符串中去使用

  - ```javascript
    {{each 数组}}
    <li>{{$value}}</li>
    {{/each}}
    ```

  - ```javascript
    // forEach是EcmaScript 5中的一个数组遍历函数，是JavaScript原生支持的语法.可以遍历任何可遍历的成员
    ```

  - ```jQuery
    $.each(数组, function)
    $(.div).each(function)  // 一种用于遍历jQuery选择器选择道德伪数组实力对象
    ```

  - jQuery的each方法和forEach几乎一致

  - 低版本浏览器有时会不支持EcmaScritp 5的forEach

- 杂记

  - 伪数组是对象
  - 对象的原型链中没有forEach
  - 对象的原型链是Object.prototype

- ```javascript
  <script>
      <div></div>
  <div></div><div></div>
      <div></div>
  
  $('div').each(function (index, item) {
      console.log(item)
  })
  
  
  // - 这个each是jQuery提供的
  // - 这个each在jQuery的原型链中
  ;[].slice.call($('div')).forEach(function(item) {
      console.log(item)
  })
  
  </script>
  ```

- 

