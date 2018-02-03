/**
 *处理时间的js 
 */
/***定义一个json类型的DateUtils对象**/
let DateUtils = {};
DateUtils.now = new Date(); //当前日期
DateUtils.nowDayOfWeek = DateUtils.now.getDay(); //今天本周的第几天
DateUtils.nowDay = DateUtils.now.getDate(); //当前日
DateUtils.nowMonth = DateUtils.now.getMonth(); //当前月
DateUtils.nowYear = DateUtils.now.getYear(); //当前年
DateUtils.nowYear += (DateUtils.nowYear < 2000) ? 1900 : 0;

//小时数组
DateUtils.hours = new Array('00', '01', '02', '03', '04', '05',
	'06', '07', '08', '09', '10', '11',
	'12', '13', '14', '15', '16', '17',
	'18', '19', '20', '21', '22', '23');


/**
 * 拼接小时的下拉列表
 * 
 * 
 * 
 * @param elementID
 * 			元素ID
 * @param defaultValue
 * 			被选中的默认值
 */
DateUtils.appendHourSelect = function (elementID, defaultValue) {
	//容器
	let container = $("#" + elementID);
	//清空容器
	container.empty();

	let length = DateUtils.hours.length;

	for (let i = 0; i < length; i++) {
		let text = DateUtils.hours[i];
		let value = parseInt(text, 10);
		if (value == defaultValue) {
			let optionElement = new Option(text, value, false, true);
			$(optionElement).selected = true;
		} else {
			let optionElement = new Option(text, value);
		}
		//有些浏览器new的时候不好用
		$(optionElement).text(text);
		//放入容器
		container.append(optionElement);
	}

	//赋值
	$(container).val(defaultValue);
};

//分钟数组
DateUtils.minuteArray = new Array('00', '01', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '59');


/**
 * 拼接分钟的下拉列表
 * 
 * 
 * 
 * @param elementID
 * 			元素ID
 * @param defaultValue
 * 			被选中的默认值
 */
DateUtils.appendMinuteSelect = function (elementID, defaultValue) {
	//容器
	let container = $("#" + elementID);
	//清空容器
	container.empty();

	let len = DateUtils.minuteArray.length;

	for (let i = 0; i < len; i++) {
		let tempvalue = DateUtils.minuteArray[i];
		if (tempvalue == defaultValue) {
			let optionElement = new Option(tempvalue, tempvalue, false, true);
			$(optionElement).selected = true;
		} else {
			let optionElement = new Option(tempvalue, tempvalue);
		}
		//有些浏览器new的时候不好用
		$(optionElement).text(tempvalue);
		//放入容器
		container.append(optionElement);
	}

	//赋值
	$(container).val(defaultValue);
};


/**
 * 获取时间的信息
 * 
 * 
 * @param 打卡字符串 900
 */
DateUtils.getHourAndMinute = function (timeStr) {
	let clock_start = parseInt(timeStr, 10);
	let clock_start_hour = Math.floor(clock_start / 100);
	let clock_start_minute = clock_start % 100;
	let minuteStr = "";
	if (clock_start_minute == 0) {
		minuteStr = "00";
	} else if (clock_start_minute < 10) {
		minuteStr = "0" + clock_start_minute;
	} else {
		minuteStr = clock_start_minute + "";
	}
	let hourAndminute = {
		"hour": clock_start_hour,
		"minute": minuteStr
	};

	return hourAndminute;
};

//格式化日期：yyyy-MM-dd
DateUtils.formatDate = function (date) {
	let myyear = date.getFullYear();
	let mymonth = date.getMonth() + 1;
	let myweekday = date.getDate();
	if (mymonth < 10) {
		mymonth = "0" + mymonth;
	}
	if (myweekday < 10) {
		myweekday = "0" + myweekday;
	}
	return (myyear + "-" + mymonth + "-" + myweekday);
}

//获得本周的开始日期
DateUtils.getWeekStartDate = function () {
	let weekStartDate = new Date(DateUtils.nowYear, DateUtils.nowMonth, DateUtils.nowDay - DateUtils.nowDayOfWeek + 1);
	return DateUtils.formatDate(weekStartDate);
}
//获得本周的结束日期
DateUtils.getWeekEndDate = function () {
	let weekEndDate = new Date(DateUtils.nowYear, DateUtils.nowMonth, DateUtils.nowDay + (7 - DateUtils.nowDayOfWeek));
	return DateUtils.formatDate(weekEndDate);
}
//获得上周的开始日期
DateUtils.getLastWeekStartDate = function () {
	let weekStartDate = new Date(DateUtils.nowYear, DateUtils.nowMonth, DateUtils.nowDay - DateUtils.nowDayOfWeek - 6);
	return DateUtils.formatDate(weekStartDate);
}
//获得上周的结束日期
DateUtils.getLastWeekEndDate = function () {
	let weekEndDate = new Date(DateUtils.nowYear, DateUtils.nowMonth, DateUtils.nowDay - DateUtils.nowDayOfWeek);
	return DateUtils.formatDate(weekEndDate);
}
//获得下周的开始日期
DateUtils.getNextWeekStartDate = function () {
	let weekStartDate = new Date(DateUtils.nowYear, DateUtils.nowMonth, DateUtils.nowDay - DateUtils.nowDayOfWeek + 8);
	return DateUtils.formatDate(weekStartDate);
}
//获得下周的结束日期
DateUtils.getNextWeekEndDate = function () {
	let weekEndDate = new Date(DateUtils.nowYear, DateUtils.nowMonth, DateUtils.nowDay - DateUtils.nowDayOfWeek + 14);
	return DateUtils.formatDate(weekEndDate);
}

//获取本月开始日期
DateUtils.getMonthStartDate = function () {
	let monthStartDate = new Date(DateUtils.nowYear, DateUtils.nowMonth, 1);
	return DateUtils.formatDate(monthStartDate);
}

//获取月最后一天
DateUtils.getMonthEndDate = function (date) {
	let new_year = date.split("-")[0];  //取当前的年份   
	let new_month = parseInt(date.split("-")[1]);//取下一个月的第一天，方便计算（最后一天不固定）   

	if (new_month > 12)      //如果当前大于12月，则年份转到下一年   
	{
		new_month -= 12;    //月份减   
		new_year++;      //年份增   
	}
	let new_date = new Date(new_year, new_month, 1);        //取当年当月中的第一天   
	return DateUtils.formatDate((new Date(new_date.getTime() - 1000 * 60 * 60 * 24)));//获取当月最后一天日期

}

//传递日期上几个月
DateUtils.getLastMonthEndDate = function (month, num) {
	let dt = new Date(month.split("-")[0], month.split("-")[1], 1);
	dt.setMonth(dt.getMonth() - num - 1);
	y = dt.getFullYear();
	m = dt.getMonth() + 1;
	m = m < 10 ? '0' + m : m;
	s = y + "-" + m
	return s;
}

//日期字符串
DateUtils.AddDateStr = function (AddDayCount) {
	let dd = new Date();
	dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期 

	return DateUtils.formatDate(dd);
}
/**
 *获取与指定日期相差的天数
 *@param date_str 日期字符串,date_str为空<"">取当前日期 
 * @param dayCount 天数
 */
DateUtils.getDefinedDate = function (date_str, dayCount) {
	let dateObj = new Date();
	if (date_str != "undefined" && date_str.length > 0) {
		let date_arr = date_str.split("-");
		let year = parseInt(date_arr[0], 10);
		let month = parseInt(date_arr[1], 10);
		let day = parseInt(date_arr[2], 10);
		dateObj = new Date(year, month - 1, day);
	}
	dateObj.setDate(dateObj.getDate() + dayCount);
	return DateUtils.formatDate(dateObj);
}

//获得当前星期几
DateUtils.getWeekString = function (date) {
	let xq = "";
	let time = new Date(date);//创建一个表示当前日期和时间的对象nowtime 
	let getday = time.getDay();

	switch (getday) {
		case 0:
			xq = "周日";
			break;
		case 1:
			xq = "周一";
			break;
		case 2:
			xq = "周二";
			break;
		case 3:
			xq = "周三";
			break;
		case 4:
			xq = "周四";
			break;
		case 5:
			xq = "周五";
			break;
		case 6:
			xq = "周六";
			break;
	}
	return xq;
}

/**
 * 日期比较(格式 "yyyy-MM-dd")
 * 
 * @param startDate
 * @param endDate
 * @return 1-第一个大 0-相等 -1-第二个大
 */
DateUtils.compareDate = function (startDate, endDate) {
	let startDateStr = startDate.replaceAll("-", "");
	let endDateStr = endDate.replaceAll("-", "");

	let intStart = parseInt(startDateStr, 10);
	let intEnd = parseInt(endDateStr, 10);

	let result = intStart - intEnd;

	if (result > 0) {
		return 1;
	} else if (result == 0) {
		return 0;
	} else {
		return -1;
	}
}

/**
 * 比较两个日期相差多少天
 * 
 * 
 * @param strDateStart
 * 			开始时间
 * @param strDateEnd
 * 			结束时间
 */
DateUtils.getDateScope = function (strDateStart, strDateEnd) {
	let strSeparator = "-"; //日期分隔符
	let oDate1;
	let oDate2;
	let iDays;
	oDate1 = strDateStart.split(strSeparator);
	oDate2 = strDateEnd.split(strSeparator);
	let strDateS = new Date(oDate1[0], oDate1[1] - 1, oDate1[2]);
	let strDateE = new Date(oDate2[0], oDate2[1] - 1, oDate2[2]);
	iDays = parseInt(Math.abs(strDateS - strDateE) / 1000 / 60 / 60 / 24)//把相差的毫秒数转换为天数 

	return iDays + 1;
};


DateUtils.getLocalTime = function (nS) {
	return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
}

export default DateUtils;