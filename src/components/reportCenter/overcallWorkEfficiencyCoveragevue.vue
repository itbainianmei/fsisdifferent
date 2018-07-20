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
                        <el-form ref="form" :model="form" label-width="116px" class="demo-ruleForm">
                            
                            <div class="formConClass">
                                <el-form-item label="开始时间:" prop="startTime">
                                    <el-date-picker  v-model="form.startTime" value-format="yyyy-MM-dd" :picker-options="end" type="date" placeholder="选择日期时间" style="width: 60%;"></el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="结束时间:" prop="endTime">
                                    <el-date-picker  v-model="form.endTime" value-format="yyyy-MM-dd" :picker-options="end" type="date" placeholder="选择日期时间" style="width: 60%;"></el-date-picker>
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
            <div id="myChart" class="center" :style="{width: '1200px', height: '440px'}"></div>
          
            <!-- 表格 -->
              <el-table style="width:auto !important;"
              fixed 
               max-height="600"
              :default-sort = "{prop: 'outboundCardListP,outboundCheckListNumber', order: 'descending'}"
               border
              :data="tableData">
              <el-table-column
                v-if="tableDataSec.person[0]"
                prop="person"
                label="外呼人员"
                sortable
                show-header
                show-overflow-tooltip
                width="250"
                :render-header="companyRenderHeader"
              >
              </el-table-column>
              <el-table-column
                v-if="tableDataSec.outboundCheckListNumber[0]"
                prop="outboundCheckListNumber"
                label="外呼核查单处理量"
                sortable
                show-overflow-tooltip
                width="250"
                :render-header="companyRenderHeader"
                :formatter="formater1"
                >
              </el-table-column>
              <el-table-column
                v-if="tableDataSec.outboundCheckListP[0]"
                label="外呼核查单处理量占比%"
                prop="outboundCheckListP"
                width="250"
                 sortable
                show-overflow-tooltip
                :render-header="companyRenderHeader" 
                >
                <!--  <template slot-scope="scope" >
                   {{typeof scope.row.outboundCheckListP}}
                 </template> -->
              </el-table-column>
              <el-table-column
                v-if="tableDataSec.outboundIdCardNumber[0]"
                label="外呼身份证处理量"
                 prop="outboundIdCardNumber"
                width="240"
                 sortable
                show-overflow-tooltip
                :render-header="companyRenderHeader"
                :formatter="formater2"
                >
              </el-table-column>
              <el-table-column
                v-if="tableDataSec.outboundCardListP[0]"
                 prop="outboundCardListP"
                label="外呼身份证处理量占比%"
                width="240"
                 sortable
                show-overflow-tooltip
                :render-header="companyRenderHeader"
                >
<!--    <template slot-scope="scope" >
                   {{typeof scope.row.outboundCardListP}}
                 </template> -->
              </el-table-column>
             
              
            </el-table>
            <div class="mt10 mb30">   <!-- 分页开始 -->
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
  name:'外呼工作效率统计表',
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
          person:[true,'外呼人员'],
          outboundCheckListNumber:[true,'外呼核查单处理量'],
          outboundCheckListP:[true,'外呼核查单处理量占比'],
          outboundIdCardNumber:[true,'外呼身份证处理量'],
          outboundCardListP:[true,'外呼身份证处理量占比']
        },
        tableData: [],
        serchToggle:true,
          form:{
            startTime:'',
            endTime:''
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
    this.form.startTime = this.getdiffTime(-8) 
    this.form.endTime = this.getdiffTime(-1) 
    // this.form.startTime = '2018-05-01'
    // this.drawLine();
    this.query();
  },
  methods:{
    clearData(){
      option.xAxis[0].data = []
      option.xAxis[1].data = []
      option.series[0].data = []  //外呼核查单处理量
      option.series[1].data = [] //外呼核查单处理量占比
      option.series[2].data = [] //外呼身份证处理量
      option.series[3].data = [] //外呼身份证处理量占比
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
                case 186 || 225:
                    self.authsearch= true
                break;
                case 187:
                    self.authdownload= true
                break;
            }
        })
    },
    getChartData(){  //统计图
      var self = this
      var newp = this.addSessionId(self.form)
      this.$axios.post('/report/getOutboundP',qs.stringify(newp)).then(res => {
        var response = res.data
        if(response.code == '200'){
          if(JSON.stringify(response.data) == "{}"){
            self.clearData()
            this.drawLine()
            return false
          }
          option.xAxis[0].data =  response.data.person
          if(response.data.person.length < 66){
            option.xAxis[0].axisLabel.interval=0
          }else{
            option.xAxis[0].axisLabel.interval=1
          }
          option.xAxis[1].data = response.data.person
          option.series[0].data = response.data.outboundCheckListNumber  //外呼核查单处理量
          option.series[1].data = response.data.outboundCheckListP //外呼核查单处理量占比
          option.series[2].data = response.data.outboundIdCardNumber //外呼身份证处理量
          option.series[3].data = response.data.outboundCardListP //外呼身份证处理量占比
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
      this.$axios.post('/report/getOutboundR',qs.stringify(newp)).then(res => {
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
        window.location = this.url+"/reportExcel/getOutboundRExcel?" + qs.stringify(newp)
    },
    drawLine(){
        // 基于准备好的dom，初始化echarts实例
         myChart = this.$echarts.init(document.getElementById('myChart'))
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
            effectOption: {backgroundColor: 'rgba(0, 0, 0, 0.02)'}
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
      return row.outboundCheckListNumber.toLocaleString()
    },
    formater2(row, column){
      return row.outboundIdCardNumber.toLocaleString()
    }
  },
  components:{
    TableSelect
  }
}

var option = {
    title : {
        text: '外呼工作效率统计',
         x: 'center'
    },
    tooltip : {
        trigger: 'axis',
        formatter:function (params) {
           function get(num) {
              num = num.split('').reverse().join('')
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
              str+=item[2]+'%\<br>'
            }
          })
          return str0+str
        }
        
    },
    legend: {
        data: [ '外呼核查单处理量', '外呼核查单处理量占比','外呼身份证处理量','外呼身份证处理量占比'],
         y:'38px'
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
          data :  ['xx'],
          axisLabel: {  
           interval:0,  
           rotate:75 ,
          }
        },
        {
            type : 'category',
            axisLine: {show:false},
            axisTick: {show:false},
            axisLabel: {show:false},
            splitArea: {show:false},
            splitLine: {show:false},
            data : ['xx']
        }
    ],
    yAxis :[
        {
          splitNumber:4,
          type: 'value',
          name: '外呼处理量',
          splitArea: {show: false}
        },
        {
          type: 'value',
          name: '外呼处理占比',
          splitNumber:4,
          axisLabel: {
              formatter: '{value}%'
          }
        }
    ] ,
    series: [
        {
            barMaxWidth:36,
            name: '外呼核查单处理量',
            type: 'bar',
            stack: 'two',
            itemStyle:{ normal: {
               label:{show:true,position:'insideRight'},
               color:'#0070c0'
            }},
            data:[2,1,12]
        },
        {
          symbol: "none",// 去掉折线上面的小圆点
            name:'外呼核查单处理量占比',
            type:'line',
            itemStyle: {normal: {
               color:'#607fc8'
            }},
            yAxisIndex: 1,
            data:[4.5455,2.2727,13.6364]
        },
        {
             barMaxWidth:36,
            name: '外呼身份证处理量',
            type: 'bar',
            stack: 'two',
            itemStyle: {normal: {
               label:{show:true,position:'insideRight'},
               color:'#b4c7e7'
            }},
            data: [4,2,6]
        },
         
        {
          symbol: "none",// 去掉折线上面的小圆点
            name:'外呼身份证处理量占比',
            type:'line',
             itemStyle: {normal: {
               color:'#9f9f9f'
            }},
            yAxisIndex: 1,
            data:[3.2520,1.6260,2.4390]
        }
    ]
};

</script>

<style scoped>
.el-table--border{border:none;}
.el-table::before{height:0px;}
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
    /*padding-bottom: 20px;*/
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
    /*width: 18%;
    height: 118px;
    float: right;*/
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
