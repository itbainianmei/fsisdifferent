<template>
    <div>
        <search
            :searchForm="searchForm"
            @searchData="searchList" 
            @onDownload="downloadPage" 
            @selectedChange="selectedChange"
        >
        </search>
        <table-pager  class="more-head"
            :headList="headList"
            :dataList="tableData"
            :pageInfo="pager"
            @onCurrentChange="onCurrentChange"
            @checkSelect="checkSelect"
        ></table-pager>
    </div>
</template>
<script>
import qs from "qs";
import search from './Partial/detail-search.vue';
import {MERCHANT_COMPLAINT_DETAIL_HEAD, KYC, PAGESIZE_10} from '@/constants'
import {getStartDateAndEndDate} from "@/components/utils";
export default {
    name: '投诉明细查询',
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
                somplaintSource: "全部", 
                customerNumber: "", 
                signedName: "", 
                // kycResult: "",
                orderNo: "",
                salesName: "",
                yejishuxing: "",
                childTag: [KYC.ALL],
                childTagName: KYC.ALL_NAME
            },
            ids: [],
            pager: {
                totalCount: 0,
                currentPage: 1,
                pageSize: PAGESIZE_10,
                maxPageNum: 0
            }
        }
    },
    created() {
        this.getSDateAndEDate()
        this.searchList()
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
            let se = getStartDateAndEndDate(new Date(), 'day', 10)
            this.searchForm.startTime = se.startDate
            this.searchForm.endTime = se.endDate
        },     
        downloadPage(){
            let sendData = this.getParam()
            let sendDataStr = ''
            let k = 0
            for (let key in sendData) {
                if (k === 0) {
                    sendDataStr = '?' +  key + '=' + sendData[key]
                } else {
                    sendDataStr = sendDataStr + '&' +  key + '=' + sendData[key]
                }
                k++
            }
            let url = "/report/complanint/downloadList" + sendDataStr
            let d_url = this.uploadBaseUrl + url;
            window.location = encodeURI(d_url)
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
                this.searchForm.childTagName = ''
            }
        },
        searchList() {
            this.pager.currentPage = 1
            this.tableData = []
            this.searchData()
        },
        getParam() {
            let sendData = {}
            for (let key in this.searchForm) {
                if (key !== 'childTag' && key !== 'childTagName') {
                    sendData[key] = this.searchForm[key]
                }
            }
            sendData.somplaintSource = sendData.somplaintSource === '全部' ? '' : sendData.somplaintSource
            sendData.kycResult = this.searchForm.childTagName === '全部' || this.searchForm.childTagName === '' ? '' : this.searchForm.childTagName
            return sendData
        },
        searchData() {
            let sendData = this.getParam()
            sendData.pageNumber = this.pager.currentPage
            sendData.pageRow = this.pager.pageSize
            this.$axios.post("/report/complanint/getDetail",
                qs.stringify(sendData)
            ).then(res => {
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
