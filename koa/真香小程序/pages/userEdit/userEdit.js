//获取应用实例
import Dialog from '../../dist/dialog/dialog';

const app = getApp()
Page({
  data: {
    value: 3,
    input: ''
  },

  onChange(event) {
    this.setData({
      value: event.detail
    });
    console.log('range value', this.data.value)
  },
  userInput(event) {
    // 将用户输入合并提交
    // /post/userEdit
    var d = {
      commit: this.data.input,
      range: this.data.value
    }
    
    var reqTask = wx.request({
      url: 'http://localhost:3000/api/post/userEdit',
      data: d,
      header: {'content-type':'application/json'},
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: (result)=>{
        console.log('za hui shi')
      },
      fail: ()=>{},
      complete: ()=>{}
    });
    
    const { value, input } = this.data
    Dialog.alert({
      title: '😙感谢参与',
      message: '您的宝贵意见将作为我们服务的标准~'
    }).then(() => {
      // on close
      console.log(`提交的信息是${input},${value}`)
    });
  },

  bindinput(e) {
    this.setData({
      input: e.detail.value
    });
    console.log('input', this.data.input)
  },
  onload() {
  
  }
})
