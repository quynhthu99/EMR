import config from '@/config/defaultSettings'
import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import { setupBeforeEach, setupAfterEach } from './routerGuards'
import generateAsyncRoutes from './generateAsyncRoutes'
import routes from './commonRoutes'

const router = createRouter({
  history: createWebHistory(),
  routes: routes as unknown as RouteRecordRaw[]
})

setupBeforeEach(router)

setupAfterEach(router)

if (config.useAsyncRouter) {
  generateAsyncRoutes(router)
}

export default router
