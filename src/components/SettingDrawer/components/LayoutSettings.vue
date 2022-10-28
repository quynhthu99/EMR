<template>
  <SettingItem :title="$t('settingDrawer.layoutSettings')">
    <a-list :split="false">
      <a-list-item>
        <template #actions>
          <a-tooltip>
            <template #title>{{ $t('settingDrawer.onlyValid') }}</template>
            <a-select
              size="small"
              style="width: 80px"
              :value="contentWidth"
              :disabled="layoutMode === 'sidemenu'"
              @change="handleContentWidthChange"
            >
              <a-select-option value="Fluid">{{ $t('settingDrawer.fluid') }}</a-select-option>
              <a-select-option value="Fixed">{{ $t('settingDrawer.fixation') }}</a-select-option>
            </a-select>
          </a-tooltip>
        </template>
        <a-list-item-meta>
          <template #title>{{ $t('settingDrawer.contentWidth') }}</template>
        </a-list-item-meta>
      </a-list-item>
      <a-list-item>
        <template #actions>
          <a-switch size="small" :checked="fixedHeader" @change="handleFixedHeader" />
        </template>
        <a-list-item-meta>
          <template #title>{{ $t('settingDrawer.fixHeader') }}</template>
        </a-list-item-meta>
      </a-list-item>
      <a-list-item>
        <template #actions>
          <a-switch
            size="small"
            :disabled="!fixedHeader"
            :checked="autoHideHeader"
            @change="handleFixedHeaderHidden"
          />
        </template>
        <a-list-item-meta>
          <template #title>
            <a-tooltip placement="left">
              <template #title>{{ $t('settingDrawer.configurableWhenFixingHeaders') }}</template>
              <div :style="{ opacity: !fixedHeader ? '0.5' : '1' }">
                {{ $t('settingDrawer.hideHeaders') }}
              </div>
            </a-tooltip>
          </template>
        </a-list-item-meta>
      </a-list-item>
      <a-list-item>
        <template #actions>
          <a-switch
            size="small"
            :disabled="layoutMode === 'topmenu'"
            :checked="fixSiderbar"
            @change="handleFixSiderbar"
          />
        </template>
        <a-list-item-meta>
          <template
            #title
            :style="{ textDecoration: layoutMode === 'topmenu' ? 'line-through' : 'unset' }"
            >{{ $t('settingDrawer.fixedSideMenu') }}</template
          >
        </a-list-item-meta>
      </a-list-item>
    </a-list>
  </SettingItem>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import {
  TOGGLE_CONTENT_WIDTH,
  TOGGLE_FIXED_HEADER,
  TOGGLE_FIXED_HEADER_HIDDEN,
  TOGGLE_FIXED_SIDERBAR
} from '@/store/mutation-types'
import {
  contentWidth,
  layoutMode,
  fixedHeader,
  autoHideHeader,
  fixSiderbar
} from '@/store/useSiteSettings'
import SettingItem from './SettingItem.vue'

export default defineComponent({
  components: {
    SettingItem
  },
  setup() {
    const { state, commit } = useStore()

    const handleContentWidthChange = (type) => {
      commit(TOGGLE_CONTENT_WIDTH, type)
    }

    const handleFixedHeader = (fixed) => {
      commit(TOGGLE_FIXED_HEADER, fixed)
    }

    const handleFixedHeaderHidden = (autoHidden) => {
      commit(TOGGLE_FIXED_HEADER_HIDDEN, autoHidden)
    }

    const handleFixSiderbar = (fixed) => {
      if (state.app.layoutMode === 'topmenu') {
        commit(TOGGLE_FIXED_SIDERBAR, false)
        return
      }
      commit(TOGGLE_FIXED_SIDERBAR, fixed)
    }
    return {
      contentWidth,
      layoutMode,
      fixedHeader,
      fixSiderbar,
      autoHideHeader,
      handleContentWidthChange,
      handleFixedHeader,
      handleFixedHeaderHidden,
      handleFixSiderbar
    }
  }
})
</script>
<style lang="less"></style>
