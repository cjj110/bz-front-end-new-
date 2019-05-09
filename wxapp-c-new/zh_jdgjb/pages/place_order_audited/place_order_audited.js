var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
    return typeof o;
  } : function(o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  },
  app = getApp();
Page({

  data: {
    time: "20:00",
    num: 1,
    see_price: !1,
    red_bag: 0,
    red_bag_id: 0,
    mode1: "success",
    mode2: "clear",
    mode3: "clear",
    pay_mode: !1,
    refrer_to: "确认支付",
    type: 1,
    pay_num: 1,
    coupontext: '请选择优惠劵',
    cp: [{
        chenk: true,
        name: '20元现金抵用劵'
      },
      {
        chenk: false,
        name: '30元现金抵用劵',
      },
    ],
    cp_hidden: false,
  },

  onLoad: function(e) {
    var o = this;
    app.util.request({
      url: "entry/wxapp/orderdetails",
      data: {
        order_id: e.id
      },
      success: function(e) {
        console.log(e);
        var t = e.data;
        t.arrival_time = t.arrival_time.slice(5, 7) + "月" + t.arrival_time.slice(8, 10) + "日",
          t.departure_time = t.departure_time.slice(5, 7) + "月" + t.departure_time.slice(8, 10) + "日",
          o.setData({
            order_info: t,
            tel: t.seller.tel,
            total_cost: t.total_cost,
            order_id: t.id,
          });
      }
    })
  },

  tel(e) {
    var tel = e.currentTarget.dataset.tel;
    wx.makePhoneCall({
      phoneNumber: tel,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  pay_mode: function(o) {
    var e = this.data.pay_mode;
    var page = this;
    setTimeout(function() {
      page.setData({
        aaa: true
      })
    }, 1000)

    setTimeout(function() {
      page.setData({
        bbb: true
      })
    }, 1500)
    setTimeout(function() {
      page.setData({
        ccc: true
      })
    }, 2000)
    1 == e ? this.setData({
      pay_mode: !1
    }) : this.setData({
      pay_mode: !0
    });
  },

  formSubmit: function(o) {
    var e = this;
    var d = app.OpenId;
    app.util.request({
      url: "entry/wxapp/Pay",
      cachetime: "0",
      data: {
        openid: d,
        money: e.data.total_cost,
        order_id: e.data.order_id
      },
      success: function(o) {
        wx.requestPayment({
          timeStamp: o.data.timeStamp,
          nonceStr: o.data.nonceStr,
          package: o.data.package,
          signType: o.data.signType,
          paySign: o.data.paySign,
          success: function(o) {
            console.log("支付成功"), console.log(o), wx.redirectTo({
              url: "../order/order?activeIndex=0&index=0"
            });
            var e = wx.getStorageSync("userInfo").openid;
            console.log(n), console.log(e), console.log(t), wx.hideLoading(), app.util.request({
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
      }
    })
  },
  onReady: function() {},
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {}
});