//index.js
//获取应用实例
const app = getApp()
// var userInfo = app.globalData.userInfo
// 全局变量不能直接放在 data 中，需要在 setData()

Page({
    data: {
        radio: false,
        pay: '',
        price: '',
        recive: [],
    },

    // 支付按钮点击事件
    onClickButton(ev) {
         // 调用api /post/payData
         var d = {
            allprice: this.data.price/100,
            detail:[...this.data.recive]
            // title: this.data.recive[0].title,
            // price: this.data.recive[0].price,
            // num: this.data.recive[0].num,
        }
        console.log('recive', this.data.recive,d)
        var reqTask = wx.request({
            url: 'http://localhost:3000/api/post/payData',
            data: d,
            header: {'content-type':'application/json'},
            method: 'POST',
            dataType: 'json',
            responseType: 'text',
            success: (result)=>{
                console.log('ok')
            },
            fail: ()=>{},
            complete: ()=>{}
        });
        console.log('支付', ev)

        wx.requestPayment({
            timeStamp: '',
            nonceStr: '',
            package: '',
            signType: 'MD5',
            paySign: '',
            success(res) { },
            fail(res) { }
        })
       
    },
    // radio 事件
    onClickRadio(ev) {
        console.log(ev, this.data.radio)
        // radioName 和 radioValue 相同则 radio 选中
        if (this.data.radio == false) {
            this.setData({
                'radio': !this.data.radio,
                'price': this.data.pay
            })
        } else if (this.data.radio == true) {
            this.setData({
                'radio': !this.data.radio,
                'price': ''
            })
        }
        console.log(this.data.radio)
    },
    // 顶部导航栏事件
    onClickLeft() {
        // wx.showToast({ title: '点击返回', icon: 'none' });
        wx.navigateBack({
            delta: 1
        });
    },
    // 列表项点击事件
    onAddFood(event) {
        

    },

    onDeleteFood(event) {

    },


    onLoad: function () {
        // app.data 去重，recive 接受过滤后的 app.data
        console.log('app.data', app.data)

        // 去重
        var arr = app.data
        for (var i = 0; i < arr.length; i++) {
            for (var j = i + 1; j < arr.length; j++) {
                if (arr[i] == arr[j]) {         //第一个等同于第二个，splice方法删除第二个
                    arr.splice(j, 1);
                    j--;
                }
            }
        }
        console.log('new arr', arr)
        this.setData({
            'recive': app.data
        })
        console.log('recive data', this.data.recive)

        // 价格计算
        var n = 0
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index]
            n += element.price * element.num
            console.log('price', n)
        }
        this.setData({
            pay: n * 100,
            // price: this.data.pay
        })
        console.log('price', this.data.pay, this.data.price)
    },

})
