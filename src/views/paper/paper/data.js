import _this from "@/main.js"
import api from "@/api/paper/paper/index"
import gradeapi from "@/api/paper/grade/index"
_this.launchFuns.getgradeList = async () => {
  let gradeData = [
    {
      name: "所有类型",
      key: ''
    }
  ]
  let res = await gradeapi.getPaperGradeList()
  res.data.items.forEach(item => {
    gradeData.push({
      name: item.name,
      key: item.id
    })
  })
  _this.methods.upDateAppendFliterOption({
    key: "grade_id",
    items: gradeData,
    value: ''
  })
  _this.methods.initData()
}
_this.globa.donotFetch = true
let data = {
  tableData: {
    scrollWidth: 1000,
    fetchFun: api.getPaperPaperList,
    subfromFunEditor: api.editorPaperPaperList,
    subfromFunAdd: api.addPaperPaperList,
    subfromFunDel: api.delPaperPaperList,
    fliterOption: [
      {
        name: "试卷ID",
        key: "id",
        type: "input"
      },
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
        name: "试卷年级",
        key: "grade_id",
        type: "select",
        items: [
          {
            name: '所有年级',
            key: ''
          },
          {
            name: '幼儿',
            key: '1'
          },
          {
            name: '小学',
            key: '2'
          },
          {
            name: '初中',
            key: '3'
          },
          {
            name: '高中',
            key: '4'
          },
          {
            name: '职中',
            key: '5'
          }
        ],
        value: ''
      },
      {
        name: '新建',
        type: 'formButton',
        disableLabel: true,
        fromData: [
          {
            name: '试卷名称',
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
      { field: "id", key: "id", title: "ID", align: "center", width: 20, fixed: "left", sortBy: "desc" },
      { field: "name", key: "name", title: "年级名称", align: "center", width: 30, },
      { field: "type_name", key: "type_name", title: "类型", align: "center", width: 30, },
      { field: "grade_name", key: "grade_name", title: "年级", align: "center", width: 30, },
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