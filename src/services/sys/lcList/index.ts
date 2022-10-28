import API from '../../sys/defineRouting'
import { execute } from '../../index'

/**
 *
 * @param params //
 */
export function getGlobalListByCode(params) {
  return execute(API.GET_LC_LIST_BY_CODE, params, 'get')
}
export function searchGlobalList(params) {
  return execute(API.GET_GLOBAL_LIST, params, 'get')
}
export function createGlobalList(params) {
  return execute(API.CREATE_GLOBAL_LIST, params, 'post')
}
export function updateGlobalList(params) {
  return execute(API.UPDATE_GLOBAL_LIST, params, 'post')
}
export function deleteGlobalList(params) {
  return execute(API.REMOVE_GLOBAL_LIST, params, 'post')
}
export function createGlobalListDetail(params) {
  return execute(API.CREATE_GLOBAL_LIST_DETAIL, params, 'post')
}

export function delGlobalListDetail(params) {
  return execute(API.REMOVE_GLOBAL_LIST_DETAIL, params, 'post')
}

export function updateGlobalListDetail(params) {
  return execute(API.UPDATE_GLOBAL_LIST_DETAIL, params, 'post')
}
export function syncGlobalList() {
  return execute(API.SYNC_LC_LIST, null, 'post')
}
