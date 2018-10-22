<!--Epos交易查询-->
<template>
    <div id="highrisk"  @click="allarea($event)">
        <div class="searchBasic">
            <el-collapse-transition>
                <div class="searchContentgray" id="searchContentgray" v-show="serchToggle">
                    <div class="leftContent" >
                        <el-form ref="form" :model="form" label-width="116px" :rules="rules" class="demo-ruleForm">
                            <div class="formConClass">
                                <el-form-item label="开始时间:" prop="startTime" label-width="116px">
                                    <el-date-picker  v-model="form.startTime" value-format="yyyy-MM-dd HH:mm:ss"
                                       type="datetime" placeholder="选择日期时间" style="width: 100%;" :clearable="false" :editable="false"></el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="结束时间:" prop="endTime" label-width="116px">
                                    <el-date-picker  v-model="form.endTime" value-format="yyyy-MM-dd HH:mm:ss"
                                    type="datetime" placeholder="选择日期时间" style="width: 100%;" :clearable="false" :editable="false"></el-date-picker>
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
                                <el-form-item label="标记开始日期:" prop="markStartTime" label-width="116px">
                                    <el-date-picker  v-model="form.markStartTime" value-format="yyyy-MM-dd HH:mm:ss"  type="datetime" placeholder="选择日期时间" style="width: 100%; " :clearable="false" :editable="false"></el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="标记结束日期:" prop="markEndTime" label-width="116px">
                                    <el-date-picker  v-model="form.markEndTime" value-format="yyyy-MM-dd HH:mm:ss"  type="datetime" placeholder="选择日期时间" style="width: 100%; " :clearable="false" :editable="false"></el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="标记人:" prop="markPerson">
                                    <el-input v-model="form.markPerson" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="商户编号:" prop="No">
                                    <el-input v-model="form.No" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                             <div class="formConClass">
                                <el-form-item label="商户名称:" prop="name">
                                    <el-input v-model="form.name" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="手机号:" prop="mobile">
                                    <el-input v-model="form.mobile" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="银行卡号:" prop="card">
                                    <el-input v-model="form.card" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="商户订单号:" prop="orderNo">
                                    <el-input v-model="form.orderNo" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="银行名称:" prop="bankName">
                                    <el-input v-model="form.bankName" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>

                        </el-form>
                    </div>
                    <div class="rightContent">
                        <el-button type="primary" class="serchbtn" v-show="authsearch" icon="el-icon-search" @click='listQuery("/usHighRisk/getAll","highrisk")'>查询</el-button>
                        <el-button type="primary" class="serchbtn" v-show="authsearch" icon="el-icon-refresh" @click='reset("highrisk")'>重置</el-button>
                    </div>
                </div>
            </el-collapse-transition>
        </div>

        <div class="tableData">
            <div class="contentBotoom clear">
                <div class="button fl">
                    <div class="leftButton clear ">
                        <div class="BotoomBtn leftRadius" v-show="authrisk2" title="取消高危交易" @click="highRiskCancelList(false)">
                            <div class="qxgwjy"></div>
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
                    v-if="tableDataSec.product[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="product"
                        label="产品"
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
                    v-if="tableDataSec.merchantName[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="merchantName"
                        label="商户名称"
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
                    v-if="tableDataSec.cardNo[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="cardNo"
                        label="银行卡号"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec.mobile[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="mobile"
                        label="手机号"
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
                    v-if="tableDataSec.bankName[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="bankName"
                        label="银行名称"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        v-if="tableDataSec.markPerson[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="markPerson"
                        label="标记人"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec.markDate[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="markDate"
                        label="标记时间"
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
                    v-if="tableDataSec.status[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="status"
                        label="交易状态"
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
import qs from 'qs';
export default {
    name:'高危交易查询',
  data(){
      return{
        authsearch:false,
        authsearch:false,
        authrisk2:false,
        authdownload:false,
        highdetail:false,
        currenteveryno:20,
          serchToggle:true,
          lsstShow:true,
          lsstTable:[],
          form:{
            startTime:'',
            endTime:'',
            product:'all',//产品
            markStartTime:'',//标记开始时间
            markEndTime:'',//标记结束时间
            markPerson:'',//标记人
            No:'',//商户编号
            name:'',//商户名称
            mobile:'',//手机
            card:'',//银行卡号
            orderNo:'',//商户订单号
            bankName:''//银行名称
          },
          tableDataSec:{  //控制列显示  key和table prop一致
              product:[true,'产品'],
              merchantNo:[true,'商户编号'],
              merchantName:[true,'商户名称'],
              orderNo:[true,'商户订单号'],
              cardNo:[true,'银行卡号'],
              mobile:[true,'手机号'],
              money:[true,'交易金额(元)'],
              bankName:[true,'银行名称'],
              markPerson:[true,'标记人'],
              markDate:[true,'标记时间'],
              time:[true,'交易时间'],
              status:[true,'交易状态']
            },
          oneProductSelect:[],//产品
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
                case 172:
                    self.authsearch= true
                break;
                case 173:
                    self.authreset= true
                break;
                case 174:
                    self.authrisk2= true
                break;
                case 175:
                    self.authdownload= true
                break;
                case 269:
                    self.highdetail= true
                break;
            }
        })
    },

    handleCurrentChange(val) {  //处理当前页
         this.pageNumber = `${val}`  //当前页
         this.listQuery("/usHighRisk/getAll","highrisk",true,val)
    },
    downloadList() {//是否下载
        var self = this
        if(self.idList.length < 1){
            var params = this.processParams('highrisk')//入参;
        }else{
            var params = this.processParams('highrisk')//入参
            params.yeepayNoList = self.idList
        }
        if(!params){
            return false
        }
          var newp = this.addSessionId(params)
        this.$axios.post("/usHighRisk/checkNum",qs.stringify(newp)).then(res => {
            var response = res.data
            if(response.code == '200'){
                    window.location = self.url+"/usHighRisk/download?" + qs.stringify(newp)
            }
        })
    },

    highRiskCancelList(value) {  //取消高危交易
        var self = this
        if(self.idList.length < 1){
            this.atleastOne()
            return false
        }
       this.$confirm('确认将选中的记录取消高危标记?', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          showClose: false,
          dangerouslyUseHTMLString: true,
          callback:function(item){
            if(item == 'confirm'){
                self.highRiskCancelListSure(value)
            }

          }
        })
    },
    highRiskCancelListSure(value){//取消高危交易  确认
        var self = this
        this.$axios.post("/usHighRisk/mark",qs.stringify({
            status:value,
            sessionId:localStorage.getItem('SID') ? localStorage.getItem('SID'):'',
            id:self.idList  //选中的行的id列表
        })).then(res => {
            var response = res.data
            if(response.code == '200'){
                this.listQuery("/usHighRisk/getAll","highrisk")
            }
        })
    },
    gotoDetail(row){ //进入详情页
        if(this.highdetail){
           if(row.business == 'EPOS'){
                this.$router.push({path:'./EposQueryDetail/'+row.yeepayNo})
            }else{
                this.$router.push({path:'./noneEposQueryDetail/'+row.yeepayNo})
            }
        }


    }
  },
  created(){
    //加载页面数据
    this.form.startTime = this.getdiffTime(-7) +" 00:"+"00:"+"00"
    this.form.endTime =this.getdiffTime(0) +" 23:"+"59:"+"59"
     this.form.markStartTime = this.getdiffTime(-7) +" 00:"+"00:"+"00"
    this.form.markEndTime = this.getdiffTime(0) +" 23:"+"59:"+"59"
    this.getProductsec('5')
    this.queryAuthList()
  },
  components:{
    TableSelect
  }
}
</script>
<style scoped lang="less">
.tableData{
    width: 100%;
    height: auto;
}
.contentBotoom {
    height: 44px;
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
    overflow:hidden;
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
    padding-top: 8px;
    padding-bottom: 6px;
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
