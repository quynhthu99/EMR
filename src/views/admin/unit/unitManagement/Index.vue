<template>
  <a-spin :spinning="loadingSpinRoot" tip="Loading...">
    <vaBreadCrumb></vaBreadCrumb>
    <div class="unit">
      <a-row :gutter="24">
        <a-col :lg="5">
          <div style="background-color: #ffffff">
            <a-directory-tree
              v-model:selectedKeys="checkedKeys"
              style="min-height: 1160px; overflow: auto; max-height: 1160px"
              :show-icon="true"
              :expand-action="false"
              :loading="loadingTreeUnit"
              :expanded-keys="expandedKeys"
              :auto-expand-parent="autoExpandParent"
              :selected-keys="selectedKeys"
              :tree-data="treeData"
              @expand="onExpand"
              @select="onSelect"
            >
              <template #switcherIcon="{ switcherCls }">
                <DownOutlined :class="switcherCls" />
              </template>
              <template #custom="{ selected }">
                <FolderOutlined v-if="selected" />
                <FolderOpenOutlined v-else />
              </template>
            </a-directory-tree>
          </div>
        </a-col>
        <a-col :lg="19" style="padding-left: 0px !important">
          <a-spin :spinning="loadingSpin" tip="Loading...">
            <a-collapse
              v-model:activeKey="activeSearchKey1"
              expand-icon-position="left"
              style="margin-bottom: 12px; background: #ffffff"
            >
              <a-collapse-panel key="1" header="Danh sách đơn vị và bộ phận trực thuộc">
                <template #extra>
                  <a-button
                    type="primary"
                    style="margin-left: auto; min-width: 120px"
                    @click="showDrawer"
                  >
                    <template #icon><PlusCircleOutlined /></template>
                    Thêm mới
                  </a-button>
                </template>
                <a-form style="width: 100%" :model="searchFields" :layout="'vertical'">
                  <a-row :gutter="16" style="padding-top: 8px">
                    <a-col :span="6">
                      <a-form-item :label="'Loại đơn vị'">
                        <a-select v-model:value="searchFields.orgUnitType">
                          <a-select-option :key="''" :value="''">---Tất cả---</a-select-option>
                          <a-select-option
                            v-for="orgUnit in listOrgUnit"
                            :key="orgUnit.key"
                            :value="Number(orgUnit.key)"
                          >
                            {{ orgUnit.value }}
                          </a-select-option>
                        </a-select>
                      </a-form-item>
                    </a-col>
                    <a-col :span="6">
                      <a-form-item :label="'Tên đơn vị'">
                        <a-input
                          v-model:value="searchFields.orgUnitName"
                          :disabled="disabled"
                        ></a-input>
                      </a-form-item>
                    </a-col>
                    <a-col :span="6">
                      <a-form-item :label="'Mã đơn vị'">
                        <a-input
                          v-model:value="searchFields.orgUnitCode"
                          :disabled="disabled"
                        ></a-input>
                      </a-form-item>
                    </a-col>
                    <a-col
                      :span="6"
                      style="
                        margin-top: 28px;
                        margin-left: auto;
                        display: flex;
                        justify-content: flex-start;
                      "
                    >
                      <a-button style="min-width: 120px; margin-right: 1rem" @click="resetFields">
                        Nhập lại
                      </a-button>
                      <a-button type="primary" style="min-width: 120px" @click="searchUnit">
                        <template #icon><SearchOutlined /></template>
                        Tìm kiếm
                      </a-button>
                    </a-col>
                  </a-row>
                </a-form>
              </a-collapse-panel>
            </a-collapse>
            <a-card style="margin-bottom: 12px; min-height: 250px; border: 1px solid #d9d9d9">
              <a-row :gutter="16">
                <div class="ant-table-wrapper" style="padding-left: 8px; padding-right: 8px">
                  <div class="wrapper1">
                    <div class="div1"></div>
                  </div>
                  <a-table
                    :multi-action="false"
                    :columns="columns"
                    :data-source="dataUnit"
                    :row-key="'index'"
                    :loading="loadingTable"
                    :scroll="{ x: '100%', y: '100%' }"
                    :pagination="pagination"
                    :row-class-name="rowClassName"
                    bordered
                    size="small"
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
                        <span><ControlOutlined /></span>
                      </template>
                      <template v-if="column.key === 'orgUnitType'">
                        <a-tooltip placement="top">
                          <template #title>
                            <span>{{ `${record.orgUnitName}` }}</span>
                          </template>
                          {{ record.orgUnitName }}
                        </a-tooltip>
                      </template>
                      <template v-if="column.key === 'orgUnitTypeName'">
                        <a-tooltip placement="top">
                          <template #title>
                            <span>{{ `${record.orgUnitTypeName}` }}</span>
                          </template>
                          {{ record.orgUnitTypeName }}
                        </a-tooltip>
                      </template>
                      <template v-if="column.key === 'status'">
                        <a-switch :checked="!!record.status" @change="onChangeStatus(record)" />
                      </template>
                      <template v-if="column.key === 'operation'">
                        <a-tooltip placement="top">
                          <template #title>
                            <span>{{ `Xem chi tiết ${record.orgUnitName}` }}</span>
                          </template>
                          <span>
                            <va-svg-icon
                              name="eye"
                              class="mr-2 cursor-pointer"
                              color="#1890ff"
                              :style="{ fontSize: '14px' }"
                              @click="onView(record)"
                            />
                          </span>
                        </a-tooltip>
                        <a-tooltip placement="top">
                          <template #title>
                            <span>{{ `Cập nhật ${record.orgUnitName}` }}</span>
                          </template>
                          <span>
                            <va-svg-icon
                              name="edit"
                              class="mr-2 cursor-pointer"
                              color="#1890ff"
                              :style="{ fontSize: '14px' }"
                              @click="onEdit(record.id)"
                            />
                          </span>
                        </a-tooltip>
                        <a-tooltip placement="top">
                          <template #title>
                            <span>{{ `Xóa ${record.orgUnitName}` }}</span>
                          </template>
                          <span style="cursor: pointer">
                            <va-svg-icon
                              name="delete"
                              color="red"
                              class="cursor-pointer"
                              :style="{ fontSize: '14px' }"
                              @click="handleRemove(record)"
                            />
                          </span>
                        </a-tooltip>
                      </template>
                    </template>
                  </a-table>
                </div>
              </a-row>
            </a-card>
            <a-collapse
              v-model:activeKey="activeSearchKey2"
              expand-icon-position="left"
              style="margin-bottom: 12px; background: #ffffff"
            >
              <a-collapse-panel key="2" header="Danh sách nhân viên">
                <template #extra>
                  <a-button
                    type="primary"
                    style="margin-left: auto; min-width: 120px"
                    @click="onGrantStaff"
                  >
                    Gán nhân viên
                  </a-button>
                </template>
                <a-row :gutter="16">
                  <div
                    class="ant-table-wrapper"
                    style="padding-top: 8px; padding-left: 8px; padding-right: 8px"
                  >
                    <a-table
                      :columns="columnsStaff"
                      :data-source="dataStaff"
                      :row-key="'index'"
                      :loading="loadingStaff"
                      :scroll="{ x: dataStaff.length > 0 ? 1300 : 'max-content' }"
                      :pagination="paginationStaff"
                      class="ant-table-wrapper"
                      bordered
                      size="small"
                      @change="handleTableChangeStaff"
                    >
                      <template #bodyCell="{ column, record, index }">
                        <template v-if="column.key === 'rowIndex'">
                          <span>
                            {{
                              getTableRowIndex(
                                paginationStaff.pageSize,
                                paginationStaff.current,
                                index
                              )
                            }}
                          </span>
                        </template>
                        <template v-if="column.key === 'status'">
                          <span>{{
                            record && record.status === 1 ? 'Hiệu lực' : 'Hết hiệu lực'
                          }}</span>
                        </template>
                        <template v-if="column.key === 'operation'">
                          <a-tooltip placement="top">
                            <template #title>
                              <span>Xóa</span>
                            </template>
                            <va-svg-icon
                              name="delete"
                              color="red"
                              class="cursor-pointer"
                              :style="{ fontSize: '14px' }"
                              @click="handleRemoveStaff(record)"
                            />
                          </a-tooltip>
                        </template>
                      </template>
                    </a-table>
                  </div>
                </a-row>
              </a-collapse-panel>
            </a-collapse>
          </a-spin>
        </a-col>
      </a-row>
      <a-drawer
        :title="`${titleDrawer} ${nameUnit !== '' ? nameUnit : 'đơn vị'}`"
        :width="720"
        :visible="visible"
        :mask-closable="false"
        :body-style="{ paddingBottom: '80px' }"
        @close="onClose"
      >
        <a-spin :spinning="loadingDrawer">
          <a-form ref="formUnit" :model="form" layout="vertical" @submit="handleSubmit">
            <a-row style="display: flex; margin-bottom: 8px">
              <a-tooltip v-if="isCreate" placement="top">
                <template #title>
                  <span>{{ `${titleDrawer} đơn vị con của ${orgParentName}` }}</span>
                </template>
                <a-tag
                  v-if="orgParentName"
                  color="orange"
                  style="margin-left: auto; font-size: 14px"
                >
                  {{ `Đơn vị cấp trên: ${orgParentName}` }}
                </a-tag>
              </a-tooltip>
              <a-tooltip v-else placement="top">
                <template #title>
                  <span>{{ `${titleDrawer} đơn vị con của ${form.upperOrgUnitName}` }}</span>
                </template>
                <a-tag
                  v-if="form.upperOrgUnitName"
                  color="orange"
                  style="margin-left: auto; font-size: 14px"
                >
                  {{ `Đơn vị cấp trên: ${form.upperOrgUnitName}` }}
                </a-tag>
              </a-tooltip>
            </a-row>
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item
                  label="Loại đơn vị"
                  name="orgUnitType"
                  :rules="[{ required: true, message: 'Loại đơn vị là trường bắt buộc' }]"
                >
                  <a-select
                    v-model:value="form.orgUnitType"
                    :disabled="disabled"
                    @change="onChangeOrgType"
                  >
                    <a-select-option
                      v-for="orgUnit in listOrgUnitModal"
                      :key="orgUnit.key"
                      :value="Number(orgUnit.key)"
                    >
                      {{ orgUnit.value }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <div style="display: flex !important">
                  <a-form-item label="Trưởng đơn vị" name="representStaffId" :rules="[]">
                    <a-input v-model:value="form.representStaffName" disabled> </a-input>
                  </a-form-item>
                  <a-button
                    type="primary"
                    style="min-width: 42px !important; height: 30px !important; margin-top: 29px"
                    :disabled="disabled"
                    @click="onSearchStaff"
                  >
                    <template #icon><SearchOutlined /></template>
                  </a-button>
                </div>
              </a-col>
            </a-row>
            <a-row v-if="!disabledAccountingType" :gutter="16">
              <a-col :span="24">
                <a-form-item name="orgUnitCode">
                  <div class="flex">
                    <a-radio-group v-model:value="form.accountingType">
                      <a-radio :value="1" style="margin-right: 12px">Hạch toán phụ thuộc</a-radio>
                      <a-radio :value="2">Hạch toán độc lập</a-radio>
                    </a-radio-group>
                  </div>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item
                  label="Mã đơn vị"
                  name="orgUnitCode"
                  :rules="[
                    { required: true, message: 'Mã đơn vị là trường bắt buộc' },
                    { max: 6, message: 'Mã đơn vị tối đa 6 ký tự' }
                  ]"
                >
                  <a-input
                    v-model:value="form.orgUnitCode"
                    :disabled="disabled"
                    placeholder="Mã đơn vị"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="16">
                <a-form-item
                  label="Tên đơn vị"
                  name="orgUnitName"
                  :rules="[
                    { required: true, message: 'Tên đơn vị là trường bắt buộc' },
                    { max: 100, message: 'Tên đơn vị tối đa 100 ký tự' }
                  ]"
                >
                  <a-input v-model:value="form.orgUnitName" :disabled="disabled" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item
                  label="Tỉnh/TP"
                  name="provinceCode"
                  :rules="[{ required: true, message: 'Tỉnh/TP là trường bắt buộc' }]"
                >
                  <a-select
                    v-model:value="form.provinceCode"
                    :disabled="disabled"
                    placeholder="Tỉnh/TP"
                    @change="getDistrict(form.provinceCode)"
                    @select="resetDistrict"
                  >
                    <a-select-option
                      v-for="province in listProvince"
                      :key="province.provinceCode"
                      :value="province.provinceCode"
                      >{{ province.provinceName }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="Quận/Huyện"
                  name="districtCode"
                  :rules="[{ required: true, message: 'Quận/Huyện là trường bắt buộc' }]"
                >
                  <a-select
                    v-model:value="form.districtCode"
                    :disabled="disabled"
                    placeholder="Quận/Huyện"
                    @change="getCommune(form.districtCode)"
                    @select="resetCommune"
                  >
                    <a-select-option
                      v-for="district in listDistrict"
                      :key="district.districtCode"
                      :value="district.districtCode"
                      >{{ district.districtName }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="Xã/Phường"
                  name="communeCode"
                  :rules="[{ required: true, message: 'Xã/Phường là trường bắt buộc' }]"
                >
                  <a-select
                    v-model:value="form.communeCode"
                    :disabled="disabled"
                    placeholder="Xã/Phường"
                  >
                    <a-select-option
                      v-for="commune in listCommune"
                      :key="commune.communeCode"
                      :value="String(commune.communeCode)"
                      >{{ commune.communeName }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="16">
              <a-col :span="24">
                <a-form-item
                  label="Địa chỉ"
                  name="address"
                  :rules="[
                    { required: true, message: 'Địa chỉ là trường bắt buộc' },
                    { max: 500, message: 'Địa chỉ tối đa 500 ký tự' }
                  ]"
                >
                  <a-input v-model:value="form.address" :disabled="disabled"> </a-input>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item
                  label="Tọa độ"
                  name="location"
                  :rules="[
                    {
                      pattern: /[0-9]{1,3}\.[0-9]{2,97}\/[0-9]{1,3}\.[0-9]{2,97}/,
                      message: 'Nhập sai định dạng (Định dạng đúng: xxx.yyyy..../xxx.yyyy....)',
                      trigger: 'change'
                    }
                  ]"
                >
                  <a-input
                    v-model:value="form.location"
                    :disabled="disabled"
                    :max-length="201"
                    placeholder="Kinh độ/Vĩ độ"
                  >
                  </a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="Số điện thoại" name="phoneNumber" :rules="[]">
                  <a-input v-model:value="form.phoneNumber" :disabled="disabled" :max-length="15">
                  </a-input>
                </a-form-item>
              </a-col>
              <a-col v-if="!disabledTaxCode" :span="8">
                <a-form-item
                  label="Mã số thuế"
                  name="taxCode"
                  :rules="[
                    {
                      required: true,
                      message: 'Mã số thuế là bắt buộc',
                      trigger: 'change'
                    }
                  ]"
                >
                  <a-input v-model:value="form.taxCode"></a-input>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-spin>
        <div
          v-if="!disabled"
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
      <a-modal
        v-model:visible="visibleStaffFree"
        width="60%"
        title="Chọn người đại diện cho đơn vị"
        :footer="null"
        @close="closeStaffFree"
      >
        <a-input
          v-model:value="searchStaffFree.keyword"
          placeholder="Nhập tên hoặc mã nhân viên"
          style="margin-bottom: 8px"
          allow-clear
          @change="onSearchStaffFree"
        >
          <SearchOutlined />
          <template #suffix>
            <a-tooltip title="Tìm kiếm người đại diện">
              <InfoCircleOutlined style="color: rgba(0, 0, 0, 0.45); font-size: 14px" />
            </a-tooltip>
          </template>
        </a-input>
        <a-table
          :title="false"
          :columns="columnsStaffFree"
          :loading="loadingTableUserFree"
          :data-source="dataStaffFree"
          :row-key="'index'"
          :pagination="paginationStaffFree"
          class="ant-table-wrapper"
          bordered
          size="small"
          @change="handleTableChangeStaffFree"
        >
          <template #bodyCell="{ column, record, index }">
            <template v-if="column.key === 'rowIndex'">
              <span>
                {{
                  getTableRowIndex(paginationStaffFree.pageSize, paginationStaffFree.current, index)
                }}
              </span>
            </template>
            <template v-if="column.key === 'operation'">
              <div>
                <a-tooltip placement="top">
                  <template #title>
                    <span
                      >{{ `Chọn nhân viên `
                      }}<span style="font-weight: bolder">{{ record.staffName }}</span></span
                    >
                  </template>
                  <span style="cursor: pointer">
                    <DownCircleOutlined
                      style="color: #3a9ef6; font-size: 14px"
                      @click="onSelectStaff(record)"
                    />
                  </span>
                </a-tooltip>
              </div>
            </template>
          </template>
        </a-table>
      </a-modal>
      <a-drawer
        title="Gán nhân viên vào đơn vị"
        :width="600"
        :visible="visibleStaff"
        :body-style="{ paddingBottom: '80px' }"
        @close="onCloseStaff"
      >
        <a-form layout="vertical">
          <a-row>
            <a-input-search
              v-model:value="searchUserFree.staffName"
              style="width: 100%"
              placeholder="Nhập nội dung tìm kiếm..."
              @change="onSearchToGrantStaff"
            />
          </a-row>
          <a-row :gutter="16">
            <a-list
              class="demo-loadmore-list w-full"
              :loading="loading"
              item-layout="horizontal"
              :data-source="data"
            >
              <template #loadMore>
                <div
                  v-if="showLoadingMore"
                  :style="{
                    textAlign: 'center',
                    marginTop: '12px',
                    height: '32px',
                    lineHeight: '32px'
                  }"
                >
                  <a-spin v-if="loadingMore" />
                  <a-button v-else @click="onLoadMore"> loading more </a-button>
                </div>
              </template>
              <template #renderItem="{ item }">
                <a-list-item>
                  <template #actions>
                    <a-checkbox v-model:checked="item.isActive" @change="getUserId(item)" />
                  </template>
                  <a-list-item-meta
                    :description="`Mã nhân viên: ${item.staffCode}, username: ${
                      item.userName ? item.userName : ''
                    }`"
                  >
                    <template #title>
                      <b>{{ item.staffName }}</b>
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
          <a-button :style="{ marginRight: '8px' }" @click="onCloseStaff"> Bỏ qua </a-button>
          <a-button type="primary" @click="onSaveGrantStaff"> Lưu </a-button>
        </div>
      </a-drawer>
    </div>
  </a-spin>
</template>
<script>
import columns from './columns'
import columnsStaff from './columnsStaff'
import columnsStaffFree from './columnsStaffFree'
import {
  DownOutlined,
  PlusCircleOutlined,
  SearchOutlined,
  ControlOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  FolderOutlined,
  FolderOpenOutlined,
  InfoCircleOutlined,
  DownCircleOutlined
} from '@ant-design/icons-vue'
import {
  initTree,
  searchOrgUnit,
  createOrgUnit,
  updateOrgUnit,
  removeOrgUnit,
  changeStatusOrgUnit
} from '@/services/sys/orgUnit'
import { getUserFree, searchStaffByCodeName } from '@/services/sys/staff'
import { getStaffsByOrgUnit, revokeUser, grantStaffOrgUnitStaff } from '@/services/sys/orgUnitStaff'
import { getCommune, getDistrict, getProvince } from '@/services/general/location/index'
import _merge from 'lodash.merge'
import { defineComponent } from 'vue'
import { getGlobalListByCode } from '@/services/sys/lcList/index'

const pagination = {
  current: 1,
  total: 0,
  pageSize: 10,
  showSizeChanger: true,
  showQuickJumper: true,
  pageSizeOptions: ['10', '25', '50'],
  showTotal: (total) => {
    return 'Tổng số dòng ' + total
  }
}
export default defineComponent({
  components: {
    DownOutlined,
    PlusCircleOutlined,
    SearchOutlined,
    ControlOutlined,
    EyeOutlined,
    EditOutlined,
    DeleteOutlined,
    FolderOutlined,
    FolderOpenOutlined,
    InfoCircleOutlined,
    DownCircleOutlined
  },
  data() {
    return {
      isCreate: false,
      orgParentName: null,
      columns,
      columnsStaff,
      columnsStaffFree,
      loadingDrawer: false,
      loadingSpin: false,
      loadingSpinRoot: false,
      loadingTreeUnit: false,
      visible: false,
      disabled: false,
      visibleStaff: false,
      visibleStaffFree: false,
      loadingMore: false,
      loadingTable: false,
      loading: false,
      showLoadingMore: true,
      loadingStaff: false,
      autoExpandParent: true,
      loadingTableUserFree: false,
      activeSearchKey1: 1,
      activeSearchKey2: 2,
      titleDrawer: 'Thêm mới',
      nameUnit: '',
      orgUnitId: '',
      subMenuItems: [
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
      expandedKeys: [],
      data: [],
      listOrgUnit: [],
      listOrgUnitModal: [],
      dataUnit: [],
      dataStaff: [],
      checkedKeys: [],
      selectedKeys: [],
      treeData: [],
      listProvince: [],
      listDistrict: [],
      listCommune: [],
      dataStaffFree: [],
      searchFields: {},
      pagination: { ...pagination },
      paginationStaff: { ...pagination },
      paginationStaffFree: { ...pagination },
      upperOrgUnitId: null,
      form: {
        orgUnitType: '',
        orgUnitTypeName: '',
        upperOrgUnitId: '',
        representStaffId: '',
        orgUnitCode: '',
        orgUnitName: '',
        representStaffName: '',
        provinceCode: '',
        districtCode: '',
        communeCode: '',
        provinceName: '',
        districtName: '',
        communeName: '',
        address: '',
        locationLng: '',
        locationLat: '',
        location: '',
        createBy: '',
        orgUnitId: '',
        upperOrgUnitName: '',
        phoneNumber: '',
        accountingType: '',
        taxCode: ''
      },
      disabledAccountingType: true,
      disabledTaxCode: true,
      searchStaffFree: {
        keyword: ''
      },
      unitSelected: {},
      searchUserFree: {
        staffName: '',
        staffCode: '',
        page: 0,
        size: 15
      },
      listUserGrant: [],
      dataUserGrant: [],
      totalRecord: null
    }
  },
  async created() {
    await Promise.all([
      setTimeout(() => {
        this.$nextTick(() => {
          this.getTreeUnit()
          this.getProvince()
          this.getUserFree()
          this.getListOrgUnit()
        })
      }, 100)
    ])
  },
  async mounted() {
    setTimeout(() => {
      this.$nextTick(() => {
        this.resetSearch()
        this.loadingSpin = false
      })
    }, 300)
  },
  methods: {
    async getListOrgUnit() {
      const rs = await getGlobalListByCode({ code: 'ORG_UNIT_TYPE' })
      this.listOrgUnit = [...rs.body] || []
    },
    getListOrgUnitModal(orgUnitType) {
      if (String(orgUnitType) === '1') {
        this.listOrgUnitModal = this.listOrgUnit.filter((item) => {
          return String(item.key) === '1'
        })
      } else {
        this.listOrgUnitModal = this.listOrgUnit.filter((item) => {
          return String(item.key) !== '1'
        })
      }
    },
    onExpand(expandedKeys) {
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    },
    onSelect(selectedKeys, info) {
      this.loadingSpin = true
      if (selectedKeys.length > 0) {
        this.selectedKeys = selectedKeys
      } else {
        this.selectedKeys = [this.treeData[0].key]
        this.onExpand([this.treeData[0].key])
      }
      setTimeout(() => {
        this.loadingSpin = false
        this.unitSelected = this.dataFilter.find(
          (item) => String(item.orgUnitId) === String(selectedKeys)
        )
        this.pagination = { ...pagination }
        this.getDataUnit()
      }, 100)
    },
    showDrawer(e) {
      e.stopPropagation()
      this.titleDrawer = 'Thêm mới'
      this.nameUnit = ''
      this.visible = true
      this.disabled = false
      this.isCreate = true
      this.resetForm()
      this.getListOrgUnitModal('')
      this.disabledAccountingType = true
      this.disabledTaxCode = true
    },
    resetForm() {
      this.form = {
        orgUnitType: '',
        orgUnitTypeName: '',
        upperOrgUnitId: '',
        representStaffId: '',
        orgUnitCode: '',
        orgUnitName: '',
        provinceCode: '',
        districtCode: '',
        communeCode: '',
        provinceName: '',
        districtName: '',
        communeName: '',
        address: '',
        locationLng: '',
        locationLat: '',
        location: '',
        createBy: '',
        orgUnitId: '',
        accountingType: '',
        taxCode: ''
      }
    },
    handleSubmit(e) {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const _this = this
      e.preventDefault()
      this.$refs.formUnit.validate().then((valid) => {
        if (valid) {
          const arr = this.form.location.split('/')
          this.form.locationLat = arr[0]
          this.form.locationLng = arr[1]
          this.$confirm({
            title: `Bạn có chắc chắn muốn ${!this.form.orgUnitId ? 'Thêm mới' : 'Cập nhật'}`,
            okType: 'primary',
            onOk() {
              if (!_this.form.orgUnitId) {
                _this.doCreate(_this.form)
              } else {
                _this.doUpdate(_this.form)
              }
            }
          })
        }
      })
    },
    handleRemove(record) {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const _this = this
      if (record.orgUnitId) {
        _this.$confirm({
          title: `Bạn có chắc chắn muốn xóa ${record.orgUnitName}`,
          okType: 'primary',
          onOk() {
            _this.doDelete(record.orgUnitId)
          }
        })
      } else {
        _this.$warning({
          title: 'Thông báo',
          content: 'Không tìm thấy ID của bản ghi'
        })
      }
    },
    handleRemoveStaff(record) {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const _this = this
      if (record.staffId) {
        _this.$confirm({
          title: `Bạn có chắc chắn muốn xóa nhân viên ${record.staffName} khỏi đơn vị`,
          okType: 'primary',
          onOk() {
            _this.doDeleteStaff(record.staffId)
          }
        })
      } else {
        _this.$warning({
          title: 'Thông báo',
          content: 'Không tìm thấy ID của bản ghi'
        })
      }
    },
    async doDelete(orgUnitId) {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const _this = this
      const params = {
        orgUnitId: orgUnitId
      }
      try {
        const res = await removeOrgUnit(params)
        if (res.body) {
          await _this.getTreeUnit(true)
          await _this.getDataUnit()
        }
      } catch (e) {}
    },
    async doDeleteStaff(staffId) {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const _this = this
      const params = {
        orgUnitId: _this.orgUnitId,
        staffId: staffId
      }
      try {
        const res = await revokeUser(params)
        await _this.getStaffByUnit(_this.orgUnitId)
      } catch (e) {}
    },
    async doCreate(values) {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const _this = this
      values['upperOrgUnitId'] = _this.upperOrgUnitId
      const params = _this.customParams(values)
      try {
        this.loadingDrawer = true
        const res = await createOrgUnit(params)
        if (res.code === 'API000') {
          _this.onClose()
          _this.$success({
            title: 'Thông báo',
            content: 'Thêm mới thành công'
          })
          await _this.getTreeUnit(true)
          await _this.getDataUnit()
          _this.onClose()
        }
      } finally {
        this.loadingDrawer = false
      }
    },
    async doUpdate(values) {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const _this = this
      values['upperOrgUnitId'] = _this.upperOrgUnitId
      const params = _this.customParams(values)
      try {
        this.loadingDrawer = true
        const res = await updateOrgUnit(params)
        if (res.code === 'API000') {
          _this.onClose()
          _this.$success({
            title: 'Thông báo',
            content: 'Cập nhật thành công'
          })
          await _this.getDataUnit(true)
        } else {
          _this.onClose()
        }
      } finally {
        this.loadingDrawer = false
      }
    },
    customParams(values) {
      const params = {
        orgUnitId: Number(values.orgUnitId),
        orgUnitType: Number(values.orgUnitType),
        upperOrgUnitId: Number(values.upperOrgUnitId) || null,
        representStaffId: Number(values.representStaffId),
        orgUnitCode: values.orgUnitCode,
        orgUnitName: values.orgUnitName,
        locProvinceCode: values.provinceCode,
        locDistrictCode: values.districtCode,
        locCommuneCode: values.communeCode,
        provinceName: values.provinceName,
        districtName: values.districtName,
        communeName: values.communeName,
        address: values.address,
        locationLng: values.locationLng,
        locationLat: values.locationLat,
        phoneNumber: values.phoneNumber,
        createBy: 1,
        accountingType: values.accountingType,
        taxCode: values.taxCode
      }
      return params
    },
    setField(record) {
      this.form = {
        orgUnitId: record.orgUnitId,
        orgUnitCode: record.orgUnitCode,
        orgUnitName: record.orgUnitName,
        orgUnitType: record.orgUnitType,
        orgUnitTypeName: record.orgUnitTypeName,
        upperOrgUnitId: record.upperOrgUnitId,
        representStaffId: record.representStaffId,
        provinceCode: record.provinceCode,
        districtCode: record.districtCode,
        communeCode: record.communeCode,
        provinceName: record.provinceName,
        districtName: record.districtName,
        communeName: record.communeName,
        address: record.address,
        locationLng: record.locationLng,
        locationLat: record.locationLat,
        location:
          record.locationLng && record.locationLat
            ? `${record.locationLat}/${record.locationLng}`
            : ``,
        representStaffName: record.representStaffName,
        createBy: record.createBy,
        upperOrgUnitName: record.upperOrgUnitName,
        phoneNumber: record.phoneNumber,
        accountingType: record.accountingType,
        taxCode: record.taxCode
      }
      this.setLocation(record)
    },
    setLocation(record) {
      if (record.provinceCode) {
        this.getDistrict(record.provinceCode)
      }
      if (record.provinceCode && record.districtCode) {
        this.getCommune(this.form.districtCode)
      }
    },
    async onView(record) {
      this.titleDrawer = 'Xem chi tiết'
      this.nameUnit = record.orgUnitName
      this.visible = true
      this.disabled = true
      this.isCreate = false
      if (this.visible) {
        this.setField(record)
      }
      this.getListOrgUnitModal(record.orgUnitType)
      this.onChangeOrgType(record.orgUnitType)
    },
    async onEdit(record) {
      this.titleDrawer = 'Cập nhật'
      this.nameUnit = record.orgUnitName
      this.visible = true
      this.disabled = false
      this.isCreate = false
      if (this.visible) {
        this.setField(record)
      }
      this.getListOrgUnitModal(record.orgUnitType)
      this.onChangeOrgType(record.orgUnitType)
    },
    async getUserId(item) {
      await this.onChangeCheckBox(item)
      await this.$forceUpdate()
    },
    onChangeCheckBox(item) {
      if (item.isActive) {
        this.listUserGrant.push(item.staffId)
      } else {
        this.listUserGrant = this.listUserGrant.filter((userId) => userId !== item.staffId)
      }
    },
    onSaveGrantStaff() {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const _this = this
      this.$confirm({
        title: 'Bạn có chắc chắn muốn gán nhân viên vào đơn vị?',
        onOk() {
          const params = {
            orgUnitId: _this.orgUnitId,
            lstStaffId: [..._this.listUserGrant]
          }
          grantStaffOrgUnitStaff(params)
            .then((res) => {
              _this.visibleStaff = false
              _this.$message.success({ content: 'Gán nhân viên vào đơn vị thành công ' })
              _this.getStaffByUnit(_this.orgUnitId)
            })
            .catch(() => {
              _this.$message.error({ content: 'Gán nhân viên vào đơn vị thất bại' })
            })
            .finally(() => {
              _this.listUserGrant = []
            })
        }
      })
    },
    onGrantStaff(e) {
      e.stopPropagation()
      this.visibleStaff = true
      this.searchUserFree = {
        staffName: '',
        staffCode: '',
        page: 0,
        size: 15
      }
      this.getData()
    },
    onClose() {
      this.visible = false
      this.$refs.formUnit.resetFields()
      this.resetForm()
    },
    onCloseStaff() {
      this.visibleStaff = false
    },
    searchUnit() {
      this.pagination = {
        current: 1,
        total: 0,
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['10', '25', '50'],
        showTotal: (total) => {
          return 'Tổng số dòng ' + total
        }
      }
      this.getDataUnit()
    },
    getData() {
      const params = this.searchUserFree
      getUserFree(params).then((res) => {
        this.data = res.body.data || []
        this.data.map((item) => {
          item.isActive = false
          return item
        })
        this.totalRecord = res.body.page_meta.total_elements
      })
    },
    async getDataUnit(resetSelect = false) {
      this.loadingTable = true
      const params = {
        orgUnitCode: this.searchFields.orgUnitCode || null,
        orgUnitId: this.selectedKeys[0] || null,
        orgUnitName: this.searchFields.orgUnitName || null,
        orgUnitType: this.searchFields.orgUnitType || null,
        page: this.pagination.current > 0 ? this.pagination.current - 1 : 0,
        size: this.pagination.pageSize
      }
      try {
        const res = await searchOrgUnit(params)
        if (res.code === 'API000') {
          this.dataUnit = res.body.data || []
          this.pagination = _merge(this.pagination, this.handlePaginationData(res.body))
          if (this.dataUnit[0] && !resetSelect) {
            await this.onRow(this.dataUnit[0])
          }
        }
      } finally {
        this.loadingTable = false
      }
    },
    async getTreeUnit(reset) {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const _this = this
      _this.loadingTreeUnit = true
      try {
        const res = await initTree()
        if (res.code === 'API000') {
          const dataFilter = _this.filterDataTree(res.body)
          this.dataFilter = dataFilter
          const dataTree = _this.buildTree(dataFilter)
          _this.treeData = [...dataTree]
          if (!reset) {
            this.onSelect([this.treeData[0].key])
            this.onExpand([this.treeData[0].key])
          }
        }
      } finally {
        _this.loadingTreeUnit = false
        _this.$forceUpdate()
        if (!reset) {
          this.loadingSpinRoot = false
        }
      }
    },
    async getStaffByUnit(orgUnitId) {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const _this = this
      _this.loadingStaff = true
      const params = {
        orgUnitId: orgUnitId,
        page: _this.paginationStaff.current > 0 ? _this.paginationStaff.current - 1 : 0,
        size: _this.paginationStaff.pageSize
      }
      try {
        const res = await getStaffsByOrgUnit(params)
        if (res.body) {
          this.dataStaff = res.body.data.filter((res) => res.status === 1)
          this.paginationStaff = _merge(this.paginationStaff, _this.handlePaginationData(res.body))
        }
      } finally {
        _this.loadingStaff = false
      }
    },
    handleTableChange(pagination, filters, sorter) {
      this.pagination = pagination
      this.getDataUnit()
    },
    handleTableChangeStaff(pagination, filters, sorter) {
      this.paginationStaff = pagination
      this.getStaffByUnit(this.orgUnitId)
    },
    handleTableChangeStaffFree(pagination, filters, sorter) {
      this.paginationStaffFree = pagination
      this.getUserFree()
    },
    filterDataTree(list) {
      list = list.filter((item) => {
        return String(item.allow) === '1'
      })
      return list
    },
    buildTree(list) {
      const map = {}
      let node
      const roots = []
      let i = 0
      const length = list.length
      for (i = 0; i < length; i += 1) {
        map[list[i].orgUnitId] = i
        list[i].children = []
        list[i].title = list[i].orgUnitName
        list[i].key = list[i].orgUnitId
      }
      for (i = 0; i < length; i += 1) {
        node = list[i]
        if (node.upperOrgUnitId !== null) {
          if (list[map[node.upperOrgUnitId]]) {
            node.value = node.orgUnitName
            list[map[node.upperOrgUnitId]].children.push(node)
          } else {
            roots.push(node)
          }
        } else {
          roots.push(node)
        }
      }
      return roots
    },
    async getUserFree(val) {
      const params = {
        keyword: val || '',
        page: this.paginationStaffFree.current > 0 ? this.paginationStaffFree.current - 1 : 0,
        size: this.paginationStaffFree.pageSize
      }
      try {
        this.loadingTableUserFree = true
        const res = await searchStaffByCodeName(params)
        if (res.code === 'API000') {
          this.dataStaffFree = res.body.data
          this.paginationStaffFree = _merge(
            this.paginationStaffFree,
            this.handlePaginationData(res.body)
          )
        }
      } finally {
        this.loadingTableUserFree = false
      }
    },
    async getProvince() {
      try {
        this.form.districtCode = ''
        const { body } = await getProvince()
        if (body) {
          this.listProvince = body
        }
      } finally {
      }
    },
    async getDistrict(provinceCode) {
      if (!provinceCode) {
        this.resetDistrict()
        return
      }
      try {
        const params = {
          provinceCode: provinceCode
        }
        const { body } = await getDistrict(params)
        if (body) {
          this.listDistrict = body
        }
      } finally {
      }
    },
    async getCommune(districtCode) {
      if (!districtCode) {
        this.resetCommune()
        return
      }
      try {
        const params = {
          districtCode: districtCode
        }
        const { body } = await getCommune(params)
        if (body) {
          this.listCommune = body
        }
      } finally {
      }
    },
    resetDistrict() {
      this.form.districtCode = ''
      this.form.communeCode = ''
      this.listDistrict = []
      this.listCommune = []
    },
    resetCommune() {
      this.form.communeCode = ''
      this.listCommune = []
    },
    async onRow(record) {
      await this.onActiveRow(record)
      if (record.orgUnitId) {
        await this.getStaffByUnit(record.orgUnitId)
        this.orgUnitId = record.orgUnitId
      }
    },
    resetFields(e) {
      this.searchUnit()
    },
    onActiveRow(record) {
      this.upperOrgUnitId = record.upperOrgUnitId ? record.upperOrgUnitId : record.orgUnitId
      this.orgParentName = record.orgUnitName ? record.orgUnitName : ''
      if (Array.isArray(this.dataUnit) && this.dataUnit.length > 0) {
        this.dataUnit.forEach((item, index) => {
          if (item.orgUnitId === record.orgUnitId) {
            item['isActive'] = true
          } else {
            item['isActive'] = false
          }
        })
      }
    },
    rowClassName(record, index) {
      let className = ''
      if (record.isActive) {
        className = 'active-row'
      }
      return className
    },
    getNameStatus(status) {
      let label = 'Không hoạt động'
      if (status) {
        label = 'Hoạt động'
      }
      return label
    },
    onChangeStatus(record) {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const _this = this
      if (record) {
        this.$confirm({
          title: `Bạn có chắc chắn muốn cập nhật trạng thái ${record.orgUnitName} không`,
          okType: 'primary',
          onOk() {
            _this.toggleStatus(record)
          }
        })
      } else {
        _this.$notification.warning({
          description: 'Không tìm thấy bản ghi'
        })
      }
    },
    async toggleStatus(record) {
      const params = {
        orgUnitId: record.orgUnitId
      }
      try {
        const res = await changeStatusOrgUnit(params)
        if (res.code === 'API000') {
          this.$message.success({
            title: 'Thông báo',
            content: 'Cập nhật trạng thái thành công'
          })
          await this.getDataUnit()
        }
      } catch (e) {}
    },
    onSearchStaff() {
      this.visibleStaffFree = true
      this.dataStaffFree = []
      this.getUserFree()
    },
    onSearchToGrantStaff(e) {
      const staffName = e.target.value
      const params = {
        staffName: staffName,
        staffCode: '',
        page: 0,
        size: 15
      }
      getUserFree(params).then((res) => {
        res.body.data.forEach((item) => {
          if (this.listUserGrant.includes(item.staffId)) {
            item.isActive = true
          }
        })
        const arr = [...res.body.data]
        this.data = arr
      })
    },
    onSelectStaff(record) {
      this.$message.success({
        content: `Đã chọn ${record.staffName}`
      })
      setTimeout(() => {
        this.closeStaffFree()
        this.form.representStaffName = record.staffName
        this.form.representStaffId = record.staffId
        this.$refs.formUnit.validateField('representStaffId')
      }, 30)
    },
    onSearchStaffFree(e) {
      const val = e.target.value
      this.getUserFree(val)
    },
    closeStaffFree() {
      this.visibleStaffFree = false
      this.searchStaffFree.keyword = ''
    },
    onChangeOrgType(val) {
      if (String(val) === '2') {
        this.disabledAccountingType = true
        this.disabledTaxCode = false
      } else if (String(val) === '3') {
        this.disabledAccountingType = false
        this.disabledTaxCode = false
      } else {
        this.disabledAccountingType = true
        this.disabledTaxCode = true
      }
    },
    resetSearch() {
      for (const key in this.searchFields) {
        this.searchFields[key].value = ''
      }
    },
    onLoadMore() {
      this.loadingMore = true
      this.searchUserFree.page = this.searchUserFree.page + 1
      const params = { ...this.searchUserFree }
      getUserFree(params).then((res) => {
        this.data = this.data.concat(res.body.data)
        if (this.data.length === this.totalRecord) {
          this.showLoadingMore = false
        }
        this.loadingMore = false
        this.$nextTick(() => {
          window.dispatchEvent(new Event('resize'))
        })
      })
    }
  }
})
</script>
<style lang="less">
.active-row {
  background-color: #c9e7ff;
}
</style>
