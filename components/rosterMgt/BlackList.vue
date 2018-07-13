<template>
  <!--黑名单-->
  <div>
    <div class="searchBasic">
        <div class="title" @click="serchToggleC" style="cursor:pointer">
          <i class="el-icon-arrow-down " id="ordinarySerch"></i>
          <span>基础查询</span>
        </div>
        <el-collapse-transition>
          <div class="searchContentBlack" v-show="serchToggle">
              <div class="beginTime">
                更新时间(开始):
                <el-date-picker
                  v-model="beginTime"
                  type="datetime"
                  placeholder="选择日期时间"
                  style="width:59%;height:36px;"
                  value-format="yyyy-MM-dd HH:mm:ss"
                >
                </el-date-picker>
              </div>
              <div class="endTime">
                更新时间(结束):
                <el-date-picker
                  v-model="endTime"
                  type="datetime"
                  placeholder="选择日期时间"
                  style="width:59%;height:36px;"
                  value-format="yyyy-MM-dd HH:mm:ss"
                >
                </el-date-picker>
              </div>
              <div class="listVal">
                名单值:
                <el-input clearable placeholder="请输入" class="listValInp" v-model="listVal" id="mdz"></el-input>
              </div>
              <div class='divserchbtn' style='display:inline-block'>
                  <el-button type="primary" class="serchbtn" icon="el-icon-search" @click="searchData"></el-button>
                  <el-button type="primary" class="serchbtn" icon="el-icon-refresh" @click="reset"></el-button>
              </div>
              
          </div>
        </el-collapse-transition>  
    </div>
    <div class="seniorSearch">
      <div class="title" style="cursor:pointer"  @click="seniorSearchToggleC">
        <i class="el-icon-arrow-down" id="advancedSerch" ></i>
        <span>高级查询</span>
      </div>
      <el-collapse-transition>
        <div class="serior" v-if="!seniorSearchToggle">
          <div class="dimension">
            <span class="text">维度:</span>
            <el-select v-model="vvalue" placeholder="请选择" style="width: 59%">
              <el-option
                v-for="item in veidoo"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="state">
            <span class="text">状态:</span>
            <el-select v-model="cvalue" placeholder="请选择" style="width: 59%">
              <el-option
                v-for="item in condition"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="source">
            <span class="text">来源:</span>
            <el-select v-model="svalue" placeholder="请选择" style="width: 59%">
              <el-option
                v-for="item in source"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div style="display: inline-block;margin-left: 4%">
            <el-button type="primary" icon="el-icon-search" @click="searchData"></el-button>
            <el-button type="primary" icon="el-icon-refresh" @click="reset"></el-button>
          </div>

        </div>
      </el-collapse-transition>  
    </div>
    <div class="listContent">
      <div class="contentIcon">
        <div class="button">
          <div class="leftButton clear">
            <div class="BotoomBtn leftRadius" @click="addbtn">
              <div class="addIcon" ></div>
            </div>
            <div class="BotoomBtn" @click="removeData">
              <div class="removIcon"></div>
            </div>
            <div class="BotoomBtn" style="border: none" @click="downloadBlack = true">
              <div class="refreshIcon"></div>
            </div>
            <div class="BotoomBtn rightRadius" @click="importeBlack=true">
              <div class="downloadIcon" style="margin-top: -1px;"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="dataTable clear">
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          @selection-change="selectDelUser">
          <el-table-column
            type="selection"
            width="50"
          >
          </el-table-column>
          <el-table-column
            prop="id"
            sortable
            width="100"
            label="名单号"
          >
          </el-table-column>

          <el-table-column
            prop="sysname"
            width="130px"
            label="维度"
          >
          </el-table-column>
          <el-table-column
            width="130px"
            prop="uniqueId"
            label="名单值"
          >
          </el-table-column>
          <el-table-column
            prop="statusName"
            width="130px"
            label="状态"
          >
          </el-table-column>
          <el-table-column
            prop="activesDate"
            width="170px"
            label="生效日期"
          >
          </el-table-column>
          <el-table-column
            prop="expireDate"
            width="170px"
            label="到期日期"
          >
          </el-table-column>
          <el-table-column
            prop="orderId"
            width="130px"
            label="商户订单号"
          >
          </el-table-column>
          <el-table-column
            prop="merchantId"
            width="130px"
            label="商户编号"
          >
          </el-table-column>
          <el-table-column
            prop="source"
            label="来源"
          >
          </el-table-column>
          <el-table-column
            prop="comments"
            label="备注"
          >
          </el-table-column>
          <el-table-column
            prop="createDate"
            label="创建日期"
            width="170px"
          >
          </el-table-column>
          <el-table-column
            prop="updateDate"
            width="170px"
            label="更新日期"
          >
          </el-table-column>
          <el-table-column
            prop="modifier"
            label="更新者"
          >
          </el-table-column>
        </el-table>
      </div>
      <div class="block">
            <div class='pagination'>
              <span>每页显示</span> 
              <select  class="evetotal"  @change="handleSizeChange">
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
              </select>
          </div>
          <div class='paginationRight'>
              <el-pagination
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="10"
                :page-sizes="[10, 20, 30, 40]"
                layout="prev, pager, next"
                :page-count = countnum>
              </el-pagination>
          </div>
      </div>      
      <!-- <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[10, 20, 30, 40, 50]"
          :page-size="10"
          layout="sizes, prev, pager, next"
          :page-count=countnum>
        </el-pagination>
      </div> -->
      <el-dialog title="添加黑名单" :visible.sync="listAdd" width="35%" v-dialogDrag >
        <el-form ref="form" :model="form" :rules="rules"  class="demo-ruleForm" :label-position="labelPosition" label-width="100px"  style="margin-left:13%;">
          <el-form-item label="业务线:" prop="busline">
            <el-select v-model="form.busline" placeholder="请选择" @change="buslineChange" style="height: 36px;width: 74%" id="busline">
              <el-option label="线上" value="online"></el-option>
              <el-option label="线下" value="offline"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="维度:" prop="veido">
            <el-select v-model="form.veido" placeholder="请选择" style="height: 36px;width: 74%" id="veido">
              <el-option v-for="qy in queryenum"  :label='qy.sysname' :value='qy.syscode' :key='qy.id'></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="名单值:" prop="usercode">
            <el-input clearable ref="usercode" :class="{redborder:isredborder,addIpt:isaddIpt}" type="text" v-model="form.usercode" id="usercode"></el-input>
          </el-form-item>
          <el-form-item label="商户编号:" prop="username">
            <el-input clearable class="addIpt" v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="商户订单号:" prop="title">
            <el-input clearable class="addIpt" v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="生效日期:"  prop="time">
            <el-date-picker
              v-model="form.time"
              id="time"
              type="datetime"
              placeholder="选择日期时间"
              value-format="yyyy-MM-dd HH:mm:ss"
              style="width: 74%;"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="到期日期:" prop="endTime">
            <el-date-picker
              v-model="form.endTime"
              type="datetime"
              id="endTime"
              placeholder="选择日期时间"
              value-format="yyyy-MM-dd HH:mm:ss"
              style="width: 74%;"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="备注:" prop="roleDesc">
            <el-input clearable type="textarea" placeholder="最长长度不能超过200位" v-model="form.roleDesc" id="roleDesc" style="width: 74%"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button @click="gbxj('form')">取 消</el-button>
          <el-button type="primary" @click="submitForm('form')">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="黑名单查询：分页选择下载" :visible.sync="downloadBlack" width="30%" v-dialogDrag>
            <div style="text-align: center; margin-bottom:20px;">选择下载从<input type="number" v-model="startnum" min="1" class="downClass" >到<input type="number" min="1"  class="downClass" :max="this.countnum" v-model="endpagenum" >页的数据</div>
            <h4 style="text-align: center">当前共<span>{{countnum}}</span>页</h4>
            <span slot="footer" class="dialog-footer">
            <el-button @click="downloadBlackClose">取 消</el-button>
            <el-button type="primary" @click="downloadBlackData">下 载</el-button>
            </span>
      </el-dialog>
      <el-dialog title="从Excel导入到黑名单" :visible.sync="importeBlack" width="570px" v-dialogDrag>
            <div class="importe ipC"></div><span  class="fontC" style="float:left;margin-right:20px;" @click="downloadMb">下载模板</span>
            <div class="prompt ipC" ></div><span class="fontC" @click="helpTitleClick" style="vertical-align: top;">模板格式要求</span>
            <div style="margin-left: 50px;margin-top: 20px;">
                <span>本地文件：</span><el-input placeholder="点击帮助以查看具体格式要求" class="listValInp" v-model="nameFormChange"></el-input>
                <label class="ui_button" for="filename">选择</label>
                <form enctype="multipart/form-data" id="formsubmit" style="display: inline-block;">
                    <input  class="formIpt" type="file" id="filename" style="position:absolute;clip:rect(0 0 0 0);" name="filename"  @change='fileChange' accept='.csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'>
                </form>
            </div>
            <span slot="footer" class="dialog-footer" style="padding: 20px;">
                <el-button type="primary" @click="upload">导 入</el-button>
                <el-button @click="importeBlackClick">取 消</el-button>
                    <div class="promptText" v-show="helpTitle">
                        <span style="display: block;text-align: left;margin: 10px 9px;font-size: 13px;">导入格式要求</span>
                        <el-table
                        :data="titleData"
                        border
                        style="width: 100%;text-align:left;">
                        <el-table-column
                            width="140px"
                            prop="name"
                            label="第一行必须包含字段">
                        </el-table-column>
                        <el-table-column
                            prop="help"
                            label="字段格式要求">
                        </el-table-column>
                        </el-table>
                    </div>
            </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import qs from 'qs'
  export default{
    data(){
      return{
        titleData:[
            {
                name:'维度',
                help:'线上名单维度：银行卡号、手机号、身份证号、IP、IMEI、登录名、网址、终端号。线下名单维度：交易卡号、商户编号、终端号、法人姓名、法人身份证、结算银行卡、结算账户名、营业执照号、商户唯一标识',
            },
            {
                name:'名单值',
                help:'文本格式不能为空',
            },
            {
                name:'业务线',
                help:'文本格式 选填(默认为线上)，枚举：线上、线下',
            },
            {
                name:'商户编号',
                help:'文本格式 选填',
            },
            {
                name:'商户订单号',
                help:'文本格式 选填',
            },
            {
                name:'生效日期',
                help:'时间格式xxxx-xx-xx xx:xx:xx 精确到秒',
            },
            {
                name:'到期日期',
                help:'时间格式xxxx-xx-xx xx:xx:xx 精确到秒',
            },
            {
                name:'备注',
                help:'文本格式 最长200位',
            },
        ],
        seniorSearchToggle:true,
        helpTitle:false,
        serchToggle:true,
        fileList:'',
        countnum:0,
        startnum:1,
        pagenum:10,
        endpagenum:1,
        total:'',
        innerVisible: false,
        currentPage:0,
        nameFormChange:'',
        beginTime:'',
        endTime:'',
        listVal:'',
        veidoo: [
          {
            value: '全部',
            label: '全部'
          }, {
            value: '线上-银行卡号',
            label: '线上-银行卡号'
          }, {
            value: '线上-手机号',
            label: '线上-手机号'
          }, {
            value: '线上-身份证号',
            label: '线上-身份证号'
          }, {
            value: '线上-登录名',
            label: '线上-登录名'
          }, {
            value: '线上-IP',
            label: '线上-IP'
          }, {
            value: '线上-IMEI',
            label: '线上-IMEI'
          }, {
            value: '线上-网址',
            label: '线上-网址'
          }, {
            value: '线上-终端号',
            label: '线上-终端号'
          }
        ],
        condition: [
            {
              value: '全部',
              label: '全部'
            }, {
              value: '生效',
              label: '生效'
            }, {
              value: '未生效',
              label: '未生效'
            }
        ],
        source: [
            {
              value: '全部',
              label: '全部'
            }, {
              value: '风神',
              label: '风神'
            }, {
              value: '门神',
              label: '门神'
            }
        ],
        vvalue: '',
        cvalue: '',
        svalue: '',
        tableData:[],
        listAdd:false,
        deMsg:false,
        downloadBlack:false,
        importeBlack:false,
        isredborder:false,
        isaddIpt:true,
        form:{
          busline:'',
          veido:'',
          usercode:'',
          username:'',
          title:'',
          roleDesc:'',
          endTime:'',
          time:'',
        },
        labelPosition:'right',
        removeArr:[],
        multipleSelection:[],
        queryenum:[],
        mdNumber:'',
        fd:'',
        rules:{
          busline:[
            {required:true,message:' ',trigger:'change'}
          ],
          veido:[
            {required:true,message:' ',trigger:'change'}
          ],
          usercode:[
            {required:true,message:' ',trigger:'change'},
          ],
          roleDesc:[
            {max: 200, min:0,message: ' ', trigger: 'blur' }
          ],
        },
        file:''
      }
    },
    methods:{
      helpTitleClick(){
            this.helpTitle = !this.helpTitle
      },
      downloadBlackClose(){
          this.downloadBlack = false;
          this.startnum = ''
          this.endpagenum = ''
      },
      serchToggleC(){
         this.serchToggle = !this.serchToggle
         
         var ordinarySerch = document.getElementById("ordinarySerch")
         if(this.serchToggle == false){
            ordinarySerch.style.transform = 'rotate(180deg)'
            console.log(this.serchToggle)
         }else if (this.serchToggle != false){
            ordinarySerch.style.transform = 'rotate(0deg)'
            console.log(this.serchToggle)
         }
      },
      seniorSearchToggleC(){
        this.seniorSearchToggle = !this.seniorSearchToggle
        let serchbtn = document.querySelector('.divserchbtn')
        var advancedSerch = document.getElementById("advancedSerch")

        if(this.seniorSearchToggle == false){
          serchbtn.style.display = 'none'
          serchbtn.style.transition = 'all 2s'
          // console.log(this.seniorSearchToggle)
          advancedSerch.style.transform = 'rotate(180deg)'
        }else if(this.seniorSearchToggle == true){
          // console.log(this.seniorSearchToggle)
          advancedSerch.style.transform = 'rotate(0deg)'
          serchbtn.style.display = 'inline-block'
          serchbtn.style.transition = 'all 2s'
        }
        
      },
      importeBlackClick(){
        this.nameFormChange = ''
        this.importeBlack = false;
      },
      upload(){
        console.log(this.file)
        if(this.file === ''){
          this.$alert('不能上传空文件','提示',{
            confirmButtonText:'确定',
            type:'warning',
            callback:action => {

            }
          })
          return
        }
        let formData = new FormData()
        formData.append('file',this.file)

        this.$axios.post('/NameListController/importBlackList',formData)
        .then(res => {
          console.log(res.data)
          // console.log(res.data.length)
          if(res.data.length === 0){
            this.$alert('导入列名有误,请按照要求格式修改','导入失败',{
              confirmButtonText:'确定',
              type:'warning',
              callback:action => {

              }
            })
            return
          }
          this.$alert('导入成功!','提示',{
            confirmButtonText:'确定',
            type:'success',
            callback:action => {
              this.listAdd = false
            }
          })
          this.importeBlack = false
        })
        .catch(error => {
          console.log(error)
        })
      },
      fileChange(e){
        // console.log(e.target.files[0].name)
        this.file = e.target.files[0]
        this.nameFormChange = e.target.files[0].name
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      handleClick(){
      },
      handleSizeChange(val) {
        this.pagenum = val.target.value
        console.log('this.startnum'+this.startnum)
        console.log('pagenum'+this.pagenum)
        this.searchData()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.startnum = val
        console.log(this.startnum)
        this.searchData()
      },
      buslineChange(){
         console.log(this.form.busline)
            let type = ''
            if(this.form.busline === 'online'){
               type = '18'

            }else if(this.form.busline === 'offline'){
                  type = '-1'
             }

          this.$axios.post('/SysConfigController/queryEnum',qs.stringify({
                "sessionId":localStorage.getItem('SID'),
                "type":type,
            }))
            .then(res => {
              console.log(res.data)
                this.queryenum = res.data
            })
            .catch(error => {
                console.log(error)
            }) 
      },
      searchData(){
         var maz = document.getElementById("mdz")
         if(mdz.value === ''){
            maz.style.border = "1px solid #f56c6c";
            this.$alert('请输入名单值', '提示', {
              type:'warning',
              confirmButtonText: '确定',
            })
         }else{
            this.mdNumber  = maz.value 
            maz.style.border = "1px solid #dcdfe6";
            this.$axios.post('/NameListController/queryList',qs.stringify({
              "sessionId":localStorage.getItem('SID'),
              "startDate":this.beginTime,
              "endDate":this.endTime,
              "unique":this.listVal,
              "tag":this.vvalue,
              "status":this.cvalue,
              "source":this.svalue,
              "type":'black',
              "startnum": parseInt(this.startnum),
              "pagenum": parseInt(this.pagenum)
            }))
            .then(res => {
              this.tableData =  JSON.parse(res.data.data)
              this.countnum = parseInt(res.data.count) 
              console.log(this.tableData)
              console.log(this.countnum)
            })
            .catch(error => {
                console.log(error)
            })
         }
      },
      downloadMb(){
        window.location=encodeURI(this.uploadBaseUrl + '/NameListController/exportBlackModel')
        console.log(this.uploadBaseUrl + '/NameListController/exportBlackModel')
      },
      downloadBlackData(){
        if( parseInt(this.startnum)  > parseInt(this.endpagenum) ){
                console.log(111)
                this.$alert('起始值需小于结束值', '系统提示', {
                    type:'warning',
                    confirmButtonText: '确定',
                });
                return
            }                                                                                                                                                                                                                                                     
         this.$axios.get('/NameListController/exportList?startDate='+this.beginTime+'&endDate='+this.endTime+'&unique='+this.listVal+'&tag='+this.vvalue+'&status='+this.cvalue+'&source='+this.svalue+'&type=black&startnum='+this.startnum+'&pagenum='+this.pagenum+'&endnum='+this.endpagenum + '&sessionId=' +  localStorage.getItem('SID')) 
            .then(res => {
              console.log(res)
                window.location=encodeURI(this.uploadBaseUrl+'/NameListController/exportList?startDate='+this.beginTime+'&endDate='+this.endTime+'&unique='+this.listVal+'&tag='+this.vvalue+'&status='+this.cvalue+'&source='+this.svalue+'&type=black&startnum='+this.startnum+'&pagenum='+this.pagenum+'&endnum='+this.endpagenum)
                this.endpagenum = 1
                this.downloadBlack = false
                // console.log('/NameListController/exportList?startDate='+this.beginTime+'&endDate='+this.endTime+'&unique='+this.listVal+'&tag='+this.vvalue+'&status='+this.cvalue+'&source='+this.svalue+'&type=black&startnum='+this.startnum+'&pagenum='+this.pagenum+'&endnum='+this.endpagenum)
            })
            .catch(error => {
                console.log(error)
            })
      },
      selectDelUser(val){
          this.multipleSelection = val;
          console.log(this.multipleSelection)
           this.removeArr = []
          for(let i = 0; i<this.multipleSelection.length;i++){
              this.removeArr.push(this.multipleSelection[i].id)
          }
          console.log(this.removeArr)
      },
      removeData(){
        if(this.removeArr.length === 0){
            this.$alert('请至少选中一条需要处理的数据', '提示', {
              type:'warning',
              confirmButtonText: '确定',
            })
         }else if(this.removeArr.length >= 1){
           this.$confirm('确认将选中的名单值删除？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
           }).then(() => {
                  this.$axios.post('/NameListController/deleteNameList',qs.stringify({
                    "sessionId":localStorage.getItem('SID'),
                    "id":this.removeArr.join(','),
                  }))
                  .then(res => {
                    this.$alert(res.data.message,'提示',{
                      confirmButtonText: '确定',
                      callback:action => {
                          this.$axios.post('/NameListController/queryList',qs.stringify({
                            "sessionId":localStorage.getItem('SID'),
                            "startDate":this.beginTime,
                            "endDate":this.endTime,
                            "unique":this.mdNumber,
                            "tag":this.vvalue,
                            "status":this.cvalue,
                            "source":this.svalue,
                            "type":'black',
                            "startnum": parseInt(this.startnum),
                            "pagenum": parseInt(this.pagenum)
                          }))
                          .then(res => {
                            this.tableData =  JSON.parse(res.data.data)
                            this.countnum = parseInt(res.data.count) 
                            console.log(this.tableData)
                          })
                          .catch(error => {
                              console.log(error)
                          })
                      }
                    })
                  })
                  .catch(error => {
                  })
           }).catch(() => {
           })
         }
      },
      addbtn(){
        this.listAdd = true;
        // 获取起始时间和结束时间
        var date=new Date();   
        var year=date.getFullYear(); //获取当前年份   
        var mon=date.getMonth()+1; //获取当前月份   
        var da=date.getDate(); //获取当前日   
        var day=date.getDay(); //获取当前星期几   
        var h=date.getHours(); //获取小时   
        var m=date.getMinutes(); //获取分钟   
        var s=date.getSeconds(); //获取秒   
        var d=document.getElementById('Date');    
        this.form.time = year+'-'+mon+'-'+da+' '+h+':'+m+':'+s;      
        var endyear = year + 3;
        this.form.endTime = endyear+'-'+mon+'-'+da+' '+h+':'+m+':'+s;     
        // 获取维度列表
      },
      gbxj(formName){
        this.listAdd = false;
        this.$refs[formName].resetFields();
        this.isaddIpt = true;
        this.isredborder = false;
          document.querySelector("#busline").style.border = "1px solid #dcdfe6"
          document.querySelector("#veido").style.border = "1px solid #dcdfe6"
          document.querySelector("#usercode").style.border = "1px solid #dcdfe6"
          document.querySelector("#time").style.border = "1px solid #dcdfe6"
          document.querySelector("#endTime").style.border = "1px solid #dcdfe6"

      },
      submitForm(formName) {
        
        if(this.form.busline === ''){
          document.querySelector("#busline").style.border = "1px solid #f56c6c"
          return
        }else if(this.form.busline !== ''){
          document.querySelector("#busline").style.border = "1px solid #dcdfe6"
        }
        if(this.form.veido === ''){
          document.querySelector("#veido").style.border = "1px solid #f56c6c"
          return
        }else if(this.form.veido !== ''){
          document.querySelector("#veido").style.border = "1px solid #dcdfe6"
        }
        if(this.form.usercode === ''){
          document.querySelector("#usercode").style.border = "1px solid #f56c6c"
          return
        }else if(this.form.usercode !== ''){
          document.querySelector("#usercode").style.border = "1px solid #dcdfe6"
        }

        var time = document.getElementById("time")
        if(time.value === ''){
          time.style.border = "1px solid #f56c6c"
          return
        }else{
          time.style.border = "1px solid #dcdfe6"
        }
        var endTime = document.getElementById("endTime")
        if(endTime.value === ''){
          endTime.style.border = "1px solid #f56c6c"
          return
        }else{
          endTime.style.border = "1px solid #dcdfe6"
        }


        if(this.form.time > this.form.endTime ){
            this.$alert('生效日期不能大于到期日期', '提示', {
              type: 'warning',
              confirmButtonText: '确定',
              callback: action => {
              }
            })
            return
        }


         var roleDesc = document.getElementById("roleDesc").value
          console.log(roleDesc.length)
          if( roleDesc.length > 200){
              this.$alert('备注限制200字以内', '提示', {
                type: 'warning',
                confirmButtonText: '确定',
                callback: action => {
                }
              })
              return
          }

        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.post('/NameListController/saveName',qs.stringify({
              "sessionId":localStorage.getItem('SID'),
              "startDate":this.form.time,
              "endDate": this.form.endTime,
              "unique": this.form.usercode,
              "tag": this.form.veido,
              "source":'754',
              "type":'black',
              "modifier":localStorage.getItem('testName'),
              "merchantId": this.form.username,
              "orderId": this.form.title,
              "bizLine": this.form.busline,
              "comments": this.form.roleDesc,

            }))
            .then(res => {
              console.log(res)
              
              console.log(localStorage.getItem('testName'))


                this.$alert(res.data.message,'提示',{
                    confirmButtonText: '确定',
                })
                this.listAdd=false
                this.$refs[formName].resetFields();
            })
            .catch(error => {
                console.log(error)
            })
          } else {
            return false;
          }
        });

        

      },
      reset(){
        this.beginTime = '';
        this.endTime = '';
        this.listVal = '';
        this.vvalue = '';
        this.cvalue = '';
        this.svalue = '';
      },
    },
  }
</script>
<style scoped>
 .prompt{
    width: 18px;
    height: 18px;
    background-image: url(../../images/prompt.png);
  }
  .listValInp{width: 60%;height: 36px;}
    .fontC{
        color: #3DC6B2;
        cursor: pointer;
        line-height: 17px;
    }
    
    .importe{
      width: 18px;
      height: 18px;
      background-image: url(../../images/importe.png);
    }
    .ipC{
      float: left; margin-left: 10px; margin-right: 5px;
    }
    .downClass{
        width: 77px;
        height: 29px;
        margin: 5px;
        border-radius: 19px;
        border: 1px solid #ccc;
        padding-right: 2px;
    }
    .showHide{
      display: none;
    }
    .title{height: 50px;line-height: 50px;padding-left: 27px;font-size: 14px;color: #333333;box-shadow: 0 1px 4px 1px rgba(0,0,0,0.09);}
    .searchContentBlack,.seniorSearchContent{
      height: 76px;
      line-height: 76px;
      padding-left: 3%;
      transition: all 0.8s;
      overflow: inherit;
    }
    .serior{
      height: 76px;
      line-height: 76px;
      padding-left: 3%;
      transition: all 0.8s;
      overflow: inherit;
    }
    .beginTime,.endTime,.listVal,.dimension,.state,.source{
      display: inline-block;
      font-size: 13px;
      color: #333333;
      width: 26%;
    }
    .listVal{margin-left: 4%}
    .listValInp{width: 60%;height: 36px;}
  .text{width: 30%;text-align: right;display: inline-block}
  .listContent{border-top: 1px solid #e0e0e0}
  .contentIcon{height: 70px;line-height: 70px}
    input {
      background-color: #fff;
      border-radius: 4px;
      border: 1px solid #dcdfe6;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      color: #606266;
      display: inline-block;
      font-size: inherit;
      height: 40px;
      line-height: 40px;
      outline: none;
      padding-left: 15px;
      -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
      transition: border-color .2s cubic-bezier(.645,.045,.355,1);
      width: 100%;
    }
    .addIpt{
      border-radius: 50px;    
      width: 74%;
      height: 36px;
    }
    .redborder{
      border-radius: 50px;    
      width: 74%;
      height: 36px;
      border-color: #f56c6c;
    }
    .BotoomBtn {
      width: 44px;
      height: 28px;
      margin: 0;
      margin-left: -1px;
      border: 1px solid #38e139;
      background-color: #fff;
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
    .contentData {
      background-color: #fff;
    }
    .leftButton {
      float: left;
      margin-left: 80px;
    }
    .leftButton {
      float: left;
      margin-left: 30px;
      margin-top: 14px;
    }
    .addIcon {
      background: url(../../images/icon.png) no-repeat 6px -9px;
      width: 44px;
      height: 30px;
      margin: 0 auto;
      margin-top: 4px;
    }
    .addIcon:hover {
      background: url(../../images/icon.png) no-repeat 6px -32px;
      width: 44px;
      height: 30px;
      margin: 0 auto;
      margin-top: 4px;
    }
    .amendIcon {
      background: url(../../images/icon.png) no-repeat -27px -9px;
      width: 44px;
      height: 30px;
      margin: 0 auto;
      margin-top: 4px;
    }
    .amendIcon:hover {
      background: url(../../images/icon.png) no-repeat -27px -32px;
      width: 44px;
      height: 30px;
      margin: 0 auto;
      margin-top: 4px;
    }
    .xgImg{
      background: url(../../images/icon.png) no-repeat -37px -7px;
      width: 25px;
      height: 25px;
      margin: 0 auto;
      margin-top: 5px;
      border: 1px solid #38E139;
      cursor: pointer;
      border-radius: 5px;
    }
    .xgImg:hover{
      background: url(../../images/icon.png) no-repeat -37px -32px;
      width: 25px;
      height: 25px;
      margin: 0 auto;
      background-color: #38E139;
      cursor: pointer;
      margin-top: 5px;
      border-radius: 5px;
    }
    .removIcon {
      background: url(../../images/icon.png) no-repeat -62px -9px;
      width: 44px;
      height: 30px;
      margin: 0 auto;
      margin-top: 4px;
    }
    .removIcon:hover {
      background: url(../../images/icon.png) no-repeat -62px -32px;
      width: 44px;
      height: 30px;
      margin: 0 auto;
      margin-top: 4px;
    }
    .refreshIcon {
      background: url(../../images/import.png) no-repeat;
      width: 44px;
      height: 30px;
      margin: 0 auto;
    }
    .refreshIcon:hover {
      background: url(../../images/import_actived.png) no-repeat ;
      width: 44px;
      height: 30px;
      margin: 0 auto;
    }
    .downloadIcon {
      background: url(../../images/export.png) no-repeat ;
      width: 44px;
      height: 30px;
      margin: 0 auto;
    }
    .downloadIcon:hover {
      background: url(../../images/export_actived.png) no-repeat ;
      width: 44px;
      height: 30px;
      margin: 0 auto;
      border-top-right-radius: 7px;
      border-bottom-right-radius: 7px;
    }
    .active {
      background-color: #38e139;
    }
    .clear:after {
       clear: both;
       content: ".";
       display: block;
       width: 0;
       height: 0;
       visibility: hidden;
     }
  .downClass{
    width: 60px;
    height: 29px;
    margin: 5px;
  }
  .importData{
    width: 111%;
    margin-left: -30px;
    border-spacing: inherit;
  }
  .importData tr:nth-child(even){
      background-color: rgb(244, 244, 244);
  }
  .importData th{
    text-align: left;
    padding: 0 2px 0 37px;
    width: 109px;
  }
  .importData td{
    padding: 1px 51px 4px 26px;
  }
  .showHide{
    display: none;
  }
  .formIpt{
    padding: 0;
    width: 73px;
    height: 31px;
    float: right;
    margin-top: -37px;
    border: 0px;
  }
  .dataTable{
    margin-left:10px;
    margin-right:10px;
  }
  .ui_button{
        display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #409EFF;
    border-color: #409EFF;
    color: #409EFF;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: none;
    margin: 0;
    -webkit-transition: .1s;
    transition: .1s;
    font-weight: 500;
    padding: 9px 23px;
    font-size: 14px;
    border-radius: 34px;
  }
  .ui_button:hover{
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #409EFF;
    border: 1px solid #409EFF;
    border-color: #409EFF;
    color: #FFF;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: none;
    margin: 0;
    -webkit-transition: .1s;
    transition: .1s;
    font-weight: 500;
    padding: 9px 23px;
    font-size: 14px;
    border-radius: 34px;
  }
</style>
