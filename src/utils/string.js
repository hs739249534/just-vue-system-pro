import uuid from "uuid-js";
import md5 from "js-md5";
import moment from "moment";
import numeral from "numeral";

const string = {};

string.md5 = function(str) {
  str = str.trim();
  return md5(str).toUpperCase();
};

string.trim = function(str) {
  return (str = str.trim());
};

string.numberFix = function(str, fix = 2) {
  if (!str) return "0.00";
  return parseFloat(str).toFixed(fix);
};

string.dateStrToChs = function(dateFormat, dateStr) {
  if (!dateStr) {
    return "";
  } else {
    var tmp = dateStr + "";
    switch (dateFormat) {
      case "YYYY":
        return tmp.substring(0, 4) + "年";
      case "YYYYMM":
        return tmp.substring(0, 4) + "年" + tmp.substring(4, 6) + "月";
      case "YYYYMMDD":
        return (
          tmp.substring(0, 4) +
          "年" +
          tmp.substring(4, 6) +
          "月" +
          tmp.substring(6, 8) +
          "日"
        );
    }
  }
};

string.dateStrToFormat = function(dateFormat, dateStr) {
  if (!dateStr) {
    return "";
  } else {
    var tmp = dateStr + "";
    switch (dateFormat) {
      case "YYYY":
        return tmp.substring(0, 4) + "-";
      case "YYYYMM":
        return tmp.substring(0, 4) + "-" + tmp.substring(4, 6);
      case "YYYYMMDD":
        return (
          tmp.substring(0, 4) +
          "-" +
          tmp.substring(4, 6) +
          "-" +
          tmp.substring(6, 8)
        );
    }
  }
};

string.msToDate = function(dateFormat, ms) {
  if (ms) {
    return moment(ms).format(dateFormat);
  } else {
    return "";
  }
};

string.hiddenIdCard = function(idCard) {
  if (!idCard) return "";
  idCard = idCard.trim();
  // 公共服务掩码规则
  // return idCard.slice(0, 12) + '******'
  // 支付宝掩码规则
  // return "**************" + idCard.substr(14, 4)
  return "******" + idCard.substr(14, 4);
};

string.isChineseName = function(value) {
  // 验证姓名是不是中文
  let reg = /[\u4e00-\u9fa5]{2,}/;
  return reg.test(value);
};

string.isIdCard = function(value) {
  // 验证身份证号
  let reg18 = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
  // let reg15 = /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$/
  return reg18.test(value);
};

string.hiddenName = function(name) {
  if (!name) return "";
  name = name.trim();
  // 公共服务掩码规则
  // return name.slice(0, 1) + '**'
  // 支付宝掩码规则
  return name;
};

string.hiddenSiCard = function(siCard) {
  if (!siCard) return "";
  siCard = siCard.trim();
  // 支付宝掩码规则
  return siCard.substr(0, 1) + "****" + siCard.substr(5, siCard.length - 5);
};

string.uuid = function() {
  return uuid
    .create()
    .toString()
    .replace(/-/g, "");
};

string.str2b64 = function(str) {
  return window.btoa(unescape(encodeURIComponent(str)));
};

string.b642str = function(b64) {
  return decodeURIComponent(escape(window.atob(b64)));
};

string.isGt = function(str, number) {
  const reg = /^[1-9]\d{0,}$/;
  if (reg.test(str)) {
    const val = numeral(str).value();
    if (val > number) {
      return true;
    }
  }
};

export default string;
