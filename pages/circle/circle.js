//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    navbarData:[
      { name: '学习', index: 0 },
      { name: '树洞', index: 1 },
    ],
    winList:[
      { 
        map:'/img/win1.png',
        bar:"【干货】你应该掌握的溺水急救小常识",
        time:'2019-3-13',
        seeNum:3457,
        collectNum:234
      },
      {
        map: '/img/win2.png',
        bar: "【干货】你应该掌握的溺水急救小常识",
        time: '2019-3-13',
        seeNum: 3457,
        collectNum: 234
      },
      {
        map: '/img/win3.png',
        bar: "【干货】你应该掌握的溺水急救小常识",
        time: '2019-3-13',
        seeNum: 3457,
        collectNum: 234
      },
      {
        map: '/img/win4.png',
        bar: "【干货】你应该掌握的溺水急救小常识",
        time: '2019-3-13',
        seeNum: 3457,
        collectNum: 234
      },
      {
        map: '/img/win5.png',
        bar: "【干货】你应该掌握的溺水急救小常识",
        time: '2019-3-13',
        seeNum: 3457,
        collectNum: 234
      },
    ],
    atIndex:0
  },
  // bar毁掉
  circleBarBack(e){
    let backData = e.detail
    this.setData({atIndex:e.detail.index})
  },  
  onLoad: function () {
    wx.hideShareMenu()
  }
})
