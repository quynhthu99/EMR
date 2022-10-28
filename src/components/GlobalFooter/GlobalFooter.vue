<template>
  <div class="footer">
    <div class="copyright">
      Copyright
      <CopyrightOutlined />&nbsp;2022
      <span>EMR</span>
    </div>
  </div>
</template>

<script lang="ts">
import { CopyrightOutlined } from '@ant-design/icons-vue'
import { defineComponent } from 'vue'
import { isMobile } from '@/utils/device'

export default defineComponent({
  name: 'GlobalFooter',
  components: {
    CopyrightOutlined
  },
  setup() {
    return { isMobile }
  }
})
</script>

<style lang="less" scoped>
.footer {
  padding: 0 16px;
  margin: 48px 0 24px;
  text-align: center;

  .links {
    margin-bottom: 8px;

    a {
      color: rgba(0, 0, 0, 0.45);

      &:hover {
        color: rgba(0, 0, 0, 0.65);
      }

      &:not(:last-child) {
        margin-right: 40px;
      }
    }

    &.lessMargin {
      a {
        &:not(:last-child) {
          margin-right: 20px;
        }
      }
    }
  }
  .copyright {
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
  }
}
</style>
