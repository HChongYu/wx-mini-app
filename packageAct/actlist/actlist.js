//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    navbarData:[
      { name: '精选榜', index: 0 },
      { name: '教官说', index: 1 },
      { name: '我想问', index: 2 }
    ],
    dome2: [{
      id: 1,
      name: "下陆中学7天研学之旅",
      title: "下陆中学7天研学之旅下陆中学7天研学之旅",
      date: "2019-3-11",
      img: "/img/win1.png"
    }, {
      id: 2,
      name: "下陆中学7天研学之旅",
      title: "下陆中学7天研学之旅下陆中学7天研学之旅",
      date: "2019-3-11",
      img: "/img/win1.png"
    }],
    atIndex:0
  },
  actlistWinBack(){
    wx.navigateTo({
      url: '/packageAct/actdetails/actdetails'
    })
  },
  onLoad: function () {
    wx.hideShareMenu()
  }
})
