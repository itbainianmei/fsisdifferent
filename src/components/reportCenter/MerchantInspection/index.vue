<!-- 商户巡检明细 -->
<template>
    <div @click="allarea($event)">
        <search
            :serachForm="searchForm"
            :typeList="typeList"
            :resultList="resultList"
            @searchData="searchData"
            @onDownload="downloadPage"
            @selectedChange="selectedChange"
            @hySelectedTag="hySelectedTag"
        >
        </search>
        <table-pager
            :headList="headList"
            :dataList="tableData"
            :tableDataSec="tableDataSec"
            :pageInfo="pager"
            @onCurrentChange="onCurrentChange"
        ></table-pager>
        <!-- 表格每列的列选择 注意：每页都需要手动改变top值-->
        <div ref="list" class="list pa none bgccc" style="top:550px;">
            <TableSelect  :tableDataSec="tableDataSec" ></TableSelect>
        </div>
    </div>
</template>
<script>
import qs from "qs";
import search from './Partial/search.vue';
import {MERCHANT_INSPECTION_DATA_TABLE_HEAD, KYC} from '@/constants'
import TableSelect from '../../tableSelect/tableSelect.vue';
export default {
    components: {
        search,
        TableSelect
    },
    data () {
        return {
            headList: MERCHANT_INSPECTION_DATA_TABLE_HEAD,
            typeList: [
                { label: "常规巡检", value: 1 },
                { label: "专项巡检", value: 2 },
            ],
            resultList: [
                { label: "通过", value: 1 },
                { label: "不通过", value: 2 },
            ],
            searchForm:{
                startMonth: "",
                endMonth: "",
                type: "", //巡检类型
                result: "", //巡检结果
                mchId: "", //商户编号
                signName: "", //商户签约名
                bizCatCode: "", //商户自然属性一级
                subBizCatCode: "", //商户自然属性二级
                productLine: "" //行业业绩属性
            },
            tableData: [],
            tableDataSec: {
                inspectMonth: [true, '应巡检月份'],
                type: [true, '巡检类型'],
                customerNumber: [true, '商户编号'],
                signName: [true, '商户签约名'],
                mchName: [true, '商户名称'],
                saler: [true, '销售'],
                branchComp: [true, '分公司'],
                bizCatCode: [true, '商户自然属性一级'],
                subBizCatCode: [true, '商户自然属性二级'],
                productLine: [true, '行业业绩属性'],
                registerTime: [true, '注册时间'],
                refer: [true, '报备网址'],
                softName: [true, 'APP名称'],
                pubName: [true, '公众号名称'],
                content: [true, '巡检内容'],
                result: [true, '巡检结果'],
                isOpen: [true, '网址/APP是否能打开or下载'],
                isUse: [true, '网址/APP是否能正常使用'],
                isYeepay: [true, '是否有易宝支付通道'],
                appName: [true, 'APP/公众号开发者名称'],
                isTemplate: [true, '是否为模板'],
                isAgreement: [true, '商户业务是否与一二级分类一致'],
                noAgreeContent: [true, '不一致业务内容'],
                registerType: [true, '用户拓展模式(邀请注册或自主注册)'],
                registerType: [true, '是否收加盟费'],
                isConduct: [true, '是否有敏感宣传'],
                describe: [true, '商户经营业务描述'],
                testLogin: [true, '测试账号/密码'],
                inspectDate: [true, '巡检日期'],
                inspectMan: [true, '巡检人'],
                remark: [true, '备注']
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
        this.initSetTime()
    },
    methods: {
        // 设置默认时间
        initSetTime() {
            let date = new Date();
            let y = date.getFullYear();
            let m = '0' + (date.getMonth() + 1);
            this.searchForm.startMonth = y + '-' + m.substring(m.length-2, m.length);
            this.searchForm.endMonth = y + '-' + m.substring(m.length-2, m.length);
        },
        downloadPage(pageDownInfo){
            console.log(pageDownInfo)
            let url = "/merchantInspect/downLoad?startMonth=" + this.searchForm.startMonth +
                "&endMonth=" + this.searchForm.endMonth + "&type=" + this.searchForm.type +
                "&result=" + this.searchForm.result + "&mchId=" + this.searchForm.mchId +
                "&signName=" + this.searchForm.signName + "&bizCatCode=" + this.searchForm.bizCatCode +
                "&subBizCatCode=" + this.searchForm.subBizCatCode + "&productLine=" + this.searchForm.productLine;
            this.$axios.get(url).then(res1 => {
                let d_url = this.url + url;
                window.location = encodeURI(d_url);
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
            let sendData = this.searchForm;
            sendData.pageNum = this.pager.currentPage;
            sendData.pageSize = this.pager.pageSize;
            let newp = this.addSessionId(sendData);
            this.$axios.post('/merchantInspect/queryList', qs.stringify(newp))
            .then(res => {
                let result = res.data;
                if (result.code == 200) {
                    this.tableData = result.data.recordList;
                    this.pager.totalCount = parseInt(result.data.totalCount);
                    this.pager.maxPageNum = parseInt(result.data.totalPageNum);
                } else {
                    this.tableData = [];
                    this.pager.totalCount = 0;
                    this.pager.maxPageNum = 0;
                    this.$message.error({message: result.msg, center: true});
                }
            }).catch(error => {
                console.log(error);
            });
        },
        onCurrentChange (val) {
            this.pager.currentPage = val;
            this.searchData();
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
