import request from '@/utils/request'

export default {
  async getSpecialTree(params) {
    return request({
      url: '/admin/special/tree',
      method: 'get',
      params,
    })
  },
}

