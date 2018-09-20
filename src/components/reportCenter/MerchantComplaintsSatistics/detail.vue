<template>
    <div>
        <search
            :serachForm="searchForm"
            @searchData="searchData" 
            @onDownload="downloadPage" 
            @selectedChange="selectedChange"
        >
        </search>
        <table-pager 
            :headList="headList"
            :dataList="tableData"
            :pageInfo="pager"
            @onCurrentChange="onCurrentChange"
        ></table-pager>
    </div>
</template>
<script>
import qs from "qs";
import search from './Partial/detail-search.vue';
import {MERCHANT_COMPLAINT_DETAIL_HEAD, KYC} from '@/constants'
import {getStartDateAndEndDate} from "@/components/utils";
export default {
    components: {
        search
    },
    data () {
        return {
            headList: MERCHANT_COMPLAINT_DETAIL_HEAD,
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
                childTag: [KYC.ALL],
                childTagName: KYC.ALL_NAME
            },
            ids: [],
            pager: {
                totalCount: 0,
                currentPage: 1,
                pageSize: 20,
                maxPageNum: 0
            }
        }
    },
    watch: {
        'searchForm.dataTag': function (val) {
            this.searchForm.childTag = [KYC.ALL]
            this.ids = []
            this.searchForm.childTagName = KYC.ALL_NAME
        }
    },
    created() {
        this.getSDateAndEDate()
    },
    mounted() {
        this.$nextTick(function () {
            this.searchData();
        });
    },
    methods: {
        getSDateAndEDate() {
            let se = getStartDateAndEndDate(new Date(), this.searchForm.timeType)
            this.searchForm.beginDate = se.startDate
            this.searchForm.endDate = se.endDate
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
        },
        searchData(type) {
            let sendData = {}
            for (let key in this.searchForm) {
                if (key !== 'childTag' && key !== 'childTagName') {
                    sendData[key] = this.searchForm[key]
                }
            }
            sendData.tag = this.ids.join(',')
            sendData.pageNum = this.pager.currentPage
            sendData.pageSize = this.pager.pageSize
            this.$axios.post("/ProtraitAgency/findList",
                qs.stringify(sendData)
            ).then(res => {
                console.log(JSON.stringify(res.data.returnList, null, 2))
                let result = res.data
                this.tableData = result.data.returnList;
                this.pager.totalCount = parseInt(result.data.total);
            }).catch(error => {
                console.log(error);
            });
        },
        onCurrentChange (val) {
            this.pager.currentPage = val
            this.searchData('pager')
        }
    }
}
</script>
<style>
.chart-box{
    margin: 40px 0;
}
</style>
