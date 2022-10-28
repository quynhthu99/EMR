<template>
  <a-layout :class="['layout', device]">
    <!-- SideMenu -->
    <a-drawer v-if="isMobile" :placement="'left'" :wrap-class-name="`drawer-sider ${navTheme}`" :closable="false"
      :visible="collapsed" @close="drawerClose">
      <side-menu mode="inline" :menus="menus" :theme="navTheme" :collapsed="false" :collapsible="true"></side-menu>
    </a-drawer>

    <side-menu v-else-if="isSideMenu()" mode="inline" :menus="menus" :theme="navTheme" :collapsed="collapsed"
      :collapsible="true"></side-menu>
    <a-layout :class="[layoutMode, `content-width-${contentWidth}`]"
      :style="{ paddingLeft: contentPaddingLeft, minHeight: '100vh' }">
      <!-- layout header -->
      <global-header :mode="layoutMode" :menus="menus" :theme="navTheme" :collapsed="collapsed" :device="device"
        @toggle="toggle" @refresh="onRefresh" />

      <!-- layout content -->
      <a-layout-content :style="{
        height: '100%',
        paddingTop: fixedHeader ? '64px' : '0'
      }">
        <multi-tab v-if="multiTab"></multi-tab>
        <transition name="page-transition">
          <section>
            <div id="basic-layout--content" class="basic-layout--content ml-4 pr-4 mt-4 h-screen">
              <route-view v-if="showRouter" />
            </div>
          </section>
        </transition>
      </a-layout-content>

      <setting-drawer></setting-drawer>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, onMounted, nextTick } from 'vue'
import { triggerWindowResizeEvent, isMobile, isDesktop } from '@/utils/device'
import RouteView from './RouteView.vue'
import MultiTab from '@/components/MultiTab/index.vue'
import SideMenu from '@/components/Menu/SideMenu.vue'
import GlobalHeader from '@/components/GlobalHeader/GlobalHeader.vue'
import SettingDrawer from '@/components/SettingDrawer/index.vue'
import { convertRoutes } from '@/router/generateAsyncRoutes'
import { filterRouterPermission } from '@/router/permission'
import { PERMISSION, SET_SIDEBAR_TYPE } from '@/store/mutation-types'
import cloneDeep from 'lodash.clonedeep'
import {
  fixSidebar,
  sidebarOpened,
  multiTab,
  device,
  layoutMode,
  contentWidth,
  fixedHeader,
  navTheme,
  isSideMenu
} from '@/store/useSiteSettings'
import ls from '@/utils/Storage'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import emitter from '@/utils/eventBus'

export default defineComponent({
  name: 'BasicLayout',
  components: {
    MultiTab,
    RouteView,
    SideMenu,
    GlobalHeader,
    SettingDrawer
  },
  setup() {
    const router = useRouter()
    const collapsed = ref(false)
    const menus = ref([])
    const store = useStore()
    const contentPaddingLeft = computed(() => {
      if (!fixSidebar.value || isMobile.value) {
        return '0'
      }
      if (sidebarOpened.value) {
        return '215px'
      }
      return '80px'
    })

    watch(
      () => sidebarOpened.value,
      (val) => {
        collapsed.value = !val
      }
    )

    const mainMenu = cloneDeep(router.getRoutes())
    const orginRoutes = filterRouterPermission(mainMenu, ls.get(PERMISSION))
    const routes = convertRoutes(orginRoutes.find((item) => item.path === '/'))
    menus.value = (routes && routes.children) || []
    collapsed.value = !sidebarOpened.value

    onMounted(() => {
      const userAgent = navigator.userAgent
      if (userAgent.indexOf('Edge') > -1) {
        nextTick(() => {
          collapsed.value = !collapsed.value
          setTimeout(() => {
            collapsed.value = !collapsed.value
          }, 16)
        })
      }
    })

    const toggle = () => {
      collapsed.value = !collapsed.value
      store.commit(SET_SIDEBAR_TYPE, !collapsed.value)
      triggerWindowResizeEvent()
    }
    const paddingCalc = () => {
      let left = ''
      if (sidebarOpened.value) {
        left = isDesktop.value ? '215px' : '80px'
      } else {
        left = (isMobile.value && '0') || (fixSidebar.value && '80px') || '0'
      }
      return left
    }
    const menuSelect = () => { }
    const drawerClose = () => {
      collapsed.value = false
    }

    const showRouter = ref(true)
    const onRefresh = () => {
      emitter.all.clear()
      showRouter.value = false
      nextTick(() => (showRouter.value = true))
    }
    return {
      multiTab,
      device,
      layoutMode,
      contentWidth,
      fixedHeader,
      navTheme,
      isMobile,
      collapsed,
      menus,
      contentPaddingLeft,
      orginRoutes,
      routes,
      showRouter,
      toggle,
      paddingCalc,
      menuSelect,
      drawerClose,
      isSideMenu,
      onRefresh
    }
  }
})
</script>

<style lang="less">
.page-transition-enter {
  opacity: 0;
}

.page-transition-leave-active {
  opacity: 0;
}

.page-transition-enter .page-transition-container,
.page-transition-leave-active .page-transition-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.basic-layout--content {
  overflow-x: hidden;
  max-height: calc(100vh - 65px);
}

.basic-layout--content::-webkit-scrollbar {
  width: 5px;
}

.basic-layout--content::-webkit-scrollbar-thumb {
  background-color: darkgrey;
}

.basic-layout--content::-webkit-scrollbar-thumb:hover {
  background: #5f5d5d;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
