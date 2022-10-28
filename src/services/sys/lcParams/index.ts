import API from '../../sys/defineRouting'
import { execute } from '../../index'

export function searchGlobalParam(params) {
  return execute(API.GET_LC_PARAMS, params, 'get')
}
export function createGlobalParam(params) {
  return execute(API.CREATE_LC_PARAMS, params, 'post')
}
export function updateGlobalParam(params) {
  return execute(API.UPDATE_LC_PARAMS, params, 'post')
}
export function deleteGlobalParam(params) {
  return execute(API.REMOVE_LC_PARAMS, params, 'post')
}
export function syncGlobalParams() {
  return execute(API.SYNC_LC_PARAMS, null, 'post')
}

export function getLcParamsByCode(params) {
  return execute(API.GET_LC_PARAMS_BY_CODE, params, 'get')
}
