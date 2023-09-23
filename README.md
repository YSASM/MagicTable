# MagicTable
基于vue-admin-beautiful,elementui,vue-easytable等实现的网页快速生成框架,只需要编写js文件就能实现管理面板的表格页面

## 特点

* 轻量
* 简洁
* 缩短开发时间

## 开始

```
git clone https://github.com/YSASM/MagicTable.git

cd MagicTable

yarn
```

## 如何创建新页面

* 在@/router/index.js的asyncRoutes参数中声明新的路由
* 在@/views下对应的路径下创建data.js
* 编写你的第一个网页吧

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

## 其他设置

* 在@/config/net.config.js中新增了baseUrlList参数可在登录时替换要使用的baseurl，如不需要请自行注释
* 在路由的mate属性中添加了range参数类型为数组，用于限制页面只在某个baseurl时显示，不设置参数时不做限制，如不需要不使用即可
* data.js相关配置请阅读测试用例和组件核心代码@/components/MigicTable/index.vue
* 更多详细内容请阅读以下相关文档



## 相关文档

[vue-admin-beautiful](https://github.com/chuzhixin/vue-admin-better)

[element-ui](https://element.eleme.cn/#/zh-CN)

[vue-easytable](https://happy-coding-clans.github.io/vue-easytable/#/zh/doc/intro)
