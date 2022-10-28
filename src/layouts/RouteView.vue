<template>
  <!-- <va-breadcrumb></va-breadcrumb> -->
  <router-view v-if="isKeep" v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
  <router-view v-else />
  <!-- <va-back-top></va-back-top> -->
  <div class="footer">
    <div class="copyright">
      Copyright
      <CopyrightOutlined />&nbsp;2022
      <span>Viettel</span>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
// import vaFooter from '@/components/GlobalFooter/GlobalFooter.vue'

export default defineComponent({
  name: 'RouteView',
  props: {
    keepAlive: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const store = useStore()
    const router = useRouter()
    const isKeep = ref(false)

    watch(
      () => router.currentRoute.value,
      (newVal) => {
        const routeKeepAlive = router.currentRoute.value.meta.keepAlive
        isKeep.value = !(!store.state.app.multiTab && !routeKeepAlive && !props.keepAlive)
      },
      {
        immediate: true
      }
    )

    return {
      isKeep
    }
  }
})
</script>

<style lang="less"  scoped>
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
