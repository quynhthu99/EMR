export const IMAGE_BASE64_PREFIX = /^data:image\/[a-z]+;base64,/
export const RULES_NUMBER = {
  message: 'Không đúng định dạng',
  pattern: /^([0-9]+)(\\.([0-9]+)?)?$/
}
export const RULES_REQUIRED = {
  required: true,
  message: 'Trường bắt buộc'
}
export const RULES_1_TO_10 = {
  min: 1,
  max: 10,
  message: 'Chiều dài từ 1 đến 10 ký tự',
  trigger: 'change'
}
export const RULES_1_TO_20 = {
  min: 1,
  max: 20,
  message: 'Chiều dài từ 1 đến 20 ký tự',
  trigger: 'change'
}
export const RULES_1_TO_50 = {
  min: 1,
  max: 50,
  message: 'Chiều dài từ 1 đến 50 ký tự',
  trigger: 'change'
}
export const RULES_1_TO_200 = {
  min: 1,
  max: 200,
  message: 'Chiều dài từ 1 đến 200 ký tự',
  trigger: 'change'
}
export const RULES_1_TO_255 = {
  min: 1,
  max: 255,
  message: 'Chiều dài từ 1 đến 255 ký tự',
  trigger: 'change'
}
export const RULES_1_TO_500 = {
  min: 1,
  max: 500,
  message: 'Chiều dài từ 1 đến 500 ký tự',
  trigger: 'change'
}
export const RULES_UNSIGNED = {
  pattern: /^[a-zA-Z0-9_.-\s]/,
  message: 'Vui lòng nhập không dấu'
}
export const RULES_PHONE_NUMBER = {
  pattern: /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/,
  message: 'Vui lòng nhập đúng định dạng'
}
export const RULES_EMAIL = {
  pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
  message: 'Địa chỉ email không hợp lệ'
}
export const RULES_PASSWORD = {
  pattern: /(?=.*[A-Z]).(?=.*[!@#\$%\^&\*]).(?=.*\d).(?=.{5,})/g,
  message:
    'Mật khẩu phải độ dài tối thiểu 8 ký tự và chứa ít nhất 1 ký tự viết hoa, 1 ký tự số, 1 ký tự đặc biệt'
}

export const RULES_CHECK_CODE = {
  pattern: /^[a-zA-Z0-9_]+$/g,
  message: 'Chỉ được phép nhập ký tự chữ, số và _'
}

/**
 Hàm dùng validate trường là phần trăm
 */
export function validatePercent(rule, value, callback) {
  if (value) {
    const reg = new RegExp('^-?[0-9]+$', 'g')
    if (reg.test(value) === false) {
      callback(new Error(' Chỉ cho phép nhập ký tự số'))
    } else if (Number(value) > 100) {
      callback(new Error('Không nhập quá 100%'))
    } else {
      callback()
    }
  }
  callback()
}
