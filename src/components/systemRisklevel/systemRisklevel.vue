// 风险等级设置
<template>
  <div class="dataContent">
      <div class="contentTop clear">
           <div class="serBtn">风险等级:  <el-input clearable placeholder="请输入内容" class="ipt" v-model="getDj"></el-input></div>
           <div class="serBtn">风险名称:  <el-input clearable placeholder="请输入内容" class="ipt" v-model="getMc"></el-input></div>
           <div class="serchImg serBtn" @click="riskSerch(1)" v-if="searchPermission">
                <img src="../../images/fdj.png" alt="">
           </div>
      </div>
      <div class="contentBotoom">
          <div class="button">
                <div class="leftButton clear">
                    <div class="BotoomBtn leftRadius" v-if="addPermission">
                        <div class="addIcon" @click="dataAdd = true"></div>
                    </div>
                    <!-- <div class="BotoomBtn"> -->
                        <!-- <div class="amendIcon" @click="dataAmend = true"></div> -->
                    <!-- </div> -->
                    <div class="BotoomBtn" v-if="delPermission">
                          <div class="removIcon"  @click="removData"></div>
                    </div>
                    <div class="BotoomBtn" v-if="refreshPermission">
                          <div class="refreshIcon" @click="refreshData"></div>
                    </div>
                    <div class="BotoomBtn rightRadius" @click="downloadData" v-if="printPermission">
                          <div class="downloadIcon"></div>
                    </div>
                </div>
          </div>
      </div>
      <div class="dialog">
          <!--修改对话框-->
          <div class="hiddeBox">
                <el-dialog title="风险等级修改" :visible.sync="dataAmend" width="400px" v-dialogDrag>
                  <el-form :model="form"  :label-position="labelPosition" label-width="100px" style='margin-left:15px' >
                      <el-form-item label="风险编号：">
                        <el-input  ref='sr5' v-model="form.fxbh" disabled class="disabled iptOnline"  onkeypress='return( /[\d]/.test(String.fromCharCode(event.keyCode) ) )'></el-input>
                    </el-form-item>
                    <el-form-item label="风险等级：" required>
                        <el-input  type="number" min="0" ref='sr6' v-model="form.fxdj" class='iptOnline' onkeypress='return( /[\d]/.test(String.fromCharCode(event.keyCode) ) )' id="riskLevel"></el-input>
                    </el-form-item>
                    <el-form-item label="最小风险值：">
                        <el-input  type="number" min="0" ref='sr8' v-model="form.zxfx" class='iptOnline' onkeypress='return( /[\d]/.test(String.fromCharCode(event.keyCode) ) )'></el-input>
                    </el-form-item>
                     <el-form-item label="最大风险值：">
                        <el-input  type="number" min="0" ref='sr7' v-model="form.zdfx" @focus="editSetNum" id='editSetNum' class='iptOnline' onkeypress='return( /[\d]/.test(String.fromCharCode(event.keyCode) ) )'></el-input>
                    </el-form-item>
                    <el-form-item label="风险名称：">
                        <el-input  ref='sr9' v-model="form.fxmc" placeholder="最大输入15位"  id="formFxmc" class='iptOnline'></el-input>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="dataAmendClose">取 消</el-button>
                    <el-button type="primary" @click="amendMsg">确 定</el-button>
                  </div>
                </el-dialog>
          </div>
          <!--新建对话框-->
          <div class="hiddeBox">
            <el-dialog title="新建风险等级"  :visible.sync="dataAdd" width="400px" v-dialogDrag>
                  <el-form :label-position="labelPosition" label-width="100px" :model="form" style='margin-left:15px' >
                    <el-form-item label="风险等级:">
                      <el-input type='number'  min='0' ref='sr1' placeholder="0"  v-model='form.sysNum' class='iptOnline' onkeypress='return( /[\d]/.test(String.fromCharCode(event.keyCode) ) )'></el-input>
                    </el-form-item>
                    <el-form-item label="最小风险值:">
                      <el-input type="number"  min='0' ref='sr3' placeholder="0" v-model='form.minVal' class='iptOnline' onkeypress='return( /[\d]/.test(String.fromCharCode(event.keyCode) ) )'></el-input>
                    </el-form-item>
                    <el-form-item label="最大风险值:">
                      <el-input type="number"  min='0' ref='sr2' @focus="setNum" id='sysMaxNum' placeholder="0" v-model='form.maxVal' class='iptOnline' onkeypress='return( /[\d]/.test(String.fromCharCode(event.keyCode) ) )'></el-input>
                    </el-form-item>
                     <el-form-item label="风险名称:">
                      <el-input v-model="form.type"  id="formType" ref='sr4' max='15' placeholder="最大输入15位" class='iptOnline'></el-input>
                    </el-form-item>
                  </el-form>


              <div slot="footer" class="dialog-footer">
                <el-button @click="dataAddClose">取 消</el-button>
                <el-button type="primary" @click="addMsg">确 定</el-button>
              </div>
            </el-dialog>
          </div>
      </div>
      <div class="contentData">
          <div class="dataTable clear">
             <el-table
                fixed
                max-height="600"
                :data="tableData"
                border
                style="width: 100%"
                @selection-change="handleSelectionChange">
                 <el-table-column
                    type="selection"
                    width="55"
                    align='center'
                    >
                  </el-table-column>
                  <el-table-column
                    prop="risklev"
                    label="风险等级"
                    align='center'
                    sortable
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
                  <el-table-column label="修改" align='center'>
                       <template slot-scope="scope" v-if="editPermission">
                           <div class="xgImg" @click="handleClick(scope.row,scope.$index)">
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
                    layout="total, prev, pager, next"
                    :total = pageCountNum>
                  </el-pagination>
              </div>
            </div>
      </div>
    <!-- <el-dialog
      v-dialogDrag
      title="删除"
      :visible.sync="delDialog"
      width="30%"
      :before-close="handleClose">
      <span>确定要删除以下风险等级吗？</span>
      <p v-for="(item,index) in multipleSelection" :key="index">风险等级={{item.risklev}}</p>
      <span slot="footer" class="dialog-footer">
    <el-button @click="delDialog = false">取 消</el-button>
    <el-button type="primary" @click="delSubmit">确 定</el-button>
  </span>
    </el-dialog> -->
  </div>
</template>

<script >
import qs from "qs";

export default {
  name: "风险等级设置",
  data() {
    return {
      searchPermission: true,//搜索权限
      addPermission: true,//新建权限
      delPermission: true,//删除
      refreshPermission: true,//刷新
      printPermission: true,//打印
      editPermission: true,//修改

      getDj: "",
      getMc: "",
      delDialog: false,
      currentPage2: 1,
      tableData: [],

      form: {
        fxbh: "",
        fxdj: "",
        zdfx: "",
        zxfx: "",
        fxmc: ""
      },

      dataAdd: false,
      dataAmend: false,

      multipleSelection: [],
      remouveDataId: [],
      startNum: 1,
      pageNum: 10,

      totalNum: 0,
      labelPosition: "right",
      pageCountNum: 0
    };
  },
  watch: {
    dataAdd() {
      console.log(this.dataAdd);
      if (this.dataAdd === false) {
        this.form.type = "";
        this.form = {};
        document.querySelector("#sysMaxNum").style.border = "1px solid #dcdfe6";
      }
    },
    dataAmend() {
      console.log(this.dataAmend);
      if (this.dataAmend === false) {
        document.querySelector("#editSetNum").style.border =
          "1px solid #dcdfe6";
      }
    }
  },
  created (){
    // 按钮权限
    const idList = JSON.parse(localStorage.getItem('ARRLEVEL'));
    this.searchPermission = idList.indexOf(284) === -1 ? false : true;
    this.addPermission = idList.indexOf(285) === -1 ? false : true;
    this.delPermission = idList.indexOf(288) === -1 ? false : true;
    this.refreshPermission = idList.indexOf(284) === -1 ? false : true;
    this.printPermission = idList.indexOf(312) === -1 ? false : true;
    this.editPermission = idList.indexOf(287) === -1 ? false : true;
  },
  mounted() {},
  methods: {
    setNum(e) {
      e.target.min = this.$refs.sr3.value;
    },
    editSetNum(e) {
      e.target.min = this.form.zxfx;
    },

    handleSizeChange(val) {
      this.pageNum = parseInt(val.target.value);
      this.riskSerch();
    },
    handleCurrentChange(val) {
      this.startNum = val;
      this.riskSerch(parseInt(val));
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
      this.remouveDataId = [];
      for (let i = 0; i < this.multipleSelection.length; i++) {
        this.remouveDataId.push(this.multipleSelection[i].riskid);
      }
      console.log(this.remouveDataId);
    },
    handleClose() {},
    handleClick(row, index) {
      this.dataAmend = true;
      this.form.fxmc = row.riskname;
      this.form.zxfx = row.minriskval;
      this.form.zdfx = row.maxriskval;
      this.form.fxdj = row.risklev;
      this.form.fxbh = row.riskid;
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
    filterTag(value, row) {
      return row.tag === value;
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    refreshData() {
      this.riskSerch(1);
    },
    downloadData() {
      if (this.startNum === "") {
        this.startNum = this.currentPage2;
      }
      if (this.pageNum === "") {
        this.pageNum = 10;
      }

      if (this.getDj === "") {
        this.getDj = "";
      } else if (this.getDj !== "") {
        this.getDj = parseInt(this.getDj);
      }
      let startNum = this.startNum;
      if (this.tableData.length > 0) {
        let obj = {};
        obj.type = "XT_FX";
        obj.startNum = parseInt(this.startNum);
        obj.pageNum = parseInt(this.pageNum);
        obj.riskLev = this.getDj;
        obj.riskName = this.getMc;
        localStorage.setItem("OBJ", JSON.stringify(obj));
        window.open(window.location.href.split("#")[0] + "#/downloadpage0");
      }
    },
    riskSerch(current = 1) {
      this.currentPage2 = current;
      if (this.startNum === "") {
        this.startNum = this.currentPage2;
      }
      if (this.pageNum === "") {
        this.pageNum = 10;
      }

      if (this.getDj === "") {
        this.getDj = "";
      } else if (this.getDj !== "") {
        this.getDj = parseInt(this.getDj);
      }

      this.$axios
        .post(
          "/RisklevconController/queryRiskListByLevAndName",
          qs.stringify({
            sessionId: localStorage.getItem("SID"),
            startNum: current,
            pageNum: parseInt(this.pageNum),
            riskLev: this.getDj,
            riskName: this.getMc
          })
        )
        .then(res => {
          console.log(res);
          if (res.data.status === 1) {
            this.tableData = [];
            this.tableData = this.tableData.concat(res.data.data.list);
            this.pageCountNum = res.data.data.pageCount;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    dataAddClose() {
      this.dataAdd = false;
      document.querySelector("#formType").style.border = "1px solid #dcdfe6";
    },
    addMsg() {
      if (document.querySelector("#formType").value.length > 15) {
        this.$alert("最大长度不能超过15位", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        document.querySelector("#formType").style.border = "1px solid #f56c6c";
        return;
      } else {
        document.querySelector("#formType").style.border = "1px solid #dcdfe6";
      }

      if (parseInt(this.$refs.sr2.value) < parseInt(this.$refs.sr3.value)) {
        document.querySelector("#sysMaxNum").style.border = "1px solid #f56c6c";
        this.$alert("最小风险值需小于最大风险值", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return;
      } else if (
        parseInt(this.$refs.sr2.value) > parseInt(this.$refs.sr3.value)
      ) {
        document.querySelector("#sysMaxNum").style.border = "1px solid #dcdfe6";
      }

      if (this.form.maxVal == undefined || this.form.maxVal == "") {
        this.form.maxVal = "0";
      }
      if (this.form.minVal == undefined || this.form.minVal == "") {
        this.form.minVal = "0";
      }

      this.$axios
        .post(
          "/RisklevconController/addRiskLev",
          qs.stringify({
            sessionId: localStorage.getItem("SID"),
            risklev: this.form.sysNum,
            maxriskval: this.form.maxVal,
            minriskval: this.form.minVal,
            riskname: this.$refs.sr4.value
          })
        )
        .then(res => {
          console.log(res.data);

          if (res.data.code == 1) {
            this.$alert(res.data.message, "新建", {
              confirmButtonText: "确定",
              type: "success",
              callback: action => {
                this.form = {};
                this.dataAdd = false;
                this.addComeback = true;
                this.form.type = "";
                this.riskSerch(1);
              }
            });
          } else if (res.data.code != 1) {
            this.$alert(res.data.message, "新建", {
              type: "warning",
              confirmButtonText: "确定",
              callback: action => {}
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    dataAmendClose() {
      this.dataAmend = false;
      document.querySelector("#formFxmc").style.border = "1px solid #dcdfe6";
      document.querySelector("#riskLevel").style.border = '';
    },
    amendMsg() {
      if (document.querySelector("#riskLevel").value === '') {
        document.querySelector("#riskLevel").style.border = "1px solid #f56c6c";
        return;
      }

      if (document.querySelector("#formFxmc").value.length > 15) {
        this.$alert("最大长度不能超过15位", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        document.querySelector("#formFxmc").style.border = "1px solid #f56c6c";
        return;
      } else {
        document.querySelector("#formFxmc").style.border = "1px solid #dcdfe6";
      }

      // console.log(parseInt(this.$refs.sr6.value))
      if (parseInt(this.form.zdfx) < parseInt(this.form.zxfx)) {
        document.querySelector("#editSetNum").style.border =
          "1px solid #f56c6c";
        this.$alert("最小风险值需小于最大风险值", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return;
      } else if (parseInt(this.form.zdfx) > parseInt(this.form.zxfx)) {
        document.querySelector("#editSetNum").style.border =
          "1px solid #dcdfe6";
      }

      this.$axios
        .post(
          "/RisklevconController/updateRisk",
          qs.stringify({
            sessionId: localStorage.getItem("SID"),
            risklev: parseInt(this.form.fxdj),
            riskname: this.form.fxmc,
            maxriskval: parseInt(this.form.zdfx),
            minriskval: parseInt(this.form.zxfx),
            riskid: parseInt(this.form.fxbh)
          })
        )
        .then(res => {
          if (res.data.code == 1) {
            this.$alert(res.data.message, "提示", {
              type: "success",
              confirmButtonText: "确定",
              callback: action => {
                this.dataAmend = false;
                this.riskSerch(1);
              }
            });
          } else if (res.data.code != 1) {
            this.$alert(res.data.message, "提示", {
              type: "warning",
              confirmButtonText: "确定"
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    removData() {
      console.log(this.remouveDataId);
      if (this.remouveDataId.length == 0) {
        this.$alert("请选择您要删除的内容", "系统提示", {
          confirmButtonText: "确定",
          type: "warning",
          callback: action => {
            this.riskSerch(1);
          }
        });
        return;
      } else if (this.remouveDataId.length !== 0) {
        let risklev = []
        this.multipleSelection.map(one => {
          risklev.push(one.risklev)
        })
        this.$confirm('<p>确定要删除以下风险等级吗?</p>风险等级分别为' +　risklev.join(','), '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          dangerouslyUseHTMLString: true,
          type: 'warning'
          }).then(() => {
            this.delSubmit()
          }).catch(action => {
            console.log(action)
        });
        // this.delDialog = true;
      }
    },
    delSubmit() {
      this.$axios
        .post(
          "/RisklevconController/deleteRisk",
          qs.stringify({
            sessionId: localStorage.getItem("SID"),
            riskid: this.remouveDataId.join(",")
          })
        )
        .then(res => {
          console.log(res.data);
          if (res.data.code === "1") {
            this.$alert("删除" + res.data.message, "系统提示", {
              type: "success",
              confirmButtonText: "确定",
              callback: action => {
                this.delDialog = false;
                this.riskSerch(1);
              }
            });
          }
        })
        .catch(error => {
          console.log(error);
          console.log(this.remouveDataId);
        });
    }
  }
};
</script>
<style scoped>
.dialog-footer {
  background-color: #f1f2f5;
  border: none;
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
  border-top: 1px solid #e0e0e0;
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
  background: url(../../images/icon.png) no-repeat -37px -7px;
  width: 25px;
  height: 25px;
  margin: 0 auto;
  margin-top: 5px;
  border: 1px solid #38e139;
  cursor: pointer;
  border-radius: 5px;
}
.xgImg:hover {
  background: url(../../images/icon.png) no-repeat -37px -32px;
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
input:focus {
  border: 1px solid #3faaf9;
}
.disabled {
  /* background-color: #f5f7fa;
    border-color: #e4e7ed;
    color: #c0c4cc;
    cursor: not-allowed; */
}

.iptOnline {
  margin-right: 15px;
  height: 36px;
  line-height: 36px;
  width: 200px;
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
  float: right;
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
  float: right;
}
</style>
