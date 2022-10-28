import cloneDeep from 'lodash.clonedeep'
import i18n from '@/locales/useI18n'
import ls from '@/utils/Storage'
import { BasicLayout, RouteView, BlankLayout } from '@/layouts' //, BlankLayout, PageView, RouteView
import { getRoutePages } from '@/utils/batchImportFiles'
import { MENU_NAV } from '@/store/mutation-types'

const constantRouterComponents: { [x: string]: any } = {
  BasicLayout: () => import('@/layouts/BasicLayout.vue'),
  BlankLayout,
  RouteView,
  // PageView,
  ...getRoutePages()
}

export const rootRouter: any = {
  key: '',
  name: 'index',
  path: '/',
  component: BasicLayout,
  redirect: '\n' + 'Hiện tại logic là chuyển hướng đến menu đầu tiên',
  meta: {
    title: 'user.login.login'
  },
  children: []
}

const generateAsyncRoutes = (router, menu?: Array<unknown>) => {
  let menuNav: Array<any> = []
  const childrenNav: Array<unknown> = []
  const menuData = ls.get(MENU_NAV)
  if (!menuData && !menu) return
  if (menuData) {
    menuNav = menuData
  } else {
    listToTree(menu, childrenNav, 0)
    rootRouter.children = childrenNav
    menuNav.push(rootRouter)
    menuNav[0].redirect = '/' + menuNav?.[0]?.children[0]?.key
    ls.set(MENU_NAV, menuNav)
  }
  const routers = menuToRouter(menuNav)
  console.log(routers)
  router.addRoute(routers[0])
}

export const menuToRouter = (routerMap, parent?) => {
  return routerMap.map((item) => {
    const { title, show, hideChildren, hiddenHeaderContent, target, icon } = item.meta || {}
    const currentRouter: any = {
      path: item.path || `${(parent && parent.path) || ''}/${item.key}`,
      name: item.name || item.key || '',
      component:
        constantRouterComponents[item.component || item.key] || constantRouterComponents['404'],
      meta: {
        title: i18n.global.t(title),
        icon: icon || undefined,
        hiddenHeaderContent,
        target,
        permission: item.meta.permission
      }
    }

    if (show === false) {
      currentRouter.hidden = true
    }
    if (hideChildren) {
      currentRouter.hideChildrenInMenu = true
    }
    if (!currentRouter.path.startsWith('http')) {
      currentRouter.path = currentRouter.path.replace('//', '/')
    }
    item.redirect && (currentRouter.redirect = item.redirect)
    if (item.children && item.children.length > 0) {
      // Recursion
      currentRouter.children = menuToRouter(item.children, currentRouter)
    }
    return currentRouter
  })
}

export const listToTree = (list, tree, parentId) => {
  list.forEach((item) => {
    if (item.parentId === parentId) {
      const child = {
        ...item,
        key: item.key || item.name,
        children: []
      }
      listToTree(list, child.children, item.id)
      if (child.children.length <= 0) {
        delete child.children
      }
      tree.push(child)
    }
  })
}

export default generateAsyncRoutes

export function convertRoutes(nodes) {
  if (!nodes) return null
  nodes = cloneDeep(nodes)
  let queue = Array.isArray(nodes) ? nodes.concat() : [nodes]
  while (queue.length) {
    const levelSize = queue.length
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()
      if (!node.children || !node.children.length) continue
      node.children.forEach((child) => {
        if (
          child &&
          child.path &&
          child.path.length &&
          child.path[0] !== '/' &&
          !child.path.startsWith('http')
        ) {
          child.path = node.path.replace(/(\w*)[/]*$/, `$1/${child.path}`)
        }
      })
      queue = queue.concat(node.children)
    }
  }
  return nodes
}
