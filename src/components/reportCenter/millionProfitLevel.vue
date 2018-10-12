<!--交易及欺诈投诉统计-->
<template>
    <div id="tradeandfraud" @click="allarea($event)">
        <div  class="searchBasic">
            <el-collapse-transition>
                <div class="searchContentgray" id="searchContentgray">
                    <div class="leftContent">
                        <el-form ref="form" :model="form" label-width="144px" class="demo-ruleForm">
                            <div class="formConClass">
                                <el-form-item label="时间刻度:" prop="dateType">
                                    <el-radio-group v-model="form.dateType" @change="changeTime">
                                      <el-radio label="day">日</el-radio>
                                      <el-radio label="week">周</el-radio>
                                      <el-radio label="month">月</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="开始时间:" prop="beginDateStr">
                                    <el-date-picker  v-model="form.beginDateStr" value-format="yyyy-MM-dd" :picker-options="end" type="date" placeholder="选择日期时间" style="width: 100%;"></el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="结束时间:" prop="endDateStr">
                                    <el-date-picker  v-model="form.endDateStr" :picker-options="end" value-format="yyyy-MM-dd" type="date" placeholder="选择日期时间" style="width: 100%;"></el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="数据维度:" prop="cType">
                                    <el-select v-model="form.cType" @change="getLdData" placeholder="请选择" >
                                        <el-option label="商户KYC" value="kyc"></el-option>
                                        <el-option label="行业业绩属性" value="92"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="" prop="heapTypes">
                                    <!-- 多选框 -->
                                    <KycAndHyCheckbox :select="select"
                                        @selectedChange="selectedChange">
                                    </KycAndHyCheckbox>
                                </el-form-item>
                            </div>
                             <div class="formConClass">
                                <el-form-item label="分公司:" prop="branchName">
                                   <el-input v-model="form.branchName" :maxlength="maxMerchantNo100" placeholder="请输入" ></el-input>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="商户编号:" prop="merchantNo">
                                   <el-input v-model="form.merchantNo" :maxlength="maxMerchantNo100" placeholder="请输入" ></el-input>
                                </el-form-item>
                            </div>
                             
                        </el-form>
                    </div>
                    <div class="rightContent">
                        <el-button type="primary" class="serchbtn" v-show="authsearch" icon="el-icon-search" @click='query'>查询</el-button>
                        <el-button type="primary" v-show="authdownload" class="serchbtn" icon="el-icon-refresh" @click='downloadList'>下载</el-button>
                    </div>
                </div>
            </el-collapse-transition>

            <!-- 图表 -->
            <div id="myChart" class="center" :style="{width: '100%', height: '400px'}"></div>
            <!-- 表格 -->
              <el-table  
                 border
                 fixed 
                 max-height="600"
                 class="pb30"
                :data="tableData">
                <el-table-column
                  v-if="tableDataSec.dateStr[0]"
                  prop="dateStr"
                  label="时间"
                  sortable
                  show-header
                  show-overflow-tooltip
                  :render-header="companyRenderHeader"
                >
                </el-table-column>
                <el-table-column
                  v-if="tableDataSec.tagType[0]"
                  prop="tagType"
                  label="数据维度一级"
                  sortable
                  show-overflow-tooltip
                  :render-header="companyRenderHeader"
                  :formatter="formater1"
                  >
                </el-table-column>
                <el-table-column
                  v-if="tableDataSec.kycResult[0]"
                  prop="kycResult"
                  label="数据维度二级"
                   sortable
                  show-overflow-tooltip
                  :render-header="companyRenderHeader"
                  :formatter="formater2"
                  >
                </el-table-column>
                <el-table-column
                  v-if="tableDataSec.activeMerchantRate[0]"
                   prop="activeMerchantRate"
                  label="万元毛利率%"
                  sortable
                  show-overflow-tooltip
                  :render-header="companyRenderHeader"
                  :formatter="formater3"
                  >
                </el-table-column>
            </el-table>
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
import qs from 'qs'
import KycAndHyCheckbox from '../zymCommon/kycAndHyCheckbox.vue'
import TableSelect from '../tableSelect/tableSelect.vue'
var loadingTicket,myChart
var rotate = 0
export default {
   name:'收单毛利商户数情况统计',
   computed:{
     maxjjj100:function(){
      if(this.form.jjj.split(',').length > 100){
        return this.form.jjj.split(',').length = 100
      }
     },
     maxMerchantNo100:function(){
      return this.form.merchantNo.split(',').length < 100
      if(this.form.merchantNo.split(',').length > 100){
        return this.form.jjj.split(',').length = 100
      }
     }
   },
  data(){
      return{
         end: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        authsearch:false,
        authdownload:false,
        currenteveryno:20,//每页10条
        kycshow:false,
        tableDataSec:{  //控制列显示
          dateStr:[true,'时间'],
          tagType:[true,'数据维度一级'],
          kycResult:[true,'数据维度二级'],
          activeMerchantRate:[true,'万元毛利率%']
        },
        tableData: [ ],
        serchToggle:true,//行业业绩属性
      form:{
        beginDateStr:'',
        endDateStr:'',
        merchantNo:'',
        branchName:'',
        cType:'kyc',
        dateType:'day',
        heapTypes:''
      },
      ids:[],
      select:{
        kycCognizance: "全部",
        dataTag:'kyc',
        childTag: [-1],
      },
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
     this.form.beginDateStr = this.getdiffTime(-7)
    this.form.endDateStr = this.getdiffTime(-1)
    this.getMerchantFirst() //获取商户自然属性一级
    this.getIndustryAchievementProperty() //获取 行业业绩属性
    this.query()
  },
  methods:{
    getLdData(){  //数据维度联动
      this.select.dataTag = this.form.cType  //赋值
      this.select.kycCognizance = '全部'
    },
    changeTime(val){
      this.pageNumber = 1
      this.query()
    },
    clearData(){
       option.xAxis[0].data = []//时间
          option.series[0].data =[] //成功交易额(yi yuan)
          option.series[1].data = [] //成功欺诈额(万元)
          option.series[2].data = [] //拦截欺诈额(万元)
          option.series[3].data = [] //欺诈损失率(BP)
          option.series[4].data = [] //金额覆盖率(%)
    },
    query(){  //查询
      this.getTable(1)
      this.getChartData()
      // this.drawLine()
    },
    queryAuthList(){  //权限管理
         var self = this
      var arr = localStorage.getItem('ARRLEVEL')?localStorage.getItem('ARRLEVEL'):[]
        JSON.parse(arr).map(function(ele){
            switch(ele){
                case 188 || 226:
                    self.authsearch= true
                break;
                case 189:
                    self.authdownload= true
                break;
            }
        })
    },
    getChartData(){  //统计图
      var self = this
      var params =  this.form
        params.pageNumber= this.pageNumber
        params.pageRow= this.pageRow
      this.$axios.post('/report/million/queryChart',qs.stringify(params)).then(res => {
        var response = res.data
        if(response.code == '200'){
          if(JSON.stringify(response.data.millionAmount) == "{}"){
            self.clearData()
            this.drawLine()
            return false
          }
          option.series = [] //清空
            option.legend.data = [] //清空
            option.xAxis[0].data = response.data.times  //时间轴
            var ms = response.data.millionAmount
            var index0 = -1
            for(var ele in ms){  //收单金额堆积效果
              index0++
              option.legend.data.push(ele)
              var seriesItem = {
                name: ele,
                type: 'line',
                barMaxWidth: 10,
                data: ms[ele],
                itemStyle:{
                    normal:{
                        color:color[index0]  //改变颜色
                    }
                }
              }
              option.series.push(seriesItem)
            }
            this.drawLine();
        }else{
          this.$message.error({message:response.msg,center: true});
        }
      }) 
    },
    getTable(page){   //统计表
      var params =  this.form
      params.pageNumber= page
      params.pageRow= this.pageRow
      params.heapTypes = this.select.kycCognizance == '全部'? 'all' : this.select.kycCognizance
      this.$axios.post('/report/million/queryList',qs.stringify(params)).then(res => {
        var response = res.data
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
  
    downloadList() {//是否下载
        var self = this
        window.location = this.url+"/report/million/download?" + qs.stringify(self.form)
    },
    drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
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
   
    handleCurrentChange(val) {  //处理当前页
         this.pageNumber = `${val}`  //当前页
         this.getTable(val)
    },
    formater1(row, column){
      return row.tagType
    },
    formater2(row, column){
      return row.kycResult
    },
     formater3(row, column){
      return this.addCommas(Number(row.activeMerchantRate).toFixed(2))
    }
   
  },
  components:{
    TableSelect,KycAndHyCheckbox
  }
}
var color= ['#c49d97','#7a8d76','#eac0ac','#eac0ac','#8f8a7d','#faeacc','#818597','#aa8c8c','#91859c','#8f8d7e','#ea8f6a','#809668','#f7e3bf','#8ab483','#b2969c','#d0b7f5']
const option = {
  title: {
    x:'center',
    text: ''
    },
  tooltip: {
        trigger: 'axis',
    },
    toolbox: {
        show : true,
        feature : {
            saveAsImage : {show: true}
        }
    },
    grid:{
      x2:40,
    },
    legend: {
        y:'30px',
        x:'center',
        data:[]
    },
    xAxis: [
        {
          splitLine:{show: false},//去除网格线
          type: 'category',
          data: [],
          axisLabel:{
              rotate: 30,
              show: true,
              interval: 'auto'
          },
          axisTick: {
                show: true,     //设置x轴上标点显示
                length: 10,    // 设置x轴上标点显示长度
                lineStyle: {     //设置x轴上标点显示样式
                    color: '#ddd',
                    width: 1,
                    type: 'solid'
                }
          }
        }
    ],
    yAxis: [
        {
          type: 'value',
          splitNumber:5,
          axisLabel: {
              formatter: '{value}%'
          }
        }
    ],
    series: [
        // {
        //   symbol: "none",// 去掉折线上面的小圆点
        //   name:'收单交易金额占比1',
        //   data:[30,50],
        //   type: 'line',
        //   itemStyle:{
        //       normal:{
        //           color:color[0]  //改变珠子颜色
        //       }
        //   }
        // } 
    ]
}
</script>
<style scoped>
/*商户自然属性一级 start*/

.el-checkbox{margin-left: 10px;}
.el-checkbox-group{width:100px;}
 
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
    padding-top: 10px;
    padding-bottom: 10px;
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
