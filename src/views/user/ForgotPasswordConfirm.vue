<template>
  <div class="container-login">
    <div class="wrap-login">
      <a-row class="w-full">
        <div class="logo-login">
          <img src="~@/assets/icons/logo.svg" class="logo logo-login--image" alt="logo" />
          <div class="logo-login--brand">Bệnh án điện tử</div>
        </div>
        <a-form id="formLogin" class="user-layout-login" :model="formRef" @submit="handleSubmit">
          <a-form-item v-bind="validateInfos.otp">
            <a-input
              v-model:value="formRef.otp"
              size="large"
              type="text"
              :placeholder="$t('user.forgot.password.otp_placeholder')"
            >
              <template #prefix>
                <KeyOutlined :style="{ color: 'rgba(0,0,0,.25)' }" />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-button
              size="large"
              type="primary"
              html-type="submit"
              class="login-button mt-2"
              :loading="state.requestBtn"
              :disabled="state.requestBtn"
              >{{ $t('user.forgot.password.confirm') }}</a-button
            >
          </a-form-item>
          <a-form-item class="text-right">
            <router-link class="register" :to="{ name: 'forgot_password' }">
              {{ $t('user.forgot.password.back') }}
            </router-link>
          </a-form-item>
        </a-form>
      </a-row>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, UnwrapRef } from 'vue'
import { useI18n } from 'vue-i18n'
import { Form } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { KeyOutlined } from '@ant-design/icons-vue'
import { ConfirmOtpFormState } from './types'
import { validateOtp } from './service'
import ls from '@/utils/Storage'
import { RULES_REQUIRED } from '@/constants/validation'

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
      requestBtn: false
    })

    const formRef: UnwrapRef<ConfirmOtpFormState> = reactive({
      key: ls.get('REQUEST_RESET_PASSWORD_EMAIL'),
      otp: ''
    })

    const rulesRef = reactive({
      otp: [RULES_REQUIRED]
    })
    const { validate, validateInfos } = useForm(formRef, rulesRef)
    const handleSubmit = (e: Event) => {
      e.preventDefault()
      state.requestBtn = true
      const validateFieldsKey = ['key', 'otp']
      validate(validateFieldsKey)
        .then(async () => {
          const res = await validateOtp(formRef)
          if (res) {
            ls.set('REQUEST_RESET_PASSWORD_OTP', formRef.otp)
            await router.push({ name: 'forgot_password.set_new_password' })
          }
          state.requestBtn = false
        })
        .catch((e) => {
          state.requestBtn = false
        })
    }
    //#endregion

    return {
      formRef,
      rulesRef,
      state,
      handleSubmit,
      validateInfos
    }
  }
})
</script>

<style lang="less" scoped>
@import '../../style/index.less';
@import './login.less';
</style>
