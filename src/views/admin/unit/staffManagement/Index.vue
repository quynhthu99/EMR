<template>
  <div class="staff ml-1.5 mr-1.5">
    <vaBreadCrumb>
      <template #extraAction>
        <a-button type="primary" class="ml-auto pt-0 pb-0" @click="onCreateStaff">
          <template #icon> <PlusCircleOutlined /></template>
          Thêm mới
        </a-button>
      </template>
    </vaBreadCrumb>
    <a-spin :spinning="loadingSpin" tip="Loading...">
      <a-collapse
        v-model:activeKey="activeSearchKey1"
        expand-icon-position="left"
        style="background: #ffffff; margin-bottom: 12px"
      >
        <a-collapse-panel key="1" header="Danh sách nhân viên">
          <a-row :gutter="16" style="padding-top: 8px">
            <a-col :xs="24" :md="24" :lg="18">
              <a-form ref="searchForm" :model="filters">
                <a-row :gutter="16">
                  <a-col :span="6">
                    <a-form-item
                      :label="'Mã đơn vị'"
                      name="orgUnitCode"
                      :rules="[
                        {
                          required: true,
                          message: 'Mã đơn vị là trường bắt buộc'
                        }
                      ]"
                    >
                      <a-select
                        v-model:value="filters.orgUnitCode"
                        placeholder="Nhập mã đơn vị ..."
                        :not-found-content="fetching ? undefined : null"
                        show-search
                        style="width: 100%"
                        @search="fetchData"
                        @change="onchange"
                      >
                        <a-spin v-if="fetching" tip="Tìm kiếm đơn vị..." size="small" />
                        <a-select-option
                          v-for="item in dataUnitSelect"
                          :key="item.code"
                          :value="item.code"
                          >{{ item.name }}
                        </a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                  <a-col :span="6">
                    <a-form-item :label="'Tên nhân viên'">
                      <a-input v-model:value="filters.staffName"></a-input>
                    </a-form-item>
                  </a-col>
                  <a-col :span="6">
                    <a-form-item :label="'Số điện thoại'" name="phoneNumber" :rules="[]">
                      <a-input v-model:value="filters.phoneNumber"></a-input>
                    </a-form-item>
                  </a-col>
                  <a-col :span="6">
                    <a-form-item :label="'Email'" name="email" :rules="[]">
                      <a-input v-model:value="filters.email"></a-input>
                    </a-form-item>
                  </a-col>
                </a-row>
              </a-form>
            </a-col>
            <a-col :xs="24" :md="24" :lg="6">
              <div style="display: flex; justify-content: flex-end">
                <a-button
                  class="uppercase"
                  type="default"
                  style="min-width: 120px; display: block; margin-right: 12px"
                  @click="resetFilters"
                >
                  Nhập lại
                </a-button>
                <a-button
                  class="uppercase"
                  type="primary"
                  style="min-width: 120px; display: block"
                  @click="searchStaff"
                >
                  <template #icon><SearchOutlined /></template>
                  Tìm kiếm
                </a-button>
              </div>
            </a-col>
          </a-row>
        </a-collapse-panel>
      </a-collapse>
      <a-card style="border: 1px solid #d9d9d9; margin-bottom: 12px">
        <a-row :gutter="16" type="flex">
          <a-col :span="24">
            <div class="wrapper1">
              <div class="div1"></div>
            </div>
            <a-table
              :columns="columns"
              :pagination="pagination"
              :data-source="data"
              :loading="loadingTable"
              :row-key="'index'"
              :scroll="{ x: '100%', y: '100%' }"
              :row-class-name="rowClassName"
              size="small"
              bordered
              :custom-row="
                (record, index) => {
                  return {
                    onClick: () => {
                      onRow(record, index)
                    }
                  }
                }
              "
              @change="handleTableChange"
            >
              <template #bodyCell="{ column, record, index }">
                <template v-if="column.key === 'rowIndex'">
                  <span>
                    {{ getTableRowIndex(pagination.pageSize, pagination.current, index) }}
                  </span>
                </template>
                <template v-if="column.key === 'actionTitle'">
                  <span> <ControlOutlined /> </span>
                </template>
                <template v-if="column.key === 'status'">
                  <div class="h-full">
                    <div
                      class="h-full flex justify-center items-center hover:cursor-pointer"
                      :class="[record.status === 1 ? 'va-text-green' : 'va-text-red']"
                      @click="onChangeStatusStaff(record)"
                    >
                      <a-tooltip>
                        <template #title>
                          <span v-if="record.status === 1">Đang sử dụng</span>
                          <span v-else>Ngừng sử dụng</span>
                        </template>
                        <va-svg-icon
                          v-if="record.status === 1"
                          name="check-circle"
                          color="#5dae8b"
                          class="w-5 h-5"
                        ></va-svg-icon>
                        <va-svg-icon
                          v-else
                          name="x-circle"
                          color="#ff7676"
                          class="w-5 h-5"
                        ></va-svg-icon>
                      </a-tooltip>
                    </div>
                  </div>
                </template>
                <template v-if="column.key === 'operation'">
                  <div class="h-full flex justify-center items-center hover:cursor-pointer">
                    <a-tooltip>
                      <template #title>
                        <span>Sửa</span>
                      </template>
                      <va-svg-icon
                        name="edit"
                        class="mr-2 cursor-pointer"
                        color="#1890ff"
                        :style="{ fontSize: '14px' }"
                        @click="onEdit(record)"
                      />
                    </a-tooltip>

                    <a-tooltip>
                      <template #title><span>Xóa</span></template>
                      <va-svg-icon
                        name="delete"
                        color="red"
                        class="cursor-pointer"
                        :style="{ fontSize: '14px' }"
                        @click="handleRemove(record)"
                      />
                    </a-tooltip>
                  </div>
                </template>
              </template>
            </a-table>
          </a-col>
        </a-row>
      </a-card>
      <a-row :gutter="24">
        <a-col :lg="14" style="padding-right: 0px !important">
          <a-collapse
            v-model:activeKey="activeSearchKey2"
            expand-icon-position="left"
            style="margin-bottom: 12px; background: #ffffff"
          >
            <a-collapse-panel key="2" header="Lịch sử thay đổi đơn vị">
              <a-row :gutter="16" type="flex">
                <a-col :span="24" style="padding-top: 8px">
                  <a-table
                    :columns="columnsUnit"
                    :pagination="paginationUnit"
                    :data-source="dataUnit"
                    :loading="loadingTableUnit"
                    bordered
                    size="small"
                    :row-key="'index'"
                    @change="handleTableChangeUnit"
                  >
                    <template #bodyCell="{ column, record, index }">
                      <template v-if="column.key === 'rowIndex'">
                        {{
                          getTableRowIndex(paginationUnit.pageSize, paginationUnit.current, index)
                        }}
                      </template>
                      <template v-if="column.key === 'staTime'">
                        <a-tooltip placement="top">
                          <template #title>
                            <span
                              >{{
                                record.staTime
                                  ? moment(record.staTime, 'DD/MM/YYYY').format('DD/MM/YYYY')
                                  : ''
                              }}
                            </span>
                          </template>
                          <span
                            >{{
                              record.staTime
                                ? moment(record.staTime, 'DD/MM/YYYY').format('DD/MM/YYYY')
                                : ''
                            }}
                          </span>
                        </a-tooltip>
                      </template>
                      <template v-if="column.key === 'endTime'">
                        <a-tooltip placement="top">
                          <template #title>
                            <span
                              >{{
                                record.endTime
                                  ? moment(record.endTime, 'DD/MM/YYYY').format('DD/MM/YYYY')
                                  : ''
                              }}
                            </span>
                          </template>
                          <span
                            >{{
                              record.endTime
                                ? moment(record.endTime, 'DD/MM/YYYY').format('DD/MM/YYYY')
                                : ''
                            }}
                          </span>
                        </a-tooltip>
                      </template>
                    </template>
                  </a-table>
                </a-col>
              </a-row>
            </a-collapse-panel>
          </a-collapse>
        </a-col>
        <a-col :lg="10">
          <a-collapse
            v-model:activeKey="activeSearchKey2"
            expand-icon-position="left"
            style="margin-bottom: 12px; background: #ffffff"
          >
            <a-collapse-panel key="2" header="Danh sách vai trò">
              <a-row :gutter="16">
                <a-col :span="24" style="padding-top: 8px">
                  <a-table
                    :columns="columnsRole"
                    :pagination="paginationRole"
                    :data-source="ListTableRole"
                    :loading="loadingTableRole"
                    :row-key="'index'"
                    bordered
                    size="small"
                    @change="handleTableChangeRole"
                  >
                    <template #bodyCell="{ column, index }">
                      <template v-if="column.key === 'actionTitle'">
                        <span><svg-icon name="control"></svg-icon></span>
                      </template>
                      <template v-if="column.key === 'rowIndex'">
                        <span>
                          {{
                            getTableRowIndex(paginationRole.pageSize, paginationRole.current, index)
                          }}
                        </span>
                      </template>
                    </template>
                  </a-table>
                </a-col>
              </a-row>
            </a-collapse-panel>
          </a-collapse>
        </a-col>
      </a-row>
    </a-spin>
    <a-drawer
      :title="`${titleDrawer} ${nameUnit !== '' ? nameUnit : 'Nhân viên'}`"
      :width="500"
      :visible="visible"
      :mask-closable="false"
      :body-style="{ paddingBottom: '80px' }"
      @close="onClose"
    >
      <a-spin :spinning="loadingDrawer">
        <a-form ref="formUnit" :model="form" layout="vertical">
          <a-row :gutter="16">
            <a-col :span="10">
              <a-form-item
                label="Mã nhân viên"
                name="staffCode"
                :rules="[
                  { required: true, message: 'Trường bắt buộc' },
                  { max: 20, message: 'Mã nhân viên tối đa 20 ký tự' }
                ]"
              >
                <a-input v-model:value="form.staffCode" :max-length="20" :disabled="isEdit" />
              </a-form-item>
            </a-col>
            <a-col :span="14">
              <a-form-item
                label="Tên nhân viên"
                name="staffName"
                :rules="[
                  { required: true, message: 'Trường bắt buộc' },
                  { max: 100, message: 'Tên nhân viên tối đa 100 ký tự' }
                ]"
              >
                <a-input v-model:value="form.staffName" :max-length="100" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="24">
              <a-form-item
                :label="'Mã đơn vị'"
                name="orgUnitCode"
                :rules="[
                  {
                    required: true,
                    message: 'Trường bắt buộc',
                    trigger: 'blur'
                  }
                ]"
              >
                <a-select
                  v-model:value="form.orgUnitCode"
                  v-bind="{
                    allowClear: true,
                    showSearch: true
                  }"
                  placeholder="Nhập mã đơn vị ..."
                  class="w-full"
                  @search="fetchData"
                  @change="onchange"
                >
                  <a-select-option
                    v-for="(item, index) in dataUnitSelect"
                    :key="index"
                    :value="item.code"
                    >{{ `${item.code} - ${item.name}` }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="10">
              <a-form-item
                label="Số điện thoại"
                name="phoneNumber"
                :rules="[{ required: true, message: 'Trường bắt buộc' }, RULES_PHONE_NUMBER]"
              >
                <a-input v-model:value="form.phoneNumber"> </a-input>
              </a-form-item>
            </a-col>
            <a-col :span="14">
              <a-form-item
                label="Email liên hệ"
                name="email"
                :rules="[{ required: true, message: 'Trường bắt buộc' }, RULES_EMAIL]"
              >
                <a-input v-model:value="form.email"> </a-input>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="24">
              <a-form-item name="isUser" style="margin-bottom: 12px !important">
                <a-checkbox
                  v-model:value="form.isUser"
                  v-model:checked="form.isUser"
                  :disabled="disableIsUser"
                  >Là người dùng</a-checkbox
                >
              </a-form-item>
            </a-col>
            <a-col :span="10">
              <a-form-item
                v-if="form.isUser"
                label="Tài khoản truy cập"
                name="userName"
                :rules="[
                  {
                    required: true,
                    trigger: 'change'
                  }
                ]"
              >
                <a-input v-model:value="form.userName" :disabled="disableIsUser">
                  <template #prefix>
                    {{ customerCode ? customerCode + '-' : '' }}
                  </template>
                </a-input>
              </a-form-item>
            </a-col>
            <a-col :span="14">
              <a-form-item
                v-if="form.isUser"
                label="Email tài khoản"
                name="iamUserEmail"
                :rules="[
                  {
                    required: true,
                    trigger: 'change'
                  },
                  RULES_EMAIL
                ]"
              >
                <a-input v-model:value="form.iamUserEmail" :disabled="disableIsUser" />
              </a-form-item>
            </a-col>
            <a-col :span="24" style="margin: auto; display: flex; justify-content: flex-end">
              <a-button
                type="primary"
                :loading="loadingRole"
                @click="() => (visibleRole = !visibleRole)"
              >
                <template #icon><SearchOutlined /></template>
                Vai trò
              </a-button>
            </a-col>
          </a-row>
        </a-form>
      </a-spin>
      <div
        :style="{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
          zIndex: 1
        }"
      >
        <a-button :style="{ marginRight: '8px' }" @click="onClose"> Bỏ qua </a-button>
        <a-button type="primary" @click="handleSubmit"> Lưu </a-button>
      </div>
    </a-drawer>
    <a-drawer
      :title="`Thêm vai trò cho nhân viên: ${form.staffName ? form.staffName : ''}`"
      :width="500"
      :visible="visibleRole"
      :mask-closable="true"
      :body-style="{ paddingBottom: '80px' }"
      @close="onCloseRole"
    >
      <a-form layout="vertical">
        <a-row>
          <a-input
            v-model:value="keyWord"
            style="width: 100%"
            placeholder="Nhập nội dung tìm kiếm..."
            @change="onSearchToGrantRole"
          />
        </a-row>
        <a-row :gutter="16">
          <a-list
            class="demo-loadmore-list"
            :loading="loading"
            item-layout="horizontal"
            :data-source="ListRole"
          >
            <template #renderItem="{ item }">
              <a-list-item>
                <template #actions>
                  <a-checkbox v-model:checked="item.isActive" @change="getRoleId(item)" />
                </template>
                <a-list-item-meta :description="`CODE: ${item.code}, ${item.description}`">
                  <template #title>
                    <b>{{ item.name }}</b>
                  </template>
                </a-list-item-meta>
              </a-list-item>
            </template>
          </a-list>
        </a-row>
      </a-form>
      <div
        :style="{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
          zIndex: 1
        }"
      >
        <a-button :style="{ marginRight: '8px' }" @click="onCloseRole"> Bỏ qua </a-button>
        <a-button type="primary" @click="onSaveRole"> Lưu </a-button>
      </div>
    </a-drawer>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import ls from '@/utils/Storage'
import { USER_INFO } from '@/store/mutation-types'
import columns from './columns'
import columnsUnit from './columnsUnit'
import columnsRole from './columnsRole'
import _merge from 'lodash.merge'
import moment from 'moment'
import { PlusCircleOutlined, SearchOutlined, ControlOutlined } from '@ant-design/icons-vue'
import { findByOrgUnitCode } from '@/services/sys/orgUnit'
import {
  searchStaff,
  createStaff,
  updateStaff,
  deleteStaff,
  changeStatusStaff
} from '@/services/sys/staff'
import { getStaffRole, getAllRole } from '@/services/sys/staffAdminRole'
import { findByStaffId } from '@/services/sys/orgUnitStaff'
import { RULES_PHONE_NUMBER, RULES_EMAIL } from '@/constants/validation.ts'

export default defineComponent({
  components: {
    PlusCircleOutlined,
    SearchOutlined,
    ControlOutlined
  },
  data() {
    return {
      RULES_PHONE_NUMBER,
      RULES_EMAIL,
      ls,
      USER_INFO,
      moment,
      columns,
      columnsUnit,
      columnsRole,
      customerCode: '',
      typeComponent: 'staff',
      filters: {
        orgUnitCode: '',
        staffName: '',
        phoneNumber: '',
        email: ''
      },
      ListRole: [],
      ListTableRole: [],
      loadingSpin: true,
      activeSearchKey1: 1,
      activeSearchKey2: 2,
      activeSearchKey3: 3,
      visible: false,
      loadingDrawer: false,
      loadingRole: false,
      loadingMore: false,
      loading: false,
      loadingTable: false,
      loadingTableUnit: false,
      loadingTableRole: false,
      visibleRole: false,
      fetching: false,
      isEdit: false,
      form: {
        staffId: null,
        staffCode: '',
        staffName: '',
        phoneNumber: '',
        email: '',
        userName: '',
        iamUserEmail: '',
        orgUnitId: '',
        lstRoleId: [],
        isUser: true
      },
      data: [],
      dataUnitSelect: [],
      dataUnit: [],
      dataRoleActive: [],
      listRoleId: [],
      listUnitType: [],
      listUnitName: [],
      pagination: {
        current: 1,
        total: 0,
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['10', '25', '50'],
        showTotal: (total) => {
          return 'Tổng số dòng ' + total
        }
      },
      disableIsUser: false,
      paginationLoadForm: {
        current: 1,
        total: 0,
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['10', '25', '50'],
        showTotal: (total) => {
          return 'Tổng số dòng ' + total
        }
      },
      paginationUnit: {
        current: 1,
        total: 0,
        pageSize: 15,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['15', '25', '50'],
        showTotal: (total) => {
          return 'Tổng số dòng ' + total
        }
      },
      paginationRole: {
        current: 1,
        total: 0,
        pageSize: 15,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['15', '25', '50'],
        showTotal: (total) => {
          return 'Tổng số dòng ' + total
        }
      },
      systems: [
        {
          text: 'Quản Lý Tổ Chức',
          value: 'organization',
          name: 'sales-channel.organization'
        },
        {
          text: 'Quản Lý Nhân Viên',
          value: 'staff',
          name: 'sales-channel.staff'
        }
      ],
      titleDrawer: 'Thêm mới',
      nameUnit: '',
      staffId: '',
      keyWord: ''
    }
  },
  async created() {
    await Promise.all([this.getAllRole(), this.getDataStaff()])
    const userInfo = ls.get(USER_INFO)
    this.customerCode = userInfo ? userInfo.customerCode : ''
  },
  mounted() {
    setTimeout(() => {
      this.loadingSpin = false
    }, 200)
  },
  methods: {
    onChangeStatusStaff(record) {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const $this = this
      this.$confirm({
        title: `Bạn có chắc muốn thay đổi trạng thái ${record.staffName}`,
        onOk() {
          $this.onChangeStatus(record)
        }
      })
    },
    onChangeStatus(record) {
      changeStatusStaff({ staffId: record.staffId }).then((res) => {
        this.getDataStaff()
      })
    },
    showDrawer(event) {
      event.stopPropagation()
      this.visible = true
    },
    onCreateStaff(event) {
      event.stopPropagation()
      this.visible = true
      this.isEdit = false
    },
    onClose() {
      this.visible = false
      this.nameUnit = ''
      this.titleDrawer = 'Thêm mới'
      this.resetForm()
      this.dataUnitSelect = []
    },
    onCloseRole() {
      this.visibleRole = false
    },
    onSaveRole() {
      this.form.lstRoleId = this.dataRoleActive
      this.visibleRole = false
    },
    searchStaff() {
      this.$refs.searchForm.validate().then(() => {
        this.pagination.current = 1
        this.pagination.pageSize = 10
        this.getDataStaff()
      })
    },
    async getDataStaff() {
      this.loadingTable = true
      const params = {
        page: this.pagination.current > 0 ? this.pagination.current - 1 : 0,
        size: this.pagination.pageSize || 10,
        orgUnitCode: this.filters.orgUnitCode,
        staffName: this.filters.staffName,
        email: this.filters.email,
        phoneNumber: this.filters.phoneNumber
      }
      this.dataUnit = []
      searchStaff(params)
        .then((rs) => {
          if (rs.body) {
            this.data = rs.body.data
            this.pagination = _merge(this.pagination, this.handlePaginationData(rs.body))
            if (Array.isArray(rs.body.data) && rs.body.data) {
              this.onRow(rs.body.data[0])
            }
          }
        })
        .finally(() => {
          this.loadingTable = false
        })
    },
    handleTableChange(pagination, filters, sorter) {
      this.pagination = pagination
      this.getDataStaff()
    },
    handleTableChangeUnit(pagination, filters, sorter) {
      this.paginationUnit = pagination
      this.findByStaffId(this.staffId)
    },
    handleTableChangeRole(pagination, filters, sorter) {
      this.paginationRole = pagination
    },
    resetForm() {
      this.form = {
        staffId: null,
        staffCode: '',
        staffName: '',
        phoneNumber: '',
        email: '',
        orgUnitId: '',
        lstRoleId: [],
        isUser: true,
        userName: '',
        iamUserEmail: ''
      }
      this.$refs.formUnit.clearValidate()
      this.disableIsUser = false
      this.getAllRole()
    },
    handleSubmit(e) {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const $this = this
      e.preventDefault()
      this.$refs.formUnit.validate().then((valid) => {
        if (valid) {
          $this.$confirm({
            title: `Bạn có chắc chắn muốn ${!$this.form.staffId ? 'Thêm mới' : 'Cập nhật'}`,
            okType: 'primary',
            onOk() {
              if (!$this.form.staffId) {
                $this.doCreate($this.form)
              } else {
                $this.doUpdate($this.form)
              }
            }
          })
        }
      })
    },
    handleRemove(record) {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const $this = this
      if (record.staffId) {
        $this.$confirm({
          title: `Bạn có chắc chắn muốn xóa nhân viên: ${record.staffName}`,
          okType: 'primary',
          onOk() {
            $this.doDelete(record.staffId)
          }
        })
      } else {
        $this.$warning({
          title: 'Thông báo',
          content: 'Không tìm thấy ID của bản ghi'
        })
      }
    },
    async doDelete(id) {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const $this = this
      const params = {
        staffId: id
      }
      try {
        const res = await deleteStaff(params)
        if (res.code === 'API000' && res.message === 'SUCCESS') {
          await $this.getDataStaff()
        }
      } finally {
      }
    },
    async doCreate(values) {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const $this = this
      values['lstRoleId'] = this.dataRoleActive
      const params = this.customParams(values)
      delete params.staffId
      try {
        this.loadingDrawer = true
        const res = await createStaff(params)
        if (res && (res.body || res.message === 'SUCCESS')) {
          $this.$message.success({ content: 'Thêm mới nhân viên thành công' })
          $this.onClose()
          await this.getDataStaff()
          await this.resetForm()
        } else {
          $this.$error({ content: 'Thêm mới nhân viên thất bại' })
        }
      } finally {
        this.loadingDrawer = false
      }
    },
    async doUpdate(values) {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const $this = this
      values['lstRoleId'] = this.ListRole.filter((active) => active.isActive === true).map(
        (item) => item.id
      )
      const params = $this.customParams(values)
      try {
        this.loadingDrawer = true
        const res = await updateStaff(params)
        if (res.code === 'API000') {
          $this.$message.success({ content: 'Cập nhật nhân viên thành công' })
          $this.onClose()
          await this.getDataStaff()
          await this.resetForm()
        } else {
          $this.$error({ content: 'Cập nhật nhân viên thất bại' })
        }
      } finally {
        this.loadingDrawer = false
        this.isEdit = false
      }
    },
    customParams(values) {
      const orgId = this.dataUnitSelect.find((item) => {
        return String(item.code) === String(values.orgUnitCode)
      })
      const params = {
        staffId: values.staffId,
        staffCode: values.staffCode,
        staffName: values.staffName,
        phoneNumber: values.phoneNumber,
        email: values.email,
        orgUnitId: orgId ? orgId.id : '',
        orgUnitCode: values.orgUnitCode,
        lstRoleId: values.lstRoleId,
        isUser: values.isUser,
        userName: values.userName,
        iamUserEmail: values.iamUserEmail
      }
      return params
    },
    setField(record) {
      // const orgCode = this.dataUnitSelect.find(item => String(item.id) === String(record.orgUnitId))
      this.form = {
        staffId: record.staffId,
        staffCode: record.staffCode,
        staffName: record.staffName,
        phoneNumber: record.phoneNumber,
        email: record.email,
        orgUnitId: record.orgUnitId,
        // 'orgUnitCode': orgCode ? orgCode.code : '',
        orgUnitCode: record.orgUnitCode,
        lstRoleId: this.listRoleId,
        isUser: record.isUser,
        userName: record.iamUserName ? record.iamUserName : '',
        iamUserEmail: record.iamUserEmail
      }
      this.ListRole.map((item) => {
        if (this.form.lstRoleId && Array.isArray(this.form.lstRoleId)) {
          item.isActive = !!this.form.lstRoleId.includes(item.id)
        }
        return item
      })
    },
    async onView(record) {
      this.titleDrawer = 'Xem chi tiết'
      this.nameUnit = record.staffName
      this.visible = true
      if (this.visible) {
        this.setField(record)
      }
    },
    async onEdit(record) {
      this.titleDrawer = 'Cập nhật'
      this.nameUnit = `Nhân viên: ${record.staffName}`
      this.visible = true
      this.isEdit = true
      if (this.visible) {
        await this.getStaffRole(record.staffId)
        this.setField(record)
        this.disableIsUser = !!this.form.isUser
      }
      if (record.orgUnitCode) {
        await this.fetchData(record.orgUnitCode)
      }
    },
    async getStaffRole(staffId) {
      const params = {
        staffId: staffId
      }
      try {
        this.loadingTableRole = true
        const res = await getStaffRole(params)
        if (res.code === 'API000') {
          this.ListTableRole = res.body
          this.listRoleId = res.body.map((item) => {
            return item.id
          })
        }
      } finally {
        this.loadingTableRole = false
      }
    },
    async getAllRole() {
      try {
        const res = await getAllRole({ keyWord: this.keyWord })
        if (res.code === 'API000') {
          this.ListRole = res.body.map((item) => {
            item.isActive = false
            return item
          })
        }
      } finally {
      }
    },
    onSearchToGrantRole(e) {
      const keyWord = e.target.value
      getAllRole({ keyWord: keyWord }).then((res) => {
        res.body.forEach((item) => {
          if (this.dataRoleActive.includes(item.id)) {
            item.isActive = true
          }
        })
        const arr = [...res.body]
        this.ListRole = arr
      })
    },
    async getRoleId(item) {
      if (item.isActive) {
        this.dataRoleActive.push(item.id)
      } else {
        this.dataRoleActive = this.dataRoleActive.filter((roleId) => roleId !== item.id)
      }
    },
    rowClassName(record, index) {
      let className = ''
      if (record.isActive) {
        className = 'active-row'
      }
      return className
    },
    async onRow(record) {
      if (record) {
        this.onActiveRow(record)
        await this.findByStaffId(record.staffId)
        await this.getStaffRole(record.staffId)
      }
    },
    async findByStaffId(staffId) {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const $this = this
      $this.loadingTableUnit = true
      $this.staffId = staffId
      const params = {
        page: $this.pagination.current > 0 ? $this.pagination.current - 1 : 0,
        size: $this.pagination.pageSize || 10,
        staffId: staffId
      }
      try {
        const res = await findByStaffId(params)
        this.dataUnit = res.body.data
        this.paginationUnit = _merge(this.paginationUnit, this.handlePaginationData(res.body))
      } finally {
        $this.loadingTableUnit = false
      }
    },
    onActiveRow(record) {
      this.data.forEach((item, index) => {
        if (item.staffId === record.staffId) {
          item['isActive'] = true
        } else {
          item['isActive'] = false
        }
      })
    },
    async fetchData(value) {
      try {
        this.dataUnitSelect = []
        this.fetching = true
        const params = {
          orgUnitCode: value
        }
        const { body } = await findByOrgUnitCode(params)
        if (body) {
          this.dataUnitSelect = [{ ...body }]
        }
      } finally {
        this.fetching = false
      }
    },
    onchange(val) {
      if (this.form.orgUnitId === undefined) {
        this.form.staffName = ''
      }
    },
    resetFilters() {
      this.$refs.searchForm.resetFields()
      this.filters = {
        orgUnitCode: '',
        staffName: '',
        phoneNumber: '',
        email: ''
      }
      this.pagination.current = 1
      this.pagination.pageSize = 10
      this.getDataStaff()
    }
  }
})
</script>
<style lang="less" scoped>
.active-row {
  background-color: #c9e7ff;
}
</style>
