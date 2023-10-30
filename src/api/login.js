import request from '@/utils/request'

export async function login(data) {
  return {
    code: 0,
    message: "OK",
    data: {
      token: "12345",
      username: "ysasm"
    }
  }
}