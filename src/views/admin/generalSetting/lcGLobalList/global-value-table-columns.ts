export default [
  {
    title: 'Giá trị',
    dataIndex: 'value',
    key: 'value',
    scopedSlots: { customRender: 'value' },
    align: 'center',
    width: 150,
    ellipsis: true
  },
  {
    title: 'Mã',
    dataIndex: 'code',
    key: 'code',
    scopedSlots: { customRender: 'code' },
    align: 'left',
    width: 150,
    ellipsis: true
  },
  {
    title: 'Tên',
    dataIndex: 'name',
    key: 'name',
    scopedSlots: { customRender: 'name' },
    align: 'left',
    width: 250,
    ellipsis: true
  },
  {
    title: 'Mô tả',
    dataIndex: 'description',
    key: 'description',
    align: 'left',
    ellipsis: true
  },
  {
    title: 'Thứ tự',
    dataIndex: 'displayOrder',
    key: 'displayOrder',
    align: 'center',
    width: 70,
    ellipsis: true
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    align: 'left',
    width: 150,
    ellipsis: true
  }
]
