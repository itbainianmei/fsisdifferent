<template>
    <div>
        <search
            :resetPermission="resetPermission"
            :searchPermission="searchPermission"
            :ratingLevelList="ratingLevelList"
            :productlineList="productlineList"
            :customerSignLevelList="customerSignLevelList"
            :customerKYCList="customerKYCList"
            :searchForm="searchForm"
            @searchData="searchData"
            @resetForm="resetForm"
            @getQueryEnum="getQueryEnum">
        </search>
        <div class="button">
            <div class="BotoomBtn leftRadius" data-title='下载列表' v-if='btnPower.downList' @click="openDownloadBox('isList', 'isDetail')">
                <div class="btn-icon downloadIcon" style="margin-top: -1px;"></div>
            </div>
            <div class="BotoomBtn rightRadius" data-title='下载详情' v-if='btnPower.downDetail' @click="openDownloadBox('isDetail', 'isList')">
                <div class="btn-icon downloadIcon" style="margin-top: -1px;"></div>
            </div>
        </div>
        <div class="dataTable clear">
            <el-table
                :data="tableData"
                border
                style="width: 100%"
                @cell-dblclick="updateCustomer"
                @selection-change="selectItem"
                @row-dblclick="updateCustomer">
                <el-table-column
                    align='center'
                    v-for='item in tableDataHeader'
                    :type="item.type"
                    :key="item.id"
                    :label="item.label"
                    :prop="item.prop"
                    :width="item.width">
                </el-table-column>
            </el-table>
        </div>
        <Page :pageInfo="page" @onCurrentChange="onCurrentChange"></Page>

        <!-- 修改商户评级 -->
        <el-dialog title="修改级别" :visible.sync="updateFormDialog" width="35%" v-dialogDrag >
            <el-form ref="updateForm" :model="updateForm" :rules="rules" class="demo-ruleForm" :label-position="'right'" label-width="100px" style="margin-left:13%; max-height: 450px; overflow-y: auto;">
                <el-form-item label="商户编号:">
                    <div>{{updateForm.customernumber}}</div>
                </el-form-item>
                <el-form-item label="人工评级等级:" prop="ratingresults">
                    <el-select v-model="updateForm.ratingresults" placeholder="请选择" style="height: 36px;width: 74%">
                        <el-option
                          label="全部"
                          value="">
                        </el-option>
                        <el-option
                          v-for="item in formRatingLevelList"
                          :key="item"
                          :label="item"
                          :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="人工评级备注:" prop="remarks">
                    <el-input clearable type="textarea" :maxlength="200" placeholder="请输入备注" v-model="updateForm.remark" style="width: 74%"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="cancelForm('updateForm')">取 消</el-button>
                <el-button type="primary" @click="submitForm('updateForm')">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 下载列表 -->
        <el-dialog title="商户评级查询：分页选择下载" :visible.sync="downloadListDialog" width="30%" v-dialogDrag>
            <div style="text-align: center; margin-bottom:20px;">选择下载从
                <input type='number' min="0" class="downClass" v-model="startNumList" >到
                <input type='number' min="0"  class="downClass" v-model="endNumList" :max='totalPageList'>页的数据
            </div>
            <h4 style="text-align: center">当前共<span>{{this.totalPageList}}</span>页</h4>
            <span slot="footer" class="dialog-footer">
                <el-button @click="downloadClose('List')">取 消</el-button>
                <el-button type="primary" @click="download('List')" v-show="showDownloadListBtn">下 载</el-button>
            </span>
        </el-dialog>
        <!-- 下载详情 -->
        <el-dialog title="商户评级查询：分页选择下载" :visible.sync="downloadDetailDialog" width="30%" v-dialogDrag>
            <div style="text-align: center; margin-bottom:20px;">选择下载从
                <input type="number" min="0" class="downClass" v-model="startNumDetail">到
                <input type="number" min="0" :max="this.totalPageDetail" class="downClass" v-model="endNumDetail">页的数据
            </div>
            <h4 style="text-align: center">当前共<span>{{this.totalPageDetail}}</span>页</h4>
            <span slot="footer" class="dialog-footer">
                <el-button @click="downloadClose('Detail')">取 消</el-button>
                <el-button type="primary" @click="download('Detail')" v-show="showDownloadDetailBtn">下 载</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import qs from 'qs'
import search from './Partial/search.vue'
export default {
  name: '商户评级管理',
  components: {
    search
  },
  data() {
    return {
      resetPermission: false,
      searchPermission: false,
      downloadListPermission: false,
      downloadDetailPermission: false,
      searchForm: {
        createTimeBegin: '', //开始日期
        createTimeEnd: '', //结束日期
        customerSign: '', //商户唯一标识
        customernumber: '', //商户编号
        signedname: '', //商户签约名称
        salesname: '', //销售
        agentcode: '', //代理商编号
        agentname: '', //代理商名称
        YEJISHUXING: '', //分公司
        ratingresults: '', //评级等级
        productline: '', //行业业绩属性
        businesscat: '', //商户自然属性一级
        KYCCognizance: '' //商户KYC
      },
      ratingLevelList: [],
      productlineList: [],
      customerSignLevelList: [],
      customerKYCList: [],
      formRatingLevelList: [],
      tableDataHeader: [
        { prop: 'ratingdate', label: '评级日期', width: '150' },
        { prop: 'customerSign', label: '商户唯一标识', width: '200' },
        { prop: 'customernumber', label: '商户编号', width: '200' },
        { prop: 'signedname', label: '商户签约名称', width: '120' },
        { prop: 'kyccognizance', label: '商户KYC', width: '120' },
        { prop: 'rateStatueAndScore', label: '评级结果', width: '120' },
        { prop: 'salesname', label: '销售', width: '120' },
        { prop: 'yejishuxing', label: '分公司', width: '150' },
        { prop: 'productline', label: '行业业绩属性', width: '130' },
        { prop: 'customerJoinDate', label: '商户入网日期', width: '150' },
        { prop: 'agentcode', label: '代理商编号', width: '130' },
        { prop: 'agentname', label: '代理商名称', width: '150' },
        { prop: 'businesscat', label: '商户自然属性一级', width: '130' },
        { prop: 'subbusinesscat', label: '商户自然属性二级', width: '150' },
        { prop: 'remark', label: '备注' }
      ],
      tableData: [],
      page: {
        isShowSizeChange: false,
        totalCount: 0,
        currentPage: 1,
        pageSize: 20,
        sizeList: [10, 20, 30, 40]
      },
      multipleSelection: [],
      updateFormDialog: false,
      downloadListDialog: false,
      downloadDetailDialog: false,
      showDownloadListBtn: false,
      showDownloadDetailBtn: false,
      isList: false,
      isDetail: false,
      updateForm: {
        id: '',
        customernumber: '', //商户编号
        ratingresults: '', //人工评级等级
        remarks: '' //人工评级备注
      },
      rules: {
        ratingResults: [
          { required: true, message: '请选择人工评级等级', trigger: 'change' }
        ],
        remarks: [
          {
            max: 200,
            min: 0,
            message: '最长长度不能超过200位',
            trigger: 'blur'
          }
        ]
      },
      startNumList: 0,
      endNumList: 0,
      totalPageList: 0,
      startNumDetail: 0,
      endNumDetail: 0,
      totalPageDetail: 0,
      btnPower: {
        downList: false,
        downDetail: false,
        reviseBtn:false
      }
    }
  },
  created() {
    // 按钮权限
    const mapPower = JSON.parse(localStorage.getItem('ARRLEVEL'))
    this.btnPower.downList = mapPower.indexOf(54) === -1 ? false : true
    this.btnPower.downDetail = mapPower.indexOf(55) === -1 ? false : true
    this.btnPower.reviseBtn = mapPower.indexOf(52) === -1 ? false : true
  },
  methods: {
    searchData() {
      let params = this.searchForm
      params.pageNumber = this.page.currentPage
      params.pageRow = this.page.pageSize
      this.$axios
        .post('CustomerRate/getCustomerRateList', qs.stringify(params))
        .then(res => {
          if (res.data.code == 200) {
            this.tableData = res.data.data.result
            this.page.totalCount = res.data.data.total
            this.page.currentPage = res.data.data.pageNumber
            this.page.pageSize = res.data.data.pageRow
            this.totalPageList = res.data.data.endPage || 0
            this.endNumList = this.totalPageList
            if (res.data.data.result.length > 0) {
              this.showDownloadListBtn = true
              this.startNumList = 1
            } else {
              this.page.totalCount = 0
            }
            return
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    searchDetail() {
      let params = this.searchForm
      params.pageNumber = this.page.currentPage
      params.pageRow = this.page.pageSize
      this.$axios
        .post('', qs.stringify(params))
        .then(res => {
          if (res.data.code == 200) {
            this.totalPageDetail = res.data.data.pages
            if (res.data.data.result.length > 0) {
              this.showDownloadDetailBtn = true
            }
            return
          }
          this.totalPageDetail = 0
          this.showDownloadDetailBtn = false
          this.$alert(res.data.msg, '提示', {
            type: 'warning',
            confirmButtonText: '确定'
          })
        })
        .catch(error => {
          console.log(error)
        })
    },
    openDownloadBox(flag, noFlag) {
      this[flag] = true
      this[noFlag] = false
      this.downloadListDialog = true
    },
    // getDetail(item) {
    //   this.updForm.id = item.id
    //   this.updForm.ratingresults = item.ratingresults
    //   this.updForm.remark = item.remark
    //   this.updForm.salesname = item.salesname
    //   this.updFormDialog = true
    //   // 获取生效场景列表
    //   // this.getQueryEnum('sourceList')
    // },
    // 设置默认时间
    initSetTime() {
      let date = new Date()
      let y = date.getFullYear()
      let m = '0' + (date.getMonth() + 1)
      let d = '0' + date.getDate()
      this.searchForm.createTimeBegin =
        y +
        '-' +
        m.substring(m.length - 2, m.length)
      this.searchForm.createTimeEnd =
        y +
        '-' +
        m.substring(m.length - 2, m.length)
        console.log(this.searchForm.createTimeEnd )
    },
    resetForm() {
      this.init()
      this.initSetTime()
      this.searchData()
    },
    onCurrentChange(val) {
      this.page.currentPage = val
      this.searchData()
    },
    init() {
      this.searchForm = {
        createTimeBegin: '', //开始日期
        createTimeEnd: '', //结束日期
        customerSign: '', //商户唯一标识
        customernumber: '', //商户编号
        signedname: '', //商户签约名称
        salesname: '', //销售
        agentcode: '', //代理商编号
        agentname: '', //代理商名称
        YEJISHUXING: '', //分公司
        ratingresults: '', //评级等级
        productline: '', //行业业绩属性
        businesscat: '', //商户自然属性一级
        KYCCognizance: '' //商户KYC
      }
    },
    getQueryEnum(param) {
      let type = ''
      let listName = ''
      if (arguments.length >= 2) {
        type = arguments[0]
        listName = arguments[1]
      } else {
        type = param.enumType
        listName = param.list
      }
      this.$axios
        .post(
          '/SysConfigController/queryEnum',
          qs.stringify({
            sessionId: localStorage.getItem('SID'),
            type: type
          })
        )
        .then(res => {
          this[listName] = res.data
          if (listName != 'formRatingLevelList') {
            this[listName].unshift({
              sysname: '全部',
              label: '全部',
              syscode: '全部'
            })
          }
          if (listName == 'ratingLevelList') {
            this.searchForm.ratingResults = res.data[0].syscode
          }
          if (listName == 'productlineList') {
            this.searchForm.productline = res.data[0].syscode
          }
          if (listName == 'customerSignLevelList') {
            this.searchForm.customerSignLevel = res.data[0].syscode
          }
          if (listName == 'customerKYCList') {
            this.searchForm.customerKYC = res.data[0].syscode
          }
        })
    },
    selectItem(row) {
      this.multipleSelection = row
    },
    // 修改商户评级
    updateCustomer(row) {
      if(!this.btnPower.reviseBtn){
        return
      }
      this.getSelect()
      this.updateForm.id = row.id
      this.updateForm.customernumber = row.customernumber
      this.updateForm.ratingresults = row.ratingresults
      this.updateForm.remark = row.remark
      this.updateFormDialog = true
    },
    getSelect() {
      this.$axios.post('/CustomerRate/getCustomerRateType').then(res => {
        if (res.data.code === 200) {
          this.formRatingLevelList = res.data.data.RateStatusList
        }
      })
    },
    cancelForm(formName) {
      this.$refs[formName].resetFields()
      this[formName + 'Dialog'] = false
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          return false
        }
        this.$axios
          .post(
            'CustomerRate/UpdateCustomerRate',
            qs.stringify({
              id: this[formName].id,
              ratingresults: this[formName].ratingresults,
              remark: this[formName].remark
            })
          )
          .then(res => {
            if (res.data.code == 200) {
              this.$alert(res.data.msg, '提示', {
                type: 'success',
                confirmButtonText: '确定'
              })
              this.updateFormDialog = false
              this.searchData()
              return
            }
          })
          .catch(error => {
            console.log(error)
          })
      })
    },
    // 下载
    downloadClose() {
      this.downloadListDialog = false
      this.startNumList = 0
      this.endNumList = 0
    },
    download() {
      if (this.startNumList * 1 === 0) {
        this.$alert('起始页输入值不能为0', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
        return
      }
      if (this.endNumList * 1 === 0) {
        this.$alert('结束页输入值不能为0', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
        return
      }
      if (this.startNumList > this.endNumList) {
        this.$alert('起始页数需小于结束页数', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
        return
      }
      if (this.endNumList * 1 > this.totalPageList) {
        this.$alert('结束页输入值超过最大页数', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
        return
      }
      if (
        ((this.endNumList * 10 - this.startNumList * 10 + 1) / 10) *
          this.page.pageSize >
        100000
      ) {
        this.$alert('最多只能导出10万条数据', '提示', {
          confirmButtonText: '确定',
          type: 'warning',
          callback: action => {}
        })
        return
      }
      this.$axios
        .post(
          '/CustomerRate/checkDownloadParam',
          qs.stringify({
            createTimeBegin: this.searchForm.createTimeBegin,
            createTimeEnd: this.searchForm.createTimeEnd,
            startNum: this.startNumList,
            endNum: this.endNumList,
            endPage: this.totalPageList,
            pageRow: this.page.pageSize
          })
        )
        .then(res => {
          if (res.data.code === 200) {
            let startRow = res.data.data.startRow
            let sumRow = res.data.data.sumRow
            let createTimeBegin = res.data.data.createTimeBegin
            let createTimeEnd = res.data.data.createTimeEnd
            let url = '/CustomerRate/exportList'
            if (this.isDetail) {
              url = '/CustomerRate/exportDetail'
            }
            console.log(url, 222)

            const params = {
              createTimeBegin,
              createTimeEnd,
              customerSign: this.searchForm.customerSign,
              customernumber: this.searchForm.customernumber,
              signedname: this.searchForm.signedname,
              ratingresults: this.searchForm.ratingresults,
              productline: this.searchForm.productline,
              agentcode: this.searchForm.agentcode,
              agentname: this.searchForm.agentname,
              businesscat: this.searchForm.agentname,
              YEJISHUXING: this.searchForm.YEJISHUXING,
              KYCCognizance: this.searchForm.KYCCognizance,
              startNum: startRow,
              endNum: sumRow
            }

            url = `${url}?${qs.stringify(params)}`

            window.location.href = this.uploadBaseUrl + url;
            // url =
            //   url +
            //   '?createTimeBegin=' +
            //   createTimeBegin +
            //   '&createTimeEnd=' +
            //   createTimeEnd +
            //   '&customerSign=' +
            //   this.searchForm.customerSign +
            //   '&customernumber=' +
            //   this.searchForm.customernumber +
            //   '&signedname=' +
            //   this.searchForm.signedname +
            //   '&ratingresults=' +
            //   this.searchForm.ratingresults +
            //   '&productline=' +
            //   this.searchForm.productline +
            //   '&agentcode=' +
            //   this.searchForm.agentcode +
            //   '&agentname=' +
            //   this.searchForm.agentname +
            //   '&businesscat=' +
            //   this.searchForm.businesscat +
            //   '&YEJISHUXING=' +
            //   this.searchForm.YEJISHUXING +
            //   '&KYCCognizance=' +
            //   this.searchForm.KYCCognizance +
            //   '&startNum=' +
            //   startRow +
            //   '&endNum=' +
            //   sumRow
            // this.$axios
            //   .get(url)
            //   .then(res1 => {
            //     let d_url = this.uploadBaseUrl + url
            //     this.downloadListDialog = false
            //     window.location = encodeURI(d_url)
            //   })
            //   .catch(error => {
            //     console.log(error)
            //   })
          }
        })
    }
  },
  watch: {
    downloadListDialog() {
      if (this.downloadListDialog === true) {
        if (this.tableData.length === 0) {
          this.isShowDownloadBtn = false
        } else if (this.tableData.length !== 0) {
          this.startNumList = 1
          this.isShowDownloadBtn = true
          this.endNumList = this.totalPageList
        }
      } else if (this.downloadBlack === false) {
        this.endNumList = 0
      }
    }
  },
  mounted() {
    this.initSetTime()
    this.searchData()
  }
}
</script>
<style lang="less" scoped>
@import '~@/less/button.less';
.dataTable {
  margin: 15px 10px 0;
}
.button .BotoomBtn:hover::after {
  width: 60px;
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
</style>
