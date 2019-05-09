// zh_jdgjb/pages/Sign_in/Sign_in.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "签到",
    currentDate: "",
    dayList: "",
    currentDayList: "",
    currentObj: "",
    currentDay: "",
    weeks: [{
      day: "日"
    }, {
      day: "一"
    }, {
      day: "二"
    }, {
      day: "三"
    }, {
      day: "四"
    }, {
      day: "五"
    }, {
      day: "六"
    }],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(t) {
    var page = this;
    var e = this.getCurrentDayString();
    this.setData({
        currentDate: e.getFullYear() + "年" + (e.getMonth() + 1) + "月",
        today: e.getFullYear() + "/" + (e.getMonth() + 1) + "/" + e.getDate(),
        yearmonth: e.getFullYear() + "/" + (e.getMonth() + 1) + "/",
        today_time: e.getFullYear() + "" + (e.getMonth() + 1) + e.getDate(),
        currentDay: e.getDate(),
        currentObj: e,
        currentYear: e.getFullYear(),
        currentMonth: e.getMonth() + 1,
        score: t.score
      }),
      this.setSchedule(e);

  },


  getCurrentDayString: function() {
    var t = this.data.currentObj;
    if ("" != t) return t;
    var e = new Date(),
      a = e.getFullYear() + "/" + (e.getMonth() + 1) + "/" + e.getDate();
    return new Date(a);
  },
  setSchedule: function(t) {
    for (
      var e = t.getMonth() + 1,
        a = t.getFullYear(),
        r = t.getDate(),
        n = (t.getDate(),
          new Date(a, e, 0).getDate()),
        i = t.getUTCDay() + 1 - (r % 7 - 1), s = i <= 0 ? 7 + i : i,
        o = [],
        u = 0, g = 0; g < 35; g++
    ) {
      g < s ? o[g] = "" : u < n ? (o[g] = u + 1, u = o[g]) : n <= u && (o[g] = "");
    }
    wx.setStorageSync("currentDayList", o);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    // this.calendarSign()
  },

  calendarSign: function(e) {
    var r = this,
      t = r.data.today_time,
      n = r.data.today,
      i = r.data.currentDay,
      e = r.data.checkDay;
    var s = r.data.currentDayList;
    var user_id = wx.getStorageSync("userInfo").id;
    console.log(n)
    app.util.request({
      url: "entry/wxapp/UserSignin",
      data: {
        today: n,
        user_id: user_id
      },
      success: function(t) {
        console.log(t.data)
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
          r.setData({
            currentDayList: s,
            score: t.data.score,
            code: t.data.code,
          })
        } else wx.showToast({
          title: t.msg,
          icon: 'none'
        });
      }
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */

  onShow: function(e) {
    let page = this;
    // app.util.request({
    //   url: "entry/wxapp/GetSignin",
    //   data: {
    //     user_id: wx.getStorageSync("userInfo").id
    //   },
    //   success: function (t) {
    //     console.log(t)
    //     page.setData({
    //       code: t.data.code
    //     })
    //   }
    // })
    app.util.request({
      url: "entry/wxapp/GetUserSignin",
      data: {
        user_id: wx.getStorageSync("userInfo").id
      },
      success: function(t) {
        console.log(t)
        var t = t.data;
        var a = wx.getStorageSync("currentDayList"),
          r = [];
        console.log(a)
        for (var n in a)
          r.push(page.data.yearmonth + a[n]);
        var i = function(t, e) {
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
        page.setData({
          currentDayList: a,
          registerTime: t
        });
      }
    });
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
  onShareAppMessage: function() {

  }
})