import api from "@/api/test/test/index"
import _this from "@/main.js"
let data = {
  scrollWidth: 1500,
  pageSizeOption: [20, 50, 100, 200],
  fetchFun: api.getList,
  // 可以使用函数（异步）或者以下形式
  // fetchFun: {
  //   url:'链接',
  //   method:'请求方式',
  // },
  subfromFunEditor: api.editorList,
  subfromFunAdd: api.addList,
  subfromFunDel: api.delList,
  fliterOption: [
    {
      name: 'input',
      key: 'input',
      type: "input"
    },
    {
      name: 'input2',
      key: 'input2',
      type: "input",
      rows: 2,
    },
    {
      name: 'switch',
      key: 'switch',
      type: "switch",
      openValue: 1,
      closeValue: 2
    },
    {
      name: 'select',
      key: 'select',
      type: "select",
      items: [
        {
          name: '测试',
          key: 1,
        },
        {
          name: '测试2',
          key: 2
        },
      ],
      value: 1
    },
    {
      name: 'cascader',
      key: 'cascader',
      type: "cascader",
      items: [
        {
          name: '测试1',
          key: 1,
          children: [
            {
              name: '测试11',
              key: 11,
              children: [
                {
                  name: '测试111',
                  key: 111
                },
              ]
            },
            {
              name: '测试22',
              key: 22
            },
          ]
        },
        {
          name: '测试2',
          key: 2
        },
      ],
      value: 1
    },
    {
      name: 'time',
      startKey: 'start_time',
      endKey: 'end_time',
      type: "time",
      value: []
    },
    {
      name: '新建',
      type: 'formButton',
      disableLabel: true,
      fromData: [
        {
          name: '名称',
          key: 'name',
          type: 'input',
          must: true
        },
      ],
      subfromData: {
        name: ""
      },
      fromTitle: "新建",
      subfromFunIndex: "Add"
    }
  ],
  columns: [
    { field: "id", key: "id", title: "ID", align: "center", width: 20, sortBy: "", fixed: "left", showOverflow: "name" },
    { field: "name", key: "name", title: "名称", align: "center", width: 50, showOverflow: "name" },
    { field: "status", key: "status", title: "状态", align: "center", width: 50, },
    { field: "config", key: "config", title: "配置", align: "center", width: 50, },
    {
      field: "utils", key: "utils", title: "操作", align: "center", width: 60, fixed: "right",
      buttons: [
        {
          name: '编辑',
          type: 'formButton',
          buttonTypeOpt: 'warning',
          fromData: [
            {
              name: '名称',
              key: 'name',
              type: 'input',
              must: true
            },
          ],
          subfromData: {
            id: "***",
            name: "***",
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
      field: 'config',
      // columns中field为空时编辑整行
      value: 'config',
      // 弹窗宽度
      width: '700px',
      height: '500px',
      // 提交的函数，要求异步函数
      subFun: api.editorList
    },
  ],
  tableSwitch: [
    {
      // 对应columns中field
      field: 'status',
      // columns中field为空时编辑整行
      value: 'status',
      openValue: 1,
      closeValue: 2,
      // 提交的函数，要求异步函数
      subFun: api.editorList
    },
  ],
}


export default data