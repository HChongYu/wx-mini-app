// component/jh-win/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
 
    winData: {
      type: Object,
    },
    size:{
      type: String,
      value: "large"
    }
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
    winClick(e) {
      let data = e.currentTarget.dataset;
      this.triggerEvent('callBack', data)
    },
  }
})
