import axios from "axios"
import { ElMessage } from "element-plus";
import router from "@/routers/index.js"
import { LOGIN_PATH } from "@/platform-config/index.js"
console.log({ env: import.meta.env });

const service = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000
})

service.interceptors.request.use(
  config => {
    console.log({ config });
    const token = localStorage.getItem("token")
    if (token) {
      config.headers["Authorization"] = "Bearer " + token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data
    console.log({ res });
    switch (res.code) {
      case 200:
        return res
      case 401:
        router.push(LOGIN_PATH)
        break;
      default:
        // 请求不成功时，此处全局处理一下错误信息
        ElMessage.error(res.message)
        return Promise.reject(new Error(res.message || 'Error'))
    }

  },
  error => {
    console.log("Error Cause", error, error.cause);
    const { response, message } = error;
    // 请求超时 && 网络错误单独判断，没有 response
    if (message && message.indexOf("timeout") !== -1) ElMessage.error("请求超时！请您稍后重试");
    if (message && message.indexOf("Network Error") !== -1) ElMessage.error("网络错误！请您稍后重试");
    // 根据服务器响应的错误状态码，做不同的处理

    // 服务器结果都没有返回(可能服务器错误可能客户端断网)，断网处理:可以跳转到断网页面
    // if (!window.navigator.onLine) router.replace("/500").then();
    console.log("??");
    return Promise.reject(error);
  }
)

export default service;