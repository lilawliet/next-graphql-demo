import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
// import zh_CN from './locales/zh_CN.json'
// import en_US from './locales/en_US.json'

export const fetchLocale = async (locale: string) => {
  const res = await window.fetch(`./_locales/${locale}.json`)
  const data: Record<string, string> = await res.json()
  return Object.keys(data).reduce((res, key) => {
    return {
      ...res,
      [key.replace(/__/g, ' ')]: data[key],
    }
  }, {})
}

i18n.use(initReactI18next).init({
  lng: process.env.BASE_LNG,
  fallbackLng: process.env.BASE_LNG,
  // resources: {
  //   zh_CN: {
  //     translation: zh_CN,
  //   },
  //   en_US: {
  //     translation: en_US,
  //   },
  // },
  debug: false,
  interpolation: {
    escapeValue: false,
  },
})

export const I18N_NS = 'translations'
export const addResourceBundle = async (locale: string) => {
  if (i18n.hasResourceBundle(locale, I18N_NS)) return
  const bundle = await fetchLocale(locale)
  i18n.addResourceBundle(locale, 'translations', bundle)
}

// addResourceBundle(process.env.BASE_LNG)

export default i18n
