import request from '@/utils/request'

const url = '/admin/api/sysPermission'

export function fetchList(query) {
  return request({
    url: url,
    method: 'get',
    params: query
  })
}

export function crud(method, params) {
  const methods = ['get', 'delete']
  const key = methods.includes(method) ? 'params' : 'data'
  return request({
    url: url,
    method: method,
    [key]: params
  })
}

export function checkExist(query) {
  return request({
    url: '/admin/api/sysPermission/exist',
    method: 'GET',
    params: query
  })
}
