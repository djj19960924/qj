import regeneratorRuntime from '../lib/runtime.js'
const req = require('./req.js').req;
let user = require('../user/index.js')
const cfg = require('../cfg.js');
const app = getApp()

const fz = function(url, method, data) {
  return new Promise((resolve, reject) => {
    req({
      url: url,
      method: method,
      data: data,
      success: (res) => {
        resolve(res)
      }
    })
  })
}
module.exports={
  fz
}