<template>
    <div>
        <search
            :searchForm="searchForm"
            @searchData="searchList" 
            @onDownload="downloadPage" 
            @selectedChange="selectedChange"
        >
        </search>
        <el-row class="top-box"  v-show="tableData.length">
            <el-col :span="24">
                <span style="color:blue;margin-right: 5px;">总计</span>
                <span v-if="row.amountTxt">{{row.amountTxt + ' : ' + row.amount}}</span>
                <span v-if="row.proportionTxt">{{row.proportionTxt + ' : ' + row.proportion}}</span>
            </el-col>
        </el-row>
        <table-pager 
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
import search from './Partial/search.vue';
import {TOP_SATISTICS_TABLE_HEAD, KYC, PAGESIZE_10} from '@/constants'
import {getStartDateAndEndDate, formatterMoney} from "@/components/utils";
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
                productLine: "全部", // 行业业绩属性
                dimension: "收单交易金额（亿）/占比", 
                line: 20, 
                childTag: [KYC.ALL],
                childTagName: KYC.ALL_NAME
            },
            ids: [],
            pager: {
                totalCount: 0,
                currentPage: 1,
                pageSize: PAGESIZE_10,
                maxPageNum: 0
            },
            row: {
                amountTxt: '收单交易金额（亿）',
                amount: 0,
                proportionTxt: '收单交易金额（占比）',
                proportion: 0
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
            this.searchForm.beginDate = se.startDate
            this.searchForm.endDate = se.endDate
        },     
        downloadPage () {
            let sendData = this.getParam()
            let url = "/report/topcount/downloadList?" + qs.stringify(sendData)
            let d_url = this.uploadBaseUrl + url;
            window.location = d_url
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
            sendData.productLine = sendData.productLine === '全部' ? '' : sendData.productLine
            sendData.customerKyc = this.ids.join(',')
            sendData.beginDate = sendData.beginDate.replace(/-/g, '')
            sendData.endDate = sendData.endDate.replace(/-/g, '')
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
            this.$axios.post("/report/topcount/queryList",
                qs.stringify(sendData)
            ).then(res => {
                let result = res.data
                if (result.data !== null) {
                    this.setTable(result.data.returnList || [])
                    this.row.proportion = result.data.allReceiptRate
                    this.row.amount = formatterMoney(result.data.allReceipt || '')
                    this.pager.totalCount = parseInt(result.data.total);
                } else {
                    this.setTable([])
                }
            }).catch(error => {
                console.log(error);
            });
        },
        setTable (data) {
            let dimension = this.searchForm.dimension
            if (dimension === '收单交易金额（亿）/占比') {
                this.row.amountTxt = '收单交易金额（亿）'
                this.row.proportionTxt = '收单交易金额占比(%)'
            } else if (dimension === '日均收单金额（亿）/占比') {
                this.row.amountTxt = '日均收单金额（亿）'
                this.row.proportionTxt = '日均收单金额占比(%)'
            } else if (dimension === '出款交易金额（亿）/占比') {
                this.row.amountTxt = '出款交易金额（亿）'
                this.row.proportionTxt = '出款交易金额占比(%)'
            } else if (dimension === '毛利(万)/占比') {
                this.row.amountTxt = '毛利(万)'
                this.row.proportionTxt = '毛利占比(%)'
            } else if (dimension === '商户投诉金额/商户投诉率(金额)') {
                this.row.amountTxt = '商户投诉金额'
                this.row.proportionTxt = '商户投诉率(金额)'
            } else if (dimension === '商户投诉笔数/商户投诉率(笔数)') {
                this.row.amountTxt = '商户投诉笔数'
                this.row.proportionTxt = '商户投诉率(笔数)(%)'
            } else if (dimension === '欺诈损失金额(万)/欺诈损失率(0.01BP)') {
                this.row.amountTxt = '欺诈损失金额(万)'
                this.row.proportionTxt = '欺诈损失率(0.01BP)'
            } else if (dimension.indexOf('/') < 0 && dimension.indexOf('率') >= 0){
                this.row.proportionTxt = dimension + '(%)'
                this.row.amountTxt = ''
            } else if (dimension.indexOf('/') < 0 && dimension.indexOf('金额') >= 0){
                this.row.proportionTxt = ''
                this.row.amountTxt = dimension
            }
            this.headList.map(one => {
                if (one.prop === 'amountCountTop') {
                    one.label = this.row.amountTxt
                }
                if (one.prop === 'amountCountAllTop') {
                    one.label = this.row.proportionTxt
                }
            })
            this.tableData = data
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
