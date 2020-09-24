<template>
  <div id="app">
    <a-config-provider :locale="zhCN">
      <router-view />
    </a-config-provider>
  </div>
</template>

<script>
import pkg from "../package";
import http from "./utils/http";
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";

export default {
  name: "app",
  data() {
    return { zhCN };
  },
  created() {
    this.getConfig();
  },
  methods: {
    getConfig() {
      http
        .get({
          url: "./static-ggfw-dashboard/config.json"
        })
        .then(res => {
          this.log(res);
          this.$ls.set("CONFIG", res);
          document.title = `${res.copyright}${res.title} v${pkg.version}`;
        });
    }
  }
};
</script>

<style lang="less">
@import "assets/less/common";
@import "~normalize.css";
@import "~nprogress/nprogress.css";

html,
body {
  width: 100%;
  height: 100%;
}

#app {
  width: 100%;
  height: 100%;
}

#app:before {
  content: "";
  display: table;
}
</style>
