<template>
  <div class="flex justify-between">
    <a-tabs
      :key="activeKey"
      :active-key="activeKey"
      :animated="true"
      class="va-tabs px-4 bg-white shadow-lg shadow drop-shadow-2xl bg-blend-exclusion shadow-2xl z-50"
    >
      <a-tab-pane v-for="tab in tabs" :key="tab.path">
        <template #tab>
          <span class="flex justify-center text-center -align-center" @click="onClick(tab.path)">
            <va-svg-icon
              v-if="tab.meta.icon"
              :name="tab.meta.icon || ''"
              class="mr-1"
            ></va-svg-icon>
            <div class="-mt-0.5">{{ t(tab.meta.title) }}</div>
          </span>
        </template>
      </a-tab-pane>
    </a-tabs>
    <div>
      <slot name="extra"></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { Router } from '@/router/types'
export default defineComponent({
  props: {
    extraRouters: {
      type: Array,
      default() {
        return []
      }
    }
  },
  setup(props) {
    const route = useRoute()
    const router = useRouter()
    const tabs = ref([])
    const name = ref('')
    const { t } = useI18n()
    const activeKey = ref(route.path)
    const extraBreadcrumb = ref<Router>(props.extraRouters)
    tabs.value = []
    if (route.meta && route.meta.breadcrumbText) {
      name.value = route.meta.breadcrumbText
    }
    if (
      extraBreadcrumb.value &&
      Array.isArray(extraBreadcrumb.value) &&
      extraBreadcrumb.value.length
    ) {
      extraBreadcrumb.value.forEach((item) => {
        tabs.value.push(item)
      })
    } else {
      if (route.matched && Array.isArray(route.matched) && route.matched.length && route.matched[1])
        route.matched[1].children.forEach((item) => {
          tabs.value.push(item)
        })
    }
    const onClick = (active) => {
      router.push(active)
    }
    watch(
      () => activeKey.value,
      (v) => {
        router.push(v)
      }
    )
    return {
      t,
      tabs,
      router,
      activeKey,
      onClick
    }
  }
})
</script>
<style lang="less">
.va-tabs {
  .ant-tabs-nav {
    margin: 0;
    .ant-tabs-nav-wrap {
      line-height: 25px;
    }
  }
}
</style>
