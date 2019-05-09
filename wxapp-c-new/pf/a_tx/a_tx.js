// zh_jdgjb/pages/red_packet/red_packet.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isFocus: true, //控制input 聚焦
    wallets_password_flag: false //密码输入遮罩,
  },

  mgd(e) {
    var d = e.detail.value;
    this.setData({
      md: d.replace(/\s+/g, ""),
    })
  },

  set_wallets_password(e) {
    var wallets_password = e.detail.value
    //获取钱包密码
    this.setData({
      wallets_password: wallets_password
    });
    console.log(wallets_password)
    if (this.data.wallets_password.length == 6) { //密码长度6位时，自动验证钱包支付结果
      this.wallet_pay(wallets_password)
    }
  },

  wallet_pay(password) {
    console.log(password)
    var id = wx.getStorageSync("userInfo").id
    var page = this;
    wx.showLoading({
      title: "验证中..",
      mask: true,
    });
    app.util.request({
      url: "entry/wxapp/Tradepwd",
      data: {
        user_id: id,
        password: password
      },
      success: function(res) {
        wx.hideLoading();
        if (res.data == 1) {
          wx.showToast({
            title: '密码正确',
            duration: 1000,
            mask: true,
            success: function(res) {
              setTimeout(function(e) {
                app.util.request({
                  url: "entry/wxapp/Yjtx",
                  data: {
                    user_id: wx.getStorageSync("userInfo").id,
                    tx_cost: page.data.md
                  },
                  success: function(res) {
                    console.log(res)
                    res.data == 1 ? wx.redirectTo({
                      url: '../a_scuccess/a_scuccess?id=1',
                      success: function(res) {},
                      fail: function(res) {},
                      complete: function(res) {},
                    }) : wx.redirectTo({
                      url: '../a_scuccess/a_scuccess?id=0',
                      success: function(res) {},
                      fail: function(res) {},
                      complete: function(res) {},
                    })
                  },
                  complete: function(res) {},
                });
              }, 1500)
            },
            fail: function(res) {},
            complete: function(res) {},
          })
        } else {
          wx.showToast({
            title: '密码错误',
            icon: 'none',
            duration: 1500,
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

  set_Focus() { //聚焦input
    console.log('isFocus', this.data.isFocus)
    this.setData({
      isFocus: true
    })
  },

  set_notFocus() { //失去焦点
    this.setData({
      isFocus: false
    })
  },

  close_wallets_password() { //关闭钱包输入密码遮罩
    this.setData({
      isFocus: false, //失去焦点
      wallets_password_flag: false,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let page = this;
    app.util.request({
      url: "entry/wxapp/GetYjTx",
      data: {
        user_id: wx.getStorageSync("userInfo").id,
      },
      success: function(res) {
        console.log(res)
        page.setData({
          ktx: res.data.ktx
        })
      }
    })
  },
  bindinput_cz: function(e) {
    console.log(e)
    this.setData({
      maney: e.detail.value
    })
  },


  pay() {
    var page = this;
    var md = Number(page.data.md);
    console.log(md)
    if (md == '' || md == undefined || md <= 0) {
      wx.showToast({
        title: '请输入提现金额',
        icon: 'none',
        duration: 1000,
        mask: true,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
      return;
    }
    if (md > page.data.ktx) {
      wx.showToast({
        title: '超出可提现金额',
        icon: 'none',
        duration: 1000,
        mask: true,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
      return;
    }








    this.setData({
      wallets_password_flag: true
    })
  },

  gb() {
    this.setData({
      wallets_password_flag: false
    })
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
    var page = this;
    // wx.showLoading({
    //   title: "加载中..",
    //   mask: true,
    // });
    // app.util.request({
    //   url: "entry/wxapp/GetShopjb",
    //   data: {
    //     storeid: wx.getStorageSync("store_info").seller_id
    //   },
    //   success: function (res) {
    //     console.log(res);
    //     page.setData(res.data)
    //   },
    //   complete: function (res) {
    //     wx.hideLoading();
    //   },
    // });
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