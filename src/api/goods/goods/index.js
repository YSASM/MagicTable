import request from '@/utils/request'

export default {
  async getGoodsList(params) {
    return request({
      url: '/admin/goods',
      method: 'get',
      params,
    })
  },
  async editorGoodsList(params) {
    return request({
      url: '/admin/goods',
      method: 'put',
      params,
    })
  },
  async addGoodsList(params) {
    return request({
      url: '/admin/goods',
      method: 'post',
      params,
    })
  },
  async delGoodsList(params) {
    return request({
      url: '/admin/goods',
      method: 'delete',
      params,
    })
  }
}

