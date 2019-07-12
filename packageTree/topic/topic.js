// packageTree/topic/topic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dome1:[
      { name: "我🍋了", type:1,color:1},
      { name: "没发出的朋友圈", type: 2 ,color:2},
      { name: "长大以后才知道的真相", type: 3 ,color:3},
      { name: "先定一个亿的小目标", type: 4 ,color:1},
      { name: "夏天的碎片", type: 5 ,color:2},
      { name: "生活的奇妙时刻", type: 6 ,color:3},
      { name: "最近的欢喜", type: 7 ,color:1},
      { name: "夏日冰凉", type: 8 ,color:2},
      { name: "为什么要努力", type: 9 ,color:3},
      { name: "我的愿望清单", type: 10 ,color:1},
      { name: "二次元", type: 11 ,color:2},
      { name: "你所不了解的00后", type: 12 ,color:3}
    ]
  },  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  typeClick(e){
    let data= e.currentTarget.dataset;
    let pages = getCurrentPages();//页面指针数组 
    var prepage = pages[pages.length - 2];//上一页面指针 
    prepage.setData({
      themeType: data.type,
      themeColor: data.color
    });//操作上一页面 
    wx.navigateBack({
      delta: 1
    })
  }
})