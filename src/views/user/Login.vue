<template>
  <div class="container-login">
    <div class="wrap-login">
      <a-row class="w-full">
        <div class="logo-login">
          <img src="~@/assets/logo1.png" class="logo logo-login--image" alt="logo" />
          <div class="logo-login--brand">Bệnh án điện tử</div>
        </div>
        <a-form v-if="!state.twoFA" id="formLogin" class="user-layout-login" :model="formRef" @submit="handleSubmit">
          <a-form-item v-bind="validateInfos.username">
            <a-input v-model:value="formRef.username" size="large" type="text"
              :placeholder="$t('user.login.username.placeholder')">
              <template #prefix>
                <UserOutlined :style="{ color: 'rgba(0,0,0,.25)' }" />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item v-bind="validateInfos.password">
            <a-input-password v-model:value="formRef.password" size="large"
              :placeholder="$t('user.login.password.placeholder')">
              <template #prefix>
                <LockOutlined :style="{ color: 'rgba(0,0,0,.25)' }" />
              </template>
            </a-input-password>
          </a-form-item>
          <div class="flex justify-between">
            <a-form-item>
              <a-checkbox v-model:checked="formRef.rememberMe">{{
              $t('user.login.remember-me')
              }}</a-checkbox>
            </a-form-item>
            <a-form-item>
              <router-link class="register" :to="{ name: 'forgot_password' }">
                {{ $t('user.login.forgot-password') }}?
              </router-link>
            </a-form-item>
          </div>
          <a-form-item class="mb-0 mt-6">
            <a-button size="large" type="primary" html-type="submit" class="login-button" :loading="state.loginBtn"
              :disabled="state.loginBtn" @click="loginSuccessTest">{{ $t('user.login.login') }}</a-button>
          </a-form-item>
        </a-form>
        <a-form v-if="state.twoFA" id="twoFAConfirm" class="user-layout-login" :model="formTwoFaRef"
          @submit="handleTwoFaSubmit">
          <a-form-item>
            <a-input v-model:value="formTwoFaRef.otp" size="large" type="text" :placeholder="$t('user.login.otp')">
              <template #prefix>
                <LockOutlined :style="{ color: 'rgba(0,0,0,.25)' }" />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item class="mt-6">
            <a-button size="large" type="primary" html-type="submit" class="login-button" :loading="state.loginBtn"
              :disabled="state.loginBtn" @click="loginSuccessTest">{{ $t('user.login.next') }}</a-button>
          </a-form-item>
        </a-form>
      </a-row>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, UnwrapRef, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { Form } from 'ant-design-vue'
import { loginSuccess } from '@/utils/auth'
import { useRouter, useRoute } from 'vue-router'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import * as api from './service'
import { FormState } from './types'
import config from '@/config/defaultSettings'
import generateAsyncRoutes from '@/router/generateAsyncRoutes'
import { RULES_REQUIRED } from '@/constants/validation'
import { Response } from '@/utils/types'
// import {useRouter} from 'router'

export default defineComponent({
  components: {
    UserOutlined,
    LockOutlined
  },
  setup() {
    const useForm = Form.useForm
    const { t } = useI18n()
    const router = useRouter()
    const route = useRoute()
    let redirect, clientId
    onMounted(() => {
      redirect = route.query.redirect ?? '/'
      clientId = import.meta.env.VITE_CLIENT_ID
    })

    const state = reactive({
      time: 60,
      loginBtn: false,
      loginType: 0,
      smsSendBtn: false,
      twoFA: false
    })

    const formRef: UnwrapRef<FormState> = reactive({
      clientId: '',
      username: '',
      password: '',
      rememberMe: false
    })
    const formTwoFaRef: UnwrapRef<FormState> = reactive({
      clientId: '',
      username: '',
      password: '',
      otp: ''
    })

    const rulesRef = reactive({
      username: [RULES_REQUIRED],
      password: [RULES_REQUIRED]
    })
    const { validate, validateInfos } = useForm(formRef, rulesRef)
    const handleSubmit = (e: Event) => {
      e.preventDefault()
      state.loginBtn = true
      const validateFieldsKey = ['username', 'password']

      validate(validateFieldsKey)
        .then(async () => {
          formRef.clientId = clientId
          const res: Response = await api.userLogin(formRef)
          if (res) {
            if (res.code === 403) {
              formRef.password = ''
              state.loginBtn = false
              return
            }
            if (config.useAsyncRouter) {
              generateAsyncRoutes(router)
            }
            if (res.body.twoFA) {
              state.twoFA = true
            } else {
              await loginSuccess(res.body, router, redirect)
              window.location.reload()
            }
          }
          state.loginBtn = false
        })
        .catch((e) => {
          state.loginBtn = false
        })
    }

    const handleTwoFaSubmit = (e: Event) => {
      e.preventDefault()
      state.loginBtn = true
      const otpValidateFieldsKey = ['username', 'password']
      const twoFaRulesRef = reactive({
        otp: [
          {
            required: true,
            message: t('user.otp.required')
          }
        ]
      })
      const { validate } = useForm(formTwoFaRef, twoFaRulesRef)
      validate(otpValidateFieldsKey).then(async () => {
        formTwoFaRef.clientId = clientId
        formTwoFaRef.username = formRef.username
        formTwoFaRef.password = formRef.password

        const rs = await api.userLoginTwoFa(formTwoFaRef)
        if (rs) {
          await loginSuccess(rs.body, router, redirect)
        }
        state.loginBtn = false
      })
    }
    //#endregion

    const loginSuccessTest = () => {
      router.push({ path: '/patient-list' })
    }

    return {
      formRef,
      formTwoFaRef,
      rulesRef,
      state,
      validateInfos,
      redirect,
      clientId,
      handleSubmit,
      handleTwoFaSubmit,
      loginSuccessTest
    }
  }
})
</script>

<style lang="less" scoped>
@import '@/style/index.less';
@import './login.less';
</style>
