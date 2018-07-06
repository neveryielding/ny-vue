import request from '@/utils/request'

export function loginByUsername(username, password) {
  const param = {
    username: username,
    password: password,
    client: 'frontend'
  }
  return request({
    url: '/auth/login',
    method: 'post',
    data: param
  })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo() {
  return request({
    url: '/admin/api/sysUser/noPermission/userInfo',
    method: 'get'
  })
}

