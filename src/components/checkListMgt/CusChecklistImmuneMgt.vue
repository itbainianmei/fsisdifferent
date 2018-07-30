<!--商户核查单管理 -->
<template>
    <div id="cuschecklistimmune"  @click="allarea($event)">
        <div class="searchBasic">
            <div class="title" >
                <i class="el-icon-arrow-down toggleIcon" @click="serchToggle = !serchToggle"></i>
                <span>基础查询</span>
            </div>
            <el-collapse-transition>
                <div class="searchContentgray" id="searchContentgray" v-show="serchToggle">
                    <div class="leftContent" >
                        <el-form ref="form" :model="form" label-width="110px" class="demo-ruleForm">
                            <div class="formConClass">
                                <el-form-item label="更新时间(开始):" prop="startTime">
                                    <el-date-picker  v-model="form.startTime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期时间" style="width: 105%;"></el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="更新时间(结束):" prop="endTime">
                                    <el-date-picker  v-model="form.endTime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期时间" style="width: 105%;"></el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="商户编号:" prop="merchantNo">
                                   <el-input v-model="form.merchantNo" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="规则:" prop="merchantRule">
                                    <el-input v-model="form.merchantRule" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                             <div class="formConClass">
                                <el-form-item label="状态:" prop="status">
                                    <el-select v-model="form.status" placeholder="请选择" style="width: 90%;max-width:225px;">
                                        <el-option label="全部" value="all"></el-option>
                                        <el-option
                                            v-for="item in statusArray"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>

                                </el-form-item>
                            </div>
                           <div class="formConClass">
                                <el-form-item label="操作员:" prop="operator">
                                    <el-input v-model="form.operator" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                        </el-form>
                    </div>
                    <div class="rightContent">
                        <el-button type="primary" v-show="authsearch" class="serchbtn" icon="el-icon-search" @click='listQuery("/immune/getAll","cuscheckimmune",false)'>查询</el-button>
                        <el-button type="primary" v-show="authreset" class="serchbtn" icon="el-icon-refresh" @click='reset("cuscheckimmune")'>重置</el-button>
                    </div>
                </div>
            </el-collapse-transition>
        </div>
        <div class="tableData">
        <div class="contentBotoom clear">
                <div class="button fl">
                    <div class="leftButton clear ">
                        <div class="BotoomBtn leftRadius" v-show="authtj" title="添加" @click="processElementVisible = true">
                            <div class="tj"></div>
                        </div>
                        <div class="BotoomBtn" v-show="authdr" title="导入" @click="importe = true">
                            <div class="dr"></div>
                        </div>
                        <div class="BotoomBtn" v-show="authsc" title="删除" @click="delresult">
                            <div class="sc"></div>
                        </div>
                        <div class="BotoomBtn rightRadius" v-show="authdownload" title="下载" @click="downList">
                            <div class="xz"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt10">
                <el-table
                    fixed 
                    
                    max-height="600"
                   @selection-change="selectedItemsid"
                    @row-dblclick="modefiy"
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
                        prop="merchantNo"
                        v-if="tableDataSec.merchantNo[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        label="商户编号"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="merchantRule"
                        v-if="tableDataSec.merchantRule[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        label="商户规则"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec.immuneCycleStart[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="immuneCycleStart"
                        label="免疫周期开始"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec.immuneCycleEnd[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="immuneCycleEnd"
                        label="免疫周期截止"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec.status[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="status"
                        label="状态"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec.lastModifiedTime[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="lastModifiedTime"
                        label="更新时间"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec.operator[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="operator"
                        label="操作员"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec.remark[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="remark"
                        label="备注"
                        width="150">
                    </el-table-column>
                </el-table>
            </div>
             
           <div class="block">
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
                    :total="length"
                    @current-change="handleCurrentChange">
                   </el-pagination>
                   
                </div>
            </div>
        </div>
        <!-- 上传文件弹框 -->
        <!-- 上传文件弹框 -->
        <el-dialog title="导入" :visible.sync="importe" width="570px">
            <div>
                本地文件：<el-input placeholder="点击帮助以查看具体格式要求"  v-model="fileData" class="listValInp"></el-input>
                <label for="filename">
                    <button class="fr mr10">选择文件</button>
                    <form enctype="multipart/form-data" id="formsubmit">
                       <input  class="formIpt" type="file" style="opacity:0;" id="filename" name="filename" @click="fileChangeClick" @change='fileChange($event)' :value="valueText">
                    </form>
                </label>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" style="float:left;" @click="downloadModel">下载模板</el-button>
              <el-button type="primary" @click="innerVisible = true">帮 助</el-button>
              <el-button type="primary" @click="upload" :disabled="checksuccessupload">确 定</el-button>
              <el-button @click="importeBtn" :disabled="checksuccessupload">取 消</el-button>
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
                          <th width="160">商户规则<i style="color:red;">(必填项)</i></th>
                          <td width="160">商户规则编码</td>
                      </tr>
                       <tr>
                          <th width="160">规则免疫周期<i style="color:red;">(必填项)</i></th>
                          <td width="160">免疫日期起止</td>
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
       
    <!-- 修改弹框 -->
        <el-dialog title="" :visible.sync="dispatchformElementVisible" width="600px">  
          <el-form :model="dispatchform" :rules="rules" ref="dispatchformElement">
                  <el-form-item label="商户编号:" :label-width="formLabelWidth">
                       <span>{{dispatchform.merchantNo}}</span>
                  </el-form-item>
                  <el-form-item label="商户规则:" :label-width="formLabelWidth">
                    <span>{{dispatchform.merchantRule}}</span>
                  </el-form-item>
                  <el-form-item label="规则免疫周期:" :label-width="formLabelWidth">
                      <el-date-picker  v-model="dispatchform.immuneCycleStart" value-format="yyyy-MM-dd HH:mm:ss"  type="datetime" placeholder="选择日期时间" style="width: 90%;max-width:225px;"></el-date-picker>&nbsp;&nbsp; - &nbsp;&nbsp;
                      <el-date-picker  v-model="dispatchform.immuneCycleEnd" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期时间" style="width: 90%;max-width:225px;"></el-date-picker>
                  </el-form-item>
                                   
                  <el-form-item label="备注:" :label-width="formLabelWidth" >
                    <el-input v-model="dispatchform.remark" maxlength="100" placeholder="请填写备注" auto-complete="off"></el-input>
                  </el-form-item>
            </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dispatchformElementVisible = false">取 消</el-button>
          <el-button type="primary" @click='modifyForm(dispatchform,"dispatchformElementVisible")'>确 定</el-button>
        </div>
      </el-dialog>
    <!-- 添加弹框 -->
        <el-dialog title="" :visible.sync="processElementVisible" width="600px">  
          <el-form :model="processform" :rules="rules" ref="processElement">
            <el-form-item label="商户编号:" :show-message="false" :label-width="formLabelWidth" prop="merchantNo">
                 <el-input v-model="processform.merchantNo" @blur='checkMerchantNo(processform.merchantNo)' placeholder="请输入商户编号" auto-complete="off"></el-input>
                 <span class="errorbox" v-show="merchant" v-html="merchanttext"></span>
            </el-form-item>
            <el-form-item label="商户规则:" :show-message="false" :label-width="formLabelWidth" prop="merchantRule">
               <el-input v-model="processform.merchantRule"  @blur='checkMerchantRule(processform.merchantRule)' placeholder="请输入商户规则" auto-complete="off"></el-input>
               <span class="errorbox" v-show="rule" v-html="ruletext"></span>
            </el-form-item>
                <el-form-item label="规则免疫周期:" :label-width="formLabelWidth" prop="immuneCycleStart">
                    <el-date-picker  v-model="processform.immuneCycleStart"   value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="请选择开始时间" style="width: 90%;max-width:225px;"></el-date-picker>&nbsp;&nbsp; - &nbsp;&nbsp;
                    <!-- <el-date-picker  v-model="processform.immuneCycleEnd"  prop="immuneCycleEnd" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期时间" style="width: 90%;max-width:225px;"></el-date-picker> -->
                </el-form-item>
                <el-form-item label="" :label-width="formLabelWidth"  prop="immuneCycleEnd">
                    <el-date-picker  v-model="processform.immuneCycleEnd" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="请选择结束时间" style="width: 90%;max-width:225px;"></el-date-picker>
                </el-form-item>                 
            <el-form-item label="备注:" :label-width="formLabelWidth" >
              <el-input v-model="processform.remark" maxlength="100" placeholder="请填写备注" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="processElementVisible = false">取 消</el-button>
            <el-button type="primary" @click='createForm("processElement",processform,"processElementVisible")'>确 定</el-button>
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
   name:'商户核查单免疫管理', 
  data(){
      return{
        authsearch:false,
        authreset:false,
        authtj:false,
        authdr:false,
        authsc:false,
        authdownload:false,
        xiugai:false,

        loading:true,
        currenteveryno:20,
          merchantnoisok:false,  //商编
          merchantruleisok:false,//商户规则
          processElementVisible:false,//处理弹框显示与隐藏
          dispatchformElementVisible:false,//派发弹框显示与隐藏
            formLabelWidth: '120px',
            importe:false,
            innerVisible:false,
            uploadDataF:'',
            uploadDataS:'',
            fileData:'',//本地文件：
            serchToggle:true,
            lsstShow:true,
            lsstShowSec:true,
            lsstTable:[],
          tableDataSec:{
            merchantNo:[true,'商户编号'],
            merchantRule:[true,'商户规则'],
            immuneCycleStart:[true,'免疫周期开始'],
            immuneCycleEnd:[true,'免疫周期截止'],
            status:[true,'状态'],
            operator:[true,'操作员'],
            lastModifiedTime:[true,'更新时间'],
            remark:[true,'备注']
            
          },
          merchant:false,
          merchanttext:'',
          rule:false,
          ruletext:'',
          form:{
            startTime:'',
            endTime:'',
            merchantRule:'',
            merchantNo:'',
            status:'all',
            operator:''
          },
           dispatchform:{  //修改商户核查单
            merchantNo:'',
            merchantRule:'',
            remark:'',
             immuneCycleStart:'',
             immuneCycleEnd:''
           },
           processform:{  //创建商户核查单
             merchantNo:'', 
             merchantRule:'',
             remark:'',
             immuneCycleStart:'',
             immuneCycleEnd:''
          },
          statusArray:[],
          checkListtype:[],//核查单类型
          dispatchformArray:[],//派发到哪哪
          riskTypeArray:[],//风险定性
          riskProccssformArray:[],//风险处理
          idList:[],//选中的id列表
          rules:{
            merchantNo:[
                {required: true, message: ' ', trigger: 'blur'}
            ], 
            merchantRule:[
                {required: true, message: ' ', trigger: 'blur'}
            ], 
             immuneCycleStart:[
                {required: true, message: '请选择开始时间', trigger: 'blur'}
            ],
             immuneCycleEnd:[
                {required: true, message: '请选择结束时间', trigger: 'blur'}
            ],
            region:[
              {required: true, message: '请选择核查单类型', trigger: 'change'}
            ]
            
          },
           currentPage:1,// 分页
           pageNumber:1,
           pageRow:20,
           length:0,
           valueText:'',
           isokupload:true
      }
  },
  computed:{
    checksuccessupload:function(){
      if(this.isokupload){
        return false
      }else{
        return true
      }
    }
  },
  created(){
    this.form.startTime = this.getdiffTime(-7) +" 00:"+"00:"+"00"
    this.form.endTime = this.getdiffTime(0) +" 23:"+"59:"+"59"
     this.getImmuneStatus()
    this.listQuery("/immune/getAll","cuscheckimmune",false)
    this.queryAuthList()
  },
  methods:{
    fileChangeClick(){this.valueText = ''},
    modifyForm(params,hiddenElement){
        /*
          formName: 表单id  string
          params: 传入参数  {}
          hiddenElement: 控制表单显示的数据  string
        */
          this[hiddenElement] = false 
          params.sessionId = localStorage.getItem('SID') ? localStorage.getItem('SID'):''
          this.$axios.post('/immune/update',qs.stringify(params)).then(res => {
              var response = res.data
              if(response.code == '200'){
                this.successTip(response.msg)
                this.listQuery("/immune/getAll","cuscheckimmune",false)
              }else{
                this.failTip(response.msg)
              }
          }) 
      },
      createForm(formName,params,hiddenElement){
        /*
          formName: 表单id  string
          params: 传入参数  {}
          hiddenElement: 控制表单显示的数据  string
        */
         this.$refs[formName].validate((valid,obj) => {
          if(valid && this.merchantnoisok && this.merchantruleisok){
            this[hiddenElement] = false 
             params.sessionId = localStorage.getItem('SID') ? localStorage.getItem('SID'):''
            this.$axios.post('/immune/add',qs.stringify(params)).then(res => {
              var response = res.data
              if(response.code == '200'){
                this.successTip(response.msg)
                this.listQuery("/immune/getAll","cuscheckimmune")
                this.processform = {  //创建商户核查单
                   merchantNo:'', 
                   merchantRule:'',
                   remark:'',
                   immuneCycleStart:'',
                   immuneCycleEnd:''
                }
              }else{
                this.failTip(response.msg)
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
                case 94:
                    self.authsearch= true
                break;
                case 95:
                    self.authreset= true
                break;
                case 96:
                    self.authtj= true
                break;
                case 97:
                    self.authdr= true
                break;
                case 99:
                    self.authsc= true
                break;
                case 100:
                    self.authdownload= true
                break;
                 case 326:
                    self.xiugai= true
                break;
            }
        })
    },
      delresult(params){
        var self = this
        if(self.idList.length < 1){
            this.atleastOne()
            return false
        }
        this.$confirm('确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          callback:function(item){
            if(item == 'confirm'){
              params.id = self.idList.join(',')
               params.sessionId = localStorage.getItem('SID') ? localStorage.getItem('SID'):''
              self.$axios.post('/immune/delete',qs.stringify(params)).then(res => {
                var response = res.data
                if(response.code == '200'){
                  self.listQuery("/immune/getAll","cuscheckimmune")
                   self.$message({  //成功弹框
                      showClose: true,
                      message: '删除成功',
                      type: 'success'
                });
                }else{
                  this.$message.error({message:response.msg,center: true});
                }
              }) 
              
            }
          }
        }) 
      },
      handleSizeChange() {  //更改页数
        this.pageRow = this.currenteveryno
        this.listQuery("/immune/getAll","cuscheckimmune",true)
      },
      handleCurrentChange(val) {  //处理当前页
         this.pageNumber = `${val}`  //当前页
         this.listQuery("/immune/getAll","cuscheckimmune",true)
      },
      modefiy(row) {  //修改
        if(this.xiugai){
          this.dispatchform.merchantNo = row.merchantNo
          this.dispatchform.merchantRule = row.merchantRule
          this.dispatchform.immuneCycleStart = row.immuneCycleStart
          this.dispatchform.immuneCycleEnd = row.immuneCycleEnd
          this.dispatchform.remark = row.remark
          this.dispatchformElementVisible = true
        }
      },
      
      importeBtn(){  //点击取消
        this.importe = false
        this.fileData = ''
        this.file = ''        
      },
      downloadModel(){  //下载模版
        var param = localStorage.getItem('SID') ? localStorage.getItem('SID'):''
         window.location=encodeURI(this.url+"/DownLoadCheckListController/downloadCheckListImmuneTemplate?sessionId="+param)
      },
      fileChange(e){  //上传文件
        if(e.target.files[0]){
          this.file = e.target.files[0]
          this.fileData = e.target.files[0].name
        }
      },
      delList(){//删除列表
        this.successTip('删除成功!')
      },
      delBtn(){   //删除按钮
        var self = this
        this.$confirm('', '确认将选中的记录删除?', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center:true,
          callback:function(item){
            if(item == 'confirm'){
              self.delList()
            }
          }
        })
      },
      downList(){ //下载
        var self = this
        var params = this.processParams('cuscheckimmune')//入参
        if(!params){
            return false
        } 
        params.id= self.idList.join(',')
        params.sessionId =localStorage.getItem('SID') ? localStorage.getItem('SID'):''
        
        this.$axios.post("/immune/downLoadCheck",qs.stringify(params)).then(res => {
            var response = res.data
            if(response.code == '200'){
                window.location = this.url+"/immune/downLoad?" + qs.stringify(params)
            }else{
                this.$message.error({message:response.msg,center: true});
            }
        })
        
      },
      upload(){  //点击上传
            var self = this
            if(!this.file){
              this.$alert('不能上传空文件', '系统提示', {
                confirmButtonText: '确定'
              });
              return
            }
         self.isokupload=false
          let formData = new FormData()
          formData.append('file',this.file)
          var sessionId = localStorage.getItem('SID') ? localStorage.getItem('SID'):''
          formData.append('sessionId',sessionId)
          this.$axios.post('/CheckImmuneListUpController/batchAddCheckImmuneList',formData)
          .then(res => {
            this.uploadDataF = res.data.code
            
            self.isokupload=true
            if(this.uploadDataF == '200' ){
              this.$alert(res.data.msg, '系统提示', {
                confirmButtonText: '确定',
                callback:function(item){
                  if(item == 'confirm'){
                      self.listQuery("/immune/getAll","cuscheckimmune",false)
                  }
                }
              });
              this.importe = false
              // this.fileData = ''
              // this.file = ''        
            }else{
              var str = res.data.download ? '<a href="'+this.url+'/CheckImmuneListUpController/downloadCheckImmuneListData" style="color:#409EFF;">下载</a>':'';
               var html = res.data.msg + str
                  this.$confirm(html, '', {
                      confirmButtonText: '确定',
                      dangerouslyUseHTMLString: true
                    }) 
              // this.fileData = ''
              // this.file = ''        
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
<style scoped>
.el-form-item__error{display: none;}
.listValInp{width: 60%;height: 36px;}
.errorbox{
    color: #f56c6c;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    top: 100%;
    left: 0;
    }
.formIpt{
    padding: 0;
    width: 73px;
    height: 31px;
    float: right;
    margin-top: -37px;
    border: 0px;
}
.tableData{
    width: 100%;
    height: auto;
    /*border-top: 1px solid #E0E0E0;*/
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
    padding-top: 16px;
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
