import request from '@/utils/request'

export function requests(info) {
  let { method, url } = info
  if (method == 'get' || method == 'delete') {
    return async (params) => {
      return request({
        url: url,
        method: method,
        params: params,
      })
    }
  } else {
    return async (data) => {
      return request({
        url: url,
        method: method,
        data: data,
      })
    }
  }
}