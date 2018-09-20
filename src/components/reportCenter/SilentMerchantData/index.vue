<template>
    <div>
        <search
            :serachForm="searchForm"
            @searchData="searchData" 
            @onDownload="downloadPage" 
            @selectedChange="selectedChange"
            @hySelectedTag="hySelectedTag"
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
import search from './Partial/search.vue';
import {SILENT_MERCHANT_DATA_TABLE_HEAD, KYC} from '@/constants'
import {getStartDateAndEndDate} from "@/components/utils";
export default {
    components: {
        search
    },
    data () {
        return {
            headList: SILENT_MERCHANT_DATA_TABLE_HEAD,
            tableData: [],
            searchForm:{
                startTime: "",
                endTime: "", 
                // customerKyc: "", 
                productline: "", 
                viewDimension: "收单交易金额（亿）/占比", 
                viewOption: "TOP 20商户", 
                childTag: [KYC.ALL],
                childTagName: KYC.ALL_NAME,
                hyChild: [KYC.ALL],
                hyChildName: KYC.ALL_NAME
            },
            ids: [],
            hyIds: [],
            pager: {
                totalCount: 0,
                currentPage: 1,
                pageSize: 20,
                maxPageNum: 0
            }
        }
    },
    created() {
        this.getSDateAndEDate()
    },
    methods: {
        getSDateAndEDate() {
            let se = getStartDateAndEndDate(new Date(), '2')
            this.searchForm.startTime = se.startDate
            this.searchForm.endTime = se.endDate
        },     
        downloadPage(pageDownInfo){
            console.log(pageDownInfo)
            let url = "/ProtraitAgency/downloadAgencyList?startTime=" +
            this.searchForm.startTime +
            "&endTime=" +
            this.searchForm.endTime +
            "&productline=" +
            this.searchForm.productline +
            "&viewOption=" +
            this.searchForm.viewOption +
            "&viewDimension=" +
            this.searchForm.viewDimension +
            "&customerKyc=" +
            this.ids.join(',')
            this.$axios.get(url).then(res1 => {
                let d_url = this.uploadBaseUrl + url;
                window.location = encodeURI(d_url)
            }).catch(error => {
                console.log(error);
            });
        },
        hySelectedTag(item) {
            this.commonSelectChange(item, 'hyChild', 'hyIds')
        },
        selectedChange(item){
            this.commonSelectChange(item, 'childTag', 'ids')
        },
        commonSelectChange(item, tag, tagArr){
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
                    this.searchForm[tag + 'Name'] = KYC.ALL_NAME
                } else if (filterName.indexOf(KYC.NORMAL_NAME) >= 0) {
                    this.searchForm[tag + 'Name'] = filterName.replace(KYC.NORMAL_NAME + ',', '')
                } else  if (filterName.indexOf(KYC.RISK_NAME) >= 0) {
                    this.searchForm[tag + 'Name'] = filterName.replace(KYC.RISK_NAME +',', '')
                } else {
                    this.searchForm[tag + 'Name'] = filterName
                }
                
                let filterID = []
                ids.map(one => {
                    if (one !== '') {
                        filterID.push(one)
                    }
                })
                this[tagArr] = filterID
                this.searchForm[tag] = item.checkedKeys
            } else {
                this.searchForm[tag] = [KYC.ALL]
                this.searchForm[tag + 'Name'] = KYC.ALL_NAME
            }
        },
        searchData() {
            let sendData = {}
            for (let key in this.searchForm) {
                if (key !== 'childTag' && key !== 'childTagName') {
                    sendData[key] = this.searchForm[key]
                }
            }
            sendData.customerKyc = this.ids.join(',')
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
            this.searchData()
        }
    }
}
</script>
<style>
.top-box{
    margin: 20px 15px;
    font-size: 13px;
}
.top-box span{
    margin-right: 20px;
}
</style>
