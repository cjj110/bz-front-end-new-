// zh_jdgjb/pages/head_portrait/head_portrait.js
var siteinfo = require("../../../siteinfo.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  choice: function () {
    var that = this,
      o = siteinfo.siteroot,
      i = siteinfo.uniacid;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        that.setData({
          image_photo: tempFilePaths,
        })
        console.log(tempFilePaths)
        wx.uploadFile({
          url: o + "?i=" + i + "&c=entry&a=wxapp&do=upload&m=zh_jdgjb",
          filePath: tempFilePaths[0],
          name: "upfile",
          formData: {},
          success: function (t) {
            console.log(t)
            if (t.statusCode == 200) {
              wx.showToast({
                title: '上传成功',
              });

              that.SaveImg(t.data)

            } else {
              wx.showModal({
                title: '提示',
                content: '上传失败',
                showCancel: false,
              })
            }
          },
          fail: function (t) {
            console.log("这是上传失败"), console.log(t);
          }
        });

      }
    })
  },


  SaveImg(imgurl) {
    var id = wx.getStorageSync("userInfo").id
    var page = this;
    wx.showLoading({
      title: "加载中..",
      mask: true,
    });
    app.util.request({
      url: "entry/wxapp/SaveImg",
      data: {
        user_id: id,
        imgurl: imgurl
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





  choice_camera: function () {
    var that = this,
      o = siteinfo.siteroot,
      i = siteinfo.uniacid;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        that.setData({
          image_photo: tempFilePaths,
        })
        console.log(tempFilePaths)
        wx.uploadFile({
          url: o + "?i=" + i + "&c=entry&a=wxapp&do=upload&m=zh_jdgjb",
          filePath: tempFilePaths[0],
          name: "upfile",
          formData: {},
          success: function (t) {
            console.log(t)
            if (t.statusCode == 200) {
              wx.showToast({
                title: '保存成功',
                duration: 2200,
              });
              that.SaveImg(t.data)

            } else {
              wx.showModal({
                title: '提示',
                content: res.data.msg,
                showCancel: false,
              })
            }
          },
          fail: function (t) {
            console.log("这是上传失败"), console.log(t);
          }
        });
      }
    })
  },

  choose_logo: function (t) {
    var e = this,
      o = siteinfo.siteroot,
      i = siteinfo.uniacid;
    wx.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
      success: function (t) {
        console.log(t);
        var a = t.tempFilePaths[0];
        wx.uploadFile({
          url: o + "?i=" + i + "&c=entry&a=wxapp&do=upload&m=zh_jdgjb",
          filePath: a,
          name: "upfile",
          formData: {},
          success: function (t) {
            console.log("这是上传成功"), console.log(t);
            var a = e.data.room;
            a.logo = t.data, e.setData({
              room: a
            });
          },
          fail: function (t) {
            console.log("这是上传失败"), console.log(t);
          }
        });


      }
    });
  },


  //提交表单
  submit: function (val) {
    var that = this;
    wx.showLoading({
      title: "正在提交..",
      mask: true,
    });

    wx.request({
      url: app.api.hostUrl + '/Api/User/save_info',
      method: "post",
      data: {
        access_token: wx.getStorageSync('access_token'),
        nickname: val.nickname,
        user_phone: val.user_phone,
        company: val.company,
        avatar_url: that.data.headUrl,
        province: that.data.region[0],
        city: that.data.region[1],
        area: that.data.region[2],
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        if (res.data.code == 0) {
          wx.showToast({
            title: '保存成功',
            duration: 2200,
          });
        } else {
          wx.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel: false,
          })
        }
      },
      complete: function (res) {
        wx.hideLoading();
      },
    });
  },



  canves(e) {
    wx.navigateBack({
      delta: 1,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      image_photo: options.img
    })

    var page = this;
    wx.showLoading({
      title: "加载中..",
      mask: true,
    });
    app.util.request({
      url: "entry/wxapp/SaveImg",
      success: function (res) {
        console.log(res);
        page.setData(res.data)
      },
      complete: function (res) {
        wx.hideLoading();
      },
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { },

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