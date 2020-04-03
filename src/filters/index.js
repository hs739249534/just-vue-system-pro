import Vue from "vue";
import moment from "moment";

Vue.filter("dateTimeFormat", val => {
  if (!val) return "";
  return moment(val, "YYYYMMDDHHmmss").format("YYYY-MM-DD HH:mm:ss");
});

Vue.filter("dateFormat", val => {
  if (!val) return "";
  return moment(val, "YYYYMMDD").format("YYYY[年]MM[月]DD[日]");
});

Vue.filter("timeFormat", val => {
  if (!val) return "";
  return moment(val, "HHmmss").format("HH:mm");
});

Vue.filter("mealTimeIntervalFormat", val => {
  switch (val) {
    case "T1":
      return "早餐";
    case "T2":
      return "午餐";
    case "T3":
      return "晚餐";
    case "T4":
      return "下午茶";
    default:
      return "";
  }
});

Vue.filter("payStateFormat", val => {
  switch (val) {
    case "03":
      return "已支付";
    default:
      return "未支付";
  }
});

Vue.filter("payChannelFormat", val => {
  switch (val) {
    case "102":
      return "微信支付";
    case "000":
      return "记账支付";
    default:
      return "未知支付方式";
  }
});

Vue.filter("dailyFormat", val => {
  switch (val) {
    case "02":
      return "工作日";
    case "03":
      return "自然日";
    default:
      return "";
  }
});

Vue.filter("trainMode", val => {
  val = parseInt(val);
  switch (val) {
    case 1:
      return "分类训练";
    case 2:
      return "合并训练";
    default:
      return "未知训练方式，请咨询管理员";
  }
});
