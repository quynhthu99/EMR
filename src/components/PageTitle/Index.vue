<template>
  <div class="page-title">
    <div class="page-title--content">
      <div class="page-title--title">
        <span>{{ titleSelf }}</span>
      </div>
      <div class="page-title--extra">
        <slot name="extra"></slot>
      </div>
    </div>
    <div class="page-title--back">
      <span class="page-title--button-back" @click="gotoBack"></span>
      <LeftOutlined /> Tất cả danh mục
      </span>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { LeftOutlined } from '@ant-design/icons-vue'
export default defineComponent({
  name: 'PageTitle',
  components: {
    LeftOutlined
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['title'],
  setup(props) {
    const titleSelf = ref(props.title)
    const router = useRouter()

    const gotoBack = () => {
      router.push({ name: 'admin.settings' })
    }

    return {
      titleSelf,
      gotoBack
    }
  }
})
</script>

<style scoped>
.page-title {
  padding: 8px 0 20px;
}

.page-title--content {
  display: flex;
  justify-content: space-between;
}

.page-title--title {
  font-size: 28px;
  font-weight: 700;
  color: #111;
}

.page-title--extra {
  display: flex;
  justify-content: flex-end;
}

.page-title--back {}

.page-title--button-back {
  color: #0075c0;
  cursor: pointer;
}
</style>
