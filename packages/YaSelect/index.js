/*
 * @title: 文件内容名称
 * @Author: xiezhongbin
 * @Date: 2021-04-15 11:05:13
 * @LastEditTime: 2021-04-15 11:21:52
 */
import Select from "./src/select";

/* istanbul ignore next */
Select.install = function(Vue) {
  Vue.component("YaSelect", Select);
};

export default Select;
