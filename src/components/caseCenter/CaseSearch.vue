<template>
  <!--案件查询-->
  <div>
        <div class="searchBasic">
            <div class="title" @click="serchToggleC" style="cursor:pointer">
                <i class="el-icon-arrow-down toggleIcon" id="ordinarySerch"></i>
                <span>基础查询</span>
            </div>
            <el-collapse-transition>
                <div class="searchContentgray" id="searchContentgray" v-show="serchToggle">
                    <div class="leftContent" >
                        <el-form ref="form" :model="form" label-width="100px" :rules="rules" class="demo-ruleForm">
                            <div class="formConClass hideTimeRightIcon">
                                <el-form-item label="案件开始时间:">
                                    <el-date-picker v-model="sCaseTime"
                                    value-format='yyyy-MM-dd HH:mm:ss' type="datetime"
                                    placeholder="选择日期时间" style="width: 90%;max-width:225px;"
                                    id='beginTime'
                                    @focus='beginTimeFocus'
                                    :clearable="false"
                                    :editable="false"
                                    ></el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="formConClass hideTimeRightIcon">
                                <el-form-item label="案件结束时间:">
                                    <el-date-picker v-model="eCaseTime" value-format='yyyy-MM-dd HH:mm:ss'
                                    type="datetime" placeholder="选择日期时间" style="width: 90%;max-width:225px;"
                                    id='endTime' @focus="endTimeFocus"
                                    :clearable="false"
                                    :editable="false"
                                    ></el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="来源:">
                                    <el-select v-model="source" placeholder="请选择" style="width: 90%;max-width:225px;">
                                        <el-option label="全部" value=""></el-option>
                                        <el-option v-for="(item,index5) in sources" :key="index5" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="formConClass hideTimeRightIcon">
                                <el-form-item label="交易开始时间:">
                                    <el-date-picker v-model="sTransactionTime"
                                    value-format='yyyy-MM-dd HH:mm:ss'  type="datetime"
                                    placeholder="选择日期时间" style="width: 90%;max-width:225px;"
                                    id='sTransactionTimeBegin' @focus='sTransactionTimeFocus'
                                    :clearable="false"
                                    :editable="false"
                                    ></el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="formConClass hideTimeRightIcon">
                                <el-form-item label="交易结束时间:">
                                    <el-date-picker v-model="eTransactionTime"
                                    value-format='yyyy-MM-dd HH:mm:ss'  type="datetime"
                                    placeholder="选择日期时间" style="width: 90%;max-width:225px;"
                                    id='eTransactionTimeEnd' @focus="eTransactionTimeFocus"
                                    :clearable="false"
                                    :editable="false"
                                    ></el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="商户订单号:">
                                      <el-input v-model="merchantOrder"  placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="案件类型:">
                                    <el-select v-model="caseType" placeholder="请选择" style="width: 90%;max-width:225px;">
                                        <el-option label="全部" value=""></el-option>
                                        <el-option v-for="(item,index2) in caseTypes" :key="index2" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="被盗银行卡:">
                                    <el-input v-model="stolenCardNumber"  placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="创建人:">
                                    <el-select v-model="created" placeholder="请选择" style="width: 90%;max-width:225px;">
                                       <el-option label="全部" value=""></el-option>
                                       <el-option :label="item.label" :value="item.value" v-for='(item,ind) in create' :key='ind'></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </el-form>
                    </div>
                    <div class="rightContent divserchbtn">
                        <el-button type="primary" class="serchbtn" icon="el-icon-search" style="margin-top: 50px;" @click="getData" v-if='btnPower.searchBtn'><span>查询</span></el-button>
                        <el-button type="primary" class="serchbtn" icon="el-icon-refresh" @click="refresh" v-if="btnPower.resetBtn"><span>重置</span></el-button>
                    </div>
                </div>
            </el-collapse-transition>
        </div>
        <div class="seniorSearch">
            <div class="title" style="cursor:pointer"  @click="seniorSearchToggleC">
                <i class="el-icon-arrow-down toggleIcon" id="advancedSerch"></i>
                <span >高级查询</span>
            </div>
            <el-collapse-transition>
                <div class="seniorSearchContent" v-show="seniorSearchToggle">
                    <div class="leftContent" style='margin-top:10px;'>
                        <el-form ref="form" :model="form" label-width="100px" :rules="rules" class="demo-ruleForm">
                            <div class="formConClass">
                                <el-form-item label="商户编号:">
                                    <el-input v-model="merchantId"  placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="案件号:">
                                    <el-input v-model="id"  placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="受理人员:">
                                    <el-select v-model="acceptedPersonnel" placeholder="请选择" style="width: 90%;max-width:225px;">
                                        <el-option label="全部" value=""></el-option>
                                        <el-option :label="item.label" :value="item.value" v-for='(item,ind) in create' :key='ind'></el-option>
                                        <!-- <el-option :label="item.label" :value="item.value" v-for='(item,ind1) in sousr' :key='ind1'></el-option> -->
                                    </el-select>
                                </el-form-item>
                            </div>
                             <div class="formConClass">
                                <el-form-item label="投诉来源:">
                                    <el-select v-model="somplaintSource" placeholder="请选择" style="width: 90%;max-width:225px;">
                                        <el-option label="全部" value=""></el-option>
                                        <el-option v-for="(item,index1) in sompDate" :key="index1" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="业务线:">
                                    <el-select v-model="businessLine" placeholder="请选择" style="width: 90%;max-width:225px;">
                                        <el-option label="全部" value=""></el-option>
                                        <el-option :label="item.label" :value="item.value" v-for='(item,ind2) in busLine' :key='ind2'></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </el-form>
                    </div>
                    <div class="rightContent1">
                        <el-button type="primary" class="serchbtn" icon="el-icon-search" style="margin-top: 17px;" @click="getList" v-if='btnPower.Hsearch'><span>查询</span></el-button>
                        <el-button type="primary" class="serchbtn" icon="el-icon-refresh" @click="refreshs" v-if='btnPower.resetBtn'><span>重置</span></el-button>
                    </div>
                </div>
            </el-collapse-transition>
        </div>
        <div class="contentBotoom">
            <div class="button">
                <div class="leftButton clear">
                    <div class="BotoomBtn" @click="removeData" title='删除' v-if='btnPower.deleteBtn'>
                        <div class="remouve"></div>
                    </div>
                    <div class="BotoomBtn" @click="dlDetailsOpen" title='下载列表' v-if='btnPower.downList'>
                        <div class="refreshIcon"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="contentData">
            <div class="dataTable clear">
                <el-table
                    fixed
                    max-height="600"
                    :data="tableData"
                    border
                    @selection-change="handleSelectionChange"
                    style="width: 100%"
                    >
                    <el-table-column
                      align='center'
                      v-for='item in tableDataHeader'
                      :type="item.type"
                      :key="item.id"
                      :label="item.label"
                      :prop="item.prop"
                      :formatter="item.formatter"
                      :width="item.width">
                    </el-table-column>
                </el-table>
            </div>
            <div class="block">
              <div class='paginationRight'>
                  <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageNum"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next"
                    :total="totalCount">
                  </el-pagination>
              </div>
            </div>
        </div>
        <!-- <el-dialog title="从Excel导入到案件" :visible.sync="importe" width="570px" >
            <div class="importe ipC"></div><span  class="fontC" style="float:left;margin-right:20px;" @click="downloadModel">下载模板</span>
            <div class="prompt ipC" ></div><span class="fontC" @click="helpTitleClick" style="vertical-align: top;">模板格式要求</span>
            <div style="margin-left: 50px;margin-top: 20px;">
                <span>本地文件：</span><el-input placeholder="点击帮助以查看具体格式要求" class="listValInp" v-model="fileData"></el-input>
                <label class="ui_button" for="filename">选择</label>
                <form enctype="multipart/form-data" id="formsubmit" style="display: inline-block;">
                    <input :value=valueText class="formIpt" type="file" id="filename" style="position:absolute;clip:rect(0 0 0 0);" name="filename" @click='fileChangeClick'  @change='fileChange'>
                </form>
            </div>
            <span slot="footer" class="dialog-footer" style="padding: 20px;">
                <el-button type="primary" @click="upload">导 入</el-button>
                <el-button @click="importeBtn">取 消</el-button>
                    <div class="promptText" v-show="helpTitle">
                        <span style="display: block;text-align: left;margin: 10px 9px;font-size: 13px;">导入格式要求</span>
                        <el-table
                        :data="titleData"
                        border
                        style="width: 100%;text-align:left;">
                        <el-table-column
                            prop="name"
                            label="字段名">
                        </el-table-column>
                        <el-table-column
                            prop="help"
                            label="字段格式要求">
                        </el-table-column>
                        </el-table>
                    </div>
            </span>
        </el-dialog>
        <el-dialog title="分配" :visible.sync="allocation" width="30%" >
            <div style="width: 270px;margin: 0 auto;padding: 10px 0px 20px 0px;">
                <label>分配至</label>
                <el-select v-model="allocationText" placeholder="请选择" @focus="getFp">
                    <el-option v-for="item in this.getFpData"  :key="item.userId" :label="item.userName" :value="item.userId"></el-option>
                </el-select>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="allocation = false">取 消</el-button>
                <el-button type="primary" @click="allocationAdd">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="案件详情：分页选择下载" :visible.sync="download" width="30%">
            <div style="text-align: center; margin-bottom:20px;">选择下载从
                <input type="number" v-model="loadStartNum" min="1" class="downClass" >到
                <input type="number" min="1" :max=totalNum  class="downClass" v-model="loadEndNum" >页的数据
            </div>
            <h4 style="text-align: center">当前共<span>{{totalNum}}</span>页</h4>
            <span slot="footer" class="dialog-footer">
            <el-button @click="downloadClose">取 消</el-button>
            <el-button type="primary" @click="uploadMgt" v-if="this.tableData.length != ''">下 载</el-button>
            </span>
        </el-dialog> -->
        <el-dialog title="案件列表：分页选择下载" :visible.sync="dlDetails" width="30%">
                <div style="text-align: center; margin-bottom:20px;">选择下载从
                    <input type="number" v-model="startNum"  min="0" class="downClass" >到
                    <input type="number" min="0" :max='this.countNoPage'  class="downClass" v-model="endNum" >页的数据
                </div>
                <h4 style="text-align: center">当前共<span>{{this.countNoPage}}</span>页</h4>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dlDetailsClose">取 消</el-button>
            <el-button type="primary" @click="uploadList" v-if="showHideDownloadBtn">下 载</el-button>
            </span>
        </el-dialog>
  </div>
</template>
<script>
import qs from 'qs'
import { card, phone, idCard } from '../utils'

export default {
  data() {
    return {
      createCase: false,
      importCase: false,
      allotBtnShow: false,
      delShowBtn: false,
      countNoPage: 0,
      importShowList: false,
      importShowDetail: false,
      searchShowHide: false,
      showSeniorHide: true,
      viewCaseDetailPermission: true, //双击查看案件详情
      resetPermission: false, //重置
      valueText: '',
      loadEndNum: '',
      loadStartNum: '',
      download: false,
      dlDetails: false,
      showHideDownloadBtn: false,
      totalNum: 0,
      multipleSelection: [],
      allocationText: '',
      allocation: false,
      acceptPersonList: [],
      somplaintSource: [],
      personList: [],
      file: '',
      fileData: '',
      titleData: [
        {
          name: '商户编号',
          help: '必填，文本格式，100字以内'
        },
        {
          name: '商户订单',
          help: '必填，文本格式，100字以内'
        },
        {
          name: '商户和易宝承担金额',
          help: '选填，单位：元'
        },
        {
          name: '易宝实际赔付金额',
          help: '选填，单位：元'
        },
        {
          name: '案件类型',
          help: '必填，枚举：恶意拒付、盗卡交易'
        },
        {
          name: '备注',
          help: '选填，文本格式，字数200字以内'
        }
      ],
      tableDataHeader: [
        { type: 'selection', label: '', width: '50' },
        { prop: 'id', label: '案件号' },
        { prop: 'businessType', label: '业务类型', width: '100' },
        { prop: 'somplaintSource', label: '投诉来源' },
        { prop: 'contact', label: '联络情况' },
        { prop: 'cardNo', label: '被盗银行卡号', width: '150' },
        { prop: 'bankName', label: '发卡行' },
        { prop: 'crdTyp', label: '卡类型' },
        { prop: 'merchantNo', label: '商户编号' },
        { prop: 'signedname', label: '商户签约名', width: '100' },
        { prop: 'merchantOrder', label: '商户订单号', width: '150' },
        { prop: 'transactionTime', label: '交易时间', width: '150' },
        { prop: 'transactionAmount', label: '交易金额' },
        { prop: 'payResult', label: '交易状态' },
        { prop: 'agentcode', label: '代理商编号', width: '100' },
        { prop: 'agentname', label: '代理商名称', width: '100' },
        { prop: 'subCompany', label: '分公司' },
        { prop: 'salesname', label: '销售' },
        { prop: 'usrId', label: '用户ID' },
        { prop: 'prod', label: '产品' },

        { prop: 'actualPaymentMoney', label: '赔付金额' },
        { prop: 'bearTheLoss', label: '损失承担方', width: '100' },
        { prop: 'acceptanceTime', label: '受理日期', width: '150' },
        { prop: 'acceptedPersonnel', label: '受理人员' },

        { prop: 'caseQualitativeResult', label: '案件定性结果', width: '100' },
      ],
      helpTitle: false,
      importe: false,
      ceshi: '',
      tableData: [],
      seniorSearchToggle: false,
      serchToggle: true,
      sCaseTime: '',
      eCaseTime: '',
      caseStatus: '',
      sTransactionTime: '',
      eTransactionTime: '',
      merchantOrder: '',
      caseType: '',
      stolenCardNumber: '',
      created: '',
      merchantId: '',
      id: '',
      source: '',
      acceptedPersonnel: '',
      businessLine: '',
      pageSize: 10,
      pageNum: 1,
      totalSize: 0,
      totalPage: 0,
      getFpData: [],
      ajzt: '',
      ajlx: '',
      ywx: '',
      ly: '',
      rules: {},
      form: {},
      sources: [],
      caseTypes: [],
      busLine: [],
      sompDate: [],
      create: [],
      startNum: 0,
      endNum: 0,
      totalCount: 0,
      sousr: [],
      btnPower: {
        deleteBtn: false,
        searchBtn: false,
        Hsearch: false,
        resetBtn: false,
        downList: false
      }
    }
  },
  watch: {
    dlDetails() {
      if (this.dlDetails === true) {
        this.startNum = 0
        this.endNum = Math.ceil(this.totalCount / this.pageSize)
        this.countNoPage = Math.ceil(this.totalCount / this.pageSize)
        if (this.tableData.length === 0) {
          this.showHideDownloadBtn = false
        } else {
          this.startNum = 1
          this.showHideDownloadBtn = true
        }
      } else {
        this.endNum = 0
        this.countNoPage = 0
      }
    }
  },
  methods: {
    getly() {
      this.$axios
        .post(
          '/SysConfigController/queryEnum',
          qs.stringify({
            sessionId: localStorage.getItem('SID'),
            type: '74'
          })
        )
        .then(res => {
          this.ly = res.data
          console.log(res)
          // console.log(this.ly)
        })
        .catch(error => {
          console.log(error)
        })
    },
    getajlx() {
      this.$axios
        .post(
          '/SysConfigController/queryEnum',
          qs.stringify({
            sessionId: localStorage.getItem('SID'),
            type: '73'
          })
        )
        .then(res => {
          console.log(res)
          this.ajlx = res.data

          // console.log(this.ajlx)
        })
        .catch(error => {
          console.log(error)
        })
    },
    getywx() {
      this.$axios
        .post(
          '/SysConfigController/queryEnum',
          qs.stringify({
            sessionId: localStorage.getItem('SID'),
            type: '75'
          })
        )
        .then(res => {
          this.ywx = res.data
          //   console.log(res)
          // console.log(this.ywx)
        })
        .catch(error => {
          console.log(error)
        })
    },
    getList() {
      const params = {
        sCaseTime: this.sCaseTime,
        eCaseTime: this.eCaseTime,
        source: this.source,
        sTransactionTime: this.sTransactionTime,
        eTransactionTime: this.eTransactionTime,
        merchantOrder: this.merchantOrder,
        caseType: this.caseType,
        stolenCardNumber: this.stolenCardNumber,
        created: this.created,
        merchantId: this.merchantId,
        id: this.id,
        somplaintSource: this.somplaintSource,
        acceptedPersonnel: this.acceptedPersonnel,
        businessLine: this.businessLine,
        pageSize: this.pageSize,
        pageNum: this.pageNum
      }
      this.$axios
        .post('/CaseInquiryController/queryCaseList', qs.stringify(params))
        .then(res => {
          this.tableData = res.data.recordList
          this.totalPage = res.data.totalPage
          this.totalCount = parseInt(res.data.totalSize)
        })
    },
    getajzt() {
      this.$axios
        .post(
          '/SysConfigController/queryEnum',
          qs.stringify({
            sessionId: localStorage.getItem('SID'),
            type: '72'
          })
        )
        .then(res => {
          this.ajzt = []
          this.ajzt = res.data
          console.log(res.data)
          // console.log(this.ajzt)
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 获取数据列表
    getData() {
      // var caseStatusNone
      // if (this.caseStatus == 658) {
      //   caseStatusNone = ''
      // } else if (this.caseStatus != 658) {
      //   caseStatusNone = this.caseStatus
      // }

      // var sourceNone
      // if (this.source == 668) {
      //   sourceNone = ''
      // } else if (this.source != 668) {
      //   sourceNone = this.source
      // }

      // var caseTypeNone
      // if (this.caseType == 664) {
      //   caseTypeNone = ''
      // } else if (this.caseType != 664) {
      //   caseTypeNone = this.caseType
      // }

      this.$axios
        .post(
          '/CaseInquiryController/queryCaseList',
          qs.stringify({
            sCaseTime: this.sCaseTime,
            eCaseTime: this.eCaseTime,
            source: this.source,
            sTransactionTime: this.sTransactionTime,
            eTransactionTime: this.eTransactionTime,
            merchantOrder: this.merchantOrder,
            caseType: this.caseType,
            stolenCardNumber: this.stolenCardNumber,
            created: this.created,
            pageSize: this.pageSize,
            pageNum: this.pageNum
          })
        )
        .then(res => {
          this.totalPage = res.data.totalPage
          this.totalCount = parseInt(res.data.totalSize)
          this.tableData = res.data.recordList
          this.tableData.forEach(ele => {
            ele.stolenCardNumberCopy = ''
            if (ele.stolenCardNumber === '') {
              ele.stolenCardNumberCopy = ele.stolenCardNumber
            } else if (ele.stolenCardNumber !== '') {
              ele.stolenCardNumberCopy = card(ele.stolenCardNumber)
            }
          })
        })
        .catch(error => {
          console.log(error)
        })
    },
    getDataInte() {
      this.getList()
    },
    downloadClose() {
      this.download = false
      this.loadStartNum = ''
      this.loadEndNum = ''
    },
    dlDetailsClose() {
      this.dlDetails = false
      this.startNum = 0
      this.endNum = 0
    },
    removeData() {
      let arr = []
      this.multipleSelection.forEach(ele => {
        arr.push(ele.id)
      })
      if (this.multipleSelection.length == 0) {
        this.$alert('请至少选择一条数据', '系统提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
      } else if (this.multipleSelection.length > 0) {
        this.$confirm('确认删除记录吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          closeOnClickModal: false,
          type: 'warning'
        }).then(() => {
          this.$axios
            .post(
              '/CaseInquiryController/deleteCase',
              qs.stringify({
                ids: arr.join(',')
              })
            )
            .then(res => {
              if (res.data.code === 1) {
                this.$alert('删除成功', '系统提示', {
                  type: 'success',
                  confirmButtonText: '确定',
                  callback: action => {
                    this.getData()
                  }
                })
              } else if (res.data.code !== 1) {
                this.$alert(res.data.message, '系统提示', {
                  type: 'warning',
                  confirmButtonText: '确定'
                })
              }
            })
        })
      }
    },
    allocationAdd() {
      let arr = []
      for (let i = 0; i < this.multipleSelection.length; i++) {
        arr.push(this.multipleSelection[i].id)
      }

      this.$axios
        .post(
          '/CaseInquiryController/distribution',
          qs.stringify({
            sessionId: localStorage.getItem('SID'),
            ids: arr.join(','),
            userId: this.allocationText
          })
        )
        .then(res => {
          if (res.data.code === 1) {
            this.$alert('操作成功', '系统提示', {
              confirmButtonText: '确定',
              type: 'success'
            })
            this.allocation = false
            this.getData()
            this.allocationText = ''
          } else if (res.data.code !== 1) {
            this.$alert('操作失败', '系统提示', {
              confirmButtonText: '确定',
              type: 'warning'
            })
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    allocationOpen() {
      if (this.multipleSelection.length == 0) {
        this.$alert('请选择至少一条需要分配的数据', '系统提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
      } else {
        this.allocation = true
      }
    },
    serchToggleC() {
      this.serchToggle = !this.serchToggle
      var ordinarySerch = document.getElementById('ordinarySerch')
      if (this.serchToggle == false) {
        ordinarySerch.style.transform = 'rotate(180deg)'
      } else if (this.serchToggle != false) {
        ordinarySerch.style.transform = 'rotate(0deg)'
      }
    },
    seniorSearchToggleC() {
      this.seniorSearchToggle = !this.seniorSearchToggle
      let serchbtn = document.querySelector('.divserchbtn')
      var advancedSerch = document.getElementById('advancedSerch')
      if (this.seniorSearchToggle == true) {
        serchbtn.style.display = 'none'
        serchbtn.style.transition = 'all 2s'
        advancedSerch.style.transform = 'rotate(0deg)'
      } else if (this.seniorSearchToggle == false) {
        serchbtn.style.display = 'inline-block'
        serchbtn.style.transition = 'all 2s'
        advancedSerch.style.transform = 'rotate(180deg)'
      }
    },
    refresh() {
      this.initTimeSet()
      this.source = ''
      this.merchantOrder = ''
      this.caseType = ''
      this.stolenCardNumber = ''
      this.created = ''
      this.getList()
    },
    refreshs() {
      this.initTimeSet()
      this.source = ''
      this.merchantOrder = ''
      this.caseType = ''
      this.stolenCardNumber = ''
      this.created = ''
      this.merchantId = ''
      this.id = ''
      this.acceptedPersonnel = ''
      this.businessLine = ''
      this.somplaintSource = ''
      this.getList()
    },
    importeBtn() {
      this.importe = false
      this.fileData = ''
      this.file = ''
    },
    upload() {
      let formData = new FormData()
      formData.append('file', this.file)
      if (this.file == '') {
        this.$alert('不能上传空文件', '系统提示', {
          confirmButtonText: '确定'
        })
        return
      }
      this.$axios
        .post('/CaseInquiryController/batchImportCase', formData)
        .then(res => {
          console.log(res)
          if (res.data.code == 1) {
            this.$alert(res.data.message, '系统提示', {
              confirmButtonText: '确定',
              type: 'success'
            })
            this.importe = false
            this.fileData = ''
            this.file = ''
          } else if (res.data.code == 0) {
            this.$alert(res.data.message, '系统提示', {
              confirmButtonText: '确定',
              type: 'warning'
            })
          }
        })
        .catch(error => {
          this.fileData = ''
          this.file = ''
          console.log(error)
        })
    },
    fileChange(e) {
      this.file = e.target.files[0]
      this.fileData = e.target.files[0].name
    },
    fileChangeClick() {
      this.valueText = ''
    },
    helpTitleClick() {
      this.helpTitle = !this.helpTitle
    },
    downloadModel() {
      // 导入下载模板
      let uploadBaseUrl = 'http://172.19.162.41:8080/BusinessSys'
      window.location = encodeURI(
        this.uploadBaseUrl + '/CaseInquiryController/exportCaseModel'
      )
    },
    caseMgt(row) {
      // 如果没有查看案件详情的权限，则不跳转
      if (this.viewCaseDetailPermission === false) return
      console.log(row)

      var name = ''
      var nameId = row.id

      if (row.caseStatus === '待初审' || row.caseStatus === '初审中') {
        name = 1
      } else if (row.caseStatus === '初审完结' || row.caseStatus === '复审中') {
        name = 2
      } else if (row.caseStatus === '复审完结') {
        name = 3
      }
      //   window.open('http://172.19.40.47:8080/#/caseMgt?' + name + '&' + nameId)

      //   window.open('http://10.151.30.148:8080/business-view/#/caseMgt?' + name + '&' + nameId)
      window.open(
        window.location.href.split('#')[0] +
          '#/caseMgt?name=' +
          name +
          '&nameId=' +
          nameId
      )

      localStorage.setItem('ID', row.id)
      localStorage.setItem('STOLENUM', row.stolenCardNumber)
      localStorage.setItem('MERID', row.merchantOrder)
      localStorage.setItem('BUSILINE', row.businessLine)
      localStorage.setItem('CASETYPE', row.caseType)
      localStorage.setItem('merchantMgtCode', row.merchantId)
    },
    newCase() {
      //   window.open('http://172.19.40.47:8080/#/newCase')
      //   window.open('http://10.151.30.148:8080/business-view/#/newCase?from=' + 2)
      window.open(window.location.href.split('#')[0] + '#/newCase?from=' + 2)
    },
    dlDetailsOpen() {
      this.dlDetails = true
      // console.log(111)
      // if (this.totalNum == 0) {
      //   this.loadStartNum = 0
      //   this.loadEndNum = 0
      // } else if (this.totalNum != 0) {
      //   this.loadEndNum = Math.ceil(this.totalSize / this.pageSize)
      //   this.loadStartNum = 1
      // }
    },
    downloadOpen() {
      this.download = true
      if (this.totalNum == 0) {
        this.loadStartNum = 0
        this.loadEndNum = 0
      } else if (this.totalNum != 0) {
        this.loadEndNum = Math.ceil(this.totalSize / this.pageSize)
        this.loadStartNum = 1
      }
    },
    // 下载列表
    uploadList() {
      if (this.startNum == 0 || this.endNum == 0) {
        this.$alert('值必须大于或等于1', '提示', {
          type: 'warning',
          confirmButtonText: '确定'
        })
        return false
      }

      if (
        this.totalPage == 0 ||
        this.startNum > this.totalPage ||
        this.endNum > this.totalPage
      ) {
        this.$alert('值必须小于或等于总页数，且不能为0', '提示', {
          type: 'warning',
          confirmButtonText: '确定'
        })
        return false
      }

      if (parseInt(this.startNum) > parseInt(this.endNum)) {
        this.$alert('起始值需小于等于结束值', '提示', {
          type: 'warning',
          confirmButtonText: '确定'
        })
        return false
      }

      if (
        parseInt(this.pageSize) *
          (parseInt(this.endNum) - parseInt(this.startNum) + 1) >
        100000
      ) {
        this.$alert('最多只能导出10万条数据', '提示', {
          type: 'warning',
          confirmButtonText: '确定'
        })
        return false
      }

      // if (this.eCaseTime == null) {
      //   this.eCaseTime = ''
      // }
      // if (this.sCaseTime == null) {
      //   this.sCaseTime = ''
      // }
      // if (this.caseStatus == null) {
      //   this.caseStatus = ''
      // }
      // if (this.sTransactionTime == null) {
      //   this.sTransactionTime = ''
      // }
      // if (this.eTransactionTime == null) {
      //   this.eTransactionTime = ''
      // }
      // if (this.merchantOrder == null) {
      //   this.merchantOrder = ''
      // }
      // if (this.caseType == null) {
      //   this.caseType = ''
      // }
      // if (this.stolenCardNumber == null) {
      //   this.stolenCardNumber = ''
      // }
      // if (this.created == null) {
      //   this.created = ''
      // }
      // if (this.businessLine == null) {
      //   this.businessLine = ''
      // }
      // if (this.loadStartNum == null) {
      //   this.loadStartNum = ''
      // }
      // if (this.loadEndNum == null) {
      //   this.loadEndNum = ''
      // }
      // if (this.pageSize == null) {
      //   this.pageSize = ''
      // }

      window.location = encodeURI(
        this.uploadBaseUrl +
          '/CaseInquiryController/downloadCaseList?sCaseTime=' +
          this.sCaseTime +
          '&eCaseTime=' +
          this.eCaseTime +
          '&source=' +
          this.source +
          '&sTransactionTime=' +
          this.sTransactionTime +
          '&eTransactionTime=' +
          this.eTransactionTime +
          '&merchantOrder=' +
          this.merchantOrder +
          '&caseType=' +
          this.caseType +
          '&stolenCardNumber=' +
          this.stolenCardNumber +
          '&created=' +
          this.created +
          '&merchantId' +
          this.merchantId +
          '&id=' +
          this.id +
          '&somplaintSource=' +
          this.somplaintSource +
          '&acceptedPersonnel=' +
          this.acceptedPersonnel +
          '&businessLine=' +
          this.businessLine +
          '&startNum=' +
          this.startNum +
          '&endNum=' +
          this.endNum
      )
      this.dlDetails = false
      this.startNum = 0
      this.endNum = 0
    },
    // 下载详情
    uploadMgt() {
      if (parseInt(this.loadStartNum) > parseInt(this.loadEndNum)) {
        this.$alert('起始值需小于结束值', '系统提示', {
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }

      if (
        parseInt(this.pageSize) *
          (parseInt(this.loadStartNum) - parseInt(this.loadEndNum) + 1) >
        100000
      ) {
        this.$alert('最多只能导出10万条数据', '提示', {
          confirmButtonText: '确定',
          type: 'warning',
          callback: action => {}
        })
        return
      }

      if (this.eCaseTime == null) {
        this.eCaseTime = ''
      }
      if (this.sCaseTime == null) {
        this.sCaseTime = ''
      }
      if (this.caseStatus == null) {
        this.caseStatus = ''
      }
      if (this.sTransactionTime == null) {
        this.sTransactionTime = ''
      }
      if (this.eTransactionTime == null) {
        this.eTransactionTime = ''
      }
      if (this.merchantOrder == null) {
        this.merchantOrder = ''
      }
      if (this.caseType == null) {
        this.caseType = ''
      }
      if (this.stolenCardNumber == null) {
        this.stolenCardNumber = ''
      }
      if (this.created == null) {
        this.created = ''
      }
      if (this.businessLine == null) {
        this.businessLine = ''
      }
      if (this.loadStartNum == null) {
        this.loadStartNum = ''
      }
      if (this.loadEndNum == null) {
        this.loadEndNum = ''
      }
      if (this.pageSize == null) {
        this.pageSize = ''
      }

      window.location = encodeURI(
        this.uploadBaseUrl +
          '/CaseInquiryController/exportCaseDetail?sCaseTime=' +
          this.sCaseTime +
          '&eCaseTime=' +
          this.eCaseTime +
          '&caseStatus=' +
          this.caseStatus +
          '&sTransactionTime=' +
          this.sTransactionTime +
          '&eTransactionTime=' +
          this.eTransactionTime +
          '&merchantOrder=' +
          this.merchantOrder +
          '&caseType=' +
          this.caseType +
          '&stolenCardNumber=' +
          this.stolenCardNumber +
          '&created=' +
          this.created +
          '&merchantId' +
          this.merchantId +
          '&id=' +
          this.id +
          '&source=' +
          this.source +
          '&acceptedPersonnel=' +
          this.acceptedPersonnel +
          '&businessLine=' +
          this.businessLine +
          '&pageNum=' +
          this.loadStartNum +
          '&pageSize=' +
          this.pageSize +
          '&totalPage=' +
          this.loadEndNum
      )
    },
    getSelect() {
      this.$axios.post('/param/getSource').then(res => {
        if (res.data.code === '200') {
          this.sources = res.data.data.returnList
        }
      })
      this.$axios.post('/param/caseType').then(res => {
        if (res.data.code === '200') {
          this.caseTypes = res.data.data.returnList
        }
      })
      this.$axios.post('/param/businessLine').then(res => {
        if (res.data.code === '200') {
          this.busLine = res.data.data.returnList
        }
      })
      this.$axios.post('/param/somplaintSource').then(res => {
        if (res.data.code === '200') {
          this.sompDate = res.data.data.returnList
        }
      })
      this.$axios.post('/CaseInquiryController/getAllUser').then(res => {
        if (res.data.code === '200') {
          this.create = res.data.data.returnList
        }
      })
      this.$axios
        .post('/CaseInquiryController/getallAcceptedPersonnel')
        .then(res => {
          if (res.data.code === '200') {
            this.sousr = res.data.data.returnList
          }
        })
    },
    handleSizeChange(val) {
      this.pageSize = parseInt(val)
      this.getData()
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.getData()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 设置默认时间
    initTimeSet() {
      let date = new Date()
      let y = date.getFullYear()
      let m = '0' + (date.getMonth() + 1)
      let d = '0' + date.getDate()
      // console.log(y+'-'+m+'-'+d)
      this.sCaseTime =
        y +
        '-' +
        m.substring(m.length - 2, m.length) +
        '-' +
        d.substring(d.length - 2, d.length) +
        ' ' +
        '00:00:00'
      this.sTransactionTime =
        y +
        '-' +
        m.substring(m.length - 2, m.length) +
        '-' +
        d.substring(d.length - 2, d.length) +
        ' ' +
        '00:00:00'
      this.eCaseTime =
        y +
        '-' +
        m.substring(m.length - 2, m.length) +
        '-' +
        d.substring(d.length - 2, d.length) +
        ' ' +
        '23:59:59'
      this.eTransactionTime =
        y +
        '-' +
        m.substring(m.length - 2, m.length) +
        '-' +
        d.substring(d.length - 2, d.length) +
        ' ' +
        '23:59:59'
    },
    // getAcceptPersonList() {
    //   this.$axios
    //     .get(
    //       '/CaseInquiryController/queryPerson?sessionId=' +
    //         localStorage.getItem('SID')
    //     )
    //     .then(res => {
    //       console.log(res.data)
    //       this.acceptPersonList = []
    //       this.acceptPersonList = this.acceptPersonList.concat(
    //         res.data.recordList
    //       )
    //     })
    //     .catch(error => {
    //       // console.log(res.data)
    //     })
    // },
    getFp() {
      this.$axios
        .get(
          '/CaseInquiryController/queryPerson?sessionId=' +
            localStorage.getItem('SID')
        )
        .then(res => {
          console.log(res.data)
          this.getFpData = []
          this.getFpData = this.getFpData.concat(res.data.recordList)
        })
        .catch(error => {
          console.log(res.data)
        })
    },
    getPersonList() {
      this.$axios
        .get(
          '/CaseInquiryController/queryPerson?sessionId=' +
            localStorage.getItem('SID')
        )
        .then(res => {
          console.log(res.data)
          this.personList = []
          this.personList = this.personList.concat(res.data.recordList)
        })
        .catch(error => {
          console.log(res.data)
        })
    },
    beginTimeFocus() {
      document.querySelector('#beginTime').setAttribute('readOnly', true)
    },
    endTimeFocus() {
      document.querySelector('#endTime').setAttribute('readOnly', true)
    },
    sTransactionTimeFocus() {
      document
        .querySelector('#sTransactionTimeBegin')
        .setAttribute('readOnly', true)
    },
    eTransactionTimeFocus() {
      document
        .querySelector('#eTransactionTimeEnd')
        .setAttribute('readOnly', true)
    },
    queryAuthList() {
      // 按钮权限
      const idList = JSON.parse(localStorage.getItem('ARRLEVEL'))
      this.btnPower.searchBtn = idList.indexOf(113) === -1 ? false : true
      this.btnPower.resetBtn = idList.indexOf(115) === -1 ? false : true
      this.btnPower.deleteBtn = idList.indexOf(256) === -1 ? false : true
      this.btnPower.Hsearch = idList.indexOf(114) === -1 ? false : true
      this.btnPower.downList = idList.indexOf(118) === -1 ? false : true
    }
  },
  created() {
    this.queryAuthList()
  },
  mounted() {
    this.initTimeSet()
    this.getList()
    this.getSelect()
  }
}
</script>
<style scoped>
.fontC {
  color: #3dc6b2;
  cursor: pointer;
  line-height: 17px;
}
.onf {
  display: inline;
  margin-left: 45px;
  font-size: 14px;
  color: #606266;
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
.searchContentgray,
.seniorSearchContent {
  height: auto;
  padding-left: 3%;
  padding-top: 20px;
  padding-bottom: 20px;
  -webkit-transition: all 0.7s;
  transition: all 0.7s;
}
.leftContent {
  width: 80%;
  height: auto;
  display: inline-block;
}
.rightContent {
  width: 18%;
  height: 134px;
  /* border-left: 1px solid #e0e0e0; */
  float: right;
}
.rightContent1 {
  width: 18%;
  height: 118px;
  /* border-left: 1px solid #e0e0e0; */
  float: right;
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
  height: 60px;
  font-size: 13px;
  padding-top: 25px;
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
.amendIconIcon {
  width: 46px;
  height: 32px;
  border: 0;
  background-image: url(../../images/plxgW.png);
}
.amendIconIcon:hover {
  width: 46px;
  height: 32px;
  border: 0;
  background-image: url(../../images/plxgL.png);
}
.removIconIcon {
  width: 46px;
  height: 32px;
  border: 0;
  background-image: url(../../images/xzxqW.png);
}
.removIconIcon:hover {
  width: 46px;
  height: 32px;
  border: 0;
  background-image: url(../../images/xzxqL.png);
  border-top-right-radius: 7px;
  border-bottom-right-radius: 7px;
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
.icon3 {
  background: url(../../images/icon3.png) no-repeat;
  width: 39px;
  height: 28px;
}
.icon3:hover {
  background: url(../../images/icon3-2.png) no-repeat;
  width: 39px;
  height: 28px;
}
.remouve {
  background: url(../../images/sc.png);
  width: 44px;
  height: 30px;
  margin: 0 auto;
}
.remouve:hover {
  background: url(../../images/scH.png) no-repeat;
  width: 44px;
  height: 30px;
  margin: 0 auto;
}
.refreshIcon {
  width: 46px;
  height: 32px;
  border: 0;
  background-image: url(../../images/icon4.png);
}
.refreshIcon:hover {
  width: 46px;
  height: 32px;
  border: 0;
  background-image: url(../../images/icon4-2.png);
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
.ui_button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #409eff;
  border-color: #409eff;
  color: #409eff;
  -webkit-appearance: none;
  text-align: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  -webkit-transition: 0.1s;
  transition: 0.1s;
  font-weight: 500;
  padding: 9px 23px;
  font-size: 14px;
  border-radius: 34px;
}
.ui_button:hover {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #409eff;
  border: 1px solid #409eff;
  border-color: #409eff;
  color: #fff;
  -webkit-appearance: none;
  text-align: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  -webkit-transition: 0.1s;
  transition: 0.1s;
  font-weight: 500;
  padding: 9px 23px;
  font-size: 14px;
  border-radius: 34px;
}
.listValInp {
  width: 60%;
  height: 36px;
}
.importe {
  width: 18px;
  height: 18px;
  background-image: url(../../images/importe.png);
}
.ipC {
  float: left;
  margin-left: 10px;
  margin-right: 5px;
}
.fontC {
  color: #3dc6b2;
  cursor: pointer;
  line-height: 17px;
}
.prompt {
  width: 18px;
  height: 18px;
  background-image: url(../../images/prompt.png);
}
.downClass {
  width: 77px;
  height: 29px;
  line-height: 18px;
  margin: 5px;
  border-radius: 19px;
  border: 1px solid #ccc;
  padding: 4px 2px;
  box-sizing: border-box;
}
.block {
  margin-top: 34px;
  width: 100%;
}
.evetotal {
  margin-left: 3px;
  padding-left: 10px;
  background: url(../../images/xxjt.png) no-repeat;
  background-position: 34px 8px;
  background-size: 7px 5px;
  outline: none;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  width: 50px;
  height: 22px;
  border: 1px solid #e0e0e0;
  border-radius: 100px;
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #333333;
}
.paginationRight {
  display: inline-block;
  /* float: right; */
}
#advancedSerch {
  transform: rotate(180deg);
  -webkit-transform: rotate(180deg);
  -moz-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
}
</style>
