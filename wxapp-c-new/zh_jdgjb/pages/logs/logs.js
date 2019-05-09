var util = require("../../utils/util.js"),
  app = getApp();

Page({

  data: {
    title: "个人中心",
    currentDate: "",
    dayList: "",
    currentDayList: "",
    currentObj: "",
    currentDay: "",
    member: [],
    users: !1
  },


  a_bonus(e) {
    wx.navigateTo({
      url: '/pf/a_bonus/a_bonus',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  person_information: function () {
    wx.navigateTo({
      url: '../person_information/person_information',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  my_profit(e) {
    var trade_pwd = wx.getStorageSync("userInfo").trade_pwd;
    if (!trade_pwd) {
      wx.navigateTo({
        url: '../password/password',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    } else {
      wx.navigateTo({
        url: '../../../pf/my_profit/my_profit',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
  },
  red_packet() {
    var trade_pwd = wx.getStorageSync("userInfo").trade_pwd;
    if (!trade_pwd) {
      wx.navigateTo({
        url: '../password/password',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    } else {
      wx.navigateTo({
        url: '../red_packet/red_packet',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
  },


  calendarSign: function (e) {
    var r = this,
      t = r.data.today_time,
      n = r.data.today,
      i = r.data.currentDay,
      e = r.data.checkDay;
    // r.setData({
    //   date: true
    // })
    // if (e && parseInt(t) != parseInt(e))
    //   wx.showToast({
    //     title: "日期不对哦",
    //     image: "/images/icon-warning.png"
    //   });
    // else {
    var s = r.data.currentDayList;
    var user_id = wx.getStorageSync("userInfo").id;
    n = r.data.today,
      app.util.request({
        url: "entry/wxapp/UserSignin",
        data: {
          today: r.data.today,
          user_id: user_id
        },
        success: function (t) {
          wx.navigateTo({
            url: '../Sign_in/Sign_in?score=' + t.data.score,
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })
          console.log(t.data.code)
          if (200 == t.statusCode) {
            for (var j in r.data.registerTime) {
              if (r.data.registerTime[j] == n) {
                return false;
              }
            }
            r.data.registerTime.push(n);
            var e = t.data.continuation;
            for (var a in s)
              s[a].date == i && (s[a].is_re = 1);
            wx.setStorageSync('clearcode', t.data.code)
            r.setData({
              currentDayList: s,
              score: t.data.score,
              code: t.data.code,
            })
          } else wx.showToast({
            title: t.msg,
            image: "/images/icon-warning.png"
          });
        }
      });
    // }
  },


  // modelx() {
  //   this.setData({
  //     date: false
  //   })
  //   getCurrentPages()[getCurrentPages().length - 1].onLoad()
  // },

  setSchedule: function (t) {
    for (
      var e = t.getMonth() + 1,
      a = t.getFullYear(),
      r = t.getDate(),
      n = (t.getDate(),
        new Date(a, e, 0).getDate()),
      i = t.getUTCDay() + 1 - (r % 7 - 1), s = i <= 0 ? 7 + i : i,
      o = [],
      u = 0, g = 0; g < 42; g++
    ) {
      g < s ? o[g] = "" : u < n ? (o[g] = u + 1, u = o[g]) : n <= u && (o[g] = "");
    }
    wx.setStorageSync("currentDayList", o);
  },

  onLoad: function (e) {
    var t = this;
    var e = this.getCurrentDayString();
    this.bind_user_info();
    this.setData({
      currentDate: e.getFullYear() + "年" + (e.getMonth() + 1) + "月",
      today: e.getFullYear() + "/" + (e.getMonth() + 1) + "/" + e.getDate(),
      yearmonth: e.getFullYear() + "/" + (e.getMonth() + 1) + "/",
      today_time: e.getFullYear() + "" + (e.getMonth() + 1) + e.getDate(),
      currentDay: e.getDate(),
      currentObj: e,
      currentYear: e.getFullYear(),
      currentMonth: e.getMonth() + 1
    }),

      this.setSchedule(e);

    t.setData({
      color: wx.getStorageSync("platform").color
    })
    var n = wx.getStorageSync("platform");
    t.setData({
      platform: n,
      grade: n.open_member
    });
    var o = wx.getStorageSync("url");
    t.setData({
      url: o
    });
    this.GetWallet();
  },

  GetWallet: function () {
    app.util.request({
      url: "entry/wxapp/GetWallet",
      success: function (res) { },
      complete: function (res) {
        wx.hideLoading();
      },
    });
  },
  bind_user_info: function (e) {
    console.log('bind_user_info', e)
    let n = this;
    app.getUserInfo(function (e) {
      console.log(e.name)
      if (!e.name || !e.img) {
        console.log("这是没有检测到授权"),
          n.setData({
            users: !1,
            level_name: "",
            userInfo: [],
            score: 0,
            model: true,
            hidden: "hidden",
            hg: "100%",
          });
      } else {
        if (n.setData({
          users: !0
        }),
          0 == e.level_id)
          var t = "";
        else t = e.level_name;
        n.setData({
          level_name: t,
          score: e.score,
          userInfo: e,
          model: false,
          hidden: "",
          hg: '',
        });
      }
    });
  },


  getCurrentDayString: function () {
    var t = this.data.currentObj;
    if ("" != t) return t;
    var e = new Date(),
      a = e.getFullYear() + "/" + (e.getMonth() + 1) + "/" + e.getDate();
    return new Date(a);
  },


  user: function (e) {
    var n = this;
    app.getUserInfo(function (e) {
      if (0 == e.level_id)
        var t = "初始会员";
      else t = e.level_name;
      n.setData({
        level_name: t,
        score: e.score,
        userInfo: e
      });
    });
  },


  refresh: function (e) {
    var t = this,
      n = getCurrentPages(),
      o = n[n.length - 1],
      a = n[n.length - 2];
    var s = wx.getStorageSync("userInfo").id;
    app.util.request({
      url: "entry/wxapp/CheckRz",
      data: {
        user_id: s
      },
      success: function (e) {
        t.setData({
          state: e.data
        });
      }
    }), app.util.request({
      url: "entry/wxapp/GetFxSet",
      success: function (e) {
        t.setData({
          GetFxSet: e.data
        });
      }
    });
  },

  mine_order: function (e) {
    if (1 == this.data.users) {
      var t = e.currentTarget.dataset.index,
        n = t;
      wx.navigateTo({
        url: "../order/order?activeIndex=" + n + "&index=" + t,
        success: function (e) { },
        fail: function (e) { },
        complete: function (e) { }
      });
    } else this.bind_user_info();
  },


  profit: function (e) {
    wx.reLaunch({
      url: "../../../pf/profit/profit"
    });
  },

  home: function (e) {
    wx.reLaunch({
      url: "../index/index"
    });
  },

  seller_manage: function (e) {
    1 == this.data.users ? wx.navigateTo({
      url: "../login_entry/login_entry"
    }) : this.bind_user_info();
  },

  opensetting: function (e) {
    wx.openSetting({});
  },
  integral: function (e) {
    1 == this.data.users ? wx.navigateTo({
      url: "../jifen/jifen"
    }) : this.bind_user_info();
  },
  settled_store: function (e) {
    1 == this.data.users ? wx.navigateTo({
      url: "../settled_store/settled_store"
    }) : this.bind_user_info();
  },
  service: function (e) {
    1 == this.data.users ? wx.navigateTo({
      url: "../service/service"
    }) : this.bind_user_info();
  },
  coupon: function (e) {
    1 == this.data.users ? wx.navigateTo({
      url: "../coupon/store_coupon"
    }) : this.bind_user_info();
  },
  receive_coupon: function (e) {
    1 == this.data.users ? wx.navigateTo({
      url: "../coupon/receive_coupon"
    }) : this.bind_user_info();
  },
  cancel_storange: function (e) {
    wx.clearStorage(), wx.showToast({
      title: "清除成功"
    });
  },
  copyright: function (e) {
    var t = wx.getStorageSync("platform").tz_appid;
    wx.navigateToMiniProgram({
      appId: t,
      success: function (e) { }
    });
  },
  recharge: function (e) {
    1 == this.data.users ? wx.navigateTo({
      url: "../recharge/index"
    }) : this.bind_user_info();
  },
  score_detail: function (e) {
    1 == this.data.users ? wx.navigateTo({
      url: "../jifen/scoredetails"
    }) : this.bind_user_info();
  },


  member: function (e) {
    var t = this.data.userInfo;
    "" == t.zs_name || null == t.zs_name ? wx.showModal({
      content: "您需要注册会员",
      success: function (e) {
        e.confirm && (console.log("用户点击确定"), wx.navigateTo({
          url: "../register/register"
        }));
      }
    }) : wx.navigateTo({
      url: "member"
    });
  },

  distribution: function (e) {
    var t = this;
    if (1 == t.data.users) {
      var n = t.data.GetFxSet;
      var o = t.data.userInfo,
        a = wx.getStorageSync("userInfo").id,
        s = t.data.grade;
      "" == o.zs_name && 1 == s ? wx.showModal({
        content: "您需要注册会员",
        success: function (e) {
          e.confirm && (console.log("用户点击确定"), wx.navigateTo({
            url: "../register/register"
          }));
        }
      }) : app.util.request({
        url: "entry/wxapp/MyDistribution",
        data: {
          user_id: a
        },
        success: function (e) {

          0 == e.data ? wx.navigateTo({
            url: "../distribution/examine"
          }) : 1 == e.data.state ? wx.showModal({
            title: "温馨提示",
            content: "系统正在审核中，请稍后再试"
          }) : 2 == e.data.state ? wx.navigateTo({
            url: "../distribution/distribution"
          }) : 3 == e.data.state && wx.showModal({
            title: "温馨提示",
            content: "您的申请已被拒绝"
          });
        }
      });
    } else t.bind_user_info();
  },

  bindGetUserInfo: function (e) {
    var t = this;
    app.getUserInfo(function (e) {
      t.bind_user_info();
    });
  },

  onReady: function () { },


  onShow: function (e) {
    let r = this;
    app.util.request({
      url: "entry/wxapp/GetSignin",
      data: {
        user_id: wx.getStorageSync("userInfo").id
      },
      success: function (t) {
        console.log(t)
        r.setData({
          code: t.data.code
        })
      }
    })
    this.refresh();
    this.bind_user_info();
    var o = this;
    app.util.request({
      url: "entry/wxapp/GetUserSignin",
      data: {
        user_id: wx.getStorageSync("userInfo").id
      },
      success: function (t) {
        var t = t.data;
        var a = wx.getStorageSync("currentDayList"),
          r = [];
        for (var n in a)
          r.push(o.data.yearmonth + a[n]);
        var i = function (t, e) {
          for (var a = 0, r = 0, n = new Array(); a < t.length && r < e.length;) {
            var i = new Date(t[a]).getTime(),
              s = new Date(e[r]).getTime();
            i < s ? a++ : (s < i || (n.push(e[r]), a++), r++);
          }
          return n;

        }(r, t),

          s = [];

        for (var n in a) a[n] && (a[n] = {
          date: a[n],
          is_re: 0
        });

        for (var n in i)
          for (var n in s = i[n].split("/"), a) a[n].date == s[2] && (a[n].is_re = 1);
        o.setData({
          currentDayList: a,
          registerTime: t
        });
      }
    });
  },

  onHide: function () { },
  onUnload: function () { },
  onPullDownRefresh: function () { },
  onReachBottom: function () { }
});