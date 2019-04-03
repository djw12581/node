const mongoose = require('mongoose');
const db = require('./connect.js');
const userSchema = new mongoose.Schema({
    title: { type: String },
    content: { type: String },
    price: { type: Number },
    originPrice: { type: Number },
    tag: { type: String },
    num: { type: Number }
});
const userLogin = new mongoose.Schema({
    username: { type: String },
    password: { type: String }
});
let userModel = db.model('menus', userSchema);
let userL = db.model('users', userLogin)
module.exports = {userModel, userL};
// Schema原意为架构
// 在mongodb中，每一个数据字段都要有固定的数据类型，所以Schema在mongoose中的意思为，每一张数据表对应的字段的数据类型

// icons: [
//     {
//         type: "star-o",
//         text: "10"
//     },
//     {
//         type: "like-o",
//         text: "20"
//     },
//     {
//         type: "message",
//         text: "30"
//     }
// ]

