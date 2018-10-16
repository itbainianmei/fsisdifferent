<template>
  <!--黑名单-->
  <div>
    <div class="searchBasic">
        <div class="title" @click="serchToggleC" style="cursor:pointer">
          <i class="el-icon-arrow-down " id="ordinarySerch"></i>
          <span>基础查询</span>
        </div>
        <el-collapse-transition>
          <div class="searchContentBlack hideTimeRightIcon" v-show="serchToggle">
              <div class="beginTime">
                更新时间(开始):
                <el-date-picker
                  v-model="beginTime"
                  type="datetime"
                  placeholder="选择日期时间"
                  style="width:59%;height:36px;"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  id='beginTimeId'
                  @focus="setBeginTime"
                  :clearable="false"
                >
                </el-date-picker>
              </div>
              <div class="endTime">
                更新时间(结束):
                <el-date-picker
                  v-model="endTime"
                  type="datetime"
                  placeholder="选择日期时间"
                  style="width:59%;height:36px;"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  id='endTimeId'
                  @focus="setEndTime"
                  :clearable="false"
                >
                </el-date-picker>
              </div>
              <div class="listVal">
                名单值:
                <el-input clearable placeholder="请输入" class="listValInp" v-model="listVal" id="mdz"></el-input>
              </div>
              <div class='divserchbtn' style='display:inline-block'>
                  <el-button type="primary" class="serchbtn" icon="el-icon-search" @click="searchData" v-if='showSearchBtn'></el-button>
                  <el-button type="primary" class="serchbtn" icon="el-icon-refresh" @click="reset" v-if="resetPermission"></el-button>
              </div>

          </div>
        </el-collapse-transition>
    </div>
    <div class="seniorSearch" id='seniorSearchShow' v-if='showQuerySenior'>
      <div class="title" style="cursor:pointer"  @click="seniorSearchToggleC">
        <i class="el-icon-arrow-down" id="advancedSerch" ></i>
        <span>高级查询</span>
      </div>
      <el-collapse-transition>
        <div class="serior" v-if="!seniorSearchToggle">
          <div class="dimension">
            <span class="text">维度:</span>
            <el-select v-model="vvalue" placeholder="请选择" style="width: 59%" @focus="getVeidList">
              <el-option
                v-for="item in veidoo"
                :key="item.syscode"
                :label="item.sysname"
                :value="item.syscode">
              </el-option>
            </el-select>
          </div>
          <div class="state">
            <span class="text">状态:</span>
            <el-select v-model="cvalue" placeholder="请选择" style="width: 59%">
              <el-option
                v-for="item in condition"
                :key="item.key"
                :label="item.label"
                :value="item.key">
              </el-option>
            </el-select>
          </div>
          <div class="source">
            <span class="text">来源:</span>
            <el-select v-model="svalue" placeholder="请选择" style="width: 59%" @focus="getSourceList">
              <el-option
                v-for="item in source"
                :key="item.sysconid"
                :label="item.sysname"
                :value="item.sysconid">
              </el-option>
            </el-select>
          </div>
          <div style="display: inline-block;margin-left: 4%">
            <el-button type="primary" icon="el-icon-search" @click="searchData" v-if="showQuerySenior"></el-button>
            <el-button type="primary" icon="el-icon-refresh" @click="reset" v-if="resetPermission"></el-button>
          </div>

        </div>
      </el-collapse-transition>
    </div>
    <div class="listContent">
      <div class="contentIcon">
        <div class="button">
          <div class="leftButton clear">
            <div class="BotoomBtn leftRadius" @click="addbtn" data-title='添加' v-if='showAddBtn'>
              <div class="addIcon" ></div>
            </div>
            <div class="BotoomBtn" @click="removeData" data-title='删除' v-if='showDelBtn'>
              <div class="removIcon"></div>
            </div>
            <div class="BotoomBtn" style="border: none" data-title='导入' @click="importeBlack=true" v-if='showImportBtn'>
              <div class="refreshIcon"></div>
            </div>
            <div class="BotoomBtn rightRadius" data-title='下载' @click="downloadBlack = true" v-if='showDownloadBtn'>
              <div class="downloadIcon" style="margin-top: -1px;"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="dataTable clear">
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          @selection-change="selectDelUser">
          <el-table-column
            type="selection"
            width="50"
            align='center'
          >
          </el-table-column>
          <el-table-column
            prop="id"
            sortable
            width="100"
            label="名单号"
            align='center'
          >
          </el-table-column>

          <el-table-column
            prop="tag"
            width="130px"
            label="维度"
            align='center'
          >
          </el-table-column>

          <el-table-column
            width="150px"
            prop="uniqueId"
            label="名单值"
            align='center'

          >
            <template slot-scope="scope" >
              <el-popover trigger="hover" placement="top">
              {{ scope.row.uniqueId }}
              <div slot="reference" >
              {{ scope.row.uniqueIdCopy }}
              </div>
              </el-popover>
            </template>
          </el-table-column>

          <el-table-column
            prop="statusName"
            width="130px"
            label="状态"
            align='center'
          >
          </el-table-column>
          <el-table-column
            prop="activesDate"
            width="170px"
            label="生效日期"
            align='center'
          >
          </el-table-column>
          <el-table-column
            prop="expireDate"
            width="170px"
            label="到期日期"
            align='center'
          >
          </el-table-column>
          <el-table-column
            prop="orderId"
            width="130px"
            label="商户订单号"
            align='center'
          >
          </el-table-column>
          <el-table-column
            prop="merchantId"
            width="130px"
            label="商户编号"
            align='center'
          >
          </el-table-column>
          <el-table-column
            prop="source"
            label="来源"
            align='center'
          >
          </el-table-column>
          <el-table-column
            prop="comments"
            label="备注"
            align='center'
          >
          </el-table-column>
          <el-table-column
            prop="createDate"
            label="创建日期"
            width="170px"
            align='center'
          >
          </el-table-column>
          <el-table-column
            prop="updateDate"
            width="170px"
            label="更新日期"
            align='center'
          >
          </el-table-column>
          <el-table-column
            prop="modifier"
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
                :current-page.sync="currentPage"
                :page-size="10"
                :page-sizes="[10, 20, 30, 40]"
                layout="prev, pager, next"
                :page-count = countnum>
              </el-pagination>
          </div>
      </div>
      <!-- <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[10, 20, 30, 40, 50]"
          :page-size="10"
          layout="sizes, prev, pager, next"
          :page-count=countnum>
        </el-pagination>
      </div> -->
      <el-dialog title="添加黑名单" :visible.sync="listAdd" width="35%" v-dialogDrag >
        <el-form ref="form" :model="form" :rules="rules"  class="demo-ruleForm" :label-position="labelPosition" label-width="100px"  style="margin-left:13%;">
          <el-form-item label="业务线:" prop="busline">
            <el-select v-model="form.busline" placeholder="请选择" @change="buslineChange" style="height: 36px;width: 74%" id="busline">
              <el-option label="线上" value="online"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="维度:" prop="veido">
            <el-select v-model="form.veido" placeholder="请选择" style="height: 36px;width: 74%" id="veido">
              <el-option v-for="qy in queryenum"  :label='qy.sysname' :value='qy.syscode' :key='qy.id'></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="名单值:" prop="usercode">
            <el-input clearable ref="usercode" :class="{redborder:isredborder,addIpt:isaddIpt}" type="text" v-model="form.usercode" id="usercode"></el-input>
          </el-form-item>
          <el-form-item label="商户编号:" prop="username">
            <el-input clearable class="addIpt" v-model="form.username" @input="busiNoBlur"  @blur='busiNoBlurEvent' id='busiNoBlurText'></el-input>
            <div class='busiNoList'>
                <span class='busiNoListItem' v-for='(item,index) in busiNoListSearch' :key='index' @click='chooseBusiItem'>{{item}}</span>
            </div>
            <div class='busiNoErrorText'>
                <span>该商户编号不存在,请重新输入 </span>
            </div>
          </el-form-item>
          <el-form-item label="商户订单号:" prop="title">
            <el-input clearable class="addIpt" v-model="form.title"></el-input>
          </el-form-item>
          <!-- <el-form-item label="生效日期:"  prop="time">
            <el-date-picker
              v-model="form.time"
              id="time"
              type="datetime"
              placeholder="选择日期时间"
              value-format="yyyy-MM-dd HH:mm:ss"
              style="width: 74%;"
              :clearable="false"
            >
            </el-date-picker>
          </el-form-item> -->
          <el-form-item label="到期日期:" prop="endTime" class='hideTimeRightIcon'>
            <el-date-picker
              v-model="form.endTime"
              type="datetime"
              id="endTime"
              placeholder="选择日期时间"
              value-format="yyyy-MM-dd HH:mm:ss"
              style="width: 74%;"
              @focus='addSetTimeFocus'
              :clearable="false"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="备注:" prop="roleDesc">
            <el-input clearable type="textarea" :maxlength="200" placeholder="最长长度不能超过200位" v-model="form.roleDesc" id="roleDesc" style="width: 74%"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button @click="gbxj('form')">取 消</el-button>
          <el-button type="primary" @click="submitForm('form')">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="黑名单查询：分页选择下载" :visible.sync="downloadBlack" width="30%" v-dialogDrag>
            <div style="text-align: center; margin-bottom:20px;">选择下载从
              <input type="number" v-model="startnum" min="0" class="downClass" @input='startNumInp'>到
              <input type="number" min="0"  class="downClass" :max="this.countNoPage" v-model="endpagenum" @input="endNumInp">页的数据</div>
            <h4 style="text-align: center">当前共<span>{{countNoPage}}</span>页</h4>
            <span slot="footer" class="dialog-footer">
            <el-button @click="downloadBlackClose">取 消</el-button>
            <el-button type="primary" @click="downloadBlackData" v-show='showHideDownloadBtn'>下 载</el-button>
            </span>
      </el-dialog>
      <el-dialog title="从Excel导入到黑名单" :visible.sync="importeBlack" width="570px" v-dialogDrag>
            <div class="importe ipC"></div><span  class="fontC" style="float:left;margin-right:20px;" @click="downloadMb">下载模板</span>
            <div class="prompt ipC" ></div><span class="fontC" @click="helpTitleClick" style="vertical-align: top;">模板格式要求</span>
            <div style="margin-left: 50px;margin-top: 20px;">
                <span>本地文件：</span><el-input placeholder="点击帮助以查看具体格式要求" class="listValInp" v-model="nameFormChange"></el-input>
                <label class="ui_button" for="filename">选择</label>
                <form enctype="multipart/form-data" id="formsubmit" style="display: inline-block;">
                    <input  class="formIpt" type="file" id="filename" style="position:absolute;clip:rect(0 0 0 0);" name="filename"  @change='fileChange'
                    accept='.csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'>
                </form>
            </div>
            <span slot="footer" class="dialog-footer" style="padding: 20px;">
                <el-button @click="importeBlackClick">取 消</el-button>
                <el-button type="primary" @click="upload">导 入</el-button>

                    <div class="promptText" v-show="helpTitle">
                        <span style="display: block;text-align: left;margin: 10px 9px;font-size: 13px;">导入格式要求</span>
                        <el-table
                        :data="titleData"
                        border
                        style="width: 100%;text-align:left;">
                        <el-table-column
                            width="140px"
                            prop="name"
                            label="第一行必须包含字段">
                        </el-table-column>
                        <el-table-column
                            prop="help"
                            label="字段格式要求">
                        </el-table-column>
                        </el-table>
                    </div>
            </span>
      </el-dialog>
      <el-dialog title="提示" :visible.sync="delDialog" width="30%" v-dialogDrag>
            <div style='width:100%;text-align:center'>
              <p><i class='el-icon-warning' style='font-size:24px;color:#f1f2f5'></i></p>
              <p>确认将选中的名单值删除？</p>
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button @click="delDialog = false">取 消</el-button>
            <el-button type="primary" @click="delSaveBtn">确 定</el-button>
            </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import qs from "qs";
import { card, phone, idCard } from "../utils";
export default {
  name: "黑名单",
  data() {
    return {
      resetPermission: false,//重置
      showSearchBtn: false,
      showQuerySenior: false,
      showAddBtn: false,
      showDelBtn: false,
      showImportBtn: false,
      showDownloadBtn: false,
      busiNoListSearch: [],
      delDialog: false,
      titleData: [
        {
          name: "维度",
          help:
            "线上名单维度：银行卡号、手机号、身份证号、IP、IMEI、登录名、网址、终端号。线下名单维度：交易卡号、商户编号、终端号、法人姓名、法人身份证、结算银行卡、结算账户名、营业执照号、商户唯一标识"
        },
        {
          name: "名单值",
          help: "文本格式不能为空"
        },
        {
          name: "业务线",
          help: "文本格式 选填(默认为线上)，枚举：线上、线下"
        },
        {
          name: "商户编号",
          help: "文本格式 选填"
        },
        {
          name: "商户订单号",
          help: "文本格式 选填"
        },
        {
          name: "生效日期",
          help: "时间格式xxxx-xx-xx xx:xx:xx 精确到秒"
        },
        {
          name: "到期日期",
          help: "时间格式xxxx-xx-xx xx:xx:xx 精确到秒"
        },
        {
          name: "备注",
          help: "文本格式 最长200位"
        }
      ],
      seniorSearchToggle: true,
      helpTitle: false,
      serchToggle: true,
      fileList: "",
      countnum: 0,
      startnum: 0,
      pagenum: 10,
      endpagenum: 0,
      total: "",
      innerVisible: false,
      currentPage: 1,
      nameFormChange: "",
      beginTime: "",
      endTime: "",
      listVal: "",
      veidoo: [],
      condition: [
        {
          value: "全部",
          label: "全部",
          key: ""
        },
        {
          value: "生效",
          label: "生效",
          key: "1"
        },
        {
          value: "未生效",
          label: "未生效",
          key: "0"
        }
      ],
      source: [],
      vvalue: "",
      cvalue: "",
      svalue: "",
      tableData: [],
      listAdd: false,
      deMsg: false,
      downloadBlack: false,
      importeBlack: false,
      isredborder: false,
      isaddIpt: true,
      form: {
        busline: "",
        veido: "",
        usercode: "",
        username: "",
        title: "",
        roleDesc: "",
        endTime: "",
        time: ""
      },
      labelPosition: "right",
      removeArr: [],
      multipleSelection: [],
      queryenum: [],
      mdNumber: "",
      fd: "",
      rules: {
        busline: [{ required: true, message: " ", trigger: "change" }],
        veido: [{ required: true, message: " ", trigger: "change" }],
        usercode: [{ required: true, message: " ", trigger: "change" }],
        roleDesc: [{ max: 200, min: 0, message: " ", trigger: "blur" }]
      },
      file: "",
      showBankNumCopy: false,
      showIphoneCopy: false,
      showIdCardCopy: false,
      showUniqueId: false,
      showHideDownloadBtn: true,
      countNoPage: 0
    };
  },
  created() {
    // 按钮权限
    const idList = JSON.parse(localStorage.getItem("ARRLEVEL"));
    this.resetPermission = idList.indexOf(129) === -1 ? false : true;
    this.showSearchBtn = idList.indexOf(128) === -1 ? false : true;
    this.showQuerySenior = idList.indexOf(130) === -1 ? false : true;
    this.showAddBtn = idList.indexOf(131) === -1 ? false : true;
    this.showDelBtn = idList.indexOf(132) === -1 ? false : true;
    this.showImportBtn = idList.indexOf(133) === -1 ? false : true;
    this.showDownloadBtn = idList.indexOf(134) === -1 ? false : true;
  },
  watch: {
    downloadBlack() {
      if (this.downloadBlack === true) {
        this.startnum = 0;
        this.endpagenum = Math.ceil(this.countnum / this.pagenum);
        this.countNoPage = Math.ceil(this.countnum / this.pagenum);

        if (this.tableData.length === 0) {
          this.showHideDownloadBtn = false;
        } else if (this.tableData.length !== 0) {
          this.startnum = 1;
          this.showHideDownloadBtn = true;
        }
      } else if (this.downloadBlack === false) {
        this.endpagenum = 0;
        this.countNoPage = 0;
      }
    }
  },
  methods: {
    getVeidList() {
      this.$axios
        .post(
          "/SysConfigController/queryEnum",
          qs.stringify({
            sessionId: localStorage.getItem("SID"),
            type: 18
          })
        )
        .then(res => {
          let obj = {};
          obj.sysname = "全部";
          obj.sysconid = "";
          res.data.unshift(obj);
          this.veidoo = [];
          this.veidoo = this.veidoo.concat(res.data);
        });
    },
    // 来源列表
    getSourceList() {
      this.$axios
        .post(
          "/SysConfigController/queryEnum",
          qs.stringify({
            sessionId: localStorage.getItem("SID"),
            type: 19
          })
        )
        .then(res => {
          let obj = {};
          obj.sysname = "全部";
          obj.label = "全部";
          obj.sysconid = "";
          res.data.unshift(obj);
          this.source = [];
          this.source = this.source.concat(res.data);
        });
    },
    // 商户编号验证
    busiNoBlur() {
      this.$axios
        .post(
          "/OfflineChecklistController/easyInquiry",
          qs.stringify({
            sessionId: localStorage.getItem("SID"),
            merchantId: this.form.username
          })
        )
        .then(res => {
          if (res.data.ids.length !== 0) {
            document.querySelector(".busiNoList").style.display = "block";
            this.busiNoListSearch = [];
            this.busiNoListSearch = this.busiNoListSearch.concat(res.data.ids);
          } else if (res.data.ids.length === 0) {
            this.busiNoListSearch = [];
            document.querySelector(".busiNoList").style.display = "none";
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    busiNoBlurEvent(e) {
      let arr = [];
      if (this.form.username !== "") {
        this.$axios
          .post(
            "/OfflineChecklistController/easyInquiry",
            qs.stringify({
              sessionId: localStorage.getItem("SID"),
              merchantId: this.form.username
            })
          )
          .then(res => {
            if (res.data.ids.length === 0) {
              document.querySelector(".busiNoErrorText").style.display =
                "block";
            } else if (res.data.ids.length !== 0) {
              res.data.ids.forEach(ele => {
                if (ele === this.form.username) {
                  arr.push(ele);
                }
              });
              if (arr.length !== 0) {
                document.querySelector(".busiNoErrorText").style.display =
                  "none";
              }
            }
          });
      } else if (this.form.usercode === "") {
        document.querySelector(".busiNoErrorText").style.display = "none";
      }
    },
    chooseBusiItem(e) {
      this.form.username = e.target.innerText;
      document.querySelector(".busiNoList").style.display = "none";
    },
    helpTitleClick() {
      this.helpTitle = !this.helpTitle;
    },
    downloadBlackClose() {
      this.downloadBlack = false;
      this.startnum = 0;
      this.endpagenum = 0;
    },
    serchToggleC() {
      this.serchToggle = !this.serchToggle;

      var ordinarySerch = document.getElementById("ordinarySerch");
      if (this.serchToggle == false) {
        ordinarySerch.style.transform = "rotate(180deg)";
      } else if (this.serchToggle != false) {
        ordinarySerch.style.transform = "rotate(0deg)";
      }
    },
    seniorSearchToggleC() {
      this.seniorSearchToggle = !this.seniorSearchToggle;
      let serchbtn = document.querySelector(".divserchbtn");
      var advancedSerch = document.getElementById("advancedSerch");

      if (this.seniorSearchToggle == false) {
        serchbtn.style.display = "none";
        serchbtn.style.transition = "all 2s";
        advancedSerch.style.transform = "rotate(0deg)";
      } else if (this.seniorSearchToggle == true) {
        advancedSerch.style.transform = "rotate(180deg)";
        serchbtn.style.display = "inline-block";
        serchbtn.style.transition = "all 2s";
      }
    },
    importeBlackClick() {
      document.getElementById('filename').value = '';
      this.importeBlack = false;
      this.nameFormChange = '';
      this.file = '';
    },
    upload() {
      if (this.file === "") {
        this.$alert("不能上传空文件", "提示", {
          confirmButtonText: "确定",
          type: "warning",
          callback: action => {}
        });
        return;
      }
      let formData = new FormData();
      formData.append("file", this.file);

      this.$axios
        .post("/NameListController/importBlackList", formData)
        .then(res => {
          if (res.data.code === 1) {
            this.$alert(res.data.message, "提示", {
              confirmButtonText: "确定",
              type: "success",
              callback: action => {
                document.getElementById('filename').value = ''
                this.importeBlack = false;
                this.nameFormChange = '';
                this.file = '';
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
    fileChange(e) {
      this.file = e.target.files[0];
      this.nameFormChange = e.target.files[0].name;
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleClick() {},
    handleSizeChange(val) {
      this.pagenum = parseInt(val.target.value);
      this.searchData();
    },
    handleCurrentChange(val) {
      this.startnum = val;
      this.searchData();
    },
    buslineChange() {
      let type = "";
      if (this.form.busline === "online") {
        type = "18";
      } else if (this.form.busline === "offline") {
        type = "-1";
      }

      this.$axios
        .post(
          "/SysConfigController/queryEnum",
          qs.stringify({
            sessionId: localStorage.getItem("SID"),
            type: type
          })
        )
        .then(res => {
          this.queryenum = res.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    searchData() {
      var maz = document.getElementById("mdz");
      if (mdz.value === "") {
        maz.style.border = "1px solid #f56c6c";
        this.$alert("请输入名单值", "提示", {
          type: "warning",
          confirmButtonText: "确定"
        });
      } else {
        this.mdNumber = maz.value;
        maz.style.border = "1px solid #dcdfe6";
        if (this.startnum == "" || this.startnum == undefined) {
          this.startnum = this.currentPage;
        }
        if (this.pagenum == "" || this.pagenum == undefined) {
          this.pagenum = 10;
        }
        this.$axios
          .post(
            "/NameListController/queryList",
            qs.stringify({
              sessionId: localStorage.getItem("SID"),
              startDate: this.beginTime,
              endDate: this.endTime,
              unique: this.listVal.split(" ").join(""),
              tag: this.vvalue,
              status: this.cvalue,
              source: this.svalue,
              type: "black",
              startnum: parseInt(this.startnum),
              pagenum: parseInt(this.pagenum)
            })
          )
          .then(res => {
            this.tableData = JSON.parse(res.data.data);
            this.countnum = parseInt(res.data.count);
            this.tableData.forEach(ele => {
              if (ele.tag == "线上-银行卡号") {
                ele.uniqueIdCopy = card(ele.uniqueId);
              } else if (ele.tag == "线上-手机号") {
                ele.uniqueIdCopy = phone(ele.uniqueId);
              } else if (ele.tag == "线上-身份证号") {
                ele.uniqueIdCopy = idCard(ele.uniqueId);
              } else if (
                ele.tag !== "线上-银行卡号" ||
                ele.tag !== "线上-手机号" ||
                ele.tag !== "线上-身份证号"
              ) {
                ele.uniqueIdCopy = ele.uniqueId;
              }
            });
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    downloadMb() {
      window.location = encodeURI(
        this.uploadBaseUrl + "/NameListController/exportBlackModel"
      );
    },
    downloadBlackData() {
      if (parseInt(this.startnum) === 0 || parseInt(this.endpagenum) === 0) {
        this.$alert("输入值不能为0", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return;
      }
      if (parseInt(this.startnum) > parseInt(this.endpagenum)) {
        this.$alert("起始值需小于结束值", "系统提示", {
          type: "warning",
          confirmButtonText: "确定"
        });
        return;
      }

      if (
        parseInt(this.pagenum) *
          (parseInt(this.endpagenum) - parseInt(this.startnum) + 1) >
        100000
      ) {
        this.$alert("最多只能导出10万条数据", "提示", {
          confirmButtonText: "确定",
          type: "warning",
          callback: action => {}
        });
        return;
      }
      this.$axios
        .get(
          "/NameListController/exportList?startDate=" +
            this.beginTime +
            "&endDate=" +
            this.endTime +
            "&unique=" +
            this.listVal +
            "&tag=" +
            this.vvalue +
            "&status=" +
            this.cvalue +
            "&source=" +
            this.svalue +
            "&type=black&startnum=" +
            this.startnum +
            "&pagenum=" +
            this.pagenum +
            "&endnum=" +
            this.endpagenum +
            "&sessionId=" +
            localStorage.getItem("SID")
        )
        .then(res => {
          window.location = encodeURI(
            this.uploadBaseUrl +
              "/NameListController/exportList?startDate=" +
              this.beginTime +
              "&endDate=" +
              this.endTime +
              "&unique=" +
              this.listVal +
              "&tag=" +
              this.vvalue +
              "&status=" +
              this.cvalue +
              "&source=" +
              this.svalue +
              "&type=black&startnum=" +
              this.startnum +
              "&pagenum=" +
              this.pagenum +
              "&endnum=" +
              this.endpagenum
          );
          this.endpagenum = 1;
          this.downloadBlack = false;
        })
        .catch(error => {
          console.log(error);
        });
    },
    selectDelUser(val) {
      this.multipleSelection = val;
      this.removeArr = [];
      for (let i = 0; i < this.multipleSelection.length; i++) {
        this.removeArr.push(this.multipleSelection[i].id);
      }
    },
    delSaveBtn() {
      this.$axios
        .post(
          "/NameListController/deleteNameList",
          qs.stringify({
            sessionId: localStorage.getItem("SID"),
            id: this.removeArr.join(",")
          })
        )
        .then(res => {
          this.delDialog = false;
          this.$alert(res.data.message, "提示", {
            confirmButtonText: "确定",
            callback: action => {
              this.$axios
                .post(
                  "/NameListController/queryList",
                  qs.stringify({
                    sessionId: localStorage.getItem("SID"),
                    startDate: this.beginTime,
                    endDate: this.endTime,
                    unique: this.mdNumber,
                    tag: this.vvalue,
                    status: this.cvalue,
                    source: this.svalue,
                    type: "black",
                    startnum: parseInt(this.startnum),
                    pagenum: parseInt(this.pagenum)
                  })
                )
                .then(res => {
                  this.tableData = JSON.parse(res.data.data);
                  this.countnum = parseInt(res.data.count);
                })
                .catch(error => {
                  console.log(error);
                });
            }
          });
        })
        .catch(error => {});
    },
    removeData() {
      if (this.removeArr.length === 0) {
        this.$alert("请至少选中一条需要处理的数据", "提示", {
          type: "warning",
          confirmButtonText: "确定"
        });
      } else if (this.removeArr.length >= 1) {
        this.delDialog = true;
        //  this.$confirm('确认将选中的名单值删除？', '提示', {
        //     confirmButtonText: '确定',
        //     cancelButtonText: '取消',
        //     type: 'warning'
        //  }).then(() => {
      }
    },
    addbtn() {
      this.listAdd = true;
      // 获取起始时间和结束时间
      var date = new Date();
      var year = date.getFullYear(); //获取当前年份
      var mon = "0" + (date.getMonth() + 1); //获取当前月份
      var da = "0" + date.getDate(); //获取当前日
      var day = date.getDay(); //获取当前星期几
      var h = "0" + date.getHours(); //获取小时
      var m = "0" + date.getMinutes(); //获取分钟
      var s = "0" + date.getSeconds(); //获取秒

      this.form.time =
        year +
        "-" +
        mon.substring(mon.length - 2, mon.length) +
        "-" +
        da.substring(da.length - 2, da.length) +
        " " +
        h.substring(h.length - 2, h.length) +
        ":" +
        m.substring(m.length - 2, m.length) +
        ":" +
        s.substring(s.length - 2, s.length);
      var endyear = year + 3;
      this.form.endTime =
        endyear +
        "-" +
        mon.substring(mon.length - 2, mon.length) +
        "-" +
        da.substring(da.length - 2, da.length) +
        " " +
        h.substring(h.length - 2, h.length) +
        ":" +
        m.substring(m.length - 2, m.length) +
        ":" +
        s.substring(s.length - 2, s.length);
      // 获取维度列表
    },
    gbxj(formName) {
      this.listAdd = false;
      this.$refs[formName].resetFields();
      if (document.querySelector(".busiNoErrorText").style.display == "block") {
        document.querySelector(".busiNoErrorText").style.display = "none";
      }
      this.isaddIpt = true;
      this.isredborder = false;
      document.querySelector("#busline").style.border = "1px solid #dcdfe6";
      document.querySelector("#veido").style.border = "1px solid #dcdfe6";
      document.querySelector("#usercode").style.border = "1px solid #dcdfe6";
      document.querySelector("#time").style.border = "1px solid #dcdfe6";
      document.querySelector("#endTime").style.border = "1px solid #dcdfe6";
    },
    submitForm(formName) {
      if (this.form.busline === "") {
        document.querySelector("#busline").style.border = "1px solid #f56c6c";
        return;
      } else if (this.form.busline !== "") {
        document.querySelector("#busline").style.border = "1px solid #dcdfe6";
      }
      if (this.form.veido === "") {
        document.querySelector("#veido").style.border = "1px solid #f56c6c";
        return;
      } else if (this.form.veido !== "") {
        document.querySelector("#veido").style.border = "1px solid #dcdfe6";
      }
      if (this.form.usercode === "") {
        document.querySelector("#usercode").style.border = "1px solid #f56c6c";
        return;
      } else if (this.form.usercode !== "") {
        document.querySelector("#usercode").style.border = "1px solid #dcdfe6";
      }

      // let idCardReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      // let bankNumReg = /^([1-9]{1})(\d{14}|\d{18})$/
      // let phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
      // let ipReg = /^(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|[1-9])\\.(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|\\d)\\.(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|\\d)\\.(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|\\d)$/

      var bankNumReg = /^[1-9][0-9]{14,18}$/;
      var idCardReg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;
      var phoneReg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
      var TEL_REGEX = /^(0\d{2}-\d{8}(-\d{1,4})?)|(0\d{3}-\d{7,8}(-\d{1,4})?)$/;
      var EMAIL_REGEX = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
      var ipReg = /^((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))$/;

      if (document.querySelector("#usercode").value !== "") {
        if (this.form.veido == "online_bankCardNoBl") {
          if (!bankNumReg.test(this.form.usercode.split(" ").join(""))) {
            this.$alert("请输入正确的银行卡号", "提示", {
              confirmButtonText: "确定",
              type: "warning",
              callback: action => {}
            });
            return;
          }
        } else if (this.form.veido == "online_userIpBl") {
          if (!ipReg.test(this.form.usercode.split(" ").join(""))) {
            this.$alert("请输入正确的ip", "提示", {
              confirmButtonText: "确定",
              type: "warning",
              callback: action => {}
            });
            return;
          }
        } else if (this.form.veido == "online_userPhoneBl") {
          if (!phoneReg.test(this.form.usercode.split(" ").join(""))) {
            this.$alert("请输入正确的手机号", "提示", {
              confirmButtonText: "确定",
              type: "warning",
              callback: action => {}
            });
            return;
          }
        } else if (this.form.veido == "online_idNoBl") {
          if (!idCardReg.test(this.form.usercode.split(" ").join(""))) {
            this.$alert("请输入正确的身份证号", "提示", {
              confirmButtonText: "确定",
              type: "warning",
              callback: action => {}
            });
            return;
          }
        }
      }

      var date = new Date().getTime();
      var endTime = this.form.endTime;

      var date1 = new Date(
        endTime
          .split(" ")[0]
          .split("-")
          .join("/") +
          " " +
          endTime.split(" ")[1]
      ).getTime();
      if (date1 < date) {
        this.$alert("到期日期不能小于当前时间", "提示", {
          type: "warning",
          confirmButtonText: "确定",
          callback: action => {}
        });
        return;
      }

      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post(
              "/NameListController/saveName",
              qs.stringify({
                sessionId: localStorage.getItem("SID"),
                startDate: this.form.time,
                endDate: this.form.endTime,
                unique: this.form.usercode.split(" ").join(""),
                tag: this.form.veido,
                source: "754",
                type: "black",
                modifier: localStorage.getItem("testName"),
                merchantId: this.form.username,
                orderId: this.form.title,
                bizLine: this.form.busline,
                comments: this.form.roleDesc
              })
            )
            .then(res => {
              this.$alert(res.data.message, "提示", {
                confirmButtonText: "确定"
              });
              this.listAdd = false;
              this.$refs[formName].resetFields();
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          return false;
        }
      });
    },
    setBeginTime() {
      document.querySelector("#beginTimeId").setAttribute("readOnly", true);
    },
    setEndTime() {
      document.querySelector("#endTimeId").setAttribute("readOnly", true);
    },
    addSetTimeFocus() {
      document.querySelector("#endTime").setAttribute("readOnly", true);
    },
    initTimeSet() {
      let date = new Date();
      let y = date.getFullYear();
      let m = "0" + (date.getMonth() + 1);
      let d = "0" + date.getDate();
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
    startNumInp() {
      if (this.startnum < 0) {
        this.startnum = 0;
      }
    },
    endNumInp() {
      if (this.endpagenum < 0) {
        this.endpagenum = 0;
      }
    },
    reset() {
      this.initTimeSet();
      this.listVal = "";
      this.vvalue = "";
      this.cvalue = "";
      this.svalue = "";
    }
  },
  mounted() {
    this.initTimeSet();
  }
};
</script>
<style scoped>
.prompt {
  width: 18px;
  height: 18px;
  background-image: url(../../images/prompt.png);
}
.listValInp {
  width: 60%;
  height: 36px;
}
.fontC {
  color: #3dc6b2;
  cursor: pointer;
  line-height: 17px;
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
.showHide {
  display: none;
}
.title {
  height: 50px;
  line-height: 50px;
  padding-left: 27px;
  font-size: 14px;
  color: #333333;
  box-shadow: 0 1px 4px 1px rgba(0, 0, 0, 0.09);
}
.searchContentBlack,
.seniorSearchContent {
  height: 76px;
  line-height: 76px;
  padding-left: 3%;
  transition: all 0.8s;
  overflow: inherit;
}
.serior {
  height: 76px;
  line-height: 76px;
  padding-left: 3%;
  transition: all 0.8s;
  overflow: inherit;
}
.beginTime,
.endTime,
.listVal,
.dimension,
.state,
.source {
  display: inline-block;
  font-size: 13px;
  color: #333333;
  width: 26%;
}
.listVal {
  margin-left: 4%;
}
.listValInp {
  width: 60%;
  height: 36px;
}
.text {
  width: 30%;
  text-align: right;
  display: inline-block;
}
.listContent {
  border-top: 1px solid #e0e0e0;
}
.contentIcon {
  height: 70px;
  line-height: 70px;
}
.addIpt {
  border-radius: 50px;
  width: 74%;
  height: 36px;
}
.redborder {
  border-radius: 50px;
  width: 74%;
  height: 36px;
  border-color: #f56c6c;
}
.BotoomBtn {
  width: 44px;
  height: 28px;
  margin: 0;
  margin-left: -1px;
  border: 1px solid #38e139;
  background-color: #fff;
  float: left;
  cursor: pointer;
  position: relative;
}
.BotoomBtn:hover {
  background-color: #38e139;
}

.BotoomBtn:hover::after{
  content: attr(data-title);
  position:absolute;
  top:35px;
  left:0;
  height:26px;
  line-height: 26px;
  width:46px;
  text-align: center;
  font-size:12px;
  color:#333333;
  border:1px solid #e0e0e0;
  background-color: #ffffff;
  box-shadow: 0 2px 4px 0 rgba(204,204,204,0.50);
  z-index: 1;
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
}
.leftButton {
  float: left;
  margin-left: 80px;
}
.leftButton {
  float: left;
  margin-left: 30px;
  margin-top: 14px;
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
.amendIcon {
  background: url(../../images/icon.png) no-repeat -27px -9px;
  width: 44px;
  height: 30px;
  margin: 0 auto;
  margin-top: 4px;
}
.amendIcon:hover {
  background: url(../../images/icon.png) no-repeat -27px -32px;
  width: 44px;
  height: 30px;
  margin: 0 auto;
  margin-top: 4px;
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
  margin-top: 4px;
}
.removIcon:hover {
  background: url(../../images/icon.png) no-repeat -62px -32px;
  width: 44px;
  height: 30px;
  margin: 0 auto;
  margin-top: 4px;
}
.refreshIcon {
  background: url(../../images/import.png) no-repeat;
  width: 44px;
  height: 30px;
  margin: 0 auto;
}
.refreshIcon:hover {
  background: url(../../images/import_actived.png) no-repeat;
  width: 44px;
  height: 30px;
  margin: 0 auto;
}
.downloadIcon {
  background: url(../../images/export.png) no-repeat;
  width: 44px;
  height: 30px;
  margin: 0 auto;
}
.downloadIcon:hover {
  background: url(../../images/export_actived.png) no-repeat;
  width: 44px;
  height: 30px;
  margin: 0 auto;
  border-top-right-radius: 7px;
  border-bottom-right-radius: 7px;
}
.active {
  background-color: #38e139;
}
.clear:after {
  clear: both;
  content: ".";
  display: block;
  width: 0;
  height: 0;
  visibility: hidden;
}
.importData {
  width: 111%;
  margin-left: -30px;
  border-spacing: inherit;
}
.importData tr:nth-child(even) {
  background-color: rgb(244, 244, 244);
}
.importData th {
  text-align: left;
  padding: 0 2px 0 37px;
  width: 109px;
}
.importData td {
  padding: 1px 51px 4px 26px;
}
.showHide {
  display: none;
}
.formIpt {
  padding: 0;
  width: 73px;
  height: 31px;
  float: right;
  margin-top: -37px;
  border: 0px;
}
.dataTable {
  margin-left: 10px;
  margin-right: 10px;
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
#advancedSerch {
  transform: rotate(180deg);
  -webkit-transform: rotate(180deg);
  -moz-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
}
.busiNoList {
  width: 80%;
  max-height: 100px;
  position: absolute;
  left: 0;
  top: 38px;
  border: 1px solid #e0e0e0;
  background-color: #ffffff;
  z-index: 10;
  overflow-y: scroll;
  display: none;
}
.busiNoListItem {
  display: block;
  height: 20px;
  line-height: 20px;
  width: 100%;
  text-align: left;
  text-indent: 15px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 12px;
  color: #333333;
  cursor: pointer;
}
.busiNoListItem:hover {
  background-color: #ecf5ff;
  color: #66b1ff;
}
.busiNoList::-webkit-scrollbar {
  display: none;
}
.busiNoErrorText {
  color: red;
  font-size: 12px;
  position: absolute;
  left: 15px;
  top: 25px;
  display: none;
}
</style>
