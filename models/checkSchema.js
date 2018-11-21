const mongoose = require('mongoose')

const checkSchema = mongoose.Schema({
        checkList:String,
        id:Number,
        merchantOnlyId:String,
        merchantNo:String,
        merchantContractName:String,
        merchantKyc:String,
        naturalPropertyOne:String,
        time:String,
        expiryTime:String,
        dealStatus:String,
        riskDeal:String,
        investigationInfo:String,
        checkListSource:String,
        autoRiskDeal:String,
        sale:String,
        subCompany:String,
        achievementProperty:String,
        merchantNetTime:String,
        agentNo:String,
        agentName:String,
        lastModifiedBy:String,
        lastModifiedTime:String,
        remark:String
},{collection:'checklist'})

const Check = module.exports = mongoose.model('check',checkSchema)