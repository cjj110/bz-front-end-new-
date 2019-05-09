var app = getApp();

Page({
  data: {
    code: !1,
    model: false
  },
  phone: function(o) {
    wx.makePhoneCall({
      phoneNumber: this.data.tel
    });
  },



  onLoad: function(e) {
    var o = this;
    o.setData({
        color: wx.getStorageSync("platform").color
      }),
      app.util.request({
        url: "entry/wxapp/OrderCode",
        data: {
          order_id: e.id
        },
        success: function(e) {
          console.log(e),
            o.setData({
              bath: e.data
            });
        }
      }),
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
              tel: t.seller.tel
            });
        }
      })
    // wx.setNavigationBarColor({
    //   frontColor: "#ffffff",
    //   backgroundColor: wx.getStorageSync("platform").color
    // });

  },

  pirce: function(e) {
    console.log(e)
    var pirce = e.detail.value
    this.setData({
      pirce: pirce
    })
  },



  ZhuanCancle(e) {
    var t = e.currentTarget.dataset.id;
    var id = wx.getStorageSync("userInfo").id
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

  map: function(e) {
    var text = e.currentTarget.dataset.text;
    var address = e.currentTarget.dataset.address;
    var name = e.currentTarget.dataset.name;
    var Location = text.split(",")
    console.log(Location[0])
    wx.openLocation({
      longitude: Number(Location[1]),
      latitude: Number(Location[0]),
      name: name,
      address: address,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },


  btnconfirm(e) {
    var pirce = this.data.pirce;
    if (!pirce) {
      wx.showToast({
        title: '请输入价格',
        icon: '',
        image: '../img/images/icon-warning.png',
        duration: 1000,
        mask: true,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},

      })
      return false;
    }
    this.setData({
      confirm_d: true,
      pirce: pirce,
    })
  },

  transfer: function() {
    this.setData({
      model: true,
    })
  },

  confirmb(e) {
    var pirce = this.data.pirce;
    var id = wx.getStorageSync("userInfo").id
    var order = e.currentTarget.dataset.order;
    var page = this;
    wx.showLoading({
      title: "加载中..",
      mask: true,
    });
    app.util.request({
      url: "entry/wxapp/Zhuan",
      data: {
        user_id: id,
        order_id: order,
        price: pirce,
      },
      success: function(res) {
        console.log(res);
        page.setData({
          model: false,
        })
        if (res.data.code == 0) {
          wx.showModal({
            title: '提示',
            content: res.data.msg,
          })

        } else {
          wx.redirectTo({
            url: '../transfer/transfer',
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
          })
        }
      },
      complete: function(res) {
        wx.hideLoading();
      },
    });
  },


  btnconcans(e) {
    this.setData({
      model: false
    })
  },

  confirmorder: function(e) {
    var t = app.OpenId,
      o = this.data.order_info;
    app.util.request({
      url: "entry/wxapp/Pay",
      cachetime: "0",
      data: {
        openid: t,
        money: o.total_cost,
        order_id: o.id
      },
      success: function(e) {
        wx.requestPayment({
          timeStamp: e.data.timeStamp,
          nonceStr: e.data.nonceStr,
          package: e.data.package,
          signType: e.data.signType,
          paySign: e.data.paySign,
          success: function(e) {
            console.log("支付成功"), console.log(e), wx.navigateBack({
              delta: 1
            });
          },
          fail: function(e) {
            console.log("支付失败"), wx.showToast({
              title: "支付失败"
            });
          }
        });
      }
    });
  },


  order_more: function(e) {
    wx.navigateTo({
      url: "../hotel_list/hotel_info?hotel_id=" + this.data.order_info.seller_id
    });
  },


  see_more: function(e) {
    2 == wx.getStorageSync("platform").type ? wx.navigateTo({
      url: "../hotel_list/hotel_list"
    }) : wx.navigateTo({
      url: "../index/index"
    });
  },
  cancel_order: function(e) {
    var t = e.currentTarget.dataset.id,
      o = e.currentTarget.dataset.hb_id;
    1 == e.currentTarget.dataset.classify ? (console.log(o), app.util.request({
      url: "entry/wxapp/CancelOrder",
      data: {
        order_id: t,
        hb_id: o
      },
      success: function(e) {
        console.log(e), wx.showToast({
          title: "订单已取消"
        }), setTimeout(function() {
          wx.navigateBack({
            delta: 1
          });
        }, 1500);
      }
    })) : wx.showModal({
      title: "",
      content: "钟点房不可以取消"
    });
  },

  apply: function(e) {
    var t = e.currentTarget.dataset.id,
      o = e.currentTarget.dataset.type;
    console.log(t)
    wx.navigateTo({
      url: '../Check_out/Check_out?id=' + t + '&o=' + o,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  code: function(e) {
    var t = this,
      o = t.data.code;
    1 == o ? t.setData({
      code: !1
    }) : t.setData({
      code: !0
    });
  },

  coded() {
    this.setData({
      code: true
    })
  },



  sele_address: function(e) {
    var a = this.data.order_info,
      n = a.coordinates.split(",");
    wx.getLocation({
      type: "gcj02",
      success: function(e) {
        var t = Number(n[0]),
          o = Number(n[1]);
        wx.openLocation({
          latitude: t,
          longitude: o,
          name: a.seller_name,
          address: a.seller_address
        });
      }
    });
  },



  go_eveluate: function(e) {

    wx.navigateTo({
      url: "evaluate?seller_id=" + this.data.order_info.seller_id + "&order_id=" + this.data.order_info.id
    });
  },



  onReady: function() {},
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {}
});