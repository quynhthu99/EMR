import { authService, commonService } from '@/utils/http/axios'
import { Response } from '@/utils/types'

export function execute(
  url: string,
  params?: any,
  method = 'get',
  configs = {}
): Promise<Response> {
  return ['get', 'request', 'delete', 'head', 'options'].includes(method)
    ? commonService[method](url, { params: params })
    : commonService[method](url, params, configs)
}

export function executeAuth(
  url: string,
  params?: any,
  method = 'get',
  configs = {}
): Promise<Response> {
  return ['get', 'request', 'delete', 'head', 'options'].includes(method)
    ? authService[method](url, { params: params })
    : authService[method](url, params, configs)
}
