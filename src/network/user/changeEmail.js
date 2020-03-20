import { request } from '../request'

export function changeEmail(username, email) {
  return request({
    url: '/user/changeEmail.php',
    params: {
      username,
      email
    }
  })
}