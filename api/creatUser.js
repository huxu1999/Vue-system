/* 引入依赖 */
const mongoose=require('mongoose')
/* 连接数据库 */
const db=mongoose.createConnection('mongodb://admin:admin@localhost:27017/admin',{useNewUrlParser:true,
useUnifiedTopology:true},err=>{
    if(err){console.log('数据库连接失败',err)}
    console.log('数据库连接成功')
})
/* 设置数据模型 (声明是那个集合，限制字段个数和字段类型) */
const model =db.model('api',{
    username:{type:String,default:"胡茜"},
    pwd:{type:String},
    age:{type:Number},
    sex:{type:String}
})
/* 创建实例操作 */
//增
const insertObj =new model({
    username:"huxi",
    pwd:"123456",
    age:"23",
    sex:"女",
})
insertObj.save().then(res=>{
    console.log(res)
    return res
}).catch(err=>{console.log('失败')+err
    return false
}
)