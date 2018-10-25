<template>
    <div>
        <search
            :searchBtnPower="searchBtnPower"
            :downloadBtnPower="downloadBtnPower"
            :searchForm="searchForm"
            @searchData="searchList" 
            @onDownload="downloadPage" 
            @selectedChange="selectedChange"
        >
        </search>
        <table-pager  class="more-head" v-if="searchBtnPower"
            :headList="headList"
            :dataList="tableData"
            :pageInfo="pager"
            @onCurrentChange="onCurrentChange"
            @checkSelect="checkSelect"
        ></table-pager>
        <el-dialog title="投诉明细查询：分页选择下载" :visible.sync="isShowDownload" width="30%" v-dialogDrag>
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
import search from './Partial/detail-search.vue';
import {MERCHANT_COMPLAINT_DETAIL_HEAD, KYC, PAGESIZE_10} from '@/constants'
import {getStartDateAndEndDate} from "@/components/utils";
export default {
    name: '投诉明细查询',
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
            },
            isShowDownload: false,
            isShowDownloadBtn: false,
            startPage: 0,
            maxPage: 0,
            endPage: 0,
            searchBtnPower: false,
            downloadBtnPower: false
        }
    },
    created() {
        const idList = JSON.parse(localStorage.getItem("ARRLEVEL"));
        this.searchBtnPower = idList.indexOf(664) === -1 ? false : true;
        this.downloadBtnPower = idList.indexOf(665) === -1 ? false : true;
        this.getSDateAndEDate()
        if (this.searchBtnPower) {
            this.searchList()
        }
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
            sendData.startNum = this.startPage 
            sendData.endNum = this.endPage 
            sendData.endPage = this.pager.totalCount 
            sendData.pageRow = this.pager.pageSize
            this.$axios.post("/report/complanint/downloadCount",
                qs.stringify(sendData)
            ).then(res => {
                if (res.data.code * 1 === 200) {
                    let url = "/report/complanint/downloadList?" + qs.stringify(sendData)
                    let d_url = this.uploadBaseUrl + url;
                    window.location = d_url
                    this.isShowDownload = false
                }
            }).catch(error => {});
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
<style lang="less" scoped>
    @import '~@/less/common.less';
</style>