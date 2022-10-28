<template>
  <a-modal
    v-model:visible="visible"
    width="100%"
    class="bg-white"
    wrap-class-name="full-modal"
    :footer="false"
    :body-style="{
      background: '#FFFFFF'
    }"
    title="Báo cáo chứng từ"
    @cancel="onClose"
  >
    <DynamicFields :fields="fields"></DynamicFields>
  </a-modal>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import DynamicFields from '@/views/admin/generalSetting/DynamicFields.vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Index',
  components: {
    DynamicFields
  },
  setup() {
    const router = useRouter()
    const onClose = () => {
      router.push({ name: 'admin.settings.general' })
    }
    const visible = ref(true)
    const fields = ref([
      {
        title: 'Chế độ kế toán',
        edit: false,
        childrens: [
          {
            text: 'Chế độ kế toán',
            value: 'Chế độ kế toán doanh nghiệp ban hành theo Thông tư 200/2014/TT-BTC',
            type: 'vaInput'
          },
          {
            text: 'Ngày bắt đầu dữ liệu',
            value: '01/01/2021',
            type: 'vaDatePicker'
          },
          {
            text: 'Ngày khóa sổ',
            value: '31/12/2020',
            type: 'vaDatePicker'
          },
          {
            text: 'Hình thức sổ kế toán ',
            value: 'Nhật ký chung',
            type: 'a-radio-group'
          }
        ]
      },
      {
        title: 'Chế độ ghi sổ',
        edit: false,
        childrens: [
          {
            text: 'Chế độ ghi sổ',
            value: 'Cất đồng thời ghi sổ'
          }
        ]
      },
      {
        title: 'Đa chi nhánh',
        childrens: [
          {
            text: 'Chi nhánh',
            value: 'Có'
          },
          {
            text: 'Quản lý danh mục riêng theo từng chi nhánh',
            value: 'Vật tư hàng hóa'
          }
        ]
      },
      {
        title: 'Tiền tệ',
        edit: false,
        childrens: [
          {
            text: 'Đồng tiền hạch toán',
            value: 'VNĐ'
          },
          {
            text: 'Có phát sinh nghiệp vụ liên quan đến ngoại tệ\n',
            value: 'Có'
          },
          {
            text: 'Phương pháp tính tỷ giá xuất quỹ',
            value: 'Bình quân cuối kỳ'
          },
          {
            text: 'TK xử lý chênh lệch tỷ giá xuất quỹ',
            value: '\n' + 'TK xử lý lãi: 5151; TK xử lý lỗ: 635'
          },
          {
            text: 'TK xử lý chênh lệch tỷ giá khi thu tiền/trả tiền',
            value: '\n' + 'TK xử lý lãi\n' + '5151\n' + 'TK xử lý lỗ\n' + '635\n'
          }
        ]
      }
    ])
    return {
      fields,
      visible,
      onClose
    }
  }
})
</script>
