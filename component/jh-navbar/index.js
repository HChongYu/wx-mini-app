// component/jh-navbar/indedx.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    navbarData: {
      type: Array
    },
    inStyle: {
      type: String,
      value: "margin-top:20rpx;"
    },
    isScroll: {
      type: Boolean,
      value: false
    },
    atIndex: {
      type: Number,
      value: 0
    }
  },
  observers: {
    //监听角标
    'atIndex': function () {
      if(this.data.isScroll){
        this.scrollInto();
      }
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    idIndex:0
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 计算滑动位置
    scrollInto(){
      //todo
      let atIndex = this.data.atIndex;
      let len =this.data.navbarData.length;
      let idIndex;
      if (len>4){
        if(atIndex>0){
          idIndex = atIndex-1;
          this.setData({ idIndex: idIndex })
        }
      } 
    },
    // 滑动点击
    // scrollclick(e) {
    //   let atIndex = this.data.atIndex;
    //   let itemIndex = e.currentTarget.dataset.index;
    //   if (itemIndex != atIndex) {
    //     this.setData({
    //       atIndex: itemIndex
    //     })
    //     this.triggerEvent('callBack', this.data.navbarData[itemIndex])
    //   }
    // },
    // 固定模式点击
    click(e) {
      let atIndex = this.data.atIndex;
      let itemIndex = e.currentTarget.dataset.index;
      if (itemIndex != atIndex) {
        this.setData({
          atIndex: itemIndex
        })
        this.triggerEvent('callBack', this.data.navbarData[itemIndex])
      }
    }
  }
})