// 线下机构管理
<template>
  <div>
        <div class="leftBox">
          <el-input clearable v-model="filterText" style="width:90%"  placeholder="请输入内容">
            <i class="el-icon-search el-input__icon" slot="suffix"> </i>
          </el-input>
         
            <el-tree
              class="filter-tree"
              :data="data2Data"
              :props="defaultProps"
              default-expand-all
              :filter-node-method="filterNode"
              @node-contextmenu = 'showMenu'
              :expand-on-click-node = 'false'
              @node-click = 'clickTree'
              ref="tree2">
            </el-tree>

          <div class="menu" v-show="showMenuDetail" ref="feidie" >
            <div class="treencont" @click="editOffline = true">
              <div class="bjtree" ></div>
              编辑
            </div>
            <div class="treencont" @click="showAddForm">
              <div class="addtree" ></div>
              添加
            </div>
            <div class="treencont" v-show="showDelBtn" @click="delOffline = true">
              <div class="removetree" ></div>
              删除
            </div>
          </div>
        </div>


    <el-dialog title="编辑线下机构" :visible.sync="editOffline"  width="400px" v-dialogDrag>
      <el-form :model="formEdit" :rules="offlineRules">
        <el-form-item label="机构名称" :label-width="formLabelWidth" prop="mechname">
          <el-input id="mechname" clearable v-model="formEdit.mechname" auto-complete="off"  class='iptOnline'></el-input>
        </el-form-item>
        <el-form-item label="派发层级" :label-width="formLabelWidth" prop="disarr">
          <el-select   v-model="formEdit.disarr" id="disarr" style='width:200px'>
            <el-option label="总部" value="2"></el-option>
            <el-option label="一级机构" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审核层级" :label-width="formLabelWidth" prop="examarr">
          <el-select v-model="formEdit.examarr" id="examarr"  style='width:200px'>
            <el-option label="总部" value="2"></el-option>
            <el-option label="一级机构" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="负责人姓名" :label-width="formLabelWidth">
          <el-input  clearable v-model="formEdit.percha" auto-complete="off" id="percha" class='iptOnline'></el-input>
        </el-form-item>
        <el-form-item label="联系方式" :label-width="formLabelWidth">
          <el-input  clearable v-model="formEdit.coninfo" auto-complete="off" id="coninfo" class='iptOnline'></el-input>
        </el-form-item>
        <el-form-item label="机构描述" :label-width="formLabelWidth">
          <el-input  clearable type="textarea" v-model="formEdit.descibe" placeholder="最大长度不能超过100位" id="descibe" class='iptOnline'></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editOfflineClose">取 消</el-button>
        <el-button type="primary"  @click="editOfflineSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="新建线下机构" :visible.sync="addOffline"   width="400px" v-dialogDrag>
      <el-form :model="formAddOffline"  :rules="addRules">
        <el-form-item label="机构名称" :label-width="formLabelWidth" prop="mechname">
          <el-input id="mechname" clearable v-model="formAddOffline.mechname" auto-complete="off" placeholder="最大长度不能超过15位" class='iptOnline'></el-input>
        </el-form-item>
        <!-- <el-form-item label="上级机构名称" :label-width="formLabelWidth" prop="upmech">
          <el-input id="upmech" clearable v-model="formAddOffline.upmech" auto-complete="off" placeholder="最大长度不能超过15位" class='iptOnline'></el-input>
        </el-form-item> -->
        <el-form-item label="派发层级" :label-width="formLabelWidth" prop="disarr">
          <el-select v-model="formAddOffline.disarrText"  style='width:200px' id="disarr">
            <el-option label="总部" value="2" ></el-option>
            <el-option label="一级机构" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审核层级" :label-width="formLabelWidth">
          <el-select v-model="formAddOffline.examarrText"  style='width:200px' id="examarr">
            <el-option label="总部" value="2" ></el-option>
            <el-option label="一级机构" value="0" ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="负责人姓名" :label-width="formLabelWidth">
          <el-input  clearable v-model="formAddOffline.percha" auto-complete="off" placeholder="最大长度不能超过15位" class='iptOnline'></el-input>
        </el-form-item>
        <el-form-item label="联系方式" :label-width="formLabelWidth">
          <el-input  clearable v-model="formAddOffline.coninfo" auto-complete="off" placeholder="最大长度不能超过15位" class='iptOnline'></el-input>
        </el-form-item>
        <el-form-item label="机构描述" :label-width="formLabelWidth">
          <el-input  clearable type="textarea" v-model="formAddOffline.descibe" placeholder="最大长度不能超过100位" class='iptOnline'></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addOfflineClose">取 消</el-button>
        <el-button type="primary" @click="addOfflineSubmit()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      v-dialogDrag
      title="确认"
      :visible.sync="delOffline"
      width="30%">
      <div style='width:100%;text-align:center'>  
        <span>该机构下的子机构也会一并删除，你确定要删除吗？</span>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="delOffline = false">否</el-button>
          <el-button type="primary" @click="delOfflineSubmit">是</el-button>
        </span>
    </el-dialog>
        <div class="rightBox">
              <div class="dataContent">
                <div class="contentTop clear">
                    <div class="serBtn">机构名称:  <el-input placeholder="请输入" clearable class="ipt" v-model="getDj" @keyup.enter="Serch(1)"></el-input></div>
                    <div class="serchImg serBtn" @click="Serch(1)" v-if="searchByBtnPermission">
                          <img src="../../images/fdj.png" alt="" >
                    </div>
                    <div class="contentBotoom">
                    <div class="button">
                          <div class="leftButton clear">
                              <div class="BotoomBtn leftRadius" v-if="refreshPermission">
                                    <div class="refreshIcon" @click="refreshData"></div>
                              </div>
                              <div class="BotoomBtn rightRadius" @click="downLoadPath" v-if="printPermission">
                                    <div class="downloadIcon"></div>
                              </div>
                          </div>
                    </div>
                </div>
                </div>
                <div class="contentData">
                    <div class="dataTable clear">
                      <el-table
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
                            <!-- <el-table-column
                              width="100px"
                              prop="mechid"
                              label="机构ID"
                              sortable
                              align='center'
                            > -->
                            </el-table-column>
                            <el-table-column
                              prop="mechname"
                              label="机构名称"
                              align='center'
                            >
                            </el-table-column>
                            <el-table-column
                              prop="mecharr"
                              label="机构层次"
                              align='center'
                              >
                            </el-table-column>
                            <el-table-column
                              prop="upmech"
                              label="上级机构"
                              align='center'
                            >
                            </el-table-column>
                            <el-table-column
                              prop="upmechid"
                              width="100px"
                              label="上级机构ID"
                              align='center'
                            >
                            </el-table-column>
                            <el-table-column
                              prop="percha"
                              width="100px"
                              label="负责人姓名"
                              align='center'
                            >
                            </el-table-column>
                            <el-table-column
                              prop="coninfo"
                              label="联系方式"
                              align='center'
                            >
                            </el-table-column>
                            <el-table-column
                              prop="descibe"
                              label="机构描述"
                              align='center'
                            >
                            </el-table-column>
                            <el-table-column
                              prop="curuser"
                              label="创建人"
                              v-if="false"
                            >
                            </el-table-column>
                            <el-table-column
                              prop="cretm"
                              label="创建时间"
                              align='center'
                            >
                            </el-table-column>
                            <el-table-column
                              prop="uptm"
                              width="100px"
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
                              :page-size=pagenum
                              layout="prev, pager, next"
                              :total = pageCount>
                            </el-pagination>
                        </div>
                    </div>      
                  
                </div>
            </div>
        </div>
  </div>
</template>
<script >
import qs from "qs";
export default {
  name: "线下机构管理",
  data() {
    return {
      getTreeListPermission: true, //获取左侧树形菜单权限
      searchByBtnPermission: true, //点击button搜索权限
      refreshPermission: true, //刷新权限
      printPermission: true, //打印权限

      getDj: "",
      currentPage2: 1,
      showMenuDetail: false,

      filterText: "",
      startnum: 1,
      pagenum: 10,
      showDelBtn: true,
      addOffline: false,
      treeState: true,
      editOffline: false,
      delOffline: false,
      clickMenuKey: "",
      treeClickDetail: {},

      data2Data: [],
      data2: [],
      defaultProps: {
        children: "list",
        label: "mechname"
      },
      tableData: [],
      formAddOffline: {
        mechname: "",
        upmech: "",
        percha: "",
        coninfo: "",
        descibe: "",
        examarr: "",
        disarr: ""
      },
      formEdit: {
        mechname: "",
        upmech: "",
        percha: "",
        coninfo: "",
        descibe: "",
        examarr: "",
        disarr: ""
      },
      formLabelWidth: "120px",
      offlineRules: {
        mechname: [{ required: true, message: " ", trigger: "blur" }],
        disarr: [{ required: true, message: " ", trigger: "change" }]
      },
      addRules: {
        mechname: [{ required: true, message: " ", trigger: "blur" }],
        disarr: [{ required: true, message: " ", trigger: "change" }]
      },
      totalCount: 0,
      change: 0,
      changeMechid: "",
      pageCount: 0,
      nodeMechid: ""
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val);
    },
    addOffline() {
      if (this.addOffline === false) {
        this.formAddOffline = {};
      }
    }
  },
  created (){
    // 按钮权限
    const idList = JSON.parse(localStorage.getItem('ARRLEVEL'));
    this.getTreeListPermission = idList.indexOf(306) === -1 ? false : true;
    this.searchByBtnPermission = idList.indexOf(297) === -1 ? false : true;
    this.refreshPermission = idList.indexOf(297) === -1 ? false : true;
    this.printPermission = idList.indexOf(307) === -1 ? false : true;
  },
  methods: {
    init() {
      // 如果没有树形菜单的权限，则不请求
      if(this.getTreeListPermission === false) return;
      this.$axios
        .post(
          "/OrganizationController/queryListByUpLevId",
          qs.stringify({
            sessionId: localStorage.getItem("SID"),
            upmechid: parseInt(1),
            mechLine: parseInt(1)
          })
        )
        .then(res => {
          if (res.data.code === 1) {
            this.data2Data = [];
            this.data2Data = this.data2Data.concat(res.data.recordList);
          }
        });
    },

    showMenu(event, data) {
      let e = event || window.event;
      let target = e.targe || e.srcElement;

      this.treeClickDetail = data;
      this.formEdit.mechname = data.mechname;
      this.formEdit.percha = data.percha;
      this.formEdit.coninfo = data.coninfo;
      this.formEdit.descibe = data.descibe;
      this.formEdit.disarr = data.disarr; //派发层级
      this.formEdit.examarr = data.examarr; //审核层级

      if (this.formEdit.disarr === 0) {
        this.formEdit.disarr = "一级机构";
      } else if (this.formEdit.disarr === 2) {
        this.formEdit.disarr = "总部";
      }

      if (this.formEdit.examarr === 0) {
        this.formEdit.examarr = "一级机构";
      } else if (this.formEdit.examarr === 2) {
        this.formEdit.examarr = "总部";
      }

      this.clickMenuKey = data.mechid;

      if (data.mechid === 1) {
        this.showDelBtn = false;
        if (
          target.tagName.toLowerCase() == "div" ||
          target.tagName.toLowerCase() == "span"
        ) {
          this.showMenuDetail = true;
          let menuPosition = this.$refs.feidie;
          menuPosition.style.left = e.pageX + "px";
          menuPosition.style.top = e.pageY + "px";
          let _this = this;
          window.onclick = function() {
            _this.showMenuDetail = false;
          };
        }
      } else if (data.mechid !== 1) {
        this.showDelBtn = true;
        this.treeState = false;
        if (
          target.tagName.toLowerCase() === "div" ||
          target.tagName.toLowerCase() === "span"
        ) {
          this.showMenuDetail = true;
          let menuPosition = this.$refs.feidie;
          menuPosition.style.left = e.pageX + "px";
          menuPosition.style.top = e.pageY + "px";
          let _this = this;
          window.onclick = function() {
            _this.showMenuDetail = false;
          };
        }
      }
    },
    handleSizeChange(val) {
      this.pagenum = parseInt(val.target.value);
      if (this.change == 1) {
        this.Serch();
      } else if (this.change == 2) {
        this.getOfflineTableList();
      }
    },
    handleCurrentChange(val) {
      if (this.change == 1) {
        this.Serch(val);
      } else if (this.change == 2) {
        this.getOfflineTableList(val);
      }
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    handleSelectionChange(val) {},
    Serch(current = 1) {
      if (this.searchByBtnPermission === false) return;
      this.change = parseInt(1);
      this.changeMechid = "";
      this.currentPage2 = current;
      if (this.startnum == "") {
        this.startnum = this.currentPage2;
      }
      if (this.pagenum == "") {
        this.pagenum = 10;
      }
      console.log('-------current------');
      console.log(current);
      this.$axios
        .post(
          "/OrganizationController/queryListByMechNameLike",
          qs.stringify({
            sessionId: localStorage.getItem("SID"),
            mechname: this.getDj,
            startnum: current,
            pagenum: parseInt(this.pagenum),
            mechLine: parseInt(1)
          })
        )
        .then(res => {
          this.tableData = [];
          this.tableData = this.tableData.concat(res.data.recordList);
          this.pageCount = parseInt(res.data.totalSize);
          res.data.recordList.forEach(ele => {
            ele.uptm = this.getTime(ele.uptm);
            ele.cretm = this.getTime(ele.cretm);
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    refreshData() {},
    downLoadPath() {
      if (this.startnum == "") {
        this.startnum = this.currentPage2;
      }
      if (this.pagenum == "") {
        this.pagenum = 10;
      }
      let startnum = this.startnum;

      console.log(this.change);

      if (this.tableData.length !== 0) {
        if (this.change === parseInt(1)) {
          let offlineObj = {};
          offlineObj.type = "XT_XX";
          offlineObj.change = 1;
          offlineObj.mechname = this.getDj;
          offlineObj.startnum = parseInt(this.startnum);
          offlineObj.pagenum = parseInt(this.pagenum);
          offlineObj.mechLine = parseInt(1);

          localStorage.setItem("OBJ", JSON.stringify(offlineObj));
        } else if (this.change == parseInt(2)) {
          let offlineChangeObj = {};
          offlineChangeObj.type = "XT_XX";
          offlineChangeObj.change = 2;
          offlineChangeObj.mechid = this.nodeMechid;
          offlineChangeObj.mechLine = parseInt(1);
          offlineChangeObj.pageNum = parseInt(this.startnum);
          offlineChangeObj.pageSize = parseInt(this.pagenum);
          localStorage.setItem("OBJ", JSON.stringify(offlineChangeObj));
        }

        window.open(window.location.href.split("#")[0] + "#/downloadpage0");
      }
    },
    clickTree(data) {
      this.change = 2;
      this.nodeMechid = data.mechid;
      this.getOfflineTableList(1);
    },
    getOfflineTableList(current = 1) {
      this.currentPage2 = current;
      this.$axios
        .post(
          "/OrganizationController/queryInfoById",
          qs.stringify({
            sessionId: localStorage.getItem("SID"),
            mechid: this.nodeMechid,
            mechLine: parseInt(1),
            pageSize: parseInt(this.pagenum),
            pageNum: parseInt(current)
          })
        )
        .then(res => {
          this.tableData = [];
          this.tableData = this.tableData.concat(res.data.organization);
          this.pageCount = res.data.pageCount;

          this.tableData.forEach(ele => {
            ele.uptm = this.getTime(ele.uptm);
            ele.cretm = this.getTime(ele.cretm);
          });
        });
    },
    showAddForm() {
      if (this.treeState === true) {
        this.addOffline = true;
      } else if (this.treeState === false) {
        this.$alert("最多只能有一级机构", "出错提示", {
          type: "warning",
          confirmButtonText: "确定"
        });
        this.treeState = true;
      }
    },
    addOfflineClose() {
      this.addOffline = false;
      document.querySelector("#mechname").style.border = "1px solid #dcdfe6";
      document.querySelector("#upmech").style.border = "1px solid #dcdfe6";
      document.querySelector("#disarr").style.border = "1px solid #dcdfe6";
      document.querySelector("#examarr").style.border = "1px solid #dcdfe6";
    },
    addOfflineSubmit() {
      if (document.querySelector("#mechname").value == "") {
        document.querySelector("#mechname").style.border = "1px solid #f56c6c";
        this.$alert("机构名称不能为空", "系统提示", {
          type: "warning",
          confirmButtonText: "确定"
        });
        return;
      } else if (document.querySelector("#mechname").value !== "") {
        document.querySelector("#mechname").style.border = "1px solid #dcdfe6";
        if (document.querySelector("#disarr").value == "") {
          document.querySelector("#disarr").style.border = "1px solid #f56c6c";
          this.$alert("派发层级不能为空", "系统提示", {
            type: "warning",
            confirmButtonText: "确定"
          });
          return;
        } else if (document.querySelector("#disarr").value !== "") {
          document.querySelector("#disarr").style.border = "1px solid #dcdfe6";
        }
      }
      this.formAddOffline.upmechid = parseInt(1);
      this.formAddOffline.mecharr = parseInt(2);

      if (
        this.formAddOffline.disarrText !== "" ||
        this.formAddOffline.disarrText !== undefined
      ) {
        this.formAddOffline.disarr = parseInt(this.formAddOffline.disarrText);
      }

      if (this.formAddOffline.examarrText == "") {
        this.formAddOffline.examarr = -1;
      } else if (this.formAddOffline.examarrText !== "") {
        this.formAddOffline.examarr = this.formAddOffline.examarrText;
      }

      this.formAddOffline.sessionId = localStorage.getItem("SID");
      this.formAddOffline.mechLine = parseInt(1);
      this.$axios
        .post(
          "/OrganizationController/addMech",
          qs.stringify(this.formAddOffline)
        )
        .then(res => {
          if (res.data.code === 1) {
            this.$alert(res.data.message, "系统提示", {
              type: "success",
              confirmButtonText: "确定",
              callback: action => {
                this.addOffline = false;
                this.formAddOffline = {};
                this.init();
              }
            });
          } else if (res.data.code !== 1) {
            this.$alert(res.data.message, "系统提示", {
              confirmButtonText: "确定",
              type: "warning",
              callback: action => {}
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    editOfflineClose() {
      this.editOffline = false;
      document.querySelector("#mechname").style.border = "1px solid #dcdfe6";
      document.querySelector("#disarr").style.border = "1px solid #dcdfe6";
      document.querySelector("#examarr").style.border = "1px solid #dcdfe6";
    },
    editOfflineSubmit() {
      this.formEdit.upmech = this.treeClickDetail.upmech;
      this.formEdit.mechid = this.treeClickDetail.mechid;
      this.formEdit.upmechid = this.treeClickDetail.upmechid;
      this.formEdit.mecharr = this.treeClickDetail.mecharr;

      if (this.formEdit.disarr === "总部") {
        this.formEdit.disarr = parseInt(0);
      } else if (this.formEdit.disarr === "一级机构") {
        this.formEdit.disarr = parseInt(1);
      }

      if (this.formEdit.examarr === "总部") {
        this.formEdit.examarr = parseInt(0);
      } else if (this.formEdit.examarr === "一级机构") {
        this.formEdit.examarr = parseInt(1);
      }

      this.formEdit.percha = document.querySelector("#percha").value;
      this.formEdit.coninfo = document.querySelector("#coninfo").value;
      this.formEdit.descibe = document.querySelector("#descibe").value;

      if (document.querySelector("#mechname").value === "") {
        document.querySelector("#mechname").style.border = "1px solid #f56c6c";

        return;
      } else if (document.querySelector("#mechname").value !== "") {
        document.querySelector("#mechname").style.border = "1px solid #dcdfe6";
        if (document.querySelector("#disarr").value === "") {
          document.querySelector("#disarr").style.border = "1px solid #f56c6c";

          return;
        } else if (document.querySelector("#disarr").value !== "") {
          document.querySelector("#disarr").style.border = "1px solid #dcdfe6";
        }
      }

      this.formEdit.sessionId = localStorage.getItem("SID");
      this.formEdit.mechLine = parseInt(1);
      this.$axios
        .post("/OrganizationController/updateMech", qs.stringify(this.formEdit))
        .then(res => {
          if (res.data.code === 1) {
            this.$alert(res.data.message, "提示", {
              type: "success",
              confirmButtonText: "确定",
              callback: action => {
                this.editOffline = false;
                this.data2Data = [];
                this.init();
              }
            });
          } else if (res.data.code !== 1) {
            this.$alert(res.data.message, "提示", {
              confirmButtonText: "确定",
              type: "warning",
              callback: action => {}
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    delOfflineSubmit() {
      this.$axios
        .post(
          "/OrganizationController/deleteMech",
          qs.stringify({
            sessionId: localStorage.getItem("SID"),
            mechid: parseInt(this.clickMenuKey),
            mechLine: parseInt(1)
          })
        )
        .then(res => {
          if (res.data.code === 1) {
            this.$alert(res.data.message, "系统提示", {
              type: "success",
              confirmButtonText: "确定",
              callback: action => {
                this.data2Data = [];
                this.init();
                this.delOffline = false;
              }
            });
          } else if (res.data.code !== 1) {
            this.$alert(res.data.message, "系统提示", {
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
    getTime(time) {
      var date = new Date(time);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      var h = date.getHours();
      h = h < 10 ? "0" + h : h;
      var minute = date.getMinutes();
      var second = date.getSeconds();
      minute = minute < 10 ? "0" + minute : minute;
      second = second < 10 ? "0" + second : second;
      return (time =
        y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second);
    }
  },
  beforeMount() {
    this.init();
  },
  mounted() {}
};
</script>
<style scoped>
.treencont {
  width: 83px;
  height: 30px;
  margin-top: 5px;
}
.treencont:hover {
  color: #38e139;
}
.menu {
  position: absolute;
  width: 85px;
  height: auto;
  background-color: rgb(36, 44, 60);
  color: #fff;
  z-index: 9;
}
.menu div {
  cursor: pointer;
}
.addtree {
  width: 15px;
  height: 15px;
  background: url(../../images/newfff.png) no-repeat;
  float: left;
  padding-right: 15px;
  margin-left: 10px;
  margin-top: 6px;
}
.addtree:hover {
  width: 15px;
  height: 15px;
  background: url(../../images/newgreen.png) no-repeat;
  float: left;
  padding-right: 15px;
  margin-left: 10px;
  margin-top: 6px;
}
.bjtree {
  width: 15px;
  height: 15px;
  background: url(../../images/bjfff.png) no-repeat;
  float: left;
  padding-right: 15px;
  margin-left: 10px;
  margin-top: 6px;
}
.bjtree:hover {
  width: 15px;
  height: 15px;
  background: url(../../images/bjgreen.png) no-repeat;
  float: left;
  padding-right: 15px;
  margin-left: 10px;
  margin-top: 6px;
}
.removetree {
  width: 15px;
  height: 15px;
  background: url(../../images/scfff.png) no-repeat;
  float: left;
  padding-right: 15px;
  margin-left: 10px;
  margin-top: 6px;
}
.removetree:hover {
  width: 15px;
  height: 15px;
  background: url(../../images/scgreen.png) no-repeat;
  float: left;
  padding-right: 15px;
  margin-left: 10px;
  margin-top: 6px;
}

.leftBox {
  width: 18%;
  height: 800px;
  padding-left: 25px;
  padding-top: 25px;
  float: left;
  border-right: 1px solid #f5f6fa;
  border-top: 1px solid #e0e0e0;
}
.rightBox {
  float: left;
  width: 78%;
}
.serchipt {
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 37px;
  border: 1px solid #dcdfe6;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 36px;
  outline: 0;
  padding: 0 15px;
  -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 90%;
  margin-bottom: 15px;
}
.serchipt::-webkit-input-placeholder {
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
  padding-bottom: 80px;
  border-top: 1px solid #e0e0e0;
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
.leftButton {
  float: right;
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
  font-size: 13px;
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
.dialog-footer {
  border: none;
  background-color: #f1f2f5;
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
.el-icon-search {
  color: #3faaf9;
}
</style>

