<!--非Epos交易查询detail-->
<template>
    <div id="detail">
        <div class="tableData">
            <table  cellspacing="0" cellpadding="0" style="width:100%;">
                <th colspan="8" align="left" style="height:60px;line-height: 60px;background: #ddd;color:#333;">
                    交易详细信息
                </th>
                <tr>
                    <td  class="bgf5" style="min-width:100px;">是否首次支付</td>
                    <td style="min-width:140px;">{{detailList.firstPay}}</td>
                    <td  class="bgf5" style="min-width:140px;">交易来源网址</td>
                    <td style="min-width:140px;">{{detailList.webSite}}</td>
                    <td  class="bgf5" style="min-width:140px;">商品名称</td>
                    <td style="min-width:140px;">{{detailList.productName}}</td>
                    <td class="bgf5" style="min-width:140px;">支付订单号</td>
                    <td style="min-width:170px;">{{detailList.paymentid}}</td>
                     
                </tr>
                <tr>
                    <td class="bgf5">IP</td>
                    <td>{{detailList.ip}}</td>
                    <td class="bgf5">金额(元)</td>
                    <td>{{detailList.money}}</td>
                     <td class="bgf5">商品编码</td>
                    <td>{{detailList.productsNo}}</td>
                    <td class="bgf5">商户订单号</td>
                    <td>{{detailList.orderNo}}</td>
                    
                </tr>
                 <tr>
                    <td class="bgf5">银行编码</td>
                    <td>{{detailList.bankSign}}</td>
                    <td class="bgf5">银行名称</td>
                    <td>{{detailList.bankName}}</td>
                     <!-- <td class="bgf5">支付订单号</td>
                    <td>{{detailList.paymentid}}</td> -->
                    <td  class="bgf5" style="min-width:170px;">工具</td>
                    <td style="min-width:170px;">{{detailList.tools}}</td>
                     <td class="bgf5">渠道</td>
                    <td>{{detailList.channel}}</td>
                </tr>
                <tr>
                    <td class="bgf5">持卡人手机号</td>
                    <td>{{detailList.cardHolderMobile}}</td>
                    <td class="bgf5">银行卡号</td>
                    <td>{{detailList.cardNo}}</td>
                     <td class="bgf5">IP地址</td>
                    <td>{{detailList.ipAddress}}</td>
                     <!-- <td class="bgf5">商户订单号</td>
                    <td>{{detailList.orderNo}}</td> -->
                     <td class="bgf5">虚拟终端号</td>
                    <td>{{detailList.virtualTerminalId}}</td>
                </tr>
                 <tr>
                    <td class="bgf5">手机号地区</td>
                    <td>{{detailList.mobileAddress}}</td>
                    <td class="bgf5">银行卡号归属地</td>
                    <td>{{detailList.cardAddress}}</td>
                     <td class="bgf5">子产品</td>
                    <td>{{detailList.subProduct}}</td>
                     <td class="bgf5">交易发生时间</td>
                    <td>{{detailList.time}}</td>
                </tr>
                <tr>
                    <td class="bgf5">产品</td>
                    <td>{{detailList.product}}</td>
                    <td class="bgf5">持卡人证件类型</td>
                    <td>{{detailList.idCardType}}</td>
                     <td class="bgf5">支付结果</td>
                    <td>{{detailList.status}}</td>
                    <td class="bgf5">用户UA</td>
                    <td>{{detailList.userUA}}</td>
                    
                </tr>
                <tr>
                    <td class="bgf5">持卡人证件号</td>
                    <td>{{detailList.idNo}}</td>
                    <td class="bgf5">商户分级</td>
                    <td>{{detailList.grade}}</td>
                     <td class="bgf5">持卡人证件地区</td>
                    <td>{{detailList.idRegion}}</td>
                     <td class="bgf5">商户IP</td>
                    <td>{{detailList.marchantIp}}</td>
                </tr>
                 <tr>
                    <td class="bgf5">用户类型</td>
                    <td>{{detailList.userType}}</td>
                    <td class="bgf5">银行卡类型</td>
                    <td>{{detailList.cardType}}</td>
                     <td class="bgf5">商户IP地区</td>
                    <td>{{detailList.marchantIpAddress}}</td>
                     <td class="bgf5">银行通道ID</td>
                    <td>{{detailList.bankChannelId}}</td>
                </tr>
                 <tr>
                  <!--   <td class="bgf5">用户UA</td>
                    <td>{{detailList.userUA}}</td> -->
                     <td class="bgf5">商户编号</td>
                    <td>{{detailList.No}}</td> 
                    <td class="bgf5">绑卡ID</td>
                    <td>{{detailList.cardId}}</td>
                    <td class="bgf5">用户ID</td>
                    <td>{{detailList.userId}}</td>
                    
                     <td class="bgf5">服务器ID</td>
                    <td>{{detailList.serverId}}</td>
                </tr>
                 <tr>
                    <td class="bgf5">鉴权结果</td>
                    <td>{{detailList.authorizationResult}}</td>
                    <td class="bgf5">用户授权等级</td>
                    <td>{{detailList.authorizationGrade}}</td>
                     <td class="bgf5">终端类型</td>
                    <td>{{detailList.terminalType}}</td>
                   
                     <td class="bgf5">终端号</td>
                    <td>{{detailList.terminal}}</td>
                </tr>
                <tr>
                    <td class="bgf5">终端标识码</td>
                    <td>{{detailList.terminalCode}}</td>
                    <td class="bgf5">mac</td>
                    <td>{{detailList.mac}}</td>
                     <td class="bgf5">持卡人性别</td>
                    <td>{{detailList.sex}}</td>
                     <td class="bgf5">绑卡更新时间</td>
                    <td>{{detailList.cardUpdateTime}}</td>
                    
                </tr>
                 <tr>
                   <td class="bgf5">会话ID</td>
                    <td>{{detailList.sessionId}}</td>
                     <td class="bgf5">持卡人属相</td>
                    <td>{{detailList.zodiac}}</td>
                     <td class="bgf5">商户自然属性一级</td>
                    <td>{{detailList.naturalPropertyOne}}</td>
                     <td class="bgf5">商户自然属性二级</td>
                    <td>{{detailList.naturalPropertyTwo}}</td>
                </tr>
                 <tr>
                    <td class="bgf5">报错原因</td>
                    <td>{{detailList.intercepetReason}}</td>
                    <td class="bgf5">风控拦截原因</td>
                    <td colspan="5">{{detailList.errorReason}}</td>
                     
                </tr>
                <tr>
                    <td class="bgf5" style="border-bottom:1px solid #ccc;">商户透析信息</td>
                    <td colspan="7">{{detailList.transparentTransmission}}</td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
import qs from 'qs';
export default {
    name:"非Epos交易查询详情",
    data(){
        return{
            detailList:{}
        }
    },
    created(){  //取详情列表
        // var getlist = {
        //     "id":"222",
        //     "firstPay":"",
        //     "webSite":"webSite",
        //     "productName":"producproductNproducproductNa ductNametName",
        //     "tools":"tools",
        //     "ip":"ip",
        //     "money":"money",
        //     "No":"No",
        //     "ipAddress":"ipAdipAddressipAddressipAddressdress",
        //     "bankCode":"bankCode",
        //     "bankName":"bankName",
        //     "orderNo":"orderNo",
        //     "channel":"channelchannelchannelchannelchannelchannelchannel",
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
        //     "userUA":"Mozilla/5.0 (Linux; Android 7.1.2; vivo X9i Build/N2G47H; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/55.0.2883.91 Mobile Safari/537.36",
        //     "cardId":"cardId",
        //     "bankChannelId":"bankChannelId",
        //     "serverId":"serverId",
        //     "authorizationResult":"authorizationResult",
        //     "authorizationGrade":"authorizationGrade",
        //     "terminalType":"terminalType",
        //     "sessionId":"sessionId",
        //     "authorizationGrade":"authorizationGrade",
        //     "terminalCode":"terminalCode",
        //     "mac":"Mozilla/5.0 (Linux; Android 7.1.2; vivo X9i Build/N2G47H; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/55.0.2883.91 Mobile Safari/537.36",
        //     "sex":"sex",
        //     "zodiac":"zodiac",
        //     "terminal":"isStop=true,level=1,code=userPhoneBl&手机号,value=c2umI1gRFLYp9AWn+4BhVg==,ecode=null,edes=null",
        //     "cardUpdateTime":"cardUpdateTime",
        //     "naturalPropertyOne":"naturalPropertyOne",
        //     "naturalPropertyTwo":"naturalPropertyTwo",
        //     "errorReason":"isStop=true,level=1,code=userPhoneBl&手机号,value=c2umI1gRFLYp9AWn+4BhVg==,ecode=null,edes=null",
        //     "intercepetReason":"isStop=true,level=1,code=userPhoneBl&手机号,value=c2umI1gRFLYp9AWn+4BhVg==,ecode=null,edes=null",
        //     "transparentTransmission":{"sfsdf ":"电商","sfsdsdfsdfdsffdsff ":"电商","sfffffsdf ":"电商","sfsdwrwertretertereref ":"电商","piouuygfhdssdsdsds ":"电商","qweweweevewrwwee ":"电商","sfsddfrddssdryreegjjjjjf ":"电商","sfsddfrddssdsdfsdsdryreegjjjjjf ":"电商","sfsddfrddyutytytyyssdryreegjjjjjf ":"电商","sfsddfrddssdryreegjjjjjf ":"电商"}
        // } 
        // this.detailList = getlist
        var id = this.$route.params.id
        this.$axios.post("/usNoEpos/detail",qs.stringify({
            yeepayNo:id, //选中的行的id列表
            sessionId:localStorage.getItem('SID') ? localStorage.getItem('SID'):''
        })).then(res => {
            var response = res.data
            if(response.code == '200'){
               this.detailList = response.data
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
table{border-right:1px solid #ccc;font-size:12px;border-bottom: 1px solid #ccc;}
td{border:solid #ccc; border-width:1px 0px 0px 1px;height: 50px;}
.bgf5{background: #f5f5f5;text-align: center;}  
</style>
