import request from '@/utils/request'

export function noRelation(query) {
  return request({
    url: '/admin/api/sysUserRole/userNoRelationRoleList',
    method: 'get',
    params: query
  })
}

export function relation(query) {
  return request({
    url: '/admin/api/sysUserRole/userRoleList',
    method: 'get',
    params: query
  })
}

export function batchSave(params) {
  return request({
    url: '/admin/api/sysUserRole/batchSave',
    method: 'post',
    data: params
  })
}

export function batchDelete(params) {
  return request({
    url: '/admin/api/sysUserRole/batchDelete',
    method: 'post',
    data: params
  })
}
