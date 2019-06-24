// pagekagelist/pages/y-phoneup/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // phone: {
    //   type: String
    // },
    voteShow: {
      type: Boolean,
      value: false,
      // 变量监听
      observer(val) {
        console.log(val)
        if (val === true) {
          this.pullUp()
        } else {
          this.closeUp()
        }
      }
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    voteItem: [{
        name: '低俗与敏感内容',
        id: 1
      },
      {
        name: '内容令人不适',
        id: 1
      },
      {
        name: '垃圾、广告和欺诈',
        id: 1
      },
      {
        name: '人身攻击',
        id: 1
      },
      {
        name: '我再想想',
        id: 1
      }
    ]
  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached() {
      const animation = wx.createAnimation({
        duration: 0,
        timingFunction: 'linear',
      })
      this.data.animation = animation
      animation.translateY(200).step();
      this.setData({
        animationData: animation.export()
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    close() {
      this.setData({
        voteShow: false
      })
    },
    // 关闭弹框
    closeUp() {
      const animation = wx.createAnimation({
        duration: 100,
        timingFunction: 'linear',
      })
      this.data.animation = animation
      animation.translateY(200).step();
      this.setData({
        animationData: animation.export()
      })
    },
    // 拉起弹框
    pullUp() {
      const animation = wx.createAnimation({
        duration: 100,
        timingFunction: 'linear',
      })
      this.data.animation = animation
      animation.translateY(0).step();
      this.setData({
        animationData: animation.export()
      })
    },
    voteItem(){
      this.close();
    }
  }
})