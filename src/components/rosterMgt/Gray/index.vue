<template>
    <div>
        <search
            :searchTagList="searchTagList"
            :searchSourceList="searchSourceList"
            :searchTypeList="searchTypeList"
            :searchKycList="searchKycList"
            :searchForm="searchForm"  
            :ENUM_LIST="GRAY_ENUM_VAL" 
            @searchData="searchData" 
            @resetForm="resetForm" 
            @getQueryEnum="getQueryEnum"
            @changeSelect="changeSelect"
        >
        </search>
        <div class="button">
            <div class="BotoomBtn leftRadius" @click="openFormDialog()" data-title='添加' v-if="isButtons.showAddBtn">
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
                @selection-change="selectDelUser"
                @cell-dblclick="getDetail">
                <template v-for="item in titDatas">
                    <el-table-column :type="item.type" :key="item.id" :label="item.label" :prop="item.prop" align="center"></el-table-column>
                </template>
            </el-table>
        </div>
        <Page :pageInfo="page"
         @onCurrentChange="onCurrentChange"></Page>
        <el-dialog title="添加灰名单" :visible.sync="addFormDialog" width="35%" v-dialogDrag >
            <el-form ref="addForm" :model="form" :rules="rules" :label-position="'right'" label-width="100px"  style="margin-left:13%;">
                <el-form-item label="生效场景:" prop="type">
                    <el-select v-model="form.type" placeholder="请选择" @change="typeFormChange" style="height: 36px;width: 74%">
                        <el-option
                            v-for="item in typeList"
                            :key="item.syscode"
                            :label="item.sysname"
                            :value="item.syscode">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="维度:" prop="tag">
                    <el-select v-model="form.tag" placeholder="请选择" style="height: 36px;width: 74%" @focus="getTagList('form')">
                        <el-option
                            v-for="item in tagList"
                            :key="item.syscode"
                            :label="item.sysname"
                            :value="item.syscode">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="名单值:" prop="uniqueId">
                    <el-input  style="width: 74%;" clearable ref="usercode" type="text" v-model="form.uniqueId"></el-input>
                </el-form-item>
                <el-form-item label="来源:" prop="source">
                    <el-select v-model="form.source" placeholder="请选择" style="height: 36px;width: 74%"  @focus="getQueryEnum(GRAY_ENUM_VAL.SOURCE, 'sourceList')">
                         <el-option
                            v-for="item in sourceList"
                            :key="item.syscode"
                            :label="item.sysname"
                            :value="item.syscode">
                        </el-option>
                    </el-select>
                </el-form-item>
                 <el-form-item label="商户KYC:" prop="source">
                    <el-select v-model="form.kyc" placeholder="请选择" style="height: 36px;width: 74%" @focus="getQueryEnum(GRAY_ENUM_VAL.KYC, 'kycList')">
                         <el-option
                            v-for="item in kycList"
                            :key="item.syscode"
                            :label="item.sysname"
                            :value="item.syscode">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注:" prop="remark">
                    <el-input clearable type="textarea" :maxlength="200" placeholder="最长长度不能超过200位" v-model="form.remark" style="width: 74%"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="cancelForm('addForm')">取 消</el-button>
                <el-button type="primary" @click="submitForm('addForm')">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="修改灰名单" :visible.sync="updFormDialog" width="35%" v-dialogDrag >
            <el-form ref="updForm" :model="updForm" :rules="rules" :label-position="'right'" label-width="100px"  style="margin-left:13%;">
                <el-form-item label="生效场景:" prop="type">
                    <el-select v-model="updForm.type" placeholder="请选择" @change="typeUpdChange" style="height: 36px;width: 74%">
                        <el-option
                            v-for="item in typeList"
                            :key="item.syscode"
                            :label="item.sysname"
                            :value="item.syscode">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="维度:" prop="tag">
                    <el-select v-model="updForm.tag" placeholder="请选择" style="height: 36px;width: 74%" @focus="getTagList('updForm')">
                        <el-option
                            v-for="item in tagList"
                            :key="item.syscode"
                            :label="item.sysname"
                            :value="item.syscode">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="名单值:" prop="uniqueId">
                    <el-input  style="width: 74%;" clearable ref="usercode" type="text" v-model="updForm.uniqueId" ></el-input>
                </el-form-item>
                <el-form-item label="来源:" prop="source">
                    <el-select v-model="updForm.source" placeholder="请选择" style="height: 36px;width: 74%" @focus="getQueryEnum(GRAY_ENUM_VAL.SOURCE, 'sourceList')">
                         <el-option
                            v-for="item in sourceList"
                            :key="item.syscode"
                            :label="item.sysname"
                            :value="item.syscode">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商户KYC:" prop="kyc">
                    <el-select v-model="updForm.kyc" placeholder="请选择" style="height: 36px;width: 74%" @focus="getQueryEnum(GRAY_ENUM_VAL.KYC, 'kycList')">
                         <el-option
                            v-for="item in kycList"
                            :key="item.syscode"
                            :label="item.sysname"
                            :value="item.syscode">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注:" prop="remark">
                    <el-input clearable type="textarea" :maxlength="200" placeholder="最长长度不能超过200位" v-model="updForm.remark" style="width: 74%"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="cancelForm('updForm')">取 消</el-button>
                <el-button type="primary" @click="submitForm('updForm')">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="灰名单查询：分页选择下载" :visible.sync="downloadBlack" width="30%" v-dialogDrag>
            <div style="text-align: center; margin-bottom:20px;">选择下载从
              <input type="number" v-model="startPage" min="0" class="downClass" @input='startPage'>到
              <input type="number" min="0"  class="downClass" :max="maxPage" v-model="endPage">页的数据</div>
            <h4 style="text-align: center">当前共<span>{{maxPage}}</span>页</h4>
            <span slot="footer" class="dialog-footer">
            <el-button @click="downloadBlackClose">取 消</el-button>
            <el-button type="primary" @click="downloadBlackData" v-show='isShowDownloadBtn'>下 载</el-button>
            </span>
        </el-dialog>
        <el-dialog title="从Excel导入到灰名单" :visible.sync="importeBlack" width="570px" v-dialogDrag>
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
    import {GRAY_ENUM} from '@/constants';
    export default {
        components: {
            search
        },
        data () {
            return {
                 titDatas: [
                    { type: 'selection',width: '50', align: 'center',label: ''},
                    { prop: 'typeName', width: '130px', align: 'center', label: '生效场景',sortable: true},
                    { prop: 'tagName', width: '130px', align: 'center', label: '维度'},
                    { prop: 'uniqueId', width: '150px', label: '名单值', align: 'center', slotScope: 'scope'},
                    { prop: 'sourceName', label: '来源', align: 'center'},
                    { prop: 'kycName', label: '商户KYC', align: 'center'},
                    { prop: 'remark', label: '备注', align: 'center'},
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
                    tag: "all", // 维度
                    source: "all", // 来源
                    type: "", // 生效场景,
                    kyc: "all" // 商户KYC
                },
                page: {
                    isShowSizeChange: false,
                    totalCount: 0,
                    currentPage: 1,
                    pageSize: 20,
                    sizeList: [10, 20, 30, 40]
                },
                multipleSelection: '',
                helpTitle: false,
                importeBlack: false,
                downloadBlack: false,
                isShowDownloadBtn: false,
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
                        name: "商户KYC",
                        help: "文本格式不能为空"
                    },
                    {
                        name: "备注",
                        help: "文本格式，不超过200个字符"
                    }
                ],
                form: {
                    type: "",
                    tag: "",
                    uniqueId: "",
                    kyc: "",
                    source: "",
                    remark: ""
                },
                rules: {
                    type: [{ required: true, message: " ", trigger: "change" }],
                    tag: [{ required: true, message: " ", trigger: "change" }],
                    uniqueId: [{ required: true, message: " ", trigger: "change" }],
                    kyc: [{ required: true, message: " ", trigger: "change" }],
                    source: [{ required: true, message: " ", trigger: "change" }],
                    remark: [{ max: 200, min: 0, message: " ", trigger: "blur" }]
                },
                typeList: [],
                tagList: [],
                sourceList: [],
                kycList: [],
                searchTypeList: [],
                searchTagList: [
                    {
                        sysname: '全部',
                        label: '全部',
                        sysconid: '',
                        syscode: 'all'
                    }
                ],
                searchSourceList: [
                    {
                        sysname: '全部',
                        label: '全部',
                        sysconid: '',
                        syscode: 'all'
                    }
                ],
                searchKycList:  [
                    {
                        sysname: '全部',
                        label: '全部',
                        sysconid: '',
                        syscode: 'all'
                    }
                ],
                updForm:  {
                    type: "",
                    tag: "",
                    uniqueId: "",
                    kyc: "",
                    source: "",
                    remark: ""
                },
                updFormDialog: false,
                addFormDialog: false,
                startPage: 0,
                endPage: 0,
                maxPage: 0,
                GRAY_ENUM_VAL: GRAY_ENUM
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
                    this.startPage = 0;
                    this.endPage = Math.ceil(this.page.totalCount / this.page.pageSize);
                    this.maxPage = Math.ceil(this.page.totalCount / this.page.pageSize);
                    if (this.tableData.length === 0) {
                        this.isShowDownloadBtn = false;
                    } else if (this.tableData.length !== 0) {
                        this.startPage = 1;
                        this.isShowDownloadBtn = true;
                    }
                } else if (this.downloadBlack === false) {
                    this.endPage = 0;
                    this.maxPage = 0;
                }
            },
             startPage: function(val) {
                if (val < 0) {
                    this.startPage = 0
                }
            },
            endPage: function(val) {
                if (val < 0) {
                    this.endPage = 0
                }
                if (val > 0 && val < this.maxPage) {
                    this.isShowDownloadBtn = true
                }
            },
            'searchForm.type': function(val) {
                this.searchForm.tag = "all"
                this.getSelectTag(val, 'searchTagList', 'search')
            }
        },
        methods: {
            searchData() {
                this.$axios.post("/grayNameController/queryGrayName",
                    qs.stringify({
                        startDate: this.searchForm.startDate,
                        endDate: this.searchForm.endDate,
                        type: this.searchForm.type,
                        tag: this.searchForm.tag,
                        uniqueId: this.searchForm.uniqueId.split(" ").join(""),
                        source: this.searchForm.source,
                        kyc: this.searchForm.kyc,
                        pageNum: parseInt(this.page.currentPage), // 页码
                        pageSize: parseInt(this.page.pageSize) // 页数
                    })
                ).then(res => {
                    let data = res.data.data;
                    this.tableData = data.result
                    console.log(JSON.stringify(this.tableData, null, 2))
                    this.page.totalCount = data.total;
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
                let param = {
                    enumType: GRAY_ENUM.TYPE,
                    list: 'searchTypeList'
                }
                this.getQueryEnum(param)
                this.searchForm.uniqueId = "";
                this.searchForm.source = "all";
                this.searchForm.kyc = "all";
            },
            selectDelUser(val) {
                this.multipleSelection = val;
            },
            changeSelect(val) {
                let param = {
                    enumType: val
                }
                this.getQueryEnum(param)
            },
            getQueryEnum (param) {
                let type = ""
                let listName = ""
                let pageType = ""
                if (arguments.length >= 2) {
                    type = arguments[0]
                    listName = arguments[1]
                } else {
                    type = param.enumType
                    listName = param.list
                    pageType = param.pageType ||　''
                }
                this.$axios.post( "/SysConfigController/queryEnum",
                    qs.stringify({
                        sessionId: localStorage.getItem("SID"),
                        type: type
                    })
                ).then(res => {
                    if (pageType === 'search') {
                        this[listName] = res.data
                        this[listName].unshift({
                            sysname: '全部',
                            label: '全部',
                            sysconid: '',
                            syscode: 'all'
                        })
                    } else {
                        this[listName] = res.data
                    }
                    if (type === GRAY_ENUM.TYPE && listName === "searchTypeList") {
                        this.searchForm.type = "1"
                    }
                    if (type === GRAY_ENUM.TYPE && listName === "typeList") {
                        this.form.type = "1"
                    }
                });
            },
            // 删除
            removeData() {
                if (this.multipleSelection.length === 0) {
                    this.$alert("请至少选中一条需要处理的数据", "提示", {
                        type: "warning",
                        confirmButtonText: "确定"
                    });
                } else if (this.multipleSelection.length >= 1) {
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
                let ids = this.multipleSelection.map(one => one.id);
                this.$axios.post("/grayNameController/deleteGrayName",
                    qs.stringify({
                        ids: ids.join(',')
                    })
                ).then(res => {
                    this.$message({
                        message: '删除成功',
                        type: 'success',
                        showClose: true
                    });
                    this.searchData();
                }).catch(error => {});
            },
            downloadBlackClose() {
                this.downloadBlack = false;
                this.startPage = 0;
                this.endPage = 0;
            },
             downloadBlackData() {
                if (this.startPage === 0 || this.endPage === 0) {
                    this.$alert("输入值不能为0", "提示", {
                        confirmButtonText: "确定",
                        type: "warning"
                    });
                    return;
                }
                if (this.startPage > this.endPage) {
                    this.$alert("起始页数需小于结束页数", "提示", {
                        confirmButtonText: "确定",
                        type: "warning"
                    });
                    return;
                }
                if ((this.endPage * 10 - this.startPage * 10 + 1) / 10 * this.pageSize >  100000) {
                    this.$alert("最多只能导出10万条数据", "提示", {
                        confirmButtonText: "确定",
                        type: "warning",
                        callback: action => {}
                    });
                    return;
                }
                // let sendData = this.searchForm
                let sendData = {}
                sendData.startNum =  this.startPage
                sendData.endNum =  this.endPage
                sendData.pageSize =  this.page.pageSize
                // sendData.sumPage =  this.maxPage
                this.$axios.post("/grayNameController/countDownloadList",
                    qs.stringify(sendData)
                ).then(res => {
                   if (res.data.code * 1 === 200) {
                       let url = "/grayNameController/exportGrayName?startDate=" +
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
                            "&kyc=" +
                            this.searchForm.kyc +
                            "&startNum=" +
                            this.startPage +
                            "&endNum=" +
                            this.endPage + 
                            "&pageSize=" +
                            this.page.pageSize
                        this.$axios.get(url).then(res1 => {
                            let d_url = this.uploadBaseUrl + url;
                            this.downloadBlack = false
                            window.location = encodeURI(d_url)
                        }).catch(error => {
                            console.log(error);
                        });
                    } else {
                         this.$alert(res.data.data.msg, "提示", {
                            confirmButtonText: "确定",
                            type: "warning",
                            callback: action => {}
                        });
                    }
                }).catch(error => {});
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
                    this.uploadBaseUrl + "/grayNameController/exportGrayModel"
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
                this.$axios.post("/grayNameController/importGrayName", formData)
                .then(res => {
                    let result = res.data
                    if (result.code * 1 === 200) {
                        this.$alert(result.msg, "提示", {
                        confirmButtonText: "确定",
                        type: "success",
                        callback: action => {
                            document.getElementById('filename').value = ''
                            this.importeBlack = false;
                            this.nameFormChange = '';
                            this.file = '';
                        }
                        });
                    } else {
                        this.$alert(result.msg, "提示", {
                        confirmButtonText: "确定",
                        type: "warning",
                        callback: action => {}
                        });
                    }
                }) .catch(error => {
                    console.log(error);
                });
            },
            typeFormChange(val) {
                this.form.tag=""
                this.getSelectTag(this.form.type, 'tagList', '')
            },
            typeUpdChange(val) {
                this.updForm.tag=""
                this.getSelectTag(this.updForm.type, 'tagList', '')
            },
            // 添加以下方法
            openFormDialog() {
                this.addFormDialog = true;
                // 获取起始时间和结束时间
                var date = new Date();
                var year = date.getFullYear(); //获取当前年份
                var mon = "0" + (date.getMonth() + 1); //获取当前月份
                var da = "0" + date.getDate(); //获取当前日
                var day = date.getDay(); //获取当前星期几
                var h = "0" + date.getHours(); //获取小时
                var m = "0" + date.getMinutes(); //获取分钟
                var s = "0" + date.getSeconds(); //获取秒

                this.form.activeDate =
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
                this.form.expireDate =
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
                // 获取生效场景列表
                let param = {
                    enumType: GRAY_ENUM.TYPE,
                    list: 'typeList'
                }
                this.getQueryEnum(param)
            },
            getDetail(item){
                this.updForm.id = item.id
                this.updForm.type = item.type
                this.updForm.tag = item.tag
                this.updForm.uniqueId = item.uniqueId
                this.updForm.source = item.source
                this.updForm.kyc = item.kyc
                this.updForm.remark = item.remark
                this.updFormDialog = true
                // 获取维度，来源，kfc
                // 获取生效场景列表
                this.getQueryEnum(GRAY_ENUM.TYPE, 'typeList')
                this.getQueryEnum(GRAY_ENUM.SOURCE, 'sourceList')
                this.getQueryEnum(GRAY_ENUM.KYC, 'kycList')
                this.getSelectTag(this.updForm.type, 'tagList', '')
            },
            cancelForm(formName) {
                this.$refs[formName].resetFields();
                this[formName + 'Dialog'] = false
            },
            submitForm(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        if(formName === 'updForm') {
                            this.$axios.post("/grayNameController/updateGrayName",
                                qs.stringify(this.updForm)
                            ).then(res => {
                                this.$message({
                                    message: '修改成功',
                                    type: 'success',
                                    showClose: true
                                });
                                this.updFormDialog = false;
                                this.$refs[formName].resetFields();
                                this.searchData()
                            }).catch(error => {
                                console.log(error);
                            });
                        } else {
                            this.$axios.post("/grayNameController/addGrayName",
                                qs.stringify(this.form)
                            ).then(res => {
                               this.$message({
                                    message: '添加成功',
                                    type: 'success',
                                    showClose: true
                                });
                                this.addFormDialog = false;
                                this.$refs[formName].resetFields();
                                this.searchData()
                            }).catch(error => {
                                console.log(error);
                            });
                        }

                    }
                });
            },
            getTagList(formName){
               this.getSelectTag(this[formName].type, 'tagList', '')
            },
            getSelectTag(val, listName, type){
                let param = {
                    list: listName,
                    pageType: type
                }
                if (val * 1 === 1) {
                    param.enumType = GRAY_ENUM.TRADE_TAG
                }
                if (val * 1=== 2) {
                    param.enumType = GRAY_ENUM.MERCHANT_TAG
                }
                 if (val * 1 === 3) {
                     param.enumType = GRAY_ENUM.REFER_CHECK_TAG
                }
                this.getQueryEnum(param)
            },
            onCurrentChange (val) {
                this.page.currentPage = val
                this.searchData()
            },
        },
        mounted() {
            this.initTimeSet();
            let param = {
                enumType: GRAY_ENUM.TYPE,
                list: 'searchTypeList'
            }
            this.getQueryEnum(param)
        }
    }
</script>
<style lang="less" scoped>
    @import '~@/less/button.less';
    @import '../less/roster.less';
</style>