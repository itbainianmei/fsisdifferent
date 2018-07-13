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
                                    <el-date-picker  v-model="form.startTime" outCardType="datetime" placeholder="选择日期时间" style="width: 90%;max-width:225px;"></el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="结束时间:" prop="endTime">
                                    <el-date-picker  v-model="form.endTime" outCardType="datetime" placeholder="选择日期时间" style="width: 90%;max-width:225px;"></el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="易宝交易流水号:" prop="yeepayNo">
                                     <el-input v-model="form.yeepayNo" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="出款订单号:" prop="orderNo">
                                    <el-input v-model="form.orderNo" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="产品:" prop="product">
                                    <el-select v-model="form.product" placeholder="请选择" style="width: 90%;max-width:225px;">
                                    <el-option label="全部" value="all"></el-option>
                                        <el-option
                                            v-for="item in productArray"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                             <div class="formConClass">
                                <el-form-item label="商户编号:" prop="merchantNo">
                                    <el-input v-model="form.merchantNo" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                           <div class="formConClass">
                                <el-form-item label="交易状态:" prop="sta·tus">
                                    <el-select v-model="form.status" placeholder="请选择" style="width: 90%;max-width:225px;">
                                        <el-option label="全部" value="all"></el-option>
                                        <el-option label="成功" value="success"></el-option>
                                        <el-option label="失败" value="fail"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="业务方:" prop="business">
                                    <el-select v-model="form.business" placeholder="请选择" style="width: 90%;max-width:225px;">
                                        <el-option label="全部" value="all"></el-option>
                                        <el-option
                                                v-for="item in ywftArray"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                            </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="收款账户号:" prop="receiveCardNo">
                                    <el-input v-model="form.receiveCardNo" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="出款批次号:" prop="outBatchNo">
                                    <el-input v-model="form.outBatchNo" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item> 
                            </div>  
                            
                             <div class="formConClass">
                                <el-form-item label="出款账户类型:" prop="outCardType">
                                    <el-select v-model="form.outCardType" placeholder="请选择" style="width: 90%;max-width:225px;">
                                        <el-option label="全部" value="all"></el-option>
                                        <el-option label="对公" value="toPublic"></el-option>
                                        <el-option label="对私" value="toPrivate"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                             
                        </el-form>
                    </div>
                   <div class="rightContent">
                        <el-button type="primary" class="serchbtn" icon="el-icon-search" @click='listQuery("/riskgod/union/outPay/getAll","outPay")'>查询</el-button>
                        <el-button type="primary" class="serchbtn" icon="el-icon-refresh" @click='reset("outPay")'>重置</el-button>
                    </div>
                </div>
            </el-collapse-transition>
        </div>
        
        <div class="tableData">
            <div class="tr mr10">
                <el-button type="primary" @click="downloadList">下载</el-button>
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
                        label="出款订单号"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="contractName"
                        label="商户签约名称"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="merchantNo"
                        label="商户编号"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="time"
                        label="交易时间"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="product"
                        label="产品"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="business"
                        label="业务方"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="status"
                        label="交易状态"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="outOrderType"
                        label="出款账户类型"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="settlementWay"
                        label="结算途径"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="SettlementProductType"
                        label="结算产品类型"
                        width="150">
                    </el-table-column>
             
                    <el-table-column
                        prop="bankName"
                        label="收款银行全称"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="cardName"
                        label="收款账户名称"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="cardNo"
                        label="收款账户号"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="money"
                        label="出款金额(元)"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="channel"
                        label="通道编码"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="isLargeAmountSplit"
                        label="是否大额拆单交易"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="moneyTotal"
                        label="出款总金额(元)"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="interceptReason"
                        label="风控拦截原因"
                        width="150">
                    </el-table-column> 
                    <el-table-column
                        prop="bankReturn"
                        label="银行返回"
                        width="150">
                    </el-table-column>  
                    <el-table-column
                        prop="batch"
                        label="出款批次号"
                        width="150">
                    </el-table-column> 
                    <el-table-column
                        prop="scene"
                        label="出款场景"
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
// {
//                 "id":"555",
//                 "yeepayNo":"yeepayNo",
//                 "orderNo":"出款订单号",
//                 "contractName":"contractName",
//                 "merchantNo":"merchantNo",
//                 "time":"time",
//                 "product":"product",
//                 "business":"business",
//                 "status":"交易状态",
//                 "outOrderType":"出款账户类型",
//                 "settlementWay":"结算途径",
//                 "SettlementProductType":"结算产品类型",
//                 "bankName":"bankName",
//                 "cardName":"cardName",
//                 "cardNo":"cardNo",
//                 "money":"money",
//                 "channel":"channel",
//                 "isLargeAmountSplit":"isLargeAmountSplit",
//                 "moneyTotal":"moneyTotal",
//                 "interceptReason":"interceptReason",
//                 "bankReturn":"bankReturn",
//                 "batch":"batch",
//                 "scene":"scene"
//             },{
//                 "id":"666",
//                 "yeepayNo":"yeepayNo",
//                 "orderNo":"出款订单号",
//                 "contractName":"contractName",
//                 "merchantNo":"merchantNo",
//                 "time":"time",
//                 "product":"product",
//                 "business":"business",
//                 "status":"交易状态",
//                 "outOrderType":"出款账户类型",
//                 "settlementWay":"结算途径",
//                 "SettlementProductType":"结算产品类型",
//                 "bankName":"bankName",
//                 "cardName":"cardName",
//                 "cardNo":"cardNo",
//                 "money":"money",
//                 "channel":"channel",
//                 "isLargeAmountSplit":"isLargeAmountSplit",
//                 "moneyTotal":"moneyTotal",
//                 "interceptReason":"interceptReason",
//                 "bankReturn":"bankReturn",
//                 "batch":"batch",
//                 "scene":"scene"
//             }
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
            orderNo:'',//出款订单号
            product:"all",//产品
            merchantNo:'',//商户编号
            status:"all",//交易状态
            business:"all",//业务方
            receiveCardNo:'',//收款账户号
            outBatchNo:'', //出款批次号
            outCardType:"all" //出款账户类型
          },
          productArray:[],//产品
          ywftArray:[],//业务方
          idList:[],//选中的产品id列表
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
            this.listQuery("/riskgod/union/outPay/getAll","outPay")
        },
        handleCurrentChange(val) {  //处理当前页
             this.pageNumber = `${val}`  //当前页
             this.listQuery("/riskgod/union/outPay/getAll","outPay")
        },
        downloadList() {//是否下载
            var self = this
            if(self.idList.length < 1){
                return false
            }
            this.$axios.post("/riskgod/union/outPay/download",qs.stringify({
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
  },
  created(){
    //加载页面数据
    this.$axios.get("/riskgod/union/outPay/getParam").then(res => {
        var response = res.data
        if(response.code == '200'){
            this.form.startTime = response.data.startTime
            this.form.endTime = response.data.endTime
            this.productArray = response.data.product
            this.ywftArray = response.data.businessParty
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
