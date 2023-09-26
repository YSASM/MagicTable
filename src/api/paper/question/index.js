import request from '@/utils/request'

export default {
  async getPaperQuestionList(params) {
    return request({
      url: '/admin/info',
      method: 'get',
      params,
    })
  },
  async editorPaperQuestionList(params) {
    return request({
      url: '/admin/info',
      method: 'put',
      params,
    })
  },
  async addPaperQuestionList(params) {
    return request({
      url: '/admin/info',
      method: 'post',
      params,
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

