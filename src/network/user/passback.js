import { request } from '../request'

// 账号邮箱匹配验证
export function reCheckEmail(username, email) {
  return request({
    url: '/user/reCheckEmail.php',
    params: {
      username,
      email
    }
  })
}

export function changePass(username, pass) {
  return request({
    url: '/user/passBack.php',
    params: {
      username,
      pass
    }
  })
}