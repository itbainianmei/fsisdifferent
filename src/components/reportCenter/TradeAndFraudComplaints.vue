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
                                <el-form-item label="时间刻度:" prop="timeType">
                                    <el-radio-group v-model="form.timeType" @change="changeTime">
                                      <el-radio label="1">月</el-radio>
                                      <el-radio label="2">周</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="数据维度:" prop="dataType">
                                    <el-select v-model="form.dataType" @change="getLdData" placeholder="请选择" style="width: 90%;max-width:225px;">
                                        <el-option label="商户KYC" value="kyc"></el-option>
                                        <el-option label="行业业绩属性" value="92"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                             <div class="formConClass">
                                <el-form-item label="" prop="typeValue">
                                    <!-- 多选框 -->
                                    <KycAndHyCheckbox :select="select"
                                        @selectedChange="selectedChange">
                                    </KycAndHyCheckbox>
                                </el-form-item>
                            </div>
                            
                            <div class="formConClass">
                                <el-form-item label="开始时间:" prop="startTime">
                                    <el-date-picker  v-model="form.startTime" value-format="yyyy-MM-dd" :picker-options="end" type="date" placeholder="选择日期时间" style="width: 100%;"></el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="结束时间:" prop="endTime">
                                    <el-date-picker  v-model="form.endTime" :picker-options="end" value-format="yyyy-MM-dd" type="date" placeholder="选择日期时间" style="width: 100%;"></el-date-picker>
                                </el-form-item>
                            </div>
                             <div class="formConClass">
                                <el-form-item label="商户唯一标识:" prop="customerSign">
                                   <el-input v-model="form.customerSign" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="商户编号:" prop="merchantNo">
                                   <el-input v-model="form.merchantNo" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                             <div class="formConClass">
                                <el-form-item class="pr" label="商户自然属性一级:" prop="naturalPropertyOne" >
                                 <el-input v-model="form.naturalPropertyOne" placeholder="请选择" style="width: 90%;max-width:225px;" @focus="addproperty"></el-input>
                                 <span class="pa iconbox" @click="addproperty">
                                   <i class="el-icon-arrow-down"></i>
                                   <!-- <i class="el-icon-arrow-up"></i> -->
                                 </span>
                                     <!-- //商户自然属性一级 列表  自定义 onepropertySelectshow-->
                                    <div class="pa pt10 onepropertySelect" v-show="onepropertySelectshow">
                                        <div class="box">
                                          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                                            <el-checkbox-group v-model="checkedOneproperty" @change="handleCheckedCitiesChange">
                                              <el-checkbox v-for="city in onepropertySelect" :label="city.label" :key="city.value">{{city.label}}</el-checkbox>
                                            </el-checkbox-group>
                                        </div>
                                            
                                            <div class="clear mt10 mb20">
                                            <el-button type="primary" @click="getStatus">确定</el-button>
                                            <el-button @click="setStatus">取消</el-button>
                                          </div>
                                    </div>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item class="pr" label="产品:" prop="product" >
                                 <el-input class="fs12" v-model="product" placeholder="请选择" style="width: 90%;max-width:225px;" @focus="addproductCheck"></el-input>
                                 <span class="pa iconbox" @click="addproductCheck">
                                   <i class="el-icon-arrow-down"></i>
                                 </span>
                                     <!-- //产品 列表  自定义 -->
                                    <div class="pa pt10 onepropertySelect" v-show="productCheckshow">
                                      <div class="box">
                                        <el-checkbox :indeterminate="isProduct" v-model="checkAllProduct" @change="handleCheckAllproductChange">全选</el-checkbox>
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
                        <el-button type="primary" class="serchbtn" v-show="authsearch" icon="el-icon-search" @click='query'>查询</el-button>
                        <el-button type="primary" v-show="authdownload" class="serchbtn" icon="el-icon-refresh" @click='downloadList'>下载</el-button>
                    </div>
                </div>
            </el-collapse-transition>

            <!-- 图表 -->
            <div id="myChart" class="center" :style="{width: '100%', height: '400px'}"></div>
            <!-- 表格 -->
            <el-table
            fixed 
               max-height="600"
              class="pb30"
               border
              :data="tableData">
              <el-table-column
                v-if="tableDataSec.times[0]"
                prop="times"
                label="时间"
                sortable
                show-header
                show-overflow-tooltip
                :render-header="companyRenderHeader"
              >
              </el-table-column>
              <el-table-column
                v-if="tableDataSec.transactionTotal[0]"
                prop="transactionTotal"
                label="成功交易笔数"
                sortable
                show-overflow-tooltip
                :render-header="companyRenderHeader"
                :formatter="formater1"
                >
              </el-table-column>
              <el-table-column
                v-if="tableDataSec.fraudTransactionTotal[0]"
                prop="fraudTransactionTotal"
                label="成功欺诈笔数"
                 sortable
                show-overflow-tooltip
                :render-header="companyRenderHeader"
                :formatter="formater2"
                >
              </el-table-column>
              
              </el-table-column>
              <el-table-column
                prop="transactionMoney"
                v-if="tableDataSec.transactionMoney[0]"
                 sortable
                show-overflow-tooltip
                :render-header="companyRenderHeader"
                :formatter="formater5"
                label="成功交易额(亿)"
                >
              </el-table-column>
              <el-table-column
                prop="fraudMoney"
                label="成功欺诈额(万元)"
                v-if="tableDataSec.fraudMoney[0]"
                 sortable
                show-overflow-tooltip
                :render-header="companyRenderHeader"
                :formatter="formater6"
                >
              </el-table-column>  
               <el-table-column
                prop="interceptMoney"
                label="拦截欺诈额(万元)"
                v-if="tableDataSec.interceptMoney[0]"
                 sortable
                show-overflow-tooltip
                :render-header="companyRenderHeader"
                :formatter="formater7"
                >
              </el-table-column>
              <el-table-column
                prop="fraudLossP"
                label="欺诈损失率(0.01BP)"
                v-if="tableDataSec.fraudLossP[0]"
                 sortable
                show-overflow-tooltip
                :render-header="companyRenderHeader"
                :formatter="formater8">
              </el-table-column>
              <el-table-column
                label="金额覆盖率%"
                v-if="tableDataSec.coverRate[0]"
                 prop="coverRate"
                 sortable
                show-overflow-tooltip
                :render-header="companyRenderHeader"
                :formatter="formater9">
              </el-table-column>
              <el-table-column
              v-if="tableDataSec.payAmount[0]"
              prop="payAmount"
                label="赔付金额"
                width="100"
                sortable
                :render-header="companyRenderHeader"
                :formatter="formater14"
                show-overflow-tooltip>
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
   name:'交易及欺诈投诉统计',
   computed:{
     maxjjj100:function(){
      if(this.form.customerSign.split(',').length > 100){
        return this.form.customerSign.split(',').length = 100
      }
     },
     maxMerchantNo100:function(){
      return this.form.merchantNo.split(',').length < 100
      if(this.form.merchantNo.split(',').length > 100){
        return this.form.customerSign.split(',').length = 100
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
         isProduct: true,
        checkAllProduct: false,
        productCheckshow:false,//产品下拉框显示
        checkedProduct: [],//checkedProduct
        checkedProductCode: [],//checkedProductCode
        oneProductSelect: [],
        checkAll: false,
        checkedOneproperty: [],//checkedOneproperty
        onepropertySelect: [],//商户自然一级属性
        isIndeterminate: true,
        onepropertySelectshow:false,//自然属性下拉框显示
        tableDataSec:{  //控制列显示
          times:[true,'时间'],
          transactionTotal:[true,'成功交易笔数'],
          fraudTransactionTotal:[true,'成功欺诈笔数'],
          transactionMoney:[true,'成功交易额'],
          fraudMoney:[true,'成功欺诈额'],
          interceptMoney:[true,'拦截欺诈额'],
          fraudLossP:[true,'欺诈损失率'],
          coverRate:[true,'金额覆盖率'],
          payAmount:[true,'赔付金额']
        },
        tableData: [ ],
        productArray:[],//产品
        fff:[],//数据维度联动
        serchToggle:true,//行业业绩属性
      form:{
        startTime:'',
        endTime:'',
        customerSign:'',
        merchantNo:'',
        product:'all',
        naturalPropertyOne:'',
        product:'',
        dataType:'kyc',
        typeValue:'',
        timeType:'1'
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
  created(){
     this.queryAuthList()
  },
  mounted(){
    this.form.startTime = this.getNaturalMonth(-1).tYear+'-'+this.getNaturalMonth(-1).tMonth+'-'+'01'
    // this.form.startTime = '2016-06-04'
    this.form.endTime = this.getNaturalMonth(-1).tYear+'-'+this.getNaturalMonth(-1).tMonth+'-'+this.getNaturalMonth(-1).tDate
    this.getMerchantFirst() //获取商户自然属性一级
    this.getIndustryAchievementProperty() //获取 行业业绩属性
    this.query()
  },
  methods:{
    getLdData(){  //数据维度联动
      this.select.dataTag = this.form.dataType  //赋值
      this.select.childTag =  [-1] //赋值
      this.select.kycCognizance = 'kyc'
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
      var newp = this.addSessionId(self.form)
      this.$axios.post('/report/getFraudAndHitP',qs.stringify(newp)).then(res => {
        var response = res.data
        if(response.code == '200'){
          if(JSON.stringify(response.data) == "{}"){
            self.clearData()
            this.drawLine()
            return false
          }
          option.xAxis[0].data = response.data.times  //时间
         
          if(response.data.times.length>12){  //控制x轴显示行为  数据量大的时候
            option.xAxis[0].axisLabel.rotate=30
          }else if(response.data.times.length>24){
             option.xAxis[0].axisLabel.rotate=60
          }
          option.series[0].data = this.dostr(response.data.transactionMoney) //成功交易额(yi元)
          option.series[1].data = this.dostr(response.data.fraudMoney) //成功欺诈额(万元)
          option.series[2].data = this.dostr(response.data.interceptMoney) //拦截欺诈额(万元)
          option.series[3].data = this.dostr(response.data.fraudLossP) //欺诈损失率(0.01BP)
          option.series[4].data = this.dostr(response.data.coverRate )//金额覆盖率(%)
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
      params.typeValue = this.select.kycCognizance == '全部'? 'all' : this.select.kycCognizance
      var codestringlist = this.getCode(this.oneProductSelect)
      params.product = codestringlist
      var newp = this.addSessionId(params)
      this.$axios.post('/report/getFraudAndHitR',qs.stringify(newp)).then(res => {
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
    addproductCheck(){//增加产品
      this.productCheckshow = true
    },
    addproperty(){//增加商户自然一级属性
      this.onepropertySelectshow = true
      
    },
    handleCheckAllproductChange(val) {  //产品
      var self = this
      var checkedlist = []
      var checkedlistCode = []
      this.oneProductSelect.map(function(item){
        checkedlist.push(item.label)
      })
      this.checkedProduct = val ? checkedlist : [];
      this.isProduct = false;
    },
    handleCheckedproductChange(value) {  //处理产品
      let checkedCount = value.length;
      this.checkAllProduct = checkedCount === this.oneProductSelect.length;
      this.isProduct = checkedCount > 0 && checkedCount < this.oneProductSelect.length;
    },
    getProductStatus(){  //获取选中的产品
      this.product = this.checkedProduct.join(',')
      this.productCheckshow = false
    },
    getStatus(){
      this.form.naturalPropertyOne = this.checkedOneproperty.join(',')
      this.onepropertySelectshow = false
    },
    setStatus(){  //点取消
      this.onepropertySelectshow = false 
    },
    downloadList() {//是否下载
        // var params =  this.form  //入参
        var self = this
        var newp = this.addSessionId(self.form)
        window.location = this.url+"/reportExcel/getFraudAndHitRExcel?" + qs.stringify(newp)
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
    handleCheckAllChange(val) {
      var checkedlist = []
      this.onepropertySelect.map(function(item){
        checkedlist.push(item.label)
      })
      this.checkedOneproperty = val ? checkedlist : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.onepropertySelect.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.onepropertySelect.length;
    },
    formater1(row, column){
      return row.transactionTotal.toLocaleString()
    },
    formater2(row, column){
      return row.fraudTransactionTotal.toLocaleString()
    },
     
     formater5(row, column){
      return this.addCommas(row.transactionMoney.toFixed(2))
    },
     formater6(row, column){
      return this.addCommas(row.fraudMoney.toFixed(2))
    },
     formater7(row, column){
      return this.addCommas(row.interceptMoney.toFixed(2))
    },
    formater8(row, column){
      return row.fraudLossP.toFixed(2)
    },
    formater9(row, column){
      return row.coverRate.toFixed(2)
    },
    formater14(row, column){
      return this.addCommas(row.payAmount.toFixed(2))
    }
  },
  components:{
    TableSelect,KycAndHyCheckbox
  }
}

const option = {
  title: {
    x:'center',
    text: '交易及欺诈统计表'
    },
  tooltip: {
        trigger: 'axis',
        formatter:function (params) {
         function addCommas(nStr){  //每三位分隔符
             nStr += '';
             var x = nStr.split('.');
             var x1 = x[0];
             var x2 = x.length > 1 ? '.' + x[1] : '';
             var rgx = /(\d+)(\d{3})/;
             while (rgx.test(x1)) {
              x1 = x1.replace(rgx, '$1' + ',' + '$2');
             }
             return x1 + x2;
          }
          var str0=''
          var str=''
          params.map(function(item,index){
            str0=item[1]+'\<br>'
            str+=item[0]+': '
            if(index==0 || index==1 || index==2 || index==3){
              str+=addCommas(Number(item[2]).toFixed(2))+'\<br>'
            }
            if(index==4){
              str+=Number(item[2]).toFixed(2)+'\<br>'
            }
            
          })
          return str0+str
        }
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
        data:['成功交易额(亿元)','成功欺诈额(万元)','拦截欺诈额(万元)','欺诈损失率(0.01BP)','金额覆盖率(%)']
    },
    xAxis: [
        {
          splitLine:{show: false},//去除网格线
          type: 'category',
          data: [],
          // axisPointer: {
          //       type: 'shadow'
          // },
          axisLabel:{
              rotate: 0,
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
            name: '金额',
           splitNumber:5,
            axisLabel: {
                formatter: '{value}'
            }
        },
        {
            type: 'value',
            name:'欺诈损失率(0.01BP) 金额覆盖率(%)',
           splitNumber:5,
            axisLabel: {
                formatter: '{value}'
            }
        }
    ],
    series: [
        {
          symbol: "none",// 去掉折线上面的小圆点
          barMaxWidth:30,
            name:'成功交易额(亿元)',
            type:'bar',
            data:[ ]
        },
        {
          symbol: "none",// 去掉折线上面的小圆点
          barMaxWidth:30,
            name:'成功欺诈额(万元)',
            type:'bar',
            data:[ ]
        },
        {
          symbol: "none",// 去掉折线上面的小圆点
            name:'拦截欺诈额(万元)',
            barMaxWidth:30,
            type:'bar',
            data:[ ]
        },
        {
          symbol: "none",// 去掉折线上面的小圆点
            name:'欺诈损失率(0.01BP)',
            type:'line',
            yAxisIndex: 1,
            data:[]
        },
        {
          symbol: "none",// 去掉折线上面的小圆点
            name:'金额覆盖率(%)',
            type:'line',
            yAxisIndex: 1,
            data:[]
        }
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
