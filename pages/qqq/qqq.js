//index.js
import regeneratorRuntime from '../../lib/runtime.js'
const req = require('../../utils/req.js').req;
let user = require('../../user/index.js')
const cfg = require('../../cfg.js');
const app = getApp()

Page({
  data: {
    couponNumber:0
  },
  onLoad: function () {
    this.yb()
  },
  yb:async function(){
    var couponUrl = cfg.qjUrl + 'coupon/list/number'
    var goldUrl = cfg.qjUrl + 'user/gold/number'
    var a=(await this.fz(couponUrl)).data.number
    if (a) {
      this.setData({
        couponNumber: a
      });
      console.log('111',this.data.couponNumber)
    }
    var b=(await this.fz(goldUrl)).data.gold-a
    console.log('a',a)
    console.log('b',b)
  },
  fz(url) {
    return new Promise((resolve, reject) => {
      req({
        url: url,
        method: 'get',
        data: {},
        success: (res) => {
          resolve(res)
        }
      })
    })
  }
  
})
