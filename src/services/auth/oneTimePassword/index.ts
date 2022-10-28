import { authService } from '@/utils/http/axios'
import API from '@/services/auth/defineRouting'

export function validateOTP(params) {
  return authService.post(API.VALIDATE_OTP, params)
}

export function validateActiveUserOTP(params) {
  return authService.post(API.VALIDATE_ACTIVE_USER_OTP, params)
}
