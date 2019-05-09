// zh_jdgjb/pages/Check_out/Check_out.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },


  apply: function(e) {
    var page = this;
    var t = e.currentTarget.dataset.id,
      o = e.currentTarget.dataset.type;
    console.log(t),
      wx.showModal({
        title: "您确定要把退单吗？",
        content: "*房源紧俏，请用户您谨慎退订",
        success: function(e) {
          if (e.confirm) {
            app.util.request({
              url: "entry/wxapp/ApplyOrder",
              data: {
                order_id: t,
                desc: page.data.dd
              },
              success: function(e) {
                console.log(e),
                  wx.showToast({
                    title: "申请成功"
                  }),
                  setTimeout(function() {
                    wx.navigateBack({
                      delta: 1
                    });
                  }, 1500);
              }
            })
          } else {
            wx.navigateBack({
              delta: 1,
            })
          }
        }
      });
  },
  desc(e) {
    this.setData({
      dd: e.detail.value
    })
  },
  btnconcans() {
    wx.navigateBack({
      delta: 1
    });;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(t) {
    var o = this;
    app.util.request({
      url: "entry/wxapp/orderdetails",
      data: {
        order_id: t.id
      },
      success: function(e) {
        console.log(e);
        var t = e.data;
        t.arrival_time = t.arrival_time.slice(5, 7) + "月" + t.arrival_time.slice(8, 10) + "日",
          t.departure_time = t.departure_time.slice(5, 7) + "月" + t.departure_time.slice(8, 10) + "日",
          o.setData({
            order_info: t,
            pr: t.total_cost * 0.1
          });

      }
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