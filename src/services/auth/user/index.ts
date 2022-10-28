import { authService } from '@/utils/http/axios'
import API from '@/services/auth/defineRouting'

export function requestActiveUser(params) {
  return authService.post(API.REQUEST_ACTIVE_USER, params)
}

export function confirmActiveUser(params) {
  return authService.post(API.CONFIRM_ACTIVE_USER, params)
}
