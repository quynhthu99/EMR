import SearchUnitCode from '@/views/crm/salesChannel/staff/SearchUnitCode'

const search = {
  searchField: {
    orgUnit: {
      value: '',
      ref: 'orgUnit',
      prop: 'orgUnit',
      type: SearchUnitCode,
      defaultAll: true,
      attrs: {
        allowClear: true,
        showSearch: true
      },
      rules: [
        {
          required: true, message: 'Bắt buộc phải nhập mã nhân viên'
        }
      ],
      lg: 24,
      md: 24,
      xs: 24
    }
  }
}
export default search
