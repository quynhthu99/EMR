export default [
  {
    hidden: false,
    resizable: true,
    title: 'Hành động',
    dataIndex: 'operation',
    datatype: 'current',
    description: 'Hành động của các trường',
    width: 120
  },
  {
    title: ' Điễn giải ',
    dataIndex: 'explain',
    key: 'explain',
    hidden: false,
    datatype: 'number',
    width: 100
  },
  { title: ' Tk Nợ ', dataIndex: 'accountDebt', hidden: false, width: 200 },
  { title: ' Tk Trả ', dataIndex: 'accountPayment', hidden: false, width: 200 },
  { title: ' Số tiền ', dataIndex: 'money', hidden: false, width: 200 },
  { title: ' Đối tượng ', dataIndex: 'object', hidden: false, width: 200 },
  { title: ' Tên đối tượng ', dataIndex: 'objectName', hidden: false, width: 200 },
  { title: ' Tk ngân hàng ', dataIndex: 'backingName', hidden: false, width: 200 }
]
