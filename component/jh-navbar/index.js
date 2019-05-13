// component/jh-navbar/indedx.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    navbarData: {
      type: Array
    },
    style:{
      type: String,
      value: "margin-top:20rpx;"
    },
    atIndex:{
      type:Number,
      value: 0
    }
  },
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    click(e) {
      // e.currentTarget.dataset.index == this.data.atIndex ? "" :
      let temIndex = e.currentTarget.dataset.index;
      if (temIndex != this.data.atIndex) {
        this.setData({
          atIndex: temIndex
        })
        this.triggerEvent('callBack', this.data.navbarData[temIndex])
      }
    }
  }
})