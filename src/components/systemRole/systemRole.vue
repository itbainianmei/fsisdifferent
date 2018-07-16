// 系统角色管理
<template>
  <div class="dataContent">
    <div class="contentTop clear">
      <div class="serBtn">角色名:
        <el-input clearable placeholder="请输入内容" class="ipt"  v-model="userVal" @keyup.enter="search"></el-input>
      </div>
      <div class="serchImg serBtn" @click="search" >
        <img src="../../images/fdj.png" alt="" >   
      </div>
    </div>
    <div class="contentBotoom">
      <div class="button">
        <div class="leftButton clear">
          <!--添加table新数据-->
          <div class="BotoomBtn leftRadius" data-title='添加' id='addIconTitle'>
            <div class="addIcon" @click="dataAddClcik"></div>
          </div>
          <!--删除table的数据-->
          <div class="BotoomBtn" @click="roleDelBtn" data-title='删除' id='removeIconTitle'>
            <div class="removIcon" ></div>
          </div>
          <!--刷新table的数据-->
          <div class="BotoomBtn" @click="refreshTable" data-title='刷新' id='refreshIconTitle'>
            <div class="refreshIcon"></div>
          </div>
          <!--下载打印table的数据-->
          <div class="BotoomBtn rightRadius" @click="downloadData" data-title='打印' id='downloadIconTitle'>
            <div class="downloadIcon"></div>
          </div>
        </div>
      </div>
    </div>
     
    <div class='addDialog' v-show='dataAdd' >
        <div class='addDialogDiv' style='z-index:111'>
          <p class='addDialogDivTitle'>新建角色</p>
          <div class="dialogLeft" style='margin-top:15px;'>
            <div>基本信息</div>
            <el-form ref="roleFormAdd" :model="roleFormAdd" label-width="100px" size="mini" :rules="roleFormRule">
              <el-form-item label="角色名称:" prop="roleUser">
                <el-input clearable class="addIpt" v-model="roleFormAdd.roleUser" id="roleUser"  style='width:100%'></el-input>
              </el-form-item>
              <el-form-item label="业务线:" prop="circuitLine">
                
                <el-select  v-model="roleFormAdd.circuitLine" placeholder="请选择" @change="selectChange($event)" id='busiline' style='width:100%'>
                  <el-option v-for="item in selectDataBusiline" :key='item.value' :label="item.label" :value="item.value"></el-option>
                  
                </el-select>
              </el-form-item>
              <el-form-item label="所属机构:" prop="organization"  >
                <el-input v-model='addInpVal' disabled="disabled" v-show='showAddInpVal'></el-input>
                <el-select-tree  
                v-show='showAddSelectVal'
                v-model="roleFormAdd.organization" 
                placeholder="请选择"   
                id="organization" 
                :treeData="selectTreeListArr"  
              
                :propNames="defaultPropSelect"
                 @change="handleNodeClickOnline"
                 clearable
                
                >
                </el-select-tree>
              </el-form-item>


              <el-form-item label="状态:">
                <el-checkbox-group v-model="roleFormAdd.state">
                  <el-checkbox label="是否启用" name="type"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="角色描述:">
                <el-input clearable type="textarea" :rows="3" v-model="roleFormAdd.roleDesc" class="textareaIpt textarea"  style='width:100%'></el-input>
              </el-form-item>
            </el-form>
          </div>

          
              <div class="dialogcenter" style='margin-top:15px;'>
               
              <div>经办权限</div>
              
                <el-tree
                  :data="handlePower"
                  show-checkbox
                  
                  node-key="id"
                
                  highlight-current
                  :props="defaultProps"
                  @check-change = 'handleCheckChange'
                  @node-click="handleNodeClick"
                  :default-expand-all = 'true'
                  ref='addHandleTree'
                  
                  >
                </el-tree>
                
              </div>
          
          
          <div slot="footer" class="dialog-footer" style='text-align:center;padding:15px 0;'>
            <el-button @click="dataAddClose" style='margin-top:15px'>取 消</el-button>
            <el-button type="primary" style='margin-top:15px'  @click="roleAddSubmit">确 定</el-button>
          </div>
        </div>
        
    </div>

    <div class='editDialog' v-show='dataAmend'>
      <div class='editDialogDiv'>
        <p class='addDialogDivTitle'>修改角色</p>
          <div class="dialogLeft" style='margin-top:15px;'>
            <el-form ref="roleFormEdit" :model="roleFormEdit" label-width="100px" size="mini" :rules="roleFormRuleEdit">
              <el-form-item label="角色名称:" prop='rolename'>
                <el-input clearable class="addIpt" v-model="roleFormEdit.rolename"></el-input>
              </el-form-item>
              <el-form-item label="业务线:" prop='busiline'>
                <el-select v-model="roleFormEdit.busiline" placeholder="请选择" id='busilineVal' @change='changeBusilineEdit'>
                  <el-option v-for="item in selectDataBusiline" :key='item.value' :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="所属机构:" prop='themech'>
                <el-input v-model='addInpVal' disabled="disabled" v-show='editInpShow'></el-input>
                <el-select-tree
                  v-show='editSelectShow'
                  v-model="roleFormEdit.themech" 
                  placeholder="请选择"   
                  :treeData="offlineTreeDataEdit" 
                  :propNames="defaultPropSelect"
                  @change="handleNodeClickOffline"
                  clearable
                  id='themechTextId'
                >
                </el-select-tree>
              </el-form-item>
              <el-form-item label="状态:">
                <el-checkbox-group v-model="roleFormEdit.rolestat">
                  <el-checkbox label="是否启用" name="type"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="角色描述">
                <el-input clearable type="textarea" v-model="roleFormEdit.roledesc" class="textareaIpt textarea"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="dialogcenter" style='margin-top:15px;'>
            <div>经办权限</div>

            <el-tree
              :data="handlePower"
              show-checkbox
              node-key="id"
              ref="handlePowerTree"
              highlight-current
              :props="defaultProps"
              @check-change = 'editHandleCheckChange'
               :default-expand-all = 'true'
                :default-checked-keys = arrListSelect
              >
            </el-tree>
          
          </div>
          <div slot="footer" class="dialog-footer" style='text-align:center;padding:15px 0;'>
            <el-button @click="dataAmend = false" style='margin-top:15px;'>取 消</el-button>
            <el-button type="primary" @click="edit_role_submit" style='margin-top:15px;'>确 定</el-button>
          </div>
      </div>
    </div>
     
    <div class="contentData">
      <div class="dataTable clear">
         <el-table
          :data="roleTableData"
          border
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55"
            align='center'
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="角色名"
             sortable
             width="100"
             align='center'
          >
          </el-table-column>
         
          <el-table-column
            prop="lineType"
            label="业务线"
            align='center'
          >
          </el-table-column>
          <el-table-column
            prop="description"
            label="角色描述"
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
                  :total = pageCount>
                </el-pagination>
            </div>
        </div>     

    </div>
    <el-dialog
      v-dialogDrag
      title="删除"
      :visible.sync="RoleDelDialog"
      width="30%"
      :before-close="handleClose">
      <div style='width:100%;text-align:center'>
          <span>确定要删除以下角色吗？</span>
          <p v-for="(item,index) in multipleSelection" :key="index">角色名称={{item.name}}</p>
      </div>
     
      <span slot="footer" class="dialog-footer">
    <el-button @click="RoleDelDialog = false">取 消</el-button>
    <el-button type="primary" @click="delSubmitRole">确 定</el-button>
  </span>
    </el-dialog>

    <el-dialog >

    </el-dialog>
  </div>
</template>
<script >
import qs from 'qs'
import axios from 'axios'

import leftSideVue from '../leftSide/leftSide.vue';
import treeter from './treeter'
import selectTree from '../selectTree/selectTree.vue'


  export default {
    name:'系统角色管理',
    data() {
      return {
        addInpVal:'易宝支付有限公司',
        editInpShow:false,
        editSelectShow:true,
        showAddInpVal:false,
        showAddSelectVal:true,
        arrListSelect:[],
        addDialogEvent:false,
        showHideDataTable:false,
        selectTreeListArr:[],
        userVal:'',

        selectDataBusiline:[
          {value:'2',label:'总部'},
          {value:'0',label:'线上'},
          {value:'1',label:'线下'},
         
        ],
        RoleDelDialog:false,
        currentPage2: 1,

        // 表格数据
        roleTableData: [],
        handleData:[],
        roleAddOrganizationData:[],
        onOffState:'',
        roleAddFormData:[],
        data2:[],
        data2Data:[],
        offlineData:[],
        offlineData2Data:[],
        showRoleList:true,
        selectData:[],
        offlineSelectData:[],
        arr:[],
        arrRole:[],
        addRoleConserve:{
          rolename:'',
          themech:'',
          busiline:'',
          roledesc:'',
          handauth:'',
          // grantauth:'',
          rolestat:''
        },

        defaultProps: {
          children: 'list',
          label: 'name'
        },
        props1: {
          label: 'authname',
          children: 'zones',
          isLeaf: 'leaf'
        },
       

        nodeDataHandle:[],

        props: {
          label: 'name',
          children: 'zones'
        },
        dataMenu:{},


        //新建 弹框‘授予权限’的树状结构数据
        xjsyqx: {
          label: 'name',
          children: ''
        },
        count: 1,
        //修改 弹框‘经办权限’的树状结构数据
        xgjbqx: {
          label: 'name',
          children: 'zones'
        },
        //修改 弹框‘授予权限’的树状结构数据
        xgsyqx: {
          label: 'name',
          children: 'zones'
        },
        count: 1,

        currentRow: null,
        roleFormAdd:{
          roleUser: '',
          circuitLine:'',
          organization:'',
          state:false,
          roleDesc:''
        },
        roleFormEdit:{

        },
        roleFormRule:{
          roleUser:[
            { required:true,message:'请输入角色名称',trigger:'blur'},
            {min:3,max:15,message:'最多输入15位字符',trigger:'blur'}
          ],
          circuitLine:[
            { required:true,message:'请选择',trigger:'change'}
          ],
          organization:[
            { required:true,message:'请选择',trigger:'change'}
          ]
        },
        roleFormRuleEdit:{
           rolename:[
            { required:true,message:'请输入角色名称',trigger:'blur'},
            {min:3,max:15,message:'最多输入15位字符',trigger:'blur'}
          ],
          busiline:[
            { required:true,message:'请选择',trigger:'change'}
          ],
          themech:[
            { required:true,message:'请选择',trigger:'change'}
          ]
        },


        // 弹框开关控制
        dataAdd:false,
        dataAmend:false,


        //获取table中被选择的行数据
        multipleSelection: [],
        //发送给后台的删除数据数组
        remouveDataId:[],
        editRoleTableData:[],
        numNow:'',
        nowNumData:'',
        rtabledata:[],
        totalCountNum:0,
        handlePower:[],
        grantPower:[],
        handleDataGrant:[],
        setCheck:[],
        setCheckGrantAuth:[],
        defaultPropSelect:{
          children: 'list',
          label: 'mechname',
          id: "mechid",
        },
        selectDatatree:[],
        selectDatatreeOnline:[],
        data2:[],
        offlineDataTree:[],
        editArr:[],
        editArrRole:[],
        offlineTreeDataEdit:[],
        busiLineList:[],
        pageCount:0,
        data:[],
        offlineListShow:[],
      
      }
    },
     mixins: [treeter],
    components: {
      
      'el-select-tree': selectTree
    },
    watch:{
      
      dataAdd(){
       
        if(this.dataAdd == false){
            this.$refs.addHandleTree.setCheckedKeys([])
            
        }
       
      },
      dataAmend(){
        
        if(this.dataAmend === true){
          
             this.setCheck = []
      
            // 经办权限
            // console.log(this.editRoleTableData.handauth)
          
          
              this.arrListSelect = this.editRoleTableData.handauth
               
              this.editRoleTableData.handauth.forEach(ele => {
               
               this.setCheck.push({id:ele})
                
              }) 
            

                 this.$refs.handlePowerTree.setCheckedNodes(this.setCheck)
  
        }else if(this.dataAmend === false){
            // this.search()
        }
        
      }
    },
    updated(){
       
    },
    methods: {
      dataAddClcik(){
        this.dataAdd = true
        
      },
      handleClose(){},
      getBusiLineList(){
        this.$axios.post('/SysConfigController/queryEnum',qs.stringify({
          'sessionId':localStorage.getItem('SID'),
          'type':87
        }))
        .then(res => {
          // console.log(res.data)
          this.busiLineList = []
          this.busiLineList = this.busiLineList.concat(res.data)

        })
      },
      
      handleNodeClickOnline(id){
        console.log(id)
         this.roleFormAdd.organization = parseInt(id)
        
      },
      handleNodeClickOffline(id){
        //console.log(id)
        this.roleFormEdit.themech = parseInt(id)
      },
      changeBusilineEdit(val){
        console.log( val)
        
        if(val == parseInt(0)){
          this.offlineTreeDataEdit = []
          this.offlineTreeDataEdit = this.offlineTreeDataEdit.concat(this.selectDatatreeOnline) 
          console.log( this.offlineTreeDataEdit)
          this.editInpShow = false
            this.editSelectShow = true
        }else if(val == parseInt(1)){
            this.offlineTreeDataEdit = []
           this.offlineTreeDataEdit = this.offlineTreeDataEdit.concat(this.offlineDataTree) 
           console.log( this.offlineTreeDataEdit)
           this.editInpShow = false
            this.editSelectShow = true
        }else if(val == parseInt(2)){
            this.editInpShow = true
            this.editSelectShow = false
            this.roleFormEdit.themech = parseInt(1)
        }
      },
     
      clickTreeVal(val){
        console.log(val)
      },

      selectChange(event){
        console.log(event)
          //this.onOffState = event
          if(event == 0){
            this.showRoleList = true
            this.showAddInpVal = false
            this.showAddSelectVal = true
            this.selectTreeListArr = []
            this.selectTreeListArr = this.selectTreeListArr.concat(this.selectDatatreeOnline)
            
          }else if(event == 1){
            this.showAddInpVal = false
            this.showAddSelectVal = true
              this.showRoleList = false
              this.selectTreeListArr = []
              this.selectTreeListArr = this.selectTreeListArr.concat(this.offlineDataTree)
          }else if(event == 2){
            this.showAddInpVal = true
            this.showAddSelectVal = false
            this.roleFormAdd.organization = parseInt(1)
            this.roleFormAdd.lineType = parseInt(2)
          }
      

      },
   
     

      handleCheckChange(data, checked, indeterminate) {

        //console.log(data, checked, indeterminate);
        
        if(checked === true){
          //console.log(data.authcode)


          this.arr.push(data.id)

        }else if(checked === false){
          this.arr.splice(data.id,1)
        }
        console.log(this.arr)
        // console.log(data.authcode)

      },
      handleChangeRole(data,checked,indeterminate){
        //console.log(data,checked,indeterminate)

        if(checked === true){
          this.arrRole.push(data.id)
        }else if(checked === false){
          this.arrRole.splice(data.id,1)
        }
        // console.log(this.arrRole)
      },
      // 编辑经办权限
      editHandleCheckChange(data,checked){
         
          if(checked == true){
            this.editArr.push(data.id)
          }else if(checked == false){
            this.editArr.forEach((ele,index) => {
              if(ele == data.id){
                this.editArr.splice(index,1)
              }
            })

          }
         
      },
     
      handleNodeClick(data) {
        //console.log(data);
      },
     
      loadNode(node, resolve) {

        //console.log(node.data.authcode)
        //console.log(this.handleData)

        //console.log(node.level)

        this.$axios.post("/AuthController/queryAuthByUpCode",qs.stringify({
         "sessionId":localStorage.getItem('SID'),
         "upcode":node.data.authcode
         }))
         .then( res => {
            //console.log(res.data)

           this.nodeDataHandle = res.data

         })
         .catch( error => {
            console.log(error)
         })


        if (node.level === 0) {
          return resolve(this.handleData);
        }
        if (node.level > 5) return resolve([]);

        setTimeout(() => {
         // console.log(this.nodeDataHandle)
          const data = this.nodeDataHandle
          resolve(data)
          this.nodeDataHandle=[]
        }, 500);
      },

      setCurrent(row) {
        this.$refs.singleTable.setCurrentRow(row);
      },
      handleCurrentChange(val) {
        //console.log(val)
        this.currentRow = val;
        this.numNow = val
        this.search()
      },
      onSubmit() {
        console.log('submit!');
      },
      handleClick(row,index){

      
        this.dataAmend = true
        this.editRoleTableData = row

        this.roleFormEdit = row


        this.roleFormEdit.rolename = row.name
         this.roleFormEdit.roledesc = row.description
         this.roleFormEdit.id = row.id
       
        
        if(row.status === "启用"){
          this.roleFormEdit.rolestat = true
        }else if(row.status === "未启用"){
          this.roleFormEdit.rolestat = false
        }
        this.roleFormEdit.busiline = row.lineType
      
        this.editRoleTableData.handauth = row.urlIds

        // this.editArr = row.urlIds

        this.roleFormEdit.themech = row.mechId

       
        if(row.lineType == '线上'){
            this.offlineTreeDataEdit = this.selectDatatreeOnline
        }else if(row.lineType == '线下'){
            this.offlineTreeDataEdit = this.offlineDataTree
        }else if(row.lineType == '总部'){
            this.editInpShow = true
            this.editSelectShow = false
        }     

        
      },
      handleSizeChange(val) {
        this.nowNumData = val.target.value
        // console.log(this.nowNumData)
        this.search()
   
      },

      handleSelectionChange(val) {

      
        this.multipleSelection = val;
        
        this.remouveDataId = [];
        for(let i = 0;i<this.multipleSelection.length;i++){
          this.remouveDataId.push(this.multipleSelection[i].id);
        }
      
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      formatter(row, column) {
        return row.address;
      },
      filterTag(value, row) {
        return row.tag === value;
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },

      downloadData(){
         if(this.numNow === ''){
          this.numNow = this.currentPage2
        }
        if(this.nowNumData === ''){
          this.nowNumData = 10
        }
       
        let obj = {}
            obj.type = 'XT_JS'
            obj.name = this.userVal
            obj.pageNum = parseInt(this.numNow)
            obj.pageSize = parseInt(this.nowNumData)

        localStorage.setItem('OBJ', JSON.stringify(obj))
        
        window.open(window.location.href.split('#')[0]+'/#/downloadpage0')
        
        
      },
      search(){
        if(this.numNow === ''){
          this.numNow = this.currentPage2
        }
        if(this.nowNumData === ''){
          this.nowNumData = 10
        }
        this.$axios.post('/SysRoleManageController/query',qs.stringify({
          'sessionId':localStorage.getItem('SID'),
          'name':this.userVal,
          'pageNum': parseInt(this.numNow),
          'pageSize':parseInt(this.nowNumData), 
        }))
        .then(res => {
          // console.log(res.data)
          res.data.list.forEach(ele => {
            if(ele.lineType == 1){
              ele.lineType = '线下'

            }else if(ele.lineType == 0){
              ele.lineType = '线上'
            }else if(ele.lineType == 2){
              ele.lineType = '总部'
            }
            if(ele.status == 0){
              ele.status = '未启用'
            }else if(ele.status == 1){
              ele.status = '启用'
            }
          })
          
          this.roleTableData = []
          this.roleTableData = this.roleTableData.concat(res.data.list)
          this.pageCount = res.data.pageCount
          
        })
      },
    
      refreshTable(){
        if(this.roleTableData.length !== 0){
          this.search()
        }

      },
      OrginSelectChange(ele){
        // console.log(ele)
        this.addRoleConserve.themech = parseInt(ele)
      },
      dataAddClose(){
        this.dataAdd = false
          this.roleFormAdd = {}
          this.roleFormAdd.roleUser === ''
          if(this.roleFormAdd.state === true){
            this.roleFormAdd.state = false
          }
          // console.log(this.$refs.addHandleTree)
           this.$refs.addHandleTree.setCheckedKeys([])
           this.getAllRoleAuthList()
           this.showAddInpVal = false
           this.showAddSelectVal = true

      },
     
      roleAddSubmit(){
        // console.log(this.addRoleConserve.handauth)
        // console.log(this.arr)
        if(document.querySelector("#roleUser").value === ''){
          document.querySelector("#roleUser").style.border = "1px solid #f56c6c"
         
          return
        }else if(document.querySelector("#roleUser").value !== ''){
          document.querySelector("#roleUser").style.border = "1px solid #dcdfe6"
          
        }

        if(this.roleFormAdd.circuitLine === "" || this.roleFormAdd.circuitLine === null || this.roleFormAdd.circuitLine === undefined){
              document.querySelector("#busiline").style.border = "1px solid #f56c6c"
              document.querySelector("#busiline").style.borderRadius = "15px"
              this.addRoleConserve.busiline = parseInt(0)             
              return
        }else if(this.roleFormAdd.circuitLine !== "" || this.roleFormAdd.circuitLine !== null || this.roleFormAdd.circuitLine !== undefined){
              document.querySelector("#busiline").style.border = "1px solid #dcdfe6"
              document.querySelector("#busiline").style.borderRadius = "15px"
               if(this.roleFormAdd.circuitLine == 0){
                  this.addRoleConserve.busiline = parseInt(0)
                }else if(this.roleFormAdd.circuitLine == 1){
                  this.addRoleConserve.busiline = parseInt(1)
                }else if(this.roleFormAdd.circuitLine == 2){
                   this.addRoleConserve.busiline = parseInt(2)
                }
        }
          
        if(this.roleFormAdd.organization === "" || this.roleFormAdd.organization === null || this.roleFormAdd.organization === undefined){
              document.querySelector("#organization").style.border = "1px solid #f56c6c"
              document.querySelector("#organization").style.borderRadius = "15px"
             
              return
        }else if(this.roleFormAdd.organization !== "" || this.roleFormAdd.organization !== null || this.roleFormAdd.organization !== undefined){
              document.querySelector("#organization").style.border = "1px solid #dcdfe6"
              this.addRoleConserve.themech = this.roleFormAdd.organization
        }
       
        if(this.roleFormAdd.state === "" || this.roleFormAdd.state === null || this.roleFormAdd.state === undefined){
              this.addRoleConserve.rolestat = parseInt(0)
        }else if(this.roleFormAdd.state !== "" || this.roleFormAdd.state !== null || this.roleFormAdd.state !== undefined){
          if(this.roleFormAdd.state == true){
              this.addRoleConserve.rolestat = parseInt(1)
          }else if(this.roleFormAdd.state == false){
              this.addRoleConserve.rolestat = parseInt(0)
          }
        }

        if(this.arr.length === 0){
          this.$alert('经办权限不能为空', '出错提示', {
            confirmButtonText: '确定',
            type:'warning', 
            callback: action => {

            }
          })
          return
        }

        
        this.$axios.post('/SysRoleManageController/editRole',qs.stringify({
          sessionId:localStorage.getItem('SID'),
          id:0,
          name:this.roleFormAdd.roleUser,
          lineType:this.addRoleConserve.busiline,
          mechId:this.addRoleConserve.themech,
          status:this.addRoleConserve.rolestat,
          description:this.roleFormAdd.roleDesc,
          urlIds:this.arr
        }))
        .then(res => {
          // console.log(res.data)
          if(res.data.status === 1){
            this.$alert('新建'+res.data.message,'系统提示',{
              confirmButtonText:'确定',
              type:'success',
              callback:action=>{
                  this.dataAdd = false
                  this.roleFormAdd.roleUser = ''
                  this.roleFormAdd.roleDesc = ''
                  this.roleFormAdd.state = ''
                  this.roleFormAdd.circuitLine = ''
                  this.$refs.addHandleTree.setCheckedKeys([])
                  this.arr = []
                  this.search()
                  this.getAllRoleAuthList()
                  this.showAddInpVal = false
                  this.showAddSelectVal = true
                  this.roleFormAdd.organization = ''
                  
              }
            })
          }else if(res.data.status === 0){
            this.$alert(res.data.message,'系统提示',{
              confirmButtonText:'确定',
              type:'warning',
              
            })
          }
        })

        

      }, 
      roleDelBtn(){
     

        if(this.remouveDataId.length === 0){
          this.$alert("请选择要删除的角色", '出错提示', {
            confirmButtonText: '确定',
            type:'warning',
            callback: action => {

            }
          })
          return
        }else if(this.remouveDataId.length > 0){
          this.RoleDelDialog = true
        }


      },
  
      // 获取权限列表
      getAllRoleAuthList(){
        this.$axios.get('/SysRoleManageController/getAllUrls?sessionId='+localStorage.getItem('SID'),qs.stringify({}))
        .then(res => {
        
          this.handlePower = []
          this.handlePower = this.handlePower.concat(res.data.data)
        })
      },
      // 编辑角色
      edit_role_submit(){
             if(this.roleFormEdit.rolestat === ''){
              this.roleFormEdit.rolestat = 0
          }else if(this.roleFormEdit.rolestat !== ''){
            if(this.roleFormEdit.rolestat === true){
                this.roleFormEdit.rolestat = 1
              }else if(this.roleFormEdit.rolestat === false){
                this.roleFormEdit.rolestat = 0
              }

          }

  
       

          if(this.roleFormEdit.busiline == "线上"){
              this.roleFormEdit.busiline = 0
          }else if(this.roleFormEdit.busiline == "线下"){
          
              this.roleFormEdit.busiline = 1
          }else if(this.roleFormEdit.busiline == "总部"){
                this.roleFormEdit.busiline = 2
          }
          this.roleFormEdit.busiline = parseInt(this.roleFormEdit.busiline)

                 
          if(this.editArr.length === 0){
            this.$alert('经办权限不能为空', '出错提示', {
              confirmButtonText: '确定',
              type:'warning', 
              callback: action => {

              }
            })
            return
          }
          
          this.$axios.post('/SysRoleManageController/editRole',qs.stringify({
            sessionId:localStorage.getItem('SID'),
            id:this.roleFormEdit.id,
            name:this.roleFormEdit.rolename,
            lineType:this.roleFormEdit.busiline,
            mechId:this.roleFormEdit.themech,
            status:this.roleFormEdit.rolestat,
            description:this.roleFormEdit.roledesc,
            urlIds:this.editArr
          }))
          .then(res => {
          
            if(res.data.status === 1){
              this.$alert('修改'+res.data.message,'提示',{
                confirmButtonText:'确定',
                type:'success',
                callback:action=>{
                 
                }
                
              })
              this.dataAmend = false
              this.search()
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
      delSubmitRole(){
        
        var params = new URLSearchParams()
            params.append('ids',this.remouveDataId)
        
        this.$axios.post('/SysRoleManageController/deleteRole',params)
         .then(res => {
           
            if(res.data.status === 1){
              this.$alert(res.data.message,"删除角色",{
                confirmButtonText: '确定',
                callback:action => {
                  this.RoleDelDialog = false
                  this.search()
                }
              })
            }else if(res.data.status !== 1){
              this.$alert(res.data.message,"删除角色",{
                confirmButtonText: '确定',
                callback:action => {

                }
              })
            }

          })
         .catch(error => {
            console.log(error)
         })
      },
 
   
      
      initTree(res){
        res.forEach(ele => {})
      },
      initTreeRes(){
         this.$axios.post('/OrganizationController/queryListByUpLevId',qs.stringify({
              'sessionId':localStorage.getItem('SID'),
              'upmechid':parseInt(1),
              'mechLine':parseInt(0)
          }))
          .then(res => {
            console.log(res.data)
            if(res.data.code === 1){
              this.selectDatatreeOnline = []
              this.selectDatatreeOnline = this.selectDatatreeOnline.concat(res.data.recordList)
            }
            

          })
    

      },
      initTreeOffline(){

          this.$axios.post('/OrganizationController/queryListByUpLevId',qs.stringify({ 
              "sessionId":localStorage.getItem('SID'),
              "upmechid":parseInt(1),
              'mechLine': parseInt(1) 
            }))
            .then(res => {
              if(res.data.code === 1){
                this.offlineDataTree = []
                this.offlineDataTree=this.offlineDataTree.concat(res.data.recordList);
              }
             
            })

  

     
      },
      getOfflineListinp(){
         this.$axios.post('/OrganizationController/queryListByUpLevId',qs.stringify({ 
          "sessionId":localStorage.getItem('SID'),
          "upmechid":0,
          'mechLine':2
        }))
          .then(res => {
            this.offlineListShow = []
            this.offlineListShow = this.offlineListShow.concat(res.data.recordList)
              this.$axios.post('/OrganizationController/queryListByUpLevId',qs.stringify({ 
                "sessionId":localStorage.getItem('SID'),
                "upmechid":0,
                'mechLine':1
              }))
              .then(resData => {
                this.offlineListShow = this.offlineListShow.concat(res.data.recordList)
               
              })
          })

      },
      getListAuthByUpCode(){
       
 
          this.$axios({
            method:'POST',
            url:'/AuthController/queryAuthByUpCode',
            // headers:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'},
            data:qs.stringify({
              "sessionId":localStorage.getItem('SID'),
              "upcode":"FKYW"
            })
          })
            .then( res => {
          
              for(let i=0;i<res.data.length;i++){
                res.data[i].label = res.data[i].authname

              
                this.handleData.push(res.data[i])
                this.handleDataGrant.push(res.data[i])

                this.handlePower.push(res.data[i])
                this.grantPower.push(res.data[i])


                res.data[i].children = []
                

                this.$axios.post("/AuthController/queryAuthByUpCode",qs.stringify({
                  "sessionId":localStorage.getItem('SID'),
                    "upcode":res.data[i].authcode
                }))
                .then( resData => {
              
                    if(resData.data.length > 0){
                          
                          resData.data.forEach(ele => {
                             
                              ele.children = []
                              this.handlePower.forEach(item => {
                                  if(item.authcode === ele.upcode){
                                      item.children.push(ele)
                                  }
                              })

                              this.$axios.post("/AuthController/queryAuthByUpCode",qs.stringify({
                                "sessionId":localStorage.getItem('SID'),
                                  "upcode":ele.authcode
                              }))
                              .then( resDataTr => {
                               
                                if(resDataTr.data.length > 0){
                                    resDataTr.data.forEach(itemLabel => {
                                      itemLabel.children = []
                                      if(ele.authcode === itemLabel.upcode){
                                        ele.children.push(itemLabel)

                                      }
                                      this.$axios.post("/AuthController/queryAuthByUpCode",qs.stringify({
                                        "sessionId":localStorage.getItem('SID'),
                                            "upcode":itemLabel.authcode
                                        }))
                                        .then(resDataTree => {
                                          // console.log(resDataTree.data)
                                          if(resDataTree.data.length > 0){
                                              resDataTree.data.forEach(itemData => {
                                                itemData.children = []
                                                  if(itemLabel.authcode === itemData.upcode){
                                                    itemLabel.children.push(itemData)

                                                  }
                                                  this.$axios.post("/AuthController/queryAuthByUpCode",qs.stringify({
                                                    "sessionId":localStorage.getItem('SID'),
                                                      "upcode":itemData.authcode
                                                  }))
                                                  .then(responseData => {
                                                    // console.log(responseData.data)
                                                    if(responseData.data.length>0){
                                                      responseData.data.forEach(itemChildDate => {
                                                        if(itemChildDate.upcode === itemData.authcode){
                                                          itemData.children.push(itemChildDate)

                                                        }
                                                      })

                                                    }
                                                  })
                                                  .catch(error => {
                                                    console.log(error)
                                                  })
                                              })
                                          }
                                        })
                                        .catch(error => {
                                          console.log(error)
                                        })
                                    })
                                }
                              })
                              .catch(error => {
                                console.log(error)
                              })

                          })
                        
                          
                    }              
                })
                .catch( error => {
                    console.log(error)
                })
            }
          })
          .catch(error => {
            console.log(error)
          })
          console.log(JSON.stringify(this.handlePower))     
      },
  
      getOnlineList(){
        
          this.$axios.get("/OnlineMechmangController/getqueryOnlineMechmangList?sessionId=" + localStorage.getItem('SID'))
            .then(res => {
      
         
              this.selectData = res.data

            })
            .catch(error => {
              console.log(error)
            })
      },
      getOfflineList(){
            this.$axios.get('/LineMechmangController/getqueryLineMechmangList?sessionId=' + localStorage.getItem('SID'))
            .then(res => {
          
              this.offlineSelectData = res.data
            })
            .catch(error => {
              console.log(error)
            })
      },
      
      
    },
    mounted(){
      

  
      // this.getOnlineList()
      // this.getOfflineList()
      // this.getListAuthByUpCode()
     
      this.getAllRoleAuthList()
      
    },
    created(){
       this.initTreeRes()
      this.initTreeOffline()
      
    }
  }
</script>
<style scoped>
  .dialog-footer{background-color: #F1F2F5;border: none}
  .textareaIpt{
    resize:none;
  }
  .dialogLeft {
    float: left;
    border-right: 1px solid #ccc;
    padding-right: 15px;
    width: 45%;
  }
  .dialogRight {
    float: left;
    width: 52%;
  }
  .addIpt{
    width: 96%;
    height: 26px;
  }
  .addIpt:-moz-placeholder{
    color: #666666;
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
    border-top: 1px solid #e0e0e0;
  }
  .contentBotoom {
    height: 60px;
    width: 100%;
    background-color: #fff;
    font-size: 13px;
    padding-top: 25px;
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
  .leftButton {
    float: left;
    margin-left: 80px;
  }
  .contentData {
    background-color: #fff;
    border-right: 10px solid #ffffff;
    border-left: 10px solid #ffffff;
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
    border-radius: 24px;
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
  .dialogLeft{
    float: left;
    border-right: 1px solid #ccc;
   /* padding-right: 19px;
    margin-right: 36px;*/
    width: 45%;
    padding-left: 15px;
  }
  .dialogcenter{
    float: left;
    padding:0 15px;
    /*margin-right: 36px;*/
    min-width: 45%;
    width: auto;
    max-height: 300px;
    height: 300px;
    overflow-y: scroll;
  }
  .dialogcenter::-webkit-scrollbar ,.dialogRight::-webkit-scrollbar{display:none}
  .dialogRight{
    float: left;
   /* padding-right: 19px;
    margin-right: 36px;*/
    padding:0 10px;
    
    min-width: 16%;
    width: auto;
    max-height: 280px;
    height: 280px;
    overflow-y: scroll;
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
.editDialog{
  width:100%;
  height:100%;
  z-index: 111;
  position: absolute;
  top:0;
  left:0;
  bottom:0;
  right:0;
  background-color:rgba(0,0,0,0.6)
}
.addDialog{
  width:100%;
  height:100%;
  z-index: 111;
  position: absolute;
  top:0;
  left:0;
  bottom:0;
  right:0;
  background-color:rgba(0,0,0,0.6)
}
.addDialogDiv,.editDialogDiv{
  width:670px;
  position:absolute;
  top:20%;
  left:50%;
  margin-left:-335px;
  background-color:#F1F2F5;
  padding-bottom: 30px;
  
}
.addDialogDivTitle{
  height:40px;
  line-height: 40px;
  text-indent: 20px;
  font-size: 18px;
  
}
</style>
