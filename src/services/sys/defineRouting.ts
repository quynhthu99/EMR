export default {
  GET_ACCOUNT: '/account/child',
  GET_EXCHANGE_RATE: '/global-list/getListValueByCode',
  /**
   * ORG UNIT
   */
  FIND_BY_ORG_UNIT_CODE: '/orgUnit/findByOrgUnitCode',
  INIT_TREE: '/orgUnit/initTree',
  SEARCH_ORG_UNIT: '/orgUnit/search',
  CREATE_ORG_UNIT: '/orgUnit/create',
  UPDATE_ORG_UNIT: '/orgUnit/update',
  CHANGE_STATUS_ORG_UNIT: '/orgUnit/changeStatus',
  REMOVE_ORG_UNIT: '/orgUnit/remove',
  GET_ORG_UNIT_DETAIL: '/orgUnit/{id}',
  UPDATE_INFO_ORG_UNIT: '/orgUnit/update-info',
  UPDATE_CONTACT_ORG_UNIT: '/orgUnit/update-contact',
  UPDATE_SIGNATURE_ORG_UNIT: '/orgUnit/update-signature',
  FIND_ORG_UNIT_BY_STAFF_ID: '/orgUnit/findByStaffId',

  /**
   * ORG UNIT STAFF
   */
  GET_STAFFS_BY_ORG_UNIT: '/orgUnitStaff/getStaffsByOrgUnit',
  REVOKE_USER: '/orgUnitStaff/revokeUser',
  GRANT_USER: '/orgUnitStaff/grantUser',
  FIND_BY_STAFF_ID: '/orgUnitStaff/findByStaffId',

  /**
   * STAFF
   */
  SEARCH_STAFF: '/staff/search',
  GET_STAFF_ORG_UNIT: 'staff/getStaffOrgUnit',
  GET_USER_FREE: '/staff/getUserFree',
  SEARCH_BY_CODE_NAME: '/staff/searchByCodeName',
  CREATE_STAFF: '/staff/create',
  UPDATE_STAFF: '/staff/update',
  DELETE_STAFF: '/staff/delete',
  CHANGE_STATUS_STAFF: '/staff/changeStatus',
  SELF_INFO: '/staff/self-info',
  UPDATE_SELF_INFO: '/staff/update-self-info',
  CHANGE_SELF_PASSWORD: '/staff/change-self-password',
  STAFF_UPLOAD_AVATAR: '/staff/upload-avatar',
  REQUEST_ENABLE_TWO_FA: '/staff/request-enable-two-fa',
  CONFIRM_ENABLE_TWO_FA: '/staff/confirm-enable-two-fa',
  CONFIRM_DISABLE_TWO_FA: '/staff/confirm-disable-two-fa',
  GET_ROLES: 'roles',
  UNIT_ASSIGNED_STAFF: '/staff/unit-assigned',

  // STAFF ADMIN ROLE (THÔNG TIN VAI TRÒ CỦA NHÂN VIÊN)
  GET_ALL_ROLE: '/staffAdminRole/getAdminRoleByStaffId',
  GET_STAFF_ROLE: '/staffAdminRole/getStaffRole',

  // GLOBAL PARAM (CẤU HÌNH THAM SỐ HỆ THỐNG)
  GET_LC_LIST_BY_CODE: 'global-list/getListValueByCode',
  GET_LC_PARAMS: '/global-param/search',
  GET_LC_PARAMS_BY_CODE: '/global-param/get-by-code',
  UPDATE_LC_PARAMS: '/global-param/update',
  CREATE_LC_PARAMS: '/global-param/insert',
  REMOVE_LC_PARAMS: '/global-param/remove',
  SYNC_LC_PARAMS: '/global-param/sync',

  // GLOBAL LIST (CẤU HÌNH DANH MỤC DÙNG CHUNG HỆ THỐNG)
  GET_GLOBAL_LIST: '/global-list/searchGlobalList',
  UPDATE_GLOBAL_LIST: '/global-list/updateGlobalList',
  CREATE_GLOBAL_LIST: '/global-list/insertGlobalList',
  REMOVE_GLOBAL_LIST: '/global-list/removeGlobalList',
  SYNC_LC_LIST: '/global-list/sync',
  GET_GLOBAL_LIST_DETAIL: '/global-list-detail/insertGlobalListDetail',
  UPDATE_GLOBAL_LIST_DETAIL: '/global-list-detail/updateGlobalListDetail',
  CREATE_GLOBAL_LIST_DETAIL: '/global-list-detail/insertGlobalListDetail',
  REMOVE_GLOBAL_LIST_DETAIL: '/global-list-detail/removeGlobalListDetail'
}
