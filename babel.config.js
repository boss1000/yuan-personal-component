/*
 * @title: 文件内容名称
 * @Author: xiezhongbin
 * @Date: 2021-03-24 11:42:28
 * @LastEditTime: 2021-03-24 13:51:14
 */
module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    [
      "component",
      {
        libraryName: "element-ui",
        styleLibraryName: "theme-chalk"
      },
      "element-ui"
    ],
    [
      "component",
      {
        libraryName: "@yuan/personal-component",
        styleLibrary: {
          name: "themes",
          base: false
        }
      },
      "@yuan/personal-component"
    ]
  ]
};
