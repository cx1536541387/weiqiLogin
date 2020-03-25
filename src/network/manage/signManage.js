import { request } from '../request'

export function getSign() {
  return request({
    url: '/manage/getSign.php',
  })
}

export function getGname() {
  return request({
    url: '/manage/getGname.php',
  })
}

export function getNopay() {
  return request({
    url: '/manage/getSign.php',
    params: {
      ispay: '0'
    }
  })
}

export function searchUsername(username) {
  return request({
    url: '/manage/getSign.php',
    params: {
      username
    }
  })
}

export function searchGname(gname) {
  return request({
    url: '/manage/getSign.php',
    params: {
      gname
    }
  })
}

export function sign(uid, gname) {
  return request({
    url: '/manage/signUp.php',
    params: {
      uid,
      gname
    }
  })
}