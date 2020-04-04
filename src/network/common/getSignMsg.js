import { request } from '../request'

export function getSignMsg(data) {
  return request({
    url: '/user/getSignMsg.php',
    params: {
      username: data
    }
  })
}

export function delSignMsg(id) {
  return request({
    url: '/user/delSign.php',
    params: {
      id: id
    }
  })
}