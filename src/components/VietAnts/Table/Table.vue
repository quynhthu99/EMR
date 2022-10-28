<template>
  <a-table v-if="!visibleFullScreen" class="va-table" :columns="columns" :scroll="{ x: 'max-content' }"
    :default-expand-all-rows="defaultExpandAllRows" :row-selection="{
      fixed: true,
      selectedRowKeys: state.selectedRowKeys,
      selectedRows: state.selectedRows,
      onChange: onSelectChange
    }" :loading="{
      size: 'large',
      indicator: indicator,
      spinning: $attrs.spinning
    }" v-bind="$attrs" @resizeColumn="handleResizeColumn">
    <template v-for="(_, name) in $slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData" />
    </template>

    <template v-if="title" #title>
      <div class="flex justify-between items-center">
        <div class="flex justify-center items-center">
          <h1 class="font-bold text-2xl text-[#5597D3] my-auto">Bộ dữ liệu</h1>
          <div v-if="multiAction && actions.length" class="flex">
            <span class="text-black">Thực hiện hàng loạt: </span>
            <a-tooltip v-for="action in actions" :key="action.key">
              <template #title>
                {{ action.title }}
              </template>
              <va-svg-icon :name="action.icon" class="cursor-pointer ml-2"
                :class="state.selectedRowKeys.length ? action.activeClass : 'text-gray-600'"
                @click="onMultiAction(action)"></va-svg-icon>
            </a-tooltip>
          </div>
          <a-space class="pb-2">
            <slot name="filter"></slot>
          </a-space>
        </div>
        <div class="w-3/5 flex justify-end items-center">
          <va-input v-if="isQuickSearch" v-model:value="quickSearch" class="w-1/4 mr-4" placeholder="Tìm kiếm nhanh..."
            :show-count="false" @input="onInput"></va-input>
          <div v-if="refresh" class="w-6 h-6 mx-2 hover:cursor-pointer" @click="onLoading">
            <a-tooltip>
              <template #title>{{ $t('va.table.refresh') }}</template>
              <va-svg-icon name="synchronize" :class="[loadingSynchronize ? 'animate-spin' : '']" />
            </a-tooltip>
          </div>
          <div v-if="fullscreen" class="w-6 h-6 mx-2 hover:cursor-pointer" @click="onToggleFullScreen(true)">
            <a-tooltip>
              <template #title>{{ $t('va.table.fullscreen') }}</template>
              <va-svg-icon name="fullScreen" />
            </a-tooltip>
          </div>
          <div v-if="excel" class="w-6 h-6 mx-2 hover:cursor-pointer" @click="onExportExcel">
            <a-tooltip>
              <template #title>{{ $t('va.table.export_excel') }}</template>
              <va-svg-icon name="document-download"></va-svg-icon>
            </a-tooltip>
          </div>
          <div v-if="setting" class="w-6 h-6 ml-2 hover:cursor-pointer" @click="onClickSetting">
            <a-tooltip placement="topLeft">
              <template #title>{{ $t('va.table.settings') }}</template>
              <va-svg-icon name="setting"></va-svg-icon>
            </a-tooltip>
          </div>
        </div>
      </div>
    </template>
  </a-table>
  <a-drawer title="Cấu hình table" size="large" :visible="visible" :body-style="{ paddingBottom: '80px' }"
    @close="onCloseSetting">
    <DropTable v-model:columns="columns" @update:columns="onUpdateColumn" />
  </a-drawer>
  <a-modal v-if="visibleFullScreen" v-model:visible="visibleFullScreen" width="100%" :z-index="200" class="bg-white"
    wrap-class-name="full-modal" :footer="false" :body-style="{
      background: '#FFFFFF'
    }">
    <a-table class="va-table" :columns="columns" :custom-render="customRender" :row-selection="{
      fixed: true,
      selectedRowKeys: state.selectedRowKeys,
      onChange: onSelectChange
    }" :loading="{
      size: 'large',
      indicator: indicator,
      spinning: $attrs.spinning
    }" v-bind="$attrs" @resizeColumn="handleResizeColumn">
      <template v-for="(_, name) in $slots" #[name]="slotData">
        <slot :name="name" v-bind="slotData" />
      </template>
      <template v-if="title" #title>
        <div class="flex justify-between">
          <div class="flex justify-center items-center">
            <div v-if="multiAction && actions.length" class="flex">
              <span class="text-black">Thực hiện hàng loạt: </span>
              <a-tooltip v-for="action in actions" :key="action.key">
                <template #title>
                  {{ action.title }}
                </template>
                <va-svg-icon :name="action.icon" class="cursor-pointer ml-2"
                  :class="state.selectedRowKeys.length ? action.activeClass : 'text-gray-600'"
                  @click="onMultiAction(action)"></va-svg-icon>
              </a-tooltip>
            </div>
            <a-space class="pb-2">
              <slot name="filter"></slot>
            </a-space>
          </div>
          <div class="w-3/5 flex justify-end">
            <va-input v-if="isQuickSearch" v-model:value="quickSearch" class="w-1/4 mr-4"
              placeholder="Tìm kiếm nhanh..." :show-count="false" @input="onInput"></va-input>
            <div v-if="refresh" class="w-6 h-6 mx-2 hover:cursor-pointer" @click="onLoading">
              <a-tooltip>
                <template #title>{{ $t('va.table.refresh') }}</template>
                <va-svg-icon name="synchronize" :class="[loadingSynchronize ? 'animate-spin' : '']" />
              </a-tooltip>
            </div>
            <div v-if="fullscreen" class="w-6 h-6 mx-2 hover:cursor-pointer" @click="onToggleFullScreen(true)">
              <a-tooltip>
                <template #title>{{ $t('va.table.fullscreen') }}</template>
                <va-svg-icon name="fullScreen" />
              </a-tooltip>
            </div>
            <div v-if="excel" class="w-6 h-6 mx-2 hover:cursor-pointer" @click="onExportExcel">
              <a-tooltip>
                <template #title>{{ $t('va.table.export_excel') }}</template>
                <va-svg-icon name="document-download"></va-svg-icon>
              </a-tooltip>
            </div>
            <div v-if="setting" class="w-6 h-6 mx-2 hover:cursor-pointer" @click="onClickSetting">
              <a-tooltip placement="topLeft">
                <template #title>{{ $t('va.table.settings') }}</template>
                <va-svg-icon name="setting"></va-svg-icon>
              </a-tooltip>
            </div>
          </div>
        </div>
      </template>
    </a-table>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, onMounted } from 'vue'
import DropTable from './DropTable.vue'
import { message, Modal } from 'ant-design-vue'
import _ from 'lodash'
import { Action } from '@/utils/types'
import { h } from 'vue'
import Loading from '@/components/Loading/Loading.vue'
export default defineComponent({
  name: 'Table',
  components: {
    DropTable
  },
  props: {
    /**
     * columnsTable:  định nghĩa các cột trên table
     */
    columnsTable: {
      type: Array,
      default() {
        return []
      }
    },
    fullscreen: {
      type: Boolean,
      default() {
        return true
      }
    },
    setting: {
      type: Boolean,
      default() {
        return true
      }
    },
    excel: {
      type: Boolean,
      default() {
        return true
      }
    },
    refresh: {
      type: Boolean,
      default() {
        return true
      }
    },
    title: {
      type: Boolean,
      default() {
        return true
      }
    },
    multiAction: {
      type: Boolean,
      default() {
        return true
      }
    },
    actions: {
      type: Array as () => Action[],
      default() {
        return []
      }
    },
    quickSearchValue: {
      type: String,
      default() {
        return ''
      }
    },
    isQuickSearch: {
      type: Boolean,
      default() {
        return true
      }
    },
    timeout: {
      type: Number,
      default() {
        return 300
      }
    }
  },
  emits: ['removedFilter', 'getSelected', 'onReload', 'getQuickSearch', 'onMultiAction'],
  setup(props, context) {
    const slots = context.slots
    const quickSearch = ref<string>(props.quickSearchValue)
    const timeout = ref<number>(props.timeout)
    const visible = ref<boolean>(false)
    const visibleFullScreen = ref<boolean>(false)
    const defaultExpandAllRows = ref<boolean>(false)
    const loading = ref<boolean>(false)
    const loadingSynchronize = ref<boolean>(false)
    const visibleFilter = ref<boolean>(false)
    const visibleMultiAction = ref<boolean>(false)
    const indicator = ref(
      h(Loading, {
        style: {
          fontSize: '60px'
        },
        delay: 300
      })
    )
    const state = reactive<{
      selectedRowKeys: Key[]
      selectedRows: Key[]
      loading: boolean
    }>({
      selectedRowKeys: [],
      selectedRows: [],
      loading: false
    })
    const columns = ref(props.columnsTable.filter((v) => !v.hidden))
    const onCloseSetting = (): void => {
      visible.value = false
    } // close setting
    const onClickSetting = (): void => {
      visible.value = true
    } // open setting
    const onCloseFilter = (): void => {
      visibleFilter.value = false
    }
    const onClickFilter = (): void => {
      visibleFilter.value = true
    }
    const onCloseMultiAction = (): void => {
      visibleMultiAction.value = false
    }
    const onClickMultiAction = (): void => {
      visibleMultiAction.value = true
    }
    const onLoading = (): void => {
      quickSearch.value = ''
      loadingSynchronize.value = true
      context.emit('onReload')
      setTimeout(() => {
        loadingSynchronize.value = false
      }, 600)
    }
    const onToggleFullScreen = (open = false): void => {
      visibleFullScreen.value = open
    }
    const handleResizeColumn = (w, col) => {
      col.width = w
    }
    const onExportExcel = () => {
      message.info('Tính năng đang phát triển!')
    }
    const onMultiAction = (action: any) => {
      if (state.selectedRowKeys.length) {
        Modal.confirm({
          title: `Bạn có chắc chắn muốn thực hiện ${action.title} ${state.selectedRowKeys.length} bản ghi này?`,
          onOk() {
            context.emit('onMultiAction', { key: action.key, selectRows: state.selectedRows })
          }
        })
      } else {
        message.warning('Vui lòng chọn bản ghi!')
      }
    }
    const hasSelected = computed(() => state.selectedRowKeys.length > 0)
    const onSelectChange = (selectedRowKeys, selectedRows) => {
      state.selectedRowKeys = selectedRowKeys
      state.selectedRows = selectedRows
      context.emit('getSelected', selectedRowKeys)
    }
    const customRender = (text, record, index) => {
      console.log(text, record, index)
      return text
    }

    const onInput = _.debounce(() => {
      context.emit('getQuickSearch', quickSearch.value)
    }, timeout.value)
    onMounted(() => {
      defaultExpandAllRows.value = false
    })
    return {
      indicator,
      columns,
      visible,
      visibleFullScreen,
      visibleFilter,
      visibleMultiAction,
      hasSelected,
      loading,
      state,
      slots,
      quickSearch,
      loadingSynchronize,
      defaultExpandAllRows,
      onCloseSetting,
      onClickSetting,
      onToggleFullScreen,
      handleResizeColumn,
      onSelectChange,
      onCloseFilter,
      onClickFilter,
      onCloseMultiAction,
      onClickMultiAction,
      onLoading,
      onExportExcel,
      onMultiAction,
      onInput,
      customRender
    }
  },
  methods: {
    onUpdateColumn(columns): void {
      this.columns = columns.filter((v) => !v.hidden)
    }
  }
})
</script>
<style lang="less">
.va-table {
  .ant-table-title {
    padding-left: 0;
    padding-right: 0;
  }

  .ant-pagination {
    margin-top: 1rem;
  }
}
</style>
