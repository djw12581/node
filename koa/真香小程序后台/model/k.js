let operate = require('./operate.js');
var a = operate.find()
a.then(d => console.log('aa', d))
// operate.save({
//     href: "/",
// 	title: "标题",
// 	description: "描述信息",
// 	content: "文字内容内容文字内容",
// 	imgSrcRight: "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
// })
// operate.find({ username: 'gua' })
