import { execute } from '../../index'
import API from '../defineRouting'

/**
 * STAFF ADMIN ROLE
 */
// Lấy danh sách tất cả quyền
export function getAllRole(params) {
  return execute(API.GET_ALL_ROLE, params, 'post')
}

// Thông tin vai trò của nhân viên
export function getStaffRole(params) {
  return execute(API.GET_STAFF_ROLE, params, 'get')
}
