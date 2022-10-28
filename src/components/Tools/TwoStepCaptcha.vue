<template>
  <!-- 两步验证 -->
  <a-modal v-model="visible" centered :mask-closable="false" @cancel="handleCancel">
    <div slot="title" :style="{ textAlign: 'center' }">Xác thực 2 bước</div>
    <template #footer>
      <div :style="{ textAlign: 'center' }">
        <a-button key="back" @click="handleCancel">Trờ về</a-button>
        <a-button key="submit" type="primary" :loading="stepLoading" @click="handleStepOk">
          Tiếp tục
        </a-button>
      </div>
    </template>

    <a-spin :spinning="stepLoading">
      <a-form
        layout="vertical"
        :auto-form-create="
          (form) => {
            this.form = form
          }
        "
      >
        <div class="step-form-wrapper">
          <p v-if="!stepLoading" style="text-align: center">Google AuthenticatorAPP<br /></p>
          <a-form-item
            :style="{ textAlign: 'center' }"
            has-feedback
            field-decorator-id="stepCode"
            :field-decorator-options="{
              rules: [{ required: true, message: '!', pattern: /^\d{6}$/, len: 6 }]
            }"
          >
            <a-input
              :style="{ textAlign: 'center' }"
              placeholder="000000"
              @keyup.enter.native="handleStepOk"
            />
          </a-form-item>
          <p style="text-align: center">
            <a @click="onForgeStepCode">?</a>
          </p>
        </div>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      stepLoading: false,

      form: null
    }
  },
  methods: {
    handleStepOk() {
      const vm = this
      this.stepLoading = true
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('values', values)
          setTimeout(() => {
            vm.stepLoading = false
            vm.$emit('success', { values })
          }, 2000)
          return
        }
        this.stepLoading = false
        this.$emit('error', { err })
      })
    },
    handleCancel() {
      this.visible = false
      this.$emit('cancel')
    },
    onForgeStepCode() {}
  }
}
</script>
<style lang="less" scoped>
.step-form-wrapper {
  margin: 0 auto;
  width: 80%;
  max-width: 400px;
}
</style>
