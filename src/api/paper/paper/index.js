import { requests } from '@/api/default'

export default {
  async getPaperPaperList(params) {
    return requests({
      url: '/admin/paper',
      method: 'get',
    })(params)
  },
  async editorPaperPaperList(params) {
    return requests({
      url: '/admin/paper',
      method: 'put',
    })(params)
  },
  async addPaperPaperList(params) {
    return requests({
      url: '/admin/paper',
      method: 'post',
    })(params)
  },
  async delPaperPaperList(params) {
    return requests({
      url: '/admin/paper',
      method: 'delete',
    })(params)
  }
}

