var _Page;

function _defineProperty(e, t, a) {
  return t in e ? Object.defineProperty(e, t, {
    value: a,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = a, e;
}

var app = getApp(),
  siteinfo = require("../../../siteinfo.js"),
  imgArray1 = [];

Page(
  (_defineProperty(_Page = {
    data: {
      length: 0,
      curHdIndex: 0,
      numbers: 1,
    },

    onLoad: function (e) {
      var t = this;
      t.setData({
        seller_id: e.seller_id,
        order_id: e.order_id
      }),
        app.getUserInfo(function (e) {
          console.log(e), t.setData({
            user_id: e.id,
            url: wx.getStorageSync("url")
          });
        });

      this.kkk();
    },
    kkk() {
      var id = wx.getStorageSync("userInfo").id
      var page = this;
      wx.showLoading({
        title: "加载中..",
        mask: true,
      });
      app.util.request({
        url: "entry/wxapp/NotAssessCount",
        data: {
          user_id: id
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




    show(e) {
      this.setData({
        chenk: false
      })
    },
    hidden(e) {
      this.setData({
        chenk: true
      })
    },


    reduce(e) {
      console.log(e)
      var num = this.data.numbers;
      num = num - 1
      if (num < 1) {
        num = 1
      }
      this.setData({
        numbers: num
      })
    },

    add(e) {
      var num = this.data.numbers;
      var total = this.data.total
      num = num + 1
      if (num > total) {
        num = total
      }
      this.setData({
        numbers: num
      })
    },


    // 星星
    chooseicon: function (e) {
      var strnumber = e.target.dataset.id;
      // 用id来判断星星
      console.log(strnumber)
      var _obj = '';
      _obj = strnumber;
      this.setData({
        curHdIndex: _obj
      });
    },

    textarea: function (e) {
      console.log(e);
      var t = e.detail.cursor;
      "" != e.detail.value && this.setData({
        length: t,
        value: e.detail.value
      });
    },

    // submit: function(e) {
    //   this.data.value;
    // },

    img_array: function (e) {
      var a = this;
      if (9 <= imgArray1.length)
        wx.showModal({
          title: "",
          content: "最多上传9张图片"
        });
      else {
        siteinfo.siteroot;
        var t = 9 - imgArray1.length;
        wx.chooseImage({
          count: t,
          sizeType: ["compressed"],
          sourceType: ["album", "camera"],
          success: function (e) {
            wx.showToast({
              icon: "loading",
              title: "正在上传"
            });
            var t = e.tempFilePaths;
            a.uploadimg({
              url: siteinfo.siteroot + "?i=" + siteinfo.uniacid + "&c=entry&a=wxapp&do=Upload&m=zh_jdgjb",
              path: t
            });
          }
        });
      }
    },


    uploadimg: function (e) {
      var t = this,
        a = e.i ? e.i : 0,
        i = e.success ? e.success : 0,
        o = e.fail ? e.fail : 0;
      wx.uploadFile({
        url: e.url,
        filePath: e.path[a],
        name: "upfile",
        formData: null,
        success: function (e) {
          "" != e.data ? (i++ , imgArray1.push(e.data), 0 < imgArray1.length ? t.setData({
            imgArray1: imgArray1,
            edit: !0
          }) : t.setData({
            edit: !1
          }), console.log("上传商家轮播图时候提交的图片数组", imgArray1)) : wx.showToast({
            icon: "loading",
            title: "请重试"
          });
        },
        fail: function (e) {
          o++;
        },
        complete: function () {
          ++a == e.path.length ? (t.setData({
            images: e.path
          }), wx.hideToast()) : (e.i = a, e.success = i, e.fail = o, t.uploadimg(e));
        }
      });
    },

    delete: function (e) {
      console.log(e);
      var t = e.currentTarget.dataset.index;
      Array.prototype.indexOf = function (e) {
        for (var t = 0; t < this.length; t++)
          if (this[t] == e) return t;
        return -1;
      }, Array.prototype.remove = function (e) {
        var t = this.indexOf(e); -
          1 < t && this.splice(t, 1);
      }, imgArray1.remove(imgArray1[t]), this.setData({
        imgArray1: imgArray1
      });
    }
  },


    "submit",
    function (e) {
      var t = this,
        a = imgArray1.join(","),
        i = t.data.value,
        o = wx.getStorageSync("userInfo").id,
        r = t.data.seller_id,
        n = t.data.order_id;
      console.log(a),
        console.log(i),
        app.util.request({
          url: "entry/wxapp/SaveAssess",
          data: {
            user_id: o,
            img: a,
            content: i,
            order_id: n,
            seller_id: r,
            score: t.data.curHdIndex,
            num: t.data.numbers,
          },
          success: function (e) {
            console.log(e), 1 == e.data ? (
              wx.showModal({
                title: '恭喜',
                content: '你已经评价成功,如果有其他的小伙伴赞了你的评论你将得到奖励。',
                showCancel: false,
                confirmText: '确定',
                confirmColor: '#ef6464',
                success: function (res) {
                  if (res.confirm) {
                    setTimeout(function () {
                      wx.navigateBack({
                        delta: 2
                      });
                    }, 1500)
                  }
                },
                fail: function (res) { },
                complete: function (res) { },
              })) : wx.showModal({
                title: "",
                content: "系统出差了，待会再试一下"
              });
          }
        });
    }),
    _defineProperty(_Page, "onReady", function () { }), _defineProperty(_Page, "onShow", function () { }),
    _defineProperty(_Page, "onHide", function () { }), _defineProperty(_Page, "onUnload", function () {
      this.setData({
        imgArray1: []
      });
    }), _defineProperty(_Page, "onPullDownRefresh", function () { }), _defineProperty(_Page, "onReachBottom", function () { }),
    _defineProperty(_Page, "onShareAppMessage", function () { }), _Page));