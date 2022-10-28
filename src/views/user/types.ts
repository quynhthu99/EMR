import { Response } from 'types/global'

export interface Get2Step extends Response {
  result: { stepCode: number }
}

export interface Login {
  id: string
  name: string
  username: string
  password: string
  avatar: string
  status: number
  telephone: string
  lastLoginIp: string
  lastLoginTime: number
  creatorId: string
  createTime: number
  merchantCode: string
  deleted: number
  permission: string[]
  menu: Array<any>
  code?: number
  msg?: string
}
export interface FormState {
  clientId: string
  username: string
  password: string
  rememberMe?: boolean
  mobile?: string
  captcha?: string
  otp?: string
  key?: string
}
export interface ConfirmOtpFormState {
  otp: string
  key: string
}
export interface RequestNewPasswordResponse extends Response {
  body: boolean
}
export interface SetNewPasswordResponse extends Response {
  body: boolean
}
export interface ValidateOtpResponse extends Response {
  body: boolean
}

export interface GetSmsCaptcha extends Response {
  result: { captcha: number }
}

export interface Logout extends Response {
  result: {}
}

export interface GeneratePassword {
  password: string
  confirmPassword: string
}

export namespace API {
  export type _Get2Step = () => Promise<Get2Step>
  export type _Login = (data: {
    password?: string
    clientId?: string
    username?: string
  }) => Promise<Login>
  export type _RefreshToken = (data: { clientId?: string; refreshToken?: string }) => Promise<Login>
  export type _RequestNewPassword = (data: { email: string }) => Promise<RequestNewPasswordResponse>
  export type _SetNewPassword = (data: {
    email: string
    isSecure: boolean
    newPassword: string
    otp: string
  }) => Promise<SetNewPasswordResponse>
  export type _ValidateOtp = (data: { key: string; otp: string }) => Promise<ValidateOtpResponse>

  export type _GetSmsCaptcha = (data: { mobile: string }) => Promise<GetSmsCaptcha>
  export type _Logout = (data: { clientId: string; refreshToken: string }) => Promise<Logout>
}
