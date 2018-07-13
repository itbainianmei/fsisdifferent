<!--非Epos交易查询-->
<template>
    <div id="offline"  @click="allarea($event)" style="height:84vh;">
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
                                    <el-date-picker  v-model="form.startTime" value-format="yyyy-MM-dd HH:mm:ss"
                                  type="datetime" placeholder="选择日期时间" style="width: 100%;"></el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="结束时间:" prop="endTime" label-width="116px">
                                    <el-date-picker  v-model="form.endTime"  value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期时间" style="width: 100%;"></el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="易宝交易流水号:" prop="yeepayNo" label-width="126px">
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
                                <el-form-item label="商户编号:" prop="number" label-width="126px">
                                    <el-input v-model="form.number" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                             <div class="formConClass">
                                <el-form-item label="交易类型:" prop="type">
                                    <el-select v-model="form.type" placeholder="请选择" style="width: 90%;max-width:225px;">
                                     <el-option label="全部" value="all"></el-option>
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
                                        <el-option label="成功" value="success"></el-option>
                                        <el-option label="失败" value="fail"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="商户订单号:" prop="orderNo" label-width="126px">
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
                        <el-button type="primary" v-show="authsearch" class="serchbtn" icon="el-icon-search" @click='listQuery("/usOffline/getAll","offlinetransaction")'>查询</el-button>
                        <el-button type="primary" class="serchbtn" v-show="authreset"  icon="el-icon-refresh" @click='reset("offlinetransaction")'>重置</el-button>
                    </div>
                </div>
            </el-collapse-transition>
        </div>
        
        <div class="tableData">
            <div class="contentBotoom clear">
                <div class="button fl">
                    <div class="leftButton clear ">
                        <div class="BotoomBtn leftRadius" v-show="authfund1" title="交易资金暂缓" @click="postponeListTip('FREEZE','交易资金暂缓','/postpone/opreateFund')">
                            <div class="jyzjzh"></div>
                        </div>
                        <div class="BotoomBtn" v-show="authfund2" title="交易资金解缓" @click="postponeListTip('UNFREEZE','交易资金解缓','/postpone/opreateFund')">
                            <div class="jyzjjh"></div>
                        </div>
                        <div class="BotoomBtn" v-show="authaccount1" title="商户资金暂缓" @click="postponeListTip('FREEZE','商户资金暂缓','/postpone/opreateAccount')">
                            <div class="shzjzh"></div>
                        </div>
                        <div class="BotoomBtn" v-show="authaccount2" title="商户资金解缓" @click="postponeListTip('UNFREEZE','商户资金解缓','/postpone/opreateAccount')">
                            <div class="shzjjh"></div>
                        </div>
                        <div class="BotoomBtn" v-show="authblack" title="一键加黑" @click="blackList">
                            <div class="jrhmd"></div>
                        </div>
                        <div class="BotoomBtn rightRadius" v-show="authdownload" title="下载" @click="downloadList">
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
                    v-if="tableDataSec.contractName[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="contractName"
                        label="商户签约名称"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec.No[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="No"
                        label="商户编号"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec.terminalId[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="terminalId"
                        label="POS终端号"
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
                    v-if="tableDataSec.cardType[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="cardType"
                        label="银行卡类型"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec.cardNo[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="cardNo"
                        label="银行卡号"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec.bankName[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="bankName"
                        label="银行名称"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec.money[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="money"
                        label="交易金额(元)"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec.type[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="type"
                        label="交易类型"
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
                    v-if="tableDataSec.bankResponse[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="bankResponse"
                        label="银行响应码"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec.UnionPayMCC[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="UnionPayMCC"
                        label="银联MCC"
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
                    v-if="tableDataSec.agentNo[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="agentNo"
                        label="代理商编号"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec.agentName[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="agentName"
                        label="代理商名称"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec.sale[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="sale"
                        label="销售"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec.subCompany[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="subCompany"
                        label="分公司"
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
  data(){
      return{
        authsearch:true,
        authreset:true,
        authfund1:true,
        authfund2:true,
        authaccount1:true,
        authaccount2:true,
        authblack:true,
        authdownload:true,
        items:[],//选中的item
          currenteveryno:20,
          serchToggle:true,
          lsstShow:true,
          lsstTable:[],
          tableDataSec:{  //控制列显示  key和table prop一致
              yeepayNo:[true,'易宝交易流水号'],
              orderNo:[true,'商户订单号'],
              contractName:[true,'商户签约名称'],
              No:[true,'商户编号'],
              terminalId:[true,'POS终端号'],
              time:[true,'交易时间'],
              cardType:[true,'银行卡类型'],
              cardNo:[true,'银行卡号'],
              bankName:[true,'银行名称'],
              money:[true,'交易金额(元)'],
              type:[true,'交易类型'],
              status:[true,'交易状态'],
              bankResponse:[true,'银行响应码'],
              UnionPayMCC:[true,'银联MCC'],
              product:[true,'产品'],
              agentNo:[true,'代理商编号'],
              agentName:[true,'代理商名称'],
              sale:[true,'销售'],
              subCompany:[true,'分公司']
            },
          form:{
            startTime:'',
            endTime:'',
            yeepayNo:'',  //易宝流水帐号
            terminal:'',//pos终端号
            cardNo:'',//银行卡号
            number:'',//商户编号
            type:'all',//交易类型
            status:'all',//交易状态
            orderNo:'', //商户订单号
            cardType:'all',//银行卡类型
            bankCode:''//银行响应码
          },
          idList:[],//选中的产品id列表
          cardParam:'',//选中的产品银行卡号
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
    queryAuthList(){  //权限管理
        var arr = localStorage.getItem('ARRLEVEL')?localStorage.getItem('ARRLEVEL'):[]
        arr.map(function(ele){
            switch(ele){
                case 161:
                    this.authsearch= true
                break;
                case 162:
                    this.authreset= true
                break;
                case 163:
                    this.authfund1= true
                break;
                case 164:
                    this.authfund2= true
                break;
                case 165:
                    this.authaccount1= true
                break;
                case 166:
                    this.authaccount2= true
                break;
                case 167:
                    this.authblack= true
                break;
                case 168:
                    this.authdownload= true
                break;
            }
        })
    },
    handleSizeChange() {  //更改页数
        var params = this.form
        var validateObj = {
            "yeepayNo":params.yeepayNo,
            "terminal":params.terminal,
            "cardNo":params.cardNo,
            "number":params.number,
            "orderNo":params.orderNo
        }
         var result = this.oneofmust(validateObj)  //校验结果
        if(!result){
            this.$alert('易宝交易流水号、pos终端号、银行卡号、商户编号、商户订单号必填其中之一', '筛选项必填', {
               confirmButtonText: '确定'
            });
            return false
        }
        this.pageRow = this.currenteveryno
        this.listQuery("/usOffline/getAll","offlinetransaction",true)
    },
    handleCurrentChange(val) {  //处理当前页
         this.pageNumber = `${val}`  //当前页
         this.listQuery("/usOffline/getAll","offlinetransaction",true)
    },
    downloadList() {//是否下载
        var self = this
        if(self.idList.length < 1){
            var params = this.processParams('offlinetransaction')//入参;
        }else{
            var params = this.processParams('offlinetransaction')//入参
            params.yeepayNoList = self.idList
        }
        if(!params){
            return false
        }
         var newp = this.addSessionId(params)
        this.$axios.post("/usOffline/checkNum",qs.stringify(newp)).then(res => {
            var response = res.data
            if(response.code == '200'){
                    window.location = self.url+"/usOffline/download?" + qs.stringify(params)
            }else{
                this.$message.error({message:response.msg,center: true});
            }
        })
        // window.location = this.url+"/usOffline/download?" + qs.stringify(params)
    },
    postponeList(value,url) { //交易资金暂缓 和商户资金暂缓弹框
        var self = this
        this.$nextTick(function(){
            var content = document.querySelector("#textarea").value
            this.$axios.post(url,qs.stringify({
                remark:content,
                isFreeze:value,
                sessionId:localStorage.getItem('SID') ? localStorage.getItem('SID'):'',
                id:self.idList  //选中的行的id列表
            })).then(res => {
                var response = res.data
                if(response.code != '200'){
                    this.$message.error({message:response.msg,center: true});
                }else{
                    this.successTip(response.msg)
                }
            })
            document.querySelector("#textarea").value = ''
        })
        
    },
    blackList(){  //是否加入黑名单
        var self = this
        if(self.idList.length < 1){
            this.onlyOne()
            return false
        }
        this.$axios.post("/NameListController/batchSaveName",qs.stringify({
            'sessionId':localStorage.getItem('SID') ? localStorage.getItem('SID'):'',
            'source':'753',
            'type':'black',
            'bizLine':'offline',
            'comments':'',
            'buttonType':'off_trade_black',
            'data':self.paramCheck('offline'),
            'loginPerson':localStorage.getItem('testName') ? localStorage.getItem('testName'):''
        })).then(res => {
            var response = res.data
            if(response.code == '1'){
               if(response.message.indexOf('成功')>-1){
                    self.successTip(response.message)
               }else{
                    this.manyBlackFailtip(response.message)
               }
            }else{
                this.$message.error({message:response.message,center: true});
            }
        }) 
    } 
  },
  mounted(){
    //加载页面数据
    this.form.startTime = this.getdiffTime(-7) +" 00:"+"00:"+"00"
    this.form.endTime = this.getdiffTime(0) +" 23:"+"59:"+"59"
    this.getTransitionType()
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
