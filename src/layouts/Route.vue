<template>
  <va-tabs :key="key" />
  <router-view v-if="isKeep" v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
  <router-view v-else />
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

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
    const key = ref(1)
    const router = useRouter()
    const isKeep = ref(false)

    watch(
      () => router.currentRoute.value,
      () => {
        const routeKeepAlive = router.currentRoute.value.meta.keepAlive
        isKeep.value = !(!store.state.app.multiTab && !routeKeepAlive && !props.keepAlive)
        key.value++
      },
      {
        immediate: true
      }
    )

    return {
      isKeep,
      key
    }
  }
})
</script>
