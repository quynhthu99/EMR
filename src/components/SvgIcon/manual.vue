<template>
  <div>
    <Icon :style="{ color: 'hotpink', fontSize: '100px' }">
      <template #component>
        <!-- <logo /> -->
      </template>
    </Icon>
    <logo />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Icon from '@ant-design/icons-vue'
export default defineComponent({
  components: {
    Icon
    // logo,
  },
  setup() {
    return {}
  }
})
</script>
<style lang="less"></style>
