import request from '@/utils/request'

export default {
  async getAccountList(params) {
    return request({
      url: '/admin/account',
      method: 'get',
      params,
    })
  },
  async editorAccountList(params) {
    return request({
      url: '/admin/account',
      method: 'put',
      params,
    })
  },
  async addAccountList(params) {
    return request({
      url: '/admin/account',
      method: 'post',
      params,
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