// component/jh-head/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    portraitData:{
      type:Object
    },
    type: {
      type: Number,
      
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
      if (this.data.size =='small'){
        this.triggerEvent('callBack', this.data.portraitData.teacherId)
      }
    }
  }
})
