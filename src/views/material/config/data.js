import api from "@/api/material/config/index"
import _this from "@/main.js"
let data = {
  scrollWidth: 1000,
  pageSizeOption: [20, 50, 100, 200],
  fetchFun: api.getConfigList,
  subfromFunAdd: api.addConfigList,
  subfromFunEditor: api.editorConfigList,
  subfromFunDel: api.delConfigList,
  fliterOption: [
    {
      name: '域名',
      key: 'domain',
      type: "input"
    },
    {
      name: '抽取器',
      key: 'extractor',
      type: "input"
    },
    {
      name: '状态',
      key: 'status',
      type: "select",
      items: [
        {
          name: '全部',
          key: '',
        },
        {
          name: '开启',
          key: '1',
        },
        {
          name: '关闭',
          key: '2',
        }
      ],
      value: ''
    },
    {
      name: '新建',
      disableLabel: true,
      type: 'formButton',
      buttonTypeOpt: 'warning',
      fromData: [
        {
          name: '域名',
          key: 'domain',
          type: 'input',
        },
        {
          name: '抽取器',
          key: 'extractor',
          type: 'input',
          must: true
        },
        {
          name: '权重',
          key: 'weight',
          type: 'input',
          must: true,
          rule: {
            onlyNum: true,
          }
        },
        {
          name: '状态',
          key: 'status',
          type: 'switch',
          openValue: "1",
          openStr: "查看开启",
          closeValue: "2",
          closeStr: "查看关闭",
        },
      ],
      subfromData: {
        domain: "",
        extractor: "",
        weight: "",
        status: "1",
      },
      fromTitle: "新建",
      subfromFunIndex: "Add"
    },

  ],
  fliter: {
    page: 1,
    size: 20,
  },
  // id	"4"
  // domain	""
  // extractor	"hhm"
  // weight	0
  // status	1
  // status_name	"启用"
  // create_time	""
  // update_time	""
  columns: [
    { field: "id", key: "id", title: "ID", align: "center", width: 20, sortBy: "", fixed: "left", },
    { field: "domain", key: "domain", title: "域名", align: "center", width: 25, },
    { field: "extractor", key: "extractor", title: "抽取器", align: "center", width: 25, },
    { field: "weight", key: "weight", title: "权重", align: "center", width: 25, sortBy: "" },
    { field: "status", key: "status", title: "状态", align: "center", width: 30, },
    { field: "create_time", key: "create_time", title: "创建时间", align: "center", width: 50, sortBy: "desc" },
    { field: "update_time", key: "update_time", title: "更新时间", align: "center", width: 50, sortBy: "" },
    {
      field: "utils", key: "utils", title: "操作", align: "center", width: 50, fixed: "right",
      buttons: [
        {
          name: '编辑',
          type: 'formButton',
          buttonTypeOpt: 'warning',
          fromData: [
            {
              name: '域名',
              key: 'domain',
              type: 'input',
            },
            {
              name: '抽取器',
              key: 'extractor',
              type: 'input',
              must: true
            },
            {
              name: '权重',
              key: 'weight',
              type: 'input',
              must: true,
              rule: {
                onlyNum: true,
              }
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
            domain: "***",
            extractor: "***",
            weight: "***",
            status: "***",
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