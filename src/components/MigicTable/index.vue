<template>
  <div class="container" v-if="overLoad">
    <el-card class="fliter">
      <el-form v-model="fliter" class="fliter-box" :inline="true" size="mini" label-width="auto">
        <el-form-item :label="item.name" class="fliter-item" v-for="item, index in fliterOption" :key="index">
          <el-input v-if="item.type == 'input'" v-model="item.value" clearable @keyup.enter.native="initData"></el-input>
          <el-select v-if="item.type == 'select'" v-model="item.value" @change="initData">
            <el-option v-for="i, ii in item.items" :key="ii" :label="i.name" :value="i.key">
            </el-option>
          </el-select>
          <el-date-picker v-if="item.type == 'time'" v-model="item.value" type="datetimerange" range-separator="至"
            start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="item.opt ? item.opt : pickerOptions"
            @change="initData">
          </el-date-picker>
        </el-form-item>
        <el-form-item class="fliter-item">
          <el-button type="primary" @click="fetchData">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="table">
      <ve-table :scroll-width="scrollWidth" id="loading-container" :columns="columns" :table-data="tableData"
        :border-around="true" :border-x="true" :border-y="true" rowKeyFieldName="fieldIndex"
        :contextmenu-body-option="contextmenuBodyOption" />
      <div v-show="!tableData || tableData.length == 0" class="empty-data">暂无数据</div>
      <ve-pagination class="table-pagination" :total="totalCount" :page-index="fliter.page"
        :page-size-option="pageSizeOption" :page-size="fliter.size" @on-page-number-change="pageNumberChange"
        @on-page-size-change="pageSizeChange" />
    </el-card>
    <!-- {{ showFrom }} -->

    <el-dialog title="提示" :visible.sync="showFrom" width="30%">
      <el-form ref="form" label-width="100px">
        <el-form-item :label="item.name" v-for="item, index in fromData" :key="index">
          <el-input v-if="item.type == 'input'" v-model="subfromData[item.key]" clearable></el-input>
          <el-date-picker v-if="item.type == 'timeOnly'" v-model="subfromData[item.key]" type="datetime"
            placeholder="选择日期时间" :disabled="subfromData[item.disablekey] == item.disableval"
            @change="subfromData[item.key] = subfromData[item.key].getTime()" style="width: 100%;">
          </el-date-picker>
          <el-switch v-if="item.type == 'switch'" v-model="subfromData[item.key]" :active-value="item.openValue"
            :inactive-value="item.closeValue">
          </el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showFrom = false">取 消</el-button>
        <el-button type="primary" @click="subForm">确
          定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import _this from "@/main.js"
const reflashKey = ["showFrom", "fromData", "subfromData", "subfromFunIndex"]


export default {
  name: 'mtable',
  watch: {

  },
  data() {
    let data = {
      contextmenuBodyOption: {
        contextmenus: [
          {
            type: "COPY",
          },
        ],
      },

      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      overLoad: false,
      scrollWidth: 1500,
      pageSizeOption: [20, 50, 100, 200],
      totalCount: 0,
      tableData: [],
      fetchFun: async (fliter) => { console.log(fliter) },
      subfromFun: null,
      subfromFunIndex: 0,
      fliterOption: [
        {
          name: '测试',
          key: 'test',
          type: "input",
          value: ''
        }
      ],
      fliter: {
        page: 1,
        size: 20,
      },
      columns: [],
      fromData: [],
      subfromData: {},
      showFrom: false,
    }
    let _thisdata = _this.tableData.tableData
    for (let k in _thisdata) {
      data[k] = _thisdata[k]
    }
    return data
  },
  created() {

  },
  mounted() {

    this.$nextTick(() => {
      reflashKey.forEach(key => {
        this.$watch(key, (v, ov) => {
          if (_this.tableData.tableData[key] != v) {
            _this.tableData.tableData[key] = v
          }
        })
      })
      this.loadingInstance = this.$veLoading({
        target: document.querySelector("#loading-container"),
        // 等同于
        // target:"#loading-container"
        name: "wave",
      });
      this.initData()
      this.overLoad = true
      setInterval(() => {
        let _thisdata = _this.tableData.tableData
        reflashKey.forEach(key => {
          this[key] = _thisdata[key]
        })
      }, 100)
    })
  },
  methods: {
    subForm() {
      this.getter('subfromFun' + this.subfromFunIndex)(this.subfromData, this.fetchData)
      this.showFrom = false
    },
    getter(s) {
      return this[s]
    },
    dateToString(date) {
      var year = date.getFullYear();
      var month = (date.getMonth() + 1).toString();
      var day = (date.getDate()).toString();
      if (month.length == 1) {
        month = "0" + month;
      }
      if (day.length == 1) {
        day = "0" + day;
      }
      var dateTime = year + "-" + month + "-" + day;
      return dateTime;
    },
    pageNumberChange(p) {
      this.fliter.page = p
      this.fetchData()
    },
    pageSizeChange(s) {
      this.fliter.size = s
      this.fetchData()
    },
    fetchData() {
      this.loadingInstance.show();
      this.fliterOption.forEach(item => {
        if (item.type === 'time') {
          if (item.value && item.value.length > 1) {
            this.fliter[item.startKey] = item.subStr ? this.dateToString(item.value[0]) : Math.floor(item.value[0].getTime() / 1000)
            this.fliter[item.endKey] = item.subStr ? this.dateToString(item.value[1]) : Math.floor(item.value[1].getTime() / 1000)
          } else {
            this.fliter[item.startKey] = ''
            this.fliter[item.endKey] = ''
          }
        }
        else {
          this.fliter[item.key] = item.value
        }
      })
      this.fetchFun(this.fliter).then(res => {
        this.tableData = res.data.items
        this.formtData(this.tableData)
        this.totalCount = res.data.total
        this.loadingInstance.close();
      })
    },
    initData() {
      this.fliter.page = 1
      this.fliter.size = this.pageSizeOption[0]
      this.fetchData()
    },
    formtData(data) {
      let fieldIndex = 0
      data.forEach(res => {
        res.fieldIndex = fieldIndex
        for (let k in res) {
          res[k] = res[k].toLocaleString()
        }
        fieldIndex++
      })
      return data
    },
  }
}
</script>
<style lang="scss" scoped>
.container {
  padding: 0 !important;
  margin: 0 !important;
  background: none;

  .table-pagination {
    margin-top: 20px;
  }

  .fliter-box {
    .fliter-item {
      // display: flex;
      // flex-direction: row;
      // align-items: center;
      margin: auto;
      margin-left: 0;
      margin-right: 20px;
      margin-bottom: 10px;
    }
  }

  .empty-data {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    width: 100%;
    color: #666;
    font-size: 16px;
    border: 1px solid #eee;
    border-top: 0;
  }
}
</style>