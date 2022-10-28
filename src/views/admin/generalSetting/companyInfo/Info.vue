<template>
  <DynamicFields :fields="fields"></DynamicFields>
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
            type: 'VsmeInput'
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

<style scoped></style>
