import { ConversionUnit } from '#/conversionUnit'

export interface ProductItems {
  id: number
  avatar: string
  code: string
  name: string
  description: string
  descriptionPurchase: string
  descriptionSales: string
  listConversionUnit: Array<ConversionUnit>
  listProductGroup: Array<number>
  minOnHand: number
  source: string
  type: number
  unitId: number
  vatDeductionResolution43: number
  warrantyPeriod: number
}
