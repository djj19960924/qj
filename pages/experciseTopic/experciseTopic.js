const app = getApp();
const cfg = require('../../cfg.js');
const req = require('../../utils/req.js').req;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    sys_rectangle: cfg.qiniuDomain + "sys_rectangle.png",
    index: 1, //第一道题
    questionsList: [],
    timer: '', //定时器名字
    countDownNum: '10', //倒计时初始值
    human: {
      humanAnswer: null,
      status: 0, //0还未答题目,1已经答完题目
      correctness: null //0代表回答错误,1代表回答正确
    },
    humanScore: 0,      //奖励金
    question: {},
    hiddenName: false,
    userCorrect: null,
    mouseFlag: false,
    allDisabled: false,
    analysis:'' ,//题目解析
    money:1,//以分为单位
    balance:0 //余额
  },

  pay() {
    wx.navigateTo({
      url: '../expercisePay/expercisePay?money=' + this.data.money + '&analysis=' + this.data.analysis,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  //下一题
  next() {
    //显示题目和开启本题的计时器
    if (this.data.index < 11) {
      clearInterval(this.data.timer);
        this.showOneQuestion()
        this.countDown()
    } else {
      wx.showModal({
        title: '提醒',
        content: '这已经是最后一题',
        showCancel: false
      })
    }
    let allDisabled = this.data.allDisabled
    allDisabled = false
    this.setData({
      allDisabled
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
        //如果回答正确加20奖励金
        if (this.data.human.status == 1) {
          console.log("挑战者的正确性:", this.data.human.correctness)
          if (this.data.human.correctness) {
            var humanScore = this.data.humanScore + 20
            this.setData({
              humanScore
            })
          }
          //关闭定时器
          clearInterval(this.data.timer);
          console.log('index:', this.data.index)
          //最后一题
          if (this.data.index == 11) {
            wx.request({
              url: 'http://localhost:8080/user/is_experience',
              data: JSON.stringify({ openid: this.data.openId,type:0, }),
              method: "POST",
              success: (res) => {
                console.log('res', res)
                wx.showModal({
                  title: '恭喜',
                  content: '你获得了' + this.data.humanScore + '元奖励金',
                  showCancel: false,//是否显示取消按钮
                  success(e) {
                    console.log('成功', e)
                    if (e.confirm) {
                      wx.redirectTo({
                        url: '../sorts/sorts',
                      })
                    }
                  }
                })
              }
            })
            
          }
        } else {
          //没有回答问题并且时间到了
          if (countDownNum == 0) {
            if (this.data.human.status == 0) {
              console.log("时间到,回答错误")
              
              let allDisabled = this.data.allDisabled
              allDisabled = true
              this.setData({
                'human.humanAnswer': '0',
                allDisabled
              })

              console.log('asdasd', this.data.allDisabled)
              //关掉定时器
              clearInterval(this.data.timer);
              console.log('111', this.data.index)
            }
            if (this.data.index == 11) {
              wx.request({
                url: 'https://kf.csqiji.com/user/is_experience',
                data: JSON.stringify({ openid: this.data.openId }),
                method: "POST",
                success: (res) => {
                  console.log('res', res)
                  wx.showModal({
                    title: '恭喜',
                    content: '你获得了' + this.data.humanScore + '元奖励金',
                    showCancel: false,//是否显示取消按钮
                    success(e) {
                      console.log('成功', e)
                      if (e.confirm) {
                        wx.redirectTo({
                          url: '../sorts/sorts',
                        })
                      }
                    }
                  })
                }
              })
              
            }
          }
        }

      }, 1000)

    })
  },
  //显示题
  showOneQuestion() {

    var index = this.data.index
    console.log('index', index)
    if (index < 11) {
      //初始化
      this.setData({
        human: {
          humanAnswer: null,
          status: 0, //0还未答题目,1已经答完题目
          correctness: null //0代表回答错误,1代表回答正确
        },
        timer: '',
        countDownNum: 10
      })
      //显示一道题
      var question = this.data.questionsList[index - 1]
      var analysis = question.analysis

      index++
      console.log('sadsad', index)
      let userCorrect = this.data.userCorrect
      let mouseFlag = this.data.mouseFlag
      userCorrect = null
      mouseFlag = false
      this.setData({
        question,
        index,
        userCorrect,
        mouseFlag,
        analysis
      })
      console.log('analysis', this.data.analysis)
      console.log('indexB', this.data.index)
    } else {

    }
  },


  //选项点击事件
  humanDx(e) {
    console.log(e.currentTarget.dataset.id)
    var id = e.currentTarget.dataset.id + 1
    var humanAnswer = id
    let mouseFlag = this.data.mouseFlag
    mouseFlag = true
    this.setData({
      'human.humanAnswer': humanAnswer,
      mouseFlag
    })
    this.checkAnswer(this.data.human.humanAnswer)
    this.setData({
      'human.status': 1
    })
    console.log('挑战者:', this.data.human)
  },

  //判断答案
  checkAnswer(answer) {

    var human = this.data.human
    //1.检查人的答案和标准答案是否一致
    if (answer == this.data.question.answer) {
      /*
       *如果一致,人的分数+,显示对号,背景变黄
       */
      human.correctness = 1
      //  用户选对的下标 
      let userCorrect = answer - 1
      console.log('挑战者选的选项:', answer)
      this.setData({
        human,
        userCorrect
      })
      console.log('asdsadasd: ', this.data.userCorrect)
    } else {
      /*
       *如果不一致,显示错号,背景变灰
       */
      // 用户选错的下标
      let userFail = answer - 1
      human.correctness = 0
      this.setData({
        human,
        userFail
      })
    }

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    let questionsList=app.globalData.questionsList
    let openId = app.globalData.openId
    console.log("openid", openId)
    let userInfo = app.globalData.userInfo
    this.setData({
      userInfo, questionsList, openId
    })
    this.showOneQuestion()
    this.countDown()
    let titleNumber = this.data.questionsList.length
    console.log('共多少题：', titleNumber)
    this.setData({
      titleNumber
    })
    //获取当前余额
    
    // req({
    //   url: cfg.qjUrl + 'balance/balance',
    //   method: 'get',
    //   data: {},
    //   success: (res) => {
    //     console.log("余额", res.data)
    //     app.globalData.balance = res.data.balance
    //     this.setData({
    //       balance: app.globalData.balance
    //     })
    //   }
    // });
  }
})