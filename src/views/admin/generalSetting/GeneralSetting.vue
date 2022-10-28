<template>
  <va-bread-crumb />
  <a-row :gutter="['16', '16']">
    <a-col v-for="setting in settings" :key="setting.name" :xs="24" :md="12" :lg="6">
      <router-link
        :to="{
          name: setting.name
        }"
      >
        <a-card class="cursor-pointer" style="height: 150px" hoverable>
          <div class="justify-center text-center my-4">
            <va-svg-icon width="40px" height="40px" :name="setting.icon" class=""></va-svg-icon>
            <p class="block py-2">{{ setting.text }}</p>
          </div>
        </a-card>
      </router-link>
    </a-col>
  </a-row>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
interface Setting {
  text: string
  link: string
  icon?: string
}
export default defineComponent({
  components: {},
  setup() {
    const settings = ref<Setting>([
      {
        text: 'Thông tin công ty',
        name: 'admin.settings.general_setting.company_info',
        icon: 'document-text'
      },
      {
        text: 'Tùy chọn chung',
        name: 'admin.settings.general_setting',
        icon: 'setting'
      },
      {
        text: 'Tùy chọn vật tư hàng hóa',
        name: 'admin.settings.supplies.options_invertory_item',
        icon: 'cube'
      },
      {
        text: 'Tùy chọn quy tắc đánh số chứng từ',
        name: 'admin.settings.voucher.options_rule_numbering',
        icon: 'document-text'
      },
      {
        text: 'Tùy chọn chức năng nghiệp vụ',
        icon: 'beaker'
      },
      {
        text: 'Tùy chọn định dạng hiển thị',
        icon: 'setting'
      },
      {
        text: 'Tùy chọn tham số khác',
        icon: 'setting'
      },
      {
        text: 'Tùy chọn danh mục khác',
        icon: 'setting'
      }
    ])
    return {
      settings
    }
  }
})
</script>

<style scoped></style>
