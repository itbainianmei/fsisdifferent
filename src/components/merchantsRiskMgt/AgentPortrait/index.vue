<template>
    <div>
        <search
            :serachForm="searchForm"
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
                        btnTit: '下载'
                    }
                ]
            }
        },
        methods: {
            searchList (){
               this.pager.currentPage = 1
               this.searchData()
            },
            searchData() {
                let sendData = {}
                for (let key in this.searchForm) {
                    if (key === 'beginDate' || key === 'endDate') {
                        sendData[key] = this.searchForm[key].replace(/-/g, '')
                    }
                    sendData[key] = this.searchForm[key]
                }
                sendData.pageNum = this.pager.currentPage
                sendData.pageSize = this.pager.pageSize
                this.$axios.post("/ProtraitAgency/findList",
                    qs.stringify(sendData)
                ).then(res => {
                    console.log(JSON.stringify(res.data.result, null, 2))
                    let result = res.data
                    this.tableData = result.data.result;
                    this.pager.totalCount = parseInt(result.data.total);
                    this.pager.maxPageNum = Math.ceil(this.pager.totalCount / this.pager.pageSize);
                    if (this.searchForm.industryAttribute === '') {
                        this.searchForm.industryAttribute  = '全部'
                    }
                    if (this.searchForm.agencyAttribute === '') {
                        this.searchForm.agencyAttribute  = '全部'
                    }
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
                            sysconid:''
                        })
                    }
                });
            },
            downloadPage(pageDownInfo){
                console.log(pageDownInfo)
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
                "&startPage=" +
                pageDownInfo.startPage * 1  +
                "&endPage=" +
                pageDownInfo.endPage * 1 +
                "&pageSize=" +
                this.pager.pageSize
                this.$axios.get(url).then(res1 => {
                    let d_url = this.uploadBaseUrl + url;
                    this.downloadBlack = false
                    window.location = encodeURI(d_url)
                }).catch(error => {
                    console.log(error);
                });
            },
            onCurrentChange (val) {
                this.pager.currentPage = val
                this.searchData()
            },
            goDetail (item) {
                let obj = {}
                obj.path = '/manager/agentPortrait/detail/' + item.agencyNo
                obj.name = '代理商画像详情'
                obj.act  = false
                this.$router.push({path: obj.path})
                // 遍历循环看是否存在代理商画像详情 如果存在先删除在添加
                // this.$store.state.tabsArr.map((one, index) =>{
                //    if (one.name === '代理商画像详情') {
                //         this.$store.dispatch('deltab',index);
                //         this.$store.dispatch('updateTabCache',index);
                //    } 
                // })
                // this.$store.dispatch('addtab', obj);
                // this.$store.dispatch('updateTabCache');
            }
        },
        mounted() {
            this.initTimeSet();
        }
    }
</script>