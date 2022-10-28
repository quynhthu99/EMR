export function hasPermission(permission, route) {
  if (route.meta && route.meta.permission && permission && Array.isArray(permission)) {
    return (
      route.meta.permission &&
      Array.isArray(route.meta.permission) &&
      route.meta.permission.some((s) => permission.includes(s))
    )
  }
  return true
}

export function hasRole(permission, route) {
  if (route.meta && route.meta.permission) {
    return route.meta.permission.includes(permission.id)
  } else {
    return true
  }
}

export function filterRouterPermission(routerMap, permission) {
  return routerMap.filter((route) => {
    if (hasPermission(permission, route)) {
      if (route.children && route.children.length) {
        route.children = filterRouterPermission(route.children, permission)
      }
      return true
    }
    return false
  })
}
