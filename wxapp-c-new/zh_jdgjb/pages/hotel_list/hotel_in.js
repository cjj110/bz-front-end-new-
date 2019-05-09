var app = getApp();

Page({
    data: {},

    onLoad: function(t) {
        var a = this;

        a.setData({
            color: wx.getStorageSync("platform").color
        }), 
        app.util.request({
            url: "entry/wxapp/attachurl",
            cachetime: "0",
            success: function(t) {
                console.log(t),
                 wx.setStorageSync("url", t.data), a.setData({
                    url: t.data
                });
            }
        }), 
        
        app.util.request({
            url: "entry/wxapp/PjDetails",
            cachetime: "0",
            data: {
                seller_id: t.seller_id
            },
            success: function(t) {
                console.log(t), t.data.img = t.data.img.split(","),
                 a.setData({
                    hotel: t.data
                });
            }
        });
    },



    phone: function(t) {
        wx.makePhoneCall({
            phoneNumber: this.data.tel
        });
    },
    dizhi: function(t) {
        var a = this, o = Number(a.data.hotel.coordinates.split(",")[0]), e = Number(a.data.hotel.coordinates.split(",")[1]);
        wx.openLocation({
            latitude: o,
            longitude: e,
            name: a.data.hotel.name,
            address: a.data.hotel.address
        });
    },
    
    previewImage: function(t) {
        console.log(t);
        var a = this.data.url, o = [], e = t.currentTarget.dataset.index;
        console.log(e);
        var n = this.data.hotel.img;
        for (var r in n) o.push(a + n[r]);
        wx.previewImage({
            current: a + n[e],
            urls: o
        });
    },


    setclip: function(t) {
        wx.setClipboardData({
            data: "1.0版本",
            success: function(t) {
                wx.getClipboardData({
                    success: function(t) {
                        console.log(t.data);
                    }
                });
            }
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