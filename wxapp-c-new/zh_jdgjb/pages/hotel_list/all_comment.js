var app = getApp();

Page({
  data: {
    assess_list: [],
    page: 1
  },
  onLoad: function(a) {
    console.log(a), this.setData({
        seller_id: a.seller_id,
        url: wx.getStorageSync("url")
      }),
      // wx.setNavigationBarColor({
      //     frontColor: "#ffffff",
      //     backgroundColor: wx.getStorageSync("platform").color
      // }),

      this.refresh();
  },
  refresh: function(a) {
    var t = this,
      e = t.data.seller_id,
      s = t.data.assess_list,
      o = t.data.page;
    app.util.request({
      url: "entry/wxapp/AssessList",
      cachetime: "0",
      data: {
        seller_id: e,
        page: o
      },
      success: function(a) {
        if (console.log("这是酒店评价"), console.log(a), 0 < a.data.length) {
          for (var e in t.setData({
              page: o + 1,
              none_more: !1
            }), s = s.concat(a.data), a.data) a.data[e].img = a.data[e].img.split(","), a.data[e].time = app.ormatDate(a.data[e].time).slice(0, 10);
          t.setData({
            assess_list: s
          });
        } else t.setData({
          none_more: !0
        });
      }
    });
  },
  previewImage: function(a) {
    console.log(a);
    var e = this.data.url,
      t = [],
      s = a.currentTarget.id,
      o = a.currentTarget.dataset.index,
      r = this.data.assess_list;
    for (var n in r)
      if (s == r[n].id) var i = r[n].img;
    for (var l in i) t.push(e + i[l]);
    wx.previewImage({
      current: e + i[o],
      urls: t
    });
  },
  onReady: function() {},
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {
    this.setData({
      assess_list: [],
      page: 1
    }), this.refresh();
  },
  onReachBottom: function() {
    this.refresh();
  }
});