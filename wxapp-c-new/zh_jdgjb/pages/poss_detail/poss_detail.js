// zh_jdgjb/pages/poss_detail/poss_detail.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {
    var o = this;
    console.log(e)
    o.setData({
      hotel_tel: e.tel,
      address: e.address
    });
    app.util.request({
      url: "entry/wxapp/ZhuanDetail",
      data: {
        zr_id: e.id
      },
      success: function(e) {
        console.log(e),

          o.setData({
            order_info: e.data,
            pay: e.data.newtotal_cost
          });
      }
    })

  },

  map: function(e) {
    var a = this,
      t = Number(a.data.order_info.coordinates.split(",")[0]),
      e = Number(a.data.order_info.coordinates.split(",")[1]);
    wx.openLocation({
      latitude: t,
      longitude: e,
      name: a.data.order_info.seller_name,
      address: a.data.order_info.seller_address
    });
  },

  pay_mode: function() {
    wx.navigateTo({
      url: '../poss_success/poss_success',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  pay(e) {
    var page = this;
    wx.showLoading({
      title: "加载中..",
      mask: true,
    });
    console.log(e)
    var d = app.OpenId;

    var id = e.currentTarget.dataset.id;
    var user_id = wx.getStorageSync("userInfo").id
    app.util.request({
      url: "entry/wxapp/addZhuanOrder",
      data: {
        user_id: user_id,
        order_id: id
      },
      success: function(o) {
        console.log("这是提交订单")
        console.log(o)
        if (o.data.code!= 1) {
          wx.showModal({
            title: '提示',
            content: o.data.msg,
            showCancel: true,
            cancelText: '',
            cancelColor: '',
            confirmText: '',
            confirmColor: '',
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
          })
          return false
        }

        var t = o.data,
          a = o.data;
        app.util.request({
          url: "entry/wxapp/Pay",
          cachetime: "0",
          data: {
            openid: d,
            money: page.data.pay,
            order_id: o.data.id
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
                    url: "../order/order?activeIndex=0&index=0"
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
      complete: function(res) {
        wx.hideLoading();
      },
    });




  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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