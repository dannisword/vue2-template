import Vue from "vue";
import App from "./App.vue";
import locale from "element-ui/lib/locale/lang/zh-TW";
import config from "@/../package.json";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "element-ui/lib/theme-chalk/display.css";
import "@/styles/index.scss"; // global css

import router from "./router/index";
import store from "./store/index";

import "@/icons";
import "@/permission";

Vue.use(ElementUI, { locale });
// 讀取版本號
Vue.prototype.__version = `${config.version}-${process.env.VUE_APP_GIT_COMMIT}`;
Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  store,
  render: (h) => h(App),
});
