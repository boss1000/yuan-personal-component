/*
 * @title: 级联选择器
 * @Author: xiezhongbin
 * @Date: 2021-03-23 21:45:59
 * @LastEditTime: 2021-07-21 14:34:39
 */
import YaTextTooltip from "./src/index";

/* istanbul ignore next */
YaTextTooltip.install = function(Vue) {
  Vue.component(YaTextTooltip.name, YaTextTooltip);
};

export default YaTextTooltip;
