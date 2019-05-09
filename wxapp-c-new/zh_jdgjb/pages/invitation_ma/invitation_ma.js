// zh_jdgjb/pages/invitation_ma/invitation_ma.js

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
  onLoad: function (options) {
    var a = this;
    console.log("这个是onlone")
    console.log(options.user_id)
    wx.setStorageSync("share_key", options.user_id)
    app.getUserInfo(function (e) {
      console.log(e)
    })
    var id = wx.getStorageSync("userInfo").id;
    app.util.request({
      url: "entry/wxapp/GetPosterData",
      data: {
        user_id: id
      },
      success: function (t) {
        console.log(t)
        var d = JSON.parse(t.data.data.poster_txt)
        a.setData({
          userd: t.data.data,
          d: d
        });
        var user = t.data.data
        // imgurl, avaterSrc, codeSrc
        a.pathimg(user);
        a.pathimg1(user);
        a.pathimg2(user);
        a.setData({
          user: user
        })
      }
    })
  },

  pathimg(user) {
    var that = this;
    //获取网络图片本地路径
    wx.getImageInfo({
      src: user.code_img, //服务器返回的图片地址
      success: function (res) {
        console.log(res)
        //res.path是网络图片的本地地址
        let Path = res.path;
        that.setData({
          code_img: Path
        })
      },
      fail: function (res) {
        //失败回调
      }
    });
  },

  pathimg1(user) {
    var that = this;
    //获取网络图片本地路径
    wx.getImageInfo({
      src: user.bg_img, //服务器返回的图片地址
      success: function (res) {
        //res.path是网络图片的本地地址
        let Path = res.path;
        that.setData({
          bg_img: Path
        })
      },
      fail: function (res) {
        //失败回调
      }
    });
  },

  pathimg2(user) {
    var that = this;
    //获取网络图片本地路径
    wx.getImageInfo({
      src: user.head_img, //服务器返回的图片地址
      success: function (res) {
        //res.path是网络图片的本地地址
        let Path = res.path;
        that.setData({
          head_img: Path
        })
      },
      fail: function (res) {
        //失败回调
      }
    });
  },

  //点击保存到相册
  saveShareImg: function () {
    var that = this;
    that.sharePosteCanvasd();
  },

  canves() {
    wx.reLaunch({
      url: '/zh_jdgjb/pages/logs/logs',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  sharePosteCanvasd: function (user) {
    var user = this.data.user;
    var head_img = this.data.head_img;
    var code_img = this.data.code_img;
    var bg_img = this.data.bg_img;
    var cardInfo = JSON.parse(user.poster_txt)
    console.log(head_img)
    console.log(bg_img)
    console.log(code_img)
    console.log(user)
    wx.showLoading({
      title: '生成中...',
      mask: true,
    })
    var that = this;
    // var cardInfo = that.data.cardInfo; 
    //需要绘制的数据集合
    const ctx = wx.createCanvasContext('myCanvasd'); //创建画布
    var width = "";
    wx.createSelectorQuery().select('#canvas-containerd').boundingClientRect(function (rect) {
      console.log(rect)
      var height = rect.height;
      var right = rect.right;
      width = rect.width;
      that.setData({
        width: width,
        height: height
      })
      var left = rect.left;
      ctx.setFillStyle('#fff');
      // ctx.fillRect(0, 0, rect.width, height);
      ctx.drawImage('../img/001.png', 0, 0, rect.width, height);
      //背景
      if (bg_img) {
        ctx.drawImage(bg_img, 0, 0, width, width);
        ctx.setFontSize(10);
        ctx.setFillStyle('#fff');
        ctx.setTextAlign('left');
      }

      //标签
      if (user.name) {
        ctx.setFontSize(20);
        ctx.setFillStyle('#000');
        ctx.fillText(user.name, left + 110, 60);
        const metrics = ctx.measureText(user.name);
        //测量文本信息
        // ctx.stroke();
        // ctx.rect(left +5, 30, metrics.width + 20, 25);
        // ctx.setFillStyle('rgba(255,255,255,0.4)');
        // ctx.fill();
      }
      //姓名
      if (cardInfo[0]) {
        ctx.setFontSize(20);
        ctx.setFillStyle('#000');
        ctx.setTextAlign('left');
        ctx.fillText(cardInfo[0], left + 10, width + width / 10);
      }
      //职位
      if (cardInfo[1]) {
        ctx.setFontSize(20);
        ctx.setFillStyle('#000');
        ctx.setTextAlign('left');
        ctx.fillText(cardInfo[1], left + 10, width + width / 10 + 30);
      }
      //电话
      if (cardInfo[2]) {
        ctx.setFontSize(20);
        ctx.setFillStyle('#000');
        ctx.setTextAlign('left');
        ctx.fillText(cardInfo[2], left + 10, width + width / 10 + 60);
      }
      //  绘制二维码
      if (code_img) {
        ctx.drawImage(code_img, width - width / 6 - 30, width + width / 20, width / 6, width / 6)
        ctx.setFontSize(20);
        ctx.setFillStyle('#000');
      }
      //头像为正方形
      if (head_img) {
        // var contex = wx.createCanvasContext('firstCanvas')
        var avatarurl_width = 72; //绘制的头像宽度
        var avatarurl_heigth = 72; //绘制的头像高度
        var avatarurl_x = 20;
        var avatarurl_y = 20;
        ctx.save();
        ctx.beginPath();
        //开始绘制
        //先画个圆   前两个参数确定了圆心 （x,y） 坐标  第三个参数是圆的半径  四参数是绘图方向  默认是false，即顺时针
        ctx.arc(avatarurl_width / 2 + avatarurl_x, avatarurl_heigth / 2 + avatarurl_y, avatarurl_width / 2, 0, Math.PI * 2, false);

        ctx.clip(); //画好了圆 剪切  原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内 这也是我们要save上下文的原因
        ctx.drawImage(head_img, avatarurl_x, avatarurl_y, avatarurl_width, avatarurl_heigth); // 推进去图片，必须是https图片
        ctx.restore();
        //恢复之前保存的绘图上下文 恢复之前保存的绘图上下午即状态 还可以继续绘制
        ctx.draw();
      }
    }).exec()
    setTimeout(function () {
      wx.hideLoading();
      that.save();
    }, 2000)
  },

  save(e) {
    var that = this;
    wx.showLoading({
      title: '正在保存',
      mask: true,
    })
    setTimeout(function () {
      wx.canvasToTempFilePath({
        width: that.data.width,
        height: that.data.height,
        destWidth: that.data.width * 2,
        //生成图片的大小设置成canvas大小的二倍
        destHeight: that.data.height * 2,
        fileType: 'jpg',
        canvasId: 'myCanvasd',
        quality: 1,
        success: function (res) {
          wx.hideLoading();
          var tempFilePath = res.tempFilePath;
          wx.saveImageToPhotosAlbum({
            filePath: tempFilePath,
            success(res) {
              // utils.aiCardActionRecord(19);
              wx.showModal({
                content: '图片已保存到相册',
                showCancel: false,
                confirmText: '好的',
                confirmColor: '#333',
                success: function (res) {
                  if (res.confirm) { }
                },
                fail: function (res) { }
              })
            },
            fail: function (res) {
              wx.showToast({
                title: res.errMsg,
                icon: 'none',
                duration: 2000
              })
            }
          })
        }
      });
    }, 4000);
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
  onShareAppMessage: function (options) {
    var page = this;
    var user_info = wx.getStorageSync("userInfo");
    console.log(user_info)
    return {
      path: "/zh_jdgjb/pages/invitation_ma/invitation_ma?user_id=" + user_info.id,
      success: function (e) {
        console.log("这个是分享")
        console.log(e)
      }
    };
  },

})