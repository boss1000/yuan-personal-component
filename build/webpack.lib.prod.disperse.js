/*
 * @title: 文件内容名称
 * @Author: xiezhongbin
 * @Date: 2021-03-23 21:45:59
 * @LastEditTime: 2021-03-25 10:15:59
 */
// 用于对组件单独打包，便于按需加载
const path = require("path");
const fs = require("fs");
const files = fs.readdirSync("packages");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssnanoPlugin = require("@intervolga/optimize-cssnano-plugin");
const merge = require("webpack-merge");
const webpackLibBaseConfig = require("./webpack.lib.base.js");

// 定义入口
const entry = {};
// 引入入口配置文件
let entryConfig = files
  .map(item => {
    if (item.indexOf(".js") < 0 && item.indexOf("themes") < 0) {
      return item;
    }
  })
  .filter(item => item);

entryConfig.map(item => {
  const componentName = item.toLowerCase();
  entry[componentName] = path.resolve(
    __dirname,
    "../packages/" + componentName + "/index.js"
  );
});

module.exports = merge(webpackLibBaseConfig, {
  mode: "production",
  devtool: "source-map",
  entry,
  output: {
    // 打包过后的文件的输出的路径
    path: path.resolve(__dirname, "../lib"),
    // 打包后生成的js文件
    // 解释下这个[name]是怎么来的，它是根据你的entry命名来的，入口叫啥，出口的[name]就叫啥
    filename: "[name].js",
    // 我这儿目前还没有资源引用
    publicPath: "/",
    library: "vue-pawel-ui",
    libraryTarget: "umd",
    libraryExport: "default",
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.(css|scss|sass)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader // 使用miniCssExtractPlugin.loader代替style-loader
          },
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader",
            options: {
              implementation: require("dart-sass")
            }
          },
          {
            loader: "postcss-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    // 新建miniCssExtractPlugin实例并配置
    new MiniCssExtractPlugin({
      filename: "themes/[name].css"
    }),
    // 压缩css
    new OptimizeCssnanoPlugin({
      sourceMap: true,
      cssnanoOptions: {
        preset: [
          "default",
          {
            discardComments: {
              removeAll: true
            }
          }
        ]
      }
    })
  ]
});
