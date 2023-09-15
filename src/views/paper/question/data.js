import _this from "@/main.js"
let data = {
  tableData: {
    scrollWidth: 2000,
    pageSizeOption: [20, 50, 100, 200],
    tableData: [],
    fetchFun: {
      url: '/admin/info',
      method: 'get'
    },
    fliterOption: [
      {
        name: "考题标题",
        key: "title",
        type: "input"
      },
      {
        name: "试卷id",
        key: "special_id",
        type: "input",
        value: "1099"
      }
    ],
    fliter: {
      page: 1,
      size: 20,
    },
    columns: [
      { field: "id", key: "id", title: "ID", align: "center", width: 20, sortBy: "", fixed: "left", },
      { field: "title", key: "title", title: "考题标题", align: "center", width: 50, showOverflow: "title" },
      { field: "question_type_name", key: "question_type_name", title: "考题类型", align: "center", width: 20, },
      { field: "paper_id", key: "paper_id", title: "试卷ID", align: "center", width: 20, },
      { field: "paper_type_name", key: "paper_type_name", title: "试卷类型", align: "center", width: 20, },

      { field: "options", key: "options", title: "选项", align: "center", width: 20, },
      { field: "answer", key: "answer", title: "答案", align: "center", width: 20, },
      { field: "solution", key: "solution", title: "解析", align: "center", width: 50, showOverflow: "solution" },
      { field: "score", key: "score", title: "分数", align: "center", width: 20, },
      { field: "create_time", key: "create_time", title: "创建时间", align: "center", width: 30, sortBy: "desc", },
      { field: "update_time", key: "update_time", title: "更新时间", align: "center", width: 30, sortBy: "", },
    ],
    tableShowJson: [
      {
        field: 'id',
        value: '',
        width: '500px'
      },
      {
        field: 'options',
        value: 'options',
        width: '500px'
      }
    ],
  }
}

export default data