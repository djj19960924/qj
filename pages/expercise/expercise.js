// pages/expercise/expercise.js
const app = getApp();
const cfg = require('../../cfg.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sys_rectangle: cfg.qiniuDomain + "sys_rectangle.png",
    sys_Time: cfg.qiniuDomain + "sys_Time.png",
    remembers:'',

    timer: '', //定时器名字
    countDownNum: '30', //倒计时初始值
    userInfo:null
  },
  countDown() {
    let countDownNum = this.data.countDownNum;
    this.setData({
      timer: setInterval(() => { //这里把setInterval赋值给变量名为timer的变量
        countDownNum--;
        this.setData({
          countDownNum
        })
        if (this.data.countDownNum == 0) {
          //如果你的时间为0，关掉定时器
          clearInterval(this.data.timer);
          wx.reLaunch({
            url: '../experciseTopic/experciseTopic',
          })
        }
      }, 1000)

    })
  },
  coming(){
    clearInterval(this.data.timer);
    console.log(this.data.countDownNum)
    wx.reLaunch({
      url: '../experciseTopic/experciseTopic',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('options',options)
    let userInfo = app.globalData.userInfo
    let remembers = options.remembers
    this.setData({
      userInfo, remembers
    })
    // this.countDown()

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