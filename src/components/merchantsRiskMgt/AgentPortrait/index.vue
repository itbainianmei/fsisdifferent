<template>
    <div>
        <search
            :serachForm="searchForm"
            :sPerAttrList="sPerAttrList"
            :sNaturalAttrList="sNaturalAttrList"
            @searchData="searchData" 
            @resetForm="resetForm" 
            @getQueryEnum="getQueryEnum"
        >
        </search>
        <button-area
            :pageSize="pager.pageSize"
            :maxPage="pager.maxPageNum"
            :buttonList="buttonInfo"
            @onDownloadPage="downloadPage"
        ></button-area>
        <table-pager 
            :headList="headList"
            :dataList="tableData"
            :pageInfo="pager"
            @onCurrentChange="onCurrentChange"
            @onDBClick="goDetail"
        ></table-pager>
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
                headList: [
                    { type: 'selection',width: '50', align: 'center',label: ''},
                    { prop: 'agencyNo', width: '130px', align: 'center', label: '代理商编号'},
                    { prop: 'agencyName', width: '130px', align: 'center', label: '代理商名称'},
                    { prop: 'industryAttribute', width: '150px', label: '行业业绩属性', align: 'center'},
                    { prop: 'agencyAttribute', width: '180px', label: '代理商自然属性一级', align: 'center'},
                    { prop: 'sales', width: '130px', label: '销售', align: 'center'},
                    { prop: 'branchCompany', width: '170px', label: '分公司', align: 'center'},
                    { prop: 'activeMerchant', width: '170px', label: '活跃子商户数', align: 'center'},
                    { prop: 'addedMerchant',  width: '170px', label: '新增子商户数', align: 'center'},
                    { prop: 'riskMerchant',  width: '170px', label: '风险子商户数', align: 'center'},
                    { prop: 'receiptMoney', width: '170px', label: '交易金额', align: 'center'},
                    { prop: 'riskMerchantMoney', width: '170px', label: '风险商户交易金额', align: 'center'},
                    { prop: 'normalMoney', label: '正常业务交易金额', width: '170px', align: 'center'},
                    { prop: 'grossProfit', label: '总毛利', width: '170px', align: 'center'},
                    { prop: 'cheatPercent', label: '欺诈损失率', width: '170px', align: 'center'},
                    { prop: 'complaintMoney', label: '商户投诉率(金额)', width: '170px', align: 'center'},
                    { prop: 'complaintCount', label: '商户投诉率(笔数)', width: '170px', align: 'center'},
                ],
                tableData: [],
                searchForm:{
                    beginDate: "",
                    endDate: "", 
                    agencyNo: "", 
                    agencyName: "", 
                    sales: "", 
                    branchCompany: "",
                    industryAttribute: "", 
                    agencyAttribute: "", 
                },
                pager: {
                    totalCount: 0,
                    pageNum: 1,
                    pageSize: 20,
                    maxPageNum: 600
                },
                sPerAttrList: [],
                sNaturalAttrList: [],
                buttonInfo: [
                    {
                        type: 'download',
                        dialogTitle: '代理商画像下载',
                        btnTit: '下载'
                    }
                ]
            }
        },
        methods: {
            searchData() {
                let sendData = this.searchForm
                sendData.pageNum = this.pager.pageNum
                sendData.pageSize = this.pager.pageSize
                this.$axios.post("/ProtraitAgency/findList",
                    qs.stringify(sendData)
                ).then(res => {
                    console.log(JSON.stringify(res.data.result, null, 2))
                    this.tableData = JSON.parse(res.data.result);
                    this.pager.totalCount = parseInt(res.data.total);
                    this.pager.maxPageNum = this.pager.totalCount / this.pager.pageSize;
                }).catch(error => {
                    console.log(error);
                });
            },
            initTimeSet() {
                let date = new Date();
                let y = date.getFullYear();
                let m = "0" + (date.getMonth() + 1);
                let d = "0" + date.getDate();
                this.searchForm.beginDate =
                    y +
                    "-" +
                    m.substring(m.length - 2, m.length) +
                    "-" +
                    d.substring(d.length - 2, d.length);
                this.searchForm.endDate =
                    y +
                    "-" +
                    m.substring(m.length - 2, m.length) +
                    "-" +
                    d.substring(d.length - 2, d.length);
            },
            resetForm(){
                this.initTimeSet();
                this.searchForm.type = "";
                this.searchForm.tag = "";
                this.searchForm.uniqueId = "";
                this.searchForm.source = "";
                this.searchForm.status = "";
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
            downloadPage(pageDownInfo){
                console.log(pageDownInfo)
                //  this.$axios.get("/blackName/exportList?beginDate=" +
                //     this.searchForm.beginDate +
                //     "&endDate=" +
                //     this.searchForm.endDate +
                //     "&agencyNo=" +
                //     this.searchForm.agencyNo +
                //     "&agencyName=" +
                //     this.searchForm.agencyName +
                //     "&sales=" +
                //     this.searchForm.sales +
                //     "&branchCompany=" +
                //     this.searchForm.branchCompany +
                //     "&industryAttribute=" +
                //     this.searchForm.industryAttribute +
                //     "&industryAttribute=" +
                //     this.searchForm.agencyAttribute +
                //     "&pagenum=" +
                //     this.page.currentPage +
                //     "&pageSize=" +
                //     this.page.pageSize
                // )
                // .then(res => {

                // })
                // .catch(error => {
                //     console.log(error);
                // });
            },
            onCurrentChange (val) {
                this.pager.pageNum = val
                this.searchData()
            },
            goDetail (val) {
                // 去详情
                this.$router.push({path:'/manager/agentPortrait/detail'})
                let obj = {}
                obj.path = '/manager/agentPortrait/detail'
                obj.name = '代理商画像详情'
                obj.act  = false
                this.$store.dispatch('addtab', obj);
                this.$store.dispatch('updateTabCache');
            }
        },
        mounted() {
            this.initTimeSet();
        }
    }
</script>