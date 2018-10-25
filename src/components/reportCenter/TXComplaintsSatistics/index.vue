<template>
    <div>
        <search
            :searchBtnPower="searchBtnPower"
            :downloadBtnPower="downloadBtnPower"
            :searchForm="searchForm"
            @searchData="getBarChart"
            @onDownload="downloadPage"
            @selectedChange="selectedChange"
        >
        </search>
        <el-row class="chart-box" v-if="searchBtnPower">
            <el-col :span="12" style="position:relative">
                <span class="ts-box" v-show="tsObj.length">
                    友情提示:&nbsp;&nbsp;
                    <span v-for="(item, k) in tsObj" :key="k * 20"><i>柱子{{k + 1}}</i>: {{item}}&nbsp; &nbsp;</span>
                </span>
                <div class="chart-canvas" id="barChart" :style="{width: '100%', height: '350px'}"></div>
            </el-col>
             <el-col :span="12">
                <table-pager
                    :headList="headList"
                    :dataList="tableData"
                    :pageInfo="pager"
                    @onCurrentChange="onCurrentChange"
                    @checkSelect="checkSelect"
                ></table-pager>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import qs from "qs";
import search from './Partial/search.vue';
import {TX_SATISTICS_TABLE_HEAD, KYC, COLORS, PAGESIZE_10} from '@/constants'
import {getStartDateAndEndDate, initChartOption} from "@/components/utils";
import echarts from 'echarts';
let color = COLORS
export default {
    name: 'TX情况',
    components: {
        search
    },
    data () {
        return {
            headList: TX_SATISTICS_TABLE_HEAD,
            tableData: [],
            searchForm:{
                dateType: "day",
                beginDate: "",
                endDate: "",
                childTag: [KYC.ALL],
                childTagName: KYC.ALL_NAME
            },
            ids: [],
            barChart: null,
            pager: {
                totalCount: 0,
                currentPage: 1,
                pageSize: PAGESIZE_10,
                maxPageNum: 0
            },
            tsObj: [],
            searchBtnPower: false,
            downloadBtnPower: false
        }
    },
     watch: {
        'searchForm.dateType': function() {
            this.getBarChart()
        }
    },
    created() {
        const idList = JSON.parse(localStorage.getItem("ARRLEVEL"));
        this.searchBtnPower = idList.indexOf(599) === -1 ? false : true;
        this.downloadBtnPower = idList.indexOf(600) === -1 ? false : true;
        this.getSDateAndEDate()
        if (this.searchBtnPower) {
            this.getBarChart()
        }
    },
    mounted() {
        this.$nextTick(function () {
            let that = this;
            let resizeTimer = null;
            window.onresize = function () {
                if (resizeTimer) clearTimeout(resizeTimer);
                resizeTimer = setTimeout(function () {
                    that.drawChart('barChart', 'barChart', that.barOption)
                }, 300);
            }
        });
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
            let se = getStartDateAndEndDate(new Date(), this.searchForm.dateType, 10)
            this.searchForm.beginDate = se.startDate
            this.searchForm.endDate = se.endDate
        },
        downloadPage(){
            let sendData = this.getParam()
            let url = "/report/TXSource/download?" + qs.stringify(sendData)
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
            sendData.heapTypes = this.searchForm.childTagName === '全部' ||　this.searchForm.childTagName === ''? 'all' : this.searchForm.childTagName
            sendData.beginDate = sendData.beginDate.replace(/-/g, '')
            sendData.endDate = sendData.endDate.replace(/-/g, '')
            return sendData
        },
        searchData() {
            let sendData = this.getParam()
            sendData.pageNumber = this.pager.currentPage
            sendData.pageRow = this.pager.pageSize
            this.$axios.post("/report/TXSource/queryList",
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
        getOption (result) {
            let serviceList = []
            this.tsObj = []
            for (let item in result) {
                if (item !== 'times') {
                    let name = ''
                    if (item === 'receiptAmount') {
                        name = '交易金额(亿元)'
                    }
                    if (item === 'activeMerchant') {
                        name = '活跃商户数(个)'
                    }
                    if (item === 'grossProfit') {
                        name = '毛利(万元)'
                    }
                    this.tsObj.push(name)
                    let k = 0
                    if (JSON.stringify(result[item]) !== '{}') {
                        for(let key in result[item]){
                            let two =
                            {
                                symbol: "none",// 去掉折线上面的小圆点
                                name: (name === '' ? '' : name + '-') + key,
                                type: 'bar',
                                stack: item,
                                itemStyle:{
                                    normal:{
                                        color:color[k]  //改变珠子颜色
                                    }
                                },
                                data: this.dostr(result[item][key])
                            }
                            if (item === 'activeMerchant') {
                                two.yAxisIndex = 1
                            }
                            serviceList.push(two)
                            k++
                        }
                    } else {
                        let two =
                        {
                            symbol: "none",// 去掉折线上面的小圆点
                            name: '',
                            type: 'bar',
                            data: []
                        }
                        serviceList.push(two)
                    }
                }
            }
            return serviceList
        },
        getBarChart () {
            let param = this.getParam()
            this.$axios.post('/report/TXSource/queryChart',qs.stringify(param)).then(res => {
                let response = res.data
                if(response.code * 1 == 200){
                    this.pager.currentPage = 1
                    this.tableData = []
                    this.searchData()
                    let xTit = ['亿元/万元', '个']
                    let unit = ['亿元/万元', '个']
                    this.barOption = this.initOption(xTit, 'item', 'barChart', unit)
                    if(JSON.stringify(response.data) == "{}"){
                        this.barOption.xAxis[0].data = []//时间
                        this.barOption.series = [{
                            symbol: "none",
                            name: '',
                            type: 'line',
                            data: []
                        }]
                        this.drawChart('barChart', 'barChart', this.barOption)
                        return false
                    }
                    this.barOption.xAxis[0].data = response.data.times  //时间
                    this.barOption.series = this.getOption(response.data)
                    this.drawChart('barChart', 'barChart', this.barOption)
                }
            })
        },
        drawChart(id, chart, option){
            // 基于准备好的dom，初始化echarts实例
            this[chart] = this.$echarts.init(document.getElementById(id))
            // 绘制图表
            this[chart].clear()
            let _this = this
            let barLoading = setTimeout(function (){
                _this[chart].hideLoading();
                _this[chart].setOption(option);
                clearTimeout(barLoading);
            },2000);
            this[chart].showLoading({
                text : '数据拼命加载中...',
                effect :"whirling" ,
                textStyle : {
                    fontSize : 16
                },
                effectOption: {backgroundColor: 'rgba(0, 0, 0, 0.05)'}
            });
        },
        initOption (yTtile, toolTipType, chart, unit) {
            return initChartOption(yTtile, toolTipType, chart, this[chart], unit)
        }
    }
}
</script>
<style>
