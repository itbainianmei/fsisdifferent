<!--出款-->
<template>
    <div id="outmoney" @click="allarea($event)" style="height:84vh;">
        <div class="searchBasic">
            <div class="title" >
                <i class="el-icon-arrow-down toggleIcon" @click="serchToggle = !serchToggle"></i>
                <span>基础查询</span>
            </div>
            <el-collapse-transition>
                <div class="searchContentgray" id="searchContentgray" v-show="serchToggle">
                    <div class="leftContent" >
                        <el-form ref="form" :model="form" label-width="116px" :rules="rules" class="demo-ruleForm">
                            <div class="formConClass">
                                <el-form-item label="开始时间:" prop="startTime" label-width="116px">
                                    <el-date-picker  v-model="form.startTime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期时间" style="width: 100%;"></el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="结束时间:" prop="endTime" label-width="116px">
                                    <el-date-picker  v-model="form.endTime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期时间"style="width: 100%;"></el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="易宝交易流水号:" prop="yeepayNo" label-width="126px">
                                     <el-input v-model="form.yeepayNo" placeholder="请输入" style="width: 90%;"></el-input>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="出款订单号:" prop="remitNo">
                                    <el-input v-model="form.remitNo" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="产品:" prop="product">
                                    <el-select v-model="form.product" placeholder="请选择" style="width: 90%;max-width:225px;">
                                    <el-option label="全部" value="all"></el-option>
                                        <el-option
                                            v-for="item in oneProductSelect"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                             <div class="formConClass">
                                <el-form-item label="商户编号:" prop="merchantNo" label-width="126px">
                                    <el-input v-model="form.merchantNo" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                           <div class="formConClass">
                                <el-form-item label="交易状态:" prop="status" >
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
                                <el-form-item label="收款账户号:" prop="receiveCardNo" label-width="126px">
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
                             <div class="formConClass">
                                <el-form-item label="商户订单号:" prop="orderNo">
                                    <el-input v-model="form.orderNo" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item> 
                            </div>  
                        </el-form>
                    </div>
                   <div class="rightContent">
                        <el-button type="primary" v-show="authsearch" class="serchbtn" icon="el-icon-search" @click='listQuery("/usRemit/getAll","outPay")'>查询</el-button>
                        <el-button type="primary" v-show="authreset" class="serchbtn" icon="el-icon-refresh" @click='reset("outPay")'>重置</el-button>
                    </div>
                </div>
            </el-collapse-transition>
        </div>
        
        <div class="tableData">
            <!-- <div class="tr mr10">
                <el-button type="primary" @click="downloadList">下载</el-button>
            </div> -->
            <div class="contentBotoom clear">
                <div class="button fl">
                    <div class="leftButton clear ">
                        <div class="BotoomBtn leftRadius rightRadius" v-show="authdownload" title="下载" @click="downloadList">
                            <div class="xz"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <el-table
                    fixed 
                    max-height="600"
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
                     v-if="tableDataSec.yeepayNo[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="yeepayNo"
                        label="易宝交易流水号"
                        width="150">
                    </el-table-column>
                    <el-table-column
                     v-if="tableDataSec.orderNo[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="orderNo"
                        label="商户订单号"
                        width="150">
                    </el-table-column>
                    <el-table-column
                     v-if="tableDataSec.remitNo[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="remitNo"
                        label="出款订单号"
                        width="150">
                    </el-table-column>
                    <el-table-column
                     v-if="tableDataSec.contractName[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="contractName"
                        label="商户签约名称"
                        width="150">
                    </el-table-column>
                    <el-table-column
                     v-if="tableDataSec.merchantNo[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="merchantNo"
                        label="商户编号"
                        width="150">
                    </el-table-column>
                    <el-table-column
                     v-if="tableDataSec.time[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="time"
                        label="交易时间"
                        width="150">
                    </el-table-column>
                    <el-table-column
                     v-if="tableDataSec.product[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="product"
                        label="产品"
                        width="150">
                    </el-table-column>
                    <el-table-column
                     v-if="tableDataSec.business[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="business"
                        label="业务方"
                        width="150">
                    </el-table-column>
                    <el-table-column
                     v-if="tableDataSec.status[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="status"
                        label="交易状态"
                        width="150">
                    </el-table-column>
                    <el-table-column
                     v-if="tableDataSec.outOrderType[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="outOrderType"
                        label="出款账户类型"
                        width="150">
                    </el-table-column>
                    <el-table-column
                     v-if="tableDataSec.SettlementProductType[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="SettlementProductType"
                        label="结算产品类型"
                        width="150">
                    </el-table-column>
             
                    <el-table-column
                     v-if="tableDataSec.bankName[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="bankName"
                        label="收款银行全称"
                        width="150">
                    </el-table-column>
                    <el-table-column
                     v-if="tableDataSec.cardName[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="cardName"
                        label="收款账户名称"
                        width="150">
                    </el-table-column>
                    <el-table-column
                     v-if="tableDataSec.cardNo[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="cardNo"
                        label="收款账户号"
                        width="150">
                    </el-table-column>
                    <el-table-column
                     v-if="tableDataSec.money[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="money"
                        label="出款金额(元)"
                        width="150">
                    </el-table-column>
                   
                    <el-table-column
                     v-if="tableDataSec.isLargeAmountSplit[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="isLargeAmountSplit"
                        label="是否大额拆单交易"
                        width="150">
                    </el-table-column>
                    <el-table-column
                     v-if="tableDataSec.moneyTotal[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="moneyTotal"
                        label="出款总金额(元)"
                        width="150">
                    </el-table-column>
                   
                    <el-table-column
                     v-if="tableDataSec.batch[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="batch"
                        label="出款批次号"
                        width="150">
                    </el-table-column> 
                    <el-table-column
                     v-if="tableDataSec.scene[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="scene"
                        label="出款场景"
                        width="150">
                    </el-table-column> 
                </el-table>
            </div>
            
           <div class="block">
                <div class='pagination'>
                    <span>每页显示</span> 
                     <el-select @change="handleSizeChange" v-model="currenteveryno" style="width: 28%;">
                        <el-option label="10" value="10"></el-option>
                        <el-option label="20" value="20"></el-option>
                        <el-option label="30" value="30"></el-option>
                        <el-option label="40" value="40"></el-option>
                    </el-select>
                </div>
                <div class='paginationRight'>
                   <el-pagination
                    layout="total,prev, pager, next"
                    :page-sizes="[10,20,30,40]"
                    :page-size="Number(currenteveryno)"
                    :total=length
                    @current-change="handleCurrentChange">
                   </el-pagination>
                   
                </div>
            </div>
        </div>
        <!-- 表格每列的列选择 注意：每页都需要手动改变top值-->
        <div ref="list" class="list pa none bgccc" style="top:860px;">
          <TableSelect  :tableDataSec="tableDataSec" ></TableSelect>
        </div>
    </div>
</template>
<script>
import qs from 'qs';
import TableSelect from '../tableSelect/tableSelect.vue'
export default {
     name:'出款交易查询',
  data(){
      return{
        authsearch:false,
        authreset:false,
        authdownload:false,
        currenteveryno:20,
          serchToggle:true,
          lsstShow:true,
          lsstTable:[],
          tableDataSec:{  //控制列显示  key和table prop一致
              yeepayNo:[true,'易宝交易流水号'],
              orderNo:[true,'商户订单号'],
              remitNo:[true,'出款订单号'],
              contractName:[true,'商户签约名称'],
              merchantNo:[true,'商户编号'],
              time:[true,'交易时间'],
              product:[true,'产品'],
              business:[true,'业务方'],
              status:[true,'交易状态'],
              outOrderType:[true,'出款账户类型'],
              SettlementProductType:[true,'结算产品类型'],
              bankName:[true,'收款银行全称'],
              cardName:[true,'收款账户名称'],
              cardNo:[true,'收款账户号'],
              money:[true,'出款金额(元)'],
              isLargeAmountSplit:[true,'是否大额拆单交易'],
              moneyTotal:[true,'出款总金额(元)'],
              batch:[true,'出款批次号'],
              scene:[true,'出款场景']
            },
          form:{
            startTime:'',
            endTime:'',
            yeepayNo:'',  //易宝流水帐号
            remitNo:'',//出款订单号
            product:"all",//产品
            merchantNo:'',//商户编号
            status:"all",//交易状态
            business:"all",//业务方
            receiveCardNo:'',//收款账户号
            outBatchNo:'', //出款批次号
            orderNo:"", //商户订单号
            outCardType:"all" //出款账户类型
          },
          oneProductSelect:[],//产品
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
    queryAuthList(){  //权限管理
           var self = this
        var arr = localStorage.getItem('ARRLEVEL')?localStorage.getItem('ARRLEVEL'):[]
         JSON.parse(arr).map(function(ele){
            switch(ele){
                case 169:
                    self.authsearch= true
                break;
                case 170:
                    self.authreset= true
                break;
                case 171:
                    self.authdownload= true
                break;
            }
        })
    },
    handleSizeChange() {  //更改页数
        var params = this.form
        var validateObj = {
           "yeepayNo":params.yeepayNo,
            "orderNo":params.orderNo,
            "merchantNo":params.merchantNo,
            "receiveCardNo":params.receiveCardNo,
            "outBatchNo":params.outBatchNo
        }
         var result = this.oneofmust(validateObj)  //校验结果
        if(!result){
            this.$alert('易宝交易流水号、出款订单号、商户编号、收款账户号、出款批次号必填其中之一', '筛选项必填', {
              confirmButtonText: '确定'
            });
            return false
        }
        this.pageRow = this.currenteveryno
        this.listQuery("/usRemit/getAll","outPay",true)
    },
    handleCurrentChange(val) {  //处理当前页
         this.pageNumber = `${val}`  //当前页
         this.listQuery("/usRemit/getAll","outPay",true)
    },
    downloadList() {//是否下载
        var self = this
        if(self.idList.length < 1){
            var params = this.processParams('outPay')//入参;
        }else{
            var params = this.processParams('outPay')//入参
            params.yeepayNoList = self.idList
        }
        if(!params){
            return false
        }
        var newp = this.addSessionId(params)
        this.$axios.post("/usRemit/checkNum",qs.stringify(newp)).then(res => {
            var response = res.data
            if(response.code == '200'){
                    window.location = self.url+"/usRemit/download?" + qs.stringify(params)
            }else{
                this.$message.error({message:response.msg,center: true});
            }
        })
        // window.location = this.url+"/usRemit/download?" + qs.stringify(params)
    }
  },
  created(){
     this.queryAuthList()
  },
  mounted(){
    //加载页面数据
    this.form.startTime =this.getdiffTime(-7) +" 00:"+"00:"+"00"
    this.form.endTime =this.getdiffTime(0) +" 23:"+"59:"+"59"
    this.getProductsec('4')
    this.getyewufang()
  },
  components:{
    TableSelect
  }
}
</script>
<style scoped>
.tableData{
    width: 100%;
    height: auto;
}
.contentBotoom {
    height: 60px;
    font-size: 13px;
    margin-left: 45px;
}
.BotoomBtn {
    width: 44px;
    height: 30px;
    margin: 0;
    margin-left: -1px;
    border: 1px solid #38e139;
    float: left;
    cursor: pointer;
}
  .BotoomBtn:hover {
    background-color: #38e139;
  }
.leftRadius {
    border-top-left-radius: 7px;
    border-bottom-left-radius: 7px;
}
.rightRadius {
    border-top-right-radius: 7px;
    border-bottom-right-radius: 7px;
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
