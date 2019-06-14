/**
 * home子路由
 */
const fs = require('fs');
const router = require('koa-router')();
const operate = require('../model/operate');


router.get('/', async (ctx, next) => {
    // 查找所有数据
    const foodData = await operate.find().then((d) => {
        console.log('aa', d)
        return d
        // ctx.response.body = 'Hello World'
    })
    
    // 订单数据
    const payData = await operate.userpayFind().then((d) => {
        console.log('pay data', d)
        return d
        // ctx.response.body = 'Hello World'
    })
    // 用户意见数据
    const userData = await operate.usereditFind().then((d) => {
        console.log('用户反馈信息', d)
        return d
        // ctx.response.body = 'Hello World'
    })
    // 账号密码数据
    const pe = await operate.userFind().then((d) => {
        console.log('aa', d)
        return d
        // ctx.response.body = 'Hello World'
    })
    // const a = await operate.save({name: 'aa'}).then(d => d)
    console.log('反馈 data', Object.prototype.toString.call(foodData))
    // ctx.response.type = 'json';
    // ctx.response.type = 'html';
    // ctx.response.body = html;
    // title, nav, data
    await ctx.render('template',{
        title: '真香点餐后台',
        nav: ['商品管理', '账号密码管理', '用户意见管理', '订单管理'],
        nav_data: [foodData, pe, userData, payData]
    });
    // 渲染 html
    // ctx.response.type = 'html';
    // ctx.response.body = fs.createReadStream('view/template.html');
});

module.exports = router;
