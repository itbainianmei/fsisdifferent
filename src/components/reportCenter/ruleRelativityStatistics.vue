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
                        <el-form ref="form" :model="form" label-width="134px" class="demo-ruleForm" :rules="rules"> 
                            <div class="formConClass">
                                <el-form-item label="开始时间:" prop="startTime">
                                    <el-date-picker  v-model="form.startTime" :picker-options="end"  value-format="yyyy-MM-dd"
                                       type="date" placeholder="选择日期时间" style="width: 100%"></el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="结束时间:" prop="endTime">
                                    <el-date-picker  v-model="form.endTime" value-format="yyyy-MM-dd" :picker-options="end"
                                     type="date" placeholder="选择日期时间" style="width: 100%;"></el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="主体规则代码:" prop="mainRuleCode">
                                   <el-input v-model="form.mainRuleCode" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                        </el-form>
                    </div>
                    <div class="rightContent">
                        <el-button type="primary" class="serchbtn" v-show="authsearch" icon="el-icon-search" @click='getTable("form")'>查询</el-button>
                        <el-button type="primary" class="serchbtn" v-show="authdownload" icon="el-icon-refresh" @click='downloadList("form")'>下载</el-button>
                    </div>
                </div>
            </el-collapse-transition>
            <!-- 表格 -->
              <ul class="clear mb10 ml30">
                <li class="fl ztcode1">
                  主体规则代码:<span ref="ztcode1"></span>
                </li>
                <li class="fl ztcode1">
                  主体规则报警数:<span ref="ztcode3"></span>
                </li>
                <li class="fl c666">
                  主体规则报警率:<span ref="ztcode4"></span>
                </li>
              </ul>
              <el-table style="width:auto !important;"
               border
                v-loading="loading"
               fixed 
               max-height="600"
              :data="tableData" >
              <el-table-column
                v-if="tableDataSec.relevantRuleCode[0]"
                prop="relevantRuleCode"
                label="相关规则代码"
                sortable
                show-header
                show-overflow-tooltip
                width="240"
                :render-header="companyRenderHeader"
              >
              </el-table-column>
              
              <el-table-column
                v-if="tableDataSec.relevantRuleAlarm[0]"
                prop="relevantRuleAlarm"
                label="相关规则报警数"
                width="250"
                 sortable
                show-overflow-tooltip
                :render-header="companyRenderHeader"
                :formatter="formater1"
                >
              </el-table-column>
              <el-table-column
                v-if="tableDataSec.relevantRuleAlarmRate[0]"
                prop="relevantRuleAlarmRate"
                label="相关规则报警率%"
                width="250"
                 sortable
                show-overflow-tooltip
                :render-header="companyRenderHeader"
                :formatter="formater3"
                >
              </el-table-column>
              <el-table-column
                v-if="tableDataSec.ruleTriggerTotal[0]"
                prop="ruleTriggerTotal"
                label="共同触发数"
                width="250"
                 sortable
                show-overflow-tooltip
                :render-header="companyRenderHeader"
                :formatter="formater2"
                >
              </el-table-column>
              <el-table-column
                v-if="tableDataSec.relevantRuleParameter[0]"
                prop="relevantRuleParameter"
                label="规则相关性系数%"
                width="242"
                 sortable
                show-overflow-tooltip
                :render-header="companyRenderHeader"
                :formatter="formater4"
                >
              </el-table-column>
              
            </el-table>
            <div class="mt10">
              <div class='pagination'>
                  <span>每页显示</span> 
                   <el-select @change="handleSizeChange" v-model="currenteveryno" style="width: 28%;">
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
export default {
  name:'规则相关性统计报表',
  data(){
      return{
        end: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
         authsearch:false,
        authdownload:false,
        loading:false,
        currenteveryno:20,//每页10条
        tableDataSec:{  //控制列显示  key和table prop一致
          relevantRuleCode:[true,'相关规则代码'],
          relevantRuleAlarm:[true,'相关规则报警数'],
          relevantRuleAlarmRate:[true,'相关规则报警率'],
          ruleTriggerTotal:[true,'共同触发数'],
          relevantRuleParameter:[true,'规则相关性系数']
        },
        tableData: [],
        serchToggle:true,
        rules: {
          mainRuleCode:[
              {required: true, message: '请输入主体规则代码', trigger: 'blur'}
            ],
        },
        form:{
          startTime:'',
          endTime:'',
          mainRuleCode:''
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
     this.form.startTime = this.getdiffTime(-10)
    this.form.endTime = this.getdiffTime(0)
  },
  methods:{
    clearData(){
      this.$refs.ztcode1.innerHTML = 0 //主体规则代码
      this.$refs.ztcode3.innerHTML = 0  //报警数
      this.$refs.ztcode4.innerHTML = 0  //报警率
      this.tableData = []
      this.length = 0;
    },
     getTable(formName){   //统计表
      var self = this
      var params =  this.form
      params.pageNumber= this.pageNumber
      params.pageRow= this.pageRow
      this.$refs[formName].validate((valid) => {
        if (valid) {
         this.loading = true
         var newp = this.addSessionId(params)
          this.$axios.post('/report/getRuleRelative',qs.stringify(newp)).then(res => {
            var response = res.data
            this.loading = false
            if(response.code == '200'){
              if(JSON.stringify(response.data) == "{}"){
                self.clearData()
                return false
              }
                this.$refs.ztcode1.innerHTML = response.data.mainRuleCode //主体规则代码
                this.$refs.ztcode3.innerHTML = response.data.mainRuleAlarm  //报警数
                this.$refs.ztcode4.innerHTML = response.data.mainRuleAlarmRate  //报警率
                this.tableData = response.data.returnList
                this.length = response.data.total;
            }else{
              this.resultData = []
                this.length = 0
                this.$message.error({message:response.msg,center: true});
            }
          }) 
        }
      })
    },
     queryAuthList(){  //权限管理
         var self = this
      var arr = localStorage.getItem('ARRLEVEL')?localStorage.getItem('ARRLEVEL'):[]
        JSON.parse(arr).map(function(ele){
            switch(ele){
                case 190:
                    self.authsearch= true
                break;
                case 191:
                    self.authdownload= true
                break;
            }
        })
    },
    downloadList(formName) {//是否下载
      this.$refs[formName].validate((valid) => {
        if (valid) {
        var params =  this.form  //入参
        var newp = this.addSessionId(params)
        window.location = this.url+"/reportExcel/getRuleRelativeExcel?" + qs.stringify(newp)
        }
      })
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
      return row.relevantRuleAlarm.toLocaleString()
    },
    formater2(row, column){
      return row.ruleTriggerTotal.toLocaleString()
    },
    formater3(row, column){
      return row.relevantRuleAlarmRate.toLocaleString()
    },
    formater4(row, column){
      return this.addCommas(row.relevantRuleParameter.toFixed(2))
    }
  },
  components:{
    TableSelect
  }
}
 
</script>

<style scoped>
.el-table::before{height:0px;}
.el-table--border{border:1px solid #ebeef5;}
.circle{width:30px;height:30px;border-radius: 50%;display: inline-block;}
.ztcode1{margin-right: 120px;color:#666;}
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
.list{padding:10px 20px;border:1px solid #ddd;border-radius: 4px;line-height: 30px;}
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
