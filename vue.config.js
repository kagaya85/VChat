module.exports = {
  publicPath: './',

  devServer: {
    port: 2333
  },

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  },

  // configureWebpack:{
  //   module: {
  //     rules:[
  //       {
  //         test:/\.(woff2?|eot|ttf|otf)(\?.*)$/,
  //         loader:'url-loader',
  //         options:{
  //           limit: 10000,
  //           // name: utils.assetsPath('fonrs/[name].[hash:7].[ext]')
  //         }
  //       }
  //     ]
  //   }
  // }
}