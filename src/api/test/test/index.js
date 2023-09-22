let items = [
  {
    id: 1,
    name: 'test1',
    status: 1,
    config: {
      xxx: 1,
      xxxx: 2
    }
  },
  {
    id: 2,
    name: 'test2',
    status: 2,
    config: {
      yyy: 1,
      yyyy: 2
    }
  }
]

export default {
  async getList(params) {
    console.log('getList', params)
    return {
      code: 0,
      data: {
        total: items.length,
        items: items
      }
    }
  },
  async editorList(data) {
    console.log('editorList', data)
    if (data.name) { items[data.id - 1].name = data.name }
    if (data.status) { items[data.id - 1].status = data.status }
    if (data.config) { items[data.id - 1].config = JSON.parse(JSON.stringify(data.config)) }
    return {
      code: 0,
      message: 'OK'
    }
  },
  async addList(data) {
    items.push({
      id: items.length + 1,
      name: data.name
    })
    return {
      code: 0,
      message: 'OK'
    }
  },
  async delList(data) {
    let temp = []
    items.forEach(i => {
      if (i.id != data.id) {
        temp.push(i)
      }
    })
    items = temp
    return {
      code: 0,
      message: 'OK'
    }
  }
}

