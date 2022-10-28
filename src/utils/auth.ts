import { authService } from '@/utils/http/axios'
import { Response, User, Permission } from '@/utils/types'
import { Router } from 'vue-router'
import { message } from 'ant-design-vue'
import ls from '@/utils/Storage'
import store from '@/store'

import {
  ACCESS_TOKEN,
  ACCESS_TOKEN_EXPIRE_TIME,
  PERMISSION,
  REFRESH_TOKEN
} from '@/store/mutation-types'

const authClientId = import.meta.env.VITE_CLIENT_ID

/**
 * Trả về thông tin tài khoản
 * @param token
 */
export async function getUserInfo(token: string): Promise<User> {
  const rs: Response = await authService.get('/user/user-info', {
    headers: {
      Authorization: token,
      token: token
    }
  })
  return rs.body
}

/**
 * Trả về danh sách quyền
 * @param userId
 */
export async function getPermission(userId: string): Promise<[Permission]> {
  const rs: Response = await authService.get('/user/get-list-permission', {
    params: {
      clientId: authClientId,
      userId: userId
    }
  })
  return rs.body
}

export const loginSuccess = async (res, router: Router, redirect: string) => {
  if (res.tokenData.access_token) {
    ls.set(ACCESS_TOKEN, res.tokenData.access_token, res.tokenData.expires_in)
    ls.set(ACCESS_TOKEN_EXPIRE_TIME, res.tokenData.expires_in)
    ls.set(REFRESH_TOKEN, res.tokenData.refresh_token)
    const user = await getUserInfo(res.tokenData.access_token)
    const listPermissions = await getPermission(user.userId)
    let permissions = ['admin'] // Fake quyen admin
    if (listPermissions.length) {
      permissions = listPermissions.map((p) => {
        return p.code
      })
    }
    ls.set(PERMISSION, permissions)
    // ls.set(USER_INFO, user)
    // console.log(store)
    await store.dispatch('setUser', user)
  }
  router.push(redirect).then(() => {
    message.success({
      content: 'Đăng nhập thành công',
      duration: 3
    })
  })
}
