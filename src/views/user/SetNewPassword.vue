<template>
  <div class="container-login">
    <div class="wrap-login">
      <a-row class="w-full">
        <div class="logo-login">
          <img src="~@/assets/icons/logo.svg" class="logo logo-login--image" alt="logo" />
          <div class="logo-login--brand">Bệnh án điện tử</div>
        </div>
        <a-form id="formLogin" class="user-layout-login" :model="formRef" @submit="handleSubmit">
          <a-form-item v-bind="validateInfos.newPassword">
            <a-input-password
              v-model:value="formRef.newPassword"
              size="large"
              :placeholder="$t('user.forgot.password.password_placeholder')"
            >
              <template #prefix>
                <KeyOutlined :style="{ color: 'rgba(0,0,0,.25)' }" />
              </template>
            </a-input-password>
          </a-form-item>

          <a-form-item v-bind="validateInfos.newPasswordConfirmation">
            <a-input-password
              v-model:value="formRef.newPasswordConfirmation"
              size="large"
              :placeholder="$t('user.forgot.password.password_confirmation_placeholder')"
            >
              <template #prefix>
                <KeyOutlined :style="{ color: 'rgba(0,0,0,.25)' }" />
              </template>
            </a-input-password>
          </a-form-item>

          <a-form-item class="mt-6">
            <a-button
              size="large"
              type="primary"
              html-type="submit"
              class="login-button"
              :loading="state.requestBtn"
              :disabled="
                !(
                  formRef.newPasswordConfirmation &&
                  formRef.newPasswordConfirmation === formRef.newPassword
                )
              "
            >
              {{ $t('user.forgot.password.set_password') }}
            </a-button>
          </a-form-item>
        </a-form>
      </a-row>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, UnwrapRef } from 'vue'
import { useI18n } from 'vue-i18n'
import { Form, message } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { KeyOutlined } from '@ant-design/icons-vue'
import { FormState } from './types'
import type { Rule } from 'ant-design-vue/es/form'
import { userSetNewPassword } from './service'
import ls from '@/utils/Storage'
import { RULES_PASSWORD, RULES_REQUIRED } from '@/constants/validation'

export default defineComponent({
  components: {
    KeyOutlined
  },
  setup() {
    const useForm = Form.useForm
    const { t } = useI18n()
    const router = useRouter()
    const state = reactive({
      time: 60,
      requestBtn: false,
      newPassword: ''
    })

    const formRef: UnwrapRef<FormState> = reactive({
      email: ls.get('REQUEST_RESET_PASSWORD_EMAIL'),
      newPassword: '',
      newPasswordConfirmation: '',
      isSecure: false,
      otp: ls.get('REQUEST_RESET_PASSWORD_OTP')
    })

    const confirmedPassword = async function (rule: Rule, value: string) {
      if (!value || formRef.newPassword === value) {
        return Promise.resolve()
      } else {
        return Promise.reject(t('user.forgot.password.validation.password_confirmation_invalid'))
      }
    }
    const rulesRef = reactive({
      newPassword: [RULES_PASSWORD, RULES_REQUIRED],
      newPasswordConfirmation: [{ validator: confirmedPassword }]
    })
    const { validate, validateInfos } = useForm(formRef, rulesRef)
    const handleSubmit = (e: Event) => {
      e.preventDefault()
      state.requestBtn = true
      const validateFieldsKey = ['email', 'newPassword', 'newPasswordConfirmation']
      validate(validateFieldsKey)
        .then(async () => {
          const res = await userSetNewPassword(formRef)
          if (res) {
            message.success({
              content: t('user.forgot.password.change_successfully')
            })
            setTimeout(async () => {
              await router.push({ name: 'login' })
            }, 2000)
          }
          state.requestBtn = false
        })
        .catch((e) => {
          console.log(e)
          state.requestBtn = false
        })
    }
    //#endregion
    return {
      formRef,
      rulesRef,
      state,
      validateInfos,
      handleSubmit
    }
  }
})
</script>

<style lang="less" scoped>
@import '../../style/index.less';
@import './login.less';
</style>
