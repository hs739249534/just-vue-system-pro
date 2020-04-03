import http from "../utils/http";
import string from "../utils/string";

/**
 * 公共服务——登录
 */
const login = params => {
  return http.post({
    url: "ggfw/open/oauth/token",
    params
  });
};

/**
 * 公共服务——快速登录
 */
const fastLogin = params => {
  return http.post({
    url: "ggfw/open/oauth/token",
    params: {
      grant_type: "password",
      client_id: "ggfwweb",
      client_secret: "neuqggfw",
      username: string.trim(params.username),
      password: string.md5(params.password)
    }
  });
};

/**
 * 公共服务——登录（社保卡服务密码）
 */
const loginForSBK = params => {
  return http.post({
    url: "ggfw/open/oauth/token",
    params: {
      grant_type: "password",
      client_id: "ggfwweb",
      client_secret: "neuqggfw",
      source: "sbk",
      mode: "uas",
      username: string.trim(params.username),
      password: string.trim(params.password)
    }
  });
};

/**
 * 公共服务——个人信息
 */
const getUser = () => {
  // 公共服务用户
  // return http.get.auth({url: 'ggfw/api/jcxx/user/userinfo'})
  // 社保卡用户
  return http.get({ url: "ggfw/api/jcxx/user/getsbkinfo" });
};

/**
 * 公共服务——代码项——AA10
 */
const getAA10 = () => {
  return http.get({
    url: "ggfw/api/jcxx/code/aa10"
  });
};

/**
 * 公共服务——社会保障——社保账户四合一（除工伤）
 */
const getSHBZ = () => {
  return http.get({ url: "ggfw/api/shbz/v3/cover/query" });
};

export { login, loginForSBK, fastLogin, getUser, getAA10, getSHBZ };
