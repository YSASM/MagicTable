
import api from "@/api/order/order/index"
import _this from "@/main.js"
let da = new Date()
let data = {
  tableData: {
    scrollWidth: 2000,
    pageSizeOption: [20, 50, 100, 200],
    tableData: [],
    fetchFun: api.getBillList,
    fliterOption: [
    ],
    fliter: {
      page: 1,
      size: 20,
    },
    columns: [
      { field: "id", key: "id", title: "ID", align: "center", width: 20, sortBy: "", fixed: "left", },
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