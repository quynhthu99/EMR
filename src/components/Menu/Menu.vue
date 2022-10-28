<template>
  <a-menu v-model:open-keys="openKeys.value" v-model:selected-keys="selectedKeys" :collapsed="collapsed" :mode="mode"
    :theme="theme" class="SysMenu" @openChange="onOpenChange" @select="onSelect">
    <template v-for="m in menu" :key="m.path">
      <RenderSubMenu v-if="!m.hidden" :menu="m" />
    </template>
  </a-menu>
</template>
<script lang="ts">
import { defineComponent, reactive, computed, onMounted, ref, ComputedRef, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import RenderSubMenu from './RenderSubMenu.vue'

export default defineComponent({
  name: 'Menu',
  components: { RenderSubMenu },
  props: {
    menu: {
      type: Array,
      required: true
    },
    theme: {
      type: String,
      required: false,
      default: 'dark'
    },
    mode: {
      type: String,
      required: false,
      default: 'inline'
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  emits: ['select'],
  setup(props, { emit }) {
    const router = useRouter()
    const route = router.currentRoute
    const openKeys = reactive<any>({ value: [] })
    const selectedKeys = ref<any>([])
    const cachedOpenKeys = reactive<any>({ value: [] })
    const rootSubmenuKeys: ComputedRef<string[]> = computed(() => {
      const keys: string[] = []
      props.menu.forEach((item: any) => keys.push(item.path))
      return keys
    })
    onMounted(() => {
      updateMenu()
    })

    watchEffect(
      () => props.collapsed,
      (val) => {
        if (val) {
          cachedOpenKeys.value = openKeys.value.concat()
        } else {
          openKeys.value = cachedOpenKeys.value
        }
      }
    )
    watchEffect(
      () => selectedKeys.value,
      (v) => {
        console.log(v)
      }
    )
    watchEffect(
      () => route.value,
      () => {
        updateMenu()
      }
    )

    // select menu item
    const onOpenChange = (openKeysParams) => {
      if (props.mode === 'horizontal') {
        openKeys.value = openKeysParams
        return
      }
      const latestOpenKey: string = openKeysParams.find((key) => !openKeys.value.includes(key))
      if (!rootSubmenuKeys.value.includes(latestOpenKey)) {
        openKeys.value = openKeysParams
      } else {
        openKeys.value = latestOpenKey ? [latestOpenKey] : []
      }
    }
    const onSelect = ({ item, key, selectedKeys: selectedKeysParams }) => {
      selectedKeys.value = selectedKeysParams
      emit('select', { item, key, selectedKeys })
    }
    const updateMenu = () => {
      const routes = route.value.matched.concat()
      const { hidden } = route.value.meta
      if (routes.length >= 3 && hidden) {
        routes.pop()
        selectedKeys.value = [routes[routes.length - 1].path]
      } else {
        selectedKeys.value = [routes.pop()!.path]
      }
      const openKeysArr: any = []
      if (props.mode === 'inline') {
        routes.forEach((item) => {
          openKeysArr.push(item.path)
        })
      }
      props.collapsed ? (cachedOpenKeys.value = openKeysArr) : (openKeys.value = openKeysArr)
    }

    return {
      openKeys,
      selectedKeys,
      onOpenChange,
      onSelect
    }
  }
})
</script>
<style lang="less">

</style>
