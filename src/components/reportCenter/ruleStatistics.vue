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
                                    <el-date-picker  v-model="form.startTime" value-format="yyyy-MM-dd" :picker-options="end" type="date" placeholder="选择日期时间" style="width: 90%;max-width:225px;" :clearable="false" :editable="false"></el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="结束时间:" prop="endTime">
                                    <el-date-picker  v-model="form.endTime" value-format="yyyy-MM-dd" :picker-options="end" type="date" placeholder="选择日期时间" style="width: 90%;max-width:225px;" :clearable="false" :editable="false"></el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="规则代码:" prop="ruleCode">
                                   <el-input v-model="form.ruleCode" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="规则类型:" prop="ruleType" style="width:120%;">
                                    <el-radio-group v-model="form.ruleType" @change="query">
                                      <el-radio label="1">交易规则</el-radio>
                                      <el-radio label="2">商户规则</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </div>
                            <div class="dis-inline">
                                <el-form-item label="规则分值:" class="dis-inline" label-width="134px" prop="ruleScoreLeft">
                                    <el-input style="width:160px !important;"  v-model="form.ruleScoreLeft" placeholder="规则分值"></el-input><i class="c999 ml10 mr10">-</i>
                                </el-form-item>
                                <el-form-item label="" class="dis-inline" label-width="0px" prop="ruleScoreRight">
                                    <el-input style="width:160px !important;"  v-model="form.ruleScoreRight" placeholder="规则分值"></el-input>
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
              <div class="clear dis-inline" v-show="form.ruleType == '1'">
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
              <div class="clear dis-inline" v-show="form.ruleType == '2'">
                <div class="fl">
                    <span class="circle" style="background:#e6e9ed;"></span>
                    <span>总商户数量</span>
                </div>
                <div class="fl ml20" style="width:132px">
                    <span class="circle" style=" background:#5d9cec;"></span>
                    <span>总报警商户数</span>
                </div>
                <div class="fl ml20" style="width:132px">
                    <span class="circle" style="background:#ed5565;"></span>
                    <span>总欺诈商户数</span>
                </div>
                <div class="fl ml20" style="width:132px">
                    <span class="circle" style="background:#ffce54;"></span>
                    <span>总命中商户数</span>
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
              <el-table style="width:100% !important;margin:0 auto;"
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
                :render-header="companyRenderHeader"
              >
              </el-table-column>
              <el-table-column
                v-if="tableDataSec.ruleName[0]"
                prop="ruleName"
                label="规则名称"
                sortable
                show-overflow-tooltip
                :render-header="companyRenderHeader"
                >
              </el-table-column>
              <el-table-column
                v-if="tableDataSec.ruleScore[0]"
                prop="ruleScore"
                label="规则分值"
                 sortable
                show-overflow-tooltip
                :render-header="companyRenderHeader"
                >
              </el-table-column>
              <el-table-column
                v-if="tableDataSec.alarmTransaction[0]"
                prop="alarmTransaction"
                label="报警数"
                 sortable
                show-overflow-tooltip
                :render-header="companyRenderHeader"
                :formatter="formater1"
                >
              </el-table-column>

              <el-table-column
                v-if="tableDataSec.fraudRate[0]"
                prop="fraudRate"
                label="命中率%"
                 sortable
                show-overflow-tooltip
                :render-header="companyRenderHeader"
                :formatter="formater4"
                >
              </el-table-column>
            </el-table>

                <div class="mb30 mt20">
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
import TableSelect from '../tableSelect/tableSelect.vue'
 var loadingTicket,myChart
export default {
   name:'规则有效性统计',
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
          fraudRate:[true,'命中率']
        },
        tableData: [],

       businessLineArray:[],
        ruleTypeArray:[],
        serchToggle:true,
      form:{
        startTime:'',
        endTime:'',
        ruleCode:'',
        ruleType:'1',
        ruleScoreLeft:'',
        ruleScoreRight:''
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
  created(){
     this.queryAuthList()
  },
  mounted(){
    this.form.startTime = this.getdiffTime(-8)
    this.form.endTime = this.getdiffTime(-1)
    // this.form.startTime = '2018-06-07'
    // this.form.endTime = '2018-06-07'
    this.query()
    // this.drawLine();
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
      this.getTable(1)
      this.getChartData()
    },
    queryAuthList(){  //权限管理
         var self = this
      var arr = localStorage.getItem('ARRLEVEL')?localStorage.getItem('ARRLEVEL'):[]
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
      var params = {
        startTime:self.form.startTime,
        endTime:self.form.endTime,
        ruleType:self.form.ruleType,
        ruleScoreLeft:self.form.ruleScoreLeft.trim(),
        ruleScoreRight:self.form.ruleScoreRight.trim()
      }
     if((params.ruleScoreLeft && !params.ruleScoreRight)  || (!params.ruleScoreLeft && params.ruleScoreRight)){
        this.failTip('规则分值框需同时输入')
        return false
      }
      this.$axios.post('/report/getRuleEffecienP',qs.stringify(params)).then(res => {
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
          var tiptext1='',tiptext2='',tiptext3=''
          if(this.form.ruleType == '1'){
            tiptext1='总欺诈数量'
            tiptext2='总命中数量'
            tiptext3='总报警数量'
          }else{
            tiptext1='总欺诈商户数'
            tiptext2='总命中商户数'
            tiptext3='总报警商户数'
          }
          if(alarmTransactionTotal>0 &&fraudTransactionTotal==0){
            fraudTransactionTotal = 0.1
            hitTransactionTotal=0


            var data = [
                {value: alarmTransactionTotal, name: alarmTransactionTotal,title:tiptext3},
                {value: fraudTransactionTotal, name: 0,title:tiptext1},
                {value: hitTransactionTotal > 0 ? 20 : 0, name: 0,title:tiptext2},
              ];
          }else if(fraudTransactionTotal>0 && alarmTransactionTotal==0){
            alarmTransactionTotal=0.1
             hitTransactionTotal=0
              var data = [
                {value: alarmTransactionTotal, name: 0,title:tiptext3},
                {value: fraudTransactionTotal, name: fraudTransactionTotal,title:tiptext1},
                {value: hitTransactionTotal > 0 ? 20 : 0, name: 0,title:tiptext2},
              ];
          }else if(fraudTransactionTotal==0 && alarmTransactionTotal==0){
              alarmTransactionTotal=0.1
              fraudTransactionTotal=0.1
             var data = [
              {value: alarmTransactionTotal, name: 0,title:tiptext3},
              {value: fraudTransactionTotal, name: 0,title:tiptext1},
              {value: 0 , name: 0,title:tiptext2},
            ];
          }else{
             var data = [
              {value: alarmTransactionTotal, name: alarmTransactionTotal,title:"总报警数量"},
              {value: fraudTransactionTotal, name: fraudTransactionTotal,title:tiptext1},
              {value: hitTransactionTotal, name: hitTransactionTotal,title:tiptext2},
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
    getTable(page){   //统计表
      var self = this
      var params = {
        startTime:self.form.startTime,
        endTime:self.form.endTime,
        ruleType:self.form.ruleType,
        ruleCode:self.form.ruleCode,
        ruleScoreLeft:self.form.ruleScoreLeft.trim(),
        ruleScoreRight:self.form.ruleScoreRight.trim()
      }
      params.pageNumber= page
      params.pageRow= this.pageRow
      if((params.ruleScoreLeft && !params.ruleScoreRight)  || (!params.ruleScoreLeft && params.ruleScoreRight)){
        this.failTip('规则分值框需同时输入')
        return false
      }
      this.$axios.post('/report/getRuleEffecienR',qs.stringify(params)).then(res => {
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
    formater3(row, column){
      return this.addCommas(row.alarmRate.toFixed(2))
    },
     formater4(row, column){
      return this.addCommas(row.fraudRate.toFixed(2))
    },
     formater5(row, column){
      return this.addCommas(row.coverRate.toFixed(2))
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

    handleCurrentChange(val) {  //处理当前页
         this.pageNumber = `${val}`  //当前页
         this.getTable(val)
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
