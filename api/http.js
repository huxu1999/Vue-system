const express=require('express')
const app =express()
const stuController =require('./constroller/stu')
//用来解决数据解析问题
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.post('/',(req,res)=>{
    console.log(req.body)
    res.send("hello wold")
})
//学生添加
app.post('/addstu',stuController.create)
//登陆判断
app.post('/stu',stuController.index)
//渲染用户列表
app.post('/getData',stuController.getData)
//删除用户
app.post('/removeD',stuController.removeD)
//更新用户
app.post('/upData',stuController.upDatas)
//更新后修改用户
app.post('/alertData',stuController.alertDatas)
//新增商品
app.post('/createProduct',stuController.createProduct)
//渲染商品列表
app.post('/getProduct',stuController.getProduct)
//新增出库商品信息
app.post('/createRemove',stuController.createRemove)
//渲染出库信息
app.post('/getRemove',stuController.getRemove)
//入库求和
app.post('/sumProduct',stuController.sumProduct)
//树状图库存总量
app.post('/treeSum',stuController.treeSum)
app.listen(3000,(err)=>{
    if(!err) console.log('启动成功')
    else{console.log(err)}
})
