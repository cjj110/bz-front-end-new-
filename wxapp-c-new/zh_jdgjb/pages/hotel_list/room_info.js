var app = getApp();

Page({
  data: {},
  onLoad: function (o) {
    var a = this;
    wx.setNavigationBarColor({
      backgroundColor: wx.getStorageSync("platform").color
    }), a.setData({
      color: wx.getStorageSync("platform").color
    }), console.log(o);
    var t = wx.getStorageSync("url"),
      e = (o.hotel_id, o.room_id),
      n = (new Date().toLocaleDateString().replace(/\//g, "-"),
        o.coordinates),
      r = o.tel,
      i = o.address,
      s = o.name,
      c = o.price;
    a.setData({
      tel: r,
      coordinates: n,
      address: i,
      name: s,
      price: c
    }), app.util.request({
      url: "entry/wxapp/RoomDetails",
      cachetime: "0",
      data: {
        room_id: e
      },
      success: function (o) {
        console.log("这是房型列表")
        console.log(o)
        // if (o.data.img[0] != ' ') {
        //   o.data.img = o.data.img.split(",")
        // }

        a.setData({
          room: o.data,
          url: t
        });
      }
    });
  },
  phone: function (o) {
    wx.makePhoneCall({
      phoneNumber: this.data.tel
    });
  },
  dizhi: function (o) {
    var a = this,
      t = Number(a.data.coordinates.split(",")[0]),
      e = Number(a.data.coordinates.split(",")[1]);
    wx.openLocation({
      latitude: t,
      longitude: e,
      name: a.data.name,
      address: a.data.address
    });
  },
  previewImage: function (o) {
    console.log(o);
    var a = this.data.url,
      t = [],
      e = o.currentTarget.dataset.index;
    console.log(e);
    var n = this.data.room.img;
    for (var r in n) t.push(a + n[r]);
    wx.previewImage({
      current: a + n[e],
      urls: t
    });
  },
  setclip: function (o) {
    wx.setClipboardData({
      data: "1.0版本",
      success: function (o) {
        wx.getClipboardData({
          success: function (o) {
            console.log(o.data);
          }
        });
      }
    });
  },
  onReady: function () { },
  onShow: function () { },
  onHide: function () { },
  onUnload: function () { },
  onPullDownRefresh: function () { },
  onReachBottom: function () { },
  onShareAppMessage: function () { }
});