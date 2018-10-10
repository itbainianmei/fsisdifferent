<!--交易及欺诈投诉统计-->
<template>
    <div id="tradeandfraud" @click="allarea($event)">
        <div  class="searchBasic">
            <div class="title" >
                <i class="el-icon-arrow-down toggleIcon" @click="serchToggle = !serchToggle"></i>
                <span>基础查询</span>
            </div>
            <el-collapse-transition>
                <div class="searchContentgray" id="searchContentgray" v-show="serchToggle">
                    <div class="leftContent">
                        <el-form ref="form" :model="form" label-width="144px" class="demo-ruleForm">
                            <div class="formConClass">
                                <el-form-item label="开始月份:" prop="startMonth">
                                    <el-date-picker  v-model="form.startMonth" value-format="yyyy-MM" :picker-options="end" type="month" placeholder="选择日期时间" style="width: 90%;max-width:225px; "></el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="结束月份:" prop="endMonth">
                                    <el-date-picker  v-model="form.endMonth" value-format="yyyy-MM" :picker-options="end" type="month" placeholder="选择日期时间" style="width: 90%;max-width:225px;"></el-date-picker>
                                </el-form-item>
                            </div>
                            
                             <div class="formConClass">
                                <el-form-item label="商户KYC:" prop="kycResult">
                                    <!-- 多选框 -->
                                    <KycCheckbox :select="select"
                                        @selectedChange="selectedChange">
                                    </KycCheckbox>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item class="pr" label="产品:" prop="product" >
                                 <el-input v-model="product" placeholder="请选择" style="width: 90%;max-width:225px;" @focus="productCheckshow=true"></el-input>
                                 <span class="pa iconbox" @click="productCheckshow=true">
                                   <i class="el-icon-arrow-down"></i>
                                 </span>
                                     <!-- //产品 列表  自定义 -->
                                    <div class="pa pt10 onepropertySelect" v-show="productCheckshow">
                                      <div class="box">
                                        <el-checkbox :indeterminate="isProduct" v-model="checkAll" @change="handleCheckAllproductChange">全选</el-checkbox>
                                            <el-checkbox-group v-model="checkedProduct" @change="handleCheckedproductChange">
                                              <el-checkbox v-for="city in oneProductSelect" :label="city.label" :key="city.value">{{city.label}}</el-checkbox>
                                            </el-checkbox-group>
                                      </div>
                                            
                                            <div class="clear mt10 mb20">
                                            <el-button type="primary" @click="getProductStatus">确定</el-button>
                                            <el-button @click="productCheckshow=false">取消</el-button>
                                          </div>
                                    </div>
                                </el-form-item>
                            </div>
                        </el-form>
                    </div>
                    <div class="rightContent">
                        <el-button type="primary" class="serchbtn" v-show="authsearch" icon="el-icon-search" @click='getTable(1)'>查询</el-button>
                        <el-button type="primary" v-show="authdownload" class="serchbtn" icon="el-icon-refresh" @click='downloadList'>下载</el-button>
                    </div>
                </div>
            </el-collapse-transition>
            <!-- 表格 -->
            <el-table
              class="pb30"
               border
                v-loading="loading"
               fixed 
               max-height="600"
              :data="tableData">
              <el-table-column
                v-if="tableDataSec.kycResult[0]"
                label="商户KYC"
                sortable
                show-header
                show-overflow-tooltip
                :render-header="companyRenderHeader"
              >
              <template slot-scope="scope">
               {{scope.row.kycResult == 'all' ? '全部' : scope.row.kycResult}}
              </template>
              </el-table-column>
              <el-table-column
                v-if="tableDataSec.transactionNumber[0]"
                prop="transactionNumber"
                label="成功交易笔数"
                sortable
                show-overflow-tooltip
                :render-header="companyRenderHeader"
                :formatter="formater1"
                >
              </el-table-column>
              <el-table-column
                v-if="tableDataSec.transactionMoney[0]"
                prop="transactionMoney"
                label="成功交易金额(万元)"
                 sortable
                show-overflow-tooltip
                :render-header="companyRenderHeader"
                :formatter="formater2"
                >
              </el-table-column>
              <el-table-column
                v-if="tableDataSec.fraudNumber[0]"
                prop="fraudNumber"
                label="成功欺诈笔数"
                 sortable
                show-overflow-tooltip
                :render-header="companyRenderHeader"
                :formatter="formater3"
                >
              </el-table-column>
              <el-table-column
                v-if="tableDataSec.fraudMoney[0]"
                :render-header="companyRenderHeader"
                prop="fraudMoney"
                label="成功欺诈金额(万元)"
                :formatter="formater4"
                show-overflow-tooltip
                sortable
                >
              </el-table-column>
               <el-table-column
              v-if="tableDataSec.fraudNumberP[0]"
              :render-header="companyRenderHeader"
              :formatter="formater7"
                prop="fraudNumberP"
                label="欺诈笔数占比(0.01BP)"
                show-overflow-tooltip
                sortable>
              </el-table-column>
              <el-table-column
                v-if="tableDataSec.fraudMoneyP[0]"
                :render-header="companyRenderHeader"
                :formatter="formater8"
                prop="fraudMoneyP"
                label="欺诈金额占比(0.01BP)"
                show-overflow-tooltip
                sortable>
              </el-table-column>
              
              <el-table-column
              v-if="tableDataSec.riskInterceptRate[0]"
              :render-header="companyRenderHeader"
              :formatter="formater11"
               prop="riskInterceptRate"
                label="风控拦截率%"
                show-overflow-tooltip
                sortable>
              </el-table-column>
              <el-table-column
              v-if="tableDataSec.coverRate[0]"
              :render-header="companyRenderHeader"
              :formatter="formater12"
               prop="coverRate"
                label="金额覆盖率%"
                show-overflow-tooltip
                sortable>
              </el-table-column>
              <el-table-column
              v-if="tableDataSec.payAmount[0]"
              prop="payAmount"
                label="赔付金额"
                sortable
                :render-header="companyRenderHeader"
                :formatter="formater12"
                show-overflow-tooltip>
              </el-table-column>
            </el-table>
        </div>
        <!-- 表格每列的列选择 注意：每页都需要手动改变top值-->
        <div ref="list" class="list pa none bgccc" style="top:860px;">
          <TableSelect  :tableDataSec="tableDataSec" ></TableSelect>
        </div>
        <div class="mt10">
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
</template>
<script>
import qs from 'qs'
import KycCheckbox from '../zymCommon/kycCheckbox.vue'
import TableSelect from '../tableSelect/tableSelect.vue'
export default {
   name:'商户类型欺诈投诉交易统计表',
  data(){
      return{
         end: {
          disabledDate(time) {
            var today = new Date();    
            var targetday_milliseconds=today.getMonth()-1           
            today.setMonth(targetday_milliseconds); //注意，这行是关键代码  
            var tYear = today.getFullYear();    
            var tMonth = today.getMonth();  
            var curDate = today.getTime();
            return time.getTime() > curDate
          }
        },
        authsearch:false,
        authdownload:false,
        loading:true,
        currenteveryno:20,//每页10条
        checkAll: false,
        productCheckshow:false,//Product显示
         isProduct: true,
        checkedProduct: [],//checkedProduct
        checkedProductCode: [],//checkedProductCode
        oneProductSelect: [],
        checkedOneproperty: [],//checkedOneproperty
        onepropertySelect: [],
        tableDataSec:{  //控制列显示
          kycResult:[true,'商户KYC'],
          // naturalPropertyOne:[true,'商户自然属性一级'],
          transactionNumber:[true,'成功交易笔数'],
          transactionMoney:[true,'成功交易金额（万元）'],
          fraudNumber:[true,'成功欺诈笔数'],
          fraudMoney:[true,'成功欺诈金额（万元）'],
          fraudNumberP:[true,'欺诈笔数占比(0.01BP)'],
          fraudMoneyP:[true,'欺诈金额占比(0.01BP)'],
          riskInterceptRate:[true,'风控拦截率'],
          coverRate:[true,'金额覆盖率'],
          payAmount:[true,'赔付金额']
        },
        tableData: [],
        productArray:[],//产品
        serchToggle:true,
      form:{
        startMonth:'',
        endMonth:'',
        product:'',
        kycResult:''
      },
      select:{
          kycCognizance: "全部",
          childTag: [-1],
      },
       product:'',
       currentPage:1,// 分页
       pageNumber:1,
       pageRow:20,
       length:0    
      }
  },
  created(){
     this.queryAuthList()
  },
  mounted(){
      this.form.startMonth = this.getNaturalMonth(-1).tYear+'-'+this.getNaturalMonth(-1).tMonth
    this.form.endMonth = this.getNaturalMonth(-1).tYear+'-'+this.getNaturalMonth(-1).tMonth
     this.getMerchantFirst()//获取商户自然属性一级
     this.getIndustryAchievementProperty() //获取 行业业绩属性
    this.getProduct2()//获取产品
    this.getTable(1)
  },
  methods:{
     getTable(page){   //统计表
      var params =  this.form
      params.pageNumber= page
      params.pageRow= this.pageRow
      params.kycResult = this.select.kycCognizance == '全部' ? 'all' : this.select.kycCognizance
      var codestringlist = this.getCode(this.oneProductSelect)
      params.product = codestringlist
      this.loading = true
      var newp = this.addSessionId(params)
      this.$axios.post('/report/getMerchanttypefraud',qs.stringify(newp)).then(res => {
        var response = res.data
        this.loading = false
        if(response.code == '200'){
            this.tableData = response.data.returnList
            this.length = response.data.total;
        }else{
          this.resultData = []
                this.length = 0
            this.$message.error({message:response.msg,center: true});
        }
      }) 
    },
    queryAuthList(){  //权限管理
         var self = this
      var arr = localStorage.getItem('ARRLEVEL')?localStorage.getItem('ARRLEVEL'):[]
        JSON.parse(arr).map(function(ele){
            switch(ele){
                case 182:
                    self.authsearch= true
                break;
                case 183:
                    self.authdownload= true
                break;
            }
        })
    },
    getProductStatus(){  //获取选中的产品
      this.product = this.checkedProduct.join(',')
      this.productCheckshow = false
    },  
    
    downloadList() {//是否下载
      var self = this
      var newp = this.addSessionId(self.form)
      window.location = this.url+"/reportExcel/getMerchanttypefraudExcel?" + qs.stringify(newp)
    },
 
    handleCurrentChange(val) {  //处理当前页
         this.pageNumber = `${val}`  //当前页
         this.getTable(val)
    },
     handleCheckAllproductChange(val) {  //产品
      var checkedlist = []
      this.oneProductSelect.map(function(item){
        checkedlist.push(item.label)
      })
      this.checkedProduct = val ? checkedlist : [];
      this.isProduct = false;
    },
    handleCheckedproductChange(value) {  //处理产品
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.oneProductSelect.length;
      this.isProduct = checkedCount > 0 && checkedCount < this.oneProductSelect.length;
    },
    
    formater1(row, column){
      return row.transactionNumber.toLocaleString()
    },
    formater2(row, column){
       return this.addCommas(row.transactionMoney.toFixed(2))
    },
    formater3(row, column){
      return row.fraudNumber.toLocaleString()
    },
     formater4(row, column){
      return this.addCommas(row.fraudMoney.toFixed(2))
    },
    formater7(row, column){
      return this.addCommas(row.fraudNumberP.toFixed(2))
    },
    formater8(row, column){
      return this.addCommas(row.fraudMoneyP.toFixed(2))
    },
    formater11(row, column){
      return this.addCommas(row.riskInterceptRate.toFixed(2))
    },
    formater12(row, column){
      return this.addCommas(row.coverRate.toFixed(2))
    },
    formater14(row, column){
      return this.addCommas(row.payAmount.toFixed(2))
    }
  },
  components:{
    TableSelect,KycCheckbox
  }
}
 
</script>
<style scoped>
/*商户自然属性一级 start*/
.el-table::before{height:0px;}
.el-input--prefix .el-input__inner{padding-left:14px !important;}
.el-checkbox{margin-left: 10px;}
.el-checkbox-group{width:100px;}
.onepropertySelect{
  width:180px;
  line-height: 28px;
  padding-left:10px;
  top:38px;
  background: #fff;
  border:1px solid #ddd;
  z-index:200;
}
.box{
  max-height: 400px;
  overflow-y: scroll;
}
.iconbox{
  right:34px;
  color:#3FAAF9;
}
.iconbox .el-icon-arrow-down:before{ color:#3FAAF9;font-weight: 700;}
/*商户自然属性一级 end*/
.bgccc{background: #f5f6fa;}
.list{padding:10px 20px;border:1px solid #ddd;border-radius: 4px;line-height: 30px;}
.center{margin:0 auto;}
.el-table--border{border:none;}
.el-table--scrollable-x .el-table__body-wrapper::-webkit-scrollbar {
    width: 4px;
    height: 11px;
  }
.tableData{
    width: 100%;
    height: auto;
}
.el-table__body{
    table-layout:auto !important;
    border-spacing: 0;
  border-collapse:separate;
}
.clear{
    clear: both;
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

.rightContent1{
	color:white;
    display: inline-block;
    vertical-align: top;
    margin-top:20px;
    /*width: 18%;
    height: 118px;
    float: right;*/
}
.formConClass{
    display: inline-block;
    width: 32%;
}
.serchbtn{
    width: 100px;
    height:36px;
    margin-bottom: 15px;
    margin-left: 10px;
    margin-left: 30%;
    display: block;
}
.contentBotoom {
    height: 60px;
    font-size: 13px;
    padding-top: 25px;
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
.icon1{
    background: url(../../images/icon1.png) no-repeat;
    width: 39px;
    height: 28px;
    border-top-left-radius: 7px;
    border-bottom-left-radius: 7px;
}
.icon2{
    background: url(../../images/icon2.png) no-repeat;
    width: 39px;
    height: 28px;
}
.icon3{
    background: url(../../images/icon3.png) no-repeat;
    width: 39px;
    height: 28px;
}
.icon4{
    background: url(../../images/icon4.png) no-repeat;
    width: 39px;
    height: 28px;
    border-top-right-radius: 7px;
    border-bottom-right-radius: 7px;
}
.icon1:hover{
    background: url(../../images/icon1-2.png) no-repeat;
    width: 39px;
    height: 28px;
    border-top-left-radius: 7px;
    border-bottom-left-radius: 7px;
}
.icon2:hover{
    background: url(../../images/icon2-2.png) no-repeat;
    width: 39px;
    height: 28px;
}
.icon3:hover{
    background: url(../../images/icon3-2.png) no-repeat;
    width: 39px;
    height: 28px;
}
.icon4:hover{
    background: url(../../images/icon4-2.png) no-repeat;
    width: 39px;
    height: 28px;
    border-top-right-radius: 7px;
    border-bottom-right-radius: 7px;
}
.serch{
    float: right;
    width: 18%;
}
 .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
.fontC{
    color: #3DC6B2;
    cursor: pointer;
    line-height: 17px;
  }
</style>
