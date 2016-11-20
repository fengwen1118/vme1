/**
 * Created by Administrator on 2016/1/14.
 */
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
$(function(){
   $(document).height($('.indlady').height());
})

function dateTimeToString(date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    var h = date.getHours();
    var mi = date.getMinutes();
    var s = date.getSeconds();
    return y + '-' + (m < 10 ? ('0' + m) : m) + '-' + (d < 10 ? ('0' + d) : d)
        + ' ' + (h < 10 ? ('0' + h) : h) + ':'
        + (mi < 10 ? ('0' + mi) : mi) + ':' + (s < 10 ? ('0' + s) : s);
};

//时间转换
function dateToString(date) {
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	var d = date.getDate();
	return y + '-' + (m < 10 ? ('0' + m) : m) + '-' + (d < 10 ? ('0' + d) : d);
};
function dateTimeToString(date) {
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	var d = date.getDate();
	var h = date.getHours();
	var mi = date.getMinutes();
	var s = date.getSeconds();
	return y + '-' + (m < 10 ? ('0' + m) : m) + '-' + (d < 10 ? ('0' + d) : d)
			+ ' ' + (h < 10 ? ('0' + h) : h) + ':'
			+ (mi < 10 ? ('0' + mi) : mi) + ':' + (s < 10 ? ('0' + s) : s);
};
function StringToDate(DateStr)
{
	var converted = Date.parse(DateStr);
	var myDate = new Date(converted);
	if (isNaN(myDate))
	{
		var arys= DateStr.split('-');
		myDate = new Date(arys[0],--arys[1],arys[2]);
	}
	return dateToString(myDate);
}


/*
 * 格式化时间 @param v @returns {String}
 */
function fromatDate(v) {
	var now = new Date(v);
	var year = now.getFullYear();
	var month = now.getMonth() + 1;
	if (month < 10) {
		month = "0" + month;
	}
	var date = now.getDate();
	if (date < 10) {
		date = "0" + date;
	}
	var hour = now.getHours();
	if (hour < 10) {
		hour = "0" + hour;
	}
	var minute = now.getMinutes();
	if (minute < 10) {
		minute = "0" + minute;
	}
	var second = now.getSeconds();
	if (second < 10) {
		second = "0" + second;
	}
	return year + "-" + month + "-" + date;
}