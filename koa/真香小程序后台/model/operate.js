let {userModel, userL} = require('./essays.js');
module.exports = {
    save(data) {
        return new Promise((resolve, reject) => {
            userModel.create(data, (err, docs) => {
                if (err) {
                    rejct(err);
                } else {
                    resolve(docs);
                    // console.log('save', data, docs, typeof(docs))
                }
            })
        })
    },
    find(data = {}, fields = null, options = {}) {
        return new Promise((resolve, reject) => {
            //model.find(需要查找的对象(如果为空，则查找到所有数据), 属性过滤对象[可选参数], options[可选参数], callback)
            userModel.find(data, fields, options, (error, doc) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(doc)
                    // console.log('find', doc, typeof(doc))
                }
            })
        })
    },
    findOne(data) {
        return new Promise((resolve, reject) => {
            //model.findOne(需要查找的对象,callback)
            userModel.findOne(data, (error, doc) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(doc)
                    console.log('findOne', doc, typeof(doc))
                }
            })
        })
    },
    findById(data) {
        return new Promise((resolve, reject) => {
            //model.findById(需要查找的id对象 ,callback)
            userModel.findById(data, (error, doc) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(doc)
                }
            })
        })
    },
    update(conditions, update) {
        return new Promise((resolve, reject) => {
            //model.update(查询条件,更新对象,callback)
            userModel.update(conditions, update, (error, doc) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(doc)
                    console.log('promise', doc)
                }
            })
        })
    },
    remove(conditions) {
        return new Promise((resolve, reject) => {
            //model.update(查询条件,callback)
            userModel.remove(conditions, (error, doc) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(doc)
                }
            })
        })
    },

    // 验证用户登录
    userFind(data = {}, fields = null, options = {}) {
        return new Promise((resolve, reject) => {
            //model.find(需要查找的对象(如果为空，则查找到所有数据), 属性过滤对象[可选参数], options[可选参数], callback)
            userL.find(data, fields, options, (error, doc) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(doc)
                    // console.log('find', doc, typeof(doc))
                }
            })
        })
    },
    // 存储用户注册信息
    userSave(data) {
        return new Promise((resolve, reject) => {
            userL.create(data, (err, docs) => {
                if (err) {
                    rejct(err);
                } else {
                    resolve(docs);
                    // console.log('save', data, docs, typeof(docs))
                }
            })
        })
    },
};
