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
                                <el-form-item label="交易开始时间:">
                                    <el-date-picker v-model="sTransactionTime"
                                    value-format='yyyy-MM-dd HH:mm:ss'  type="datetime"
                                    placeholder="选择日期时间" style="width: 90%;max-width:225px;"
                                    :clearable="false"
                                    :editable="false"
                                    :picker-options="start"
                                    ></el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="formConClass hideTimeRightIcon">
                                <el-form-item label="交易结束时间:">
                                    <el-date-picker v-model="eTransactionTime"
                                    value-format='yyyy-MM-dd HH:mm:ss'  type="datetime"
                                    placeholder="选择日期时间" style="width: 90%;max-width:225px;"
                                    :clearable="false"
                                    :editable="false"
                                     :picker-options="end"
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
                        <el-button type="primary" class="serchbtn" icon="el-icon-search" style="margin-top: 50px;" @click="getData(0)" v-if='btnPower.searchBtn'><span>查询</span></el-button>
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
                        <el-button type="primary" class="serchbtn" icon="el-icon-search" style="margin-top: 17px;" @click="getList(0)" v-if='btnPower.Hsearch'><span>查询</span></el-button>
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
                    <template v-for="item in headList">
                      <el-table-column  :render-header="renderHeader" sortable :width="item.width" v-if="item.prop !== 'cardNo' && item.isShow" :type="item.type" :key="item.id" :label="item.label" :prop="item.prop" align="center"></el-table-column>
                      <el-table-column  :render-header="renderHeader" sortable :width="item.width" v-if="item.prop === 'cardNo' && item.isShow" :type="item.type" :key="item.id" :label="item.label" :prop="item.prop" align="center">
                          <template slot-scope="scope">
                              <el-popover trigger="hover" placement="top">
                              {{ scope.row.cardNo }}
                              <div slot="reference" >
                              {{ scope.row.cardNoCopy }}
                              </div>
                              </el-popover>
                          </template>
                      </el-table-column>
                    </template>
                </el-table>
                <!-- 表格每列的列选择 注意：每页都需要手动改变top值-->
                <div ref="list" class="table-select none">
                    <!-- <TableSelect  :tableDataSec="tableDataSec" ></TableSelect> -->
                    <div id="tableSelect" @click="allarea($event)">
                        <ul @click.stop>
                            <li v-for="(key,value,index) in tableDataSec" :key="value">
                            <input type="checkbox" :id="generateString(index)" :disabled="tableDataSecChange && key[0]" v-model="key[0]" @change="checkSelect(value, key[0])">
                            <label :for="generateString(index)">{{key[1]}}</label>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- <Page :pageInfo="page" @onCurrentChange="handleCurrentChange"></Page> -->
            <div class="block">
              <div class='paginationRight'>
                  <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageNum"
                    :page-size="pageSize"
                    layout="total,prev,pager,  next"
                    :total="totalCount">
                  </el-pagination>
              </div>
            </div>
        </div>
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
  name: '交易案件查询',
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
      headList: [
        { type: 'selection', label: '', width: '50' },
        { prop: 'id', label: '案件号', width: '130'},
        { prop: 'businessType', label: '业务类型', width: '150' },
        { prop: 'somplaintSource', label: '投诉来源', width: '150'},
        { prop: 'contact', label: '联络情况', width: '150'},
        { prop: 'cardNo', label: '被盗银行卡号', width: '200' },
        { prop: 'bankName', label: '发卡行', width: '130'},
        { prop: 'crdTyp', label: '卡类型', width: '130'},
        { prop: 'merchantNo', label: '商户编号', width: '150'},
        { prop: 'signedname', label: '商户签约名', width: '180' },
        { prop: 'merchantOrder', label: '商户订单号', width: '180' },
        { prop: 'transactionTime', label: '交易时间', width: '180' },
        { prop: 'transactionAmount', label: '交易金额', width: '180' },
        { prop: 'payResult', label: '交易状态', width: '180' },
        { prop: 'agentcode', label: '代理商编号', width: '180' },
        { prop: 'agentname', label: '代理商名称', width: '180' },
        { prop: 'subCompany', label: '分公司', width: '130' },
        { prop: 'salesname', label: '销售', width: '130' },
        { prop: 'usrId', label: '用户ID', width: '130' },
        { prop: 'prod', label: '产品', width: '130' },
        { prop: 'actualPaymentMoney', label: '赔付金额', width: '150' },
        { prop: 'bearTheLoss', label: '损失承担方', width: '180' },
        { prop: 'acceptanceTime', label: '受理日期', width: '180' },
        { prop: 'acceptedPersonnel', label: '受理人员', width: '180' },
        { prop: 'caseType', label: '案件类型', width: '180' }
        // { prop: 'caseQualitativeResult', label: '案件定性结果', width: '100' }
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
      pageSize: 20,
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
      },
      tableDataSec: {},
      tableDataSecChange: false,
      endDate: '',
      start: {
        disabledDate: time => {
          if (this.eTransactionTime != '') {
            let s = new Date(this.eTransactionTime)
            return time.getTime() > Date.now() || time.getTime() > s.getTime()
          } else {
            return time.getTime() > Date.now()
          }
        }
      },
      end: {
        disabledDate: time => {
          let e = new Date(this.endDate)
          let s = new Date(
            new Date(this.sTransactionTime).getTime() - 24 * 60 * 60 * 1000
          )
          return time.getTime() < s.getTime() || time.getTime() > e.getTime()
        }
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
    checkSelect(name, value) {
        var i = 0
        for(var item in this.tableDataSec){
            if(this.tableDataSec[item][0]){
                i = i + 1
            }
        }
        if(i >= 1){
            if (i === 1) {
                this.tableDataSecChange = true
            } else {
                this.tableDataSecChange = false
            }
            this.$nextTick(() => {
                this.headList = this.headList.map(one => {
                    if (one.prop === name) {
                        one.isShow = value
                    }
                    return one
                })
            })
        }
    }, 
    renderHeader(h, { column, $index }){
        return h("span",[
            h("span",column.label),
            h("span",{
                "class":{
                "el-icon-arrow-down":true
                },
                "on":{
                click:(ev) => {
                        this.$refs.list.classList.remove('none')
                        var w = this.$refs.list.offsetWidth
                        if(Number(document.body.clientWidth) -  Number(ev.clientX) < w ){
                        this.$refs.list.style.left = Number(document.body.clientWidth) - w - 20 + 'px'
                        }else{
                        this.$refs.list.style.left = ev.clientX + 'px'
                        }
                        this.$refs.list.style.top= ev.pageY + 10 + 'px'
                        ev.stopPropagation()  //阻止冒泡
                    }
                }
            }),
        ])
    },
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
    getList(type) {
      if (type === 0) {
        this.pageNum = 1
      }
      const params = {
        // sCaseTime: this.sCaseTime,
        // eCaseTime: this.eCaseTime,
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
          this.tableData.forEach(ele => {
            ele.cardNoCopy = ''
            if (ele.cardNo === '') {
              ele.cardNoCopy = ele.cardNo
            } else if (ele.cardNo !== '') {
              ele.cardNoCopy = card(ele.cardNo)
            }
          })
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
    getData(type) {
      if (type === 0) {
        this.pageNum = 1
      }
      this.$axios
        .post(
          '/CaseInquiryController/queryCaseList',
          qs.stringify({
            // sCaseTime: this.sCaseTime,
            // eCaseTime: this.eCaseTime,
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
            ele.cardNoCopy = ''
            if (ele.cardNo === '') {
              ele.cardNoCopy = ele.cardNo
            } else if (ele.cardNo !== '') {
              ele.cardNoCopy = card(ele.cardNo)
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
          '/CaseInquiryController/downloadCaseList?source=' +
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

      // if (this.eCaseTime == null) {
      //   this.eCaseTime = ''
      // }
      // if (this.sCaseTime == null) {
      //   this.sCaseTime = ''
      // }
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
          '/CaseInquiryController/exportCaseDetail?caseStatus=' +
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
      // this.sCaseTime =
      //   y +
      //   '-' +
      //   m.substring(m.length - 2, m.length) +
      //   '-' +
      //   d.substring(d.length - 2, d.length) +
      //   ' ' +
      //   '00:00:00'
      this.sTransactionTime =
        y +
        '-' +
        m.substring(m.length - 2, m.length) +
        '-' +
        d.substring(d.length - 2, d.length) +
        ' ' +
        '00:00:00'
      // this.eCaseTime =
      //   y +
      //   '-' +
      //   m.substring(m.length - 2, m.length) +
      //   '-' +
      //   d.substring(d.length - 2, d.length) +
      //   ' ' +
      //   '23:59:59'
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
    this.headList.map(one => {
        one.isShow = true
        if (typeof one.prop !== 'undefined') {
            this.tableDataSec[one.prop] = [true]
            this.tableDataSec[one.prop].push(one.label)
        }
    })
    this.queryAuthList()
  },
  mounted() {
    this.initTimeSet()
    this.getList()
    this.getSelect()
  }
}
</script>
<style lang="less" scoped>
.dataTable {
    // position: relative;
    z-index: 2222;
    margin: 5px 15px 0;
    .table-select{
        position: absolute;
        padding: 10px 20px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 14px;
        line-height: 30px;
        z-index: 20;
        max-height: 250px;
        overflow: scroll;
        background: #f5f6fa;
        top: 0;
        left: 0;
    }
}
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
  height: 32px;
  font-size: 13px;
  padding-top: 10px;
  margin-left: 15px;
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
