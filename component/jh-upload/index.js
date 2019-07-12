// component/jh-upload/index.js
const UTIL = getApp().globalData.UTIL;
let tempFilesList = [];
let succeedList = [];
let big = 0;
let done = 0;
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    uploadImgList: [],//已经上传成功展示列表
    uploading: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    uploadClick() {
      let that = this;
      this.data.big=0;
      let yet = this.data.uploadImgList.length;
      done=0;
      if (yet >= 9) {
        UTIL.commonToast(`最多只能上传9长图片`);
        return
      }
      wx.chooseImage({
        count: 9 - yet,
        success: res => {
          let plan = res.tempFiles.length;
          if (plan + yet > 9) {
            UTIL.commonToast(`最多只能上传9长图片`)
            return
          }
          wx.showLoading({
            title: '上传中。。。',
          })
          tempFilesList=res.tempFiles;
          that.uploadFile(tempFilesList[0])
        },
      })
    },
    uploadFile(item) {
      console.log(item)
      let that = this;
      let index=this.data.uploadImgList.length? this.data.uploadImgList.length:0;
      if((item.size/1000)>1999){
        big=big+1;
        done=done+1
        if(done>=tempFilesList.length){
          UTIL.commonToast(`有${big}张图片超过2M的最大限制不能上传`)
          that.triggerEvent('callBack', succeedList)
        }else{
          that.uploadFile(tempFilesList[done])
        }
        return
      }
      wx.uploadFile({
        url: 'http://47.105.135.127:8080/public/uploadFile', 
        filePath: item.path,
        name: 'file',
        success(res) {
          res.data = JSON.parse(res.data)
          done=done+1
          if (res.data.code == 0) {
            succeedList.push(res.data.data)
            that.setData({ [`uploadImgList[${index}].path`]: res.data.data, [`uploadImgList[${index}].succeed`]: true })
            if(done>=tempFilesList.length){
              that.triggerEvent('callBack', succeedList)
              wx.hideLoading();

              big? UTIL.commonToast(`有${big}张图片超过2M的最大限制不能上传`):UTIL.commonToast(`完成全部上传`);
         
            }else{
              that.uploadFile(tempFilesList[done])
            }
          } else {
            if(done>=tempFilesList.length){
              wx.hideLoading();
              big? UTIL.commonToast(`有${_data.big}张图片超过2M的最大限制不能上传`):UTIL.commonToast(`上传完成`);
              that.triggerEvent('callBack', succeedList)
            }else{
              that.uploadFile(tempFilesList[done])
            }
            that.setData({ [`uploadImgList[${index}].filePath`]: item, [`uploadImgList[${index}].succeed`]: false })
            // res.data.text ? UTIL.commonToast(res.data.text) : UTIL.commonToast('数据错误');
          }
        }
      }).onProgressUpdate((res) => {
        that.setData({ [`uploadImgList[${index}].progress`]: res.progress })
      })
    },
    falseAngin(e) {
      this.uploadFile(e.currentTarget.dataset.path, e.currentTarget.dataset.index)
    },
    itemDelete(e) {
      let uploadImgList = this.data.uploadImgList;
      uploadImgList.splice(e.currentTarget.dataset.index, 1)
      this.setData({ uploadImgList: uploadImgList })
    },
  }
})
