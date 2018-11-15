//引入express模块
const express = require("express");
//定义路由中间件
const router = express.Router()
//引入数据模型
const Check = require('../models/checkSchema')

//查询列表
router.get('/querylist',(req,res) => {
    Check.find({})
        .sort({update_at:1})
        .then(data => {
            var temp = JSON.parse(JSON.stringify(data[0]))
            if(temp.returnList){
                temp.code ='200'
            }else{
                temp.code ='204'
            }
            delete temp['_id']
            res.json(temp)
        })
        .catch(err => {
            res.json(err)
        })
})
//查询报表
router.get('/querychart',(req,res) => {
    Check.find({})
        .sort({update_at:-1})
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            console.log(err)
            res.json(err)
        })
})
//更新处理
router.put('/update/:id',(req,res) => {
    Check.updateMany({
        _id:req.params.id
    },{
        $set:{
            checkList:req.body.checkList,
            merchantOnlyId:req.body.merchantOnlyId,
            merchantNo:req.body.merchantNo,
            merchantContractName:req.body.merchantContractName,
            merchantKyc:req.body.merchantKyc,
            naturalPropertyOne:req.body.naturalPropertyOne,
            time:req.body.time,
            expiryTime:req.body.expiryTime,
            dealStatus:req.body.dealStatus,
            riskDeal:req.body.riskDeal,
            investigationInfo:req.body.investigationInfo,
            checkListSource:req.body.checkListSource,
            autoRiskDeal:req.body.autoRiskDeal,
            sale:req.body.sale,
            subCompany:req.body.subCompany,
            achievementProperty:req.body.achievementProperty,
            merchantNetTime:req.body.merchantNetTime,
            agentNo:req.body.agentNo,
            agentName:req.body.agentName,
            lastModifiedBy:req.body.lastModifiedBy,
            lastModifiedTime:req.body.lastModifiedTime,
            remark:req.body.remark
        }
    },{
        new:true
    })
        .then(data => res.json(data))
        .catch(err => res.json(err))
})
//删除某一个或者某几个信息
router.delete('/update',(req,res) => {
    Check.update({},{$pull:{"returnList":{"id":5,"id":4}}})
        .then((data) => {
            if(data.ok){
                res.json('删除成功')
            }else{
                res.json('删除失败')
            }
            
        })
        .catch(err => res.json(err))
})

module.exports = router