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
    redirect: "/msgMgt/msgList",
    name: "root",
    meta: {
      requiresAuth: true
    },
    component: () =>
      import(/* webpackChunkName: "layout" */ "../views/layout/Layout.vue"),
    children: [
      {
        path: "/msgMgt",
        name: "msgMgt",
        meta: { name: "消息管理", icon: "message", disabled: true },
        component: () =>
          import(
            /* webpackChunkName: "layout" */ "../views/msgmgt/MsgLayout.vue"
          ),
        children: [
          {
            path: "/msgMgt/msgList",
            name: "msgMgt-msgList",
            meta: { name: "消息列表", icon: "message", disabled: true },
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ "../views/msgmgt/MsgList.vue"
              )
          },
          {
            path: "/msgMgt/msgTemplate",
            name: "msgMgt-msgTemplate",
            meta: { name: "消息模板管理", icon: "message", disabled: true },
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ "../views/msgmgt/MsgTemplate.vue"
              )
          },
          {
            path: "/msgMgt/newMsg",
            name: "msgMgt-newMsg",
            meta: { name: "新建消息", icon: "message", disabled: false },
            component: () =>
              import(
                /* webpackChunkName: "exception" */ "../views/msgmgt/newmsg/NewMsg"
              )
          },
          {
            path: "/msgMgt/newTemplate",
            name: "msgMgt-newTemplate",
            meta: { name: "新建模板", icon: "message", disabled: false },
            component: () =>
              import(
                /* webpackChunkName: "exception" */ "../views/msgmgt/newtemplate/Index"
              )
          }
        ]
      },
      {
        path: "/dashboard",
        name: "dashboard",
        meta: { name: "菜单管理", icon: "table", disabled: true },
        component: () =>
          import(
            /* webpackChunkName: "layout" */ "../views/dashboard/DashLayout.vue"
          ),
        children: [
          {
            path: "/dashboard/appList",
            name: "dashboard-appList",
            meta: { name: "APP菜单列表", icon: "table", disabled: true },
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ "../views/dashboard/Applist.vue"
              )
          },
          {
            path: "/dashboard/webList",
            name: "dashboard-webList",
            meta: { name: "网站菜单列表", icon: "table", disabled: true },
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ "../views/dashboard/WebList.vue"
              )
          },
          {
            path: "/dashboard/dashboard",
            name: "dashboard-dashboard",
            meta: { name: "dashboard", icon: "table", disabled: true },
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ "../views/dashboard/Dashboard.vue"
              )
          }
        ]
      }
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
        disabled: route.meta.disabled,
        subMenus: genMenus(route.children)
      });
    } else {
      menus.push({
        name: route.meta.name,
        path: route.path,
        icon: route.meta.icon,
        disabled: route.meta.disabled
      });
    }
  }
  console.log("menus", menus);
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
