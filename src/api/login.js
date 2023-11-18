import { requests } from '@/api/default'

export async function login(data) {
  return {
    code: 0,
    message: "OK",
    data: {
      token: "12345",
      username: "ysasm"
    }
  }
  // return requests({
  //   url: '/xxx',
  //   method: 'post',
  // })(data)
}