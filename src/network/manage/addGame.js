import { request } from '../request'
import qs from 'qs'

export function checkGname(gname) {
  return request({
    url: '/manage/checkGname.php',
    params: {
      gname
    }
  })
}

export function addGame(formData) {
  const data = qs.stringify({
    gname: formData.gname,
    btime1: formData.btime1,
    btime2: formData.btime2,
    pay: formData.pay,
    glevel: formData.glevel,
    glevel2: formData.glevel2,
    gtime: formData.gtime,
    gplace: formData.gplace,
    gtype: formData.gtype,
  });
  return request({
    url: '/manage/addGame.php',
    data: data,
    method: 'post'
  })
}