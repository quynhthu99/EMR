<template>
  <div>
    <a-card>
      <a-row :gutter="16" type="flex">
        <a-col :span="24">
          <va-table
            ref="tb1"
            :row-selection="null"
            :columns-table="columns"
            :title="false"
            :data-source="dataTable.filter((v) => v.status !== '2')"
            :filter="false"
            :multi-action="false"
            :pagination="data.length === 0 ? false : pagination"
            :spinning="loading"
            :scroll="{ x: 'max-content' }"
            @onReload="onReload"
          >
            <template #bodyCell="{ column, record, index }">
              <template v-if="column.key === 'rowIndex'">
                <span>{{ getTableRowIndex(pagination.pageSize, pagination.current, index) }} </span>
              </template>
              <template v-if="column.key === 'status'">
                <div
                  class="inline-flex justify-between items-center hover:cursor-pointer"
                  :class="[Boolean(record.status === '1') ? 'text-green-400' : 'text-red-400']"
                  @click="onChangeStatus(record)"
                >
                  <a-tooltip>
                    <template #title>
                      <span v-if="Boolean(record.status === '1')">Đang sử dụng</span>
                      <span v-else>Ngừng sử dụng</span>
                    </template>
                    <va-svg-icon
                      v-if="Boolean(record.status === '1')"
                      name="check-circle_solid"
                      class="ml-3 w-5 h-5"
                    ></va-svg-icon>
                    <va-svg-icon
                      v-else
                      name="x-circle_solid"
                      class="ml-3 w-5 h-5"
                    ></va-svg-icon>
                  </a-tooltip>
                </div>
              </template>
              <template v-if="column.key === 'operation'">
                <va-svg-icon
                  name="edit"
                  class="mr-2 cursor-pointer"
                  color="#1890ff"
                  :style="{ fontSize: '14px' }"
                  @click="onEdit(record)"
                />
                <va-svg-icon
                  name="delete"
                  color="red"
                  class="cursor-pointer"
                  :style="{ fontSize: '14px' }"
                  @click="onDel(record)"
                />
              </template>
            </template>
          </va-table>
        </a-col>
      </a-row>
    </a-card>
  </div>
  <a-drawer title="Cấu hình danh mục" size="large" :visible="visible" @close="onClose">
    <template #extra>
      <a-button class="mr-0.5" @click="resetFields">Nhập lại</a-button>
      <a-button type="primary" @click="onSubmit">Lưu</a-button>
    </template>
    <a-form layout="vertical">
      <a-form-item label="Mã" v-bind="validateInfos.code">
        <a-input
          v-model:value="modelRef.code"
          @change="validate('code', { trigger: 'change' }).catch(() => {})"
        />
      </a-form-item>
      <a-form-item label="Tên" v-bind="validateInfos.name">
        <a-input
          v-model:value="modelRef.name"
          @change="validate('name', { trigger: 'change' }).catch(() => {})"
        />
      </a-form-item>
      <a-form-item label="Giá trị" v-bind="validateInfos.value">
        <a-input
          v-model:value="modelRef.value"
          @change="validate('value', { trigger: 'change' }).catch(() => {})"
        />
      </a-form-item>
      <a-form-item label="Thứ tự" v-bind="validateInfos.displayOrder">
        <a-input
          v-model:value="modelRef.displayOrder"
          @change="validate('value', { trigger: 'change' }).catch(() => {})"
        />
      </a-form-item>
      <a-form-item label="Mô tả" v-bind="validateInfos.description">
        <a-textarea
          v-model:value="modelRef.description"
          @change="validate('description', { trigger: 'change' }).catch(() => {})"
        />
      </a-form-item>
      <a-form-item v-bind="validateInfos.status">
        <span class="mr-2">Trạng thái hoạt động</span>
        <a-switch
          v-model:checked="modelRef.status"
          @change="validate('description', { trigger: 'change' }).catch(() => {})"
        />
      </a-form-item>
    </a-form>
  </a-drawer>
</template>
<script lang="ts">
import columns from './global-value-table-columns'
import { Form, Modal, notification } from 'ant-design-vue'
import { defineComponent, ref, reactive } from 'vue'
import { updateGlobalListDetail } from '@/services/sys/lcList'
// import {
//   createGlobalListDetail,
//   delGlobalListDetail,
//   updateGlobalListDetail
// } from '@/services/sys/globalList'

const useForm = Form.useForm
export default defineComponent({
  props: {
    record: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  emits: ['refresh'],
  setup(props, context) {
    const isEdit = ref<boolean>(false)
    const dataTable = ref(props.record.globalListDetails)
    const record = ref(props.record)
    const modelRef = reactive({
      name: '',
      code: '',
      value: '',
      displayOrder: 0,
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
          min: 3,
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
          min: 3,
          max: 20,
          message: 'Chiều dài từ 3 đến 20 ký tự',
          trigger: 'change'
        }
      ],
      value: [
        {
          required: true,
          message: 'Trường bắt buộc'
        },
        {
          min: 3,
          max: 20,
          message: 'Chiều dài từ 3 đến 20 ký tự',
          trigger: 'change'
        }
      ]
    })
    const loading = ref<boolean>(false)
    const visible = ref<boolean>(false)
    const activeSearchKey = ref<number>(1)
    const quickSearch = ref<string>('')
    const filters = ref({
      keyword: ''
    })
    const create = async (params) => {
      try {
        params.status = 1
        params.globalListDetailId = 0
        params.globalListId = record.value.globalListId
        const body = await createGlobalListDetail(params)
        if (body) {
          notification.success({ message: 'Thực hiện hành động thành công!' })
        }
        return body
      } catch (e) {
        console.log(e)
      }
    }
    const onChangeStatus = async (record: any) => {
      Modal.confirm({
        title: 'Bạn có chắc chắn muốn đổi trạng thái không?',
        async onOk() {
          const params = { ...record }
          params.status = record.status === '0' ? '1' : '0'
          await updateGlobalListDetail(params)
          context.emit('refresh')
        }
      })
    } //
    const update = async (params) => {
      try {
        params.status = 1
        params.globalListId = record.value.globalListId
        const body = await updateGlobalListDetail(params)
        if (body) {
          notification.success({ message: 'Thực hiện hành động thành công!' })
        }
        return body
      } catch (e) {
        console.log(e)
      }
    } //
    const onEdit = (record: any): void => {
      isEdit.value = true
      modelRef.globalListDetailId = record.globalListDetailId
      modelRef.code = record.code
      modelRef.description = record.description
      modelRef.name = record.name
      modelRef.value = record.value
      modelRef.displayOrder = record.displayOrder
      modelRef.status = record.status
      showDrawer()
    } // Edi
    const { resetFields, validate, validateInfos } = useForm(modelRef, rulesRef)
    const onDel = (record) => {
      if (record) {
        Modal.confirm({
          title: 'Bạn có chắc chắn muốn xóa cấu hình này?',
          async onOk() {
            if (record.globalListDetailId) {
              await delGlobalListDetail({
                globalListDetailId: record.globalListDetailId
              })
              context.emit('refresh')
            }
          }
        })
      }
    }
    const onSubmit = () => {
      validate()
        .then(async () => {
          Modal.confirm({
            title: 'Bạn có chắc chắn muốn xóa cấu hình này?',
            async onOk() {
              if (!modelRef.globalListDetailId) {
                const body = await create({ ...modelRef })
                if (body) {
                  context.emit('refresh')
                  onClose()
                }
              } else {
                const body = await update({ ...modelRef })
                if (body) {
                  context.emit('refresh')
                  onClose()
                }
              }
            }
          })
        })
        .catch((err) => {
          console.log('error', err)
        })
    }
    const showDrawer = () => {
      visible.value = true
    }
    const onReload = () => {
      loading.value = true
      quickSearch.value = ''
      setTimeout(() => {
        loading.value = false
      }, 500)
    }
    const onClose = () => {
      visible.value = false
      resetFields()
    }
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
    })
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
      quickSearch,
      dataTable,
      showDrawer,
      onClose,
      validate,
      resetFields,
      onSubmit,
      onReload,
      onDel,
      onEdit,
      onChangeStatus
    }
  }
})
</script>
