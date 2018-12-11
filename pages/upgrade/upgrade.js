const app = getApp()
const util = require('../../utils/util.js');
const cfg = require('../../cfg.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sys_rectangle: cfg.qiniuDomain + "sys_rectangle.png",

    level: ['(新人->见习)', '(见习->高手)', '(高手->达人)'],
    index: 1, //第一道题
    questionsList: [
      {
        question: "“不同的曲调演得同样好。比喻话的说法不一而用意相同，或一件事情的做法不同而都巧妙地达到目的”指的是下面哪个成语？ ",
        options: [{
          imageUrl: '',
          content: '异曲同工'
        }, {
          imageUrl: '',
          content: '一天到晚'
        }, {
          imageUrl: '',
          content: '一心一意'
        }, {
          imageUrl: '',
          content: '一日三秋'
        }],
        answer: 2
      },
      {
        question: "“不同的曲调演得同样好。比喻话的说法不一而用意相同，或一件事情的做法不同而都巧妙地达到目的”指的是下面哪个成语？ ",
        options: [{
          imageUrl: '',
          content: '异曲同工'
        }, {
          imageUrl: '',
          content: '一天到晚'
        }, {
          imageUrl: '',
          content: '一心一意'
        }, {
          imageUrl: '',
          content: '一日三秋'
        }],
        answer: 2
      },
      {
        question: "“不同的曲调演得同样好。比喻话的说法不一而用意相同，或一件事情的做法不同而都巧妙地达到目的”指的是下面哪个成语？ ",
        options: [{
          imageUrl: '',
          content: '异曲同工'
        }, {
          imageUrl: '',
          content: '一天到晚'
        }, {
          imageUrl: '',
          content: '一心一意'
        }, {
          imageUrl: '',
          content: '一日三秋'
        }],
        answer: 1
      },
      {
        question: "“不同的曲调演得同样好。比喻话的说法不一而用意相同，或一件事情的做法不同而都巧妙地达到目的”指的是下面哪个成语？ ",
        options: [{
          imageUrl: '',
          content: '异曲同工'
        }, {
          imageUrl: '',
          content: '一天到晚'
        }, {
          imageUrl: '',
          content: '一心一意'
        }, {
          imageUrl: '',
          content: '一日三秋'
        }],
        answer: 3
      },
      {
        question: "“不同的曲调演得同样好。比喻话的说法不一而用意相同，或一件事情的做法不同而都巧妙地达到目的”指的是下面哪个成语？ ",
        options: [{
          imageUrl: '',
          content: '异曲同工'
        }, {
          imageUrl: '',
          content: '一天到晚'
        }, {
          imageUrl: '',
          content: '一心一意'
        }, {
          imageUrl: '',
          content: '一日三秋'
        }],
        answer: 1
      },
      {
        question: "“不同的曲调演得同样好。比喻话的说法不一而用意相同，或一件事情的做法不同而都巧妙地达到目的”指的是下面哪个成语？ ",
        options: [{
          imageUrl: '',
          content: '异曲同工'
        }, {
          imageUrl: '',
          content: '一天到晚'
        }, {
          imageUrl: '',
          content: '一心一意'
        }, {
          imageUrl: '',
          content: '一日三秋'
        }],
        answer: 1
      },
      {
        question: "“不同的曲调演得同样好。比喻话的说法不一而用意相同，或一件事情的做法不同而都巧妙地达到目的”指的是下面哪个成语？ ",
        options: [{
          imageUrl: '',
          content: '异曲同工'
        }, {
          imageUrl: '',
          content: '一天到晚'
        }, {
          imageUrl: '',
          content: '一心一意'
        }, {
          imageUrl: '',
          content: '一日三秋'
        }],
        answer: 4
      },
      {
        question: "“不同的曲调演得同样好。比喻话的说法不一而用意相同，或一件事情的做法不同而都巧妙地达到目的”指的是下面哪个成语？ ",
        options: [{
          imageUrl: '',
          content: '异曲同工'
        }, {
          imageUrl: '',
          content: '一天到晚'
        }, {
          imageUrl: '',
          content: '一心一意'
        }, {
          imageUrl: '',
          content: '一日三秋'
        }],
        answer: 1
      },

      {
        question: "不同的曲调演得同样好。比喻话的说法不一而用意相同，或一件事情的做法不同而都巧",
        options: [{
          imageUrl: cfg.qiniuDomain +'sys_1.png',
          content: '海马和乌贼'
        }, {
            imageUrl: cfg.qiniuDomain + 'sys_tx.jpg',
          content: '乌贼和章鱼'
        }, {
          imageUrl: cfg.qiniuDomain + 'sys_1.png',
          content: '章鱼和海蜇'
        }, {
          imageUrl: cfg.qiniuDomain + 'sys_tx.jpg',
          content: '乌贼'
        }],
        answer: 4
      },
      {
        question: "“不同的曲调演得同样好。比喻话的说法不一而用意相同，或一件事情的做法不同而都巧妙地达到目的”指的是下面哪个成语？ ",
        options: [{
          imageUrl: '',
          content: '异曲同工'
        }, {
          imageUrl: '',
          content: '一天到晚'
        }, {
          imageUrl: '',
          content: '一心一意'
        }, {
          imageUrl: '',
          content: '一日三秋'
        }],
        answer: 1
      }
    ],
    question: {},
    userCorrect: null,
    btnId: null, //防止每道题目对其他题目的影响
    selectOption: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //存放选择的答案
    answer: 0,
    answerArr: [], //存放每个题目的正确的答案
    arr: [], //没有完成的题目
    Num: 0, //答对的题数
    score: '' //分数
  },


  //显示题
  showOneQuestion() {
    let index = this.data.index - 1
    if (index <= 10) {
      //初始化
      //显示一道题
      var question = this.data.questionsList[index]
      let userCorrect = this.data.userCorrect
      userCorrect = null
      let id = this.data.index + 1
      this.setData({
        question,
        index: id,
        userCorrect,
      })
    }
  },
  //选择答案的事件
  humanDx(e) {
    console.log("111", e)
    var id = e.currentTarget.dataset.id
    // var question1=this.data.question1
    var answer = e.currentTarget.dataset.answer //用户选择的答案
    this.data.answer = answer
    let titleNumber = this.data.index - 2
    let selectOption = this.data.selectOption
    selectOption[this.data.index - 2] = this.data.answer //把question1保存在selectOption里面
    this.data.answer = 0 //清空刚刚答得question1
    this.setData({
      btnId: id,
      selectOption,
      answer: this.data.answer
    })
    console.log("answer:", this.data.answer)
    console.log('question1: ', this.data.selectOption)

  },


  /**
   * 生命周期函数--监听页面加载
   */



  //点击下一题触发的事件
  next() {


    let index = this.data.index
    console.log('in', index)
    if (this.data.index <= 10) {
      this.showOneQuestion()
      console.log('ins', this.data.index)
      //保存上一题选项的状态
      if (this.data.selectOption[this.data.index - 2]) {
        console.log('qiuhuayong')
        var btnId = this.data.btnId
        console.log("333", this.data.selectOption[this.data.index - 2])
        btnId = this.data.selectOption[this.data.index - 2] - 1
        this.setData({
          btnId
        })
      } else {
        this.setData({
          btnId: null
        })
      }
    } else {
      wx.showModal({
        title: '提醒',
        content: '已经是最后一道题，确认答案后请提交',
      })

    }
  },

  //点击上一题触发的事件
  agin() {

    if (this.data.index > 2) {
      //保存下一题选项
      console.log("index", this.data.index)
      if (this.data.selectOption[this.data.index - 3]) {
        var btnId = this.data.btnId
        console.log("222", this.data.selectOption[this.data.index - 3])
        btnId = this.data.selectOption[this.data.index - 3] - 1
        this.setData({
          btnId
        })
      } else {
        this.setData({
          btnId: null
        })
      }
      let index = this.data.index - 2
      this.setData({
        index,
      })
      this.showOneQuestion(); //显示题目
    } else {
      wx.showModal({
        title: '提醒',
        content: '已经是第一道题',
      })
    }
  },

  //提交事件
  submit(e) {
    console.log(e)
    let answerArr = this.data.answerArr
    console.log(this.data.answerArr)
    let arr = this.data.arr
    let Num = this.data.Num
    let selectOption = this.data.selectOption
    let finished = true;  // 是否已完成测试
    let unanswered = "";  // 未答题号集合
    
    for(let i=0;i<selectOption.length;i++){
      if(selectOption[i]==0){
        unanswered=unanswered+(i+1)+'、'
        console.log(`第${i+1}题未作答`)
        finished = false;
      }
    }
    unanswered = unanswered.substring(0, unanswered.length - 1);
    if (!finished) {
      wx.showModal({
        title: "有测试题未完成",
        content: `请将${unanswered}题完成后再提交！`,
        showCancel: false,
        confirmText: "确定"
      })
    }else{
      for (let i = 0; i < selectOption.length; i++) {
        if (selectOption[i] === answerArr[i]){
          Num++
          this.setData({
            Num
          })
          console.log(this.data.Num)
        }
        let score = this.data.score
        score = Num * 10
        this.setData({
          score
        })
        console.log(this.data.score)
        wx.reLaunch({
          url: '../exchange/exchange?score=' + this.data.score,
        })
        
        
      }
      // let level = app.globalData.level + 1
      // app.globalData.level = level
      let level = app.globalData.level
      console.log('humanLevel',level)
      let openId = app.globalData.openId
      wx.request({
        url: 'http://localhost:8080/user/level/update',
        data: JSON.stringify({
          openid: openId,
          level:level,
          
        }),
        method: 'post',
        success: (res) => {
          console.log('upgrade还回来的数据', res)
        }
      })
    }

  },


  onLoad: function(e) {
    console.log('onload,e',e)
    let answerArr = this.data.answerArr
    let questionsList = this.data.questionsList
    for (let i = 0; i < questionsList.length; i++) {
      answerArr.push(questionsList[i].answer)
    }
    this.setData({
      answerArr
    })
    console.log(this.data.answerArr)
    let levelNum = e.levelNum
    this.showOneQuestion()
    let titleNumber = this.data.questionsList.length
    this.setData({
      titleNumber
    })
    let level = this.data.level[levelNum]
    wx.setNavigationBarTitle({
      title: '形象升级考场' + level
    })
  }
})