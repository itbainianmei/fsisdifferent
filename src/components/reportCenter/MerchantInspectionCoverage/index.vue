<template>
    <div>
        <search
            :searchForm="searchForm"
            @searchData="queryChart" 
            @onDownload="downloadPage" 
        >
        </search>
        <el-row class="chart1-box">
            <el-col :span="12">
                <div id="modelChart" :style="{width: '100%', height: '280px'}"></div>
            </el-col>
             <el-col :span="12">
                <div id="timeChart" :style="{width: '100%', height: '280px'}"></div>
            </el-col>
        </el-row>
        <table-pager 
            :headList="headList"
            :dataList="modelList"
            :pageInfo="modelPager"
            @onCurrentChange="onCurrentChangeModel"
        ></table-pager>
    </div>
</template>
<script>
import qs from "qs";
import search from './Partial/search.vue';
import {MERCHANT_INSPECTION_COVERAGE_DATA_TABLE_HEAD, COLORS, PAGESIZE_10} from '@/constants'
import {getStartDateAndEndDate, formatterChartDialog} from "@/components/utils";
import echarts from 'echarts';
let color = COLORS
export default {
    name: '商户巡检覆盖情况',
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
            }
        }
    },
    created() {
        this.getSDateAndEDate()
        this.queryChart()
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
            let url = "/merchantInspect/downReport" + sendDataStr
            this.$axios.get(url).then(res1 => {
                let d_url = this.uploadBaseUrl + url;
                this.isShowDownload = false
                window.location = encodeURI(d_url)
            }).catch(error => {
                console.log(error);
            });
        },
        // 常规巡检图表
        fetchNormalChart() {
            let param = this.getParam()
            this.$axios.post('/merchantInspect/normalChart',
                qs.stringify(param)
            ).then(response => {
                if(response.data.code * 1 == 200){
                    let xTit = ['数量(个)', '']
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
                    this.modelOption.series = this.getOption(result)
                    this.modelOption.xAxis[0].data = response.data.data.times
                    this.drawChart('modelChart', 'modelChart', this.modelOption)
                }
            }).catch(error => {
                console.log(error);
            });
        },
        getOption (result) {
            let serviceList = []
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
            let i = 1
            for (let key in result.inspectRate) {
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
            let j = 2
            for (let key in result.passRate) {
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
                    let xTit = ['数量(个)', '']
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
                    this.timeOption.series = this.getOption(result)
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
        initOption (yTtile, toolTipType, chart, unit, title) {
            const _this = this
            return {
                title : {
                    text: title,
                    x: 'center',
                    textStyle: {
                        fontWeight: 100
                    }
                },
                tooltip: {
                    trigger: toolTipType,
                    textStyle: {
                        fontSize: 12
                    },
                    formatter: function (params, ticket, callback) {
                        return formatterChartDialog(toolTipType, params, _this[chart], unit)
                    }
                },
                toolbox: {
                    show : true,
                    feature : {
                        saveAsImage : {show: true}
                    }
                },
                grid:{
                x2: 45,
                },
                legend: {
                    y:'10px',
                    x:'center',
                    data: []
                },
                xAxis: [
                    {
                    splitLine:{show: false},//去除网格线
                    type: 'category',
                    data: [],
                    axisLabel:{
                        rotate: 30,
                        show: true,
                        interval: 0,
                        textStyle:{
                            fontSize:12,
                            color:'black',
                            fontWeight:700

                        }
                    },
                    axisTick: {
                            show: true,     //设置x轴上标点显示
                            length: 2,    // 设置x轴上标点显示长度
                            lineStyle: {     //设置x轴上标点显示样式
                                color: '#ddd',
                                width: 1,
                                type: 'solid'
                            }
                    }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: yTtile[0],
                        splitNumber:5,
                        axisLabel: {
                            formatter: '{value}'
                        }
                    },
                    {
                        type: 'value',
                        name: yTtile[1],
                        splitNumber:5,
                        axisLabel: {
                            formatter: '{value}'
                        }
                    }
                ],
                series: []
            };
        }
    }
}
</script>
