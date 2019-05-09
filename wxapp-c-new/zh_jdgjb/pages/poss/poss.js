// zh_jdgjb/pages/poss/poss.js
var app = getApp(),
  util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    hotel: [],
    timg: !1,
    address: 0,
    checkInDate: "",
    checkOutDate: "",
  },


  search(o) {
    var e = o.detail.value;
    console.log(o)
    this.setData({
      d: e
    })
    if (e == '') {
      this.lll()
    }
  },

  searchddd: function (o) {
    var t = this,
      e = t.data.d;
    if (e == '') {
      wx.showToast({
        title: '输入搜索内容',
        icon: 'none',
        duration: 1000,
        mask: true,
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
      return false;
    }
    app.util.request({
      url: "entry/wxapp/ZhuanList",
      cachetime: "0",
      data: {
        city: wx.getStorageSync("city"),
        endtime: wx.getStorageSync("ROOM_SOURCE_DATE").checkOutDate,
        starttime: wx.getStorageSync("ROOM_SOURCE_DATE").checkInDate,
        keywords: e
      },
      success: function (o) {
        console.log(o)
        if (o.data == '') {
          t.setData({
            none_more: true,
            hotel: []
          });
        } else {
          t.setData({
            hotel: o.data
          });
        }
      }
    })
  },


  hotel: function (e) {
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    console.log(e);
    var e = this.data.hotel[index];
    var a = e.tel,
      o = e.coordinates,
      i = e.address,
      n = e.name;
    wx.navigateTo({
      url: '../poss_detail/poss_detail?id=' + id + "&coordinates=" + o + "&tel=" + a + "&address=" + i + "&name=" + n,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },



  date: function (t) {
    var e = wx.getStorageSync("ROOM_SOURCE_DATE").checkInDate,
      a = wx.getStorageSync("ROOM_SOURCE_DATE").checkOutDate,
      o = wx.getStorageSync("day"),
      r = app.util.time();
    console.log(e)
    // this.data.checkInDate
    // this.data.checkOutDate
    if (console.log(n), wx.setStorageSync("datein", n), "" == e) {
      var n = app.util.time();
      wx.setStorageSync("datein", n);
    } else if (e < r) n = r;
    else n = e;
    if ("" == a) var i = app.util.addDate(r, 1);
    else {
      var s = app.util.addDate(r, 1);
      if (a < s) i = s;
      else i = a;
    }
    o = app.util.day(i, n);
    // wx.setStorageSync("day1", n),
    //   wx.setStorageSync("day2", i),
    //   wx.setStorageSync("day", o),
    this.setData({
      weeks: n,
      week_out: i,
      time: o,
      current_date: n
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (t) {
    var e = this;
    console.log(t)
    this.setData({
      page: 1,
    })
    var e = this;
    e.lll();
    e.date();
  },

  lll() {
    var page = this;
    let getDate = wx.getStorageSync("ROOM_SOURCE_DATE");
    wx.showLoading({
      title: "加载中..",
      mask: true,
    });
    app.util.request({
      url: "entry/wxapp/ZhuanList",
      data: {
        city: wx.getStorageSync("city"),
        starttime: getDate.checkInDate,
        endtime: getDate.checkOutDate,
      },
      success: function (t) {
        console.log(t);
        page.setData({
          hotel: t.data,
        })
      },
      complete: function (res) {
        wx.hideLoading();
      },
    });
  },


  refresh: function (t) {
    var s = this,
      e = wx.getStorageSync("url");
    s.setData({
      url: e
    });
    var c = s.data.page,
      l = s.data.hotel,
      g = s.data.Recommend,
      d = s.data.price_sorting,
      p = s.data.nearby;
    let getDate = wx.getStorageSync("ROOM_SOURCE_DATE");
    // getDate.checkInDate,
    //   getDate.checkOutDate
    var str = getDate.checkInDate;
    var year = str.split('-')[0];
    var month = str.split('-')[1];
    var date = str.split('-')[2];
    year = year + '年';
    month = month + '月';
    date = date + '日';


    var strs = getDate.checkOutDate;
    var years = strs.split('-')[0];
    var months = strs.split('-')[1];
    var dates = strs.split('-')[2];
    years = years + '年';
    months = months + '月';
    dates = dates + '日';

    this.setData({
      checkInDate: [month + date],
      checkOutDate: [months + dates],
    });

    app.util.request({
      url: "entry/wxapp/ZhuanList",
      cachetime: "0",
      data: {
        page: c,
        city: wx.getStorageSync("city"),
        starttime: getDate.checkInDate,
        endtime: getDate.checkOutDate,
      },
      success: function (t) {
        if (console.log(t),
          0 < t.data.length) {
          s.setData({
            page: c + 1,
            none_more: !1
          }),
            l = l.concat(t.data);
          for (var e = 0; e < l.length; e++) {
            var a = l[e].coordinates.split(",");
            l[e].lat2 = a[0],
              l[e].lng2 = a[1];
            var o = s.data.lat1,
              r = s.data.lng1,
              n = Number(a[0]),
              i = Number(a[1]);
            l[e].distance = app.util.location(o, n, r, i);
          }
          s.setData({
            hotel: l,
          })
        } else s.setData({
          none_more: !0,

        });
      }
    });
  },



  checkInDate() {
    wx.navigateTo({
      url: '../calendar/index',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.date();
    this.refresh();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var platform = wx.getStorageSync("platform")
    console.log(platform)
    var page = this;
    var user_info = wx.getStorageSync("userInfo");
    var transfer_title = platform.shared_config.transfer_square.title
    var transfer_img = platform.shared_config.transfer_square.img
    return {
      title: transfer_title,
      imageUrl: "https://oss.bizhuhome.com/" + transfer_img,
      path: "/zh_jdgjb/pages/index/index?user_id=" + user_info.id,
      success: function (e) {
        console.log("这个是分享")
        console.log(e)
      }
    };
  }
})