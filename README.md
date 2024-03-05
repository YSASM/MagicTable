<h1 align="center"> MagicTable </h1>
<div align="center">v0.1.0</div>
<div align="center">
  <img src="https://avatars.githubusercontent.com/u/80308986?v=4" style="width:100px;height:100px;"/>
</div>

<div align="center">

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/YSASM)
![Profile views](https://views.whatilearened.today/views/github/Xuenew/views.svg)
![](https://img.shields.io/badge/Vue.js-black?style=flat-square&logo=vue.js)

</div>

# 快速搭建一个公司管理系统

基于 vue-admin-beautiful,elementui,vue-easytable 等实现的网页快速生成框架，无需编写 html 和 css 代码，只需要编写 js 文件就能实现管理面板的表格页面。

## github 链接

[https://github.com/YSASM/MagicTable](https://github.com/YSASM/MagicTable)

vue3.x 请移步[https://github.com/YSASM/MagicTableV2](https://github.com/YSASM/MagicTableV2)

## 特点

- 轻量
- 简洁
- 缩短开发时间

## 示例

![示例页面](https://img-blog.csdnimg.cn/0303d325711044129934b89d27acada1.png#pic_center)

## 如何开始

```
git clone https://github.com/YSASM/MagicTable.git

cd MagicTable

yarn

yarn run dev
```

## 如何创建新页面

- 在@/router/index.js 的 asyncRoutes 参数中声明新的路由
- 在@/views 下对应的路径下创建 data.js
- 编写你的第一个网页吧

```
// 示例
// 如果路由设置如下
{
  path: '/xxx',
  // ......
  children: [
    {
      path: 'yyy',
      // ......
    },
  ],
}
// data.js的路径就为@/views/xxx/yyy/data.js
```

## 接口返回数据与数据格式化

```
{
  code:0,
  message:"ok"
  data:{
    total:0,//数据总量
    items:[],//表格数据
    summarys:[]//表格汇总数据
  }
}


//可以后台适应格式，也可在@/api/default.js中编写统一的json格式化，或者更改@/components/MigicTable/index.vue的代码
import request from '@/utils/request'
......
return async (params) => {
  let res = await request({
    url: url,
    method: method,
    params: params,
  })
  let temp = {
    code:res.xxx,
    message:res.xxx
    data:{
      total:res.xxx,
      items:res.xxx,
      summarys:res.xxx
    }
  }
  return temp
}
......
```

## 已完成功能

- 根据 json 生产表格
- 表格汇总
- 表格搜索过滤
- 单元格自定义
- 表格展示:标签,switch 开关,json 展示,json 编辑
- 表格行颜色根据后端返回 color 字段修改
- 表单弹窗,自定义弹窗
- data.js 中设置启动函数全局变量和全局函数
- 自定义右键菜单

## 其他设置

- 在@/config/net.config.js 中新增了 baseUrlList 参数可在登录时替换要使用的 baseurl，如不需要请自行注释
- 在路由的 meta 属性中添加了 range 参数类型为数组,如 range: ['/test','/test1']，用于限制页面只在某个 baseurl 时显示，不设置参数时不做限制，如不需要不使用即可
- data.js 相关配置请阅读测试用例和组件核心代码@/components/MigicTable/index.vue
- 更多详细内容请阅读以下相关文档

## 相关文档

[vue-admin-beautiful](https://github.com/chuzhixin/vue-admin-better)

[element-ui](https://element.eleme.cn/#/zh-CN)

[vue-easytable](https://happy-coding-clans.github.io/vue-easytable/#/zh/doc/intro)
