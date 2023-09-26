import { requests } from '@/api/default'
export default {
  async getAccountList(params) {
    return requests({
      url: '/admin/account',
      method: 'get',
    })(params)
  },
  async editorAccountList(params) {
    return requests({
      url: '/admin/account',
      method: 'put',
    })(params)
  },
  async addAccountList(params) {
    return requests({
      url: '/admin/account',
      method: 'post',
    })(params)
  },
  async delAccountList(params) {
    return requests({
      url: '/admin/account',
      method: 'delete',
    })(params)
  }
}