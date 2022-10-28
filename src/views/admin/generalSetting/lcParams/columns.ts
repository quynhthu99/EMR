export default [
  {
    title: 'STT',
    dataIndex: 'rowIndex',
    key: 'rowIndex',
    scopedSlots: { customRender: 'rowIndex' },
    align: 'center',
    ellipsis: true,
    width: 60
  },
  {
    title: 'Mã',
    dataIndex: 'code',
    key: 'code',
    scopedSlots: { customRender: 'code' },
    align: 'left',
    ellipsis: true,
    width: 150
  },
  {
    title: 'Tên',
    dataIndex: 'name',
    key: 'name',
    scopedSlots: { customRender: 'name' },
    align: 'left',
    width: 300,
    ellipsis: true
  },
  {
    title: 'Giá trị',
    dataIndex: 'value',
    key: 'value',
    scopedSlots: { customRender: 'value' },
    align: 'left',
    ellipsis: true,
    width: 200
  },
  {
    title: 'Mô tả',
    dataIndex: 'description',
    key: 'description',
    scopedSlots: { customRender: 'description' },
    align: 'left',
    ellipsis: true
  }
]
