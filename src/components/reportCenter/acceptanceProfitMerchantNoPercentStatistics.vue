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
                                <el-form-item label="时间刻度:" prop="dateType">
                                    <el-radio-group v-model="form.dateType" @change="changeTime">
                                      <el-radio label="day">日</el-radio>
                                      <el-radio label="month">月</el-radio>
                                      <el-radio label="week">周</el-radio>
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
                                <el-form-item label="分公司:" prop="branchCompany">
                                   <el-input v-model="form.branchCompany" :maxlength="maxMerchantNo100" placeholder="请输入" ></el-input>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="商户编号:" prop="customerNumber">
                                   <el-input v-model="form.customerNumber" :maxlength="maxMerchantNo100" placeholder="请输入" ></el-input>
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
            <div class="pr">
              <span style="color:#FBE9D5;font-size:10px;position:absolute;right:7%;">友情提示:&nbsp;&nbsp;</i><i style="color:#B7C6B3;font-style:normal;">柱子1: </i>收单交易金额占比 &nbsp; &nbsp;<i style="color:#B7C6B3;font-style:normal;">柱子2: </i>毛利占比&nbsp; &nbsp;<i style="color:#B7C6B3;font-style:normal;">柱子3: </i>商户数占比</span>
              <div id="myChart" class="center" :style="{width: '100%', height: '400px'}"></div>

            </div>
            <!-- 表格 -->
            <el-table
            fixed 
               max-height="600"
              class="pb30"
               border
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
              
              </el-table-column>
              <el-table-column
                prop="receiptAmountRate"
                v-if="tableDataSec.receiptAmountRate[0]"
                 sortable
                show-overflow-tooltip
                :render-header="companyRenderHeader"
                :formatter="formater5"
                label="收单交易金额（亿）"
                >
              </el-table-column>
              <el-table-column
                prop="grossProfitRate"
                label="毛利（万）"
                v-if="tableDataSec.grossProfitRate[0]"
                 sortable
                show-overflow-tooltip
                :render-header="companyRenderHeader"
                :formatter="formater6"
                >
              </el-table-column>  
               <el-table-column
                prop="activeMerchantRate"
                label="活跃商户数"
                v-if="tableDataSec.activeMerchantRate[0]"
                 sortable
                show-overflow-tooltip
                :render-header="companyRenderHeader"
                :formatter="formater7"
                >
              </el-table-column>
            </el-table>
        </div>
        <!-- 表格每列的列选择 注意：每页都需要手动改变top值-->
        <div ref="list" class="list pa none bgccc" style="top:860px;">
          <TableSelect  :tableDataSec="tableDataSec" ></TableSelect>
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
      return this.form.customerNumber.split(',').length < 100
      if(this.form.customerNumber.split(',').length > 100){
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
         isProduct: true,
        onepropertySelect: [],//商户自然一级属性
        isIndeterminate: true,
        tableDataSec:{  //控制列显示
          dateStr:[true,'时间'],
          tagType:[true,'数据为度一级'],
          kycResult:[true,'数据为度二级'],
          receiptAmountRate:[true,'”收单交易金额占比'],
          grossProfitRate:[true,'毛利占比'],
          activeMerchantRate:[true,'活跃商户数占比']
        },
        tableData: [ ],
        serchToggle:true,//行业业绩属性query
      form:{
        beginDateStr:'',
        endDateStr:'',
        customerNumber:'',
        branchCompany:'',
        cType:'kyc',
        dateType:'day',
        heapTypes: ''
      },
      ids:[],
      select:{
        kycCognizance: "全部",
        dataTag:'kyc',
        childTag: [-1],
      },
      product:'',
       currentPage:1,// 分页
       pageNumber:1,
       pageRow:20,
       length:0    
    }
  },
  watch: {
      'select.dataTag': function (val) {
          this.select.childTag = [-1]
          this.ids = []
          this.select.childTagName = '全部'
      }
  },
  created(){
     this.queryAuthList()
  },
  mounted(){
    this.form.beginDateStr = this.getdiffTime(-11)
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
      option.xAxis[0].data = [' ']//时间
      option.series =[] //成功交易额(yi yuan)
      option.legend.data = [] //成功欺诈额(万元)
    },
    query(){  //查询
      this.getTable()
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
    getPara(flag){
        var self = this,dateType,dateCount
        if(flag == '1'){
            dateType = 'day'
            dateCount = 14
          }else if(flag == '2'){
            dateType = 'week'
            dateCount = 8
          }else if(flag == '3'){
            dateType = 'month'
            dateCount = 6
          }
          return {
            "branchName":self.$route.params.branchCompany,  //商户唯一标识
            "dateType":dateType,
            "dateCount":dateCount,
          }
      },
      getChartData(id,flag,targ){  //商户交易毛利欺诈情况
        var self = this
        if(targ){
          var otarg = targ.target
          this.clickActive(otarg)
          otarg.classList.add('active')
        }
        var params =  this.form
        params.pageNumber= this.pageNumber
        params.pageRow= this.pageRow
        params.heapTypes = this.select.kycCognizance == '全部'? 'all' : this.select.kycCognizance
        this.$axios.post('/report/businessRate/queryChart',qs.stringify(params)).then(res => {
          var response = res.data

          if(response.code == '200'){

            if(JSON.stringify(response.data.receiptAmount) == "{}"){
              self.clearData()
              self.drawLine()
              return false
            }

            option.series = [] //清空
            option.xAxis[0].data = response.data.times  //时间轴
            var ms = response.data.receiptAmount
            var index0 = -1
            for(var ele in ms){  //收单金额堆积效果
              index0++
              var seriesItem = {
                name: ele,
                type: 'bar',
                barMaxWidth: 10,
                stack: 'money1',
                data: ms[ele],
                itemStyle:{
                    normal:{
                        color:color[index0]  //改变颜色
                    }
                }
              }
              option.series.push(seriesItem)
            }
            var ps = response.data.grossProfit
            var index1 = -1
            for(var ele in ps){  //毛利堆积效果
              index1++
              var seriesItem = {
                name: ele,
                type: 'bar',
                barMaxWidth: 10,
                stack: 'money2',
                data: ps[ele],
                itemStyle:{
                    normal:{
                        color:color[index1]  //改变颜色
                    }
                }
              }
              option.series.push(seriesItem)
            }
            var merno = response.data.activeMerchant
            var index2 = -1
            for(var ele in merno){  //毛利堆积效果
              index2++
              var seriesItem = {
                name: ele,
                type: 'bar',
                barMaxWidth: 10,
                stack: 'money3',
                data: ps[ele],
                itemStyle:{
                    normal:{
                        color:color[index1]  //改变颜色
                    }
                }
              }
              option.series.push(seriesItem)
            } 
            self.drawLine() 
          }else{
            this.$message.error({message:response.msg,center: true});
          }
        })
      },
      clearData(){
        option.xAxis[0].data = []//时间
        option.series[0].data =[] // 
        option.series[1].data = [] // 
      },
    getTable(){   //统计表
      var params =  this.form
      params.pageNumber= this.pageNumber
      params.pageRow= this.pageRow
      params.heapTypes = this.select.kycCognizance == '全部'? 'all' : this.select.kycCognizance
      
      this.$axios.post('/report/businessRate/queryList',qs.stringify(params)).then(res => {
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
    isShow(val){
        this.form.KYC= val.submitData
        this.kycshow = val.onepropertySelectshow
    },
    addproperty(){//增加商户自然一级属性
      this.kycshow = true
    },
    downloadList() {//是否下载
        // var params =  this.form  //入参
        var self = this
        window.location = this.url+"/report/businessRate/download?" + qs.stringify(self.form)
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
         this.getTable()
    },
    formater1(row, column){
      return row.tagType.toLocaleString()
    },
    formater2(row, column){
      return row.kycResult.toLocaleString()
    },
     
     formater5(row, column){
      return this.addCommas(Number(row.receiptAmountRate).toFixed(2))
    },
     formater6(row, column){
      return this.addCommas(Number(row.grossProfitRate).toFixed(2))
    },
     formater7(row, column){
      return this.addCommas(Number(row.activeMerchantRate).toFixed(2))
    }
   
  },
  components:{
    TableSelect,KycAndHyCheckbox
  }
}
var color= ['#E0CDD1','#FBEBDC','#788A72','#C8B8A9','#C8B8A9','#D6D4C8','#F2EEED','#FBE8DA','#FBE8DA','#B7C6B3','#A47C7C','#C2C8D8','#7A7385','#E0CDD3','#B3B1A4','#A0A5BB','#D7C9AF',]
const option = {
  title: {
    x:'center',
    text: ''
    },
  tooltip: {
        trigger: 'item',
        // formatter:function (params) {
        //  function addCommas(nStr){  //每三位分隔符
        //      nStr += '';
        //      var x = nStr.split('.');
        //      var x1 = x[0];
        //      var x2 = x.length > 1 ? '.' + x[1] : '';
        //      var rgx = /(\d+)(\d{3})/;
        //      while (rgx.test(x1)) {
        //       x1 = x1.replace(rgx, '$1' + ',' + '$2');
        //      }
        //      return x1 + x2;
        //   }
        //   var str0=''
        //   var str=''
        //   params.map(function(item,index){
        //     str0=item[1]+'\<br>'
        //     str+=item[0]+': '
        //     if(index==0 || index==1 || index==2 || index==3){
        //       str+=addCommas(Number(item[2]).toFixed(2))+'\<br>'
        //     }
        //     if(index==4){
        //       str+=Number(item[2]).toFixed(2)+'\<br>'
        //     }
            
        //   })
        //   return str0+str
        // }
    },
    toolbox: {
        show : true,
        feature : {
            saveAsImage : {show: true}
        }
    },
    grid:{
      x2:100,
    },
    legend: {
        y:'30px',
        x:'center',
        data:[] //'收单交易金额占比1','收单交易金额占比2','收单交易金额占比3','毛利占比','活跃商户数1','活跃商户数2'
    },
    xAxis: [
        {
          splitLine:{show: false},//去除网格线
          type: 'category',
          data: ['08/01','08/01'],
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
          name: '100',
          splitNumber:5,
          axisLabel: {
              formatter: '{value}%'
          }
        }
    ],
    series: [
        // {
        //   symbol: "none",// 去掉折线上面的小圆点
        //   barMaxWidth:20,
        //   name:'收单交易金额占比1',
        //   type:'bar',
        //   data:[30,50],
        //   stack:'stack1',
        //   itemStyle:{
        //       normal:{
        //           color:color[0]  //改变珠子颜色
        //       }
        //   }
        // },
        // {
        //   symbol: "none",// 去掉折线上面的小圆点
        //   barMaxWidth:20,
        //   name:'收单交易金额占比2',
        //   type:'bar',
        //   data:[30,25],
        //   stack:'stack1',
        //   itemStyle:{
        //       normal:{
        //           color:color[1]  //改变珠子颜色
        //       }
        //   }
        // },
        // {
        //   symbol: "none",// 去掉折线上面的小圆点
        //   barMaxWidth:20,
        //   name:'收单交易金额占比3',
        //   type:'bar',
        //   data:[40,25],
        //   stack:'stack1',
        //   itemStyle:{
        //       normal:{
        //           color:color[2]  //改变珠子颜色
        //       }
        //   }
        // },
        // {
        //   symbol: "none",// 去掉折线上面的小圆点
        //   barMaxWidth:20,
        //   name:'毛利占比',
        //   type:'bar',
        //   data:[100,100],
        //   stack:'stack2',
        //   itemStyle:{
        //     normal:{
        //         color:color[0]  //改变珠子颜色
        //     }
        //   }
        // },
        // {
        //   symbol: "none",// 去掉折线上面的小圆点
        //   barMaxWidth:20,
        //   name:'商户数占比1',
        //   type:'bar',
        //   data:[50,70],
        //   stack:'stack3',
        //   itemStyle:{
        //     normal:{
        //         color:color[0]  //改变珠子颜色
        //     }
        //   }
        // },
        // {
        //   symbol: "none",// 去掉折线上面的小圆点
        //   barMaxWidth:20,
        //   name:'商户数占比2',
        //   type:'bar',
        //   data:[50,30],
        //   stack:'stack3',
        //   itemStyle:{
        //     normal:{
        //         color:color[1]  //改变珠子颜色
        //     }
        //   }
        // }
    ]
}
</script>
<style scoped>
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
