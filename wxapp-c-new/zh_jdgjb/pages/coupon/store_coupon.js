var app = getApp();

Page({
  data: {
    item: ["有效", "已使用", "已过期"],
    seletive_index: 0,
    index: 0,
    page: 1,
    unreceive: []
  },
  onLoad: function (e) {
    console.log(e);
    var o = this,
      t = e.hotel_id;
    o.setData({
      hotel_id: t,
      price: e.money
    }), o.setData({
      color: wx.getStorageSync("platform").color
    }), console.log(o.data), wx.setNavigationBarColor({
      frontColor: "#ffffff",
      backgroundColor: wx.getStorageSync("platform").color,
      animation: {
        duration: 0,
        timingFunc: "easeIn"
      }
    }), o.reload();
  },
  reload: function (e) {
    var i = this,
      l = app.today(),
      o = wx.getStorageSync("userInfo").id,
      s = i.data.index,
      c = i.data.unreceive,
      r = i.data.page;
    app.util.request({
      url: "entry/wxapp/MyCoupons",
      cachetime: "0",
      data: {
        user_id: o,
        page: r
      },
      success: function (e) {
        if (console.log("我的优惠券"), console.log(e), 0 < e.data.length) {
          i.setData({
            page: r + 1
          }), c = c.concat(e.data);
          e.data;
          var o = [],
            t = [],
            n = [];
          for (var a in c) null != c[a].end_time && (c[a].end_time = c[a].end_time.slice(0, 10),
            c[a].start_time = c[a].start_time.slice(0, 10), c[a].cost = Number(c[a].cost).toFixed(0),
            l > c[a].end_time && o.push(c[a]), l <= c[a].end_time && 1 == c[a].state && t.push(c[a]),
            2 == c[a].state && n.push(c[a]));
          console.log("有效的优惠券"), console.log(t), console.log("过期的的优惠券"), console.log(o), console.log("已经使用的优惠券"),
            console.log(n), 0 == s ? i.setData({
              unreceive: t
            }) : 1 == s ? i.setData({
              unreceive: n
            }) : i.setData({
              unreceive: o
            });
        }
      }
    });
  },
  receive: function (e) {
    var o = e.currentTarget.id;
    console.log(e), console.log(o), 0 == o ? wx.navigateTo({
      url: "../hotel_list/hotel_list"
    }) : wx.navigateTo({
      url: "../hotel_list/hotel_info?hotel_id=" + o
    });
  },
  not_user: function (e) {
    var o = getCurrentPages();
    o[o.length - 1];
    o[o.length - 2].setData({
      coupon: 0,
      coupons_id: ""
    }), wx.navigateBack({
      delta: 1
    });
  },
  seletive_index: function (e) {
    var o = e.currentTarget.dataset.index;
    this.setData({
      seletive_index: o,
      index: o,
      page: 1,
      unreceive: []
    }), this.reload();
  },
  receive_coupon: function (e) {
    console.log(e);
    var o = this.data.price,
      t = e.currentTarget.dataset.money,
      n = e.currentTarget.id,
      a = e.currentTarget.dataset.condition;
    if ("" == a) var i = 0;
    else i = a.replace(/[^0-9]/gi, "");
    if (console.log("接收到的订单金额为 " + o), console.log("该优惠券的优惠金额为 " + t), console.log("该优惠券的优惠条件为 " + a),
      console.log("该优惠券的优惠条件为 " + i), console.log("该优惠券的id为 " + n), o < i) wx.showToast({
        title: "不到使用条件"
      });
    else {
      var l = getCurrentPages();
      l[l.length - 1];
      l[l.length - 2].setData({
        coupon: t,
        coupons_id: n,
        condition: i
      }), wx.navigateBack({
        delta: 1
      });
    }
  },
  onReady: function () { },
  onShow: function () { },
  onHide: function () { },
  onUnload: function () { },
  onPullDownRefresh: function () {
    this.setData({
      seletive_index: 0,
      index: 0,
      page: 1,
      unreceive: []
    }), this.reload(), wx.stopPullDownRefresh();
  },
  onReachBottom: function () {
    this.reload();
  }
});