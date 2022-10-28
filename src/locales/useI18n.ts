import { createI18n } from 'vue-i18n'
import { genLangs } from '@/utils/batchImportFiles'
import ls from '@/utils/Storage'

const includePath = ['locales', 'views', 'components']
let en = import.meta.globEager('/src/**/en.ts')
let vi = import.meta.globEager('/src/**/vi.ts')
en = genLangs(en, includePath)
vi = genLangs(vi, includePath)
const i18n = createI18n({
  locale: ls.get('lang') || 'vi-VN',
  legacy: false,
  globalInjection: true,
  messages: {
    'vi-VN': vi,
    'en-US': en
  }
})

export default i18n

export const getLocale = () => {
  return i18n.global.locale
}
