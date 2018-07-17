<template>
    <div>
        <div class="downLoadBtnBox">
            <div>
                <div >
                    <span  @click="down" id='downloadIcon'></span>
                    <span  @click="reset" id='centerIcon'></span>                  
                </div>
            </div>
        </div>
        
        <div class="datatable">
        
          <el-table
          v-show='userTableShow'
          :data="tableData"
          border
          style="width: 100%"
         >
          <el-table-column
            prop="userName"
            label="登录名"
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
         
        </el-table>

         <el-table
         v-show='roleTableShow'
          :data="roleTable"
          border
          style="width: 100%"
         >
     
          <el-table-column
            prop="name"
            label="角色名"
             width="150"
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

         
        </el-table>

        <el-table
            v-show = 'onlineListShow'
            :data="onlineList"
            border
            style="width: 100%"
            >
              <el-table-column
                prop="mechid"
                min-width="100"
                label="机构ID"
                align='center'
              >
              </el-table-column>
              <el-table-column
                prop="mechname"
                label="机构名称"
                width="150"
                  align='center'
              >
              </el-table-column>
              <el-table-column
                prop="mecharr"
                label="机构层次"
                  align='center'
                >
              </el-table-column>
              <el-table-column
                prop="upmech"
                label="上级机构"
                width="150"
                  align='center'
              >
              </el-table-column>
              <el-table-column
                prop="upmechid"
                label="上级机构ID"
                min-width="100"
                  align='center'
              >
              </el-table-column>
              <el-table-column
                prop="percha"
                min-width="100"
                label="负责人姓名"
                  align='center'
              >
              </el-table-column>
              <el-table-column
                prop="coninfo"
                label="联系方式"
                  align='center'
              >
              </el-table-column>
              <el-table-column
                prop="descibe"
                label="机构描述"
                  align='center'
              >
              </el-table-column>
              <el-table-column
                prop="curuser"
                label="创建人"
                v-if="false"
              >
              </el-table-column>
              <el-table-column
                prop="cretm"
                label="创建时间"
                  align='center'
              >
              </el-table-column>
              <el-table-column
                prop="uptm"
                min-width="110"
                label="最后更新时间"
                  align='center'
              >
              </el-table-column>
              <el-table-column
                prop="upuser"
                label="更新者"
                  align='center'
              >
              </el-table-column>
          </el-table>

          <el-table
              v-show = 'offlineListShow'
              :data='offlineList'
              border
              style="width: 100%"
              >
                <el-table-column
                  width="100px"
                  prop="mechid"
                  label="机构ID"
                  align='center'
                >
                </el-table-column>
                <el-table-column
                  prop="mechname"
                  label="机构名称"
                  align='center'
                >
                </el-table-column>
                <el-table-column
                  prop="mecharr"
                  label="机构层次"
                  align='center'
                  >
                </el-table-column>
                <el-table-column
                  prop="upmech"
                  label="上级机构"
                  align='center'
                >
                </el-table-column>
                <el-table-column
                  prop="upmechid"
                  width="100px"
                  label="上级机构ID"
                  align='center'
                >
                </el-table-column>
                <el-table-column
                  prop="percha"
                  width="100px"
                  label="负责人姓名"
                  align='center'
                >
                </el-table-column>
                <el-table-column
                  prop="coninfo"
                  label="联系方式"
                  align='center'
                >
                </el-table-column>
                <el-table-column
                  prop="descibe"
                  label="机构描述"
                  align='center'
                >
                </el-table-column>
                <el-table-column
                  prop="curuser"
                  label="创建人"
                  v-if="false"
                >
                </el-table-column>
                <el-table-column
                  prop="cretm"
                  label="创建时间"
                  align='center'
                >
                </el-table-column>
                <el-table-column
                  prop="uptm"
                  width="100px"
                  label="最后更新时间"
                  align='center'
                >
                </el-table-column>
                <el-table-column
                  prop="upuser"
                  label="更新者"
                  align='center'
                >
                </el-table-column>
            </el-table>

            <el-table   
                v-show='riskTableListShow'
                :data="riskTableList"
                border
                style="width: 100%"
                >
                 
                  <el-table-column
                    prop="risklev"
                    label="风险等级"
                    align='center'
                   
                  >
                  </el-table-column>
                  <el-table-column
                    prop="riskid"
                    label="风险编号"
                    v-if="false"
                    align='center'
                    >
                  </el-table-column>
                  <el-table-column
                    prop="minriskval"
                    label="最小风险值"
                    align='center'
                    >
                  </el-table-column>
                  <el-table-column
                    prop="maxriskval"
                    label="最大风险值"
                    align='center'
                   >
                  </el-table-column>
                  <el-table-column
                    prop="riskname"
                    label="风险名称"
                    align='center'
                   >
                  </el-table-column>
                  <el-table-column
                    prop="creattm"
                    label="创建时间"
                    align='center'
                   >
                  </el-table-column>
                  <el-table-column
                    prop="lasttm"
                    label="最后更新时间"
                    align='center'
                   >
                  </el-table-column>
                  <el-table-column
                    prop="upuser"
                    label="更新者"
                    align='center'
                   >
                  </el-table-column>
                
              </el-table>

      <el-table
         v-show='sysConfigTableListShow'
          :data="sysConfigTableList"
          border
          style="width:98%;margin:0 auto;"
         >
          <el-table-column
             prop="sysconid"
             label="系统配置ID"
             width="130"
             align='center'
          >
          </el-table-column>
           <el-table-column
            prop="sysrem"
            label="菜单项"
            align='center'
          >
          </el-table-column>
          <el-table-column
            prop="systype"
            label="类型"
            v-if="false"
            align='center'
          >
          </el-table-column>
          <el-table-column
            prop="typename"
            label="类型名称"
            align='center'
          >
          </el-table-column>
          <el-table-column
            prop="syscode"
            label="代码"
            align='center'
          >
          </el-table-column>
          <el-table-column
            prop="sysname"
            label="枚举值"
            align='center'
          >
          </el-table-column>
          <el-table-column
            prop="sys"
            label="排序"
            align='center'
          >
          </el-table-column>
          <el-table-column
            prop="syssta"
            label="状态"
            align='center'
          >
          </el-table-column>
          <el-table-column
            prop="curuser"
            label="创建人"
            align='center'
          >
          </el-table-column>
          <el-table-column
            prop="cretm"
            label="创建时间"
            align='center'
          >
          </el-table-column>
          <el-table-column
            label="最后更新时间"
            width="100px"
            prop="uptm"
            align='center'
          >
          </el-table-column>
          <el-table-column
            prop="upuser"
            label="更改者"
            align='center'
          >
          </el-table-column>
       
        </el-table>
     
        </div>
    </div>    
</template>

<script>
import qs from 'qs'
export default {
    
    data() {
      return {
        arr:[],
        arrList:[],
        tableData:[],
        username:'',
        userTableShow:false,
        roleTableShow:false,
        roleTable:[],
        onlineTable:[],
        onlineTableShow:false,
        onlineList:[],
        onlineListShow:false,
        offlineList:[],
        offlineListShow:false,
        riskTableList:[],
        riskTableListShow:false,
        sysConfigTableList:[],
        sysConfigTableListShow:false
      }
    },
    methods:{
       
        down(){
            document.querySelector('#downloadIcon').style.dispaly = 'none'
            document.querySelector('#centerIcon').style.dispaly = 'block'
           
            window.print()
        },
        reset(){
          //this.$router.push({path:'/manager/systemUsers'})
          window.close()
        },
        getTableList(){
         
         console.log(JSON.parse(localStorage.getItem('OBJ')).type)
          
          if(JSON.parse(localStorage.getItem('OBJ')).type === 'XT_YH'){
              this.userTableShow = true
              this.roleTableShow = false
              this.onlineListShow = false
              this.offlineListShow = false
              this.riskTableListShow = false
              this.sysConfigTableListShow = false
            let obj = {}
              obj.pageNum = (JSON.parse(localStorage.getItem('OBJ'))).pageNum
              obj.pageSize = (JSON.parse(localStorage.getItem('OBJ'))).pageSize
              obj.roleId = (JSON.parse(localStorage.getItem('OBJ'))).roleId
              obj.type = (JSON.parse(localStorage.getItem('OBJ'))).type
              obj.username = (JSON.parse(localStorage.getItem('OBJ'))).username
              obj.sessionId = localStorage.getItem('SID')
           
                  
              this.$axios.post('/SysUserManageController/query',qs.stringify(obj))
              .then(res => {
                  console.log(res.data)
                  if(
                    res.data.status === 1){
                      this.tableData = []
                      this.tableData = this.tableData.concat(res.data.data.list)
                  }
                  

              })
          }else if(JSON.parse(localStorage.getItem('OBJ')).type === 'XT_JS'){
            this.userTableShow = false
            this.roleTableShow = true
            this.onlineListShow = false
            this.offlineListShow = false
            this.riskTableListShow = false
            this.sysConfigTableListShow = false
            let roleObj = {}
                roleObj.name = this.userVal
                roleObj.pageNum = JSON.parse(localStorage.getItem('OBJ')).pageNum
                roleObj.pageSize = JSON.parse(localStorage.getItem('OBJ')).pageSize
                roleObj.sessionId = localStorage.getItem('SID')
            this.$axios.post('/SysRoleManageController/query',qs.stringify(roleObj))
            .then(res => {
              console.log(res.data)
              this.roleTable = []
              this.roleTable = this.roleTable.concat(res.data.list) 
            })
          }else if(JSON.parse(localStorage.getItem('OBJ')).type === 'XT_XS'){
            this.onlineListShow = true
             this.userTableShow = false
            this.roleTableShow = false
            this.offlineListShow = false
            this.riskTableListShow = false
            this.sysConfigTableListShow = false
            let onlineObj = {}
                onlineObj.sessionId = localStorage.getItem('SID')
                onlineObj.mechname = JSON.parse(localStorage.getItem('OBJ')).mechname
                onlineObj.startnum = JSON.parse(localStorage.getItem('OBJ')).startnum
                onlineObj.pagenum = JSON.parse(localStorage.getItem('OBJ')).pagenum
                onlineObj.mechLine = JSON.parse(localStorage.getItem('OBJ')).mechLine
              this.$axios.post('/OrganizationController/queryListByMechNameLike',qs.stringify(onlineObj))
              .then(res => {
                console.log(res.data)
                if(res.data.code === 1){
                  this.onlineList = []
                  this.onlineList = this.onlineList.concat(res.data.recordList)
                }
              })
          }else if(JSON.parse(localStorage.getItem('OBJ')).type === 'XT_XX'){
              this.offlineListShow = true
              this.onlineListShow = false
              this.userTableShow = false
              this.roleTableShow = false
              this.riskTableListShow = false
              this.sysConfigTableListShow = false
              let offlineObj = {}
                  offlineObj.sessionId = localStorage.getItem('SID')
                  offlineObj.startnum = JSON.parse(localStorage.getItem('OBJ')).startnum
                  offlineObj.pagenum = JSON.parse(localStorage.getItem('OBJ')).pagenum
                  offlineObj.mechLine = JSON.parse(localStorage.getItem('OBJ')).mechLine
                  offlineObj.mechname = JSON.parse(localStorage.getItem('OBJ')).mechname
                this.$axios.post('/OrganizationController/queryListByMechNameLike',qs.stringify(offlineObj))
                .then(res => {
                  
                  this.offlineList = []
                  this.offlineList = this.offlineList.concat(res.data.recordList) 
                })
          }else if(JSON.parse(localStorage.getItem('OBJ')).type === 'XT_FX'){
             this.riskTableListShow = true
             this.offlineListShow = false
              this.onlineListShow = false
              this.userTableShow = false
              this.roleTableShow = false
              this.sysConfigTableListShow = false
              let riskObj = {}
                  riskObj.sessionId = localStorage.getItem('SID')
                  riskObj.startNum = JSON.parse(localStorage.getItem('OBJ')).startNum
                  riskObj.pageNum = JSON.parse(localStorage.getItem('OBJ')).pageNum
                  riskObj.riskLev = JSON.parse(localStorage.getItem('OBJ')).riskLev
                  riskObj.riskName = JSON.parse(localStorage.getItem('OBJ')).riskName
              this.$axios.post("/RisklevconController/queryRiskListByLevAndName",qs.stringify(riskObj))
              .then(res => {
                console.log(res.data)
                this.riskTableList = []
                this.riskTableList = this.riskTableList.concat(res.data.data.list)
              })

          }else if(JSON.parse(localStorage.getItem('OBJ')).type === 'XT_PZ'){
              this.riskTableListShow = false
              this.offlineListShow = false
              this.onlineListShow = false
              this.userTableShow = false
              this.roleTableShow = false
              this.sysConfigTableListShow = true
              

            let configObj = {}
                configObj.sessionId = localStorage.getItem('SID')
                configObj.startnum = JSON.parse(localStorage.getItem('OBJ')).startnum
                configObj.pagenum = JSON.parse(localStorage.getItem('OBJ')).pagenum
                configObj.systype = JSON.parse(localStorage.getItem('OBJ')).systype
                configObj.syscode = JSON.parse(localStorage.getItem('OBJ')).syscode
                configObj.typename = JSON.parse(localStorage.getItem('OBJ')).typename

             this.$axios.post("/SysConfigController/querySysListByTypeNameCode",qs.stringify(configObj))
             .then(res => {
               console.log(res)
               
                this.sysConfigTableList = []
                this.sysConfigTableList = this.sysConfigTableList.concat(res.data)
                this.sysConfigTableList.forEach(ele => {
                  if(ele.syssta === 0){
                    ele.syssta = '未启用'
                  }else if(ele.syssta === 1){
                    ele.syssta = '启用'
                  }
                })
               
             })

          }
          
        },
    },
    mounted(){
       this.getTableList()
         
    },
}
</script>
<style>
  .downLoadBtnBox{
      height:70px;
  }

  #centerIcon{
    display:inline-block;
    background: url('../../images/close.png') no-repeat;
    width:44px;
    height:30px;
    float: left;
    margin-top:20px;
    cursor: pointer;
  }
  #centerIcon:hover{
    display:inline-block;
    background: url('../../images/close_actived.png') no-repeat;
    width:44px;
    height:30px;
    float: left;
    margin-top:20px;
    cursor: pointer;
  }
  #downloadIcon {
    display:inline-block;
    background: url(../../images/icon.png) no-repeat -127px -4px;
    width: 44px;
    height: 28px;
    margin: 0 auto;
    margin-top: 20px;
    border:1px solid #38E139;
    float: left;
    cursor: pointer;
  }
  #downloadIcon:hover {
    display:inline-block;
    background: url(../../images/icon.png) no-repeat -127px -28px;
    width: 44px;
    height: 28px;
    margin: 0 auto;
    margin-top: 20px;
    border:1px solid #38E139;
    background-color:#38E139;
    float: left;
    cursor: pointer;
  }
  

</style>
 