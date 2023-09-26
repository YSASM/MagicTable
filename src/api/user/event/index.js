import request from '@/utils/request'

export default {
  async getUserEventList(params) {
    return request({
      url: '/admin/user/event',
      method: 'get',
      params,
    })
  },
  async editorUserEventList(params) {
    return request({
      url: '/admin/user/event',
      method: 'put',
      params,
    })
  }
}

