// pages/index/index.js
const app = getApp();
//获取index.js中登记的模块
let user = require('../../user/index.js')
const cfg = require('../../cfg.js');
const req = require('../../utils/req.js').req;
let timer = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scene:"",
    leg:1,
    createAd:'',
    signin_time:'',
    sys_qj: cfg.qiniuDomain +'sys_qj.png',
    sys_game: cfg.qiniuDomain + 'sys_game.png'
  },
  jumpToUser: function () {
    // clearTimeout(timer);  // 清除定时器
    wx.switchTab({
       url: '../consult/consult',
    })
 
  },
  game(e){
    req({
      url: cfg.qjUrl + 'balance/balance',
      method: 'get',
      data: {},
      success: (res) => {
        console.log("余额", res.data)
        app.globalData.balance = res.data.balance
        this.setData({
          balance: app.globalData.balance
        })
      }
    });
    let that = this;
    //如果授权请求被允许，则进行登录验证
    if (e.detail.errMsg.indexOf("ok") != -1) {
      user.basic.login((res) => {
        console.log("consult.js onLoad 登录成功！", res)
        wx.getStorage({
          key: 'user',
          success: function (res) {
            wx.request({
              url: 'http://localhost:8080/user/experience',
              data: JSON.stringify({ openid: res.data.openid}),
              method:"POST",
              success:(res)=>{
                console.log("experience",res.data)
                if (!res.data.is_experience){
                  app.globalData.questionsList = JSON.parse(res.data.question)
                  let {content} = JSON.parse(res.data.remembers)
                  wx.reLaunch({
                    url: '../expercise/expercise?remembers=' + content,
                  })
                }else{
                  wx.reLaunch({
                    url: '../sorts/sorts',
                  })
                }
              }
            })
          }
        })


      }, function () {
        console.log("consult.js onLoad 登录失败!", res)
      }, this.data.scene)
    } else {
      console.log("用户拒绝授权！")
    }
    
  },
  //"获取头像昵称"按钮触发的事件
  getUserInfoAuthorization: function (e) {
    let that = this;
    
    //如果授权请求被允许，则进行登录验证
    if (e.detail.errMsg.indexOf("ok") != -1) {
      
      user.basic.login((res)=> {
        
        console.log("consult.js onLoad 登录成功！", res)        
        wx.getStorage({
          key: 'user',
          success: function (res) {
            console.log("djj123",res)
            if (res.data.mobile){
              that.jumpToUser()
            } else {
              wx.reLaunch({
                url: '../register/register',
              })
            }
          },
        })

    
      }, function () {
        console.log("consult.js onLoad 登录失败!", res)
        }, this.data.scene)
    } else {
      console.log("用户拒绝授权！")
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.scene = options.scene;
    

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})