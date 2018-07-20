// 日志管理
<template>
  <div class="dataContent">
      <div class="contentTop clear">
           <div class="content">
            <div class="serBtn hideTimeRightIcon" >
              <span class='textLabel '>操作时间(开始):</span>
                  <el-date-picker
                    v-model="beginTime"
                    type="datetime"
                    placeholder="选择日期时间"
                    style="width:50%;height:36px;"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    id='beginTimeFocus'
                    @focus="beginTimeFocusEvent"
                    :picker-options="pickerOptionBegin"
                    >
                  </el-date-picker>
            </div>
            <div class="serBtn hideTimeRightIcon">
                 <span class='textLabel'>操作时间(结束):</span>
                  <el-date-picker
                    v-model="endTime"
                    style="width:50%;height:36px;"
                    type="datetime"
                    placeholder="选择日期时间"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    id='endTimeFocus'
                    @focus="endFocusEvent"
                    :picker-options="pickerOptions"

                  >
                  </el-date-picker>
            </div>
            <div class="serBtn">
               <span class='textLabel'>操作人:</span>
                <el-input clearable placeholder="请输入内容" class="ipt" v-model="user"></el-input>
            </div>
             <div class="serchImg" @click="search" v-if="searchPermission">
                  <img src="../../images/fdj.png" alt="" >
                </div>
              </div>
          <div class="content">
               <div class="serBtn">
                 <span class='textLabel'> 模块:</span>
                 <el-select v-model="modular" placeholder="请选择" style='width:50%'>
                   <el-option
                     v-for="item in options"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
                   </el-option>
                 </el-select>
               </div>
              <div class="serBtn">
               <span class='textLabel'>设备指纹: </span>
                <el-input clearable placeholder="请输入内容" class="ipt" v-model="pmfing"></el-input>
              </div>
              <div class="serBtn">
                <span class='textLabel'>IP:  </span>
                <el-input clearable placeholder="请输入内容" class="ipt" v-model="ip"></el-input>
              </div>
              <div class="serchImg resetBtn"  @click="reset" v-if="resetPermission">
                  <img src="../../images/reset.png" alt="" >
                </div>
          </div>
          <!-- <div class="conBtn">
                <div class="serchImg serBtn" @click="search">
                  <img src="../../images/fdj.png" alt="" >
                </div>
                <div class="serchImg resetBtn" style="margin-top:30px;" @click="reset">
                  <img src="../../images/reset.png" alt="" >
                </div>
          </div> -->
      </div>
      <div class="contentData">
          <div class="dataTable clear">
             <el-table
                fixed
                max-height="600"
                :data="tableData"
                border
                style="width: 100%"
                @selection-change="handleSelectionChange"
                align='center'

                >
                 <!-- <el-table-column
                    type="selection"
                    width="55"
                    >
                  </el-table-column> -->
                  <el-table-column
                    prop="operator"
                    label="操作人"
                     sortable
                      width="100"
                      align='center'
                  >
                  </el-table-column>
                  <el-table-column
                    prop="dateStr"
                    label="操作时间"
                    align='center'
                    >
                  </el-table-column>
                  <el-table-column
                    prop="modular"
                    label="模块"
                    align='center'
                    >
                  </el-table-column>
                  <el-table-column
                    prop="submodule"
                    label="子模块"
                    align='center'
                   >
                  </el-table-column>
                  <el-table-column
                    prop="operate"
                    label="操作"
                    align='center'
                   >
                  </el-table-column>
                  <el-table-column
                    prop="opecontent"
                    label="操作内容"
                    align='center'
                   >
                  </el-table-column>
                  <el-table-column
                    prop="pmfing"
                    label="设备指纹"
                    align='center'
                   >
                  </el-table-column>
                  <el-table-column
                    prop="opeip"
                    label="操作IP"
                    align='center'
                   >
                  </el-table-column>
                  <el-table-column label="查看详情" align='center'>
                       <template slot-scope="scope" v-if="detailPermission">
                           <div class="xgImg" @click="handleClick(scope.row,scope.$index)" style="width: 27px;height: 26px; margin: 0 auto;margin-top: 4px;border: 1px solid #38E139;cursor: pointer;border-radius: 5px;">
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
                    :page-size=pageNum
                    layout="prev, pager, next"
                    :total = totalPageNum>
                  </el-pagination>
              </div>
          </div>

      </div>
  </div>
</template>
<script>
import qs from "qs";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "日志管理",
  data() {
    return {
      searchPermission: true, //搜索权限
      resetPermission: true, //重置
      detailPermission: true, // 详情
      currentPage2: 1,
      tableData: [],
      totalPageNum: 0,
      beginTime: "",
      endTime: "",
      options: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "评级管理",
          label: "评级管理"
        },
        {
          value: "核查单管理",
          label: "核查单管理"
        },
        {
          value: "案件中心",
          label: "案件中心"
        },
        {
          value: "名单管理",
          label: "名单管理"
        },
        {
          value: "关联查询",
          label: "关联查询"
        },
        {
          value: "报表中心",
          label: "报表中心"
        },
        {
          value: "监控中心",
          label: "监控中心"
        },
        {
          value: "系统设置",
          label: "系统设置"
        },
        {
          value: "商户风险管理",
          label: "商户风险管理"
        },
        {
          value: "反差查询",
          label: "反差查询"
        }
      ],
      modular: "",
      user: "",
      pmfing: "",
      ip: "",
      pageNum: 10,
      startNum: "",
      pageNumTotal: 0,
      pickerOptions: this.pickerOption(),
      pickerOptionBegin: this.pickerOptionBeginTime()
    };
  },
  created() {
    // 按钮权限
    const idList = JSON.parse(localStorage.getItem("ARRLEVEL"));
    this.searchPermission = idList.indexOf(332) === -1 ? false : true;
    this.resetPermission = idList.indexOf(333) === -1 ? false : true;
    this.detailPermission = idList.indexOf(198) === -1 ? false : true;
  },
  mounted() {},
  methods: {
    ...mapActions(["addtab"]),
    // 结束时间
    pickerOption() {
      let _this = this;
      return {
        disabledDate(beginTime) {
          return new Date().getTime() < beginTime.getTime();
        }
      };
    },
    // 开始时间
    pickerOptionBeginTime() {
      let _this = this;
      return {
        disabledDate(time) {
          let curDate = new Date(_this.endTime).getTime();
          let oneYear = 365 * 24 * 3600 * 1000;
          let oneYearData = curDate - oneYear;
          return time.getTime() < oneYearData;
        }
      };
    },

    init() {
      if (this.startNum === "") {
        this.startNum = this.currentPage2;
      }
      if (this.pageNum === "") {
        this.pageNum = 10;
      }

      this.$axios
        .post(
          "/LogManageController/query",
          qs.stringify({
            sessionId: localStorage.getItem("SID"),
            starDate: this.beginTime,
            endDate: this.endTime,
            modular: this.modular,
            operator: this.user,
            pmfing: this.pmfing,
            ip: this.ip,
            startNum: parseInt(this.startNum),
            pageNum: parseInt(this.pageNum)
          })
        )
        .then(res => {
          // console.log(res.data)
          this.tableData = [];
          this.tableData = this.tableData.concat(JSON.parse(res.data.data));
          this.pageNumTotal = parseInt(res.data.totalCount);
          this.totalPageNum = parseInt(res.data.totalPage);
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleClick(row, index) {
      console.log(row);
      let obj = {};
      obj.path = "/manager/logDetails";
      obj.name = "日志详情";
      // pbj.operaTime = row.dateStr
      //console.log(obj)

      localStorage.setItem("operaTime", JSON.stringify(row));

      this.$store.dispatch("addtab", obj);
      this.$router.push({ name: "日志详情", params: { id: row.logid } });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      console.log(val);
      this.pageNum = parseInt(val.target.value);
      this.init();
    },
    handleCurrentChange(val) {
      this.startNum = val;
      console.log(val);
      this.init();
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

    search() {
      if (
        this.beginTime == "" ||
        this.beginTime == undefined ||
        this.endTime == "" ||
        this.endTime == undefined
      ) {
        this.$alert("操作时间(开始)与操作时间(结束)不能为空", "系统提示");
      } else if (this.beginTime > this.endTime) {
        this.$alert("操作时间(开始)不能大于操作时间(结束)", "系统提示");
      } else {
        this.init();
      }
    },
    reset() {
      this.beginTime = "";
      this.endTime = "";
      this.modular = "";
      this.user = "";
      this.pmfing = "";
      this.ip = "";
    },

    initTimeSet() {
      let date = new Date();
      let y = date.getFullYear();
      let m = "0" + (date.getMonth() + 1);
      let d = "0" + date.getDate();
      // console.log(y+'-'+m+'-'+d)
      this.beginTime =
        y +
        "-" +
        m.substring(m.length - 2, m.length) +
        "-" +
        d.substring(d.length - 2, d.length) +
        " " +
        "00:00:00";
      this.endTime =
        y +
        "-" +
        m.substring(m.length - 2, m.length) +
        "-" +
        d.substring(d.length - 2, d.length) +
        " " +
        "23:59:59";
    },
    beginTimeFocusEvent() {
      document.querySelector("#beginTimeFocus").setAttribute("readOnly", true);
    },
    endFocusEvent() {
      document.querySelector("#endTimeFocus").setAttribute("readOnly", true);
    }
  },
  mounted() {
    this.initTimeSet();
  }
};
</script>
<style scoped>
.hideTimeRightIcon .el-input__suffix {
  display: none;
}
.textLabel {
  display: inline-block;
  text-align: right;
  width: 32%;
}
.conBtn {
  width: 200px;
  height: 100px;
  /* position: absolute;
  right: 0;
  top: 33px; */
}
.content {
  width: auto;
  height: 60px;
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
  width: 50%;
  height: 41px;
  margin-right: 40px;
  border-radius: 22px;
}
.contentTop {
  padding-top: 30px;
  position: relative;
  /* border:1px solid #e0e0e0; */
  /* border-bottom: 1px solid #ccc; */
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
.xgImg {
  background: url(../../images/icon.png) no-repeat -166px -7px;
  width: 25px;
  height: 25px;
  margin: 0 auto;
  margin-top: 5px;
  background-color: #ffffff;
  cursor: pointer;
  border-radius: 5px;
}
.xgImg:hover {
  background: url(../../images/icon.png) no-repeat -166px -30px;
  width: 25px;
  height: 25px;
  margin: 0 auto;
  background-color: #38e139;
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
  width: 10%;
  height: 36px;
  border-radius: 100px;
  background-color: #3faaf9;
  display: inline-block;
  float: left;
  cursor: pointer;
  position: relative;
}

.serchImg img {
  width: 37px;
  position: absolute;
  left: 50%;
  margin-left: -20px;
}
.resetBtn img {
  width: 18px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-top: -9px;
  margin-left: -9px;
}
.serBtn {
  float: left;
  width: 29%;
}
.block {
  margin-top: 25px;
  margin-left: 25px;
}
.el-table th > .cell {
  color: #353535;
  font-weight: 400;
}
.block {
  float: right;
  margin-right: 20px;
}
.elIconP {
  position: relative;
}
.elIconPosction {
  position: absolute;
  font-size: 10px;
}
.el-icon-caret-top {
  top: 45px;
  right: 5px;
  font-size: 17px;
}
.el-icon-caret-bottom {
  top: 57px;
  right: 5px;
  font-size: 17px;
}
input {
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: none;
  padding-left: 15px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
}
input:focus {
  border: 1px solid #3faaf9;
}
.disabled {
  background-color: #f5f7fa;
  border-color: #e4e7ed;
  color: #c0c4cc;
  cursor: not-allowed;
}

.block {
  margin-top: 34px;
  width: 100%;
}
.pagination {
  margin-left: 34px;
  font-size: 12px;
  color: #333333;
  display: inline-block;
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
  float: right;
}
.block {
  margin-top: 34px;
  width: 100%;
}
.pagination {
  margin-left: 34px;
  font-size: 12px;
  color: #333333;
  display: inline-block;
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
  float: right;
}
</style>
