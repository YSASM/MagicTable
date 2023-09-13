import request from '@/utils/request'

export default {
  async getGoodsList(params) {
    return request({
      url: '/admin/goods',
      method: 'get',
      params,
    })
  },
  async editorGoodsList(data) {
    return request({
      url: '/admin/goods',
      method: 'put',
      data,
    })
  },
  async addGoodsList(data) {
    return request({
      url: '/admin/goods',
      method: 'post',
      data,
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

