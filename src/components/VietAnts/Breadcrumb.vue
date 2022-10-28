<template>
  <div class="mb-4">
    <div class="py-2 px-4 flex justify-between items-center">
      <div>
        <a-breadcrumb separator=">">
          <a-breadcrumb-item v-for="(item, index) in breads" :key="index">
            <router-link :to="item.path">{{ $t(item.meta.title) }}</router-link>
          </a-breadcrumb-item>
        </a-breadcrumb>
        <div class="mt-3 uppercase font-bold text-lg breadcrumb--title">
          {{ $t(name) }}
        </div>
      </div>
      <div>
        <va-select
          v-if="optionSelects && optionSelects.length"
          v-model:value="selectOption"
          :options="optionSelects"
          class="w-1/5"
        ></va-select>
        <slot name="extraAction"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { RouterMeta } from '@/router/types'
interface Router {
  path: string
  meta?: RouterMeta
}
export default defineComponent({
  name: 'Breadcrumb',
  props: {
    optionSelects: {
      type: Array,
      default() {
        return []
      }
    },
    select: {
      type: String,
      default() {
        return ''
      }
    },
    extraBreadcrumbs: {
      type: Array,
      default() {
        return []
      }
    }
  },
  emits: ['input'],
  setup(props, context) {
    const route = useRoute()
    const selectOption = ref(props.select)
    const breads = ref([])
    const name = ref('')
    const extraBreadcrumb = ref<Router>(props.extraBreadcrumbs)
    breads.value = []
    if (route.meta && route.meta.breadcrumbText) {
      name.value = route.meta.breadcrumbText
    }
    if (
      extraBreadcrumb.value &&
      Array.isArray(extraBreadcrumb.value) &&
      extraBreadcrumb.value.length
    ) {
      extraBreadcrumb.value.forEach((item) => {
        breads.value.push(item)
      })
    } else {
      route.matched.forEach((item) => {
        breads.value.push(item)
      })
    }
    watch(
      () => selectOption.value,
      (v) => {
        // khi co select chon phan he va muon lay gia tri cua phan he do
        context.emit('input', v)
      }
    )
    return {
      breads,
      name,
      selectOption
    }
  }
})
</script>

<style scoped></style>
