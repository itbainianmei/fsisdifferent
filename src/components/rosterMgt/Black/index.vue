<template>
    <div>
        <search
            :searchTagList="searchTagList"
            :searchSourceList="searchSourceList"
            :searchTypeList="searchTypeList"
            :serachForm="searchForm"  
            @searchData="searchData" 
            @resetForm="resetForm" 
            @getQueryEnum="getQueryEnum"
        >
        </search>
        <div class="button">
            <div class="BotoomBtn leftRadius" @click="addbtn" data-title='添加' v-if="isButtons.showAddBtn">
            <div class="btn-icon addIcon" ></div>
            </div>
            <div class="BotoomBtn" @click="removeData" data-title='删除' v-if="isButtons.showDelBtn">
            <div class="btn-icon removIcon"></div>
            </div>
            <div class="BotoomBtn improt-btn" data-title='导入' @click="importeBlack=true" v-if="isButtons.showImportBtn">
            <div class="btn-icon refreshIcon"></div>
            </div>
            <div class="BotoomBtn rightRadius" data-title='下载' @click="downloadBlack = true" v-if="isButtons.showDownloadBtn">
            <div class="btn-icon downloadIcon" style="margin-top: -1px;"></div>
            </div>
        </div>
        <div class="dataTable clear">
            <el-table
                :data="tableData"
                border
                style="width: 100%"
                @selection-change="selectDelUser">
                <el-table-column v-for="(item, i) in titDatas" :key="i"
                    :prop="typeof item.prop !== 'undefined' ? item.prop : ''"
                    :type="typeof item.type !== 'undefined' ? item.type : ''"
                    :width="typeof item.width !== 'undefined' ? item.width : ''"
                    :align='item.align'
                    :label='item.label'
                    :sortable="typeof item.sortable !== 'undefined' ? item.sortable : false"
                >
                    <template slot-scope="scope" v-if="item.slotScope === 'scope'">
                        <el-popover trigger="hover" placement="top">
                        {{ scope.row.uniqueId }}
                        <div slot="reference" >
                        {{ scope.row.uniqueIdCopy }}
                        </div>
                        </el-popover>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <Page :pageInfo="page"></Page>
        <el-dialog title="添加黑名单" :visible.sync="listAdd" width="35%" v-dialogDrag >
            <el-form ref="form" :model="form" :rules="rules"  class="demo-ruleForm" :label-position="'right'" label-width="100px"  style="margin-left:13%;">
                <el-form-item label="生效场景:" prop="type">
                    <el-select v-model="form.type" placeholder="请选择" @change="typeChange" style="height: 36px;width: 74%" id="busline">
                        <el-option
                            v-for="item in typeList"
                            :key="item.syscode"
                            :label="item.sysname"
                            :value="item.syscode">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="维度:" prop="tag">
                    <el-select v-model="form.tag" placeholder="请选择" style="height: 36px;width: 74%" id="veido">
                        <el-option
                            v-for="item in tagList"
                            :key="item.syscode"
                            :label="item.sysname"
                            :value="item.syscode">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="名单值:" prop="uniqueId">
                    <el-input  style="width: 74%;" clearable ref="usercode" :class="{redborder:isredborder,addIpt:isaddIpt}" type="text" v-model="form.uniqueId" id="usercode"></el-input>
                </el-form-item>
                <el-form-item label="来源:" prop="source">
                    <el-select v-model="form.source" placeholder="请选择" style="height: 36px;width: 74%" id="veido">
                         <el-option
                            v-for="item in sourceList"
                            :key="item.syscode"
                            :label="item.sysname"
                            :value="item.syscode">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="生效时间:"  prop="activeDate">
                    <el-date-picker
                    v-model="form.activeDate"
                    id="time"
                    type="datetime"
                    placeholder="选择日期时间"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    style="width: 74%;"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="到期时间:" prop="expireDate" class='hideTimeRightIcon'>
                    <el-date-picker
                    v-model="form.expireDate"
                    type="datetime"
                    id="endTime"
                    placeholder="选择日期时间"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    style="width: 74%;" 
                    :editable="false"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="备注:" prop="remark">
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
    </div>
</template>
<script>
    import qs from "qs";
    import search from './Partial/search.vue';
    export default {
        components: {
            search
        },
        data () {
            return {
                titDatas: [
                    { type: 'selection',width: '50', align: 'center',label: ''},
                    { prop: 'type', width: '130px', align: 'center', label: '生效场景',sortable: true},
                    { prop: 'tag', width: '130px', align: 'center', label: '维度'},
                    { prop: 'uniqueId', width: '150px', label: '名单值', align: 'center', slotScope: 'scope'},
                    { prop: 'source', label: '来源', align: 'center'},
                    { prop: 'status', width: '130px', label: '状态', align: 'center'},
                    { prop: 'activeDate', width: '170px', label: '生效日期', align: 'center'},
                    { prop: 'expireDate', width: '170px', label: '到期日期', align: 'center'},
                    { prop: 'remarks', label: '备注', align: 'center'},
                    { prop: 'createTime', width: '170px', label: '创建日期', align: 'center'},
                    { prop: 'updateTime', width: '170px', label: '更新日期', align: 'center'},
                    { prop: 'updateBy', label: '操作员', width: '170px', align: 'center'}
                ],
                tableData: [],
                isButtons:{
                    showAddBtn: false,
                    showDelBtn: false,
                    showImportBtn: false,
                    showDownloadBtn: false
                },
                searchForm:{
                    startDate: "",
                    endDate: "", 
                    uniqueId: "", // 名单值
                    tag: "1", // 维度
                    status: "1", // 状态
                    source: "1", // 来源
                    type: "1" // 生效场景
                },
                page: {
                    isShowSizeChange: false,
                    totalCount: 0,
                    currentPage: 1,
                    pageSize: 20,
                    sizeList: [10, 20, 30, 40]
                },
                mdNumber: "",
                startnum: "",
                endpagenum: "",
                countNoPage: 0,
                pagenum: 0,
                multipleSelection: '',
                removeArr: [1],
                helpTitle: false,
                importeBlack: false,
                downloadBlack: false,
                showHideDownloadBtn: false,
                nameFormChange: "",
                file: "",
                titleData: [
                    {
                        name: "生效场景",
                        help: "交易灰名单、商户灰名单、refer灰名单"
                    },
                    {
                        name: "维度",
                        help: "场景为交易灰名单时：商户编号、银行卡号、手机号、IP、身份证号、终端号、经度、纬度、证件号(非身份证)、固定电话；场景为商户灰名单时：商户编号、银行卡号、业务产品、测试终端号、EPOS终端号、银行类型；场景为refer灰名单时：商户编号、网址"
                    },
                    {
                        name: "名单值",
                        help: "文本格式不能为空"
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
                        help: "文本格式，不超过200个字符"
                    }
                ],
                listAdd: false,
                form: {
                    type: "",
                    tag: "",
                    uniqueId: "",
                    source: "",
                    activeDate: "",
                    expireDate: "",
                    remark: ""
                },
                rules: {
                    type: [{ required: true, message: " ", trigger: "change" }],
                    tag: [{ required: true, message: " ", trigger: "change" }],
                    uniqueId: [{ required: true, message: " ", trigger: "change" }],
                    remark: [{ max: 200, min: 0, message: " ", trigger: "blur" }]
                },
                isredborder: false,
                isaddIpt: true,
                typeList: [],
                tagList: [],
                sourceList: [],
                searchTypeList: [],
                searchTagList: [],
                searchSourceList: []
            }
        },
        created() {
            // 按钮权限
            const idList = JSON.parse(localStorage.getItem("ARRLEVEL"));
            this.isButtons.showAddBtn = idList.indexOf(131) === -1 ? false : true;
            this.isButtons.showDelBtn = idList.indexOf(132) === -1 ? false : true;
            this.isButtons.showImportBtn = idList.indexOf(133) === -1 ? false : true;
            this.isButtons.showDownloadBtn = idList.indexOf(134) === -1 ? false : true;
        },
        watch: {
            downloadBlack() {
                if (this.downloadBlack === true) {
                    this.startnum = 0;
                    this.endpagenum = Math.ceil(this.page.count / this.page.pageSize);
                    this.countNoPage = Math.ceil(this.page.count / this.page.pageSize);

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
            searchData(form) {
                this.searchForm = form
                this.$axios.post("/blackName/queryBlackName",
                    qs.stringify({
                    // sessionId: localStorage.getItem("SID"),
                        startDate: this.searchForm.startDate,
                        endDate: this.searchForm.endDate,
                        type: this.searchForm.type,
                        tag: this.searchForm.tag,
                        uniqueId: this.searchForm.uniqueId.split(" ").join(""),
                        source: this.searchForm.source,
                        status: this.searchForm.status,
                        pageNum: parseInt(this.page.currentPage), // 页码
                        pageSize: parseInt(this.page.pageSize) // 页数
                    })
                ).then(res => {
                    this.tableData = JSON.parse(res.data.result);
                    this.page.totalCount = parseInt(res.data.total);
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
            },
            initTimeSet() {
                let date = new Date();
                let y = date.getFullYear();
                let m = "0" + (date.getMonth() + 1);
                let d = "0" + date.getDate();
                this.searchForm.startDate =
                    y +
                    "-" +
                    m.substring(m.length - 2, m.length) +
                    "-" +
                    d.substring(d.length - 2, d.length) +
                    " " +
                    "00:00:00";
                this.searchForm.endDate =
                    y +
                    "-" +
                    m.substring(m.length - 2, m.length) +
                    "-" +
                    d.substring(d.length - 2, d.length) +
                    " " +
                    "23:59:59";
            },
            resetForm(){
                this.initTimeSet();
                this.searchForm.type = "";
                this.searchForm.tag = "";
                this.searchForm.uniqueId = "";
                this.searchForm.source = "";
                this.searchForm.status = "";
            },
            selectDelUser(val) {
                this.multipleSelection = val;
                this.removeArr = [];
                for (let i = 0; i < this.multipleSelection.length; i++) {
                    this.removeArr.push(this.multipleSelection[i].id);
                }
            },
            getQueryEnum (param) {
                console.log(param)
                this.$axios.post( "/SysConfigController/queryEnum",
                    qs.stringify({
                        sessionId: localStorage.getItem("SID"),
                        type: param.enumType
                    })
                ).then(res => {
                    if (param.pageType === 'search') {
                        this[param.list] = res.data
                        this[param.list].unshift({
                            sysname: '全部',
                            label: '全部',
                            sysconid: ''
                        })
                    } else {
                        this[param.list] = res.data
                    }
                });
            },
            // 删除
            removeData() {
                if (this.removeArr.length === 0) {
                    this.$alert("请至少选中一条需要处理的数据", "提示", {
                        type: "warning",
                        confirmButtonText: "确定"
                    });
                } else if (this.removeArr.length >= 1) {
                    this.delDialog = true;
                     this.$confirm('确认将选中的名单值删除？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                     }).then(() => {
                        this.delSaveBtn()
                     }).catch(action => {
                        console.log(action)
                    });
                }
            },
            delSaveBtn() {
                this.$axios.post("/blackName/deleteBlackName",
                    qs.stringify({
                        ids: this.removeArr
                    })
                ).then(res => {
                    this.$alert(res.data.message, "提示", {
                        confirmButtonText: "确定",
                        callback: action => {
                            this.searchData()
                        }
                    });
                }).catch(error => {});
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
            downloadBlackClose() {
                this.downloadBlack = false;
                this.startnum = 0;
                this.endpagenum = 0;
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
                this.$axios.get("/blackName/exportList?startDate=" +
                    this.searchForm.startDate +
                    "&endDate=" +
                    this.searchForm.endDate +
                    "&type=" +
                    this.searchForm.type +
                    "&tag=" +
                    this.searchForm.tag +
                    "&uniqueId=" +
                    this.searchForm.uniqueId +
                    "&source=" +
                    this.searchForm.source +
                    "&status=" +
                    this.searchForm.status +
                    "&pagenum=" +
                    this.page.currentPage +
                    "&pageSize=" +
                    this.page.pageSize
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
            // 导入以下方法
            importeBlackClick() {
                document.getElementById('filename').value = '';
                this.importeBlack = false;
                this.nameFormChange = '';
                this.file = '';
            },
            helpTitleClick() {
                this.helpTitle = !this.helpTitle;
            },
            downloadMb() {
                window.location = encodeURI(
                    this.uploadBaseUrl + "/NameListController/exportBlackModel"
                );
            },
            fileChange(e) {
                this.file = e.target.files[0];
                this.nameFormChange = e.target.files[0].name;
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
                this.$axios.post("/blackName/importBlackName", formData)
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
                }) .catch(error => {
                    console.log(error);
                });
            },
            // 添加以下方法
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
            // TODO 需确认并修改
            typeChange() {
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
                    this.$axios.post("/blackName/addBlackName",
                        qs.stringify({
                            type: this.form.type,
                            tag: this.form.tag,
                            uniqueId: this.form.uniqueId.split(" ").join(""),
                            source: this.form.source,
                            activeDate: this.form.activeDate,
                            expireDate: this.form.expireDate,
                            remark: this.form.remark
                        })
                        ).then(res => {
                            this.$alert(res.data.message, "提示", {
                                confirmButtonText: "确定"
                            });
                            this.listAdd = false;
                            this.$refs[formName].resetFields();
                        }).catch(error => {
                            console.log(error);
                        });
                    } else {
                        return false;
                    }
                });
            }
        },
        mounted() {
            this.initTimeSet();
        }
    }
</script>
<style lang="less" scoped>
    @import '~@/less/button.less';
    @import '../less/roster.less';
</style>