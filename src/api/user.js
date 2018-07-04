import request from '@/utils/request'

export function fetchUserMenuTree(query) {
  return request({
    url: '/admin/api/sysUser/noPermission/userMenuTree',
    method: 'get',
    params: query
  })
}

export function checkUserNameIsExist(query) {
  return request({
    url: '/admin/api/sysUser/noPermission/checkUserNameIsExist',
    method: 'GET',
    params: query
  })
}

export function fetchRoleNoExistUsers(query) {
  return request({
    url: '/admin/api/sysUser/roleNoExistUsers',
    method: 'GET',
    params: query
  })
}

export function fetchRoleUsers(query) {
  return request({
    url: '/admin/api/sysUser/roleUsers',
    method: 'GET',
    params: query
  })
}
