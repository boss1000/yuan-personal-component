/*
 * @title: 文件内容名称
 * @Author: xiezhongbin
 * @Date: 2021-03-23 21:45:59
 * @LastEditTime: 2021-08-23 17:32:26
 */
import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
// 本地开发组件库调试
// import ui from "../lib";
import "../lib/themes/index.css";
import All from "../packages";
Vue.use(ElementUI);
Vue.use(All);
// 打包发布测试
// import UI from '../lib'
// Vue.use(UI);
// import { Button } from '../lib'
// Vue.use(Button)
Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
