class JWTService {
  static getToken() {
    return window.localStorage.getItem('token')
  }
  static setToken(token) {
    window.localStorage.setItem('token', token)
  }
  static removeToken() {
    window.localStorage.removeItem('token')
  }
}

export { JWTService }