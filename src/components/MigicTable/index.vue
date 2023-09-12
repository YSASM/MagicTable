<template>
  <div class="container" v-if="overLoad" id="container" ref="container">
    <el-card class="fliter">
      <el-form v-model="fliter" class="fliter-box" :inline="true" size="mini" label-width="auto">
        <el-form-item :label="item.disableLabel ? '' : item.name" class="fliter-item" v-for="item, index in fliterOption"
          :key="index">
          <el-input v-if="item.type == 'input'" v-model="item.value" clearable @keyup.enter.native="initData"></el-input>
          <el-select v-if="item.type == 'select'" v-model="item.value" @change="initData">
            <el-option v-for="i, ii in item.items" :key="ii" :label="i.name" :value="i.key">
            </el-option>
          </el-select>
          <el-date-picker v-if="item.type == 'time'" v-model="item.value" type="datetimerange" range-separator="至"
            start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="item.opt ? item.opt : pickerOptions"
            @change="initData">
          </el-date-picker>
          <el-button type="warning" v-if="item.type == 'fromButton'" @click="() => {
            showFrom = true
            fromData = deepClone(item.fromData)
            subfromData = deepClone(item.subfromData)
            subfromFunIndex = item.subfromFunIndex
            if (item.fromTitle) {
              fromTitle = item.fromTitle
            }
          }">{{ item.name }}</el-button>
        </el-form-item>
        <el-form-item class="fliter-item">
          <el-button type="primary" @click="fetchData">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="table" id="table">
      <ve-table :scroll-width="scrollWidth" :columns="columns" :table-data="tableData" :border-around="true"
        :border-x="true" :border-y="true" rowKeyFieldName="fieldIndex" :contextmenu-body-option="contextmenuBodyOption"
        :sort-option="sortOption" :column-width-resize-option="columnWidthResizeOption" />
      <div v-show="!tableData || tableData.length == 0" class="empty-data">暂无数据</div>
      <ve-pagination class="table-pagination" :total="totalCount" :page-index="fliter.page"
        :page-size-option="pageSizeOption" :page-size="fliter.size" @on-page-number-change="pageNumberChange"
        @on-page-size-change="pageSizeChange" />
    </el-card>
    <!-- {{ showFrom }} -->

    <el-dialog :title="fromTitle" :visible.sync="showFrom" width="30%">
      <el-form v-model="subfromData" ref="form" label-width="100px">
        <el-form-item :prop="item.key" :label="item.name" v-for="item, index in  fromData " :key="index" :rules="item.must ? {
          required: true, trigger: 'blur', validator: (rule, value, callback) => {
            if (value, subfromData[item.key] == '') {
              callback(new Error('必填项'));
            } else {
              callback();
            }
          }
        } : {}">
          <el-input v-if="item.type == 'input'" v-model="subfromData[item.key]" clearable
            :disabled="item.disablekey && subfromData[item.disablekey] == item.disableval"
            @input="item.inputed"></el-input>
          <el-date-picker v-if="item.type == 'timeOnly'" v-model="subfromData[item.key]" type="datetime"
            placeholder="选择日期时间" :disabled="item.disablekey && subfromData[item.disablekey] == item.disableval"
            @change="subfromData[item.key] = subfromData[item.key].getTime()" style="width: 100%;">
          </el-date-picker>
          <el-switch v-if="item.type == 'switch'" v-model="subfromData[item.key]" :active-value="item.openValue"
            :inactive-value="item.closeValue"
            :disabled="item.disablekey && subfromData[item.disablekey] == item.disableval">
          </el-switch>
          <div v-if="item.type == 'tags'" style="border: solid 1px #e6e6e6;width: 100%;padding: 10px;border-radius:10px;">
            <el-tag :key="index" v-for="tag, index in subfromData[item.key]"
              :closable="!(item.disablekey && subfromData[item.disablekey] == item.disableval)"
              :disable-transitions="false"
              @close="() => { subfromData[item.key].splice(subfromData[item.key].indexOf(tag), 1); }">
              {{ tag }}
            </el-tag>
            <el-input class="input-new-tag" v-model="item.tag" ref="saveTagInput" size="mini"
              @keyup.enter.native="() => { if (item.tag && item.tag != item.addTagText) { subfromData[item.key].push(item.tag); item.tag = ''; } }"
              @blur="() => { if (item.tag && item.tag != item.addTagText) { subfromData[item.key].push(item.tag); } item.tag = item.addTagText; }"
              @focus="item.tag = ''" :disabled="item.disablekey && subfromData[item.disablekey] == item.disableval">
            </el-input>
          </div>
          <el-select v-if="item.type == 'select'" v-model="subfromData[item.key]" style="width: 100%;">
            <el-option v-for="i, ii in item.items" :key="ii" :label="i.name" :value="i.key">
            </el-option>
          </el-select>
          <JsonEditor v-if="item.type == 'jsonIinput'" copyable
            :style='"width:" + item.width + " !important;text-align:left;height:" + item.height'
            v-model="subfromData[item.key]" :showBtns="false" mode="code" @has-error="disabledSubFrom = true"
            @json-change="disabledSubFrom = false"></JsonEditor>
          <span style="font-size: 10px;color: red;position: absolute;bottom: -25px;right: 0;">{{ item.tips }}</span>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showFrom = false">取 消</el-button>
        <el-button type="primary" @click="subForm" :disabled="disabledSubFrom || judgeFrom()">确
          定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import _this from "@/main.js"
import JsonEditor from 'vue-json-editor';
import { deepClone } from "@/utils/index.js";
var reflashKey = []


export default {
  name: 'mtable',
  watch: {

  },
  components: {
    JsonEditor
  },
  data() {
    let data = {
      Error: Error,
      console: console,
      disabledSubFrom: false,
      columnWidthResizeOption: {
        // default false
        enable: true,
        // column resize min width
        minWidth: 30,
        // column size change
        // sizeChange: ({ column, differWidth, columnWidth }) => {
        //   this.columnResizeInfo.column = column;
        //   this.columnResizeInfo.differWidth = differWidth;
        //   this.columnResizeInfo.columnWidth = columnWidth;
        // },
      },
      sort: '',
      sortOption: {
        // sort always
        sortAlways: true,
        // multipleSort: true,
        sortChange: (params, defaultGet) => {
          let keys = Object.keys(params)
          let sort = ""
          keys.forEach(key => {
            if (params[key]) {
              let arr = key.split('')
              let k = ''
              arr.forEach(i => {
                let code = i.charCodeAt()
                if (code >= 65 && code <= 90 && k != '') {
                  k += '_' + i.toLowerCase()
                }
                else {
                  k += i
                }

              })
              sort = k + ' ' + params[key].toUpperCase()
              return
            }

          })
          if (defaultGet) {
            return sort
          } else {
            this.sort = sort
            this.fetchData()
          }
          // this.sortChange(params);
        },
      },
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
      subfromFunIndex: 0,
      fromTitle: '操作',
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
      tableShowJson: [],
      disableJsonEditorSub: false,
      tableEditorJson: [],
      tableEditorJsonContent: {},
      tableSwitch: []
    }
    let _thisdata = _this.tableData.tableData
    // data更新
    for (let k in _thisdata) {
      data[k] = _thisdata[k]
    }
    let defaultSort = {}
    data.columns.forEach(col => {
      if (!col.ellipsis) {
        col.ellipsis = {
          showTitle: true,
          lineClamp: 1,
        }
        if (col.sortBy || col.sortBy === "") {
          defaultSort[col.field] = col.sortBy
        }
        data.tableShowJson.forEach(item => {
          if (item.field == col.field) {
            col.renderBodyCell = ({ row, column, rowIndex }, h) => {
              let contant = item.value ? row[item.value] : row
              let contanttype = typeof (contant)
              let width = item.width
              if (!width) {
                width = "100%"
              }
              if (contanttype == 'string') {
                try {
                  contant = JSON.parse(contant)
                } catch (e) {
                  contant = {}
                }
              }
              else if (contanttype != 'object') {
                contant = {}
              }
              return (
                <el-popover popper-class="popper-class pop-max-content" placement="top">
                  <div style="text-align:center">
                    <json-viewer expanded={true} value={contant} boxed sort style={"width:" + width + " !important;text-align:start"}></json-viewer>
                    <el-button style={"width:" + width + " !important;margin-top:10px;"} type="primary" on-click={() => {
                      this.$copyText(JSON.stringify(contant))
                      this.$message.success("复制成功")
                    }}>一键复制</el-button>
                  </div >
                  <div class="font-blue" type="text" slot="reference"><i class="el-icon-view"></i>{row[item.field]}</div>
                </el-popover >
              )
            }

          }
        })
        data.tableEditorJson.forEach(item => {
          if (item.field == col.field) {
            col.renderBodyCell = ({ row, column, rowIndex }, h) => {
              let width = item.width
              if (!width) {
                width = "100%"
              }
              let height = item.height
              if (!height) {
                height = "100%"
              }
              if (!this.tableEditorJsonContent[item.value + rowIndex]) {
                let contanttype = typeof (row[item.value])
                if (contanttype == 'string') {
                  try {
                    this.tableEditorJsonContent[item.value + rowIndex] = JSON.parse(row[item.value])
                  } catch (e) {
                    this.tableEditorJsonContent[item.value + rowIndex] = {}
                  }
                } else if (contanttype != 'object') {
                  this.tableEditorJsonContent[item.value + rowIndex] = {}
                } else {
                  this.tableEditorJsonContent[item.value + rowIndex] = row[item.value]
                }
              }


              return (
                <el-popover popper-class="popper-class pop-max-content" placement="top">
                  <div style="text-align:center">
                    <JsonEditor copyable={true} style={"width:" + width + " !important;text-align:left;height:" + height} v-model={this.tableEditorJsonContent[item.value + rowIndex]}
                      show-btns={false}
                      lang="zh"
                      mode="code"
                      expanded-on-start={true}
                      on-has-error={() => {
                        this.disableJsonEditorSub = true
                      }} on-json-change={() => {
                        this.disableJsonEditorSub = false
                      }}></JsonEditor>
                    <el-button disabled={this.disableJsonEditorSub} style={"width:" + width + " !important;margin-top:10px;"} type="primary" on-click={() => {
                      this.colsePopover();
                      let params = {
                        id: row.id,
                      }
                      params[item.value] = JSON.stringify(this.tableEditorJsonContent[item.value + rowIndex])
                      item.subFun(params).then(() => {
                        this.$message.success("操作成功")
                        this.fetchData()
                      });
                    }}>提交</el-button>
                  </div >
                  <div class="font-blue" type="text" slot="reference"><i class="el-icon-edit"></i>{row[item.field]}</div>
                </el-popover >
              )
            }

          }
        })
        data.tableSwitch.forEach(item => {
          if (item.field == col.field) {
            col.renderBodyCell = ({ row, column, rowIndex }, h) => {
              return (
                <el-switch on-change={() => {
                  let params = {
                    id: row.id,
                  }
                  params[item.value] = row[item.value]
                  item.subFun(params).then(() => {
                    this.$message.success("操作成功")
                    this.fetchData()
                  });
                }} v-model={row[item.value]} active-value={item.openValue} inactive-value={item.closeValue} ></el-switch>
              )
            }
          }
        })
      }
    })
    data.sort = data.sortOption.sortChange(defaultSort, true)
    reflashKey = Object.keys(data)
    // 反向更新_this
    for (let k in data) {
      _this.tableData.tableData[k] = data[k]
    }
    return data
  },
  created() {

  },
  mounted() {
    // 解决mounted获取不到dom
    this.$once("hook:updated", function () {
      // 表格加载
      let target = document.querySelector("#table")
      this.loadingInstance = this.$veLoading({
        target: target,
        name: "wave",
      });
      this.initData()
    })
    this.$nextTick(() => {
      // 将更改的数据更新到_this中
      reflashKey.forEach(key => {
        this.$watch(key, (v, ov) => {
          if (_this.tableData.tableData[key] != v) {
            _this.tableData.tableData[key] = v
          }
        })
      })
      // 监听_this更新数据
      setInterval(() => {
        let _thisdata = _this.tableData.tableData
        reflashKey.forEach(key => {
          this[key] = _thisdata[key]
        })
      }, 100)
      this.overLoad = true
    })
    _this.fetchData = this.fetchData
    _this.initData = this.initData
  },
  methods: {
    colsePopover() {
      this.$refs.container.click()
    },
    judgeFrom() {
      let that = this
      let flage = false
      that.fromData.forEach(item => {
        if (item.must && that.subfromData[item.key] === '') {
          flage = true
        }
      })
      return flage
    },
    subForm() {
      let that = this
      that.showFrom = false
      let flage = false
      let flageName = ''
      that.fromData.forEach(item => {
        if (item.must && that.subfromData[item.key] === '') {
          flage = true
          flageName = item.name
        }
      })
      if (flage) {
        that.$message.error(flageName + "不能为空")
        return
      }

      that.getter('subfromFun' + that.subfromFunIndex)(that.subfromData).then(() => {
        that.fromData = []
        that.subfromData = {}
        that.subfromFunIndex = 0
        this.$message.success("操作成功")
        that.fetchData()
      })
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
      this.fliter.sort = this.sort
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
    deepClone,
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

  .el-tag .el-tag {
    margin-right: 10px;
  }

  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }

}
</style>