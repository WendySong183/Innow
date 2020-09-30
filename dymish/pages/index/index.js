//index.js
//获取应用实例
const app = getApp();
Page({
  data: {
    photoList: ["https://p6-dy-ipv6.byteimg.com/img/tos-cn-p-0015/6d172f7c389146a5af10a4ee75b8bb84_1600599379~c5_300x400.jpeg", "https://p9-dy.byteimg.com/img/tos-cn-p-0015/ca47881949134b66b2c32f54c3eb3d99_1600855399~c5_300x400.jpeg", "https://p3-dy-ipv6.byteimg.com/img/tos-cn-p-0015/511a9749128b4fe8ab0a03b0479b26f1_1600943044~c5_300x400.jpeg"],
    videoList: ["https://aweme.snssdk.com/aweme/v1/playwm/?video_id=v0200fd70000btjjaifbs79j0rapm7l0&ratio=720p&line=0", "https://aweme.snssdk.com/aweme/v1/playwm/?video_id=v0200f280000btlhqfd2kepr3i4g6v00&ratio=720p&line=0", "https://aweme.snssdk.com/aweme/v1/playwm/?video_id=v0300f540000btm76lftchf7ou6cc940&ratio=720p&line=0"]
  },

  //点击查看大图
  previewImage(e) {
    var current = e.target.dataset.src;
    var urls = this.data.photoList;
    tt.previewImage({
      current: current,
      // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表

    });
  },

  // 自动全屏
  onShow: function () {
    this.videoContext = tt.createVideoContext('myVideo', this); // 	创建 video 上下文 VideoContext 对象。

    this.videoContext.requestFullScreen({
      // 设置全屏时视频的方向，不指定则根据宽高比自动判断。
      direction: 90 // 屏幕逆时针90度

    });
  },
  // 视频结束后自动退出全屏
  endAction: function () {
    this.videoContext = tt.createVideoContext('myVideo', this);
    this.videoContext.exitFullScreen(); //退出全屏
  },
  //事件处理函数
  bindViewTap: function () {
    tt.navigateTo({
      url: '../logs/logs'
    });
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      });
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        });
      };
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      tt.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo;
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          });
        }
      });
    }
  },
  getUserInfo: function (e) {
    console.log(e);
    app.globalData.userInfo = e.detail.userInfo;
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    });
  }
});