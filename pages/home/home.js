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
    ]
  },

  onLoad: function() {

  },
  iconClik(e) {
    console.log(e)
    wx.navigateTo({
      url: '/packageAct/actlist/actlist'
    })
  }
})