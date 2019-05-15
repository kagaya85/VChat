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
  }
}
