var fs = require('fs')


var FilePath = 'db/comment.json'

// 这是一个用来存储 Blog 数据的对象
const ModelComment = function(form) {
    // || 是一种新的写法, 在 js 圈子里太过流行, 所以记住即可
    // a = b || c 意思是如果 b 是 undefined 或者 null 就把 c 赋值给 a
 
    this.author = form.author || ''
    this.content = form.content || ''
    // 映射关系
    this.blog_id = form.blog_id || 0
    this.imgUrl = form.imgUrl || ''
    // 生成一个 unix 时间, unix 时间是什么, 上课会说
    this.created_time = Math.floor(new Date() / 1000)
    
}

var getData = function () {
    var content = fs.readFileSync(FilePath, 'utf8')
    var blogs = JSON.parse(content)
    return blogs
  }
// 定义一个对象b 对象的属性是blog的所有数据 一个set方法添加数据并保存 一个get方法返回全部数据
var b = {
    data: getData()
}
b.get = function () {
    return this.data
  }
b.set = function (form) {
    // 从构造器中生成对象
    var m = new ModelComment(form)
    // 添加数据对象的id 如果数据为空 id设为1
    // 去除最后一个数据 判断是否为空
    var d = this.data[this.data.length-1]
    if(d == undefined) {
        m.id = 1
    } else {
        m.id = d.id + 1
    }
    // 将数据添加到json中
    this.data.push(m)
    // 把 最新数据 保存到文件中
    this.save()
    return m
  }

  b.save = function() {
    var s = JSON.stringify(this.data)
    fs.writeFile(FilePath, s, (err) => {
      if (err) {
          console.log(err)
      } else {
          console.log('保存成功')
      }
    })
}
  module.exports = b