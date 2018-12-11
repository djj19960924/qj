// pages/course/course.js
const app = getApp()
const util = require('../../utils/util.js');
const cfg = require('../../cfg.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classes:[],
    sys_background: cfg.qiniuDomain + "sys_background.png",
   
    classname:''
  },

  pay() {
    wx.navigateTo({
      url: '../expercisePay/expercisePay?money=' + this.data.money,
      success: function (res) {},
      fail: function (res) {},
      complete: function (res) {},
    })
  },

  awardPay() {
    wx.request({
      url: 'http://localhost:8080/user/payCourse/submit',
      method:'post',
      data:JSON.stringify({
        openid:app.globalData.openId,
        coursename: this.data.classname
      }),
      success:(res)=>{
        console.log('课程',res)
        app.globalData.class_money = res.data.pay_amount
        wx.navigateTo({
          url: '../expercisePay/expercisePay',
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
      }
    })
  },
//选择课程
  radioChange: function (e) {
    console.log('radio', e)
    this.setData({
      classname:e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var award = app.globalData.award
    let classes = app.globalData.classes
    this.setData({
      award,
      classes,
    })
    console.log('class',classes)
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