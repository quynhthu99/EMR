<template>
  <div class="working-page">
    <div class="working-page--header">
      <div class="working-page--header-left">
        <slot name="headerLeftAction"></slot>
        <div class="working-page--title">{{ title }}</div>
      </div>
      <div class="working-page--header-right">
        <slot name="headerRightAction"></slot>
        <div class="working-page--exit">
          <span class="cursor-pointer" @click="handleClosePage">
            <SvgIcon name="close" :width="'30px'" :height="'30px'"></SvgIcon>
          </span>
        </div>
      </div>
    </div>
    <div class="working-page--content">
      <slot></slot>
    </div>
    <div class="working-page--footer">
      <div class="working-page--footer-left">
        <slot name="footerLeft"></slot>
      </div>
      <div class="working-page--footer-right">
        <slot name="footerRight"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import SvgIcon from '../SvgIcon/index.vue'
export default {
  name: 'WorkingPage',
  components: {
    SvgIcon
  },
  props: {
    title: {
      required: true,
      type: String
    }
  },
  data() {
    return {}
  },
  created() {},
  methods: {
    handleClosePage() {
      window.history.back()
    }
  }
}
</script>

<style lang="less" scoped>
.working-page {
  width: 100%;
  height: 100vh;
  position: relative;

  .working-page--header {
    padding: 16px 16px 20px 16px;
    background-color: #eceef1;
    position: sticky;
    top: 0;
    z-index: 2;

    display: flex;
    justify-content: space-between;

    .working-page--header-left {
      flex: 1;
      display: flex;

      .working-page--title {
        font-size: 1.5em;
        font-weight: 700;
      }
    }
    .working-page--header-right {
      flex: 1;
      display: flex;
      justify-content: flex-end;
    }
  }

  .working-page--content {
    background-color: #ffffff;
    padding: 16px 150px 100px 150px;
  }

  .working-page--footer {
    position: sticky;
    bottom: 0;

    width: 100%;
    height: 50px;
    background-color: #38393d;

    display: flex;
    justify-content: flex-end;
    align-items: center;

    .working-page--footer-left {
      flex: 1;
      max-width: 100%;

      display: flex;
      justify-content: flex-end;
      align-items: center;
    }

    .working-page--footer-right {
      flex: 1;
      max-width: 100%;

      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }
}
</style>
