import request from '@/utils/request'

export default {
  async getPaperGradeList(params) {
    return request({
      url: '/admin/paper/grade',
      method: 'get',
      params,
    })
  },
  async editorPaperGradeList(params) {
    return request({
      url: '/admin/paper/grade',
      method: 'put',
      params,
    })
  },
  async addPaperGradeList(params) {
    return request({
      url: '/admin/paper/grade',
      method: 'post',
      params,
    })
  },
  async delPaperGradeList(params) {
    return request({
      url: '/admin/paper/grade',
      method: 'delete',
      params,
    })
  }
}

