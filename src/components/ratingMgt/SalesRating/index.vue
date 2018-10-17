<template>
    <div>
        <search
            :searchSourceList="searchSourceList"
            :serachForm="searchForm" 
            @searchData="searchList" 
            @resetForm="resetForm" 
            @getQueryEnum="getQueryEnum"
        >
        </search>
        <div class="button">
            <div class="BotoomBtn leftRadius" data-title='下载列表' @click="openDownloadBox('isList', 'isDetail')">
                <div class="btn-icon downloadIcon" style="margin-top: -1px;"></div>
            </div>
            <div class="BotoomBtn rightRadius" data-title='下载详情' @click="openDownloadBox('isDetail', 'isList')">
                <div class="btn-icon downloadIcon" style="margin-top: -1px;"></div>
            </div>
        </div>
        <div class="dataTable clear">
            <el-table
                :data="tableData"
                border
                style="width: 100%"
                @cell-dblclick="getDetail">
                <template v-for="item in titDatas">
                    <el-table-column :type="item.type" :key="item.id" :label="item.label" :prop="item.prop" align="center"></el-table-column>
                </template>
            </el-table>
        </div>
        <Page :pageInfo="page"  @onCurrentChange="onCurrentChange"></Page>
        <el-dialog title="销售评级查询：分页选择下载" :visible.sync="downloadBlack" width="30%" v-dialogDrag>
            <div style="text-align: center; margin-bottom:20px;">选择下载从
              <input type="number" v-model="startPage" min="0" class="downClass" @input='startPage'>到
              <input type="number" min="0"  class="downClass" :max="maxPage" v-model="endPage">页的数据</div>
            <h4 style="text-align: center">当前共<span>{{maxPage}}</span>页</h4>
            <span slot="footer" class="dialog-footer">
            <el-button @click="downloadBlackClose">取 消</el-button>
            <el-button type="primary" @click="downloadBlackData" v-show='isShowDownloadBtn'>下 载</el-button>
            </span>
        </el-dialog>
        <el-dialog title="修改级别" :visible.sync="updFormDialog" width="35%" v-dialogDrag >
            <el-form ref="updForm" :model="updForm" :rules="rules" :label-position="'right'" label-width="100px"  style="margin-left:13%;">
                <el-form-item label="销售:" prop="salesname">
                    <el-input  disabled style="width: 74%;" clearable ref="usercode" type="text" v-model="updForm.salesname" ></el-input>
                </el-form-item>
                <el-form-item label="人工评级等级:" prop="ratingresults">
                    <el-select v-model="updForm.ratingresults" placeholder="请选择" style="height: 36px;width: 74%"  @focus="getQueryEnum('sourceList')">
                         <el-option
                            v-for="item in sourceList"
                            :key="item.syscode"
                            :label="item.sysname"
                            :value="item.sysname">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="人工评级备注:" prop="remark">
                    <el-input clearable type="textarea" :maxlength="200" placeholder="最长长度不能超过200位" v-model="updForm.remark" style="width: 74%"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="cancelForm('updForm')">取 消</el-button>
                <el-button type="primary" @click="submitForm('updForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import qs from "qs";
    import search from './Partial/search.vue';
    import {SALES_RATING_TABLE_HEAD} from '@/constants';
    export default {
        name: '销售评级管理',
        components: {
            search
        },
        data () {
            return {
                titDatas: SALES_RATING_TABLE_HEAD,
                tableData: [],
                searchForm:{
                    createTimeBegin: "",
                    createTimeEnd: "", 
                    ratingresults: "全部", 
                    salesname: "", 
                    branchCompany: ""
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
                rules: {
                    remark: [{ max: 200, min: 0, message: "备注的长度不能超过200位", trigger: "blur" }]
                },
                sourceList: [],
                searchSourceList: [
                    {
                        sysname: '全部',
                        label: '全部',
                        sysconid: '',
                        syscode: ''
                    }
                ],
                updForm:  {
                    id: '',
                    ratingresults: "",
                    remark: "",
                    salesname: ''
                },
                updFormDialog: false,
                startPage: 0,
                endPage: 0,
                maxPage: 0,
                isList: false,
                isDetail: false
            }
        },
        watch: {
            downloadBlack() {
                if (this.downloadBlack === true) {
                    this.startPage = 0;
                    this.endPage = Math.ceil(this.page.totalCount / this.page.pageSize);
                    // this.maxPage = Math.ceil(this.page.totalCount / this.page.pageSize);
                    if (this.tableData.length === 0) {
                        this.isShowDownloadBtn = false;
                    } else if (this.tableData.length !== 0) {
                        this.startPage = 1;
                        this.isShowDownloadBtn = true;
                    }
                } else if (this.downloadBlack === false) {
                    this.endPage = 0;
                    // this.maxPage = 0;
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
            }
        },
        methods: {
            openDownloadBox(flag, noFlag) {
                this[flag] = true;
                this[noFlag] = false;
                this.downloadBlack = true;
            },
            searchList (){
               this.page.currentPage = 1
               this.searchData()
            },
            searchData() {
                this.$axios.post("/SalesRate/getSalesRateList",
                    qs.stringify({
                        createTimeBegin: this.searchForm.createTimeBegin,
                        createTimeEnd: this.searchForm.createTimeEnd,
                        ratingresults: this.searchForm.ratingresults === '全部' ? '' : this.searchForm.ratingresults,
                        salesname: this.searchForm.salesname,
                        branchCompany: this.searchForm.branchCompany,
                        pageNumber: parseInt(this.page.currentPage), // 页码
                        pageRow: parseInt(this.page.pageSize) // 页数
                    })
                ).then(res => {
                    let data = res.data.data;
                    this.tableData = data.result
                    this.page.totalCount = data.total || 0;
                    this.maxPage = data.endPage || 0;
                }).catch(error => {
                    console.log(error);
                });
            },
            initTimeSet() {
                let date = new Date();
                let y = date.getFullYear();
                let m = "0" + (date.getMonth() + 1);
                let d = "0" + date.getDate();
                this.searchForm.createTimeBegin =
                    y +
                    "-" +
                    m.substring(m.length - 2, m.length)
                this.searchForm.createTimeEnd =
                    y +
                    "-" +
                    m.substring(m.length - 2, m.length) 
            },
            resetForm(){
                this.initTimeSet();
                this.searchForm.branchCompany = "";
                this.searchForm.salesname = "";
                this.searchForm.ratingresults = "全部";
            },
            getQueryEnum (param) {
                let listName = ""
                let pageType = ""
                if (typeof param === 'string') {
                    listName = arguments[0]
                } else {
                    listName = param.list
                    pageType = param.pageType ||　''
                }
                console.log(listName)
                this.$axios.post( "/BranchCompanyRate/getRateType", qs.stringify({})).then(res => {
                    this[listName] = res.data.data.RateStatusList.map((one, i) => {
                        let two = {
                            sysname: one,
                            label: one,
                            sysconid: i,
                            syscode: i
                        }
                        return two
                    })
                    if (pageType === 'search') {
                        this[listName].unshift({
                            sysname: '全部',
                            label: '全部',
                            sysconid: '',
                            syscode: ''
                        })
                        if (listName === "searchSourceList") {
                            this.searchForm.ratingresults = this[listName][0].sysname
                        }
                        if (listName === "sourceList" && this.updForm.ratingresults === "") {
                            this.updForm.ratingresults = this[listName][0].sysname
                        }
                    }
                });
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
                let sendData = {
                    createTimeBegin: this.searchForm.createTimeBegin,
                    createTimeEnd: this.searchForm.createTimeEnd,
                    branchCompany: this.searchForm.branchCompany,
                    salesname: this.searchForm.salesname      
                }
                sendData.startNum =  this.startPage
                sendData.endNum =  this.endPage
                sendData.endPage =  this.maxPage
                sendData.pageRow =  this.page.pageSize
                sendData.ratingresults = this.searchForm.ratingresults === '全部' ? '' : this.searchForm.ratingresults

                this.$axios.post("/SalesRate/checkDownloadParam",
                    qs.stringify(sendData)
                ).then(res => {
                    if (res.data.code * 1 === 200) {
                        let startRow = res.data.data.startRow
                        let sumRow = res.data.data.sumRow
                        let createTimeBegin = res.data.data.createTimeBegin
                        let createTimeEnd = res.data.data.createTimeEnd
                        let url = "/SalesRate/downloadList"
                        if (this.isDetail) {
                            url = "/SalesRate/downloadDetail"
                        }
                        url = url + '?createTimeBegin=' +
                        createTimeBegin + 
                        "&createTimeEnd=" + 
                        createTimeEnd +
                        "&ratingresults=" +
                        sendData.ratingresults +
                        "&salesname=" +
                        this.searchForm.salesname +
                        "&branchCompany=" +
                        this.searchForm.branchCompany +
                        "&startNum=" +
                        startRow +
                        "&endNum=" +
                        sumRow
                        let d_url = this.uploadBaseUrl + url;
                        this.downloadBlack = false
                        window.location = encodeURI(d_url)
                    } else {
                         this.$alert(res.data.data.msg, "提示", {
                            confirmButtonText: "确定",
                            type: "warning",
                            callback: action => {}
                        });
                    }
                }).catch(error => {});
            },
            getDetail(item){
                this.updForm.id = item.id
                this.updForm.ratingresults = item.ratingresults
                this.updForm.remark = item.remark
                this.updForm.salesname = item.salesname
                this.updFormDialog = true
                // 获取生效场景列表
                this.getQueryEnum('sourceList')
            },
            cancelForm(formName) {
                this.$refs[formName].resetFields();
                this[formName + 'Dialog'] = false
            },
            submitForm(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        this.$axios.post("/SalesRate/UpdateSalesRate",
                            qs.stringify({
                                Id: this.updForm.id,
                                ratingresults: this.updForm.ratingresults,
                                remark: this.updForm.remark
                            })
                        ).then(res => {
                            if(res.data.code * 1 === 200){
                                this.$message({
                                    message: '修改成功',
                                    type: 'success',
                                    showClose: true
                                });
                                this.updFormDialog = false;
                                this.$refs[formName].resetFields();
                                this.searchData()
                            }
                        }).catch(error => {
                            console.log(error);
                        });
                    }
                });
            },
            onCurrentChange (val) {
                this.page.currentPage = val
                this.searchData()
            }
        },
        mounted() {
            this.initTimeSet();
        }
    }
</script>
<style lang="less" scoped>
    @import '~@/less/button.less';
    @import '~@/less/common.less';
    .button .BotoomBtn:hover::after{
        width:60px;    
    }
</style>