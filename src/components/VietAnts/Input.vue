<template>
  <a-input :value="value" v-bind="attrs">
    <template v-for="(_, name) in $slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData" />
    </template>
  </a-input>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import attrsInput from './DefaultSettings/input'
import merge from 'ts-deepmerge'
export default defineComponent({
  model: {
    prop: 'value',
    event: 'change.value'
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['value'],
  setup(props, context) {
    const attrs: any = ref(merge(attrsInput, context.attrs))
    return {
      attrs
    }
  }
})
</script>

<style scoped></style>
