const cfg = require('../../cfg.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      score:'',
    sys_rectangle: cfg.qiniuDomain + "sys_rectangle.png"
  },
  exchange(){
    wx.reLaunch({
        url: '../award/award?score='+this.data.score,
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    console.log(e)
    let score = e.score
    this.setData({
      score,
    })
  },
})
 