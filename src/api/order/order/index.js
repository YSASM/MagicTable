import { requests } from '@/api/default'

export default {
  async getBillList(params) {
    return requests({
      url: '/admin/order',
      method: 'get',
    })(params)
  },
  async billRefund(params) {
    return requests({
      url: '/admin/order/refund',
      method: 'post',
    })(params)
  },
}

