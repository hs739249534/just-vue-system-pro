import Vue from "vue";
import App from "./App.vue";
import VueStorage from "vue-ls";
import router from "./router";
import store from "./store";
import VueClipboard from "vue-clipboard2";
import "./mixins";
import "./filters";
import "./components";

Vue.use(VueClipboard);
Vue.use(VueStorage, {
  namespace: "just__",
  name: "ls",
  storage: "session"
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
