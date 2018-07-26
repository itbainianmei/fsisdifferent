// 管控审批清单
<template>
  <div>
      <div class="searchContent">
        <div class="searchContentLeft">
          <div class="beginTime hideTimeRightIcon">
            <span class="span">开始时间:</span>
            <el-date-picker
              type="datetime"
              v-model="serchstartTime"
              placeholder="选择日期时间"
              value-format="yyyy-MM-dd HH:mm:ss"
              style="width: 50%"
              id='dataTimeFocus'
              @focus="dataTimeFocusSet"
            >
            </el-date-picker>
          </div>
          <div class="endTime hideTimeRightIcon">
            <span class="span">结束时间:</span>
            <el-date-picker
              v-model="serchendTime"
              type="datetime"
              placeholder="选择日期时间"
              value-format="yyyy-MM-dd HH:mm:ss"
              style="width: 50%"
              id='endDataTimeFocus'
              @focus="dataTimeFocusSetEnd"
            >
            </el-date-picker>
          </div>
          <div class="ControlType">
            <span class="span">审批状态:</span>
            <el-select v-model="serchapprovalStatus" filterable  placeholder="请选择"  class="editInput">
              <el-option v-for="item in this.spzt"  :key="item.id" :label="item.sysname" :value="item.sysconid"></el-option>
            </el-select>
          </div>
          <div class="ControlType">
              <span class="span">管控类型:</span>
              <el-select v-model="serchcontrolType" filterable placeholder="请选择"  class="editInput">
                <el-option v-for="item in this.gklx" :key="item.id" :label="item.sysname" :value="item.sysconid" ></el-option>
              </el-select>
          </div>
          <div class="source">
            <span class="span">来源:</span>
            <el-select v-model="serchsource" filterable placeholder="请选择"  class="editInput">
              <el-option v-for="item in this.ly" :key="item.id" :label="item.sysname" :value="item.sysconid"></el-option>
            </el-select>
          </div>
          <div class="merchantCode">
            <span class="span">来源编号:</span>
              <el-input placeholder="请输入"  v-model="serchsourceId" class="editInput"></el-input>
          </div>
          <div class="SourceCode">
            <span class="span">商户编号:</span>
            <el-input placeholder="请输入"  v-model="serchmerchantId" class="editInput"></el-input>
          </div>
          <div class="merchantCode">
            <span class="span">管控编号:</span>
            <el-input placeholder="请输入"  v-model="serchid" class="editInput"></el-input>
          </div>
          <div class="controlNumber">
              <span class="span">发起机构:</span>
              <el-select v-model="serchinitiateMechanism" filterable  placeholder="请选择"  class="editInput" @focus='getMechanism'>
                <el-option  v-for="item in methanismList" :key="item.mechid" :label='item.mechname' :value='item.mechid'></el-option>
              </el-select>
          </div>
        </div>
        <div class="searchContentRight">
            <el-button type="primary" class="iconStyle" icon="el-icon-search" style="margin-left: 8px" @click="init" v-if="searchPermission"></el-button>
            <el-button type="primary" class="iconStyle iconRe fer" icon="el-icon-refresh" style="margin-top: 20px;" @click='reset' v-if="resetPermission"></el-button>
        </div>
      </div>
      <div class="listContent">
        <div class="contentIcon">
          <div class="button">
            <div class="leftButton clear">
              <div class="BotoomBtn" @click="examineOpen" v-if="examinePermission">
                <div class="addIcon" title='审核'></div>
              </div>
            </div>
          </div>
        </div>
        <div class="dataTable clear">
          <el-table
            :data="tableData"
            border
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="50"
              align='center'
            >
            </el-table-column>
            <el-table-column
              prop="id"
              label="管控编号"
              align='center'
            >
            </el-table-column>

            <el-table-column
              prop="source"
              label="来源"
              align='center'
            >
            </el-table-column>
            <el-table-column
              prop="sourceId"
              label="来源编号"
              align='center'
            >
            </el-table-column>
            <el-table-column
              prop="controlType"
              label="管控类型"
              align='center'
            >
            </el-table-column>
            <el-table-column
              prop="controlMoney"
              label="管控金额"
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
              prop="merchantName"
              label="商户名称"
              align='center'
            >
            </el-table-column>
            <el-table-column
              prop="initiateMechanism"
              label="发起机构"
              align='center'
            >
            </el-table-column>
            <el-table-column
              prop="initiatePerson"
              label="发起人"
              align='center'
            >
            </el-table-column>
            <el-table-column
              prop="initiateTime"
              label="发起时间"
              align='center'
            >
            </el-table-column>
            <el-table-column
              prop="approvalStatus"
              label="审批状态"
              width="120"
              align='center'
            >
            </el-table-column>
            <!-- <el-table-column
              prop="approvalComments"
              label="审批意见"
              align='center'
            >
            </el-table-column> -->
            <el-table-column
              prop="remark"
              label="备注"
              align='center'
            >
            </el-table-column>
          </el-table>
        </div>
        <div class="block">
                <div class='pagination'>
                  <span>每页显示</span>
                  <select  class="evetotal"  @change="handleSizeChange($event)">
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="40">40</option>
                  </select>
                </div>
                <div class='paginationRight'>
                    <el-pagination
                      layout="prev, pager, next"
                      :total=totalSize
                      @current-change="handleCurrentChange"
                      :page-sizes="[10,20,30,40]"
                      :page-size=pageSize>
                    </el-pagination>
                </div>
            </div>
      </div>
      <el-dialog title="审批" :visible.sync="examine" width="30%" >
        <el-form ref="form" :model="form" :rules="rules"  class="demo-ruleForm" label-width="100px"  style="margin-left:6%;">
          <el-form-item label="审核意见">

            <el-select v-model="form.region" style='width:88%' @focus='getVerifyList'>
                <el-option :label="item.sysname" :value="item.sysname" v-for='(item,index) in verifyList' :key='index'></el-option>

            </el-select>
          </el-form-item>
          <el-form-item label="备注:" prop="roleDesc">
              <el-input type="textarea" placeholder="限制150字" :maxlength="150"   :rows="8" v-model="form.roleDesc" style="width: 84%"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="examineClose">取 消</el-button>
          <el-button type="primary" @click="examineAdd" v-if="examineSubmitPermission">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>
<script>
import qs from 'qs'
  export default{
    name:'管控审批清单',
    data(){
      return {
        searchPermission: true,
        resetPermission: true,
        examinePermission: true,
        examineSubmitPermission: true,

        serchstartTime:'',
        serchendTime:'',
        serchapprovalStatus:'',
        serchcontrolType:'',
        serchsource:'',
        serchsourceId:'',
        serchmerchantId:'',
        serchid:'',
        serchinitiateMechanism:'',

        pageSize:10,
        pageNum:1,
        totalSize:0,
        totalPageNum:'',


        jgName:'',
        spzt:'',
        gklx:'',
        ly:'',

        multipleSelection:[],
        ceshi:'',
        examine:false,
        currentPage:1,
        ControlType:'',
        tableData:[],
        form:{
          region:'',
          roleDesc:'',
        },
        labelPosition:'right',
        rules:{
          roleDesc:[
            {max: 150, min:0,message: ' ', trigger: 'blur' }
          ]
        },
        methanismList:[],
        verifyList:[],
      }
    },
    created(){
      // 按钮权限
      const idList = JSON.parse(localStorage.getItem('ARRLEVEL'))
      this.searchPermission = idList.indexOf(328) === -1 ? false : true
      this.resetPermission = idList.indexOf(329) === -1 ? false : true
      this.examinePermission = idList.indexOf(330) === -1 ? false : true
      // this.examineSubmitPermission = idList.indexOf(331) === -1 ? false : true
    },
    mounted(){
      //  this.init()
      //  this.getName()
       this.getspzt()
       this.getgklx()
       this.getly()
       this.initTimeSet()
    },
    methods:{
      getly(){
         this.$axios.post('/SysConfigController/queryEnum',qs.stringify({
                'sessionId':localStorage.getItem('SID'),
                'type':'71',
            }))
            .then(res => {
              // console.log(res)
              this.ly = res.data
              // console.log(this.ly)
            })
            .catch(error => {
                console.log(error)
            })
      },
      getgklx(){
         this.$axios.post('/SysConfigController/queryEnum',qs.stringify({
                'sessionId':localStorage.getItem('SID'),
                'type':'63',
            }))
            .then(res => {
              // console.log(res)
              this.gklx = res.data
              // console.log(this.gklx)
            })
            .catch(error => {
                console.log(error)
            })
      },
      getspzt(){
         this.$axios.post('/SysConfigController/queryEnum',qs.stringify({
                'sessionId':localStorage.getItem('SID'),
                'type':'70',
            }))
            .then(res => {
              this.spzt = this.spzt.concat()
              this.spzt = res.data
                // console.log(this.spzt)
            })
            .catch(error => {
                console.log(error)
            })
      },
      getName(){
        this.$axios.get('/OfflineChecklistController/queryLineMechmang?sessionId=' + localStorage.getItem('SID'))
          .then(res => {
            this.jgName = res.data.recordList
            // console.log(this.jgName)
            // console.log(res.data.recordList)
          })
          .catch(error => {
            console.log(error)
          })
      },
      getMechanism(){

        this.$axios.post('/ControlListController/queryControlLineMechmang',qs.stringify({
          'sessionId':localStorage.getItem('SID'),
          'mechId': parseInt(localStorage.getItem('MECHID'))
        }))
        .then(res =>{
          console.log(res.data)
          this.methanismList = []
          this.methanismList = this.methanismList.concat(res.data.recordList)
        })
      },
      init(){
        console.log(localStorage.getItem('SID'))
          this.$axios.post('/ControlListController/queryControlList',qs.stringify({
            'sessionId':localStorage.getItem('SID'),
            'startTime':this.serchstartTime,
            'endTime':this.serchendTime,
            'approvalStatus':this.serchapprovalStatus,
            'controlType':this.serchcontrolType,
            'source':this.serchsource,
            'sourceId':this.serchsourceId,
            'merchantId':this.serchmerchantId,
            'id':this.serchid,
            'initiateMechanism':this.serchinitiateMechanism,
            'pageNum':this.pageNum,
            'pageSize':this.pageSize,
          }))
          .then(res => {
            console.log(res)
            if(res.data.code === 1){
                this.tableData = res.data.data
                this.totalSize = res.data.totalSize
            }

          })
          .catch(error => {
            console.log(error)
          })

      },
      examineOpen(){
        if(this.multipleSelection.length == 0){
          this.$alert('请至少选择一条需要审核的数据', '系统提示', {
                confirmButtonText: '确定',
                type:'warning'
          });
        }else{
          this.examine = true
        }
      },
      examineAdd(){


         let ids = []
          for(let i = 0; i <this.multipleSelection.length;i++){
              ids.push(this.multipleSelection[i].id)
          }

          console.log(ids.join(","))
         let str = ''
          if(this.form.region === '通过'){
            str = parseInt(649)
          }else if(this.form.region === '不通过'){
            str = parseInt(650)
          }



         this.$axios.post('/ControlListController/approvalRecord',qs.stringify({
            'sessionId':localStorage.getItem('SID'),
            'ids':ids.join(","),
            'approvalStatus':str,
            'remark':this.form.roleDesc,
          }))
          .then(res => {
            console.log(res)
            // console.log(ids.join(","))

              if(res.data.code == 1){
                  this.$alert('审批成功', '系统提示', {
                    confirmButtonText: '确定',
                    type:'success',
                    callback:action => {
                      this.form.region = ''
                      this.form.roleDesc = ''
                      this.examine = false
                      this.init()
                    }
                  });
              } else {
                  this.$alert(res.data.errMsg, '系统提示', {
                    confirmButtonText: '确定',
                    type:'fail'
                  });
              }

          })
          .catch(error => {
            console.log(error)
          })


      },
      examineClose(){
        this.examine = false
        this.form.region = ''
        this.form.roleDesc = ''
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(this.multipleSelection)
      },
      handleSizeChange(val) {
        console.log(val.target.value);
        this.pageSize = parseInt(val.target.value)
        this.init()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.pageNum = val
        this.init()
      },
      // 审核
      getVerifyList(){
          console.log(111)
          this.$axios.post('/SysConfigController/queryEnum',qs.stringify({
              'sessionId':localStorage.getItem('SID'),
              'type':64
          }))
          .then(res => {
              console.log(res.data)
              this.verifyList = []
              this.verifyList = this.verifyList.concat(res.data)
          })
          .catch(error => {
              console.log(error)
          })
      },
      // 重置数据
      reset(){
          this.initTimeSet()
          this.serchapprovalStatus = ''
          this.serchcontrolType = ''
          this.serchsource = ''
          this.serchsourceId = ''
          this.serchmerchantId = ''
          this.serchid = ''
          this.serchinitiateMechanism = ''
      },
       // 设置默认时间
        initTimeSet(){
            let date = new Date()
            let y = date.getFullYear()
            let m = "0"+(date.getMonth()+1)
            let d = "0"+date.getDate()
            // console.log(y+'-'+m+'-'+d)
            this.serchstartTime = y+'-'+m.substring(m.length-2,m.length)+'-'+d.substring(d.length-2,d.length) + ' '+ '00:00:00'
            this.serchendTime = y+'-'+m.substring(m.length-2,m.length)+'-'+d.substring(d.length-2,d.length) + ' '+ '23:59:59'

        },
        dataTimeFocusSet(){
          document.querySelector('#dataTimeFocus').setAttribute('readOnly',true)
        },
        dataTimeFocusSetEnd(){
          document.querySelector('#endDataTimeFocus').setAttribute('readOnly',true)
        },
    }
  }
</script>
<style>
 .block{margin-top:34px;width:100%}
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
.searchContent{font-size: 13px;color: #333333;width: 100%;padding-top: 30px;border-bottom: 1px solid #e0e0e0;padding-bottom: 20px}
.searchContentLeft{width: 80%;border-right: 1px solid #e0e0e0;padding-left: 2%;display: inline-block;}
  .beginTime,.endTime,.controlNumber,.approvalStatus,.ControlType,.source,.merchantCode,.SourceCode,.merchantCode,.phone,.ip,.tradingScene{
    display: inline-block;margin-bottom: 20px;width:33%;
  }
.ip,.tradingScene{margin-bottom: 0}
 .editInput{width: 50%}
.span{width: 90px;text-align: right;display: inline-block}
.searchContentRight {
    float: right;
    padding-right: 5%;
    padding-top: 45px;
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
  background: url(../../images/sp.png);
  width: 44px;
  height: 30px;
  margin: 0 auto;
}
.addIcon:hover {
  background: url(../../images/spH.png);
  width: 44px;
  height: 30px;
  margin: 0 auto;
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
</style>
