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
            res.json(data)
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
            res.json(err)
        })
})
//更新处理
router.route('/checkupdate')
.put((req,res) => {
    Check.find({id:{$in:req.body.id.split(',')}})
        .then(data => {
            var hasone = data.some((ele)=>{
                return ele.dealStatus == '审核中'
            })
            if(hasone){
                res.send({
                    "code":"500",
                    "msg":"审核失败"
                })
                return false
            }
            Check.updateMany({
                id:req.body.id.split(',')
            },{
                $set:{
                    dealStatus:req.body.auditResult == '1' ? '审核通过' : '审核失败'
                }
            },{
                new:true
            })
            .then(() => {
                res.json({
                    "code":200,
                    "msg":"成功" 
                })
            })
            .catch(err => {
                res.json(err)
            })
        })
})
 
//删除某一个或者某几个信息
router.delete('/update',(req,res) => {
    var idtemp = req.body.id.split(',') 
    Check.deleteMany({"id":{$in:idtemp}})
        .then((data) => {
            if(data.ok){
                res.json({
                        "code":200,
                        "msg":"成功"
                })
            }else{
                res.json({
                        "code":400,
                        "msg":"失败"
                })
            }
            
        })
        .catch(err => res.json(err))
})

module.exports = router