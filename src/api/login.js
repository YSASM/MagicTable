import request from '@/utils/request'

export async function login(data) {
  return request({
    url: '/admin/login',
    method: 'post',
    data,
  })
}