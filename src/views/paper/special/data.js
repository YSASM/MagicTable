import _this from "@/main.js"
import api from "@/api/paper/special/index"
import questionApi from "@/api/paper/question/index"
_this.setDefaultLaunchFuns = () => {
  return {
    getSpecialTree: async () => {
      let res = await api.getSpecialTree()
      let items = [
        {
          name: '所有类型',
          key: -1
        }
      ]
      _this.globa.specialTree = formtTree(res.data)
      _this.globa.specialTree.forEach(item => {
        items.push(item)
      })
      _this.methods.upDateAppendFliterOption({
        key: "special_id",
        items: items,
        value: -1
      })
    }
  }
}
function formtTree(data) {
  data.forEach(item => {
    if (item.children && item.children.length > 0) {
      item.children = formtTree(item.children)
    }
    else {
      delete item.children
    }
  })
  return data
}

let data = {
  scrollWidth: 2000,
  pageSizeOption: [20, 50, 100, 200],
  fetchFun: questionApi.getPaperQuestionList,
  subfromFunEditor: questionApi.editorPaperQuestionList,
  subfromFunAdd: questionApi.addPaperQuestionList,
  subfromFunDel: questionApi.delPaperQuestionList,
  cascaderOptionPropsFrom: {
    value: "key",
    label: "name",
    children: "children",
    emitPath: false
  },
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
      name: "章节类型",
      key: "special_id",
      type: "cascader",
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
      beforeShow: (self) => {
        return new Promise((resolve, reject) => {
          if (!_this.globa.specialTree) {
            api.getSpecialTree().then(res => {
              _this.globa.specialTree = formtTree(res.data)
              self.fromData[1].items = _this.globa.specialTree
              resolve(self)
            })
          }
          self.fromData[1].items = _this.globa.specialTree
          resolve(self)
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
          name: "章节类型",
          key: "special_id",
          type: "cascader",
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
        {
          name: '序号',
          key: 'paper_sort',
          type: 'input',
          must: true,
          rule: {
            onlyNum: true,
          },
        },
      ],
      subfromData: {
        title: "",
        question_type: 1,
        answer: "",
        solution: "",
        score: 0,
        special_id: '',
        paper_sort: 0
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
    { field: "paper_sort", key: "paper_sort", title: "序号", align: "center", width: 20, fixed: "left", sortBy: "asc" },
    { field: "title", key: "title", title: "考题标题", align: "center", width: 50, showOverflow: "title" },
    { field: "question_type_name", key: "question_type_name", title: "考题类型", align: "center", width: 20 },
    { field: "special_id", key: "special_id", title: "章节ID", align: "center", width: 20, },
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
            {
              name: '序号',
              key: 'paper_sort',
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
            score: "***",
            paper_sort: "***"
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


export default data