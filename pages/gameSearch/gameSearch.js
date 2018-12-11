const app = getApp()
const util = require('../../utils/util.js');
const cfg = require('../../cfg.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sys_rectangle: cfg.qiniuDomain + "sys_rectangle.png",
    sys_background2: cfg.qiniuDomain + "sys_background2.png",
    sys_vs: cfg.qiniuDomain + "sys_vs.png",
    sys_tiao: cfg.qiniuDomain + "sys_tiao.png",
    sys_challengerA: cfg.qiniuDomain + "sys_challengerA.png",
    sys_challengerB: cfg.qiniuDomain + "sys_challengerB.png",
    sys_1: cfg.qiniuDomain + "sys_1.png",
    sys_Time: cfg.qiniuDomain + "sys_Time.png",

    timer: '', //定时器名字
    countDownNum: '0', //倒计时初始值
  },
  countDownpk() {
    let countDownNum = this.data.countDownNum;
    let levelNum = app.globalData.levelNum
    this.setData({
      timer: setInterval(() => { //这里把setInterval赋值给变量名为timer的变量
        countDownNum++;
        this.setData({
          countDownNum
        })
        console.log('countDownNum:', this.data.countDownNum)
        if (this.data.countDownNum == 5) {
          console.log('open', this.data.openId)
          clearInterval(this.data.timer);
          this.setData({
            countDown: 0
          })
          wx.sendSocketMessage({
            data: JSON.stringify({ from: this.data.openId, type: "", status: 3, level: levelNum})
          })
          wx.onSocketMessage(function (res) {
            var name = util.getRandomName()
            console.log("name", name)
            var a = JSON.parse(res.data)
            console.log('收到服务器内容aaaaaa：', a)
            app.globalData.questionsList = JSON.parse(a.questionsList)//把questionsList放在全局里
            app.globalData.remembers = JSON.parse(a.remembers)
            app.globalData.isMachine = true
            var msg = { name: name, touxiang: 'w' }
            app.globalData.memberB = msg
            wx.reLaunch({
              url: '../new/new',
              success: function (res) { },
              fail: function (res) { },
              complete: function (res) { },
            })
          })

        }
      }, 1000)

    })
  },

  humanPk() {
    console.log('1111111111111111111111')
    var that = this
    
    wx.connectSocket({
      url: "ws://localhost:8080/socket",//连接webSocket
    })
    wx.onSocketOpen((res) => {
      console.log('WebSocket连接已打开！')
      var socketOpen = true
      let pkType = app.globalData.pkType
      let levelNum = app.globalData.levelNum
      console.log('llllllllll:', levelNum)
      if (socketOpen) {
        if (pkType === '1') {
          console.log('gameSearch: ', levelNum)
          wx.sendSocketMessage({
            data: JSON.stringify({ from: this.data.openId, type: "", status: 1, level: levelNum}) //发送消息
          })
          
        } else {
          console.log('222222222222')
          wx.sendSocketMessage({
            data: JSON.stringify({ from: this.data.openId, type: "", status: 1, level: ''}) //发送消息
          })
        }
        
      } else {
        socketMsgQueue.push(msg)
      }
    })

    wx.onSocketError(function (res) {
      console.log('WebSocket连接打开失败，请检查！')
    })
    wx.onSocketMessage(function (res) {  //接收服务器返回的消息
      console.log('idsssssssss', res.data)
    
      if (res.data != "noPlayer") {  //判断是否匹配到人
        let levelNum = app.globalData.levelNum
        var a = JSON.parse(res.data)
        console.log('收到服务器内容：', a)
        console.log('openid', app.globalData.openId)
       
        app.globalData.questionsList = JSON.parse(a.questionsList)//把questionsList放在全局里
        app.globalData.memberB = JSON.parse(a.msg)//把memberB信息放在全局里
        app.globalData.remembers = JSON.parse(a.remembers)        
        app.globalData.isMachine = false                                  
        clearInterval(that.data.timer);
        that.setData({
          countDown: 0
        })
        wx.reLaunch({
          url: '../new/new',
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })

      } else {
        that.countDownpk()
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    console.log('5555', e)
    let openId = app.globalData.openId
    console.log('openid',openId)
    let userInfo = app.globalData.userInfo
    this.setData({
      userInfo,
      openId, 
    })
    this.humanPk()
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
    clearInterval(this.data.timer)
    
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