var app = getApp();

Page({
    data: {
        disabled: !0,
        zh: "",
        mm: "",
        logintext: "登录",
        werchat: !1,
        password: "888888888",
        name: "test8888"
    },
    onLoad: function(t) {
        this.setData({
            pt_img: wx.getStorageSync("platform").link_logo,
            color: wx.getStorageSync("platform").color,
            pt_name: wx.getStorageSync("platform").pt_name,
            tel: wx.getStorageSync("platform").tel,
            url: wx.getStorageSync("url")
        }), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("platform").color
        });
    },
    name: function(t) {
        console.log(t), this.setData({
            name: t.detail.value
        });
    },
    password: function(t) {
        console.log(t), this.setData({
            password: t.detail.value
        });
    },
    sign: function(t) {
        console.log(this.data), app.util.request({
            url: "entry/wxapp/HtLogin",
            cachetime: "0",
            data: {
                username: this.data.name,
                password: this.data.password
            },
            success: function(t) {
                console.log(t), console.log(this.data);
                var o = {
                    name: this.data.username,
                    password: this.data.password
                };
                console.log(o), "账号或密码错误" == t.data ? wx.showModal({
                    title: "提示",
                    content: "账号或密码错误"
                }) : (wx.setStorageSync("store_info", t.data), wx.setStorageSync("sign", o), wx.redirectTo({
                    url: "../logs/Workbench"
                }));
            }
        });
    },
    weixin: function(t) {
        0 == this.data.werchat ? this.setData({
            werchat: !0
        }) : 1 == this.data.werchat && this.setData({
            werchat: !1
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});