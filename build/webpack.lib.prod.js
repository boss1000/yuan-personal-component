/*
 * @title: 文件内容名称
 * @Author: xiezhongbin
 * @Date: 2021-03-23 21:45:59
 * @LastEditTime: 2021-03-25 10:16:13
 */
// 打包所有
// node.js里面自带的操作路径的模块
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const merge = require("webpack-merge");
const webpackLibBaseConfig = require("./webpack.lib.base.js");
// 用于提取css到文件中
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 用于压缩css代码
const OptimizeCssnanoPlugin = require("@intervolga/optimize-cssnano-plugin");

module.exports = merge(webpackLibBaseConfig, {
  mode: "production",
  devtool: "source-map",
  entry: {
    pui: path.resolve(__dirname, "../packages/index.js")
  },
  output: {
    // 打包过后的文件的输出的路径
    path: path.resolve(__dirname, "../lib"),
    // 打包后生成的js文件
    filename: "index.js",
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
    new CleanWebpackPlugin(),
    // 新建miniCssExtractPlugin实例并配置
    new MiniCssExtractPlugin({
      filename: "themes/index.css"
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
