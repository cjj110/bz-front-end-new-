// zh_jdgjb/pages/my_wallet/my_wallet.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    q: 2,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var e = this;
    app.util.request({
      url: "entry/wxapp/TxMoney",
      cachetime: "0",
      data: {
        seller_id: wx.getStorageSync("store_info").seller_id,
      },
      success: function (t) {
        console.log("这是可提现金额"), console.log(t), e.setData({
          price: t.data.ke_tx,
          crad_account: t.data.bank.crad_account,
          crad_bank: t.data.bank.crad_bank,
          crad_name: t.data.bank.crad_name,
        });
      }
    }),
      app.util.request({
        url: "entry/wxapp/getSystem",
        cachetime: "0",
        success: function (t) {
          console.log("这是系统设置"), console.log(t), e.setData({
            system: t.data
          });
        }
      })
  },


  bindblur: function (t) {
    var e = this.data.system.tx_sxf,
      a = t.detail.value,
      o = a * (e / 100),
      n = a - o;
    n = n.toFixed(2),
      o = o.toFixed(2),

      this.setData({
        tx_cost: a,
        sxf: o,
        sj_cost: n
      });
  },


  formSubmit: function (t) {
    var e = this;
    console.log(i),
      console.log(e.data);

    var a = e.data.seller_id,

      o = Number(e.data.system.zd_money),

      n = e.data.sj_cost,

      s = (e.data.sxf,

        Number(e.data.price)),
      l = t.detail.value.name,
      i = e.data.tx_cost,
      c = t.detail.value.account_number,
      r = t.detail.value.account_number_two,
      u = (e.data.user_id, "");

    undefined == i || " " == i || i <= 0 ? u = "请输入提现金额" : s < i ? u = "不能超过可提现金额" : i < o ? u = "没有到提现门槛" : "" == l ? u = "请输入姓名" : "" == c ? u = "请输入微信账号" : "" == r ? u = "请再次输入微信账号" : c != r,

      e.setData({
        name: l,
        seller_id: a,
        tx_cost: i,
        sj_cost: n,
        username: c,
        zh: r,
      })

    "" != u ? wx.showModal({
      title: "温馨提示",
      content: u
    }) : app.util.request({
      url: "entry/wxapp/SaveTxApply",
      data: {
        name: l,
        seller_id: wx.getStorageSync("store_info").seller_id,
        tx_cost: i,
        sj_cost: n,
        username: c,
        zh: r,
      },
      success: function (t) {
        console.log(t),
          1 == t.data && (
            //   wx.showToast({
            //   title: "发起提现申请"
            // }),
            e.setData({
              q: 1
            }))
      }
    });
  },

  bit() {
    wx.showLoading({
      title: "正在提交..",
      mask: true,
    })
    setTimeout(function () {
      wx.showToast({
        title: '提交完成',
        icon: '',
        image: '',
        duration: 1000,
        mask: true,
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
      wx.hideLoading();
    }, 1500)
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