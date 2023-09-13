import api from "@/api/order/order/index"
import _this from "@/main.js"
let da = new Date()
let data = {
  tableData: {
    scrollWidth: 2000,
    pageSizeOption: [20, 50, 100, 200],
    tableData: [],
    fetchFun: api.getBillList,
    subfromFunRefund: api.billRefund,
    fliterOption: [
      {
        name: '用户ID',
        key: 'user_id',
        type: "input"
      },
      {
        name: '订单号',
        key: 'out_trade_no',
        type: "input"
      },
      {
        name: '商品名称',
        key: 'goods_name',
        type: "input"
      },
      {
        name: '支付类型',
        key: 'pay_type',
        type: "select",
        items: [
          {
            name: '全部类型',
            key: ''
          },
          {
            name: '微信',
            key: 'weixin'
          },
          {
            name: '支付宝',
            key: 'alipay'
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
        name: '用户版本',
        key: 'version',
        type: "input"
      },
      {
        name: '渠道',
        key: 'channel',
        type: "input"
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
    // callback_info	""
    // status	"待支付"
    // goods_id	"20040"
    // goods_name	"月度会员"
    // goods_source	"test"
    columns: [
      { field: "id", key: "id", title: "ID", align: "center", width: 20, sortBy: "", fixed: "left", },
      { field: "user_id", key: "user_id", title: "用户ID", align: "center", width: 25, sortBy: "" },
      { field: "user_name", key: "user_name", title: "用户名", align: "center", width: 25, showOverflow: true },
      { field: "user_source", key: "user_source", title: "推广来源", align: "center", width: 25 },
      { field: "goods_id", key: "goods_id", title: "商品ID", align: "center", width: 25 },
      { field: "goods_name", key: "goods_name", title: "商品名", align: "center", width: 25 },
      { field: "goods_source", key: "goods_source", title: "商品来源", align: "center", width: 25 },
      { field: "out_trade_no", key: "out_trade_no", title: "订单号", align: "center", width: 25, showOverflow: true },
      { field: "total_fee", key: "total_fee", title: "付款金额", align: "center", width: 25, endStr: '元' },
      {
        field: "pay_type", key: "pay_type", title: "支付方式", align: "center", width: 30, showTag: {
          "微信": {
            type: 'success',
            content: '微信支付'
          },
          "支付宝": {
            type: 'primary',
            content: '支付宝支付'
          }
        }
      },
      { field: "pay_channel", key: "pay_channel", title: "支付渠道", align: "center", width: 25 },
      { field: "platform", key: "platform", title: "平台", align: "center", width: 25 },
      { field: "channel", key: "channel", title: "用户渠道", align: "center", width: 25 },
      { field: "version", key: "version", title: "用户版本", align: "center", width: 25 },
      {
        field: "status", key: "status", title: "订单状态", align: "center", width: 25, showTag: {
          "1": {
            type: '',
            content: '待支付'
          },
          "2": {
            type: 'success',
            content: '已支付'
          },
          "3": {
            type: 'danger',
            content: '已退款'
          },
          "4": {
            type: 'warning',
            content: '已取消'
          },
          "5": {
            type: 'info',
            content: '已超时'
          },
        }
      },
      { field: "create_time", key: "create_time", title: "创建时间", align: "center", width: 50, sortBy: "desc" },
      { field: "pay_time", key: "pay_time", title: "支付时间", align: "center", width: 50, sortBy: "" },
      { field: "update_time", key: "update_time", title: "更新时间", align: "center", width: 50, sortBy: "" },
      {
        field: "utils", key: "utils", title: "操作", align: "center", width: 50, fixed: "right",
        renderBodyCell: ({ row, column, rowIndex }, h) => {
          return (
            <div>
              <el-button disabled={row.status != '2'} type="danger" v-on:click={() => {
                _this.tableData.fromData = [
                  {
                    name: '金额',
                    key: 'total_fee',
                    type: 'text',
                    unsub: true
                  },
                  {
                    name: '密码',
                    key: 'password',
                    type: 'input',
                    must: true
                  }
                ]
                _this.tableData.fromTitle = "白名单"
                _this.tableData.showFrom = true
                _this.tableData.subfromData = { id: row.id, total_fee: row.total_fee + '元', password: '' }
                _this.tableData.subfromFunIndex = "Refund"
              }}>退款</el-button>
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
  }
}

export default data