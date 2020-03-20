import { request } from '../request'
import qs from 'qs'

// 账号查重
export function reCheckUsername(username) {
  return request({
    url: '/user/reCheck.php',
    params: {
      username
    }
  })
}

// 昵称查重
export function reCheckName(name) {
  return request({
    url: '/user/reCheck.php',
    params: {
      name
    }
  })
}

// 用户注册
export function register(formData) {
  const data = qs.stringify({
    username: formData.username,
    password: formData.pass,
    email: formData.email,
    name: formData.name,
    sex: formData.sex,
    age: formData.age,
    tel: formData.tel,
    level: formData.level,
  });
  return request({
    url: '/user/register.php',
    data: data,
    method: 'post'
  })
}