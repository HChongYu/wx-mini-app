//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    iconBar: [{
        icon: "/img/dome4.png",
        name: "成人拓展"
      },
      {
        icon: "/img/dome1.png",
        name: "企业团建"
      },
      {
        icon: "/img/dome5.png",
        name: "研修旅行"
      },
      {
        icon: "/img/dome3.png",
        name: "军事训练"
      },
      {
        icon: "/img/dome2.png",
        name: "体验式培训"
      }
    ],
    navbarData: [
      { name: '往期精彩', index: 0 },
      { name: '即将开始', index: 1 },
    ],
    dome1: [{
      id: 1,
      name: "下陆中学7天研学之旅",
      title: "下陆中学7天研学之旅下陆中学7天研学之旅",
      date: "2019-3-11",
      img: "/img/win1.png"
    }],
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

  onLoad: function() {
    wx.hideShareMenu()
  },
  searchClick() {
    wx.navigateTo({
      url: '/packageAct/search/search'
    })
  },
  iconClik(e) {
    wx.navigateTo({
      url: '/packageAct/actlist/actlist'
    })
  },
  homeBarBack(e){
    this.setData({ atIndex: e.detail.index})
  },
  homeWinBack(e){
  
    wx.navigateTo({
      url: '/packageAct/actdetails/actdetails'
    })
  },

})