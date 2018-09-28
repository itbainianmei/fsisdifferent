<template>
    <div>
        <search
            :serachForm="searchForm"
            @searchData="searchList" 
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
                startTime: "",
                endTime: "", 
                somplaintSource: "", 
                customernumberArr: "", 
                signedName: "", 
                // kycResult: "",
                orderNo: "",
                salesname: "",
                branchcompany: "",
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
    methods: {
        getSDateAndEDate() {
            let se = getStartDateAndEndDate(new Date(), 'day', 10)
            this.searchForm.startTime = se.startDate
            this.searchForm.endTime = se.endDate
        },     
        downloadPage(){
            let url = "/report/complanint/downloadList?startTime=" +
            this.searchForm.startTime +
            "&endTime=" +
            this.searchForm.endTime +
            "&somplaintSource=" +
            this.searchForm.somplaintSource +
            "&customernumberArr=" +
            this.searchForm.customernumberArr +
            "&signedName=" +
            this.searchForm.signedName +
            "&orderNo=" +
            this.searchForm.orderNo +
            "&salesname=" +
            this.searchForm.salesname +
            "&branchcompany=" +
            this.searchForm.branchcompany +
            "&kycResult=" +
            this.ids.join(',')
            this.$axios.get(url).then(res1 => {
                let d_url = this.uploadBaseUrl + url;
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
                    if (names[i] === KYC.ALL_NAME || names[i] === KYC.NORMAL_NAME || names[i] === KYC.RISK_NAME) {
                        ids[i] = ''
                    }
                }
                let filterName = names.join(',')
                if (filterName.indexOf(KYC.ALL_NAME) >= 0) {
                    this.searchForm.childTagName = KYC.ALL_NAME
                } else if (filterName.indexOf(KYC.NORMAL_NAME) >= 0) {
                    this.searchForm.childTagName = filterName.replace(KYC.NORMAL_NAME + ',', '')
                } else  if (filterName.indexOf(KYC.RISK_NAME) >= 0) {
                    this.searchForm.childTagName = filterName.replace(KYC.RISK_NAME +',', '')
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
                this.searchForm.childTag = [KYC.ALL]
                this.searchForm.childTagName = KYC.ALL_NAME
            }
        },
        searchList() {
            this.pager.currentPage = 1
            this.tableData = []
            this.searchData()
        },
        searchData() {
            let sendData = {}
            for (let key in this.searchForm) {
                if (key !== 'childTag' && key !== 'childTagName') {
                    sendData[key] = this.searchForm[key]
                }
            }
            sendData.kycResult = this.ids.join(',')
            sendData.pageNum = this.pager.currentPage
            sendData.pageSize = this.pager.pageSize
            this.$axios.post("/report/complanint/getDetail",
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
            this.searchData()
        }
    }
}
</script>
<style>
.chart-box{
    margin: 40px 0;
}
</style>
