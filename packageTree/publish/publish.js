// packageTree/Publish/publish.js
const WXAPI = getApp().globalData.WXAPI;
const UTIL = getApp().globalData.UTIL;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    themeColor: "",
    themeType: "",
    pictureList: ['http://oss491.oss-cn-shanghai.aliyuncs.com/backend/20190702002926.png','http://oss491.oss-cn-shanghai.aliyuncs.com/backend/20190702002926.png']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu()
    let nowDate= (new Date()).valueOf();
    console.log(nowDate)
    nowDate=UTIL.dateTypeDate(nowDate/1000,'Y年M月D日')
    console.log(nowDate)
    this.setData({nowDate:nowDate})
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  
  // uploadSuccess(e){
  //   console.log(re)
  //   if(e.detail){
  //     this.setData({pictureList:e.detail})
  //   }
  // },
  // 交互函数
  // chuantupian() {
  //   let that = this;
  //   let timestamp = (new Date()).valueOf();
  //   wx.chooseImage({
  //    success: res => {
  //     wx.showLoading({
  //      title: '上传中。。。',
  //     })  
  //     console.log(res)
  //     wx.uploadFile({
  //       url: 'http://47.105.135.127:8080/public/uploadFile', //仅为示例，非真实的接口地址
  //       filePath: res.tempFilePaths[0], 
  //       name: 'file',
  //       // formData: {
  //       //   'user': 'test'
  //       // },
  //       success (res){
  //         console.log(res)
  //         //do something
  //       }
  //     })
  //    },
  //   })
  // },
  // 跳转函数
  publishSubmit(e) {
    let value=e.detail.value;
    console.log(value.content)
    if(!value.content){
      UTIL.commonToast('请您输入内容');
      return
    }
    if(value.content.length<10){
      UTIL.commonToast('内容最少10个字符');
      return
    }
    if(!value.themeType){
      this.topic();
      UTIL.commonToast('请您选择话题');
      return
    }
    value.pictureList = []
    value=JSON.stringify(value)
    WXAPI.shudongAddSubject(value).then(res=>{
      if (res.code === 0) {
        // UTIL.commonToast('发布话题成功')
        wx.navigateBack({
          delta: 1,
        })
      } else {
        res.text? UTIL.commonToast(res.text): UTIL.commonToast("数据错误");
      } 
    })
  },
  // 选择话题
  topic(){
    wx.navigateTo({
      url: '/packageTree/topic/topic'
    })
  },

})