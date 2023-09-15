import api from "@/api/goods/goods/index"
import _this from "@/main.js"
let data = {
  tableData: {
    scrollWidth: 1500,
    pageSizeOption: [20, 50, 100, 200],
    tableData: [],
    fetchFun: api.getGoodsList,
    subfromFunEditor: api.editorGoodsList,
    subfromFunAdd: api.addGoodsList,
    subfromFunDel: api.delGoodsList,
    fliterOption: [
      {
        name: '商品ID',
        key: 'id',
        type: "input"
      },
      {
        name: '商品名称',
        key: 'name',
        type: "input"
      },
      {
        name: '商品类型',
        key: 'type',
        type: "input"
      },
      {
        name: '新建',
        type: 'formButton',
        disableLabel: true,
        fromData: [
          {
            name: '商品名称',
            key: 'name',
            type: 'input',
            must: true
          },
          {
            name: '商品类型',
            key: 'type',
            type: 'input',
            must: true
          },
          {
            name: '商品价格',
            key: 'price',
            type: 'input',
            tips: '单位：分',
            must: true,
            rule: {
              onlyNum: true,
            },
          },
          {
            name: '商品原价',
            key: 'origin_price',
            type: 'input',
            tips: '单位：分',
            must: true,
            rule: {
              onlyNum: true,
            },
          },
          {
            name: '签约时间',
            key: 'sign_value',
            type: 'input',
            tips: '1m、3m、12m等'
          },
          {
            name: '是否选中',
            key: 'checked',
            type: 'switch',
            openValue: "true",
            closeValue: "false",
          }
        ],
        subfromData: {
          name: "",
          type: "",
          price: "0",
          origin_price: "0",
          sign_value: "",
          checked: "true",
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
      { field: "id", key: "id", title: "ID", align: "center", width: 20, sortBy: "desc", fixed: "left", },
      { field: "name", key: "name", title: "名称", align: "center", width: 20 },
      { field: "type", key: "type", title: "类型", align: "center", width: 20 },
      { field: "price", key: "price", title: "价格", align: "center", width: 20, endStr: "元" },
      { field: "origin_price", key: "origin_price", title: "原价", align: "center", width: 20, endStr: "元" },
      { field: "checked", key: "checked", title: "是否选中", align: "center", width: 20 },
      { field: "sign_value", key: "sign_value", title: "签约时间", align: "center", width: 20 },
      { field: "params", key: "params", title: "配置参数", align: "center", width: 20 },
      {
        field: "utils", key: "utils", title: "操作", align: "center", width: 50, fixed: "right",
        buttons: [
          {
            name: '编辑',
            type: 'formButton',
            buttonTypeOpt: 'warning',
            fromData: [
              {
                name: '商品名称',
                key: 'name',
                type: 'input',
                must: true
              },
              {
                name: '商品类型',
                key: 'type',
                type: 'input',
                must: true
              },
              {
                name: '商品价格',
                key: 'price',
                type: 'input',
                tips: '单位：分',
                must: true,
                rule: {
                  onlyNum: true,
                },
              },
              {
                name: '商品原价',
                key: 'origin_price',
                type: 'input',
                tips: '单位：分',
                must: true,
                rule: {
                  onlyNum: true,
                },
              },
              {
                name: '签约时间',
                key: 'sign_value',
                type: 'input',
                tips: '1m、3m、12m等'
              },
              {
                name: '是否选中',
                key: 'checked',
                type: 'switch',
                openValue: "true",
                closeValue: "false",
              },
            ],
            subfromData: {
              id: "***",
              name: "***",
              type: "***",
              price: "***|yuanToFen",
              origin_price: "***|yuanToFen",
              sign_value: "***",
              checked: "***",
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
        field: 'params',
        // columns中field为空时编辑整行
        value: 'params',
        // 弹窗宽度
        width: '700px',
        height: '500px',
        // 提交的函数，要求异步函数
        subFun: api.editorGoodsList
      },
    ],
    tableSwitch: [
      {
        // 对应columns中field
        field: 'checked',
        // columns中field为空时编辑整行
        value: 'checked',
        openValue: "true",
        closeValue: "false",
        // 提交的函数，要求异步函数
        subFun: api.editorGoodsList
      },
    ],
  }
}

export default data