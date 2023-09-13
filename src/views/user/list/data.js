import api from "@/api/user/list/index"
import _this from "@/main.js"
let da = new Date()
let data = {
  tableData: {
    scrollWidth: 1800,
    pageSizeOption: [20, 50, 100, 200],
    tableData: [],
    fetchFun: api.getUserList,
    subfromFun0: (subfromData) => {
      return new Promise((resolve, reject) => {
        if (subfromData.no_vip_expire_time) {
          subfromData.no_vip_expire_time = undefined
          subfromData.vip_expire_time = "-1"
        }
        else {
          subfromData.vip_expire_time = String(Math.floor(subfromData.vip_expire_time / 1000))
        }
        if (subfromData.status == "正常") {
          subfromData.status = "1"
        } else {
          subfromData.status = "2"
        }
        api.editorUserList(subfromData).then(res => {
          resolve()
        })
      })
    },
    fliterOption: [
      {
        name: 'ID',
        key: 'id',
        type: "input"
      },
      {
        name: '电话',
        key: 'phone',
        type: "input"
      },
      {
        name: '版本',
        key: 'version',
        type: "input"
      },
      {
        name: '渠道',
        key: 'channel',
        type: "input"
      },
      {
        name: '手机品牌',
        key: 'brand',
        type: "input"
      },
      {
        name: '手机型号',
        key: 'model',
        type: "input"
      },
      {
        name: '设备ID',
        key: 'device_id',
        type: "input"
      },
      {
        name: '用户IP',
        key: 'client_ip',
        type: "input"
      },
      {
        name: '广告ID',
        key: 'ad_identify',
        type: "input"
      },
      {
        name: '用户类型',
        key: 'role',
        type: "select",
        items: [
          {
            name: '所有用户',
            key: ''
          },
          {
            name: '临时用户',
            key: '1'
          },
          {
            name: '登录用户',
            key: '2'
          }
        ],
        value: ''
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
        value: ''
      },
      {
        name: '广告来源',
        key: 'ad_source',
        type: "select",
        items: [
          {
            name: '全部来源',
            key: ''
          },
          {
            name: '自然流量',
            key: 'free'
          },
          {
            name: '百度推广',
            key: 'baidu'
          },
          {
            name: '巨量推广',
            key: 'ocean'
          },
          {
            name: '腾讯推广',
            key: 'tencent'
          },
          {
            name: '快手推广',
            key: 'kuaishou'
          },
          {
            name: 'vivo推广',
            key: 'vivo'
          },
          {
            name: 'oppo推广',
            key: 'oppo'
          },
          {
            name: '华为推广',
            key: 'huawei'
          },
          {
            name: '星图推广',
            key: 'xingtu'
          }
        ],
        value: ''
      },
      {
        name: '时间',
        startKey: 'start_time',
        endKey: 'end_time',
        type: "time",
        value: [new Date(da.getFullYear(), da.getMonth(), da.getDate(), 0, 0, 0), new Date(da.getFullYear(), da.getMonth(), da.getDate(), 23, 59, 59)]
      },
    ],
    fliter: {
      page: 1,
      size: 20,
    },
    columns: [
      { field: "id", key: "id", title: "ID", align: "center", width: 20, sortBy: "" },
      {
        field: "name", key: "name", title: "用户名", align: "center", width: 25,
        renderBodyCell: ({ row, column, rowIndex }, h) => {
          return (
            <div style="display:flex;flex-direction:row;justify-content:space-between;">
              <el-avatar style="align-self:center;margin-right:5px" size={18} src={row.avater}></el-avatar>
              <span style="align-self:center;">{row.name}</span>
            </div>
          )
        }
      },
      { field: "platform", key: "platform", title: "平台", align: "center", width: 25, },
      { field: "version", key: "version", title: "版本", align: "center", width: 25, },
      { field: "channel", key: "channel", title: "渠道", align: "center", width: 25, },
      { field: "ad_source", key: "ad_source", title: "广告来源", align: "center", width: 25, },
      { field: "brand", key: "brand", title: "手机品牌", align: "center", width: 25, },
      { field: "model", key: "model", title: "手机型号", align: "center", width: 25, },
      {
        field: "role", key: "role", title: "用户类型", align: "center", width: 25,
        renderBodyCell: ({ row, column, rowIndex }, h) => {
          let tagType = {
            "临时用户": 'info',
            "登录用户": 'primary'
          }
          return (
            <el-tag type={tagType[row.role]}>{row.role}</el-tag>
          );
        },
      },
      {
        field: "status", key: "status", title: "用户状态", align: "center", width: 25,
        renderBodyCell: ({ row, column, rowIndex }, h) => {
          let tagType = {
            "正常": 'success',
            "禁用": 'danger',
            "": 'info'
          }
          return (
            <el-tag type={tagType[row.status]}>{row.status}</el-tag>
          );
        },
      },
      {
        field: "vip_name", key: "vip_name", title: "会员类型", align: "center", width: 25,
        renderBodyCell: ({ row, column, rowIndex }, h) => {
          let tagType = {
            "终生会员": 'success',
            "普通会员": 'primary',
            "非会员": 'info'
          }
          if (row.vip_expire_time != "" && row.vip_expire_time != "永不过期") {
            return (
              <el-tooltip class="item" effect="dark" content={row.vip_expire_time} placement="top">
                <el-tag type={tagType[row.vip_name]}>{row.vip_name}</el-tag>
              </el-tooltip>
            )
          }
          else {
            return (
              <el-tag type={tagType[row.vip_name]}>{row.vip_name}</el-tag>
            )
          }
        },
      },
      { field: "phone", key: "phone", title: "手机号", align: "center", width: 30, },
      { field: "ad_identify", key: "ad_identify", title: "广告Id", align: "center", width: 25, },

      { field: "client_ip", key: "client_ip", title: "用户IP", align: "center", width: 35, },
      { field: "active_time", key: "active_time", title: "活跃时间", align: "center", width: 50, sortBy: "" },
      { field: "create_time", key: "create_time", title: "激活时间", align: "center", width: 50, sortBy: "desc" },
      {
        field: "utils", key: "utils", title: "操作", align: "center", width: 25, fixed: "right",
        renderBodyCell: ({ row, column, rowIndex }, h) => {
          return (
            <el-button type="warning" v-on:click={() => {
              _this.tableData.fromData = [
                {
                  name: '头像',
                  key: 'avater',
                  type: 'input',
                  must: true
                },
                {
                  name: '会员过期时间',
                  key: 'vip_expire_time',
                  type: 'timeOnly',
                  disablekey: "no_vip_expire_time",
                  disableval: true
                },
                {
                  name: '永久会员',
                  key: 'no_vip_expire_time',
                  type: 'switch',
                  openValue: true,
                  closeValue: false,
                },
                {
                  name: '状态',
                  key: 'status',
                  type: 'switch',
                  openValue: "正常",
                  closeValue: "禁用",
                }
              ]
              _this.tableData.fromTitle = "编辑"
              _this.tableData.showFrom = true
              _this.tableData.subfromData = { vip_expire_time: row.vip_expire_time == "永不过期" ? new Date().getTime() : row.vip_expire_time, user_id: row.id, avater: row.avater, status: row.status, no_vip_expire_time: row.vip_expire_time == "永不过期" }
              _this.tableData.subfromFunIndex = 0
            }}>编辑</el-button>
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
  }
}

export default data