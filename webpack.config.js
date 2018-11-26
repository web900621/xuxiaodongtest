const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin"); //生成HTML文件
const eslintFormatter = require("react-dev-utils/eslintFormatter");

module.exports = {
  // entry: path.join(__dirname, "src/app/index.jsx"), //入口文件
  entry:['./src/app/index.jsx'],
  output: {
    filename: "[name].bundle.js" //输出文件名
  },
  mode: "development",
  resolve: {
    extensions: ["*",".js", ".jsx","tsx","ts"]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      { test: /\.tsx?$/, use: "ts-loader" },
      {
        test: /\.(js|jsx)$/,
        enforce: "pre",
        use: [
          {
            options: {
              formatter: eslintFormatter,
              eslintPath: require.resolve("eslint")
            },
            loader: require.resolve("eslint-loader")
          }
        ],
        exclude:/node_modules/
      },
      {
        test:/\.scss|css$/,
        use:[
            {loader:'style-loader'},
            {loader:'css-loader'},
            {loader:'sass-loader'}
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'image/png',
              fallback: 'responsive-loader'
            }
          }
        ]
      },
      {
        test:/\.(woff|woff2|svg|tff|eot)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              fallback: 'responsive-loader'
            }
          }
        ]
      }
    ]
  },
  devtool: "cheap-module-source-map",//debug
  plugins: [
    new HtmlWebpackPlugin({
      template:__dirname+'/src/app/index.tmpl.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer:{
    host:'127.0.0.1',
    port:4200,
    open:true,
    historyApiFallback: true,//不跳转，在开发单页应用时非常有用,它依赖于HTML5 history API, 如果设置为true,所有的跳转，将指向index.html 
    contentBase: path.join(__dirname, 'public'),//本地服务器所加载的页面所在的目录
    proxy:{
        //凡是 '/api' 开头的http请求，都会被代理到localhost:3000上，实际上后端做了一次转发 ，后端去3000端口拿到数据后，又返回的，这里并不是真正的服务，真正的服务在3000端口上
        '/api':{
            target:'http://localhost:3000',
            secure:false
        }
    }
  }
};
