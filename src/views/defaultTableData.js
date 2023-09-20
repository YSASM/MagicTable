import _this from "@/main.js"
// 使用_this可以在任何地方完成this相关操作
let data = {
  // 表格宽度
  scrollWidth: 1500,
  // 每页条数配置
  pageSizeOption: [
    20,
    50,
    100,
    200
  ],
  // 获取表格信息的接口函数，要求异步函数
  fetchFun: async () => { },
  fromData: [
    {
      // label显示内容
      name: '关键字',
      // 是否必须
      must: true,
      // 提交的字段名
      key: 'ekey',
      // 类型
      type: 'input(输入框)|select(下拉菜单)|switch(开关)|timeOnly(选择一天的时间)',
      // 当subfromData中的xxx字段等于undefined时禁用
      disablekey: "xxx",
      disableval: undefined,
      // type为select时生效
      items: [
        {
          // 选项名
          name: '',
          // 选项值
          key: ''
        }
      ],
    }
  ],
  // 提交表单内容与fromData对应
  subfromData: {},
  // 提交表单的函数index
  subfromFunIndex: 0,
  // 提交表单的函数"subfromFun"+subfromFunIndex
  subfromFun0: null,
  subfromFun1: null,
  // 显示表单弹窗
  showFrom: false,
  fliterOption: [
    {
      // label显示内容
      name: '用户平台',
      // 提交的字段名
      key: 'platform',
      // 类型
      type: "input(输入框)|select(下拉菜单)|time(时间范围选择)|formButton(表单弹窗按钮)",
      // 初始值
      value: "",
      // type为select时生效
      items: [
        {
          // 选项名
          name: '',
          // 选项值
          key: ''
        }
      ],
      // type为time时生效开始时间的key
      startKey: 'start_time',
      // type为time时生效结束时间的key
      endKey: 'end_time',
      // 不显示label
      disableLabel: true,
      // type为formButton时生效表单弹窗可编辑内容
      fromData: [
        {
          // label显示内容
          name: '关键字',
          // 是否必须
          must: true,
          // 提交的字段名
          key: 'ekey',
          // 类型
          type: 'input(输入框)|select(下拉菜单)|switch(开关)|timeOnly(选择一天的时间)|tags(可添加删除)',
          // type为input时输入后的回调
          inputed: (value) => {
            value = "........."
            // 设置_this.tableData.subfromData[上面填写的key]即可改变对应输入框值
            _this.tableData.subfromData[key] = value
          },
          // 当subfromData中的xxx字段等于undefined时禁用
          disablekey: "xxx",
          disableval: undefined,
          // type为select时生效
          items: [
            {
              // 选项名
              name: '',
              // 选项值
              key: ''
            }
          ],
          // type为tags时生效，填写与addTagText相同内容即可
          tag: '+新标签',
          // 添加标签按钮的文字
          addTagText: '+新标签',
        }
      ],
      // 提交表单内容与fromData对应可设置fromData初始值如：subfromData:{ekey:123}
      subfromData: {},
      // 提交表单的函数index
      subfromFunIndex: 0
    }
  ],
  // 表格内字段
  columns: [
    {
      // 与接口对应的字段名
      field: "id",
      // 唯一key
      key: "id",
      // 列名
      title: "ID",
      // 单元格文字居中
      align: "center",
      // 单元格宽度
      width: 20,
      // 列默认排序desc|asc一张表格里只能设置一个desc或asc，其他需要排序字段设置成""
      sortBy: "",
      // 列浮动
      fixed: "right",
      // 自定义单元格内容，返回jsx使用
      renderBodyCell: ({ row, column, rowIndex }, h) => {
        // 在表格中使用表单将fromData,showFrom,subfromData,subfromFunIndex注册进_this.tableData即可
        return (
          <el-button type="warning" v-on:click={() => {
            _this.tableData.fromData = []
            _this.tableData.showFrom = true
            _this.tableData.subfromData = {}
            _this.tableData.subfromFunIndex = 0
          }}>编辑</el-button>
        );
      }
    },
  ],
  // 鼠标点击查看json
  tableShowJson: [
    {
      // 对应columns中field
      field: 'id',
      // columns中field为空时查看整行
      value: '',
      // 弹窗宽度
      width: '500px'
    },
  ],
  // 鼠标点击编辑json
  tableEditorJson: [
    {
      // 对应columns中field
      field: 'id',
      // columns中field为空时编辑整行
      value: '',
      // 弹窗宽度
      width: '500px',
      // 弹窗高度
      height: '500px',
      // 提交的函数，要求异步函数
      subFun: async (data) => { }
    },
  ],
}

export default data