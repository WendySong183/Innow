//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    photoList:[
      "https://p6-dy-ipv6.byteimg.com/img/tos-cn-p-0015/6d172f7c389146a5af10a4ee75b8bb84_1600599379~c5_300x400.jpeg",
      "https://p9-dy.byteimg.com/img/tos-cn-p-0015/ca47881949134b66b2c32f54c3eb3d99_1600855399~c5_300x400.jpeg",
      "https://p3-dy-ipv6.byteimg.com/img/tos-cn-p-0015/511a9749128b4fe8ab0a03b0479b26f1_1600943044~c5_300x400.jpeg"
    ]
  },


clickImg: function(e){
  var imgUrl = this.data.photoList;
  wx.previewImage({
    urls: [imgUrl], //需要预览的图片http链接列表，注意是数组
    current: '', // 当前显示图片的http链接，默认是第一个
    success: function (res) { },
    fail: function (res) { },
    complete: function (res) { },
  })

},
previewImage(e) {
  var current = e.currentTarget.dataset.index;
  var urls = this.data.photoList
  wx.previewImage({
    current: current, // 当前显示图片的http链接
    urls: srclist // 需要预览的图片http链接列表
  })
},

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
