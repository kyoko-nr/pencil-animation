const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

module.exports = [
  {
    // メインとなるJavaScriptファイル（エントリーポイント）
    entry: `./src/index.js`,
    output: {
      //  出力ファイルのディレクトリ名
      path: path.resolve(__dirname, 'dist'),
      // 出力ファイル名
      filename: 'bundle.js'
    },
    // モード値を development に設定するとソースマップ有効でJSファイルが出力される
    mode: "development",
    devServer: {
      // 開発時にdevserverを立ち上げた時にブラウザが自動で開くようにする設定
      open: true
    },
    plugins: [
      // staticフォルダの中をコピーして展開してくれる
      // new CopyWebpackPlugin({
      //   patterns: [
      //     { from: path.resolve(__dirname, './static'), to: path.resolve(__dirname, 'dist/static') }
      //   ]
      // }),
      // htmlファイルをindex.htmlという名前で展開してくれる
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '/src/index.html'),
        minify: true
      }),
      new MiniCSSExtractPlugin()
    ],
    module: {
      rules: [
        // HTML
        {
          test: /\.(html)$/,
          use: ['html-loader']
        },
        // JS
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader'
        },
        // CSS
        {
          test: /\.css$/,
          use: [MiniCSSExtractPlugin.loader, 'css-loader']
        }
      ]
    }
  },
];