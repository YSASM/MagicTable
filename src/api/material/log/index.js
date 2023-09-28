import { requests } from '@/api/default'

export default {
  async getLogList(params) {
    return requests({
      url: '/admin/material/log',
      method: 'get',
    })(params)
  }
}

