<template>
  <div class="container" v-if="overLoad" id="container" ref="container">
    <el-card class="fliter">
      <el-form v-model="fliter" class="fliter-box" :inline="true" size="mini" label-width="auto">
        <el-form-item
          :label="item.type === 'switch' && item.openStr && item.closeStr ? item.value == item.openValue ? item.openStr : item.value == item.closeValue ? item.closeStr : item.name : item.disableLabel ? '' : item.name"
          class="fliter-item" v-for="item, index in fliterOption" :key="index">
          <el-input v-if="item.type == 'input'" :type="item.rows != undefined ? 'textarea' : ''" :rows="item.rows"
            v-model="item.value" clearable @keyup.enter.native="initData"></el-input>
          <el-select v-if="item.type == 'select'" v-model="item.value" @change="initData" :filterable="item.filterable">
            <el-option v-for="i, ii in item.items" :key="ii" :label="i.name" :value="i.key">
            </el-option>
          </el-select>
          <el-cascader v-if="item.type == 'cascader'" v-model="item.value" :options="item.items"
            :props="cascaderOptionProps" :show-all-levels="false" @change="initData">
          </el-cascader>
          <el-date-picker v-if="item.type == 'time'" v-model="item.value" type="datetimerange" range-separator="至"
            start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="item.opt ? item.opt : pickerOptions"
            @change="initData">
          </el-date-picker>
          <el-switch v-if="item.type == 'switch'" v-model="item.value" :active-value="item.openValue"
            :inactive-value="item.closeValue" @change="initData">
          </el-switch>
          <el-button type="warning" v-if="item.type == 'formButton'" @click="() => {
            if (item.beforeShow) {
              item.beforeShow(item).then(res => {
                item = res
                if (item.fromHistoryId) {
                  let history = getGloba('subfromData' + item.fromHistoryId)
                  if (!history) {
                    setGloba('subfromData' + item.fromHistoryId, utils.deepClone(item.subfromData))
                  }
                  subfromData = getGloba('subfromData' + item.fromHistoryId)
                }
                else {
                  subfromData = utils.deepClone(item.subfromData)
                }
                showFrom = true
                fromData = utils.deepClone(item.fromData)

                subfromFunIndex = item.subfromFunIndex
                if (item.fromTitle) {
                  fromTitle = item.fromTitle
                }
                initForm()
              })
            }
            else {
              showFrom = true
              if (item.fromHistoryId) {
                let history = getGloba('subfromData' + item.fromHistoryId)
                if (!history) {
                  setGloba('subfromData' + item.fromHistoryId, utils.deepClone(item.subfromData))
                }
                subfromData = getGloba('subfromData' + item.fromHistoryId)
              }
              else {
                subfromData = utils.deepClone(item.subfromData)
              }
              fromData = utils.deepClone(item.fromData)
              subfromFunIndex = item.subfromFunIndex
              if (item.fromTitle) {
                fromTitle = item.fromTitle
              }
              initForm()
            }

          }">{{ item.name }}</el-button>
        </el-form-item>
        <el-form-item class="fliter-item">
          <el-button type="primary" @click="fetchData">查询</el-button>
        </el-form-item>
        <el-form-item v-if="fliterClearable" class="fliter-item">
          <el-button @click="fliterOption = utils.deepClone(globa.fliterOptionDefault); fetchData()">清空筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="table" id="table">
      <ve-table :scroll-width="scrollWidth" :columns="columnsOpt" :table-data="tableData" :border-around="true"
        :border-x="true" :border-y="true" rowKeyFieldName="fieldIndex" :contextmenu-header-option="contextmenuBodyOption"
        :contextmenu-body-option="contextmenuBodyOption" :sort-option="sortOption"
        :column-width-resize-option="columnWidthResizeOption" :editOption="editOption"
        :cell-style-option="cellStyleOption" :footer-data="footerData" />
      <div v-show="!tableData || tableData.length == 0" class="empty-data">暂无数据</div>
      <div class="table-pagination" style="display: flex;flex-direction: row;">
        <ve-pagination :total="totalCount" :page-index="fliter.page" :page-size-option="pageSizeOption"
          :page-size="fliter.size" @on-page-number-change="pageNumberChange" @on-page-size-change="pageSizeChange" />
        <span style="margin: auto;margin-right: 0;" v-html="showText" />
      </div>
    </el-card>
    <!-- {{ showFrom }} -->

    <el-dialog :title="fromTitle" :visible.sync="showFrom" width="30%" @close="disabledSubFrom = {}"
      :close-on-click-modal="false">
      <el-form v-model="subfromData" ref="form" label-width="100px">
        <el-form-item :prop="item.key" :label="item.name" v-for="item, index in  fromData " :key="index" :rules="item.must ? {
          required: true, trigger: item.trigger || ['blur', 'change'], validator: (rule, value, callback) => {
            if (subfromData[item.key] === '') {
              disabledSubFrom[item.key] = true
              $forceUpdate();
              callback('必填项')
              return
            }
            if (item.rule) {
              if (typeof (item.rule) == 'object') {
                if (item.rule.onlyNum) {
                  subfromData[item.key] = String(subfromData[item.key]).replace(/[^0-9]/g, '');
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
                  if (subfromData[item.key] != '') {
                    subfromData[item.key] = parseInt(subfromData[item.key])
                  }
                }
                if (item.rule.minLength) {
                  if (subfromData[item.key].length < item.rule.minLength) {
                    disabledSubFrom[item.key] = true
                    $forceUpdate();
                    callback('最小' + item.rule.minLength + '位')
                    return
                  }
                }
                if (item.rule.maxLength) {
                  if (subfromData[item.key].length > item.rule.maxLength) {
                    disabledSubFrom[item.key] = true
                    $forceUpdate();
                    callback('最大' + item.rule.maxLength + '位')
                    return
                  }
                }
                if (item.rule.equation) {
                  if (subfromData[item.key] !== subfromData[item.rule.equation]) {
                    disabledSubFrom[item.key] = true
                    $forceUpdate();
                    callback(item.rule.equationStr || '与' + item.rule.equation + '不相同')
                    return
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
          <el-input v-if="item.type == 'input'" :type="item.rows != undefined ? 'textarea' : ''" :rows="item.rows"
            v-model="subfromData[item.key]" clearable
            :disabled="item.disablekey && subfromData[item.disablekey] == item.disableval ? !item.able : item.able"
            @input="item.inputed"
            @keyup.enter.native="!item.rows && Object.keys(disabledSubFrom).length === 0 ? subForm() : ''"></el-input>
          <el-input v-if="item.type == 'inputPw'" v-model="subfromData[item.key]" clearable
            :disabled="item.disablekey && subfromData[item.disablekey] == item.disableval ? !item.able : item.able"
            @input="item.inputed" show-password
            @keyup.enter.native="Object.keys(disabledSubFrom).length === 0 ? subForm() : ''"></el-input>
          <el-date-picker v-if="item.type == 'timeOnly'" v-model="subfromData[item.key]" type="datetime"
            placeholder="选择日期时间"
            :disabled="item.disablekey && subfromData[item.disablekey] == item.disableval ? !item.able : item.able"
            style="width: 100%;">
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
          <el-select v-if="item.type == 'select'" v-model="subfromData[item.key]" style="width: 100%;"
            :filterable="item.filterable">
            <el-option v-for="i, ii in item.items" :key="ii" :label="i.name" :value="i.key">
            </el-option>
          </el-select>
          <el-cascader v-if="item.type == 'cascader'" v-model="subfromData[item.key]" :options="item.items"
            style="width: 100%;" :props="cascaderOptionPropsFrom" :show-all-levels="false">
          </el-cascader>
          <JsonEditor v-if="item.type == 'jsonIinput'" copyable
            :style='"width:" + item.width + " !important;text-align:left;height:" + item.height'
            v-model="subfromData[item.key]" :showBtns="false" mode="code" @has-error="disabledSubFrom[item.key] = true"
            @json-change="delete disabledSubFrom[item.key]"></JsonEditor>
          <span v-if="item.type == 'text'" :style="'color:' + item.color || 'black'">{{
            item.startStr || "" + subfromData[item.key] + item.endStr || "" }}</span>
          <span style="font-size: 10px;color: red;position: absolute;bottom: -25px;right: 0;">{{ item.tips }}</span>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showFrom = false">取 消</el-button>
        <el-button type="primary" @click="subForm" :disabled="Object.keys(disabledSubFrom).length > 0">确
          定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<style>
.table-red-bg {
  background: #ffb0b0 !important;
}

.table-yellow-bg {
  background: #f9ff9e !important;
}

.table-green-bg {
  background: #b9ff9e !important;
}
</style>
<script>
import _this from "@/main.js"
import { requests } from "../../api/default";
import JsonEditor from 'vue-json-editor';
import JsonViewer from 'vue-json-viewer'
import utils from "@/utils";
import {getParams} from '@/utils/editorParams'
export default {
  name: 'mtable',
  components: {
    JsonEditor,
    JsonViewer
  },
  data() {
    let data = {
      showText:"",
      fliterClearable:true,
      cellStyleOption: {
        bodyCellClass: ({ row, column, rowIndex }) => {
          let cs = ''
          switch (row.color) {
              case 'red':
                  cs = 'table-red-bg'
                  break
              case 'yellow':
                  cs = 'table-yellow-bg'
                  break
              case 'green':
                  cs = 'table-green-bg'
                  break
          }
          return cs
        },
      },
      cascaderOptionProps: {
        value: "key",
        label: "name",
        children: "children",
        checkStrictly: true,
        emitPath:false
      },
      cascaderOptionPropsFrom:{
        value: "key",
        label: "name",
        children: "children",
        checkStrictly: true,
        emitPath:false
      },
      sort: '',
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
      editOption: {
        afterCellValueChange: ({ row, column, changeValue }) => {
          let params = {}
          params[column.field] = changeValue
          this.tableEditorSubFun(params).then(res => {
            this.$message.success("操作成功")
          })
        },
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
      pageSizeOption: [20, 50, 100, 200],
      totalCount: 0,
      fetchFun: async (fliter) => { console.log(fliter) },
      tableEditorSubFun: async (data) => { console.log(data) },
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
      tableSwitch : [],
      columnsOpt : [],
      tableData : [],
      footerData : []
    }
    return data
  },
  beforeDestroy() {
    // 销毁时清理_this
    _this.tableData = {}
    _this.methods = {}
    _this.globa = {}
    _this.launchFuns = {}
  },
  updated(){
    // 只有updated阶段能拿到document.querySelector("#table")
    this.initPage()
  },
  mounted(){
    let path = `@/views${location.hash.replace(/#/, '').split('?')[0]}/data.js`
    let that = this
    import(`@/views${location.hash.replace(/#/, '').split('?')[0]}/data.js`).then(data => {
      if (!data) {
        that.$message.error(path + "失踪了！！！")
        return
      }
      that.initTableData(data.default)
      that.initTable()
      that.overLoad = true
    }).catch(e => {
      that.$message.error(path + "失踪了！！！")
    })
  },
  methods: {
    initTable(){
      // 初始化表格设置
      this.upDateTable()
      // 更新_this
      _this.methods.fetchData = this.fetchData
      _this.methods.initData = this.initData
      _this.methods.upDateTable = this.upDateTable
      _this.methods.upDateAppendFliterOption = this.upDateAppendFliterOption
      _this.globa.PageId = this.PageId
      window.addEventListener('keydown',(event)=>{
        if(event.key==='Escape'){
          this.colsePopover()
        }
      })
    },
    initTableData(data){
      _this.tableData = utils.deepClone(data)
      let PageId = location.hash.replace(/\//g, '_').replace(/#/,'')
      // 获取_this中数据tableData,methods,globa......
      let checkInfoFlage = _this.checkInfo(PageId)
      if(checkInfoFlage){
        _this.getPageInfo(PageId)
      }else{
        _this.updatePageInfo(PageId)
      }
      // 合并数据
      for (let k in _this.tableData) {
        this[k] = _this.tableData[k]
      }
      // 绑定外部数据和内部数据
      _this.tableData = this
      this.PageId = PageId
      this.Error = Error
      this.console = console
      this.utils = utils
      this.globa = _this.globa
      this.methods = _this.methods

      let params = getParams()
      if(Object.keys(params).length>0){
        for (let key in params){
          let value = params[key]
          key = key.split('__')
          if(key.length>=2){
            switch(key[0]){
              case 'fliterOption':{
                for(let fkey in this.fliterOption){
                  let f = this.fliterOption[fkey]
                  if(f.key===key[1]){
                    f.value = value
                    break
                  }
                }
              }
            }
          }
        }
      }
    },
    async initPage(){
      if(!_this.globa.loadingInstance&&this.overLoad){
        // 表格加载动画
        let target = document.querySelector("#table")
        // target不为空时页面渲染完毕
        if(target){
          _this.globa.loadingInstance = this.$veLoading({
            target: target,
            name: "wave",
          });
          // 运行launchFuns
          for (let key in _this.launchFuns) {
            if (typeof (_this.launchFuns[key]) == 'function') {
              await _this.launchFuns[key]()
            }
            _this.launchFuns[key] = null
          }
          // 初始化表格筛选重置
          if (!_this.globa.fliterOptionDefault&&this.fliterClearable) {
            _this.globa.fliterOptionDefault = utils.deepClone(this.fliterOption)
          }
          if (!_this.globa.donotFetch) {
            // 初始化表格内容
            this.initData()
          }
        }
      }
    },
    setGloba(key,value){
      _this.globa[key] = value
    },
    getGloba(key){
      return _this.globa[key]
    },
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
    // 关闭popover弹出框
    colsePopover() {
      this.$refs.container.click()
    },
    // 初始化表单判断是否有必填项为空
    initForm() {
      let that = this
      that.fromData.forEach(item => {
        if (item.must && ((!that.subfromData[item.key] && that.subfromData[item.key] !== 0) || that.subfromData[item.key] === "")) {
          that.disabledSubFrom[item.key] = true
        }
      })
    },
    // 提交表单
    subForm() {
      let that = this
      that.showFrom = false
      that.fromData.forEach(item => {
        if(item.type=='timeOnly'){
          try{
            if(typeof(that.subfromData[item.key])==='object'){
              that.subfromData[item.key] = that.subfromData[item.key].getTime()
            }
          }catch(e){}
        }
        if(item.type=='tags'){
          try{
            that.subfromData[item.key] = that.subfromData[item.key].length > 0 ? that.subfromData[item.key].toLocaleString() : " "
          }catch(e){}
        }
        if (item.unsub) {
          that.subfromData[item.key] = "*/unsub/*"
        }
      })

      let fun = that.getter('subfromFun' + that.subfromFunIndex)
      if (!fun) {``
        this.$message.error("空链接")
        return
      }
      let subfromData = {}
      for(let key in that.subfromData){
        if(typeof(that.subfromData[key])==='number'){
          that.subfromData[key] = String(that.subfromData[key])
        }
        if(typeof(that.subfromData[key])==='object'){
          that.subfromData[key] = JSON.stringify(that.subfromData[key])
        }
        if(that.subfromData[key]===''){
          that.subfromData[key] = " "
        }
        if(that.subfromData[key]!=='*/unsub/*'){
          subfromData[key] = that.subfromData[key]
        }
      }
      fun(subfromData).then(() => {
        that.fromData = []
        that.subfromData = {}
        that.subfromFunIndex = 0
        this.$message.success("操作成功")
        that.fetchData()
      })
    },
    // 获取网络请求函数
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
    // 获取搜索过滤信息
    getFliter(t) {
      let temp = utils.deepClone(this.fliter)
      for (let i in this.fliterOption) {
        let item = this.fliterOption[i]
        if (item.unsub&&t) {
          continue
        }
        if (item.type === 'time') {
          if(!item.startKey||!item.endKey){
            continue
          }
          if (item.value && item.value.length > 1) {
            try{
              if(typeof(item.value[0])=='object'&&typeof(item.value[1])=='object'){
                temp[item.startKey] = item.subStr ? this.dateToString(item.value[0]) : Math.floor(item.value[0].getTime() / 1000)
                temp[item.endKey] = item.subStr ? this.dateToString(item.value[1]) : Math.floor(item.value[1].getTime() / 1000)
              }
              else if(typeof(item.value[0])=='number'&&typeof(item.value[1])=='number'){
                temp[item.startKey] = item.subStr ? this.dateToString(new Date(item.value[0])) : Math.floor(item.value[0] / 1000)
                temp[item.endKey] = item.subStr ? this.dateToString(new Date(item.value[1])) : Math.floor(item.value[1] / 1000)
              }
            }catch(e){
              temp[item.startKey] = ''
              temp[item.endKey] = ''
            }
          } else {
            temp[item.startKey] = ''
            temp[item.endKey] = ''
          }
        }
        else{
          if(!item.key){
            continue
          }
          if (item.type === 'switch' && item.value === 'null') {
            temp[item.key] = ""
          }
          else {
            temp[item.key] = item.value
          }
        }
      }
      temp.sort = this.sort
      return temp
    },
    // 搜索
    async fetchData() {
      this.tableEditorJsonContent = {}
      if(_this.globa.loadingInstance){_this.globa.loadingInstance.show();}
      let origin_fliter = utils.deepClone(this.fliter)
      // 获取过滤参数
      let fliter = this.getFliter()
      // 运行搜索前函数
      for (let i in this.fliterOption) {
        let item = this.fliterOption[i]
        if (item.beforFetch) {
          await item.beforFetch(fliter)
        }
      }
      // 刷新过滤参数
      fliter = this.getFliter(true)
      let fun = this.getter('fetchFun')
      if (!fun) {
        this.$message.error("空链接")
        return
      }
      fun(fliter).then(res => {
        if (!res.data.items) {
          res.data.items = []
        }
        this.tableData = res.data.items
        this.formtData(this.tableData)
        this.footerData = res.data.summarys
        this.formtData(this.footerData)
        this.totalCount = res.data.total
        // 删除所有自带title属性防止冲突
        setTimeout(() => {
          let elements = document.querySelectorAll('*[title]');
          for (let i = 0; i < elements.length; i++) {
            elements[i].removeAttribute('title');
          }
          elements = document.querySelectorAll('*[tableBox]');
          for (let i = 0; i < elements.length; i++) {
            let str = elements[i].getAttribute('tableBox')
            let canvas = this.canvas || (this.canvas = document.createElement("canvas"));
            let context = canvas.getContext("2d"); 
            context.font = '14px Arial';
            let metrics = context.measureText(str);
            // return metrics.width;
            if(metrics.width>elements[i].scrollWidth){
              elements[i].setAttribute('title',str);
            }
          }
          elements = document.querySelectorAll('*[overflow]');
          for (let i = 0; i < elements.length; i++) {
            elements[i].setAttribute('title',elements[i].getAttribute('overflow'));
            elements[i].removeAttribute('overflow');
          }
        }, 500)
        this.fliter = utils.deepClone(origin_fliter)
        if(_this.globa.loadingInstance){_this.globa.loadingInstance.close();}
      }).catch(e => {
        console.log(e)
        this.fliter = utils.deepClone(origin_fliter)
        if(_this.globa.loadingInstance){_this.globa.loadingInstance.close();}
      })
    },
    // 初始化页码等并搜索
    initData() {
      this.fliter.page = 1
      this.fliter.size = this.pageSizeOption[0]
      this.fetchData()
    },
    // 格式化表格内容
    formtData(data) {
      if(!data){
        return []
      }
      let fieldIndex = 0
      data.forEach(res => {
        res.fieldIndex = fieldIndex
        for (let k in res) {
          if(typeof(res[k]) == 'number'){
            res[k] = String(res[k])
          }
        }
        fieldIndex++
      })
      return data
    },
    // 获取单元格
    getFieldContent(row,col,onlyStr){
      let contentText = row[col.field]
      if(contentText===undefined){
        contentText = ""
      }
      if(onlyStr){
        return typeof (contentText) == 'object' ? col.startStr + JSON.stringify(contentText) + col.endStr : col.startStr + contentText + col.endStr
      }
      return <div style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;height;18px;">{typeof (contentText) == 'object' ? col.startStr + JSON.stringify(contentText) + col.endStr : col.startStr + contentText + col.endStr}</div>
    },
    // 更新或者添加一个搜索过滤
    upDateAppendFliterOption(obj) {
      let flage = false
      for (let i in this.fliterOption) {
        if (obj.key == this.fliterOption[i].key) {
          for (let j in obj) {
            if (obj[j]) {
              this.fliterOption[i][j] = obj[j]
            }
          }
          flage = true
          break
        }
      }
      if(!flage){
        this.fliterOption.push(obj)
      }
      this.$forceUpdate()
    },
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
        // 判断是否需要排序
        if (col.sortBy || col.sortBy === "") {
          defaultSort[col.field] = col.sortBy
        }
        // // 单元格禁止换行可以在外面自行更改
        // if (!col.ellipsis) {
        //   col.ellipsis = {
        //     showTitle: true,
        //     lineClamp: 1,
        //   }
        // }
        // 单元格查看json
        this.tableShowJson.forEach(item => {
          if (item.field == col.field) {
            col.renderBodyCell = ({ row, column, rowIndex }, h) => {
              if (!row[col.field]) {
                row[col.field] = ''
              }
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
                  <div slot="reference" class="font-blue" type="text"><i class="el-icon-view"></i>{this.getFieldContent(row,col)}</div>
                </el-popover >
              )
            }

          }
        })
        // 单元格编辑json
        this.tableEditorJson.forEach(item => {
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
              return (
                <el-popover popper-class="popper-class pop-max-content" placement="top" on-show={()=>{
                  this.tableEditorJsonContent = {};
                  this.disableJsonEditorSub = false;
                  if (!row[col.field]) {
                    row[col.field] = ''
                  }
                  let contanttype = typeof (row[item.value])
                  if (contanttype == 'string') {
                    try {
                      this.tableEditorJsonContent = JSON.parse(row[item.value])
                    } catch (e) {
                      this.tableEditorJsonContent = {}
                    }
                  } else if (contanttype != 'object') {
                    this.tableEditorJsonContent = {}
                  } else {
                    this.tableEditorJsonContent = row[item.value]
                  }
                  this.$forceUpdate()
                  }}>
                  <div style="text-align:center">
                    <JsonEditor copyable={true} style={"width:" + width + " !important;text-align:left;height:" + height} v-model={this.tableEditorJsonContent}
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
                        id: String(row.id),
                      }
                      params[item.value] = JSON.stringify(this.tableEditorJsonContent)
                      item.subFun(params).then(() => {
                        this.$message.success("操作成功")
                        this.fetchData()
                      });
                    }}>提交</el-button>
                  </div >
                  <div slot="reference" class="font-blue" type="text"><i class="el-icon-edit" show-overflow-tooltip="true"></i>{this.getFieldContent(row,col)}</div>
                </el-popover >
              )
            }

          }
        })
        // 单元格开关
        this.tableSwitch.forEach(item => {
          if (item.field == col.field) {
            col.renderBodyCell = ({ row, column, rowIndex }, h) => {
              return (
                <el-switch on-change={() => {
                  let params = {
                    id: String(row.id),
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
        // 单元格tag标签
        if (col.showTag) {
          col.renderBodyCell = ({ row, column, rowIndex }, h) => {
            if (!col.showTag[row[col.field]]) {
              if(!col.showTag['default']){
                return (
                  <el-tag type="info">{col.startStr+row[col.field]+col.endStr}</el-tag>
                );
              }
            }
            let temp = col.showTag[row[col.field]]
            if(!temp){temp = col.showTag['default']}
            let content = temp.content
            if(typeof(content)==='string'){
              if (content == '***') {
                content = row[key]
              }
              else if (content.includes('***|')) {
                // "***|utils"中包含的函数"取表格这一行中的值经过指定函数处理
                let temp = content.split('|')
                if(temp.length==2){
                  content = utils[temp[1]](row[key])
                }
                // "***|utils|额外参数"中包含的函数"取表格这一行中的值经过指定函数处理
                else if(temp.length>2){
                  content = utils[temp[1]](row[key],temp[2])
                }
              }
              else if (content.includes('&&&|')) {
                let temp = content.split('|')
                // "&&&|指定key"取表格这一行中指定的值
                if(temp.length==2){
                  content = row[temp[1]]
                }
                // "&&&|指定key|utils"取表格这一行中指定的值经过指定函数处理
                else if(temp.length==3){
                  content = utils[temp[2]](row[temp[1]])
                }
                // "&&&|指定key|utils|额外参数"取表格这一行中指定的值经过指定函数处理
                else if(temp.length>3){
                  content = utils[temp[2]](row[temp[1]],temp[3])
                }
              }
            }
            return (
              <el-tag type={temp.type}>{col.startStr+content+col.endStr}</el-tag>
            );
          }
        }
        if (col.buttons) {
          // 单元格中插入按钮
          col.renderBodyCell = ({ row, column, rowIndex }, h) => {
            var elements = []
            col.buttons.forEach(btn => {
              let subfromData = utils.deepClone(btn.subfromData)
              for (let key in subfromData) {
                // "***"取表格这一行中的值
                if(typeof(subfromData[key])==='string'){
                  if (subfromData[key] == '***') {
                    subfromData[key] = row[key]
                  }
                  else if (subfromData[key].includes('***|')) {
                    // "***|utils"中包含的函数"取表格这一行中的值经过指定函数处理
                    let temp = subfromData[key].split('|')
                    if(temp.length==2){
                      subfromData[key] = utils[temp[1]](row[key])
                    }
                    // "***|utils|额外参数"中包含的函数"取表格这一行中的值经过指定函数处理
                    else if(temp.length>2){
                      subfromData[key] = utils[temp[1]](row[key],temp[2])
                    }
                  }
                  else if (subfromData[key].includes('&&&|')) {
                    let temp = subfromData[key].split('|')
                    // "&&&|指定key"取表格这一行中指定的值
                    if(temp.length==2){
                      subfromData[key] = row[temp[1]]
                    }
                    // "&&&|指定key|utils"取表格这一行中指定的值经过指定函数处理
                    else if(temp.length==3){
                      subfromData[key] = utils[temp[2]](row[temp[1]])
                    }
                    // "&&&|指定key|utils|额外参数"取表格这一行中指定的值经过指定函数处理
                    else if(temp.length>3){
                      subfromData[key] = utils[temp[2]](row[temp[1]],temp[3])
                    }
                  }
                }
              }
              // 判断按钮是否禁用
              let disabled = btn.disablekey && subfromData[btn.disablekey] == btn.disableval ? !btn.able : btn.able
              // 判断按钮颜色
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
              // 根据类型插入按钮
              if (btn.type == 'formButton') {
                elements.push(<el-button disabled={disabled} type={btnType} v-on:click={async () => {

                  if (btn.beforeShow) {
                    btn.beforeShow(btn).then(res => {
                      btn = res
                      this.fromData = utils.deepClone(btn.fromData)
                      this.showFrom = true
                      this.subfromData = subfromData
                      this.subfromFunIndex = btn.subfromFunIndex
                      if (btn.fromTitle) {
                        this.fromTitle = btn.fromTitle
                      }
                      this.initForm()
                    })
                  }
                  else {
                    this.fromData = utils.deepClone(btn.fromData)
                    this.showFrom = true
                    this.subfromData = subfromData
                    this.subfromFunIndex = btn.subfromFunIndex
                    if (btn.fromTitle) {
                      this.fromTitle = btn.fromTitle
                    }
                    this.initForm()
                  }
                }
                }>{btn.name}</el-button>)
              }
              else if (btn.type == 'textFormButton') {
                elements.push(<div class="font-blue" tableBox={row[col.field]} v-on:click={async () => {
                  if (btn.beforeShow) {
                    btn.beforeShow(btn).then(res => {
                      btn = res
                      this.fromData = utils.deepClone(btn.fromData)
                      this.showFrom = true
                      this.subfromData = subfromData
                      this.subfromFunIndex = btn.subfromFunIndex
                      if (btn.fromTitle) {
                        this.fromTitle = btn.fromTitle
                      }
                      this.initForm()
                    })
                  }
                  else {
                    this.fromData = utils.deepClone(btn.fromData)
                    this.showFrom = true
                    this.subfromData = subfromData
                    this.subfromFunIndex = btn.subfromFunIndex
                    if (btn.fromTitle) {
                      this.fromTitle = btn.fromTitle
                    }
                    this.initForm()
                  }
                }
                } > <i class="el-icon-edit"></i>{this.getFieldContent(row,col)}</div>)
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
        else{
          // 单元格开启长文本提示
          let renderBodyCell = col.renderBodyCell
          col.renderBodyCell = ({ row, column, rowIndex }, h) => {
            if (col.showOverflow) {
              if (!row[col.field]) {
                fieldContent = ''
              }
              let element
              let temp
              if (renderBodyCell) {
                temp = renderBodyCell({ row, column, rowIndex }, h)
              }
              else {
                temp = this.getFieldContent(row,col)
              }
              if (row[col.showOverflow]) {
                // element = <el-tooltip style="width: 100%;display: block;" class="item" effect="dark" content={row[col.showOverflow] || fieldContent} placement="top">
                //   {temp}
                // </el-tooltip>
                element = <div overflow={row[col.showOverflow] || this.getFieldContent(row,col,true)} >
                  {temp}
                </div>
              }
              else {
                element = temp
              }
              return element
            }
            else{
              let element
              if (renderBodyCell) {
                element = <div tableBox={row[col.field]}>{renderBodyCell({ row, column, rowIndex }, h)}</div>
              }
              else {
                element = <div tableBox={row[col.field]}>{this.getFieldContent(row,col)}</div>
              }
              return element
            }
          }
        }
      })  
      // 获取排序
      this.sort = this.sortChange(defaultSort, true)
      // 刷新页面
      this.$forceUpdate()
    },
  }
}
</script>
<style lang="scss" scoped>
.container {
  padding: 0 !important;
  padding-bottom: 60px !important;
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
<!-- " ......................阿弥陀佛......................\n" +
  "                         _oo0oo_                      \n" +
  "                       o8888888o                     \n" +
  "                      88\" . \"88                     \n" +
  "                       (| -_- |)                     \n" +
  "                      0\\  =  /0                     \n" +
  "                   ___/‘---’\\___                   \n" +
  "                  .' \\|       |/ '.                 \n" +
  "                 / \\\\|||  :  |||// \\                \n" +
  "                / _||||| -卍-|||||_ \\               \n" +
  "               |   | \\\\\\  -  /// |   |              \n" +
  "               | \\_|  ''\\---/''  |_/ |              \n" +
  "               \\  .-\\__  '-'  ___/-. /              \n" +
  "             ___'. .'  /--.--\\  '. .'___            \n" +
  "         .\"\" ‘<  ‘.___\\_<|>_/___.’>’ \"\".          \n" +
  "       | | :  ‘- \\‘.;‘\\ _ /’;.’/ - ’ : | |        \n" +
  "         \\  \\ ‘_.   \\_ __\\ /__ _/   .-’ /  /        \n" +
  "    =====‘-.____‘.___ \\_____/___.-’___.-’=====     \n" +
  "                       ‘=---=’                      \n" +
  "                                                    \n" +
  "....................佛祖保佑 ,永无BUG..................." -->