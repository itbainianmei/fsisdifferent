// 当天未处理报警
<template>
  <div class="dataContent">
      <div class="onf" v-if="showToggleSwich">
        <span>预警分配:</span>
      </div>

      <div class="onOff" id="onOff" @click="toggleOnOff" v-if='showToggleSwich'>

      </div>
      <div class="contentBotoom">
          <div class="button">
                <div class="leftButton clear">
                    <div class="BotoomBtn leftRadius" title='报警' @click='pauseStart' v-show='showCallBtn'>

                        <div class="ztbj" id='pause'></div>
                    </div>
                    <!-- <div class="BotoomBtn" title='确认无风险' @click='confirmRisk'>
                          <div class="wfx"></div>
                    </div> -->

                    <div class="BotoomBtn" @click="generateCase" title='生成案件' v-show='showNewCaseBtn'>
                          <div class="scaj"></div>
                    </div>
                    <div class="BotoomBtn" title='备注' @click='remarkDialogClick' v-show='showRemarkBtn'>
                          <div class="icon2"></div>
                    </div>
                    <div class="BotoomBtn rightRadius" title='分配' @click='allotDialogClick' v-show='showAllotBtn'>

                          <div class="icon3"></div>
                    </div>
                </div>
                <div class="rightButton clear" v-show='showOutbountStatusBtn'>
                    外呼状态:
                    <el-select v-model="outBountStatus" placeholder="请选择" style="width:225px;" @focus="getOutboundList">
                            <el-option :label="item.sysname" :value="item.sysconid" v-for='(item,index) in outboundList' :key='index'></el-option>

                    </el-select>
                    <el-button type="primary" class='outBoundStatusBtn' style="" @click='outBoundStatusSave' v-if="showOutbountStatusBtn">确定</el-button>
                </div>
          </div>
      </div>
      <div class="contentData">
          <div class="dataTable clear">
             <el-table
                fixed
                max-height='600'
                :data="tableData"
                border
                style="width: 100%"
                @selection-change="handleSelectionChange"
                >
                 <el-table-column
                    type="selection"
                    width="55"
                    align='center'
                    >
                  </el-table-column>
                  <el-table-column
                    width="100"
                    prop="checkId"
                    label="核查单编号"
                    align='center'
                  >
                  </el-table-column>
                  <el-table-column
                    width="130"
                    prop="outCallStatus"
                    label="外呼状态"
                    align='center'
                    >
                  </el-table-column>
                  <el-table-column
                    width="130"
                    prop="product"
                    label="产品"
                    align='center'
                    >
                  </el-table-column>
                  <el-table-column
                    width="130"
                    prop="merchantId"
                    label="商户编号"
                    align='center'
                    >
                  </el-table-column>
                  <el-table-column
                    width="130"
                    prop="merchantName"
                    label="商户名称"
                    align='center'
                   >
                  </el-table-column>
                  <el-table-column
                    width="130"
                    prop="merchantSignName"
                    label="商户签约名称"
                    align='center'
                   >
                  </el-table-column>
                  <el-table-column
                    width="130"
                    prop="merchantOrder"
                    label="商户订单号"
                    align='center'
                   >
                  </el-table-column>
                  <el-table-column
                    width="130"
                    prop="bankCardNum"
                    label="银行卡号"
                    align='center'>
                    <template slot-scope="scope">
                      <el-popover trigger="hover" placement="top">
                      {{ scope.row.bankCardNum }}
                      <div slot="reference">
                      {{ scope.row._bankCardNum }}
                      </div>
                      </el-popover>
                    </template>
                  </el-table-column>
                  <el-table-column
                    width="130"
                    prop="bankName"
                    label="银行名称"
                    align='center'
                   >
                  </el-table-column>
                  <el-table-column
                    width="130"
                    prop="cardholderPhone"
                    label="持卡人手机号"
                    align='center'>
                    <template slot-scope="scope">
                      <el-popover trigger="hover" placement="top">
                      {{ scope.row.cardholderPhone }}
                      <div slot="reference">
                      {{ scope.row._cardholderPhone }}
                      </div>
                      </el-popover>
                    </template>
                  </el-table-column>
                  <el-table-column
                    width="130"
                    prop="idCard"
                    label="身份证号"
                    align='center'>
                    <template slot-scope="scope">
                      <el-popover trigger="hover" placement="top">
                      {{ scope.row.idCard }}
                      <div slot="reference">
                      {{ scope.row._idCard }}
                      </div>
                      </el-popover>
                    </template>
                  </el-table-column>
                  <el-table-column
                    width="130"
                    prop="money"
                    label="金额（元）"
                    align='center'
                   >
                  </el-table-column>
                  <el-table-column
                    width="130"
                    prop="scenesCode"
                    label="规则编码"
                    align='center'
                   >
                  </el-table-column>
                  <el-table-column
                    width="130"
                    prop="riskValue"
                    label="风险值"
                    align='center'
                   >
                  </el-table-column>
                  <el-table-column
                    width="130"
                    prop="riskLevel"
                    label="风险等级"
                    align='center'
                   >
                  </el-table-column>
                  <el-table-column
                    width="130"
                    prop="checkStatus"
                    label="核查状态"
                    align='center'
                   >
                  </el-table-column>
                  <!-- <el-table-column
                    width="130"
                    prop=""
                    label="处理结果"
                    align='center'
                   >
                  </el-table-column> -->
                  <el-table-column
                    width="130"
                    prop="remark"
                    label="备注"
                    align='center'
                   >
                  </el-table-column>
                  <el-table-column
                    width="130"
                    prop="processStaff"
                    label="处理人员"
                    align='center'
                   >
                  </el-table-column>
                  <el-table-column
                    width="130"
                    prop="operationTime"
                    label="操作时间"
                    align='center'
                   >
                  </el-table-column>
                  <el-table-column
                    width="130"
                    prop="transactionTime"
                    label="交易时间"
                    align='center'
                   >
                  </el-table-column>
                  <el-table-column
                    width="130"
                    prop="transactionStatus"
                    label="交易状态"
                    align='center'
                   >
                  </el-table-column>
                  <el-table-column
                    width="130"
                    prop="serviceStatus"
                    label="服务状态"
                    align='center'
                   >
                  </el-table-column>
                  <el-table-column
                    width="130"
                    prop="authenticationResult"
                    label="鉴权结果"
                    align='center'
                   >
                  </el-table-column>
                  <el-table-column
                    width="130"
                    prop="businessLine"
                    label="业务线"
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
                    :total = totalSize
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-sizes="[10,20,30,40]"
                    :page-size=pageSize>

                  </el-pagination>
              </div>
          </div>
          <el-dialog title="备注" :visible.sync="remarkDialog" width="400px" v-dialogDrag>
              <el-input type="textarea" v-model="remarkText" class='textareaBox' style='border-radius:0' :rows='4' placeholder="请输入备注"></el-input>
              <span slot="footer" class="dialog-footer">
                <el-button @click="remarkDialog = false">取消</el-button>
                <el-button type="primary" @click='remarkSave'>确认</el-button>
              </span>
          </el-dialog>

          <el-dialog title="分配" :visible.sync="allotDialog" width="30%" >
              <div style="width: 270px;margin: 0 auto;padding: 10px 0px 20px 0px;">
              <label>分配至</label>
              <el-select v-model="allotDialogVal" placeholder="请选择" @focus="getProcessStaffList">
                <el-option :label="item.userName" :value="item.userId" v-for='(item,index) in processStaffList' :key='index'></el-option>
              </el-select>
              </div>
              <span slot="footer" class="dialog-footer">
              <el-button @click="allotDialog = false">取 消</el-button>
              <el-button type="primary" @click="allotSave">确 定</el-button>
              </span>
          </el-dialog>
          <el-dialog title="提示" :visible.sync="editOutBoundDialog" width="30%" >
              <div style='width:100%;text-align:center'>
                <p><i class='el-icon-warning' style='color:#F1F2F5;font-size:25px;'></i></p>
                <p>确认修改已选核查单的外呼状态为：{{str}}</p>
              </div>
              <span slot="footer" class="dialog-footer">
              <el-button @click="editOutBoundDialog = false">取 消</el-button>
              <el-button type="primary" @click="editOutBoundSave">确 定</el-button>
              </span>
          </el-dialog>
      </div>
  </div>
</template>
<script >
import qs from 'qs'
import {idCard, phone, card} from '../utils/index.js'
export default {
    name:'当天未处理报警',
    data() {
      return {

        showToggleSwich:false,
        showCallBtn:false,
        showNewCaseBtn:false,
        showRemarkBtn:false,
        showAllotBtn:false,
        showOutbountStatusBtn:false,
        confirmPermission:false,

        editOutBoundDialog:false,
        currentPage:1,
        tableData:[],
        remarkDialog:false,
        remarkText:'',
        allotDialog:false,
        options:[{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }],
        allotDialogVal:'',
        checkItem:[],
        pageNum:1,
        pageSize:10,
        totalSize:0,
        processStaffList:[],
        outboundList:[],
        outBountStatus:'',
        checkList:[],
        str:'',
        arr:[]
      }
    },
    created() {
      // 按钮权限
      const idList = JSON.parse(localStorage.getItem('ARRLEVEL'));
      this.switchPermission = idList.indexOf(112) === -1 ? false : true;
      this.confirmPermission = idList.indexOf(108) === -1 ? false : true;
      this.alarmPermission = idList.indexOf(107) === -1 ? false : true;
      this.casePermission = idList.indexOf(109) === -1 ? false : true;
      this.remarkPermission = idList.indexOf(110) === -1 ? false : true;
      this.distributePermission = idList.indexOf(111) === -1 ? false : true;
    },
    mounted(){
      this.getListAlarm()
      var onOff = document.getElementById("onOff");
      if (localStorage.getItem('STATUS') && localStorage.getItem('STATUS') == 1) {
          onOff.className = 'onOff';
      } else {
          onOff.className = 'offOn';
      }
    },
    methods: {
      generateCase(){
          // window.open('http://127.0.0.1:8080/#/newcase')
        if(this.checkItem.length === 0){
          this.$alert('请选择需要处理的数据','系统提示',{
            confirmButtonText: '确定',
            type:'warning',
            callback:action => {

            }
          })
          return
        }
        console.log(this.checkList[0].merchantOrder)
        localStorage.setItem('MERID',this.checkList[0].merchantOrder)
        // window.open('http://10.151.30.148:8080/business-view/#/newcase?from=' + 1)
        window.open(window.location.href.split('#')[0] +'#/newcase?from=' + 1)
      },
      handleSizeChange(e) {
        console.log(`每页 ${e.target.value} 条`);
        this.pageSize = parseInt(e.target.value)
        this.getListAlarm()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.pageNum = val
        this.getListAlarm()
      },
      allotDialogClick(){
        if(this.checkItem.length === 0){
          this.$alert('请选择需要处理的数据','系统提示',{
            confirmButtonText: '确定',
            type:'warning',
            callback:action => {

            }
          })
          return
        }
        this.allotDialog = true
      },
      remarkDialogClick(){
        if(this.checkItem.length === 0){
          this.$alert('请选择需要处理的数据','系统提示',{
            confirmButtonText: '确定',
            type:'warning',
            callback:action => {

            }
          })
          return
        }
        this.remarkDialog = true
      },
      toggleOnOff(){

          var statusCode = localStorage.getItem('STATUS') == 0 ? 1 : 0;
          this.updateStatus(statusCode)

          // var onOff = document.getElementById("onOff");
          // if(onOff.className == "onOff"){
          //     onOff.classList.remove("onOff")
          //     onOff.classList.add("offOn")

              // if(onOff.className === 'offOn'){
              //   //console.log('关')
              //   this.$alert('预警分配关','系统提示',{
              //     // showClose:false,
              //     confirmButtonText: '确定',
              //     // center:true,
              //     // closeOnClickModal:true,
              //     callback:action => {

              //     }
              //   })
              // }
          // }else{
          //     onOff.classList.remove("offOn")
          //     onOff.classList.add("onOff")
              // if(onOff.className == 'onOff'){
              //   //console.log('开')
              //    this.$alert('预警分配开','系统提示',{
              //     // showClose:false,
              //     confirmButtonText: '确定',
              //     // center:true,
              //     // closeOnClickModal:true,
              //     callback:action => {

              //     }

              //   })
              // }
          // }
      },
      // 预警分配开关
      updateStatus(statusCode) {
          var onOff = document.getElementById("onOff");

          this.$axios.post('/OnlineChecklistController/updateStatus', qs.stringify({
              userId: localStorage.getItem('USERID'),
              status: statusCode
          })).then(res => {
              if (res.data.code == 1) {
                  localStorage.setItem('STATUS', res.data.status)
                  onOff.className = (onOff.className == 'offOn') ? 'onOff' : 'offOn'
                  this.$alert(res.data.message, '系统提示', {
                      confirmButtonText: '确定'
                  })
              }
          });
      },
      getStatus() {
          this.$axios.post('/OnlineChecklistController/initUserStatus', qs.stringify({
              userId: localStorage.getItem('USERID'),
              status: localStorage.getItem('STATUS') || 0
          })).then(res => {
              if (res.data.code === 1) {
                  localStorage.setItem('STATUS', res.data.status)
              }
          });
      },
      confirmRisk(){

      },
      // 备注
      remarkSave(){
        console.log(this.remarkText)
        console.log(this.checkItem)
        this.$axios.post('/OnlineChecklistController/updateRemark',qs.stringify({
          'sessionId':localStorage.getItem('SID'),
          'id':this.checkItem[0],
          'remark':this.remarkText
        }))
        .then(res => {
          console.log(res.data)
          if(res.data.code === 1){
            this.$alert(res.data.message, '系统提示', {
              confirmButtonText:'确定',
              type:'success',
              callback:action => {
                this.remarkDialog = false
                this.remarkText = ''
                this.getListAlarm()
              }
            })
          }else if(res.data.code !== 1){
              this.$alert(res.data.message, '系统提示', {
                confirmButtonText:'确定',
                type:'warning',
                callback:action => {

                }
              })
          }
        })
        .catch(error => {
          console.log(error)
        })
      },
      // 分配
      allotSave(){
        console.log(this.allotDialogVal)
        this.$axios.post('/OnlineChecklistController/distribution',qs.stringify({
          'sessionId':localStorage.getItem('SID'),
          'ids':this.checkItem.join(','),
          'userId':this.allotDialogVal
        }))
        .then(res => {
          console.log(res.data)
          if(res.data.code === 1){
            this.$alert(res.data.message, '系统提示', {
              confirmButtonText:'确定',
              type:'success',
              callback:action => {
                this.allotDialogVal = ''
                this.allotDialog = false
                this.getListAlarm()
              }
            })
          }else if(res.data.code !== 1){
            this.$alert(res.data.message, '系统提示', {
              confirmButtonText:'确定',
              type:'warning',
              callback:action => {

              }
            })
          }
        })
        .catch(error => {
          console.log(error)
        })
      },
      // 暂停/启动
      pauseStart(){
        let pause = document.querySelector('#pause')
        //console.log(pause.className)
        if(pause.className === 'ztbj'){
          pause.classList.remove('ztbj')
          pause.classList.add('pause')
            this.$alert('报警已暂停','系统提示',{
              showClose:false,
              confirmButtonText: '确定',
              type:'success',
              callback:action => {

              }

            })
        }else{
          pause.classList.remove('pause')
          pause.classList.add('ztbj')
            this.$alert('报警已开启','系统提示',{
              showClose:false,
              confirmButtonText: '确定',
              type:'success',
              callback:action => {

              }

            })
        }
      },
      getListAlarm(){

        this.$axios.post('/OnlineChecklistController/unhandledAlarm',qs.stringify({
          'sessionId':localStorage.getItem('SID'),
          'userId':localStorage.getItem('USERID'),
          'pageNum':this.pageNum,
          'pageSize':this.pageSize
        }))
        .then(res => {
          if(res.data.recordList && res.data.recordList.length > 0){
              res.data.recordList.forEach(ele => {
                  ele._idCard = idCard(ele.idCard)
                  ele._cardholderPhone = phone(ele.cardholderPhone)
                  ele._bankCardNum = card(ele.bankCardNum)
              });
              this.tableData = []
              this.tableData = res.data.recordList
              this.totalSize = res.data.totalSize
          }
        })
      },
      handleSelectionChange(val){
        this.checkList = val
        this.checkItem = []
        this.arr = []
        console.log(val)
        val.forEach(ele => {
            ele.offline_merchantId = ''
            ele.offline_terminalIdBl = ''
            ele.offline_corporateName = ''
            ele.offline_corporateNo = ''
            ele.offline_settlementAcct = ''
            ele.offline_settlementAcctName = ''
            ele.offline_businessId = ''
            ele.offline_merchantGuid = ''
            ele.online_imeiBl = ''
            ele.online_terminalIdBl = ''
            ele.online_loginNameBl = localStorage.getItem('testName')
            ele.online_userIpBl = ''
            ele.online_userPhoneBl = ele.cardholderPhone
            ele.online_idNoBl = ele.idCard
            ele.online_referBl = ''
            ele.online_bankCardNoBl = ele.bankCardNum
          this.arr.push(ele)
          this.checkItem.push(ele.id)
        });
        console.log(this.checkItem)
      },
      // 获取处理人员
      getProcessStaffList(){
        this.$axios.get('/OnlineChecklistController/queryProcessStaff?sessionId=' + localStorage.getItem('SID'))
        .then(res => {
          console.log(res.data)
          this.processStaffList = []
          this.processStaffList = this.processStaffList.concat(res.data.recordList)
        })
        .catch(error => {
          console.log(error)
        })
      },
      // 获取外呼状态
      getOutboundList(){
          this.$axios.post('/SysConfigController/queryEnum',qs.stringify({
              'sessionId':localStorage.getItem('SID'),
              'type':85
          }))
          .then(res => {
              this.outboundList = []
              this.outboundList = this.outboundList.concat(res.data)

          })
      },
      editOutBoundSave(){
              let buttonType = ''
              let type = ''
              console.log(this.callStateTtitle)
              if(this.callStateTtitle == 701){
                  buttonType = 'check_detail_white'
                  type = ''
              }else if(this.callStateTtitle == 702 || this.callStateTtitle == 703 || this.callStateTtitle == 706){
                  buttonType = 'check_detail_grey'
                  type = 'gray'
              }else if(this.callStateTtitle == 704 || this.callStateTtitle == 705){
                  buttonType = 'check_detail_black'
                  type = 'black'
              }
            this.$axios.post('/OnlineChecklistController/updateOutCallStatus',qs.stringify({
                'sessionId':localStorage.getItem('SID'),
                'ids':this.checkItem.join(','), // *需要多选
                'outCallStatus':this.outBountStatus,
                'source':'753',
                'type':type,
                'bizLine':'online',
                'comments':'',
                'buttonType':buttonType,
                'data': JSON.stringify(this.arr),
                'loginPerson':localStorage.getItem('testName')
            }))
            .then(res => {
                if(res.data.code === 1){
                    this.$alert(res.data.message, '系统提示', {
                        confirmButtonText: '确定',
                        type:'success',
                        callback:action => {
                            this.getListAlarm()
                            this.editOutBoundDialog = false
                            this.outBountStatus = ''
                        }
                    });
                }else if(res.data.code !== 1){
                  this.$alert(res.data.message, '系统提示', {
                    confirmButtonText:'确定',
                    type:'warning'
                  })
                }

            })
            .catch(error => {
                console.log(error)
            })
      },
      outBoundStatusSave(){
        if(this.checkItem.length === 0){
          this.$alert('请选择需要处理的数据','提示',{
            confirmButtonText:'确定',
            type:'warning',
            callback:action => {

            }
          })
          return
        }
        if(this.outBountStatus === ''){
          return
        }
        let str = ''
        console.log(this.outBountStatus)
        this.outboundList.forEach(ele => {
          if(ele.sysconid === this.outBountStatus){
            this.str = ele.sysname
          }
        })

        this.editOutBoundDialog = true

      },
       //权限
      queryAuthList(){
          // 按钮权限
        const idList = JSON.parse(localStorage.getItem('ARRLEVEL'));
        this.showToggleSwich = idList.indexOf(112) === -1 ? false : true
        this.showOutbountStatusBtn = idList.indexOf(108) === -1 ? false : true
        this.showNewCaseBtn = idList.indexOf(109) === -1 ? false : true
        this.showRemarkBtn = idList.indexOf(110) === -1 ? false : true
        this.showAllotBtn = idList.indexOf(112) === -1 ? false : true
        this.showCallBtn = idList.indexOf(107) === -1 ? false : true

      }
    },
    created(){
      this.queryAuthList()
    },

    watch:{
      remarkDialog(){
        if(this.remarkDialog == false){
          this.remarkText = ''
        }
      }
    }
  }
</script>
<style scoped>
.onOff{
    width: 50px;
    height: 26px;
    cursor: pointer;
    background: url(../../images/on.png) no-repeat;
    display: inline-block;
    margin-left: 15px;
    vertical-align: middle;


}
.offOn{
    width: 50px;
    height: 26px;
    cursor: pointer;
    background: url(../../images/off.png) no-repeat;
    display: inline-block;
    margin-left: 15px;
    vertical-align: middle;
}
.onf{
    display: inline-block;
    margin-left: 80px;
    font-size: 13px;
    color: #333333;
    padding-top:28px;

}
.dialog-footer{background-color: #F1F2F5;border: none}
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
  height: 36px;
  margin-right: 40px;
  margin-left: 10px;
  border-radius: 15px;
}
.contentTop {
  padding: 30px;
  padding-left: 80px;
  border-bottom: 1px solid #e0e0e0;
  border-top:1px solid #e0e0e0;
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
  background-color: #fff;border-right: 10px solid #ffffff;
}
.ztbj {
  background: url(../../images/ztbj.png);
  width: 44px;
  height: 30px;
  margin: 0 auto;
}
.ztbj:hover {
  background: url(../../images/ztbjH.png);
  width: 44px;
  height: 30px;
  margin: 0 auto;
}
.wfx {
  background: url(../../images/wfx.png);
  width: 44px;
  height: 30px;
  margin: 0 auto;
}
.wfx:hover {
  background: url(../../images/wfxH.png);
  width: 44px;
  height: 30px;
  margin: 0 auto;
}
.scaj {
  background: url(../../images/scaj.png);
  width: 44px;
  height: 30px;
  margin: 0 auto;
}
.scaj:hover {
  background: url(../../images/scajH.png);
  width: 44px;
  height: 30px;
  margin: 0 auto;
}
.icon2 {
  background: url(../../images/icon2.png);
  width: 44px;
  height: 30px;
  margin: 0 auto;
}
.icon2:hover {
  background: url(../../images/icon2-2.png);
  width: 44px;
  height: 30px;
  margin: 0 auto;
}
.icon3 {
  background: url(../../images/icon3.png);
  width: 44px;
  height: 30px;
  margin: 0 auto;
}
.icon3:hover {
  background: url(../../images/icon3-2.png);
  width: 44px;
  height: 30px;
  margin: 0 auto;
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
    height: 36px;
    line-height: 36px;
    outline: none;
    padding-left: 15px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 60%;
    padding-right: 10px;
}
input:focus{
    border: 1px solid #3FAAF9;
}
.iptOnline{
  margin-right:15px;
  height: 36px;
  line-height: 36px;
  width: 200px;

}
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
.textareaBox{
    border-radius: 0;
    width: 94%;
    height: 100px;
    margin-left: 3%;
}
.allotDialogText{margin-left:15px;}
.pause{
  background: url(../../images/start.png) no-repeat;
  width: 44px;
  height: 30px;
  margin: 0 auto;
}
.pause:hover{
  background: url(../../images/start_active.png) no-repeat;
  width: 44px;
  height: 30px;
  margin: 0 auto;
}
.rightButton{float:right;margin-right:2%}
.outBoundStatusBtn{margin-left:15px;}
</style>
