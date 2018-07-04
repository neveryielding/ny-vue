import request from '@/utils/request'

export function loginByUsername(username, password) {
  const data = {
    username: username,
    password: password,
    grant_type: 'password',
    client: 'frontend'
  }
  return request({
    url: '/login/oauth/token',
    method: 'post',
    params: data,
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    auth: {
      username: 'frontend',
      password: 'frontend'
    }
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

