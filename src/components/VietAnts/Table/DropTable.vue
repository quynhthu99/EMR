<template>
  <section id="drop-table">
    <a-list bordered>
      <template #header style="background-color: #f0f0f0">
        <h3>Cấu hình table</h3>
      </template>
      <a-list-item>
        <a-skeleton avatar :loading="false" :title="false">
          <a-list-item-meta>
            <template #title>
              <div>
                <span>{{ 'Tên cột' }}</span>
              </div>
            </template>
            <template #avatar>
              <va-svg-icon name="adjustments" style="margin-top: 5px"></va-svg-icon>
            </template>
          </a-list-item-meta>
          <h4>Ẩn cột</h4>
        </a-skeleton>
      </a-list-item>
      <table-draggable id="customers" class="mb-2" group="columnDropTables" :list="columnDropTables" filter="textarea"
        @start="dragging = true" @end="dragging = false">
        <template v-for="column in columnDropTables" :key="column">
          <a-list-item>
            <a-skeleton avatar :loading="false" :title="false">
              <a-list-item-meta :description="column.description">
                <template #title>
                  <div>
                    <span>{{ column.title }}</span>
                  </div>
                </template>
                <template #avatar>
                  <div style="
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      margin-top: 5px;
                    ">
                    <SvgIcon name="drop" style="cursor: grab"></SvgIcon>
                  </div>
                </template>
              </a-list-item-meta>
              <a-checkbox v-model:checked="column.hidden"></a-checkbox>
            </a-skeleton>
          </a-list-item>
        </template>
      </table-draggable>
    </a-list>
  </section>
</template>

<script>
import { VueDraggableNext } from 'vue-draggable-next'
import { defineComponent, reactive, watch } from 'vue'

export default defineComponent({
  components: {
    'table-draggable': VueDraggableNext
  },
  props: {
    columns: {
      type: Array,
      default() {
        return []
      }
    }
  },
  emits: ['update:columns'],
  setup(props, { emit }) {
    const columnDropTables = reactive(props.columns)
    watch(columnDropTables, (data) => {
      emit('update:columns', data)
    })
    const handleResizeColumn = (w, col) => {
      col.width = w
    }
    return {
      doing: [],
      done: [],
      columnDropTables,
      dragging: false,
      columnsDrop: [
        {
          title: '',
          dataIndex: 'drop',
          scopedSlots: { customRender: 'drop' },
          align: 'center',
          ellipsis: true,
          width: 50
        },
        {
          title: 'Tên cột trên giao diện',
          dataIndex: 'drop',
          scopedSlots: { customRender: 'drop' },
          align: 'center',
          ellipsis: true,
          width: 200
        },
        {
          title: 'Ẩn / Hiện thông tin',
          dataIndex: 'hideInfo',
          scopedSlots: { customRender: 'hideInfo' },
          align: 'center',
          ellipsis: true,
          width: 180
        },
        {
          title: 'Độ rộng',
          dataIndex: 'width',
          scopedSlots: { customRender: 'width' },
          align: 'center',
          ellipsis: true,
          width: 120
        },
        {
          title: 'Kiểu hiện thị',
          dataIndex: 'filter',
          scopedSlots: { customRender: 'filter' },
          align: 'center',
          ellipsis: true,
          width: 120
        },
        {
          title: 'Ghi chú',
          dataIndex: 'description',
          scopedSlots: { customRender: 'description' },
          align: 'center',
          ellipsis: true
        }
      ],
      handleResizeColumn
    }
  },
  data() {
    return {}
  }
})
</script>

<style lang="less">
#drop-table {
  .ant-list-bordered .ant-list-header {
    background: #fafafa;
    border-bottom: 1px solid #f0f0f0;
    transition: background 0.3s ease;
  }
}
</style>
