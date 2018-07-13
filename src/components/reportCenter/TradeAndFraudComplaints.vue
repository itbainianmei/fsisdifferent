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
                                <el-form-item label="时间刻度:" prop="timequa">
                                    <el-radio-group v-model="form.timequa" @change="xxx">
                                      <el-radio label="1">月</el-radio>
                                      <el-radio label="2">周</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="业务线:" prop="yewuxian">
                                    <el-select v-model="form.yewuxian" placeholder="请选择" style="width: 90%;max-width:225px;">
                                        <el-option label="全部" value="all"></el-option>
                                        <el-option label="线上" value="on"></el-option>
                                        <el-option label="线下" value="off"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="产品:" prop="product">
                                    <el-select v-model="form.product" placeholder="请选择" style="width: 90%;max-width:225px;">
                                        <el-option label="全部" value="all"></el-option>
                                         <el-option
                                              v-for="item in productArray"
                                              :key="item.value"
                                              :label="item.label"
                                              :value="item.value">
                                          </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="开始时间:" prop="jyStartTime">
                                    <el-date-picker  v-model="form.jyStartTime" type="datetime" placeholder="选择日期时间" style="width: 90%;max-width:225px;"></el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="结束时间:" prop="jyEndTime">
                                    <el-date-picker  v-model="form.jyEndTime" type="datetime" placeholder="选择日期时间" style="width: 90%;max-width:225px;"></el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="商户编号:" prop="yewuLine">
                                   <el-input v-model="form.merchantCode" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                             <div class="formConClass">
                                <el-form-item class="pr" label="商户自然属性一级:" prop="oneproperty" >
                                 <el-input v-model="form.oneproperty" placeholder="请选择" style="width: 90%;max-width:225px;" @focus="addproperty"></el-input>
                                 <span class="pa iconbox" @click="addproperty">
                                   <i class="el-icon-arrow-down"></i>
                                   <!-- <i class="el-icon-arrow-up"></i> -->
                                 </span>
                                     <!-- //商户自然属性一级 列表  自定义 onepropertySelectshow-->
                                    <div class="pa pt10 onepropertySelect" v-show="onepropertySelectshow">
                                            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                                            <el-checkbox-group v-model="checkedOneproperty" @change="handleCheckedCitiesChange">
                                              <el-checkbox v-for="city in onepropertySelect" :label="city.label" :key="city.value">{{city.label}}</el-checkbox>
                                            </el-checkbox-group>
                                            <div class="clear mt10 mb20">
                                            <el-button type="primary" @click="getStatus">确定</el-button>
                                            <el-button @click="setStatus">取消</el-button>
                                          </div>
                                    </div>
                                </el-form-item>
                            </div>
                           <div class="formConClass">
                              <el-form-item label="交易状态:" prop="status">
                                <el-select v-model="form.yejishuxing" placeholder="请选择" style="width: 90%;max-width:225px;">
                                    <el-option label="全部" value="all"></el-option>
                                    <el-option label="成功" value="success"></el-option>
                                    <el-option label="失败" value="fail"></el-option>
                                </el-select>
                              </el-form-item>
                            </div>
                        </el-form>
                    </div>
                    <div class="rightContent">
                        <el-button type="primary" class="serchbtn" icon="el-icon-search" @click='listQuery("/riskgod/union/epos/getAll","cuscheck")'>查询</el-button>
                        <el-button type="primary" class="serchbtn" icon="el-icon-refresh" @click='reset("cuscheck")'>下载</el-button>
                    </div>
                </div>
            </el-collapse-transition>

            <!-- 图表 -->
            <div id="myChart" class="center" :style="{width: '1200px', height: '400px'}"></div>
            <!-- 表格 -->
            <el-table
              class="pb30"
               border
              :data="tableData">
              <el-table-column
                v-if="tableDataSec.date[0]"
                prop="date"
                label="时间"
                sortable
                show-header
                show-overflow-tooltip
                width="170"
                :render-header="companyRenderHeader"
              >
              </el-table-column>
              <el-table-column
                v-if="tableDataSec.name[0]"
                prop="name"
                label="成功交易笔数"
                sortable
                show-overflow-tooltip
                width="140"
                :render-header="companyRenderHeader"
                >
              </el-table-column>
              <el-table-column
                v-if="tableDataSec.address[0]"
                prop="address1"
                label="成功欺诈笔数"
                width="138"
                 sortable
                show-overflow-tooltip
                :render-header="companyRenderHeader"
                >
              </el-table-column>
              <el-table-column
                v-if="tableDataSec.tag[0]"
                prop="tag"
                label="投诉笔数"
                width="118"
                 sortable
                show-overflow-tooltip
                :render-header="companyRenderHeader"
                >
              </el-table-column>
              <!-- <el-table-column
                v-if="tableData.address3"
                prop="address3"
                label="投诉金额（万元）"
                width="130"
                show-overflow-tooltip
                :filters="selectbox"
                :filter-method="filterHandler"
                >
              </el-table-column>
              <el-table-column
                v-if="tableData.address4"
                prop="address4"
                show-overflow-tooltip
                label="成功交易额(亿)"
                width="140">
              </el-table-column>
              <el-table-column
                v-if="tableData.address5"
                prop="address5"
                label="成功欺诈额(万元)"
                width="130"
                show-overflow-tooltip>
              </el-table-column>  
               <el-table-column
              v-if="tableData.address6"
                prop="address6"
                label="拦截欺诈额(万元)"
                width="130"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="address"
                label="欺诈损失率(0.01BP)"
                width="120"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="address"
                label="金额覆盖率(%)"
                width="130"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="address"
                label="投诉笔数占比(%)"
                width="130"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="address"
                label="投诉金额占比(%)"
                width="130"
                show-overflow-tooltip>
              </el-table-column> -->
            </el-table>
        </div>
        <!-- 表格每列的列选择 注意：每页都需要手动改变top值-->
        <div ref="list" class="list pa none bgccc" style="top:860px;">
          <TableSelect  :tableDataSec="tableDataSec" ></TableSelect>
        </div>
        <div class="block">
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
                layout="prev, pager, next"
                :page-sizes="[10,20,30,40,50]"
                :page-size="10"
                :total="length"
                @current-change="handleCurrentChange">
               </el-pagination>
               
            </div>
        </div>
    </div>
</template>
<script>
import TableSelect from '../tableSelect/tableSelect.vue'
export default {
  data(){
      return{
            currenteveryno:"10",//每页10条
            checkAll: false,
            checkedOneproperty: [],//checkedOneproperty
            onepropertySelect: [{ //商户自然一级属性
                "label":'拉史蒂芬孙拉',
                "status":false,
                "value":'ll'
              },
              {
                "label":'哈飞飞飞哈',
                "status":false,
                "value":'hh'
              },
              {
                "label":'哈哈',
                "status":false,
                "value":'fd'
              },
              {
                "label":'吼吼',
                "status":false,
                "value":"sdf"
              },
              {
                "label":'吼吼',
                "status":false,
                "value":"houhou"
              } ],
            isIndeterminate: true,
            onepropertySelectshow:false,//自然属性下拉框显示
            tableDataSec:{  //控制列显示
              date:[true,'时间'],
              name:[true,'成功交易笔数'],
              address:[true,'成功欺诈笔数'],
              tag:[true,'投诉笔数']
            },
            tableData: [{
              date: '2016-05-01-2016-05-31',
              name: '1115320',
              address: '上海市普陀区金沙江路 1518 弄',
              tag: '1'
            }, {
              date: '2016-06-01-2016-06-30',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1517 弄',
              tag: '2'
            }, {
              date: '2016-07-01-2016-07-31',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄',
              tag: '333'
            }, {
              date: '2016-08-01-2016-08-31',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1516 弄',
              tag: '23'
            }],
            productArray:[],//产品
            serchToggle:true,
          form:{
            jyStartTime:'',
            jyEndTime:'',
            yewuLine:'',
            product:'all',
            merchantCode:'',
            oneproperty:'',
            creditCardNumbers:'',
            MerchantsOrder:'',
            yewuxian:'all',
            personnel:'',
            yejishuxing:'',
            timequa:'1'
          },
           currentPage:1,// 分页
           pageNumber:1,
           pageRow:20,
           length:0    
      }
  },
  mounted(){
    this.form.jyStartTime = this.getNaturalMonth(-6).tYear+'-'+this.getNaturalMonth(-6).tMonth+'-'+'01'
    this.form.jyEndTime = this.getNaturalMonth(-1).tYear+'-'+this.getNaturalMonth(-1).tMonth+'-'+this.getNaturalMonth(-1).tDate
    this.drawLine();
  },
  methods:{
    xxx(val){
      // alert(val)
    },
    addproperty(){//增加商户自然一级属性
      this.onepropertySelectshow = true
      
    },
    getStatus(){
      this.form.oneproperty = this.checkedOneproperty.join(',')
      this.onepropertySelectshow = false
    },
    setStatus(){  //点取消
      this.onepropertySelectshow = false 
    },
    drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption(option);
    },
    handleSizeChange() {  //更改页数
        this.pageRow = this.currenteveryno
        this.listQuery("/riskgod/union/epos/getAll","epos")
    },
    handleCurrentChange(val) {  //处理当前页
         this.pageNumber = `${val}`  //当前页
         this.listQuery("/riskgod/union/epos/getAll","epos")
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
    }
  },
  components:{
    TableSelect
  }
}
const option = {
  tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            crossStyle: { color: '#999' }
        }
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    legend: {
        data:['成功交易额(千万元)','成功欺诈额(万元)','拦截欺诈额(万元)','欺诈损失率(BP)','金额覆盖率(%)']
    },
    xAxis: [
        {
            type: 'category',
            data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
            axisPointer: {
                type: 'shadow'
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '成功交易额(千万元)',
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
                formatter: '{value}'
            }
        },
        {
            type: 'value',
            name: '欺诈损失率(BP)  金额覆盖率(%)',
            min: 0,
            max: 25,
            interval: 5,
            axisLabel: {
                formatter: '{value}'
            }
        }
    ],
    series: [
        {
            name:'成功交易额(千万元)',
            type:'bar',
            data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
        },
        {
            name:'成功欺诈额(万元)',
            type:'bar',
            data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
        },
        {
            name:'拦截欺诈额(万元)',
            type:'bar',
            data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
        },
        {
            name:'欺诈损失率(BP)',
            type:'line',
            data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
        },
        {
            name:'金额覆盖率(%)',
            type:'line',
            yAxisIndex: 1,
            data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
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
.icon1{
    background: url(../../images/icon1.png) no-repeat;
    width: 39px;
    height: 28px;
    border-top-left-radius: 7px;
    border-bottom-left-radius: 7px;
}
.icon2{
    background: url(../../images/icon2.png) no-repeat;
    width: 39px;
    height: 28px;
}
.icon3{
    background: url(../../images/icon3.png) no-repeat;
    width: 39px;
    height: 28px;
}
.icon4{
    background: url(../../images/icon4.png) no-repeat;
    width: 39px;
    height: 28px;
    border-top-right-radius: 7px;
    border-bottom-right-radius: 7px;
}
.icon1:hover{
    background: url(../../images/icon1-2.png) no-repeat;
    width: 39px;
    height: 28px;
    border-top-left-radius: 7px;
    border-bottom-left-radius: 7px;
}
.icon2:hover{
    background: url(../../images/icon2-2.png) no-repeat;
    width: 39px;
    height: 28px;
}
.icon3:hover{
    background: url(../../images/icon3-2.png) no-repeat;
    width: 39px;
    height: 28px;
}
.icon4:hover{
    background: url(../../images/icon4-2.png) no-repeat;
    width: 39px;
    height: 28px;
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
