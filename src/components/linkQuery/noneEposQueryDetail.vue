<!--非Epos交易查询detail-->
<template>
    <div id="detail">
        <div class="tableData">
            <h2 class="detailTitle fs16">交易详细信息</h2>
            <ul class="clear">
                <li class="cell" v-for="(item,index) of detailList">{{item}}</li>
                
            </ul>
        </div>
    </div>
</template>
<script>
import qs from 'qs';
export default {
    name:"detail",
    data(){
        return{
            detailList:[]
        }
    },
    created(){  //取详情列表
        // var getlist = {
        //     "id":"222",
        //     "firstPay":"firstPay",
        //     "webSite":"webSite",
        //     "productName":"productName",
        //     "tools":"tools",
        //     "ip":"ip",
        //     "money":"money",
        //     "No":"No",
        //     "ipAddress":"ipAddress",
        //     "bankCode":"bankCode",
        //     "bankName":"bankName",
        //     "orderNo":"orderNo",
        //     "channel":"channel",
        //     "cardHolderMobile":"cardHolderMobile",
        //     "cardNo":"cardNo",
        //     "orderNo":"orderNo",
        //     "terminal":"terminal",
        //     "mobileAddress":"mobileAddress",
        //     "cardAddress":"cardAddress",
        //     "subProduct":"subProduct",
        //     "time":"time",
        //     "product":"product",
        //     "cardType":"cardType",
        //     "payResult":"payResult",
        //     "idNo":"idNo",
        //     "payCode":"payCode",
        //     "grade":"grade",
        //     "idRegion":"idRegion",
        //     "marchantIp":"marchantIp",
        //     "userType":"userType",
        //     "marchantIpAddress":"marchantIpAddress",
        //     "userId":"userId",
        //     "userUA":"userUA",
        //     "cardId":"cardId",
        //     "bankChannelId":"bankChannelId",
        //     "serverId":"serverId",
        //     "authorizationResult":"authorizationResult",
        //     "authorizationGrade":"authorizationGrade",
        //     "terminalType":"terminalType",
        //     "sessionId":"sessionId",
        //     "authorizationGrade":"authorizationGrade",
        //     "terminalCode":"terminalCode",
        //     "mac":"mac",
        //     "sex":"sex",
        //     "zodiac":"zodiac",
        //     "terminal":"terminal",
        //     "cardUpdateTime":"cardUpdateTime",
        //     "naturalPropertyOne":"naturalPropertyOne",
        //     "naturalPropertyTwo":"naturalPropertyTwo",
        //     "errorReason":"errorReason",
        //     "intercepeReason":"intercepeReason",
        //     "transparentTransmission":"transparentTransmission"
        // } 
        // this.detailList = this.toArray(getlist)

        var id = this.$route.params.id
        this.$axios.post("/riskgod/union/noepos/getDetails",qs.stringify({
            id:id  //选中的行的id列表
        })).then(res => {
            var response = res.data
            if(response.code == '200'){
               this.detailList = this.toArray(response.data)
            }else{
                this.$message.error({message:response.msg,center: true});
            }
        })
    },
    methods:{
        toArray(obj) { // {} 转成数组
            var temp = []
            for(var item in obj){
                temp.push(obj[item])
            }
            return temp
        }
    }
}
</script>
<style scoped lang="less">
    .tableData{
        overflow: hidden;
        border-right: 1px solid #ccc;
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        .detailTitle{height:60px;line-height: 60px;background: #ddd;color:#333;}
        .cell{
            width:12.5%;
            height:50px;
            line-height:50px;
            text-align: center;
            border-left: 1px solid #ccc;
            border-bottom: 1px solid #ccc;
            box-sizing: border-box;
            float: left;
            &:last-child{
                border-bottom: none;
            }
        }
    }    
</style>
