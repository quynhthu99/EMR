<template>
  <a-radio-group :value="value" v-bind="$attrs">
    <template v-for="(_, name) in $slots" #[name]="slotData"
      ><slot :name="name" v-bind="slotData"
    /></template>
  </a-radio-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  // eslint-disable-next-line vue/require-prop-types
  model: {
    prop: 'value',
    event: 'change.value'
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['value']
})
</script>

<style scoped></style>
