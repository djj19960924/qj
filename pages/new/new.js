const app=getApp()
const cfg = require('../../cfg.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:'',
    sys_rectangle: cfg.qiniuDomain +"sys_rectangle.png",
    sys_background2: cfg.qiniuDomain +"sys_background2.png",
    sys_vs: cfg.qiniuDomain + "sys_vs.png",
    sys_tiao: cfg.qiniuDomain +"sys_tiao.png",
    sys_challengerA: cfg.qiniuDomain +"sys_challengerA.png",
    sys_challengerB: cfg.qiniuDomain + "sys_challengerB.png",
    sys_1: cfg.qiniuDomain + "sys_1.png",
    sys_Time: cfg.qiniuDomain + "sys_Time.png",

    timer: '', //定时器名字
    countDownNum: '2', //倒计时初始值
    memberB:{},
    remembers: ''
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
          if (this.data.pkType==1){
          wx.reLaunch({
            url: '../game/game',
          })
          }
          if (this.data.pkType == 2) {
            wx.reLaunch({
              url: '../gameDetail/gameDetail',
            })
          }
        }
      }, 1000)

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    console.log('5555',e)
    let pkType = app.globalData.pkType
    
    let questionsLists = app.globalData.questionsList
    let remembers = app.globalData.remembers
    
    console.log('qqqqqqqqqqqqqq', remembers)
    console.log('wwwwwwwwwwwwww', questionsLists)
    let userInfo = app.globalData.userInfo
    
    let memberB = app.globalData.memberB //获取memberB的信息


    let isMachine = app.globalData.isMachine
    this.setData({
      userInfo, memberB, pkType, remembers
    })
    // console.log(this.data.memberB.name)
    if (!isMachine) {
      console.log('qwjeoiqwoieqwe')
      this.setData({
        sys_1: memberB.touxiang
      })
    }
    this.countDown()
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