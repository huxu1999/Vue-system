const {createModel}=require('../models/stu')
const {listModel}=require('../models/stu')
const {removeModel}=require('../models/stu')
const {updataModel}=require('../models/stu')
const {alertModel}=require('../models/stu')
const {createproductModel}=require('../models/stu')
const {listproductModel}=require('../models/stu')
const {createRemoveProduct}=require('../models/stu')
const {listRemoveproductModel}=require('../models/stu')
const {sumProductModel}=require('../models/stu')
const {sumRemoveModel}=require('../models/stu')
const {sumGrossModel}=require('../models/stu')
const {sumRemoveGrossModel}=require('../models/stu')
const {sumProductAModel}=require('../models/stu')
const {sumProductARModel}=require('../models/stu')
const {sumProductBModel}=require('../models/stu')
const {sumProductBRModel}=require('../models/stu')
 //定义方法新增数据
const create= async (req,res)=>{
  //res.send('fuck you')
  //1.接收数据
  let postData =req.body
  //2.过滤
  //3.操作数据库
  
  let rs= await createModel(postData)
  
  //4.判断返回
  if(rs){
      res.send({
          meta:{
              state:200,
              msg:"添加成功"
          },
          data:null
      })
  }else{res.send({
    meta:{
        state:500,
        msg:"添加失败"
    },
    data:null
})}
}
//新增商品
const createProduct= async (req,res)=>{
    //res.send('fuck you')
    //1.接收数据
    let postData =req.body
    //2.过滤
    //3.操作数据库
    
    let rs= await createproductModel(postData)
    
    //4.判断返回
    if(rs){
        res.send({
            meta:{
                state:200,
                msg:"添加成功"
            },
            data:null
        })
    }else{res.send({
      meta:{
          state:500,
          msg:"添加失败"
      },
      data:null
  })}
  }
  //新增出库信息
  const createRemove=async (req,res)=>{
      const postData=req.body
      const rs= await createRemoveProduct(postData)
          if(rs){
              res.send({
                  meta:{
                      state:200,
                      msg:"添加成功"
                  },data:null
              })
          }else{
            res.send({
                meta:{
                    state:500,
                    msg:"添加失败"
                },data:null
            })
          }
  }
//登陆判断
const index= async (req,res)=>{
   const postBody=req.body
//1获取数据
var data = await listModel()
//2响应数据
const a=data
for(var i=0;i<a.length;i++){
    if(postBody.usename==a[i].useName&&postBody.password==a[i].password){
        //console.log('1')
        res.send('1')
        return
    }else{res.send('2')}
}  



}
//渲染商品
const getProduct= async (req,res)=>{
    var data= await listproductModel()
    res.send(data)
}
//渲染用户
const getData= async (req,res)=>{
    var data= await listModel()
    res.send(data)
}
//渲染出库信息
const getRemove= async (req,res)=>{
    var data= await listRemoveproductModel()
    res.send(data)
}
//删除用户
const removeD= async(req,res)=>{
      const removeData=req.body.userName
      const rs= await removeModel(removeData)
      if(rs){
          res.send('成功')
      }else{res.send('失败')}
}
//更新用户
const upDatas= async (req,res)=>{
    const upData=req.body.userName
    const rs= await updataModel(upData)
    res.send(rs)
}
//更新后修改用户
const alertDatas= async (req,res)=>{
    const alertData=req.body.userName
    const alertPassword=req.body.password
    const rs= await alertModel(alertData,alertPassword)
    if(rs){
        res.send({
            meta:{
                state:200,
                msg:"修改成功"
            },
            data:null
        })
    }else{res.send({
        meta:{
            state:500,
            msg:"修改失败"
        },
        data:null
    })}
}
//入库数据求和
const sumProduct= async(req,res)=>{
   const getName=req.body.name
   const getSize=req.body.size
    const rs=await sumProductModel(getName,getSize)
    const rs2=await sumRemoveModel(getName,getSize)
    var a=rs[0]
    var b=rs2[0]
    res.send([a,b])
}
//树状图库存量
const treeSum= async(req,res)=>{
    //库存总量
    const rs= await sumGrossModel()
    const rs2=await sumRemoveGrossModel()
    var a=rs[0]
    var b=rs2[0]
    //A区库存量
    const rs3=await sumProductAModel()
    const rs4=await sumProductARModel()
    var c=rs3[0]
    var d=rs4[0]
    //B区库存量
    const rs5=await sumProductBModel()
    const rs6=await sumProductBRModel()
    var e=rs5[0]
    var f=rs6[0]
    res.send([a,b,c,d,e,f])
}
//导出方法
module.exports={create,index,getData,removeD,upDatas,alertDatas
,createProduct,getProduct,createRemove,getRemove,sumProduct,treeSum
}