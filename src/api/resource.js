import request from '@/utils/request'

const url = '/admin/api/sysResource'

export function fetchList(query) {
  return request({
    url: url,
    method: 'get',
    params: query
  })
}

export function fetchInfo(query) {
  return request({
    url: url + '/info',
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
    url: '/admin/api/sysResource/exist',
    method: 'GET',
    params: query
  })
}

export function checkNameExist(query) {
  return request({
    url: '/admin/api/sysResource/nameExist',
    method: 'GET',
    params: query
  })
}

export function checkUrlExist(query) {
  return request({
    url: '/admin/api/sysResource/urlExist',
    method: 'GET',
    params: query
  })
}

