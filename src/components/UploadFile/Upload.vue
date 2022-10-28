<template>
  <a-upload
    v-model:file-list="fileList"
    name="file"
    list-type="picture-card"
    class="avatar-uploader"
    :show-upload-list="false"
    :custom-request="customRequest"
    :before-upload="beforeUpload"
    @change="handleChange"
  >
    <div v-if="imageUrlSelf" class="img-upload">
      <a-image
        :src="imageUrlSelf"
        :preview="false"
        alt="avatar"
        :width="120"
        :height="120"
      ></a-image>
      <a-button ghost class="btn--remove" @click.stop="onDelImg">Xóa ảnh</a-button>
    </div>
    <div v-else>
      <loading-outlined v-if="loading"></loading-outlined>
      <plus-outlined v-else></plus-outlined>
      <div class="ant-upload-text" type="dark">Upload</div>
    </div>
  </a-upload>
</template>
<script lang="ts">
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { defineComponent, ref } from 'vue'
import type { UploadChangeParam, UploadProps } from 'ant-design-vue'
import { IMAGE_BASE64_PREFIX } from '@/constants/validation'
import { getBase64 } from '@/utils/util'

export default defineComponent({
  components: {
    LoadingOutlined,
    PlusOutlined
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['imageUrl'],
  emits: ['update:value', 'input'],
  setup(props, context) {
    const fileList = ref([])
    const loading = ref<boolean>(false)
    const imageUrlSelf = ref<string>(props.imageUrl)
    const uploadFile = async () => {
      return true
    }
    const customRequest = async () => {
      try {
        setTimeout(() => {
          uploadFile()
          loading.value = false
        }, 500)
      } catch (err) {}
    }

    const handleChange = async (info: UploadChangeParam) => {
      info.file.status = 'done'
      fileList.value = [info.file]
      if (info.file.status === 'uploading') {
        loading.value = true
        return
      }
      if (info.file.status === 'done') {
        imageUrlSelf.value = await getBase64(info.file.originFileObj)
        if (imageUrlSelf.value) {
          const regex = IMAGE_BASE64_PREFIX
          context.emit('update:value', {
            dataBase64: imageUrlSelf.value.replace(regex, ''),
            fileName: info.file.name
          })
        }
      }
      if (info.file.status === 'error') {
        loading.value = false
        message.error('upload error')
      }
    }

    const beforeUpload = (file: UploadProps['fileList'][number]) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        message.error('You can only upload JPG file!')
      }
      const isLt5M = file.size / 1024 / 1024 < 5
      if (!isLt5M) {
        message.error('Image must smaller than 5MB!')
      }
      return isJpgOrPng && isLt5M
    }
    const onDelImg = (): void => {
      imageUrlSelf.value = ''
      context.emit('update:value', {
        dataBase64: undefined,
        fileName: undefined
      })
    }

    return {
      fileList,
      loading,
      imageUrlSelf,
      onDelImg,
      handleChange,
      beforeUpload,
      customRequest
    }
  }
})
</script>
<style lang="less">
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
.img-upload {
  &:hover {
    .btn--remove {
      opacity: 1 !important;
    }
  }
}
.btn--remove {
  opacity: 0;
  position: absolute;
  top: 0;
  left: 20px;
}
</style>
