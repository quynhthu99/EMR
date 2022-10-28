<template>
  <a-date-picker v-model:value="valueDate" v-bind="$attrs">
    <template v-for="(_, name) in $slots" #[name]="slotData"
      ><slot :name="name" v-bind="slotData"
    /></template>
  </a-date-picker>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  props: ['value'],
  setup(props) {
    return {
      valueDate: props.value
    }
  }
})
</script>
