export default [
  {
    title: 'STT',
    dataIndex: 'rowIndex',
    key: 'rowIndex',
    align: 'center',
    ellipsis: true,
    width: 60
  },
  {
    title: 'Mã',
    dataIndex: 'code',
    key: 'code',
    align: 'left',
    ellipsis: true,
    width: 150
  },
  {
    title: 'Tên',
    dataIndex: 'name',
    key: 'name',
    align: 'left',
    width: 300,
    ellipsis: true
  },
  {
    title: 'Mô tả',
    dataIndex: 'description',
    key: 'description',
    scopedSlots: { customRender: 'description' },
    align: 'left',
    ellipsis: true
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    scopedSlots: { customRender: 'status' },
    align: 'center',
    ellipsis: true,
    width: 120
  }
]
