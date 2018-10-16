<!-- 网址核验反查 -->
<template>
    <div @click="allarea($event)" style="height:84vh;">
        <Searchbar :getList="getList"></Searchbar>
        <div class="tableData">
            <div class="contentBotoom clear">
                <div class="button fl">
                    <div class="leftButton clear ">
                        <div class="BotoomBtn leftRadius" v-show="btnPower.blockBtn" title="加黑名单" @click="addBlackBtn">
                            <div class="jrhmd"></div>
                        </div>
                        <!-- <div class="BotoomBtn" v-show="authAddGray" title="加灰名单" @click="addGrayBtn">
                            <div class="jrhmd"></div>
                        </div> -->
                        <div class="BotoomBtn rightRadius" v-show="btnPower.downBtn" title="下载" @click="download=true">
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
                    @cell-mouse-enter="showsecret"
                    :data="tableData"
                    border
                    style="width: 100%"
                    >
                    <el-table-column
                        type="selection"
                        width="50">
                    </el-table-column>
                    <el-table-column
                     v-if="tableDataSec.customerNumber[0]"
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="customerNumber"
                        label="商户编号"
                       >
                    </el-table-column>
                    <el-table-column
                     v-if="tableDataSec.trxUrl[0]"
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="trxUrl"
                        label="交易网址"
                         >
                    </el-table-column>
                    <el-table-column
                     v-if="tableDataSec.webUrl[0]"
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="webUrl"
                        label="报备网址"
                         >
                    </el-table-column>
                    <el-table-column
                     v-if="tableDataSec.signedName[0]"
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="signedName"
                        label="商户签约名"
                       >
                    </el-table-column>
                    <el-table-column
                     v-if="tableDataSec.count[0]"
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="count"
                        label="请求数量"
                         >
                    </el-table-column>
                </el-table>
            </div>

            <div class="block">
                <div class='paginationRight'>
                   <el-pagination
                    layout="total, prev, pager, next"
                    :page-size=pageSize
                    :total=totalNumber
                    @current-change="handleCurrentChange">
                   </el-pagination>
                </div>
            </div>
        </div>
        <!-- 表格每列的列选择 注意：每页都需要手动改变top值-->
        <div ref="list" class="list pa none bgccc" style="top:860px;">
            <TableSelect :tableDataSec="tableDataSec" ></TableSelect>
        </div>

        <!-- 加入黑名单 -->
         <el-dialog title="加入黑名单" :visible.sync="confirmAddBlack" width="30%">
            <div style='width:100%;text-align:center'>
                <p><i class='el-icon-warning' style='color:#F1F2F5;font-size:25px;'></i></p>
                <p><span>确定加入黑名单吗?</span></p>

            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="confirmAddBlack = false">取 消</el-button>
                <el-button type="primary" @click="addBlackList">确认</el-button>
            </span>
        </el-dialog>
        <!-- 加入灰名单 -->
         <el-dialog title="加入黑名单" :visible.sync="confirmAddGray" width="30%">
            <div style='width:100%;text-align:center'>
                <p><i class='el-icon-warning' style='color:#F1F2F5;font-size:25px;'></i></p>
                <p><span>确定加入灰名单吗?</span></p>

            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="confirmAddGray = false">取 消</el-button>
                <el-button type="primary" @click="addGrayList">确认</el-button>
            </span>
        </el-dialog>
        <!-- 下载 -->
        <el-dialog title="网址核验反查：分页选择下载" :visible.sync="download" width="30%">
            <div style="text-align: center; margin-bottom:20px;">
                选择下载从<input type="number" v-model="startNum" min="0" class="downClass">到
                <input type="number" min="0" :max="maxPage" class="downClass" v-model="endNum">页的数据
            </div>
            <h4 style="text-align: center">当前共<span>{{maxPage}}</span>页</h4>
            <span slot="footer" class="dialog-footer">
            <el-button @click="downloadClose">取 消</el-button>
            <el-button type="primary" @click="downloadList" v-show='isShowDownloadBtn'>下 载</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import qs from 'qs'
import Searchbar from './searchbar.vue'
import TableSelect from '../../tableSelect/tableSelect.vue'
export default {
  name: '网址核验反查',
  data() {
    return {
      // authAddBlack: false,
      // authAddGray: false,
      // authdownload: false,
      authAddBlack: true,
      authAddGray: true,
      authdownload: true,
      searchParams: null,
      tableData: [],
      isShowDownloadBtn: false,
      btnPower: {
        downBtn:false,
        blockBtn:false
      },
      tableDataSec: {
        // 控制列显示  key和table-column[prop]一致
        customerNumber: [true, '商户编号'],
        trxUrl: [true, '交易网址'],
        webUrl: [true, '报备网址'],
        signedName: [true, '商户签约名'],
        count: [true, '请求数量']
      },
      currentPage: 1, // 当前页
      pageSize: 20, // 每页显示条数
      totalPage: 0, // 总页数
      totalNumber: 0, // 总条数
      multipleSelection: [],
      confirmAddBlack: false,
      confirmAddGray: false,
      download: false,
      startNum: 0,
      endNum: 0,
      maxPage:0
    }
  },
  watch: {
    download() {
      if (this.download === true) {
        this.startNum = 0
        this.endNum = Math.ceil(this.totalNumber / this.pageSize)
        this.maxPage = Math.ceil(this.totalNumber / this.pageSize)
        if (this.tableData.length === 0) {
          this.isShowDownloadBtn = false
        } else if (this.tableData.length !== 0) {
          this.startNum = 1
          this.isShowDownloadBtn = true
        }
      } else {
        this.startNum = 0
        this.maxPage = 0
      }
    },
    startNum: function(val) {
      if (val < 0) {
        this.startNum = 0
      }
    },
    endNum: function(val) {
      if (val < 0) {
        this.endNum = 0
      }
      if (val > 0) {
        this.isShowDownloadBtn = true
      }
    }
  },
  created(){
    // 按钮权限
    const idList = JSON.parse(localStorage.getItem('ARRLEVEL'))
    this.btnPower.blockBtn = idList.indexOf(560) === -1 ? false : true
    this.btnPower.downBtn = idList.indexOf(561) === -1 ? false : true
  },
  methods: {
    getList(params) {
      this.searchParams = params ? params : {}
      this.searchParams.pageNum = this.currentPage
      this.searchParams.pageSize = this.pageSize
      this.$axios
        .post(
          '/UrlCheckController/queryUrlList',
          qs.stringify(this.searchParams)
        )
        .then(res => {
          if (res.data.code == 200) {
            this.tableData = res.data.data.result
            this.totalPage = res.data.data.pages
            this.currentPage = res.data.data.nowPage
            this.totalNumber = res.data.data.total
            this.maxPage = Math.ceil(this.totalNumber / this.pageSize);
            // this.endNum = res.data.data.pages
            return
          }
          this.$alert(res.data.msg, '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          })
          this.tableData = []
          this.totalPage = 0
          this.currentPage = 1
          this.totalNumber = 0
          this.endNum = 0
        })
    },
    handleCurrentChange(val) {
      //翻页
      this.currentPage = `${val}` //当前页
      this.getList(this.searchParams)
    },
    selectedItems(row) {
      this.multipleSelection = row
    },
    addBlackBtn() {
      if (this.multipleSelection.length == 0) {
        this.$alert('请至少选择一条需要加黑的数据', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
        return
      }
      this.confirmAddBlack = true
    },
    addGrayBtn() {
      if (this.multipleSelection.length == 0) {
        this.$alert('请至少选择一条需要加灰的数据', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
        return
      }
      this.confirmAddGray = true
    },
    getData() {
      let arr = []
      this.multipleSelection.map(one => {
        arr.push({
          refer: one.trxUrl
        })
      })
      return arr
    },
    // 加黑名单
    addBlackList() {
      let arr = this.getData()
      this.$axios
        .post(
          '/changeName/changeName',
          qs.stringify({
            source: 753,
            buttonType: 'refer_check_black',
            data: JSON.stringify(arr),
            loginPerson: sessionStorage.getItem('testName')
          })
        )
        .then(res => {
          if (res.data.code * 1 === 200) {
            this.$alert(res.data.msg, '提示', {
              confirmButtonText: '确定',
              type: 'success'
            })
            this.confirmAddBlack = false
            this.multipleSelection = []
            this.getList(this.searchParams)
          }
        })
    },
    // 加灰名单
    addGrayList() {
      let arr = this.getData()
      this.$axios
        .post(
          '/changeName/changeName',
          qs.stringify({
            buttonType: 'check_detail_grey',
            data: JSON.stringify(arr),
            loginPerson: sessionStorage.getItem('testName')
          })
        )
        .then(res => {
          if (res.data.code * 1 === 200) {
            this.$alert(res.data.msg, '提示', {
              type: 'success',
              confirmButtonText: '确定'
            })
            this.confirmAddGray = false
            this.multipleSelection = []
            this.getList(this.searchParams)
          }
        })
    },
    downloadClose() {
      this.download = false
      this.startNum = 0
      this.endNum = 0
    },
    // 下载
    downloadList() {
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
        this.$alert('起始值需小于结束值', '提示', {
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

      window.location = encodeURI(
        this.url +
          '/UrlCheckController/downloadList?startTime=' +
          this.searchParams.startTime +
          '&endTime=' +
          this.searchParams.endTime +
          '&customerNumber=' +
          this.searchParams.customerNumber +
          '&trxUrl=' +
          this.searchParams.trxUrl +
          '&pageSize=' +
          this.pageSize +
          '&startNum=' +
          this.startNum +
          '&endNum=' +
          this.endNum
      )
      this.download = false
      this.startNum = 0
      this.endNum = 0
    }
  },
  components: {
    Searchbar,
    TableSelect
  }
}
</script>
<style scoped>
.tableData {
  padding: 0 10px;
  height: auto;
}
.contentBotoom {
  font-size: 13px;
  margin: 5px 0;
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
