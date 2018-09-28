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
                processModle: '全部', // 处理方式
                processReslut: '全部', // 处理结果
                customerSign: '', // 商户唯一标识
                customerNumber: '', // 商户编号
                signedName: '', // 商户签约名
                salesName: "", // 销售
                yejishuxing: '', // 分公司
                // productLine: '', 行业业绩属性
                // businesscat: '' 商户自然属性一级
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
            let se = getStartDateAndEndDate(new Date(), 'day', 10)
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
            let url = "/report/customer/downloadList" + sendDataStr
            this.$axios.get(url).then(res1 => {
                let d_url = this.uploadBaseUrl + url;
                this.isShowDownload = false
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
                // this.searchForm[tag] = [KYC.ALL]
                // this.searchForm[tag + 'Name'] = KYC.ALL_NAME
            }
        },
        getParam () {
            let sendData = {}
            for (let key in this.searchForm) {
                if (key !== 'childTag' && key !== 'childTagName' &&　key !== 'hyChild' && key !== 'hyChildName') {
                    sendData[key] = this.searchForm[key]
                }
            }
            sendData.processModle = this.searchForm.processModle === '全部' ?  '' : this.searchForm.processModle
            sendData.processReslut = this.searchForm.processReslut === '全部' ?  '' : this.searchForm.processReslut
            sendData.productLine = this.searchForm.hyChildName === '全部' ?  '' : this.searchForm.hyChildName
            sendData.businesscat = this.searchForm.childTagName === '全部' ?  '' : this.searchForm.childTagName
            return sendData
        },
        searchData() {
            let sendData = this.getParam()
            sendData.pageNumber = this.pager.currentPage
            sendData.pageRow = this.pager.pageSize
            this.$axios.post("/report/customer/getsilent",
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
        },
        closeDownload () {
            this.isShowDownload = false;
            this.startPage = 0;
            this.endPage = 0;
            this.maxPage = 0;
        }
    }
}
</script>
<style lang="less" scoped>
    @import '~@/less/common.less';
    .top-box{
        margin: 20px 15px;
        font-size: 13px;
    }
    .top-box span{
        margin-right: 20px;
    }
</style>
