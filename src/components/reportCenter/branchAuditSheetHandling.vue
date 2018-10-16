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
                                <el-form-item label="开始时间:" prop="startTime">
                                    <el-date-picker  v-model="form.startTime" :picker-options="end" value-format="yyyy-MM-dd"
                                     type="date" placeholder="选择日期时间" style="width: 90%;max-width:225px;" :clearable="false" :editable="false"></el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="结束时间:" prop="endTime">
                                    <el-date-picker  v-model="form.endTime" value-format="yyyy-MM-dd" :picker-options="end" type="date" placeholder="选择日期时间" style="width: 90%;max-width:225px;" :clearable="false" :editable="false"></el-date-picker>
                                </el-form-item>
                            </div>
                        </el-form>
                    </div>
                    <div class="rightContent">
                        <el-button type="primary" class="serchbtn" v-show="authsearch" icon="el-icon-search" @click='query'>查询</el-button>
                        <el-button type="primary" class="serchbtn" v-show="authdownload" icon="el-icon-refresh" @click='downloadList'>下载</el-button>
                    </div>
                </div>
            </el-collapse-transition>
             <!-- 图表 -->
            <div id="myChart" class="center" :style="{width: '1200px', height: '400px'}"></div>

            <!-- 表格 -->
              <el-table style="width:auto !important;"
               class="mt30"
               target="main"
               border
               fixed
               max-height="600"
               :default-sort = "{prop: 'checkListTotal', order: 'descending'}"
              :data="tableData">
              <el-table-column
                v-if="tableDataSec.subCompanyName[0]"
                prop="subCompanyName"
                label="分公司"
                sortable
                show-header
                show-overflow-tooltip
                width="160"
                :render-header="companyRenderHeader"
              >
              </el-table-column>
              <el-table-column
                v-if="tableDataSec.checkListTotal[0]"
                prop="checkListTotal"
                label="核查单总数"
                sortable
                show-overflow-tooltip
                width="140"
                :render-header="companyRenderHeader"
                :formatter="formater1"
                >
              </el-table-column>
              <el-table-column
                v-if="tableDataSec.merchantCheckList[0]"
                prop="merchantCheckList"
                label="商户核查单数量"
                width="160"
                 sortable
                show-overflow-tooltip
                :render-header="companyRenderHeader"
                :formatter="formater2"
                >
              </el-table-column>
              <el-table-column
                v-if="tableDataSec.checkMerchant[0]"
                prop="checkMerchant"
                label="商户核查单处理量"
                width="180"
                 sortable
                show-overflow-tooltip
                :render-header="companyRenderHeader"
                :formatter="formater3"
                >
              </el-table-column>
              <el-table-column
                v-if="tableDataSec.checkMerchantP[0]"
                prop="checkMerchantP"
                label="商户核查单处理占比%"
                width="180"
                 sortable
                show-overflow-tooltip
                :render-header="companyRenderHeader"
                :formatter="formater6"
                >
              </el-table-column>
              <el-table-column
                v-if="tableDataSec.underlineCheckList[0]"
                prop="underlineCheckList"
                label="线下核查单数量"
                width="170"
                 sortable
                show-overflow-tooltip
                :render-header="companyRenderHeader"
                :formatter="formater4"
                >
              </el-table-column>
              <el-table-column
                v-if="tableDataSec.checkUnderline[0]"
                prop="checkUnderline"
                label="线下核查单处理量"
                width="164"
                 sortable
                show-overflow-tooltip
                :render-header="companyRenderHeader"
                :formatter="formater5"
                >
              </el-table-column>
              <el-table-column
                v-if="tableDataSec.underlineCheckP[0]"
                prop="underlineCheckP"
                label="线下核查单处理占比%"
                width="160"
                 sortable
                show-overflow-tooltip
                :render-header="companyRenderHeader"
                :formatter="formater7"
                >
              </el-table-column>
            </el-table>
            <div class="mt10 mb30">   <!-- 分页开始 -->

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
            <!-- 分页结束 -->
        </div>
        <!-- 表格每列的列选择 注意：每页都需要手动改变top值-->
        <div ref="list" class="list pa none bgccc">
          <TableSelect  :tableDataSec="tableDataSec" ></TableSelect>
        </div>
    </div>
</template>
<script>
import qs from 'qs'
import TableSelect from '../tableSelect/tableSelect.vue'
var loadingTicket,myChart
export default {
   name:'分公司核查单处理情况',
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
          subCompanyName:[true,'分公司'],
          checkListTotal:[true,'核查单总数'],
          merchantCheckList:[true,'商户核查单数量'],
          checkMerchant:[true,'商户核查单处理量'],
          checkMerchantP:[true,'商户核查单处理占比'],
          underlineCheckList:[true,'线下核查单数量'],
          checkUnderline:[true,'线下核查单处理量'],
          underlineCheckP:[true,'线下核查单处理占比']
        },
            tableData: [],

            weiduArray:[
              { //银行列表
                "label":'工商',
                "value":'ll'
              },
              {
                "label":'招商',
                "value":'hh'
              }
            ],
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
  mounted(){
    this.form.startTime = this.getdiffTime(-7)
    this.form.endTime = this.getdiffTime(0)
    // this.drawLine();
    this.query();
  },
   created(){
     this.queryAuthList()
  },
  methods:{
    clearData(){
      option.xAxis[0].data = [] //分公司
      option.xAxis[1].data = [] //分公司
      option.series[0].data = [] //商户核查单数量
      option.series[1].data = [] //线下核查单数量
      option.series[2].data = [] //商户核查单数量处理占比
      option.series[3].data = [] //线下核查单数量处理占比
    },
    query(){  //查询
      this.getTable(1)
      this.getChartData()
    },
    queryAuthList(){  //权限管理
         var self = this
        var arr = localStorage.getItem('ARRLEVEL')?localStorage.getItem('ARRLEVEL'):[]
        JSON.parse(arr).map(function(ele){
            switch(ele){
                case 196 || 231:
                    self.authsearch= true
                break;
                case 197:
                    self.authdownload= true
                break;
            }
        })
    },
    getChartData(){  //统计图
      var self = this
      var newp = this.addSessionId(self.form)
      this.$axios.post('/report/getSubCompanyP',qs.stringify(newp)).then(res => {
        var response = res.data
        if(response.code == '200'){
          if(JSON.stringify(response.data) == "{}"){
            self.clearData()
            this.drawLine()
            return false
          }
          option.xAxis[0].data = response.data.subCompanyName  //分公司
          if(response.data.subCompanyName.length < 66){
            option.xAxis[0].axisLabel.interval=0
          }else{
            option.xAxis[0].axisLabel.interval=1
          }
          option.xAxis[1].data = response.data.subCompanyName  //分公司
          option.series[0].data = response.data.merchantCheckList //商户核查单数量
          option.series[1].data = response.data.underlineCheckList //线下核查单数量
          option.series[2].data = response.data.checkMerchantP //商户核查单数量处理占比
          option.series[3].data = response.data.underlineCheckP //线下核查单数量处理占比
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
      var newp = this.addSessionId(params)
      this.$axios.post('/report/getSubCompanyR',qs.stringify(newp)).then(res => {
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
            effectOption: {backgroundColor: 'rgba(0, 0, 0, 0.05)'}
        });
    },
    downloadList() {//是否下载
        var newp = this.addSessionId(this.form)
        window.location = this.url+"/reportExcel/getSubCompanyRExcel?" + qs.stringify(newp)
    },

    handleCurrentChange(val) {  //处理当前页
         this.pageNumber = `${val}`  //当前页
         this.getTable(val)
    },
    formater1(row, column){
      return row.checkListTotal.toLocaleString()
    },
    formater2(row, column){
      return row.merchantCheckList.toLocaleString()
    },
    formater3(row, column){
      return row.checkMerchant.toLocaleString()
    },
     formater4(row, column){
      return row.underlineCheckList.toLocaleString()
    },
    formater5(row, column){
      return row.checkUnderline.toLocaleString()
    },
    formater6(row, column){
      return row.checkMerchantP.toFixed(2)
    },
    formater7(row, column){
      return row.underlineCheckP.toFixed(2)
    }
  },
  components:{
    TableSelect
  }
}

var option = {
    title : {
        text: '分公司核查单处理情况表',
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
        data: [ '商户核查单处理量', '线下核查单处理量','商户核查单处理占比','线下核查单处理占比'],
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
            data : ['xx'],
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
            data : ['xx']
        }
    ],
    yAxis :[
        {
          name: '分公司处理量',
          inverse: 50,
          splitNumber:4,
          axisLabel: {
              formatter: '{value}个'
          },
          splitArea: {show: false}
        },
        {
          type: 'value',
          name: '分公司处理占比',
          splitNumber:4,
          axisLabel: {
              formatter: '{value}%'
          }
        }
    ] ,
    series: [
        {
          barMaxWidth :36,
            name: '商户核查单处理量',
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
            name: '线下核查单处理量',
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
            name:'商户核查单处理占比',
            type:'line',
            itemStyle: {normal: {
               color:'#607fc8'
            }},
            yAxisIndex: 1,
            data:[]
        },
        {
          symbol: "none",// 去掉折线上面的小圆点
            name:'线下核查单处理占比',
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
.el-table--border{border:1px solid #ebeef5;}
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
.box{
  max-height: 400px;
  overflow-y: scroll;
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
