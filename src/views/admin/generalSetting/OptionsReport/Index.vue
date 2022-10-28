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
        title: 'In báo cáo, chứng từ',
        edit: false,
        childrens: [
          {
            text:
              '\n' +
              'Lấy công nợ cũ và công nợ cuối ngày khi sửa mẫu chứng từ chuyển đổi từ MISA SME.NET',
            value: 'Có',
            type: 'VsmeInput'
          },
          {
            text: 'Cho phép in chứng từ chưa ghi sổ',
            value: 'Có',
            type: 'VsmeDatePicker'
          },
          {
            text: 'Cho phép in chứng từ đã khóa sổ',
            value: 'Không',
            type: 'VsmeDatePicker'
          },
          {
            text: 'Cộng gộp các mặt hàng giống nhau khi in Hóa đơn, Phiếu xuất kho (cùng ĐVT, đơn giá, số lô, hạn sử dụng) ',
            value: 'Có',
            type: 'a-radio-group'
          },
          {
            text: 'Cảnh báo khi in phiếu xuất kho bán hàng lần thứ 2 trở đi ',
            value: 'Có',
            type: 'a-radio-group'
          },
          {
            text: 'Ngày ký báo cáo lấy theo ngày cuối cùng của kỳ báo cáo ',
            value: 'Có',
            type: 'a-radio-group'
          },
          {
            text: 'Ngày ký chứng từ lấy theo ngày chứng từ ',
            value: 'Có',
            type: 'a-radio-group'
          },
          {
            text: 'Hiển thị dòng Chi nhánh lên báo cáo tài chính in tại chi nhánh',
            value: 'Có',
            type: 'a-radio-group'
          }
        ]
      },
      {
        title: 'Hiển thị thông tin công ty trên báo cáo, chứng từ',
        edit: false,
        childrens: [
          {
            text: 'Tên công ty và địa chỉ',
            value: 'Có',
            type: 'VsmeInput'
          },
          {
            text: 'Mã số thuế',
            value: 'Có',
            type: 'VsmeDatePicker'
          },
          {
            text: 'Số điện thoại',
            value: 'Không',
            type: 'VsmeDatePicker'
          },
          {
            text: 'Email ',
            value: 'Có',
            type: 'a-radio-group'
          },
          {
            text: 'Webiste',
            value: 'Có',
            type: 'a-radio-group'
          },
          {
            text: 'Logo trên báo cáo ',
            value: 'Có',
            type: 'a-radio-group'
          },
          {
            text: 'Căn lề thông tin công ty, logo ',
            value: 'Có',
            type: 'a-radio-group'
          },
          {
            text: 'Tùy chỉnh kích thước logo, thông tin công ty',
            value: 'Có',
            type: 'a-radio-group'
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

<style lang="less"></style>
