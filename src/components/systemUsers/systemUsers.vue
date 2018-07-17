// 系统用户管理
<template>
  <div class="dataContent" >
    <div class="contentTop clear">
      <div class="serBtn">登录名:  <el-input clearable placeholder="请输入内容" class="ipt"  v-model="getDj" ></el-input></div>
      <div class="serBtn">所属角色：
        <template>
          <el-select v-model="roleValue" placeholder="请选择" @focus="getAllRoleList">
            <el-option v-for="item in userRoleList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </template>
      </div>
      <div class="serchImg serBtn" @click="searchRoleUser">
        <img src="../../images/fdj.png" alt="" >
      </div>
    </div>
    <div class="contentBotoom">
      <div class="button">
        <div class="leftButton clear">
          <!--添加table新数据-->
          <div class="BotoomBtn leftRadius">
            <div class="addIcon" data-title='添加'  @click="dataAddClick" id='addIconTitle'></div>
          </div>
          <!--删除table的数据-->
          <div class="BotoomBtn">
            <div class="removIcon" data-title='删除' @click="delUserSubmit" id='removeIconTitle'></div>
          </div>
          <!--刷新table的数据-->
          <div class="BotoomBtn" data-title='刷新' @click="refersh" id='refreshIconTitle'>
            <div class="refreshIcon"></div>
          </div>
          <!--下载打印table的数据-->
          <div class="BotoomBtn rightRadius">
            <div class="downloadIcon" data-title='打印' @click="downloadData" id='downloadIconTitle'></div>
          </div>
        </div>
      </div>
    </div>
    <div class="dialog">
      <!--新建对话框-->
      <div class="hiddeBox">
        <el-dialog title="新建用户" :visible.sync="dataAdd" width="750px" v-dialogDrag>
          <div class="dialogLeft">
            <el-form ref="form" :model="form" label-width="90px" size="mini" :rules="addRule">
              <el-form-item label="业务线:" prop="busline"  >
                <el-select v-model="form.busline" placeholder="请选择" @change="selectChange" id="busline" >
                  <el-option label="总部" value="2"></el-option>
                  <el-option label="线上" value="0"></el-option>
                  <el-option label="线下" value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="用户名称:" prop="userLogin" >
                <el-input clearable class="addIpt"   v-model="form.loginname" id="userLogin"></el-input>
              </el-form-item>
              <el-form-item label="密码:" prop="psd" >
                <el-input clearable class="addIpt" type="text" v-model="form.usercode" id="psd"></el-input>
              </el-form-item>
              <el-form-item label="确认密码:" prop="confirmPsd" >
                <el-input clearable class="addIpt" type="text" v-model="form.addUserConfirmPsd"  id="confirmPsd"></el-input>
              </el-form-item>
              <el-form-item label="真实姓名:">
                <el-input clearable class="addIpt" :maxlength="15" placeholder="最大长度不能超过15位" v-model="form.username" id="formUsername"></el-input>
              </el-form-item>
              <el-form-item label="头衔:">
                <el-input clearable class="addIpt" :maxlength="15" placeholder="最大长度不能超过15位" v-model="form.title" id="formTitle"></el-input>
              </el-form-item>
              <el-form-item label="手机号码:">
                <el-input clearable class="addIpt" :maxlength="15" placeholder="最大长度不能超过15位" v-model="form.phone" id="formPhone" @blur="phoneTextCheck"></el-input>
                
              </el-form-item>
              <el-form-item label="电子邮件:">
                <el-input clearable class="addIpt"  placeholder="最大长度不能超过15位" v-model="form.email" id="formEmail"></el-input>
              </el-form-item>
              <el-form-item label="状态:">
                <el-checkbox-group v-model="form.userstate">
                  <el-checkbox label="是否启用" name="type"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-form>
          </div>
          <div class="dialogRight" v-if='num==2'>
            <div> 请选择角色 </div>

            <el-table    :data='genealList'  highlight-current-row class='systemUser'>
              <el-table-column label="" width="50">
                  <template slot-scope="scope">
                    <el-radio :label="scope.row.id" v-model='addGenealVal' @change.native="AddhandleSelectChangeGeneal(scope)"></el-radio>
                  </template>
              </el-table-column>
              <el-table-column property="mechName" label="总部机构" width="150" ></el-table-column>
              <el-table-column property="lineType" label="业务线" width="80"></el-table-column>
              <el-table-column property="name" label="角色名" width="150"></el-table-column>
              <el-table-column property="id" label="角色号"></el-table-column>
            </el-table>

            <el-table  :data="storageTableDataAdd"   @selection-change="handleSelectChange" class='systemUser'>
              <el-table-column label="" width="50">
                  <template slot-scope="scope">
                    <el-radio :label="scope.row.id"  v-model='headOnlineRadioVal' @change.native="headquarterOnlineChange(scope)"></el-radio>
                  </template>
              </el-table-column>
              <el-table-column property="mechName" label="线上机构" width="150"></el-table-column>
              <el-table-column property="lineType" label="业务线" width="80"></el-table-column>
              <el-table-column property="name" label="角色名" width="150"></el-table-column>
              <el-table-column property="id" label="角色号"></el-table-column>
            </el-table>

            <el-table  :data="storageTableData"   @selection-change="handleSelectChange" class='systemUser'>
              <el-table-column label="" width="50">
                  <template slot-scope="scope">
                    <el-radio :label="scope.row.id" v-model='radioVal' @change.native="headquarterOfflineChange(scope)"></el-radio>
                  </template>
              </el-table-column>
              <el-table-column property="mechName" label="线下机构" width="150"></el-table-column>
              <el-table-column property="lineType" label="业务线" width="80"></el-table-column>
              <el-table-column property="name" label="角色名" width="150"></el-table-column>
              <el-table-column property="id" label="角色号"></el-table-column>
            </el-table>
          </div>
          <div class="dialogRight" v-if='num == 0'>
            <div> 请选择角色</div>
            <el-table  :data="storageTableDataAdd"   @selection-change="handleSelectChange" class='systemUser'>
             

              <el-table-column label="" width="50">
                  <template slot-scope="scope">
                    <el-radio :label="scope.row.id" v-model='onlineRadioVal' @change.native="onlineSelectChange(scope)"></el-radio>
                  </template>
              </el-table-column>


              <el-table-column property="mechName" label="线上机构" width="150"></el-table-column>
              <el-table-column property="lineType" label="业务线" width="80"></el-table-column>
              <el-table-column property="name" label="角色名" width="150"></el-table-column>
              <el-table-column property="id" label="角色号"></el-table-column>
            </el-table>
          </div>
          <div class="dialogRight" v-if='num == 1'>
            <div> 请选择角色</div>
            <el-table  :data="storageTableData"   @selection-change="handleSelectChange" class='systemUser'>
             

              <el-table-column label="" width="50">
                  <template slot-scope="scope">
                    <el-radio :label="scope.row.id" v-model='offlineRadioVal' @change.native="offlineSelectChange(scope)"></el-radio>
                  </template>
              </el-table-column>


              <el-table-column property="mechName" label="线下机构" width="150"></el-table-column>
              <el-table-column property="lineType" label="业务线" width="80"></el-table-column>
              <el-table-column property="name" label="角色名" width="150"></el-table-column>
              <el-table-column property="id" label="角色号"></el-table-column>
            </el-table>
          </div>
       
          <div slot="footer" class="dialog-footer">
            <el-button @click="centerAddUser">取 消</el-button>
            <el-button type="primary" @click="addUserSubmit">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <!--修改对话框-->
      <div class="hiddeBox" >
        <el-dialog title="用户修改" :visible.sync="dataAmend" width="750px"  v-dialogDrag>
          <div class="dialogLeft">
            <el-form ref="editUserForm" :model="editUserForm" label-width="95px" size="mini" :rules="addRule">
              <el-form-item label="业务线:" prop="busline" id="xgBusline">
                <el-select v-model="editUserForm.lineType" placeholder="请选择" id='editUserFormText' @change="selectChange">
                  <el-option label="总部" value="2"></el-option>
                  <el-option label="线上" value="0"></el-option>
                  <el-option label="线下" value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="用户名称:" prop="editusername">
                <el-input clearable class="addIpt" v-model="editUserForm.name" id="xgLoginname"></el-input>
              </el-form-item>
              <el-form-item label="密码:">
                <el-input clearable class="addIpt" v-model="editUserForm.passdVal" id="passdVal"></el-input>
              </el-form-item>
              <el-form-item label="确认密码:">
                <el-input clearable class="addIpt" v-model="editUserForm.psdConfirmVal" id="psdConfirmVal"></el-input>
              </el-form-item>
              <el-form-item label="真实姓名:">
                <el-input clearable class="addIpt" placeholder="请输入内容" :maxlength="15" v-model="editUserForm.realName" id="editUserFormUsername"></el-input>
              </el-form-item>
              <el-form-item label="头衔:">
                <el-input clearable class="addIpt" placeholder="请输入内容" :maxlength="15" v-model="editUserForm.title" id="editUserFormTitle"></el-input>
              </el-form-item>
              <el-form-item label="手机号码:">
                <el-input clearable class="addIpt" placeholder="请输入内容" :maxlength="15" v-model="editUserForm.phone" id="editUserFormPhone"></el-input>
              </el-form-item>
              <el-form-item label="电子邮件:">
                <el-input clearable class="addIpt" placeholder="请输入内容" :maxlength="15" v-model="editUserForm.email" id="editUserFormeEmail"></el-input>
              </el-form-item>
              <el-form-item label="状态:">
                <el-checkbox-group v-model="editUserForm.userstate">
                  <el-checkbox label="是否启用" name="type"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-form>
          </div>
          <div class="dialogRight" v-show='num == 2'>
            <p>请选择角色</p>


            <el-table ref="multipleTableRef"    :data='genealList'  highlight-current-row class='systemUser'>

              <el-table-column label="" width="50">
                  <template slot-scope="scope">
                    <el-radio :label="scope.row.id" :value='scope.row.id' v-model='genealVal' @change.native="handleSelectChangeGeneal(scope)"></el-radio>
                  </template>
              </el-table-column>
              
              <el-table-column property="mechName" label="总部机构" width="150" ></el-table-column>
              <el-table-column property="lineType" label="业务线" width="80"></el-table-column>
              <el-table-column property="name" label="角色名" width="150"></el-table-column>
              <el-table-column property="id" label="角色号"></el-table-column>
              
            </el-table>


            <el-table ref="multipleTable"    :data="storageTableDataAdd"  highlight-current-row class='systemUser'>

              <el-table-column label="" width="50">
                  <template slot-scope="scope">
                    <el-radio :label="scope.row.id" :value='scope.row.id' v-model='editSelectedRoleid' @change.native="handleSelectChangeEdit(scope)"></el-radio>
                  </template>
              </el-table-column>
             
              <el-table-column property="mechName" label="线上机构" width="150" ></el-table-column>
              <el-table-column property="lineType" label="业务线" width="80"></el-table-column>
              <el-table-column property="name" label="角色名" width="150"></el-table-column>
               <el-table-column property="id" label="角色号"></el-table-column>
              
            </el-table>
            <el-table    ref="multipleTable" :data="storageTableData"  highlight-current-row class='systemUser'>
              <el-table-column label="" width="50">
                  <template slot-scope="scope">
                    <el-radio :label="scope.row.id" :value='scope.row.id' v-model='editRadioHeadOfflineRole' @change.native="editHandleChangeSelect(scope)"></el-radio>
                  </template>
              </el-table-column>
            
              <el-table-column property="mechName" label="线下机构" width="150" ></el-table-column>
              <el-table-column property="lineType" label="业务线" width="80"></el-table-column>
              <el-table-column property="name" label="角色名" width="150"></el-table-column>
                <el-table-column property="id" label="角色号"></el-table-column>
              
            </el-table>
          
          </div>
          <div class="dialogRight" v-show='num === 0'>
            <p>请选择角色</p>
            <el-table  ref="multipleTable" :data="storageTableDataAdd"  highlight-current-row class='systemUser'>
              <el-table-column label="" width="50">
                  <template slot-scope="scope">
                    <el-radio :label="scope.row.id" :value='scope.row.id' v-model='editOnlineRadioVal' @change.native="editOnlineRadioChange(scope)"></el-radio>
                  </template>
              </el-table-column>
              <el-table-column property="mechName" label="线上机构" width="150" ></el-table-column>
              <el-table-column property="lineType" label="业务线" width="80"></el-table-column>
              <el-table-column property="name" label="角色名" width="150"></el-table-column>
              <el-table-column property="id" label="角色号"></el-table-column>
            </el-table>         
          </div>

          <div class="dialogRight" v-show='num === 1'>
            <p>请选择角色</p>
            <el-table    ref="multipleTable" :data="storageTableData"  highlight-current-row class='systemUser'>
              <el-table-column label="" width="50">
                  <template slot-scope="scope">
                    <el-radio :label="scope.row.id" :value='scope.row.id' v-model='editOfflineRadioVal' @change.native="editOfflineRadioChange(scope)"></el-radio>
                  </template>
              </el-table-column>
              <el-table-column property="mechName" label="线下机构" width="150" ></el-table-column>
              <el-table-column property="lineType" label="业务线" width="80"></el-table-column>
              <el-table-column property="name" label="角色名" width="150"></el-table-column>
              <el-table-column property="id" label="角色号"></el-table-column>
            </el-table>         
          </div>
        
          <div slot="footer" class="dialog-footer">
            <el-button @click="dataAmendClose">取 消</el-button>
            <el-button type="primary" @click="editUserSubmit">确 定</el-button>
          </div> 
        </el-dialog>
      </div>
    </div>
    <div class="contentData">
      <div class="dataTable clear">
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          @selection-change="selectDelUser">
          <el-table-column
            type="selection"
            width="50"
            align='center'
          >
          </el-table-column>
          <el-table-column
            prop="userName"
            
            label="登录名"
            sortable
             width="100"
             align='center'
          >
          </el-table-column>

          <el-table-column
            prop="roleName"
            label="所属角色"
            align='center'
          >
          </el-table-column>

          <el-table-column
            prop="realName"
            label="真实姓名"
            align='center'
          >
          </el-table-column>
          <el-table-column
            prop="title"
            label="头衔"
            align='center'
          >
          </el-table-column>
          <el-table-column
            prop="lineTypeName"
            label="业务线"
            align='center'
          >
          </el-table-column>
            <el-table-column
            prop="hqOrgName"
            label="总部机构"
            align='center'
          >
          </el-table-column>
          <el-table-column
            prop="onlineOrgName"
            label="线上机构"
            align='center'
          >
          </el-table-column>
          <el-table-column
            prop="offlineOrgName"
            label="线下机构"
            align='center'
          >
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机号码"
            align='center'
          >
          </el-table-column>
          <el-table-column
            prop="email"
            label="电子邮件"
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
            prop="createTime"
            label="创建时间"
            align='center'
          >
          </el-table-column>
          <el-table-column
            prop="lastUpdateTime"
            label="最后更新时间"
            width="120"
            align='center'
          >
          </el-table-column>
          <el-table-column
            prop="updateUserName"
            label="更新者"
            align='center'
          >
          </el-table-column>
          <el-table-column label="修改" align='center'>
            <template slot-scope="scope">
              <div class="xgImg" @click="handleClick(scope.row,scope.$index)">
              </div>
            </template>
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
                :current-page.sync="currentPage2"
                :page-sizes="[10, 20, 30, 40]"
                layout="prev, pager, next"
                :total = totalCountNum>
              </el-pagination>
          </div>
      </div>    
    </div>
    <el-dialog v-dialogDrag title="删除" :visible.sync="delDialog" width="30%" :before-close="handleClose" >
      <div style='width:100%;text-align:center'>
            <span>确定要删除以下用户吗？</span>
            <p v-for="(item,index) in multipleSelection" :key="index">用户名称={{item.userName}}</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delDialog = false">取 消</el-button>
        <el-button type="primary" @click="delSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script >
  import TableSelect from '../tableSelect/tableSelect.vue'
  import qs from 'qs'
  export default {
    name:'系统用户管理',
    data() {
      return {

        // pageSizeModel:10,
        genealList:[],
        genealVal:'',
        editGenealValList:[],
        addGenealVal:'',
        addGenealValList:[],
        tableDataSec:{  //控制列显示
          loginname:[true,'登录名'],
          userrole:[true,'所属角色'],
          username:[true,'真实姓名'],
          title:[true,'头衔']
        },
        getDj:'',
        delDialog:false,
        currentPage2: 1,
        roleValue:'',
        // 表格数据
        tableData: [],
        rtabledata:[],
        dialogTableVisible:false,
        addBusiLine:[
          {}
        ],
        gridData:[],
        // 新建弹出框的表格数据
        addUserTable:[],
        currentRow: null,
        // 获取form内容
        form:{
          busline:'',
          loginname:'',
          usercode:'',
          username:'',
          phone:'',
          email:'',
          userstate:false
        },
        // 弹框开关控制
        dataAdd:false,
        dataAmend:false,
        // select内容
        userRole: [],
        value: '',
        //获取table中被选择的行数据
        multipleSelection: [],
        //发送给后台的删除数据数组
        remouveDataId:[],
        onlineOfflineDate:[],
        tempStorage:[],
        onlineStorage:[],
        offlineStorage:[],
        num:2,
        selectedId:[],
        editUserForm:{
          psdConfirmVal:'',
          passdVal:''
        },
        delUserId:[],
        editSelectId:[],
        select:true,
        editData:[],
        userName:[],
        addRule:{
          busline:[
            {required:true,}
            ],
          userLogin:[
            { required: true,},
            //{ min: 3, max: 5,  trigger: 'blur' }
          ],
          psd:[
            {required:true,}
            ],
          confirmPsd:[
            {required:true,}
            ],
          editusername:[
            {required:true,}
            ]
        },
        pageNum:'',
        startNum:'',
        tableDataTem:[],
        getRoleId:[],
        totalCountNum:1,
        storageTableData:[],
        storageTableDataAdd:[],
        loginnametest:'',
        radioValEdit:'',
        radioVal:'',
        headOnlineRadioVal:'',
        onlineRadioVal:'',
        offlineRadioVal:'',
        // 修改
        editSelectedRoleid:'',
        editRadioHeadOfflineRole:'',
        editOnlineRadioVal:'',
        editOfflineRadioVal:'',
        editUser:[],

        regenerator:'',

        userRoleList:[],
        selectedIdOnline:[],
        selectedIdOffline:[],
        selectedGenealList:[],
        arrRoleids:[],
      }
    },
    components:{
      TableSelect
    },
    watch:{

      dataAdd(){
       
        if(this.dataAdd === true){
         
        }else if(this.dataAdd === false){
            this.radioVal=''
            this.headOnlineRadioVal=''
            this.onlineRadioVal=''
            this.offlineRadioVal=''

        }
      },

      dataAmend(){
       
      
        if(this.dataAmend === true){
              
              if(this.editUserForm.status == '启用'){
                this.editUserForm.userstate = true
              }else if(this.editUserForm.status == '停用'){
                this.editUserForm.userstate = false
              }


              this.editUserForm.name = this.editUserForm.name
              this.editUserForm.passdVal = this.editUserForm.passdVal
              this.editUserForm.realName = this.editUserForm.realName
              this.editUserForm.title = this.editUserForm.title
              this.editUserForm.phone = this.editUserForm.phone
              this.editUserForm.email = this.editUserForm.email


        }else if(this.dataAmend === false){
          this.searchRoleUser()
          this.editSelectedRoleid = ''
          this.editRadioHeadOfflineRole = ''
          this.editOnlineRadioVal = ''
          this.editOfflineRadioVal = ''
        }

         


      },
     

    },
    methods: {   
      handleClick(row,index){
        this.arrRoleids = row.roleIds
        this.loginnametest = row.loginname
       
        this.editUserForm.lineType = row.lineType

        if(row.lineType == 0 ||  row.lineType == "线上"){
            this.num = 0
        }else if(row.lineType == 1 ||  row.lineType == "线下"){
          this.num = 1
        }else if(row.lineType == 2 ||  row.lineType == "总部"){
          this.num = 2
        }

        if(row.userstate === 1 || row.userstate === "启用"){
          row.userstate = true
        }else if(row.userstate === 0 || row.userstate === "停用"){
          row.userstate = false
        }

        // this.editUserForm.name = row.userName
        this.editUserForm.passdVal = row.password
        this.editUserForm.realName = row.realName
        this.editUserForm.title = row.title
        this.editUserForm.phone = row.phone
        this.editUserForm.email = row.email
        if(row.status == '启用'){
          this.editUserForm.userstate = true
        }else if(row.status == '停用'){
          this.editUserForm.userstate = false
        }


        this.editUserForm = row
        this.dataAmend = true
        this.editUserForm.id = row.id
        this.regenerator  = row.createUserId

        
        this.editUserForm.name = row.userName
        if(this.dataAmend == true){

          switch(row.lineType){
            case '线上':
                this.storageTableDataAdd.forEach(ele => {
                  this.arrRoleids.forEach(item => {
                    if(item === ele.id){
                        this.editOnlineRadioVal = item
                       
                        if(this.editOnlineRadioVal !== ''){
                           this.selectedIdOnline = []
                          this.selectedIdOnline.push(this.editOnlineRadioVal)
                        }
                    }
                  })
                })
              break;
            case '线下':
              this.storageTableData.forEach(ele => {
                this.arrRoleids.forEach(item => {
                  if(item === ele.id){
                    this.editOfflineRadioVal = item
                   
                    if(this.editOfflineRadioVal !== ''){
                       this.selectedIdOffline = []
                        this.selectedIdOffline.push(this.editOfflineRadioVal)
                    }
                   
                  }
                })
              })
            break;
            case '总部':
              this.genealList.forEach(ele => {
                this.arrRoleids.forEach(item => {
                  if(item === ele.id){
                    this.genealVal = item
                   
                    
                    if(this.genealVal !== ''){
                      this.selectedGenealList = []
                        this.selectedGenealList.push(this.genealVal)
                    }
                    
                    
                  }
                })
              })
              
              this.storageTableData.forEach(ele => {
                this.arrRoleids.forEach(item => {
                  if(item === ele.id){
                    this.editRadioHeadOfflineRole = item
                    if(this.editRadioHeadOfflineRole !== ''){
                          this.selectedIdOffline = []
                          this.selectedIdOffline.push(this.editRadioHeadOfflineRole)
                    }  
                  }
                })
              })
             
              this.storageTableDataAdd.forEach(ele => {
                this.arrRoleids.forEach(item => {
                  if(item === ele.id){
                    this.editSelectedRoleid = item
                    if(this.editSelectedRoleid !== ''){
                        this.selectedIdOnline = []
                        this.selectedIdOnline.push(this.editSelectedRoleid)
                    }
                  }
                })
              })
              

          }
             
        }

      },
 
      handleSizeChange(val) {
      
 
        this.pageNum = parseInt(val.target.value) 
        this.searchRoleUser()
      
      },
      handleCurrentChange(val) {
      
        this.startNum = val
        this.searchRoleUser()
       
      },
      handleSelectionChange(val) {

        this.remouveDataId = [];
        for(let i = 0;i<this.multipleSelection.length;i++){
          this.remouveDataId.push(this.multipleSelection[i].roleid);
        }
     
      },
      headquarterOnlineChange(node){

          this.selectedIdOnline = []
          this.userName = []

          this.selectedIdOnline.push(node.row.id)
          this.userName.push(node.row.name)
          
      },
      AddhandleSelectChangeGeneal(node){
       
        this.addGenealValList = []
        this.addGenealValList.push(node.row.id)
      },
      headquarterOfflineChange(node){
       
        this.selectedIdOffline = []
        this.userName = []

        this.selectedIdOffline.push(node.row.id)
        this.userName.push(node.row.name)
      
      },
      onlineSelectChange(node){
          this.selectedIdOnline = []
          this.userName = []
          this.selectedIdOnline.push(node.row.id)
          this.userName.push(node.row.name)       
      },
      offlineSelectChange(node){
          this.userName = []
          this.selectedIdOffline = []
          this.selectedIdOffline.push(node.row.id)
          this.userName.push(node.row.name)

      },
      handleSelectChange(node){

        this.selectedId = []
        this.userName = []
        this.selectedId.push(node.row.roleid)
        this.userName.push(node.row.rolename)
      
      },
      handleSelectChangeGeneal(node){
       
        this.selectedGenealList = []
        this.selectedGenealList.push(node.row.id)
       
      },
      handleSelectChangeEdit(editData){

        this.selectedIdOnline = []
        this.selectedIdOnline.push(editData.row.id)
       

      },
      editHandleChangeSelect(node){
       
          this.selectedIdOffline = []
          this.selectedIdOffline.push(node.row.id)

      },
      editOnlineRadioChange(node){
        
         this.editUser = []
         this.selectedIdOnline = []
         this.selectedIdOnline.push(node.row.id)
         

      },
      editOfflineRadioChange(node){
         
          this.editUser = []
          this.selectedIdOffline = []
          this.selectedIdOffline.push(node.row.id)
         

      },
      handleClose(){},
      selectDelUser(val){
        this.multipleSelection = val;
     
        this.delUserId = []
        this.multipleSelection = val
        val.forEach(ele => {
          this.delUserId.push(ele.id)
        });
       
      },

      /*打印数据*/
      downloadData(){
        
        if(this.startNum == '' || this.startNum == undefined){
          this.startNum = this.currentPage2
        }
        if(this.pageNum == ""){
          this.pageNum = 10
        }
        let startNum = this.startNum
        if(this.tableData.length !== 0){
           let obj = {}
              obj.type = 'XT_YH'
               obj.pageNum = this.startNum
              obj.pageSize = this.pageNum,
              obj.username = this.getDj
              obj.roleId = this.roleValue.toString()
            localStorage.setItem('OBJ',JSON.stringify(obj))
            window.open(window.location.href.split('#')[0]+'#/downloadpage0')
        }
      },
      searchRoleUser(){
          if(this.startNum == '' || this.startNum == undefined){
            this.startNum = this.currentPage2
          }
          if(this.pageNum == ""){
            this.pageNum = 10
          }
          this.$axios.post('/SysUserManageController/query',qs.stringify({
            'sessionId':localStorage.getItem('SID'),
            'username':this.getDj,
            'roleId':this.roleValue,
            'pageSize':this.pageNum,
            'pageNum':this.startNum
          }))
          .then(res => {

            if(res.data.status === 1){
                this.tableData = []
                this.tableData = this.tableData.concat(res.data.data.list)
                for(var i=0;i<this.tableData.length;i++){
                  if(this.tableData[i].lineType === 0){
                    this.tableData[i].lineType = "线上"
                  }else if(this.tableData[i].lineType === 1){
                    this.tableData[i].lineType = "线下"
                  }else if(this.tableData[i].lineType === 2){
                    this.tableData[i].lineType = "总部"
                  }

                  if(this.tableData[i].status === 0){
                    this.tableData[i].status = "未启用"

                  }else if(this.tableData[i].status === 1){
                      this.tableData[i].status = "启用"
                  }
              }
              this.totalCountNum = res.data.data.pageCount

            }else if(res.data.status !== 1){
                this.$alert('查不到此用户,请确认查询信息正确', '查询用户', {
                  confirmButtonText: '确定',
                  type:'warning',
                  callback: action => {

                  }
                })
            }
          })

      },
 

      refersh(){
        if(this.tableData.length !== 0){
          this.searchRoleUser()
        }

      },
      
      selectChange(val){
     
        if(val == 0){
          this.num = 0
        
           
        }else if(val == 1){
          this.num = 1
      
        }else if(val == 2){
          this.num = 2
        
        }
      },
      centerAddUser(){
        this.dataAdd = false
        this.form = {}
        this.addGenealVal = ''
        this.offlineRadioVal = ''
        this.headOnlineRadioVal = ''
        this.onlineRadioVal = ''
        this.radioVal = ''
        document.querySelector("#busline").style.border = "1px solid #dcdfe6"
        document.querySelector("#userLogin").style.border = "1px solid #dcdfe6"
        document.querySelector("#psd").style.border = "1px solid #dcdfe6"
        document.querySelector("#confirmPsd").style.border = "1px solid #dcdfe6"

        document.getElementById("formUsername").style.border = "1px solid #dcdfe6"
        document.getElementById("formTitle").style.border = "1px solid #dcdfe6"
        document.getElementById("formPhone").style.border = "1px solid #dcdfe6"
        document.getElementById("formEmail").style.border = "1px solid #dcdfe6"


      },
      // 新增
      addUserSubmit(){
          
         
          if(this.form.busline === ''){
          
            document.querySelector("#busline").style.border = "1px solid #f56c6c"
            document.querySelector("#busline").style.borderRadius = "14px"
            return

          }else if(this.form.busline !== ''){
            
              document.querySelector("#busline").style.border = "1px solid #dcdfe6"
          }
          if(this.form.loginname === ''){

            document.querySelector("#userLogin").style.border = "1px solid #f56c6c"
            return
          }else if(this.form.loginname !== ''){
            document.querySelector("#userLogin").style.border = "1px solid #dcdfe6"
          }
          if(this.form.usercode === ''){
            
            document.querySelector("#psd").style.border = "1px solid #f56c6c"
            return
          }else if(this.form.usercode !== ''){
            document.querySelector("#psd").style.border = "1px solid #dcdfe6"
          }

          if(document.querySelector("#confirmPsd").value === ''){
            
            document.querySelector("#confirmPsd").style.border = "1px solid #f56c6c"
            return
          }else if(document.querySelector("#confirmPsd").value !== ''){
            
            if(this.form.addUserConfirmPsd !== this.form.usercode){
            
              document.querySelector("#confirmPsd").style.border = "1px solid #f56c6c"
              return
            }else if(this.form.addUserConfirmPsd === this.form.usercode){
              document.querySelector("#confirmPsd").style.border = "1px solid #dcdfe6"
            }
          }
              let arr = []
              arr = this.selectedIdOffline.concat(this.selectedIdOnline).concat(this.addGenealValList)
            if(arr.length == 0){
              this.$alert('新增用户出错,角色信息为空', '出错提示', {
                confirmButtonText: '确定',
                type:'warning',
              });
              return
            }

            if(this.form.userstate === true){
              this.form.userstate = 1
            }else if(this.form.userstate === false || this.form.userstate === ''){
              this.form.userstate = 0
            }

              
            this.$axios.post("/SysUserManageController/editUser",qs.stringify({
              'sessionId':localStorage.getItem('SID'),
              'id':0,
              'lineType':this.form.busline,
              'userName':this.form.loginname,
              'password':this.form.usercode,
              'realName':this.form.username,
              'title':this.form.title,
              'phone':this.form.phone,
              'email':this.form.email,
              'status':this.form.userstate,
              'updateUserId':localStorage.getItem('USERID'),
              'roleIds':arr,
              'createUserId':localStorage.getItem('USERID'),
            }))
              .then( res => {
                
                if(res.data.status == 1){
                  this.$alert('新建用户成功', '新建用户', {
                    confirmButtonText: '确定',
                    type:'success',
                    callback: action => {
                      
                    }
                  })
                      this.dataAdd = false
                      this.form = {}
                      this.searchRoleUser()
                      this.addGenealVal = ''
                      this.offlineRadioVal = ''
                      this.headOnlineRadioVal = ''
                      this.onlineRadioVal = ''
                      this.radioVal = ''
                      this.selectedIdOffline = []
                      this.selectedIdOnline = []
                      this.addGenealValList = []

                      
                }else if(res.data.status !== 1){
                  this.$alert(res.data.message, '新建用户', {
                    confirmButtonText: '确定',
                    callback: action => {

                    }
                  })
                }
              })
              .catch( error => {
                console.log(error)
              })


      },
  
      dataAmendClose(){
        this.dataAmend = false
        document.querySelector("#passdVal").style.border = "1px solid #dcdfe6"
        document.querySelector("#psdConfirmVal").style.border = "1px solid #dcdfe6"

        document.getElementById("editUserFormUsername").style.border = "1px solid #dcdfe6"
        document.getElementById("editUserFormTitle").style.border = "1px solid #dcdfe6"
        document.getElementById("editUserFormPhone").style.border = "1px solid #dcdfe6"
        document.getElementById("editUserFormeEmail").style.border = "1px solid #dcdfe6"
      

      },
      // 编辑
      editUserSubmit(){
            let arr = []
            arr = this.selectedIdOnline.concat(this.selectedIdOffline).concat(this.selectedGenealList)
                    
            if(this.editUserForm.userstate === true){
              this.editUserForm.userstate = 1
            }else if(this.editUserForm.userstate === false){
              this.editUserForm.userstate = 0
            }
           

            if(document.querySelector("#xgBusline").value === ''){
                document.querySelector("#xgBusline").style.border = "1px solid #f56c6c"
              
                return
            }else{
            
              if(document.querySelector("#xgLoginname").value === ''){
                  document.querySelector("#xgLoginname").style.border = "1px solid #f56c6c"
                 
                  return
              }else{ 
                document.querySelector("#xgLoginname").style.border = "1px solid #dcdfe6"
              }
            }

            this.editUserForm.usercode = document.querySelector("#passdVal").value
            if(this.editUserForm.passdVal === ''){
              document.querySelector("#passdVal").style.border = "1px solid #f56c6c"
              return
            }else if(this.editUserForm.passdVal !== ''){
              document.querySelector("#passdVal").style.border = "1px solid #dcdfe6"
            }
            if(this.editUserForm.passdVal !== this.editUserForm.psdConfirmVal){
            
              document.querySelector("#psdConfirmVal").style.border = "1px solid #f56c6c"
              return
            }else if(this.editUserForm.passdVal === this.editUserForm.psdConfirmVal){
              document.querySelector("#psdConfirmVal").style.border = "1px solid #dcdfe6"
            }
          
           
          this.$axios.post('/SysUserManageController/editUser',qs.stringify({
            'id':this.editUserForm.id,
            'lineType':this.editUserForm.lineType,
            'userName':this.editUserForm.name,
            'password':this.editUserForm.passdVal,
            'realName':this.editUserForm.realName,
            'title':this.editUserForm.title,
            'phone':this.editUserForm.phone,
            'email':this.editUserForm.email,
            'status':this.editUserForm.userstate,
            'createUserId':this.regenerator,
            'updateUserId':localStorage.getItem('USERID'),
            'roleIds':arr
          }))
          .then(res => {
          
            if(res.data.status === 1){
              this.$alert('修改'+res.data.message,'提示',{
                confirmButtonText:'确定',
                type:'success',
                callback:action=>{
                  this.dataAmend = false
                  this.searchRoleUser()
                }
              })
            }else if(res.data.status !== 1){
              this.$alert(res.data.message,'提示',{
                confirmButtonText:'确定',
                type:'warning',
                callback:action=>{
                  
                }
              })
            }
          })


      },
     
      delUserSubmit(){
       
        if(this.delUserId.length === 0){
          this.$alert('请选择您要删除的用户', '出错提示', {
            confirmButtonText: '确定',
            type:'warning',
            callback: action => {

            }
          })
          return
        }
        this.delDialog = true

      },
      // 删除用户
      delSubmit(){
        var params = new URLSearchParams()
            params.append('ids',this.delUserId)
   
        this.$axios.post('/SysUserManageController/delete',params)
        .then(res => {
         
          if(res.data.status === 1){
            this.$alert('删除成功','提示',{
              confirmButtonText:'确定',
              type:'success',
              callback:actions=>{
                
              }
            })
            this.delDialog = false
            this.searchRoleUser()
          }else if(res.data.status === 0){
            this.$alert(res.data.message,'提示',{
              confirmButtonText:'确定',
              type:'warning',
              callback:action=>{

              }
            })
          }
          
        })
      },
      // 获取权限列表
      getRolePowerList(){
        this.$axios.post('/SysUserManageController/getAllRoles',qs.stringify({
          "sessionId":localStorage.getItem('SID'),
          'userId':localStorage.getItem('USERID')
        }))
        .then(res => {
         
          this.storageTableDataAdd = []   
          this.storageTableData = []  
          this.genealList = []
          res.data.data.forEach(ele => {
            if(ele.lineType == 0){
                ele.lineType = '线上'
                
                this.storageTableDataAdd.push(ele)
            }else if(ele.lineType == 1){
              ele.lineType = '线下'
             
              this.storageTableData.push(ele)
               
            }else if(ele.lineType == 2){
              ele.lineType = '总部'
              
              this.genealList.push(ele)
            }
          })
         
         
          
          
        })
      },
  
      initPage(){
              if(this.startNum == '' || this.startNum == undefined){
                this.startNum = this.currentPage2
              }
              if(this.pageNum == ""){
                this.pageNum = 10
              }



          this.$axios.post('/SysUserManageController/queryListByLoginAndRoleSumPage',qs.stringify({
            "sessionId":localStorage.getItem('SID'),
            "loginname":this.getDj,
            "userrole":this.roleValue.toString(),
            "startNum": parseInt(this.startNum) ,
            "pageNum": parseInt(this.pageNum)
          }))
            .then( res => {
          
            this.totalCountNum = res.data

        })
        .catch(error => {
            console.log(error)
        })
      },
      
      getAllRoleList(){
            /*所属角色列表*/
              this.$axios.get('/SysUserManageController/getAllRoles?sessionId=' + localStorage.getItem('SID'))
              .then( res => {
                  
                  let arr = []
                      arr.push({id:null,name:'全部'})

                  this.userRoleList = arr.concat(res.data.data)
                  
                
              })
              .catch( error => {
                console.log(error)
              })
      },
      dataAddClick(){
        this.dataAdd = true
         this.getRolePowerList()
      },
      // 手机号失焦验证
      phoneTextCheck(){
        var phoneReg =  /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
        if(!phoneReg.test(this.form.phone)){

        }
      },
     
    },
    beforeMount(){


    },

    updated(){
       

    },
    mounted(){
        this.getRolePowerList()
    },  
  }
</script>
<style scoped>


  .dialog-footer{background-color: #F1F2F5;border: none}
  .dialogLeft {
    float: left;
    border-right: 1px solid #ccc;
    /* padding-right: 19px;
    margin-right: 36px; */
    padding: 0 15px;
    width: 40%;
  }
  .dialogRight {
    float: left;
    width: 52%;
    max-height: 400px;
    overflow-y: scroll;
    padding-left: 15px;
  }

  .addIpt{
    width: 187px;
    height: 26px;
    border-radius: 37px;
  }
  .clear:after {
    clear: both;
    content: ".";
    display: block;
    width: 0;
    height: 0;
    visibility: hidden;
  }
  .dataContent {
    width: 100%;
    background-color: #fff;
    font-size: 13px;
  }
  .ipt {
    width: 200px;
    height: 39px;
    margin-right: 40px;
    margin-left: 10px;
    border-radius: 37px;
  }
  .contentTop {
    padding: 30px;
    padding-left: 80px;
    border-bottom: 1px solid #e0e0e0;
    border-top:1px solid #e0e0e0;
  }
  .contentBotoom {
    height: 60px;
    background-color: #fff;
    font-size: 13px;
    padding-top: 25px;
    margin-left: 47px;
  }
  .BotoomBtn {
    width: 44px;
    height: 30px;
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
    background-color: #fff;border-right: 10px solid #ffffff;padding-left: 10px;
  }
  .leftButton {
    float: left;
    margin-left: 80px;
  }
  .addIcon {
    background: url(../../images/icon.png) no-repeat 6px -9px;
    width: 44px;
    height: 30px;
    margin: 0 auto;
    margin-top: 5px;
  }
  .addIcon:hover {
    background: url(../../images/icon.png) no-repeat 6px -32px;
    width: 44px;
    height: 30px;
    margin: 0 auto;
    margin-top: 5px;
  }
  .amendIcon {
    background: url(../../images/icon.png) no-repeat -27px -9px;
    width: 44px;
    height: 30px;
    margin: 0 auto;
    margin-top: 5px;
  }
  .amendIcon:hover {
    background: url(../../images/icon.png) no-repeat -27px -32px;
    width: 44px;
    height: 30px;
    margin: 0 auto;
    margin-top: 5px;
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
    margin-top: 5px;
  }
  .removIcon:hover {
    background: url(../../images/icon.png) no-repeat -62px -32px;
    width: 44px;
    height: 30px;
    margin: 0 auto;
    margin-top: 5px;
  }
  .refreshIcon {
    background: url(../../images/icon.png) no-repeat -93px -9px;
    width: 44px;
    height: 30px;
    margin: 0 auto;
    margin-top: 5px;
  }
  .refreshIcon:hover {
    background: url(../../images/icon.png) no-repeat -93px -32px;
    width: 44px;
    height: 30px;
    margin: 0 auto;
    margin-top: 5px;
  }
  .downloadIcon {
    background: url(../../images/icon.png) no-repeat -127px -8px;
    width: 44px;
    height: 30px;
    margin: 0 auto;
    margin-top: 5px;
  }
  .downloadIcon:hover {
    background: url(../../images/icon.png) no-repeat -127px -32px;
    width: 44px;
    height: 30px;
    margin: 0 auto;
    margin-top: 5px;
  }
  .active {
    background-color: #38e139;
  }
  .serchImg {
    width: 120px;
    height: 36px;
    border-radius: 100px;
    background-color: #3faaf9;
    display: -webkit-inline-box;
    position: relative;
    cursor: pointer;
    margin-left: 48px;
  }
  .serchImg img {
    width: 37px;
    position: absolute;
    left: 40px;
  }
  .serBtn {
    float: left;
  }
  .block {
    margin-top: 25px;
    margin-left: 25px;
  }
  .el-table th > .cell {
    color: #353535;
    font-weight: 400;
  }
  .block{
    float: right;
    margin-right: 20px;
  }
  .elIconP{
    position: relative;
  }
  .elIconPosction{
    position: absolute;
    font-size: 10px;
  }
  .el-icon-caret-top{
    top: 45px;
    right: 5px;
    font-size: 17px;
  }
  .el-icon-caret-bottom{
    top: 57px;
    right: 5px;
    font-size: 17px;
  }
  input{
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: none;
    padding-left: 15px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
  }
  input:focus{
    border: 1px solid #3FAAF9;
  }
  .disabled{
    background-color: #f5f7fa;
    border-color: #e4e7ed;
    color: #c0c4cc;
    cursor: not-allowed;
  }
 #addIconTitle,#removeIconTitle,#refreshIconTitle,#downloadIconTitle{position: relative}
#addIconTitle:hover::after,#removeIconTitle:hover::after,#refreshIconTitle:hover::after,#downloadIconTitle:hover::after{
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


</style>
