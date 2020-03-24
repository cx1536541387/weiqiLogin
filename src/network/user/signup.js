import { request } from '../request'
import qs from 'qs'
// 用户报名
export function gameSignUp(formData) {
  const data = qs.stringify({
    username: formData.username,
    gname: formData.gname,
    gtime: formData.gtime,
    gplace: formData.gplace,
  });
  return request({
    url: '/user/signUp.php',
    data: data,
    method: 'post'
  })
}