var app = getApp();
var DATE_LIST = [];
var DATE_YEAR = new Date().getFullYear()
var DATE_MONTH = new Date().getMonth() + 1
var DATE_DAY = new Date().getDate()
var Moment = require("../../utils/moment.js");
Page({
  data: {
    luntext: ["房型列表", "酒店详情", "酒店评价"],
    activeIndex: 0,
    info: {
      curHdIndex: 4,
      collection: true,
      up_nunber: 10,
    },
    checkInDate: "",
    checkOutDate: "",
  },
  JieliStatus(e) {
    var p = this;
    var id = wx.getStorageSync("userInfo").id;
    app.util.request({
      url: "entry/wxapp/JieliStatus",
      data: {
        user_id: id
      },
      success: function (t) {
        console.log(t)
        p.setData({
          jiestatus: t.data.status
        });
      }
    })
  },


  go() {
    var p = this;
    var id = wx.getStorageSync("userInfo").id;
    app.util.request({
      url: "entry/wxapp/AddJieli",
      data: {
        user_id: id
      },
      success: function (t) {
        wx.navigateTo({
          url: '/zh_jdgjb/pages/invite_friends/invite_friends',
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
      }
    })
  },


  // 收藏
  coll(e) {
    var page = this;
    var id = e.currentTarget.dataset.id;
    var hotel = page.data.hotel;
    if (id == 0) {
      hotel.coll = 1
    } else {
      hotel.coll = 0
    }
    app.util.request({
      url: "entry/wxapp/Collection",
      data: {
        user_id: wx.getStorageSync("userInfo").id,
        storeid: page.data.hotel_id,
      },
      success: function (res) {
        if (res.data.code == 1) {
          page.setData({
            hotel: hotel
          });
          wx.showToast({
            title: '收藏成功',
            mask: true,
            image: '../img/images/icon-warning.png',
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            mask: true,
            image: '../img/images/icon-warning.png',
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })
        }
      }
    })
  },

  checkInDate() {
    wx.navigateTo({
      url: '../calendar/index?chenk=' + 'hotel',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  map: function (e) {
    var text = e.currentTarget.dataset.text;
    var address = e.currentTarget.dataset.address;
    var name = e.currentTarget.dataset.name;
    var Location = text.split(",")
    wx.openLocation({
      longitude: Number(Location[1]),
      latitude: Number(Location[0]),
      name: name,
      address: address,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  give_up: function (e) {
    // 点赞
    var that = this;
    var id = e.currentTarget.dataset.id;
    that.geet(1, id)
  },

  give_out: function (e) {
    var id = e.currentTarget.dataset.id;
    that.geet(2, id)
  },

  geet(e, id) {
    var that = this;
    app.util.request({
      url: "entry/wxapp/DianAssess",
      data: {
        type: e,
        user_id: wx.getStorageSync("userInfo").id,
        assessid: id
      },
      success: function (res) {
        if (res.data.code == 0) {
          wx.showToast({
            title: res.data.msg,
            icon: "none",
            image: '',
            duration: 1000,
            mask: true,
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })
        } else {
          that.setData(res.data.score)
          wx.showToast({
            title: '-' + res.data.data.score + "家贝",
            icon: "none",
            image: '',
            duration: 1000,
            mask: true,
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })
          var info = that.data.info;
          if (e == 1) {
            info.zan = parseInt(info.zan) + 1;
          } else {
            info.nozan = parseInt(info.nozan) + 1;
          }
          that.setData({
            info: info,
          })
        }
      },
      complete: function (res) { },
    });
  },

  assess_list_up: function (e) {
    // 点赞
    var that = this;
    var index = e.currentTarget.dataset.index;
    var id = e.currentTarget.dataset.id;
    that.assess_list(1, index, id)
  },

  assess_list_out: function (e) {
    var index = e.currentTarget.dataset.index;
    var id = e.currentTarget.dataset.id;
    this.assess_list(2, index, id)
  },
  assess_list(e, index, id) {
    var that = this;
    app.util.request({
      url: "entry/wxapp/DianAssess",
      data: {
        type: e,
        user_id: wx.getStorageSync("userInfo").id,
        assessid: id
      },
      success: function (res) {
        if (res.data.code == 0) {
          wx.showToast({
            title: res.data.msg,
            icon: "none",
            image: '',
            duration: 1000,
            mask: true,
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })
        } else {
          that.setData(res.data.score)
          wx.showToast({
            title: '-' + res.data.data.score + "家贝",
            icon: "none",
            image: '',
            duration: 1000,
            mask: true,
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })
          var assess_list = that.data.assess_list;
          if (e == 1) {
            assess_list[index].zan = parseInt(assess_list[index].zan) + 1;
          } else {
            assess_list[index].nozan = parseInt(assess_list[index].nozan) + 1;
          }
          that.setData({
            assess_list: assess_list,
          })
        }
      },
      complete: function (res) { },
    });
  },


  bg() {
    let page = this;
    app.util.request({
      url: "entry/wxapp/GetADImg",
      data: {
        type: 5
      },
      success: function (res) {
        console.log(res)
        page.setData({
          GetADImg: res.data.data
        })
      },
      complete: function (res) {

      },
    });
  },

  onLoad: function (t) {
    this.bg();
    var e = this;
    e.date(),
      e.setData({
        color: wx.getStorageSync("platform").color,
        title: t.title,
      });
    e.data.text;
    var a = t.hotel_id,
      o = wx.getStorageSync("url");
    e.setData({
      hotel_id: a,
      url: o,
      start: app.util.time(),
      end: app.util.addDate(app.util.time(), 28)
    }),
      e.refresh();
    e.hotel_detail();
    e.pl_hot();
    e.hotelss();
    //设缓存缓存起来的日期
    this.setData({
      checkInDate: wx.getStorageSync("ROOM_SOURCE_DATE").checkInDate,
      checkOutDate: wx.getStorageSync("ROOM_SOURCE_DATE").checkOutDate
    });
  },

  pl_hot(e) {
    var page = this;
    wx.showLoading({
      title: "加载中..",
      mask: true,
    });
    app.util.request({
      url: "entry/wxapp/TjAssess",
      data: {
        storeid: page.data.hotel_id,
      },
      success: function (res) {
        wx.setStorageSync("assessid", res.data.id)
        page.setData({
          info: res.data
        })
      },
      complete: function (res) {
        wx.hideLoading();
      },
    });
  },

  hotelss() {
    var page = this;
    app.util.request({
      url: "entry/wxapp/GetHotelService",
      data: {
        storeid: page.data.hotel_id,
      },
      success: function (res) {
        var facilities = res.data.facilities
        console.log(res)
        var arr = [];
        var service = [];
        var traffic = [];

        var wifi = [];
        for (let i in facilities) {
          arr.push(facilities[i]); //属性
        }
        for (let i in res.data.service) {
          service.push(res.data.service[i]); //属性
        }
        for (let i in res.data.traffic) {
          traffic.push(res.data.traffic[i]); //属性
        }
        for (let i in res.data.wifi) {
          wifi.push(res.data.wifi[i]); //属性
        }
        page.setData({
          facilities: arr,
          service: service,
          traffic: traffic,
          wifi: res.data.wifi,
        })

      },
      complete: function (res) {
        wx.hideLoading();
      },
    });
  },

  hotel_detail() {
    var i = this;
    var cont;
    app.util.request({
      
      url: "entry/wxapp/PjDetails",
      cachetime: "0",
      data: {
        user_id: wx.getStorageSync("userInfo").id,
        seller_id: i.data.hotel_id,
      },
      success: function (t) {
        console.log(t)
        t.data.img = t.data.img.split(",")
        if (t.data.star == "三星级") {
          t.data.hj = 3
        } else if (t.data.star == "四星级") {
          t.data.hj = 4
        } else if (t.data.star == "五星级") {
          t.data.hj = 5
        } else {
          t.data.hj = 2
        }
        wx.setStorageSync("address", t.data)
        i.setData({
          hotel_detail: t.data
        });
        
      }
    });
  },

  date: function (t) {

    var e = wx.getStorageSync("ROOM_SOURCE_DATE").checkInDate,
      a = wx.getStorageSync("ROOM_SOURCE_DATE").checkOutDate,

      o = wx.getStorageSync("day"),
      i = app.util.time();
    if (wx.setStorageSync("datein", n), "" == e) {
      var n = app.util.time();
      wx.setStorageSync("datein", n);
    } else if (e < i) n = i;
    else n = e;
    if ("" == a) var r = app.util.addDate(i, 1);
    else {
      var s = app.util.addDate(i, 1);
      if (a < s) r = s;
      else r = a;
    }
    o = app.util.day(r, n);
    wx.setStorageSync("day1", n),
      wx.setStorageSync("day2", r),
      wx.setStorageSync("day", o),
      wx.setStorageSync("time", o),
      this.setData({
        datein: n,
        dateout: r,
        time: o,
        current_date: n
      });
  },

  previewImages: function (t) {
    var a = this.data.url,
      o = [],
      e = t.currentTarget.dataset.index;
    var n = this.data.hotel.img;
    for (var r in n) o.push(a + n[r]);
    wx.previewImage({
      current: a + n[e],
      urls: o
    });
  },



  refresh: function (t) {
    var i = this,
      e = i.data.hotel_id,
      n = i.data.day1;
    app.util.request({
      url: "entry/wxapp/PjDetails",
      cachetime: "0",
      data: {
        user_id: wx.getStorageSync("userInfo").id,
        seller_id: e
      },
      success: function (t) {
        t.data.img = t.data.img.split(","),
          i.setData({
            hotel: t.data
          });
      }
    });
    let getDate = wx.getStorageSync("ROOM_SOURCE_DATE");
    var n = getDate.checkInDate;
    var r = getDate.checkOutDate;
    app.util.request({
      url: "entry/wxapp/RoomList",
      cachetime: "0",
      data: {
        seller_id: e
      },
      success: function (t) {
        var a = t.data,
          e = function (e) {
            app.util.request({
              url: "entry/wxapp/GetRoomCost",
              data: {
                room_id: a[e].id,
                start: n,
                end: r
              },
              success: function (t) {
                console.log(t, "fgggggggggggggg")

                a[e].cost = t.data[0].mprice
                i.setData({
                  room: a
                });
              }
            }),
              app.util.request({
                url: "entry/wxapp/GetRoomNum",
                data: {
                  room_id: a[e].id,
                  start: n,
                  end: r
                },
                success: function (t) {
                  a[e].room_num = t.data[0].nums,
                    i.setData({
                      room: a
                    });
                }
              });


          };
        for (var o in a) e(o);
      }
    }),
      app.util.request({
        url: "entry/wxapp/AssessList",
        cachetime: "0",
        data: {
          seller_id: e
        },
        success: function (t) {
          for (var e in console.log("这是酒店评价"), t.data) "" != t.data[e].img && (t.data[e].img = t.data[e].img.split(",")),
            t.data[e].time = app.ormatDate(t.data[e].time).slice(0, 10), t.data[e].content = t.data[e].content.replace("↵", "\n");
          i.setData({
            assess_list: t.data.slice(0, 5)
          });
        }
      });
  },

  tabClick: function (t) {
    this.setData({
      activeIndex: t.currentTarget.id
    });
  },

  bindDateChange1: function (t) {
    var e = this,
      a = t.detail.value,
      o = (e.data.dateout, e.data.current_date, app.util.addDate(a, 1));
    wx.setStorageSync("day1", a), wx.setStorageSync("day2", o), wx.setStorageSync("day", i);
    var i = app.getTime2Time(o, a);
    e.setData({
      datein: t.detail.value,
      dateout: o,
      time: i
    }),
      this.refresh();
  },
  bindDateChange2: function (t) {
    var e = this.data.datein,
      a = t.detail.value;
    var o = app.getTime2Time(a, e);
    wx.setStorageSync("day1", e), wx.setStorageSync("day2", a), wx.setStorageSync("day", o),
      this.setData({
        dateout: t.detail.value,
        time: o
      });
  },
  room_info: function (t) {
    this.data.hotel.id;
    var e = this.data.hotel;
    var a = e.tel,
      o = e.coordinates,
      i = e.address,
      time = this.data.time,
      n = e.name;
    wx.navigateTo({
      url: "room_info?coordinates=" + o + "&room_id=" + t.currentTarget.dataset.id + "&tel=" + a + "&address=" + i + "&name=" + n + "&price=" + t.currentTarget.dataset.price + "&time=" + time
    });
  },
  order: function (t) { },

  all_comment: function (t) {
    wx.navigateTo({
      url: "all_comment?seller_id=" + this.data.hotel_id
    });
  },

  sele_address: function (t) {
    var o = this.data.hotel,
      i = o.coordinates.split(",");
    wx.getLocation({
      type: "gcj02",
      success: function (t) {
        var e = Number(i[0]),
          a = Number(i[1]);
        wx.openLocation({
          latitude: e,
          longitude: a,
          name: o.name,
          address: o.address
        });
      }
    });
  },
  call_phone: function (t) {
    wx.makePhoneCall({
      phoneNumber: this.data.hotel.tel
    });
  },

  previewImage: function (t) {
    var e = this.data.url,
      a = [],
      o = t.currentTarget.id,
      i = t.currentTarget.dataset.index,
      n = this.data.assess_list;
    for (var r in n)
      if (o == n[r].id) var s = n[r].img;
    for (var l in s) a.push(e + s[l]);
    wx.previewImage({
      current: e + s[i],
      urls: a
    });
  },


  formSubmit: function (t) {
    var e = t.detail.formId;
    if ("" == wx.getStorageSync("userInfo").img)
      this.setData({
        user_info: !0
      }),
        app.getUserInfo(function (t) { });
    else {
      var trade_pwd = wx.getStorageSync("userInfo").trade_pwd;
      if (!trade_pwd) {
        wx.navigateTo({
          url: '../password/password',
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
      } else {
        var a = wx.getStorageSync("day1"),
          o = wx.getStorageSync("day2");
        1 == app.time_title(a, o) && (1 == t.detail.target.dataset.classify ?
          wx.navigateTo({
            url: "../place_order/place_order?room_id=" + t.detail.target.dataset.id + "&hotel_id=" + this.data.hotel_id + "&form_d=" + e
          }) :
          wx.navigateTo({
            url: "hour_room?room_id=" + t.detail.target.dataset.id + "&hotel_id=" + this.data.hotel_id + "&form_d=" + e + "&cost=" + t.detail.target.dataset.cost + "&rz_time=" + t.detail.target.dataset.rz_time
          }));

      }






    }

  },


  hotel_in: function (t) {
    wx.navigateTo({
      url: "hotel_in?seller_id=" + t.currentTarget.dataset.id
    });
  },


  bindgetuserinfo: function (t) {
    "getUserInfo:fail auth deny" == t.detail.errMsg && wx.showModal({
      title: "",
      content: "您拒绝了个人信息授权，无法正常使用小程序"
    });
  },

  onReady: function () { },
  onShow: function () {
    this.JieliStatus();
    app.getUserInfo(function (e) { })
    this.date();
    1 == this.data.user_info && app.getUserInfo(function (t) { });
    this.timedata()
    this.refresh()
  },

  timedata() {

    let getDate = wx.getStorageSync("ROOM_SOURCE_DATE");
    // getDate.checkInDate,
    //   getDate.checkOutDate
    var str = getDate.checkInDate;

    wx.setStorageSync("day1", getDate.checkInDate);

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
  },


  onHide: function () { },
  onUnload: function () { },
  onPullDownRefresh: function () { },
  onReachBottom: function () { },
  onShareAppMessage: function (options) {
    var page = this;
    var user_info = wx.getStorageSync("userInfo"),
      hotel_id = this.data.hotel_id,
      title = this.data.title;
    console.log(user_info)
    return {
      path: "/zh_jdgjb/pages/hotel_list/hotel_info?hotel_id=" + hotel_id + '&title=' + title,
      success: function (e) {
        console.log("这个是分享")
        console.log(e)
      }
    };
  },
  // 点击右上角分享
  onShareAppMessage: function () {
    var platform = wx.getStorageSync("platform")
    console.log(platform)
    var page = this;
    var user_info = wx.getStorageSync("userInfo");
    var hotelInfo_title = platform.shared_config.hotel_information.title
    // var hotelInfo_img = platform.shared_config.hotel_information.img
    return {
      title: hotelInfo_title,
      // imageUrl: "https://oss.bizhuhome.com/" + hotelInfo_img,
      path: "/zh_jdgjb/pages/index/index?user_id=" + user_info.id,
      success: function (e) {
        console.log("这个是分享")
        console.log(e)
      }
    };
  }
});