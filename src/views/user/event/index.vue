<template>
  <mtable v-if="show"></mtable>
</template>

<script>
import mtable from "@/components/MigicTable/index"
import api from "@/api/user/event/index"
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
        fetchFun: api.getUserEventList,
        subfromFun0: this.editorUser,
        fliterOption: [
          {
            name: 'ID',
            key: 'id',
            type: "input"
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
        // id	"3"
        // day	"2023-09-09"
        // source	"client"
        // platform	"android"
        // channel	"test"
        // version	"1.2.3"
        // user_id	"1"
        // type	"click"
        // ename	"client.guidle.clieck.ok.teset"
        // ekey	"client.guidle.clieck.ok.teset"
        // value	"11234"
        // extra	""
        // create_time	"2023-09-09 17:33:21"
        columns: [
          { field: "id", key: "id", title: "ID", align: "center", width: 10, },
          { field: "user_id", key: "user_id", title: "用户ID", align: "center", width: 10, },
          { field: "channel", key: "channel", title: "渠道", align: "center", width: 10, },
          { field: "version", key: "version", title: "版本", align: "center", width: 10, },

          { field: "day", key: "day", title: "日期", align: "center", width: 25, },
          { field: "source", key: "source", title: "方式", align: "center", width: 25, },
          { field: "type", key: "type", title: "类型", align: "center", width: 25, },
          { field: "source", key: "source", title: "方式", align: "center", width: 25, },
          { field: "ename", key: "ename", title: "关键字名称", align: "center", width: 25, },
          { field: "ekey", key: "ekey", title: "关键字", align: "center", width: 25, },
          { field: "value", key: "value", title: "内容", align: "center", width: 25, },
          { field: "extra", key: "extra", title: "拓展内容", align: "center", width: 25, },


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
              }
              return (
                <el-tag type={tagType[row.status]}>{row.status}</el-tag>
              );
            },
          },
          { field: "vip_name", key: "vip_name", title: "会员类型", align: "center", width: 25, },
          { field: "vip_expire_time", key: "vip_expire_time", title: "会员过期时间", align: "center", width: 50, },
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
                    }
                  ]
                  _this.tableData.tableData.showFrom = true
                  _this.tableData.tableData.subfromData = {}
                  _this.tableData.tableData.subfromFunIndex = 0
                }}>编辑</el-button>
              );
            },
          },
        ],
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
    editorUserEvent(subfromData, fetchData) {
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