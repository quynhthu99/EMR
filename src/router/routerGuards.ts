import NProgress from 'nprogress' // progress bar
import '@/components/NProgress/nprogress.less' // progress bar custom style
import { ACCESS_TOKEN, PERMISSION } from '@/store/mutation-types'
import { hasPermission } from './permission'
import ls from '@/utils/Storage'
import { setDocumentTitle } from '@/utils/domUtil'
import type { Router } from 'vue-router'
// import { getUserInfo } from '@/utils/auth'
// import { useStore } from 'vuex'
// import store from '@/store/index'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = [
  'login',
  're_login',
  'forgot_password',
  'forgot_password.confirm',
  'forgot_password.set_new_password',
  'active_account'
]
const defaultRoutePath = '/dashboard/analysis'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// export function onDivisionSubsystem(key: string) {
//   store.commit('SET_SUBSYSTEM', key)
// }

export const setupBeforeEach = (router: Router) => {
  router.beforeEach(async (to, from, next) => {
    NProgress.start()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // if (to.meta && to.meta.subsystem && to.meta.subsystem.key) {
    //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //   // @ts-ignore
    //   onDivisionSubsystem(to.meta.subsystem.key)
    // }
    setDocumentTitle(to)
    // Lưu token mới sau khi redirect từ trang login về
    /*if (to.query.access_token !== undefined) {
      const expiredTime =
        to.query.expired_time !== undefined
          ? Number(to.query.expired_time) * 60
          : 60 * 60 * 24 * 1000

      ls.set(ACCESS_TOKEN, to.query.access_token, expiredTime)
      const token: any = to.query.access_token
      const user: any = await getUserInfo(token)
      if (user) {
        ls.set(USER_INFO, user)
        const permissions =
          user.authorization !== undefined && user.authorization.length > 0
            ? user.authorization
            : ['admin']
        ls.set(PERMISSION, permissions) // Fake admin để test
      }
    }*/
    //debugger
    //next()
    if (1) {
      /* has token */
      if (to.path === '/user/re-login') {
        next()
        NProgress.done()
      } else if (to.path === '/user/login') {
        // next({ path: defaultRoutePath })
        next()
        NProgress.done()
      } else {
        const permission = ls.get(PERMISSION)
        const canAccess = hasPermission(permission, to)
        if (canAccess) {
          next()
        } else {
          next({ path: '/exception/403' })
        }
      }
    } else {
      if (whiteList.includes(to.name as any)) {
        next()
      } else {
        // window.location.href =
        //   import.meta.env.VITE_LOGIN_URL +
        //   '?redirect=' +
        //   encodeURIComponent(window.location.href) +
        //   '&client_id=' +
        //   import.meta.env.VITE_CLIENT_ID
        next({ path: '/user/login', query: { redirect: to.fullPath } })
        NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
      }
    }
  })
}

export const setupAfterEach = (router: Router) => {
  router.afterEach(() => {
    NProgress.done() // finish progress bar
  })
}
