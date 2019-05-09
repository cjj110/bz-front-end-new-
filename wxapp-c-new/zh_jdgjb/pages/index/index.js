var app = getApp(),
  util = require("../../utils/util.js"),
  _location = "";

var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
var Moment = require("../../utils/moment.js");
var DATE_LIST = [];
var DATE_YEAR = new Date().getFullYear()
var DATE_MONTH = new Date().getMonth() + 1
var DATE_DAY = new Date().getDate()

Page({
  data: {
    bomb: !1,
    showLoading: !0,
    week: "星期一",
    weeks: "",
    box1: 0,
    checkInDate: "",
    checkOutDate: "",
    jieli: true,
    address: "定位中...",
    addcity: "",
    model: true,
    position:"", 
    advertising:"",
    hotel4:"",
    hotel5:"",
  },
  
  // 授权获取手机号
  getPhoneNumber: function(e) {
    console.log(e);
    var that = this;
    
    if (e.detail.errMsg == 'getPhoneNumber:ok') {
      that.getuserphone({
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv,
      });
    } else {
      wx.showToast({
        title: '您已拒绝授权！',
        duration: 2000,
      });
    }
  },
  //后台解密获取手机号
  getuserphone: function(data) {
    wx.showLoading({
      title: '正在授权...',
    });
    var page = this;
    var user_id = wx.getStorageSync('user_id');
    app.util.request({
      url: "entry/wxapp/Jiemi",
      data: {
        sessionKey: wx.getStorageSync("session_key"),
        data: data.encryptedData,
        iv: data.iv,
      },
      success: function(res) {
        console.log(res)
        var phoneNumber = res.data.phoneNumber;
        page.ZcMobile(phoneNumber);
        if (phoneNumber) {
          wx.showToast({
            title: '授权成功',
            icon: 'none',
            mask: true,
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            mask: true,
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
          })
        }
      },
      complete: function(res) {},
    });
  },

  ZcMobile(phoneNumber) {
    let c = this;
    console.log('scene', c.data.scene)
    app.util.request({
      url: "entry/wxapp/BindMobile",
      method: "post",
      data: {
        user_id: "",
        tel: phoneNumber,
        code: "",
        code_id: "",
        openid: wx.getStorageSync("openid"),
        scene: c.data.scene,
      },
      success: function(a) {
        console.log(a)
        var classmaney;
        console.log('classmaney')
        if (a.data.code == 1) {
          wx.setStorageSync("type_chenk", true)
          wx.setStorageSync("user_g", a.data.data.id)
          c.setData({
            model: false
          })
        } else {
          t.setData({
            msg: a.data.msg,
            mg_title: '登陆失败',
          })
        }
      },
    })
  },
  // 首页右下角图片
  jieliimg() {
    let p = this,
      ad;
    app.util.request({
      url: "entry/wxapp/jieliImg",
      success: function(t) {
        console.log(t)
        let data = t.data.data;
        p.setData({
          rightdata: data,
        })
      }
    })
  },
  // 接力部分
  fripe() {
    wx.navigateTo({
      url: '/zh_jdgjb/pages/invite_friends/invite_friends',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  chas() {
    this.setData({
      jiestatus: 2
    })
  },

  ad() {
    let p = this,
      ad;
    app.util.request({
      url: "entry/wxapp/GetAd",
      data: {
        type: 1
      },
      success: function(t) {
        console.log(t)
        if (t.data.length > 0) {
          ad = t.data[0].logo;
        } else {
          ad = 0
        }
        p.setData({
          ad: ad,
        })
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
      success: function(t) {
        console.log(t)
        if (t.data.code == 1) {
          wx.navigateTo({
            url: '/zh_jdgjb/pages/invite_friends/invite_friends',
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
          })
        } else {
          wx.showToast({
            title: t.data.msg || t.data.err,
            image: '../img/images/icon-warning.png',
            mask: true,
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
          })
        }
      }
    })
  },

  JieliStatus(e) {
    var p = this;
    var id = wx.getStorageSync("userInfo").id;
    app.util.request({
      url: "entry/wxapp/JieliStatus",
      data: {
        user_id: id
      },
      success: function(t) {
        console.log(t)
        p.setData({
          jiestatus: t.data.status
        });
      }
    })
  },

  gos() {
    var p = this;
    var id = wx.getStorageSync("userInfo").id;
    app.util.request({
      url: "entry/wxapp/AddJieli",
      data: {
        user_id: id
      },
      success: function(t) {
        //console.log(t)
        p.fripe()
      }
    })
  },

  search_input(t) {
    var page = this,
      e = t.detail.value;
    e = e.replace(/\s+/g, "");
    this.setData({
      keywords: e
    })
  },

  indexbox1: function(e) {
    var that = this;
    that.setData({
      box1: true,
      box2: false,
    });
  },

  indexbox2: function(e) {
    var that = this;
    that.setData({
      box1: false,
      box2: true,
    });
  },
 

  // 看他人转让
  poss: function() {
    if(this.data.addcity){
      var city = this.data.position;
      wx.navigateTo({
        url: '../poss/poss?city=' + city,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    }
  },
 
  onLoad: function(o) {
    // console.log(o)
    
    // wx.setStorageSync("share_key", o.user_id)
    var scene;
    var share_key = wx.getStorageSync("share_key");
    let page = this;
    let arr = [];
    if (o.scene) {
      console.log(o)
      // console.log('这个是二维码')
      var str = o.scene;
      if (str.indexOf("sellerid") != -1) {
        scene = decodeURIComponent(o.scene);
      } else {
        scene = decodeURIComponent(o.scene);
      }
    } else if (share_key) {
      // console.log(share_key)
      // console.log('这个是分享按钮')
      scene = share_key;
    }
    if (scene){
      page.setData({
        scene: scene,
      });
    }
    var n = this,
      model;
    n.ad();
    n.map();
    n.deta();
    n.jieliimg();
    app.getUserInfo(function(e) {
        n.setData({
          userInfo: e,
        });
        var t = decodeURIComponent(o.scene);
        if (null != t) var a = t;
        if (null != o.upper_partner) a = o.upper_partner;
        app.util.request({
          url: "entry/wxapp/MySx",
          data: {
            user_id: e.id
          },
          success: function(t) {
            0 == t.data && "undefined" != a && app.util.request({
              url: "entry/wxapp/Binding",
              cachetime: "0",
              data: {
                fx_user: e.id,
                user_id: a
              },
              success: function(t) {}
            });
          }
        });
      }),
      wx.getStorageSync("user_g") ? model = false : model = true
    n.setData({
        model: model,
        rande: app.globalData.rande,
        start: app.util.time(),
        end: app.util.addDate(app.util.time(), 28),
        url: wx.getStorageSync("url"),
      }),
      n.refresh();


    //获取所有轮播图和广告
    app.util.requestnew({
      urlnew:"api/Advert/getAdv",
      data:{},
      success:(e)=>{
        this.setData({
          advertising: e.data.responseData,  //广告所有内容
        })
        console.log(this.data.advertising)
      }
    })
    console.log(this.data.advertising)
  },

  // 首页轮播 专属入口
  InHotel:function(e){
    var that=this
    var link = e.currentTarget.dataset.link
    console.log(link)
  },
  //第二屏酒店信息
  // secondHotel:function(e){
    
  // },
  onPageScroll: function (e) { // 获取滚动条当前位置
    // console.log(e.scrollTop)
    if (e.scrollTop = 68 && this.data.hotel4 =='' && this.data.hotel5 == "") {
      //hotel4 热门房源      hotel5猜你喜欢  根据typeid取名
      // 获取第二屏酒店信息
      var that = this
      var adv = that.data.advertising
      var city = that.data.addcity
      console.log(adv)
      for (var item in adv) {
        if (adv[item].type_id == 4 && adv[item].seller_ids) {
          var seller = adv[item].seller_ids
          console.log(city, seller)
          app.util.requestnew({
            urlnew: "api/Hotel/getHotelMinority",
            data: {
              city: city,
              seller_ids: seller,
            },
            success: function (e) {
              that.setData({
                hotel4: e
              })
              console.log(e, "6666666666")
            }
          })
        }
        if (adv[item].type_id == 5 && adv[item].seller_ids) {
          var city = that.data.addcity
          var seller = adv[item].seller_ids
          console.log(city, seller)
          console.log("55555")
          app.util.requestnew({
            urlnew: "api/Hotel/getHotelMinority",
            data: {
              city: city,
              seller_ids: seller
            },
            success: function (e) {
              that.setData({
                hotel5: e
              })
              console.log(e, "6666666666")
              console.log(that.data.hotel4)
              console.log(that.data.hotel5)
            }
          })
        }
      }
    }
  },

  //点击酒店跳转
  goHotel:function(e){
    wx.navigateTo({
      url: "/zh_jdgjb/pages/hotel_list/hotel_info?hotel_id=" + e.currentTarget.dataset.hid + '&title=' + e.currentTarget.dataset.title
    });
    console.log(e.currentTarget.dataset.title)
    console.log(e.currentTarget.dataset.hid)
  },
  //点击酒店跳转
  goAdv:function(e){
    var imgUrl = e.currentTarget.dataset.link
    console.log(imgUrl)
    wx.navigateTo({
      url: imgUrl,
    })
  },

  GetSellerName(sellerid) {
    var a = this;
    app.util.request({
      url: "entry/wxapp/GetSellerName",
      method: "post",
      dataType: "json",
      data: {
        sellerid: sellerid
      },
      success: function(t) {
        a.setData({
          text888: t.data.data
        });
      }
    });
  },




  deta() {
    //设缓存缓存起来的日期
    wx.setStorage({
      key: 'ROOM_SOURCE_DATE',
      data: {
        checkInDate: Moment(new Date()).format('YYYY-MM-DD'),
        checkOutDate: Moment(new Date()).add(1, 'day').format('YYYY-MM-DD')
      }
    });
  },

  myaddress(e) {
    // 清空城市
    var that = this;
    wx.removeStorage({
      key: "hot_city"
    });
    // this.map(1);
    console.log('00');
    wx.getSetting({
      success: (res) => {
        // console.log(res);
        //  console.log(res.authSetting['scope.userLocation']);
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {

          wx.showModal({
            title: '授权提示',
            content: '抱歉,由于您尚未授权定位信息，精准定位功能在您授权后才能正常使用',
            confirmText: '授权',
            success: function(res) {
              if (res.cancel) {
                console.info("1授权失败返回数据");
              } else if (res.confirm) {
                wx.openSetting({
                  success: function(data) {
                    console.log(data);
                    if (data.authSetting["scope.userLocation"] == true) {
                      // wx.showToast({
                      //   title: '授权成功',
                      //   icon: 'success',
                      //   duration: 5000
                      // })
                      //再次授权，调用getLocationt的API
                      that.map(1);
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'success',
                        duration: 5000
                      })
                    }
                  }
                })
              }
            }
          })
        } else {
          that.map(1);
        }
      }
    })
  },

  map: function(d) {
    const page = this;
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'MMEBZ-JH7WV-677PN-UVZ7T-TAV65-VVFMM'
    });
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        // 调用接口
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude
          },
          success: function(res) {
            page.setData({
              position: res.result.address_component.city,
            })
            if (d == 1) {
              page.setData({
                address: res.result.address,
                addcity: res.result.address_component.city,
                lat1: res.result.location.lat,
                lng1: res.result.location.lng,
              })
              console.log(page.data.position)
              console.log(addcity)
            } else {
              wx.removeStorage({
                key: 'lat1'
              })
              wx.removeStorage({
                key: 'lng1'
              })
              page.setData({
                address: res.result.address_component.city,
                addcity: res.result.address_component.city,
                myaddress: res.result.address
              })
            }
          },
          fail: function(res) {

          },
          complete: function(res) {

          }
        });
      },
      fail: function(res) {
        page.setData({
          address: "深圳市",
          addcity: "深圳市",
        })
      },
    })
  },
  // 选择城市
  adddress(e) {
    const page = this;
    const address = page.data.position;
    if (page.data.position){
      wx.navigateTo({
        url: '../city/city?address=' + address,
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
  },

  checkInDate() {
    wx.navigateTo({
      url: '../calendar/index?chenk=' + 'index',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  date: function(t) {
    var e = wx.getStorageSync("day1"),
      a = wx.getStorageSync("day2"),
      o = wx.getStorageSync("day"),
      n = app.util.time();
    if ("" == e) {
      var i = app.util.time();
      wx.setStorageSync("datein", i);
    } else if (e < n) i = n;
    else i = e;
    if ("" == a) var l = app.util.addDate(n, 1);
    else {
      var s = app.util.addDate(n, 1);
      if (a < s) l = s;
      else l = a;
    }
    o = app.util.day(l, i);
    wx.setStorageSync("day1", i),
      wx.setStorageSync("day2", l),
      wx.setStorageSync("day", o),
      this.setData({
        datein: i,
        dateout: l,
        time: o,
        current_date: i
      });
    },

  refresh: function(t) {
    var a = this;
    app.util.request({
        url: "entry/wxapp/attachurl",
        cachetime: "0",
        success: function(t) {
          wx.setStorageSync("url", t.data),
            a.setData({
              url: t.data
            });
        }
      }),
      app.util.request({
        url: "entry/wxapp/GetNav",
        cachetime: "0",
        success: function(t) {
          if (5 <= t.data.length) var e = t.data.splice(t.data.length - 5, 5);
          else e = t.data;
          a.setData({
            nav: e
          });
        }
      }),
      app.util.request({
        url: "entry/wxapp/GetSystem",
        cachetime: "0",
        success: function(t) {
          console.log(t)
          wx.setStorageSync("platform", t.data),
            a.setData({
              platform: t.data,
              color: t.data.color
            });
        }
      }),
      app.util.request({
        url: "entry/wxapp/getad",
        cachetime: "0",
        data: {
          type: 1
        },
        success: function(t) {
          a.data.rande;
          0 < t.data.length && a.setData({
            getad: t.data,
            bomb: !0
          });
        }
      }), a.date();
  },

  guanbi: function(t) {
    this.setData({
      bomb: !1
    }), app.globalData.rande = 0;
  },

  search: function(t) {
    wx.navigateTo({
      url: "search",
      success: function(t) {},
      fail: function(t) {},
      complete: function(t) {}
    });
  },

  skip: function(t) {
    var e = t.currentTarget.dataset.src,
      a = t.currentTarget.dataset.appid,
      o = t.currentTarget.dataset.wb_src;
    if ("" != e) {
      var n = e.replace(/[^0-9]/gi, "");
      e = e.replace(/(\d+|\s+)/g, "");
      wx.navigateTo({
        url: String(e) + String(n)
      });
    } else "" != a ? wx.navigateToMiniProgram({
      appId: a,
      success: function(t) {}
    }) : "" != o && wx.navigateTo({
      url: "link?link=" + o
    });
  },


  copyright: function(t) {
    var e = this.data.platform.tz_appid;
    wx.navigateToMiniProgram({
      appId: e,
      success: function(t) {}
    });
  },


  profit: function(e) {
    wx.reLaunch({
      url: "../../../pf/profit/profit"
    });
  },

  wode: function(t) {
    wx.reLaunch({
      url: "../logs/logs"
    });
  },

  // 查找酒店
  content: function(t) {
    if(this.data.addcity){
      var e = this.data.platform;
      var city = this.data.address;
      var keywords = this.data.keywords;
      var lat1 = this.data.lat1,
        lng1 = this.data.lng1,
        addcity = this.data.addcity;
      // console.log(this.data.hotcity)
      if (this.data.hotcity) {
        var lat1 = undefined,
          lng1 = undefined;
      }
      wx.navigateTo({
        url: "../hotel_list/hotel_list?nearby=0" + '&city=' + city + '&keywords=' + keywords + '&lat1=' + lat1 + '&lng1=' + lng1 + '&addcity=' + city
      });
    }
  },
  location: function(t) {
    wx.showLoading({
      title: "搜索附近酒店"
    }), wx.getLocation({
      type: "wgs84",
      success: function(t) {
        var e = t.latitude,
          a = t.longitude;
        _location = e + "," + a,
          wx.setStorageSync("latitude", t.latitude), wx.setStorageSync("longitude", t.longitude),
          wx.navigateTo({
            url: "../hotel_list/hotel_list?nearby=1"
          });
      },
      fail: function(t) {
        wx.hideLoading(),
          _location = 1,
          //  wx.showModal({
          //   title: "授权提示",
          //   content: "您取消了本次授权，小程序将无法正常使用，请点击确定或者在我的-授权管理中进行授权，再次重新进入小程序即可",
          //   showCancel: !0,
          //   cancelText: "取消",
          //   cancelColor: "#333",
          //   confirmText: "确定",
          //   confirmColor: "#333",
          //   success: function (t) { },
          //   fail: function (t) { },
          //   complete: function (t) { }
          // });

          wx.showModal({
            title: '授权提示',
            content: '您取消了本次授权，小程序将无法正常使用，请点击确定或者在我的-授权管理中进行授权，再次重新进入小程序即可',
            success: function(res) {
              if (res.cancel) {
                // console.info("1授权失败返回数据");
              } else if (res.confirm) {
                // console.log('111')
                //village_LBS(that);
                wx.openSetting({
                  success: function(data) {
                    // console.log(data);
                    if (data.authSetting["scope.userLocation"] == true) {
                      that.map();
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'success',
                        duration: 5000
                      })
                    }
                  }
                })
              }
            }
          })
      }
    });
  },

  getUserInfo: function(t) {
    app.globalData.userInfo = t.detail.userInfo, this.setData({
      userInfo: t.detail.userInfo,
      hasUserInfo: !0
    });
  },

  onShow: function() {
    this.setData({
      hotel4:"",
      hotel5:"",
    })
    this.onPageScroll


    wx.removeStorage({
      key: 'key_ty',
    })
    this.JieliStatus();
    //  console.log(wx.getStorageSync("hot_city"))
    let model;
    wx.getStorageSync("user_g") ? model = false : model = true
    this.setData({
      hotcity: wx.getStorageSync("hot_city"),
      model: model,
    })
    this.date();
    let getDate = wx.getStorageSync("ROOM_SOURCE_DATE");
    var weekDay = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    var dateStr = getDate.checkInDate;
    var myDate = new Date(Date.parse(dateStr.replace(/-/g, "/")));
    var weeks = weekDay[myDate.getDay()]
    var checkOutweek = getDate.checkOutDate
    var myDate_week = new Date(Date.parse(checkOutweek.replace(/-/g, "/")));
    var week_out = weekDay[myDate_week.getDay()]
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
      week_out: week_out,
      weeks: weeks
    });
  },

  onPullDownRefresh: function() {
    this.refresh(),
      wx.stopPullDownRefresh();
  },

  onReachBottom: function() {},
  onUnload: function() {},
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(options) {
    var page = this;
    var user_info = wx.getStorageSync("userInfo");
    var index_title = page.data.platform.shared_config.home_page.title
    var index_img = page.data.platform.shared_config.home_page.img
    console.log(page.data.platform.shared_config)
    return {
      title: index_title,
      imageUrl: "https://oss.bizhuhome.com/" + index_img,
      path: "/zh_jdgjb/pages/index/index?user_id=" + user_info.id,
      success: function(e) {
        console.log("这个是分享")
        console.log(e)
      }
    };
  },

  onReady: function() {
    var that = this;
    //console.log('10')
    wx.getSetting({
      success: (res) => {
        // console.log(res);
        //  console.log(res.authSetting['scope.userLocation']);
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) { //非初始化进入该页面,且未授权
          that.setData({
            address: "深圳市",
            addcity: "深圳市",
          })
          // wx.showModal({
          //   title: '是否授权当前位置',
          //   content: '需要获取您的地理位置，请确认授权，否则地图功能将无法使用',
          //   success: function (res) {
          //     if (res.cancel) {
          //       console.info("1授权失败返回数据");
          //     } else if (res.confirm) {
          //       console.log('111')
          //       //village_LBS(that);
          //       wx.openSetting({
          //         success: function (data) {
          //           console.log(data);
          //           if (data.authSetting["scope.userLocation"] == true) {
          //             wx.showToast({
          //               title: '授权成功',
          //               icon: 'success',
          //               duration: 5000
          //             })
          //             //再次授权，调用getLocationt的API
          //             that.map();
          //           } else {
          //             wx.showToast({
          //               title: '授权失败',
          //               icon: 'success',
          //               duration: 5000
          //             })
          //           }
          //         }
          //       })
          //     }
          //   }
          // })
        } else if (res.authSetting['scope.userLocation'] == undefined) { //初始化进入
          that.map();
        }
      }
    })

  }

});