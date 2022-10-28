<template>
  <div class="two-factor-auth">
    <a-card>
      <a-row :gutter="16" class="p-4">
        <a-col :span="8">
          <div class="two-factor-auth--title">Hủy xác thực 2 yếu tố</div>
          <div class="two-factor-auth--sub-title">
            Sử dụng trình xác thực mật khẩu một lần trên thiết bị di động hoặc máy tính của bạn để
            bật/tắt xác thực hai yếu tố (2FA).
          </div>
        </a-col>
        <a-col :span="16">
          <div class="two-factor-auth--content">
            <div class="two-factor-auth--step-list">
              <div class="two-factor-auth--step-item">
                <div class="two-factor-auth--step-title">Nhập mã xác thực</div>
                <div class="two-factor-auth--step-content">
                  <a-form :model="formModel" class="w-full" layout="vertical">
                    <a-form-item name="otp" label="Mã xác thực" v-bind="validateInfos.otp">
                      <a-input v-model:value="formModel.otp" class="w-full"></a-input>
                    </a-form-item>
                    <a-form-item
                      name="password"
                      label="Mật khẩu hiện tại"
                      v-bind="validateInfos.password"
                    >
                      <a-input-password
                        v-model:value="formModel.password"
                        type="password"
                        class="w-full"
                      ></a-input-password>
                    </a-form-item>
                  </a-form>
                  <a-button type="primary" @click="confirmDisableTwoFactor">Xác thực</a-button>
                </div>
              </div>
            </div>
          </div>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { confirmDisableTwoFa } from '@/services/sys/staff/index.ts'
import { message } from 'ant-design-vue'
import { RULES_REQUIRED } from '@/constants/validation'
import { Form } from 'ant-design-vue'

const useForm = Form.useForm
export default defineComponent({
  name: 'TwoFactorAuthenticator',
  setup() {
    // PROPERTY
    const router = useRouter()
    const urlImage = ref('')
    const formModel = reactive({
      otp: '',
      password: ''
    })
    const rulesRef = reactive({
      otp: [
        RULES_REQUIRED,
        {
          validator: (rule, otp) => {
            if (!otp) {
              return Promise.resolve()
            } else {
              return otp.length === 6
                ? Promise.resolve()
                : Promise.reject('Mã xác thực phải có chiều dài 6 ký tự')
            }
          }
        }
      ],
      password: [RULES_REQUIRED]
    })
    const { resetFields, validate, validateInfos } = useForm(formModel, rulesRef)

    // METHOD
    const confirmDisableTwoFactor = () => {
      validate().then(() => {
        const params = { otp: formModel.otp, password: formModel.password }
        confirmDisableTwoFa(params).then((rs) => {
          if (rs && rs.body) {
            message.success({ content: 'Tắt xác thực 2 yếu tố thành công' })
            router.push({ name: 'index' })
          }
        })
      })
    }

    return {
      urlImage,
      formModel,
      validateInfos,
      confirmDisableTwoFactor
    }
  }
})
</script>

<style scoped>
.two-factor-auth {
  width: 65%;
  margin: 0 auto;
  padding: 30px 0;
}

.two-factor-auth--title {
  font-weight: 600;
  line-height: 1.2;
  color: #303030;
  font-size: 1.3125rem;

  margin-bottom: 10px;
}

.two-factor-auth--content {
}

.two-factor-auth--step-list {
}

.two-factor-auth--step-item {
  margin-bottom: 40px;
}

.two-factor-auth--step-title {
  display: flex;
  padding-bottom: 8px;
  margin-bottom: 16px;
  border-bottom: 1px solid #cccccc;
  flex-flow: row wrap;

  font-size: 20px;
}

.two-factor-auth--download-app {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.two-factor-auth--download-app-item {
  height: 35px;
  margin-right: 20px;
}

.two-factor-auth--download-app-item-img {
  height: 100%;
  width: auto;
}

.two-factor-auth--qrcode {
  width: 250px;
  height: 250px;
  margin: 0 auto;
  overflow: hidden;
}

.two-factor-auth--qrcode-img {
  width: 250px;
  height: 250px;
}
</style>
