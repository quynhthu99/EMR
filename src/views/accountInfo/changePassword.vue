<template>
  <div class="mt-24 flex justify-center items-center">
    <div class="w-2/5 h-auto flex justify-center items-center">
      <a-card class="custom-card">
        <template #title>
          <span>Thay đổi mật khẩu</span>
        </template>
        <a-form id="formLogin" class="user-layout-login" :model="modelRef" @submit="handleSubmit">
          <a-row :gutter="['16', '8']">
            <a-col class="pt-1" :span="8">Mật khẩu hiện tại</a-col>
            <a-col :span="16">
              <a-form-item v-bind="validateInfos.currentPassword">
                <a-input-password
                  v-model:value="modelRef.currentPassword"
                  class="w-full"
                ></a-input-password>
              </a-form-item>
            </a-col>
            <a-col class="pt-1" :span="8">Mật khẩu mới</a-col>
            <a-col :span="16">
              <a-form-item v-bind="validateInfos.newPassword">
                <a-input-password
                  v-model:value="modelRef.newPassword"
                  class="w-full"
                ></a-input-password>
              </a-form-item>
            </a-col>
            <a-col class="pt-1" :span="8">Nhập lại mật khẩu</a-col>
            <a-col :span="16">
              <a-form-item v-bind="validateInfos.confirmPassword">
                <a-input-password
                  v-model:value="modelRef.confirmPassword"
                  class="w-full"
                ></a-input-password>
              </a-form-item>
            </a-col>
          </a-row>

          <div class="mt-4 flex justify-end">
            <a-button @click="resetFields()">Hủy</a-button>
            <a-button
              type="primary"
              html-type="submit"
              class="ml-2"
              :loading="requestBtn"
              :disabled="
                !(
                  modelRef.currentPassword &&
                  modelRef.confirmPassword &&
                  modelRef.confirmPassword === modelRef.newPassword
                )
              "
            >
              {{ $t('user.forgot.password.set_password') }}
            </a-button>
          </div>
        </a-form>
      </a-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, UnwrapRef } from 'vue'
import { RULES_PASSWORD, RULES_REQUIRED } from '@/constants/validation'
import { Form, message } from 'ant-design-vue'
import { changeSelfPassword } from '@/services/sys/staff'
import { clearUserInfo, encodePassword } from '@/utils/util'
import { Rule } from 'ant-design-vue/es/form'
import { FormState } from '@/views/user/types'
import { useI18n } from 'vue-i18n'
import ls from '@/utils/Storage'
import { REFRESH_TOKEN } from '@/store/mutation-types'
import { logout } from '@/views/user/service'

export default defineComponent({
  name: 'ChangePassword',
  setup() {
    const useForm = Form.useForm
    const requestBtn = ref<boolean>(false)
    const { t } = useI18n()
    const modelRef = reactive({
      currentPassword: null,
      newPassword: '',
      confirmPassword: ''
    })
    const confirmedPassword = async function (rule: Rule, value: string) {
      if (!value || modelRef.newPassword === value) {
        return Promise.resolve()
      } else {
        return Promise.reject(t('user.forgot.password.validation.password_confirmation_invalid'))
      }
    }
    const rulesRef: UnwrapRef<FormState> = reactive({
      currentPassword: [RULES_REQUIRED],
      newPassword: [RULES_REQUIRED, RULES_PASSWORD],
      confirmPassword: [{ validator: confirmedPassword }]
    })
    const { resetFields, validate, validateInfos } = useForm(modelRef, rulesRef)
    const handleSubmit = (e: Event) => {
      e.preventDefault()
      requestBtn.value = true
      const validateFieldsKey = ['currentPassword', 'newPassword', 'confirmPassword']
      validate(validateFieldsKey)
        .then(async (params) => {
          const newParams = { ...params }
          newParams.newPassword = encodePassword(newParams.newPassword)
          newParams.confirmPassword = encodePassword(newParams.confirmPassword)
          newParams.currentPassword = encodePassword(newParams.currentPassword)
          const res = await changeSelfPassword(newParams)
          message.success({ content: 'Cập nhật mật khẩu thành công!' })
          resetFields()
          if (res) {
            setTimeout(async () => {
              try {
                const data = {
                  clientId: import.meta.env.VITE_CLIENT_ID,
                  refreshToken: ls.get(REFRESH_TOKEN)
                }
                const res = await logout(data)
                if (res) {
                  clearUserInfo()
                  window.location.href = '/'
                }
              } catch (e) {
                console.log(e)
              }
            }, 1000)
          }
          requestBtn.value = false
        })
        .catch((e) => {
          console.log(e)
          requestBtn.value = false
        })
    }
    return {
      modelRef,
      requestBtn,
      validateInfos,
      resetFields,
      validate,
      handleSubmit
    }
  }
})
</script>

<style lang="less"></style>
