<template>
  <a-input-group compact class="flex">
    <a-input :value="value" style="width: calc(100% - 100px)" @change="search" />
    <a-button @click.stop="focusSelect">
      <va-svg-icon :name="open ? 'down' : 'up'"></va-svg-icon>
    </a-button>
  </a-input-group>
  <a-table v-if="open" :columns="columns" :data-source="options" :loading="loading"></a-table>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import attrsSelect from './DefaultSettings/select'
import merge from 'ts-deepmerge'
import { getGlobalListByCode } from '@/services/sys/lcList'
import { execute } from '@/services'
import API from '@/services/sys/defineRouting'
import search from '@/views/admin/unit/staffManagement/search'

export default defineComponent({
  model: {
    prop: 'value',
    event: 'change.value'
  },
  // eslint-disable-next-line vue/require-prop-types,vue/prop-name-casing
  props: ['value', 'globalListCode', 'columns', 'urlTable'],
  setup(props, context) {
    const options = ref([])
    const globalListCode = ref(props.globalListCode)
    const urlTable = ref(props.urlTable)
    const loading = ref(false)
    const open = ref(false)
    const focusSelect = (v) => {
      open.value = !open.value
    }
    if (globalListCode.value) {
      const callGlobalList = async () => {
        try {
          const { body } = await getGlobalListByCode({ code: globalListCode.value })
          options.value = body
        } catch (e) {
          console.log(e)
        }
      }
      callGlobalList()
    }
    if (urlTable.value) {
      const func = async (text = '') => {
        try {
          loading.value = true
          const { body } = await execute(urlTable.value, { keyword: text }, 'get')
          if (body && body.data) {
            options.value = body.data
          }
        } finally {
          loading.value = false
        }
      }
      func()
    }
    const search = async (v) => {
      const text = v.target.value
      try {
        loading.value = true
        const { body } = await execute(urlTable.value, { keyword: text }, 'get')
        if (body && body.data) {
          options.value = body.data
        }
      } finally {
        loading.value = false
      }
    }
    const attrs: any = ref(merge(attrsSelect, context.attrs))
    return {
      attrs,
      options,
      open,
      loading,
      focusSelect,
      search
    }
  }
})
</script>
