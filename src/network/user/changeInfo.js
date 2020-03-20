import { request } from '../request'
import qs from 'qs'

export function changeInfo(formData) {
  const data = qs.stringify({
    username: formData.username,
    name: formData.name,
    sex: formData.sex,
    age: formData.age,
    tel: formData.tel,
    level: formData.level,
  });
  return request({
    url: '/user/changeInfo.php',
    data: data,
    method: 'post'
  })
}