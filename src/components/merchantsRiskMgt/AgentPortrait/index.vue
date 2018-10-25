<template>
    <div>
        <search
            :searchForm="searchForm"
            :sPerAttrList="sPerAttrList"
            :sNaturalAttrList="sNaturalAttrList"
            @searchData="searchList" 
            @resetForm="resetForm" 
            @getQueryEnum="getQueryEnum"
        >
        </search>
        <button-area
            :pageSize="pager.pageSize"
            :maxPage="pager.maxPageNum"
            :buttonList="buttonInfo"
            @download="downloadPage"
        ></button-area>
        <el-dialog title="代理商画像查询：分页选择下载" :visible.sync="isShowDownload" width="30%" v-dialogDrag>
            <div style="text-align: center; margin-bottom:20px;">选择下载从
              <input type="number" v-model="startPage" min="0" class="downClass" @input='startPage'>到
              <input type="number" min="0"  class="downClass" :max="maxPage" v-model="endPage">页的数据</div>
            <h4 style="text-align: center">当前共<span>{{maxPage}}</span>页</h4>
            <span slot="footer" class="dialog-footer">
            <el-button @click="closeDownload">取 消</el-button>
            <el-button type="primary" @click="downloadAction" v-show='isShowDownloadBtn'>下 载</el-button>
            </span>
        </el-dialog>
        <table-pager 
            :headList="headList"
            :styleCC="'margin-top: -5px'"
            :dataList="tableData"
            :pageInfo="pager"
            @onCurrentChange="onCurrentChange"
            @onDBClick="goDetail"
            @checkSelect="checkSelect"
        ></table-pager>
    </div>
</template>
<script>
    import qs from "qs";
    import search from './Partial/search.vue';
    import {getStartDateAndEndDate} from "@/components/utils";
    import {AGENTPORTRAIT_TABLE_HEAD, AGENT_PORTRAIT_ENUM} from '@/constants'
    export default {
        name: '代理商画像',
        components: {
            search
        },
        watch: {
            isShowDownload() {
                if (this.isShowDownload === true) {
                    this.startPage = 0;
                    this.endPage = Math.ceil(this.pager.totalCount / this.pager.pageSize);
                    this.maxPage = Math.ceil(this.pager.totalCount / this.pager.pageSize);
                    if (this.tableData.length === 0) {
                        this.isShowDownloadBtn = false;
                    } else if (this.tableData.length !== 0) {
                        this.startPage = 1;
                        this.isShowDownloadBtn = true;
                    }
                } else {
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
            }
        },
        created() {
            const idList = JSON.parse(localStorage.getItem("ARRLEVEL"));
            this.buttonInfo[0].downloadBtnPower = idList.indexOf(558) === -1 ? false : true;
            this.dbBtnPower = idList.indexOf(713) === -1 ? false : true;
            this.getSDateAndEDate()
            this.searchList()
        },
        data () {
            return {
                headList: AGENTPORTRAIT_TABLE_HEAD,
                tableData: [],
                searchForm:{
                    beginDate: "",
                    endDate: "", 
                    agencyNo: "", 
                    agencyName: "", 
                    sales: "", 
                    branchCompany: "",
                    industryAttribute: "全部", 
                    agencyAttribute: "全部", 
                },
                pager: {
                    totalCount: 0,
                    currentPage: 1,
                    pageSize: 20,
                    maxPageNum: 0
                },
                sPerAttrList: [],
                sNaturalAttrList: [],
                buttonInfo: [
                    {
                        type: 'download',
                        dialogTitle: '代理商画像下载',
                        btnTit: '下载',
                        downloadBtnPower: false
                    }
                ],
                isShowDownload: false,
                isShowDownloadBtn: false,
                startPage: 0,
                maxPage: 0,
                endPage: 0,
                dbBtnPower: false
            }
        },
        methods: {
            checkSelect(option){
                this.$nextTick(() => {
                    this.headList = this.headList.map(one => {
                        if (one.prop === option.name) {
                            one.isShow = option.value
                        }
                        return one
                    })
                })
            },
            getSDateAndEDate() {
                let se = getStartDateAndEndDate(new Date(), 'day', 7)
                this.searchForm.beginDate = se.startDate
                this.searchForm.endDate = se.endDate
            },
            searchList (){
               this.pager.currentPage = 1
               this.searchData()
            },
            getParam () {
                let sendData = {}
                for (let key in this.searchForm) {
                    if (key === 'beginDate' || key === 'endDate') {
                        sendData[key] = this.searchForm[key].replace(/-/g, '')
                    } else if (key === 'industryAttribute' || key === 'agencyAttribute') {
                        sendData[key] = this.searchForm[key] === '全部' ? '' : this.searchForm[key]
                    } else {
                        sendData[key] = this.searchForm[key]
                    }
                }
                return sendData
            },
            searchData() {
                let sendData = this.getParam()
                sendData.pageNum = this.pager.currentPage
                sendData.pageSize = this.pager.pageSize
                this.$axios.post("/ProtraitAgency/findList",
                    qs.stringify(sendData)
                ).then(res => {
                    let result = res.data
                    this.tableData = result.data.result || [];
                    this.pager.totalCount = parseInt(result.data.total);
                    this.pager.maxPageNum = Math.ceil(this.pager.totalCount / this.pager.pageSize);
                }).catch(error => {
                    console.log(error);
                });
            },
            resetForm(){
                this.getSDateAndEDate();
                this.searchForm.agencyNo = "";
                this.searchForm.agencyName = "";
                this.searchForm.sales = "";
                this.searchForm.branchCompany = "";
                this.searchForm.industryAttribute = "全部";
                this.searchForm.agencyAttribute = "全部";
            },
            getQueryEnum (param) {
                this.$axios.post( "/SysConfigController/queryEnum",
                    qs.stringify({
                        sessionId: localStorage.getItem("SID"),
                        type: param.enumType
                    })
                ).then(res => {
                    if (param.enumType === AGENT_PORTRAIT_ENUM.AGENCYATTR) {
                        let labelList = []
                        res.data.map(one => {
                            labelList.push(one.syscode)
                        })
                        let arr = [...new Set(labelList)].map((one, i) => {
                            let two = {
                                sysconid: i,
                                sysname: one,
                                label: one
                            }
                            return two
                        })
                        this[param.list] = arr
                    } else {
                        this[param.list] = res.data
                    }
                    if (param.pageType === 'search') {
                        this[param.list].unshift({
                            sysname: '全部',
                            label: '全部',
                            sysconid:''
                        })
                    }
                });
            },
            downloadPage () {
                this.isShowDownload = true
            },
            downloadAction(){
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
                let sendData = this.getParam()
                sendData.startPage =  this.startPage
                sendData.endPage =  this.endPage
                sendData.pageSize =  this.pager.pageSize
                let url = "/ProtraitAgency/downloadAgencyList?" + qs.stringify(sendData)
                let d_url = this.uploadBaseUrl + url;
                this.isShowDownload = false
                window.location = d_url
            },
            onCurrentChange (val) {
                this.pager.currentPage = val
                this.searchData()
            },
            goDetail (item) {
                if (this.dbBtnPower) {
                    window.open('#/manager/agentPortrait/detail/' + item.agencyNo)
                }
            },
            closeDownload () {
                this.isShowDownload = false;
                this.startPage = 0;
                this.endPage = 0;
                this.maxPage = 0;
            }
        }
    }
</script>
<style lang="less" scoped>
    @import '~@/less/common.less';
</style>
