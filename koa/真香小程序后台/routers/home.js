/**
 * home子路由
 */
const fs = require('fs');
const router = require('koa-router')();
const operate = require('../model/operate');


router.get('/', async (ctx, next) => {
    // 查找所有数据
    const data = await operate.find().then((d) => {
        console.log('aa', d)
        return d
        // ctx.response.body = 'Hello World'
    })
   
    // const a = await operate.save({name: 'aa'}).then(d => d)
    console.log(Object.prototype.toString.call(data))
    // ctx.response.type = 'json';
    
    // ctx.response.type = 'html';
    // ctx.response.body = html;
    // title, nav, data
    await ctx.render('template',{
        title: '真香点餐后台',
        nav: ['全部食物', '食物', '水'],
        nav_data: [data, 'food', 'water']
    });
    // 渲染 html
    // ctx.response.type = 'html';
    // ctx.response.body = fs.createReadStream('view/template.html');
});

module.exports = router;
