var app = getApp();

Page({
  data: {},
  onLoad: function (o) {
    wx.setNavigationBarColor({
      frontColor: "#ffffff",
      backgroundColor: wx.getStorageSync("platform").color
    }), this.refresh();
  },
  refresh: function (o) {
    var n = this, t = wx.getStorageSync("userInfo").id;
    app.util.request({
      url: "entry/wxapp/CountCommission",
      data: {
        user_id: t
      },
      success: function (o) {
        console.log(o), n.setData({
          statistics: o.data
        });
      }
    });
  },
  onReady: function () { },
  onShow: function () { },
  onHide: function () { },
  onUnload: function () { },
  onPullDownRefresh: function () { },
  onReachBottom: function () { }
});