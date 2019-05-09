// zh_jdgjb/pages/invitation/invitation.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var id = wx.getStorageSync("userInfo").id
    var page = this;
    wx.showLoading({
      title: "加载中..",
      mask: true,
    });
    app.util.request({
      url: "entry/wxapp/MyTeam",
      data: {
        user_id: id
      },
      success: function(res) {
        console.log(res);
        page.setData({
          list: res.data
        })
      },
      complete: function(res) {
        wx.hideLoading();
      },
    });
    
    app.util.request({
      url: "entry/wxapp/Invitation",
      data: {
        user_id: id
      },
      success: function(res) {
        console.log(res);
        page.setData(res.data)
      },
      complete: function(res) {
        wx.hideLoading();
      },
    });




  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var platform = wx.getStorageSync("platform")
    console.log(platform)
    var page = this;
    var user_info = wx.getStorageSync("userInfo");
    var yaoqing_title = platform.shared_config.invitation.title
    var yaoqing_img = platform.shared_config.invitation.img[0]
    console.log(yaoqing_img)
    return {
      title: yaoqing_title,
      imageUrl: yaoqing_img,
      path: "/zh_jdgjb/pages/index/index?user_id=" + user_info.id,
      success: function (e) {
        console.log("这个是分享")
        console.log(e)
      }
    };
  }
})