<template>
    <div>
        <search
            :searchForm="searchForm"
            @searchData="getBarChart" 
            @onDownload="downloadPage" 
            @selectedChange="selectedChange"
        >
        </search>
        <el-row class="chart-box">
            <el-col :span="12">
                <div class="chart-canvas" id="barChart" :style="{width: '100%', height: '450px'}"></div>
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
import {MERCHANT_COM_SOURCE_TABLE_HEAD, KYC, COLORS, PAGESIZE_10} from '@/constants'
import {getStartDateAndEndDate, initChartOption} from "@/components/utils";
import echarts from 'echarts';
let color = COLORS
export default {
    name: '商户投诉来源统计',
    components: {
        search
    },
    data () {
        return {
            headList: MERCHANT_COM_SOURCE_TABLE_HEAD,
            tableData: [],
            searchForm:{
                dateType: "day",
                beginDate: "",
                endDate: "", 
                // source: '',
                branchName: '',
                customerNumber: '',
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
            }
        }
    },
    watch: {
        'searchForm.dateType': function() {
            this.getBarChart()
        }
    },
    created() {
        this.getSDateAndEDate()
        this.getBarChart()
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
            let url = "/report/merchantComplaint/exportSource?" + qs.stringify(sendData)
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
                this.searchForm.childTagName = ""
            }
        },
        getParam () {
            let sendData = {}
            for (let key in this.searchForm) {
                if (key !== 'childTag' && key !== 'childTagName') {
                    sendData[key] = this.searchForm[key]
                }
            }
            sendData.source = this.searchForm.childTagName === '全部' ||  this.searchForm.childTagName === '' ? 'all' : this.searchForm.childTagName
            sendData.beginDate = sendData.beginDate.replace(/-/g, '')
            sendData.endDate = sendData.endDate.replace(/-/g, '')
            return sendData
        },
        searchData() {
            let param = this.getParam()
            param.pageNumber = this.pager.currentPage
            param.pageRow = this.pager.pageSize
            this.$axios.post("/report/merchantComplaint/merchantComplaintSource",
                qs.stringify(param)
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
            this.searchData('pager')
        },
        getBarChart () {
            let param = this.getParam()
            this.$axios.post('/report/merchantComplaint/sourceChart',qs.stringify(param)).then(res => {
                if(res.data.code * 1 == 200){
                    let result = res.data
                    this.pager.currentPage = 1
                    this.tableData = []
                    this.searchData()
                    let xTit = ['投诉数(个)', '']
                    let unit = ['个', '']
                    this.barOption = this.initOption(xTit, 'item', 'barChart', unit)
                    this.getChartAndData(result, 'data', this.barOption, 'barChart');
                }
            })
        },
        getChartAndData (result, chartName, option, modelChartName) {
            if(typeof result[chartName].returnList !== 'undefined' && JSON.stringify(result[chartName].returnList) !== '{}'){
                option.xAxis[0].data = result[chartName].times  //时间
                let serviceList = []
                let title = []
                let k = 0
                for (let key in result[chartName].returnList) {
                    title.push(key)
                    let two = 
                    {
                        symbol: "none",// 去掉折线上面的小圆点
                        name: key,
                        type: 'bar',
                        stack: 'Money',
                        itemStyle:{
                            normal:{
                                color:color[k]  //改变珠子颜色
                            }
                        },
                        data: this.dostr(result[chartName].returnList[key])
                    }
                    serviceList.push(two)
                    k++
                }
                option.legend.data = title
                option.series = serviceList
                this.drawChart(modelChartName, modelChartName, option)
            } else {
                option.xAxis[0].data = []//时间
                option.series = [{
                    symbol: "none",
                    name: '',
                    type: 'line',
                    data: []
                }]
                this.drawChart(modelChartName, modelChartName, option)
            }
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

