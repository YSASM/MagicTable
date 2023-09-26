import request from '@/utils/request'

export default {
  async getUserList(params) {
    return request({
      url: '/admin/user',
      method: 'get',
      params,
    })
  },
  async editorUserList(params) {
    return request({
      url: '/admin/user',
      method: 'put',
      params,
    })
  }
}

