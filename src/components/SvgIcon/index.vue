<template>
  <svg aria-hidden="true" :class="cls">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script>
import { defineComponent, computed, ref } from 'vue'
import attrsSvg from '@/components/VietAnts/DefaultSettings/svg'

export default defineComponent({
  name: 'SvgIcon',
  props: {
    prefix: {
      type: String,
      default: 'icon'
    },
    name: {
      type: String,
      required: true
    }
  },
  setup(props, context) {
    const attrs = ref(context.attrs.class)
    let cls = attrsSvg.class
    if (attrs.value) {
      attrs.value += cls
    }
    // const regx = /^(w|h)-\d+$/gm
    // let hasCls = false
    // const clasess = cls.split(' ')
    // for (const idx in clasess) {
    //   if (regx.test(clasess[idx].toLowerCase()) === true) {
    //     hasCls = true
    //   }
    // }
    // if (hasCls === false) {
    //   cls += ' w-5 h-5'
    // }
    const symbolId = computed(() => `#${props.prefix}-${props.name}`)
    return { symbolId, cls }
  }
})
</script>
