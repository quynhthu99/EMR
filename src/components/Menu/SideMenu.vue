<template>
  <a-layout-sider v-model:collapsed="collapsed" :class="[
    'sider',
    isDesktop ? null : 'shadow',
    theme,
    fixSiderbar ? 'ant-fixed-sidemenu' : null
  ]" width="280px" :collapsible="collapsible" :trigger="null">
    <logo />
    <Menu :collapsed="collapsed" :menu="menus" :theme="theme" :mode="mode" @select="onSelect"></Menu>
  </a-layout-sider>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Logo from '@/components/Tools/Logo.vue'
import Menu from './Menu.vue'
import { isDesktop } from '@/utils/device'
import { fixSiderbar } from '@/store/useSiteSettings'

export default defineComponent({
  name: 'SideMenu',
  components: { Logo, Menu },
  props: {
    mode: {
      type: String,
      required: false,
      default: 'inline'
    },
    theme: {
      type: String,
      required: false,
      default: 'dark'
    },
    collapsible: {
      type: Boolean,
      required: false,
      default: false
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    },
    menus: {
      type: Array,
      required: true
    }
  },
  emits: ['menuSelect'],
  setup(props, { emit }) {
    const onSelect = (obj) => {
      emit('menuSelect', obj)
    }

    return {
      onSelect,
      isDesktop,
      fixSiderbar
    }
  }
})
</script>
