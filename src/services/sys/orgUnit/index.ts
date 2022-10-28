import { execute } from '../../index'
import API from '../defineRouting'

/**
 * ORG UNIT
 */
// Thông tin đơn vị theo mã đơn vị
export function findByOrgUnitCode(params) {
  return execute(API.FIND_BY_ORG_UNIT_CODE, params)
}

// Danh sách bưu điện, bưu cục theo cây tổ chứ
export function initTree() {
  return execute(API.INIT_TREE, {})
}

// Tra cứu quản lý thông tin tổ chức đơn vị
export function searchOrgUnit(params) {
  return execute(API.SEARCH_ORG_UNIT, params)
}

// Thêm mới đơn vị
export function createOrgUnit(params) {
  return execute(API.CREATE_ORG_UNIT, params, 'post')
}

// Cập nhật đơn vị
export function updateOrgUnit(params) {
  return execute(API.UPDATE_ORG_UNIT, params, 'post')
}

// Thay đổi trạng thái đơn vị
export function changeStatusOrgUnit(params) {
  return execute(API.CHANGE_STATUS_ORG_UNIT, params, 'post')
}

// Xóa đơn vị
export function removeOrgUnit(params) {
  return execute(API.REMOVE_ORG_UNIT, params, 'post')
}

// Lấy thông tin chi tiết của tổ chức/đơn vị
export function getOrgUnitDetail(id) {
  return execute(API.GET_ORG_UNIT_DETAIL.replace('{id}', id), null, 'get')
}

// Cập nhật thông tin tổ chức/đơn vị
export function updateInfoOrgUnit(params) {
  return execute(API.UPDATE_INFO_ORG_UNIT, params, 'post')
}

// Cập nhật thông tin liên hệ
export function updateContactOrgUnit(params) {
  return execute(API.UPDATE_CONTACT_ORG_UNIT, params, 'post')
}

// Cập nhật thông tin chữ ký
export function updateSignatureOrgUnit(params) {
  return execute(API.UPDATE_SIGNATURE_ORG_UNIT, params, 'post')
}

export function findOrgUnitByStaffId() {
  return execute(API.FIND_ORG_UNIT_BY_STAFF_ID, {}, 'get')
}
