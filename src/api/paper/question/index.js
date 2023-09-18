import request from '@/utils/request'

export default {
  async getPaperQuestionList(params) {
    return request({
      url: '/admin/info',
      method: 'get',
      params,
    })
  },
  async editorPaperQuestionList(data) {
    return request({
      url: '/admin/info',
      method: 'put',
      data,
    })
  },
  async addPaperQuestionList(data) {
    return request({
      url: '/admin/info',
      method: 'post',
      data,
    })
  },
  async delPaperQuestionList(params) {
    return request({
      url: '/admin/info',
      method: 'delete',
      params,
    })
  }
}

