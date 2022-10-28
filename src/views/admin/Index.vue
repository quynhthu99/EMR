<template>
  <va-bread-crumb
    :extra-breadcrumbs="[
      {
        path: '/',
        name: 'index',
        meta: {
          title: 'menu.home'
        }
      },
      {
        path: '/admin/settings',
        name: 'admin.settings',
        meta: {
          title: 'menu.admin.title'
        }
      }
    ]"
  />
  <a-card>
    <a-row :gutter="['16', '16']">
      <a-col v-for="field in fields" :key="field.title" :xs="24" :md="12" :lg="8" class="mb-4">
        <div class="flex items-center mb-1">
          <va-svg-icon :name="field.icon" />
          <span class="ml-1 font-bold text-lg">{{ field.title }}</span>
        </div>
        <div
          v-for="(child, childIndex) in field.children"
          :key="childIndex"
          class="mb-1 cursor-not-allowed"
        >
          <router-link :to="child.link" :class="child.class || 'text-black'">
            {{ child.text }}
          </router-link>
        </div>
      </a-col>
    </a-row>
  </a-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {
      fields: [
        {
          title: 'Thông tin chung',
          icon: 'folder',
          children: [
            {
              text: 'Thông tin công ty',
              link: { name: 'admin.settings.general_setting.company_info' }
            },
            // {
            //   text: 'Tùy chọn chung',
            //   link: { name: 'admin.settings.general_setting.options_general' }
            // },
            {
              text: 'Tùy chọn tham số hệ thống',
              link: { name: 'admin.settings.general_setting.lc_params' }
            },
            {
              text: 'Tùy chọn danh mục hệ thống',
              link: { name: 'admin.settings.general_setting.lc_global_list' }
            }
          ]
        },
        {
          title: 'Tài khoản, ngân hàng',
          icon: 'bank',
          children: [
            {
              text: 'Hệ thống tài khoản',
              link: { name: 'admin.settings.bank.account_system' }
            },
            {
              text: 'Tài khoản kết chuyển',
              link: { name: 'index' },
              class: 'text-gray-200 cursor-not-allowed hover:text-gray-200'
            },
            {
              text: 'Tài khoản ngầm định',
              link: { name: 'index' },
              class: 'text-gray-200 cursor-not-allowed hover:text-gray-200'
            },
            {
              text: 'Ngân hàng',
              link: { name: 'admin.settings.bank.bank' }
            },
            {
              text: 'Tài khoản ngân hàng',
              link: { name: 'admin.settings.bank.bank_accounts' }
            }
          ]
        },
        {
          title: 'Đối tượng kế toán',
          icon: 'user',
          children: [
            {
              text: 'Nhân viên',
              link: { name: 'admin.settings.subject.staff' }
            },
            {
              text: 'Khách hàng',
              link: { name: 'admin.settings.subject.customer' }
            },
            {
              text: 'Nhà cung cấp',
              link: { name: 'admin.settings.subject.vendor' }
            }
          ]
        },
        {
          title: 'Tổ chức, Nhân viên',
          icon: 'userGroup',
          children: [
            {
              text: 'Cơ cấu tổ chức',
              link: { name: 'admin.settings.unit.unit_management' }
            },
            {
              text: 'Nhân viên & vai trò',
              link: { name: 'admin.settings.unit.staff_management' }
            }
          ]
        },
        {
          title: 'Vật tư hàng hóa, Tài sản',
          icon: 'database',
          children: [
            {
              text: 'Kho',
              link: { name: 'admin.settings.supplies.warehouse' }
            },
            {
              text: 'Vật tư hàng hóa',
              link: { name: 'admin.settings.supplies.product_items' }
            },
            {
              text: 'Tài sản cố định',
              link: { name: 'admin.settings.supplies.fixed_asset_type' }
            },
            {
              text: 'Công cụ dụng cụ',
              link: { name: 'admin.settings.supplies.tool_equipment_type' }
            },
            {
              text: 'Nhóm vật tư, hàng hóa, dịch vụ',
              link: { name: 'admin.settings.supplies.product_group' }
            },
            {
              text: 'Đơn vị tính',
              link: { name: 'admin.settings.supplies.unit' }
            }
          ]
        },
        {
          title: 'Chi phí',
          icon: 'currency',
          children: [
            {
              text: 'Đối tượng tập hợp chi phí',
              link: { name: 'admin.settings.cost.cost_object' }
            },
            {
              text: 'Khoản mục chi phí',
              link: { name: 'admin.settings.cost.cost_classification' }
            },
            {
              text: 'Công trình, Dự án',
              link: { name: 'admin.settings.cost.construction' }
            },
            {
              text: 'Loại công trình',
              link: { name: 'admin.settings.cost.construction_type' }
            }
          ]
        },
        {
          title: 'Thiết lập khác',
          icon: 'dots-circle-horizontal',
          children: [
            {
              text: 'Loại tiền',
              link: { name: 'admin.settings.others.currency' }
            },
            {
              text: 'Điều khoản thanh toán',
              link: { name: 'admin.settings.others.payment_terms' }
            },
            {
              text: 'Mục thu chi',
              link: { name: '' },
              class: 'text-gray-200 cursor-not-allowed hover:text-gray-200'
            },
            {
              text: 'Mã thống kê',
              link: { name: 'index' },
              class: 'text-gray-200 cursor-not-allowed hover:text-gray-200'
            }
          ]
        },
        {
          title: 'Chứng từ',
          icon: 'document-text',
          children: [
            {
              text: 'Loại chứng từ',
              link: { name: 'admin.settings.voucher.voucher_type' }
            },
            {
              text: 'Quy tắc chứng từ',
              link: { name: 'admin.settings.voucher.options_rule_numbering' }
            },
            {
              text: 'Đánh lại số chứng từ',
              link: { name: '' },
              class: 'text-gray-200 cursor-not-allowed hover:text-gray-200'
            }
          ]
        },
        {
          title: 'Biểu thuế',
          icon: 'document-text',
          children: [
            {
              text: 'Biểu thuế tiêu thụ đặc biệt',
              link: { name: '' },
              class: 'text-gray-200 cursor-not-allowed hover:text-gray-200'
            },
            {
              text: 'Biểu thuế tài nguyên',
              link: { name: '' },
              class: 'text-gray-200 cursor-not-allowed hover:text-gray-200'
            }
          ]
        }
      ]
    }
  }
})
</script>
