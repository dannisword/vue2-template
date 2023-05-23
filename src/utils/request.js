import axios from "axios";
import { Message } from "element-ui";
import { getToken } from "./localStorage";
import router from "@/router";

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 100000,
});

function parseBody(response) {
  if (response.status === 200) {
    return response.data;
  } else {
    return this.parseError(response.data.messages);
  }
}
/**
 * 處理 response status code
 * @param {*} response
 * @returns
 */
function parseError(response) {
  if (response == undefined) {
    Message({
      message: "發生非預期錯誤！",
      type: "error",
      duration: 0,
      showClose: true,
    });
    return;
  }
  // token 驗證
  if (response.status == 403) {
    router.push("/login");
    return;
  }
  
  if (response.status == 404 || response.status == 400) {
    Message({
      message:
        response.data.message == null
          ? "發生非預期錯誤！"
          : response.data.message,
      type: "warning",
      duration: 0,
      showClose: true,
    });
    return;
  }
  if (response.status == 500) {
    Message({
      message: `服務錯誤，請聯繫管理員!`,
      type: "warning",
      duration: 5000,
      showClose: true,
    });
    return;
  }
  // error
  if (response.data) {
    Message({
      message:
        response.data.message == null ? "未知錯誤訊息" : response.data.message,
      type: "error",
      duration: 0,
      showClose: true,
    });
  } else {
    return Promise.reject({ messages: ["發生了錯誤"] });
  }
}

// request interceptor
service.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token !== null) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  (error) => {
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  (response) => {
    return parseBody(response);
  },
  (error) => {
    parseError(error.response);
    return Promise.reject(error);
  }
);

export default service;
