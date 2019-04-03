//index.js
//获取应用实例
const app = getApp()
// var userInfo = app.globalData.userInfo;//取得全局变量需要的值
Page({
  data: {
    getData: {

    },
    header: {
      searchValue: 'a',

    },
    body: {
      dataList: {
        num: 0,
        tag: '特价',
        price: 9.9,
        originPrice: 99 || '',
        desc: '阿阿斯蒂芬揭发了内容',
        title: '酸辣面片',
        imageURL: 'http://lorempixel.com/640/480/business',
      }
    },
    footer: {
      navbar: {
        active: 0,
        iconInfo: [, , 0,]
      }
    },
    sendData: [], // 拿到全局变量
  },
  
  // 顶部搜索框事件
  onSearch(ev) {
    var that = this
    console.log('搜索的值：', ev.detail, that.data.value)
    // 从数据库查找匹配的数据，更新列表数据setData（）
  },
  // 底部导航栏事件
  onChange(event) {
    // 找到点击对象 跳转链接
    const arr = ['../index/index', '../b/b', '../pay/pay', '../userEdit/userEdit']
    wx.navigateTo({
      url: `${arr[event.detail]}`
    })

    // console.log(event.detail);

  },

  // 商品列表点击事件
  onAddFood(event) {
    var d_footer = this.data.footer.navbar.iconInfo[2] + 1
    var index = event.target.id - 0
    // 通过 event.target.id 知道是哪条数据
    console.log('click event', event)
    this.setData({
      'footer.navbar.iconInfo[2]': d_footer,
      [`getData[${index}].num`]: this.data.getData[index].num + 1,
      // sendData: this.data.getData[index]
    })
    // 更新 sendData
    // 小程序中数组操作需要setData
    this.data.sendData.push(this.data.getData[index]);
    this.setData({
      'sendData': this.data.sendData
    })
    app.data = this.data.sendData;
    console.log('add 全局app.data', app.data)
  },

  onDeleteFood(event) {
    var index = event.target.id - 0
    var d_body = this.data.getData[index].num
    var d_footer = this.data.footer.navbar.iconInfo[2]
    console.log('click event', event)
    if (d_body > 0) {
      this.setData({
        'footer.navbar.iconInfo[2]': d_footer - 1,
        [`getData[${index}].num`]: this.data.getData[index].num - 1,
        // sendData: this.data.getData[index]
      })
    }
    // 更新 sendData
    // 小程序中数组操作需要setData
    this.data.sendData.pop(this.data.getData[index]);
    this.setData({
      'sendData': this.data.sendData
    })
    app.data = this.data.sendData;
    console.log('delete 全局app.data', app.data)
  },


  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    // 调用 api 拿到所有数据缓存
    const that = this
    wx.request({
      url: 'http://localhost:3000/api/get', // 仅为示例，并非真实的接口地址
      method: 'GET',
      header: {
        'Accept': 'aplication/json',
        'Content-Type': 'application/json'
      },
      success(res) {
        // console.log(res.data)
        that.setData({
          getData: res.data
        })
        console.log('onload getData', that.data.getData)
      }
    })
    // 将 getData 渲染到模板上
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
