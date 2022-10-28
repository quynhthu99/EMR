<template>
  <div ref="activeAccountLayout" class="active-account flex justify-center items-center h-full">
    <a-row class="w-full" justify="center">
      <a-col :xs="20" :md="10" :lg="10">
        <a-card
          v-if="!!userInfo.active"
          class="w-full border-2"
          style="border-radius: 1rem"
          title="KÍCH HOẠT TÀI KHOẢN"
        >
          <div>
            <div class="mb-4">Xin chào {{ userInfo.fullName }}!</div>
            <div class="mb-4">
              Bạn đã được tạo tài khoản với tên đăng nhập là {{ userInfo.username }} và Email là {{ userInfo.email }}. Vui lòng thiết lập mật khẩu để kích hoạt tài khoản.
            </div>
            <a-row class="w-full">
              <a-col :span="24">
                <a-form :model="formRef" layout="vertical" class="w-full">
                  <a-form-item v-bind="validateInfos.password" label="Mật khẩu">
                    <a-input-password
                      v-model:value="formRef.password"
                      size="large"
                      placeholder="Mật khẩu"
                      class="w-full"
                      @change="handlePasswordChange"
                    >
                      <template #prefix>
                        <LockOutlined :style="{ color: 'rgba(0,0,0,.25)' }" />
                      </template>
                    </a-input-password>
                  </a-form-item>
                  <a-form-item v-bind="validateInfos.confirmPassword" label="Xác nhận mật khẩu">
                    <a-input-password
                      v-model:value="formRef.confirmPassword"
                      size="large"
                      placeholder="Xác nhận mật khẩu"
                      class="w-full"
                    >
                      <template #prefix>
                        <LockOutlined :style="{ color: 'rgba(0,0,0,.25)' }" />
                      </template>
                    </a-input-password>
                  </a-form-item>
                  <a-form-item class="mb-0 mt-6 text-right">
                    <a-button
                      size="large"
                      type="primary"
                      :loading="state.loginBtn"
                      :disabled="state.loginBtn"
                      @click="handleSubmit"
                      >Kích hoạt</a-button
                    >
                  </a-form-item>
                </a-form>
              </a-col>
            </a-row>
          </div>
        </a-card>
        <a-card
          v-else
          class="w-full border-2"
          style="border-radius: 1rem"
          :title="!isSuccess ? 'KÍCH HOẠT TÀI KHOẢN' : ''"
        >
          <div v-if="!isSuccess" class="pb-2">
            <div class="mb-4">
              Link kích hoạt tài khoản của bạn đã hết hạn. Vui lòng nhấn vào link bên dưới để
              nhận email kích hoạt mới.!
            </div>
            <div class="flex justify-center pb-2">
              <a-button
                style="background-color: #1890ff; color: #fff; width: 100%"
                size="large"
                @click="resentEmail"
              >
                Gửi lại Email kích hoạt
              </a-button>
            </div>
          </div>
          <div v-else>
            <a-result
              status="success"
              title="Gửi lại link kích hoạt tài khoản thành công!"
              sub-title="Chúng tôi vừa gửi cho bạn link kích hoạt tài khoản mới. Vui lòng kiểm tra hòm thư."
            >
              <template #icon>
                <va-svg-icon
                  name="check-circle"
                  color="#5dae8b"
                  class="w-32 h-32 va-text-green"
                ></va-svg-icon>
              </template>
            </a-result>
          </div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, reactive, UnwrapRef, onMounted, computed } from 'vue'
import { Form, message } from 'ant-design-vue'
import { useRouter, useRoute } from 'vue-router'
import { LockOutlined } from '@ant-design/icons-vue'
import { GeneratePassword } from './types'
import { RULES_REQUIRED, RULES_PASSWORD } from '@/constants/validation'
import { validateActiveUserOTP } from '@/services/auth/oneTimePassword/index.ts'
import { requestActiveUser, confirmActiveUser } from '@/services/auth/user/index.ts'
import { AesEncryption } from '@/utils/encrypt'
import { key, iv } from '@/constants/encrypt'
import getBackgroundImages from '@/config/backgroundConfig'

export default defineComponent({
  components: {
    LockOutlined
  },
  setup() {
    const useForm = Form.useForm
    const router = useRouter()
    const route = useRoute()
    const isSuccess = computed(() => route.query.isSuccess)
    const userInfo = ref({
      active: false,
      email: '',
      username: '',
      fullName: ''
    })
    const aesEncryption = new AesEncryption({
      key: key,
      iv: iv
    })
    const resentEmailSuccess = ref(false)
    let redirect

    // Random background
    const activeAccountLayout = ref(null)
    const backgroundImages = ref(getBackgroundImages())
    const length = backgroundImages.value.length - 1
    const randomInt = (min: number, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min
    }
    const getBg = async () => {
      const v = await backgroundImages.value[randomInt(0, length)]
      if (v) {
        return v.default
      }
    }
    const bg = getBg()

    const state = reactive({
      time: 60,
      loginBtn: false
    })

    const formRef: UnwrapRef<GeneratePassword> = reactive({
      password: '',
      confirmPassword: ''
    })

    const rulesRef = reactive({
      password: [RULES_REQUIRED, RULES_PASSWORD],
      confirmPassword: [
        RULES_REQUIRED,
        RULES_PASSWORD,
        {
          validator: (rule, value) => {
            if (formRef.password && formRef.password !== value) {
              return Promise.reject('Xác nhận mật khẩu sai')
            }
            return Promise.resolve()
          }
        }
      ]
    })
    const { validate, validateInfos, clearValidate } = useForm(formRef, rulesRef)
    const handlePasswordChange = () => {
      if (formRef.password === formRef.confirmPassword) {
        clearValidate('password')
        clearValidate('confirmPassword')
      }
    }
    const handleSubmit = (e: Event) => {
      state.loginBtn = true
      const validateFieldsKey = ['password', 'confirmPassword']

      validate(validateFieldsKey)
        .then(() => {
          state.loginBtn = false
          const q = { ...route.query }
          const params = {
            data: q && q.data && q.data.replace(/ /g, '+'),
            isSecure: true,
            password: aesEncryption.encryptByAES(formRef.password)
          }
          confirmActiveUser(params).then((rs) => {
            if (rs && rs.body) {
              message.success({ content: 'Kích hoạt tài khoản thành công!' })
              router.push({ name: 'login' })
            }
          })
        })
        .catch(() => {
          state.loginBtn = false
        })
    }

    const resentEmail = () => {
      const q = { ...route.query }
      const params = {
        data: q && q.data && q.data.replace(/ /g, '+')
      }
      requestActiveUser(params).then((rs) => {
        if (rs && rs.body) {
          router.push({
            name: 'active_account',
            query: { data: q && q.data && q.data.replace(/ /g, '+'), isSuccess: true }
          })
        }
      })
    }
    //#endregion

    // MOUNTED
    onMounted(async () => {
      resentEmailSuccess.value = !!route.query.isSuccess
      activeAccountLayout.value.style.backgroundImage = 'url(' + (await bg) + ')'

      const q = { ...route.query }
      if (q.data) {
        const params = {
          data: q && q.data && q.data.replace(/ /g, '+')
        }
        validateActiveUserOTP(params).then((rs) => {
          if (rs && rs.body) {
            userInfo.value.active = !!rs.body.active
            userInfo.value.email = rs.body.email || ''
            userInfo.value.username = rs.body.username || ''
            userInfo.value.fullName = rs.body.fullName || ''
            // if (!userInfo.value.email) router.push({ name: 'login' })
          }
        })
      } else {
        router.push({ name: 'login' })
      }
      // redirect = route.query.redirect ?? '/'
    })

    return {
      activeAccountLayout,
      resentEmailSuccess,
      userInfo,
      formRef,
      rulesRef,
      state,
      validateInfos,
      redirect,
      isSuccess,
      handlePasswordChange,
      handleSubmit,
      resentEmail
    }
  }
})
</script>

<style lang="less" scoped>
.active-account {
  width: 100%;
  height: 100%;
  overflow: hidden;

  background-size: cover;
  background-repeat: no-repeat;
}
</style>
