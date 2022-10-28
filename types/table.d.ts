interface CustomCell {
  (record: any, rowIndex: number, column): void
}
export interface Columns {
  align?: 'left' | 'right' | 'center' // mac dinh left
  colSpan?: number
  customCell?: CustomCell
  customFilterDropdown?: boolean
  dataIndex: string
  title: string
  fixed?: boolean | string
  width?: boolean | string
  onFilter: any
  onFilterDropdownVisibleChange: any
  filterMode: any
  filterIcon: any
}
export interface Pagination {
  current: number
  pageSize: number
  showSizeChanger: boolean
  showQuickJumper: boolean
  pageSizeOptions: Array<string>
  showTotal: any
}
