import _this from "@/main.js"
import api from "@/api/paper/paper/index"
let data = {
  tableData: {
    scrollWidth: 1000,
    fetchFun: api.getPaperPaperList,
    subfromFunEditor: api.editorPaperPaperList,
    subfromFunAdd: api.addPaperPaperList,
    subfromFunDel: api.delPaperPaperList,
    fliterOption: [
      {
        name: "试卷名",
        key: "name",
        type: "input"

      },
      {
        name: '类型',
        key: 'type',
        type: 'select',
        items: [
          {
            name: "全部",
            key: ""
          },
          {
            name: "真题",
            key: 1
          }, {
            name: "模拟题",
            key: 2
          }
        ],
        value: ""
      },
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
            name: '类型',
            key: 'type',
            type: 'select',
            items: [
              {
                name: "真题",
                key: 1
              },
              {
                name: "模拟题",
                key: 2
              }
            ],
          },
        ],
        subfromData: {
          name: "",
          type: 1,
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
      { field: "id", key: "id", title: "ID", align: "center", width: 20, fixed: "left", },
      { field: "name", key: "name", title: "年级名称", align: "center", width: 30, },
      { field: "type_name", key: "type_name", title: "类型", align: "center", width: 30, },
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
                name: '类型',
                key: 'type',
                type: 'select',
                items: [
                  {
                    name: "真题",
                    key: 1
                  }, {
                    name: "模拟题",
                    key: 2
                  }
                ],
              },
            ],
            subfromData: {
              id: "***",
              name: "***",
              type: "&&&|type_id",
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
  }
}

export default data