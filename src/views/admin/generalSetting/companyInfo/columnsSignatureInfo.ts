export const columnsSignatureInfo = [
  {
    title: 'Chức danh',
    dataIndex: 'identification',
    slots: { customRender: 'identification' },
    width: 50
  },
  {
    title: 'Tiêu đề người ký',
    dataIndex: 'titleSigner',
    slots: { customRender: 'titleSigner' },
    align: 'center',
    width: 50
  },
  {
    title: 'Tên người ký',
    dataIndex: 'signerName',
    slots: { customRender: 'signerName' },
    align: 'center',
    width: 50
  }
]
