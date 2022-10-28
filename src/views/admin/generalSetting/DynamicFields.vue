<template>
  <vaBreadCrumb v-model:select.number="select"></vaBreadCrumb>
  <div class="mt-4">
    <a-card
      v-for="field in fields"
      :key="field.title"
      height="100%"
      :style="{
        backgroundColor: field.edit ? '#f2f8fe' : ''
      }"
    >
      <a-row class="mx-auto cursor-pointer flex justify-center" @click="onEdit(field)">
        <a-col :span="24">
          <div class="flex justify-between">
            <h3 class="font-bold mb-4">{{ field.title }}</h3>
            <div>
              <va-svg-icon v-if="!field.edit" name="edit" class="cursor-pointer"></va-svg-icon>
              <a-button
                v-else
                class="flex justify-center text-center w-8 h-7"
                type="primary"
                @click.stop="onForceEdit(field)"
              >
                <template #icon>
                  <va-svg-icon name="save-file" class="cursor-pointer" color="#FFFFFF" />
                </template>
              </a-button>
            </div>
          </div>
        </a-col>
        <a-col
          v-for="(child, childIndex) in field.childrens"
          :key="childIndex"
          :span="24"
          class="mb-4"
        >
          <a-row class="w-full">
            <a-col v-if="child.text" :span="10" class="pr-4">
              <span> {{ child.text }} </span>
            </a-col>
            <a-col :span="14">
              <span v-if="!field.edit" class="font-bold flex"> {{ child.value }} </span>
              <component :is="child.type" v-else class="w-full"></component>
            </a-col>
          </a-row>
        </a-col>
        <a-divider></a-divider>
      </a-row>
    </a-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'DynamicFields',
  props: {
    fields: {
      type: Array,
      default() {
        return []
      }
    }
  },
  setup(props) {
    const dynamicFields = ref(props.fields)
    const select = ref('')
    const isEdit = ref(false)
    const onEdit = (field: any): void => {
      isEdit.value = true
      if (field.edit) {
        return
      }
      field.edit = !field.edit
    }
    const onForceEdit = (field: any): void => {
      console.log(field)
      field.edit = !field.edit
    }
    return {
      dynamicFields,
      isEdit,
      select,
      onEdit,
      onForceEdit
    }
  }
})
</script>
