<!--商户核查单管理是  谁-->
<template>
    <div id="cuschecklist"  @click="allarea($event)">
        <div class="searchBasic">
            <el-collapse-transition>
                <div class="searchContentgray" id="searchContentgray">
                    <div class="leftContent" >
                        <el-form ref="form" :model="form" label-width="150px" :rules="rules" class="demo-ruleForm">
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
                                <el-form-item label="商户唯一标识:" prop="merchantOnlyId">
                                     <el-input v-model="form.merchantOnlyId" placeholder="请输入" ></el-input>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="商户编号:" prop="merchantNo">
                                     <el-input v-model="form.merchantNo" placeholder="请输入" ></el-input>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="商户签约名:" prop="merchantContractName">
                                    <el-input v-model="form.merchantContractName" placeholder="请输入" ></el-input>
                                </el-form-item>
                            </div>
                             <div class="formConClass">
                                <el-form-item label="商户KYC:" prop="kycCognizance">
                                    <!-- 多选框 -->
                                    <KycCheckbox :select="select"
                                        @selectedChange="selectedChange">
                                    </KycCheckbox>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="案件来源:" prop="caseSource">
                                    <el-select v-model="form.caseSource" placeholder="请选择" >
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
                                <el-form-item label="案件号:" prop="caseNumber">
                                    <el-input v-model="form.caseNumber" placeholder="请输入" ></el-input>
                                </el-form-item>
                            </div>
                             <div class="formConClass">
                                <el-form-item label="风险处理:" prop="dealStatus">  
                                    <el-select v-model="form.dealStatus" placeholder="请选择" >
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
                        </el-form>
                    </div>
                    <div class="rightContent" v-show="!seniorSearchToggle">
                        <el-button type="primary" v-show="authsearch1" class="serchbtn" icon="el-icon-search" @click='listQuery("/case/getAll","case",false)' v-if='btnPower.searchBtn'>查询</el-button>
                        <el-button type="primary" v-show="authreset1" class="serchbtn" icon="el-icon-refresh" @click='reset("case")' v-if='btnPower.resetBtn'>重置</el-button>
                    </div>
                </div>
            </el-collapse-transition>
        </div>
        <div class="seniorSearch">
            <div class="title2">
                <i class="el-icon-arrow-down toggleIcon" @click="seniorSearchToggle = !seniorSearchToggle"></i>
                <span>高级查询</span>
            </div>
            <el-collapse-transition>
                <div class="seniorSearchContent activeToggle" v-show="seniorSearchToggle"> 
                    <div class="leftContent" >
                        <el-form ref="formSenior" :model="formSenior" label-width="134px" :rules="rules" class="demo-ruleForm">
                             
                            <div class="formConClass">
                                <el-form-item label="代理商编号:" prop="agentNo">
                                    <el-input v-model="formSenior.agentNo" placeholder="请输入" ></el-input>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="代理商名称:" prop="agentName">
                                    <el-input v-model="formSenior.agentName" placeholder="请输入" ></el-input>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="行业业绩属性:" prop="achievementProperty">  
                                    <el-select v-model="formSenior.achievementProperty" placeholder="请选择" >
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
                                <el-form-item label="商户自然属性一级:" prop="naturalPropertyOne">
                                    <el-select v-model="formSenior.naturalPropertyOne" placeholder="请选择" >
                                        <el-option label="全部" value="all"></el-option>
                                        <el-option
                                            v-for="item in onepropertySelect"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                              <div class="formConClass">
                                <el-form-item label="销售:" prop="sale">
                                    <el-input v-model="formSenior.sale" placeholder="请输入" ></el-input>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="分公司:" prop="subCompany">
                                    <el-input v-model="formSenior.subCompany" placeholder="请输入" ></el-input>
                                </el-form-item>
                            </div>
                        </el-form>
                    </div>
                    <div class="rightContent1" v-show="seniorSearchToggle">
                        <el-button type="primary" v-show="authsearch2" class="serchbtn" icon="el-icon-search" @click='listQuery("/case/getAll","case",false)' v-if='btnPower.Hsearch'>查询</el-button>
                        <el-button type="primary" v-show="authreset2" class="serchbtn" icon="el-icon-refresh" @click='reset("case")' v-if='btnPower.resetBtn'>重置</el-button>
                    </div>
                </div>
            </el-collapse-transition>
        </div>
        <div class="tableData">
            
            <div class="contentBotoom clear">
                <div class="button fl">
                    <div class="leftButton clear ">
                        <div class="BotoomBtn leftRadius" v-show="btnPower.deleteBtn" title="删除" @click="delresult">
                            <div class="sc"></div>
                        </div>
                        <div class="BotoomBtn rightRadius" v-show="btnPower.downList" title="下载" @click="downloadOffLine=true">
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
                        label="生成日期"
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
                     v-if="tableDataSec.merchantOnlyId[0]"
                        prop="merchantOnlyId"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        label="商户唯一标识"
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
                     v-if="tableDataSec.kycCognizance[0]"
                        prop="kycCognizance"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        label="商户KYC"
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
                     v-if="tableDataSec.merchantNetTime[0]"
                        prop="merchantNetTime"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        label="商户入网日期"
                        width="150">
                    </el-table-column>
                    <el-table-column
                     v-if="tableDataSec.agentNo[0]"
                        prop="agentNo"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        label="代理商编号"
                        width="150">
                    </el-table-column>
                     <el-table-column
                     v-if="tableDataSec.agentName[0]"
                        prop="agentName"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        label="代理商名称"
                        width="150">
                    </el-table-column>
                    <el-table-column
                     v-if="tableDataSec.achievementProperty[0]"
                        prop="achievementProperty"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        label="行业业绩属性"
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
                <div class='paginationRight'>
                   <el-pagination
                    layout="total,prev, pager, next"
                    :page-sizes="[20]"
                    :page-size="Number(currenteveryno)"
                    :total=length
                    @current-change="handleCurrentChange">
                   </el-pagination>
                   
                </div>
            </div>
        </div>
         
        <el-dialog title="核查单下载：分页选择下载" :visible.sync="downloadOffLine" width="30%" >
            <div style="text-align: center; margin-bottom:20px;">选择下载从<input type="number" v-model="loadStartNum" min="1" class="downClass" >到<input type="number" min="1"  class="downClass" v-model="loadEndNum" >页的数据</div>
            <h4 style="text-align: center">当前共<span>{{totalSize}}</span>页</h4>
            <span slot="footer" class="dialog-footer">
            <el-button @click="downloadOffLineClose">取 消</el-button>
            <el-button type="primary" @click="uploadList">下 载</el-button>
            </span>
        </el-dialog>
         <!-- 表格每列的列选择 注意：每页都需要手动改变top值-->
        <div ref="list" class="list pa none bgccc" style="top:860px;">
          <TableSelect  :tableDataSec="tableDataSec" ></TableSelect>
        </div>
    </div>
</template>
<script>
import qs from 'qs'
// import {DATA_TAG, MERCHANT_COMPLAINT_SATISTICS_ENUM} from '@/constants';
import KycCheckbox from '../zymCommon/kycCheckbox.vue'
import TableSelect from '../tableSelect/tableSelect.vue'
export default {
  name: '商户案件查询',
  data() {
    return {
      authsearch1: false,
      authsearch2: false,
      authreset1: false,
      authreset2: false,
      authcj: false,
      authdownload: false,
      kycshow: false,
      loading: true,
      currenteveryno: 20,
      removeformElementVisible: false, //创建核查单弹框显示与隐藏
      formLabelWidth: '120px',
      merchantnoisok: false,
      uploadDataF: '',
      uploadDataS: '',
      seniorSearchToggle: false,
      serchToggle: true,
      ztstShow: false,
      ztstShowSec: false,
      lsstShow: true,
      tagList: [{ syscode: 'kyc', sysname: '商户KYC' }],
      btnPower: {
        deleteBtn: false,
        searchBtn: false,
        Hsearch: false,
        resetBtn: false,
        downList: false
      },
      lsstTable: [],
      onepropertySelect: [], //商户自然属性一级
      tableDataSec: {
        caseNumber: [true, '案件号'],
        createTime: [true, '生成日期'],
        caseSource: [true, '案件来源'],
        merchantOnlyId: [true, '商户唯一标识'],
        merchantNo: [true, '商户编号'],
        merchantName: [true, '商户名称'],
        contractName: [true, '商户签约名'],
        kycCognizance: [true, '商户KYC'],
        dealStatus: [true, '处理结果'],
        merchantNetTime: [true, '商户入网日期'],
        agentNo: [true, ' 代理商编号 '],
        agentName: [true, '代理商名称'],
        achievementProperty: [true, '行业业绩属性'],
        sale: [true, '销售'],
        subCompany: [true, '分公司'],
        naturalPropertyOne: [true, '商户一级属性'],
        remark: [true, '备注']
      },
      ids: [],
      form: {
        startTime: '',
        endTime: '',
        merchantOnlyId: '',
        merchantNo: '',
        merchantContractName: '',
        caseSource: 'all',
        caseNumber: '',
        dealStatus: 'all',
        kycCognizance: ''
      },
      select: {
        kycCognizance: '全部',
        childTag: [-1]
      },
      totalSize: 0,
      formSenior: {
        agentNo: '',
        agentName: '',
        achievementProperty: 'all',
        naturalPropertyOne: 'all',
        sale: '',
        subCompany: ''
      },
      createform: {
        //创建商户核查单
        merchantNo: '',
        dealStatus: '',
        remark: ''
      },
      ajlyArray: [], //案件来源
      cljgArray: [], //处理结果
      zrsxyjArray: [], //商户自然属性一级
      worktypeArray: [], //商户业绩属性
      hcdlyArray: [], //核查单来源
      rules: {},
      rules2: {
        merchantNo: [
          { required: true, message: '请输入商户编号', trigger: 'blur' }
        ],
        dealStatus: [
          { required: true, message: '请选择处理结果', trigger: 'change' }
        ]
      },
      dealStatus: false,
      dealStatustext: '',
      merchant: false,
      merchanttext: '',
      idList: [], //id列表
      currentPage: 1, // 分页
      pageNumber: 1,
      pageRow: 20,
      length: 0,
      downloadOffLine: false, //下载
      loadStartNum: 1, //下载
      loadEndNum: 1 //下载
    }
  },

  created() {
    this.form.startTime = this.getdiffTime(-7) + ' 00:' + '00:' + '00'
    this.form.endTime = this.getdiffTime(0) + ' 23:' + '59:' + '59'
    // 按钮权限
    const idList = JSON.parse(localStorage.getItem('ARRLEVEL'))
    this.btnPower.searchBtn = idList.indexOf(212) === -1 ? false : true
    this.btnPower.resetBtn = idList.indexOf(214) === -1 ? false : true
    this.btnPower.deleteBtn = idList.indexOf(573) === -1 ? false : true
    this.btnPower.Hsearch = idList.indexOf(213) === -1 ? false : true
    this.btnPower.downList = idList.indexOf(217) === -1 ? false : true
    this.getDeal() //处理结果
    this.getCaseSource() //来源
    this.getIndustryAchievementProperty() //商户业绩归属
    this.getMerchantFirst() //商户自然属性一级
    this.listQuery('/case/getAll', 'case', false)
    this.queryAuthList()
  },
  methods: {
    downloadOffLineClose() {
      this.downloadOffLine = false
      this.loadStartNum = 1
      this.loadEndNum = 1
    },
    uploadList() {
      var self = this
      if (this.loadStartNum == 0 || this.loadEndNum == 0) {
        this.$alert('值必须大于或等于1', '系统提示', {
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      if (
        this.totalSize == 0 ||
        this.loadStartNum > this.totalSize ||
        this.loadEndNum > this.totalSize
      ) {
        this.$alert('值必须小于或等于总页数，且不能为0', '系统提示', {
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      if (parseInt(this.loadStartNum) > parseInt(this.loadEndNum)) {
        this.$alert('起始值需小于结束值', '系统提示', {
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      var para1 = {
        customerSignArr: self.form.customerSignArr,
        customerNumberArr: self.form.customerNumberArr,
        signedname: self.form.signedname,
        KYCCognizance: self.form.KYCCognizance,
        businessCat: self.form.businessCat,
        salesname: self.form.salesname,
        branchname: self.form.branchname,
        productline: self.form.productline,
        customerCredentialLevel: self.form.customerCredentialLevel,
        pageRow: self.pageRow,
        agentcode: self.form.agentcode,
        startNum: self.loadStartNum,
        endNum: self.loadEndNum,
        endPage: self.totalSize
      }
      this.$axios
        .post(
          '/CustomerInfoController/checkDownloadCustomerList',
          qs.stringify(para1)
        )
        .then(res => {
          var response = res.data
          if (response.code == '200') {
            var para = {
              customerSignArr: self.form.customerSignArr,
              customerNumberArr: self.form.customerNumberArr,
              signedname: self.form.signedname,
              KYCCognizance: self.form.KYCCognizance,
              businessCat: self.form.businessCat,
              salesname: self.form.salesname,
              branchname: self.form.branchname,
              productline: self.form.productline,
              customerCredentialLevel: self.form.customerCredentialLevel,
              agentcode: self.form.agentcode,
              startRow: response.data.startRow,
              sumRow: response.data.sumRow
            }
            window.location = self.url + '/case/downLoad?' + qs.stringify(para)
            this.downloadOffLine = false
          }
        })
    },

    isDealStatusError() {
      if (
        this.createform.dealStatus == '请选择' ||
        this.createform.dealStatus == ''
      ) {
        this.dealStatus = true
        this.dealStatustext = '请选择处理结果'
        return false
      } else {
        this.dealStatus = false
        return true
      }
    },
    addForm(formName, params, hiddenElement) {
      /*
          formName: 表单id  string
          params: 传入参数  {}
          hiddenElement: 控制表单显示的数据  string
        */
      var flag = this.isDealStatusError() //判断处理结果
      if (!this.merchantnoisok) {
        this.merchant = true
        this.merchanttext = '请输入商户编号'
      }
      if (flag && this.merchantnoisok) {
        this[hiddenElement] = false
        params.sessionId = localStorage.getItem('SID')
          ? localStorage.getItem('SID')
          : ''
        this.$axios.post('/case/add', qs.stringify(params)).then(res => {
          var response = res.data
          if (response.code == '200') {
            this.createform = {
              //创建商户核查单
              merchantNo: '',
              dealStatus: '请选择',
              label: ''
            }
            this.successTip(response.msg)
            this.listQuery('/case/getAll', 'case', false)
          } else {
            this.failTip(response.msg)
          }
        })
      }
    },
    delresult(params) {
      var self = this
      if (self.idList.length < 1) {
        this.atleastOne()
        return false
      }
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function(item) {
          if (item == 'confirm') {
            params.id = self.idList.join(',')
            self.$axios.post('/case/delete', qs.stringify(params)).then(res => {
              var response = res.data
              if (response.code == '200') {
                self.listQuery('/case/getAll', 'case')
                self.$message({
                  //成功弹框
                  showClose: true,
                  message: '删除成功',
                  type: 'success'
                })
              } else {
                this.$message.error({ message: response.msg, center: true })
              }
            })
          }
        }
      })
    },
    handleCurrentChange(val) {
      //处理当前页
      this.pageNumber = `${val}` //当前页
      this.listQuery('/case/getAll', 'case', false, val)
    },
    queryAuthList() {
      //权限管理
      var self = this
      var arr = localStorage.getItem('ARRLEVEL')
        ? localStorage.getItem('ARRLEVEL')
        : []
      JSON.parse(arr).map(function(ele) {
        switch (ele) {
          case 212:
            self.authsearch1 = true
            break
          case 214:
            self.authreset1 = true
            self.authreset2 = true
            break
          case 213:
            self.authsearch2 = true
            break
          case 215:
            self.authcj = true
            break
          case 217:
            self.authdownload = true
            break
        }
      })
    },
    getDeal() {
      // 处理结果
      var param = this.addSessionId({})
      this.$axios.post('/param/getDeal', qs.stringify(param)).then(res => {
        var response = res.data
        if (response.code == '200') {
          this.cljgArray = response.data.returnList
        } else {
          this.$message.error({ message: response.msg, center: true })
        }
      })
    },
    getCaseSource() {
      // 案件来源
      var param = this.addSessionId({})
      this.$axios
        .post('/param/getCaseSource', qs.stringify(param))
        .then(res => {
          var response = res.data
          if (response.code == '200') {
            this.ajlyArray = response.data.returnList
          } else {
            this.$message.error({ message: response.msg, center: true })
          }
        })
    },
    importeBtn() {
      //点击取消
      this.importe = false
      this.fileData = ''
      this.file = ''
    }
  },
  components: {
    TableSelect,
    KycCheckbox
  }
}
</script>
<style lang="less" scoped>
.errorbox {
  color: #f56c6c;
  font-size: 12px;
  line-height: 1;
  padding-top: 4px;
  position: absolute;
  top: 100%;
  left: 0;
}
.ztstlist {
  margin-top: -20px;
  .checkbox {
    padding: 12px 20px 12px 14px;
    border-left: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    float: left;
  }
  .text {
    width: 129px;
    border-left: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    padding: 12px 10px;
    float: left;
    white-space: nowrap;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
  }
}
.checkbox {
  padding: 12px 14px;
}
.iconbox {
  right: 13%;
  .blue {
    color: #3faaf9;
    font-weight: 800;
  }
}
.importData {
  line-height: 30px;
}

.onf {
  display: inline;
  margin-left: 45px;
  font-size: 14px;
  color: #606266;
}
.lsst {
  margin-top: 15px;
  width: 84px;
  height: 26px;
  cursor: pointer;
  background: url(../../images/lsst.png) no-repeat;
  display: inline-block;
  margin-left: 15px;
}

.tableData {
  width: 100%;
  height: auto;
  border-top: 1px solid #e0e0e0;
}
.clear {
  clear: both;
}
.title {
  height: 50px;
  line-height: 50px;
  padding-left: 27px;
  font-size: 14px;
  color: #333333;
  box-shadow: 0 1px 4px 1px rgba(0, 0, 0, 0.09);
}
.title2 {
  height: 34px;
  line-height: 34px;
  padding-left: 27px;
  font-size: 14px;
  color: #333333;
  box-shadow: 0 1px 4px 1px rgba(0, 0, 0, 0.09);
}
.searchContentgray,
.seniorSearchContent {
  height: auto;
  /* line-height: 76px; */
  padding-left: 3%;
  padding-top: 8px;
  padding-bottom: 6px;
  -webkit-transition: all 1s;
  transition: all 1s;
}
.leftContent {
  width: 80%;
  height: auto;
  display: inline-block;
}

.rightContent1 {
  color: white;
  display: inline-block;
  vertical-align: top;
  margin-top: 10px;
  /*width: 18%;
    height: 118px;
    float: right;*/
}
.formConClass {
  display: inline-block;
  width: 32%;
}
.serchbtn {
  width: 100px;
  height: 36px;
  margin-bottom: 15px;
  margin-left: 10px;
  margin-left: 30%;
  display: block;
}
.contentBotoom {
  height: 44px;
  font-size: 13px;
  padding-top: 14px;
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

.serch {
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
.fontC {
  color: #3dc6b2;
  cursor: pointer;
  line-height: 17px;
}
</style>
