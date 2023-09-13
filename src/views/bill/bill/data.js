import api from "@/api/bill/bill/index"
import _this from "@/main.js"
let data = {
  tableData: {
    scrollWidth: 1500,
    pageSizeOption: [20, 50, 100, 200],
    tableData: [],
    fetchFun: api.getBillList,
    subfromFunEditor: (data) => {
      return new Promise((resolve, reject) => {
        api.billRefund(data).then(res => {
          resolve(res)
        })
      })
    },
    fliterOption: [
      {
        name: '配置名称',
        key: 'name',
        type: "input"
      },
      {
        name: '配置内容',
        key: 'params',
        type: "input"
      },
      {
        name: '新建',
        type: 'fromButton',
        disableLabel: true,
        fromData: [
          {
            name: '配置名称',
            key: 'name',
            type: 'input',
            must: true
          },
          {
            name: '配置描述',
            key: 'desc',
            type: 'input',
            must: true
          }
        ],
        subfromData: {
          name: "",
          desc: "",
        },
        fromTitle: "新建",
        subfromFunIndex: "Add"
      }
    ],
    fliter: {
      page: 1,
      size: 20,
    },
    // platform	""
    // channel	""
    // version	""
    // white_list	""
    // status	"1"
    // start_bucket	"0"
    // end_bucket	"50"
    // create_time	""
    // update_time	""
    columns: [
      { field: "id", key: "id", title: "ID", align: "center", width: 20, sortBy: "" },
      { field: "name", key: "name", title: "名称", align: "center", width: 20, showOverflow: true },
      { field: "params", key: "params", title: "内容", align: "center", width: 20 },
      { field: "desc", key: "desc", title: "描述", align: "center", width: 20, showOverflow: true },
      { field: "layer", key: "layer", title: "层数", align: "center", width: 20 },
      { field: "platform", key: "platform", title: "平台", align: "center", width: 20 },
      { field: "channel", key: "channel", title: "渠道", align: "center", width: 20 },
      { field: "version", key: "version", title: "版本", align: "center", width: 20 },
      { field: "status", key: "status", title: "状态", align: "center", width: 20 },
      { field: "start_bucket", key: "start_bucket", title: "开始桶号", align: "center", width: 20 },
      { field: "end_bucket", key: "end_bucket", title: "结束桶号", align: "center", width: 20 },
      { field: "create_time", key: "create_time", title: "创建时间", align: "center", width: 50, sortBy: "desc" },
      { field: "update_time", key: "update_time", title: "更新时间", align: "center", width: 50, sortBy: "" },
      {
        field: "utils", key: "utils", title: "操作", align: "center", width: 50, fixed: "right",
        renderBodyCell: ({ row, column, rowIndex }, h) => {
          return (
            <div>
              <el-button type={row.white_list && row.white_list != ' ' ? 'success' : ''} v-on:click={() => {
                _this.tableData.fromData = [
                  {
                    name: '白名单',
                    key: 'white_list',
                    type: 'tags',
                    tag: '+新标签',
                    addTagText: '+新标签',
                  }
                ]
                _this.tableData.fromTitle = "白名单"
                _this.tableData.showFrom = true
                _this.tableData.subfromData = { id: row.id, white_list: row.white_list && row.white_list != ' ' ? row.white_list.split(",") : [] }
                _this.tableData.subfromFunIndex = "WhitList"
              }}>白名单</el-button>
              <el-button type="warning" v-on:click={() => {
                _this.tableData.fromData = [
                  {
                    name: '配置名称',
                    key: 'name',
                    type: 'input',
                    must: true
                  },
                  {
                    name: '配置描述',
                    key: 'desc',
                    type: 'input',
                    must: true
                  },
                  {
                    name: '生效渠道',
                    key: 'channel',
                    type: 'input',
                  },
                  {
                    name: '生效版本',
                    key: 'version',
                    type: 'input',
                  },
                  {
                    name: '配置层数',
                    key: 'layer',
                    type: 'input',
                    inputed: (value) => {
                      value = value.replace(/[^0-9]/g, '');
                      if (value != '' && value < 1) { value = 1; } if (value != '' && value > 10) { value = 10; }
                      _this.tableData.subfromData.layer = value
                    },
                    tips: "1-10的数字"
                  },
                  {
                    name: '开始桶号',
                    key: 'start_bucket',
                    type: 'input',
                    inputed: (value) => {
                      value = value.replace(/[^0-9]/g, '');
                      if (value != '' && value < 0) { value = 0; } if (value != '' && value > 100) { value = 100; }
                      _this.tableData.subfromData.start_bucket = value
                    },
                    tips: '0-100的数字'
                  },
                  {
                    name: '结束桶号',
                    key: 'end_bucket',
                    type: 'input',
                    inputed: (value) => {
                      value = value.replace(/[^0-9]/g, '');
                      if (value != '' && value < 0) { value = 0; } if (value != '' && value > 100) { value = 100; }
                      _this.tableData.subfromData.end_bucket = value
                    },
                    tips: '0-100的数字'
                  },
                  {
                    name: '用户平台',
                    key: 'platform',
                    type: "select",
                    items: [
                      {
                        name: '全部平台',
                        key: ''
                      },
                      {
                        name: '安卓',
                        key: 'android'
                      },
                      {
                        name: '苹果',
                        key: 'ios'
                      },
                      {
                        name: '电脑端网页',
                        key: 'web'
                      },
                      {
                        name: '小程序',
                        key: 'wx-mp'
                      },
                      {
                        name: '移动端网页',
                        key: 'h5'
                      }
                    ],
                  },
                  {
                    name: '状态',
                    key: 'status',
                    type: 'switch',
                    openValue: "1",
                    closeValue: "2",
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
                  params: params,
                  desc: row.desc,
                  status: row.status,
                  layer: row.layer,
                  platform: row.platform,
                  channel: row.channel,
                  version: row.version,
                  start_bucket: row.start_bucket,
                  end_bucket: row.end_bucket,
                }
                _this.tableData.fromTitle = "编辑"
                _this.tableData.subfromFunIndex = "Editor"
              }}>编辑</el-button>
              <el-popconfirm
                title="确定删除吗？"
                style="margin-left:10px"
                on-confirm={() => {
                  api.delConfigList({
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
        subFun: api.editorConfigList
      },
    ],
    tableSwitch: [
      {
        // 对应columns中field
        field: 'status',
        // columns中field为空时编辑整行
        value: 'status',
        openValue: "1",
        closeValue: "2",
        // 提交的函数，要求异步函数
        subFun: api.editorConfigList
      },
    ],
  }
}

export default data