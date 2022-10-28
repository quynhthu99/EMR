import { execute } from '@/services'
import API from '../defineRouting'
import { ProvinceResponse, DistrictResponse, WardResponse } from './types'
// Lấy danh sách xã, phường
export function getCommune(params = {}): Promise<WardResponse> {
  return execute(API.GET_COMMUNE, params)
}

// Lấy danh sách quận, huyện
export function getDistrict(params = {}): Promise<DistrictResponse> {
  return execute(API.GET_DISTRICT, params)
}

// Lấy danh sách tỉnh, thành phố
export function getProvince(params = {}): Promise<ProvinceResponse> {
  return execute(API.GET_PROVINCE, params)
}
