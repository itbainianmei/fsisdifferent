<!--员工规则有效性-->
<template>
    <div id="tradeandfraud" @click="allarea($event)">
        <div  class="searchBasic">
            <div class="title" >
                <i class="el-icon-arrow-down toggleIcon" @click="serchToggle = !serchToggle"></i>
                <span>基础查询</span>
            </div>
            <el-collapse-transition>
                <div class="searchContentgray pr" id="searchContentgray" v-show="serchToggle">
                    <div class="leftContent">
                        <el-form ref="form" :model="form" label-width="134px" class="demo-ruleForm">
                            <div class="formConClass">
                                <el-form-item label="开始时间:" prop="startTime">
                                    <el-date-picker  v-model="form.startTime" value-format="yyyy-MM-dd" :picker-options="xqy" type="date" placeholder="选择日期时间" style="width: 100%"></el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="结束时间:" prop="endTime" label-width="134px">
                                    <el-date-picker  v-model="form.endTime" value-format="yyyy-MM-dd" :picker-options="xqr" type="date" placeholder="选择日期时间" style="width: 100%;"></el-date-picker>
                                </el-form-item>
                            </div>
                            
                        </el-form>
                        
                    </div>
                    <div class="pa clear btnsContent">
                        <el-button type="primary" class="serchbtn fl" v-show="authsearch" icon="el-icon-search" @click='query'>查询</el-button>
                        <el-button type="primary" v-show="authdownload1" class="fl" @click='downloadList1'>下载每周统计</el-button>
                        <el-button type="primary" v-show="authdownload2" class=" fl" @click='downloadList2'>下载各用户统计</el-button>
                    </div> 
                </div>
            </el-collapse-transition>
             <!-- 图表 -->
            <div id="myChart1" class="center" :style="{width: '1000px', height: '400px'}"></div>
            <div id="myChart2" class="center" :style="{width: '1000px', height: '400px',marginTop:'20px'}"></div>
            <div id="myChart3" class="center" :style="{width: '1000px', height: '400px',marginTop:'20px'}"></div>
            <!-- 表格 -->
             <h4>各用户每周统计</h4>
              <el-table class="mt10" style="width:auto !important;"
                 border
                 fixed 
               max-height="600"
                :data="tableData0" >
                <el-table-column
                  v-if="tableDataSec.times[0]"
                  prop="times"
                  label="时间"
                  sortable
                  show-header
                  show-overflow-tooltip
                  width="170"
                  :render-header="companyRenderHeader"
                >
                </el-table-column>
                <el-table-column
                  v-if="tableDataSec.user[0]"
                  prop="user"
                  label="用户"
                  sortable
                  show-overflow-tooltip
                  width="140"
                  :render-header="companyRenderHeader"
                  >
                </el-table-column>
                <el-table-column
                  v-if="tableDataSec.transactionNumber[0]"
                  prop="transactionNumber"
                  label="交易数"
                  width="140"
                   sortable
                  show-overflow-tooltip
                  :render-header="companyRenderHeader"
                   :formatter="formater1"
                  >
                </el-table-column>
                <el-table-column
                  v-if="tableDataSec.alarmNumber[0]"
                  prop="alarmNumber"
                  label="报警数"
                  width="140"
                   sortable
                  show-overflow-tooltip
                  :render-header="companyRenderHeader"
                   :formatter="formater2"
                  >
                </el-table-column>
                <el-table-column
                  v-if="tableDataSec.fraudNumber[0]"
                  prop="fraudNumber"
                  label="欺诈数"
                  width="140"
                   sortable
                  show-overflow-tooltip
                  :render-header="companyRenderHeader"
                   :formatter="formater3"
                  >
                </el-table-column>
                <el-table-column
                  v-if="tableDataSec.hitNumber[0]"
                  prop="hitNumber"
                  label="命中数"
                  width="140"
                   sortable
                  show-overflow-tooltip
                  :render-header="companyRenderHeader"
                   :formatter="formater4"
                  >
                </el-table-column>
                <el-table-column
                  v-if="tableDataSec.alarmNumberRate[0]"
                  prop="alarmNumberRate"
                  label="报警率%"
                  width="120"
                   sortable
                  show-overflow-tooltip
                  :render-header="companyRenderHeader"
                  :formatter="formater7"
                  >
                  
                </el-table-column>
                <el-table-column
                  v-if="tableDataSec.hitNumberRate[0]"
                  prop="hitNumberRate"
                  label="命中率%"
                  width="120"
                   sortable
                  show-overflow-tooltip
                  :render-header="companyRenderHeader"
                  :formatter="formater8"
                  >
                 
                </el-table-column>
                <el-table-column
                  v-if="tableDataSec.coverRate[0]"
                   prop="coverRate"
                  label="覆盖率%"
                  width="120"
                   sortable
                  show-overflow-tooltip
                  :render-header="companyRenderHeader"
                  :formatter="formater9"
                  >
                 
                </el-table-column>
              </el-table>
              <div class="block2 mt10 mb30">
                <div class='pagination'>
                    <span>每页显示</span> 
                     <el-select @change="handleSizeChange1" v-model="currenteveryno1" style="width: 25%;">
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
                    :page-size="Number(currenteveryno1)"
                    :total=length1
                    @current-change="handleCurrentChange1">
                   </el-pagination>
                   
                </div>
            </div>
             <h4>各用户总计</h4>
              <el-table class="mt10" style="width:auto !important;"
                 border
                 fixed 
                  max-height="600"
                :data="tableData1" >
                <el-table-column
                  v-if="tableDataSec2.times[0]"
                  prop="times"
                  label="时间"
                  sortable
                  show-header
                  show-overflow-tooltip
                  width="170"
                  :render-header="companyRenderHeader2"
                >
                </el-table-column>
                <el-table-column
                  v-if="tableDataSec2.user[0]"
                  prop="user"
                  label="用户"
                  sortable
                  show-overflow-tooltip
                  width="130"
                  :render-header="companyRenderHeader2"
                  >
                </el-table-column>
                <el-table-column
                  v-if="tableDataSec2.alarmNumber[0]"
                  prop="alarmNumber"
                  label="总报警数"
                  width="150"
                   sortable
                  show-overflow-tooltip
                  :render-header="companyRenderHeader2"
                   :formatter="formater5"
                  >
                </el-table-column>
                <el-table-column
                  v-if="tableDataSec2.hitNumber[0]"
                  prop="hitNumber"
                  label="总命中数"
                  width="200"
                   sortable
                  show-overflow-tooltip
                  :render-header="companyRenderHeader2"
                   :formatter="formater6"
                  >
                </el-table-column>
                <el-table-column
                  v-if="tableDataSec2.alarmNumberRate[0]"
                   prop="alarmNumberRate"
                  label="总报警率%"
                  width="168"
                   sortable
                  show-overflow-tooltip
                  :render-header="companyRenderHeader2"
                  :formatter="formater7"
                  >
                </el-table-column>
                <el-table-column
                  v-if="tableDataSec2.hitNumberRate[0]"
                   prop="hitNumberRate"
                  label="总命中率%"
                  width="200"
                   sortable
                  show-overflow-tooltip
                  :render-header="companyRenderHeader2"
                  :formatter="formater8"
                  >
                </el-table-column>
                <el-table-column
                  v-if="tableDataSec2.coverRate[0]"
                   prop="coverRate"
                  label="总覆盖率%"
                  width="194"
                   sortable
                  show-overflow-tooltip
                  :render-header="companyRenderHeader2"
                  :formatter="formater9"
                  >
                </el-table-column>
               
              </el-table>
              <div class=" mt10 mb30">
                <div class='pagination'>
                    <span>每页显示</span> 
                     <el-select @change="handleSizeChange2" v-model="currenteveryno2" style="width: 25%;">
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
                    :page-size="Number(currenteveryno2)"
                    :total=length2
                    @current-change="handleCurrentChange2">
                   </el-pagination>
                   
                </div>
              </div>
        </div>
        <!-- 表格每列的列选择 注意：每页都需要手动改变top值-->
        <div ref="list" class="list pa none bgccc">
          <TableSelect  :tableDataSec="tableDataSec"></TableSelect>
        </div>
        <div ref="list2" class="list pa none bgccc">
          <TableSelect :tableDataSec="tableDataSec2"></TableSelect>
        </div>
         
    </div>
</template>
<script>
import qs from 'qs';
import TableSelect from '../tableSelect/tableSelect.vue'
 var loadingTicket1,loadingTicket2,loadingTicket3,myChart1,myChart2,myChart3
export default {
   name:'员工规则有效性趋势统计',
  data(){
      return{
        authsearch:false,
        authdownload1:false,
        authdownload2:false,
        xqy: {
          disabledDate(time,tiem) {
            var node = document.querySelectorAll('.el-date-table__row')
            Array.from(node).map(function(item,index){
               var tds = item.querySelectorAll('td')
               tds[1].classList.remove('disabled')
               tds[0].classList.add('disabled')
               tds[2].classList.add('disabled')
               tds[3].classList.add('disabled')
               tds[4].classList.add('disabled')
               tds[5].classList.add('disabled')
               tds[6].classList.add('disabled')
            })
            return false
          }
        },
        xqr: {
          disabledDate(time) {
            var node = document.querySelectorAll('.el-date-table__row')
            Array.from(node).map(function(item,index){
               var tds = item.querySelectorAll('td')
               tds[0].classList.remove('disabled')
               tds[1].classList.add('disabled')
               tds[2].classList.add('disabled')
               tds[3].classList.add('disabled')
               tds[4].classList.add('disabled')
               tds[5].classList.add('disabled')
               tds[6].classList.add('disabled')
            })
            return false;
          }
        },
      currenteveryno1:20,//每页10条
      currenteveryno2:20,//每页10条
      tableDataSec:{  //控制列显示  key和table prop一致
        times:[true,'时间'],
        user:[true,'用户'],
        transactionNumber:[true,'交易数'],
        alarmNumber:[true,'报警数'],
        fraudNumber:[true,'欺诈数'],
        hitNumber:[true,'命中数'],
        alarmNumberRate:[true,'报警率'],
        hitNumberRate:[true,'命中率'],
        coverRate:[true,'覆盖率']
      },
      tableDataSec2:{  //控制列显示  key和table prop一致
        times:[true,'时间'],
        user:[true,'用户'],
        alarmNumber:[true,'总报警数'],
        hitNumber:[true,'总命中数'],
        alarmNumberRate:[true,'总报警率'],
        hitNumberRate:[true,'总报警率'],
        coverRate:[true,'总覆盖率']
      },
      oneProductSelect: [
      ],
      tableData0: [ ],
      tableData1: [ ],
      ruleArray:[],
      yewuxianArray:[],
      serchToggle:true,
    form:{
      startTime:'',
      endTime:''
    },
     currentPage1:1,// 分页
     pageNumber1:1,
     pageRow1:20,
     length1:0,
     currentPage2:1,// 分页
     pageNumber2:1,
     pageRow2:20,
     length2:0    
    }
  },
  created(){
    this.form.startTime =  this.getWeek().start 
    this.form.endTime =   this.getWeek().end 
    this.queryAuthList()
  },
  mounted(){
     this.query() 
  },
  methods:{
    changeTime(){
      this.query()
    },
   clearData1(){
      option1.xAxis.data = ['']  //时间轴
      option1.series =[{
        "name":"",
        "data":[],
        "symbol":'circle',
        "symbolSize":3,
        "smooth":true,
        "type":'line'
      }] //限额限次拦截率
      option1.legend.data = [''] //黑名单拦截率
    },
    clearData2(){
      option2.xAxis.data = ['']  //时间轴
      option2.series =[{
        "name":"",
        "data":[],
        "symbol":'circle',
        "symbolSize":3,
        "smooth":true,
        "type":'line'
      }] //限额限次拦截率
      option2.legend.data = [''] //黑名单拦截率
    },
    clearData3(){
      option3.xAxis.data = ['']  //时间轴
      option3.series =[{
        "name":"",
        "data":[],
        "symbol":'circle',
        "symbolSize":3,
        "smooth":true,
        "type":'line'
      }] //限额限次拦截率
      option3.legend.data = [''] //黑名单拦截率
    },
    // addBfhToArr(arr){  //数组加%
    //   var temp =[]
    //   arr.map(function(item){
    //     if(item.indexOf('%') == -1){
    //       temp.push(item+'%')
    //     }else{
    //       temp.push(item)
    //     }
    //   })
    //   return temp
    // },
    query(){  //查询
      this.getTable1()
      this.getTable2()
      this.getChartData()
    },
     queryAuthList(){  //权限管理
         var self = this
      var arr = localStorage.getItem('ARRLEVEL')?localStorage.getItem('ARRLEVEL'):[]
        JSON.parse(arr).map(function(ele){
            switch(ele){
                case 192 || 227 || 228:
                    self.authsearch= true
                break;
                case 193:
                    self.authdownload1= true
                break;
                case 340:
                    self.authdownload2= true
                break;
            }
        })
    },
    getChartData(){  //统计图
      var self = this
      var newp = this.addSessionId(self.form)
      this.$axios.post('/report/getRuleStaffP',qs.stringify(newp)).then(res => {
        var response = res.data
        if(response.code == '200'){
          
          var coverRate = response.data.coverRate
          var alarmRate = response.data.alarmRate
          var hitRate = response.data.hitRate

         if(JSON.stringify(alarmRate.allPerson) == "{}"){
            self.clearData1()
            self.drawLine1()
          }else{
            option1.series=[]  
            option1.xAxis[0].data = alarmRate.times  //时间轴  报警
            if(alarmRate.times.length>12){  //控制x轴显示行为  数据量大的时候
              option1.xAxis[0].axisLabel.rotate=30
            }else if(alarmRate.times.length>24){
               option1.xAxis[0].axisLabel.rotate=60
            }
            option1.legend.data=[]
            for(var person in alarmRate.allPerson){
              var pers = {}
              option1.legend.data.push(person)
              pers.name = person   //每个人的name
              pers.data= alarmRate.allPerson[person] //每个人的数据集合  【】
              pers.symbol='circle'
              pers.symbolSize=3
              pers.smooth=true
              pers.type='line'
              option1.series.push(pers)
            }
            self.drawLine1()
          }

          if(JSON.stringify(hitRate.allPerson) == "{}"){
            self.clearData2()
            self.drawLine2()
          }else{
            option2.series=[]  
            option2.xAxis[0].data = hitRate.times  //时间轴  //命中
            if(hitRate.times.length>12){  //控制x轴显示行为  数据量大的时候
              option2.xAxis[0].axisLabel.rotate = 30
            }else if(hitRate.times.length>24){
               option2.xAxis[0].axisLabel.rotate = 60
            }
            option2.legend.data=[]

            for(var person in hitRate.allPerson){
              var pers = {}
              option2.legend.data.push(person)
              pers.name = person   //每个人的name
              pers.data= hitRate.allPerson[person] //每个人的数据集合  【】
              pers.symbol='circle'
              pers.symbolSize=3
              pers.smooth=true
              pers.type='line'
              option2.series.push(pers)
            }
            self.drawLine2();
          }
          if(JSON.stringify(coverRate.allPerson) == "{}"){
            self.clearData3()
            self.drawLine3()
          }else{
            option3.series=[] 
            option3.xAxis[0].data = coverRate.times  //时间轴  //覆盖
            if(coverRate.times.length>12){  //控制x轴显示行为  数据量大的时候
              option3.xAxis[0].axisLabel.rotate=30
            }else if(coverRate.times.length>24){
               option3.xAxis[0].axisLabel.rotate=60
            }
            option3.legend.data = []
            for(var person in coverRate.allPerson){
              var pers = {}
              option3.legend.data.push(person)
              pers.name = person   //每个人的name
              pers.data= coverRate.allPerson[person]  //每个人的数据集合  【】
              pers.symbol='circle'
              pers.symbolSize=3
              pers.smooth=true
              pers.type='line'
              option3.series.push(pers)
              
            }
            self.drawLine3();
          }
        }else{
          this.$message.error({message:response.msg,center: true});
        }
      }) 
    },

    getTable1(){   //统计表
      var params =  this.form
      params.pageNumber= this.pageNumber1
      params.pageRow= this.pageRow1

      var codestringlist = this.getCode(this.oneProductSelect)
      params.product = codestringlist
      var newp = this.addSessionId(params)
      this.$axios.post('/report/getRuleStaffWeekR',qs.stringify(newp)).then(res => {
        var response = res.data
        if(response.code == '200'){
            this.tableData0 = response.data.returnList
            this.length1 = response.data.total;
        }else{
          this.resultData = []
            this.length1 = 0
            this.$message.error({message:response.msg,center: true});
        }
      }) 
    },
    getTable2(){   //统计表
      var params =  this.form
      params.pageNumber= this.pageNumber2
      params.pageRow= this.pageRow2
      var newp = this.addSessionId(params)
      this.$axios.post('/report/getRuleStaffR',qs.stringify(newp)).then(res => {
        var response = res.data
        if(response.code == '200'){
            this.tableData1 = response.data.returnList
            this.length2 = response.data.total;
        }else{
          this.resultData = []
            this.length2 = 0
            this.$message.error({message:response.msg,center: true});
        }
      }) 
    },
    downloadList1() {//是否下载
        var newp = this.addSessionId(this.form)
        window.location = this.url+"/reportExcel/getRuleStaffWeekRExcel?" + qs.stringify(newp)
    },
    downloadList2() {//是否下载
         var newp = this.addSessionId(this.form)
        window.location = this.url+"/reportExcel/getRuleStaffRExcel?" + qs.stringify(newp)
    },
    formater1(row, column){
      return row.transactionNumber.toLocaleString()
    },
    formater2(row, column){
      return row.alarmNumber.toLocaleString()
    },
    formater3(row, column){
      return row.fraudNumber.toLocaleString()
    },
    formater4(row, column){
      return row.hitNumber.toLocaleString()
    },
    formater5(row, column){
      return row.alarmNumber.toLocaleString()
    },
    formater6(row, column){
      return row.hitNumber.toLocaleString()
    },
    formater7(row, column){
      return row.alarmNumberRate.toFixed(2)
    },
    formater8(row, column){
      return row.hitNumberRate.toFixed(2)
    },
    formater9(row, column){
      return row.coverRate.toFixed(2)
    },
    drawLine1(){
      let myChart1 = this.$echarts.init(document.getElementById('myChart1'))
        myChart1.clear()
         loadingTicket1 = setTimeout(function (){
              myChart1.hideLoading();
              myChart1.setOption(option1);
              clearTimeout(loadingTicket1);
             
          },2000);
          myChart1.showLoading({
            text : '数据拼命加载中...',
            effect :"whirling" ,
            textStyle : {
                fontSize : 16
            },
            effectOption: {backgroundColor: 'rgba(0, 0, 0, 0.05)'}
        });
     },
     drawLine2(){
      let myChart2 = this.$echarts.init(document.getElementById('myChart2'))
        myChart2.clear()
         loadingTicket2 = setTimeout(function (){
              myChart2.hideLoading();
              myChart2.setOption(option1);
              clearTimeout(loadingTicket2);
             
          },2000);
          myChart2.showLoading({
            text : '数据拼命加载中...',
            effect :"whirling" ,
            textStyle : {
                fontSize : 16
            },
            effectOption: {backgroundColor: 'rgba(0, 0, 0, 0.05)'}
        });
     },
     drawLine3(){
      let myChart3 = this.$echarts.init(document.getElementById('myChart3'))
        myChart3.clear()
         loadingTicket3 = setTimeout(function (){
              myChart3.hideLoading();
              myChart3.setOption(option1);
              clearTimeout(loadingTicket3);
             
          },2000);
          myChart3.showLoading({
            text : '数据拼命加载中...',
            effect :"whirling" ,
            textStyle : {
                fontSize : 16
            },
            effectOption: {backgroundColor: 'rgba(0, 0, 0, 0.05)'}
        });
     },
    handleSizeChange2() {  //更改页数
        this.pageRow2 = this.currenteveryno2
        this.getTable2()
    },
    handleCurrentChange2(val) {  //处理当前页
         this.pageNumber2 = `${val}`  //当前页
         this.getTable2()
    },
    handleSizeChange1() {  //更改页数
        this.pageRow1 = this.currenteveryno1
        this.getTable1()
    },
    handleCurrentChange1(val) {  //处理当前页
         this.pageNumber1 = `${val}`  //当前页
        this.getTable1()
    }
  },
  components:{
    TableSelect
  }
}
var option1 = {
   title: {
        text: '员工规则报警率趋势统计',
        x: 'center',
        textStyle: {
        fontSize:22,
        color: '#27727b'
       }
    },
    tooltip : {
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
        axisPointer:{
          lineStyle: {
              color: '#27727b',
              width: 2,
              type: 'dashed'
          }
          
        }
    },
    legend: {
       textStyle: {
        fontSize:16,
       },
      y:'40px',
      data:['']
    },
    toolbox: {
        show : true,
        feature : {
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    xAxis : [
        {
          axisLine: {
            show: true
          },
          axisLabel: {  
            interval:'auto',  
            rotate:0 
          }, 
          splitLine:{show: false},//去除网格线
          boundaryGap: true,
          type : 'category',
          data : ['']
        }
    ],
 
    grid:{
      borderWidth:0
    },
    yAxis : [
        {
         splitNumber:4,
          splitLine:{  //网格线
            show: true,
            lineStyle:{
              color: ['#aaa'],
              width: 1,
              type: 'dashed'
            }
          },
          axisLabel: {
            formatter: '{value}%'
        },
          axisLine: {
            show: false
          },
          type : 'value'
        }
    ],
    series :  [{
        "name":"",
        "data":[],
        "symbol":'circle',
        "symbolSize":3,
        "smooth":true,
        "type":'line'
      }]
};

var option2 = {
   title: {
        text: '员工规则命中率趋势统计',
        x: 'center',
        textStyle: {
        fontSize:22,
        color: '#27727b'
       }
    },
    tooltip : {
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
        axisPointer:{
          lineStyle: {
              color: '#27727b',
              width: 2,
              type: 'dashed'
          }
          
        }
    },
    legend: {
       textStyle: {
        fontSize:16,
       },
      y:'40px',
      data:['']
    },
    toolbox: {
        show : true,
        feature : {
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    xAxis : [
        {
          axisLine: {
            show: true
          },
          axisLabel: {  
            interval:'auto',  
            rotate:0 
          },
          splitLine:{show: false},//去除网格线
          boundaryGap: true,
          type : 'category',
          data : ['']
        }
    ],
 
    grid:{
      borderWidth:0
    },
    yAxis : [
        {
         splitNumber:4,
          splitLine:{  //网格线
            show: true,
            lineStyle:{
              color: ['#aaa'],
              width: 1,
              type: 'dashed'
            }
          },
          axisLabel: {
            formatter: '{value}%'
        },
          axisLine: {
            show: false
          },
          type : 'value'
        }
    ],
    series : [{
        "name":"",
        "data":[],
        "symbol":'circle',
        "symbolSize":3,
        "smooth":true,
        "type":'line'
      }]
};  
var option3 = {
   title: {
        text: '员工规则覆盖率趋势统计',
        x: 'center',
        textStyle: {
        fontSize:22,
        color: '#27727b'
       }
    },
    tooltip : {
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
        axisPointer:{
          lineStyle: {
              color: '#27727b',
              width: 2,
              type: 'dashed'
          }
          
        }
    },
    legend: {
       textStyle: {
        fontSize:16,
       },
      y:'40px',
      data:['']
    },
    toolbox: {
        show : true,
        feature : {
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    xAxis : [
        {
          axisLine: {
            show: true
          },
          axisLabel: {  
            interval:'auto',  
            rotate:0 
          },
          splitLine:{show: false},//去除网格线
          boundaryGap: true,
          type : 'category',
          data : ['']
        }
    ],
 
    grid:{
      borderWidth:0
    },
    yAxis : [
        {
         splitNumber:4,
          splitLine:{  //网格线
            show: true,
            lineStyle:{
              color: ['#aaa'],
              width: 1,
              type: 'dashed'
            }
          },
          axisLabel: {
            formatter: '{value}%'
        },
          axisLine: {
            show: false
          },
          type : 'value'
        }
    ],
    series :  [{
        "name":"",
        "data":[],
        "symbol":'circle',
        "symbolSize":3,
        "smooth":true,
        "type":'line'
      }]
};          
</script>

<style scoped>
.el-table--border{border:none;}
.el-table::before{height:0px;}
.btnsContent{width:600px;top:30px;right:0;}
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
.serchbtn ~ button{height:36px;}
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
