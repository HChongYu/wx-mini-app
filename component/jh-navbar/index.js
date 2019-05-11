// component/jh-navbar/indedx.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    navbarData:{
      type:Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    atIndex: 0 
  },

  /**
   * 组件的方法列表
   */
  methods: {
    click(e){
      // e.currentTarget.dataset.index == this.data.atIndex ? "" : 
      if (e.currentTarget.dataset.index != this.data.atIndex){
        this.setData({ atIndex: e.currentTarget.dataset.index })
      }
    }
  }
})
