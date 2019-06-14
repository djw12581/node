/**
 * api子路由
 */

const router = require('koa-router')();
const operate = require('../model/operate');
// const Entity = require('../mongo/index');
// const entity = new Entity();

router
    .get('/404', async ctx => ctx.body = '404 page!')
    
    // GET /api/get?name=111
    .get('/get', async ctx => {
        // // Koa2 中 get方法 通过 ctx.query 来获取 xxx?name=123 中name值
        // entity.save(ctx.query);
        // 拿到 find 方法，查到对应数据
        console.log('get', ctx.query)
        const d = await operate.find(ctx.query).then(d => {
            return d
        })
        ctx.response.type = 'json'
        ctx.response.body = d
        // ctx.body = { mgs: "提交成功", start: 200 };
        // 发送数据
    })
    // post data
    .post('/post', async ctx => {
        // // Koa2 中 post方法 通过 ctx.request.body 来获取前端传来的参数值
        const r = ctx.request.body
        // fetch post的数据是字符串，wx.request是对象
        // JSON.parse(ctx.request.body)
        console.log(r, typeof(r))
        const d = await operate.save(r).then(d => d)
        ctx.body = { mgs: "提交成功", start: 200 };
    })

    .post('/remove', async ctx => {
        const r = ctx.request.body
        // JSON.parse(ctx.request.body)
        const d = await operate.remove(r).then(d => d)
        ctx.body = { mgs: "删除成功", start: 200 };
    })
    .post('/update', async ctx => {
        // r 应为一个数组 第一项为查询 第二项为更改之后
        const r = ctx.request.body
        // JSON.parse(ctx.request.body)
        console.log(r)
        const d = await operate.update(r[0], r[1]).then(d => d)
        ctx.body = { mgs: "修改成功", start: 200 };
    })

    // 验证用户登录
    .get('/get/userLogin', async ctx => {
        // // Koa2 中 get方法 通过 ctx.query 来获取 xxx?name=123 中name值
        // entity.save(ctx.query);
        // 拿到 find 方法，查到对应数据
        console.log('get', ctx.query)
        const d = await operate.userFind(ctx.query).then(d => {
            return d
        })
        ctx.response.type = 'json'
        ctx.response.body = d
        // ctx.body = { mgs: "提交成功", start: 200 };
        // 发送数据
    })
    // 存储用户注册信息
    .post('/post/users', async ctx => {
        const r = ctx.request.body
        console.log('post users', r, typeof(r))
        const d = await operate.userSave(r).then(d => d)
        ctx.body = { mgs: "提交成功", start: 200 };
    })
    // userEdit 存储
    .post('/post/userEdit', async ctx => {
        const r = ctx.request.body
        console.log('post edit', r, typeof(r))
        const d = await operate.usereditSave(r).then(d => d)
        ctx.body = { mgs: "提交成功", start: 200 };
    })
    // 订单信息存储
    .post('/post/payData', async ctx => {
        const r = ctx.request.body
        console.log('post payData', r, typeof(r))
        const d = await operate.userpaySave(r).then(d => d)
        ctx.body = { mgs: "提交成功", start: 200 };
    })
module.exports = router;




