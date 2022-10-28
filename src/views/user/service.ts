import { authService } from '@/utils/http/axios'
import { API } from './types'

export const userLogin: API._Login = (data) => {
  const api = `auth/login`
  return authService.post(api, data)
}

export const userLoginTwoFa = (data) => {
  const api = `auth/login-v1`
  return authService.post(api, data)
}

export const userRefreshToken: API._RefreshToken = (data) => {
  const api = `auth/refresh-token`
  return authService.post(api, data)
}

export const userRequestNewPassword: API._RequestNewPassword = (data) => {
  const api = `forget-password/request`
  return authService.post(api, data)
}
export const userSetNewPassword: API._SetNewPassword = (data) => {
  const api = `forget-password/confirm`
  return authService.post(api, data)
}

export const validateOtp: API._ValidateOtp = (data) => {
  const api = `otp/validate`
  return authService.post(api, data)
}

export const getSmsCaptcha: API._GetSmsCaptcha = (data) => {
  const api = `account/sms`
  return authService.post(api, data)
}

export const get2step: API._Get2Step = () => {
  const api = `auth/2step-code`
  return authService.get(api)
}

export const logout: API._Logout = (data) => {
  const api = `auth/logout`
  return authService.post(api, data)
}

export interface States {
  rememberMe: boolean
  username: string
  password: string
  mobile: string
  captcha: string
}
