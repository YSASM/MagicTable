import request from '@/utils/request'

export default {
  async getPaperGradeList(params) {
    return request({
      url: '/admin/paper/grade',
      method: 'get',
      params,
    })
  },
  async editorPaperGradeList(data) {
    return request({
      url: '/admin/paper/grade',
      method: 'put',
      data,
    })
  },
  async addPaperGradeList(data) {
    return request({
      url: '/admin/paper/grade',
      method: 'post',
      data,
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

