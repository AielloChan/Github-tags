var path = require('path'),
  webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractLess = new ExtractTextPlugin({
  filename: "[name].[contenthash].css",
  disable: process.env.NODE_ENV === "development"
});

module.exports = {
  entry: {
    './app/app': './src/app/app.js',
    './app/background': './src/background/background.js',
    './options/options': './src/options/main.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'dist/options/',
    filename: '[name].js'
  },
  module: {
    rules: [{
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
    },
    {
      test: /\.less$/,
      use: extractLess.extract({
        use: [{
          loader: "css-loader"
        }, {
          loader: "less-loader"
        }],
        // use style-loader in development 
        fallback: "style-loader"
      })
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
    new CopyWebpackPlugin([{
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
    }]),
    extractLess
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  devServer: {
    contentBase: [path.join(__dirname, 'dist/options'), path.join(__dirname, 'dist/vendor')],
    compress: true,
    noInfo: true,
    proxy: {
      "/vendor": {
        target: "http://localhost:8080",
        pathRewrite: {
          "^/vendor": ""
        }
      }
    }
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
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