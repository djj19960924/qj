const app = getApp()
const util = require('../../utils/util.js');
const cfg = require('../../cfg.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: '',
    sys_rectangle: cfg.qiniuDomain + "sys_rectangle.png",
    sys_new: cfg.qiniuDomain + "sys_new.png",
    sys_trainee: cfg.qiniuDomain + "sys_trainee.png",
    sys_lock1: cfg.qiniuDomain + "sys_lock1.png",
    sys_ace: cfg.qiniuDomain + "sys_ace.png",
    sys_talent: cfg.qiniuDomain + "sys_talent.png",
    sys_pk: cfg.qiniuDomain + "sys_pk.png",
    sys_tiku: cfg.qiniuDomain + "sys_tiku.png",
    sys_rank: cfg.qiniuDomain + "sys_rank.png",
    sys_money: cfg.qiniuDomain + "sys_money.png",
    sys_message: cfg.qiniuDomain + "sys_message.png",
    sys_share: cfg.qiniuDomain + "sys_share.png",
    sys_course: cfg.qiniuDomain + "sys_course.png",
    nowGoto: null,
    level: 0,
    isFirst: {},
    nameB: "",
    timer: '', //定时器名字
    countDownNum: 0, //倒计时初始值
  },

  onShareAppMessage: function(options) {
    return {
      title: '奇纪时尚小程序',
      path: 'pages/sorts/sorts',
      success: function(res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function(res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }
  },
  message() {

  },

  send(e) {
    let levelNum = parseInt(e.currentTarget.dataset.level)

    console.log('levelNum:', levelNum)

    if (this.data.level === 3) { //等级为3
      this.data.isFirst[0] = false
      this.data.isFirst[1] = false
      this.data.isFirst[2] = false
      this.data.isFirst[3] = false
      wx.setStorageSync("isFirst", this.data.isFirst)
      if (levelNum === 0 || levelNum === 1 || levelNum === 2 || levelNum === 3) {
        app.globalData.levelNum = levelNum
        let nowGoto = this.data.nowGoto
        nowGoto = true
        this.setData({
          nowGoto
        })
      }

    } else if (this.data.level === 1) { //等级为1
      if (levelNum === 2) { //等级为1且levelNum为2 点击 '高手' 锁
        let levelNum2 = levelNum - 1

        wx.navigateTo({
          url: '../upgrade/upgrade?levelNum=' + levelNum2
        })
        this.data.isFirst[2] = false
        app.globalData.levelNum = levelNum
        wx.setStorageSync("isFirst", this.data.isFirst)
      } else if (levelNum === 1) { //等级为1且levelNum为1
        this.data.isFirst[0] = false
        this.data.isFirst[1] = false
        let nowGoto = this.data.nowGoto
        nowGoto = true
        this.setData({
          nowGoto
        })
        app.globalData.levelNum = levelNum
        wx.setStorageSync("isFirst", this.data.isFirst)
      } else if (levelNum === 0) { //等级为1且levelNum为0
        this.data.isFirst[0] = false
        let nowGoto = this.data.nowGoto
        nowGoto = true
        this.setData({
          nowGoto
        })
        app.globalData.levelNum = levelNum
        wx.setStorageSync("isFirst", this.data.isFirst)
      } else {
        return 0
      }

    } else if (this.data.level === 2) { //等级为2
      if (levelNum === 3) {
        let levelNum2 = levelNum - 1

        wx.navigateTo({
          url: '../upgrade/upgrade?levelNum=' + levelNum2
        })
        app.globalData.levelNum = levelNum
        this.data.isFirst[3] = false
        wx.setStorageSync("isFirst", this.data.isFirst)

      } else if (levelNum === 2) { //等级为2且levelNum为2
        this.data.isFirst[0] = false
        this.data.isFirst[1] = false
        this.data.isFirst[2] = false
        let nowGoto = this.data.nowGoto
        nowGoto = true
        this.setData({
          nowGoto
        })
        app.globalData.levelNum = levelNum
        wx.setStorageSync("isFirst", this.data.isFirst)
      } else if (levelNum === 1 || levelNum === 0) { //等级为2且levelNum为0或1
        let nowGoto = this.data.nowGoto
        nowGoto = true
        app.globalData.levelNum = levelNum
        this.setData({
          nowGoto
        })
      } else {
        return 0
      }
    } else if (this.data.level === 0) { //等级为0
      if (levelNum === 1) { //当等级为0时且level === 1 点击 '见习' 锁
        let levelNum2 = levelNum - 1
        wx.navigateTo({
          url: '../upgrade/upgrade?levelNum=' + levelNum2
        })
        app.globalData.levelNum = levelNum
        this.data.isFirst[1] = false
        wx.setStorageSync("isFirst", this.data.isFirst)
      } else if (levelNum === 0) { //当等级为0时 直接进入pk
        app.globalData.pkType = '1'
        this.data.isFirst[0] = false
        app.globalData.levelNum = levelNum  //levelNum 存全局

        let nowGoto = this.data.nowGoto //是否立即跳去pk
        nowGoto = true
        this.setData({
          nowGoto
        })
        wx.setStorageSync("isFirst", this.data.isFirst)
      } else {
        return 0
      }
    }

    var isFirst = wx.getStorageSync("isFirst")
    let storage = isFirst[levelNum]
    console.log("storage:", storage)

    if (storage === undefined) {
      this.data.isFirst[levelNum] = true
      wx.setStorageSync("isFirst", this.data.isFirst)
      console.log('adsadsad', this.data.isFirst[levelNum])
      if (this.data.isFirst[levelNum]) { //如果undefined且 为true, 设置为false
        wx.navigateTo({
          url: '../upgrade/upgrade?levelNum=' + levelNum
        })
        console.log('sadasdsadsadsa')
        this.data.isFirst[levelNum] = false
        wx.setStorageSync("isFirst", this.data.isFirst)
      }
    } else if (storage) { //如果为true设置为false
      wx.navigateTo({
        url: '../upgrade/upgrade?levelNum=' + levelNum
      })
      this.data.isFirst[levelNum] = false
      wx.setStorageSync("isFirst", this.data.isFirst)

    } else if (!storage) { // 如果false跳到new页面
      console.log('oooookokokokokoko')
      if (this.data.nowGoto) {
        app.globalData.pkType = '1'
        wx.redirectTo({
          url: '../gameSearch/gameSearch?num='+'send',
        })
      } else {
        return 0
      }
    }

  },
  pk(e) {
    var pkType = e.currentTarget.dataset.pktype
    console.log('pkType:', pkType)
    app.globalData.pkType = pkType
    wx.redirectTo({
      
      url: '../gameSearch/gameSearch?num='+'pk',
    })
  },

  money() {
    wx.navigateTo({
      url: '../asset/asset',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  imageCourse() {
    // let level = this.data.level
      wx.navigateTo({
        url: '../imageCourse/imageCourse',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    
    },
    
  questionSearch() {
    wx.navigateTo({
      url: '../questionSearch/questionSearch',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  rank() {
    wx.navigateTo({
      url: '../ranking/ranking',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.request({
      url: 'http://localhost:8080/user/get/course',
      method: 'post',
      data: JSON.stringify({
        openid: app.globalData.openId
      }),
      success: (res) => {
        console.log('kecheng', res)
        app.globalData.classes = JSON.parse(res.data.buy)
      }
    })
    let openId = app.globalData.openId
    console.log('openid', openId)
    wx.request({
      url: 'http://localhost:8080/user/level',
      data: JSON.stringify({
        openid: openId
      }),
      method:'post',
      success: (res) => {
        var level = parseInt(res.data.level)
        app.globalData.level=level
        this.setData({
          level
        })
        console.log('level',level)
      }
    })
    
    console.log('qian',app.globalData.balance)
  }
})