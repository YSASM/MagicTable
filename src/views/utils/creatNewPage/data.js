import _this from "@/main.js"
let data = {
  tableData: {
    scrollWidth: 1500,
    pageSizeOption: [20, 50, 100, 200],
    tableData: [],
    fetchFun: {
      url: '/admin/config',
      method: 'get'
    },
    subfromFunDel: {
      url: '/admin/config',
      method: 'delete'
    },
    fliterOption: [
      {
        name: 'ID',
        key: 'id',
        type: "input"
      },
    ],
    fliter: {
      page: 1,
      size: 20,
    },
    columns: [
      { field: "id", key: "id", title: "ID", align: "center", width: 20, sortBy: "", fixed: "left", },
      {
        field: "utils", key: "utils", title: "utils", align: "center", width: 50, sortBy: "", fixed: "left", buttons: [
          {
            name: '新建',
            type: 'formButton',
            buttonTypeOpt: {
              name: 'status',
              value: '1',
              type: 'success',
            },
            fromData: [
              {
                name: '配置名称',
                key: 'name',
                type: 'input',
                must: true
              },
              {
                name: '配置描述',
                key: 'desc',
                type: 'input',
                must: true
              },
              {
                name: '生效渠道',
                key: 'channel',
                type: 'input',
              },
              {
                name: '生效版本',
                key: 'version',
                type: 'input',
              },
              {
                name: '配置层数',
                key: 'layer',
                type: 'input',
                must: true,
                rule: {
                  onlyNum: true,
                  minNum: 1,
                  maxNum: 10
                },
                tips: "1-10的数字"
              },
              {
                name: '开始桶号',
                key: 'start_bucket',
                type: 'input',
                must: true,
                rule: {
                  onlyNum: true,
                  minNum: 1,
                  maxNum: 'end_bucket'
                },
                tips: '0-100的数字'
              },
              {
                name: '结束桶号',
                key: 'end_bucket',
                type: 'input',
                must: true,
                rule: {
                  onlyNum: true,
                  minNum: 'start_bucket',
                  maxNum: 100
                },
                tips: '0-100的数字'
              },
              {
                name: '用户平台',
                key: 'platform',
                type: "select",
                items: [
                  {
                    name: '全部平台',
                    key: ''
                  },
                  {
                    name: '安卓',
                    key: 'android'
                  },
                  {
                    name: '苹果',
                    key: 'ios'
                  },
                  {
                    name: '电脑端网页',
                    key: 'web'
                  },
                  {
                    name: '小程序',
                    key: 'wx-mp'
                  },
                  {
                    name: '移动端网页',
                    key: 'h5'
                  }
                ],
              },
              {
                name: '状态',
                key: 'status',
                type: 'switch',
                openValue: "1",
                closeValue: "2",
              },
            ],
            subfromData: {
              id: "***",
              name: "***",
              desc: "***",
              status: "***",
              layer: "***",
              platform: "***",
              channel: "***",
              version: "***",
              start_bucket: "***",
              end_bucket: "***",
            },
            fromTitle: "新建",
            subfromFunIndex: "Add"
          },
          {
            name: '删除',
            type: 'confirmButton',
            buttonTypeOpt: 'danger',
            subfromData: {
              id: "***",
            },
            subfromFunIndex: "Del"
          }
        ]
      },

    ],
    tableShowJson: [
      {
        field: 'id',
        value: '',
        width: '500px'
      },
    ],
  }
}

export default data