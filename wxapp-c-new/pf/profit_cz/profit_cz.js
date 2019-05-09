// zh_jdgjb/pages/red_packet/red_packet.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rmb: 1,
    jb: 2,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var page = this;
    wx.showLoading({
      title: "加载中..",
      mask: true,
    });
    app.util.request({
      url: "entry/wxapp/RmbtoJb",
      data: {},
      success: function (res) {
        console.log(res);
        page.setData(res)
      },
      complete: function (res) {
        wx.hideLoading();
      },
    });
  },



  bindinput_cz: function (e) {
    var page = this;
    this.setData({
      maney: e.detail.value
    })

    app.util.request({
      url: "entry/wxapp/RmbtoJb",
      data: {
        cz_money: e.detail.value
      },
      success: function (res) {
        console.log(res);
        page.setData(res.data)
      },
      complete: function (res) {
        wx.hideLoading();
      },
    });

  },

  pay() {
    var e = this.data.maney;
    var page = this,
      t = "",
      l = app.OpenId;
    if (null != e && 0 != e || (t = "请输入充值金额"),
      "" != t) {
      wx.showModal({
        content: t
      });
      return false;
    } else {
      var n = this.data.Czhd,
        o = [];
      for (var c in n) e >= Number(n[c].full) && o.push(Number(n[c].full));
      if (console.log(o), 0 < o.length) {
        var i = app.max(o);
        for (var r in n)
          if (i == n[r].full) var s = n[r].reduction;
      } else s = 0;
    }
    app.util.request({
      url: "entry/wxapp/YTSaveRecharge",
      data: {
        cz_money: e,
        user_id: wx.getStorageSync("userInfo").id,
        zs_money: "",
      },
      success: function (a) {
        var t = a.data;
        app.util.request({
          url: "entry/wxapp/Pay2",
          cachetime: "0",
          data: {
            openid: l,
            money: e,
            cz_id: t
          },
          success: function (a) {
            wx.requestPayment({
              timeStamp: a.data.timeStamp,
              nonceStr: a.data.nonceStr,
              package: a.data.package,
              signType: a.data.signType,
              paySign: a.data.paySign,
              success: function (a) {
                wx.showToast({
                  title: "支付成功"
                }),
                  setTimeout(function () {
                    // wx.navigateBack({
                    //   delta: 1
                    // });
                    wx.navigateTo({
                      url: '../profit_scuccess/profit_scuccess?a=' + true,
                      success: function (res) { },
                      fail: function (res) { },
                      complete: function (res) { },
                    })
                  }, 1500);
              }
            });
          }
        });
      }
    });
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

  }
})