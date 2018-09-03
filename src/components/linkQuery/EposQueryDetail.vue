<!--非Epos交易查询detail-->
<template>
    <div id="detail">
        <table  cellspacing="0" cellpadding="0" style="width:100%;"> 
                <th colspan="8" align="left" style="height:60px;line-height: 60px;background: #ddd;color:#333;">
                    交易详细信息
                </th>
                <tr>
                    <td  class="bgf5" style="min-width:100px;">用户ID</td>
                    <td style="min-width:140px;">{{detailList.userId}}</td>
                    <td  class="bgf5" style="min-width:140px;">起飞城市</td>
                    <td style="min-width:140px;">{{detailList.fromCity}}</td>
                    <td  class="bgf5" style="min-width:140px;">IP</td>
                    <td style="min-width:140px;">{{detailList.ip}}</td>
                     <td class="bgf5" style="min-width:170px;">商户订单号</td>
                    <td style="min-width:170px;">{{detailList.orderNo}}</td>
                  
                </tr>
                <tr>
                    <td class="bgf5">MAC</td>
                    <td>{{detailList.mac}}</td>
                    <td class="bgf5">交易失败原因</td>
                    <td>{{detailList.faileReason}}</td>
                     <td class="bgf5">银行名称</td>
                    <td>{{detailList.bankName}}</td>
                     <td class="bgf5">商户使用方式</td>
                    <td>{{detailList.merchantWay}}</td>
                </tr>
                 <tr>
                    <td class="bgf5">乘机人证件号</td>
                    <td>{{detailList.passengerId}}</td>
                    <td class="bgf5">乘机人证件类型</td>
                    <td>{{detailList.passengerIdType}}</td>
                     <td class="bgf5">乘机人手机号</td>
                    <td>{{detailList.passengerMobile}}</td>
                     <td class="bgf5">乘机人姓名</td>
                    <td>{{detailList.passengerName}}</td>
                </tr>
                <tr>
                    <td class="bgf5">持卡人是否为乘机人之一</td>
                    <td>{{detailList.isCardholderPassenger}}</td>
                    <td class="bgf5">是否单程</td>
                    <td>{{detailList.isOneWay}}</td>
                     <td class="bgf5">使用场景</td>
                    <td>{{detailList.userScene}}</td>
                     <td class="bgf5">银行通道ID</td>
                    <td>{{detailList.bankChannelId}}</td>
                </tr>
                 <tr>
                    <td class="bgf5">时间间隔</td>
                    <td>{{detailList.timeInterval}}</td>
                     <td class="bgf5">联系人手机号</td>
                    <td>{{detailList.contactMobile}}</td>
                     <td class="bgf5">银行卡号</td>
                    <td>{{detailList.cardNo}}</td>
                     <td class="bgf5">持卡人身份证号</td>
                    <td>{{detailList.cardHolderId}}</td>
                </tr>
                <tr>
                   
                    <td class="bgf5">持卡人身份证号归属地</td>
                    <td>{{detailList.cardholderIdAddress}}</td>
                     <td class="bgf5">金额(元)</td>
                    <td>{{detailList.money}}</td>
                     <td class="bgf5">持卡人姓名</td>
                    <td>{{detailList.cardHolderName}}</td>
                     <td class="bgf5">商户编号</td>
                    <td>{{detailList.No}}</td>
                </tr>
                <tr>
                     <td class="bgf5">银行类型</td>
                    <td>{{detailList.bankType}}</td>
                     <td class="bgf5">方式</td>
                    <td>{{detailList.mode}}</td>
                     <td class="bgf5">银行卡类型</td>
                    <td>{{detailList.cardType}}</td>
                     <td class="bgf5">易宝交易流水号</td>
                    <td>{{detailList.yeepayNo}}</td>
                </tr>
                 <tr>
                   
                    <td class="bgf5">是否会员预定</td>
                    <td>{{detailList.member}}</td>
                     <td class="bgf5">订单类型</td>
                    <td>{{detailList.orderType}}</td>
                    <td class="bgf5">预订人手机号</td>
                    <td>{{detailList.reservationsMobile}}</td>
                       <td  class="bgf5" >所在城市</td>
                    <td >{{detailList.currentCity}}</td>
                </tr>
                 <tr>
                    
                    <td class="bgf5">预订人手机号归属地</td>
                    <td>{{detailList.reservationsMobileAddress}}</td>
                     <td class="bgf5">目的地</td>
                    <td>{{detailList.destination}}</td>
                     <td class="bgf5">持卡人手机号</td>
                    <td>{{detailList.cardHolderMobile}}</td>
                    <td class="bgf5">持卡人手机号归属地</td>
                    <td>{{detailList.cardholderMobileAddress}}</td>
                </tr>
                 <tr>
                    
                    <td class="bgf5">手机设备信息</td>
                    <td>{{detailList.mobileMessage}}</td>
                     <td class="bgf5">支付结果</td>
                    <td>{{detailList.status}}</td>
                     <td class="bgf5">起飞时间</td>
                    <td>{{detailList.takeoffTime}}</td>
                    <td class="bgf5">到达时间</td>
                    <td>{{detailList.arrivalTime}}</td>
                </tr>
                <tr>
                    
                    <td class="bgf5">航班号</td>
                    <td>{{detailList.fiightNo}}</td>
                     <td class="bgf5">联系人姓名</td>
                    <td>{{detailList.contactName}}</td>
                     <td class="bgf5">联系人邮件</td>
                    <td>{{detailList.contactMail}}</td>
                     <td class="bgf5">商户自然属性一级</td>
                    <td>{{detailList.naturalPropertyOne}}</td>
                </tr>
                 <tr>
                   
                    <td class="bgf5" style="border-bottom:1px solid #ccc;">商户自然属性二级</td>
                    <td>{{detailList.naturalPropertyTwo}}</td>
                     <td class="bgf5" style="border-bottom:1px solid #ccc;">报错原因</td>
                    <td>{{detailList.intercepetReason}}</td>
                     <td class="bgf5" style="border-bottom:1px solid #ccc;">风控拦截原因</td>
                    <td colspan="3">{{detailList.errorReason}}</td>
                   
                </tr>
        </table>
    </div>
</template>
<script>
import qs from 'qs';
export default {
    name:"Epos交易查询详情",
    data(){
        return{
            detailList:[]
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
        //     "mac":"Mozilla/5.0 (Linux; Android 7.1.2; vivo X9i Build/N2G47H; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/55.0.2883.91 Mobile Safari/537.36",
        //     "sex":"sex",
        //     "zodiac":"zodiac",
        //     "terminal":"terminal",
        //     "cardUpdateTime":"cardUpdateTime",
        //     "naturalPropertyOne":"naturalPropertyOne",
        //     "naturalPropertyTwo":"naturalPropertyTwo",
        //     "errorReason":"errorReason",
        //     "intercepeReason":"intercepeReason",
        //     "transparentTransmission":{"sfsdf ":"电商","sfsdsdfsdfdsffdsff ":"电商","sfffffsdf ":"电商","sfsdwrwertretertereref ":"电商","piouuygfhdssdsdsds ":"电商","qweweweevewrwwee ":"电商","sfsddfrddssdryreegjjjjjf ":"电商","sfsddfrddssdsdfsdsdryreegjjjjjf ":"电商","sfsddfrddyutytytyyssdryreegjjjjjf ":"电商","sfsddfrddssdryreegjjjjjf ":"电商"}
        // } 
        // this.detailList = getlist
        var id = this.$route.params.id
        this.$axios.post("/usEpos/detail",qs.stringify({
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
    }
}
</script>
<style scoped lang="less">
 table{border-right:1px solid #ccc;font-size:12px;border-bottom: 1px solid #ccc;}
td{border:solid #ccc; border-width:1px 0px 0px 1px;height: 50px;}
.bgf5{background: #f5f5f5;text-align: center;}  
</style>
