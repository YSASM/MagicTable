import api from "@/api/user/event/index"
import _this from "@/main.js"
import utils from "@/utils"
let data = {
  tableData: {
    scrollWidth: 1500,
    pageSizeOption: [20, 50, 100, 200],
    tableData: [],
    fetchFun: api.getUserEventList,
    subfromFun0: api.editorUserEventList,
    fliterOption: [
      {
        name: '用户ID',
        key: 'user_id',
        type: "input"
      },
      {
        name: '版本',
        key: 'version',
        type: "input"
      },
      {
        name: '渠道',
        key: 'channel',
        type: "input"
      },
      {
        name: '关键字',
        key: 'ekey',
        type: "input"
      },
      {
        name: '内容',
        key: 'value',
        type: "input"
      },
      {
        name: '事件来源',
        key: 'source',
        type: "select",
        items: [
          {
            name: '全部来源',
            key: ''
          },
          {
            name: '客户端',
            key: 'client'
          },
          {
            name: '服务端',
            key: 'server'
          }
        ],
        value: 'client'
      },
      {
        name: '事件来源',
        key: 'type',
        type: "select",
        items: [
          {
            name: '全部类型',
            key: ''
          },
          {
            name: 'click',
            key: 'click'
          },
          {
            name: 'event',
            key: 'event'
          },
          {
            name: 'error',
            key: 'error'
          }
        ],
        value: ''
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
        value: ''
      },
      {
        name: '时间',
        startKey: 'start_time',
        endKey: 'end_time',
        type: "time",
        value: utils.defaultDate()
      },
      // {
      //   name: '编辑',
      //   type: 'formButton',
      //   disableLabel: true,
      //   fromData: [
      //     {
      //       name: '关键字',
      //       must: true,
      //       key: 'ekey',
      //       type: 'input',
      //     },
      //     {
      //       name: '关键词',
      //       must: true,
      //       key: 'ename',
      //       type: 'input',
      //     }
      //   ],
      //   subfromData: {
      //     ekey: '',
      //     input: ''
      //   },
      //   subfromFunIndex: 0
      // }
    ],
    fliter: {
      page: 1,
      size: 20,
    },
    columns: [
      { field: "id", key: "id", title: "ID", align: "center", width: 20, sortBy: "", fixed: "left", },
      { field: "user_id", key: "user_id", title: "用户ID", align: "center", width: 20, },
      { field: "channel", key: "channel", title: "渠道", align: "center", width: 25, },
      { field: "version", key: "version", title: "版本", align: "center", width: 25, },
      { field: "platform", key: "platform", title: "平台", align: "center", width: 25, },

      { field: "day", key: "day", title: "日期", align: "center", width: 25, sortBy: "" },
      { field: "source", key: "source", title: "来源", align: "center", width: 25, },
      { field: "type", key: "type", title: "类型", align: "center", width: 25, },
      {
        field: "ename", key: "ename", title: "关键词", align: "center", width: 50,
        buttons: [
          {
            name: 'ename',
            type: 'textFormButton',
            fromData: [
              {
                name: '关键字',
                must: true,
                key: 'ekey',
                type: 'input',
                disablekey: "xxx",
                disableval: undefined
              },
              {
                name: '关键词',
                must: true,
                key: 'ename',
                type: 'input',
              }
            ],
            fromTitle: "编辑关键词",
            subfromData: {
              ekey: "***",
              ename: "***"
            },
            subfromFunIndex: 0
          }

        ],
      },
      { field: "ekey", key: "ekey", title: "关键字", align: "center", width: 50, },
      { field: "value", key: "value", title: "内容", align: "center", width: 25, },
      { field: "extra", key: "extra", title: "拓展内容", align: "center", width: 25, },
      { field: "create_time", key: "create_time", title: "创建时间", align: "center", width: 50, sortBy: "desc" },
    ],
    tableShowJson: [
      {
        field: 'id',
        value: '',
        width: '500px'
      },
      {
        field: 'extra',
        value: 'extra',
        width: '500px'
      },
    ],
  }
}

export default data