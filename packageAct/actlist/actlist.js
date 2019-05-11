//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    navbarData:[
      { name: '精选榜', index: 0 },
      { name: '教官说', index: 1 },
      { name: '我想问', index: 2 }
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
  onLoad: function () {

  }
})
