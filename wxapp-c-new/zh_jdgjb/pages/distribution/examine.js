var app = getApp();

Page({
    data: {
        fwxy: !1
    },
    onLoad: function(t) {},
    refresh: function(t) {
        var e = this;
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("platform").color
        }), e.setData({
            color: wx.getStorageSync("platform").color
        });
        var o = wx.getStorageSync("userInfo").id;
        app.util.request({
            url: "entry/wxapp/MySx",
            data: {
                user_id: o
            },
            success: function(t) {
                console.log(t), 0 == t.data ? e.setData({
                    name: wx.getStorageSync("platform").pt_name,
                    bind_userid: 0
                }) : 0 == t.data.user_id ? e.setData({
                    name: wx.getStorageSync("platform").pt_name,
                    bind_userid: 0
                }) : e.setData({
                    name: t.data.name,
                    bind_userid: t.data.user_id
                });
            }
        }), app.util.request({
            url: "entry/wxapp/GetFxSet",
            success: function(t) {
                console.log(t), e.setData({
                    GetFxSet: t.data,
                    url: wx.getStorageSync("url")
                });
            }
        });
    },
    formSubmit: function(t) {
        console.log(t);
        var e = t.detail.value.name, o = t.detail.value.tel, a = wx.getStorageSync("userInfo").id, n = this.data.bind_userid;
        console.log(n), console.log(a);
        var r = "";
        "" == e ? r = "请输入您的真实姓名" : "" == o && (r = "请输入您的手机号码"), "" != r ? wx.showModal({
            content: r
        }) : (app.util.request({
            url: "entry/wxapp/Binding",
            cachetime: "0",
            data: {
                fx_user: a,
                user_id: n
            },
            success: function(t) {
                console.log("这是成为下级分销商"), console.log(t);
            }
        }), app.util.request({
            url: "entry/wxapp/Distribution",
            data: {
                user_id: a,
                user_name: e,
                user_tel: o
            },
            success: function(t) {
                console.log(t), wx.showToast({
                    title: "已提交申请"
                }), setTimeout(function() {
                    wx.navigateBack({
                        delta: 1
                    });
                }, 1500);
            }
        }));
    },
    onReady: function() {},
    onShow: function() {
        this.refresh();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});