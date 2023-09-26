import request from '@/utils/request'

export default {
  async getPaperPaperList(params) {
    return request({
      url: '/admin/paper',
      method: 'get',
      params,
    })
  },
  async editorPaperPaperList(params) {
    return request({
      url: '/admin/paper',
      method: 'put',
      params,
    })
  },
  async addPaperPaperList(params) {
    return request({
      url: '/admin/paper',
      method: 'post',
      params,
    })
  },
  async delPaperPaperList(params) {
    return request({
      url: '/admin/paper',
      method: 'delete',
      params,
    })
  }
}

