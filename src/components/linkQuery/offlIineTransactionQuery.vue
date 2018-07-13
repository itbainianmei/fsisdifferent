<!--非Epos交易查询-->
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
                        <el-form ref="form" :model="form" label-width="115px" :rules="rules" class="demo-ruleForm">
                            <div class="formConClass">
                                <el-form-item label="开始时间:" prop="startTime">
                                    <el-date-picker  v-model="form.startTime" type="datetime" placeholder="选择日期时间" style="width: 90%;max-width:220px;"></el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="结束时间:" prop="endTime">
                                    <el-date-picker  v-model="form.endTime" type="datetime" placeholder="选择日期时间" style="width: 90%;max-width:220px;"></el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="易宝交易流水号:" prop="yeepayNo">
                                     <el-input v-model="form.yeepayNo" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="POS终端号:" prop="terminal">
                                     <el-input v-model="form.terminal" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                             <div class="formConClass">
                                <el-form-item label="银行卡号:" prop="cardNo">
                                    <el-input v-model="form.cardNo" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="商户编号:" prop="number">
                                    <el-input v-model="form.number" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                             <div class="formConClass">
                                <el-form-item label="交易类型:" prop="type">
                                    <el-select v-model="form.type" placeholder="请选择" style="width: 90%;max-width:225px;">
                                         <el-option
                                                v-for="item in transactionTypetArray"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                            </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                             <div class="formConClass">
                                <el-form-item label="交易状态:" prop="status">
                                    <el-select v-model="form.status" placeholder="请选择" style="width: 90%;max-width:225px;">
                                        <el-option label="全部" value="all"></el-option>
                                        <el-option label="成功" value="1"></el-option>
                                        <el-option label="失败" value="0"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="商户订单号:" prop="orderNo">
                                    <el-input v-model="form.orderNo" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="银行卡类型:" prop="cardType">
                                    <el-select v-model='form.cardType' placeholder="请选择" style="width: 90%;max-width:225px;">
                                        <el-option label="全部" value="all"></el-option>
                                        <el-option label="信用卡" value="creditCard"></el-option>
                                        <el-option label="借记卡" value="debitCard"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="银行响应码:" prop="bankCode">
                                    <el-input v-model="form.bankCode" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                        </el-form>
                    </div>
                   <div class="rightContent">
                        <el-button type="primary" class="serchbtn" icon="el-icon-search" @click='listQuery("/riskgod/union/underLine/getAll","offlinetransaction")'>查询</el-button>
                        <el-button type="primary" class="serchbtn" icon="el-icon-refresh" @click='reset("offlinetransaction")'>重置</el-button>
                    </div>
                </div>
            </el-collapse-transition>
        </div>
        
        <div class="tableData">
            <div class="clear">
                <span class="fl ml20">
                    <el-button type="primary" @click="postponeListTip(true,'交易资金暂缓','/riskgod/union/underLine/postpone')">交易资金暂缓</el-button>
                    <el-button type="primary" @click="postponeListTip(false,'交易资金解缓','/riskgod/union/underLine/postpone')">交易资金解缓</el-button>
                    <el-button type="primary" @click="postponeListTip(true,'商户资金暂缓','/riskgod/union/underLine/merchantPostpone')">商户资金暂缓</el-button>
                    <el-button type="primary" @click="postponeListTip(false,'商户资金解缓','/riskgod/union/underLine/merchantPostpone')">商户资金解缓</el-button>
                </span>
                <span class="fr mr20">
                    <el-button type="primary" @click="blackListTip(true)">一键加黑</el-button>
                    <el-button type="primary" @click="downloadList">下载</el-button>
                </span>
            </div>
            <div class="mt30">
                <el-table
                    @selection-change="selectedItems"
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
                        prop="yeepayNo"
                        label="易宝交易流水号"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="orderNo"
                        label="商户订单号"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="contractName"
                        label="商户签约名称"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="No"
                        label="商户编号"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="terminalId"
                        label="POS终端号"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="time"
                        label="交易时间"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="cardType"
                        label="银行卡类型"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="cardNo"
                        label="银行卡号"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="bankName"
                        label="银行名称"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="money"
                        label="交易金额(元)"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="type"
                        label="交易类型"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="status"
                        label="交易状态"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="bankResponse"
                        label="银行返回码"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="UnionPayMCC"
                        label="银联MCC"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="product"
                        label="产品"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="agentNo"
                        label="代理商编号"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="agentName"
                        label="代理商名称"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="sale"
                        label="销售"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="subCompany"
                        label="分公司"
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
import qs from 'qs';
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
            yeepayNo:'',  //易宝流水帐号
            terminal:'',//pos终端号
            cardNo:'',//银行卡号
            number:'',//商户编号
            type:'',//交易类型
            status:'all',//交易状态
            orderNo:'', //商户订单号
            cardType:'all',//银行卡类型
            bankCode:''//银行响应码
          },
          idList:[],//选中的产品id列表
          transactionTypetArray:[],//线下交易类型
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
        this.listQuery("/riskgod/union/underLine/getAll","offlinetransaction")
    },
    handleCurrentChange(val) {  //处理当前页
         this.pageNumber = `${val}`  //当前页
         this.listQuery("/riskgod/union/underLine/getAll","offlinetransaction")
    },
    downloadList() {//是否下载
        var self = this
        if(self.idList.length < 1){
            return false
        }
        this.$axios.post("/riskgod/union/underLine/download",qs.stringify({
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
    postponeList(value,url) { //交易资金暂缓 和商户资金暂缓弹框
        var self = this
        if(self.idList.length < 1){
            return false
        }
        this.$nextTick(function(){
            var content = document.querySelector("#textarea").value
            this.$axios.post(url,{
                description:content,
                status:value,
                id:self.idList  //选中的行的id列表
            }).then(res => {
                var response = res.data
                if(response.code == '200'){
                }else{
                    this.$message.error({message:response.msg,center: true});
                }
            })
            document.querySelector("#textarea").value = ''
        })
        
    },
    blackList(value){  //是否加入黑名单
        var self = this
        if(self.idList.length < 1){
            return false
        }
        this.$axios.post("/riskgod/union/underLine/blackList",qs.stringify({
            status:value,
            id:self.idList  //选中的行的id列表
        })).then(res => {
            var response = res.data
            if(response.code == '200'){
               ///// 干哈？？？
            }else{
                this.$message.error({message:response.msg,center: true});
            }
        }) 
    } 
  },
  created(){
    //加载页面数据
    this.$axios.get("/riskgod/union/underLine/getParam").then(res => {
        var response = res.data
        if(response.code == '200'){
            this.form.startTime = response.data.startTime
            this.form.endTime = response.data.endTime
            this.transactionTypetArray = response.data.type
        }else{
            this.$message.error({message:response.msg,center: true});
        }
    }) 
  }
}
</script>
<style scoped>
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
