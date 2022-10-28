import { execute } from '../../index'
import API from '../defineRouting'

/**
 * ORG UNIT STAFF
 */
// Lấy thông tin nhân viên theo phòng ban
export function getStaffsByOrgUnit(params) {
  return execute(API.GET_STAFFS_BY_ORG_UNIT, params)
}

// Lấy thông tin phòng ban của nhân viên
export function getStaffOrgUnit(params) {
  return execute(API.GET_STAFF_ORG_UNIT, params)
}

// Xóa nhân viên khỏi đơn vị hiện tại
export function revokeUser(params) {
  return execute(API.REVOKE_USER, params, 'post')
}

// Gán nhân viên vào đơn vị
export function grantStaffOrgUnitStaff(params) {
  return execute(API.GRANT_USER, params, 'post')
}

// Thông tin đơn vị theo ID nhân viên
export function findByStaffId(params) {
  return execute(API.FIND_BY_STAFF_ID, params)
}
