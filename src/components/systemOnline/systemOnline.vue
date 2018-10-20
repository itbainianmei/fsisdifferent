// 线上机构管理
<template>
  <div>
        <div class="leftBox">
            <el-input  v-model="filterText" style="width:90%;" placeholder="请输入内容">
              <i class="el-icon-search el-input__icon" slot="suffix"> </i>
            </el-input>
            <el-tree
              class="filter-tree"
              :data="data2Data"
              :props="defaultProps"
              default-expand-all
              @node-contextmenu="npag"
              :filter-node-method="filterNode"
              ref="tree2"
              @node-click="handleNodeClick"
              :expand-on-click-node = 'false'
            >
            </el-tree>
            <div class="caidan" v-show="rightnew" ref="feidie" >
                  <div class="treencont" @click="edit = true" v-if="editPermission">
                      <div class="bjtree" ></div>
                      编辑
                  </div>
                  <div class="treencont" @click="addTreeClick" v-if="addPermission">
                      <div class="addtree" ></div>
                      添加
                  </div>
                  <div class="treencont" @click="del = true" v-show="showDelDiv" v-if="delPermission">
                      <div class="removetree" ></div>
                      删除
                  </div>
            </div>
        </div>
      <el-dialog title="编辑组织机构" :visible.sync="edit"  width="400px" v-dialogDrag>
        <el-form :model="form" :rules="offlineRules" ref="editForm">
          <el-form-item label="机构名称" :label-width="formLabelWidth" required>
            <el-input clearable v-model="form.mechname" auto-complete="off" id="mechname" class='iptOnline' placeholder="最大长度不能超过15位" :maxlength="15"></el-input>
          </el-form-item>
          <el-form-item label="上级结构" :label-width="formLabelWidth">
            <el-input  v-model="form.upmech" auto-complete="off" disabled="disabled" id="upmech" class='iptOnline' placeholder="最大长度不能超过15位" :maxlength="15"></el-input>
          </el-form-item>
          <el-form-item label="负责人姓名" :label-width="formLabelWidth">
            <el-input clearable v-model="form.percha" auto-complete="off" id="percha" class='iptOnline' placeholder="最大长度不能超过15位" :maxlength="15"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" :label-width="formLabelWidth" prop="coninfo">
            <el-input clearable v-model="form.coninfo" auto-complete="off" id="coninfo" class='iptOnline' placeholder="最大长度不能超过15位" :maxlength="15"></el-input>
          </el-form-item>
          <el-form-item label="机构描述" :label-width="formLabelWidth">
            <el-input clearable type="textarea" v-model="form.descibe" id="descibe" placeholder="最大长度不能超过100位" class='iptOnline' :maxlength="100"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editClose">取 消</el-button>
          <el-button type="primary" @click="edit_submit">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="新建组织机构" :visible.sync="add"  width="400px" v-dialogDrag>
        <el-form :model="formAdd" :rules="addRules" ref="addForm">
          <el-form-item label="机构名称" :label-width="formLabelWidth" prop="mechname">
            <el-input clearable v-model="formAdd.mechname" id="nameInput" auto-complete="off" placeholder="最大长度不能超过15位" class='iptOnline' :maxlength="15"></el-input>
          </el-form-item>
          <el-form-item label="上级结构" :label-width="formLabelWidth">
            <el-input  v-model="formAdd.upmech" auto-complete="off"  id="formAddUpmech" disabled="disabled" class='iptOnline' placeholder="最大长度不能超过15位" :maxlength="15"></el-input>
          </el-form-item>
          <el-form-item label="负责人姓名" :label-width="formLabelWidth">
            <el-input clearable v-model="formAdd.percha" id="formAddPercha" auto-complete="off" class='iptOnline' placeholder="最大长度不能超过15位" :maxlength="15"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" :label-width="formLabelWidth" prop="coninfo">
            <el-input clearable v-model="formAdd.coninfo" id="formAddConinfo" auto-complete="off" class='iptOnline' placeholder="最大长度不能超过15位" :maxlength="15"></el-input>
          </el-form-item>
          <el-form-item label="机构描述" :label-width="formLabelWidth">
            <el-input clearable type="textarea" id="formAddDescibe" v-model="formAdd.descibe" placeholder="最大长度不能超过100位" class='iptOnline' :maxlength="100"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addClose">取 消</el-button>
          <el-button type="primary" @click="add_submit">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog
        v-dialogDrag
        title="确认"
        :visible.sync="del"
        width="30%">
        <div style='width:100%;text-align:center'>
            <span>该机构下的子机构也会一并删除，你确定要删除吗？</span>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button @click="del = false">否</el-button>
          <el-button type="primary" @click="del_submit">是</el-button>
        </span>
      </el-dialog>

      <div class="rightBox">
              <div class="dataContent">
                <div class="contentTop clear">
                    <div class="serBtn">机构名称:  <el-input  clearable placeholder="请输入" class="ipt" v-model="getDj" @keyup.enter="Serch(1)" ></el-input></div>
                    <div class="serchImg serBtn"  @click="Serch(1)"  v-if="searchByBtnPermission">
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
                              prop="mechid"
                              min-width="100"
                              label="机构ID"
                              sortable
                               align='center'
                            > -->
                            </el-table-column>
                            <el-table-column
                              prop="mechname"
                              label="机构名称"
                              width="150"
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
                              width="150"
                               align='center'
                            >
                            </el-table-column>
                            <el-table-column
                              prop="upmechid"
                              label="上级机构ID"
                              min-width="100"
                               align='center'
                            >
                            </el-table-column>
                            <el-table-column
                              prop="percha"
                              min-width="100"
                              label="负责人姓名"
                               align='center'
                            >
                            </el-table-column>
                            <el-table-column
                              prop="coninfo"
                              label="联系方式"
                               width='150px'
                               align='center'
                            >
                            </el-table-column>
                            <el-table-column
                              prop="descibe"
                              label="机构描述"
                               width='150px'
                               align='center'
                            >
                            </el-table-column>

                            <el-table-column
                              prop="cretm"
                              label="创建时间"
                              width='150px'
                               align='center'
                            >
                            </el-table-column>
                            <el-table-column
                              prop="uptm"
                               width='150px'
                              label="最后更新时间"
                               align='center'
                            >
                            </el-table-column>
                            <el-table-column
                              prop="upuser"
                              label="更新者"
                               width='150px'
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
                              layout="total, prev, pager, next"
                              :total = totalNumCount>
                            </el-pagination>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  </div>
</template>
<script type="text/ecmascript-6">
import qs from "qs";
export default {
  name: "线上机构管理",
  data() {
    return {
      getTreeListPermission: false, //获取左侧树形菜单权限
      searchByBtnPermission: false, //点击button搜索权限
      refreshPermission: false, //刷新权限
      printPermission: false, //打印权限
      addPermission: false, //新增权限
      editPermission: false, //编辑权限
      delPermission: false, //删除权限

      currentPage2: 1,
      startnum: 1,
      pagenum: 10,
      edit: false,
      add: false,
      del: false,
      npag_key: "",
      getDj: "",
      form_edit: "",
      showDelDiv: false,

      filterText: "",
      rightnew: false,
      data2: [],
      data2Data: [],
      defaultProps: {
        children: "list",
        label: "mechname"
      },
      tableData: [],

      form: {
        mechname: "",
        upmech: "",
        percha: "",
        coninfo: "",
        descibe: ""
      },
      formAdd: {
        mechname: "",
        upmech: "",
        percha: "",
        coninfo: "",
        descibe: ""
      },
      addRules: {
        mechname: [
          { required: true, message: "请输入机构名称", trigger: "blur" },
          { max: 15, message: "最大长度不超过15位", trigger: "blur" }
        ],
        disarr: [{ required: true, message: "请选择派发层级", trigger: "change" }],
        coninfo: [
          {
            pattern: /(^1\d{10}$)|((^\d{7,8}$)|(^(\d{3,4})-(\d{7,8})$)|(^(\d{3,4})-(\d{7,8})-(\d{1,4})$)|(^(\d{7,8})-(\d{1,4})$))/,
            message: '请输入正确的电话号码，如01088888888/13122222222',
            trigger: "blur"
          }
        ]
      },
      offlineRules: {
        mechname: [
          { required: true, message: "请输入机构名称", trigger: "blur" },
          { max: 15, message: "最大长度不超过15位", trigger: "blur" }
        ],
        disarr: [{ required: true, message: "请选择派发层级", trigger: "change" }],
        coninfo: [
          {
            pattern: /(^1\d{10}$)|((^\d{7,8}$)|(^(\d{3,4})-(\d{7,8})$)|(^(\d{3,4})-(\d{7,8})-(\d{1,4})$)|(^(\d{7,8})-(\d{1,4})$))/,
            message: '请输入正确的电话号码，如01088888888/13122222222',
            trigger: "blur"
          }
        ]
      },
      formLabelWidth: "100px",
      showAdd: 0,
      totalNumCount: 0,
      dataArrayTable: [],
      change: 0,
      changeMechid: "",
      onlineNodeMechid: ""
    };
  },
  created (){
    // 按钮权限
    const idList = JSON.parse(localStorage.getItem('ARRLEVEL'));
    this.getTreeListPermission = idList.indexOf(304) === -1 ? false : true;
    this.searchByBtnPermission = idList.indexOf(292) === -1 ? false : true;
    this.refreshPermission = idList.indexOf(292) === -1 ? false : true;
    this.printPermission = idList.indexOf(305) === -1 ? false : true;
    this.addPermission = idList.indexOf(289) === -1 ? false : true;
    this.editPermission = idList.indexOf(290) === -1 ? false : true;
    this.delPermission = idList.indexOf(291) === -1 ? false : true;
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val);
    },
    add() {
      console.log(this.add);
      if (this.add === false) {
        this.formAdd = {};
        document.querySelector("#nameInput").value = "";
      }
    }
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
            mechLine: parseInt(0)
          })
        )
        .then(res => {
          console.log(res.data);
          if (res.data.code == 1) {
            this.data2Data = [];
            res.data.recordList.forEach(element => {
              if (element.mecharr == 1) {
                element.upmech = '';
                element.upmechid = '';
              }
            });
            this.data2Data = this.data2Data.concat(res.data.recordList);
          }
        });
    },

    addTreeClick() {
      console.log(this.showAdd);
      if (this.showAdd === 1) {
        this.$alert("最多只能有五级机构", "出错提示", {
          confirmButtonText: "确定",
          type: "warning",
          callback: action => {}
        });
      } else if (this.showAdd === 0) {
        this.add = true;
      }
    },

    npag(event, data) {
      this.npag_key = data.mechid;
      console.log(data);
      console.log(data.mecharr);

      if (data.mecharr === 1) {
        this.formAdd.mecharr = parseInt(2);
      } else if (data.mecharr === 2) {
        this.formAdd.mecharr = parseInt(3);
      } else if (data.mecharr === 3) {
        this.formAdd.mecharr = parseInt(4);
      } else if (data.mecharr === 4) {
        this.formAdd.mecharr = parseInt(5);
      }

      if (data.mecharr === 5) {
        this.showAdd = 1;
        let e = event || window.event;
        let target = e.target || e.srcElement;
        if (
          target.tagName.toLowerCase() == "div" ||
          target.tagName.toLowerCase() == "span"
        ) {
          let ft = this.$refs.feidie,
            _this = this;
          this.rightnew = true;
          ft.style.left = e.pageX + "px";
          ft.style.top = e.pageY + "px";
          window.onclick = function() {
            _this.rightnew = false;
          };
        }
      } else if (data.mecharr !== 5) {
        this.showAdd = 0;
        let e = event || window.event;
        let target = e.target || e.srcElement;
        if (
          target.tagName.toLowerCase() == "div" ||
          target.tagName.toLowerCase() == "span"
        ) {
          let ft = this.$refs.feidie,
            _this = this;
          this.rightnew = true;
          ft.style.left = e.pageX + "px";
          ft.style.top = e.pageY + "px";
          window.onclick = function() {
            _this.rightnew = false;
          };
        }
      }

      //console.log(data.mechid)
      this.formAdd.upmech = data.mechname;
      this.formAdd.upmechid = data.mechid;

      this.form.upmech = data.upmech;
      this.form.mechname = data.mechname;
      this.form.percha = data.percha;
      this.form.coninfo = data.coninfo;
      this.form.descibe = data.descibe;

      this.form_edit = data;

      this.form.upmechid = data.upmechid;

      if (data.mechid === 1) {
        this.showDelDiv = false;
        event.preventDefault();
        let e = event || window.event;
        let target = e.target || e.srcElement;
        if (
          target.tagName.toLowerCase() == "div" ||
          target.tagName.toLowerCase() == "span"
        ) {
          let ft = this.$refs.feidie,
            _this = this;
          this.rightnew = true;
          ft.style.left = e.pageX + "px";
          ft.style.top = e.pageY + "px";
          window.onclick = function() {
            _this.rightnew = false;
          };
        }
      } else if (data.mechid !== 1) {
        this.showDelDiv = true;
        event.preventDefault();
        let e = event || window.event;
        let target = e.target || e.srcElement;
        if (
          target.tagName.toLowerCase() == "div" ||
          target.tagName.toLowerCase() == "span"
        ) {
          let ft = this.$refs.feidie,
            _this = this;
          this.rightnew = true;
          ft.style.left = e.pageX + "px";
          ft.style.top = e.pageY + "px";
          window.onclick = function() {
            _this.rightnew = false;
          };
        }
      }
    },
    handleSizeChange(val) {
      this.pagenum = parseInt(val.target.value);
      if (this.change == 1) {
        this.Serch(1);
      } else if (this.change == 2) {
        this.getOnlineTableList(1);
      }
    },
    handleCurrentChange(val) {
      this.startnum = val;
      if (this.change == 1) {
        this.Serch(parseInt(val));
      } else if (this.change == 2) {
        this.getOnlineTableList(parseInt(val));
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
      // 如果没有搜索的权限，则不发请求
      if (this.searchByBtnPermission === false) return;
      this.currentPage2 = current;
      this.change = parseInt(1);
      this.changeMechid = "";

      if (this.startnum == "") {
        this.startnum = this.currentPage2;
      }
      if (this.pagenum == "") {
        this.pagenum = 10;
      }
      console.log(this.getDj);

      this.$axios
        .post(
          "/OrganizationController/queryListByMechNameLike",
          qs.stringify({
            sessionId: localStorage.getItem("SID"),
            mechname: this.getDj,
            startnum: current,
            pagenum: this.pagenum,
            mechLine: parseInt(0)
          })
        )
        .then(res => {
          console.log('------------res.data--------');
          console.log(res.data);

          this.totalNumCount = res.data.totalSize;

          res.data.recordList.forEach(ele => {
            ele.uptm = this.getTime(ele.uptm);
            ele.cretm = this.getTime(ele.cretm);
            if (ele.mecharr == 1) {
              ele.upmech = '';
              ele.upmechid = '';
            }
          });
          this.tableData = res.data.recordList;
        })
        .catch(error => {
          console.log(error);
        });
    },
    refreshData() {
      console.log(this.tableData);
      if (this.tableData.length !== 0) {
        this.Serch(1);
      }
    },
    downLoadPath() {
      if (this.startnum == "") {
        this.startnum = this.currentPage2;
      }
      if (this.pagenum == "") {
        this.pagenum = 10;
      }
      let startNum = this.startnum;
      if (this.tableData.length !== 0) {
        if (this.change == parseInt(1)) {
          let onlineObj = {};
          onlineObj.type = "XT_XS";
          onlineObj.change = 1;
          onlineObj.mechname = this.getDj;
          onlineObj.startnum = this.startnum;
          onlineObj.pagenum = this.pagenum;
          onlineObj.mechLine = parseInt(0);

          localStorage.setItem("OBJ", JSON.stringify(onlineObj));
        } else if (this.change == parseInt(2)) {
          let onlineChangeObj = {};
          onlineChangeObj.type = "XT_XS";
          onlineChangeObj.change = 2;
          onlineChangeObj.mechid = this.onlineNodeMechid;
          onlineChangeObj.mechLine = parseInt(0);
          onlineChangeObj.pageSize = this.pagenum;
          onlineChangeObj.pageNum = this.startnum;
          localStorage.setItem("OBJ", JSON.stringify(onlineChangeObj));
        }

        window.open(window.location.href.split("#")[0] + "#/downloadpage0");
      }
    },
    editClose() {
      this.edit = false;
      this.$refs.editForm.resetFields();
    },
    edit_submit() {
      this.form.mechid = parseInt(this.npag_key);
      this.$refs.editForm.validate(valid => {
        if(valid) {
          this.form.mechLine = parseInt(0);
          this.form.sessionId = localStorage.getItem("SID");
          this.$axios
            .post("/OrganizationController/updateMech", qs.stringify(this.form))
            .then(res => {
              //console.log(res.data)
              if (res.data.code == 1) {
                this.$alert(res.data.message, "提示", {
                  confirmButtonText: "确定",
                  type: "success",
                  callback: action => {
                    this.edit = false;
                    this.init();
                  }
                });
              } else if (res.data.code != 1) {
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
        }
      })
    },
    addClose() {
      this.add = false;
      this.$refs.addForm.resetFields();
    },
    add_submit() {
      this.$refs.addForm.validate(valid => {
        if(valid) {
          this.formAdd.mechLine = parseInt(0);
          this.formAdd.sessionId = localStorage.getItem("SID");
          this.$axios
            .post("/OrganizationController/addMech", qs.stringify(this.formAdd))
            .then(res => {
              if (res.data.code === 1) {
                this.$alert(res.data.message, "提示", {
                  confirmButtonText: "确定",
                  type: "success",
                  callback: action => {
                    this.add = false;
                    this.formAdd.coninfo = "";
                    this.formAdd.descibe = "";
                    this.formAdd.mechname = "";
                    this.formAdd.percha = "";
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
        }
      })
    },
    del_submit() {
      this.$axios
        .post(
          "/OrganizationController/deleteMech",
          qs.stringify({
            sessionId: localStorage.getItem("SID"),
            mechid: parseInt(this.npag_key),
            mechLine: 0
          })
        )
        .then(res => {
          if (res.data.code === 1) {
            this.$alert(res.data.message, "删除", {
              confirmButtonText: "确定",
              type: "success",
              callback: action => {
                this.del = false;
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
    handleNodeClick(data) {
      this.change = 2;
      this.onlineNodeMechid = data.mechid;
      this.getOnlineTableList(1);
    },

    getOnlineTableList(current = 1) {
      if (this.getTreeListPermission === false) return;
      this.currentPage2 = current;
      this.$axios
        .post(
          "/OrganizationController/queryInfoById",
          qs.stringify({
            sessionId: localStorage.getItem("SID"),
            mechid: this.onlineNodeMechid,
            mechLine: parseInt(0),
            pageSize: this.pagenum,
            pageNum: current
          })
        )
        .then(res => {
          this.tableData = [];
          this.totalNumCount = res.data.pageCount;

          res.data.organization.forEach(ele => {
            ele.uptm = this.getTime(ele.uptm);
            ele.cretm = this.getTime(ele.cretm);
            if (ele.mecharr == 1) {
              ele.upmech = '';
              ele.upmechid = '';
            }
          });
          this.tableData = this.tableData.concat(res.data.organization);
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
  mounted() {},
  updated() {}
};
</script>
<style scoped>
.dialog-footer {
  border: none;
  background-color: #f1f2f5;
}
.treencont {
  width: 83px;
  height: 30px;
  margin-top: 5px;
}
.treencont:hover {
  color: #38e139;
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
.caidan {
  position: absolute;
  width: 85px;
  height: auto;
  background-color: rgb(36, 44, 60);
  color: #fff;
  z-index: 9;
}
.caidan div {
  cursor: pointer;
}
.treeHidden {
  width: 100px;
  height: 100px;
  background-color: red;
  z-index: 9999;
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
  width: 92%;
  margin-bottom: 15px;
}

input::-webkit-input-placeholder {
  font-size: 14px;
}
.ipt {
  width: 200px;
  height: 36px;
  margin-right: 40px;
  margin-left: 10px;
  border-radius: 20px;
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
  border-right: 10px solid #fff;
  border-left: 10px solid #fff;
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
  color: #333333;
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
  background-color: #f5f7fa;
  border-color: #e4e7ed;
  color: #c0c4cc;
  cursor: not-allowed;
}
.iptOnline {
  margin-right: 15px;
  height: 36px;
  line-height: 36px;
  width: 200px;
}
.el-icon-search {
  color: #3faaf9;
}
</style>

