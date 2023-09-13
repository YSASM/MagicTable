import api from "@/api/goods/goods/index"
import _this from "@/main.js"
let data = {
  tableData: {
    scrollWidth: 1500,
    pageSizeOption: [20, 50, 100, 200],
    tableData: [],
    fetchFun: api.getGoodsList,
    subfromFunEditor: (data) => {
      return new Promise((resolve, reject) => {
        data.params = JSON.stringify(data.params)
        api.editorGoodsList(data).then(res => {
          resolve(res)
        })
      })
    },
    subfromFunAdd: (data) => {
      return new Promise((resolve, reject) => {
        data.params = JSON.stringify(data.params)
        api.addGoodsList(data).then(res => {
          resolve(res)
        })
      })
    },
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
        type: 'fromButton',
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
            inputed: (value) => {
              value = value.replace(/[^0-9]/g, '');
              _this.tableData.subfromData.price = value
            },
          },
          {
            name: '商品原价',
            key: 'origin_price',
            type: 'input',
            tips: '单位：分',
            must: true,
            inputed: (value) => {
              value = value.replace(/[^0-9]/g, '');
              _this.tableData.subfromData.origin_price = value
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
          {
            name: '配置参数',
            key: 'params',
            type: 'jsonIinput',
          },
        ],
        subfromData: {
          name: "",
          type: "",
          params: {},
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
      { field: "id", key: "id", title: "ID", align: "center", width: 20, sortBy: "desc" },
      { field: "name", key: "name", title: "名称", align: "center", width: 20 },
      { field: "type", key: "type", title: "类型", align: "center", width: 20 },
      { field: "price", key: "price", title: "价格", align: "center", width: 20, endStr: "元" },
      { field: "origin_price", key: "origin_price", title: "原价", align: "center", width: 20, endStr: "元" },
      { field: "checked", key: "checked", title: "是否选中", align: "center", width: 20 },
      { field: "sign_value", key: "sign_value", title: "签约时间", align: "center", width: 20 },
      { field: "params", key: "params", title: "内容", align: "center", width: 20 },
      {
        field: "utils", key: "utils", title: "操作", align: "center", width: 50, fixed: "right",
        renderBodyCell: ({ row, column, rowIndex }, h) => {
          return (
            <div>
              <el-button type="warning" v-on:click={() => {
                _this.tableData.fromData = [
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
                    inputed: (value) => {
                      value = value.replace(/[^0-9]/g, '');
                      _this.tableData.subfromData.price = value
                    },
                  },
                  {
                    name: '商品原价',
                    key: 'origin_price',
                    type: 'input',
                    tips: '单位：分',
                    must: true,
                    inputed: (value) => {
                      value = value.replace(/[^0-9]/g, '');
                      _this.tableData.subfromData.origin_price = value
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
                  {
                    name: '配置参数',
                    key: 'params',
                    type: 'jsonIinput',
                  },
                ]
                _this.tableData.showFrom = true
                let params
                try {
                  params = JSON.parse(row.params)
                } catch (e) {
                  params = {}
                }
                _this.tableData.subfromData = {
                  id: row.id,
                  name: row.name,
                  type: row.type,
                  params: params,
                  price: (row.price * 100).toString(),
                  origin_price: (row.origin_price * 100).toString(),
                  sign_value: row.sign_value,
                  checked: row.checked,
                }
                _this.tableData.fromTitle = "编辑"
                _this.tableData.subfromFunIndex = "Editor"
              }}>编辑</el-button>
              <el-popconfirm
                title="确定删除吗？"
                style="margin-left:10px"
                on-confirm={() => {
                  api.delGoodsList({
                    id: row.id
                  }).then(res => {
                    _this.initData()
                    _this.$message.success("操作成功")
                  })
                }}
              >
                <el-button type="danger" slot="reference">删除</el-button>
              </el-popconfirm>
            </div>


          );
        },
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