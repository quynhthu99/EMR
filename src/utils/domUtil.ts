import config from '@/config/defaultSettings'
import i18n from '@/locales/useI18n'
export const setDocumentTitle = (to: any) => {
  if (config.dynamicBrowserTab) {
    const title = to?.meta?.title
    if (!title) {
      return
    }
    const win: any = window
    win.pagetitle = title
    setDocumentTitleForLangChange()

    const ua = navigator.userAgent
    // eslint-disable-next-line
    const regex = /\bMicroMessenger\/([\d\.]+)/
    if (regex.test(ua) && /ip(hone|od|ad)/i.test(ua)) {
      const i = document.createElement('iframe')
      i.src = '/favicon.ico'
      i.style.display = 'none'
      i.onload = function () {
        setTimeout(function () {
          i.remove()
        }, 9)
      }
      document.body.appendChild(i)
    }
  }
}

export const setDocumentTitleForLangChange = () => {
  const win: any = window
  document.title = (win.pagetitle ? i18n.global.t(win.pagetitle) + ' - ' : '') + config.title
}

export const domTitle = config.title
