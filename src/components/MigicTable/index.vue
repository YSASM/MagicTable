<template>
  <div class="container" v-if="overLoad" id="container" ref="container">
    <el-card class="fliter">
      <el-form v-model="fliter" class="fliter-box" :inline="true" size="mini" label-width="auto">
        <el-form-item
          :label="item.type === 'switch' && item.openStr && item.closeStr ? item.value == item.openValue ? item.openStr : item.value == item.closeValue ? item.closeStr : item.name : item.disableLabel ? '' : item.name"
          class="fliter-item" v-for="item, index in fliterOption" :key="index">
          <el-input v-if="item.type == 'input'" v-model="item.value" clearable @keyup.enter.native="initData"></el-input>
          <el-select v-if="item.type == 'select'" v-model="item.value" @change="initData">
            <el-option v-for="i, ii in item.items" :key="ii" :label="i.name" :value="i.key">
            </el-option>
          </el-select>
          <el-date-picker v-if="item.type == 'time'" v-model="item.value" type="datetimerange" range-separator="至"
            start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="item.opt ? item.opt : pickerOptions"
            @change="initData">
          </el-date-picker>
          <el-switch v-if="item.type == 'switch'" v-model="item.value" :active-value="item.openValue"
            :inactive-value="item.closeValue" @change="initData">
          </el-switch>
          <el-button type="warning" v-if="item.type == 'formButton'" @click="() => {
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
        <el-form-item class="fliter-item">
          <el-button @click="fliterOption = deepClone(fliterOptionDefault); fetchData()">清空筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="table" id="table">
      <ve-table :scroll-width="scrollWidth" :columns="columnsOpt" :table-data="tableData" :border-around="true"
        :border-x="true" :border-y="true" rowKeyFieldName="fieldIndex" :contextmenu-header-option="contextmenuBodyOption"
        :contextmenu-body-option="contextmenuBodyOption" :sort-option="sortOption"
        :column-width-resize-option="columnWidthResizeOption" />
      <div v-show="!tableData || tableData.length == 0" class="empty-data">暂无数据</div>
      <ve-pagination class="table-pagination" :total="totalCount" :page-index="fliter.page"
        :page-size-option="pageSizeOption" :page-size="fliter.size" @on-page-number-change="pageNumberChange"
        @on-page-size-change="pageSizeChange" />
    </el-card>
    <!-- {{ showFrom }} -->

    <el-dialog :title="fromTitle" :visible.sync="showFrom" width="30%">
      <el-form v-model="subfromData" ref="form" label-width="100px">
        <el-form-item :prop="item.key" :label="item.name" v-for="item, index in  fromData " :key="index" :rules="item.must ? {
          required: true, trigger: item.trigger || 'change', validator: (rule, value, callback) => {
            if (subfromData[item.key] == '') {
              disabledSubFrom[item.key] = true
              $forceUpdate();
              callback('必填项')
              return
            }
            if (item.rule) {
              if (typeof (item.rule) == 'object') {
                if (item.rule.onlyNum) {
                  subfromData[item.key] = subfromData[item.key].replace(/[^0-9]/g, '');
                  if (item.rule.minNum) {
                    let minNum = item.rule.minNum
                    if (typeof (minNum) == 'string') {
                      minNum = parseInt(subfromData[minNum]) + 1
                    }
                    if (subfromData[item.key] != '' && parseInt(subfromData[item.key]) < minNum) {
                      disabledSubFrom[item.key] = true
                      $forceUpdate();
                      callback(item.rule.minStr || '最小为' + minNum)
                      return
                    }
                  }
                  if (item.rule.maxNum) {
                    let maxNum = item.rule.maxNum
                    if (typeof (maxNum) == 'string') {
                      maxNum = parseInt(subfromData[maxNum]) - 1
                    }
                    if (subfromData[item.key] != '' && parseInt(subfromData[item.key]) > maxNum) {
                      disabledSubFrom[item.key] = true
                      $forceUpdate();
                      callback(item.rule.maxStr || '最大为' + maxNum)
                      return
                    }
                  }
                }
              }
              else {
                let cb = item.rule(subfromData[item.key])
                if (cb) {
                  disabledSubFrom[item.key] = true
                  $forceUpdate();
                  callback(cb)
                  return
                }
              }
            }
            delete disabledSubFrom[item.key]
            $forceUpdate();
            callback();
          }
        } : {}">
          <el-input v-if="item.type == 'input'" v-model="subfromData[item.key]" clearable
            :disabled="item.disablekey && subfromData[item.disablekey] == item.disableval ? !item.able : item.able"
            @input="item.inputed"></el-input>
          <el-date-picker v-if="item.type == 'timeOnly'" v-model="subfromData[item.key]" type="datetime"
            placeholder="选择日期时间"
            :disabled="item.disablekey && subfromData[item.disablekey] == item.disableval ? !item.able : item.able"
            @change="subfromData[item.key] = subfromData[item.key].getTime()" style="width: 100%;">
          </el-date-picker>
          <el-switch v-if="item.type == 'switch'" v-model="subfromData[item.key]" :active-value="item.openValue"
            :inactive-value="item.closeValue"
            :disabled="item.disablekey && subfromData[item.disablekey] == item.disableval ? !item.able : item.able">
          </el-switch>
          <div v-if="item.type == 'tags'" style="border: solid 1px #e6e6e6;width: 100%;padding: 10px;border-radius:10px;">
            <el-tag :key="index" v-for="tag, index in subfromData[item.key]"
              :closable="!(item.disablekey && subfromData[item.disablekey] == item.disableval ? !item.able : item.able)"
              :disable-transitions="false"
              @close="() => { subfromData[item.key].splice(subfromData[item.key].indexOf(tag), 1); }">
              {{ tag }}
            </el-tag>
            <el-input class="input-new-tag" v-model="item.tag" ref="saveTagInput" size="mini"
              @keyup.enter.native="() => { if (item.tag && item.tag != item.addTagText) { subfromData[item.key].push(item.tag); item.tag = ''; } }"
              @blur="() => { if (item.tag && item.tag != item.addTagText) { subfromData[item.key].push(item.tag); } item.tag = item.addTagText; }"
              @focus="item.tag = ''"
              :disabled="item.disablekey && subfromData[item.disablekey] == item.disableval ? !item.able : item.able">
            </el-input>
          </div>
          <el-select v-if="item.type == 'select'" v-model="subfromData[item.key]" style="width: 100%;">
            <el-option v-for="i, ii in item.items" :key="ii" :label="i.name" :value="i.key">
            </el-option>
          </el-select>
          <JsonEditor v-if="item.type == 'jsonIinput'" copyable
            :style='"width:" + item.width + " !important;text-align:left;height:" + item.height'
            v-model="subfromData[item.key]" :showBtns="false" mode="code" @has-error="jsonEditorDisabledSubFrom = true"
            @json-change="jsonEditorDisabledSubFrom = false"></JsonEditor>
          <span v-if="item.type == 'text'" :style="'color:' + item.color || 'black'">{{
            item.startStr || "" + subfromData[item.key] + item.endStr || "" }}</span>
          <span style="font-size: 10px;color: red;position: absolute;bottom: -25px;right: 0;">{{ item.tips }}</span>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showFrom = false">取 消</el-button>
        <el-button type="primary" @click="subForm"
          :disabled="Object.keys(disabledSubFrom).length > 0 || jsonEditorDisabledSubFrom">确
          定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import _this from "@/main.js"
import { requests } from "../../api/default";
import JsonEditor from 'vue-json-editor';
import JsonViewer from 'vue-json-viewer'
import utils from "@/utils";
var reflashKey = []
export default {
  name: 'mtable',
  watch: {

  },
  components: {
    JsonEditor,
    JsonViewer
  },
  data() {
    let data = {
      sort: '',
      jsonEditorDisabledSubFrom: false,
      disabledSubFrom: {},
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
      sortOption: {
        // sort always
        sortAlways: true,
        // multipleSort: true,
        sortChange: this.sortChange,
      },
      contextmenuBodyOption: {
        afterMenuClick: ({ type, selectionRangeKeys, selectionRangeIndexes }) => {
          if (type == "COPY") {
            this.$message.success("复制成功")
          }
        },
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
      pageSizeOption: [10, 50, 100, 200],
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
    let _thisdata = _this.tableData

    // data更新
    for (let k in _thisdata) {
      data[k] = _thisdata[k]
    }
    reflashKey = Object.keys(data)
    data.fliterOptionDefault = utils.deepClone(data.fliterOption)
    data.columnsOpt = []
    data.PageId = location.hash.replace(/\//g, '_')
    data.Error = Error
    data.console = console
    data.utils = utils
    return data
  },
  mounted() {
    // 初始化表格设置
    this.upDateTable()
    // 解决mounted获取不到dom
    this.$once("hook:updated", function () {
      // 初始化表格加载
      let target = document.querySelector("#table")
      _this['loadingInstance' + this.PageId] = this.$veLoading({
        target: target,
        name: "wave",
      });
      // 初始化表格内容
      this.initData()
      // 将_this.methods暴露出去，_this.methods中的函数在任何一个文件中都能调用
      _this.methods = {}
      _this.methods.fetchData = this.fetchData
      _this.methods.initData = this.initData
      _this.methods.upDateTable = this.upDateTable
    })
    this.$nextTick(() => {
      // 将更改的数据更新到_this中
      reflashKey.forEach(key => {
        this.$watch(key, (v, ov) => {
          _this.tableData[key] = this[key]
        })
      })
      console.log(_this.tableData.sort, this.sort)
      // 监听_this更新数据
      this.watchTableData = setInterval(() => {
        for (let i in reflashKey) {
          let key = reflashKey[i]
          this[key] = _this.tableData[key]
        }
      }, 100)
      this.overLoad = true
    })
  },
  beforeDestroy() {
    // 销毁时清理_this
    _this.tableData = {}
    _this.methods = {}
    clearInterval(this.watchTableData)
    this.watchTableData = null
    reflashKey.forEach(key => {
      this.$watch(key, (v, ov) => { }, { immediate: true })
    })
    reflashKey = []
  },
  methods: {
    sortChange(params, defaultGet) {
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
    },
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
        if (item.unsub) {
          that.subfromData[item.key] = undefined
        }
      })
      if (flage) {
        that.$message.error(flageName + "不能为空")
        return
      }

      let fun = that.getter('subfromFun' + that.subfromFunIndex)
      if (!fun) {
        this.$message.error("空链接")
        return
      }
      fun(that.subfromData).then(() => {
        that.fromData = []
        that.subfromData = {}
        that.subfromFunIndex = 0
        this.$message.success("操作成功")
        that.fetchData()
      })
    },
    getter(s) {
      let fun = this[s]
      if (typeof (fun) == 'object') {
        if (!fun.url || fun.url == "") {
          return null
        }
        fun = requests(fun)
      }
      return fun
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
      _this['loadingInstance' + this.PageId].show();
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
        else if (item.type === 'switch' && item.value === 'null') {
          this.fliter[item.key] = ""
        }
        else {
          this.fliter[item.key] = item.value
        }
      })
      this.fliter.sort = this.sort
      let fun = this.getter('fetchFun')
      if (!fun) {
        this.$message.error("空链接")
        return
      }
      fun(this.fliter).then(res => {
        if (!res.data.items) {
          res.data.items = []
        }
        this.tableData = res.data.items
        this.formtData(this.tableData)
        this.totalCount = res.data.total
        // 删除所有自带title属性防止冲突
        setTimeout(() => {
          const elements = document.querySelectorAll('*[title]');
          for (let i = 0; i < elements.length; i++) {
            elements[i].removeAttribute('title');
          }
        }, 1000)
        _this['loadingInstance' + this.PageId].close();
      }).catch(e => {
        console.log(e)
        _this['loadingInstance' + this.PageId].close();
      })
    },
    initData() {
      this.fliter.page = 1
      this.fliter.size = this.pageSizeOption[0]
      this.fetchData()
    },
    // 格式化表格内容
    formtData(data) {
      let fieldIndex = 0
      data.forEach(res => {
        res.fieldIndex = fieldIndex
        // for (let k in res) {
        //   res[k] = res[k].toLocaleString()
        // }
        fieldIndex++
      })
      return data
    },
    deepClone: utils.deepClone,
    upDateTable() {
      let defaultSort = {}
      this.columnsOpt = utils.deepClone(this.columns)
      this.columnsOpt.forEach(col => {
        if (!col.startStr) {
          col.startStr = ''
        }
        if (!col.endStr) {
          col.endStr = ''
        }
        if (col.sortBy || col.sortBy === "") {
          defaultSort[col.field] = col.sortBy
        }
        if (!col.ellipsis) {
          col.ellipsis = {
            showTitle: true,
            lineClamp: 1,
          }
        }
        if (col.buttons) {
          col.renderBodyCell = ({ row, column, rowIndex }, h) => {
            var elements = []
            col.buttons.forEach(btn => {
              let subfromData = utils.deepClone(btn.subfromData)
              for (let key in subfromData) {
                if (subfromData[key] == '***') {
                  subfromData[key] = row[key]
                }
                else if (subfromData[key].includes('***|')) {
                  let temp = subfromData[key].split('|')[1]
                  subfromData[key] = utils[temp](row[key])
                }
              }
              let disabled = btn.disablekey && subfromData[btn.disablekey] == btn.disableval ? !btn.able : btn.able
              let btnType = ""
              if (!btn.buttonTypeOpt) {
                btn.buttonTypeOpt = ""
              }
              if (typeof (btn.buttonTypeOpt) == 'string') {
                btnType = btn.buttonTypeOpt
              }
              else {
                let a = subfromData[btn.buttonTypeOpt.name], b = btn.buttonTypeOpt.value
                if (typeof (btn.buttonTypeOpt.value) == 'object') {
                  a = JSON.stringify(subfromData[btn.buttonTypeOpt.name])
                  b = JSON.stringify(btn.buttonTypeOpt.value)
                }
                if (btn.buttonTypeOpt.calculate == "==") {
                  if (a == b) {
                    btnType = btn.buttonTypeOpt.type
                  }
                }
                else if (btn.buttonTypeOpt.calculate == "!=") {
                  if (a !== b) {
                    btnType = btn.buttonTypeOpt.type
                  }
                }
              }
              if (btn.type == 'formButton') {
                elements.push(<el-button disabled={disabled} type={btnType} v-on:click={() => {
                  this.fromData = utils.deepClone(btn.fromData)
                  this.showFrom = true
                  this.subfromData = subfromData
                  this.subfromFunIndex = btn.subfromFunIndex
                  if (btn.fromTitle) {
                    this.fromTitle = btn.fromTitle
                  }
                }
                }>{btn.name}</el-button>)
              }
              else if (btn.type == 'textFormButton') {
                elements.push(<span class="font-blue" v-on:click={() => {
                  this.fromData = utils.deepClone(btn.fromData)
                  this.showFrom = true
                  this.subfromData = subfromData
                  this.subfromFunIndex = btn.subfromFunIndex
                  if (btn.fromTitle) {
                    this.fromTitle = btn.fromTitle
                  }
                }
                } > <i class="el-icon-edit"></i>{row[btn.name] || btn.name}</span >)
              }
              else if (btn.type == 'confirmButton') {
                elements.push(<el-popconfirm
                  title={btn.title || '确定删除吗？'}
                  style="margin-left:10px"
                  on-confirm={() => {
                    this.getter('subfromFun' + btn.subfromFunIndex)(subfromData).then(res => {
                      _this.methods.initData()
                      _this.$message.success("操作成功")
                    })
                  }}
                >
                  <el-button disabled={disabled} type={btnType} slot="reference">{btn.name}</el-button>
                </el-popconfirm>)
              }
            })
            var element = <div>{elements}</div>
            return element
          }
        }
        this.tableShowJson.forEach(item => {
          if (item.field == col.field) {
            col.renderBodyCell = ({ row, column, rowIndex }, h) => {
              if (!row[col.field]) {
                row[col.field] = ''
              }
              let fieldContent = typeof (row[col.field]) == 'object' ? col.startStr + JSON.stringify(row[col.field]) + col.endStr : col.startStr + row[col.field] + col.endStr
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
                    <JsonViewer expanded={true} value={contant} boxed sort style={"width:" + width + " !important;text-align:start"}></JsonViewer>
                    <el-button style={"width:" + width + " !important;margin-top:10px;"} type="primary" on-click={() => {
                      this.$copyText(JSON.stringify(contant))
                      this.$message.success("复制成功")
                    }}>一键复制</el-button>
                  </div >
                  <div slot="reference" class="font-blue" type="text"><i class="el-icon-view"></i>{fieldContent}</div>
                </el-popover >
              )
            }

          }
        })
        this.tableEditorJson.forEach(item => {
          if (item.field == col.field) {
            col.renderBodyCell = ({ row, column, rowIndex }, h) => {
              if (!row[col.field]) {
                row[col.field] = ''
              }
              let fieldContent = typeof (row[col.field]) == 'object' ? col.startStr + JSON.stringify(row[col.field]) + col.endStr : col.startStr + row[col.field] + col.endStr
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
                  <div slot="reference" class="font-blue" type="text"><i class="el-icon-edit" show-overflow-tooltip="true"></i>{fieldContent}</div>
                </el-popover >
              )
            }

          }
        })
        this.tableSwitch.forEach(item => {
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
        if (col.showTag) {
          col.renderBodyCell = ({ row, column, rowIndex }, h) => {
            if (!col.showTag[row[col.field]]) {
              return (
                <el-tag>{row[col.field]}</el-tag>
              );
            }
            return (
              <el-tag type={col.showTag[row[col.field]].type}>{col.showTag[row[col.field]].content}</el-tag>
            );
          }
        }
        if (col.showOverflow) {
          let renderBodyCell = col.renderBodyCell
          col.renderBodyCell = ({ row, column, rowIndex }, h) => {
            let fieldContent = typeof (row[col.field]) == 'object' ? col.startStr + JSON.stringify(row[col.field]) + col.endStr : col.startStr + row[col.field] + col.endStr
            if (!row[col.field]) {
              fieldContent = ''
            }
            fieldContent = col.startStr + fieldContent + col.endStr
            var element
            if (renderBodyCell) {
              if (row[col.showOverflow]) {
                element = <el-tooltip style="width: 100%;display: block;" class="item" effect="dark" content={row[col.showOverflow]} placement="top">
                  {renderBodyCell({ row, column, rowIndex }, h)}
                </el-tooltip>
              }
              else {
                element = renderBodyCell({ row, column, rowIndex }, h)
              }
            }
            else {
              if (row[col.showOverflow]) {
                element = <el-tooltip style="width: 100%;display: block;" class="item" effect="dark" content={row[col.showOverflow] || fieldContent} placement="top">
                  <div>{fieldContent}</div>
                </el-tooltip>
              }
              else {
                element = <div>{fieldContent}</div>
              }
            }
            return element
          }
        }
        // if (!col.renderBodyCell) {
        //   col.renderBodyCell = ({ row, column, rowIndex }, h) => {
        //     if (!row[col.field]) {
        //       row[col.field] = ''
        //     }
        //     let fieldContent = col.startStr + row[col.field] + col.endStr
        //     if (col.showOverflow) {
        //       return (

        //       )
        //     }
        //     else {
        //       return (<span>{fieldContent}</span>)
        //     }
        //   }
        // }
      })
      this.sort = this.sortChange(defaultSort, true)
      // 更新_this
      for (let i in reflashKey) {
        let key = reflashKey[i]
        _this.tableData[key] = this[key]
      }
      this.$forceUpdate()
    }
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