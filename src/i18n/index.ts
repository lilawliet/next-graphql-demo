import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import enUS from './_locales/en_US.json'
import zhCN from './_locales/zh_CN.json'

export type LOCALE = 'zh_CN' | 'en_US'

i18n.use(initReactI18next).init({
  lng: process.env.NEXT_PUBLIC_LOCALE,
  fallbackLng: process.env.NEXT_PUBLIC_LOCALE,
  resources: {
    zh_CN: {
      translation: zhCN,
    },
    en_US: {
      translation: enUS,
    },
  },
  debug: false,
  interpolation: {
    escapeValue: false,
  },
})

// export const I18N_NS = 'translations'
// export const addResourceBundle = async (locale: string) => {
//   if (i18n.hasResourceBundle(locale, I18N_NS)) return
//   const bundle = await fetchLocale(locale)
//   i18n.addResourceBundle(locale, I18N_NS, bundle)
// }

// i18n.on('languageChanged', function (lng: string) {
//   addResourceBundle(lng);
// });

// addResourceBundle(process.env.NEXT_PUBLIC_LOCALE)

export default i18n
