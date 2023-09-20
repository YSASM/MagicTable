import _this from "@/main.js"
import api from "@/api/paper/grade/index"
let data = {
  scrollWidth: 1000,
  fetchFun: api.getPaperGradeList,
  subfromFunEditor: api.editorPaperGradeList,
  subfromFunAdd: api.addPaperGradeList,
  subfromFunDel: api.delPaperGradeList,
  fliterClearable: false,
  fliterOption: [
    {
      name: '新建',
      type: 'formButton',
      disableLabel: true,
      fromData: [
        {
          name: '年级名称',
          key: 'name',
          type: 'input',
          must: true
        },
        {
          name: '状态',
          key: 'status',
          type: 'switch',
          openValue: 1,
          closeValue: 2,
        },
      ],
      subfromData: {
        name: "新建年级",
        status: 1,
      },
      fromTitle: "新建",
      subfromFunIndex: "Add"
    }
  ],
  fliter: {
    page: 1,
    size: 20,
  },
  columns: [
    { field: "id", key: "id", title: "ID", align: "center", width: 20, fixed: "left", sortBy: "desc" },
    { field: "name", key: "name", title: "年级名称", align: "center", width: 30, },
    { field: "status", key: "status", title: "状态", align: "center", width: 30, },
    {
      field: "utils", key: "utils", title: "操作", align: "center", width: 60, fixed: "right",
      buttons: [
        {
          name: '编辑',
          type: 'formButton',
          buttonTypeOpt: 'warning',
          fromData: [
            {
              name: '年级名称',
              key: 'name',
              type: 'input',
              must: true
            },
            {
              name: '状态',
              key: 'status',
              type: 'switch',
              openValue: 1,
              closeValue: 2,
            },
          ],
          subfromData: {
            id: "***",
            name: "***",
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
    }
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
      subFun: api.editorPaperGradeList
    },
  ],
}


export default data