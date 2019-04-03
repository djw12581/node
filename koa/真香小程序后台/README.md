# 建立 http 服务

const Koa = require('koa');
const app = new Koa();

const main = ctx => {
  ctx.response.body = 'Hello World';
};

app.use(main);
app.listen(3000);

# http 请求和相应的类型
ctx.request.accepts('json')
ctx.response.type = 'json';

# 读取模板文件

fs.createReadStream('./demos/template.html')

# 路由

ctx.request.path

koa-route 模块

const route = require('koa-route');

const main = ctx => {
  ctx.response.body = 'Hello World';
};

app.use(route.get('/', main));