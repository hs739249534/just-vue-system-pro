import Vue from "vue";
import router from "../router";
import pkg from "../../package";
import * as types from "../store/mutation-types";
import axios from "axios";
import NProgress from "nprogress";
import { Message } from "ant-design-vue";

NProgress.configure({ showSpinner: false });

const http = {};
const timeout = 20 * 1000;
const baseURL = process.env.BASE_URL;
const beforeHandle = function(config) {
  if (config.headers["anonymous"]) {
    return config;
  } else {
    const access_token = Vue.ls.get(types.ACCESS_TOKEN);
    if (access_token) {
      config.headers["Authorization"] = `Bearer ${access_token}`;
    }
    return config;
  }
};

const afterHandle = function(error) {
  let message = "连接服务器失败";
  if (error && error.response && error.response.status) {
    let status = error.response.status;
    switch (status) {
      case 400:
        message = "网络连接失败，请稍后再试";
        if (
          error.response.data.error &&
          error.response.data.error === "invalid_grant"
        ) {
          message = "用户名或密码错误";
        }
        break;
      case 401:
        message = "未授权，请重新登录";
        router.replace("/401");
        break;
      case 403:
        message = "拒绝访问，请稍后再试";
        break;
      case 404:
        message = "未找到该资源";
        break;
      case 405:
        message = "请求方法未允许";
        break;
      case 406:
        message = error.response.data.message;
        break;
      case 408:
        message = "请求超时，请稍后再试";
        break;
      case 500:
        message = "服务维护中，请稍后再试";
        // router.replace("/401");
        break;
      case 501:
        message = "网络未实现，请稍后再试";
        break;
      case 502:
        message = "网络错误，请稍后再试";
        break;
      case 503:
        message = "服务不可用，请稍后再试";
        break;
      case 504:
        message = "网络超时，请稍后再试";
        break;
      case 505:
        message = "不支持该请求，请稍后再试";
        break;
    }
  }
  return message;
};

const service = axios.create({
  timeout: timeout,
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    "X-Client-Name": "ggfwweb",
    "X-Client-Version": pkg.version
  },
  transformRequest: function(data) {
    return JSON.stringify(data);
  },
  validateStatus: function(status) {
    return status >= 200 && status < 300;
  }
});

service.interceptors.request.use(
  function(config) {
    NProgress.start();
    return beforeHandle(config);
  },
  function(error) {
    NProgress.done();
    return Promise.reject(error);
  }
);
service.interceptors.response.use(
  function(response) {
    NProgress.done();
    return Promise.resolve(response.data);
  },
  function(error) {
    let message = afterHandle(error);
    NProgress.done();
    // Toast(message);
    // Message.error(message);
    return Promise.reject({
      message,
      response: error.response
    });
  }
);

/**
 * POST(JOSN)
 * @param config
 * @returns {AxiosPromise}
 */
http.post = function(config) {
  config.method = "post";
  return service(config);
};

/**
 * DELETE(JOSN)
 * @param config
 * @returns {AxiosPromise}
 */
http.delete = function(config) {
  config.method = "delete";
  return service(config);
};

/**
 * PUT(JOSN)
 * @param config
 * @returns {AxiosPromise}
 */
http.put = function(config) {
  config.method = "put";
  return service(config);
};

/**
 * GET(JSON)
 * @param config
 * @returns {AxiosPromise}
 */
http.get = function(config) {
  config.method = "get";
  return service(config);
};

http.upload = function(config) {
  const uploadService = axios.create({
    timeout: timeout,
    baseURL: baseURL,
    headers: {
      "Content-Type": "multipart/form-data",
      "X-Client-Name": "ggfwweb",
      "X-Client-Version": pkg.version
    },
    transformRequest: function(data) {
      return data;
    },
    validateStatus: function(status) {
      return status >= 200 && status < 300;
    }
  });
  uploadService.interceptors.request.use(
    function(config) {
      return beforeHandle(config);
    },
    function(error) {
      return Promise.reject(error);
    }
  );
  uploadService.interceptors.response.use(
    function(response) {
      return Promise.resolve(response.data);
    },
    function(error) {
      let message = afterHandle(error);
      return Promise.reject({
        message,
        response: error.response
      });
    }
  );
  return uploadService(config);
};

/**
 * Axios
 * @param config
 * @returns {AxiosPromise}
 */
http.request = function(config) {
  return axios(config);
};

export default http;
