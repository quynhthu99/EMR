import { Response } from '@/utils/types'
type Province = {
  areaCode: string
  provinceCode: string
  provinceName: string
}

type District = {
  areaCode: string
  districtCode: string
  districtName: string
}

type Ward = {
  areaCode: string
  communeCode: string
  communeName: string
}

interface ProvinceResponse extends Response {
  body: Province[]
}

interface DistrictResponse extends Response {
  body: District[]
}

interface WardResponse extends Response {
  body: Ward[]
}
export { Province, District, Ward, ProvinceResponse, DistrictResponse, WardResponse }
