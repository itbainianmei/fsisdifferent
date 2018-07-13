<!--Epos交易查询-->
<template>
    <div>
        <div class="searchBasic">
            <div class="title" >
                <i class="el-icon-arrow-down toggleIcon" @click="serchToggle = !serchToggle"></i>
                <span>基础查询</span>
            </div>
            <el-collapse-transition>

                <div class="searchContentgray" id="searchContentgray" v-show="serchToggle">
                    <div class="leftContent" >
                        <el-form ref="form" :model="form" label-width="100px" :rules="rules" class="demo-ruleForm">
                            <div class="formConClass">
                                <el-form-item label="交易开始时间:" prop="startTime">
                                    <el-date-picker  v-model="form.startTime" type="datetime" placeholder="选择日期时间" style="width: 90%;max-width:225px;"></el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="交易结束时间:" prop="endTime">
                                    <el-date-picker  v-model="form.endTime" type="datetime" placeholder="选择日期时间" style="width: 90%;max-width:225px;"></el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="交易状态:" prop="status">
                                    <el-select v-model="form.status" placeholder="请选择" style="width: 90%;max-width:225px;">
                                        <el-option label="全部" value="all"></el-option>
                                        <el-option label="成功" value="success"></el-option>
                                        <el-option label="失败" value="fail"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="商户编号:" prop="number">
                                    <el-input v-model="form.number" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="商户订单号:" prop="orderNo">
                                    <el-input v-model="form.orderNo" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="手机号:" prop="mobile">
                                    <el-input v-model="form.mobile" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="银行卡号:" prop="cardNo">
                                    <el-input v-model="form.cardNo" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="身份证号:" prop="IDNo">
                                    <el-input v-model="form.IDNo" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="终端号:" prop="terminal">
                                    <el-input v-model="form.terminal" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                             
                        </el-form>
                    </div>
                    <div class="rightContent">
                        <el-button type="primary" class="serchbtn" icon="el-icon-search" @click='listQuery("/riskgod/union/epos/getAll","epos")'>查询</el-button>
                        <el-button type="primary" class="serchbtn" icon="el-icon-refresh" @click='reset("epos")'>重置</el-button>
                    </div>
                </div>
            </el-collapse-transition>
        </div>
         
        <div class="tableData">
            <div class="tr mr20">
                <el-button type="primary" @click="blackListTip(true)">加入黑名单</el-button>
                <el-button type="primary" @click="blackListTip(false)">删除黑名单</el-button>
                <el-button type="primary" @click="highRiskList(true)">标记为高危交易</el-button>
                <el-button type="primary" @click="downloadList">下载</el-button>
            </div>
            <div class="mt30">
                <el-table
                    @selection-change="selectedItems"
                    @row-dblclick="gotoDetail"
                    :data="lsstTable"
                    border
                    style="width: 100%"
                    v-if="lsstShow"
                    >
                    <el-table-column
                        type="selection"
                        width="50">
                    </el-table-column>
                    <el-table-column
                        prop="No"
                        label="商户编号"
                        width="150">
                    </el-table-column>
                    <!-- <el-table-column
                        prop="name"
                        label="商户名称"
                        width="150">
                    </el-table-column> -->
                    <el-table-column
                        prop="orderNo"
                        label="商户订单号"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="yeepayNo"
                        label="易宝交易流水号"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="time"
                        label="清算时间"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="money"
                        label="订单金额(元)"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="status"
                        label="交易状态"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="channel"
                        label="通道编码"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="bankName"
                        label="银行名称"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="cardNo"
                        label="银行卡号"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="saleName"
                        label="销售姓名"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="cardHolderName"
                        label="持卡人姓名"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="cardHolderMobile"
                        label="持卡人手机号"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="cardHolderId"
                        label="持卡人身份证号"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="reservationsMobile"
                        label="预定人手机号"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="passengerMobile"
                        label="乘机人手机号"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="passengerId"
                        label="乘机人证件号"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="contactMobile"
                        label="联系人手机号"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="hasSendCode"
                        label="是否下发验证码"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="terminal"
                        label="终端号"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="faileReason"
                        label="交易失败原因"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="isCardholderPassenger"
                        label="持卡人是否为乘机人之一"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="member"
                        label="是否会员预定"
                        width="150">
                    </el-table-column>
                </el-table>
            </div>
             
            <div class="block">
                <div class='pagination'>
                    <span>每页显示</span> 
                     <el-select @change="handleSizeChange" v-model="currenteveryno" style="width: 25%;">
                        <el-option label="10" value="10"></el-option>
                        <el-option label="20" value="20"></el-option>
                        <el-option label="30" value="30"></el-option>
                        <el-option label="40" value="40"></el-option>
                    </el-select>
                </div>
                <div class='paginationRight'>
                   <el-pagination
                    layout="prev, pager, next"
                    :page-sizes="[10,20,30,40,50]"
                    :page-size="10"
                    :total="length"
                    @current-change="handleCurrentChange">
                   </el-pagination>
                   
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import qs from 'qs'
// {
//             "id":"222",
//             "No":"222",//商户编号
//             "name":"商户名称",//商户名称
//             "orderNo":"orderNo",
//             "yeepayNo":"yeepayNo",
//             "time":"time",
//             "money":"money",
//             "status":"交易状态",
//             "channel":"通道编码",
//             "bankName":"中国银行",
//             "cardNo":"622848059****843811",
//             "saleName":"saleName",
//             "cardHolderName":"二月红",
//             "cardHolderMobile":"cardHolderMobile",
//             "cardHolderId":"cardHolderId",
//             "reservationsMobile":"reservationsMobile",
//             "passengerMobile":"passengerMobile",
//             "passengerId":"passengerId",
//             "contactMobile":"contactMobile",
//             "hasSendCode":"hasSendCode",
//             "terminal":"terminal",
//             "faileReason":"faileReason",
//             "isCardholderPassenger":"isCardholderPassenger",
//             "member":"member"
//         }
export default {
  data(){
    return{
       currenteveryno:"10",
       serchToggle:true,
       lsstShow:true,
       lsstTable:[],
        form:{
            startTime:'',
            endTime:'',
            status:'all',
            number:'',//商户编号
            orderNo:'',//商户订单号
            mobile:'',//手机号
            cardNo:'',//银行卡号
            IDNo:'',//身份证号
            terminal:''//终端号
        },
        idList:[],//表格中选中的行idlist
        rules: {
        },
        currentPage:1,// 分页
        pageNumber:1,
        pageRow:20,
        length:0
      }
  },
  methods:{
    handleSizeChange() {  //更改页数
        this.pageRow = this.currenteveryno
        this.listQuery("/riskgod/union/epos/getAll","epos")
    },
    handleCurrentChange(val) {  //处理当前页
         this.pageNumber = `${val}`  //当前页
         this.listQuery("/riskgod/union/epos/getAll","epos")
    },
   
    blackList(value){  //是否加入黑名单
        var self = this
        if(self.idList.length < 1){
            this.atleastOne()
            return false
        }
        this.$axios.post("/riskgod/union/epos/blackList",qs.stringify({
            status:value,
            id:self.idList  //选中的行的id列表
        })).then(res => {
            var response = res.data
            var text =''
            if(value){
                text = '加入黑名单成功'
            }else {
                 text = '删除黑名单成功'
            }
            if(response.code == '200'){
               ///// 干哈？？？
               self.successTip(text)
            }else{
                this.$message.error({message:response.msg,center: true});
            }
        }) 
    },
    highRiskList(value) {  //是否标记为高危交易
        var self = this
        if(self.idList.length < 1){
            this.atleastOne()
            return false
        }
        this.$axios.post("/riskgod/union/epos/highRisk",qs.stringify({
            status:value,
            id:self.idList  //选中的行的id列表
        })).then(res => {
            var response = res.data
            if(response.code == '200'){
                if(response.data.status){
                    self.highRiskListTip('标记成功！')  
                }else{
                    self.highRiskListTip('订单号已标记')
                }
            }else{
                this.$message.error({message:response.msg,center: true});
            }
        })
    },
    downloadList() {//是否下载
        var self = this
        if(self.idList.length < 1){
            this.atleastOne()
            return false
        }
        this.$axios.post("/riskgod/union/epos/download",qs.stringify({
            id:self.idList  //选中的行的id列表
        })).then(res => {
            var response = res.data
            if(response.code == '200'){
               ///// 干哈？？？
            }else{
                this.$message.error({message:response.msg,center: true});
            }
        })
    },
    gotoDetail(row){ //进入详情页
         this.$router.push({path:'./EposQueryDetail/'+row.id})
    }
  },
  created(){
    // this.form.startTime = this.getdiffTime(-7) + " 00:"+"00:"+"00"
    // this.form.endTime = this.getdiffTime(0) + " 00:"+"00:"+"00"
    //加载页面数据
    this.$axios.get("/riskgod/union/epos/getParam").then(res => {
        var response = res.data
        if(response.code == '200'){
            this.form.startTime = response.data.startTime
            this.form.endTime = response.data.endTime
        }else{
            this.$message.error({message:response.msg,center: true});
        }
    }) 
  }
}
</script>
<style scoped lang="less">
.tableData{
    width: 100%;
    height: auto;
}
.title{
    height: 50px;
    line-height: 50px;
    padding-left: 27px;
    font-size: 14px;
    color: #333333;
    box-shadow: 0 1px 4px 1px rgba(0,0,0,0.09);
}
.searchContentgray,.seniorSearchContent{
    height: auto;
    /* line-height: 76px; */
    padding-left: 3%;
    padding-top: 20px;
    padding-bottom: 20px;
    -webkit-transition: all 1s;
    transition: all 1s;
}
.leftContent{
    width: 80%;
    height: auto;
    display: inline-block;
}

.formConClass{
    display: inline-block;
    width: 32%;
}
 
  

</style>
