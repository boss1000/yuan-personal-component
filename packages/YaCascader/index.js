/*
 * @title: 级联选择器
 * @Author: xiezhongbin
 * @Date: 2021-03-23 21:45:59
 * @LastEditTime: 2021-03-25 09:27:35
 */
import YaCascader from "./src/index";

/* istanbul ignore next */
YaCascader.install = function(Vue) {
  Vue.component(YaCascader.name, YaCascader);
};

export default YaCascader;
