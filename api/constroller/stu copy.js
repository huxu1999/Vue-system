const {createModel}=require('../models/stu')
const {listModel}=require('../models/stu')
 //定义方法
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
//列表
const index= async (req,res)=>{
//1获取数据
let data = await listModel()
//2响应数据
res.send({
    meta:{
        state:200,
        msg:"成功"
    },data:data
})
}

//导出方法
module.exports={create,index}