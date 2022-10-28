import { Router } from './types'
import CompanyInfo from '@/views/admin/generalSetting/companyInfo/Index.vue'
import LcParams from '@/views/admin/generalSetting/lcParams/Index.vue'
import LcGLobalList from '@/views/admin/generalSetting/lcGLobalList/Index.vue'
import Dashboard from '@/views/dashboard/Index.vue'

/**
 * @interface:
 *   * Router:
 *   name: string (Sử dụng tiếng anh phân cách các từ bằng dấu '_')
 *   path: string (Sử dụng tiếng anh phân cách các từ bằng dấu '-')
 *   redirect?: string
 *   meta?: RouterMeta
 *   component?: Component | string
 *   children?: Router[]
 *   hidden?: boolean
 *   hideChildrenInMenu?: boolean
 *  ** RouterMeta
 *    title: string
 *   keepAlive?: boolean
 *   icon?: any
 *   permission?: Array<string>
 *   target?: string
 *   hidden?: boolean
 *   hiddenHeaderContent?: boolean
 *   hideHeader?: boolean
 *   blank?: boolean
 *   subsystem?: any
 *   breadcrumbText?: string
 *   pageName?: string
 */
export const vaRouter: Router = {
  path: '/',
  name: 'index',
  redirect: '/patient-list',
  component: () => import('@/layouts/BasicLayout.vue'),
  meta: {
    title: 'menu.home',
    subsystem: {
      key: 'index',
      text: 'Bệnh án điện tử'
    }
  },
  children: [
    // Hướng dẫn sử dụng
    {
      path: '/get-started',
      name: 'get_started',
      component: Dashboard,
      hidden: true,
      meta: {
        title: 'menu.get-started.title',
        keepAlive: false,
        permission: ['admin']
      }
    },
    // Danh sách bệnh nhân
    {
      path: '/patient-list',
      name: 'patient-list',
      component: () => import('@/views/patientList/Index.vue'),
      hideChildrenInMenu: true,
      meta: {
        title: 'menu.patient-list.title',
        icon: 'user',
        keepAlive: true,
        permission: ['admin'],
        breadcrumbText: 'menu.patient-list.title',
      },
      children: [

      ]
    },
    //Thêm bệnh nhân
    {
      path: '/add-patient',
      name: 'add-patient',
      hidden: true,
      component: () => import('@/views/patientList/addPatient/Index.vue'),
      hideChildrenInMenu: false,
      meta: {
        title: 'Thêm bệnh nhân',
        icon: 'pencil-art',
        keepAlive: true,
        permission: ['admin'],
        breadcrumbText: 'Thêm bệnh nhân',
      }
    },
    // Dashboard
    {
      path: '/dashboard/analysis',
      name: 'dashboard',
      hidden: true,
      component: Dashboard,
      meta: {
        title: 'menu.dashboard.title',
        icon: 'home',
        keepAlive: false,
        permission: ['admin'],
        breadcrumbText: 'menu.dashboard.title'
      }
    },
    //Lịch sử khám chữa bệnh
    {
      path: '/medical-examination-history',
      name: 'medical-examination-history',
      hidden: true,
      component: () => import('@/views/medicalHistory/Index.vue'),
      meta: {
        title: 'Lịch sử khám chữa bệnh',
        icon: 'home',
        keepAlive: false,
        permission: ['admin'],
        breadcrumbText: 'Lịch sử khám chữa bệnh'
      }
    },
    //Bệnh án đang điều trị
    {
      path: '/medical-being-treated',
      name: 'medical-being-treated',
      hidden: true,
      component: () => import('@/views/medicalBeingTreated/Index.vue'),
      meta: {
        title: 'Bệnh án đang điều trị',
        icon: 'home',
        keepAlive: false,
        permission: ['admin'],
        breadcrumbText: 'Bệnh án đang điều trị'
      }
    },
    //Thêm phiếu
    {
      path: '/choose-note-type',
      name: 'choose.note_type',
      hidden: true,
      component: () => import('@/views/admin/noteList/Index.vue'),
      meta: {
        title: 'menu.note.list',
        icon: 'borrow-medical-records',
        keepAlive: true,
        permission: ['admin'],
        breadcrumbText: 'menu.note.list'
      }
    },
    // Thiết lập & Quản trị (Tất cả)
    {
      path: '/admin/settings',
      name: 'admin.settings',
      component: () => import('@/layouts/RouteView.vue'),
      redirect: '/admin/settings/general-setting',
      hidden: true,
      hideChildrenInMenu: true,
      meta: {
        title: 'menu.admin.title',
        keepAlive: false,
        permission: ['admin']
      },
      children: [
        // Thiết lập & Quản trị (Tất cả)
        {
          path: '/admin/settings/general-setting',
          name: 'admin.settings.general_setting',
          hidden: true,
          component: () => import('@/views/admin/Index.vue'),
          meta: {
            title: 'menu.admin.title',
            breadcrumbText: 'menu.admin.breadcrumbText',
            keepAlive: false
          }
        },
        // Thiết lập chung
        {
          path: '/admin/settings/general',
          name: 'admin.settings.general',
          hidden: true,
          component: () => import('@/views/admin/generalSetting/GeneralSetting.vue'),
          meta: {
            title: 'menu.general_setting.title',
            breadcrumbText: 'menu.admin.breadcrumbText',
            keepAlive: false
          }
        },
        {
          path: 'company-info',
          name: 'admin.settings.general_setting.company_info',
          hidden: true,
          component: CompanyInfo,
          meta: {
            title: 'menu.company-info.title',
            breadcrumbText: 'menu.company-info.breadcrumbText',
            keepAlive: false
          }
        },
        {
          path: 'lc-params',
          name: 'admin.settings.general_setting.lc_params',
          hidden: true,
          component: LcParams,
          hideChildrenInMenu: true,
          meta: {
            title: 'menu.lc-list.title',
            breadcrumbText: 'menu.lc-params.breadcrumbText'
          }
        },
        {
          path: 'lc-global-list',
          name: 'admin.settings.general_setting.lc_global_list',
          hidden: true,
          component: LcGLobalList,
          hideChildrenInMenu: true,
          meta: {
            title: 'menu.lc-list.title',
            breadcrumbText: 'menu.lc-list.breadcrumbText'
          }
        }
      ]
    },
    // Quản lý bệnh án
    // {
    //   path: '/medical-records',
    //   name: 'medical-records',
    //   component: () => import('@/layouts/RouteView.vue'),
    //   hideChildrenInMenu: false,
    //   meta: {
    //     title: 'menu.medical-records.title',
    //     icon: 'identification',
    //     keepAlive: true,
    //     permission: ['admin']
    //   }
    // },

    // Quản lý thuốc
    // {
    //   path: '/medication',
    //   name: 'medication',
    //   component: () => import('@/layouts/RouteView.vue'),
    //   hideChildrenInMenu: false,
    //   meta: {
    //     title: 'menu.medication.title',
    //     icon: 'medication',
    //     keepAlive: true,
    //     permission: ['admin']
    //   }
    // },
    // Quản lý dịch vụ kỹ thuật
    // {
    //   path: '/technical-services',
    //   name: 'technical-services',
    //   component: () => import('@/layouts/RouteView.vue'),
    //   hideChildrenInMenu: false,
    //   meta: {
    //     title: 'menu.technical-services.title',
    //     icon: 'technical-services',
    //     keepAlive: true,
    //     permission: ['admin']
    //   }
    // },
    //
    {
      path: '/update-patient-note',
      name: 'update-patient-note',
      hidden: true,
      component: () => import('@/views/updatePatientNote/Index.vue'),
      hideChildrenInMenu: false,
      meta: {
        title: 'menu.medical-note.management',
        icon: 'identification',
        keepAlive: true,
        permission: ['admin'],

      },
      children: [
        //Khám vào viện
        {
          path: '/hospital-checkin',
          name: 'hospital-checkin',
          hidden: true,
          component: () => import('@/views/updatePatientNote/typeNoteMedical/hospitalCheckin/Index.vue'),
          meta: {
            title: 'Khám vào viện',
            breadcrumbText: 'Khám vào viện',
            keepAlive: false,
          }
        },
        //Tờ điều trị
        {
          path: '/treatment-sheet',
          name: 'treatment-sheet',
          hidden: true,
          component: () => import('@/views/updatePatientNote/typeNoteMedical/treatmentSheet/Index.vue'),
          meta: {
            title: 'Tờ điều trị',
            breadcrumbText: 'Tờ điều trị',
            keepAlive: false,
          }
        },
        //Tổng kết bệnh án
        {
          path: '/medical-record',
          name: 'medical-record',
          hidden: true,
          component: () => import('@/views/updatePatientNote/typeNoteMedical/medicalRecord/Index.vue'),
          meta: {
            title: 'Tổng kết bệnh án',
            breadcrumbText: 'Tổng kết bệnh án',
            keepAlive: false,
          }
        }
      ]
    },
    // Quản lý ký
    {
      path: '/sign-management',
      name: 'sign-management',
      component: () => import('@/views/signManage/Index.vue'),
      hideChildrenInMenu: false,
      meta: {
        title: 'menu.sign.title',
        icon: 'pencil-art',
        keepAlive: true,
        permission: ['admin'],
        breadcrumbText: 'menu.sign.title'
      }
    },
    // Mượn trả bệnh án
    // {
    //   path: '/borrow-medical-records',
    //   name: 'borrow-medical-records',
    //   component: () => import('@/layouts/RouteView.vue'),
    //   hideChildrenInMenu: false,
    //   meta: {
    //     title: 'menu.borrow.medical-records.title',
    //     icon: 'borrow-medical-records',
    //     keepAlive: true,
    //     permission: ['admin']
    //   },
    // },
    // Quản lý truy vết
    // {
    //   path: '/trace-management',
    //   name: 'trace-management',
    //   component: () => import('@/layouts/RouteView.vue'),
    //   hideChildrenInMenu: false,
    //   meta: {
    //     title: 'menu.trace.title',
    //     icon: 'trace',
    //     keepAlive: true,
    //     permission: ['admin']
    //   }
    // },
    //Danh mục
    {
      path: '/list',
      name: 'list',
      redirect: '/admin/settings/general-setting',
      meta: {
        title: 'Quản lý danh mục',
        keepAlive: false,
        icon: 'list',
        permission: ['admin']
      },
      children: [
        //Danh mục giường
        {
          path: '/bed-list',
          name: 'bed.list',
          component: () => import('@/views/admin/bedList/Index.vue'),
          meta: {
            title: 'menu.bed.list',
            icon: 'bed-list',
            keepAlive: true,
            permission: ['admin'],
            breadcrumbText: 'menu.bed.list'
          }
        },
        //Danh mục phòng
        {
          path: '/room-list',
          name: 'room.list',
          component: () => import('@/views/admin/roomList/Index.vue'),
          meta: {
            title: 'menu.room.list',
            icon: 'room-list',
            keepAlive: true,
            permission: ['admin'],
            breadcrumbText: 'menu.room.list'
          }
        },
        //Bộ câu hỏi
        {
          path: '/question-list',
          name: 'question.list',
          component: () => import('@/views/admin/questionList/Index.vue'),
          meta: {
            title: 'menu.question.list',
            icon: 'question-list',
            keepAlive: true,
            permission: ['admin'],
            breadcrumbText: 'menu.question.list'
          }
        },
        //Dữ liệu HIS
        {
          path: '/HIS-data',
          name: 'HIS.data',
          component: () => import('@/views/admin/HISData/Index.vue'),
          meta: {
            title: 'menu.his.data',
            icon: 'pencil-art',
            keepAlive: true,
            permission: ['admin'],
            breadcrumbText: 'menu.his.data'
          }
        },
        //Danh mục phiếu
        {
          path: '/note-list',
          name: 'note.list',
          component: () => import('@/views/admin/noteList/manageNoteList.vue'),
          meta: {
            title: 'menu.note.list',
            icon: 'borrow-medical-records',
            keepAlive: true,
            permission: ['admin'],
            breadcrumbText: 'menu.note.list'
          }
        },
        //Danh mục khoa
        {
          path: '/department-list',
          name: 'department.list',
          component: () => import('@/views/admin/departmentList/Index.vue'),
          meta: {
            title: 'Danh mục khoa',
            icon: 'department-list',
            keepAlive: true,
            permission: ['admin'],
            breadcrumbText: 'Danh mục khoa'
          }
        },
        //Danh mục tổ chức
        {
          path: '/organization-list',
          name: 'organization.list',
          component: () => import('@/views/admin/organizationList/Index.vue'),
          meta: {
            title: 'menu.organization.list',
            icon: 'organization-list',
            keepAlive: true,
            permission: ['admin'],
            breadcrumbText: 'menu.organization.list'
          }
        },
        //Danh mục nhân viên
        {
          path: '/staff-list',
          name: 'staff.list',
          component: () => import('@/views/admin/staffList/Index.vue'),
          meta: {
            title: 'menu.staff.list',
            icon: 'staff-list',
            keepAlive: true,
            permission: ['admin'],
            breadcrumbText: 'menu.staff.list'
          }
        }
      ]
    },
    {
      path: '/add-note-view',
      name: 'add-note-view',
      hidden: true,
      component: () => import('@/views/admin/noteList/addNote/Index.vue'),
      meta: {
        title: 'Tạo tờ phiếu',
        icon: 'borrow-medical-records',
        keepAlive: true,
        permission: ['admin'],
        breadcrumbText: 'Tạo tờ phiếu'
      }
    },
    {
      path: '/test',
      name: 'test',
      hidden: true,
      component: () => import('@/views/test/Index.vue'),
      meta: {
        title: 'Tạo tờ phiếu',
        icon: 'borrow-medical-records',
        keepAlive: true,
        permission: ['admin'],
        breadcrumbText: 'Tạo tờ phiếu'
      }
    },
    //Danh mục giường
    // {
    //   path: '/bed-list',
    //   name: 'bed-list',
    //   component: () => import('@/views/admin/bedList/Index.vue'),
    //   hideChildrenInMenu: false,
    //   meta: {
    //     title: 'Danh mục giường',
    //     icon: 'medication',
    //     keepAlive: true,
    //     permission: ['admin']
    //   }
    // },
    //Bộ câu hỏi
    // {
    //   path: '/question-list',
    //   name: 'question-list',
    //   component: () => import('@/views/admin/questionList/Index.vue'),
    //   hideChildrenInMenu: false,
    //   meta: {
    //     title: 'Bộ câu hỏi',
    //     icon: 'technical-services',
    //     keepAlive: true,
    //     permission: ['admin']
    //   }
    // },
    //Dữ liệu HIS
    // {
    //   path: '/HIS-data',
    //   name: 'HIS-data',
    //   component: () => import('@/views/admin/HISData/Index.vue'),
    //   hideChildrenInMenu: false,
    //   meta: {
    //     title: 'Dữ liệu HIS',
    //     icon: 'pencil-art',
    //     keepAlive: true,
    //     permission: ['admin']
    //   }
    // },
    //Danh mục phiếu
    // {
    //   path: '/note-list',
    //   name: 'note-list',
    //   component: () => import('@/views/admin/noteList/Index.vue'),
    //   hideChildrenInMenu: false,
    //   meta: {
    //     title: 'Danh mục phiếu',
    //     icon: 'borrow-medical-records',
    //     keepAlive: true,
    //     permission: ['admin']
    //   }
    // },
    // Thông tin tài khoản
    {
      path: '/account/change-password',
      name: 'account.change_password',
      component: () => import('@/views/accountInfo/changePassword.vue'),
      hidden: true
    },

    // Xác thực 2 yếu tố
    {
      path: '/account/register-two-factor-authentication',
      name: 'account.register_two_factor_authentication',
      component: () => import('@/views/user/RegisterTwoFactorAuthenticator.vue'),
      hidden: true
    },

    // Hủy xác thực 2 yếu tố
    {
      path: '/account/cancel-two-factor-authentication',
      name: 'account.cancel_two_factor_authentication',
      component: () => import('@/views/user/CancelTwoFactorAuthenticator.vue'),
      hidden: true
    }
  ]
}
export const systemRouter: Router = {
  path: '/',
  name: 'system',
  redirect: '/dashboard/analysis',
  component: () => import('@/layouts/BasicLayout.vue'),
  meta: {
    title: 'menu.home',
    subsystem: {
      key: 'system',
      text: 'Quản trị hệ thống'
    }
  },
  children: [
    {
      path: '/dashboard/analysis',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        title: 'menu.dashboard.title',
        icon: 'home',
        keepAlive: false,
        permission: ['admin']
      }
    },
    {
      path: '/global-list',
      name: 'global-list',
      component: () => import('@/layouts/RouteView.vue'),
      hideChildrenInMenu: false,
      meta: {
        title: 'menu.patient-list.title',
        icon: 'user',
        keepAlive: true,
        permission: ['admin']
      }
    }
  ]
}
