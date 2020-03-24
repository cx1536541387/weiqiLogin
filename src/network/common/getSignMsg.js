import { request } from '../request'

export function getSignMsg(data) {
  return request({
    url: '/user/getSignMsg.php',
    params: {
      username: data
    }
  })
}