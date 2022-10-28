<template>
  <!--  <va-input v-model:value="form.text"></va-input>-->
  <!--  <va-select-->
  <!--    v-model:value="form.text"-->
  <!--    :options="items"-->
  <!--    :global-list="{-->
  <!--      status: true,-->
  <!--      code: API.GET_GLOBAL_LIST_BY_CODE-->
  <!--    }"-->
  <!--  >-->
  <!--  </va-select>-->
  <va-table
    :columns-table="columns"
    :data-source="data"
    :selections="false"
    :spinning="false"
    bordered
    :row-selection="null"
    @expand="onExpand"
  >
    <template #filter>
      <va-select></va-select>
    </template>
    <template #extraFilterAction>
      <a-button class="mr-2">Click to Action</a-button>
    </template>
    <template #extraMultiAction>
      <a-button>Click to Action</a-button>
    </template>
  </va-table>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import columns from './columns'
import API from '@/services/sys/defineRouting'

export default defineComponent({
  name: 'Index',
  setup() {
    const form = ref({})
    return {
      API,
      columns,
      form,
      data: [],
      items: []
    }
  },
  methods: {
    onExpand(expanded, record) {
      console.log(expanded, record)
    }
  }
})
</script>

<style scoped></style>
