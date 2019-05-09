var app = getApp();

Page({
    data: {
        ac_index: -1
    },
    onLoad: function(a) {
        var t = this;
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("platform").color
        }), app.getUserInfo(function(a) {
            console.log(a), t.setData({
                userInfo: a,
                color: wx.getStorageSync("platform").color
            });
        }), app.util.request({
            url: "entry/wxapp/attachurl",
            cachetime: "0",
            success: function(a) {
                console.log(a), wx.setStorageSync("url", a.data), t.setData({
                    url: a.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/getad",
            cachetime: "0",
            data: {
                type: 3
            },
            success: function(a) {
                console.log(a);
                t.data.rande;
                0 < a.data.length && t.setData({
                    getad: a.data,
                    bomb: !0
                });
            }
        }), app.util.request({
            url: "entry/wxapp/Czhd",
            cachetime: "0",
            success: function(a) {
                console.log("平台充值活动"), console.log(a), t.setData({
                    Czhd: a.data
                });
            }
        });
    },
    money: function(a) {
        this.setData({
            money: a.detail.value
        });
    },
    recharge_list: function(a) {
        this.setData({
            ac_index: a.currentTarget.dataset.index,
            money: a.currentTarget.dataset.money
        });
    },
    qita: function(a) {
        this.setData({
            ac_index: -1
        });
    },
    chongzhi: function(a) {
        var e = this.data.money, t = "";
        if (null != e && 0 != e || (t = "请输入充值金额"), "" != t) wx.showModal({
            content: t
        }); else {
            var n = this.data.Czhd, o = [];
            for (var c in n) e >= Number(n[c].full) && o.push(Number(n[c].full));
            if (console.log(o), 0 < o.length) {
                var i = app.max(o);
                for (var r in n) if (i == n[r].full) var s = n[r].reduction;
            } else s = 0;
            var u = wx.getStorageSync("userInfo").id, l = app.OpenId;
            app.util.request({
                url: "entry/wxapp/SaveRecharge",
                data: {
                    user_id: u,
                    cz_money: e,
                    zs_money: s
                },
                success: function(a) {
                    var t = a.data;
                    app.util.request({
                        url: "entry/wxapp/Pay2",
                        cachetime: "0",
                        data: {
                            openid: l,
                            money: e,
                            cz_id: t
                        },
                        success: function(a) {
                            wx.requestPayment({
                                timeStamp: a.data.timeStamp,
                                nonceStr: a.data.nonceStr,
                                package: a.data.package,
                                signType: a.data.signType,
                                paySign: a.data.paySign,
                                success: function(a) {
                                    wx.showToast({
                                        title: "支付成功"
                                    }), setTimeout(function() {
                                        wx.navigateBack({
                                            delta: 1
                                        });
                                    }, 1500);
                                }
                            });
                        }
                    });
                }
            });
        }
    },
    jilu: function(a) {
        wx.navigateTo({
            url: "jilu"
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});