const mixin = {
  methods: {
    /**
     *
     * @param pageSize
     * @param currentPage
     * @param rowIndex
     */
    getTableRowIndex(pageSize: number, currentPage: number, rowIndex: number): number {
      if (currentPage === 0) {
        currentPage = 1
      }
      return (currentPage - 1) * pageSize + rowIndex + 1
    },
    /**
     *
     * @param body // response
     * @return totalData
     */
    handlePaginationData(body: any) {
      if (body) {
        return { total: body.page_meta.total_elements }
      } else {
        return {}
      }
    },
    /**
     * kiểm tra có phải là mảng hay không
     * @param arr
     * @returns {boolean}
     * @createBy: chiempt
     */
    checkArray(arr): boolean {
      return !!(arr && Array.isArray(arr))
    },
    /**
     * kiểm tra có phải là mảng hay không, và check mảng có ít nhất 1 phần tử
     * @param arr
     * @returns {boolean}
     */
    checkArrayExist(arr): boolean {
      return !!(arr && Array.isArray(arr) && arr.length)
    },
    /**
     * Lấy tên của globallist theo mã
     * @param arr
     * @param value
     * @param keyName
     * @param name
     * @return value: Tên
     */
    getText(arr: any, value: string, keyName: string, name: string): string {
      console.log(arr, value, keyName, name)
      if (this.checkArrayExist(arr) && value) {
        for (const arrElement of arr) {
          if (arrElement && arrElement[keyName] === value) {
            return arrElement[name]
          }
        }
      }
      return ''
    },
    getLocationNameByCode(arr: any, code: string): string {
      if (this.checkArrayExist(arr) && code) {
        for (const arrElement of arr) {
          if (arrElement && arrElement.provinceCode === code) {
            return arrElement.provinceName
          }
        }
      }
      return ''
    }
  }
}
export default mixin
