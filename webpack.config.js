const path = require('path');
// 编译 Webpack 项目中的 html 类型的文件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 打包输出前，清空dist文件夹内容
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
// 将css从js文件中抽离单独打包
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: 'development', // 生产模式
  entry: path.resolve(__dirname, './src/main.js'), // 入口文件
  output: {
    filename: '[name].[hash].js',      // 打包后的文件名称
    path: path.resolve(__dirname,'./dist')  // 打包后的目录
  },
  // 动态监测并实时更新页面
  devServer: {
    contentBase: './dist',
    // 默认8080，可不写
    port: 8080,
    // 热更新，无需刷新
    hot: true
  },
  plugins:[
    new HtmlWebpackPlugin({
      title: '奥科图数-智慧园区服务运营平台',
      favicon: './src/images/browserIcon.ico',
      template: path.resolve(__dirname, './public/index.html')
    }),
    require('autoprefixer'),
    new MiniCssExtractPlugin({
      filename: "css/[name].css"
    }),
    new CleanWebpackPlugin(),
  ],
  module:{
    rules:[
      {
        test:/\.css$/,
        use:[
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            },
          },
          'css-loader', 
          'postcss-loader'
        ]
      },
      {
        test:/\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            },
          }, 
          'css-loader', 
          'sass-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'assets/[name].[ext]',
            limit: 2048
          }
        }
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader'
        }
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            babelrc: false
          }
        }
      }
    ]
  }
}
