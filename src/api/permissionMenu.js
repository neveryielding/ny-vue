import request from '@/utils/request'

export function noRelation(query) {
  return request({
    url: '/admin/api/sysPermission/permissionNoRelationMenuTree',
    method: 'get',
    params: query
  })
}

export function relation(query) {
  return request({
    url: '/admin/api/sysPermission/permissionMenuTree',
    method: 'get',
    params: query
  })
}

export function batchSave(params) {
  return request({
    url: '/admin/api/sysPermission/batchMenuAdd',
    method: 'post',
    data: params
  })
}

export function batchDelete(params) {
  return request({
    url: '/admin/api/sysPermission/batchMenuDelete',
    method: 'post',
    data: params
  })
}
