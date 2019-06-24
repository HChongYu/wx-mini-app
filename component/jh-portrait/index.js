// component/jh-head/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    portraitData:{
      type:Object
    },
    size:{
      type: String,
      value: "small"
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
    portraitClick(e){
      this.triggerEvent('callBack', {})
    }
  }
})
