/*
 * @title: 文件内容名称
 * @Author: xiezhongbin
 * @Date: 2021-03-23 21:45:59
 * @LastEditTime: 2021-03-25 10:57:59
 */
import Vue from "vue";

let componentsObject = {};
// 动态获取所有组件
const requireComponent = require.context(".", true, /\.vue$/);
requireComponent.keys().forEach(fileName => {
  let componentName = requireComponent(fileName).default.name;
  let componentMethods = requireComponent(fileName).default;
  componentMethods.install = function(Vue) {
    Vue.component(componentMethods.name, componentMethods);
  };
  componentsObject[componentName] = componentMethods;
});

const install = function(Vue) {
  if (install.installed) return;
  Object.values(componentsObject).map(component =>
    Vue.component(component.name, component)
  );
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  ...componentsObject
};
