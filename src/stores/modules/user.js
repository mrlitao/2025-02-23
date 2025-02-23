import { defineStore } from "pinia";
import http from "@/apis/index.js"
import router from "@/routers/index.js"
const useUserStore = defineStore('user', {
  state: () => {
    return {
      userInfo: {}
    }
  },
  actions: {
    setUserInfo(userInfo) {
      this.userInfo = userInfo;
    },
    clearUserInfo() {
      this.userInfo = {};
    },
    loginHandler(params) {
      http.post("/login", params).then(res => {
        const token = res?.data ?? "token"
        // 本地存储 token， 也可以用 cookie
        localStorage.setItem("token", token)
        // 跳转首页
        router.push("/")
      }).finally(() => {
        console.log("??/", { router });
        // 隐藏 loading
        router.replace("/")

      })
    },
    logout() {
      http.post("/logout").then(response => {
        localStorage.removeItem("token")
        router.replace("/login")
      }).finally(() => {
        localStorage.removeItem("token")
        router.replace("/login")
      })
    }
  }
})

export default useUserStore;