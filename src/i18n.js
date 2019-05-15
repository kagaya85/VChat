import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from './locales/en'
import zh_cn from './locales/zh_cn'
import ja from './locales/ja'

Vue.use(VueI18n)

// function loadLocaleMessages () {
//   const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.js$/i)
//   const messages = {}
//   locales.keys().forEach(key => {
//     const matched = key.match(/([A-Za-z0-9-_]+)\./i)
//     if (matched && matched.length > 1) {
//       const locale = matched[1]
//       messages[locale] = locales(key)
//     }
//   })
//   return messages
// }

export default new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || 'en',
  // locale: 'ja',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: {
    en: en,
    zh_cn: zh_cn,
    ja: ja
  }
})
