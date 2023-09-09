<template>
  <mtable v-if="show"></mtable>
</template>

<script>
import mtable from "@/components/MigicTable/index"
import api from "@/api/user/userList/index"
import _this from "@/main.js"
export default {
  components: {
    mtable
  },
  data() {
    let da = new Date()
    let data = {
      tableData: {
        scrollWidth: 1700,
        pageSizeOption: [20, 50, 100, 200],
        tableData: [],
        fetchFun: api.getUserList,
        subfromFun0: this.editorUser,
        fliterOption: [
          {
            name: 'id',
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
                name: '抖音推广',
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
            name: 'id',
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
          { field: "id", key: "id", title: "Id", align: "center", width: 10, },
          {
            field: "name", key: "name", title: "用户名", align: "center", width: 25,
            renderBodyCell: ({ row, column, rowIndex }, h) => {
              return (
                <div style={
                  {
                    'display': 'flex',
                    'flex-direction': 'row'
                  }
                }>
                  <span style={
                    {
                      'align-self': 'center',
                      'margin-right': '5px'
                    }
                  }>{row.name}</span>
                  <el-avatar style={
                    {
                      'align-self': 'center'
                    }
                  } size="small" src={row.avater}></el-avatar>
                </div>
              )
            }
          },
          { field: "platform", key: "platform", title: "平台", align: "center", width: 25, },
          { field: "version", key: "version", title: "版本", align: "center", width: 25, },
          { field: "channel", key: "channel", title: "渠道", align: "center", width: 25, },
          { field: "brand", key: "brand", title: "手机品牌", align: "center", width: 25, },
          { field: "model", key: "model", title: "手机型号", align: "center", width: 25, },
          { field: "phone", key: "phone", title: "手机号", align: "center", width: 25, },
          { field: "ad_identify", key: "ad_identify", title: "广告Id", align: "center", width: 25, },
          { field: "ad_source", key: "ad_source", title: "广告来源", align: "center", width: 25, },
          { field: "client_ip", key: "client_ip", title: "用户IP", align: "center", width: 25, },
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
            field: "role", key: "role", title: "用户状态", align: "center", width: 25,
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
          { field: "vip_name", key: "vip_name", title: "会员类型", align: "center", width: 25, },
          { field: "vip_expire_time", key: "vip_expire_time", title: "会员过期时间", align: "center", width: 30, },
          { field: "active_time", key: "active_time", title: "激活时间", align: "center", width: 50, },
          { field: "create_time", key: "create_time", title: "注册时间", align: "center", width: 50, },
          {
            field: "utils", key: "utils", title: "操作", align: "center", width: 50, fixed: "right",
            renderBodyCell: ({ row, column, rowIndex }, h) => {
              return (
                <el-button type="danger" v-on:click={() => {
                  _this.tableData.tableData.fromData = [
                    {
                      name: '头像',
                      key: 'avater',
                      type: 'input',
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
                  _this.tableData.tableData.showFrom = true
                  _this.tableData.tableData.subfromData = { vip_expire_time: row.vip_expire_time == "永不过期" ? new Date().getTime() : row.vip_expire_time, user_id: row.id, avater: row.avater, status: row.status, no_vip_expire_time: row.vip_expire_time == "永不过期" }
                  _this.tableData.tableData.subfromFunIndex = 0
                }}>编辑</el-button>
              );
            },
          },
        ],
        fromData: [],
        showFrom: false,
        subfromFun: async () => { }
      }
    }
    _this.tableData = data
    data.show = false
    return data
  },
  mounted() {
    this.show = true
  },
  methods: {
    editorUser(subfromData, fetchData) {
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
      api.editorUserList(subfromData).then(() => {
        fetchData()
      })
    }
  }
}
</script>