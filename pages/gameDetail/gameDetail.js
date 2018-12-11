const app = getApp()
const cfg = require('../../cfg.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    times: [],
    timeSum: 0,
    sys_rectangle: cfg.qiniuDomain + "sys_rectangle.png",
    isMachine:'',
    sys_vs: cfg.qiniuDomain + "sys_vs.png",
    sys_1: cfg.qiniuDomain + "sys_1.png",
    index: 1, //第一道题
    memberB: {},
    questionsLists: [],
    timer: '', //定时器名字
    countDownNum: '10', //倒计时初始值
    human: {
      humanAnswer: null,
      status: 0, //0还未答题目,1已经答完题目
      correctness: null //0代表回答错误,1代表回答正确
    },
    humanB: {
      humanAnswer: null,
      status: 0, //0还未答题目,1已经答完题目
      correctness: null //0代表回答错误,1代表回答正确
    },
    machine: {
      machineAnswer: null,
      status: 0,
      correctness: null
    },
    humanScore: 0,
    machineScore: 0,
    question: {},
    hiddenName: false,
    userCorrect: null,
    mouseFlag: false,
    correctNum: 0,
    winner: null,
    titleNumber: 0
  },

  pay() {
    wx.navigateTo({
      url: '../pay/pay',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  countDown(isMachine) {
    let countDownNum = this.data.countDownNum;
    this.setData({
      timer: setInterval(() => { //这里把setInterval赋值给变量名为timer的变量
        countDownNum--;
        //如果倒计时器为6的时候,机器人将会给出一个答案

        if (isMachine) {   //如果是机器人
          if (countDownNum == 6) {
            console.log('machineAnswer:', this.machineAnswer())
            this.checkAnswer(this.machineAnswer())
            this.setData({
              'machine.status': 1
            })
          }
          this.setData({
            countDownNum
          })
          if (this.data.human.status == 1 && this.data.machine.status == 1) {
            console.log("挑战者的正确性:", this.data.human.correctness)
            if (this.data.human.correctness) {
              let correctNum = this.data.correctNum
              correctNum = correctNum + 1
              var humanScore = this.data.humanScore + 20
              this.setData({
                humanScore,
                correctNum
              })
            } else {

            }
            if (this.data.machine.correctness) {
              var machineScore = this.data.machineScore + 20
              this.setData({
                machineScore
              })
            } else {

            }
            clearInterval(this.data.timer);
            //关闭定时器之后,下一题
            console.log('index:', this.data.index)
            if (this.data.index < this.data.titleNumber + 1) {
              setTimeout(() => {
                this.showOneQuestion()
                this.countDown(isMachine)
              }, 1000)
            } else {

              var hiddenName = this.data.hiddenName
              hiddenName = false
              this.setData({
                hiddenName
              })
              this.humanWinner()
            }

          } else {
            //  判断机器人的正确性
            if (this.data.machine.correctness) {
              var machineScore = this.data.machineScore + 20
              this.setData({
                machineScore
              })
            }
            
            if (countDownNum == 0) {
              if (this.data.human.status == 0) {
                console.log("时间到,回答错误", this.data.index)
                if (this.data.index === this.data.titleNumber + 1) {
                  this.humanWinner()
                }
              }
              //如果你的时间为0，关掉定时器
              clearInterval(this.data.timer);
              //关闭定时器之后,下一题
              console.log('111', this.data.index)
              if (this.data.index < this.data.titleNumber + 1) {
                setTimeout(() => {
                  this.showOneQuestion()
                  this.countDown(isMachine)
                }, 1000)
              }
            }
          }
        } else {  //人人
          this.setData({
            countDownNum
          })
          if (this.data.human.status == 1 && this.data.humanB.status == 1) {

            console.log('人人的时间', countDownNum)
            console.log("挑战者A的正确性:", this.data.human.correctness)
            console.log("挑战者B的正确性:", this.data.humanB.correctness)

            if (this.data.human.correctness) {
              let correctNum = this.data.correctNum
              correctNum = correctNum + 1
              var humanScore = this.data.humanScore + 20
              this.setData({
                humanScore,
                correctNum
              })
            } else {

            }
            
            clearInterval(this.data.timer);
            //关闭定时器之后,下一题
            console.log('index:', this.data.index)
            console.log('isMachinesaaaa:', isMachine)
            if (this.data.index < this.data.titleNumber + 1) {
              setTimeout(() => {
                this.showOneQuestion()
                this.countDown(isMachine)
              }, 1000)
            } else {
              let timeSum = this.data.timeSum
              console.log('TTTTTTTTimeSum', timeSum)
              wx.sendSocketMessage({
                data: JSON.stringify({
                  from: this.data.openId,
                  status: 0,
                  scoreNumber: this.data.correctNum,
                  timeSum,
                  type:''
                }),
              })
              wx.onSocketMessage(function (res) {
                console.log('胜负:', res)
                wx.closeSocket()
                wx.onSocketClose((res) => {
                  console.log('关闭')
                })
              })

              console.log('correctNum', this.data.correctNum)

              var hiddenName = this.data.hiddenName
              hiddenName = false
              this.setData({
                hiddenName
              })
              if (this.data.humanScore > this.data.machineScore) {
                wx.showModal({
                  title: '',
                  content: '挑战成功',
                  cancelText: '取消',
                  cancelColor: '',
                  confirmText: '确定',
                  confirmColor: '',
                  success: function (res) {
                    wx.reLaunch({
                      url: '../sorts/sorts',
                    })
                  },
                  fail: function (res) { },
                  complete: function (res) { },
                })
              } else {
                wx.showModal({
                  title: '',
                  content: '挑战失败',
                  success: function (res) {
                    wx.reLaunch({
                      url: '../sorts/sorts',
                    })
                  },
                })
              }
            }

          } else {
            if (countDownNum == 0) {
              if (this.data.human.status == 0) {
                console.log("时间到,回答错误")
              }
              //如果你的时间为0，关掉定时器
              clearInterval(this.data.timer);
              //关闭定时器之后,下一题
              console.log('111', this.data.index)
              if (this.data.index < this.data.titleNumber + 1) {
                setTimeout(() => {
                  this.showOneQuestion()
                  this.countDown(isMachine)
                }, 1000)
              }
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
    if (index < this.data.titleNumber + 1) {
      //初始化
      this.setData({
        human: {
          humanAnswer: null,
          status: 0, //0还未答题目,1已经答完题目
          correctness: null //0代表回答错误,1代表回答正确
        },
        machine: {
          machineAnswer: null,
          status: 0,
          correctness: null
        },
        humanB: {
          humanAnswer: null,
          status: 0, //0还未答题目,1已经答完题目
          correctness: null //0代表回答错误,1代表回答正确
        },
        timer: '',
        countDownNum: 10
      })
      //显示一道题
      console.log('qqqqqqqqqqqqqqqqqqqqq',index)
      var question = this.data.questionsLists[index - 1]
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
        mouseFlag
      })
      console.log('indexB', this.data.index)
      console.log('jdaksjdkasjdkasjdksadadasdas',this.data.question)
    } else {

    }
  },

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

    this.checkAnswer(this.data.human.humanAnswer, 1)
    this.setData({
      'human.status': 1
    })
    console.log('挑战者:', this.data.human)

    let time = 10 - this.data.countDownNum
    let times = this.data.times
    times.push(time)
    this.setData({
      times: times
    })
    console.log('asdassssssssssssssssss', this.data.times)
    console.log('aaaaaaaaaaaaa', time)
    let timeSum = 0
    for (let i = 0; i < this.data.times.length; i++) {
      timeSum += this.data.times[i]
    }
    console.log('TimeSum:', timeSum)
    this.setData({
      timeSum
    })
    if(!this.data.isMachine){
      console.log("人人")
    wx.sendSocketMessage({   //human每选一次答案，就会把自己的答案发送过去
      data: JSON.stringify({ from: this.data.openId, humanAnswer: humanAnswer, status: 3 })
    })
    }
  },

  //判断答案
  checkAnswer(answer, ss) {
    if (ss == 1) {
      var human = this.data.human
      var humanB = this.data.humanB
      //1.检查人的答案和标准答案是否一致
      if (answer == this.data.question.answer) {
        /*
         *如果一致,人的分数+,显示对号,背景变黄
         */
        human.correctness = 1
        humanB.correctness = 1
        //  用户选对的下标 
        let userCorrect = answer - 1
        console.log('挑战者选的选项:', answer)
        this.setData({
          human,
          userCorrect,
          humanB
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
    } else {
      var machine = this.data.machine
      if (answer == this.data.question.answer) {
        machine.correctness = 1
        this.setData({
          machine
        })
      } else {
        machine.correctness = 0
        this.setData({
          machine
        })
      }
    }
  },

  random(lower, upper) {
    return Math.floor(Math.random() * (upper - lower + 1)) + lower;
  },

  //机器人AI给出答案
  machineAnswer() {
    var machineAnswer = this.data.machine.machineAnswer
    machineAnswer = this.random(1, 4)
    this.setData({
      "machine.machineAnswer": machineAnswer,
    })
    return this.data.machine.machineAnswer
  },

  //接收对方的答案数据刷新
  onShow: function () {
    var that = this
    wx.onSocketMessage(function (res) {
      let humanBres = JSON.parse(res.data)
      console.log("humanBres:", humanBres.humanAnswer)
      let humanB = that.data.humanB
      console.log('humanBBBBBBB', humanB)
      humanB.humanAnswer = humanBres.humanAnswer
      humanB.status = 1
      that.setData({
        humanB
      })
      // that.checkAnswer(that.data.humanB.humanAnswer, that.data.humanB.status)
    })
  },
  humanWinner() {
    if (this.data.humanScore > this.data.machineScore) {
      //判断人机胜负，只把胜负结果发给后端记录下来
      //data:{from:openId,is_winner:boolean}
      wx.request({
        url: 'http://localhost:8080/user/createHistory',
        method: 'POST',
        data: JSON.stringify({
          from: this.data.openId,
          status: 0,
          is_winner: true,
          type:''
        }),
        success: (res) => {
          console.log('胜负:', res)
          wx.closeSocket()
          wx.onSocketClose((res) => {
            console.log('关闭')
          })
        }
      })

      wx.showModal({
        title: '',
        content: '挑战成功',
        cancelText: '取消',
        cancelColor: '',
        confirmText: '确定',
        confirmColor: '',
        success: function (res) {
          wx.reLaunch({
            url: '../sorts/sorts',
          })
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    } else {
      wx.showModal({
        title: '',
        content: '挑战失败',
        success: function (res) {
          wx.reLaunch({
            url: '../sorts/sorts',
          })
        },
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("openId", app.globalData.openId)
    let openId = app.globalData.openId
    let userInfo = app.globalData.userInfo
    let memberB = app.globalData.memberB
    let questionsLists = app.globalData.questionsList
    let titleNumber = questionsLists.length
    console.log('wwwww', questionsLists.length, questionsLists)

    this.setData({
      openId,
      userInfo,
      questionsLists,
      memberB,
      titleNumber
    })
    this.showOneQuestion()
    console.log('aslkdmaslkmdlkasmdkasd:', this.data.questionsLists)
    let isMachine = app.globalData.isMachine
    console.log('isMachine:', isMachine)
    
    this.countDown(isMachine)

    if (!isMachine) {
      console.log('qwjeoiqwoieqwe')
      this.setData({
        sys_1: memberB.touxiang
      })
    }

    this.setData({
      isMachine
    })
  }
})