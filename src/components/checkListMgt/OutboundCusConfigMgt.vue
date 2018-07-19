// 外呼商户配置
<template>
  <div>
    <div class="searchContent">
      <div class="searchContentLeft">
        <div class="beginTime hideTimeRightIcon" >
          <span class="span">更新时间（开始）:</span>
          <el-date-picker
            type="datetime"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd HH:mm:ss"
            style="width: 50%"
            v-model='beginTimeVal'
            id='dataTimeReadonly'
            @focus="dataTimeChoose"
          >
          </el-date-picker>
        </div>
        <div class="endTime hideTimeRightIcon">
          <span class="span">更新时间（结束）:</span>
          <el-date-picker
            type="datetime"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd HH:mm:ss"
            style="width: 50%"
            v-model='endTimeVal'
            id='dataTimeEnd'
            @focus="dataTimeEndFocus">
          </el-date-picker>
        </div>
        <div class="merchantCode">
          <span class="span">商户编号:</span>
          <el-input placeholder="请输入"  class="editInput" v-model='busiNum'></el-input>
        </div>
        <div class="source">
          <span class="span">状态:</span>
          <!-- @focus='getStatusList' -->
          <el-select v-model="optionValue" placeholder="请选择" style="width: 50%" >
            <el-option
             v-for="item in options"
            :key="item.id"
            :label="item.value"
            :value="item.id">
            </el-option>
          </el-select>
        </div>
      </div>  
      <div class="searchContentRightOut">
          <el-button type="primary" class="iconStyle" icon="el-icon-search" style="margin-left: 8%" @click='search' v-show='showSearchBtnOutbound' ></el-button>
          <el-button type="primary" class="iconStyle iconRefer" icon="el-icon-refresh"  @click='reset' v-if="resetPermission"></el-button>
      </div>
    </div>
    <div class="listContent">
      <div class="contentIcon">
        <div class="button">
                <div class="leftButton clear">
                    <div class="BotoomBtn leftRadius" id='addDataTitle' @click='addOutboundConfigDialog = true' v-show='showAddBtnOutbound'>
                        <div class="addIcon" id='addDataTitleSet' data-title='添加'></div>
                    </div>
                    <div class="BotoomBtn" id='importDataTitle' @click='importeBlack = true' v-show='showImportOutbound'>
                          <div class="removIcon" id='importDataTitleSet' data-title='导入'></div>
                    </div>
                    <div class="BotoomBtn" id='delDataTitle' @click='delClick' v-show='showDelOutbound'>
                          <div class="refreshIcon" id='delDataTitleSet' data-title='删除'></div>
                    </div>
                    <div class="BotoomBtn rightRadius" id='downloadDataTitle' @click='downloadConfig = true' v-show='showUploadOutbound'>
                          <div class="downloadIcon" id='downloadDataSet' data-title='导出'></div>
                    </div>
                </div>
          </div>
      </div>
      <div class="dataTable clear">
        <el-table
          fixed
          max-height='600'
          class='tableData'
          :data="tableData"
          border
          style="width: 100%"
          @selection-change="selectDelUser"
          @row-dblclick="dblclickShow"
          >
          <el-table-column
            type="selection"
            width="50"
            align='center'
          >
          </el-table-column>
          <el-table-column
            prop="merchantId"
            label="商户编号"
            align='center'
          >
          </el-table-column>

          <el-table-column
            prop="remark"
            label="备注"
            align='center'
          >
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            align='center'
          >
          </el-table-column>
          <el-table-column
            prop="effectiveTime"
            label="生效时间"
            align='center'
          >
          </el-table-column>
          <el-table-column
            prop="expireDate"
            label="到期时间"
            align='center'
          >
          </el-table-column>
          <el-table-column
            prop="updateTime"
            label="更新时间"
            align='center'
          >
          </el-table-column>
          <el-table-column
            prop="operator"
            label="操作员"
            align='center'
          >
          </el-table-column>
        </el-table>
      </div>

      <div class="block">
        
        <div class='pagination'>
            <span>每页显示</span> 
            <select  class="evetotal"  @change='handleSizeChange'>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
            </select>
        </div>

        <div class='paginationRight'>
            
            <el-pagination
              layout="prev, pager, next"
              :current-page.sync="currentPage"
              :page-sizes="[10, 20, 30, 40]"
              :page-size = pageSize
              @current-change="handleCurrentChange"
              :total=pageCount>
              
            </el-pagination>
        </div>
      </div>
    </div>
    <el-dialog title="添加"  :visible.sync="addOutboundConfigDialog" width='400px' v-dialogDrag>
      <el-form :model="addForm" :rules="rules" class='hideTimeRightIcon'>
        <el-form-item label="商户编号:" :label-position="labelPosition" label-width="100px" prop='name' style='position:relative'>
          <el-input v-model="addForm.name" auto-complete="off" class='addInpt' id='addName' @blur='addBlur' @input="busiNoBlur"></el-input>
          <div class='busiNoList'>
              <span class='busiNoListItem' v-for='(item,index) in busiNoListSearch' :key='index' @click='chooseBusiItem'>{{item}}</span>
          </div>
          <div class='busiNoErrorText'>此商户编号已存在,请重新输入</div>
          
        </el-form-item>
        <el-form-item label="生效时间:" :label-position="labelPosition" label-width="100px">
          <el-date-picker
            type="date"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd"
            style="width: 80%"
            v-model='addForm.beginTimeVal'
            :picker-options="pickerOptions"
            id='timeReadonly'
            @focus="setTimeReadonly"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="到期时间:" :label-position="labelPosition" label-width="100px">
          <el-date-picker
            type="date"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd"
            style="width: 80%"
            v-model='addForm.endTimeVal'
            id='endTimeReadonly'
            @focus="setEndTimeReadonly"
            
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注:" :label-position="labelPosition" label-width="100px">
          <el-input type="textarea" v-model="addForm.desc" class='addInpt'></el-input>
        </el-form-item>
      
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addOutboundConfigClick">取 消</el-button>
        <el-button type="primary" @click="addDialogClick">确 定</el-button>
      </div>
    </el-dialog>

     <el-dialog title="修改"  :visible.sync="editOutboundConfigDialog" width='400px' v-dialogDrag>
      <el-form :model="EditForm" :rules="rules" class='hideTimeRightIcon'>
        <el-form-item label="商户编号:" :label-position="labelPosition" label-width="100px" prop='name'>
          <el-input v-model="EditForm.name" auto-complete="off" class='addInpt' id='editName' readonly="readonly"  style='position:relative'></el-input>
        
          <div class='editBusiNoErrorText'>此商户编号已存在,请重新输入</div>
        </el-form-item>
        <el-form-item label="生效时间:" :label-position="labelPosition" label-width="100px">
          <el-date-picker
            type="date"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd"
            style="width: 80%"
            v-model='EditForm.beginTimeVal'
            :picker-options="pickerOptions"
            id='editBeginTime'
            @focus='editBeginTimeFocus'
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="到期时间:" :label-position="labelPosition" label-width="100px">
          <el-date-picker
            type="date"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd"
            style="width: 80%"
            v-model='EditForm.endTimeVal'
            id='editEndTimeChoose'
            @focus="editEndTimeFocus"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注:" :label-position="labelPosition" label-width="100px">
          <el-input type="textarea" :maxlength="200" v-model="EditForm.desc" class='addInpt'></el-input>
        </el-form-item>
      
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editOutboundConfigDialog = false">取 消</el-button>
        <el-button type="primary" @click="editDialogClick">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="从Excel导入" :visible.sync="importeBlack" width="570px" v-dialogDrag>
        <div>
            <span style='margin-left:15px'>本地文件：</span> 
            <el-input placeholder="点击帮助以查看具体格式要求"  class="listValInp" v-model='inputFileName' readonly="readonly"></el-input>
            <label class="ui_button" for="filename">选择</label>
            <form enctype="multipart/form-data" id="formsubmit">
               <input :value=valueTextVal class="formIpt" type="file" id="filename" name="filename" style="position:absolute;clip:rect(0 0 0 0);"  @change='fileUpload'
               accept='.csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
               >
            </form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" style="float:left;margin-left:20px" @click='uploadTemplet'>下载模板</el-button>
          <el-button type="primary" @click="innerVisible = true">帮 助</el-button>
          <el-button type="primary" @click='uploadFileBtn'>确 定</el-button>
          <el-button @click="importeBlack = false">取 消</el-button>
        </span>
          <!-- 帮助信息提示弹框 -->
          <el-dialog width="533px" title="导入的文件格式要求" :visible.sync="innerVisible" append-to-body v-dialogDrag>
              <table class="importData">
                  <thead>
                      <tr>
                          <th>字段名</th>
                          <th style="padding-left: 27px;">字段格式要求</th>
                      </tr>
                  </thead>
                  <tr>
                      <th>商户编号(必填项)</th>
                      <td>
                        文本格式,不能为空
                       </td>
                  </tr>
                  <tr>
                      <th>生效时间</th>
                      <td>
                        
                        <span>文本格式XXXX-XX-XX,精确到天,默认为当前更新时间</span>
                      </td>
                  </tr>
                  <tr>
                      <th>到期时间</th>
                      <td> 
                       
                        <span>文本格式XXXX-XX-XX,精确到天,默认为生效时间</span>
                      </td>
                  </tr>
                  <tr>
                      <th>备注</th>
                      <td>
                        
                        <span>文本格式,200字以内</span>
                      </td>
                  </tr>
                 
              </table>
              <span slot="footer" class="dialog-footer">
                <el-button @click="innerVisible = false">已了解</el-button>
              </span>
        </el-dialog>
    </el-dialog>

    <el-dialog title="外呼商户列表查询：分页选择下载" :visible.sync="downloadConfig" width="400px" v-dialogDrag>
            <div style="text-align: center; margin-bottom:20px;">
              选择下载从
              <input type="number" min="1" class="downClass" v-model="startNo">
              到
              <input type="number" min="1" :max=pageCountNum  class="downClass" v-model="endpageNo">
              页的数据
            </div>
            <h4 style="text-align: center">当前共<span>{{pageCountNum}}</span>页</h4>
        <span slot="footer" class="dialog-footer">
          <el-button @click="downloadConfig = false">取 消</el-button>
          <el-button type="primary" @click='downloadConfigBtn' v-show='showUploadOuntBoundBtn'>下 载</el-button>
        </span>
    </el-dialog>
    <!-- 删除 -->
    <el-dialog title="提示" :visible.sync="removeDialog" width="400px" v-dialogDrag>
        <div style='width:100%;text-align:center'>
            <p> <i class='el-icon-warning' style='color:#F1F2F5;font-size:25px;'></i> </p>
            <p>确认将选中的记录删除？</p>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="removeDialog = false">取消</el-button>
          <el-button type="primary" @click='removeSave'>确定</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<script>
import qs from 'qs'
  export default{
    name:'外呼商户配置平台',
    data(){
      return {
        resetPermission: false,//重置权限
        showSearchBtnOutbound:false,
        showAddBtnOutbound:false,
        showImportOutbound:false,
        showDelOutbound:false,
        showUploadOutbound:false,
        removeDialog:false,
        currentPage:1,
        tableData:[],
        form:{},
        options: [{id:'-1',value:'全部',},{ id:'1',value:'生效'},{id:'0',value:'未生效'}],
        optionValue:'',
        beginTimeVal:'',
        endTimeVal:'',
        busiNum:'',
        addOutboundConfigDialog:false,
        labelPosition:'right',
        addForm:{
          name:'',
          beginTimeVal:'',
          endTimeVal:'',
          desc:''
        },
        rules:{
          name:[{ required: true, message: '请输入活动名称', trigger: 'blur' }]
        },
        editOutboundConfigDialog:false,
        EditForm:{
          name:'',
          beginTimeVal:'',
          endTimeVal:'',
          desc:''
        },
        removeCheck:[],
        importeBlack:false,
        innerVisible:false,
        inputFileName:'',
        file:'',
        downloadConfig:false,
        startNo:0,
        endpageNo:0,
        pageSize:10,
        pageNum:1,
        pageCount:0,
        pageCountNum:0,
        outCheckItemInfo:{},
        pickerOptions:{
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        busiNoListSearch:[],
        valueTextVal:'',
        showUploadOuntBoundBtn:false,
      }
    },
    
    methods:{
      // 当前显示条数
      handleSizeChange(e){
        console.log(e.target.value)
        this.pageSize = parseInt(e.target.value) 
        this.search()
      },
      // 当前页
      handleCurrentChange(val){
        console.log(val)
        this.pageNum = val
        this.search()
      },
      selectChange(){},
      selectDelUser(val){
        //console.log(val)
        this.removeCheck = []
        val.forEach(ele => {
          this.removeCheck.push(ele.id)
        });
        console.log(this.removeCheck)
      },
      // 查询
      search(){
        console.log(this.beginTimeVal)
        console.log(this.endTimeVal)
        console.log(this.busiNum)
        
        if(this.pageSize === ''){
          this.pageSize = 10
        }
        if(this.pageNum === ''){
          this.pageNum = this.currentPage
        }
        if(this.optionValue === ''){
          this.optionValue = '-1'
        }
        console.log(this.optionValue)

       
        this.$axios.post('/OutCallMerchantConfigController/queryOutCallMerchantConfig',qs.stringify({
            'sessionId':localStorage.getItem('SID'),
            'startTime':this.beginTimeVal,
            'endTime':this.endTimeVal,
            'merchantId':this.busiNum,
            'status': parseInt(this.optionValue),
            'pageNum':this.pageNum,
            'pageSize':this.pageSize
        }))
        .then(res => {
         
          console.log(res.data)
          if(res.data.code === 1){
              this.pageCount = res.data.dataSize
              this.tableData = res.data.data
              this.tableData.forEach(ele => {
                if(ele.status === 0){
                  ele.status = '停用'
                }else if(ele.status === 1){
                  ele.status = '启用'
                }
                var date = new Date(ele.updateTime)
                var y = date.getFullYear()  
                var m = date.getMonth() + 1  
                m = m < 10 ? ('0' + m) : m
                var d = date.getDate(); 
                d = d < 10 ? ('0' + d) : d  
                var h = date.getHours()
                h = h < 10 ? ('0' + h) : h
                var minute = date.getMinutes()
                var second = date.getSeconds()
                minute = minute < 10 ? ('0' + minute) : minute  
                second = second < 10 ? ('0' + second) : second; 
                ele.updateTime = y + '-' + m + '-' + d+' '+h+':'+minute+':'+second
              })
          }else if(res.data.code !== 1){
             this.tableData = []
             this.pageCount = 0
          }
          

        })
        .catch(error => {
          console.log(error)
        })
      },
      reset(){
        this.busiNum = ''
        this.optionValue = ''
        this.initTimeSet()
      },
      // 添加失焦验证
      addBlur(){
        let addName = document.querySelector('#addName')
        if(this.addForm.name !== '' || this.addForm.name !== undefined){
          addName.style.border = '1px solid #dcdfe6'
         
        }
        this.$axios.post('/OutCallMerchantConfigController/checkMerchantId',qs.stringify({
          'sessionId':localStorage.getItem('SID'),
          'merchantId':this.addForm.name
        }))
        .then(res => {
          console.log(res.data)
          if(res.data.code === 1){
              document.querySelector('.busiNoErrorText').style.display = 'none'
          }else if(res.data.code !== 1){
            addName.style.border = '1px solid #f56c6c'
            document.querySelector('.busiNoErrorText').style.display = 'block'
            return
          }
        })

      },
      addOutboundConfigClick(){
        this.addOutboundConfigDialog = false
        this.addForm.name = ''
        document.querySelector('#addName').style.border = '1px solid #dcdfe6'

        
      },
      // 添加
      addDialogClick(){
        //console.log(this.addForm.name)
        let addName = document.querySelector('#addName')
        if(this.addForm.name === '' || this.addForm.name === undefined){
          addName.style.border = '1px solid #f56c6c'
          return
        }else if(this.addForm.name !== '' || this.addForm.name !== undefined){
          
          addName.style.border = '1px solid #dcdfe6'
        }
        console.log(this.addForm.beginTimeVal)
       
        var date = new Date()
        var beginTime = this.addForm.beginTimeVal
        
    
        var startTimeDate = new Date(beginTime.split(' ')[0].split('-').join('/')).getTime()
        var endTime = this.addForm.endTimeVal

        var endTimeDate = new Date(endTime.split(' ')[0].split('-').join('/')).getTime()
        

       if( startTimeDate  > endTimeDate ){
          this.$alert('到期日期需大于等于生效日期','提示',{
            confirmButtonText:'确定',
            type:'warning',
            callback:action=>{

            }
          })
          return
       }
       if(document.querySelector('.busiNoErrorText').style.display == 'block'){
         document.querySelector('#addName').style.border = '1px solid #f56c6c'
         return
       }
       
        
        console.log(this.addForm.endTimeVal)
        this.$axios.post('/OutCallMerchantConfigController/addOutCallMerchantConfig',qs.stringify({
          'sessionId':localStorage.getItem('SID'),
          'merchantId':this.addForm.name,
          'effectiveTime':this.addForm.beginTimeVal,
          'expireDate':this.addForm.endTimeVal,
          'remark':this.addForm.desc,
          
        }))
        .then(res => {
          console.log(res.data)
          if(res.data.code === 1){
              this.$alert('添加成功','提示',{
                confirmButtonText:'确定',
                type:'success',
                callback:action => {
                  this.addOutboundConfigDialog = false
                  this.addForm.name = ''
                  this.addForm.beginTimeVal = ''
                  this.addForm.endTimeVal = ''
                  this.addForm.desc = ''
                  
                  this.search()
                }
              })
             
          }else if(res.data.code !== 1){
                this.$alert(res.data.message,'提示',{
                  confirmButtonText:'确定',
                  type:'success',
                  callback:action => {

                  }
                })
          }
        })
        .catch(error => {
          console.log(error)
        })
      },
      // 双击显示修改
      dblclickShow(row){
        console.log(row)
        this.outCheckItemInfo = row
        this.editOutboundConfigDialog = true
        this.EditForm.name = row.merchantId
        this.EditForm.beginTimeVal = row.effectiveTime
        this.EditForm.endTimeVal = row.expireDate
        this.EditForm.desc = row.remark
      },
      // 修改
      editDialogClick(){
        // console.log(this.outCheckItemInfo)
       
        
        
        // console.log(this.EditForm.desc)
       
       
        this.EditForm.beginTimeVal = this.outCheckItemInfo.effectiveTime.split(' ')[0]
        

        
        this.EditForm.endTimeVal = this.outCheckItemInfo.expireDate.split(' ')[0]
        

        console.log(this.EditForm.beginTimeVal)
        console.log(this.EditForm.endTimeVal)
        console.log(this.outCheckItemInfo.id)
        console.log(this.EditForm.name)
        
        this.$axios.post('/OutCallMerchantConfigController/updateOutCallMerchantConfig',qs.stringify({
          'sessionId':localStorage.getItem('SID'),
          'merchantId':this.EditForm.name,
          'id':this.outCheckItemInfo.id,
          'effectiveTime':this.EditForm.beginTimeVal,
          'expireDate':this.EditForm.endTimeVal,
          'remark':this.EditForm.desc,
          
        }))
        .then(res => {
          console.log(res.data)
          if(res.data.code === 1){
            this.$alert('修改成功','提示',{
              confirmButtonText:'确定',
              type:'success',
              callback:action => {
                this.editOutboundConfigDialog = false
                this.EditForm.beginTimeVal = ''
                this.EditForm.endTimeVal = ''
                this.EditForm.desc = ''
                this.search()

              }
            })
           
            
          }else if(res.data.code !== 1){
            this.$alert(res.data.message,'提示',{
              confirmButtonText:'确定',
              type:'warning'
            })
          }
        })
        .catch(error => {
          console.log(error)
        })
      },
      // 删除
      delClick(){
        if(this.removeCheck.length === 0){
          this.$alert('请至少选择一条记录进行删除','系统提示',{
            confirmButtonText:'确定',
            type:'warning',
            callback:action => {

            }
          })
          return
        }
        console.log(this.removeCheck.join(','))
         this.removeDialog = true
            
       
      },
      // 删除
      removeSave(){
            this.$axios.post('/OutCallMerchantConfigController/deleteOutCallMerchantConfig',qs.stringify({
              'sessionId':localStorage.getItem('SID'),
              'ids':this.removeCheck.join(',')
            }))
            .then(res => {
              console.log(res.data)
              if(res.data.code === 1){
                this.$alert('删除成功','提示',{
                  confirmButtonText:'确定',
                  type:'success',
                  callback:action => {
                    this.search()
                    this.removeDialog = false
                  }
                })
                
              }else if(res.data.code !== 1){
                this.$alert('删除失败','提示',{
                  confirmButtonText:'确定',
                  type:'success',
                  callback:action => {
                    
                  }
                })
              }
            })
            .catch(error => {
              console.log(error)
            })
      },
      // 下载模板
      uploadTemplet(){
        window.location=encodeURI(this.uploadBaseUrl + '/OutCallMerchantConfigController/downloadSample')
      },
     
      fileUpload(e){
        this.inputFileName = e.target.files[0].name
        //console.log(e.target.files[0])
        this.file = e.target.files[0]
      },
      uploadFileBtn(){
        console.log(this.file)
         if(this.file === ''){
          this.$alert('不能上传空文件','文件类别错误',{
            confirmButtonText:'确定',
            callback:action => {

            }
          })
          return
        }
        let formData = new FormData()
        formData.append('file',this.file)
        this.$axios.post('/OutCallMerchantConfigController/importExcel?sessionId='+localStorage.getItem('SID'),formData)
        .then(res => {
          console.log(res.data)
          if(res.data.code === 1){
            this.$alert('导入成功','提示',{
              confirmButtonText:'确定',
              type:'success',
              callback:action=>{

              }
            })
            this.importeBlack = false
            this.file = ''

          }else if(res.data.code !== 1){
            this.$alert(res.data.message,'提示',{
              confirmButtonText:'确定',
              type:'warning'
            })
          }
        })
        .catch(error => {
          console.log(error)
        })

      },
      // 商户编号验证
       busiNoBlur(){
                
          
          this.$axios.post('/OfflineChecklistController/easyInquiry',qs.stringify({
              'sessionId':localStorage.getItem('SID'),
              'merchantId':this.form.username,
              
          }))
          .then(res => {
              console.log(res.data)
              if(res.data.ids.length !== 0){
                  document.querySelector('.busiNoList').style.display = 'block'
                  this.busiNoListSearch = []
                  this.busiNoListSearch =  this.busiNoListSearch.concat(res.data.ids)
              }else if(res.data.ids.length === 0){
                  this.busiNoListSearch = []
                  document.querySelector('.busiNoList').style.display = 'none'
              }
              
          })
          .catch(error => {
              console.log(error)
          })
      },
      chooseBusiItem(e){
         
          this.addForm.name = e.target.innerText
          document.querySelector('.busiNoList').style.display = 'none'
      },
      editBusiNoBlur(){
        console.log(this.EditForm.name)
        this.$axios.post('/OutCallMerchantConfigController/checkMerchantId',qs.stringify({
          'sessionId':localStorage.getItem('SID'),
          'merchantId':this.EditForm.name
        }))
        .then(res => {
          if(res.data.code === 1){
            
          }else if(res.data.code !== 1){
            let editName = document.querySelector('#editName')
            editName.style.border = '#f56c6c'
            document.querySelector('.editBusiNoErrorText').style.display = 'none '
            return
          }
        })
      },
      downloadConfigBtn(){
        console.log(this.startNo)
        console.log(this.endpageNo)
        if(parseInt(this.startNo) > parseInt(this.endpageNo)){
          this.$alert('起始页需要小于等于结束页','提示',{
            confirmButtonText:'确定',
            type:'warning',
            callback:action=>{

            }
          })
          return
        }

        if((parseInt(this.endpageNo) - parseInt(this.startNo) + 1) * parseInt(this.pageSize)> 100000){
          this.$alert('导出最多只能10万条','提示',{
            confirmButtonText:'确定',
            type:'warning',
            callback:action=>{

            }
          })
          return
        }
        
        window.location = encodeURI(this.uploadBaseUrl + '/OutCallMerchantConfigController/exportExcel?sessionId='+localStorage.getItem('SID') + '&startTime='+this.beginTimeVal+'&endTime='+this.endTimeVal+'&pageSize='+this.pageSize+'&status='+parseInt(-1)+'&startPage='+this.startNo+'&endPage='+this.endpageNo+'&merchantId='+this.busiNum)
        this.downloadConfig = false
        
      },
     
        // 设置默认时间
        initTimeSet(){
            let date = new Date()
            let y = date.getFullYear()
            let m = "0"+(date.getMonth()+1)
            let d = "0"+date.getDate()
            // console.log(y+'-'+m+'-'+d)
            this.beginTimeVal = y+'-'+m.substring(m.length-2,m.length)+'-'+d.substring(d.length-2,d.length) + ' '+ '00:00:00'
            this.addForm.beginTimeVal = y+'-'+m.substring(m.length-2,m.length)+'-'+d.substring(d.length-2,d.length)
            this.endTimeVal = y+'-'+m.substring(m.length-2,m.length)+'-'+d.substring(d.length-2,d.length) + ' '+ '23:59:59'
            this.addForm.endTimeVal = y+'-'+m.substring(m.length-2,m.length)+'-'+d.substring(d.length-2,d.length)
            
        },
         //权限
      queryAuthList(){
         let arr = JSON.parse(localStorage.getItem('ARRLEVEL'));
         arr.forEach(ele => {
          //  查询
           if(ele == parseInt(101) ){
              this.showSearchBtnOutbound = true
           }else if(ele == parseInt(103)){
              this.showAddBtnOutbound = true
           }else if(ele == parseInt(105)){
              this.showImportOutbound = true
           }else if(ele == parseInt(104)){
             this.showDelOutbound = true
           }else if(ele == parseInt(106)){
             this.showUploadOutbound = true
           } else if (ele == parseInt(102)) {
             this.resetPermission = true;
           }
         });
      },
      dataTimeChoose(){
        document.querySelector('#dataTimeReadonly').setAttribute('readOnly',true)
        
      },
      dataTimeEndFocus(){
        document.querySelector('#dataTimeEnd').setAttribute('readOnly',true)
      },
      setTimeReadonly(){
        document.querySelector('#timeReadonly').setAttribute('readOnly',true)
      },
      setEndTimeReadonly(){
        document.querySelector('#endTimeReadonly').setAttribute('readOnly',true)
      },
      editBeginTimeFocus(){
        document.querySelector('#editBeginTime').setAttribute('readOnly',true)
      },
      editEndTimeFocus(){
        document.querySelector('#editEndTimeChoose').setAttribute('readOnly',true)
      },

       

    },
    mounted(){
      this.initTimeSet()
      this.queryAuthList()
    },
    watch:{
      downloadConfig(){
        if(this.downloadConfig == true){
          this.startNo = 0
          this.endpageNo = Math.ceil(this.pageCount/this.pageSize) 
          this.pageCountNum = Math.ceil(this.pageCount/this.pageSize) 
          if(this.tableData.length === 0){
            this.showUploadOuntBoundBtn = false
          }else if(this.tableData.length !== 0){
            this.startNo = 1
            this.showUploadOuntBoundBtn = true
          }
        }
      },
      importeBlack(){
        if(this.importeBlack == false){
          this.file = ''
          this.inputFileName = ''
        }
      },
      addOutboundConfigDialog(){
        
        if(this.addOutboundConfigDialog == false){
          if(document.querySelector('.busiNoErrorText').style.display = 'block'){
              document.querySelector('.busiNoErrorText').style.display = 'none'
          }
          document.querySelector('#addName').style.border == '1px solid #dcdfe6'
          
          
        }
      },
    }
  }
</script>
<style scoped>
.searchContent{font-size: 13px;color: #333333;width: 100%;padding-top: 30px;border-bottom: 1px solid #e0e0e0;padding-bottom: 20px}
.searchContentLeft{width: 80%;border-right: 1px solid #e0e0e0;padding-left: 2%;display: inline-block;}
  .beginTime,.endTime,.controlNumber,.approvalStatus,.ControlType,.source,.merchantCode,.SourceCode,.merchantCode,.phone,.ip,.tradingScene{
    display: inline-block;margin-bottom: 20px;width:33%;
  }
.ip,.tradingScene{margin-bottom: 0}
 .editInput{width: 50%}
.span{width: 110px;text-align: right;display: inline-block}
.searchContentRightOut {
    float: right;
    padding-right: 5%;
    /* padding-top: 45px; */
}
.iconStyle{display: block;height: 36px;width: 100px;font-size: 20px}
  .iconRefer{margin-top: 20px}
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
.addIpt{border-radius: 50px;    width: 74%;
  height: 36px;}
.BotoomBtn {
  width: 44px;
 
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
  background: url(../../images/off1.png);
  width: 44px;
  height: 30px;
  margin: 0 auto;
}
.addIcon:hover {
  background: url(../../images/addHover.png);
  /* width: 44px;
  height: 30px; */
  margin: 0 auto;
  border-top-left-radius: 7px;
  border-bottom-left-radius: 7px;
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
  /* width: 44px;
  height: 30px; */
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
  background: url(../../images/import1.png);
  width: 44px;
  height: 30px;
  margin: 0 auto;
}
.removIcon:hover {
  background: url(../../images/import_actived.png);
  width: 44px;
  height: 30px;
  margin: 0 auto;
}
.refreshIcon {
  background: url(../../images/sc.png) ;
  width: 44px;
  height: 30px;
  margin: 0 auto;
}
.refreshIcon:hover {
  background: url(../../images/scH.png) no-repeat ;
  width: 44px;
  height: 30px;
  margin: 0 auto;
}
.downloadIcon {
  background: url(../../images/dc.png) no-repeat ;
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
  .listAddLeftForm{width: 45%;border-right: 1px solid #e0e0e0;float: left;}
.listAddRightForm{width: 40%;float: left;padding-left: 40px}
  .listAddRightForm .editInput{width: 100%}
 .clear:after{content: "";display: block;clear: both;}
  .listAddBottomForm{border-top: 1px solid #e0e0e0;clear: both;width: 100%;}
  .listAddBottomForm .beginTime{width: 45%;margin-top: 20px}
.listAddBottomForm .endTime{width: 50%;margin-top: 20px;margin-left: 3%}
  .listAddBottomForm .span{width: 100px}
  .block{margin-top:34px;}
  .pagination{margin-left:34px;font-size:12px;color:#333333;display:inline-block}
  .evetotal{
    margin-left: 3px; padding-left: 10px;  
    background:url(../../images/xxjt.png) no-repeat;
    background-position: 34px 8px; background-size:7px 5px; 
    outline: none;
    appearance:none;-moz-appearance:none;
    -webkit-appearance:none;width:50px;height:22px;  
    border: 1px solid #E0E0E0;  
    border-radius: 100px;
    font-family: PingFangSC-Regular;  
    font-size: 12px;  color: #333333;
  }
  .paginationRight{display:inline-block;float: right;}
.tableData{border-right:10px solid #ffffff}
.addInpt{width:80%}
.listValInp{width: 60%;height: 36px;}
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
   .importData{
    text-indent: 15px;
    border-spacing: inherit;
  }
  .importData tr:nth-child(even){
      background-color: rgb(244, 244, 244);
  }
  .importData th{
    text-align: left;
    width: 111px;
  }
  .importData td{
    padding-left: 28px;
  }
  .downClass{
    width:80px;
    height:36px;
  }
  #addDataTitle,#importDataTitle,#delDataTitle,#downloadDataTitle{
    position:relative
  }
  #addDataTitleSet:hover::after,#importDataTitleSet:hover::after,#delDataTitleSet:hover::after,#downloadDataSet:hover::after{
    content: attr(data-title);
    position: absolute;
    top:35px;
    left:0px;
    line-height:26px;
    height:26px;
    width:44px;
    text-align: center;
    background-color: #ffffff;
    border: 1px solid #e0e0e0;
    box-shadow: 0 2px 4px 0 rgba(204,204,204,0.50);
    z-index:11;
    font-size:12px;
    color:#333333;
  }
  .busiNoErrorText,.editBusiNoErrorText{color:#f56c6c;font-size:12px;position: absolute;top:25px;left:5px;display:none}
.busiNoList{
    width: 80%;
    max-height: 100px;
    position: absolute;
    left: 0;
    top: 38px;
    border: 1px solid #e0e0e0;
    background-color: #ffffff;
    z-index: 10;
    overflow-y: scroll;
    display:none;
}
.busiNoListItem{
    display:block;height:20px;line-height:20px;width:100%;text-align:left;text-indent: 15px;
    overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
    font-size:12px;color:#333333;
    cursor: pointer;
}
.busiNoListItem:hover{
    background-color: #ecf5ff;
    color: #66b1ff;
}
.busiNoList::-webkit-scrollbar{
    display:none
}
</style>
