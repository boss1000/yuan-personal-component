/*
 * @title: 级联选择器
 * @Author: xiezhongbin
 * @Date: 2021-03-23 21:45:59
 * @LastEditTime: 2021-07-23 09:16:46
 */
import YaSvgIcon from "./src/index";

/* istanbul ignore next */
YaSvgIcon.install = function(Vue) {
  Vue.component(YaSvgIcon.name, YaSvgIcon);
};

export default YaSvgIcon;
