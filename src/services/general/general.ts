import { execute } from '@/services'
import API from '@/services/defineRouting'

export function getGlobalListByCode(params) {
  return execute(API.GET_GLOBAL_LIST_BY_CODE, params, 'get')
}
