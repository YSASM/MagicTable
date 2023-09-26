import { requests } from '@/api/default'

export default {
  async getSpecialTree(params) {
    return requests({
      url: '/admin/special/tree',
      method: 'get',
    })(params)
  },
}

