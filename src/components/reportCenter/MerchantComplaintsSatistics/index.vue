<template>
    <div>
        <search
            :serachForm="searchForm"
            @searchData="searchData" 
            @onDownload="downloadPage" 
            @onTarget="goDetail" 
            @selectedChange="selectedChange"
        >
        </search>
    </div>
</template>
<script>
    import qs from "qs";
    import search from './Partial/search.vue';
    import {AGENTPORTRAIT_TABLE_HEAD, MERCHANT_COMPLAINT_SATISTICS_ENUM} from '@/constants'
    import {getStartDateAndEndDate} from "@/components/utils";
    export default {
        components: {
            search
        },
        data () {
            return {
                headList: AGENTPORTRAIT_TABLE_HEAD,
                tableData: [],
                searchForm:{
                    timeType: "0",
                    beginDate: "",
                    endDate: "", 
                    agencyNo: "", 
                    agencyName: "", 
                    sales: "", 
                    branchCompany: "",
                    dataTag: "kyc", 
                    childTag: [MERCHANT_COMPLAINT_SATISTICS_ENUM.ALL],
                    childTagName: "全部" 
                },
                ids: []
            }
        },
        watch: {
            'searchForm.dataTag': function (val) {
                this.searchForm.childTag = [MERCHANT_COMPLAINT_SATISTICS_ENUM.ALL]
                this.ids = []
                this.searchForm.childTagName = '全部'
            }
        },
        created() {
            this.getSDateAndEDate()
        },
        methods: {
            getSDateAndEDate() {
                let se = getStartDateAndEndDate(new Date(), this.searchForm.timeType)
                this.searchForm.beginDate = se.startDate
                this.searchForm.endDate = se.endDate
            },
            searchData() {
                let sendData = this.searchForm
                sendData.beginDate = sendData.beginDate.replace(/-/g, '')
                sendData.endDate = sendData.endDate.replace(/-/g, '')
                sendData.pageNum = this.pager.currentPage
                sendData.pageSize = this.pager.pageSize
                sendData.industryAttribute = sendData.industryAttribute === '全部' ? '' : sendData.industryAttribute; 
                sendData.agencyAttribute =  sendData.agencyAttribute === '全部' ? '' : sendData.agencyAttribute; 
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
            goDetail (item) {
                let obj = {}
                obj.path = '/manager/agentPortrait/detail/' + item.agencyNo
                obj.name = '代理商画像详情'
                obj.act  = false
                this.$router.push({path: obj.path})
                // 遍历循环看是否存在代理商画像详情 如果存在先删除在添加
                this.$store.state.tabsArr.map((one, index) =>{
                   if (one.name === '代理商画像详情') {
                        this.$store.dispatch('deltab',index);
                        this.$store.dispatch('updateTabCache',index);
                   } 
                })
                this.$store.dispatch('addtab', obj);
                this.$store.dispatch('updateTabCache');
            },
            selectedChange(item){
                let ids = item.checkedKeys
                if (ids.length > 0) {
                    let names = []
                    item.checkedNodes.map(one => {
                        names.push(one.label)
                    })
                    for (let i = 0; i< names.length; i++) {
                        if (names[i] === '全部' || names[i] === '正常' || names[i] === '风险') {
                            ids[i] = ''
                        }
                    }
                    let filterName = names.join(',')
                    if (filterName.indexOf('全部') >= 0) {
                        this.searchForm.childTagName = '全部'
                    } else if (filterName.indexOf('正常') >= 0) {
                        this.searchForm.childTagName = filterName.replace('正常,', '')
                    } else  if (filterName.indexOf('风险') >= 0) {
                        this.searchForm.childTagName = filterName.replace('风险,', '')
                    } else {
                        this.searchForm.childTagName = filterName
                    }
                    
                    let filterID = []
                    ids.map(one => {
                        if (one !== '') {
                            filterID.push(one)
                        }
                    })
                    this.ids = filterID
                    this.searchForm.childTag = item.checkedKeys
                } else {
                    this.searchForm.childTag = [MERCHANT_COMPLAINT_SATISTICS_ENUM.ALL]
                    this.searchForm.childTagName = '全部'
                }
            }
        }
    }
</script>