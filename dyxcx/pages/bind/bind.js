// pages/bind/bind.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    name: "",
    path: "/images/touxiang.png",
    localPath: "选择位置",
    imageList: []
  },
  //获取用户信息
  fetchInfo: function () {
    var that = this;
    tt.getUserInfo({
      success: function (res) {
        console.log(res);
        that.setData({
          name: res.userInfo.nickName,
          path: res.userInfo.avatarUrl
        });
      }
    });
  },
  //选择位置
  getLocalPath: function () {
    var that = this;
    tt.chooseLocation({
      success: function (res) {
        that.setData({
          localPath: res.address
        });
      }
    });
  },
  //上传图片
  uploadImage: function () {
    var that = this;
    tt.chooseImage({
      success: function (res) {
        that.setData({
          imageList: res.tempFilePaths
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {}
});