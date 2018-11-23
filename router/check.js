//引入express模块
const express = require("express");
//定义路由中间件
const router = express.Router()
//引入数据模型
const Check = require('../models/checkSchema')
const Chart = require('../models/chartSchema')

Date.prototype.Format = function(fmt) { // 时间处理
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
 
//查询图表
router.post('/querychart',(req,res) => {
    // req.body.dateType
    
    var today = (new Date()).Format("yyyy-MM-dd")
    var todayBefore = (new Date(new Date().getTime() - 1000*24*60*60*(Number(req.body.dateCount)))).Format("yyyy-MM-dd")
    Chart.find({times:{'$gte':todayBefore,'$lt':today}})
        .then(data => {
            var objdata = {
                "times":[],
                "fraudRateList":[],
                "synthetical":[],
                "grossincome":[]
            }
            data.map( (ele) => {
                objdata.times.push(ele.times)
                objdata.fraudRateList.push(ele.fraudRateList)
                objdata.synthetical.push(ele.synthetical)
                objdata.grossincome.push(ele.grossincome)
            })
            res.json({
                "code":200,
                "msg":"成功",
                "data":objdata
            })
        })
        .catch(err => {
            res.json(err)
        })
})
//查询列表
router.get('/querylist',(req,res) => {
    Check.find({})
        .sort({update_at:1})
        .then((data) => {
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