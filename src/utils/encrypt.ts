// from vben
import CryptoJS from 'crypto-js'
import { encrypt, decrypt } from 'crypto-js/aes'
import md5 from 'crypto-js/md5'
import UTF8 from 'crypto-js/enc-utf8'
import Base64 from 'crypto-js/enc-base64'

export interface EncryptionParams {
  key: string
  iv: string
}

export class AesEncryption {
  private key
  private iv

  constructor(opt: Partial<EncryptionParams> = {}) {
    const { key, iv } = opt
    if (key) {
      this.key = CryptoJS.enc.Utf8.parse(key)
    }
    if (iv) {
      this.iv = CryptoJS.enc.Utf8.parse(iv)
    }
  }

  get getOptions() {
    return {
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
      iv: this.iv
    }
  }

  encryptByAES(cipherText: string) {
    return CryptoJS.enc.Base64.stringify(encrypt(cipherText, this.key, this.getOptions).ciphertext)
  }

  decryptByAES(cipherText: string) {
    return decrypt(cipherText, this.key, this.getOptions).toString(UTF8)
  }
}

export function encryptByBase64(cipherText: string) {
  return UTF8.parse(cipherText).toString(Base64)
}

export function decodeByBase64(cipherText: string) {
  return Base64.parse(cipherText).toString(UTF8)
}

export function encryptByMd5(password: string) {
  return md5(password).toString()
}
