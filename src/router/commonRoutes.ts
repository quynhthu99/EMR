// import { UserLayout } from '@/layouts'
import AuthLayout from '@/views/user/AuthLayout.vue'
import { Router } from './types'
import { vaRouter, systemRouter } from './router.config'

export default [
  vaRouter,
  systemRouter,
  {
    path: '/user',
    name: 'user',
    component: AuthLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login.vue'),
        meta: { title: 'user.login.login' }
      },
      {
        path: 're-login',
        name: 're_login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/ReLogin.vue'),
        meta: { title: 'user.login.login' }
      },
      {
        path: 'forgot-password',
        name: 'forgot_password',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/ForgotPassword.vue'),
        meta: { title: 'user.forgot.password.title' }
      },
      {
        path: 'forgot-password/confirm',
        name: 'forgot_password.confirm',
        component: () =>
          import(/* webpackChunkName: "user" */ '@/views/user/ForgotPasswordConfirm.vue'),
        meta: { title: 'user.forgot.password.confirm_title' }
      },
      {
        path: 'forgot-password/set-new-password',
        name: 'forgot_password.set_new_password',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/SetNewPassword.vue'),
        meta: { title: 'user.forgot.password.set_new_password_title' }
      },
      {
        path: 'registerResult',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult.vue')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },
  {
    path: '/user/active-account',
    name: 'active_account',
    hidden: true,
    component: () => import('@/views/user/ActiveAccount.vue'),
    meta: { title: 'user.account.active_account.title' }
  },
  {
    path: '/:path(.*)',
    name: 'NoMatch',
    component: () => import('@/views/exception/404.vue')
  }
] as Router[]
