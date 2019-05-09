// zh_jdgjb/pages/invite_friends/invite_friends.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    model: false,
    istoo: true,
    phone: true,
    line_bg: 0,
  },

  index() {
    wx.reLaunch({
      url: '../index/index',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  // 首页右下角图片
  jieliimg() {
    let p = this,
      ad;
    app.util.request({
      url: "entry/wxapp/jieliImg",
      success: function (t) {
        console.log(t)
        let data = t.data.data;
        wx.setStorageSync("jieliImg", data)
        p.setData({
          rightdata: data,
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let str = options.scene;
    let arr = [],
      ation_id, user_id;
    if (str) {
      arr = str.split("_");
      console.log(arr);
      ation_id = arr[0];
      user_id = arr[1];
      wx.setStorageSync("codeuser_id", user_id);
    } else {
      user_id = options.user_id;
      ation_id = options.ation_id;
      wx.setStorageSync("user_id", user_id);
    }
    wx.setStorageSync("at_id", ation_id);
    app.getUserInfo(function (e) { })
    this.detail();
    this.jieliimg();
    var userInfo = wx.getStorageSync("userInfo");
    if (userInfo.tel) {
      this.setData({
        phone: false
      })
    } else {
      return false;
    }
  },

  // 详情
  detail() {
    let p = this;
    app.util.request({
      url: "entry/wxapp/JieliDetail",
      data: {
        id: wx.getStorageSync("at_id"),
        user_id: wx.getStorageSync("userInfo").id,
      },
      success: function (res) {
        console.log(res);
        if (res.data.code) {
          // 倒计时
          p.time(res.data.jieli.endtime);
          // 价格区间
          var price = res.data.qujian;
          // 已接力
          var money = Number(res.data.jieli.money);
          // 区间长度
          p.liwidth(price, money);
          // 接力id
          var at_id = res.data.jieli.id,
            popmaney = price[price.length - 1];
          wx.setStorageSync("at_id", at_id)
          p.oncode(at_id);
          p.setData({
            popmaney: popmaney,
            money: money,
            user_id: wx.getStorageSync("userInfo").id,
            user: res.data.jieli,
            qujian: res.data.qujian,
            userlist: res.data.userlist
          })
        }
      },
      complete: function (res) { },
    });
  },

  liwidth: function (price, money) {
    let query = wx.createSelectorQuery();
    let that = this;
    let a, b, c, i, p_num, x, numlength;
    query.select('.line').boundingClientRect(function (rect) {
      numlength = price.length;
      let arr = [];
      // var money = 25;
      if (Number(price[1]) >= money && money > Number(price[0])) {
        p_num = Number(price[1]);
        x = 2;
      } else if (Number(price[2]) >= money && money > Number(price[1])) {
        p_num = price[2]
        x = 3;
      } else if (Number(price[3]) >= money && money > Number(price[2])) {
        p_num = price[3]
        x = 4;
      } else if (Number(price[4]) >= money && money > Number(price[3])) {
        p_num = price[3]
      } else {
        p_num = price[0];
        x = 1
      }
      console.log(p_num);
      a = ((Number(rect.width)) / Number(numlength)) * x;
      b = money / p_num;
      c = a * b;
      that.setData({
        width: rect.width,
        li: c
      })
    }).exec();
  },

  // 优惠劵
  ry_coupon(e) {
    // this.setData({
    // })
    let p = this;
    app.util.request({
      url: "entry/wxapp/JieliReceive",
      data: {
        id: wx.getStorageSync("at_id"),
        user_id: wx.getStorageSync("userInfo").id,
      },
      success: function (res) {
        console.log(res)
        var money = res.data.money;
        if (res.data.code == 1) {
          p.setData({
            money: money,
            relay: true
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
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

  // 好友接力金额
  go(e) {
    let p = this;
    app.util.request({
      url: "entry/wxapp/HelpJieli",
      data: {
        id: wx.getStorageSync("at_id"),
        user_id: wx.getStorageSync("userInfo").id,
      },
      success: function (res) {
        console.log(res)
        var money = res.data.money,
          countmoney = res.data.countmoney;
        if (res.data.code == 1) {
          p.setData({
            money: money,
            count_money: countmoney,
            model: true,
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
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

  close(e) {
    this.setData({
      model: false,
      istoo: false
    })
    this.detail()
  },

  card_coupon() {
    wx.navigateTo({
      url: '../card_coupon/card_coupon',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  // 时间
  time: function (s) {
    var intDiff = s;
    var that = this;
    var day = 0,
      hour = 0,
      minute = 0,
      second = 0;
    var str;

    function nowTime() { //时间函数
      if (intDiff > 0) { //转换时间
        day = Math.floor(intDiff / (60 * 60 * 24));
        hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
        minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
        second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
        if (hour <= 9) hour = '0' + hour;
        if (minute <= 9) minute = '0' + minute;
        if (second <= 9) second = '0' + second;
        intDiff--;
        str = hour + ':' + minute + ':' + second
      } else {
        var str = "活动已结束！";
        clearInterval(timer);
      }
      that.setData({
        difftime: str
      })
    }
    nowTime();
    var timer = setInterval(nowTime, 1000);
  },


  // 规则
  rule_butt() {
    this.setData({
      rule: false
    })
  },
  rule(e) {
    this.setData({
      rule: true
    })
    let p = this;
    app.util.request({
      url: "entry/wxapp/JieliRule",
      success: function (res) {
        console.log(res);
        p.setData({
          nodes: res.data.rule
        })
      },
      complete: function (res) { },
    });
  },
  // 规则end


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { },

  /**
   * 生命周期函数--监听页面显示
   */


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

  // 授权获取手机号
  getPhoneNumber: function (e) {
    console.log(e);
    var that = this;
    if (e.detail.errMsg == 'getPhoneNumber:ok') {
      that.getuserphone({
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv,
      });
    } else {
      wx.showToast({
        title: '您已拒绝授权！',
        duration: 2000,
      });
    }
  },

  //后台解密获取手机号
  getuserphone: function (data) {
    wx.showLoading({
      title: '正在授权...',
    });
    var page = this;
    var user_id = wx.getStorageSync('user_id');
    app.util.request({
      url: "entry/wxapp/Jiemi",
      data: {
        sessionKey: wx.getStorageSync("session_key"),
        data: data.encryptedData,
        iv: data.iv,
      },
      success: function (res) {
        console.log(res)
        var phoneNumber = res.data.phoneNumber;
        if (phoneNumber) {
          wx.showToast({
            title: '授权成功',
            icon: 'none',
            mask: true,
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })
          page.ZcMobile(phoneNumber)
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
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

  ZcMobile(p) {
    let c = this;
    wx.getStorageSync("newuser")
    app.util.request({
      url: "entry/wxapp/ZcMobile",
      data: {
        openid: wx.getStorageSync("openid"),
        tel: p,
        scene: wx.getStorageSync("codeuser_id"),
      },
      success: function (res) {
        console.log(res)
        var userInfo = res.data.data.user;

        wx.setStorageSync("userInfo", userInfo)
        if (res.data.code == 1) {
          c.setData({
            user_id: res.data.data.user.id,
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
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

  onShow(t) {

    console.log('这个是进来的t' + t)

  },


  /**
   * 生命周期函数--监听页面加载
   */
  oncode: function (at_id) {
    var a = this;

    app.getUserInfo(function (e) {
      console.log(e)
    })

    var id = wx.getStorageSync("userInfo").id;

    app.util.request({
      url: "entry/wxapp/GetPosterData1",
      data: {
        user_id: id,
        at_id: at_id
      },
      success: function (t) {
        console.log(t)
        var d = JSON.parse(t.data.data.poster_txt)
        a.setData({
          userd: t.data.data,
          d: d
        });
        var user = t.data.data
        a.pathimg(user);
        a.pathimg1(user);
        a.pathimg2(user);
        a.setData({
          users: user
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


  saveindex() {
    wx.reLaunch({
      url: '../index/index',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  //点击保存到相册
  saveShareImg: function () {
    var that = this;
    that.sharePosteCanvasd();
  },

  canves() {
    wx.navigateBack({
      delta: 1,
    })
  },

  sharePosteCanvasd: function () {
    var page = this;
    var users = this.data.users;
    var head_img = this.data.head_img;
    var code_img = this.data.code_img;
    var bg_img = this.data.bg_img;
    var cardInfo = JSON.parse(users.poster_txt)
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
      if (users.name) {
        ctx.setFontSize(20);
        ctx.setFillStyle('#000');
        ctx.fillText(users.name, left + 110, 60);
        const metrics = ctx.measureText(users.name);
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
    // ctx.draw();
    setTimeout(function () {
      wx.hideLoading();
      page.save()
    }, 2000)
  },

  save() {
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function (ops) {
    if (ops.from === 'button') {
      console.log(ops.target)
    }
    var page = this;
    var ation_id = wx.getStorageSync("at_id");
    console.log(ation_id)
    var it = true;
    return {
      title: '好友给我接个力',
      path: '/zh_jdgjb/pages/invite_friends/invite_friends?ation_id=' + ation_id,
      success: function (res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }
  }
})