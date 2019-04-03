//获取应用实例
import Dialog from '../../dist/dialog/dialog';

const app = getApp()
// Page({
//   data: {
//     value: 3,
//     input: ''
//   },

//   onload() {
//     Dialog.alert({
//       title: '😙感谢参与',
//       message: '您的宝贵意见将作为我们服务的标准~'
//     }).then(() => {
//       // on close
//       console.log(`...`)
//     });
//   }
// })
Page({
  data: {
    show: true,
    username: '',
    password: ''
  },
  bindInputText(e) {
    this.setData({
      username: e.detail
    });
    console.log(this.data.username)
  },
  bindInputPwd(e) {
    this.setData({
      password: e.detail
    });
    console.log(this.data.password)
  },
  getUserInfo(event) {
    // 根据用户名查询密码字段

    wx.request({
      url: `http://localhost:3000/api/get/userLogin?username=${this.data.username}`, // 仅为示例，并非真实的接口地址
      method: 'GET',
      header: {
        'Accept': 'aplication/json',
        'Content-Type': 'application/json'
      },
      success(res) {
        console.log('查到的', res.data)
        if (res.data.length > 0) {
          wx.redirectTo({
            url: '../index/index',
            success: (result) => {

            },
            fail: () => { console.log('')},
            complete: () => { }
          })
        } else {
          console.log('未找到注册信息，请注册')
        }

      },
      fail() {
        console.log('获取验证信息失败')
      }
    })

    // if (true) {
    //   wx.redirectTo({
    //     url: '../index/index',
    //     success: (result) => {

    //     },
    //     fail: () => { },
    //     complete: () => { }
    //   })

    //   console.log(event.detail, this.data.username)
    // }

  },
  onClose(event) {

  },
  userLogin(event) {
    // wx.navigateTo({
    //   url: `../index/index`
    // })
  }
});
