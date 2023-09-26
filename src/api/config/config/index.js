import { requests } from '@/api/default'

export default {
  async getConfigList(params) {
    return requests({
      url: '/admin/config',
      method: 'get',
    })(params)
  },
  async editorConfigList(params) {
    return requests({
      url: '/admin/config',
      method: 'put',
    })(params)
  },
  async addConfigList(params) {
    return requests({
      url: '/admin/config',
      method: 'post',
    })(params)
  },
  async delConfigList(params) {
    return requests({
      url: '/admin/config',
      method: 'delete',
    })(params)
  }
}

