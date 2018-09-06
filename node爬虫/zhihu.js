"use strict"


const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs')



// const getData = function (url) {
//     request(url, function (err, response, body) {
//         if (error === null && response.statusCode == 200) {
//             const e = cheerio.load(body)
//             const datas = []
//             // 找到所需的数据 遍历插入数组
//             const dom = e()

//         } else {

//         }
//       })
//   }

  const cachedUrl = function(options, callback) {
    const fs = require('fs')
    // 先生成对应的文件
    const path = options.url.split('/').join('-').split(':').join('-')
    // 先尝试去硬盘中读取这个 url 对应的文件
    fs.readFile(path, function(err, data){
        if (err != null) {
            // 读取这个文件失败
            // 读不到的话说明是第一次请求，那么就使用 request
            request(options, function(error, response, body) {
                // 下载好了之后，保存到本地文件
                // TODO, 应该下载成功之后再保存
                writeToFile(path, body)
                callback(error, response, body)
            })
        } else {
            log('读取到缓存的页面', path)
            // 读取到，说明已经下载过了，我们讲直接读取硬盘上的文件
            const response = {
                statusCode: 200,
            }
            callback(null, response, data)
        }
    })
}
// 主函数
var _main = function (param) {
    const url = 'https://www.zhihu.com/question/31515263'
    const cookie = 'd_c0="AHAAH60MvwqPTjmwvdfucHkj7wveGq79HRM=|1477399807"; _zap=1a080e65-16ac-43a9-801a-44b00d7fdaed; _ga=GA1.2.660325042.1478000638; l_cap_id="MzlmNzBjZDU3MTMzNGU5OGI3ZDFmNmEzNDI0NzFmY2Y=|1480772832|6dc134dbd59983b6a26660f65b653df563f919fb"; cap_id="ZmZiMzc2MjI4Njg5NGJiZWI2ZDk4YzA5OTZkZTg1MDY=|1480772832|60cbf6cbed5bcb72bd31acd601ba6b9cc00d2dcf"; r_cap_id="YWRkOTEyYjZlZGE0NGM2ZTllNjc4MTZlYTIzYTQ2MjY=|1480772833|e0ecc69252705fc92326f5d3a40c4a4bd43e8326"; login="MGYzZjhjOGM1NmI4NGU0MGFlYTAzOGI1MTQyY2Y1YzY=|1480772846|dd72727f01b84566c4a0a82a6dcbaaac319cc6af"; q_c1=89d3fdd12a03449dbcd7511a57e47b11|1483011670000|1477399807000; _xsrf=3aab1ba02fd3d20b00c6feb9f3e1a5c6; __utma=51854390.660325042.1478000638.1483187102.1483187102.1; __utmb=51854390.0.10.1483187102; __utmc=51854390; __utmz=51854390.1483187102.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); __utmv=51854390.100-1|2=registration_date=20130204=1^3=entry_date=20130204=1; z_c0=Mi4wQUFEQTJVTWFBQUFBY0FBZnJReV9DaGNBQUFCaEFsVk43bGxxV0FCUm1PQXItR01YRDF1NkprTFpfUGNCOWtQWkNn|1483187116|9ebe33e6bbe68e9ed0c4b0e361ab3f9344016384'
    const useragent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36'
    const headers = {
        'Cookie': cookie,
        'User-Agent': useragent,
    }

    const options = {
        url: url,
        headers: headers,
    }
    cachedUrl()
}
_main()


// 主函数发送爬取请求 此处为了读取速度 优先在缓存读取数据 故需要一个cache函数

// cache函数 接受两个参数 第一个参数是url和请求头的配置 第二个参数是回调函数

// 判断如果缓存有文件读取当前文件 如果没有则发送request爬取请求 在request的回调函数中将数据写入缓存 此处需要writeFile函数

// 之后调用callback回调函数 函数中拿到筛选过的数组 引入自己写的模块utils

// utils模块包括了一个存储方法 将数据存入本地文件

