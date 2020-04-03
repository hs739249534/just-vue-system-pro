import Vue from "vue";
import debug from "../utils/debug";

debug.init();

Vue.mixin({
  data() {
    return {
      baseUrl: process.env.BASE_URL
    };
  },
  directives: {},
  methods: {
    log(...msg) {
      debug.log(...msg);
    }
  }
});
