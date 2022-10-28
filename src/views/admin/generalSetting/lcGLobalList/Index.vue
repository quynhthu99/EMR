<template>
  <div>
    <vaBreadCrumb>
      <template #extraAction>
        <a-button type="primary" @click="onSync">
          <template #icon>
            <cloud-sync-outlined></cloud-sync-outlined>
          </template>
          Đồng bộ
        </a-button>
      </template>
    </vaBreadCrumb>
    <a-card>
      <a-row :gutter="16" type="flex">
        <a-col :span="24">
          <va-table key="code" :row-selection="null" :columns-table="columns" :data-source="data" :filter="false"
            :multi-action="false" :quick-search-value="quickSearch" :pagination="data.length === 0 ? false : pagination"
            :spinning="loading" :scroll="{ x: 'max-content' }" @onReload="onReload" @change="onChangeTable"
            @getQuickSearch="onQuickSearch">
            <template #bodyCell="{ column, record, index }">
              <template v-if="column.key === 'rowIndex'">
                <span>{{ getTableRowIndex(pagination.pageSize, pagination.current, index) }} </span>
              </template>
              <template v-if="column.key === 'status'">
                <div class="inline-flex justify-between items-center hover:cursor-pointer"
                  :class="[Boolean(record.status === '1') ? 'text-green-400' : 'text-red-400']"
                  @click="onChangeStatus(record)">
                  <a-tooltip>
                    <template #title>
                      <span v-if="Boolean(record.status === '1')">Đang sử dụng</span>
                      <span v-else>Ngừng sử dụng</span>
                    </template>
                    <va-svg-icon v-if="Boolean(record.status === '1')" :disabled="record.allowCustomerChange"
                      name="check-circle_solid" class="ml-3 w-5 h-5"></va-svg-icon>
                    <va-svg-icon v-else :disabled="record.allowCustomerChange" name="x-circle_solid"
                      class="ml-3 w-5 h-5"></va-svg-icon>
                  </a-tooltip>
                </div>
              </template>
              <template v-if="column.key === 'operation'">
                <va-svg-icon name="edit" class="mr-2 cursor-pointer" color="#1890ff" :style="{ fontSize: '14px' }"
                  @click="onEdit(record)" />
                <va-svg-icon name="delete" color="red" class="cursor-pointer" :style="{ fontSize: '14px' }"
                  @click="onDel(record)" />
              </template>
            </template>
            <template #expandedRowRender="{ record }">
              <GlobalValueTable v-if="record" :key="expandedRowRenderKey" :record="record" @refresh="getData" />
            </template>
          </va-table>
        </a-col>
      </a-row>
    </a-card>
  </div>
  <a-drawer :title="isEdit ? `Cập nhật cấu hình ${modelRef.globalListId}` : 'Thêm mới cấu hình'" size="large"
    :visible="visible" @close="onClose">
    <template #extra>
      <a-button type="primary" @click="onSubmit">Lưu</a-button>
    </template>
    <a-form layout="vertical">
      <a-form-item label="Mã" v-bind="validateInfos.code">
        <a-input v-model:value="modelRef.code" @change="validate('code', { trigger: 'change' }).catch(() => {})" />
      </a-form-item>
      <a-form-item label="Tên" v-bind="validateInfos.name">
        <a-input v-model:value="modelRef.name" @change="validate('name', { trigger: 'change' }).catch(() => {})" />
      </a-form-item>
      <a-form-item label="Loại" v-bind="validateInfos.type">
        <va-select v-model:value="modelRef.type" :options="options"
          @change="validate('type', { trigger: 'change' }).catch(() => {})" />
      </a-form-item>
      <a-form-item label="Mô tả" v-bind="validateInfos.description">
        <a-textarea v-model:value="modelRef.description"
          @change="validate('description', { trigger: 'change' }).catch(() => {})" />
      </a-form-item>
      <a-form-item v-bind="validateInfos.status">
        <span class="mr-2">Trạng thái hoạt động</span>
        <a-switch v-model:checked="modelRef.status" />
      </a-form-item>
    </a-form>
  </a-drawer>
  <a-modal v-model:visible="syncing" :title="'Đồng bộ dữ liệu...'" :closable="false" :mask-closable="false"
    :footer="false">
    <a-progress :stroke-color="{
      '0%': '#108ee9',
      '100%': '#87d068'
    }" :percent="percent" />
  </a-modal>
</template>
<script lang="ts">
import columns from './columns'
import { CloudSyncOutlined } from '@ant-design/icons-vue'
import { Form, message } from 'ant-design-vue'
import { defineComponent, ref, reactive, onMounted } from 'vue'
import {
  createGlobalList,
  deleteGlobalList,
  searchGlobalList,
  syncGlobalList,
  updateGlobalList
} from '@/services/sys/lcList'
import { Modal } from 'ant-design-vue'
import { notification } from 'ant-design-vue'
import GlobalValueTable from './GlobalValueTable.vue'

const useForm = Form.useForm
export default defineComponent({
  components: {
    GlobalValueTable,
    CloudSyncOutlined
  },
  setup() {
    const loading = ref<boolean>(false)
    const visible = ref<boolean>(false)
    const syncing = ref<boolean>(false)
    const activeSearchKey = ref<number>(1)
    const percent = ref<number>(1)
    const quickSearch = ref<string>('')
    const isEdit = ref<boolean>(false)
    const expandedRowRenderKey = ref<number>(0)
    const modelRef = reactive({
      GlobalListId: null,
      name: '',
      code: '',
      type: '',
      description: '',
      status: true
    })
    const rulesRef = reactive({
      name: [
        {
          required: true,
          message: 'Trường bắt buộc'
        },
        {
          min: 1,
          max: 20,
          message: 'Chiều dài từ 3 đến 20 ký tự',
          trigger: 'change'
        }
      ],
      code: [
        {
          required: true,
          message: 'Trường bắt buộc'
        },
        {
          min: 1,
          max: 20,
          message: 'Chiều dài từ 3 đến 20 ký tự',
          trigger: 'change'
        }
      ],
      type: [
        {
          required: true,
          message: 'Trường bắt buộc'
        }
      ]
    })
    const filters = ref({
      keyword: ''
    })
    const data = ref([])
    const editedRows = ref([])
    const pagination = ref<any>({
      current: 1,
      total: 1,
      pageSize: 15,
      showSizeChanger: true,
      showQuickJumper: true,
      pageSizeOptions: ['15', '25', '100'],
      showTotal: (total) => {
        return 'Tổng số dòng ' + total
      }
    }) // cau truc phan trang
    const showDrawer = () => {
      visible.value = true
    }
    const { resetFields, validate, validateInfos } = useForm(modelRef, rulesRef)
    const getData = async (keyword: string) => {
      try {
        loading.value = true
        const { body } = await searchGlobalList({
          keyword: keyword,
          page: pagination.value.page,
          size: pagination.value.size
        })
        if (body.data) {
          data.value = body.data.map((v) => {
            v.key = v.lcListId
            return v
          })
          expandedRowRenderKey.value++
        }
      } catch (e) {
      } finally {
        loading.value = false
      }
    } // get Data
    const onEdit = (record: any): void => {
      isEdit.value = true
      modelRef.globalListId = record.globalListId
      modelRef.code = record.code
      modelRef.description = record.description
      modelRef.name = record.name
      modelRef.type = record.type
      modelRef.status = record.status
      showDrawer()
    } // Edit form
    const create = async (params) => {
      try {
        params.status = 1
        const body = await createGlobalList(params)
        return body
        if (body) {
          notification.success({ message: 'Thực hiện hành động thành công!' })
        }
      } catch (e) {
        console.log(e)
      } finally {
        await getData(quickSearch.value)
      }
    }
    const onChangeTable = async (p) => {
      pagination.value = p
      await getData(quickSearch.value)
    } // ham tao moi
    const onReload = async () => {
      quickSearch.value = ''
      await getData()
    } // fresh lai trang
    const onQuickSearch = (v) => {
      quickSearch.value = v
      getData(v)
    } // fresh lai trang
    const onChangeStatus = async (record: any) => {
      Modal.confirm({
        title: 'Bạn có chắc chắn muốn đổi trạng thái không?',
        async onOk() {
          const params = { ...record }
          params.globalListId = params.lcListId
          params.status = record.status === '0' ? '1' : '0'
          await updateGlobalList(params)
          await getData()
        }
      })
    } // thay doi trang thai
    const onClose = () => {
      visible.value = false
      isEdit.value = false
      resetFields()
    } // dong drawer
    const onSubmit = () => {
      validate()
        .then(() => {
          Modal.confirm({
            title: 'Bạn có chắc chắn muốn thêm không',
            async onOk() {
              if (modelRef.globalListId) {
                await updateGlobalList({ ...modelRef })
                await getData()
              } else {
                await create({ ...modelRef })
              }
              onClose()
            }
          })
        })
        .catch((err) => {
          console.log('error', err)
        })
    } // submit form
    const onDel = (record) => {
      Modal.confirm({
        title: 'Bạn có chắc chắn muốn xóa cấu hình này?',
        async onOk() {
          await deleteGlobalList({
            globalListId: record.globalListId
          })
          await getData()
        }
      })
    } // xoa cau hinh\
    const onExpand = (expanded, record) => {
      console.log(expanded, record)
    }
    const onSync = async () => {
      syncing.value = true
      loading.value = true
      await syncGlobalList()
      const interval = setInterval(() => {
        percent.value++
        if (percent.value === 100) {
          loading.value = false
          syncing.value = false
          clearInterval(interval)
          percent.value = 1
          setTimeout(async () => {
            message.success('Đồng bộ thành công')
            await getData(quickSearch.value)
          })
        }
      }, 100)
    }
    getData('')
    return {
      columns,
      loading,
      pagination,
      filters,
      data,
      activeSearchKey,
      editedRows,
      visible,
      validateInfos,
      modelRef,
      isEdit,
      quickSearch,
      syncing,
      expandedRowRenderKey,
      percent,
      options: [
        {
          value: '1',
          label: 'Dành cho quản trị tập trung'
        },
        {
          value: '2',
          label: 'Dành cho khách hàng'
        }
      ],
      showDrawer,
      onClose,
      validate,
      resetFields,
      onQuickSearch,
      onSubmit,
      onReload,
      onEdit,
      onChangeStatus,
      onDel,
      onExpand,
      getData,
      onChangeTable,
      onSync
    }
  }
})
</script>
