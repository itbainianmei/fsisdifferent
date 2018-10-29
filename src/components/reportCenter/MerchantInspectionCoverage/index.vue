<template>
    <div>
        <search
            :searchBtnPower="searchBtnPower"
            :downloadBtnPower="downloadBtnPower"
            :searchForm="searchForm"
            @searchData="queryChart"
            @onDownload="downloadPage"
        >
        </search>
        <el-row class="chart1-box cg-box"  v-if="searchBtnPower">
            <el-col :span="12"  style="position:relative">
                <h5>常规巡检情况统计</h5>
                <span class="ts-box" v-show="tsObj.length" style="top: 18px;right:0">
                    友情提示:&nbsp;&nbsp;
                    <span v-for="(item, k) in tsObj" :key="k * 20"><i>柱子{{k + 1}}</i>: {{item}}&nbsp; &nbsp;</span>
                </span>
                <div id="modelChart" :style="{width: '100%', height: '280px'}"></div>
            </el-col>
             <el-col :span="12" style="position:relative">
                 <h5>专项巡检情况统计</h5>
                 <span class="ts-box" v-show="tsObj1.length" style="top: 18px;right:0">
                    友情提示:&nbsp;&nbsp;
                    <span v-for="(item, k) in tsObj1" :key="k * 20"><i>柱子{{k + 1}}</i>: {{item}}&nbsp; &nbsp;</span>
                </span>
                <div id="timeChart" :style="{width: '100%', height: '280px'}"></div>
            </el-col>
        </el-row>
        <table-pager
            :headList="headList"
            :dataList="modelList"
            :pageInfo="modelPager"
            @onCurrentChange="onCurrentChangeModel"
            @checkSelect="checkSelect"
        ></table-pager>
    </div>
</template>
<script>
import qs from "qs";
import search from './Partial/search.vue';
import {MERCHANT_INSPECTION_COVERAGE_DATA_TABLE_HEAD, COLORS, PAGESIZE_10} from '@/constants'
import {getStartDateAndEndDate, initChartOption} from "@/components/utils";
import echarts from 'echarts';
let color = COLORS
export default {
    name: '商户巡检情况',
    components: {
        search
    },
    data () {
        return {
            headList: MERCHANT_INSPECTION_COVERAGE_DATA_TABLE_HEAD,
            modelList: [],
            searchForm:{
                startMonth: "",
                endMonth: ""
            },
            modelChart: null,
            timeChart: null,
            modelPager: {
                totalCount: 0,
                currentPage: 1,
                pageSize: PAGESIZE_10,
                maxPageNum: 0
            },
            searchBtnPower: false,
            downloadBtnPower: false,
            tsObj: [],
            tsObj1: []
        }
    },
    created() {
        const idList = JSON.parse(localStorage.getItem("ARRLEVEL"));
        this.searchBtnPower = idList.indexOf(611) === -1 ? false : true;
        this.downloadBtnPower = idList.indexOf(612) === -1 ? false : true;
        this.getSDateAndEDate()
        if (this.searchBtnPower) {
            this.queryChart()
        }
    },
    mounted() {
        this.$nextTick(function () {
            let that = this;
            let resizeTimer = null;
            window.onresize = function () {
                if (resizeTimer) clearTimeout(resizeTimer);
                resizeTimer = setTimeout(function () {
                    that.drawChart('modelChart', 'modelChart', that.modelOption)
                    that.drawChart('timeChart', 'timeChart', that.timeOption)
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
            let se = getStartDateAndEndDate(new Date(), 'month')
            let s = se.startDate.split('-')
            let e = se.endDate.split('-')
            this.searchForm.startMonth = s[0] + '-' + s[1]
            this.searchForm.endMonth = e[0] + '-' + e[1]
        },
        downloadPage () {
            let sendData = this.getParam()
            let url = "/merchantInspect/downReport?" + qs.stringify(sendData)
            let d_url = this.uploadBaseUrl + url;
            this.isShowDownload = false
            window.location = d_url
        },
        // 常规巡检图表
        fetchNormalChart() {
            let param = this.getParam()
            this.$axios.post('/merchantInspect/normalChart',
                qs.stringify(param)
            ).then(response => {
                if(response.data.code * 1 == 200){
                    let xTit = ['个', '']
                    let unit = ['个', '']
                    let title = '常规巡检情况统计'
                    this.modelOption = this.initOption(xTit, 'item', 'modelChart', unit, title)
                    if(JSON.stringify(response.data.data) === '{}') {
                        this.modelOption.xAxis[0].data = []
                        this.modelOption.series = [{
                            symbol: "none",
                            name: '',
                            type: 'line',
                            data: []
                        }]
                        this.drawChart('modelChart', 'modelChart', this.modelOption)
                        return false
                    }
                    let result = response.data.data
                    this.modelOption.series = this.getOption(result, 'modelOption')
                    this.modelOption.xAxis[0].data = response.data.data.times
                    this.tsObj[0] = '按照巡检结果对接展示商户处置情况'
                    this.drawChart('modelChart', 'modelChart', this.modelOption)
                }
            }).catch(error => {
                console.log(error);
            });
        },
        getOption (result, option) {
            let serviceList = []
            let title = []
            let k = 0
            for (let key in result.dealRate) {
                let two =
                {
                    symbol: "none",// 去掉折线上面的小圆点
                    name:  key,
                    type: 'bar',
                    stack: 'dealRate',
                    itemStyle:{
                        normal:{
                            color:color[k]  //改变珠子颜色
                        }
                    },
                    data: this.dostr(result.dealRate[key])
                }
                serviceList.push(two)
                k++
            }
            let i = 3
            for (let key in result.inspectRate) {
                title.push(key)
                let two =
                {
                    symbol: "none",// 去掉折线上面的小圆点
                    name: key,
                    type: 'bar',
                    stack: 'inspectRate',
                    itemStyle:{
                        normal:{
                            color:color[i]  //改变珠子颜色
                        }
                    },
                    data: this.dostr(result.inspectRate[key])
                }
                serviceList.push(two)
                i++
            }
            let j = 5
            for (let key in result.passRate) {
                title.push(key)
                let two =
                {
                    symbol: "none",// 去掉折线上面的小圆点
                    name: key,
                    type: 'bar',
                    stack: 'passRate',
                    itemStyle:{
                        normal:{
                            color:color[j]  //改变珠子颜色
                        }
                    },
                    data: this.dostr(result.passRate[key])
                }
                serviceList.push(two)
                j++
            }
            this[option].legend.data = title
            return serviceList
        },
        getParam (){
            let sendData = {}
            for (let key in this.searchForm) {
                sendData[key] = this.searchForm[key]
            }
            sendData.sessionId = localStorage.getItem('SID')
            return sendData
        },
        // 专项巡检图表
        fetchSpecialChart () {
            let sendData = this.getParam()
            this.$axios.post('/merchantInspect/specialChart',
                qs.stringify(sendData)
            ).then(response => {
                if(response.data.code * 1 == 200){
                    let xTit = ['个', '']
                    let unit = ['个', '']
                    let title = '专项巡检情况统计'
                    this.timeOption = this.initOption(xTit, 'item', 'timeChart', unit, title)

                    if(JSON.stringify(response.data.data) === '{}') {
                        this.timeOption.xAxis[0].data = []
                        this.timeOption.series = [{
                            symbol: "none",
                            name: '',
                            type: 'line',
                            data: []
                        }]
                        this.drawChart('timeChart', 'timeChart', this.timeOption)
                        return false
                    }
                    let result = response.data.data
                    this.timeOption.xAxis[0].data = response.data.data.times
                    this.timeOption.series = this.getOption(result, 'timeOption')
                    this.tsObj1[0] = '按照巡检结果对接展示商户处置情况'
                    this.drawChart('timeChart', 'timeChart', this.timeOption)
                }
            }).catch(error => {
                console.log(error);
            });
        },
        queryChart() {
            this.fetchNormalChart()
            this.fetchSpecialChart()
            this.modelList = []
            this.modelPager.currentPage = 1
            this.queryList()
        },
        queryList () {
            let param = this.getParam()
            param.pageNum = this.modelPager.currentPage
            param.pageSize = this.modelPager.pageSize
            let url = "/merchantInspect/queryReport"
            this.$axios.post(url,
                qs.stringify(param)
            ).then(res => {
                let result = res.data
                this.modelList = result.data.recordList;
                this.modelPager.totalCount = parseInt(result.data.totalCount);
            })
        },
        onCurrentChangeModel (val) {
            this.modelPager.currentPage = val
            this.queryList()
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
.cg-box h5{
    font-weight: normal;
    font-size: 16px;
    text-align: center;
    line-height: 45px;
}
</style>
