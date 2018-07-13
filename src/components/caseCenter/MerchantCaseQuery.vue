<!--商户核查单管理是  谁-->
<template>
    <div id="cuschecklist"  @click="allarea($event)">
        <div class="searchBasic">
            <div class="title" >
                <i class="el-icon-arrow-down toggleIcon" @click="serchToggle = !serchToggle"></i>
                <span>基础查询</span>
            </div>
            <el-collapse-transition>
                <div class="searchContentgray" id="searchContentgray" v-show="serchToggle">
                    <div class="leftContent" >
                        <el-form ref="form" :model="form" label-width="115px" :rules="rules" class="demo-ruleForm">
                            <div class="formConClass">
                                <el-form-item label="开始时间:" prop="startTime">
                                    <el-date-picker  v-model="form.startTime" value-format="yyyy-MM-dd HH:mm:ss"
                                      type="datetime" placeholder="选择日期时间" style="width: 110%;"></el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="结束时间:" prop="endTime" label-width="115px">
                                    <el-date-picker  v-model="form.endTime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期时间" style="width: 110%;"></el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="商户编号:" prop="merchantNo">
                                     <el-input v-model="form.merchantNo" placeholder="请输入" style="width: 90%;"></el-input>
                                </el-form-item>
                            </div>
                           
                            <div class="formConClass">
                                <el-form-item label="商户签约名:" prop="merchantContractName">
                                    <el-input v-model="form.merchantContractName" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                             <div class="formConClass">
                                <el-form-item label="处理结果:" prop="dealStatus">  
                                    <el-select v-model="form.dealStatus" placeholder="请选择" style="width: 90%;max-width:225px;">
                                        <el-option label="全部" value="all"></el-option>
                                        <el-option
                                            v-for="item in cljgArray"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="案件来源:" prop="caseSource">
                                    <el-select v-model="form.caseSource" placeholder="请选择" style="width: 90%;max-width:225px;">
                                        <el-option label="全部" value="all"></el-option>
                                       <el-option
                                            v-for="item in ajlyArray"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="商户业绩归属:" prop="achievementProperty">  
                                    <el-select v-model="form.achievementProperty" placeholder="请选择" style="width: 90%;max-width:225px;">
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
                                <el-form-item label="案件号:" prop="caseNumber">
                                    <el-input v-model="form.caseNumber" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="分公司:" prop="subCompany">
                                    <el-input v-model="form.subCompany" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                        </el-form>
                    </div>
                    <div class="rightContent" v-show="!seniorSearchToggle">
                        <el-button type="primary" v-show="authsearch1" class="serchbtn" icon="el-icon-search" @click='listQuery("/case/getAll","case",false)'>查询</el-button>
                        <el-button type="primary" v-show="authreset1" class="serchbtn" icon="el-icon-refresh" @click='reset("case")'>重置</el-button>
                    </div>
                </div>
            </el-collapse-transition>
        </div>
        <div class="seniorSearch">
            <div class="title">
                <i class="el-icon-arrow-down toggleIcon" @click="seniorSearchToggle = !seniorSearchToggle"></i>
                <span>高级查询</span>
            </div>
            <el-collapse-transition>
                <div class="seniorSearchContent activeToggle" v-show="seniorSearchToggle"> 
                    <div class="leftContent" >
                        <el-form ref="formSenior" :model="formSenior" label-width="134px" :rules="rules" class="demo-ruleForm">
                             
                            <div class="formConClass">
                                <el-form-item label="代理商编号:" prop="agentNo">
                                    <el-input v-model="formSenior.agentNo" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="代理商名称:" prop="agentName">
                                    <el-input v-model="formSenior.agentName" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                              <div class="formConClass">
                                <el-form-item label="销售:" prop="sale">
                                    <el-input v-model="formSenior.sale" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                        </el-form>
                    </div>
                    <div class="rightContent1" v-show="seniorSearchToggle">
                        <el-button type="primary" v-show="authsearch2" class="serchbtn" icon="el-icon-search" @click='listQuery("/case/getAll","case",false)'>查询</el-button>
                        <el-button type="primary" v-show="authreset2" class="serchbtn" icon="el-icon-refresh" @click='reset("case")'>重置</el-button>
                    </div>
                </div>
            </el-collapse-transition>
        </div>
        <div class="tableData">
            
            <div class="contentBotoom clear">
                <div class="button fl">
                    <div class="leftButton clear ">
                        <div class="BotoomBtn leftRadius" v-show="authcj" title="创建" @click="createformElementVisible = true">
                            <div class="cj"></div>
                        </div>
                        <div class="BotoomBtn" v-show="authdr" title="导入" @click="importe = true">
                            <div class="dr"></div>
                        </div>
                        <div class="BotoomBtn rightRadius" v-show="authdownload" title="下载" @click="downList">
                            <div class="xz"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <el-table
                   fixed
                   max-height="600"
                  @selection-change="selectedItemsid"
                    :data="lsstTable"
                     v-loading="loading"
                    border
                    style="width: 100%"
                    v-if="lsstShow"
                    >
                    <el-table-column
                        type="selection"
                        width="50">
                    </el-table-column>
                    <el-table-column
                     v-if="tableDataSec.caseNumber[0]"
                        prop="caseNumber"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        label="案件号"
                        width="150">
                    </el-table-column>
                    <el-table-column
                     v-if="tableDataSec.createTime[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="createTime"
                        label="生成时间"
                        width="150">
                    </el-table-column>
                    <el-table-column
                     v-if="tableDataSec.merchantNo[0]"
                        prop="merchantNo"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        label="商户编号"
                        width="150">
                    </el-table-column>
                    <el-table-column
                     v-if="tableDataSec.merchantName[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="merchantName"
                        label="商户名称"
                        width="150">
                    </el-table-column>
                    <el-table-column
                     v-if="tableDataSec.contractName[0]"
                        prop="contractName"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        label="商户签约名"
                        width="150">
                    </el-table-column>
                    <el-table-column
                     v-if="tableDataSec.dealStatus[0]"
                        prop="dealStatus"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        label="处理结果"
                        width="150">
                    </el-table-column>
                    <el-table-column
                     v-if="tableDataSec.caseSource[0]"
                        prop="caseSource"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        label="案件来源"
                        width="150">
                    </el-table-column>
                    <el-table-column
                     v-if="tableDataSec.merchantNetTime[0]"
                        prop="merchantNetTime"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        label="商户入网时间"
                        width="150">
                    </el-table-column>
                    <el-table-column
                     v-if="tableDataSec.achievementProperty[0]"
                        prop="achievementProperty"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        label="商户业绩属性"
                        width="150">
                    </el-table-column>
                     <el-table-column
                      v-if="tableDataSec.sale[0]"
                        prop="sale"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        label="销售"
                        width="150">
                    </el-table-column>
                     <el-table-column
                      v-if="tableDataSec.subCompany[0]"
                        prop="subCompany"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        label="分公司"
                        width="150">
                    </el-table-column>
                     <el-table-column
                      v-if="tableDataSec.naturalPropertyOne[0]"
                        prop="naturalPropertyOne"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        label="商户一级属性"
                        width="150">
                    </el-table-column>
                     <el-table-column
                      v-if="tableDataSec.naturalPropertyTwo[0]"
                        prop="naturalPropertyTwo"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        label="商户二级属性"
                        width="150">
                    </el-table-column>
                     <el-table-column
                      v-if="tableDataSec.remark[0]"
                        prop="remark"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        label="备注"
                        width="150">
                    </el-table-column>
                </el-table>
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
                    layout="total,prev, pager, next"
                    :page-sizes="[10,20,30,40]"
                    :page-size="Number(currenteveryno)"
                    :total=length
                    @current-change="handleCurrentChange">
                   </el-pagination>
                   
                </div>
            </div>
        </div>
        <!-- 上传文件弹框 -->
        <el-dialog title="导入" :visible.sync="importe" width="570px">
            <div>
                本地文件：<el-input placeholder="点击帮助以查看具体格式要求" v-model="fileData" class="listValInp"></el-input>
                 <label for="filename">
                    <button class="fr mr10">选择文件</button>
                    <form enctype="multipart/form-data" id="formsubmit" >
                       <input  class="formIpt" type="file" id="filename" style="opacity:0;" name="filename" @click="fileChangeClick" @change="fileChange($event)" :value="valueText">
                    </form>
                </label>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" style="float:left;" @click="downloadModel">下载模板</el-button>
              <el-button type="primary" @click="innerVisible = true">帮 助</el-button>
              <el-button type="primary" @click="upload">确 定</el-button>
              <el-button @click="importeBtn">取 消</el-button>
            </span>
              <!-- 帮助信息提示弹框 -->
              <el-dialog width="700px" title="导入的文件格式要求" :visible.sync="innerVisible" append-to-body>
                  <table class="importData tl ml20">
                      <thead>
                          <tr>
                              <th width="160">字段名</th>
                              <th width="160">字段格式要求</th>
                          </tr>
                      </thead>
                      <tr>
                          <th width="160">商户编号<i style="color:red;">(必填项)</i></th>
                          <td width="160">数字</td>
                      </tr>
                       
                      <tr>
                          <th width="160">处理结果<i style="color:red;">(必填项)</i></th>
                          <td width="320">关闭收单、关闭客户状态、已整改、冻结账户状态</td>
                      </tr>
                       <tr>
                          <th width="160">备注</th>
                          <td width="160">字数不能多于100个字</td>
                      </tr>
                  </table>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="innerVisible = false">已了解</el-button>
                  </span>
              </el-dialog>
        </el-dialog>
         
        <!-- 创建弹框 -->
        <el-dialog title="" :visible.sync="createformElementVisible" width="600px">  
          <el-form :model="createform" :rules="rules2" ref="createformElement">
            <el-form-item label="商户编号" :show-message="false" :label-width="formLabelWidth" prop="merchantNo">
              <el-input v-model="createform.merchantNo" auto-complete="off" @blur='checkMerchantNo(createform.merchantNo)'></el-input>
             <span class="errorbox" v-show="merchant" v-html="merchanttext"></span>
            </el-form-item>
            <el-form-item label="处理结果" :show-message="false" :label-width="formLabelWidth" prop="dealStatus">
              <el-select v-model="createform.dealStatus"  @change="isDealStatusError">
                 <el-option
                    v-for="item in cljgArray"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
               <span class="errorbox" v-show="dealStatus" v-html="dealStatustext"></span>
            </el-form-item>
            <el-form-item label="备注" :label-width="formLabelWidth" >
              <el-input v-model="createform.remark" maxlength="100" placeholder="请填写备注" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="createformElementVisible = false">取 消</el-button>
            <el-button type="primary" @click='addForm("createformElement",createform,"createformElementVisible")'>确 定</el-button>
          </div>
        </el-dialog>
        
        
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
  data(){
      return{
            authsearch1:false,
            authsearch2:false,
            authreset1:false,
            authreset2:false,
            authcj:false,
            authdr:false,
            authdownload:false,

            loading:true,
            currenteveryno:20,
            createformElementVisible:false,//创建核查单弹框显示与隐藏
            formLabelWidth: '120px',
            merchantnoisok:false,
            importe:false,
            innerVisible:false,
            uploadDataF:'',
            uploadDataS:'',
            fileData:'',//本地文件：
            seniorSearchToggle:false,
            serchToggle:true,
            ztstShow:false,
            ztstShowSec:false,
            lsstShow:true,
            lsstTable:[],
            tableDataSec:{
              caseNumber:[true,'案件号'],
              createTime:[true,'生成时间'],
              contractName:[true,'商户签约名称'],
              merchantNo:[true,'商户编号'],
              dealStatus:[true,'处理结果'],
              caseSource:[true,'案件来源'],
              merchantNetTime:[true,'商户入网时间'],
              achievementProperty:[true,'商户业绩属性'],
              sale:[true,'销售'],
              subCompany:[true,'分公司'],
              naturalPropertyOne:[true,'商户一级属性'],
              naturalPropertyTwo:[true,'商户二级属性'],
              remark:[true,'备注'],
              merchantName:[true,'商户名称']
            },
          form:{
            startTime:'',
            endTime:'',
            merchantNo:'',
            achievementProperty:'all',
            checkList:'',
            dealStatus:'all',
            caseSource:'all',
            merchantplace:'all',
            caseNumber:'',
            subCompany:''
          },
          formSenior:{
           agentNo:"",
           agentName:"",
           sale:"",
          },
           createform:{  //创建商户核查单
             merchantNo:'',
             dealStatus:'',
             remark:''
           },
          ajlyArray:[],//案件来源
          cljgArray:[],//处理结果
          zrsxyjArray:[],//商户自然属性一级
          worktypeArray:[],//商户业绩属性
          hcdlyArray:[],//核查单来源
          rules:{},
          rules2:{
            merchantNo: [
                {required: true, message: '请输入商户编号', trigger: 'blur'}
            ],
            dealStatus:[
                {required: true, message: '请选择处理结果', trigger: 'change'}
            ],
          },
          dealStatus:false,
          dealStatustext:'',
          merchant:false,
          merchanttext:'',
          idList:[],//id列表
          currentPage:1,// 分页
          pageNumber:1,
          pageRow:20,
          length:0,
          valueText:''    
      }
  },
   created(){
    this.form.startTime = this.getdiffTime(-7) +" 00:"+"00:"+"00"
    this.form.endTime = this.getdiffTime(0) +" 23:"+"59:"+"59"
    this.getDeal()//处理结果
    this.getCaseSource()//来源
    this.getIndustryAchievementProperty()//商户业绩归属
    this.listQuery("/case/getAll","case",false)
    this.queryAuthList()
  },
  methods:{
    fileChangeClick(){this.valueText = ''},
    isDealStatusError(){
         if(this.createform.dealStatus == '请选择' || this.createform.dealStatus == ''){
            this.dealStatus=true
            this.dealStatustext='请选择处理结果'
            return false
        }else{
            this.dealStatus=false
            return true
        }  
    },
    addForm(formName,params,hiddenElement){
        /*
          formName: 表单id  string
          params: 传入参数  {}
          hiddenElement: 控制表单显示的数据  string
        */
        var flag = this.isDealStatusError()  //判断处理结果
        if(!this.merchantnoisok){
            this.merchant=true
            this.merchanttext='请输入商户编号'
          }
      if(flag && this.merchantnoisok){
            this[hiddenElement] = false 
            params.sessionId = localStorage.getItem('SID') ? localStorage.getItem('SID'):''
            this.$axios.post('/case/add',qs.stringify(params)).then(res => {
              var response = res.data
              if(response.code == '200'){
                this.createform={  //创建商户核查单
                    merchantNo:'',
                    dealStatus:'请选择',
                    label:''
                }
                // this.merchantnoisok=false
                    this.listQuery("/case/getAll","case",false)
              }else{
                  this.$message.error({message:response.msg,center: true});
              }
          }) 
        }
     }, 
    handleSizeChange() {  //更改页数
        this.pageRow = this.currenteveryno
        this.listQuery("/case/getAll","case",false)
    },
    handleCurrentChange(val) {  //处理当前页
         this.pageNumber = `${val}`  //当前页
         this.listQuery("/case/getAll","case",false)
    },
    queryAuthList(){  //权限管理
        var arr = localStorage.getItem('ARRLEVEL')?localStorage.getItem('ARRLEVEL'):[]
        var self = this
        JSON.parse(arr).map(function(ele){
            switch(ele){
                case 212:
                    self.authsearch1= true
                break;
                case 214:
                    self.authreset1= true
                break;
                case 213:
                    self.authsearch2= true
                break;
                case 214:
                    self.authreset2= true
                break;
                case 215:
                    self.authcj= true
                break;
                case 216:
                    self.authdr= true
                break;
                case 217:
                    self.authdownload= true
                break;
            }
        })
    },
    getDeal(){ // 处理结果
         var param = this.addSessionId({})
        this.$axios.post("/param/getDeal",qs.stringify(param)).then(res => {
            var response = res.data
            if(response.code == '200'){
                this.cljgArray = response.data.returnList
            }else{
                this.$message.error({message:response.msg,center: true});
            }
        })
    },
     getCaseSource(){ // 案件来源
        var param = this.addSessionId({})
        this.$axios.post("/param/getCaseSource",qs.stringify(param)).then(res => {
            var response = res.data
            if(response.code == '200'){
                this.ajlyArray = response.data.returnList
            }else{
                this.$message.error({message:response.msg,center: true});
            }
        })
    },
  importeBtn(){  //点击取消
    this.importe = false
    this.fileData = ''
    this.file = ''        
  },
   downloadModel(){  //下载模版
    var self = this
    var param = localStorage.getItem('SID') ? localStorage.getItem('SID'):''
    window.location=encodeURI(this.url+"/DownLoadCheckListController/downloadCaseCenterTemplate?sessionId="+param)
  },
  downList(){//下载
     var self = this
     var param = localStorage.getItem('SID') ? localStorage.getItem('SID'):''
    window.location=encodeURI(this.url+"/case/downLoad?id="+self.idList.join(',')+"&sessionId="+param)
  },
  fileChange(e){  //上传文件
    this.file = e.target.files[0]
    this.fileData = e.target.files[0].name
  },
  upload(){  //点击上传
    var self = this
        let formData = new FormData()
        formData.append('file',this.file)
        var sessionId = localStorage.getItem('SID') ? localStorage.getItem('SID'):''
        formData.append('sessionId',sessionId)
      this.$axios.post('/CaseCenterUpController/batchAddCaseCenterList',formData)
      .then(res => {
        this.uploadDataF = res.data.code
        this.uploadDataS = res.data.success_count
        this.errorData = res.data.fail_download_url
        if(this.file  == ''){
          this.$alert('不能上传空文件', '系统提示', {
            confirmButtonText: '确定',
          });
          return
        }
        if(this.uploadDataF == '200' ){ //成功
          this.$alert(res.data.msg, '系统提示', {
            confirmButtonText: '确定',
             callback:function(item){
                if(item == 'confirm'){
                    self.listQuery("/case/getAll","case",false)
                }
                
              }
          });
          this.importe = false
          this.fileData = ''
          this.file = ''        
        }else{  //失败
             var str = res.data.download ? '<a href="'+this.url+'/CaseCenterUpController/downloadCaseCenterListData" style="color:#409EFF;">下载</a>':'';
             var html = res.data.msg + str
          this.$confirm(html, '', {
                      confirmButtonText: '确定',
                      dangerouslyUseHTMLString: true
                    }) 
          this.fileData = ''
          this.file = ''        
        }
    })
    .catch(error => {
        console.log(error)
    })
  },
  },
  components:{
    TableSelect
  }
}
</script>
<style lang="less" scoped>
.errorbox{
    color: #f56c6c;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    top: 100%;
    left: 0;
    }
.ztstlist{
    margin-top: -20px;
    .checkbox{
        padding:12px 20px 12px 14px;
        border-left: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
         float: left;
    }
    .text{
        width:129px;
        border-left: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        padding:12px 10px;
        float: left;
        white-space:nowrap;
        overflow:hidden;
        -o-text-overflow:ellipsis;
        text-overflow:ellipsis;
    }
}
.checkbox{padding:12px 14px;}
.importData{line-height: 30px;}
.listValInp{width: 60%;height: 36px;}
.formIpt{
    padding: 0;
    width: 73px;
    height: 31px;
    float: right;
    margin-top: -37px;
    border: 0px;
}
.onf{
    display: inline;
    margin-left: 45px;
    font-size: 14px;
    color: #606266;
}
.lsst{
    margin-top: 15px;
    width: 84px;
    height: 26px;
    cursor: pointer;
    background: url(../../images/lsst.png) no-repeat ;
    display: inline-block;
    margin-left: 15px;
}


.tableData{
    width: 100%;
    height: auto;
    border-top: 1px solid #E0E0E0;
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
    margin-top:10px;
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
    padding-top: 20px;
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
