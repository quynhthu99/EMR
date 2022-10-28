<template>
  <a-sub-menu v-if="menu.children && !menu.hideChildrenInMenu" :key="menu.path" popup-class-name="popupSubMenu">
    <template #icon>
      <SvgIcon v-if="menu.meta.icon" class="w-5 h-5" :name="menu.meta.icon" />
    </template>
    <template #title>{{ $t(menu.meta.title) }}</template>
    <template v-if="!menu.hideChildrenInMenu">
      <template v-for="(sub, index) in menu.children" :key="index">
        <RenderSubMenu :menu="sub" />
      </template>
    </template>
  </a-sub-menu>
  <a-menu-item v-else-if="!menu.meta.hidden" :key="menu.path">
    <template #icon>
      <SvgIcon v-if="menu.meta.icon" :name="menu.meta.icon" class="w-5 h-5" />
    </template>
    <a v-if="menu.meta.target" :href="menu.meta.target" :target="menu.meta.blank === false ? '' : '_blank'">
      <span>{{ $t(menu.meta.title) }}</span>
    </a>
    <router-link v-else :to="filterParams(menu.path)">
      <span>{{ $t(menu.meta.title) }}</span>
    </router-link>
  </a-menu-item>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import SvgIcon from '@/components/SvgIcon/index.vue'
export default defineComponent({
  name: 'RenderSubMenu',
  components: {
    SvgIcon
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['menu'],
  setup(prop) {
    if (prop.menu.children && prop.menu.hideChildrenInMenu) {
      prop.menu.children.forEach((item) => {
        item.meta = Object.assign(item.meta, { hidden: true })
      })
    }

    const filterParams = (menu) => {
      return menu.indexOf('/:') > 0 ? menu.split('/:')[0] : menu
    }
    return {
      filterParams
    }
  }
})
</script>
<style lang="less" scoped>
.menuName {

  svg,
  span {
    vertical-align: middle;
  }

  svg {
    margin-right: 10px;
  }
}
</style>
