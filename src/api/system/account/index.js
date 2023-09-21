import request from '@/utils/request'

export default {
  async getAccountList(params) {
    return request({
      url: '/admin/account',
      method: 'get',
      params,
    })
  },
  async editorAccountList(data) {
    return request({
      url: '/admin/account',
      method: 'put',
      data,
    })
  },
  async addAccountList(data) {
    return request({
      url: '/admin/account',
      method: 'post',
      data,
    })
  },
  async delAccountList(params) {
    return request({
      url: '/admin/account',
      method: 'delete',
      params,
    })
  }
}