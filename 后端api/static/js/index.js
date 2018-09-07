var e = function (element) {
    return document.querySelector(element)
}

var ajax = function (request) {
    /*
    request 是一个 object, 有如下属性
        method, 请求的方法, string
        url, 请求的路径, string
        data, 请求发送的数据, 如果是 GET 方法则没这个值, string
        callback, 响应回调, function

    本题不会就放弃, 本题带了一个用法在下方
    */
    var r = new XMLHttpRequest()
    r.open(request.method, request.url, true)
    if (request.contentType !== undefined) {
        r.setRequestHeader('Content-Type', request.contentType)
    }
    r.onreadystatechange = function (event) {
        if (r.readyState === 4) {
            request.callback(r.response)
        }
    }
    if (request.method === 'GET') {
        r.send()
    } else {
        r.send(request.data)
    }
}

// 生成随即图片链接
var random = function () {
    var i = Math.floor(Math.random() * 964)
    var url = 'http://7xr4g8.com1.z0.glb.clouddn.com/' + i
    return url
}

// 搜索功能
var searchTitle = function (v) {
    // 先隐藏所有的 gua-title(添加 gua-hide class)
    $('#insert div').hide()
    $('#insert div').each(function () {
        var title = $(this)
        if (title.text().toLowerCase().includes(v.toLowerCase())) {
            title.show()
        }
    })
    console.log(v, d)
}

var blogDetailTemplate = function (detail) {
    var id = detail.id
    var title = detail.title
    var imgUrl = detail.imgUrl
    var author = detail.author
    var content = detail.content
    var id = detail.id
    // var blog_id = detail.blog_id
    var d = new Date(detail.created_time * 1000)
    var time = d.toLocaleString()
    var t =
        `
        <div class="">
        <div class="thumbnail">
            <img alt="300x200" src=${imgUrl} />
            <div class="caption blog">
                <a  href="#" >
                <h3 class="blog-title" data-id="${id}">
                ${title}
                </h3>
                </a>
                <div class="">
                    <span>${author}</span> @ <time>${time}</time>
                </div>
                <p class="content">
                    ${content}
                </p>
                <p class="text-right">
                    <a class="btn blog-comment" href="#" data-id="${id}">评论</a>
                </p>
            </div>
        </div>
    </div>
            `
    return t
}

var insertBlogDetail = function (data) {
    var d = blogDetailTemplate(data)
    // window.open('/detail.html', "_blank")
    e('#insert').innerHTML = d
    // 删除轮播部分
    e('#lb').innerHTML = `<h1>博客详情</h1>`
}

var commentsTemplate = function (comment) {
    // var id = blog.id
    // var title = blog.title
    var imgUrl = comment.imgUrl
    var author = comment.author
    var content = comment.content
    var id = comment.id
    // var blog_id = comment.blog_id
    var d = new Date(comment.created_time * 1000)
    var time = d.toLocaleString()
    var t =
        `
                <div class="">
                    <div class="thumbnail">
                    <img alt="300x200" src=${imgUrl} />
                        <div class="caption blog">
                        <input type="hidden" class="form-control" id="comment-blog-id" value="${id}">
                            <div class="">
                                <span>${author}</span> @ <time>${time}</time>
                            </div>
                            <p class="content">
                                ${content}
                            </p>
                            
                        </div>
                    </div>
                </div>
            `
    return t
}

// 插入comments的函数
var insertCommentsAll = function (data) {
    var comments = JSON.parse(data)
    // 覆盖写入
    var html = ''
    for (var i = 0; i < comments.length; i++) {
        var b = comments[i]
        // html模板
        var t = commentsTemplate(b)
        html += t
    }
    // 把数据写入 .gua-blogs 中, 直接用覆盖式写入
    var div = e('#insert')
    div.innerHTML = html
}

var blogNew = function (data) {
    var form = {
        title: data.title || "测试标题",
        author: data.author || "gua",
        content: data.content || "测试内容",
        imgUrl: data.imgUrl || ''
    }

    var data = JSON.stringify(form)
    var request = {
        method: 'POST',
        url: '/api/blog/add',
        data: data,
        contentType: 'application/json',
        callback: function (response) {
            console.log('响应', response)
            // var res = JSON.parse(response)

        }
    }
    ajax(request)
}

var insertBlogAll = function (blogs) {
    // 覆盖写入
    var html = ''
    for (var i = 0; i < blogs.length; i++) {
        var b = blogs[i]
        // html模板
        var t = blogTemplate(b)
        html += t
    }
    // 把数据写入 .gua-blogs 中, 直接用覆盖式写入
    var div = e('#insert')
    div.innerHTML = html
}

var blogTemplate = function (blog) {
    var id = blog.id
    var title = blog.title
    var imgUrl = blog.imgUrl
    var author = blog.author
    var content = blog.content
    var d = new Date(blog.created_time * 1000)
    var time = d.toLocaleString()
    var t =
        `
            <div class="">
                <div class="thumbnail">
                    <img alt="300x200" src=${imgUrl} />
                    <div class="caption blog">
                        <a  href="#" >
                        <h3 class="blog-title" data-id="${id}">
                        ${title}
                        </h3>
                        </a>
                        <div class="">
                            <span>${author}</span> @ <time>${time}</time>
                        </div>
                        <p class="content">
                            ${content}
                        </p>
                        <p class="text-right">
                            <a class="btn blog-comment" href="#" data-id="${id}">评论</a>
                        </p>
                    </div>
                </div>
            </div>
        `
    return t
}

// 发送ajax请求 在回调函数中调用插入数据的
var blogAll = function () {
    var request = {
        method: 'GET',
        url: '/api/blog/all',
        contentType: 'application/json',
        callback: function (response) {
            // 不考虑错误情况(断网/服务器返回错误等等)
            console.log('响应', response)
            var blogs = JSON.parse(response)
            // 数据放入window
            window.blog = blogs
            // 插入数据的函数
            insertBlogAll(blogs)
        }
    }
    ajax(request)
}

var bindEvents = function () {
    // 绑定发表新博客事件
    var button = e('#newBlog')
    var search = e('#search')
    var blog = e('#insert')

    search.addEventListener('keyup', function (event) {
        var s = event.target
        var v = search.value
        searchTitle(v)
    })

    // 添加博客事件
    button.addEventListener('click', function (event) {
        // console.log('click new')
        // 得到用户填写的数据
        // 随即图片api http://7xr4g8.com1.z0.glb.clouddn.com/671
        var imgSrc = random()
        // console.log(random())
        var form = {
            title: e('#blog-title').value,
            author: e('#blog-author').value,
            content: e('#blog-content').value,
            imgUrl: imgSrc
            // mima: e('#id-input-mima').value,
        }
        // console.log(form)
        // 用这个数据调用 blogNew 来创建一篇新博客
        blogNew(form)
    })

    // 点击博客区域事件（事件委托）
    blog.addEventListener('click', function (event) {
        var target = event.target
        // 点击标题 向后台发送查询字段 后台返回查询页面
        if (target.classList.contains('blog-title')) {
            var id = target.dataset.id
            var data = window.blog[id - 1]
          
            // // 直接改地址方法
            // window.location.pathname = '/comments'
            
            // 直接插入dom的方法
            console.log('detail', data)
            var detail = {
                id: data.id,
                title: data.title,
                author: data.author,
                content: data.content,
                imgUrl: data.imgUrl
            }
            console.log('detail', detail)
            
            insertBlogDetail(detail)

            // console.log('a', id, data)
        } else
            // 点击评论 像后台发送ajax返回评论详情页面
            if (target.classList.contains('blog-comment')) {
                var id = target.dataset.id
                var data = window.blog[id - 1]
                var comments = data.comments
                var html = JSON.stringify(comments)
                // 发送ajax 传递comments数据
                ajax({
                    method: 'GET',
                    url: '/comments',
                    contentType: 'application/json',
                    callback: function (response) {
                        // console.log('comments', response)
                        // var res = JSON.parse(response)
                        // console.log('comments', response, comments)
                        // 替换页面内容 保证window数据不丢失
                        e('html').innerHTML = response
                        // window.location.pathname = 'comments'
                        // 插入数据
                        insertCommentsAll(html)
                        // comment提交事件
                        e('#newComment').addEventListener('click', function (event) {
                            var imgSrc = random()
                            var form = {
                                author: e('#comment-author').value,
                                content: e('#comment-content').value,
                                blog_id: id,
                                imgUrl: imgSrc
                                // mima: e('#id-input-mima').value,
                            }

                            var data = JSON.stringify(form)
                            var request = {
                                method: 'POST',
                                url: '/api/comment/add',
                                data: data,
                                contentType: 'application/json',
                                callback: function (response) {

                                }
                            }
                            ajax(request)
                        })
                    }
                })

            }

    })

}

var __main = function () {
    // 载入博客列表
    blogAll()
    // 绑定事件
    bindEvents()
}

__main()


// 定义ajax函数
// var ajax = function (method, path, data, reseponseCallback) {
//     var r = new XMLHttpRequest()
//     // 设置请求方法和请求地址
//     r.open(method, path, true)
//     // 设置发送的数据的格式
//     r.setRequestHeader('Content-Type', 'application/json')
//     // 注册响应函数
//     r.onreadystatechange = function () {
//         if (r.readyState === 4) {
//             reseponseCallback(r)
//         }
//     }
//     // 发送请求
//     r.send(data)
// }
// ajax('GET', 'api/todo/all', '', function (r) {
//     console.log(r)
// })