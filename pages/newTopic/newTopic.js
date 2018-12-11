const app = getApp()
const util = require('../../utils/util.js');
const cfg = require('../../cfg.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sys_rectangle: cfg.qiniuDomain + "sys_rectangle.png",
    sys_1: cfg.qiniuDomain + "sys_1.png",
    sys_vs: cfg.qiniuDomain + "sys_vs.png",






    image: 0,
    timer: '', //定时器名字
    countDownNum: '10', //倒计时初始值
  },
  change(e){
    console.log(e)
  },
  pay() {
    wx.navigateTo({
      url: '../pay/pay',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  countDown() {
    let countDownNum = this.data.countDownNum;
    this.setData({
      timer: setInterval(() => { //这里把setInterval赋值给变量名为timer的变量
        countDownNum--;
        this.setData({
          countDownNum
        })
        if(this.data.countDownNum==0){
          //如果你的时间为0，关掉定时器
          clearInterval(this.data.timer);
        }
      }, 1000)

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.countDown()
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