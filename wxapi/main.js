// 小程序开发api接口工具包，https://github.com/gooking/wxapi
const CONFIG = require('./config.js')
const API_BASE_URL = 'http://47.105.135.127:8090/'
const request = (url, method, data = {}) => {
  let _url = API_BASE_URL + url
  return new Promise((resolve, reject) => {
    let token = wx.getStorageSync('token')
    let header = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    if (token) {
      header.token = token
    }
    wx.request({
      url: _url,
      method: method,
      header: header,
      data: data,
      success(request) {
        resolve(request.data)
      },
      fail(error) {
        reject(error)
      },
      complete(aaa) {
        // 加载完成
      }
    })
  })
}

/**
 * 小程序的promise没有finally方法，自己扩展下
 */
Promise.prototype.finally = function(callback) {
  var Promise = this.constructor;
  return this.then(
    function(value) {
      Promise.resolve(callback()).then(
        function() {
          return value;
        }
      );
    },
    function(reason) {
      Promise.resolve(callback()).then(
        function() {
          throw reason;
        }
      );
    }
  );
}

module.exports = {
  request,
  // 登陆
  jhLogin: () => {
    return request('/u/login', 'POST')
  },
  //首页
  indexIndexDetail: () => {
    return request('index/indexDetail', 'POST')
  },
  //分类活动列表
  indexSearchActivitiesByType: (type) => {
    return request('index/searchActivitiesByType', 'POST', {
      "type": type
    })
  },
  //搜索活动
  indexSearchActivitiesByTitle: (title) => {
    return request('index/searchActivitiesByTitle', 'POST', {
      "title": title
    })
  },
  //活动详情
  activityDetail: (activityId) => {
    return request('activity/detail', 'POST', {
      "activityId": activityId
    })
  },
  //教官详情
  activityTeacherDetail: (teacherId) => {
    return request('activity/TeacherDetail', 'POST', {
      "teacherId": teacherId
    })
  },
  // 文章详情
  articleDetail: (articleId) => {
    return request('article/detail', 'POST', {
      "articleId": articleId
    })
  },
  // 收藏文章
  articleStore: (articleId) => {
    return request('article/store', 'POST', {
      "articleId": articleId
    })
  },
  //取消收藏文章
  articleCancelStore: (articleId) => {
    return request('article/cancelStore', 'POST', {
      "articleId": articleId
    })
  },
  // 我的文章
  mineArticles: () => {
    return request('mine/articles', 'POST')
  },
  // 树洞发布
  shudongAddSubject: (dto) => {
    return request('shudong/addSubject', 'POST',{'dto':dto})
  },
  // 树洞评论
  shudongAddReply: (dto) => {
    return request('shudong/addReply', 'POST',{'dto':dto})
  },
  // 删除某条品论
  shudongDeleteReply: (subjectId) => {
    return request('shudong/deleteReply', 'POST',{'subjectId':subjectId})
  },
  // 取消点赞
  shudongCancleLikeOne: (subjectId) => {
    return request('shudong/cancleLikeOne', 'POST',{'subjectId':subjectId})
  },
  // 删除某条树洞
  shudongDeleteSubject: (subjectId) => {
    return request('shudong/deleteSubject', 'POST',{'subjectId':subjectId})
  },
  // 点赞某个树洞
  shudongLikeOne: (subjectId) => {
    return request('shudong/likeOne', 'POST',{'subjectId':subjectId})
  },
  // 我互动过的
  shudongMyReplie: () => {
    return request('shudong/myReplies', 'POST',{'subjectId':subjectId})
  },
  // 点赞某个树洞
  shudongLikeOne: (subjectId) => {
    return request('shudong/likeOne', 'POST',{'subjectId':subjectId})
  },
  // 点赞某个树洞
  shudongLikeOne: (subjectId) => {
    return request('shudong/likeOne', 'POST',{'subjectId':subjectId})
  },
  // 点赞某个树洞
  shudongLikeOne: (subjectId) => {
    return request('shudong/likeOne', 'POST',{'subjectId':subjectId})
  },

}