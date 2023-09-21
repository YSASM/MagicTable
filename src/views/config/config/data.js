import api from "@/api/config/config/index"
import _this from "@/main.js"
let data = {
  scrollWidth: 1500,
  pageSizeOption: [20, 50, 100, 200],
  fetchFun: api.getConfigList,
  subfromFunWhitList: (data) => {
    return new Promise((resolve, reject) => {
      data.white_list = data.white_list.length > 0 ? data.white_list.toLocaleString() : " "
      api.editorConfigList(data).then(res => {
        resolve(res)
      })
    })
  },
  subfromFunEditor: api.editorConfigList,
  subfromFunAdd: api.addConfigList,
  subfromFunDel: api.delConfigList,
  fliterOption: [
    {
      name: '配置名称',
      key: 'name',
      type: "input"
    },
    {
      name: '配置内容',
      key: 'params',
      type: "input"
    },
    {
      name: '状态',
      key: 'status',
      type: "switch",
      openValue: "1",
      openStr: "查看开启",
      closeValue: "null",
      closeStr: "查看所有",
      value: '',
    },
    {
      name: '新建',
      type: 'formButton',
      disableLabel: true,
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
        }
      ],
      subfromData: {
        name: "",
        desc: "",
      },
      fromTitle: "新建",
      subfromFunIndex: "Add"
    }
  ],
  fliter: {
    page: 1,
    size: 20,
  },
  // platform	""
  // channel	""
  // version	""
  // white_list	""
  // status	"1"
  // start_bucket	"0"
  // end_bucket	"50"
  // create_time	""
  // update_time	""
  columns: [
    { field: "id", key: "id", title: "ID", align: "center", width: 20, sortBy: "", fixed: "left", },
    { field: "name", key: "name", title: "名称", align: "center", width: 50, showOverflow: "name" },
    { field: "params", key: "params", title: "配置参数", align: "center", width: 20 },
    // { field: "desc", key: "desc", title: "描述", align: "center", width: 20 },
    { field: "layer", key: "layer", title: "层数", align: "center", width: 20 },
    { field: "platform", key: "platform", title: "平台", align: "center", width: 20 },
    { field: "channel", key: "channel", title: "渠道", align: "center", width: 20 },
    { field: "version", key: "version", title: "版本", align: "center", width: 20 },
    { field: "status", key: "status", title: "状态", align: "center", width: 20 },
    {
      field: "bucket", key: "bucket", title: "流量区间", align: "center", width: 20,
      renderBodyCell: ({ row, column, rowIndex }, h) => {
        return (<span>{row.start_bucket + '~' + row.end_bucket}</span>)
      }
    },
    {
      field: "bucketBFS", key: "bucketBFS", title: "流量百分比", align: "center", width: 25,
      renderBodyCell: ({ row, column, rowIndex }, h) => {
        return (<span>{row.end_bucket - row.start_bucket + 1 + '%'}</span>)
      }
    },
    { field: "create_time", key: "create_time", title: "创建时间", align: "center", width: 50, sortBy: "desc" },
    { field: "update_time", key: "update_time", title: "更新时间", align: "center", width: 50, sortBy: "" },
    {
      field: "utils", key: "utils", title: "操作", align: "center", width: 60, fixed: "right",
      buttons: [
        {
          name: '白名单',
          type: 'formButton',
          buttonTypeOpt: {
            name: 'white_list',
            calculate: "!=",
            value: [],
            type: 'success',
          },
          fromData: [
            {
              name: '白名单',
              key: 'white_list',
              type: 'tags',
              tag: '+新标签',
              addTagText: '+新标签',
            }
          ],
          subfromData: {
            id: "***",
            white_list: "***|strToArr"
          },
          subfromFunIndex: "WhitList",
        },
        {
          name: '编辑',
          type: 'formButton',
          buttonTypeOpt: 'warning',
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
                maxNum: 'end_bucket',
                maxStr: '开始桶号必须小于结束桶号'
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
                maxNum: 100,
                minStr: '结束桶号必须大于开始桶号'
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
          fromTitle: "编辑",
          subfromFunIndex: "Editor"
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
      ],
    },
  ],
  tableShowJson: [
    {
      field: 'id',
      value: '',
      width: '500px'
    },
  ],
  tableEditorJson: [
    {
      // 对应columns中field
      field: 'params',
      // columns中field为空时编辑整行
      value: 'params',
      // 弹窗宽度
      width: '700px',
      height: '500px',
      // 提交的函数，要求异步函数
      subFun: api.editorConfigList
    },
  ],
  tableSwitch: [
    {
      // 对应columns中field
      field: 'status',
      // columns中field为空时编辑整行
      value: 'status',
      openValue: "1",
      closeValue: "2",
      // 提交的函数，要求异步函数
      subFun: api.editorConfigList
    },
  ],
}


export default data