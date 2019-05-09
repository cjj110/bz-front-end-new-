// zh_jdgjb/pages/red_packet/red_packet.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected: -1,
    list: [{
        pay_price: 10,
      },
      {
        pay_price: 30,
      },

      {
        pay_price: 50,
      },
      {
        pay_price: 70,
      },
      {
        pay_price: 90,
      },
    ],
    isFocus: true, //控制input 聚焦
    wallets_password_flag: true //密码输入遮罩,
  },


  bindinput_cz: function(e) {
    var cz = e.detail.value
  },

  click: function(e) {
    this.setData({
      selected: e.currentTarget.dataset.index,
      pay_price: e.currentTarget.dataset.text,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.setData({
      id: options.id
    })
  },

  tel(e) {
    console.log(e)
    var d = e.detail.value
    this.setData({
      tel: d
    })
  },

  pay() {
    var page = this;
    var id = wx.getStorageSync("userInfo").id;
    wx.showLoading({
      title: "加载中..",
      mask: true,
    });
    app.util.request({
      url: "entry/wxapp/Transfer",
      data: {
        jb: page.data.pay_price,
        tel: page.data.tel,
        user_id: id,
        is_user: page.data.id
      },
      success: function(res) {
        console.log(res);
        wx.hideLoading();
        if (res.data.code == 0) {
          wx.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel: false,
            confirmText: '确定',
            confirmColor: '#ec6464',
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
          })
        } else {
          wx.showToast({
            title: '转赠成功',
            icon: 'none',
            duration: 1500,
            mask: true,
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
          })
          setTimeout(function() {
            wx.navigateTo({
              url: '../profit_scuccess/profit_scuccess',
              success: function(res) {},
              fail: function(res) {},
              complete: function(res) {},
            })
          }, 1500)

        }

      },
      complete: function(res) {

      },
    });
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
    var id = wx.getStorageSync("userInfo").id
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
        console.log(res);
        wx.hideLoading();
        if (res.data == 1) {
          wx.showToast({
            title: '密码正确',
            duration: 1500,
            mask: true,
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
          })
          setTimeout(function() {
            page.setData({
              wallets_password_flag: false
            })
          }, 2000)
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