import { requests } from '@/api/default'

export default {
  async getConfigList(params) {
    return requests({
      url: '/admin/material/config',
      method: 'get',
    })(params)
  },
  async addConfigList(params) {
    return requests({
      url: '/admin/material/config',
      method: 'post',
    })(params)
  },
  async editorConfigList(params) {
    return requests({
      url: '/admin/material/config',
      method: 'put',
    })(params)
  },
  async delConfigList(params) {
    return requests({
      url: '/admin/material/config',
      method: 'delete',
    })(params)
  },
}

