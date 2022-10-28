import axios, { AxiosResponse } from 'axios'
import { message } from 'ant-design-vue'
import { ACCESS_TOKEN, USER_INFO } from '@/store/mutation-types'
import { baseAuthURL, baseCommonURL } from '@/utils/util'
import ls from '@/utils/Storage'
import { useRouter } from 'vue-router'
import { globalLoading } from '@/store/reactiveState'

const ContentType = {
  urlencoded: 'application/x-www-form-urlencoded;charset=UTF-8',
  json: 'application/json',
  formData: 'multipart/form-data'
}

const axiosConfigs = (config) => {
  globalLoading.value = true
  const token = ls.get(ACCESS_TOKEN)
  const userinfo = ls.get(USER_INFO)
  if (token) {
    config.headers['token'] = token
    config.headers['Authorization'] = token
  }
  if (userinfo) {
    config.headers['username'] = userinfo.username
  }
  config.headers['Content-Type'] =
    ContentType[config.data instanceof FormData ? 'formData' : 'json']
  return config
}

const requestOnReject = (error) => {
  globalLoading.value = false
  return Promise.reject(error)
}

const axiosResponse = (res: AxiosResponse<any>) => {
  globalLoading.value = false
  if (res.status === 200) {
    return Promise.resolve(res.data)
  } else if (res.status === 401 || res.data.code === 401 || res.data.code === '401') {
    message.error('\n' + 'Đăng nhập đã hết hạn vui lòng đăng nhập lại!')
    // Redirect sang trang refresh token
    window.location.href = '/user/re-login?redirect=' + encodeURIComponent(window.location.href)
    return false
  } else if (res.status === 403) {
    message.error('\n' + 'Bạn không đủ quyền thực hiện chức năng này!').then((r) => console.log(r))
    return false
  } else if (res.status === 500) {
    message
      .error('\n' + 'Yêu cầu dữ liệu không thành công, vui lòng thử lại!')
      .then((r) => console.log(r))
    return false
  } else if (res.status === 406) {
    message
      .error('\n' + 'Đã hết thời gian đăng nhập, vui lòng đăng nhập lại!')
      .then((r) => console.log(r))
    const router = useRouter()
    router.push({ name: 'login' }).then((r) => console.log(r))
    return false
  } else {
    if (window.localStorage.getItem('lang') === 'en') {
      message.error(res.data.enMsg).then((r) => console.log(r))
    } else {
      message.error(res.data.zhMsg).then((r) => console.log(r))
    }
    return false
  }
  // return res
}

const axiosResponseError = (error) => {
  globalLoading.value = false
  const msg = error.message
  const result = error.response
  if (result.status === 401 || result.data.code === 401 || result.data.code === '401') {
    message.error('\n' + 'Đăng nhập đã hết hạn vui lòng đăng nhập lại!')
    // Redirect sang trang refresh token
    window.location.href = '/user/re-login?redirect=' + encodeURIComponent(window.location.href)
    return false
  }
  if (result) {
    const { data } = result
    message.error(data.msg || data.enMsg || data.message)
  } else if (msg) {
    if (msg === 'Network Error') {
      message.error('Lỗi mạng, vui lòng kiểm tra mạng!')
    } else {
      message.error(msg)
    }
  } else if (error.__CANCEL__) {
    // ignore message error
  } else {
    message.error('\n' + 'Lỗi không xác định, vui lòng thử lại!')
  }
  return Promise.reject(error)
}

// Auth Axios Service
const authService = axios.create({
  baseURL: baseAuthURL,
  timeout: 60000,
  responseType: 'json',
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
})
authService.interceptors.request.use(axiosConfigs, requestOnReject)

authService.interceptors.response.use(axiosResponse, axiosResponseError)

// Common Service
const commonService = axios.create({
  baseURL: baseCommonURL,
  timeout: 60000,
  responseType: 'json',
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
})
commonService.interceptors.request.use(axiosConfigs, requestOnReject)

commonService.interceptors.response.use(axiosResponse, axiosResponseError)

export { authService, commonService }
