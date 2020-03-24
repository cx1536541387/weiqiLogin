import { request } from '../request'

export function getYule() {
  return request({
    url: '/getGameMsg.php',
    params: {
      type: '0'
    }
  })
}

export function getDuanwei() {
  return request({
    url: '/getGameMsg.php',
    params: {
      type: '1'
    }
  })
}