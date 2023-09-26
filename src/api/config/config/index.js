import request from '@/utils/request'
import utils from '@/utils'

export default {
  async getConfigList(params) {
    return request({
      url: '/admin/config',
      method: 'get',
      params,
    })
  },
  async editorConfigList(params) {
    if (params.white_list && typeof (params.white_list) != 'string') {
      params.white_list = utils.arrToStr(params.white_list)
    }
    return request({
      url: '/admin/config',
      method: 'put',
      params,
    })
  },
  async addConfigList(params) {
    return request({
      url: '/admin/config',
      method: 'post',
      params,
    })
  },
  async delConfigList(params) {
    return request({
      url: '/admin/config',
      method: 'delete',
      params,
    })
  }
}

