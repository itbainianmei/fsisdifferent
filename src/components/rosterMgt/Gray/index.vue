<template>
    <div>
        <search
            :searchTagList="searchTagList"
            :searchSourceList="searchSourceList"
            :searchTypeList="searchTypeList"
            :searchKycList="searchKycList"
            :searchForm="searchForm"
            :ENUM_LIST="GRAY_ENUM_VAL"
            @searchData="searchList"
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
            <div class="BotoomBtn" @click="batchUpd(true)" data-title='修改' v-if="isButtons.showUpdBtn">
                <div class="btn-icon xgImg"></div>
            </div>
            <div class="BotoomBtn improt-btn" data-title='导入' @click="batchUpd(false)" v-if="isButtons.showImportBtn">
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
                <template v-for="item in headList">
                    <el-table-column  show-overflow-tooltip :width="item.width" :render-header="renderHeader" sortable v-if="item.prop !== 'uniqueId' && item.isShow" :type="item.type" :key="item.id" :label="item.label" :prop="item.prop" align="center"></el-table-column>
                    <el-table-column :width="item.width" :render-header="renderHeader" sortable v-if="item.prop === 'uniqueId' && item.isShow" :type="item.type" :key="item.id" :label="item.label" :prop="item.prop" align="center">
                        <template slot-scope="scope">
                            <el-popover trigger="hover" placement="top">
                            {{ scope.row.uniqueId }}
                            <div slot="reference" >
                            {{ scope.row.uniqueIdCopy }}
                            </div>
                            </el-popover>
                        </template>
                    </el-table-column>
                </template>
            </el-table>
            <!-- 表格每列的列选择 注意：每页都需要手动改变top值-->
            <div ref="list" class="table-select none">
                <!-- <TableSelect  :tableDataSec="tableDataSec" ></TableSelect> -->
                <div id="tableSelect" @click="allarea($event)">
                    <ul @click.stop>
                        <li v-for="(key,value,index) in tableDataSec" :key="value">
                        <input type="checkbox" :id="generateString(index)" :disabled="tableDataSecChange && key[0]" v-model="key[0]" @change="checkSelect(value, key[0])">
                        <label :for="generateString(index)">{{key[1]}}</label>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <Page :pageInfo="page"
         @onCurrentChange="onCurrentChange"></Page>
        <el-dialog title="添加灰名单" :visible.sync="addFormDialog" width="35%" v-dialogDrag >
            <el-form class="list-form-box" ref="addForm" :model="form" :rules="rules" :label-position="'right'" label-width="100px"  style="margin-left:13%;">
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
                    <el-input  style="width: 74%;" clearable ref="usercode" type="text" v-model="form.uniqueId" :maxlength="150"></el-input>
                </el-form-item>
                <el-form-item label="商户KYC:" prop="kyc">
                    <el-select v-model="form.kyc" placeholder="请选择" style="height: 36px;width: 74%" @focus="getQueryEnum(GRAY_ENUM_VAL.KYC, 'kycList')">
                         <el-option
                            v-for="item in kycList"
                            :key="item.syscode"
                            :label="item.sysname"
                            :value="item.syscode">
                        </el-option>
                    </el-select>
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
            <el-form class="list-form-box" ref="updForm" :model="updForm" :rules="rules" :label-position="'right'" label-width="100px"  style="margin-left:13%;">
                <el-form-item label="生效场景:" prop="type">
                    <el-select disabled v-model="updForm.type" placeholder="请选择" @change="typeUpdChange" style="height: 36px;width: 74%">
                        <el-option
                            v-for="item in typeList"
                            :key="item.syscode"
                            :label="item.sysname"
                            :value="item.syscode">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="维度:" prop="tag">
                    <el-select disabled v-model="updForm.tag" placeholder="请选择" style="height: 36px;width: 74%" @focus="getTagList('updForm')">
                        <el-option
                            v-for="item in tagList"
                            :key="item.syscode"
                            :label="item.sysname"
                            :value="item.syscode">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="名单值:" prop="uniqueId">
                    <el-input  disabled style="width: 74%;" clearable ref="usercode" type="text" v-model="updForm.uniqueId" :maxlength="150"></el-input>
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
        <el-dialog :title="dialogTit" :visible.sync="importeBlack" width="570px" v-dialogDrag>
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
    import {GRAY_ENUM, GRAY_IMPORT_TEMPLATE, GRAY_UPDATE_TEMPLATE, GRAY_TABLE_HEAD} from '@/constants';
    import { validateFormID, desensitizationVal } from "@/components/utils";
    export default {
        name: '灰名单',
        components: {
            search
        },
        data () {
            let validateUniqueId = (rule, value, callback) => {
                // 判断是否是添加的时候
                if (this.addFormDialog) {
                    let msg = validateFormID(this.form.tag, value);
                    if (msg !== '') {
                        callback(new Error(msg));
                    } else {
                        callback();
                    }
                }
                // 修改的时候
                if (this.updFormDialog) {
                    let msg = validateFormID(this.updForm.tag, value);
                    if (msg !== '') {
                        callback(new Error(msg));
                    } else {
                        callback();
                    }
                }
            };
            return {
                headList: GRAY_TABLE_HEAD,
                tableData: [],
                isButtons:{
                    showAddBtn: false,
                    showDelBtn: false,
                    showImportBtn: false,
                    showDownloadBtn: false,
                    showUpdBtn: false
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
                titleData: GRAY_IMPORT_TEMPLATE,
                form: {
                    type: "",
                    tag: "",
                    uniqueId: "",
                    kyc: "",
                    source: "",
                    remark: ""
                },
                rules: {
                    type: [{ required: true, message: "请选择生效场景", trigger: "change" }],
                    tag: [{ required: true, message: "请选择维度", trigger: "change" }],
                    uniqueId: [
                        { required: true, message: "请输入名单值", trigger: "change" },
                        { max: 150, min: 0, message: "名单值的长度不能超过150位", trigger: "blur" },
                        { validator: validateUniqueId, trigger:'blur' }],
                    source: [{ required: true, message: "请选择来源", trigger: "change" }],
                    kyc: [{ required: true, message: "请选择商户KYC", trigger: "change" }],
                    remarks: [{ max: 200, min: 0, message: "备注的长度不能超过200位", trigger: "blur" }]
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
                GRAY_ENUM_VAL: GRAY_ENUM,
                dialogTit: '从Excel导入到灰名单',
                isBatchUpdate: false,
                isDBUpdPower: false,
                tableDataSec: {},
                tableDataSecChange: false
            }
        },
        created() {
            this.headList.map(one => {
                one.isShow = true
                if (typeof one.prop !== 'undefined') {
                    this.tableDataSec[one.prop] = [true]
                    this.tableDataSec[one.prop].push(one.label)
                }
            })
            // 按钮权限
            const idList = JSON.parse(localStorage.getItem("ARRLEVEL"));
            this.isButtons.showAddBtn = idList.indexOf(138) === -1 ? false : true;
            this.isButtons.showDelBtn = idList.indexOf(139) === -1 ? false : true;
            this.isButtons.showImportBtn = idList.indexOf(140) === -1 ? false : true;
            this.isButtons.showDownloadBtn = idList.indexOf(141) === -1 ? false : true;
            this.isButtons.showUpdBtn = idList.indexOf(574) === -1 ? false : true;
            this.isDBUpdPower = idList.indexOf(659) === -1 ? false : true;
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
                if (val > 0) {
                    this.isShowDownloadBtn = true
                }
            },
            'searchForm.type': function(val) {
                this.searchForm.tag = "all"
                this.getSelectTag(val, 'searchTagList', 'search')
            },
           'searchForm.uniqueId': function(val) {
                this.$nextTick(() => {
                    this.searchForm.uniqueId = val.replace(/\s/g, '')
                })
            },
            'form.uniqueId': function(val) {
                this.$nextTick(() => {
                    this.form.uniqueId = val.replace(/\s/g, '')
                })
            },
            'updForm.uniqueId': function(val) {
                this.$nextTick(() => {
                    this.updForm.uniqueId = val.replace(/\s/g, '')
                })
            }
        },
        methods: {
            checkSelect(name, value) {
                var i = 0
                for(var item in this.tableDataSec){
                    if(this.tableDataSec[item][0]){
                        i = i + 1
                    }
                }
                if(i >= 1){
                    if (i === 1) {
                        this.tableDataSecChange = true
                    } else {
                        this.tableDataSecChange = false
                    }
                    this.$nextTick(() => {
                        this.headList = this.headList.map(one => {
                            if (one.prop === name) {
                                one.isShow = value
                            }
                            return one
                        })
                    })
                }
            }, 
            renderHeader(h, { column, $index }){
                return h("span",[
                    h("span",column.label),
                    h("span",{
                        "class":{
                        "el-icon-arrow-down":true
                        },
                        "on":{
                        click:(ev) => {
                                this.$refs.list.classList.remove('none')
                                var w = this.$refs.list.offsetWidth
                                if(Number(document.body.clientWidth) -  Number(ev.clientX) < w ){
                                this.$refs.list.style.left = Number(document.body.clientWidth) - w - 20 + 'px'
                                }else{
                                this.$refs.list.style.left = ev.clientX + 'px'
                                }
                                this.$refs.list.style.top= ev.pageY + 10 + 'px'
                                ev.stopPropagation()  //阻止冒泡
                            }
                        }
                    }),
                ])
            },
            batchUpd (flag) {
                this.isBatchUpdate = flag
                this.importeBlack = true
                this.helpTitle = false
                if (flag) {
                    this.dialogTit = "批量修改灰名单"
                    this.titleData = GRAY_UPDATE_TEMPLATE
                } else {
                    this.dialogTit = "从Excel导入到灰名单"
                    this.titleData = GRAY_IMPORT_TEMPLATE
                }
            },
            searchList (){
               this.page.currentPage = 1
               this.searchData()
            },
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
                    this.page.totalCount = data.total;
                    this.tableData.forEach(ele => {
                        let newVal = desensitizationVal(ele.tag, ele.uniqueId)
                        if (newVal !== '') {
                            ele.uniqueIdCopy = newVal
                        } else {
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
                let param = {
                    enumType: GRAY_ENUM.TYPE,
                    list: 'searchTypeList'
                }
                this.getQueryEnum(param)
                this.searchForm.uniqueId = "";
                this.searchForm.source = "all";
                this.searchForm.kyc = "all";
                this.searchForm.tag = "all";
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
                let interfaseName = ""
                let sendData = {}
                if (type === 'kyc') {
                    interfaseName = "/SysConfigController/queryKyc"
                } else {
                    interfaseName = "/SysConfigController/queryEnum"
                    sendData = {
                        sessionId: localStorage.getItem("SID"),
                        type: type
                    }
                }
                this.$axios.post(interfaseName, qs.stringify(sendData)).then(res => {
                    if (type === 'kyc') {
                        this[listName] = []
                        res.data.map(one => {
                            let two = {
                                sysname: one.strategy_code,
                                label: one.strategy_code,
                                syscode: one.strategy_code
                            }
                            this[listName].push(two)
                        })
                    } else {
                        this[listName] = res.data
                    }
                    if (pageType === 'search') {
                        this[listName].unshift({
                            sysname: '全部',
                            label: '全部',
                            sysconid: '',
                            syscode: 'all'
                        })
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
                if (this.startPage * 1 === 0) {
                    this.$alert("起始页输入值不能为0", "提示", {
                        confirmButtonText: "确定",
                        type: "warning"
                    });
                    return;
                }
                if (this.endPage * 1 === 0) {
                    this.$alert("结束页输入值不能为0", "提示", {
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
                if (this.endPage * 1 > this.maxPage) {
                    this.$alert("结束页输入值超过最大页数", "提示", {
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
                        let param = this.getParam()
                        param.startNum = this.startPage
                        param.endNum = this.endPage
                        param.pageSize = this.page.pageSize
                        let url = "/grayNameController/exportGrayName?" + qs.stringify(param)
                        let d_url = this.uploadBaseUrl + url;
                        this.downloadBlack = false
                        window.location = d_url
                    }
                }).catch(error => {});
            },
            getParam () {
                let sendData = {}
                for (let key in this.searchForm) {
                    sendData[key] = this.searchForm[key]
                }
                return sendData
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
                if (this.isBatchUpdate) {
                    window.location = encodeURI(
                        this.uploadBaseUrl + "/exportController/exporModel?name=nameList_grayUpdate"
                    );
                } else {
                    window.location = encodeURI(
                        this.uploadBaseUrl + "/exportController/exporModel?name=nameList_gray"
                    );
                }
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
                let url = "/grayNameController/importGrayName"
                if (this.isBatchUpdate) {
                    url = "/grayNameController/importUpdate"
                }
                this.$axios.post(url, formData)
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
                if (this.isDBUpdPower) {
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
                }
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
                                if (res.data.code * 1 === 200) {
                                    this.$message({
                                        message: '添加成功',
                                        type: 'success',
                                        showClose: true
                                    });
                                    this.addFormDialog = false;
                                    this.$refs[formName].resetFields();
                                    this.searchData()
                                }
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
    @import '~@/less/common.less';
    .dataTable {
        // position: relative;
        z-index: 2222;
        margin: 0 15px 0;
        .table-select{
            position: absolute;
            padding: 10px 20px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 14px;
            line-height: 30px;
            z-index: 20;
            max-height: 250px;
            overflow: scroll;
            background: #f5f6fa;
            top: 0;
            left: 0;
        }
    }
</style>
