var app = getApp();
var util = require("../../utils/util.js");


Page({
  data: {
    titel: ["全部订单", "待付款", "处理中", "评价"],
    page: 1,
    order_list: []
  },

  go_eveluate: function(e) {
    var seller_id = e.currentTarget.dataset.sellerid;
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "evaluate?seller_id=" + seller_id + "&order_id=" + id
    });
  },


  payment(e) {
    var room_id = e.currentTarget.dataset.room_id;
    var hotel_id = e.currentTarget.dataset.seller_id;
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../place_order_audited/place_order_audited?id=' + id,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },


  payment_t(e) {
    var pay = e.currentTarget.dataset.pay;
    var id = e.currentTarget.dataset.id;
    var d = app.OpenId;
    app.util.request({
      url: "entry/wxapp/Pay",
      cachetime: "0",
      data: {
        openid: d,
        money: pay,
        order_id: id
      },
      success: function(o) {
        console.log(o);
        wx.requestPayment({
          timeStamp: o.data.timeStamp,
          nonceStr: o.data.nonceStr,
          package: o.data.package,
          signType: o.data.signType,
          paySign: o.data.paySign,
          success: function(o) {
            console.log("支付成功"),
              console.log(o),
              wx.redirectTo({
                url: "../order/order?activeIndex=2&index=2"
              });
            var e = wx.getStorageSync("userInfo").openid;
            console.log(n), console.log(e), console.log(t), wx.hideLoading(),
              app.util.request({
                url: "entry/wxapp/Message",
                cachetime: "0",
                data: {
                  form_id: n,
                  openid: e,
                  order_id: a
                },
                success: function(o) {
                  console.log("发送模板消息"), console.log(o);
                }
              });
          },
          fail: function(o) {
            console.log("支付失败"), wx.showToast({
              title: "支付失败"
            }), wx.redirectTo({
              url: "../order/order?activeIndex=1&index=1"
            });
          }
        });
      },
      complete: function(res) {
        wx.hideLoading();
      },
    });

  },

  cancel_order: function(e) {
    var t = e.currentTarget.dataset.id;
    var hb_id = e.currentTarget.dataset.room_id
    var page = this;
    app.util.request({
      url: "entry/wxapp/CancelOrder",
      data: {
        order_id: t,
        hb_id: hb_id
      },
      success: function(e) {
        console.log(e),
          wx.showToast({
            title: "订单已取消"
          })
        setTimeout(function() {
          wx.navigateBack({
            delta: 1
          });
        }, 2000)
      }
    })
  },

  ZhuanCancle(e) {
    var t = e.currentTarget.dataset.id;
    var id = wx.getStorageSync("userInfo").id;
    console.log(id)
    var page = this;
    app.util.request({
      url: "entry/wxapp/ZhuanCancle",
      data: {
        order_id: t,
        user_id: id
      },
      success: function(e) {
        console.log(e),
          wx.showToast({
            title: "已撤销转让"
          })
        setTimeout(function() {
          wx.navigateBack({
            delta: 1
          });
        }, 2000)
      }
    })
  },



  CancelApplyOrder(e) {
    var t = e.currentTarget.dataset.id;
    var page = this;
    app.util.request({
      url: "entry/wxapp/CancelApplyOrder",
      data: {
        order_id: t,
      },
      success: function(e) {
        console.log(e),
          wx.showToast({
            title: '撤销退款成功',
            icon: 'none',
            image: '',
            duration: 1000,
            mask: true,
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
          })
        setTimeout(function() {
          wx.navigateBack({
            delta: 1
          });
        }, 2000)
      }

    })
  },


  onLoad: function(e) {
    var date1 = "2018-9-20";
    var date2 = "2018-9-25";
    var date = util.getDays(date1, date2);
    console.log(date)
    // wx.setNavigationBarColor({
    //   frontColor: "#ffffff",
    //   backgroundColor: wx.getStorageSync("platform").color
    // }), 

    app.getUserInfo(function(e) {
      console.log(e);
    });
    var t = e.activeIndex,
      a = e.index;
    console.log(e),
      this.setData({
        activeIndex: t,
        index: a,
        url: wx.getStorageSync("url"),
        color: wx.getStorageSync("platform").color
      }),
      this.refresh();
    this.kkk();

  },


  kkk() {
    var id = wx.getStorageSync("userInfo").id
    var page = this;
    wx.showLoading({
      title: "加载中..",
      mask: true,
    });
    app.util.request({
      url: "entry/wxapp/NotAssessCount",
      data: {
        user_id: id
      },
      success: function(res) {
        console.log(res);
        page.setData(res.data)
      },
      complete: function(res) {
        wx.hideLoading();
      },
    });
  },
  refresh: function(e) {
    var o = this,
      i = o.data.page,
      n = o.data.order_list,
      s = o.data.index;
    console.log(s);
    var t = wx.getStorageSync("userInfo").id,
      a = app.today_time();
    console.log(a),
      app.util.request({
        url: "entry/wxapp/MyOrder",
        cachetime: "0",
        data: {
          user_id: t,
          page: i
        },
        success: function(e) {
          console.log(n)
          if (console.log(e.data),
            0 < e.data.length) {
            o.setData({
                page: i + 1
              }),
              n = n.concat(e.data);
            console.log("这个是" + n)
            var t = [],
              a = [],
              c = [],
              d = [];


            for (var r in n)
              n[r].arrival_time = n[r].arrival_time.slice(5, 7) + "月" + n[r].arrival_time.slice(8, 10) + "日",

              n[r].departure_time = n[r].departure_time.slice(5, 7) + "月" + n[r].departure_time.slice(8, 10) + "日",

              1 == n[r].status && t.push(n[r]),
              //待支付
              //处理中
              2 == n[r].status && d.push(n[r]),
              3 == n[r].status && d.push(n[r]),
              // 4 == n[r].status && d.push(n[r]),
              6 == n[r].status && d.push(n[r]),
              7 == n[r].status && d.push(n[r]),
              8 == n[r].status && d.push(n[r]),
              9 == n[r].status && d.push(n[r]),
              10 == n[r].status && d.push(n[r]),
              11 == n[r].status && d.push(n[r]),
              5 == n[r].status && c.push(n[r]);

            0 == s ? o.setData({
              order_list: n
            }) : 1 == s ? o.setData({
              order_list: t
            }) : 2 == s ? o.setData({
              order_list: d
            }) : 3 == s && o.setData({
              order_list: c
            })
          }
        }
      });
  },


  tabClick: function(e) {
    console.log(e),
      this.setData({
        activeIndex: e.currentTarget.dataset.index,
        index: e.currentTarget.dataset.index,
        page: 1,
        order_list: [],
      })
    this.refresh();
  },

  order_info: function(e) {
    var t = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "orderinfo?id=" + t
    });
  },
  onReady: function() {},
  onShow: function() {

    this.setData({
      // index: 0,
      // activeIndex: 0,
      page: 1,
      order_list: []
    }), this.refresh();

  },


  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {
    console.log(this.data.page), this.setData({
      // activeIndex: 0,
      page: 1,
      order_list: []
    }), this.refresh(), wx.stopPullDownRefresh();
  },
  onReachBottom: function() {
    this.refresh();
  },
  onShareAppMessage: function() {}
});