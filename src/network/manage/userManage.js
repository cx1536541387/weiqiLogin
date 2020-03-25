import { request } from '../request'

export function getUser() {
  return request({
    url: '/manage/getUser.php',
  })
}

export function searchUsername(username) {
  return request({
    url: '/manage/userManage.php',
    params: {
      username
    }
  })
}
export function searchName(name) {
  return request({
    url: '/manage/userManage.php',
    params: {
      name
    }
  })
}
export function searchLevel(level) {
  return request({
    url: '/manage/userManage.php',
    params: {
      level
    }
  })
}

export function delUser(id) {
  return request({
    url: '/manage/userManage.php',
    params: {
      id
    }
  })
}