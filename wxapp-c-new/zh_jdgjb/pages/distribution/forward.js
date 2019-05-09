var app = getApp();

Page({
    data: {
        hidden3: !1,
        hidden4: !0,
        button: !0,
        cash_zhi2: !1,
        cash_zhi: !1
    },
    onLoad: function(t) {
        var o = this;
        o.setData({
            color: wx.getStorageSync("platform").color
        }), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("platform").color
        }), wx.hideShareMenu();
        var a = wx.getStorageSync("userInfo").id;
        app.util.request({
            url: "entry/wxapp/GetFxSet",
            cachetime: "0",
            success: function(t) {
                console.log("这是系统设置"), console.log(t), o.setData({
                    system: t.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/CountCommission",
            cachetime: "0",
            data: {
                user_id: a
            },
            success: function(t) {
                console.log("这是可提现金额"), console.log(t), o.setData({
                    price: t.data.ktx
                });
            }
        });
    },
    bindblur: function(t) {
        var o = this.data.system.tx_rate, a = t.detail.value, e = a * (o / 100), n = a - e;
        n = n.toFixed(2), e = e.toFixed(2), this.setData({
            tx_cost: a,
            sxf: e,
            sj_cost: n
        });
    },
    formSubmit: function(t) {
        var o = this;
        console.log(t), console.log(o.data);
        var a = Number(o.data.system.zd_money), e = o.data.sj_cost, n = (o.data.sxf, Number(o.data.price)), s = t.detail.value.name, c = o.data.tx_cost, i = t.detail.value.account_number, u = t.detail.value.account_number_two, r = (o.data.user_id, 
        "");
        "" == c || c <= 0 ? r = "请输入提现金额" : n < c ? r = "不能超过可提现金额" : c < a ? r = "没有到提现门槛" : "" == s ? r = "请输入姓名" : "" == i ? r = "请输入微信账号" : "" == u ? r = "请再次输入微信账号" : i != u && (r = "账号输入有误，请重述"), 
        "" != r ? wx.showModal({
            title: "温馨提示",
            content: r
        }) : app.util.request({
            url: "entry/wxapp/Yjtx",
            data: {
                account: u,
                tx_cost: c,
                sj_cost: e,
                user_name: s,
                user_id: wx.getStorageSync("userInfo").id
            },
            success: function(t) {
                console.log(t), 1 == t.data && (wx.showToast({
                    title: "发起提现申请"
                }), setTimeout(function() {
                    wx.navigateBack({
                        delta: 1
                    });
                }, 1500));
            }
        });
    },
    inform: function(t) {
        wx.navigateTo({
            url: "inform?status=2"
        });
    },
    onReady: function() {},
    onShow: function() {
        console.log(this.data);
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});