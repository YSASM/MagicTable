import { requests } from '@/api/default'

export default {
  async getGoodsList(params) {
    return requests({
      url: '/admin/goods',
      method: 'get',
    })(params)
  },
  async editorGoodsList(params) {
    return requests({
      url: '/admin/goods',
      method: 'put',
    })(params)
  },
  async addGoodsList(params) {
    return requests({
      url: '/admin/goods',
      method: 'post',
    })(params)
  },
  async delGoodsList(params) {
    return requests({
      url: '/admin/goods',
      method: 'delete',
    })(params)
  }
}

