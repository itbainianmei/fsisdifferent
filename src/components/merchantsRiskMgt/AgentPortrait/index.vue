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
    import {AGENTPORTRAIT_TABLE_HEAD} from '@/constants'
    export default {
        components: {
            search
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
                    industryAttribute: "", 
                    agencyAttribute: "", 
                },
                pager: {
                    totalCount: 0,
                    currentPage: 1,
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
                sendData.pageNum = this.pager.currentPage
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
                    this[param.list] = res.data
                    if (param.pageType === 'search') {
                        
                        this[param.list].unshift({
                            sysname: '全部',
                            label: '全部',
                            sysconid: ''
                        })
                    }
                });
            },
            downloadPage(pageDownInfo){
                console.log(pageDownInfo)
                let sendData = this.searchForm
                // sendData.startPage =  this.startPage
                // sendData.endPage =  this.endPage
                // sendData.pageSize =  this.page.pageSize
                // sendData.sumPage =  this.maxPage
                
                this.$axios.post("/blackName/checkBlackNameDownloadParam",
                    qs.stringify(sendData)
                ).then(res => {
                    let result = res.data
                   if (result.code * 1 === 200) {
                        let startRow = result.data.startRow
                        let sumRow = result.data.sumRow
                        let url = "/ProtraitAgency/downloadAgencyList?startDate=" +
                        this.searchForm.beginDate +
                        "&endDate=" +
                        this.searchForm.endDate +
                        "&agencyNo=" +
                        this.searchForm.agencyNo +
                        "&agencyName=" +
                        this.searchForm.agencyName +
                        "&sales=" +
                        this.searchForm.sales +
                        "&branchCompany=" +
                        this.searchForm.branchCompany +
                        "&industryAttribute=" +
                        this.searchForm.industryAttribute +
                        "&agencyAttribute=" +
                        this.searchForm.agencyAttribute +
                        "&startRow=" +
                        startRow +
                        "&sumRow=" +
                        sumRow 
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
            onCurrentChange (val) {
                this.pager.currentPage = val
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