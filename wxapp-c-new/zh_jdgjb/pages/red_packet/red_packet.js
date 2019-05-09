// zh_jdgjb/pages/red_packet/red_packet.js

var app = getApp(),
  util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: ["数字钱包地址", "私钥", "助记词",],
    activeIndex: 0,
    isFocus: true, //控制input 聚焦
    wallets_password_flag: true //密码输入遮罩,
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
      success: function (res) {
        wx.hideLoading();
        if (res.data == 1) {
          wx.showToast({
            title: '密码正确',
            duration: 1500,
            mask: true,
            success: function (res) {
              setTimeout(function () {
                page.setData({
                  wallets_password_flag: false
                })
              }, 2000)
            },
            fail: function (res) { },
            complete: function (res) { },
          })
        } else {
          wx.showToast({
            title: '密码错误',
            duration: 1500,
            image: '../img/images/icon-warning.png',
            mask: true,
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })

        }
      },
      complete: function (res) { },
    });
  },

  binding: function (e) {
    var id = wx.getStorageSync("userInfo").id
    var page = this;
    wx.showLoading({
      title: "加载中..",
      mask: true,
    });
    app.util.request({
      url: "entry/wxapp/SaveWallet",
      data: {
        user_id: id,
        walletAddr: page.data.walletAddr
      },
      success: function (res) {
        console.log(res);
        wx.hideLoading();
        if (res.data.code == 1) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1000,
            mask: true,
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1000,
            mask: true,
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })
        }

      },
      complete: function (res) {

      },
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

  tabClick: function (e) {
    console.log(e),
      this.setData({
        activeIndex: e.currentTarget.dataset.index,
        index: e.currentTarget.dataset.index,
        page: 1,
        order_list: [],
      }),
      this.refresh();
  },

  maney() {
    var id = wx.getStorageSync("userInfo").id
    var page = this;
    wx.showLoading({
      title: "加载中..",
      mask: true,
    });
    app.util.request({
      url: "entry/wxapp/AddWallet",
      data: {
        user_id: id
      },
      success: function (res) {
        console.log(res);
        wx.hideLoading();
        if (res.data.code == 1) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            mask: true,
            duration: 1000,
          })
          wx.setStorageSync("walletAddr", res.data.data.walletAddr)
          page.setData({
            walletAddr: res.data.data.walletAddr,
            walletMnemonic: res.data.data.walletMnemonic,
            walletPrivateKey: res.data.data.walletPrivateKey,
          })
        } else {
          wx.showToast({
            title: "获取失败",
            icon: 'none',
            mask: true,
          })
        }
      },
      complete: function (res) {

      },
    });
  },

  copyTBL: function (e) {
    var self = this;
    var text = e.currentTarget.dataset.text;
    console.log(e)
    if (text == null || !text) {
      wx.showModal({
        title: '提示',
        content: '数字资产钱包地址为空',
        showCancel: false,
        confirmText: '确定',
        confirmColor: '#ec6464',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
      return false;
    }
    wx.setClipboardData({
      data: text,
      success: function (res) {
        wx.showToast({
          title: "复制成功",
          icon: 'none',
          mask: true,
        })
      }
    });
  },


  copyTBLs: function (e) {
    var self = this;
    var text = e.currentTarget.dataset.text;
    console.log(e)
    if (text == null || !text) {
      wx.showModal({
        title: '提示',
        content: '私钥为空',
        showCancel: false,
        confirmText: '确定',
        confirmColor: '#ec6464',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
      return false;
    }
    wx.setClipboardData({
      data: text,
      success: function (res) {
        wx.showToast({
          title: "复制成功",
          icon: 'none',
          mask: true,

        })
      }
    });
  },

  copy2: function (e) {
    var self = this;
    var text = e.currentTarget.dataset.text;
    console.log(e)
    if (text == null || !text) {
      wx.showModal({
        title: '提示',
        content: '私钥为空',
        showCancel: false,
        confirmText: '确定',
        confirmColor: '#ec6464',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
      return false;
    }
    wx.setClipboardData({
      data: text,
      success: function (res) {
        wx.showToast({
          title: "复制成功",
          icon: 'none',
          mask: true,

        })
      }
    });
  },


  refresh: function (e) {
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
        success: function (e) { }
      });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var id = wx.getStorageSync("userInfo").id
    var page = this;
    wx.showLoading({
      title: "加载中..",
      mask: true,
    });
    app.util.request({
      url: "entry/wxapp/GetWallet",
      data: {
        user_id: id,
      },
      success: function (res) {
        wx.hideLoading();
        console.log(res);
        page.setData({
          walletAddr: res.data.wallet_addr
        })
      },
      complete: function (res) { },
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