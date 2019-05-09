const ald = require('./zh_jdgjb/utils/ald-stat.js');
var gio = require("./zh_jdgjb/utils/gio.js").default;
// version 是你的小程序的版本号, 发版时请调整
gio('init', '862ff363610d9790', 'wx500548447737415b', {
  version: '2.2.5',
  getLocation: true,
  forceLogin: true,
});
App({
  globalData: {
    userInfo: null,
    rande: 1
  },
  util: require("we7/resource/js/util.js"),
  siteInfo: require("siteinfo.js"),
  onLaunch: function () {
    this.updataApp()
  },
  updataApp: function () {
    //版本更新
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        if (res.hasUpdate) { // 请求完新版本信息的回调
          updateManager.onUpdateReady(function () {
            wx.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: function (res) {
                if (res.confirm) { // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                  updateManager.applyUpdate()
                }
              }
            })
          })
          updateManager.onUpdateFailed(function () {
            wx.showModal({ // 新的版本下载失败
              title: '已经有新版本了哟~',
              content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
            })
          })
        }
      })
    } else {
      wx.showModal({ // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
 
  
  getUserInfo: function (n) {
    var o = this;
    wx.login({
      success: function (e) {
        o.util.request({
          url: "entry/wxapp/Openid",
          cachetime: "0",
          data: {
            code: e.code
          },
          success: function (e) {
            console.log(e),
              wx.setStorageSync("session_key", e.data.session_key)
            getApp().session_key = e.data.session_key,
              getApp().OpenId = e.data.openid,
              getApp().getSK = e.data.session_key;
            gio('identify', e.data.openid, e.data.session_key)
            var t = e.data.openid;
            wx.setStorageSync("openid", t)
            wx.getSetting({
              success: function (e) {
                1 != e.authSetting["scope.userInfo"] ? (console.log("检测到用户没有授权"),
                  o.util.request({
                    url: "entry/wxapp/login",
                    cachetime: "0",
                    data: {
                      id: wx.getStorageSync("user_g"),
                      openid: t,
                      img: "",
                      name: "",
                    },
                    success: function (e) {
                      console.log("检测到用户没有授权+", e)
                      if (e.data == '' && e.data == '') {
                        wx.removeStorageSync("userInfo")
                        if (wx.getStorageSync('at_id')) {
                          return;
                        }
                      } else {
                        e.data.openid = t
                        getApp().getuniacid = e.data.uniacid,
                          getApp().user_info = e.data, wx.setStorageSync("userInfo", e.data)
                        n(e.data);
                      }
                    }
                  })) : (console.log("检测到用户已经授权"),
                    wx.getUserInfo({
                      withCredentials: !1,
                      success: function (e) {
                        o.util.request({
                          url: "entry/wxapp/login",
                          cachetime: "0",
                          data: {
                            id: wx.getStorageSync("user_g"),
                            openid: t,
                            img: e.userInfo.avatarUrl,
                            name: e.userInfo.nickName,
                            sex: e.userInfo.gender
                            //性别 0：未知、1：男、2：女
                          },
                          success: function (e) {
                            //console.log(e)
                            if (e.data == '' && e.data == '') {
                              // console.log("测试走的路径1")
                              wx.removeStorageSync("userInfo")
                              // console.log("这个是活动id" + wx.getStorageSync('it'))
                              if (wx.getStorageSync('at_id')) {
                                return false;
                              }
                            } else {
                              //console.log("测试走的路径2")
                              e.data.openid = t
                              getApp().getuniacid = e.data.uniacid,
                                getApp().user_info = e.data,
                                wx.setStorageSync("userInfo", e.data)
                              n(e.data);
                            }
                          }
                        });
                      }
                    }));

              }
            });
          }
        });
      }
    });
  },





  max: function (e) {
    e = e[0];
    for (var t = e.length, n = 1; n < t; n++) e[n] > e && (e = e[n]);
    return e;
  },


  today_time: function (e) {
    var t = new Date(),
      n = t.getMonth() + 1,
      o = t.getDate();
    return 1 <= n && n <= 9 && (n = "0" + n), 0 <= o && o <= 9 && (o = "0" + o), t.getFullYear() + "-" + n + "-" + o + " " + t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds();
  },
  hours_time: function (e, t) {
    var n = new Date(e.replace("-", "/")),
      o = 60 * (t = Number(t));
    return n.setMinutes(n.getMinutes() + o, n.getSeconds(), 0), n.getFullYear() + "-" + (n.getMonth() + 1) + "-" + n.getDate() + " " + n.getHours() + ":" + n.getMinutes() + ":" + n.getSeconds();
  },
  today: function () {
    var e = new Date(),
      t = e.getFullYear(),
      n = e.getMonth() + 1,
      o = e.getDate();
    return 1 <= n && n <= 9 && (n = "0" + n), 0 <= o && o <= 9 && (o = "0" + o), t + "-" + n + "-" + o;
  },
  ormatDate: function (e) {
    var t = new Date(1e3 * e);
    return t.getFullYear() + "-" + n(t.getMonth() + 1, 2) + "-" + n(t.getDate(), 2) + " " + n(t.getHours(), 2) + ":" + n(t.getMinutes(), 2) + ":" + n(t.getSeconds(), 2);

    function n(e, t) {
      for (var n = "" + e, o = n.length, a = "", r = t; r-- > o;) a += "0";
      return a + n;
    }
  },
  sort_price_Reverse: function (e, t) {
    return e.zd_money - t.zd_money;
  },


  sort_price_order: function (e, t) {
    return t.zd_money - e.zd_money;
  },

  sort_num_order: function (e, t) {
    return e - t;
  },

  sort_distance_order: function (e, t) {
    return e.distance - t.distance;
  },
  sort_distance_Reverse: function (e, t) {
    return t.distance - e.distance;
  },
  time_title: function (e, t) {
    return !(t <= e) || (wx.showModal({
      title: "",
      content: "时间选择错误"
    }), !1);
  },
  getTime2Time: function (e, t) {
    e = e, t = t;
    return ((e = Date.parse(e) / 1e3) - (t = Date.parse(t) / 1e3)) / 86400;
  },
  getSys: function () {
    var t = this;
    wx.getSystemInfo({
      success: function (e) {
        t.globalData.sysInfo = e, t.globalData.windowW = e.windowWidth, t.globalData.windowH = e.windowHeight;
      }
    });
  },

  pageOnLoad: function (page) {

  },

});