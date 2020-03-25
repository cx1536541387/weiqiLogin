import { request } from '../request'

export function getGrade(gname) {
  return request({
    url: '/manage/getGrade.php',
    params: {
      gname
    }
  })
}

export function searchName(name) {
  return request({
    url: '/manage/searchName.php',
    params: {
      name
    }
  })
}

export function getGname() {
  return request({
    url: '/manage/getGradeGname.php',
  })
}

export function changeRank() {
  return request({
    url: '/manage/changeGrade.php',
  })
}