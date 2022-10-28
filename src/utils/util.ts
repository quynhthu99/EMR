import ls from '@/utils/Storage'
// import * as EmailValidator from 'email-validator'
import dayjs from 'dayjs'
import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  ACCESS_TOKEN_EXPIRE_TIME,
  MENU_NAV,
  PERMISSION,
  USER_INFO,
  CURRENT_ORG_UNIT_ID
} from '@/store/mutation-types'

export function clearUserInfo() {
  ls.remove(ACCESS_TOKEN)
  ls.remove(ACCESS_TOKEN_EXPIRE_TIME)
  ls.remove(REFRESH_TOKEN)
  ls.remove(PERMISSION)
  ls.remove(USER_INFO)
  ls.remove(MENU_NAV)
  ls.remove(CURRENT_ORG_UNIT_ID)
  // ls.clear()
}

export function timeFix() {
  const time = new Date()
  return time.getHours()
}

export const encryptKeys = {
  key: 'va@20222022202',
  iv: 'CZGdXz0NGkXtV0bI'
}

export const getQueryParameters = (options: any) => {
  const url = options.url
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') +
      '"}'
  )
}

export const getBody = (options) => {
  return options.body && JSON.parse(options.body)
}

export function scorePassword(pass) {
  let score = 0
  if (!pass) {
    return score
  }
  // award every unique letter until 5 repetitions
  const letters = {}
  for (let i = 0; i < pass.length; i++) {
    letters[pass[i]] = (letters[pass[i]] || 0) + 1
    score += 5.0 / letters[pass[i]]
  }

  // bonus points for mixing it up
  const variations = {
    digits: /\d/.test(pass),
    lower: /[a-z]/.test(pass),
    upper: /[A-Z]/.test(pass),
    nonWords: /\W/.test(pass)
  }

  let variationCount = 0
  for (const check in variations) {
    variationCount += variations[check] === true ? 1 : 0
  }
  score += (variationCount - 1) * 10

  return score
}

export const firstLetterIsUpperCase = function (str: string) {
  const reg = /^[A-Z][A-z0-9]*$/
  return reg.test(str)
}

export const separator = ';'

export const divisionStringToArray = (string: string, customSeparator: never) => {
  return string ? string.split(customSeparator || separator) : []
}

export function handlePaginationData({ body }) {
  if (body) {
    return {
      total: (body['pageable'] && body['pageable']['offset']) || 0
    }
  }
  return {}
}

/**
 * @rule:
 * Quy tắc encode password:
 *  - Input: raw password
 *   B1: encode raw password theo base64
 *   B2: get date hiện tại theo fomat "yyyyMMddhhmmss", ví dụ: 20220622085112(giải nghĩa: 2022/06/22 08:51:12)
 *   B3: encode date vừa get được theo base64
 *   B4: cộng chuỗi giá trị ở B1 và B3
 *   B5: encode chuỗi giá trị ở B4 theo kiểu base64
 * @use: sử dụng để mã hóa mật khẩu
 * @param password
 * @return: string (mật khẩu đã mã hóa base64)
 */
export function encodePassword(password: string): string {
  const encodePassword = btoa(password) // step one
  const currentTime = btoa(dayjs().format('YYYYMMDDhhmmss'))
  return btoa(encodePassword + currentTime)
}

export function getBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })
}

export const isDev = import.meta.env.DEV
export const baseAuthURL = import.meta.env.VITE_AUTH_API_URL
export const baseCommonURL = import.meta.env.VITE_API_BASE_URL

/**
Hàm dùng format giá trị input dang 1,000,000
*/
export function formatPriceNotZero(value: number): number | string {
  if (value) {
    const val = value.toFixed(0).replace(',', '.')
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
  return '0'
}

/**
 Hàm dùng trimspace giá trị trong ô input
 */
export function trimSpace(obj: any) {
  for (const [k, v] of Object.entries(obj)) {
    if (typeof v === 'string') {
      obj[k] = v.trim()
    } else if (typeof v === 'object') {
    }
  }
}
/**
 * @use: custom params
 * @param filter
 * @param pagination
 * @return: object
 */
interface Pagination {
  current: number
  pageSize: number
  showSizeChanger: boolean
  showQuickJumper: boolean
  pageSizeOptions: Array<string>
  showTotal: any
}
export function customParam(filter: any, pagination: Pagination): any {
  return {
    ...filter,
    ...{
      page: pagination.current - 1,
      size: pagination.pageSize
    }
  }
}
