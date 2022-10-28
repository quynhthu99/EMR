<template>
  <div class="container-login">
    <div class="wrap-login">
      <a-row class="w-full">
        <div class="logo-login">
          <img src="~@/assets/icons/logo.svg" class="logo logo-login--image" alt="logo" />
          <div class="logo-login--brand">Bệnh án điện tử</div>
        </div>
        <a-form id="formLogin" class="user-layout-login" :model="formRef" @submit="handleSubmit">
          <a-form-item v-bind="validateInfos.email">
            <a-input
              v-model:value="formRef.email"
              size="large"
              type="email"
              :placeholder="$t('user.forgot.password.email_placeholder')"
            >
              <template #prefix>
                <InboxOutlined :style="{ color: 'rgba(0,0,0,.25)' }" />
              </template>
            </a-input>
          </a-form-item>

          <a-form-item class="mt-6">
            <a-button
              size="large"
              type="primary"
              html-type="submit"
              class="login-button"
              :loading="state.requestBtn"
              :disabled="state.requestBtn"
            >
              {{ $t('user.forgot.password.reset') }}
            </a-button>
          </a-form-item>

          <div class="user-login-other">
            <router-link class="register" :to="{ name: 'login' }">
              {{ $t('user.login.login') }}
            </router-link>
          </div>
        </a-form>
      </a-row>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, UnwrapRef, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { Form } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { InboxOutlined } from '@ant-design/icons-vue'
import { FormState } from './types'
import { userRequestNewPassword } from './service'
import ls from '@/utils/Storage'
import { RULES_REQUIRED, RULES_EMAIL } from '@/constants/validation'

export default defineComponent({
  components: {
    InboxOutlined
  },
  setup() {
    const useForm = Form.useForm
    const { t } = useI18n()
    const router = useRouter()
    onMounted(() => {})

    const state = reactive({
      time: 60,
      requestBtn: false
    })

    const formRef: UnwrapRef<FormState> = reactive({
      email: ''
    })

    const rulesRef = reactive({
      email: [RULES_REQUIRED, RULES_EMAIL]
    })
    const { validate, validateInfos } = useForm(formRef, rulesRef)
    const handleSubmit = (e: Event) => {
      e.preventDefault()
      state.requestBtn = true
      const validateFieldsKey = ['email']
      console.log(formRef.email)
      validate(validateFieldsKey)
        .then(async () => {
          const res = await userRequestNewPassword(formRef)
          if (res) {
            ls.set('REQUEST_RESET_PASSWORD_EMAIL', formRef.email)
            await router.push({ name: 'forgot_password.confirm' })
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
