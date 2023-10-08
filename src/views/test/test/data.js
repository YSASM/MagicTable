import api from "@/api/test/test/index"
import _this from "@/main.js"
// 设置globa初始值，在data.js中必须使用这个函数实现，否则只能拿到空信息{}
_this.setDefaultGloba = () => { return {
  hello:'Hello World!',
  xxx:'1+1='
} }
// 设置全局函数默认有以下四个
// _this.methods.fetchData = this.fetchData 刷新表格数据
// _this.methods.initData = this.initData 重置页码和每页数量并刷新表格数据
// _this.methods.upDateTable = this.upDateTable 读取最新的表格设置并刷新表格数据
// _this.methods.upDateAppendFliterOption = this.upDateAppendFliterOption 添加或更新一个表格搜索过滤
_this.setDefaultMethods = () => { return {
  sayHello(){
    console.log(_this.globa.hello)
  },
  sum(){
    return 1+1
  }
} }
// 设置启动时运行的函数
_this.setDefaultLaunchFuns = () => { return {
  async doSomeTing(){
    _this.methods.sayHello()
    _this.methods.upDateAppendFliterOption({
      name: 'test',
      key: 'test',
      unsub:true,
      type: "input"
    })
    _this.methods.upDateAppendFliterOption({
      name: 'test2',
      key: 'input2',
      unsub:true,
      type: "select",
      items: [
        {
          name: '测试',
          key: 1,
        },
        {
          name: '测试2',
          key: 2
        },
      ],
      value: 1
    })
  },
  async sum(){
    console.log(_this.globa.xxx+_this.methods.sum())
  },
} }
let data = {
  scrollWidth: 1500,
  pageSizeOption: [20, 50, 100, 200],
  fetchFun: api.getList,
  // 可以使用函数（异步）或者以下形式
  // fetchFun: {
  //   url:'链接',
  //   method:'请求方式',
  // },
  subfromFunEditor: api.editorList,
  subfromFunAdd: api.addList,
  subfromFunDel: api.delList,
  fliterOption: [
    {
      name: 'input',
      key: 'input',
      type: "input",
      // 进行请求前运行的函数data为过滤参数
      beforFetch: async (data) => {
        // 可以这样设置某一项的值
        _this.tableData.fliterOption[0].value = '12345'
        console.log(data)
      }
    },
    {
      name: 'input2',
      key: 'input2',
      type: "input",
      rows: 2,
    },
    {
      name: 'input3',
      key: 'input3',
      type: "input",
      rows: 2,
    },
    {
      name: 'switch',
      key: 'switch',
      type: "switch",
      openValue: '1',
      closeValue: '2',
      value:'1'
    },
    {
      name: 'select',
      key: 'select',
      type: "select",
      items: [
        {
          name: '测试',
          key: 1,
        },
        {
          name: '测试2',
          key: 2
        },
      ],
      value: 1
    },
    {
      name: 'cascader',
      key: 'cascader',
      type: "cascader",
      items: [
        {
          name: '测试1',
          key: 1,
          children: [
            {
              name: '测试11',
              key: 11,
              children: [
                {
                  name: '测试111',
                  key: 111
                },
              ]
            },
            {
              name: '测试22',
              key: 22
            },
          ]
        },
        {
          name: '测试2',
          key: 2
        },
      ],
      value: 1
    },
    {
      name: 'time',
      startKey: 'start_time',
      endKey: 'end_time',
      type: "time",
      value: []
    },
    {
      name: '新建',
      type: 'formButton',
      // 展示表单弹窗前运行的函数
      beforeShow:(self)=>{
        return new Promise((resolve,reject)=>{
          console.log(self)
          resolve(self)
        })
      },
      disableLabel: true,
      // 设置fromHistoryId后关闭弹窗会保存表单输入内容
      fromHistoryId:'add',
      unsub:true,
      fromData: [
        {
          name: '名称',
          key: 'name',
          type: 'input',
          must: true
        },
      ],
      subfromData: {
        name: ""
      },
      fromTitle: "新建",
      subfromFunIndex: "Add"
    }
  ],
  // columns参考https://happy-coding-clans.github.io/vue-easytable/#/zh/doc/intro
  // 在原基础上新增了一些参数
  columns: [
    { field: "id", key: "id", title: "ID", align: "center", width: 20, sortBy: "", fixed: "left" },
    { field: "name", key: "name", title: "名称", align: "center", width: 50 },
    { field: "name", key: "nameof", title: "名称1", align: "center", width: 100, showOverflow: "status",startStr:'[showOverflow-status]' },
    { field: "name", key: "nametag", title: "名称2", align: "center", width: 50, showOverflow: "name",endStr:'[Tag]' ,showTag:{
      'test1':{
        type:'success',
        content:'test11'
      },
      'test2':{
        type:'warning',
        content:'test22'
      }
    }},
    { field: "status", key: "status", title: "状态", align: "center", width: 50, },
    { field: "config", key: "config", title: "配置", align: "center", width: 50, },
    // 以下为表格按钮的两种写法buttons会覆盖renderBodyCell
    {
      field: "utils", key: "utils", title: "操作", align: "center", width: 60, fixed: "right",
      buttons: [
        {
          name: '编辑',
          type: 'formButton',
          buttonTypeOpt: 'warning',
          fromData: [
            {
              name: '名称1',
              key: 'name',
              type: 'input',
              // must，不为空
              must: true,
              // rule为校验规则，需要must为true时生效
              rule:{
                maxLength:10,
                minLength:3,
              },
              // status==1时禁用
              disablekey:'status',
              disableval:'1'
            },
            {
              name: '名称2',
              key: 'name2',
              type: 'input',
              // unsub为true不会提交
              rows:2,
              unsub:true,
              must: true,
              rule:{
                equation:'name',
                equationStr:'名称2要与名称1相同 ',
                maxLength:10,
                minLength:3,
              },
              // status!=1时禁用
              disablekey:'status',
              disableval:'1',
              able:true
            },
            {
              name: '数字',
              key: 'num',
              type: 'input',
              // unsub为true不会提交
              unsub:true,
              must: true,
              rule:{
                onlyNum:true,
                maxNum:100,
                minNum:20
              }
            },
            {
              name: 'json',
              key: 'config',
              type: 'jsonIinput',
            },
            {
              name: '状态',
              key: 'status',
              type: 'switch',
              openValue: '1',
              closeValue: '2'
            },
            {
              name: '标签',
              key: 'tags',
              type: 'tags',
              tag: '+新标签',
              addTagText: '+新标签',
            },
            {
              name: '时间',
              key: 'time',
              type: 'timeOnly',
              unsub: true,
              // status!=1时禁用
              disablekey:'status',
              disableval:'1',
              able:true
            }
          ],
          subfromData: {
            id: "***",
            name: "***",
            name2:"",
            status:"***",
            num: 50,
            config:"***",
            tags: "***|strToArr",
            time:null
          },
          fromTitle: "编辑",
          subfromFunIndex: "Editor"
        },
        {
          name: '删除',
          type: 'confirmButton',
          buttonTypeOpt: 'danger',
          subfromData: {
            id: "***",
            
          },
          subfromFunIndex: "Del"
        },
      ],
    },
    {
      field: "utils2", key: "utils2", title: "操作2", align: "center", width: 60, fixed: "right",
      renderBodyCell:({ row, column, rowIndex }, h) => {
        return(
          //通过url参数设置过滤器初始值
          <div>
            <el-button v-on:click={async () => {
              location.href = '/#/test/test?fliterOption__input3=xxx'
              location.reload()
            }}>
              跳转
            </el-button>
            <el-button v-on:click={async () => {
            _this.tableData.fromData = [
              {
                name: '名称',
                key: 'name',
                type: 'input',
                must: true
              },
              {
                name: '状态',
                key: 'status',
                type: 'switch',
                openValue: '1',
                closeValue: '2'
              },
            ]
            _this.tableData.subfromData= {
              id: row.id,
              name: row.name,
              status:row.status,
            }
            _this.tableData.showFrom= true,
            _this.tableData.fromTitle= "编辑2",
            _this.tableData.subfromFunIndex= "Editor"
          }
          }>编辑2</el-button>
          </div>
        )
      }
    },
  ],
  tableShowJson: [
    {
      field: 'id',
      value: '',
      width: '500px'
    },
  ],
  tableEditorJson: [
    {
      // 对应columns中field
      field: 'config',
      // columns中field为空时编辑整行
      value: 'config',
      // 弹窗宽度
      width: '700px',
      height: '500px',
      // 提交的函数，要求异步函数
      subFun: api.editorList
    },
  ],
  tableSwitch: [
    {
      // 对应columns中field
      field: 'status',
      // columns中field为空时编辑整行
      value: 'status',
      openValue: '1',
      closeValue: '2',
      // 提交的函数，要求异步函数
      subFun: api.editorList
    },
  ],
}


export default data