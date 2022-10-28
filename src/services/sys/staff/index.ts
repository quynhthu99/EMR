import { execute } from '@/services'
import API from '@/services/sys/defineRouting'

/**
 * STAFF
 */
// Tìm kiếm thông tin nhân viên
export function searchStaff(params = {}) {
  return execute(API.SEARCH_STAFF, params)
}

// Lấy danh sách nhân viên chưa thuộc đơn vị hiện tại
export function getUserFree(params) {
  return execute(API.GET_USER_FREE, params)
}

// TÌm kiếm nhân viên theo code và tên
export function searchStaffByCodeName(params) {
  return execute(API.SEARCH_BY_CODE_NAME, params, 'post')
}

// Thêm mới nhân viên
export function createStaff(params) {
  return execute(API.CREATE_STAFF, params, 'post')
}

// Cập nhật nhân viên
export function updateStaff(params) {
  return execute(API.UPDATE_STAFF, params, 'post')
}

// Xóa nhân viên
export function deleteStaff(params) {
  return execute(API.DELETE_STAFF, params, 'post')
}

// Thay đổi trạng thái hoạt động của nhân viên
export function changeStatusStaff(params) {
  return execute(API.CHANGE_STATUS_STAFF, params)
}

// Lấy thông tin chi tiết của nhân viên
export function selfInfo() {
  return execute(API.SELF_INFO, null, 'get')
}

// Cập nhật thông tin email, SĐT nhân viên
export function updateSelfInfo(params) {
  return execute(API.UPDATE_SELF_INFO, params, 'post')
}
export function changeSelfPassword(params) {
  return execute(API.CHANGE_SELF_PASSWORD, params, 'post')
}

// Upload avatar
export function uploadAvatar(data) {
  return execute(API.STAFF_UPLOAD_AVATAR, data, 'post')
}

// Yêu cầu bật xác thực 2 yếu tố
export function requestEnableTwoFa() {
  return execute(API.REQUEST_ENABLE_TWO_FA, {}, 'post')
}

// Bật xác thực 2 yếu tố
export function confirmEnableTwoFa(params) {
  return execute(API.CONFIRM_ENABLE_TWO_FA, params, 'post')
}

// Tắt xác thực 2 yếu tố
export function confirmDisableTwoFa(params) {
  return execute(API.CONFIRM_DISABLE_TWO_FA, params, 'post')
}
export function getUnitAssignStaff() {
  return execute(API.UNIT_ASSIGNED_STAFF, null, 'get')
}
