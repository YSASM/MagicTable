import { requests } from '@/api/default'

export default {
  async getPaperGradeList(params) {
    return requests({
      url: '/admin/paper/grade',
      method: 'get',
    })(params)
  },
  async editorPaperGradeList(params) {
    return requests({
      url: '/admin/paper/grade',
      method: 'put',
    })(params)
  },
  async addPaperGradeList(params) {
    return requests({
      url: '/admin/paper/grade',
      method: 'post',
    })(params)
  },
  async delPaperGradeList(params) {
    return requests({
      url: '/admin/paper/grade',
      method: 'delete',
    })(params)
  }
}

