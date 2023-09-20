import _this from "@/main.js"
import api from "@/api/paper/paper/index"
import gradeapi from "@/api/paper/grade/index"
import questionApi from "@/api/paper/question/index"
_this.setDefaultGloba = () => {
  return {
    donotFetch: true,
    getPaperListData: {
      page: 1,
      size: 1000,
      type: '',
      grade_id: ''
    }
  }
}
_this.setDefaultLaunchFuns = () => {
  return {
    getpaperList: async () => {
      let paperData = [
        {
          name: "所有试卷",
          key: -1
        }
      ]
      let res = await api.getPaperPaperList(_this.globa.getPaperListData)
      res.data.items.forEach(item => {
        paperData.push({
          name: item.id + ":" + item.name,
          key: item.id
        })
      })
      _this.methods.upDateAppendFliterOption({
        key: "paper_id",
        items: paperData,
        value: -1
      })
    },
    getgradeList: async () => {
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
        key: "categ2",
        items: gradeData,
        value: ''
      })
      _this.methods.initData()
    }
  }
}
_this.setDefaultMethods = () => {
  return {
    getpaperList: async () => {
      let paperData = [
        {
          name: "所有试卷",
          key: -1
        }
      ]
      let res = await api.getPaperPaperList(_this.globa.getPaperListData)
      res.data.items.forEach(item => {
        paperData.push({
          name: item.id + ":" + item.name,
          key: item.id
        })
      })
      _this.methods.upDateAppendFliterOption({
        key: "paper_id",
        items: paperData,
        value: -1
      })
    }
  }
}


let data = {
  tableData: {
    scrollWidth: 2000,
    pageSizeOption: [20, 50, 100, 200],
    fetchFun: questionApi.getPaperQuestionList,
    subfromFunEditor: questionApi.editorPaperQuestionList,
    subfromFunAdd: questionApi.addPaperQuestionList,
    subfromFunDel: questionApi.delPaperQuestionList,

    fliterOption: [
      {
        name: "考题ID",
        key: "id",
        type: "input"
      },
      {
        name: "考题标题",
        key: "title",
        type: "input"
      },
      {
        name: '试卷类型',
        key: 'type',
        type: 'select',
        items: [
          {
            name: "所有类型",
            key: ''
          },
          {
            name: "真题",
            key: 1
          },
          {
            name: "模拟题",
            key: 2
          }
        ],
        value: '',
        unsub: true,
        beforFetch: async (data) => {
          if (_this.globa.getPaperListData.type != data.type) {
            _this.globa.getPaperListData.type = data.type
            await _this.methods.getpaperList()
          }
        }
      },
      {
        name: "试卷年级",
        key: "categ2",
        type: "select",
        items: [],
        value: '',
        unsub: true,
        beforFetch: async (data) => {
          if (_this.globa.getPaperListData.grade_id != data.categ2) {
            _this.globa.getPaperListData.grade_id = data.categ2
            await _this.methods.getpaperList()
          }
        }
      },
      {
        name: "试卷名称",
        key: "paper_id",
        type: "select",
        items: [],
        filterable: true,
      },
      {
        name: "考题类型",
        key: "question_type",
        type: "select",
        items: [
          {
            name: '所有类型',
            key: ''
          },
          {
            name: '单选选题',
            key: '1'
          },
          {
            name: '多选题',
            key: '2'
          },
          {
            name: '判断题',
            key: '3'
          },
          {
            name: '简答题',
            key: '4'
          }
        ],
        value: ''
      },
      {
        name: '时间',
        startKey: 'start_time',
        endKey: 'end_time',
        type: "time",
        value: []
      },
      {
        name: '新建',
        type: 'formButton',
        fromHistoryId: "add",
        disableLabel: true,
        beforeShow: async (self) => {
          return new Promise((resolve, reject) => {
            let paperData = []
            api.getPaperPaperList({
              page: 1,
              size: 1000,
            }).then(res => {
              res.data.items.forEach(item => {
                paperData.push({
                  name: item.id + ":" + item.name,
                  key: item.id
                })
              })
              self.fromData[1].items = paperData
              resolve(self)
            })
          })
        },
        fromData: [
          {
            name: '标题',
            key: 'title',
            type: 'input',
            must: true
          },
          {
            name: "试卷名称",
            key: "paper_id",
            type: "select",
            items: [],
            filterable: true,
            must: true
          },
          {
            name: "考题类型",
            key: "question_type",
            type: "select",
            items: [
              {
                name: '单选选题',
                key: 1
              },
              {
                name: '多选题',
                key: 2
              },
              {
                name: '判断题',
                key: 3
              },
              {
                name: '简答题',
                key: 4
              }
            ],
            must: true
          },
          {
            name: '答案',
            key: 'answer',
            type: 'input',
            must: true
          },
          {
            name: '解析',
            key: 'solution',
            type: 'input',
            must: true,
            rows: 8
          },
          {
            name: '分数',
            key: 'score',
            type: 'input',
            must: true,
            rule: {
              onlyNum: true,
            },
          },
        ],
        subfromData: {
          title: "新建考题",
          question_type: 1,
          answer: "",
          solution: "",
          score: 0,
          paper_id: 1
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
      { field: "title", key: "title", title: "考题标题", align: "center", width: 50, showOverflow: "title" },
      { field: "question_type_name", key: "question_type_name", title: "考题类型", align: "center", width: 20 },
      { field: "paper_id", key: "paper_id", title: "试卷ID", align: "center", width: 20, },
      { field: "options", key: "options", title: "选项", align: "center", width: 20, },
      { field: "answer", key: "answer", title: "答案", align: "center", width: 20, },
      { field: "solution", key: "solution", title: "解析", align: "center", width: 50, showOverflow: "solution" },
      { field: "score", key: "score", title: "分数", align: "center", width: 20, },
      { field: "create_time", key: "create_time", title: "创建时间", align: "center", width: 30, sortBy: "", },
      { field: "update_time", key: "update_time", title: "更新时间", align: "center", width: 30, sortBy: "", },
      {
        field: "utils", key: "utils", title: "操作", align: "center", width: 30, fixed: "right",
        buttons: [
          {
            name: '编辑',
            type: 'formButton',
            buttonTypeOpt: 'warning',
            fromData: [
              {
                name: '标题',
                key: 'title',
                type: 'input',
                must: true
              },
              {
                name: "考题类型",
                key: "question_type",
                type: "select",
                items: [
                  {
                    name: '单选选题',
                    key: 1
                  },
                  {
                    name: '多选题',
                    key: 2
                  },
                  {
                    name: '判断题',
                    key: 3
                  },
                  {
                    name: '简答题',
                    key: 4
                  }
                ],
                must: true
              },
              {
                name: '答案',
                key: 'answer',
                type: 'input',
                must: true
              },
              {
                name: '解析',
                key: 'solution',
                type: 'input',
                must: true,
                rows: 8
              },
              {
                name: '分数',
                key: 'score',
                type: 'input',
                must: true,
                rule: {
                  onlyNum: true,
                },
              },
            ],
            subfromData: {
              id: "***",
              title: "***",
              question_type: "&&&|question_type_id",
              answer: "***",
              solution: "***",
              score: "***"
            },
            fromTitle: "编辑",
            subfromFunIndex: "Editor",
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
      }
    ],
    tableShowJson: [
      {
        field: 'id',
        value: '',
        width: '500px'
      }
    ],
    tableEditorJson: [
      {
        // 对应columns中field
        field: 'options',
        // columns中field为空时编辑整行
        value: 'options',
        // 弹窗宽度
        width: '700px',
        height: '500px',
        // 提交的函数，要求异步函数
        subFun: questionApi.editorPaperQuestionList
      },
    ],
  }
}

export default data