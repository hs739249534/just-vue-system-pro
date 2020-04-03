import Vue from "vue";
import VueRouter from "vue-router";
import NProgress from "nprogress";
import * as types from "../store/mutation-types";

NProgress.configure({ showSpinner: false });

Vue.use(VueRouter);

const systemRoutes = [
  {
    path: "/login",
    name: "login",
    meta: {},
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/login/Login.vue")
  },
  {
    path: "/change-password",
    name: "change-password",
    meta: {},
    component: () =>
      import(
        /* webpackChunkName: "login" */ "../views/login/ChangePassword.vue"
      )
  },
  {
    path: "/401",
    name: "401",
    meta: {},
    component: () =>
      import(/* webpackChunkName: "exception" */ "../views/exception/401.vue")
  }
];

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
    name: "root",
    meta: {
      requiresAuth: true
    },
    component: () =>
      import(/* webpackChunkName: "layout" */ "../views/layout/Layout.vue"),
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        meta: { name: "菜单管理", icon: "desktop" },
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ "../views/dashboard/Dashboard.vue"
          )
      }
      // {
      //   path: "/global-setting",
      //   name: "global-setting",
      //   meta: { name: "全局设置", icon: "setting" },
      //   component: () =>
      //     import(
      //       /* webpackChunkName: "global-setting" */ "../views/dashboard/GlobalSetting.vue"
      //     )
      // }
    ]
  }
];

function genMenus(routes) {
  let menus = [];
  for (let i in routes) {
    const route = routes[i];
    if (route.children && route.children.length > 0) {
      menus.push({
        name: route.meta.name,
        path: route.path,
        icon: route.meta.icon,
        subMenus: genMenus(route.children)
      });
    } else {
      menus.push({
        name: route.meta.name,
        path: route.path,
        icon: route.meta.icon
      });
    }
  }
  return menus;
}

const router = new VueRouter({
  // mode: "history",
  base: process.env.BASE_URL,
  routes: systemRoutes.concat(routes)
});

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const requiresAuth = Vue.ls.get(types.ACCESS_TOKEN);
    if (requiresAuth) {
      next();
    } else {
      next({
        path: "/login",
        query: {
          redirect: to.fullPath
        }
      });
    }
  } else {
    next();
  }
});

router.afterEach(() => {
  NProgress.done();
});

export const menus = genMenus(routes);
export const title = "智能问答机器人控制台";
export default router;
