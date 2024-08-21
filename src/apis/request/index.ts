import axios from "axios";
import { ElMessage } from "element-plus";
import "element-plus/theme-chalk/el-message.css";
import router from "@/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useUserStore } from "@/stores";

const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API, // 开发环境就是xxxxxx，生产环境就是xxx
  timeout: 5000,
});
request.interceptors.request.use(
  (config) => {
    console.log(config);

    NProgress.start();
    //   config = config || {};
    if (config.headers["Content-Type"] == undefined) {
      config.headers["Content-Type"] = "application/json;charset=utf-8";
    }
    //   const user = JSON.parse(localStorage.getItem('user') || '{}') as UserInfo;
    //   console.log(user);
    //   if (user) {
    //     config.headers.token = user.token // 设置请求头
    //   }
    if (sessionStorage.getItem("token")) {
      // config.headers.token = JSON.parse(localStorage.getItem("token")!).token;
      config.headers["Authorization"] =
        "Bearer " + JSON.parse(sessionStorage.getItem("token")!).token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response 拦截器
// 可以在接口响应后统一处理结果
request.interceptors.response.use(
  async (response) => {
    NProgress.done();
    let res = response.data;
    // 如果是返回的文件
    if (response.config.responseType === "blob") {
      return res;
    }
    // 兼容服务端返回的字符串数据
    if (typeof res === "string") {
      res = res ? JSON.parse(res) : res;
    }
    if (res.code == "401") {
      await useUserStore().toLogin();
      ElMessage.error(res.msg);
      const resp = await request(response.config);
      return resp;
    }
    return res;
  },
  (error) => {
    console.log("err" + error); // for debug
    return Promise.reject(error);
  }
);

export default request;
