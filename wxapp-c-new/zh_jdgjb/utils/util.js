var formatTime = function(t) {
    var e = t.getFullYear(),
      r = t.getMonth() + 1,
      o = t.getDate(),
      m = t.getHours(),
      a = t.getMinutes(),
      n = t.getSeconds();
    return [e, r, o].map(formatNumber).join("/") + " " + [m, a, n].map(formatNumber).join(":");
  },
  formatNumber = function(t) {
    return (t = t.toString())[1] ? t : "0" + t;
  };

//获得两个日期之间相差的天数

function getDays(date1, date2) {

  var date1Str = date1.split("-"); //将日期字符串分隔为数组,数组元素分别为年.月.日
  console.log(date1Str)
  //根据年 . 月 . 日的值创建Date对象

  var date1Obj = new Date(date1Str[0], (date1Str[1] - 1), date1Str[2]);

  var date2Str = date2.split("-");
  console.log(date2Str)
  var date2Obj = new Date(date2Str[0], (date2Str[1] - 1), date2Str[2]);
  console.log(date2Obj)
  var t1 = date1Obj.getTime();

  var t2 = date2Obj.getTime();
  console.log(t2)
  var dateTime = 1000 * 60 * 60 * 24; //每一天的毫秒数
  var minusDays = Math.floor(((t2 - t1) / dateTime)); //计算出两个日期的天数差
  console.log(minusDays)
  var days = Math.abs(minusDays); //取绝对值
  return days;

}

function checkDate(date) {
  //使用正则表达式去判断日期格式是否正确
  var regExp = /^([1][7-9][0-9][0-9]|[2][0][0-9][0-9])(\-)([0][1-9]|[1][0-2])(\-)([0-2][1-9]|[3][0-1])$/g;
  if (regExp.test(date)) {
    return true;
  } else {
    return false;
  }
}

function getCode(_this, num) {
  _this.setData({
    isShow: true //按钮1隐藏，按钮2显示
  })
  var remain = num;
  //用另外一个变量来操作秒数是为了保存最初定义的倒计时秒数，就不用在计时完之后再手动设置秒数
  var time = setInterval(function() {
    if (remain <= 1) {
      clearInterval(time);
      _this.setData({
        isShow: false,
      })
      remain = 10;
      return false
      //必须有
    }
    remain--;
    console.log(remain)
    _this.setData({
      remain: remain
    })
  }, 1000)
}


function cutstr(str, len) {
  var str_length = 0;
  var str_cut;
  var str_len = 0;
  var a;
  str_cut = new String();
  str_len = str.length;
  for (var i = 0; i < str_len; i++) {
    a = str.charAt(i);
    str_length++;
    if (escape(a).length > 4) {
      //中文字符的长度经编码之后大于4  
      str_length++;
    }
    str_cut = str_cut.concat(a);
    if (str_length >= len) {
      str_cut = str_cut.concat("...");
      return str_cut;
    }
  }
  //如果给定字符串小于指定长度，则返回源字符串；  
  if (str_length < len) {
    return str;
  }
}




module.exports = {

  formatTime: formatTime,
  getDays: getDays,
  getCode: getCode,
  cutstr: cutstr,

}