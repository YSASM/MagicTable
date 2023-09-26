import request from '@/utils/request'

export default {
  async getBillList(params) {
    return request({
      url: '/admin/order',
      method: 'get',
      params,
    })
  },
  async billRefund(params) {
    return request({
      url: '/admin/order/refund',
      method: 'post',
      params,
    })
  },
}

