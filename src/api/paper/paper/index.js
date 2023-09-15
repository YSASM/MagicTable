import request from '@/utils/request'

export default {
  async getPaperPaperList(params) {
    return request({
      url: '/admin/paper',
      method: 'get',
      params,
    })
  },
  async editorPaperPaperList(data) {
    return request({
      url: '/admin/paper',
      method: 'put',
      data,
    })
  },
  async addPaperPaperList(data) {
    return request({
      url: '/admin/paper',
      method: 'post',
      data,
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

