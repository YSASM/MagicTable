import api from "@/api/system/account/index"
import _this from "@/main.js"
import utils from "@/utils"
let data = {
  scrollWidth: 1500,
  pageSizeOption: [20, 50, 100, 200],
  fetchFun: api.getAccountList,
  subfromFunEditor: api.editorAccountList,
  subfromFunAdd: api.addAccountList,
  subfromFunDel: api.delAccountList,
  fliterClearable: false,
  fliterOption: [
    {
      name: '新建',
      type: 'formButton',
      disableLabel: true,
      fromData: [
        {
          name: '用户名',
          key: 'username',
          type: 'input',
          must: true
        },
        {
          name: '密码',
          key: 'password',
          type: 'inputPw',
          must: true
        },
        {
          name: '确认密码',
          key: 'password2',
          type: 'inputPw',
          unsub: true,
          must: true,
          rule: {
            equation: 'password',
            equationStr: '二次确认需要与密码相同'
          }
        },
      ],
      subfromData: {
        username: "",
        password: "",
        password2: ""
      },
      fromTitle: "新建",
      subfromFunIndex: "Add"
    },
  ],
  fliter: {
    page: 1,
    size: 20,
  },
  // { "id": "2", "username": "wujiefeng", "token": "5dd131b7-14ef-44c5-93cc-5d23e3ede172", "create_time": "", "update_time": "", "active_time": "2023-09-21 15:27:25", "config": "", "fieldIndex": 1 }
  columns: [
    { field: "id", key: "id", title: "ID", align: "center", width: 20, sortBy: "desc", fixed: "left", },
    { field: "username", key: "username", title: "用户名", align: "center", width: 20, },
    { field: "token", key: "token", title: "Token", align: "center", width: 50, },
    { field: "config", key: "config", title: "用户配置", align: "center", width: 20, },
    { field: "create_time", key: "create_time", title: "创建时间", align: "center", width: 20, sortBy: "" },
    { field: "update_time", key: "update_time", title: "更新时间", align: "center", width: 20, sortBy: "" },
    { field: "active_time", key: "active_time", title: "登录时间", align: "center", width: 20, sortBy: "" },
    {
      field: "utils", key: "utils", title: "操作", align: "center", width: 20, fixed: "right",
      buttons: [
        {
          name: '编辑',
          type: 'formButton',
          buttonTypeOpt: 'warning',
          fromData: [
            {
              name: '用户名',
              key: 'username',
              type: 'input',
              must: true
            },
            {
              name: '密码',
              key: 'password',
              type: 'inputPw',
              must: true,
              rule: {
                minLength: 6,
                maxLength: 10,
              }
            },
            {
              name: '确认密码',
              key: 'password2',
              type: 'inputPw',
              unsub: true,
              must: true,
              rule: {
                equation: 'password',
                equationStr: '二次输入密码要相同',
                minLength: 6,
                maxLength: 10,
              }
            },
          ],
          subfromData: {
            id: "***",
            username: "***",
            password: "",
            password2: ""
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
      width: '200px'
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
      subFun: api.editorAccountList
    },
  ],
}

export default data