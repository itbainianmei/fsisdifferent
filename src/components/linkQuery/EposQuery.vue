<!--Epos交易查询-->
<template>
    <div id="epos" @click="allarea($event)">
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
                                <el-form-item label="交易开始时间:" prop="startTime">
                                    <el-date-picker  v-model="form.startTime" :picker-options="start" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"  
                                      placeholder="选择日期时间" style="width: 100%;"></el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="交易结束时间:" prop="endTime">
                                    <el-date-picker  v-model="form.endTime" :picker-options="end" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"
                                   placeholder="选择日期时间" style="width: 100%;"></el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="交易状态:" prop="status">
                                    <el-select v-model="form.status" placeholder="请选择" style="width: 94%;max-width:225px;">
                                        <el-option label="全部" value="all"></el-option>
                                        <el-option label="成功" value="success"></el-option>
                                        <el-option label="失败" value="fail"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="商户编号:" prop="number">
                                    <el-input v-model="form.number" placeholder="请输入" style="width: 94%;max-width:225px;"></el-input>
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
                        <el-button type="primary" v-show="authsearch" class="serchbtn" icon="el-icon-search" @click='listQuery("/usEpos/getAll","epos",false)'>查询</el-button>
                        <el-button type="primary" v-show="authreset" class="serchbtn" icon="el-icon-refresh" @click='reset("epos")'>重置</el-button>
                    </div>
                </div>
            </el-collapse-transition>
        </div>
         
        <div class="tableData">
            <div class="contentBotoom clear">
                <div class="button fl">
                    <div class="leftButton clear ">
                        <div class="BotoomBtn leftRadius" v-show="authblack1" title="加入黑名单"  @click="blackListTip('/changeName/changeName',true,'epos')">
                            <div class="jrhmd"></div>
                        </div>
                        <div class="BotoomBtn" v-show="authblack2" title="删除黑名单" @click="blackListTip('/changeName/changeName',false,'epos')">
                            <div class="schmd"></div>
                        </div>
                        <div class="BotoomBtn" v-show="authhighrisk" title="标记为高危交易" @click="highRiskList(true)">
                            <div class="bjwgwjy"></div>
                        </div>
                        <div class="BotoomBtn rightRadius" v-show="authdownload" title="下载" @click="downloadList">
                            <div class="xz"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt30">
                <el-table
                    fixed 
                    max-height="600"
                    @selection-change="selectedItems"
                    @row-dblclick="gotoDetail"
                    @cell-mouse-enter="showsecret"
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
                        width="150"
                        v-if="tableDataSec.No[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                    >
                    </el-table-column>
                    <el-table-column
                     v-if="tableDataSec.name[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="name"
                        label="商户名称"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec.orderNo[0]"
                        prop="orderNo"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        label="商户订单号"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec.yeepayNo[0]"
                        prop="yeepayNo"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        label="易宝交易流水号"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec.time[0]"
                        prop="time"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        label="清算时间"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec.money[0]"
                        prop="money"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        label="订单金额(元)"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec.status[0]"
                        prop="status"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        label="交易状态"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec.channel[0]"
                        prop="channel"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        label="通道编码"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec.bankName[0]"
                        prop="bankName"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        label="银行名称"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec.cardNo[0]"
                        sortable
                        :render-header="companyRenderHeader"
                        label="银行卡号"
                        width="150">
                         <template slot-scope="scope" class="pr">
                            {{scope.row.cardNo}}
                            <div  class="secret pa none" style="right:-132px;">{{scope.row.cardNoSI}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec.saleName[0]"
                        prop="saleName"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        label="销售姓名"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec.cardHolderName[0]"
                        prop="cardHolderName"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        label="持卡人姓名"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        v-if="tableDataSec.cardHolderMobile[0]"
                        sortable
                        :render-header="companyRenderHeader"
                        label="持卡人手机号"
                        width="150">
                         <template slot-scope="scope" class="pr">
                            {{scope.row.cardHolderMobile}}
                            <div  class="secret pa none" style="right:-110px;">{{scope.row.cardHolderMobileSI}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec.cardHolderId[0]"
                        label="持卡人身份证号"
                        width="150">
                        <template slot-scope="scope" class="pr">
                            {{scope.row.cardHolderId}}
                            <div  class="secret pa none" style="right:-158px;">{{scope.row.cardHolderIdSI}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec.reservationsMobile[0]"
                        sortable
                        :render-header="companyRenderHeader"
                        label="预定人手机号"
                        width="150">
                        <template slot-scope="scope" class="pr">
                            {{scope.row.reservationsMobile}}
                            <div  class="secret pa none" style="right:-110px;">{{scope.row.reservationsMobileSI}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec.passengerMobile[0]"
                        sortable
                        :render-header="companyRenderHeader"
                        label="乘机人手机号"
                        width="150">
                        <template slot-scope="scope" class="pr">
                            {{scope.row.passengerMobile}}
                            <div  class="secret pa none" style="right:-110px;">{{scope.row.passengerMobileSI}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec.passengerId[0]"
                        sortable
                        :render-header="companyRenderHeader"
                        label="乘机人证件号"
                        width="150">
                        <template slot-scope="scope" class="pr">
                            {{scope.row.passengerId}}
                            <div  class="secret pa none" style="right:-158px;">{{scope.row.passengerIdSI}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        v-if="tableDataSec.contactMobile[0]"
                        sortable
                        :render-header="companyRenderHeader"
                        label="联系人手机号"
                        width="150">
                         <template slot-scope="scope" class="pr">
                            {{scope.row.contactMobile}}
                            <div  class="secret pa none" style="right:-110px;">{{scope.row.contactMobileSI}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec.hasSendCode[0]"
                        prop="hasSendCode"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        label="是否下发验证码"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec.terminal[0]"
                        prop="terminal"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        label="终端号"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec.intercepetReason[0]"
                        prop="intercepetReason"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        label="交易失败原因"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec.isCardholderPassenger[0]"
                        prop="isCardholderPassenger"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        label="持卡人是否为乘机人之一"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec.member[0]"
                        prop="member"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        label="是否会员预定"
                        width="150">
                    </el-table-column>
                </el-table>
            </div>
             
            <div class="block">
                <div class='paginationRight'>
                   <el-pagination
                    layout="total,prev, pager, next"
                    :page-sizes="[20]"
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
import TableSelect from '../tableSelect/tableSelect.vue'
import qs from 'qs'

export default {
  name:'Epos交易查询',
  data(){
    return{
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
        start: {
            disabledDate: (time) => {
                if (this.form.endTime != "") {
                    return time.getTime() > Date.now() || time.getTime() > this.form.endTime;
                } else {
                    return time.getTime() > Date.now();
                }

            }
        },
        end: {
            disabledDate: (time) => {
                return time.getTime() < this.form.startTime || time.getTime() > Date.now();
            }
        },
        authsearch:false,
        authreset:false,
        authblack1:false,
        authblack2:false,
        authhighrisk:false,
        authdownload:false,
        eposdetail:false,

        items:[],//选中的item
       currenteveryno:20,
       serchToggle:true,
       lsstShow:true,
       lsstTable:[],
       tableDataSec:{  //控制列显示  key和table prop一致
          No:[true,'商户编号'],
          name:[true,'商户名称'],
          orderNo:[true,'商户订单号'],
          yeepayNo:[true,'易宝交易流水号'],
          time:[true,'清算时间'],
          money:[true,'订单金额(元)'],
          status:[true,'交易状态'],
          channel:[true,'通道编码'],
          bankName:[true,'银行名称'],
          cardNo:[true,'银行卡号'],
          saleName:[true,'销售姓名'],
          cardHolderName:[true,'持卡人姓名'],
          cardHolderMobile:[true,'持卡人手机号'],
          cardHolderId:[true,'持卡人身份证号'],
          reservationsMobile:[true,'预定人手机号'],
          passengerMobile:[true,'乘机人手机号'],
          passengerId:[true,'乘机人证件号'],
          contactMobile:[true,'联系人手机号'],
          hasSendCode:[true,'是否下发验证码'],
          terminal:[true,'终端号'],
          intercepetReason:[true,'交易失败原因'],
          isCardholderPassenger:[true,'持卡人是否为乘机人之一'],
          member:[true,'是否会员预定']
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
   
    handleCurrentChange(val) {  //处理当前页
         this.pageNumber = `${val}`  //当前页
         this.listQuery("/usEpos/getAll","epos",true,val)
    },
    queryAuthList(){  //权限管理
           var self = this
        var arr = localStorage.getItem('ARRLEVEL')?localStorage.getItem('ARRLEVEL'):[]
        JSON.parse(arr).map(function(ele){
            switch(ele){
                case 155:
                    self.authsearch= true
                break;
                case 156:
                    self.authreset= true
                break;
                case 157:
                    self.authblack1= true
                break;
                case 158:
                    self.authblack2= true
                break;
                case 159:
                    self.authhighrisk= true
                break;
                case 160:
                    self.authdownload= true
                break;
                 case 268:
                    self.eposdetail= true
                break;
            }
        })
    },
    blackList(url,param,value){  //批 量加入黑名单
        var self = this
        if(self.idList.length < 1){
            this.atleastOne()
            return false
        }
        var params = this.addSessionId(param)
        this.$axios.post(url,qs.stringify(params)).then(res => {
            var response = res.data
            var text =''
            if(value){
                text = '加入黑名单成功'
            }else {
                 text = '删除黑名单成功'
            }
            if(response.code == '1'){
               if(response.message.indexOf('成功')>-1){
                    self.successTip(response.message)
               }else{
                    this.manyBlackFailtip(response.message)
               }
            }else{
                self.failTip(response.message)
            }
        }) 
    },
    highRiskList(value) {  //是否标记为高危交易
        var self = this
        if(self.idList.length < 1){
            this.atleastOne()
            return false
        }
        this.$axios.post("/usHighRisk/mark",qs.stringify({
            status:value,
            sessionId:localStorage.getItem('SID') ? localStorage.getItem('SID'):'',
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
                this.failTip(response.msg)
            }
        })
    },
    downloadList() {//是否下载
        var self = this
        if(self.idList.length < 1){
            var params = this.processParams('epos')//入参;
        }else{
            var params = this.processParams('epos')//入参
            params.yeepayNoList = self.idList
        }
        
        if(!params){
            return false
        }
        var newp = this.addSessionId(params)
        this.$axios.post("/usEpos/checkNum",qs.stringify(newp)).then(res => {
            var response = res.data
            if(response.code == '200'){
                    window.location = self.url+"/usEpos/download?" + qs.stringify(newp)
            }else{
                this.$message.error({message:response.msg,center: true});
            }
        })
    },
    gotoDetail(row){ //进入详情页
        if(this.eposdetail){
            window.open('#/EposQueryDetail/'+ row.yeepayNo)
        }
    }
  },
  created(){
    // 设置默认时间
    this.form.startTime = this.getdiffTime(-7) +" 00:"+"00:"+"00"
    this.form.endTime = this.getdiffTime(0) +" 23:"+"59:"+"59"
    this.getProduct()
    this.queryAuthList()
  },
  components:{
    TableSelect
  }
}
</script>
<style scoped lang="less">
.secret{
   background: rgba(0,0,0,0.8);
   color:white;
   border-radius: 3px;
   line-height: 28px;
   padding:0 8px;
   font-size: 14px;
   top:8px;z-index:10;
   &:before{
    content: '';
    display: inline-block;
    position: absolute;
    left:-10px;
    top:10px;
    width: 0;
    height: 0;
    border-top: 5px solid white;
    border-right: 10px solid rgba(0,0,0,0.8);
    border-bottom: 5px solid white;
   }
}
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
