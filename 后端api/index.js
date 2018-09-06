var express = require('express')
var bodyParser = require('body-parser')

var app = express()

// 用来使后端得到ajax传来的数据
app.use(bodyParser.json())
app.use(express.static('static'))

// 加载 blog.js 模块
const blog = require('./blog')

var sendHtml = function (path, response) {
    var fs = require('fs')
    var options = {
        encoding: 'utf-8'
    }
    fs.readFile(path, options, function (err, data) {
        console.log(`读取的html文件 ${path} 内容是`, data)
        response.send(data)
    })
}

app.get('/', function (request, response) {
    var path = 'index.html'
    sendHtml(path, response)
})

app.get('/detail', function (request, response) {
    // console.log('query', request.query)
    var path = 'detail.html'
    sendHtml(path, response)
})


// 添加api
var todoAdd = function (todo) {
    // 给传入的数据添加 id
    var t = todos[todos.length - 1]
    if (t == undefined) {
        todo.id = 1
    } else {
        todo.id = t.id + 1
    }
    // 把 todo 添加到 todos
    todos.push(todo)
    // 把todos保存到文件中
    writeTodosToFile(todos)
    return todo
}

// 删除api
var todoDelete = function (todo) {
    // 遍历todos 找出task相等的项 i 是下表
    var k = Object.keys(todo)[0]
    console.log(todo.task)
    for (let i = 0; i < todos.length; i++) {
        const element = todos[i];
        if (element[k] == todo[k]) {
            todos.splice(i, 1)
        }
    }
    writeTodosToFile(todos)
    return todos
}

// 更新api
var todoUpdate = function (todo) {
    // 遍历todos 找出task相等的项 
    var k = Object.keys(todo)[0]
    console.log('循环外', k, todo[k])
    for (let i = 0; i < todos.length; i++) {
        var element = todos[i];
        if (element[k] !== undefined) {
            element[k] = todo[k]
        }
        console.log('循环内', i, element[k], todo[k])

    }
    writeTodosToFile(todos)
    return todos
}


// 路由配置
// app.get('/api/blog/all', function (request, response) {
//     // 从文件中 读取所有的 todos 再返回给浏览器
//     loadTodosFromFile(function () {
//         var r = JSON.stringify(todos)
//         response.send(r)
//     })
// })
app.get('/api/blog/all', function (request, response) {
    
    var blogs = blog.get()
    var r = JSON.stringify(blogs)
    response.send(r)
})
app.post('/api/blog/add', function (request, response) {
    // 将数据写入json
    var form = request.body
    // 插入新数据并返回
    var b = blog.set(form)
    var r = JSON.stringify(b)
    response.send(r)
    // 从文件中 读取所有的 todos 再返回给浏览器
    // loadTodosFromFile(function () {
    //     var r = JSON.stringify(todos)
    //     response.send(r)
    // })
})

app.post('/todo/add', function (request, response) {
    var todo = request.body
    var t = todoAdd(todo)
    var r = JSON.stringify(t)
    response.send(r)
})

app.post('/todo/delete', function (request, response) {
    var todo = request.body
    var t = todoDelete(todo)
    var r = JSON.stringify(t)
    response.send(r)
})

app.post('/todo/update', function (request, response) {
    var todo = request.body
    var t = todoUpdate(todo)
    var r = JSON.stringify(t)
    response.send(r)
})

// 开启本地服务器
var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)
})