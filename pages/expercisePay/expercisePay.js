const app = getApp()
const util = require('../../utils/util.js');
const cfg = require('../../cfg.js');
const req = require('../../utils/req.js').req;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sys_rectangle: cfg.qiniuDomain + "sys_rectangle.png",
    money: 0,
    chosed: 1,
    payment_id: 0,
    payparams: {},
    order_id: '',
    analysis: '',
    balance: ''
  },
  radioChange(e) {
    this.setData({
      chosed: e.detail.value
    })
  },
  pay() {
    console.log('chosed', this.data.chosed)
    if(this.data.analysis){

    if (this.data.chosed == 1) {
      console.log('余额', this.data.money)
      if (this.data.balance >= this.data.money) {
        var that = this
        wx.showModal({
          title: '余额付款',
          content: '',
          success: function(res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          },
          fail: function(res) {
            console.log('fail', res)
          },
          complete: function(res) {
            console.log('complete', res)

            if (res.confirm == true) {
              console.log("用户支付成功！")
              let paymentOK = 0
              console.log('money', that.data.money)
              wx.request({
                url: 'http://localhost:8080/user/balance',
                method: 'post',
                data: {
                  openid: app.globalData.openId,
                  balance: that.data.money
                },
                success: function(res) {
                  console.log('支付成功', res)
                  if (res.errMsg == "request:ok") {
                    console.log("用户支付成功！")
                    paymentOK = 0
                  } else if (res.errMsg == "request:fail cancel") {
                    console.log("用户取消支付！")
                    paymentOK = 1
                  } else {
                    console.log("调用支付失败！")
                    paymentOK = 2
                  }
                  console.log("111", paymentOK)
                  //将支付结果返回给服务器
                  if (paymentOK == 0) {
                    // console.log("sads", this.data.payment_id)
                    wx.redirectTo({
                      url: '../analysis/analysis?analysis=' + that.data.analysis,
                    })

                  }
                }
              })
            }
          },
        })
      } else {
        wx.showModal({
          title: '余额不足',
          content: '请充值',
          success: function(res) {
            if (res.confirm) {
              // wx.navigateTo({
              //   url: '../balance/balance?targetUrl=paymentConfirm',
              // })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }

    } else {
      wx.request({
        url: 'http://localhost:8080/user/pay/init',
        method: "POST",
        data: JSON.stringify({
          openid: this.data.openId,
          pay_amount: this.data.money,
        }),
        success: (res) => {
          console.log('pay', res)
          var payment_id = res.data.payment_id;
          var payparams = res.data.payparams
          this.setData({
            payment_id,
            payparams
          })
          if (res.statusCode == 200) {
            if (res.data.ok != 0) { // ok为0才是正常返回
              wx.showToast({
                title: "订单提交失败！请尝试重新提交订单。",
                icon: "none",
                duration: 2000,
                success: () => {}
              })
            } else {
              wx.showToast({
                title: "订单提交成功！",
                icon: "success",
                duration: 2000,
                success: () => {
                  let paymentOK = 3; // 支付是否成功
                  if (this.data.payparams) { // 支付参数是否存在
                    wx.requestPayment({ // 调用微信支付接口
                      'timeStamp': '' + this.data.payparams.timeStamp,
                      'nonceStr': this.data.payparams.nonceStr,
                      'package': this.data.payparams.package,
                      'signType': this.data.payparams.signType,
                      'paySign': this.data.payparams.paySign,
                      'success': (res) => {
                        console.log("success. 支付成功！", res)
                      },
                      'fail': function(res) {
                        console.log("fail. 支付失败！", res)
                      },
                      'complete': (res) => {
                        console.log("complete. 支付结束！结果为：", res)
                        if (res.errMsg == "requestPayment:ok") {
                          console.log("用户支付成功！")
                          paymentOK = 0
                        } else if (res.errMsg == "requestPayment:fail cancel") {
                          console.log("用户取消支付！")
                          paymentOK = 1
                        } else {
                          console.log("调用支付失败！")
                          paymentOK = 2
                        }
                        console.log("111", paymentOK)
                        //将支付结果返回给服务器
                        if (paymentOK == 0) {
                          console.log("sads", this.data.payment_id)
                          wx.redirectTo({
                            url: '../analysis/analysis?analysis=' + this.data.analysis,
                          })

                        }
                      }
                    })

                  }
                }
              })
              console.log("订单提交成功！")
            }
          } else {
            console.log("网络访问错误！检查服务器是否正常！")
          }

        },
        fail: function(res) {
          console.log('网络访问失败！')
        }
      })
    }

    }else{
      if (this.data.chosed == 1) {
        console.log('余额', this.data.money)
        if (this.data.balance >= this.data.money) {
          var that = this
          wx.showModal({
            title: '余额付款',
            content: '',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            },
            fail: function (res) {
              console.log('fail', res)
            },
            complete: function (res) {
              console.log('complete', res)

              if (res.confirm == true) {
                console.log("用户支付成功！")
                let paymentOK = 0
                console.log('money', that.data.money)
                wx.request({
                  url: 'http://localhost:8080/user/balance',
                  method: 'post',
                  data: {
                    openid: app.globalData.openId,
                    balance: that.data.money
                  },
                  success: function (res) {
                    console.log('支付成功', res)
                    if (res.errMsg == "request:ok") {
                      console.log("用户支付成功！")
                      paymentOK = 0
                    } else if (res.errMsg == "request:fail cancel") {
                      console.log("用户取消支付！")
                      paymentOK = 1
                    } else {
                      console.log("调用支付失败！")
                      paymentOK = 2
                    }
                    console.log("111", paymentOK)
                    //将支付结果返回给服务器
                    if (paymentOK == 0) {
                      // console.log("sads", this.data.payment_id)
                      wx.showModal({
                        title: '恭喜',
                        content: '购买成功',
                        showCancel: false,
                        success: (res) => {
                          if (res.confirm) {
                            wx.navigateTo({
                              url: '../sorts/sorts',
                            })
                          }
                        }

                      })
                    }
                  }
                })
              }
            },
          })
        } else {
          wx.showModal({
            title: '余额不足',
            content: '请充值',
            success: function (res) {
              if (res.confirm) {
                // wx.navigateTo({
                //   url: '../balance/balance?targetUrl=paymentConfirm',
                // })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }

      } else {
        wx.request({
          url: 'http://localhost:8080/user/pay/init',
          method: "POST",
          data: JSON.stringify({
            openid: this.data.openId,
            pay_amount: this.data.money,
          }),
          success: (res) => {
            console.log('pay', res)
            var payment_id = res.data.payment_id;
            var payparams = res.data.payparams
            this.setData({
              payment_id,
              payparams
            })
            if (res.statusCode == 200) {
              if (res.data.ok != 0) { // ok为0才是正常返回
                wx.showToast({
                  title: "订单提交失败！请尝试重新提交订单。",
                  icon: "none",
                  duration: 2000,
                  success: () => { }
                })
              } else {
                wx.showToast({
                  title: "订单提交成功！",
                  icon: "success",
                  duration: 2000,
                  success: () => {
                    let paymentOK = 3; // 支付是否成功
                    if (this.data.payparams) { // 支付参数是否存在
                      wx.requestPayment({ // 调用微信支付接口
                        'timeStamp': '' + this.data.payparams.timeStamp,
                        'nonceStr': this.data.payparams.nonceStr,
                        'package': this.data.payparams.package,
                        'signType': this.data.payparams.signType,
                        'paySign': this.data.payparams.paySign,
                        'success': (res) => {
                          console.log("success. 支付成功！", res)
                        },
                        'fail': function (res) {
                          console.log("fail. 支付失败！", res)
                        },
                        'complete': (res) => {
                          console.log("complete. 支付结束！结果为：", res)
                          if (res.errMsg == "requestPayment:ok") {
                            console.log("用户支付成功！")
                            paymentOK = 0
                          } else if (res.errMsg == "requestPayment:fail cancel") {
                            console.log("用户取消支付！")
                            paymentOK = 1
                          } else {
                            console.log("调用支付失败！")
                            paymentOK = 2
                          }
                          console.log("111", paymentOK)
                          //将支付结果返回给服务器
                          if (paymentOK == 0) {
                            console.log("sads", this.data.payment_id)
                            wx.showModal({
                              title: '恭喜',
                              content: '购买成功',
                              showCancel:false,
                              success:(res)=>{
                                if (res.confirm){
                                  wx.navigateTo({
                                    url: '../sorts/sorts',
                                  })
                                }
                              }
                             
                            })

                          }
                        }
                      })

                    }
                  }
                })
                console.log("订单提交成功！")
              }
            } else {
              console.log("网络访问错误！检查服务器是否正常！")
            }

          },
          fail: function (res) {
            console.log('网络访问失败！')
          }
        })
      }
    }
  },
  cancelPayment() {
    wx.navigateBack({
      url: '../experciseTopic/experciseTopic'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {
    let openId = app.globalData.openId
    let balance = app.globalData.balance
    let class_money = app.globalData.class_money
    console.log('balance', balance)
    console.log('openid', openId)
    console.log(e)
    if(e.money){
      this.setData({
        money: e.money,
        openId,
        analysis: e.analysis,
        balance,
      })
    }else{
      this.setData({
        openId,
        money:class_money,
        balance,
      })
    }
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})