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
                                    <el-date-picker  v-model="form.startTime" value-format="yyyy-MM-dd" :picker-options="end" type="date" placeholder="选择日期时间" style="width: 90%;max-width:225px;"></el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="结束时间:" prop="endTime">
                                    <el-date-picker  v-model="form.endTime" value-format="yyyy-MM-dd" :picker-options="end" type="date" placeholder="选择日期时间" style="width: 90%;max-width:225px;"></el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="规则代码:" prop="ruleCode">
                                   <el-input v-model="form.ruleCode" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="业务线:" prop="businessLine">
                                    <el-select v-model="form.businessLine" placeholder="请选择" style="width: 90%;max-width:225px;">
                                        <el-option label="全部" value="all"></el-option>
                                        <el-option label="线上" value="0"></el-option>
                                        <el-option label="线下" value="1"></el-option>
                                        
                                    </el-select>
                                </el-form-item>
                            </div>
                        </el-form>
                    </div>
                    <div class="rightContent">
                        <el-button type="primary" class="serchbtn" v-show="authsearch" icon="el-icon-search" @click='query'>查询</el-button>
                        <el-button type="primary" class="serchbtn" v-show="authdownload" icon="el-icon-refresh" @click.stop='downloadList'>下载</el-button>
                    </div>
                </div>
            </el-collapse-transition>

            <!-- 图表title -->
            <div class="tc">
              <div class="clear dis-inline">
                <div class="fl">
                    <span class="circle" style="background:#e6e9ed;"></span>
                    <span>总交易数量</span>
                </div>
                <div class="fl ml20" style="width:120px">
                    <span class="circle" style=" background:#5d9cec;"></span>
                    <span>总报警数量</span>
                </div>
                <div class="fl ml20" style="width:120px">
                    <span class="circle" style="background:#ed5565;"></span>
                    <span>总欺诈数量</span>
                </div>
                <div class="fl ml20" style="width:120px">
                    <span class="circle" style="background:#ffce54;"></span>
                    <span>总命中数量 </span>
                </div>
              </div>
             </div>
             <!-- 图表 -->
            <div id="myChart" class="center" :style="{width: '700px', height: '400px'}"></div>
            <!-- 文字说明 -->
            <div class="tc mb30">
              <div class="clear dis-inline">
                <div class="fl mr30">
                  <div>
                      <i><img src="../../images/fang4.png" height="37" width="43"></i>
                      <span> 总报警率:<span id="alarmRateTotal">{{alarmRateTotal}}%</span></span>
                  </div>
                </div>
                <div class="fl mr30">
                    <div>  
                        <i><img src="../../images/fang5.png"></i>
                        <span> 总覆盖率:<span id="coverRateTotal">{{coverRateTotal}}%</span> </span>
                    </div>
                </div>
                <div class="fl">
                    <div>
                        <i><img src="../../images/fang6.png"></i> 
                        <span>总命中率:<span id="hitRateTotal" >{{hitRateTotal}}%</span></span>
                    </div>
                </div>
              </div>
            </div>

            <!-- 表格 -->
              <el-table style="width:auto !important;"
               border
               fixed 
               max-height="600"
              :data="tableData" >
              <el-table-column
                v-if="tableDataSec.ruleCode[0]"
                prop="ruleCode"
                label="规则编码"
                sortable
                show-header
                show-overflow-tooltip
                width="160"
                :render-header="companyRenderHeader"
              >
              </el-table-column>
              <el-table-column
                v-if="tableDataSec.ruleName[0]"
                prop="ruleName"
                label="规则名称"
                sortable
                show-overflow-tooltip
                width="200"
                :render-header="companyRenderHeader"
                >
              </el-table-column>
              <el-table-column
                v-if="tableDataSec.ruleScore[0]"
                prop="ruleScore"
                label="规则分值"
                width="140"
                 sortable
                show-overflow-tooltip
                :render-header="companyRenderHeader"
                >
              </el-table-column>
              <el-table-column
                v-if="tableDataSec.alarmTransaction[0]"
                prop="alarmTransaction"
                label="报警数"
                width="156"
                 sortable
                show-overflow-tooltip
                :render-header="companyRenderHeader"
                :formatter="formater1"
                >
              </el-table-column>
              <el-table-column
                v-if="tableDataSec.alarmRate[0]"
                prop="alarmRate"
                label="报警率%"
                width="140"
                 sortable
                show-overflow-tooltip
                :render-header="companyRenderHeader"
                >
              </el-table-column>
              <el-table-column
                v-if="tableDataSec.fraudTransaction[0]"
                prop="fraudTransaction"
                label="命中数"
                width="160"
                 sortable
                show-overflow-tooltip
                :render-header="companyRenderHeader"
                :formatter="formater2"
                >
              </el-table-column>
              <el-table-column
                v-if="tableDataSec.fraudRate[0]"
                prop="fraudRate" 
                label="命中率%"
                width="140"
                 sortable
                show-overflow-tooltip
                :render-header="companyRenderHeader"
                >
              </el-table-column>
              <el-table-column
                v-if="tableDataSec.coverRate[0]"
                prop="coverRate"
                label="覆盖率%"
                width="140"
                 sortable
                show-overflow-tooltip
                :render-header="companyRenderHeader"
                >
              </el-table-column>
                </el-table>
                <div class="mb30 mt20">
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
          ruleCode:[true,'规则编码'],
          ruleName:[true,'规则名称'],
          ruleScore:[true,'规则分值'],
          alarmTransaction:[true,'报警数'],
          alarmRate:[true,'报警率'],
          fraudTransaction:[true,'命中数'],
          fraudRate:[true,'命中率'],
          coverRate:[true,'覆盖率']
        },
        tableData: [],
         
       businessLineArray:[],
        ruleTypeArray:[],
        serchToggle:true,
      form:{
        startTime:'',
        endTime:'',
        ruleCode:'',
        businessLine:'all',
      },
      alarmRateTotal:0,//总报警率
      coverRateTotal:0,//总覆盖率
      hitRateTotal:0,//总命中率
       currentPage:1,// 分页
       pageNumber:1,
       pageRow:10,
       length:0    
  }
  },
  mounted(){
    this.form.startTime = this.getdiffTime(-8)
    this.form.endTime = this.getdiffTime(-1)
    // this.form.startTime = '2018-06-07'
    // this.form.endTime = '2018-06-07'
    this.query()
    this.queryAuthList();
  },
  methods:{
    clearData(){
      var data = [
        {value: 20, name: 0,title:"总报警数量"},
        {value: 20, name: 0,title:"总欺诈数量"},
        {value: 0, name: 0,title:"总命中数量"},
      ];
       option.series[0]['data'] = data;
       option['title']['subtext'] = 0;
      this.alarmRateTotal= 0 //报警率
      this.hitRateTotal = 0//命中率
      this.coverRateTotal = 0 //覆盖率
      option.tooltip.formatter = function(params,ticket){
        var objects = params.series.data;
        var index = parseInt(ticket.split(":")[1]);
        var result = '<div>' + objects[index].title + " : " + objects[index].name + '</div>';
        return result;
      };
    },
    query(){  //查询
      this.getTable()
      this.getChartData()
    },
     queryAuthList(){  //权限管理
      var arr = localStorage.getItem('ARRLEVEL')?localStorage.getItem('ARRLEVEL'):[]
        var self = this
        JSON.parse(arr).map(function(ele){
            switch(ele){
                case 176 || 220:
                    self.authsearch= true
                break;
                case 177:
                    self.authdownload= true
                break;
            }
        })
    },
    getChartData(){  //统计图
      var self = this
      var newp = this.addSessionId(self.form)
      this.$axios.post('/report/getRuleEffecienP',qs.stringify(newp)).then(res => {
        var response = res.data
        if(response.code == '200'){
          if(JSON.stringify(response.data) == "{}"){
            self.clearData()
            this.drawLine()
            return false
          }
          var getd =  response.data
          var totalCount = Number(getd.transactionTotal)  //总交易数

          var alarmTransactionTotal = Number(getd.alarmTransactionTotal) //报警
          var fraudTransactionTotal = Number(getd.fraudTransactionTotal) //欺诈
          var hitTransactionTotal = Number(getd.hitTransactionTotal)//命中
          if(alarmTransactionTotal>0 &&fraudTransactionTotal==0){
            fraudTransactionTotal = 0.1
            hitTransactionTotal=0
            var data = [
                {value: alarmTransactionTotal, name: alarmTransactionTotal,title:"总报警数量"},
                {value: fraudTransactionTotal, name: 0,title:"总欺诈数量"},
                {value: hitTransactionTotal > 0 ? 20 : 0, name: 0,title:"总命中数量"},
              ];
          }else if(fraudTransactionTotal>0 && alarmTransactionTotal==0){
            alarmTransactionTotal=0.1
             hitTransactionTotal=0
              var data = [
                {value: alarmTransactionTotal, name: 0,title:"总报警数量"},
                {value: fraudTransactionTotal, name: fraudTransactionTotal,title:"总欺诈数量"},
                {value: hitTransactionTotal > 0 ? 20 : 0, name: 0,title:"总命中数量"},
              ];
          }else if(fraudTransactionTotal==0 && alarmTransactionTotal==0){
              alarmTransactionTotal=0.1
              fraudTransactionTotal=0.1
             var data = [
              {value: alarmTransactionTotal, name: 0,title:"总报警数量"},
              {value: fraudTransactionTotal, name: 0,title:"总欺诈数量"},
              {value: 0 , name: 0,title:"总命中数量"},
            ];
          }else{
             var data = [
              {value: alarmTransactionTotal, name: alarmTransactionTotal,title:"总报警数量"},
              {value: fraudTransactionTotal, name: fraudTransactionTotal,title:"总欺诈数量"},
              {value: hitTransactionTotal, name: hitTransactionTotal,title:"总命中数量"},
            ];
          }
         
          option.series[0]['data'] = data;
          option['title']['subtext'] = totalCount;
          self.alarmRateTotal= getd.alarmRateTotal //报警率
          self.hitRateTotal = getd.hitRateTotal //命中率
          self.coverRateTotal = getd.coverRateTotal //覆盖率

          option.tooltip.formatter = function(params,ticket){
            var objects = params.series.data;
            var index = parseInt(ticket.split(":")[1]);
            var result = '<div>' + objects[index].title + " : " + objects[index].name + '</div>';
            return result;
          };
          self.drawLine();
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
      this.$axios.post('/report/getRuleEffecienR',qs.stringify(newp)).then(res => {
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
    formater1(row, column){
      return row.alarmTransaction.toLocaleString()
    },
    formater2(row, column){
      return row.fraudTransaction.toLocaleString()
    },
    downloadList() {//是否下载
        // var params =  this.form  //入参
         var self = this
        var newp = this.addSessionId(self.form)
        window.location = this.url+"/reportExcel/getRuleEffecienExcel?" + qs.stringify(newp)
    },
    drawLine(){
        // 基于准备好的dom，初始化echarts实例
         myChart = this.$echarts.init(document.getElementById('myChart'))
        myChart.clear()
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
    handleSizeChange() {  //更改页数
        this.pageRow = this.currenteveryno
        this.getTable()
    },
    handleCurrentChange(val) {  //处理当前页
         this.pageNumber = `${val}`  //当前页
         this.getTable()
    }
  },
  components:{
    TableSelect
  }
}

var option = {
    title : {
      text: '规则有效性统计',
      subtext: '0',
      x:'center',
      textStyle: {
        fontFamily: 'Microsoft YaHei',
        fontSize: 0
      },
      subtextStyle: {
        fontFamily: 'Microsoft YaHei',
        fontSize: 20
      }
    },
    tooltip : {
      trigger: 'item',
      formatter: '{b}'
    },
    toolbox: {
      show : true,
      feature : {
        saveAsImage : {show: true}
      }
    },
    backgroundColor:'#e6e9ed',
    //backgroundColor:'#ccd1d9',
    //color:['#94ebf7','#f47543','#f7ce3e'],
    color:['#5d9cec','#ed5565','#ffce54'],
    calculable : false,
    series : [
      {
        name:'韦恩图',
        type:'venn',

        itemStyle: {
          normal: {
            label: {
              show: true,
              position: 'inside',
              textStyle: {
                fontFamily: 'Microsoft YaHei',
                fontSize: 16
              }
            },
            labelLine: {
              show: false,
              length: 10,
              lineStyle: {
                width: 1,
                type: 'solid'
              }
            }
          },
          emphasis: {
            color: '#967adc',
            borderWidth: 3,
            borderColor: '#996699'
          }
        },
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
