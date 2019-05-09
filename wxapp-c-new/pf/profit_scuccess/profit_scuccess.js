// zh_jdgjb/pages/order_success/order_success.js
var initNum = 7; //倒计时数

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(t) {

    if (t.a) {
      wx.setNavigationBarTitle({
        title: '充值成功',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    } else {
      wx.setNavigationBarTitle({
        title: '转赠成功',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    }

    this.setData({
      a: t.a
    })


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