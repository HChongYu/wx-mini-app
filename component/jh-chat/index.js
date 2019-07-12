// component/jh-chat/jh-chat.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    chatData:{
      type: Object,
    }, 
    showDelete:{
      type: Boolean,
      value: false
    },
    type:{
      type: String,
      value: "list"
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
    chatClick(e){
      this.triggerEvent('callBack', e.currentTarget.dataset)
    },
    deleteClick(e){
      this.triggerEvent('deleteBack', e.currentTarget.dataset)
    }
  }
})
