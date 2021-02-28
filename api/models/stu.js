/* 引入依赖 */
const mongoose=require('mongoose')
/* 连接数据库 */
const db=mongoose.createConnection('mongodb://admin:admin@localhost:27017/admin',{useNewUrlParser:true,
useUnifiedTopology:true},err=>{
    if(err){console.log('数据库连接失败',err)}
    console.log('数据库连接成功')
})
/* 设置数据模型 (声明是那个集合，限制字段个数和字段类型) */
const model =db.model('stu',{
    userName:{type:String},
    password:{type:String},
    number:{type:String}
    
})
//设置商品数据模型
const productModel=db.model('product',{
    inTime:{type:String},
    name:{type:String},number:{type:String},amount:{type:String},
    breakage:{type:String},realAmount:{type:Number},size:{type:String},userNumber:{type:String}
})
//设置出库商品数据模型
const removeProductModel=db.model('removeProduct',{
    outTime:{type:String},name:{type:String},number:{type:String}
    ,amount:{type:Number},size:{type:String},userNumber:{type:String}
})
//新增用户
const createModel=(postData)=>{
    const insertObj=new model(postData)
    insertObj.save().then(res=>{
        console.log(res)
        return res
    }).catch(err=>{console.log('失败')+err
        return false
    }
    )
}
//新增出库信息
const createRemoveProduct=(postData)=>{
    const insertObj=new removeProductModel(postData)
    insertObj.save().then(res=>{
        return res
    }).catch(err=>{console.log(err)})
}
//新增商品
const createproductModel=(postData)=>{
    const insertObj=new productModel(postData)
    insertObj.save().then(res=>{
        console.log(res)
        return res
    }).catch(err=>{console.log('失败')+err
        return false
    }
    )
}
//出库信息渲染
const listRemoveproductModel=()=>{
    return removeProductModel.find().then(res=>{
        return res
    }).catch(err=>{console.log('查询失败'+err)
          return []          
})
}
//为商品列表渲染
const listproductModel=()=>{
    return productModel.find().then(res=>{
        return res
    }).catch(err=>{console.log('查询失败'+err)
          return []          
})
}
//为数据列表渲染
const listModel=()=>{
    return model.find().then(res=>{
        return res
    }).catch(err=>{console.log('查询失败'+err)
          return []          
})
}
//删除用户
const removeModel=(removeData)=>{
         return model.deleteOne({userName:removeData}).then(res=>{
             return res
         }).catch(err=>{console.log(err)})
}
//更新用户
const updataModel=(upData)=>{
    return model.findOne({userName:upData}).then(res=>{
        return res
    }).catch(err=>{console.log(err)})
}
//更新后修改用户
const alertModel=(alertData,alertPassword)=>{
    return model.update({userName:alertData},{$set:{password:alertPassword}}).then(res=>{
        return res
    }).catch(err=>{
        console.log(err)
    })
}
//入库查询并求和
const sumProductModel=(getName,getSize)=>{
    return productModel.aggregate([{$match:{name:getName,size:getSize}},{$group:{_id:null,amount:{$sum:'$realAmount'}}},
     {$project:{_id:0,amount:1}}]).then(res=>{return res
    }).catch(err=>{console.log(err)})
}
//出库查询并求和
const sumRemoveModel=(getName,getSize)=>{
    return removeProductModel.aggregate([{$match:{name:getName,size:getSize}},{$group:{_id:null,amount:{$sum:'$amount'}}},
    {$project:{_id:0,amount:1}}]).then(res=>{return res
   }).catch(err=>{console.log(err)})
}
//数桩图库存总量
const sumGrossModel=()=>{
    return productModel.aggregate([{$group:{_id:null,amount:{$sum:'$realAmount'}}},
    {$project:{_id:0,amount:1}}]).then(res=>{return res}).catch(err=>{console.log(err)})
}
const sumRemoveGrossModel=()=>{
    return removeProductModel.aggregate([{$group:{_id:null,amount:{$sum:'$amount'}}},
    {$project:{_id:0,amount:1}}]).then(res=>{return res}).catch(err=>{console.log(err)})
}
//查询A区库存
const sumProductAModel=()=>{
    return productModel.aggregate([{$match:{size:'big'}},{$group:{_id:null,amount:{$sum:'$realAmount'}}},
     {$project:{_id:0,amount:1}}]).then(res=>{return res
    }).catch(err=>{console.log(err)})
}
const sumProductARModel=()=>{
    return removeProductModel.aggregate([{$match:{size:'big'}},{$group:{_id:null,amount:{$sum:'$amount'}}},
     {$project:{_id:0,amount:1}}]).then(res=>{return res
    }).catch(err=>{console.log(err)})
}
//查询B区库存
const sumProductBModel=()=>{
    return productModel.aggregate([{$match:{size:'small'}},{$group:{_id:null,amount:{$sum:'$realAmount'}}},
     {$project:{_id:0,amount:1}}]).then(res=>{return res
    }).catch(err=>{console.log(err)})
}
const sumProductBRModel=()=>{
    return removeProductModel.aggregate([{$match:{size:'small'}},{$group:{_id:null,amount:{$sum:'$amount'}}},
     {$project:{_id:0,amount:1}}]).then(res=>{return res
    }).catch(err=>{console.log(err)})
}
module.exports={
    createModel,
    listModel,removeModel,updataModel,alertModel,createproductModel,
    listproductModel,createRemoveProduct,listRemoveproductModel,
    sumProductModel,sumRemoveModel,sumGrossModel,sumRemoveGrossModel,
    sumProductAModel,sumProductARModel,sumProductBModel,sumProductBRModel
}