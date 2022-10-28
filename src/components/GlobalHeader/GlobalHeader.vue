<template>
  <transition name="showHeader">
    <div v-if="visible" class="header-animat">
      <a-layout-header v-if="visible" :class="[
        fixedHeader && 'ant-header-fixedHeader',
        sidebarOpened ? 'ant-header-side-opened' : 'ant-header-side-closed'
      ]" :style="{ padding: '0' }">
        <div v-if="mode === 'sidemenu'" class="header">
          <div class="flex justify-end items-center hover:va-text-red" @click="toggle">
            <template v-if="device === 'mobile'">
              <MenuFoldOutlined v-if="collapsed" class="trigger flex" />
              <MenuUnfoldOutlined v-else class="trigger flex" />
            </template>
            <template v-else>
              <MenuUnfoldOutlined v-if="collapsed" class="trigger flex" />
              <MenuFoldOutlined v-else class="trigger flex" />
            </template>
          </div>
          <div class="flex w-full justify-end items-center">
            <div class="flex justify-between items-center">
              <a-popover v-model:visible="visibleSetupAndAdmin" trigger="click" placement="bottomRight">
                <template #title>
                  <div class="uppercase p-2 text-center va-text-blue font-bold">
                    Thiết lập & Quản trị
                  </div>
                </template>
                <template #content>
                  <a-row :gutter="16" style="width: 400px; margin-left: 8px !important">
                    <a-col v-for="field in fields" :key="field.text" :span="12" class="py-1">
                      <router-link :to="field.link" @click="visibleSetupAndAdmin = false">
                        {{ field.text }}
                      </router-link>
                    </a-col>
                  </a-row>
                  <a-divider class="my-2" />
                  <div class="flex justify-center items-center font-bold">
                    <router-link class="va-text-blue" :to="{ name: 'admin.settings' }"
                      @click="visibleSetupAndAdmin = false">
                      Xem tất cả
                    </router-link>
                  </div>
                </template>
                <a-tooltip>
                  <template #title>Thiết lập & Quản trị</template>
                  <va-svg-icon class="mr-4 h-6 w-6 hover:va-text-red hover:cursor-pointer focus:animate-spin"
                    name="setting" @click="visibleSetupAndAdmin = true" />
                </a-tooltip>
              </a-popover>
              <a-tooltip>
                <template #title>Thông báo</template>
                <va-svg-icon name="bell"
                  class="mr-4 h-6 w-6 hover:va-text-red hover:cursor-pointer focus:animate-bounce">
                </va-svg-icon>
              </a-tooltip>
              <a-tooltip>
                <template #title>Trợ giúp</template>
                <va-svg-icon name="help" class="mr-4 h-6 w-6 hover:va-text-red hover:cursor-pointer" />
              </a-tooltip>
              <a-dropdown :trigger="['hover', 'click']">
                <div class="flex items-center cursor-pointer">
                  <a-avatar v-if="staffInfo.avatarUrl" size="small" class="flex items-center h-6 w-6"
                    :src="staffInfo.avatarUrl" />
                  <a-avatar v-else size="small" class="va-bg-blue">
                    {{ staffInfo.acronym }}
                  </a-avatar>
                </div>
                <template #overlay>
                  <a-menu>
                    <a-menu-item key="0" @click="showDrawerAccount">
                      <template #icon>
                        <va-svg-icon name="user" />
                      </template>
                      Tài khoản cá nhân
                    </a-menu-item>
                    <a-menu-divider />
                    <a-menu-item @click="onChangeMenu('BADT')">
                      <template #icon>
                        <va-svg-icon name="folder-open" />
                      </template>
                      Bệnh án điện tử
                    </a-menu-item>
                    <a-menu-divider />
                    <a-menu-item @click="onChangeMenu('QTHT')">
                      <template #icon>
                        <va-svg-icon name="setting" />
                      </template>
                      Quản trị hệ thống
                    </a-menu-item>
                    <a-menu-divider />
                    <a-menu-item key="3" @click="handleLogout">
                      <template #icon>
                        <va-svg-icon name="logout" />
                      </template>
                      Thoát ứng dụng
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
              <a-drawer v-model:visible="visibleDrawerAccount" placement="right"
                :width="device !== 'mobile' ? '30%' : '90%'" :closable="false" class="profile-drawer"
                :destroy-on-close="true">
                <div class="flex justify-between items-center">
                  <div class="flex items-center">
                    <div class="mr-3">
                      <a-upload class="w-24 h-24 hover:cursor-pointer" :show-upload-list="false" name="avatar"
                        :before-upload="beforeUploadAvatar">
                        <a-avatar v-if="staffInfo.avatarUrl" :src="staffInfo.avatarUrl" class="w-24 h-24" />
                        <a-avatar v-else class="w-24 h-24 text-3xl va-bg-blue">
                          {{ staffInfo.acronym }}
                        </a-avatar>
                      </a-upload>
                    </div>
                    <div>
                      <div class="flex flex-col justify-center ml-2">
                        <div class="font-bold uppercase text-lg">{{ staffInfo.staffName }}</div>
                        <div>{{ staffInfo.staffCode }}</div>
                      </div>
                    </div>
                  </div>
                  <div class="flex justify-end">
                    <a-tooltip placement="bottomRight">
                      <template #title>Thiết lập giao diện</template>
                      <va-svg-icon name="setting" class="cursor-pointer md:animate-spin hover:animate-pulse"
                        @click="showSystemSetting" />
                    </a-tooltip>
                  </div>
                </div>
                <a-divider />
                <a-row :gutter="16" class="mb-6">
                  <a-col :span="6"><span class="font-bold h-11">Tài khoản:</span></a-col>
                  <a-col :span="18">
                    <span>{{ currentUser.userName }}</span>
                  </a-col>
                </a-row>
                <a-form>
                  <a-row :gutter="16" class="mb-6">
                    <a-col :span="6"><span class="font-bold">Email:</span></a-col>
                    <a-col :span="13">
                      <span v-if="!editEmail" class="flex truncate">{{ staffInfo.email }}</span>
                      <a-form-item v-else style="margin-bottom: -16px" v-bind="validateInfos.email">
                        <va-input v-model:value="modelRef.email" class="w-full" />
                      </a-form-item>
                    </a-col>
                    <a-col :span="5" class="flex justify-end">
                      <div v-if="!editEmail" type="link" class="hover:cursor-pointer hover:va-text-red"
                        @click="onEditEmail">
                        Cập nhật
                      </div>
                      <div v-else class="inline-flex">
                        <a-button class="mr-1" type="button" @click="onCancelEditEmail">Hủy</a-button>
                        <a-button type="primary" @click="onSave">Lưu</a-button>
                      </div>
                    </a-col>
                  </a-row>
                  <a-row :gutter="16" class="mb-6">
                    <a-col :span="6"><span class="font-bold">Số điện thoại:</span></a-col>
                    <a-col :span="13">
                      <span v-if="!editPhone" class="flex truncate">{{
                      staffInfo.phoneNumber
                      }}</span>
                      <a-form-item v-else style="margin-bottom: -16px" v-bind="validateInfos.phoneNumber">
                        <va-input v-model:value="modelRef.phoneNumber" class="w-full" />
                      </a-form-item>
                    </a-col>
                    <a-col :span="5" class="flex justify-end">
                      <div v-if="!editPhone" class="hover:cursor-pointer hover:va-text-red" type="link"
                        @click="onEditPhone">
                        Cập nhật
                      </div>
                      <div v-else class="inline-flex">
                        <a-button class="mr-1" type="button" @click="onCancelEditPhone">Hủy</a-button>
                        <a-button type="primary" @click="onSave">Lưu</a-button>
                      </div>
                    </a-col>
                  </a-row>
                </a-form>
                <a-row :gutter="16" class="mb-6">
                  <a-col :span="6" class="">
                    <span class="font-bold">Mật khẩu:</span>
                  </a-col>
                  <a-col :span="14">
                    <span class="flex"> ************ </span>
                  </a-col>
                  <a-col :span="4" class="flex justify-end">
                    <div class="hover:cursor-pointer hover:va-text-red" type="link" @click="onEditPassword">
                      Thay đổi
                    </div>
                  </a-col>
                </a-row>
                <a-row :gutter="16" class="mb-6">
                  <a-col :span="6" class="">
                    <span class="font-bold">Xác thực 2 bước</span>
                  </a-col>
                  <a-col :span="12"></a-col>
                  <a-col :span="6" class="flex justify-end">
                    <a-switch v-model:checked="staffInfo.twoFAInfo" size="small" checked-children="Bật"
                      un-checked-children="Tắt" @click="goToTurnOnGoogleAuthen" />
                  </a-col>
                </a-row>
              </a-drawer>
            </div>
          </div>
        </div>
        <div v-else :class="['top-nav-header-index', theme]">
          <div class="header-index-wide">
            <div class="header-index-left">
              <logo class="top-nav-header" :show-title="device !== 'mobile'" />
              <s-menu v-if="device !== 'mobile'" mode="horizontal" :menu="menus" :theme="theme" />
              <span v-else @click="toggle">
                <MenuFoldOutlined v-if="collapsed === 'menu-fold'" class="trigger" />
                <MenuUnfoldOutlined v-if="collapsed === 'menu-unfold'" class="trigger" />
              </span>
            </div>
            <user-menu class="header-index-right" :theme="theme"></user-menu>
          </div>
        </div>
      </a-layout-header>
    </div>
  </transition>
</template>

<script lang="ts">
import UserMenu from '../Tools/UserMenu/index.vue'
import SMenu from '../Menu/Menu.vue'
import Logo from '../Tools/Logo.vue'
import { defineComponent, ref, onMounted, onBeforeUnmount, reactive } from 'vue'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'
import { sidebarOpened, device, fixedHeader, autoHideHeader } from '@/store/useSiteSettings'
import ls from '@/utils/Storage'
import { REFRESH_TOKEN } from '@/store/mutation-types'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { clearUserInfo } from '@/utils/util'
import { Modal, message, Form } from 'ant-design-vue'
import { logout } from '@/views/user/service'
import { getUnitAssignStaff, selfInfo, updateSelfInfo, uploadAvatar } from '@/services/sys/staff'
import {
  IMAGE_BASE64_PREFIX,
  RULES_1_TO_200,
  RULES_EMAIL,
  RULES_REQUIRED
} from '@/constants/validation'
import { getBase64 } from '@/utils/util'
import { CURRENT_ORG_UNIT_ID } from '@/store/mutation-types'
import generateAsyncRoutes from '@/router/generateAsyncRoutes'

export default defineComponent({
  name: 'GlobalHeader',
  components: {
    UserMenu,
    Logo,
    SMenu,
    MenuFoldOutlined,
    MenuUnfoldOutlined
  },
  props: {
    mode: {
      type: String,
      // sidemenu, topmenu
      default: 'sidemenu'
    },
    menus: {
      type: Array,
      required: true
    },
    theme: {
      type: String,
      required: false,
      default: 'dark'
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  emits: ['toggle', 'refresh'],
  setup(props, { emit }) {
    const useForm = Form.useForm
    const router = useRouter()
    const { state, commit } = useStore()
    const visible = ref<boolean>(true)
    if (device.value === 'mobile') {
      emit('toggle')
    }
    const visibleSetupAndAdmin = ref<boolean>(false)
    const visibleSelectBranch = ref<boolean>(false)
    const oldScrollTop = ref<number>(0)
    const ticking = ref<boolean>(false)
    // const mainMenu = cloneDeep(router.getRoutes())
    const value = ref<string>('index')
    const acronym = ref('')
    const keyUpload = ref<number>(1)
    const everRun = ref<boolean>(false)
    const listOrgUnitId = ref([])

    // const currentSubsystem = ls.get(SET_SUBSYSTEM)[SET_SUBSYSTEM]
    // if (currentSubsystem) {
    //   value.value = currentSubsystem
    // }
    // const subsystems = filterRouterPermission(mainMenu, ls.get(PERMISSION))
    //   .filter((v: any) => {
    //     return v.meta.subsystem
    //   })
    //   .map((meta: any) => {
    //     return meta.meta.subsystem
    //   })
    const handleScroll = () => {
      if (!autoHideHeader.value) {
        return
      }
      const scrollTop = document.body.scrollTop + document.documentElement.scrollTop
      if (!ticking.value) {
        ticking.value = true
        requestAnimationFrame(() => {
          if (oldScrollTop.value > scrollTop) {
            visible.value = true
          } else if (scrollTop > 200 && visible.value) {
            visible.value = false
          } else if (scrollTop < 200 && !visible.value) {
            visible.value = true
          }
          oldScrollTop.value = scrollTop
          ticking.value = false
        })
      }
    }
    const toggle = () => {
      emit('toggle')
    }
    const onSelect = (v) => {
      router.push({ name: v.key })
    }
    const onCancelSwitchSubsystem = () => {
      currentOrgUnitId.value = ls.get(CURRENT_ORG_UNIT_ID)
      visibleSelectBranch.value = false
    }
    const onSwitchSubsystem = () => {
      ls.set(CURRENT_ORG_UNIT_ID, currentOrgUnitId.value)
      visibleSelectBranch.value = false
    }

    const onChangeMenu = (value) => {
      if (value === 'BADT') {
        generateAsyncRoutes(router)
        window.location.href = '/'
      }
      if (value === 'QTHT') {
        generateAsyncRoutes(router)
        window.location.href = '/'
      }
    }

    const staffInfo = ref({})
    const currentUser = state.account.info
    const getStaffInfo = async () => {
      try {
        const { body } = await selfInfo()
        if (body) {
          staffInfo.value = body
          staffInfo.value.acronym = staffInfo.value.staffName
            .split(' ')
            .map((x) => x[0])
            .join('')
        }
      } catch (e) { }
    }
    const currentOrgUnitId = ref()
    // const getOrgUnitInfo = async () => {
    //   const { body } = await getUnitAssignStaff()
    //   if (body) {
    //     listOrgUnitId.value = body
    //     if (!ls.get(CURRENT_ORG_UNIT_ID)) {
    //       currentOrgUnitId.value = listOrgUnitId.value[0].orgUnitId
    //       ls.set(CURRENT_ORG_UNIT_ID, currentOrgUnitId.value)
    //     } else {
    //       currentOrgUnitId.value = ls.get(CURRENT_ORG_UNIT_ID)
    //     }
    //   }
    // }

    const editEmail = ref<boolean>(false)
    const editPhone = ref<boolean>(false)
    const modelRef = reactive({
      email: '',
      phoneNumber: '',
      logoUrl: ''
    })
    const getLogo = (v) => {
      companyInfo.image = v
    }
    const rulesRef = reactive({
      email: [RULES_REQUIRED, RULES_EMAIL],
      phoneNumber: [RULES_REQUIRED, RULES_1_TO_200]
    })
    const { resetFields, validate, validateInfos } = useForm(modelRef, rulesRef)
    const onSave = () => {
      validate().then(() => {
        Modal.confirm({
          title: 'Bạn có chắc chắn muốn cập nhật thông tin không?',
          async onOk() {
            await updateSelfInfo(modelRef)
            await getStaffInfo()
            editEmail.value = !editEmail.value
            message.success({ content: 'Cập nhật thông tin thành công' })
          }
        })
      })
    }
    const visibleDrawerAccount = ref<boolean>(false)
    const showDrawerAccount = async () => {
      // if (Object.keys(staffInfo.value).length === 0) await getStaffInfo()
      visibleDrawerAccount.value = true
    }
    const onHideHeader = () => {
      visible.value = false
    }

    const showSystemSetting = async () => {
      commit('SET_SETTING_DRAWER', true)
      visibleDrawerAccount.value = false
    }
    const checked = ref<boolean>(false)
    const editPassword = ref<boolean>(false)
    const onEditEmail = () => {
      editEmail.value = !editEmail.value
      editPhone.value = false
      modelRef.email = staffInfo.value.email
    }
    const onCancelEditEmail = () => {
      editEmail.value = !editEmail.value
    }
    const onEditPhone = () => {
      editPhone.value = !editPhone.value
      editEmail.value = false
      modelRef.phoneNumber = staffInfo.value.phoneNumber
    }
    const onCancelEditPhone = () => {
      editPhone.value = !editPhone.value
    }
    const localLogout = () => {
      // Logout Local
      clearUserInfo()
      message.success('Đăng xuất thành công!')
      window.location.reload()
    }
    const handleLogout = () => {
      Modal.confirm({
        title: 'Gợi ý',
        content: 'Bạn có thực sự muốn đăng xuất?',
        onOk: async () => {
          const data = {
            clientId: import.meta.env.VITE_CLIENT_ID,
            refreshToken: ls.get(REFRESH_TOKEN)
          }
          await logout(data)
          clearUserInfo()
          await router.push('/user')
          try {
            // Logout phía server
            const data = {
              clientId: import.meta.env.VITE_CLIENT_ID,
              refreshToken: ls.get(REFRESH_TOKEN)
            }
            await logout(data)
            localLogout()
          } catch (e) {
            localLogout()
          }
        }
      })
    }
    const onEditPassword = () => {
      router.push({ name: 'account.change_password' })
      visibleDrawerAccount.value = false
    }
    const goToTurnOnGoogleAuthen = () => {
      if (staffInfo.value.twoFAInfo) {
        router.push({ name: 'account.register_two_factor_authentication' })
        visibleDrawerAccount.value = false
      } else {
        router.push({ name: 'account.cancel_two_factor_authentication' })
        visibleDrawerAccount.value = false
      }
    }
    // const functionCalledOnceTime = (function () {
    //   return function () {
    //     if (!everRun.value) {
    //       everRun.value = true
    //       getStaffInfo()
    //     }
    //   }
    // })()
    // getOrgUnitInfo()
    onMounted(async () => {
      // await getStaffInfo()
      // functionCalledOnceTime()
      document.addEventListener('scroll', handleScroll, { passive: true })
    })
    onBeforeUnmount(() => {
      document.body.removeEventListener('scroll', handleScroll, true)
    })
    const beforeUploadAvatar = async (file: File, fileList: File[]) => {
      console.log(file, fileList)
      // info.file.status = 'done'
      const imageBase64 = await getBase64(file)
      if (imageBase64) {
        await uploadAvatar({
          dataBase64: imageBase64.replace(IMAGE_BASE64_PREFIX, ''),
          fileName: file.name
        })
        await getStaffInfo()
        fileList = []
      }
      return false
    }

    return {
      fixedHeader,
      sidebarOpened,
      device,
      currentOrgUnitId,
      listOrgUnitId,
      everRun,
      keyUpload,
      acronym,
      validateInfos,
      modelRef,
      editPassword,
      editEmail,
      editPhone,
      currentUser,
      staffInfo,
      checked,
      visible,
      value,
      visibleSetupAndAdmin,
      visibleSelectBranch,
      visibleDrawerAccount,
      showDrawerAccount,
      onEditEmail,
      onCancelEditEmail,
      onEditPhone,
      onCancelEditPhone,
      onHideHeader,
      onEditPassword,
      resetFields,
      validate,
      onSave,
      showSystemSetting,
      handleLogout,
      getLogo,
      beforeUploadAvatar,
      onSwitchSubsystem,
      onCancelSwitchSubsystem,
      toggle,
      goToTurnOnGoogleAuthen,
      onSelect,
      onChangeMenu,
      fields: [
        {
          text: 'Thông tin chung',
          link: { name: 'admin.settings.general_setting.company_info' }
        },
        {
          text: 'Tham số dùng chung',
          link: { name: 'admin.settings.general_setting.lc_params' }
        },
        {
          text: 'Danh mục dùng chung',
          link: { name: 'admin.settings.general_setting.lc_global_list' }
        }
      ]
    }
  }
})
</script>

<style lang="less">
@import '../../style/index.less';

.profile-drawer .ant-drawer-body {
  margin-top: 0;
}

//.avatar-uploader {
//  > .ant-upload {
//    width: 72px !important;
//    height: 72px !important;
//  }
//}

.header-animat {
  position: relative;
  z-index: @ant-global-header-zindex;
}

.showHeader-enter-active {
  transition: all 0.25s ease;
}

.showHeader-leave-active {
  transition: all 0.5s ease;
}

.showHeader-enter,
.showHeader-leave-to {
  opacity: 0;
}

.py-1 {
  a {
    color: rgba(0, 0, 0, 0.85) !important;
    padding: 4px 0 4px 0;

    &:hover {
      color: @primary-color !important;
    }
  }
}

svg:focus {
  outline: none;
}

.ant-avatar-circle {
  .ant-avatar-string {
    height: 100%;
    display: flex;
    align-items: center;
  }
}
</style>
