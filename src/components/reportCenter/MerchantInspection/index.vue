<template>
    <div>
        <search
            :serachForm="searchForm"
            @searchData="searchList" 
            @onDownload="downloadPage" 
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
import {MERCHANT_INSPECTION_DATA_TABLE_HEAD, KYC} from '@/constants'
import {getStartDateAndEndDate} from "@/components/utils";
export default {
    components: {
        search
    },
    data () {
        return {
            headList: MERCHANT_INSPECTION_DATA_TABLE_HEAD,
            tableData: [],
            searchForm:{
                startMonth: "",
                endMonth: "",
                type: '', // 巡检类型
                result: '', // 巡检结果
                mchId: '', // 商户编号
                signName: '', // 商户签约名
                bizCatCode: "全部", // 商户自然属性一级
                subBizCatCode: '', // 商户自然属性二级
                // productLine: '', 行业业绩属性
                // childTag: [KYC.ALL],
                // childTagName: KYC.ALL_NAME,
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
            let se = getStartDateAndEndDate(new Date(), 'month')
            let s = se.startDate.split('-')
            let e = se.endDate.split('-')
            this.searchForm.startMonth = s[0] + '-' + s[1]
            this.searchForm.endMonth = e[0] + '-' + e[1]
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
                this.isShowDownload = false
                window.location = encodeURI(d_url)
            }).catch(error => {
                console.log(error);
            });
        },
        hySelectedTag(item) {
            this.commonSelectChange(item, 'hyChild', 'hyIds')
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
        getParam (){
            let sendData = {}
            for (let key in this.searchForm) {
                if (key !== 'hyChild' && key !== 'hyChildName') {
                    sendData[key] = this.searchForm[key]
                }
            }
            sendData.bizCatCode = sendData.bizCatCode === '全部' ? '' : sendData.bizCatCode
            sendData.subBizCatCode = sendData.subBizCatCode === '全部' ? '' : sendData.subBizCatCode
            sendData.productLine = this.searchForm.hyChildName === '全部' ?  '' : this.searchForm.hyChildName
            return sendData
        },
        searchList() {
            this.pager.currentPage = 1
            this.tableData = []
            this.searchData()
        },
        searchData() {
            let sendData = this.getParam()
            sendData.pageNum = this.pager.currentPage
            sendData.pageSize = this.pager.pageSize
            this.$axios.post("/merchantInspect/queryList",
                qs.stringify(sendData)
            ).then(res => {
                let result = res.data
                this.tableData = result.data.recordList;
                this.pager.totalCount = parseInt(result.data.totalCount);
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
