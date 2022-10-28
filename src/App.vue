<template>
  <a-config-provider :locale="lang[proxy.$i18n.locale]">
    <router-view />
  </a-config-provider>
</template>

<script lang="ts">
import { getCurrentInstance, defineComponent } from 'vue'
import vi_VN from 'ant-design-vue/es/locale/vi_VN'
import en_US from 'ant-design-vue/lib/locale-provider/en_US'
import { setDeviceType } from '@/utils/device'
import ls from '@/utils/Storage'
import { TOGGLE_COLOR } from '@/store/mutation-types'
import { updateTheme } from '@/components/SettingDrawer/updateTheme'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const { proxy } = getCurrentInstance()
    const { commit } = useStore()
    if (!ls.get('CURRENT_BG_COLOR')) {
      commit(TOGGLE_COLOR, '#466C95')
      updateTheme('#466C95')
      ls.set('CURRENT_BG_COLOR', '#466C95')
    }
    const lang = {
      'en-US': en_US,
      'vi-VN': vi_VN
    }

    window.onresize = setDeviceType
    setDeviceType()

    return {
      proxy,
      lang
    }
  }
})
</script>

<style scoped>
#components-back-top-demo-custom .ant-back-top {
  bottom: 100px;
}
#components-back-top-demo-custom .ant-back-top-inner {
  height: 40px;
  width: 40px;
  line-height: 40px;
  border-radius: 4px;
  background-color: #1088e9;
  color: #fff;
  text-align: center;
  font-size: 20px;
}
</style>
