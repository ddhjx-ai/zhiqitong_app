import axios from "axios";
import Vue from "vue";
import router from "@/router";
import config from "@/config";
import store from "@/store";

import { Indicator, Toast } from "mint-ui";

//登录成功后记得把token存在cookie里边。
//token统一在请求头里边传过去了。

/**
 **上传接口**
 **/
const newAxios = axios.create({
  transformRequest: [
    data => {
      return data;
    }
  ]
});

export const httpImgUpload = (params, callback = () => {}) => {
  axios.defaults.baseURL = process.env.VUE_APP_BASE_API;
  return newAxios({
    url: "/erp/admin/uploadFile",
    // url: API[url],
    method: "post",
    headers: { "Content-Type": "multipart/form-data"/* , uid: 88, eid: 77  */},
    onUploadProgress: function(progressEvent) {
      //原生获取上传进度的事件
      if (progressEvent.lengthComputable) {
        //属性lengthComputable主要表明总共需要完成的工作量和已经完成的工作是否可以被测量
        //如果lengthComputable为false，就获取不到progressEvent.total和progressEvent.loaded
        callback(progressEvent);
      }
    },
    data: params
  });
};

export const httpGet = ({ url, params, headers = {} }) => {
  var token = store.state.token;
  return axios({
    url: url,
    params: params,
    method: "get",
    headers: {
      /* uid: window.localStorage.getItem("app_uid"),
      eid: window.localStorage.getItem("app_eid"), */
      uid:86,
      eid:77,
      "key-token": window.localStorage.getItem("app_token") || "",
      ...headers
    }
  });
};

export const httpPost = ({
  url,
  data,
  headers = {},
  doTransformRequest = true
}) => {
  return axios({
    url: url,
    method: "post",
    data: data,
    headers: {
      /* uid: window.localStorage.getItem("app_uid"),
      eid: window.localStorage.getItem("app_eid"), */
      uid:86,
      eid:77,
      "key-token": window.localStorage.getItem("app_token") || "",
      ...headers
    },
    transformRequest: [
      data => {
        return doTransformRequest ? JSON.stringify(data) : data;
      }
    ]
  });
};

export const httpPostJSON = (
  url,
  data,
  headers = {},
  doTransformRequest = true
) => {
  return axios({
    url: url,
    method: "post",
    data: data,
    headers: {
      uid: window.localStorage.getItem("app_uid"),
      eid: window.localStorage.getItem("app_eid"),
      "key-token": window.localStorage.getItem("app_token") || "",
      "Content-Type": "application/x-www-form-urlencoded",
      ...headers
    },
    transformRequest: [
      data =>
        Object.entries(data)
          .map(current => current.join("="))
          .join("&")
    ]
  });
};

axios.defaults.baseURL = process.env.VUE_APP_BASE_API;
axios.defaults.headers["Content-Type"] = "application/json";
axios.defaults.timeout = 20000;
// request拦截器
axios.interceptors.request.use(
  function(config) {
    Indicator.open();
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);
// response拦截器
axios.interceptors.response.use(
  response => {
    Indicator.close();
    if (response.data && +response.data.returnCode === 1009) {
      // 401, token失效
      return response.data;
    }
    return response.data;
  },
  error => {
    const isTimeout = error.toString().indexOf("timeout") > -1;
    Indicator.close();
    if (isTimeout) {
      // alert('请求超时');
      Toast("请求超时");
    }
    if (error) {
      Toast(error);
    }
  }
);
