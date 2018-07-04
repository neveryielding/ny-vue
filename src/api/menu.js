import request from '@/utils/request'

export function fetchMenuTree(query) {
  return request({
    url: '/admin/api/sysMenu/tree',
    method: 'get',
    params: query
  })
}

export function curdMenu(method, params) {
  const methods = ['get', 'delete']
  const key = methods.includes(method) ? 'params' : 'data'
  if (methods.indexOf(method) >= 0) {
    return request({
      url: '/admin/api/sysMenu',
      method: method
    })
  } else {
    return request({
      url: '/admin/api/sysMenu',
      method: method,
      [key]: params
    })
  }
}

export function fetchPermissionNoExistMenus(query) {
  return request({
    url: '/admin/api/sysMenu/permissionNoExistMenus',
    method: 'GET',
    params: query
  })
}

export function fetchPermissionMenus(query) {
  return request({
    url: '/admin/api/sysMenu/permissionMenus',
    method: 'GET',
    params: query
  })
}

export function checkIsExist(params) {
  return request({
    url: '/admin/api/sysMenu/noPermission/exist',
    method: 'GET',
    params: params
  })
}
