<template>
  <div class="user-wrapper">
    <div class="content-box">
<!--      <a-dropdown placement="bottom">-->
<!--        <span class="action ant-dropdown-link user-dropdown-menu">-->
<!--          <a-avatar-->
<!--            class="avatar"-->
<!--            size="small"-->
<!--            :src="'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'"-->
<!--          />-->
<!--          <span class="nickname">{{ nickname }}</span>-->
<!--        </span>-->
<!--        <template #overlay>-->
<!--          <a-menu class="user-dropdown-menu-wrapper">-->
<!--            <a-menu-item key="4" @click="showSystemSetting">-->
<!--              <a>-->
<!--                <info-circle-outlined />-->
<!--                <span>{{ $t('tools.userMenu.accountInfo') }}</span>-->
<!--              </a>-->
<!--            </a-menu-item>-->
<!--            <a-menu-item>-->
<!--              <a>-->
<!--                <global-outlined />-->
<!--                <span>{{ $t('tools.userMenu.language') }}</span>-->
<!--              </a>-->
<!--            </a-menu-item>-->
<!--            <a-menu-divider />-->
<!--            <a-menu-item key="3">-->
<!--              <a href="javascript:;" @click="handleLogout">-->
<!--                <LogoutOutlined />-->
<!--                <span>{{ $t('tools.userMenu.logout') }}</span>-->
<!--              </a>-->
<!--            </a-menu-item>-->
<!--          </a-menu>-->
<!--        </template>-->
<!--      </a-dropdown>-->
<!--      <span style="overflow: hidden; display: inline-block">-->
<!--        <SelectLang :class="theme" class="action" />-->
<!--      </span>-->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { logout } from '@/views/user/service'
import { USER_INFO } from '@/store/mutation-types'
import { Modal } from 'ant-design-vue'
import { InfoCircleOutlined, LogoutOutlined, GlobalOutlined } from '@ant-design/icons-vue'
import { useI18n } from 'vue-i18n'
import { useStore } from 'vuex'
import SelectLang from '@/components/SelectLang'
import ls from '@/utils/Storage'
import { useRouter } from 'vue-router'
import { clearUserInfo } from '@/utils/util'

export default defineComponent({
  name: 'UserMenu',
  components: {
    InfoCircleOutlined,
    LogoutOutlined,
    GlobalOutlined,
    SelectLang
  },
  props: ['theme'],
  setup(props) {
    const { t } = useI18n()
    const router = useRouter()
    const UserInfo = ls.get(USER_INFO)
    const store = useStore()
    const handleLogout = () => {
      Modal.confirm({
        title: t('tools.userMenu.tip'),
        content: t('tools.userMenu.checkLogout'),
        onOk: () => {
          logout().then((res) => {
            clearUserInfo()
            router.push({ path: '/user/login' })
          })
        }
      })
    }
    const showSystemSetting = () => {
      store.commit('SET_SETTING_DRAWER', true)
    }

    return {
      avatar: UserInfo.avatar,
      nickname: UserInfo.name,
      handleLogout,
      showSystemSetting
    }
  }
})
</script>
<style lang="less">
.user-dropdown-menu-wrapper {
  .ant-dropdown-menu-item {
    width: 100% !important;
  }
}
</style>
