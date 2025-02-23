import { createRouter, createWebHashHistory } from "vue-router";
import { HOME_PATH, LOGIN_PATH } from "@/platform-config/index"
const routes = [
  {
    path: "/",
    redirect: HOME_PATH
  },
  {
    path: LOGIN_PATH,
    name: "Login",
    component: () => import("../views/login/index.vue"),
  },
  {
    path: "/users",
    name: "Users",
    component: () => import("../views/users/index.vue"),
  },
  
];
const router = new createRouter({
  history: createWebHashHistory(),
  routes,
});

export const resetRouter = () => {
  router.matcher = new createRouter({
    history: createWebHashHistory(),
    routes,
  }).matcher;
};

const WHITE_LIST = [LOGIN_PATH];

router.beforeEach((to, from, next) => {
  // 白名单
  if (to?.path && WHITE_LIST.includes(to.path)) {
    next();
    return
  }
  // 路由守卫此处校验
  next();
})

export default router;