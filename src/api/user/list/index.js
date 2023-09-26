import { requests } from '@/api/default'

export default {
  async getUserList(params) {
    return requests({
      url: '/admin/user',
      method: 'get',
    })(params)
  },
  async editorUserList(params) {
    return requests({
      url: '/admin/user',
      method: 'put',
    })(params)
  }
}

