# vue-project

> A Vue.js project 一个仓库管理系统，实现了对仓库出入库信息的记录，库存通过echarts实现数据可视化，界面使用了element-ui,后台使用node.js写的api接口。

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev
运行后到登陆界面的账号要提前在数据库中创建好，这里推荐使用ApiPost这个软件发送post请求创建账号
也可以用它来调试其他api接口
# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
# 后台api在api文件下 
  node http.js
  # 数据库使用的是mongodb 
  在api\models\stu.js中连接数据库，只需要连接自己的数据库，集合在运行后会自动创建。
