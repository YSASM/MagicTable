import { requests } from '@/api/default'

export default {
  async getUserEventList(params) {
    return requests({
      url: '/admin/user/event',
      method: 'get',
    })(params)
  },
  async editorUserEventList(params) {
    return requests({
      url: '/admin/user/event',
      method: 'put',
    })(params)
  }
}

