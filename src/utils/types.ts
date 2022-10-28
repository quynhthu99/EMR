type Crypt = (key: string, iv: string, data: string) => string
interface LangFile {
  [x: string]: string
}
interface I18nMsg {
  [x: string]: I18nMsgVal
}
type I18nMsgVal = I18nMsg | string

interface Response {
  message: string
  code: number
  body: any
}
interface BooleanResponse {
  message: string
  code: number
  body: boolean
}
interface PagingResponseBody {
  data: any
  page_meta: {
    page: number
    size: number
    total_elements: number
    total_pages: number
  }
}
interface PagingResponse extends Response {
  body: PagingResponseBody
}
interface User {
  authorization: [
    {
      actionSet: [string]
      parentId: string
      rsCode: string
      rsId: string
      type: number
      uri: string
    }
  ]
  birthday: string
  email: string
  fullName: string
  listRole: [Role]
  mobile: string
  staffId: number
  userId: string
  userName: string
  customerCode: string
}

interface Permission {
  attributes: {
    additionalProp1: [string]
    additionalProp2: [string]
    additionalProp3: [string]
  }
  clientId: string
  code: string
  description: string
  id: string
  level: number
  name: string
  parentId: string
  parentName: string
  status: number
  type: string
  uri: string
}

interface Role {
  code: string
  description: string
  id: string
  name: string
}

type Action = {
  key: string
  title: string
  activeClass: string
  icon: string
}

export {
  User,
  Permission,
  Response,
  PagingResponse,
  PagingResponseBody,
  BooleanResponse,
  I18nMsg,
  I18nMsgVal,
  Crypt,
  LangFile,
  Role,
  Action
}
