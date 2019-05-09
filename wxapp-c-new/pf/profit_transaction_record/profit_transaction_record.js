var app = getApp();

Page({
  data: {
    page: 1,
    score_detail: []
  },


  onLoad: function (t) {
    var a = wx.getStorageSync("userInfo").id;
    var page = this;
    wx.showLoading({
      title: "加载中..",
      mask: true,
    });
    app.util.request({
      url: "entry/wxapp/GetJYRecord",
      data: {
        user_id: a,
        page: 1
      },
      success: function (res) {
        console.log(res);
        page.setData({
          score_detail: res.data
        })
      },
      complete: function (res) {
        wx.hideLoading();
      },
    });
  },


  refresh: function (t) {
    var e = this,
      a = e.data.user_id,
      o = e.data.score_detail,
      n = e.data.page;
    wx.request({
      url: "entry/wxapp/Yelist",
      data: {
        user_id: a,
        page: n
      },
      success: function (t) {
        if (console.log(t), 0 < t.data.length) {
          for (var a in o = o.concat(t.data), t.data) t.data[a].time = app.ormatDate(t.data[a].time).slice(0, 16);
          e.setData({
            page: n + 1,
            score_detail: o
          });
        }
      }
    });
  },


  onReady: function () { },
  onShow: function () { },
  onHide: function () { },
  onUnload: function () { },

  onPullDownRefresh: function () {
    this.setData({
      score_detail: [],
      page: 1
    }),
      this.refresh(),
      wx.stopPullDownRefresh();
  },


  onReachBottom: function () {
    this.refresh();
  }
});