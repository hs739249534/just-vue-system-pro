<template>
  <a-layout class="layout">
    <a-layout-sider :trigger="null" collapsible v-model="collapsed">
      <div class="logo" :class="{ 'logo-collapsed': collapsed }">
        <img :src="logo" /><span v-if="!collapsed">{{ title }}</span>
      </div>
      <a-menu
        theme="dark"
        mode="inline"
        :defaultSelectedKeys="[active]"
        :selectedKeys="[active]"
      >
        <template v-for="i in menus">
          <a-sub-menu v-if="i.subMenus && i.subMenus.length > 0" :key="i.name">
            <span slot="title"
              ><a-icon :type="i.icon" /><span>{{ i.name }}</span></span
            >
            <a-menu-item
              v-for="j in i.subMenus"
              :key="j.name"
              @click="goto(j.path)"
              v-show="j.disabled"
            >
              <span>{{ j.name }}</span>
            </a-menu-item>
          </a-sub-menu>
          <a-menu-item v-else :key="i.name" @click="goto(i.path)">
            <a-icon :type="i.icon" />
            <span>{{ i.name }}</span>
          </a-menu-item>
        </template>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="header">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        />
        <a-popover trigger="click">
          <a-avatar
            v-if="user"
            class="avatar"
            shape="square"
            size="large"
            :style="{ backgroundColor: color, verticalAlign: 'middle' }"
            >{{ user }}
          </a-avatar>
          <div slot="content">
            <div @click="changePassword" style="cursor: pointer">修改密码</div>
            <a-divider style="margin: 10px 0;" />
            <div @click="exit" style="cursor: pointer">注销登录</div>
          </div>
        </a-popover>
      </a-layout-header>
      <a-layout-content class="content">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import random from "lodash/random";
import { menus } from "../../router";

const colorList = ["#f56a00", "#7265e6", "#ffbf00", "#00a2ae"];
let color = colorList[random(0, 3)];

export default {
  name: "Layout",
  data() {
    return {
      menus: menus[0].subMenus,
      collapsed: false,
      color,
      visible: false
    };
  },
  computed: {
    title() {
      return this.$ls.get("CONFIG").title;
    },
    logo() {
      return this.$ls.get("CONFIG").logo;
    },
    active() {
      this.log("current active", this.$route.meta.name);
      return this.$route.meta.name;
    },
    user() {
      const user = this.$ls.get("user");
      this.log("current user", user);
      if (user) {
        return user.username;
      } else {
        return "";
      }
    }
  },
  mounted() {
    this.log("current menus", this.menus);
  },
  methods: {
    goto(path) {
      this.log("current page", path);
      if (this.$route.path === path) {
        return;
      }
      this.$router.push({
        path: path
      });
    },
    changePassword() {
      this.visible = false;
      this.$router.push("/change-password");
    },
    exit() {
      this.visible = false;
      this.$ls.remove("user");
      this.$ls.remove("access_token");
      this.$router.push("/login");
    }
  }
};
</script>

<style lang="less" scoped>
@import "layout";
</style>
