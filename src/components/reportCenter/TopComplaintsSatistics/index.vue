<template>
    <div>
        <search
            :serachForm="searchForm"
            @searchData="searchList" 
            @onDownload="downloadPage" 
            @selectedChange="selectedChange"
        >
        </search>
        <el-row class="top-box">
            <el-col :span="24">
                <span v-if="row.countTxt">{{row.countTxt + ' : ' + row.count + ' %'}}</span>
                <span v-if="row.amountTxt">{{row.amountTxt + ' : ' + row.amount + ' 元'}}</span>
                <span v-if="row.proportionTxt">{{row.proportionTxt + ' : ' + row.proportion + ' %'}}</span>
            </el-col>
        </el-row>
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
import {TOP_SATISTICS_TABLE_HEAD, KYC} from '@/constants'
import {getStartDateAndEndDate} from "@/components/utils";
export default {
    name: 'TOP情况统计',
    components: {
        search
    },
    data () {
        return {
            headList: TOP_SATISTICS_TABLE_HEAD,
            tableData: [],
            searchForm:{
                beginDate: "",
                endDate: "", 
                // customerKyc: "", 
                productLine: "", // 行业业绩属性
                dimension: "收单交易金额（亿）/占比", 
                line: "TOP 20商户", 
                childTag: [KYC.ALL],
                childTagName: KYC.ALL_NAME
            },
            ids: [],
            pager: {
                totalCount: 0,
                currentPage: 1,
                pageSize: 20,
                maxPageNum: 0
            },
            row: {
                countTxt: '总计',
                count: 0,
                amountTxt: '收单交易金额（亿）',
                amount: 0,
                proportionTxt: '收单交易金额（占比）',
                proportion: 0
            }
        }
    },
    created() {
        this.getSDateAndEDate()
    },
    methods: {
        getSDateAndEDate() {
            let se = getStartDateAndEndDate(new Date(), '0', 30)
            this.searchForm.startTime = se.startDate
            this.searchForm.endTime = se.endDate
        },     
        downloadPage () {
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
            let url = "/merchantInspect/downLoad" + sendDataStr
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
                this.searchForm.childTagName = ''
            }
        },
        getParam () {
            let sendData = {}
            for (let key in this.searchForm) {
                if (key !== 'childTag' && key !== 'childTagName') {
                    sendData[key] = this.searchForm[key]
                }
            }
            sendData.customerKyc = this.ids.join(',')
            return sendData
        },
        searchList() {
            this.pager.currentPage = 1
            this.tableData = []
            this.searchData()
        },
        searchData() {
            let sendData = this.getParam()
            sendData.pageNumber = this.pager.currentPage
            sendData.pageRow = this.pager.pageSize
            this.$axios.post("/report/topcount",
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
