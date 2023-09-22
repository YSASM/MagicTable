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
  async editorConfigList(data) {
    if (data.white_list && typeof (data.white_list) != 'string') {
      data.white_list = utils.arrToStr(data.white_list)
    }
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
  },
  async delConfigList(params) {
    return request({
      url: '/admin/config',
      method: 'delete',
      params,
    })
  }
}

