<!--商户核查单管理-->
<template>
    <div id="cuschecklist" @click="allarea($event)">
        <div class="searchBasic">
            <el-collapse-transition>
                <div class="searchContentgray" id="searchContentgray" v-show="serchToggle">
                    <div class="leftContent" >
                        <el-form ref="form" :model="form" label-width="140px" class="demo-ruleForm">
                            <div class="formConClass">
                                <el-form-item label="商户唯一标识:" prop="customerSignArr">
                                     <el-input v-model="form.customerSignArr" placeholder="" ></el-input>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="商户编号:" prop="customerNumberArr">
                                     <el-input v-model="form.customerNumberArr" placeholder="" ></el-input>
                                </el-form-item>
                            </div>
                           
                            <div class="formConClass">
                                <el-form-item label="商户签约名:" prop="signedname">
                                    <el-input v-model="form.signedname" placeholder="" ></el-input>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="商户KYC:" prop="kycCognizance">
                                    <KycCheckbox :select="select"
                                        @selectedChange="selectedChange">
                                    </KycCheckbox>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="商户自然属性一级:" prop="businesscat">
                                    <el-select v-model="form.businesscat" placeholder="请选择"  >
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
                                <el-form-item label="销售:" prop="salesname">
                                    <el-input v-model="form.salesname" placeholder="" ></el-input>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="分公司:" prop="branchname">
                                    <el-input v-model="form.branchname" placeholder=""></el-input>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="行业业绩属性:" prop="productline">
                                    <el-select v-model="form.productline" placeholder="请选择" >
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
                                <el-form-item label="商户评级:" prop="customerCredentialLevel">
                                    <el-select v-model="form.customerCredentialLevel" placeholder="请选择" >
                                        <el-option label="全部" value="all"></el-option>
                                        <el-option
                                            v-for="item in pingji"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="代理商编号:" prop="agentcode">
                                    <el-input v-model="form.agentcode" placeholder="" ></el-input>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="代理商名称:" prop="agentname">
                                    <el-input v-model="form.agentname" placeholder="" ></el-input>
                                </el-form-item>
                            </div>
                        </el-form>
                    </div>
                    <div class="rightContent" >
                        <el-button type="primary" v-show="authsearch1" class="serchbtn" icon="el-icon-search" @click='listQuery("/CustomerInfoController/queryCustomerByParam","merchantPhoto")'>查询</el-button>
                         
                        <el-button type="primary" v-show="authreset" class="serchbtn" icon="el-icon-refresh" @click='reset("merchantPhoto")'>重置</el-button>
                    </div>
                </div>
            </el-collapse-transition>
        </div>
        <div class="tableData">
            <div class="contentBotoom clear">
                <div class="button fl">
                    <div class="leftButton clear ">
                        <div class="BotoomBtn leftRadius" v-show="guankong" title="商户管控" @click="shgk">
                            <div class="gk"></div>
                        </div>
                        <div class="BotoomBtn rightRadius" v-show="ahthdown"  title="下载" @click="uplistbefore">
                            <div class="xz"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <el-table
                    fixed 
                    max-height="600"
                    @selection-change="selectedItems"
                    @row-dblclick="gotoDetail"
                    :data="lsstTable"
                    border
                    :default-sort = "{prop: 'time', order: 'descending'}"
                    style="width: 100%"
                    v-if="lsstShow"
                    >
                    <el-table-column
                        type="selection"
                        width="50">
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec0.customerSign[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="customerSign"
                        label="商户唯一标识"
                        width="150">
                    </el-table-column>
                   <el-table-column
                    v-if="tableDataSec0.customerNumber[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="customerNumber"
                        label="商户编号"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec0.signName[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="signName"
                        label="商户签约名"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec0.customerKYC[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="customerKYC"
                        label="商户KYC"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec0.m1[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="m1"
                        label="M1"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec0.m3[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="m3"
                        label="M3"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec0.m7[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="m7"
                        label="M7"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec0.m30[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="m30"
                        label="M30"
                        width="150">
                    </el-table-column>
                    <el-table-column
                     v-if="tableDataSec0.artificialResults[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="artificialResults"
                        label="人工识别结果"
                        width="180">
                    </el-table-column>
                      <el-table-column
                    v-if="tableDataSec0.createDate[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="createDate"
                        label="商户入网日期"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec0.customerCredentialLevel[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="customerCredentialLevel"
                        label="商户评级"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec0.productLine[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="productLine"
                        label="行业业绩属性"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec0.businessCat[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="businessCat"
                        label="商户自然属性一级"
                        width="180">
                    </el-table-column>
                   <el-table-column
                    v-if="tableDataSec0.agentCode[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="agentCode"
                        label="代理商编号"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec0.agentName[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="agentName"
                        label="代理商名称"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec0.saleName[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="saleName"
                        label="销售"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec0.YEJISHUXING[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="YEJISHUXING"
                        label="分公司"
                        width="150">
                    </el-table-column>
                </el-table>
            </div>
            <div>
            </div>
            <div class="block mb20">
                <div class='paginationRight'>
                   <el-pagination
                    layout="total,prev, pager, next"
                    :page-sizes="[20]"
                    :page-size="Number(currenteveryno0)"
                    :total="length"
                    @current-change="handleCurrentChange0">
                   </el-pagination>
                   
                </div>
            </div>
        </div>
       <!--  管控弹框 -->
         <el-dialog title="" :visible.sync="processElementVisible1"  width="790px">  
          <el-form :model="processform" :rules="rules" ref="processElement">
            <div>
                <el-form-item label="风险处理:" class="pr" :label-width="formLabelWidth" prop="riskDeal">
                    <i class="pa" style="top:0;left:-14%;color:red;">*</i>
                    <el-checkbox-group v-model="processform.riskDeal">
                      <el-checkbox label="关闭支付接口" name="riskDeal" @change="liandongselect" class="ml30" :disabled="open"></el-checkbox>
                      <el-checkbox label="冻结账户状态" name="riskDeal" @change="liandongselect" :disabled="jiedong"></el-checkbox>
                      <el-checkbox label="冻结商户状态" name="riskDeal" @change="liandongselect" :disabled="jiedong2"></el-checkbox>
                    <el-checkbox label="加入黑名单" name="riskDeal" @change="liandongselect" :disabled="removeblack"></el-checkbox>
                      <el-checkbox label="开通支付接口" name="riskDeal" @change="liandongselect" :disabled="close"></el-checkbox>
                      <el-checkbox label="解冻账户状态" name="riskDeal" @change="liandongselect" :disabled="dongjie"></el-checkbox>
                      <el-checkbox style="visibility:hidden;" label="解冻商户状态" name="riskDeal" @change="liandongselect" :disabled="dongjie2"></el-checkbox>
                      <el-checkbox label="删除黑名单" name="riskDeal" @change="liandongselect" :disabled="addblack"></el-checkbox>
                    </el-checkbox-group>
                    <span class="errorbox" v-show="riskDealtype" v-html="isriskDealtext"></span>
                </el-form-item>
                <el-form-item label="产品:" class="pr" :label-width="formLabelWidth" v-show="open || close" prop="product">
                    <i class="pa" style="top:0;left:-9%;color:red;">*</i>
                    <el-checkbox-group v-model="processform.product"  @change="hasOne">
                      <el-checkbox label="快捷" name="product" class="ml30"></el-checkbox>
                      <el-checkbox label="网银" name="product"></el-checkbox>
                      <el-checkbox label="聚合" name="product"></el-checkbox>
                      <el-checkbox label="预授权" name="product"></el-checkbox>
                      <el-checkbox label="账户" name="product"></el-checkbox>
                      <el-checkbox label="分期" name="product"></el-checkbox>
                      <el-checkbox label="POS" name="product"></el-checkbox>
                      <el-checkbox label="充值汇入" name="product"></el-checkbox>
                      <el-checkbox label="转账" name="product"></el-checkbox>
                    </el-checkbox-group>
                     <span class="errorbox" v-show="prtype" v-html="isprtypetext"></span>
                </el-form-item>
            </div>
            <el-form-item label="备注:" :label-width="formLabelWidth" >
              <el-input v-model="processform.remark" maxlength="100" placeholder="请填写备注" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="processElementVisible1 = false">取 消</el-button>
            <el-button type="primary" @click='processForm("processElement",processform,"processElementVisible1")'>确 定</el-button>
          </div>
        </el-dialog>
        <!-- 分页下载 -->
        <el-dialog title="商户画像下载：分页选择下载" :visible.sync="downloadOffLine" width="30%" >
            <div style="text-align: center; margin-bottom:20px;">选择下载从<input type="number" v-model="loadStartNum" min="1" class="downClass" >到<input type="number" min="1"  class="downClass" v-model="loadEndNum" >页的数据</div>
            <h4 style="text-align: center">当前共<span>{{totalSize}}</span>页</h4>
            <span slot="footer" class="dialog-footer">
            <el-button @click="downloadOffLineClose">取 消</el-button>
            <el-button type="primary" @click="uploadList">下 载</el-button>
            </span>
        </el-dialog>
         <!-- 表格每列的列选择 注意：每页都需要手动改变top值-->
        <div ref="list" class="list pa none bgccc" style="top:860px;">
          <TableSelect  :tableDataSec="tableDataSec0" ></TableSelect>
        </div>
    </div>
</template>
<script>
import qs from 'qs'
import TableSelect from '../tableSelect/tableSelect.vue'
import KycCheckbox from '../zymCommon/kycCheckbox.vue'
export default {
  name:'商户画像',
  data() {
    return {
      totalSize: 0,
      guankong: false,
      prtype: false,
      riskDealtype: false,
      isprtypetext:'请至少选择一种产品类型',
      isriskDealtext: '请至少选择一种风险处理',
      authsearch1: false,
      authreset: false,
      ahthcl: false,
      showid: false,
      loading: true,
      flag: 0,
      currenteveryno0: 20,
      processElementVisible1: false, //管控弹框
      formLabelWidth: '150px',
      serchToggle: true,
      lsstShow: true,
      lsstTable: [],
      pingji: [
        { label: 'A+', value: 'A+' },
        { label: 'A', value: 'A' },
        { label: 'A-', value: 'A-' },
        { label: 'B+', value: 'B+' },
        { label: 'B', value: 'B' },
        { label: 'B-', value: 'B-' },
        { label: 'C+', value: 'C+' },
        { label: 'C', value: 'C' },
        { label: 'C-', value: 'C-' }
      ],
      tableDataSec0: {
        customerSign: [true, '商户唯一标识'],
        customerNumber: [true, '商户编号'],
        signName: [true, '商户签约名'],
        customerKYC: [true, '商户KYC'],
        m1: [true, 'M1'],
        m3: [true, 'M3'],
        m7: [true, 'M7'],
        m30: [true, 'M30'],
        artificialResults: [true, '人工识别结果'],
        createDate: [true, '商户入网日期'],
        customerCredentialLevel: [true, '商户评级'],
        productLine: [true, '行业业绩属性'],
        businessCat: [true, '商户自然属性一级'],
        agentCode: [true, '代理商编号'],
        agentName: [true, '代理商名称'],
        saleName: [true, '销售'],
        YEJISHUXING: [true, '分公司']
      },
      form: {
        customerSignArr: '',
        customerNumberArr: '',
        signedname: '',
        kycCognizance: '',
        businesscat: 'all',
        salesname: '',
        branchname: '',
        productline: 'all',
        customerCredentialLevel: 'all',
        agentcode: '',
        agentname: ''
      },
      select: {
        kycCognizance: '全部',
        childTag: [-1]
      },
      processform: {
        //处理商户核查单
        remark: '',
        riskDeal: [],
        product: []
      },
      close: false,
      dongjie: false,
      dongjie2: false,
      addblack: false,
      open: false,
      jiedong: false,
      jiedong2: false,
      removeblack: false,
      kycshow: false,
      onepropertySelect: [], //商户自然属性一级
      worktypeArray: [], //商户业绩属性
      rules: {
        merchantNo: [{ required: true, message: ' ', trigger: 'blur' }],
        riskQualitativeAnalysis: [
          { required: true, message: '人工识别商户KYC', trigger: 'blur' }
        ],
        type: [
          {
            type: 'array',
            required: true,
            message: '请至少选择一个活动性质',
            trigger: 'change'
          }
        ],
        prtype: [
          { type: 'array', required: true, message: ' ', trigger: 'change' }
        ]
      },
      idList: [], //表格中选中的行yeepayNo
      items: [], //表格中选中的行
      pageNumber: 1,
      pageSize: 20,
      pageRow: 20,
      length: 0,
      downloadOffLine: false, //下载
      loadStartNum: 0, //下载
      loadEndNum: 0 //下载
    }
  },
  created() {
    this.getMerchantFirst() //商户自然属性一级
    this.getIndustryAchievementProperty() //商户业绩属性
    this.queryAuthList()
    this.listQuery(
      '/CustomerInfoController/queryCustomerByParam',
      'merchantPhoto'
    )
  },
  methods: {
    hasOne() {
      if (this.processform.prtype != '') {
        this.prtype = false
      } else {
        this.prtype = true
      }
    },
    addproperty() {
      //增加商户自然一级属性
      this.kycshow = true
    },
    isShow(val) {
      this.form.KYCCognizance = val.submitData
      this.kycshow = val.onepropertySelectshow
    },
    gotoDetail(row) {
      //进入详情页
      window.open('#/merchantPhotoDetail/' + row.customerNumber)
    },
    queryAuthList() {
      //权限管理
      var self = this
      var arr = localStorage.getItem('ARRLEVEL')
        ? localStorage.getItem('ARRLEVEL')
        : []
      JSON.parse(arr).map(function(ele) {
        switch (ele) {
          case 552:
            self.authsearch1 = true
           break
           case 553:
            self.authreset = true
           break
           case 554:
            self.ahthdown = true
           break
           case 555:
            self.guankong = true
           break
        }
      })
    },
    downloadOffLineClose() {
      this.downloadOffLine = false
    },
    uplistbefore(){
        this.downloadOffLine=true
        this.loadEndNum = this.totalSize
        if(this.totalSize == 0){
            this.loadStartNum = 0
        }else{
            this.loadStartNum = 1
        }
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
        businesscat: self.form.businesscat,
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
              businesscat: self.form.businesscat,
              salesname: self.form.salesname,
              branchname: self.form.branchname,
              productline: self.form.productline,
              customerCredentialLevel: self.form.customerCredentialLevel,
              agentcode: self.form.agentcode,
              startRow: response.data.startRow,
              sumRow: response.data.sumRow
            }
            window.location =
              self.url +
              '/CustomerInfoController/downloadCustomerList?' +
              qs.stringify(para)
          }
        })
    },
    shgk() {
      //商户管控弹框
      var self = this
      if (self.idList.length < 1) {
        this.atleastOne()
        return false
      }
      this.close = false
      this.dongjie = false
      this.dongjie2 = false
      this.addblack = false
      this.open = false
      this.jiedong = false
      this.jiedong2 = false
      this.removeblack = false
      ;(this.processform = {
        //处理商户核查单
        remark: '',
        riskDeal: [],
        product: []
      }),
        (this.processElementVisible1 = true)
    },
    liandongselect() {
      //联动控制
      if (this.processform.riskDeal.join(',').indexOf('关闭支付接口') != -1) {
        this.close = true
      } else {
        this.close = false
      }
      if (this.processform.riskDeal.join(',').indexOf('开通支付接口') != -1) {
        this.open = true
      } else {
        this.open = false
      }
      if (this.processform.riskDeal.join(',').indexOf('冻结账户状态') != -1) {
        this.dongjie = true
      } else {
        this.dongjie = false
      }
      if (this.processform.riskDeal.join(',').indexOf('解冻账户状态') != -1) {
        this.jiedong = true
      } else {
        this.jiedong = false
      }
      if (this.processform.riskDeal.join(',').indexOf('冻结商户状态') != -1) {
        this.dongjie2 = true
      } else {
        this.dongjie2 = false
      }
      if (this.processform.riskDeal.join(',').indexOf('解冻商户状态') != -1) {
        this.jiedong2 = true
      } else {
        this.jiedong2 = false
      }
      if (this.processform.riskDeal.join(',').indexOf('加入黑名单') != -1) {
        this.addblack = true
      } else {
        this.addblack = false
      }
      if (this.processform.riskDeal.join(',').indexOf('删除黑名单') != -1) {
        this.removeblack = true
      } else {
        this.removeblack = false
      }
    },
    processForm(formName, params, hiddenElement) {
      var self = this
      var controlFunctionparams = {}
      controlFunctionparams.riskDeal = this.processform.riskDeal.join(',')
      controlFunctionparams.product = this.processform.product.join(',')
      controlFunctionparams.payCustomerNumber = this.$route.params.merchantNo
      controlFunctionparams.payOperator = ''
      controlFunctionparams.payRemark = this.processform.remark
      controlFunctionparams.payStatus =
        this.processform.riskDeal.join(',').indexOf('关闭支付接口') > -1
          ? 'DISABLE'
          : this.processform.riskDeal.join(',').indexOf('开通支付接口') > -1
            ? 'ENABLE'
            : ''
      controlFunctionparams.accountCustomerNumber = this.$route.params.merchantNo
      controlFunctionparams.accountStatus =
        this.processform.riskDeal.join(',').indexOf('冻结账户状态') > -1
          ? 'FROZEN'
          : this.processform.riskDeal.join(',').indexOf('解冻账户状态') > -1
            ? 'ACTIVE'
            : ''
      controlFunctionparams.accountReason = this.processform.remark
      controlFunctionparams.customerNumber = this.$route.params.merchantNo
      controlFunctionparams.customerOperator = ''
      controlFunctionparams.customerReason = this.processform.remark
      controlFunctionparams.customerStatus =
        this.processform.riskDeal.join(',').indexOf('冻结商户状态') > -1
          ? 'FROZEN'
          : this.processform.riskDeal.join(',').indexOf('解冻商户状态') > -1
            ? 'ACTIVE'
            : ''
      controlFunctionparams.source = '753'
      controlFunctionparams.loginPerson = ''
      controlFunctionparams.buttonType =
        this.processform.riskDeal.join(',').indexOf('加入黑名单') > -1
          ? 'cus_check_black'
          : this.processform.riskDeal.join(',').indexOf('删除黑名单') > -1
            ? 'cus_control_delBlack'
            : ''
      var paramsArr = []
      for (var i = 0, len = self.items.length; i < len; i++) {
        paramsArr.push({
          signName: self.items[i].signName,
          bankCardNo: self.items[i].settleBankaccount,
          merchantLicence: self.items[i].businessLicence,
          icp: self.items[i].icp,
          contactPhone: self.items[i].mobile,
          legalIdNo: self.items[i].legalIdcard,
          registMail: self.items[i].email,
          merchantBindWebSite: self.items[i].webUrl
        })
      }
      controlFunctionparams.data = JSON.stringify(paramsArr)
      this.$axios
        .post(
          '/CustomerControlController/controlFunction',
          qs.stringify(controlFunctionparams)
        )
        .then(res => {
          //尚振 的4合1管控接口
          var response = res.data
          if (response.code == '200') {
            this.successTip('成功')
          }
        })
    },
    query() {
      this.listQuery(
        '/CustomerInfoController/queryCustomerByParam',
        'merchantPhoto'
      )
    },
    handleCurrentChange0(val) {
      //处理当前页
      this.pageNumber = `${val}` //当前页
      this.listQuery(
        '/CustomerInfoController/queryCustomerByParam',
        'merchantPhoto',
        true,
        val
      )
    }
  },
  components: {
    TableSelect,
    KycCheckbox
  }
}
// {
//                 "customerNumber": 116,
//                 "checkList": "000115",
//                 "salesname": "销售2号",
//                 "time": "2018-07-10 18:04:19",
//                 "riskLevel": "中风险",
//                 "riskQualitativeAnalysis": "未定性",
//                 "dealStatus": "待处理",
//                 "riskDeal": "未处理",
//                 "companyId": "1",
//                 "createDate": "2018-07-10",
//                 "productline": "电信行业线",
//                 "merchantNo": "100400501",
//                 "merchantName": "测试商户有限公司",
//                 "signedname": "签约测试2",
//                 "agentcode": "100400500",
//                 "agentname": "代理商名称1",
//                 "businesscat": "一级行业测试2",
//                 "naturalPropertyTwo": "二级行业测试2",
//                 "lastModifiedBy": "",
//                 "lastModifiedTime": "2018-07-10 18:04:18",
//                 "businessTime": "2018-07-10 18:04:19",
//                 "createTime": "2018-07-10 18:04:19",
//                 "branchnameId": "23",
//                 "branchname": "线下机构(北京一分公司)",
//                 "pageNumberber": 0,
//                 "pageRow": 0,
//                 "pageIndex": 0
//                 }
</script>
<style lang="less" scoped>
@import '~@/less/search.less';
.iconbox {
  right: 13%;
  .blue {
    color: #3faaf9;
    font-weight: 800;
  }
}
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
.tableExpandIcon {
  min-width: 48px !important;
  text-align: center;
  overflow: hidden;
}
.tableExpandCheckzym {
  min-width: 50px !important;
  text-align: center;
  overflow: hidden;
}
.tableExpandTd {
  min-width: 150px !important;
  max-width: 150px !important;
  text-align: left;
  padding-left: 10px;
  overflow: hidden;
}
.tableExpandTd2 {
  min-width: 180px !important;
  max-width: 180px !important;
  text-align: left;
  padding-left: 10px;
  overflow: hidden;
}

.checkbox {
  padding: 12px 14px;
}
.importData {
  line-height: 30px;
}
.listValInp {
  width: 60%;
  height: 36px;
}
.formIpt {
  padding: 0;
  width: 14%;
  height: 31px;
  float: right;
  margin-top: -37px;
  border: 0px;
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
  // border-top: 1px solid #E0E0E0;
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
  /* line-height: 76px; */
  padding-left: 3%;
  padding-top: 12px;
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
  margin-top: 20px;
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
  overflow: hidden;
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
