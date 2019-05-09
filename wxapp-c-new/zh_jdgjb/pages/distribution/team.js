var app = getApp();

Page({
    data: {
        index: 0
    },
    onLoad: function(t) {
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("platform").color
        }), this.setData({
            color: wx.getStorageSync("platform").color
        }), this.refresh();
    },
    refresh: function(t) {
        var e = this, n = e.data.index, o = wx.getStorageSync("userInfo").id;
        app.util.request({
            url: "entry/wxapp/MyTeam",
            data: {
                user_id: o
            },
            success: function(t) {
                if (console.log(t), 0 == n) {
                    for (var o in t.data.one) t.data.one[o].time = app.ormatDate(t.data.one[o].time);
                    e.setData({
                        list: t.data.one
                    });
                }
                if (1 == n) {
                    for (var a in t.data.two) t.data.two[a].time = app.ormatDate(t.data.two[a].time).slice(0, 16);
                    e.setData({
                        list: t.data.two
                    });
                }
            }
        });
    },
    whole2: function(t) {
        this.setData({
            index: 0
        }), this.refresh();
    },
    whole3: function(t) {
        this.setData({
            index: 1
        }), this.refresh();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});