<template>
    <div>
        <search
            :searchForm="searchForm"
            @searchData="searchList" 
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
            @checkSelect="checkSelect"
        ></table-pager>
        <el-dialog title="沉默商户数据查询：分页选择下载" :visible.sync="isShowDownload" width="30%" v-dialogDrag>
            <div style="text-align: center; margin-bottom:20px;">选择下载从
              <input type="number" v-model="startPage" min="0" class="downClass" @input='startPage'>到
              <input type="number" min="0"  class="downClass" :max="maxPage" v-model="endPage">页的数据</div>
            <h4 style="text-align: center">当前共<span>{{maxPage}}</span>页</h4>
            <span slot="footer" class="dialog-footer">
            <el-button @click="closeDownload">取 消</el-button>
            <el-button type="primary" @click="downloadAction" v-show='isShowDownloadBtn'>下 载</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import qs from "qs";
import search from './Partial/search.vue';
import {SILENT_MERCHANT_DATA_TABLE_HEAD, KYC, PAGESIZE_10} from '@/constants'
import {getStartDateAndEndDate} from "@/components/utils";
export default {
    name: '沉默商户数据',
    components: {
        search
    },
    watch: {
        isShowDownload() {
            if (this.isShowDownload === true) {
                this.startPage = 0;
                this.endPage = Math.ceil(this.pager.totalCount / this.pager.pageSize);
                this.maxPage = Math.ceil(this.pager.totalCount / this.pager.pageSize);
                if (this.tableData.length === 0) {
                    this.isShowDownloadBtn = false;
                } else if (this.tableData.length !== 0) {
                    this.startPage = 1;
                    this.isShowDownloadBtn = true;
                }
            } else {
                this.endPage = 0;
                this.maxPage = 0;
            }
        },
        startPage: function(val) {
            if (val < 0) {
                this.startPage = 0
            }
        },
        endPage: function(val) {
            if (val < 0) {
                this.endPage = 0
            }
            if (val > 0) {
                this.isShowDownloadBtn = true
            }
        }
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
                pageSize: PAGESIZE_10,
                maxPageNum: 0
            },
            isShowDownload: false,
            isShowDownloadBtn: false,
            startPage: 0,
            maxPage: 0,
            endPage: 0
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
        closeDownload () {
            this.isShowDownload = false;
            this.startPage = 0;
            this.endPage = 0;
            this.maxPage = 0;
        },
        downloadPage () {
            this.isShowDownload = true
        },  
        downloadAction(){
            if (this.startPage * 1 === 0) {
                this.$alert("起始页输入值不能为0", "提示", {
                    confirmButtonText: "确定",
                    type: "warning"
                });
                return;
            }
            if (this.endPage * 1 === 0) {
                this.$alert("结束页输入值不能为0", "提示", {
                    confirmButtonText: "确定",
                    type: "warning"
                });
                return;
            }
            if (this.startPage > this.endPage) {
                this.$alert("起始页数需小于结束页数", "提示", {
                    confirmButtonText: "确定",
                    type: "warning"
                });
                return;
            }
            if (this.endPage * 1 > this.maxPage) {
                this.$alert("结束页输入值超过最大页数", "提示", {
                    confirmButtonText: "确定",
                    type: "warning"
                });
                return;
            }
            if ((this.endPage * 10 - this.startPage * 10 + 1) / 10 * this.pageSize >  100000) {
                this.$alert("最多只能导出10万条数据", "提示", {
                    confirmButtonText: "确定",
                    type: "warning",
                    callback: action => {}
                });
                return;
            }
            let sendData = this.getParam()
            let url = "/report/customer/downloadList?" + qs.stringify(sendData)
            let d_url = this.uploadBaseUrl + url;
            window.location = d_url
            this.isShowDownload = false
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
               this.searchForm[tag + 'Name'] = ''
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
        searchList () {
            this.pager.currentPage = 1
            this.tableData = []
            this.searchData()
        },
        searchData() {
            let sendData = this.getParam()
            sendData.pageNumber = this.pager.currentPage
            sendData.pageRow = this.pager.pageSize
            this.$axios.post("/report/customer/getsilent",
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
