const TokenKey = 'Authorization'

export function getToken() {
  return localStorage.getItem(TokenKey)
}

export function setToken(token) {
  return localStorage.setItem(TokenKey, 'bearer' + token)
}

export function removeToken() {
  return localStorage.removeItem(TokenKey)
}
