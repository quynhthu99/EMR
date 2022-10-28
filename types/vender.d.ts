export interface FormFilter {
  code: string
  name: string
  taxCode: string
  address: string
  phoneNumber: string
}
export interface FormCustomerOrganization {
  taxCode: string // Mã số thuế
  customerCode: string // Mã khách hàng
  customerTel: string // Số điện thoại
  customerWebsite: string // website khách hàng
  customerName: string // Tên khách hàng
  aoGroupId: string // Nhóm khách hàng
  customerAddress: string // Địa chỉ khách hàng
  aoEmployeeId: string // Nhân viên bán hàng

  // Liên hệ
  prefixName: string // Xưng hô
  contactName: string // họ và tên liên hệ
  contactEmail: string // Email liên hệ
  contactTel: string // SDT liên hệ
  contactLegalRepresentative: string // Đại diện theo PL
  contactEInvName: string // Họ tên người nhận hóa đơn
  contactEInvEmail: string // Email người nhận hóa đơn
  contactEInvTel: string // SDT người nhận hóa đơn

  //Điều khoản thanh toán
  paymentTermId: number // Số điều khoản thanh toán
  dueTime: number // Số ngày dc nợ
  maxDebtAmount: number // Số nợ tối đa
  receiveAccountId: number // tài khoản công nợ phải thu tối đa

  // Ghi chú
  note: string // ghi chú
}

interface FormCustomerPersonal {
  taxCode: string // Mã số thuế
  customerCode: string // Mã khách hàng
  aoGroupId: string // Nhóm khách hàng
  prefixName: string // Xưng hô
  customerName: string // Tên khách hàng
  aoEmployeeId: string // Nhân viên bán hàng
  customerAddress: string // Địa chỉ khách hàng
  // Liên hệ
  contactEmail: string // Email liên hệ
  contactTel: string // SDT liên hệ cố định
  contactMobile: string // SDT liên hệ di động
  //Thông tin căn cước
  contactIdNo: string // số CCCD người liên hệ
  contactIdIssueDate: string // Ngày cấp CCCD người liên hệ
  contactIdIssuePlace: string // Nơi cấp CCCD người liên hệ
  // đại diện pháp lý
  contactLegalRepresentative: string // Đại diện theo PL

  //Điều khoản thanh toán
  paymentTermId: number // Số điều khoản thanh toán
  dueTime: number // Số ngày dc nợ
  maxDebtAmount: number // Số nợ tối đa
  receiveAccountId: number // tài khoản công nợ phải thu tối đa

  // Ghi chú
  note: string // ghi chú
}
