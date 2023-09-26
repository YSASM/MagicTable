import { requests } from '@/api/default'
export default {
  async getPaperQuestionList(params) {
    return requests({
      url: '/admin/info',
      method: 'get',
    })(params)
  },
  async editorPaperQuestionList(params) {
    return requests({
      url: '/admin/info',
      method: 'put',
    })(params)
  },
  async addPaperQuestionList(params) {
    return requests({
      url: '/admin/info',
      method: 'post',
    })(params)
  },
  async delPaperQuestionList(params) {
    return requests({
      url: '/admin/info',
      method: 'delete',
    })(params)
  }
}

