// component/jh-fold/jh-fold.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    openStatus:{
      type: Boolean,
      value: false
    },
    showBtn: {
      type: Boolean,
      value: false
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
    foldClick(){
      this.triggerEvent('callBack', !this.data.openStatus)
    }
  }
})
