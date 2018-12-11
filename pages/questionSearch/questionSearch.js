const app = getApp()
const util = require('../../utils/util.js');
const cfg = require('../../cfg.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    sys_rectangle: cfg.qiniuDomain + "sys_rectangle.png",
    sys_expand: cfg.qiniuDomain + "sys_expand.png",
    show: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: ['色彩', '风格', '体型'], //下拉列表的数据
    index: 0, //选择的下拉列表下标
    value: '',
    resultList: [],
    pageNum: 0,
    openId:'',
  },
  // 点击下拉显示框
  selectTap() {
    this.setData({
      show: !this.data.show
    });
  },
  // 点击下拉列表
  optionTap(e) {
    console.log(e)
    let Index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    this.setData({
      index: Index,
      show: !this.data.show
    });
  },
  //滚动到底部触发的事件
  lower() {
    this.search()
  },
  //点击搜素按钮
  search() {
    console.log(this.data.value)
    var that = this
    if (this.data.value) {
    wx.request({
      url: 'http://localhost:8080/user/getStyle',
      method: 'post',
      data: JSON.stringify({
        opendId:that.data.opendId,
        style: that.data.selectData[that.data.index],
        value: that.data.value
      }),
      success:(res)=>{
        console.log(res.data)
        this.setData({
          resultList:res.data
        })
      }
    })
    }
  },
  //input框点击完成时的事件
  searchBtn() {
    this.search()
  },

  //输入框的内容
  changeInput(e) {
    this.setData({
      value: e.detail.value,
      resultList: [],
      pageNum: 0,
    })
  },
  tapTarget(e) {
    console.log(e)
    let index = e.currentTarget.dataset.index
      app.globalData.question_data = this.data.resultList[index]
      wx.navigateTo({
        url: '../questionAnalysis/questionAnalysis'
      })
    
  },

onLoad: function (options) {
  let openId = app.globalData.openId
  this.setData({
    openId,
  })
  },
})



// 防抖
function debounce(fn, delay) {
  // 维护一个 timer
  let timer = null;

  return function () {
    // 通过 ‘this’ 和 ‘arguments’ 获取函数的作用域和变量
    let context = this;
    let args = arguments;

    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  }
}