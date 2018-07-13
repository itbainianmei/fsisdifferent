<!--商户核查单管理-->
<template>
    <div>
        <div class="searchBasic">
            <div class="title" >
                <i class="el-icon-arrow-down toggleIcon" @click="serchToggle = !serchToggle"></i>
                <span>基础查询</span>
            </div>
            <el-collapse-transition>
                <div class="searchContentgray" id="searchContentgray" v-show="serchToggle">
                    <div class="leftContent" >
                        <el-form ref="form" :model="form" label-width="134px" :rules="rules" class="demo-ruleForm">
                            <div class="formConClass">
                                <el-form-item label="更新时间(开始):" prop="jyStartTime">
                                    <el-date-picker  v-model="form.jyStartTime" type="datetime" placeholder="选择日期时间" style="width: 90%;max-width:225px;"></el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="更新时间(结束):" prop="jyEndTime">
                                    <el-date-picker  v-model="form.jyEndTime" type="datetime" placeholder="选择日期时间" style="width: 90%;max-width:225px;"></el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="商户编号:" prop="yewuLine">
                                   <el-input v-model="form.merchantCode" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="规则:" prop="merchantCode">
                                    <el-input v-model="form.merchantCode" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                             <div class="formConClass">
                                <el-form-item label="状态:" prop="outbound">
                                    <el-select v-model="form.outbound" placeholder="请选择" style="width: 90%;max-width:225px;">
                                        <el-option label="区域一" value="shanghai"></el-option>
                                        <el-option label="区域二" value="beijing"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                           <div class="formConClass">
                                <el-form-item label="操作员:" prop="merchantCode">
                                    <el-input v-model="form.merchantCode" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                        </el-form>
                    </div>
                    <div class="rightContent">
                        <el-button type="primary" class="serchbtn" icon="el-icon-search" @click='listQuery("/riskgod/union/epos/getAll","cuscheck")'>查询</el-button>
                        <el-button type="primary" class="serchbtn" icon="el-icon-refresh" @click='reset("cuscheck")'>重置</el-button>
                    </div>
                </div>
            </el-collapse-transition>
        </div>
        <div class="tableData">
        <div class="contentBotoom clear">
                <div class="button fl">
                    <div class="leftButton clear ">
                        <div class="BotoomBtn leftRadius" title="添加" @click="processElementVisible = true">
                            <div class="tj"></div>
                        </div>
                        <div class="BotoomBtn" title="导入" @click="importe = true">
                            <div class="dr"></div>
                        </div>
                        <div class="BotoomBtn" title="删除" @click="auditformElementVisible = true">
                            <div class="sc"></div>
                        </div>
                        <div class="BotoomBtn rightRadius" title="下载">
                            <div class="xz"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt10">
                <el-table
                    @row-dblclick="modefiy"
                    :data="lsstTable"
                    border
                    style="width: 100%"
                    v-if="lsstShow"
                    >
                    <el-table-column
                        type="selection"
                        width="50"
                        align='center'>
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="商户编号"
                        width="150"
                        align='center'>
                    </el-table-column>
                    <el-table-column
                        prop="b11"
                        label="商户规则"
                        width="150"
                        align='center'>
                    </el-table-column>
                    <el-table-column
                        prop="b11"
                        label="免疫周期开始"
                        width="150"
                        align='center'>
                    </el-table-column>
                    <el-table-column
                        prop="b11"
                        label="免疫周期截止"
                        width="150"
                        align='center'>
                    </el-table-column>
                    <el-table-column
                        prop="b11"
                        label="状态"
                        width="150"
                        align='center'>
                    </el-table-column>
                    <el-table-column
                        prop="b11"
                        label="更新时间"
                        width="150"
                        align='center'>
                    </el-table-column>
                    <el-table-column
                        prop="b11"
                        label="操作员"
                        width="150"
                        align='center'>
                    </el-table-column>
                    <el-table-column
                        prop="b11"
                        label="备注"
                        width="150"
                        align='center'>
                    </el-table-column>
                    
                </el-table>
            </div>
             
            <div class="block">
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-sizes="[10, 20, 30, 40, 50]"
                :page-size="10"
                layout="sizes, prev, pager, next">
                </el-pagination>
            </div>
        </div>
        <!-- 上传文件弹框 -->
        <!-- 上传文件弹框 -->
        <el-dialog title="从Excel导入到黑名单" :visible.sync="importe" width="570px">
            <div>
                本地文件：<el-input placeholder="点击帮助以查看具体格式要求" class="listValInp"></el-input>
                <form enctype="multipart/form-data" id="formsubmit">
                   <input  class="formIpt" type="file" id="filename" name="filename" @change='fileData'>
                </form>
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
                          <th width="160">核查单来源<i style="color:red;">(必填项)</i></th>
                          <td width="160">投诉、举报</td>
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
                       <span>{{dispatchform.No}}</span>
                  </el-form-item>
                  <el-form-item label="商户规则:" :label-width="formLabelWidth">
                    <span>{{dispatchform.No}}</span>
                  </el-form-item>
                  <el-form-item label="规则免疫周期:" :label-width="formLabelWidth">
                      <el-date-picker  v-model="dispatchform.start" type="datetime" placeholder="选择日期时间" style="width: 90%;max-width:225px;"></el-date-picker>&nbsp;&nbsp; - &nbsp;&nbsp;
                      <el-date-picker  v-model="dispatchform.end" type="datetime" placeholder="选择日期时间" style="width: 90%;max-width:225px;"></el-date-picker>
                  </el-form-item>
                                   
                  <el-form-item label="备注:" :label-width="formLabelWidth" >
                    <el-input v-model="dispatchform.label" length="100" placeholder="请填写备注" auto-complete="off"></el-input>
                  </el-form-item>
            </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dispatchformElementVisible = false">取 消</el-button>
          <el-button type="primary" @click='submitForm("dispatchformElement",dispatchform,"dispatchformElementVisible")'>确 定</el-button>
        </div>
      </el-dialog>
    <!-- 添加弹框 -->
        <el-dialog title="" :visible.sync="processElementVisible" width="600px">  
          <el-form :model="processform" :rules="rules" ref="processElement">
            <el-form-item label="商户编号:" :label-width="formLabelWidth" prop="riskType">
                 <el-input v-model="processform.riskType" length="100" placeholder="请填写备注" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="商户规则:" :label-width="formLabelWidth" prop="riskProcess">
               <el-input v-model="processform.riskProcess" length="100" placeholder="请填写备注" auto-complete="off"></el-input>
            </el-form-item>
                <el-form-item label="规则免疫周期:" :label-width="formLabelWidth">
                    <el-date-picker  v-model="processform.start" type="datetime" placeholder="选择日期时间" style="width: 90%;max-width:225px;"></el-date-picker>&nbsp;&nbsp; - &nbsp;&nbsp;
                    <el-date-picker  v-model="processform.end" type="datetime" placeholder="选择日期时间" style="width: 90%;max-width:225px;"></el-date-picker>
                </el-form-item>
                                 
            <el-form-item label="备注:" :label-width="formLabelWidth" >
              <el-input v-model="processform.label" length="100" placeholder="请填写备注" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="processElementVisible = false">取 消</el-button>
            <el-button type="primary" @click='submitForm("processElement",processform,"processElementVisible")'>确 定</el-button>
          </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
  data(){
      return{
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
            lsstTable:[
            {
            "id":"222",
            "No":"222",//商户编号
            "name":"商户名称",//商户名称
            "orderNo":"orderNo",
            "yeepayNo":"yeepayNo",
            "time":"time",
            "money":"money",
            "status":"交易状态",
            "channel":"通道编码",
            "bankName":"中国银行",
            "cardNo":"622848059****843811",
            "saleName":"saleName",
            "cardHolderName":"二月红",
            "cardHolderMobile":"cardHolderMobile",
            "cardHolderId":"cardHolderId",
            "reservationsMobile":"reservationsMobile",
            "passengerMobile":"passengerMobile",
            "passengerId":"passengerId",
            "contactMobile":"contactMobile",
            "hasSendCode":"hasSendCode",
            "terminal":"terminal",
            "faileReason":"faileReason",
            "isCardholderPassenger":"isCardholderPassenger",
            "member":"member"
          }],
          form:{
            jyStartTime:'',
            jyEndTime:'',
            yewuLine:'',
            ccStartTime:'',
            ccEndTime:'',
            product:'',
            merchantCode:'',
            humNumber:'',
            creditCardNumbers:'',
            MerchantsOrder:'',
            outbound:'',
            personnel:'',
          },
           dispatchform:{  //修改商户核查单
             start:'',
             end:''
           },
           processform:{  //处理商户核查单
             riskType:'', 
             riskProcess:'',
             start:'',
             end:'',
             label:''
          },
          checkListtype:[],//核查单类型
          dispatchformArray:[{'label':'哈哈','value':'2'},{'label':'哈哈2','value':'0'}],//派发到哪哪
          riskTypeArray:[{'label':'哈哈','value':'2'},{'label':'哈哈2','value':'0'}],//风险定性
          riskProccssformArray:[{'label':'哈哈','value':'2'},{'label':'哈哈2','value':'0'}],//风险处理
          rules:{
            no: [
                {required: true, message: '请输入商户编号', trigger: 'blur'}
            ],
            region:[
              {required: true, message: '请选择核查单类型', trigger: 'change'}
            ],
            dispatchto:[
              {required: true, message: '请选择派发地', trigger: 'blur'}
            ],
            riskType:[
              {required: true, message: '请输入商户编号', trigger: 'change'}
            ],
            riskProcess:[
              {required: true, message: '请输入商户规则', trigger: 'change'}
            ],
            auditresult:[
              {required: true, message: '请选择审核结果', trigger: 'change'}
            ],
            auditSuggestion:[
              {required: true, message: ' ', trigger: 'blur'}
            ]
          },
           currentPage:1,// 分页
           pageNumber:1,
           pageRow:20,
           length:0    
      }
  },
  methods:{
      submitForm(formName,params,hiddenElement){
        /*
          formName: 表单id  string
          params: 传入参数  {}
          hiddenElement: 控制表单显示的数据  string
        */
         this.$refs[formName].validate((valid) => {
          if(valid){
            this[hiddenElement] = false 
            this.$axios.post('/riskgod/union/noepos/getParam',params).then(res => {
              var response = res.data
              if(response.code == '200'){
              }else{
                  this.$message.error({message:response.msg,center: true});
              }
          }) 
          }
         })
      },
      handleSizeChange() {  //更改页数
        this.pageRow = this.currenteveryno
        this.listQuery("/riskgod/merchant/checklist/getAll","cuscheck")
      },
      handleCurrentChange(val) {  //处理当前页
         this.pageNumber = `${val}`  //当前页
         this.listQuery("/riskgod/merchant/checklist/getAll","cuscheck")
      },
      modefiy(row) {  //修改
        this.dispatchform.No = row.No
        // this.dispatchform.start = row.start
        // this.dispatchform.end = row.end
        this.dispatchform.label = row.label
        this.dispatchformElementVisible = true
      },
      
      importeBtn(){  //点击取消
        this.importe = false
        this.fileData = ''
        this.file = ''        
      },
      downloadModel(){  //下载模版
        window.location=encodeURI("http://172.19.40.127:8080/BusinessSys/RateMerchantBatchUpdateController/exportMerchantModel")
      },
      fileChange(e){  //上传文件
        console.log(e.target.files[0])
        this.file = e.target.files[0]
        this.fileData = e.target.files[0].name
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
      upload(){  //点击上传
          let formData = new FormData()
          formData.append('file',this.file)
          this.$axios.post('/RateMerchantBatchUpdateController/batchUpdateMerchant',formData)
          .then(res => {
            this.uploadDataF = res.data.fail_count
            this.uploadDataS = res.data.success_count
            this.errorData = res.data.fail_download_url

            if(this.file  == ''){
              this.$alert('不能上传空文件', '系统提示', {
                confirmButtonText: '确定',
              });
              return
            }
            if(this.uploadDataF == 0 ){
              this.$alert('上传成功', '系统提示', {
                confirmButtonText: '确定',
              });
              this.importe = false
              this.fileData = ''
              this.file = ''        
            }else{
              this.innerVisible = true
              this.fileData = ''
              this.file = ''        
            }
        })
        .catch(error => {
            console.log(error)
        })
      },
  },
}
</script>
<style scoped>
.listValInp{width: 60%;height: 36px;}
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
