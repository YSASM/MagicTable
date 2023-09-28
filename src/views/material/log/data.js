import api from "@/api/material/log/index"
import _this from "@/main.js"
import utils from "@/utils"
let data = {
  scrollWidth: 1000,
  pageSizeOption: [20, 50, 100, 200],
  fetchFun: api.getLogList,
  fliterOption: [
    {
      name: '用户ID',
      key: 'user_id',
      type: "input"
    },
    {
      name: '域名',
      key: 'domain',
      type: "input"
    },
    {
      name: '抽取器',
      key: 'extractor',
      type: "input"
    },
    {
      name: '请求内容',
      key: 'request',
      type: "input"
    },
    {
      name: '请求内容md5',
      key: 'request_md5',
      type: "input"
    },
    {
      name: '状态',
      key: 'status',
      type: "select",
      items: [
        {
          name: '全部',
          key: '',
        },
        {
          name: '成功',
          key: '1',
        },
        {
          name: '失败',
          key: '-1',
        }
      ],
      value: ''
    },
    {
      name: '时间',
      startKey: 'start_time',
      endKey: 'end_time',
      type: "time",
      value: utils.defaultDate()
    },
  ],
  fliter: {
    page: 1,
    size: 20,
  },
  columns: [
    { field: "id", key: "id", title: "ID", align: "center", width: 20, sortBy: "", fixed: "left", },
    { field: "user_id", key: "user_id", title: "用户ID", align: "center", width: 25, },
    { field: "domain", key: "domain", title: "域名", align: "center", width: 30, showOverflow: "domain" },
    { field: "extractor", key: "extractor", title: "抽取器", align: "center", width: 30 },
    { field: "request", key: "request", title: "请求内容", align: "center", width: 50, showOverflow: "request" },
    { field: "request_md5", key: "request_md5", title: "请求内容md5", align: "center", width: 60, showOverflow: "request_md5" },
    { field: "response", key: "response", title: "返回结构", align: "center", width: 20, showOverflow: "response" },
    { field: "count", key: "count", title: "请求次数", align: "center", width: 20, endStr: '次' },
    { field: "cost", key: "cost", title: "耗时", align: "center", width: 20 },
    {
      field: "status", key: "status", title: "返回状态", align: "center", width: 25, showTag: {
        "default": {
          type: 'info',
          content: '&&&|status_name'
        },
        "2": {
          type: 'success',
          content: '&&&|status_name'
        },
      }
    },
    { field: "create_time", key: "create_time", title: "创建时间", align: "center", width: 50, sortBy: "desc" },
    { field: "update_time", key: "update_time", title: "更新时间", align: "center", width: 50, sortBy: "" },
  ],
  tableShowJson: [
    {
      field: 'id',
      value: '',
      width: '500px'
    },
    {
      field: 'response',
      value: 'response',
      width: '500px'
    },
  ],
}


export default data