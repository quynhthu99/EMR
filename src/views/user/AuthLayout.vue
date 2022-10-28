<template>
  <div id="authLayout" class="auth-layout-wrapper">
    <div ref="authLayout" class="auth-layout">
      <div class="container">
        <div class="select-lang">
          <LangComponent></LangComponent>
        </div>
        <div class="limiter">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import LangComponent from '@/components/SelectLang/index.jsx'
import getBackgroundImages from '@/config/backgroundConfig'
import { ref, defineComponent, onMounted } from 'vue'

export default defineComponent({
  name: 'AuthLayout',
  components: {
    LangComponent
  },
  setup() {
    const authLayout = ref(null)
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
    onMounted(async () => {
      authLayout.value.style.backgroundImage = 'url(' + (await bg) + ')'
    })
    return {
      authLayout,
      bg
    }
  }
})
</script>

<style lang="less" scoped>
#authLayout.auth-layout-wrapper {
  height: 100%;

  .auth-layout {
    width: 100%;
    height: 100%;
    overflow: hidden;

    background-size: cover;
    background-repeat: no-repeat;
  }

  &.mobile {
    .container {
      .main {
        max-width: 368px;
        width: 98%;
      }
    }
  }

  .container {
    width: 100%;
    min-height: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);

    /* Center and scale the image nicely */
    position: relative;

    .select-lang {
      position: absolute;
      top: 30px;
      right: 30px;
      font-size: 20px;
    }

    .limiter {
      display: block;
      width: 100%;
      height: 100%;
    }

    a {
      text-decoration: none;
    }

    .top {
      text-align: center;

      .header {
        height: 44px;
        line-height: 44px;

        .badge {
          position: absolute;
          display: inline-block;
          line-height: 1;
          vertical-align: middle;
          margin-left: -12px;
          margin-top: -10px;
          opacity: 0.8;
        }

        .logo {
          height: 44px;
          vertical-align: top;
          margin-right: 16px;
          border-style: none;
        }

        .title {
          font-size: 33px;
          color: rgba(0, 0, 0, 0.85);
          font-family: Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif;
          font-weight: 600;
          position: relative;
          top: 2px;
        }
      }

      .desc {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.45);
        margin-top: 12px;
        margin-bottom: 40px;
      }
    }

    .main {
      min-width: 260px;
      width: 368px;
      margin: 0 auto;
    }

    .footer {
      position: absolute;
      width: 100%;
      bottom: 0;
      padding: 0 16px;
      margin: 48px 0 24px;
      text-align: center;

      .links {
        margin-bottom: 8px;
        font-size: 14px;

        a {
          color: rgba(0, 0, 0, 0.45);
          transition: all 0.3s;

          &:not(:last-child) {
            margin-right: 40px;
          }
        }
      }

      .copyright {
        color: rgba(0, 0, 0, 0.45);
        font-size: 14px;
      }
    }
  }
}
</style>
