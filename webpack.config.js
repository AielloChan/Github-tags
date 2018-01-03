var path = require('path'),
  webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  ExtractTextPlugin = require("extract-text-webpack-plugin");

var webpackConfig = {
  entry: {
    './app/app': './src/app/app.vue',
    './app/background': './src/background/background.js',
    './options/options': './src/options/main.vue'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'dist/options/',
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {}
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules|vendor/
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Github Tags',
      template: 'src/options/index.html',
      filename: "options/index.html",
      inject: false
    }),
    new CopyWebpackPlugin([
      {
        from: 'src/manifest.json'
      }, {
        from: 'src/_locales',
        to: "_locales"
      }, {
        from: 'src/assets',
        to: "assets"
      }, {
        from: 'src/vendor',
        to: "vendor"
      }]
    )
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}


if (process.env.NODE_ENV === "development") {
  webpackConfig.devServer = {
    contentBase: [
      path.join(__dirname, 'webpackServer'),
      path.join(__dirname, 'dist/')
    ],
    compress: true,
    noInfo: true,
    // proxy: {
    //   "/vendor": {
    //     target: "http://localhost:8080",
    //     pathRewrite: {
    //       "^/vendor": ""
    //     }
    //   }
    // }
  }
}

if (process.env.NODE_ENV === "production") {
  webpackConfig.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  webpackConfig.plugins = (webpackConfig.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}


module.exports = webpackConfig;