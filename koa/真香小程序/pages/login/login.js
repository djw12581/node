//获取应用实例
import Dialog from '../../dist/dialog/dialog';
const app = getApp()
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
  login(event) {
    // 根据用户名查询密码字段
    var that = this
    if (that.data.username == '') {
      console.log('用户名为空')
      Dialog.confirm({
        title: '用户名为空！',
        message: '请输入用户名'
      }).then(() => {

      });
    }
    if (that.data.password == '') {
      console.log('密码为空')
      Dialog.confirm({
        title: '密码为空！',
        message: '请输入密码'
      }).then(() => {

      });
    }
    if ((that.data.username == '') && (that.data.password == '')) {
      console.log('用户名和密码为空')
      Dialog.confirm({
        title: '用户名和密码为空！',
        message: '请输入用户名和密码'
      }).then(() => {

      });
    }
    if ((that.data.username !== '') && (that.data.password !== '')) {
      console.log('用户名不为空')
      wx.request({
        url: `http://localhost:3000/api/get/userLogin?username=${this.data.username}`, // 仅为示例，并非真实的接口地址
        method: 'GET',
        header: {
          'Accept': 'aplication/json',
          'Content-Type': 'application/json'
        },
        success(res) {
          // 如果找到信息就跳转，否则弹窗提示注册
          var s = Dialog
          console.log('查到的', res.data, that.data.password)
          if (res.data.length > 0) {
            if (res.data[0].password == that.data.password) {
              wx.redirectTo({
                url: '../index/index',
                success: (result) => { },
                fail: () => { console.log('') },
                complete: () => { }
              })
            } else {
              // 弹窗提示
              s.confirm({
                title: '😝记性太差了！',
                message: '用户名与密码不匹配~'
              }).then(() => {

              });
            }
          } else {
            // 提示框点击跳转注册界面
            Dialog.confirm({
              title: '🙃你没注册！',
              message: '请注册账号~'
            }).then(() => {

            });
            console.log('未找到注册信息，请注册')
          }

        },
        fail() {
          console.log('获取验证信息失败')
        }
      })
    }

  },
  registor(event) {
    // 验证
    var that = this
    if (that.data.username == '') {
      console.log('用户名为空')
      Dialog.confirm({
        title: '用户名为空！',
        message: '请输入用户名'
      }).then(() => {

      });
    }
    if (that.data.password == '') {
      console.log('密码为空')
      Dialog.confirm({
        title: '密码为空！',
        message: '请输入密码'
      }).then(() => {

      });
    }
    if ((that.data.username == '') && (that.data.password == '')) {
      console.log('用户名和密码为空')
      Dialog.confirm({
        title: '用户名和密码为空！',
        message: '请输入用户名和密码'
      }).then(() => {

      });
    }
    if ((that.data.username !== '') && (that.data.password !== '')) {
      var s = Dialog
      let { username, password } = this.data
      console.log('asdfasdf', this.data)
      wx.request({
        url: `http://localhost:3000/api/post/users`, // 仅为示例，并非真实的接口地址
        method: 'POST',
        header: {
          'Accept': 'aplication/json',
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: { username, password },
        success(res) {
          console.log('post data', res.data)
          s.alert({
            title: '😘木啊~',
            message: '恭喜您已注册成功！'
          }).then(() => {

          });
        },
        fail() {
          console.log('失败')
        }
      })
    }
  },
});
