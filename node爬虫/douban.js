"use strict"


const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs')

// 首先定义一个类 保存爬取的信息
const Movie = function () {
    this.name = ''
    this.score = 0
    this.quote = ''
    this.ranking = 0
    this.coverUrl = ''
}


const log = function () {
    console.log.apply(console, arguments)
}

// 下载图片函数
const downloadCovers = function (movies) {
    for (let i = 0; i < movies.length; i++) {
        const m = movies[i]
        const url = m.coverUrl
        // request('http://abc.com/abc.png').pipe(fs.createWriteStream('abc.png'));
        // 输出到文件流
        const path = m.name.split('/')[0] + '.jpg'
        request(url).pipe(fs.createWriteStream(path))

    }
}

// 保存html
var saveHtml = function (movies) { 
    const path = 'douban.html'
    // 第二个参数是 null 不用管
    // 第三个参数是 缩进层次
    const s = JSON.stringify(movies, null, 2)
    var d = `aaa`
    fs.writeFile(path, d, function (error) {
        if (error !== null) {
            log('*** 写入文件错误', error)
        } else {
            log('--- 保存成功')
        }
    })
 }
// 保存函数
var saveMovies = function (movies) {
    // 这个函数用来把一个保存了所有电影对象的数组保存到文件中

    const path = 'douban.txt'
    // 第二个参数是 null 不用管
    // 第三个参数是 缩进层次
    const s = JSON.stringify(movies, null, 2)
    fs.writeFile(path, s, function (error) {
        if (error !== null) {
            log('*** 写入文件错误', error)
        } else {
            log('--- 保存成功')
        }
    })
}
// 解析html
const movieFromDiv = function (div) {
    // 这个函数来从一个电影 div 里面读取电影信息
    const movie = new Movie()
    // 使用 cheerio.load 函数来返回一个可以查询的特殊对象
    const e = cheerio.load(div)

    // 然后就可以使用 querySelector 语法来获取信息了
    // .text() 获取文本信息
    movie.name = e('.title').text()
    movie.score = e('.rating_num').text()
    movie.quote = e('.inq').text()

    const pic = e('.pic')
    movie.ranking = pic.find('em').text()
    // 元素的属性用 .attr('属性名') 确定
    movie.coverUrl = pic.find('img').attr('src')

    return movie
}
// 爬取函数
var getMovie = function (url) {
    // request拿到html
    request(url, function (error, response, body) {
        if (error === null && response.statusCode == 200) {
            // cheerio.load 用字符串作为参数返回一个可以查询的特殊对象
            // body 就是 html 内容
            const e = cheerio.load(body)
            const movies = []
            // 查询对象的查询语法和 DOM API 中的 querySelector 一样
            const movieDivs = e('.item')
            for (let i = 0; i < movieDivs.length; i++) {
                let element = movieDivs[i]
                // 获取 div 的元素并且用 movieFromDiv 解析
                // 然后加入 movies 数组中
                const div = e(element).html()
                const m = movieFromDiv(div)
                movies.push(m)
            }
            // 保存 movies 数组到文件中
            saveMovies(movies)
            saveHtml(movies)
            downloadCovers(movies)
        } else {
            log('*** ERROR 请求失败 ', error)
        }
    })

}
// 主函数
var _main = function (param) {
    const url = 'https://movie.douban.com/top250'
    getMovie(url)
}
_main()