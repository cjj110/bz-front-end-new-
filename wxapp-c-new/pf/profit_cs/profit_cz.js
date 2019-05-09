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
    var page = this;
    console.log(password)
    var id = wx.getStorageSync("store_info").accountid
    wx.showLoading({
      title: "验证中..",
      mask: true,
    });
    app.util.request({
      url: "entry/wxapp/StoreTradepwd",
      data: {
        user_id: id,
        password: password
      },
      success: function(res) {
        console.log(res);
        wx.showLoading()
        if (res.data == 1) {
          wx.showToast({
            title: '密码正确',
            duration: 1000,
            mask: true,
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
          })
          page.setData({
            wallets_password_flag: false
          })
        } else {
          wx.showToast({
            title: '密码错误',
            duration: 1000,
            icon: 'none',
            mask: true,
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
          })
        }
      },
      complete: function(res) {

      },
      fail: function() {
        wx.hideLoading()
        wx.showToast({
          title: '加载失败',
          duration: 2000
        })
      }
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
  onLoad: function(options) {},
  bindinput_cz: function(e) {
    console.log(e)
    this.setData({
      maney: e.detail.value
    })
  },


  pay() {
    var page = this;
    if (page.data.maney == '' || page.data.maney == undefined || page.data.maney <= 0) {
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
    app.util.request({
      url: "entry/wxapp/SaveJbTxApply",
      data: {
        storeid: wx.getStorageSync("store_info").seller_id,
        score: page.data.maney
      },
      success: function(res) {
        console.log(res.data.msg)
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 1500,
          mask: true,
          success: function(res) {},
          fail: function(res) {},
          complete: function(res) {},
        })
        setTimeout(function() {
          wx.navigateBack({
            delta: 1,
          })
        }, 2000)
      },
      complete: function(res) {
        wx.hideLoading();
      },
    });

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
    wx.showLoading({
      title: "加载中..",
      mask: true,
    });
    app.util.request({
      url: "entry/wxapp/GetShopjb",
      data: {
        storeid: wx.getStorageSync("store_info").seller_id
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