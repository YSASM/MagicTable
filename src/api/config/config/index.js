import request from '@/utils/request'

export default {
  async getConfigList(params) {
    return request({
      url: '/admin/config',
      method: 'get',
      params,
    })
  },
  async editorConfigList(data) {
    return request({
      url: '/admin/config',
      method: 'put',
      data,
    })
  },
  async addConfigList(data) {
    return request({
      url: '/admin/config',
      method: 'post',
      data,
    })
  }
}

