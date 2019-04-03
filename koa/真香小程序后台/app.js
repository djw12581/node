// // 工具函数
// const log = function () {
//     console.log.apply(this, arguments)
// }

// const fs = require('fs');
// const Koa = require('koa');
// const app = new Koa();
// const route = require('koa-route');

// // 读取模板文件
// const main = ctx => {
//     ctx.response.type = 'html';
//     ctx.response.body = fs.createReadStream('./template.html');
// };
// const d = ctx => {
    
//     ctx.response.body = 'aa';
// };

// // 配置路由
// app.use(route.get('/', main));
// app.use(route.get('/d', d));

// // 链接数据库


// // 对于任何请求，app将调用该异步函数处理请求：
// app.use(async (ctx, next) => {
//     await next();
//     // todo
// });


// // 开启服务
// app.listen(3000);

// log('服务器运行')

const Koa = require('koa');
const cors = require('koa-cors');
const koaBody = require('koa-body');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const router = require('./routers/index');

// 处理跨域问题
app.use(cors())

// 处理原生的node还是koa都无法直接解析request的body
app.use(koaBody()).use(bodyParser());

// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods());


// 将 public 目录设置为静态资源目录
const static = require('koa-static');
const main = static(__dirname);
app.use(main);

const render = require('koa-ejs');
const path = require('path');

render(app, {
    root: path.join(__dirname, 'view'),
    layout: false,
    viewExt: 'html',
    cache: false,
    debug: false
});

app.listen(3000)
console.log('http://localhost:3000');