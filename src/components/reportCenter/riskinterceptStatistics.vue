<!--商户核查单管理-->
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
                                <el-form-item label="时间刻度:" prop="timeType" >
                                    <el-radio-group v-model="form.timeType" @change="changeTime">
                                      <el-radio label="1">月</el-radio>
                                      <el-radio label="2">周</el-radio>
                                      <el-radio label="3">天</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="开始时间:" prop="startTime" label-width="144px">
                                    <el-date-picker  v-model="form.startTime" type="date" :picker-options="end" value-format="yyyy-MM-dd" placeholder="选择日期时间" style="width: 100%;">
                                    </el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="结束时间:" prop="endTime" label-width="144px">
                                    <el-date-picker  v-model="form.endTime" :picker-options="end" type="date" value-format="yyyy-MM-dd" placeholder="选择日期时间" style="width: 100%;"></el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="商户唯一标识:" prop="customerSign">
                                   <el-input v-model="form.customerSign" placeholder="请输入" style="width: 90%; max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="商户编号:" prop="merchantNo">
                                   <el-input v-model="form.merchantNo" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
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
                                 <el-input v-model="product" placeholder="请选择" style="width: 90%;max-width:225px;" @focus="addproductCheck"></el-input>
                                 <span class="pa iconbox" @click="addproductCheck">
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
                            <div class="formConClass">
                                <el-form-item label="行业业绩属性:" prop="industryAchievementProperty">
                                    <el-select v-model="form.industryAchievementProperty" placeholder="请选择" style="width: 90%;max-width:225px;">
                                        <el-option label="全部" value="all"></el-option>
                                        <el-option
                                            v-for="item in worktypeArray"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                             <div class="formConClass">
                                <el-form-item label="银行卡类型:" prop="cardType">
                                    <el-select v-model='form.cardType' placeholder="请选择" style="width: 90%;max-width:225px;">
                                        <el-option label="全部" value="all"></el-option>
                                        <!-- <el-option label="信用卡" value="creditCard"></el-option>
                                        <el-option label="借记卡" value="debitCard"></el-option> -->
                                        <el-option label="信用卡" value="CREDIT"></el-option>
                                        <el-option label="借记卡" value="DEBIT"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <!-- <div class="formConClass">
                                <el-form-item label="银行:" prop="bank">
                                    <el-select v-model="form.bank" placeholder="请选择" style="width: 90%;max-width:225px;">
                                        <el-option label="全部" value="all"></el-option>
                                        <el-option
                                            v-for="item in bankArray"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div> -->
                        </el-form>
                    </div>
                    <div class="rightContent">
                        <el-button type="primary" class="serchbtn" v-show="authsearch" icon="el-icon-search" @click='query'>查询</el-button>
                       
                    </div>
                </div>
            </el-collapse-transition>

            <!-- 图表 -->
            <div id="myChart" class="center" :style="{width: '1000px', height: '400px'}"></div>
            <!-- 表格 -->
            <div class="BotoomBtn leftRadius rightRadius" style="float:right;margin-right:10px;margin-bottom:10px;"  v-show="authdownload1" title="下载" @click="downloadList1">
                            <div class="xz"></div>
                        </div>
            <el-table
              fixed 
               max-height="600"
              class="pb10"
               border
              :data="tableData0">
              <el-table-column
                v-if="tableDataSec0.times[0]"
                prop="times"
                label="时间"
                sortable
                show-header
                show-overflow-tooltip
                :render-header="companyRenderHeader"
              >
              </el-table-column>
              <el-table-column
                v-if="tableDataSec0.queryTotal[0]"
                prop="queryTotal"
                label="交易总请求数"
                sortable
                show-overflow-tooltip
                :render-header="companyRenderHeader"
                :formatter="formater1"
                >
              </el-table-column>
              <el-table-column
                v-if="tableDataSec0.coverRate[0]"
                 prop="coverRate"
                label="覆盖率%"
                sortable
                show-overflow-tooltip
                :render-header="companyRenderHeader"
                :formatter="formater11"
                ></el-table-column>
              <el-table-column
                v-if="tableDataSec0.limitInterceptRate[0]"
                 prop="limitInterceptRate"
                label="限额限次拦截率%"
                sortable
                show-overflow-tooltip
                :render-header="companyRenderHeader"
                :formatter="formater2"
                >
              </el-table-column>
              <el-table-column
                v-if="tableDataSec0.blackListInterceptRate[0]"
                 prop="blackListInterceptRate"
                label="黑名单拦截率%"
                sortable
                show-overflow-tooltip
                :render-header="companyRenderHeader"
                :formatter="formater3"
                >
              </el-table-column>
              <el-table-column
                v-if="tableDataSec0.ruleInterceptRate[0]"
                 prop="ruleInterceptRate"
                label="规则拦截率%"
                sortable
                show-overflow-tooltip
                :render-header="companyRenderHeader"
                :formatter="formater4"
                >
              </el-table-column>
              <el-table-column
                v-if="tableDataSec0.riskInterceptRate[0]"
                 prop="riskInterceptRate"
                label="风控拦截率%"
                sortable
                show-overflow-tooltip
                :render-header="companyRenderHeader"
                :formatter="formater5"
                >
              </el-table-column>
              
            </el-table>
        </div>
   
        <div class="block2">
             
            <div class='paginationRight'>
               <el-pagination
                layout="total,prev, pager, next"
                :page-sizes="[20]"
                :page-size="Number(currenteveryno0)"
                :total=length0
                @current-change="handleCurrentChange0">
               </el-pagination>
               
            </div>
        </div>
                  
        <!-- 表格每列的列选择 注意：每页都需要手动改变top值-->
        <div ref="list" class="list pa none bgccc">
          <TableSelect  :tableDataSec="tableDataSec0" ></TableSelect>
        </div>
         
    </div>
</template>
<script>

import qs from 'qs';
import KycCheckbox from '../zymCommon/kycCheckbox.vue'
import TableSelect from '../tableSelect/tableSelect.vue'
var loadingTicket,myChart
export default {
  name:'风险拦截数据统计',
  data(){
      return{
        end: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        authsearch:false,
        authdownload1:false,
        authdownload2:false,
        currenteveryno0:10,//每页10条
        checkAll: false,
        isIndeterminate: true,
        isProduct: true,
        checkedProduct: [],//checkedProduct
        checkedProductCode: [],//checkedProductCode
         banktypeSelect: [],//商户自然一级属性
        productCheckshow:false,//产品拉框显示
        tableDataSec0:{  //控制列显示  key和table prop一致
          times:[true,'时间'],
          queryTotal:[true,'交易总请求数'],
          coverRate:[true,'覆盖率'],
          limitInterceptRate:[true,'限额限次拦截率'],
          blackListInterceptRate:[true,'黑名单拦截率'],
          ruleInterceptRate:[true,'规则拦截率'],
          riskInterceptRate:[true,'风控拦截率'],
          signQuotaInterceptRate:[true,'单笔限额拦截率'],
          dailyQuotaInterceptRate:[true,'单日限额拦截率'],
          dailyLimitInterceptRate:[true,'单日限次拦截率'],
          monthlyQuotaInterceptRate:[true,'单月限额拦截率'],
          monthlyLimitInterceptRate:[true,'单月限次拦截率']
        },
        oneProductSelect: [
        ],
        tableData0: [],
        tableData1: [],
        productArray:[],//产品
        worktypeArray:[],//行业属性
        // bankArray:[],
        serchToggle:true,
      form:{
        timeType:'1',
        startTime:'',
        endTime:'',
        customerSign:'',//商户唯一标识
        kycResult:'',
        merchantNo:'',
        product:'',
        merchantCode:'',
        industryAchievementProperty:'',
        cardType:'all'
      },
      select:{
          kycCognizance: "全部",
          childTag: [-1],
      },
      product:'',
      currentPage0:1,// 分页
      pageNumber0:1,
      pageRow0:10,
      length0:0,
    }
  },
  created(){
     this.queryAuthList()
  },
  mounted(){
    this.form.startTime = this.getNaturalMonth(-1).tYear+'-'+this.getNaturalMonth(-1).tMonth+'-'+'01'
    this.form.endTime = this.getNaturalMonth(-1).tYear+'-'+this.getNaturalMonth(-1).tMonth+'-'+this.getNaturalMonth(-1).tDate
    this.getMerchantSort()//获取 商户排序
    this.getIndustryAchievementProperty() //获取 行业业绩属性
    this.getBank() //获取 银行
    this.query()
  },
  methods:{
    changeTime(){
      this.pageNumber = 1
      this.query()
    },
    clearData(){
      option.xAxis.data = []  //时间轴
      option.series[0].data =[] //限额限次拦截率
      option.series[1].data = [] //黑名单拦截率
      option.series[2].data = [] //规则拦截率
      option.series[3].data = [] //风控拦截率
    },
    query(){  //查询
      this.getTable1(1)
      this.getChartData()
    },
    queryAuthList(){  //权限管理
         var self = this
      var arr = localStorage.getItem('ARRLEVEL')?localStorage.getItem('ARRLEVEL'):[]
        JSON.parse(arr).map(function(ele){
            switch(ele){
                case 184 || 222 || 223:
                    self.authsearch= true
                break;
                case 185:
                    self.authdownload1= true
                break;
                 case 341:
                    self.authdownload2= true
                break;
            }
        })
    },
    getChartData(){  //统计图
      var self = this
      var newp = this.addSessionId(self.form)
      this.$axios.post('/report/getDealConditionP',qs.stringify(newp)).then(res => {
        var response = res.data
        if(response.code == '200'){
          if(JSON.stringify(response.data) == "{}"){
            self.clearData()
            this.drawLine()
            return false
          }
          option.xAxis.data = response.data.times  //时间轴   ///////////
          if(response.data.times.length < 66){
            option.xAxis.axisLabel.interval = 0
          }else{
            option.xAxis.axisLabel.interval = 1
          }
          option.series[0].data = response.data.limit //限额限次拦截率
          option.series[1].data = response.data.black //黑名单拦截率
          option.series[2].data = response.data.rule //规则拦截率
          option.series[3].data = response.data.risk //风控拦截率
          option.series[4].data = response.data.cover //覆盖率
          this.drawLine();
        }else{
          this.$message.error({message:response.msg,center: true});
        }
      }) 
    },

    getTable1(page){   //统计表
      var params =  this.form
      params.pageNumber= page
      params.pageRow= this.pageRow0

      var codestringlist = this.getCode(this.oneProductSelect)
      params.product = codestringlist
      params.kycResult = this.select.kycCognizance == '全部' ? 'all' : this.select.kycCognizance
      this.$axios.post('/report/getDealConditionR1',qs.stringify(params)).then(res => {
        var response = res.data
        if(response.code == '200'){
            this.tableData0 = response.data.returnList
            this.length0 = response.data.total;
        }else{
          this.resultData = []
            this.length0 = 0
            alert(response)
            this.$message.error({message:response.msg,center: true});
        }
      }) 
    },
    
    addproductCheck(){//增加产品
      this.productCheckshow = true
    },
    getProductStatus(){  //获取选中的产品
      this.product = this.checkedProduct.join(',')
      this.productCheckshow = false
    },
    downloadList1() {//是否下载
        var self = this
        var newp = this.addSessionId(self.form)
        window.location = this.url+"/reportExcel/getDealConditionR1Excel?" + qs.stringify(newp)
    },
    drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
         myChart.clear()
        // myChart.setOption(option);
        loadingTicket = setTimeout(function (){
              myChart.hideLoading();
              myChart.setOption(option);
              clearTimeout(loadingTicket);
             
          },2000);
        
         myChart.showLoading({
            text : '数据拼命加载中...',
            effect :"whirling" ,
            textStyle : {
                fontSize : 16
            },
            effectOption: {backgroundColor: 'rgba(0, 0, 0, 0.05)'}
        });
    },
 
    handleCurrentChange0(val) {  //处理当前页
         this.pageNumber0 = `${val}`  //当前页
         this.getTable1(val)
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
      return row.queryTotal.toLocaleString()
    },
     formater2(row, column){
      return row.limitInterceptRate.toFixed(2)
    },
    formater3(row, column){
      return row.blackListInterceptRate.toFixed(2)
    },
    formater4(row, column){
      return row.ruleInterceptRate.toFixed(2)
    },
    formater5(row, column){
      return row.riskInterceptRate.toFixed(2)
    },
    formater6(row, column){
      return row.signQuotaInterceptRate.toFixed(2)
    },
    formater7(row, column){
      return row.dailyQuotaInterceptRate.toFixed(2)
    },
    formater8(row, column){
      return row.dailyLimitInterceptRate.toFixed(2)
    },
    formater9(row, column){
      return row.monthlyQuotaInterceptRate.toFixed(2)
    },
    formater10(row, column){
      return row.monthlyLimitInterceptRate.toFixed(2)
    },
    formater11(row, column){
      return row.coverRate.toFixed(2)
    }
  },
  components:{
    TableSelect,KycCheckbox
  }
}
const option = {
    title: {
        text: '风控拦截情况统计',
        x: 'center'
    },
    
    toolbox: {
       show : true,
        feature : {
            saveAsImage : {show: true}
        }
    },
    tooltip: {
        trigger: 'axis',
        formatter:function (params) {
          var str0=''
          var str=''
          params.map(function(item,index){
            str0=item[1]+'\<br>'
            str+=item[0]+': '
            if(item[2].toString().indexOf('%') == -1){
              str+=item[2].toFixed(2)+'%\<br>'
            }else{
              str+=item[2]+'\<br>'
            }
            
          })
          return str0+str
        },
    },
    legend: {
        y:'38px',
        data:['限额限次拦截率','黑名单拦截率','规则拦截率','风控拦截率','覆盖率']
    },
    xAxis: {
      axisLabel: {  
       interval:0,  
       rotate:75 
      }, 
        type: 'category',
        splitLine: {show: false},
        data: [' ']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        y2: 160,// y2可以控制 X轴跟Zoom控件之间的间隔，避免以为倾斜后造成 label重叠到zoom上  控制x轴刻度线高度
        containLabel: true
    },
    yAxis: {
      type: 'value',
      name: '拦截率%',
      splitNumber:5,
      axisLabel: {
          formatter: '{value}'
      }
    },
    series: [
        {
            symbol: "none",// 去掉折线上面的小圆点
            name: '限额限次拦截率',
            type: 'line',
            data: []
        },
        {
             symbol: "none",// 去掉折线上面的小圆点
            name: '黑名单拦截率',
            type: 'line',
            data: []
        },
        {
           symbol: "none",// 去掉折线上面的小圆点
            name: '规则拦截率',
            type: 'line',
            data: []
        },
        {
           symbol: "none",// 去掉折线上面的小圆点
            name: '风控拦截率',
            type: 'line',
            data: []
        },
        {
           symbol: "none",// 去掉折线上面的小圆点
            name: '覆盖率',
            type: 'line',
            data: []
        }
    ]
};
</script>
<style scoped>
.fr{float:right;}
.el-radio+.el-radio{margin-left:20px;}
/*商户自然属性一级 start*/
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
.el-table::before{background-color:#fff;}
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
