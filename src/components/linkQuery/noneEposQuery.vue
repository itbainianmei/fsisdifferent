<!--非Epos交易查询-->
<template>
    <div id="noepos" @click="allarea($event)">
        <div>
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
                                       type="datetime"  placeholder="选择日期时间" style="width: 100%; "></el-date-picker>
                                    </el-form-item>
                                </div>
                                <div class="formConClass">
                                    <el-form-item label="结束时间:" prop="endTime" label-width="116px">
                                        <el-date-picker  v-model="form.endTime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期时间" style="width: 100%;"></el-date-picker>
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
                                    <el-form-item label="产品:" prop="product">

                                        <el-select v-model="form.product" placeholder="请选择" style="width: 90%;max-width:225px;">
                                             <el-option label="全部" value="all" ></el-option>
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
                                    <el-form-item label="手机号:" prop="mobile">
                                        <el-input v-model="form.mobile" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
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
                                    <el-form-item label="终端号:" prop="terminal">
                                        <el-input v-model="form.terminal" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
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
                                    <el-form-item label="用户id:" prop="userId">
                                        <el-input v-model="form.userId" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                    </el-form-item>
                                </div>
                                 <div class="formConClass">
                                    <el-form-item label="银行卡类型:" prop="cardType">
                                        <el-select v-model="form.cardType" placeholder="请选择" style="width: 90%;max-width:225px;">
                                            <el-option label="全部" value="all"></el-option>
                                            <el-option label="信用卡" value="creditCard"></el-option>
                                            <el-option label="借记卡" value="debitCard"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                                <div class="formConClass">
                                    <el-form-item label="通道编码:" prop="channel">
                                        <el-input v-model="form.channel" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                    </el-form-item>
                                </div>
                            </el-form>
                        </div>
                       <div class="rightContent">
                            <el-button type="primary" v-show="authsearch" class="serchbtn" icon="el-icon-search" @click='listQuery("/usNoEpos/getAll","noneEpos")'>查询</el-button>
                            <el-button type="primary" v-show="authreset" class="serchbtn" icon="el-icon-refresh" @click='reset("noneEpos")'>重置</el-button>
                        </div>
                    </div>
                </el-collapse-transition>
            </div>
            <div class="tableData">
                <div class="contentBotoom clear">
                    <div class="button fl">
                        <div class="leftButton clear ">
                            <div class="BotoomBtn leftRadius" v-show="authblack1" title="加入黑名单" @click="blackListTip('/changeName/changeName',true,'noneepos')">
                                <div class="jrhmd"></div>
                            </div>
                            <div class="BotoomBtn" v-show="authblack2" title="删除黑名单" @click="blackListTip('/changeName/changeName',false,'noneepos')">
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
                        style="width: 100%"
                        v-if="lsstShow">

                        <el-table-column
                            type="selection"
                            width="50">
                        </el-table-column>
                        <el-table-column
                            v-if="tableDataSec.saleName[0]"
                            sortable
                            show-overflow-tooltip
                            :render-header="companyRenderHeader"
                            prop="saleName"
                            label="销售姓名"
                            width="150">
                        </el-table-column>
                        <el-table-column
                         v-if="tableDataSec.productName[0]"
                            sortable
                            show-overflow-tooltip
                            :render-header="companyRenderHeader"
                            prop="productName"
                            label="商品类别"
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
                         v-if="tableDataSec.orderNo[0]"
                            sortable
                            show-overflow-tooltip
                            :render-header="companyRenderHeader"
                            prop="orderNo"
                            label="商户订单号"
                            width="150">
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
                         v-if="tableDataSec.bankSign[0]"
                            sortable
                            show-overflow-tooltip
                            :render-header="companyRenderHeader"
                            prop="bankSign"
                            label="银行唯一识别号"
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
                         v-if="tableDataSec.name[0]"
                            sortable
                            show-overflow-tooltip
                            :render-header="companyRenderHeader"
                            prop="name"
                            label="商户名称"
                            width="150">
                        </el-table-column>
                        <el-table-column
                         v-if="tableDataSec.money[0]"
                            sortable
                            show-overflow-tooltip
                            :render-header="companyRenderHeader"
                            prop="money"
                            label="订单金额(元)"
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
                         v-if="tableDataSec.cardNo[0]"
                            sortable
                            :render-header="companyRenderHeader"
                            label="银行卡号"
                            width="150">
                            <template slot-scope="scope" class="pr">
                                {{scope.row.cardNo}}
                                <div  class="secret pa none" style="right:-124px;">{{scope.row.cardNoSI}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column
                         v-if="tableDataSec.cardHolderMobile[0]"
                            sortable
                            :render-header="companyRenderHeader"
                            label="持卡人手机号"
                            width="150">
                            <template slot-scope="scope" class="pr">
                                {{scope.row.cardHolderMobile}}
                                <div  class="secret pa none" style="right:-60px;">{{scope.row.cardHolderMobileSI}}</div>
                            </template>
                        </el-table-column> 
                        <el-table-column 
                         v-if="tableDataSec.cardHolderName[0]"
                            sortable
                            show-overflow-tooltip
                            :render-header="companyRenderHeader"
                            prop="cardHolderName"
                            label="持卡人姓名"
                            width="150">
                        </el-table-column>
                        <el-table-column
                         v-if="tableDataSec.idNo[0]"
                            sortable
                            :render-header="companyRenderHeader"
                            label="证件号码"
                            width="150">
                            <template slot-scope="scope" class="pr">
                                {{scope.row.idNo}}
                                <div  class="secret pa none" style="right:-144px;">{{scope.row.idNoSI}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column
                         v-if="tableDataSec.payMethod[0]"
                            sortable
                            show-overflow-tooltip
                            :render-header="companyRenderHeader"
                            prop="payMethod"
                            label="支付方式"
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
                         v-if="tableDataSec.bankName[0]"
                            sortable
                            show-overflow-tooltip
                            :render-header="companyRenderHeader"
                            prop="bankName"
                            label="银行名称"
                            width="150">
                        </el-table-column>
                        <el-table-column
                         v-if="tableDataSec.userId[0]"
                            sortable
                            show-overflow-tooltip
                            :render-header="companyRenderHeader"
                            prop="userId"
                            label="用户id"
                            width="150">
                        </el-table-column>
                        <el-table-column
                         v-if="tableDataSec.ip[0]"
                            sortable
                            show-overflow-tooltip
                            :render-header="companyRenderHeader"
                            prop="ip"
                            label="IP"
                            width="150">
                        </el-table-column>
                        <el-table-column
                         v-if="tableDataSec.intercepetReason[0]"
                            sortable
                            show-overflow-tooltip
                            :render-header="companyRenderHeader"
                            prop="intercepetReason"
                            label="报错原因"
                            width="150">
                        </el-table-column>
                        <el-table-column
                         v-if="tableDataSec.bankReturn[0]"
                            sortable
                            show-overflow-tooltip
                            :render-header="companyRenderHeader"
                            prop="bankReturn"
                            label="银行返回"
                            width="150">
                        </el-table-column>
                        <el-table-column
                         v-if="tableDataSec.time[0]"
                            sortable
                            show-overflow-tooltip
                            :render-header="companyRenderHeader"
                            prop="time"
                            label="清算时间"
                            width="150">
                        </el-table-column>
                        <el-table-column
                         v-if="tableDataSec.hasCode[0]"
                            sortable
                            show-overflow-tooltip
                            :render-header="companyRenderHeader"
                            prop="hasCode"
                            label="是否下发验证码"
                            width="150">
                        </el-table-column>
                        <el-table-column
                         v-if="tableDataSec.bankOrderNo[0]"
                            sortable
                            show-overflow-tooltip
                            :render-header="companyRenderHeader"
                            prop="bankOrderNo"
                            label="银行订单号"
                            width="150">
                        </el-table-column>
                        <el-table-column
                         v-if="tableDataSec.channel[0]"
                            sortable
                            show-overflow-tooltip
                            :render-header="companyRenderHeader"
                            prop="channel"
                            label="通道编码"
                            width="150">
                        </el-table-column>
                        <el-table-column
                         v-if="tableDataSec.terminal[0]"
                            sortable
                            show-overflow-tooltip
                            :render-header="companyRenderHeader"
                            prop="terminal"
                            label="终端号"
                            width="150">
                        </el-table-column>
                        <el-table-column
                         v-if="tableDataSec.cardUpdateTime[0]"
                            sortable
                            show-overflow-tooltip
                            :render-header="companyRenderHeader"
                            prop="cardUpdateTime"
                            label="绑卡更新时间"
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

        </div>
         <!-- 表格每列的列选择 注意：每页都需要手动改变top值-->
        <div ref="list" class="list pa none bgccc" style="top:860px;">
          <TableSelect  :tableDataSec="tableDataSec" ></TableSelect>
        </div>
    </div>
</template>

<script>
import TableSelect from '../tableSelect/tableSelect.vue' 
import qs from 'qs';
export default {
    name:'非Epos交易查询',
  data(){
      return{
        authsearch:false,
        authreset:false,
        authblack1:false,
        authblack2:false,
        authhighrisk:false,
        authdownload:false,
        noneeposdetail:false,
        items:[],//选中的item
        currenteveryno:20,
          serchToggle:true,
          lsstShow:true,
          lsstTable:[],
          tableDataSec:{  //控制列显示  key和table prop一致
              saleName:[true,'销售姓名'],
              productName:[true,'商品类别'],
              product:[true,'产品'],
              orderNo:[true,'商户订单号'],
              yeepayNo:[true,'易宝交易流水号'],
              bankSign:[true,'银行唯一识别号'],
              No:[true,'商户编号'],
              name:[true,'商户名称'],
              money:[true,'订单金额(元)'],
              status:[true,'交易状态'],
              cardNo:[true,'银行卡号'],
              cardHolderMobile:[true,'持卡人手机号'],
              cardHolderName:[true,'持卡人姓名'],
              idNo:[true,'证件号码'],
              payMethod:[true,'支付方式'],
              cardType:[true,'银行卡类型'],
              bankName:[true,'银行名称'],
              userId:[true,'用户id'],
              ip:[true,'IP'],
              intercepetReason:[true,'报错原因'],
              bankReturn:[true,'银行返回'],
              time:[true,'清算时间'],
              hasCode:[true,'是否下发验证码'],
              bankOrderNo:[true,'银行订单号'],
              channel:[true,'通道编码'],
              terminal:[true,'终端号'],
              cardUpdateTime:[true,'绑卡更新时间']
            },
        form:{
            startTime:'',
            endTime:'',
            status:"all",//交易状态
            product:'all',//产品
            mobile:'',//手机号
            number:'',//商户编号
            orderNo:'',////商户订单号
            terminal:'',//终端号
            cardNo:'',//银行卡号
            IDNo:'',//身份证号
            userId:'',//用户id
            cardType:'all',//银行卡类型 
            channel:''//通道编码
        },
        oneProductSelect:[
             
        ],//产品
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
                case 149:
                    self.authsearch= true
                break;
                case 150:
                    self.authreset= true
                break;
                case 151:
                    self.authblack1= true
                break;
                case 152:
                    self.authblack2= true
                break;
                case 153:
                    self.authhighrisk= true
                break;
                case 154:
                    self.authdownload= true
                break;
                case 267:
                    self.noneeposdetail= true
                break;
            }
        })
    },
    handleCurrentChange(val) {  //处理当前页
         this.pageNumber = `${val}`  //当前页
         this.listQuery("/usNoEpos/getAll","noneEpos",true,val)
    },
    blackList(url,param,value){  //是否加入黑名单
        var self = this
        if(self.idList.length < 1){
            return false
        }
        this.$axios.post(url,qs.stringify(param)).then(res => {
            var response = res.data
            var text = ''
            if(value){
                text = '加入黑名单成功'
            }else {
                 text = '删除黑名单成功'
            }
            if(response.code == '200'){
               if(response.msg.indexOf('成功')>-1){
                    self.successTip(response.msg)
               }else{
                    self.manyBlackFailtip(response.msg)
               }
            }else{
                self.failTip(response.msg)
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
            var params = this.processParams('noneEpos')//入参;
        }else{
            var params = this.processParams('noneEpos')//入参
            params.yeepayNoList = self.idList
        }
        if(!params){
            return false
        }
        var newp = this.addSessionId(params)
        this.$axios.post("/usNoEpos/checkNum",qs.stringify(newp)).then(res => {
            var response = res.data
            if(response.code == '200'){
                    window.location = self.url+"/usNoEpos/download?" + qs.stringify(newp)
            }else{
                this.$message.error({message:response.msg,center: true});
            }
        })
    },
    gotoDetail(row){ //进入详情页
        if(this.noneeposdetail){
            // this.$router.push({path:'./noneEposQueryDetail/'+row.yeepayNo})
             window.open('#/noneEposQueryDetail/'+ row.yeepayNo)
        }
        
    }
  },
  created(){
    this.getProductsec('3')
    this.queryAuthList()
  },
  mounted(){
    //加载页面数据
     this.form.startTime =  this.getdiffTime(-7) +" 00:"+"00:"+"00"
     // this.form.startTime =  "2018-01-01" +" 00:"+"00:"+"00"
    this.form.endTime = this.getdiffTime(0) +" 23:"+"59:"+"59"
    
  },
  components:{
    TableSelect
  }
}
</script>
<style scoped>
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
    padding-top: 20px;
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
