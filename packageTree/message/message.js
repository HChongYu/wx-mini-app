// packageTree/message/message.js
const WXAPI = getApp().globalData.WXAPI;
const UTIL = getApp().globalData.UTIL;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    atIndex: 0,
    messageList: [],
    loading: false,
    hasNextPage: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  onShow: function () {
    if (this.data.atIndex == 0) {
      this.setData({ messageList: [], hasNextPage: true, loading: true })
      this.getMessageList()
    } else {
      this.setData({ messageReadList: [], hasNextPage: true, loading: true })
      this.getMessageReadList()
    }

  },
  // 初始化函数
  getMessageList() {
    let nowDate = (new Date()).valueOf();
    let index = this.data.messageList.length;
    let query = {
      "currentPage": `${index + 1}`,
      "size": "20"
    }
    WXAPI.mineTips(query).then(res => {
      if (res.code == 0) {
        if (res.data.rows.length) {
          let hasNextPage = res.data.currentPage < res.data.totalPages ? true : false;
          res.data.rows.map(item => {
            item.createAt = UTIL.beforeTypeDate(item.createAt, nowDate)
          })
          this.setData({ [`messageList[${index}]`]: res.data.rows, hasNextPage: hasNextPage, loading: false })
        } else {
          this.setData({ hasNextPage: false, loading: false })
        }
      } else {
        res.text ? UTIL.commonToast(res.text) : UTIL.commonToast("数据错误");
      }
    })
  },
  // 获取未读函数
  getMessageReadList() {
    let nowDate = (new Date()).valueOf();
    let index = this.data.messageReadList.length;
    let query = {
      "currentPage": `${index + 1}`,
      "size": "20",
      "hasRead":false
    }
    WXAPI.mineTips(query).then(res => {
      if (res.code == 0) {
        if (res.data.rows.length) {
          let hasNextPage = res.data.currentPage < res.data.totalPages ? true : false;
          res.data.rows.map(item => {
            item.createAt = UTIL.beforeTypeDate(item.createAt, nowDate)
          })
          this.setData({ [`messageReadList[${index}]`]: res.data.rows, hasNextPage: hasNextPage, loading: false })
        } else {
          this.setData({ hasNextPage: false, loading: false })
        }
      } else {
        res.text ? UTIL.commonToast(res.text) : UTIL.commonToast("数据错误");
      }
    })
  },
  // 交互函数
  // 已读未读胶囊切换
  capsuleClick(e) {
    if (e.currentTarget.dataset.index != this.data.atIndex) {
      if (e.currentTarget.dataset.index == 0) {
        this.setData({ atIndex: e.currentTarget.dataset.index, messageList: [],loading: true})
        this.getMessageList()
      } else {
        this.setData({ atIndex: e.currentTarget.dataset.index, messageReadList: [],loading:true})
        this.getMessageReadList()
      }
    }
  },
  // 清空所有消息
  handleMessage() {
    let atIndex = this.data.atIndex;
    if (atIndex==0) {
      wx.showModal({
        content: `确定清空所有消息？`,
        confirmText: "确定",
        confirmColor: "#2DA25F",
        cancelText: "取消",
        cancelColor: "#c5c5c5",
        success: function (res) {
          if (res.confirm) {
            WXAPI.mineDeleteAllTips().then(res => {
              if (res.code == 0) {
                this.setData({ messageReadList: [], messageList: [] })
                UTIL.commonToast("成功清空所有消息")
                wx.navigateBack()
              } else {
                res.text ? UTIL.commonToast(res.text) : UTIL.commonToast("数据错误");
              }
            })
          }
        },
      })
    } else {
      WXAPI.mineReadAllTips().then(res => {
        if (res.code == 0) {
          this.setData({atIndex:0,messageList:[],hasNextPage: true, loading: true})
          this.getMessageList();
        } else {
        }
      })
    }

  },
  // // 标记所有已读
  // transformRead(){

  // },
  // 跳转函数
  goTree(e) {
    wx.navigateTo({
      url: `/packageTree/treedetails/treedetails?subjectId=${e.currentTarget.dataset.viewid}`,
      success() {
      }
    })
  },
  /**
 * 页面上拉触底事件的处理函数
  */
  onReachBottom: function (e) {
    if (this.data.hasNextPage && !this.data.loading) {
   
      this.data.atIndex == 0 ? this.getMessageList() : this.getMessageReadList();
    }
  },
})