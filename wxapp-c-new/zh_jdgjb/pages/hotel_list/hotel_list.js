var app = getApp(),
  loading = 2;
// var Moment = require("../../utils/moment.js");
var cutstr = require("../../utils/util.js");
var DATE_LIST = [];
var DATE_YEAR = new Date().getFullYear()
var DATE_MONTH = new Date().getMonth() + 1
var DATE_DAY = new Date().getDate()
Page({
  data: {
    rightValue: 850,
    is_slider: false,
    prc: [{
      min_price: "0",
      max_price: "200",
    }, {
      min_price: "200",
      max_price: "300",
    }, {
      min_price: "300",
      max_price: "400",
    }, {
      min_price: "400",
      max_price: "600",
    }],
    star: [
      "二星及以下", "三星/舒适 ", " 四星/高档", "五星/豪华"
    ],
    min_price: 0,
    max_price: 850,
    select: true,
    sorting: true,
    diting: true,
    sdowll: true,
    page: 1,
    hotel: [],
    timg: !1,
    checkInDate: "",
    checkOutDate: "",
    list1: "距离优先",
    shop_area: "位置区域",
    price_ranking: '价格排序',
    list: [{
      name: '距离优先 ',
      select: true,
      sort: 5,
    },
    {
      name: '低价优先',
      select: false,
      sort: 2,
    },
    {
      name: '高价优先',
      select: false,
      sort: 3,
    }, {
      name: '好评优先',
      select: false,
      sort: 4,
    },
    {
      name: '推荐排序',
      select: false,
      sort: 1,
    },
    ],
    Recommend: 2,
    chenk: true,
    addressing: 0,
    price_sorting: 0,
    dit: 0,
    dis_list: [
      "酒店类型",
      "品牌",
      "设施服务",
      "床型早餐",
      "点评",
    ],
    sort: 5, // 默认推荐排序
  },

  JieliStatus(e) {
    var p = this;
    var id = wx.getStorageSync("userInfo").id;
    app.util.request({
      url: "entry/wxapp/JieliStatus",
      data: {
        user_id: id
      },
      success: function (t) {
        console.log(t)
        p.setData({
          jiestatus: t.data.status
        });
      }
    })
  },
  go() {
    var p = this;
    var id = wx.getStorageSync("userInfo").id;
    app.util.request({
      url: "entry/wxapp/AddJieli",
      data: {
        user_id: id
      },
      success: function (t) {
        wx.navigateTo({
          url: '/zh_jdgjb/pages/invite_friends/invite_friends',
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
      }
    })
  },

  close() {
    this.setData({
      recomimg: 0,
      select: true,
      sorting: 1,
      price_sorting: 0,
      dit: 0,
      addressing:0,
    })
  },
  price_choice(e) {
    var m = 3;
    var page = this;
    var index = e.currentTarget.dataset.index;
    //console.log(e)
    var min_price = e.currentTarget.dataset.min;
    var max_price = e.currentTarget.dataset.max;
    page.setData({
      clear_pr: index,
      price_ranking: '￥' + min_price + '-' + max_price,
      min_price: min_price,
      max_price: max_price,
      page: 1,
      hotel: [],
    })
    wx.setStorageSync("min_price", min_price)
    wx.setStorageSync("max_price", max_price)
    page.refresh(m)
  },
  Price_range(e) {
    var page = this,
      t = 3,
      min_price;
    min_price = e.detail.value;
    // console.log(wx.setStorageSync("min_price", min_price))
    if (page.data.max_price > 850) {
      page.setData({
        clear_pr: -1, //清除价格选择
        min_price: min_price,
      })
      return;
    }
    if (min_price > page.data.max_price) {
      wx.setStorageSync("max_price", 850)
      page.setData({
        max_price: 850
      })
    }
    if (min_price == 425) {
      page.setData({
        pindex: 999,
        bindex: 9,
      })
    }
    var prc = page.data.prc;
    wx.setStorageSync("min_price", min_price)
    page.setData({
      clear_pr: -1,
      //清除价格选择
      min_price: min_price,
      page: 1,
      hotel: [],
    })
    page.refresh(t);
  },
  rightChange(e) {
    console.log(e);
    var page = this,
      t = 3,
      max_price = e.detail.value;
    wx.setStorageSync("max_price", max_price);
    if (max_price > 850) {
      wx.removeStorage({
        key: 'max_price'
      })
      wx.setStorageSync("min_price", 850);
    } else if (max_price == 426) {
      page.setData({
        bindex: 999,
        pindex: 8
      })
    } else {
      wx.setStorageSync("min_price", page.data.min_price);
    }

    page.setData({
      clear_pr: -1,
      //清除价格选择
      max_price: max_price,
      page: 1,
      hotel: [],
    })
    page.refresh(t);
  },
  star_prc(e) {
    var m = 3;
    var index = e.currentTarget.dataset.index;
    var star = index + 2;
    this.setData({
      star_px: index,
      page: 1,
      hotel: []
    })
    wx.setStorageSync("star", star)
    this.refresh(m);
  },

  checkInDate() {
    wx.navigateTo({
      url: '../calendar/index?chenk=' + 'hotel',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  onLoad: function (t) {
    var e = this;
    console.log(t.user_id)
    wx.setStorageSync("share_key", t.user_id)
    console.log(t);
    app.getUserInfo(function (e) { })
    wx.setStorageSync("city", t.city),
      // 位置区域需要的城市
      wx.setStorageSync("min_price", 0)
    wx.setStorageSync("max_price", 850)
    wx.setStorageSync("addcity", t.addcity),
      wx.setStorageSync("lat1", t.lat1),
      wx.setStorageSync("lng1", t.lng1),
      e.setData({
        color: wx.getStorageSync("platform").color
      }),
      e.setData({
        start: app.util.time(),
        end: app.util.addDate(app.util.time(), 28),
        city: t.city
      }),
      1 == t.nearby ? e.setData({
        nearby: t.nearby,
        recomimg: 1,
        price_sorting: 0
      }) : e.setData({
        nearby: 0,
        recomimg: 0,
        price_sorting: 0
      });
    var a = wx.getStorageSync("platform"),
      o = wx.getStorageSync("url");
    e.setData({
      platform: a,
      url: o,
      lat1: wx.getStorageSync("latitude"),
      lng1: wx.getStorageSync("longitude")
    }),
      2 == location && wx.showLoading({
        title: "正在加载",
        complete: function () { },
        fail: function () { }
      }),
      e.date();
    //设缓存缓存起来的日期
    
    var str = wx.getStorageSync("ROOM_SOURCE_DATE").checkInDate;
    var year = str.split('-')[0];
    var month = str.split('-')[1];
    var date = str.split('-')[2];
    year = year + '年';
    month = month + '月';
    date = date + '日';
    var strs = wx.getStorageSync("ROOM_SOURCE_DATE").checkOutDate;
    var years = strs.split('-')[0];
    var months = strs.split('-')[1];
    var dates = strs.split('-')[2];
    years = years + '年';
    months = months + '月';
    dates = dates + '日';
    this.setData({
      checkInDate: [month + date],
      checkOutDate: [months + dates],
    });
    e.jx();
    wx.getLocation({
      type: "gcj02",
      success: function (t) {
        console.log(t)
        wx.setStorageSync("latitude", t.latitude), wx.setStorageSync("longitude", t.longitude),
          e.setData({
            latitude: t.latitude,
            longitude: t.longitude
          });
      },
    })
    this.common_list();
    wx.setStorageSync("key_ty", t.keywords)
    e.refresh(1);
    e.bg();
  },
  onon:function(e){
    console.log(this.data.hotel)
  },
  
  bg() {
    let page = this;
    app.util.request({
      url: "entry/wxapp/GetADImg",
      data: {
        type: 4
      },
      success: function (res) {
        console.log(res)
        page.setData({
          GetADImg: res.data.data
        })
      },
      complete: function (res) {

      },
    });
  },
  jx(e) {
    var id = wx.getStorageSync("userInfo").id;
    var page = this;
    wx.showLoading({
      title: "加载中..",
      mask: true,
    });
    var city = wx.getStorageSync("addcity")
    app.util.request({
      url: "entry/wxapp/ChoicenessJd",
      data: {
        city: city
      },
      success: function (res) {
        page.setData({
          jxlist: res.data
        })
      },
      complete: function (res) {
        wx.hideLoading();
      },
    });
  },

  choicenessJdList(e) {
    var city = wx.getStorageSync("city")
    var tag_id = e.currentTarget.dataset.tag_id;
    wx.navigateTo({
      url: '../choicenessJdList/choicenessJdList?city=' + city + '&tag_id=' + tag_id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  date: function (t) {
    var e = wx.getStorageSync("ROOM_SOURCE_DATE").checkInDate,
      a = wx.getStorageSync("ROOM_SOURCE_DATE").checkOutDate,
      o = wx.getStorageSync("day"),
      r = app.util.time();
    if (
      wx.setStorageSync("datein", n), "" == e) {
      var n = app.util.time();
      wx.setStorageSync("datein", n);
    } else if (e < r) n = r;
    else n = e;
    if ("" == a)
      var i = app.util.addDate(r, 1);
    else {
      var s = app.util.addDate(r, 1);
      if (a < s) i = s;
      else i = a;
    }
    o = app.util.day(i, n);
    this.setData({
      weeks: n,
      week_out: i,
      time: o,
      current_date: n
    });
  },

  // 筛选1
  Recommend: function (t) {
    var e = this;
    var select = t.currentTarget.dataset.select;
    var recomimg;
    if (select) select = false,
      recomimg = 1;
    else select = true,
      recomimg = 0;
    e.setData({
      recomimg: recomimg,
      select: select,
      chenk: true,
      sorting: true,
      diting: true,
      addressing: 0,
      price_sorting: 0,
      dit: 0,
    })
  },

  address(t) {
    var e = this;
    var addressing;
    var chenk = t.currentTarget.dataset.chenk;
    if (chenk) {
      chenk = false;
      addressing = 1
    } else {
      chenk = true;
      addressing = 0
    };
    // let addcity = wx.getStorageSync("addcity");
    // wx.setStorageSync("addcity", addcity)
    e.setData({
      addressing: addressing,
      chenk: chenk,
      recomimg: 0,
      dit: 0,
      price_sorting: 0,
      select: true,
      sorting: true,
      diting: true,
    })
  },


  // 价格排序
  price_sorting: function (t) {
    var e = this,
      price_sorting;
    var sorting = t.currentTarget.dataset.sorting;
    if (sorting) {
      sorting = false;
      price_sorting = 1
    } else {
      sorting = true;
      price_sorting = 0
    };
    e.setData({
      price_sorting: price_sorting,
      sorting: sorting,
      recomimg: 0,
      dit: 0,
      addressing: 0,
      selet: true,
      chenk: true,
      diting: true,
    })
  },

  dit_sorting(t) {
    var e = this,
      Recommend;
    var chenk = t.currentTarget.dataset.dit;
    var sdowll = true;
    if (chenk) {
      chenk = false;
      Recommend = 1
    } else {
      chenk = true;
      Recommend = 0
    };
    e.setData({
      dit: Recommend,
      sdowll: sdowll,
      diting: chenk,
      recomimg: 0,
      price_sorting: 0,
      addressing: 0,
      selet: true,
      sorting: true,
      chenk: true,
    })
  },

  // 推荐筛选
  pxlist(e) {
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
    var page = this;
    var index = e.currentTarget.dataset.index;
    var sort = e.currentTarget.dataset.sort;
    var list = this.data.list;
    for (var i in list) {
      list[i].select = false;
    }
    list[index].select = true;

    if (sort == 5) {
      wx.removeStorage({
        key: 'lat1',
      })
      wx.removeStorage({
        key: 'lng1',
      })
    }
    page.setData({
      list: list,
      list1: list[index].name,
      sort: sort, //筛选
      page: 1, //清空分页
      hotel: [], //清空数组
      recomimg: 0, //关闭遮盖层
      select: true, //关闭遮盖层
    })
    page.refresh();
  },

  Choice(e) {
    var page = this;
    var t = 2;
    var id = e.currentTarget.dataset.id;
    var shop_area = e.currentTarget.dataset.name;
    page.setData({
      // addressing: 0,
      // chenk: true,
      hotel: [],
      total: id,
      shop_area: shop_area,
      page: 1,
    })
    wx.setStorageSync("shop_area", shop_area)
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
    page.refresh(t);
  },

  // 综合一级
  dist(e) {
    var page = this;
    var index = e.currentTarget.dataset.index;
    var hotel_type = index + 1;
    var dist_hotel = [];
    if (index == 0) {
      dist_hotel = [
        "高端连锁", "快捷连锁", "客栈", "民宿", "钟点房", "青年旅舍", "特色酒店",
      ]
    } else if (index == 1) {
      dist_hotel = [
        "高端连锁", "中端连锁", "快捷连锁",
      ]
    } else if (index == 2) {
      dist_hotel = [
        "网络", "酒店设施", "交通", "酒店服务",
      ]
    } else if (index == 3) {
      dist_hotel = [
        "床型", "早餐"
      ]
    } else if (index == 4) {
      dist_hotel = [
        "评分", "数量"
      ]
    }
    page.setData({
      dist_avt: index,
      dist_hotel: dist_hotel,
      hotel_two: "-1",
      list_hotel: " ",
      cate_list: -1,
      page: 1,
    })

  },

  // 酒店二级
  dist_hotel_two(e) {
    var cate_list;
    var page = this;
    var m = 4;
    var index = e.currentTarget.dataset.index;
    var k1 = e.currentTarget.dataset.kl;
    wx.showLoading({
      title: "加载中..",
      mask: true,
    });
    this.setData({
      hotel_two: index,
    })
    if (k1 == 0) {
      var hotel_type = index + 1;
      page.setData({
        page: 1,
        hotel: [],
      })
      wx.setStorageSync("hotel_type", hotel_type);
      page.refresh(m);

    } else if (k1 == 1) {

      this.pp_hotel(index)

    } else if (k1 == 2 && index == 0) {
      cate_list = [{
        name: "免费WIFI上网",
        click: 0,
        num: 1,
      },
      {
        name: "收费WIFI上网",
        click: 0,
        num: 2,
      }
      ]
    } else if (k1 == 2 && index == 1) {
      cate_list = [{
        name: " 健身房",
        click: 0,
        num: 1,
      },
      {
        name: "游乐室",
        click: 0,
        num: 2,
      },
      {
        name: "中餐厅",
        click: 0,
        num: 3,
      },
      {
        name: "西餐厅",
        click: 0,
        num: 4,
      },

      {
        name: "酒吧",
        click: 0,
        num: 5,
      },

      {
        name: "会议厅",
        click: 0,
        num: 6,
      },
      {
        name: "商务中心",
        click: 0,
        num: 7,
      },
      {
        name: "传真/复印",
        click: 0,
        num: 8,
      },
      {
        name: "多媒体系统",
        click: 0,
        num: 9,
      },
      {
        name: "残疾辅助系统",
        click: 0,
        num: 10,
      },
      {
        name: "厨房",
        click: 0,
        num: 11,
      },

      {
        name: "洗衣机",
        click: 0,
        num: 12,
      },
      {
        name: "游泳池",
        click: 0,
        num: 13,
      },
      {
        name: "SPA",
        click: 0,
        num: 14,
      },
      {
        name: "棋牌室",
        click: 0,
        num: 15,
      },
      {
        name: "高尔夫球场",
        click: 0,
        num: 16,
      },
      {
        name: "吸烟区",
        click: 0,
        num: 17,
      },
      ]
    } else if (k1 == 2 && index == 2) {
      cate_list = [{
        name: "免费停车场",
        click: 0,
        num: 1,
      },
      {
        name: "收费停车场",
        click: 0,
        num: 2,
      }, {
        name: "接机服务",
        click: 0,
        num: 3,
      },
      {
        name: "叫车服务",
        click: 0,
        num: 4,
      },
      {
        name: "代客泊车",
        click: 0,
        num: 5,
      }, {
        name: "穿梭机场班车",
        click: 0,
        num: 6,
      },
      ]
    } else if (k1 == 2 && index == 3) {
      cate_list = [{
        name: "行李寄存",
        click: 0,
        num: 1,
      },
      {
        name: "24小时前台",
        click: 0,
        num: 2,
      }, {
        name: "旅游票务",
        click: 0,
        num: 3,
      },
      {
        name: "叫醒服务",
        click: 0,
        num: 4,
      },
      {
        name: "邮政服务",
        click: 0,
        num: 5,
      }, {
        name: "送餐服务",
        click: 0,
        num: 6,
      },
      {
        name: "母婴服务",
        click: 0,
        num: 7,
      },
      {
        name: "早餐",
        click: 0,
        num: 8,
      }, {
        name: "洗衣服务",
        click: 0,
        num: 9,
      },
      ]
    } else if (k1 == 3 && index == 0) {
      cate_list = [{
        name: "大床",
        click: 0,
        num: 1,
      },
      {
        name: "双床",
        click: 0,
        num: 2,
      }, {
        name: "单人床",
        click: 0,
        num: 3,
      },
      {
        name: "多张床",
        click: 0,
        num: 4,
      },
      ]
    } else if (k1 == 3 && index == 1) {
      cate_list = [{
        name: "含早餐",
        click: 0,
        num: 1,
      },
      {
        name: "单份早餐",
        click: 0,
        num: 2,
      }, {
        name: "双份早餐",
        click: 0,
        num: 3,
      },
      ]
    } else if (k1 == 4 && index == 0) {
      cate_list = [{
        name: "4.5分以上",
        click: 0,
        num: 1,
      },
      {
        name: "4.0分以上",
        click: 0,
        num: 2,
      }, {
        name: "3.5分以上",
        click: 0,
        num: 3,

      }, {
        name: "3.0分以上",
        click: 0,
        num: 4,
      },
      ]
    } else if (k1 == 4 && index == 1) {
      cate_list = [{
        name: "5条以上",
        click: 0,
        num: 1,

      },
      {
        name: "10条以上",
        click: 0,
        num: 2,
      }, {
        name: "20条以上",
        click: 0,
        num: 3,
      }, {
        name: "50条以上",
        click: 0,
        num: 4,
      },
      ]
    }
    wx.hideLoading();
    page.setData({
      cate_list: cate_list,
      lt: false
    })
  },

  // 酒店品牌
  pp_hotel(t) {
    var page = this;
    wx.showLoading({
      title: "加载中..",
      mask: true,
    });
    app.util.request({
      url: "entry/wxapp/GetBrands",
      success: function (res) {
        //console.log(res)
        var list_hotel = res.data;
        t == 0 ? (
          list_hotel = list_hotel.slice(0, 1),
          page.setData({
            list_hotel: list_hotel
          })
        ) : "", t == 1 ? (
          list_hotel = list_hotel.slice(1, 2),
          page.setData({
            list_hotel: list_hotel
          })
        ) : "", t == 2 ? (
          list_hotel = list_hotel.slice(2, 3),
          page.setData({
            list_hotel: list_hotel
          })
        ) : ""
        page.setData({
          lt: true
        })
      },
      complete: function (res) {
        wx.hideLoading();
      },
    });
  },


  // 酒店品牌end
  check_three(e) {
    var list = [];
    var page = this;
    var m = 4;
    var list_hotel = page.data.list_hotel;
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.id;
    if (list_hotel[index].list[id].click == 1) {
      list_hotel[index].list[id].click = 0
    } else {
      list_hotel[index].list[id].click = 1;
    }
    page.setData({
      list_hotel: list_hotel,
      hotel: [],
      page: 1,
    })
    for (var p in list_hotel[index].list) {
      if (list_hotel[index].list[p].click == 1) {
        list.push(list_hotel[index].list[p].name)
      }
    }
    var a = list.join(',')
    wx.setStorageSync("brandlist", a)
    page.refresh(m)
  },


  // 其他类目
  check_three_two(e) {
    var m = 4;
    var list = [];
    var page = this;
    var cate_list = page.data.cate_list;
    var index = e.currentTarget.dataset.id;
    var num = e.currentTarget.dataset.index;
    var kl = e.currentTarget.dataset.kl;
    var hotel = e.currentTarget.dataset.hotel;
    if (cate_list[index].click == 1) {
      cate_list[index].click = 0
    } else {
      cate_list[index].click = 1;
    }
    page.setData({
      cate_list: cate_list,
      page: 1,
      hotel: [],
    })
    for (var p in cate_list) {
      if (cate_list[p].click == 1) {
        list.push(cate_list[p].num)
      }
    }
    var a = list.join(',')
    // wifi
    if (kl == 2 && hotel == 0) {
      wx.setStorageSync("wifi", a)
    }
    // 酒店设施
    if (kl == 2 && hotel == 1) {
      wx.setStorageSync("facilities", a)
    }
    // 交通
    if (kl == 2 && hotel == 2) {
      wx.setStorageSync("traffic", a)
    }
    // 酒店服务
    if (kl == 2 && hotel == 3) {
      wx.setStorageSync("service", a)
    }
    // 床型
    if (kl == 3 && hotel == 0) {
      wx.setStorageSync("bed", a)
    }
    // 早餐
    if (kl == 3 && hotel == 1) {
      wx.setStorageSync("zaocan", a)
    }
    // 点评
    if (kl == 4 && hotel == 0) {
      wx.setStorageSync("score", a)
    }
    //数量
    if (kl == 4 && hotel == 1) {
      wx.setStorageSync("num", a)
    }
    page.refresh(m)
  },

  // 页面加载
  refresh: function (sequence) {
    var that = this,
      sequence;
    if (!sequence) {
      sequence = 200
    }
    var shop_area = that.data.shop_area;
    // console.log(cutstr.cutstr(shop_area, 7))
    var c = that.data.page,
      l = that.data.hotel,
      longitude, latitude;
    if (that.data.sort) {
      latitude = wx.getStorageSync("latitude")
      longitude = wx.getStorageSync("longitude");
    } else {
      latitude = undefined;
      longitude = undefined;
    }
    app.util.request({
      url: "entry/wxapp/JdList",
      cachetime: "0",
      data: {
        page: c, //分页
        city: wx.getStorageSync("city"), //城市
        user_id: wx.getStorageSync("userInfo").id, //用户id
        keywords: wx.getStorageSync("key_ty"), //关键字
        sort: that.data.sort,
        //推荐筛选
        // lat1: wx.getStorageSync("lat1"), 
        // lng1: wx.getStorageSync("lng1"), 
        lat: latitude, //距离优先
        lng: longitude, // 距离优先
        district: wx.getStorageSync("district"), //位置区域
        shop_area: wx.getStorageSync("shop_area"), //位置区域
        hotel_type: wx.getStorageSync("hotel_type"), //酒店类型
        star: wx.getStorageSync("star"),
        gao_brand: wx.getStorageSync("brandlist"), //品牌选择
        min_price: wx.getStorageSync("min_price"), //最小价格
        max_price: wx.getStorageSync("max_price"), //最大价格
        // 数据分类
        wifi: wx.getStorageSync("wifi"),
        traffic: wx.getStorageSync("traffic"),
        facilities: wx.getStorageSync("facilities"),
        service: wx.getStorageSync("service"),
        zaocan: wx.getStorageSync("zaocan"),
        bed: wx.getStorageSync("bed"),
        score: wx.getStorageSync("score"),
        num: wx.getStorageSync("num"),
      },
      success: function (t) {
        wx.hideLoading();
        console.log("这个是推进的酒店111", t.data[0])
        if (t.data[0].seller_user) {
          console.log("这个是推进的酒店", t.data[0].seller_user)
          let shop_hotel = [];
          shop_hotel.push(t.data[0].seller_user)
          that.setData({
            shop_hotel: shop_hotel,
          })
        }
        if (t.data.length >= 0 && t.data) {
          if (!t.data[0].id) {
            t.data = []
          }
          that.setData({
            page: c + 1,
          }),
            l = l.concat(t.data);
          for (let i in l) {
            l[i].xing = parseInt(l[i].xing)
            console.log(l)
          }
          console.log(l)
          // 判断有关键词的时候停止页面下拉
          sequence == 200 ?
            that.setData({
              hotel: l,
            }) : (
              1 == sequence ? that.setData({
                hotel: l,
                addressing: 0,
                chenk: true,
                shop_area: cutstr.cutstr(shop_area, 7)
              }) : '',
              2 == sequence ? that.setData({
                hotel: l,
                addressing: 0,
                chenk: true,
                shop_area: cutstr.cutstr(shop_area, 7)
              }) : '',
              3 == sequence && that.setData({
                hotel: l,
                sorting: true,
              }),
              4 == sequence && that.setData({
                hotel: l,
                Recommend: 1,
                select: true,
              })
            )
          } else {
            that.setData({
              hotel: [],
            })
          }
        }
      });
    },

  region(e) {
    var page = this;
    var index = e.currentTarget.dataset.index,
      // 区域
      name = e.currentTarget.dataset.name,
      city = wx.getStorageSync("addcity");
    wx.setStorageSync("district", name);
    page.setData({
      action: index,
      total: -1,
      district: name
    })
    var id = wx.getStorageSync("userInfo").id
    wx.showLoading({
      title: "加载中..",
      mask: true,
    });
    app.util.request({
      url: "entry/wxapp/GetShoparea",
      data: {
        city: city,
        area: name,
      },
      success: function (res) {
        page.setData({
          address_list: res.data
        })
      },
      complete: function (res) {
        wx.hideLoading();
      },
    });
  },


  nearby: function (t) {
    var e = this,
      a = e.data.nearby;
    e.data.hotel_b;
    0 == a ? (e.setData({
      price_sorting: 0,
      Recommend: 2,
      nearby: 2,
      page: 1,
      hotel: [],
      timg: !1
    }), e.refresh()) : 1 == a ? (e.setData({
      price_sorting: 0,
      Recommend: 2,
      nearby: 2,
      page: 1,
      hotel: [],
      timg: !1
    }), e.refresh()) : 2 == a && (e.setData({
      price_sorting: 0,
      Recommend: 2,
      nearby: 1,
      page: 1,
      hotel: [],
      timg: !1
    }), e.refresh());
  },

  bindDateChange1: function (t) {
    var e = t.detail.value,
      a = this.data.dateout,
      o = (this.data.current_date, app.getTime2Time(a, e));
    wx.setStorageSync("day1", e), wx.setStorageSync("day2", a), wx.setStorageSync("day", o),
      this.setData({
        datein: t.detail.value,
        time: o
      });
  },

  bindDateChange2: function (t) {
    var e = this.data.datein,
      a = t.detail.value;
    var o = app.getTime2Time(a, e);
    wx.setStorageSync("day1", e), wx.setStorageSync("day2", a), wx.setStorageSync("day", o),
      this.setData({
        dateout: t.detail.value,
        time: o
      });
  },

  conlist: function (t) {
    wx.navigateTo({
      url: "hotel_info?hotel_id=" + t.currentTarget.dataset.id + '&title=' + t.currentTarget.dataset.title
    });
  },


  // 搜索按钮
  search: function (t) {
    var page = this,
      e = t.detail.value;
    e = e.replace(/\s+/g, "");
    this.setData({
      hotel: [],
      search_value: e,
      page: 1,
    })
    wx.setStorageSync("key_ty", e)
    this.refresh();
  },

  // 删除搜索内容
  search_input(t) {
    var page = this,
      e = t.detail.value;
    e = e.replace(/\s+/g, "");
    if (e == ' ' || e == '') {
      wx.removeStorage({
        key: 'key_ty',
      })
      page.setData({
        page: 1,
        hotel: [],

      })
      this.refresh();
    }
  },

  onReady: function () { },

  onShow: function (t) {
    this.GetDistrict();
    this.timedata();
    this.JieliStatus();

    // 几晚
    this.date()
    
  },

  timedata() {
    let getDate = wx.getStorageSync("ROOM_SOURCE_DATE");
    var str = getDate.checkInDate;
    var year = str.split('-')[0];
    var month = str.split('-')[1];
    var date = str.split('-')[2];
    year = year + '年';
    month = month + '月';
    date = date + '日';
    var strs = getDate.checkOutDate;
    var years = strs.split('-')[0];
    var months = strs.split('-')[1];
    var dates = strs.split('-')[2];
    years = years + '年';
    months = months + '月';
    dates = dates + '日';
    this.setData({
      checkInDate: [month + date],
      checkOutDate: [months + dates],
    });
  },

  GetDistrict() {
    var page = this;
    wx.getStorageSync("addcity")
    app.util.request({
      url: "entry/wxapp/GetDistrict",
      data: {
        city: wx.getStorageSync("addcity")
      },
      success: function (res) {
        page.setData({
          city_District: res.data
        })
      },
      complete: function (res) { },
    });
  },
  onHide: function () {
    // this.common_list();
  },
  onUnload: function () {
    this.setData({
      location: 2
    });
    // this.common_list()
  },
  // 下拉清除数据
  onPullDownRefresh: function () {
    // this.setData({
    //   page: 1,
    //   hotel: [],
    //   nearby: 0,
    //   Recommend: 1,
    //   sort: 5,
    //   price_sorting: 0,
    //   search_value: '',
    //   list1: "推荐排序",
    //   shop_area: "位置区域",
    //   price_ranking: '价格排序',
    // }),
    wx.removeStorage({
      key: 'key_ty',
    })
    this.common_list();
    this.refresh()
  },
  // 上拉加载数据
  onReachBottom: function () {
    this.refresh();
  },
  /**
   * 用户点击右上角分享
   */

  onShareAppMessage: function (options) {
    var page = this;
    var user_info = wx.getStorageSync("userInfo");
    console.log(user_info)
    return {
      path: "/zh_jdgjb/pages/hotel_list/hotel_list?user_id=" + user_info.id,
      success: function (e) {
        console.log("这个是分享")
        console.log(e)
      }
    };
  },

  common_list: function () {
    this.setData({
      dit: 0,
      diting: true,
      sdowll: false,
      list_hotel: [],
      cate_list: [],
      max_price: 850,
      min_price: 0,
      star_px: -1,
      page: 1,
      hotel: [],
      nearby: 0,
      Recommend: 1,
      sort: 5,
      price_sorting: 0,
      search_value: '', // 清空搜索数据
      list1: "距离优先",
      shop_area: "位置区域",
      price_ranking: '价格排序',
    })
    wx.removeStorage({
      key: 'shop_area',
    })
    wx.removeStorage({
      key: 'district'
    })

    wx.removeStorage({
      key: 'sort'
    })
    wx.removeStorage({
      key: 'lat'
    })
    wx.removeStorage({
      key: 'lng'
    })
    wx.removeStorage({
      key: 'star'
    })
    wx.removeStorage({
      key: 'hotel_type'
    })
    wx.removeStorage({
      key: 'brandlist'
    })
    wx.removeStorage({
      key: 'wifi'
    })
    wx.removeStorage({
      key: 'traffic'
    })
    wx.removeStorage({
      key: 'facilities'
    })
    wx.removeStorage({
      key: 'service'
    })
    wx.removeStorage({
      key: 'zaocan'
    })
    wx.removeStorage({
      key: 'bed'
    })
    wx.removeStorage({
      key: 'score'
    })
    wx.removeStorage({
      key: 'num'
    })
    wx.removeStorage({
      key: 'max_price',
    })
    wx.removeStorage({
      key: 'min_price',
    })
    wx.stopPullDownRefresh();
  },

});