<template>
  <div class="container-login">
    <div class="wrap-login">
      <a-row class="w-full">
        <div class="logo-login">
          <img src="~@/assets/icons/logo.svg" class="logo logo-login--image" alt="logo" />
          <div class="logo-login--brand">Bệnh án điện tử</div>
        </div>
        <div class="text-center font-semi bold w-full">
          <svg
            id="Layer_1"
            class="w-32 h-32"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 100 100"
            enable-background="new 0 0 100 100"
            xml:space="preserve"
          >
            <rect fill="#0054A7" width="3" height="100" transform="translate(0) rotate(180 3 50)">
              <animate
                attributeName="height"
                attributeType="XML"
                dur="1s"
                values="30; 100; 30"
                repeatCount="indefinite"
              />
            </rect>
            <rect
              x="17"
              fill="#0054A7"
              width="3"
              height="100"
              transform="translate(0) rotate(180 20 50)"
            >
              <animate
                attributeName="height"
                attributeType="XML"
                dur="1s"
                values="30; 100; 30"
                repeatCount="indefinite"
                begin="0.1s"
              />
            </rect>
            <rect
              x="40"
              fill="#0054A7"
              width="3"
              height="100"
              transform="translate(0) rotate(180 40 50)"
            >
              <animate
                attributeName="height"
                attributeType="XML"
                dur="1s"
                values="30; 100; 30"
                repeatCount="indefinite"
                begin="0.3s"
              />
            </rect>
            <rect
              x="60"
              fill="#0054A7"
              width="3"
              height="100"
              transform="translate(0) rotate(180 58 50)"
            >
              <animate
                attributeName="height"
                attributeType="XML"
                dur="1s"
                values="30; 100; 30"
                repeatCount="indefinite"
                begin="0.5s"
              />
            </rect>
            <rect
              x="80"
              fill="#0054A7"
              width="3"
              height="100"
              transform="translate(0) rotate(180 76 50)"
            >
              <animate
                attributeName="height"
                attributeType="XML"
                dur="1s"
                values="30; 100; 30"
                repeatCount="indefinite"
                begin="0.1s"
              />
            </rect>
          </svg>
          <div class="w-full">{{ $t('user.login.refresh-token.message') }}</div>
        </div>
      </a-row>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import ls from '@/utils/Storage'
import { useRoute } from 'vue-router'
import { userRefreshToken } from './service'
import {
  ACCESS_TOKEN,
  ACCESS_TOKEN_EXPIRE_TIME,
  PERMISSION,
  REFRESH_TOKEN,
  USER_INFO
} from '@/store/mutation-types'
import { getUserInfo } from '@/utils/auth'

export default defineComponent({
  setup() {
    const route = useRoute()
    let redirect, clientId
    onMounted(async () => {
      try {
        redirect = route.query.redirect
        clientId = import.meta.env.VITE_CLIENT_ID
        const res = userRefreshToken({ clientId: clientId, refreshToken: ls.get(REFRESH_TOKEN) })
        ls.set(ACCESS_TOKEN, res.access_token, res.expires_in)
        ls.set(ACCESS_TOKEN_EXPIRE_TIME, res.expires_in, res.expires_in)
        ls.set(REFRESH_TOKEN, res.refresh_token, res.refresh_token)
        const user: any = await getUserInfo(res.access_token)
        let permissions = Array.isArray(user.listRole) ? user.listRole : user.listRole.split(',')

        // fake quyen de test
        if (permissions.length === 0) {
          permissions = ['admin']
        }
        ls.set(PERMISSION, permissions)
        ls.set(USER_INFO, user)
        window.location.href = redirect
      } catch (e) {
        window.location.href = '/user/login'
      }
    })
    //#endregion

    return {
      redirect,
      clientId
    }
  }
})
</script>

<style lang="less" scoped>
//@import '../../style/index.less';
@import './login.less';
</style>
