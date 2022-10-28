import { timeFix } from '@/utils/util'
import ls from '@/utils/Storage'
import {
  ACCESS_TOKEN,
  ACCESS_TOKEN_EXPIRE_TIME,
  REFRESH_TOKEN,
  PERMISSION,
  USER_INFO
} from '@/store/mutation-types'
import { message, notification } from 'ant-design-vue'
import { Router } from 'vue-router'
import { getSmsCaptcha } from './service'
import { getUserInfo } from '@/utils/auth'

export const loginSuccess = async (res: any, router: Router, redirect: string) => {
  setTimeout(() => {
    notification.success({
      message: 'Đăng nhập thành công',
      description: `${timeFix()}`
    })
  })
  if (res.tokenData.access_token) {
    ls.set(ACCESS_TOKEN, res.tokenData.access_token, res.tokenData.expires_in)
    ls.set(ACCESS_TOKEN_EXPIRE_TIME, res.tokenData.expires_in, res.tokenData.expires_in)
    ls.set(REFRESH_TOKEN, res.tokenData.refresh_token, res.tokenData.refresh_token)
    const user: any = await getUserInfo(res.tokenData.access_token)
    let permissions = Array.isArray(user.listRole) ? user.listRole : user.listRole.split(',')

    // fake quyen de test
    if (permissions.length === 0) {
      permissions = ['admin']
    }
    ls.set(PERMISSION, permissions)
    ls.set(USER_INFO, user)
  }
  window.location.href = redirect
}

export const requestFailed = (err) => {
  notification['error']({
    message: 'Lỗi',
    description:
      ((err.response || {}).data || {}).message ||
      'Đã xảy ra lỗi với yêu cầu, vui lòng thử lại sau',
    duration: 4
  })
}

export const useGetCaptcha = (e, validate, state, form, registerBtn) => {
  e.preventDefault()
  validate(['mobile']).then((res) => {
    state.smsSendBtn = true
    const interval = window.setInterval(() => {
      if (state.time-- <= 0) {
        state.time = 60
        state.smsSendBtn = false
        window.clearInterval(interval)
      }
    }, 1000)

    message.loading('Mã xác minh đang được gửi..', 1).then((r) => console.log(e))

    getSmsCaptcha({ mobile: form.mobile })
      .then((res) => {
        notification['success']({
          message: 'Giới thiệu',
          description:
            '\n' + 'Mã xác minh được lấy thành công, mã xác minh của bạn là：' + res.result.captcha,
          duration: 8
        })
      })
      .catch((err) => {
        clearInterval(interval)
        state.time = 60
        state.smsSendBtn = false
        requestFailed(err)
        registerBtn && (registerBtn.value = false)
      })
  })
}
