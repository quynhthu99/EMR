<template>
  <div class="logo">
    <router-link :to="{ name: 'patient-list' }">
      <SvgIcon name="logo" />
      <h1 v-if="showTitle" class="uppercase">{{ title }}</h1>
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SvgIcon from '@/components/SvgIcon/index.vue'

export default defineComponent({
  name: 'Logo',
  components: {
    SvgIcon
  },
  props: {
    title: {
      type: String,
      default: 'BỆNH ÁN ĐIỆN TỬ',
      required: false
    },
    showTitle: {
      type: Boolean,
      default: true,
      required: false
    }
  }
})
</script>
