import request from '@/utils/request'

const url = '/admin/api/sysUserGroup'

export function fetchList(query) {
  return request({
    url: url,
    method: 'get',
    params: query
  })
}