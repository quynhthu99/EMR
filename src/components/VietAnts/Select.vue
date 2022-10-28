<template>
  <a-select :value="value" v-bind="attrs" :options="options" :loading="loading" :placeholder="placeholder">
    <template v-for="(_, name) in $slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData" />
    </template>
    <slot name="option"></slot>
  </a-select>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import attrsSelect from './DefaultSettings/select'
import merge from 'ts-deepmerge'
import { getGlobalListByCode } from '@/services/sys/lcList'
import { execute, execute } from '@/services'

export default defineComponent({
  model: {
    prop: 'value',
    event: 'change.value'
  },
  props: {
    value: {
      default() {
        return ''
      }
    },
    type: {
      type: String,
      default() {
        return 'sys'
      }
    },
    globalListCode: {
      type: String,
      default() {
        return ''
      }
    },
    api: {
      type: String,
      default() {
        return ''
      }
    },
    params: {
      type: Object,
      default() {
        return {}
      }
    },
    placeholder:{
      type: String,
      default() {
        return 'Tất cả'
      }
    }
  },
  setup(props, context) {
    const options = ref([])
    const globalListCode = ref(props.globalListCode)
    const api = ref(props.api)
    const type = ref(props.type)
    const params = ref(props.params)
    const loading = ref(false)
    if (globalListCode.value) {
      const callGlobalList = async () => {
        try {
          loading.value = true
          const { body } = await getGlobalListByCode({ code: globalListCode.value })
          options.value = body
        } catch (e) {
          console.log(e)
        } finally {
          loading.value = false
        }
      }
      callGlobalList()
    }
    if (api.value) {
      const callFunc = async () => {
        try {
          loading.value = true
          const { body } =
            type.value === 'sys'
              ? await execute(api.value, params.value, 'get')
              : await execute(api.value, params.value, 'get')
          if (body && body.data) {
            options.value = body.data
          } else {
            options.value = body
          }
        } catch (e) {
          console.log(e)
        } finally {
          loading.value = false
        }
      }
      callFunc()
    }
    const attrs: any = ref(merge(attrsSelect, context.attrs))
    return {
      attrs,
      options,
      loading
    }
  }
})
</script>
