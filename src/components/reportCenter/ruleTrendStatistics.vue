<!--规则有效性趋势统计-->
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
                                    <el-radio-group v-model="form.timeType" @change="changeQuery">
                                      <el-radio label="1">月</el-radio>
                                      <el-radio label="2">周</el-radio>
                                    </el-radio-group>
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
                            <div class="formConClass">
                                <el-form-item label="商户编号:" prop="merchantNo">
                                   <el-input v-model="form.merchantNo" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item class="pr" label="商户自然属性一级:" prop="naturalPropertyOne" >
                                 <el-input class="fs12" v-model="form.naturalPropertyOne" placeholder="请选择" style="width: 90%;max-width:225px;" @focus="addproperty"></el-input>
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
                                        <el-button @click="onepropertySelectshow=false">取消</el-button>
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
                            <div class="formConClass">
                                <el-form-item label="行业业绩属性:" prop="industryAchievementProperty">
                                    <el-select v-model="form.industryAchievementProperty" placeholder="请选择" style="width: 90%;max-width:225px;" >
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
                                <el-form-item label="业务线:" prop="businessLine">
                                    <el-select  @change="getProductsec(form.businessLine)" v-model="form.businessLine" placeholder="请选择" style="width: 90%;max-width:225px;">
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
                        <el-button type="primary" v-show="authdownload" class="serchbtn" icon="el-icon-refresh" @click='downloadList'>下载</el-button>
                    </div>
                </div>
            </el-collapse-transition>

            <!-- 图表 -->
            <div id="myChart" class="center" :style="{width: '1200px', height: '400px'}"></div>
            <!-- 表格 -->
            <el-table
              class="mt20"
               border
               fixed 
               max-height="600"
              :data="tableData">
              <el-table-column
                v-if="tableDataSec.businessTime[0]"
                prop="businessTime"
                label="时间"
                sortable
                show-header
                show-overflow-tooltip
                width="200"
                :render-header="companyRenderHeader"
              >
              </el-table-column>
              <el-table-column
                v-if="tableDataSec.transaction[0]"
                prop="transaction"
                label="交易笔数"
                sortable
                show-overflow-tooltip
                width="180"
                :render-header="companyRenderHeader"
                :formatter="formater1"
                >
              </el-table-column>
              <el-table-column
                v-if="tableDataSec.alarmTransaction[0]"
                prop="alarmTransaction"
                label="报警笔数"
                width="180"
                 sortable
                show-overflow-tooltip
                :render-header="companyRenderHeader"
                 :formatter="formater2"
                >
              </el-table-column>
              <el-table-column
                v-if="tableDataSec.fraudTransaction[0]"
                prop="fraudTransaction"
                label="欺诈笔数"
                width="180"
                 sortable
                show-overflow-tooltip
                :render-header="companyRenderHeader"
                :formatter="formater3"
                >
              </el-table-column>
              <el-table-column
                v-if="tableDataSec.hitTransaction[0]"
                prop="hitTransaction"
                label="命中笔数"
                width="180"
                 sortable
                show-overflow-tooltip
                :render-header="companyRenderHeader"
                :formatter="formater4"
                >
              </el-table-column>
              <el-table-column
                v-if="tableDataSec.alarmRate[0]"
                prop="alarmRate"
                label="报警率%"
                width="180"
                 sortable
                show-overflow-tooltip
                :render-header="companyRenderHeader"
                >
              </el-table-column>
              <el-table-column
                v-if="tableDataSec.hitRate[0]"
                prop="hitRate"
                label="命中率%"
                width="180"
                 sortable
                show-overflow-tooltip
                :render-header="companyRenderHeader"
                >
              </el-table-column>
              <el-table-column
                v-if="tableDataSec.coverRate[0]"
                prop="coverRate"
                label="覆盖率%"
                width="118"
                 sortable
                show-overflow-tooltip
                :render-header="companyRenderHeader"
                >
              </el-table-column>
            </el-table>
        </div>
        <!-- 表格每列的列选择 注意：每页都需要手动改变top值-->
        <div ref="list" class="list pa none bgccc" style="top:860px;">
          <TableSelect  :tableDataSec="tableDataSec" ></TableSelect>
        </div>
        <div class="mt20 mb30">
            <div class='pagination'>
                <span>每页显示</span> 
                 <el-select @change="handleSizeChange($event)" v-model="currenteveryno" style="width: 25%;">
                    <el-option label="10" value="10"></el-option>
                    <el-option label="20" value="20"></el-option>
                    <el-option label="30" value="30"></el-option>
                    <el-option label="40" value="40"></el-option>
                </el-select>
            </div>
            <div class='paginationRight'>
               <el-pagination
                layout="total,prev, pager, next"
                :current-page="1"
                :page-sizes="[10,20,30,40]"
                :page-size="Number(currenteveryno)"
                :total=length
                @size-change="handleSizeChange($event)"
                @current-change="handleCurrentChange">
               </el-pagination>
               
            </div>
        </div>
    </div>
</template>
<script>
import qs from 'qs'
import TableSelect from '../tableSelect/tableSelect.vue'
 var loadingTicket,myChart
export default {
   name:'规则有效性趋势统计',
  data(){
      return{
         end: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        authsearch:true,
        authdownload:true,
        currenteveryno:20,//每页10条
        checkAll: false,
        checkAllProduct: false,
        onepropertySelectshow:false,//商户自然一级属性
        checkedOnepropertyCode:[],//选中的编码
        checkedOneproperty: [],//checkedOneproperty
        onepropertySelect: [],
        isIndeterminate: true,
        isProduct: true,
        productCheckshow:false,//产品下拉框显示
        checkedProduct: [],//checkedProduct
        checkedProductCode: [],//checkedProductCode
        oneProductSelect: [],
        tableDataSec:{  //控制列显示
          businessTime:[true,'时间'],
          transaction:[true,'交易笔数'],
          alarmTransaction:[true,'报警笔数'],
          fraudTransaction:[true,'欺诈笔数'],
          hitTransaction:[true,'命中笔数'],
          alarmRate:[true,'报警率'],
          hitRate:[true,'命中率'],
          coverRate:[true,'覆盖率']
        },
        tableData: [],
        productArray:[],//产品
        worktypeArray:[],//行业属性
        //规则类型
        ruleTypeArray:[],
        serchToggle:true,
      form:{
        timeType:'1',//刻度
        startTime:'',
        endTime:'',
        merchantNo:'', //商户编号
        naturalPropertyOne:'', //自然属性一级
        product:'',//产品
        industryAchievementProperty:'',//行业业绩属性
        ruleType:'',
        businessLine:'all',
      },
      product:'',
      currentPage:1,// 分页
      pageNumber:1,
      pageRow:10,
      length:0    
  }
  },
  mounted(){
    this.form.startTime = this.getNaturalMonth(-1).tYear+'-'+this.getNaturalMonth(-1).tMonth+'-'+'01'
    this.form.endTime = this.getNaturalMonth(-1).tYear+'-'+this.getNaturalMonth(-1).tMonth+'-'+this.getNaturalMonth(-1).tDate
    this.getMerchantFirst();//获取商户自然属性一级
    this.getProductsec('all')//获取产品
    this.getIndustryAchievementProperty() //获取 行业业绩属性
    this.getProductsec('all');
    this.query()
    // this.drawLine()
  },
  methods:{
    changeQuery(val){  //时间刻度
      this.pageNumber = 1
       this.query()
    },
    clearData(){
      option.xAxis[0].data = []  //时间
      option.series[0].data = 0 //报警
      option.series[2].data = 0 //覆盖
      option.series[1].data = 0 //命中
    },
    query(){  //查询
      this.getTable()
      this.getChartData()
    },
    queryAuthList(){  //权限管理
      var arr = localStorage.getItem('ARRLEVEL')?localStorage.getItem('ARRLEVEL'):[]
        arr.map(function(ele){
            switch(ele){
                case 178 || 221:
                    this.authsearch= true
                break;
                case 179:
                    this.authdownload= true
                break;
            }
        })
    },
    getChartData(){  //统计图
      var self = this
      var newp = this.addSessionId(self.form)
      this.$axios.post('/report/getRuleEffeTrendP',qs.stringify(newp)).then(res => {
        var response = res.data
        if(response.code == '200'){
          if(JSON.stringify(response.data) == "{}"){
            self.clearData()
            this.drawLine()
            return false
          }
            option.xAxis[0].data = response.data.times  //时间
            option.series[0].data = response.data.alarmRate //报警
            option.series[2].data = response.data.coverRate //覆盖
            option.series[1].data = response.data.hitRate //命中
            this.drawLine();
        }else{
          this.$message.error({message:response.msg,center: true});
        }
      }) 
    },
    getTable(){   //统计表
      var params =  this.form
      params.pageNumber = this.pageNumber
      params.pageRow = this.currenteveryno
      
     var codestringlist = this.getCode(this.oneProductSelect)
      params.product = codestringlist
     
      this.$axios.post('/report/getRuleEffeTrendR',qs.stringify(params)).then(res => {
        var response = res.data
        if(response.code == '200'){
            this.tableData = response.data.returnList
            this.length =  response.data.total;
        }else{
          this.resultData = []
            this.length = 0
            this.$message.error({message:response.msg,center: true});
        }
      }) 
    },
    addproperty(){//增加商户自然一级属性
      this.onepropertySelectshow = true
    },
    addproductCheck(){//增加产品
      this.productCheckshow = true
    },
    getStatus(){
      this.form.naturalPropertyOne = this.checkedOneproperty.join(',')
      this.onepropertySelectshow = false
    },
    getProductStatus(){  //获取选中的产品
      this.product = this.checkedProduct.join(',')
      this.productCheckshow = false
    },
    downloadList() {//是否下载
        var params =  this.form  //入参
        window.location = this.url+"/reportExcel/getRuleEffeTrendRExcel?" + qs.stringify(params)
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
    handleCheckAllChange(val) {//商户属性
      var self = this
      var checkedlist = []
      this.onepropertySelect.map(function(item){
        checkedlist.push(item.label)
        self.checkedOnepropertyCode.push(item.value)  //保存选中的码
      })
      this.checkedOneproperty = val ? checkedlist : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {  //商户属性
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.onepropertySelect.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.onepropertySelect.length;
    },
    formater1(row, column){
      return row.transaction.toLocaleString()
    },
    formater2(row, column){
      return row.alarmTransaction.toLocaleString()
    },
    formater3(row, column){
      return row.fraudTransaction.toLocaleString()
    },
     formater4(row, column){
      return row.hitTransaction.toLocaleString()
    }
  },
  components:{
    TableSelect
  }
}
const option = {
  title: {
    x:'center',
    text: '规则有效性趋势统计'
    },
  tooltip: {
        trigger: 'axis',
        formatter:function (params) {
          var str0=''
          var str=''
          params.map(function(item,index){
            str0=item[1]+'\<br>'
            str+=item[0]+': '
            if(item[2].indexOf('%') == -1){
              str+=item[2]+'%\<br>'
            }else{
              str+=item[2]+'\<br>'
            }
            
          })
          return str0+str
        },
  },
  toolbox: {
   show : true,
    feature : {
        saveAsImage : {show: true}
    }
  },
  legend: {
      y:'38px',
        data:['报警率','命中率','覆盖率']
  },
  xAxis: [
        {
          splitLine:{show: false},//去除网格线
            type: 'category',
            data: ['x'],
            axisPointer: {
                type: 'shadow'
            },
            axisLabel: {  
             interval:0,  
             rotate:75 ,
             width:'auto',
             height:'200px',
             showMaxLabel:true,
             backgroundColor:'red'

            }
        }
  ],
  grid: { // 控制图的大小，调整下面这些值就可以，
       y2: 160,// y2可以控制 X轴跟Zoom控件之间的间隔，避免以为倾斜后造成 label重叠到zoom上  控制x轴刻度线高度
   },
  yAxis: [
        {
          splitNumber:5,
            type: 'value',
            name: '报警率  命中率',
            axisLabel: {
                formatter: '{value}%'
            }
        },
        {
            splitNumber:5,
            type: 'value',
            name: '覆盖率',
            axisLabel: {
                formatter: '{value}%'
            }
        }
  ],
  series: [
        {
            symbol: "none",// 去掉折线上面的小圆点
            name:'报警率',
            type:'line',
            data:[ '0']
        },
        {
           symbol: "none",// 去掉折线上面的小圆点
            name:'命中率',
            type:'line',
            data:['0']
        },
        {
          symbol: "none",// 去掉折线上面的小圆点
            yAxisIndex: 1,  //右侧轴为准 显示刻度
            name:'覆盖率',
            type:'line',
            data:['0']
        } 
  ]
}
</script>
<style scoped>
/*商户自然属性一级 start*/
.el-table::before{height:0px;}
.el-table--border{border:1px solid #ebeef5;}
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
