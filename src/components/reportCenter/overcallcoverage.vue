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
                        <el-form ref="form" :model="form" label-width="134px" class="demo-ruleForm">
                            <div class="formConClass">
                                <el-form-item label="时间刻度:" prop="timeType">
                                    <el-radio-group v-model="form.timeType" @change="timeChange">
                                      <el-radio label="1">月</el-radio>
                                      <el-radio label="2">周</el-radio>
                                      <el-radio label="3">天</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="统计维度:" prop="tag">   
                                    <el-select v-model="form.tag" placeholder="请选择" style="width: 90%;max-width:225px;">
                                      <el-option
                                            v-for="item in weiduArray"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="开始时间:" prop="startTime">
                                    <el-date-picker  v-model="form.startTime" value-format="yyyy-MM-dd" :picker-options="end" type="date" placeholder="选择日期时间" style="width: 90%;max-width:225px;"></el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="结束时间:" prop="endTime">
                                    <el-date-picker  v-model="form.endTime" value-format="yyyy-MM-dd" :picker-options="end" type="date" placeholder="选择日期时间" style="width: 90%;max-width:225px;"></el-date-picker>
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
            <div id="myChart" class="center" :style="{width: '1000px', height: '400px'}"></div>
          
            <!-- 表格 -->
              <el-table style="width:auto !important;"
               border
               fixed 
               max-height="600"
              :data="tableData">
              <el-table-column
                v-if="tableDataSec.times[0]"
                prop="times"
                label="时间"
                sortable
                show-header
                show-overflow-tooltip
                width="200"
                :render-header="companyRenderHeader"
              >
              </el-table-column>
              <el-table-column
                v-if="tableDataSec.warningCount[0]"
                prop="warningCount"
                label="报警量"
                sortable
                show-overflow-tooltip
                width="200"
                :render-header="companyRenderHeader"
                :formatter="formater1"
                >
              </el-table-column>
              <el-table-column
                v-if="tableDataSec.outboundCount[0]"
                prop="outboundCount"
                label="外呼量"
                width="200"
                 sortable
                show-overflow-tooltip
                :formatter="formater2"
                :render-header="companyRenderHeader"
                >
              </el-table-column>
              <el-table-column
                v-if="tableDataSec.effeOutboundCount[0]"
                prop="effeOutboundCount"
                label="有效外呼量"
                width="220"
                 sortable
                show-overflow-tooltip
                :formatter="formater3"
                :render-header="companyRenderHeader"
                >
              </el-table-column>
              <el-table-column
                v-if="tableDataSec.coverRate[0]"
                prop="coverRate"
                label="外呼覆盖率%"
                width="210"
                 sortable
                show-overflow-tooltip
                :render-header="companyRenderHeader"
                :formatter="formater4"
                >
              </el-table-column>
              <el-table-column
                v-if="tableDataSec.effectiveCoverRate[0]"
                prop="effectiveCoverRate"
                label="有效外呼覆盖率%"
                width="200"
                 sortable
                show-overflow-tooltip
                :render-header="companyRenderHeader"
                :formatter="formater5"
                >
              </el-table-column>
              
            </el-table>
            <div class="block mb30">   <!-- 分页开始 -->
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
                  layout="total,prev, pager, next"
                  :page-sizes="[10,20,30,40]"
                  :page-size="Number(currenteveryno)"
                  :total=length
                  @current-change="handleCurrentChange">
                 </el-pagination>
              </div>
            </div>
            <!-- 分页结束 -->
        </div>
        <!-- 表格每列的列选择 注意：每页都需要手动改变top值-->
        <div ref="list" class="list pa none bgccc" style="top:860px;">
          <TableSelect  :tableDataSec="tableDataSec" ></TableSelect>
        </div>
        
         
    </div>
</template>
<script>
import qs from 'qs'
import TableSelect from '../tableSelect/tableSelect.vue'
var loadingTicket,myChart
export default {
  name:'外呼覆盖率统计',
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
        tableDataSec:{  //控制列显示  key和table prop一致
          times:[true,'时间'],
          warningCount:[true,'报警量'],
          outboundCount:[true,'外呼量'],
          effeOutboundCount:[true,'有效外呼量'],
          coverRate:[true,'外呼覆盖率'],
          effectiveCoverRate:[true,'有效外呼覆盖率']
        },
        tableData: [],
        weiduArray:[],
        serchToggle:true,
          form:{
            startTime:'',
            endTime:'',
            tag:'1',
            timeType:'1'
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
     this.form.startTime = this.getNaturalMonth(-1).tYear+'-'+this.getNaturalMonth(-1).tMonth+'-'+'01'
    this.form.endTime =this.getNaturalMonth(-1).tYear+'-'+this.getNaturalMonth(-1).tMonth+'-'+this.getNaturalMonth(-1).tDate
    this.getweidu();  //统计维度
    this.query();
  },
  methods:{
    timeChange(val){
      this.pageNumber = 1
      this.query()
    },
    clearData(){
      option.xAxis[0].data =  []
      option.xAxis[1].data =  []
      option.series[0].data = []  //外呼量
      option.series[1].data = [] //未外呼量
      option.series[2].data = [] //外呼覆盖率
      option.series[3].data = [] //有效外呼覆盖率
    },
    query(){  //查询
      this.getTable()
      this.getChartData()
    },
    queryAuthList(){  //权限管理
         var self = this
      var arr = localStorage.getItem('ARRLEVEL')?localStorage.getItem('ARRLEVEL'):[]
        JSON.parse(arr).map(function(ele){
            switch(ele){
                case 194 || 230:
                    self.authsearch= true
                break;
                case 195:
                    self.authdownload= true
                break;
            }
        })
    },
    getChartData(){  //统计图
      var self = this
      var newp = this.addSessionId(self.form)
      this.$axios.post('/report/getOutboundCoverFreqP',qs.stringify(newp)).then(res => {
        var response = res.data
        if(response.code == '200'){
          if(JSON.stringify(response.data) == "{}"){
            self.clearData()
            this.drawLine()
            return false
          }
          option.xAxis[0].data =  response.data.times
          if(response.data.times.length < 66){
            option.xAxis[0].axisLabel.interval=0
          }else{
            option.xAxis[0].axisLabel.interval=1
          }
          option.xAxis[1].data =  response.data.times
          option.series[0].data = response.data.outboundCount  //外呼量
          option.series[1].data = response.data.notOutboundCount //未外呼量
          option.series[2].data = response.data.coverRate //外呼覆盖率
          option.series[3].data = response.data.effeCoverRate //有效外呼覆盖率
          this.drawLine();
        }else{
          this.$message.error({message:response.msg,center: true});
        }
      }) 
    },
    getTable(){   //统计表
      var params =  this.form
      params.pageNumber= this.pageNumber
      params.pageRow= this.pageRow
      var newp = this.addSessionId(params)
      this.$axios.post('/report/getOutboundCoverFreqR',qs.stringify(newp)).then(res => {
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
        var newp = this.addSessionId(self.form)
        window.location = this.url+"/reportExcel/getOutboundCoverFreqRExcel?" + qs.stringify(newp)
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
    handleSizeChange() {  //更改页数
        this.pageRow = this.currenteveryno
        this.getTable()
    },
    handleCurrentChange(val) {  //处理当前页
         this.pageNumber = `${val}`  //当前页
         this.getTable()
    },
    formater1(row, column){
      return row.warningCount.toLocaleString()
    },
    formater2(row, column){
      return row.outboundCount.toLocaleString()
    },
    formater3(row, column){
      return row.effeOutboundCount.toLocaleString()
    },
    formater4(row, column){
      return row.coverRate.toLocaleString()
    },
    formater5(row, column){
      return row.effectiveCoverRate.toLocaleString()
    }
  },
  components:{
    TableSelect
  }
}

var option = {
    title : {
        text: '外呼覆盖率统计',
         x: 'center'
    },
    tooltip : {
        trigger: 'axis',
        formatter:function (params) {
          function get(num) {
              num = num.toString().split('').reverse().join('')
              return num.match(/\d{1,3}/g).join(',').split('').reverse().join('')
          }
          var str0=''
          var str=''
          params.map(function(item,index){
            str0=item[1]+'\<br>'
            str+=item[0]+': '
            if(index==0 || index==1){
              str+=get(item[2])+'\<br>'
            }
            if(index==2 || index==3){
              str+=item[2].toFixed(2)+'%\<br>'
            }
          })
          return str0+str
        }
    },
    legend: {
        data: [ '外呼量', '未外呼量','外呼覆盖率','有效外呼覆盖率'],
         y:'38px'
    },
     brush: {
        toolbox: ['rect', 'polygon', 'lineX', 'lineY', 'keep', 'clear'],
        xAxisIndex: 0
    },
    toolbox: {
        show : true,
        feature : {
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    grid: {
      y: 70,
      y2: 160,// y2可以控制 X轴跟Zoom控件之间的间隔，避免以为倾斜后造成 label重叠到zoom上  控制x轴刻度线高度
    },
    xAxis : [
        {
          splitLine:{show: false},//去除网格线
            type : 'category',
            data : [''],
            axisLabel: {  
             interval:0,  
             rotate:75 
            }
        },
        {

            type : 'category',
            axisLine: {show:false},
            axisTick: {show:false},
            axisLabel: {show:false},
            splitArea: {show:false},
            splitLine: {show:false},
            data : ['']
        }
    ],
    yAxis :[
        {
          splitNumber:4,
          inverse: 50,
          splitArea: {show: false}
        },
        {
          splitNumber:4,
          type: 'value',
          name: '覆盖率',
          axisLabel: {
              formatter: '{value}%'
          }
        }
    ] ,
    series: [
        {
           barMaxWidth :36,
            name: '外呼量',
            type: 'bar',
            stack: 'two',
            itemStyle:{ normal: {
               label:{show:true,position:'insideRight'},
               color:'#0070c0'
            }},
            data:[]
        },
        {
           barMaxWidth :36,
            name: '未外呼量',
            type: 'bar',
            stack: 'two',
            itemStyle: {normal: {
               label:{show:true,position:'insideRight'},
               color:'#b4c7e7'
            }},
            data: []
        },
         {
          symbol: "none",// 去掉折线上面的小圆点
            name:'外呼覆盖率',
            type:'line',
            itemStyle: {normal: {
               color:'#607fc8'
            }},
            yAxisIndex: 1,
            data:[]
        },
        {
          symbol: "none",// 去掉折线上面的小圆点
            name:'有效外呼覆盖率',
            type:'line',
             itemStyle: {normal: {
               color:'#9f9f9f'
            }},
            yAxisIndex: 1,
            data:[]
        }
    ]
};

</script>

<style scoped>
.el-table::before{height:0px;}
.el-table--border{border:0px;}
.circle{width:30px;height:30px;border-radius: 50%;display: inline-block;}
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
.iconbox{
  right:34px;
  color:#3FAAF9;
}
.iconbox .el-icon-arrow-down:before{ color:#3FAAF9;font-weight: 700;}
.el-table::before{background-color:#ddd;}
/*商户自然属性一级 end*/
.bgccc{background: #f5f6fa;}
.center{margin:0 auto;}
.el-table--border{border-right:1px solid #fff;}
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
    width: 76%;
    height: auto;
    display: inline-block;
}

.rightContent1{
	color:white;
    display: inline-block;
    vertical-align: top;
    margin-top:20px;
}
.formConClass{
    display: inline-block;
    width: 48%;
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
