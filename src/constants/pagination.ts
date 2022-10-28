export default {
  current: 1,
  pageSize: 15,
  showSizeChanger: true,
  showQuickJumper: true,
  pageSizeOptions: ['15', '25', '50', '100'],
  showTotal: (total: number) => {
    return 'Tổng số dòng ' + total
  }
}
