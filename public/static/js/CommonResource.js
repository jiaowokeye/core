/**
 * 定义一个CommonResource对象。存放全局变量[为Ajax提交使用]和系统方法。
 */
var CommonResource = {};

CommonResource.IsDebug = true;
/*网站全域名*/
CommonResource.GlobalRootPath = "";
/*权限的ID。*/
CommonResource.GlobalAuthId = null;
/*权限的父ID。*/
CommonResource.GlobalAuthParentId = null;
/*可能存在空值，暂时只考虑为二级菜单使用。*/
CommonResource.GlobalMenuId = null;
/*登录用户显示公司名*/
CommonResource.GlobalLoginUserCompany = "";
/*登录用户显示公司id*/
CommonResource.GlobalLoginUserCompanyId = 0;
/*登录用户地址*/
CommonResource.GlobalLoginUserAddress = "";
/*登录用户名*/
CommonResource.GlobalLoginUserName = "";
/*登录用户帐号*/
CommonResource.GlobalLoginUserAccount = "";
/*登录用户id*/
CommonResource.GlobalLoginUserId = 0;
/*登录用户类型*/
CommonResource.GlobalLoginUserType = 1;
/*是否首次登录 1-是 0-否*/
CommonResource.GlobalIsFirstLogin = 0;
/*登录用户clientid*/
CommonResource.GlobalLoginUserClientId = 0;
/*是否提交状态，避免重复提交*/
CommonResource.IsSubmit = false;
/*轨迹类型名*/
CommonResource.LocationTypeName = null;
/*头像路径*/
CommonResource.GlobalHeadPhotoPath = "";
/*当前所在账套*/
CommonResource.GlobalCurrentBookId = "";
/* 用来表示是否在查看附件图片，用来解决查看附件图片栈溢出 */
CommonResource.InPicCarousel = false;
/**
 * 获取系统的访问基路径。
 *
 * @return 系统的访问基路径。
 */
CommonResource.getBasePath = function (nextLevel, project) {
	var curWwwPath = window.document.location.href;
	var pathName = window.document.location.pathname;
	var pos = curWwwPath.indexOf(pathName);
	var localhostPath = curWwwPath.substring(0, pos);
	var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
	var basePath = "";

	if (typeof (project) != 'undefined') {
		projectName = '/' + project;
	}

	if (!CommonResource.IsDebug) {
		var domainArray = localhostPath.substring(localhostPath.indexOf("://") + 3, localhostPath.length).split(".");
		var domain = domainArray[domainArray.length - 2] + "." + domainArray[domainArray.length - 1];
		var protocol = window.document.location.protocol;

		basePath = protocol + "//" + nextLevel + "." + domain + projectName;

	} else {
		basePath = localhostPath + projectName;
	}

	return basePath;
};




CommonResource.replaceRN2BR = function (str) {
	return str.replace(new RegExp("\r\n", "g"), "<br>").replace(new RegExp("\n", "g"), "<br>");
};

/**
 * 合并两个数据
 * 	返回sourceArray
 */
CommonResource.ConcatArray = function (sourceArray, addArray) {
	if (addArray != null && addArray.length > 0) {
		for (var i = 0; i < addArray.length; i++) {
			sourceArray.push(addArray[i]);
		}
	}
	return sourceArray;
};


/**
 * 是否运算符
 */
CommonResource.isOperator = function (str) {
	var ch = str.charCodeAt();
	if (ch == 40 || ch == 41 || ch == 42 || ch == 43 || ch == 45 || ch == 47 || ch == 37) {
		return true;
	} else {
		return false;
	}
};


/**
 * 安全获取属性
 * 参数数量不限
 * 例：CommonResource.safeProp(json,"signUser","name")
 *   CommonResource.safeProp(json,"signer_date").substring(0,16)
 */
CommonResource.safeProp = function () {
	var result = arguments[0];
	switch (arguments.length) {
		case 0:
		case 1:
			break;
		default:
			for (var i = 0; i < arguments.length - 1; i++) {
				if (result) {
					if (result[arguments[i + 1]] == undefined) {
						result = "";
						break;
					} else {
						result = result[arguments[i + 1]];
					}
				} else {
					break;
				}
			}
			break;
	}
	return result === "" ? "" : result;
}

/**
 * 从str中移除removeStr字符串
 * @param {} str	格式1,2,3,4,5
 * @param {} removeStr	3
 * @return {}	1,2,4,5
 */
CommonResource.removeStrItem = function (str, removeStr) {
	if (str != "") {
		str = "," + str + ",";
		str = str.replaceAll("," + removeStr + ",", ",");
		if (str.length > 1) {
			str = str.substring(1, str.length - 1);
		} else {
			str = "";
		}
	}
	return str;
};
CommonResource.getUrlParam = function (name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]); return null;
}
CommonResource.replaceFromSpace = function (str) {
	var newStr = str.replaceAll('\n', '\\r\\n');
	return newStr;
};
CommonResource.replaceToSpace = function (str) {
	return str.replaceAll(/\\r\\n/g, '<br />');
};
//去处数组中重复值
Array.prototype.distinct = function () {
	var arr = this, o = {}, newArr = [], i, n;
	for (i = 0; i < arr.length; i++) {
		n = arr[i] + typeof (arr[i]);//如果不需要类型判断，直接将后面的去掉即可
		if (typeof (o[n]) === "undefined") {
			newArr[newArr.length] = arr[i];
			o[n] = 1;//缓存
		}
	}
	return newArr;
};

/**
 * 去除对象数组的重复值
 * @param  uniquePropertyname保证唯一的属性名
 */
Array.prototype.unique = function (uniquePropertyname) {
	var res = [], hash = {};
	for (var i = 0, elem; (elem = this[i]) != null; i++) {
		var uniqueProperty = elem[uniquePropertyname];
		if (typeof (uniqueProperty) == "undefined") {
			uniqueProperty = elem.attr(uniquePropertyname);
		}
		if (!hash[uniqueProperty]) {
			res.push(elem);
			hash[uniqueProperty] = true;
		}
	}
	return res;
};

String.prototype.replaceAll = function (reallyDo, replaceWith, ignoreCase) {
	if (!RegExp.prototype.isPrototypeOf(reallyDo)) {
		return this.replace(new RegExp(reallyDo, (ignoreCase ? "gi" : "g")), replaceWith);
	} else {
		return this.replace(reallyDo, replaceWith);
	}
};

String.prototype.endWith = function (str) {
	if (str == null || str == "" || this.length == 0 || str.length > this.length) {
		return false;
	}

	if (this.substring(this.length - str.length) == str) {
		return true;
	} else {
		return false;
	}
};


//删除左右两端的空格
CommonResource.trim = function (str) {
	return str.replace(/(^\s*)|(\s*$)/g, "");
};

/**
 * 获取头像地址
 * @param photo
 * @returns {*}
 */
CommonResource.getHeadPhotoPath = function (photo) {
	if (photo == "" || photo == null) {
		return CommonResource.getBasePath("www") + "/view/images/colleague.png";
	} else {
		return CommonResource.GlobalHeadPhotoPath + photo;
	}
}