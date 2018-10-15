<template>
    <div>
        <search
            :searchForm="searchForm"
            @searchData="getBarChart" 
            @onDownload="downloadPage" 
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
import {ALARM_HANDING_HEDR, COLORS, PAGESIZE_10} from '@/constants'
import {getStartDateAndEndDate, formatterChartDialog} from "@/components/utils";
import echarts from 'echarts';
let color = COLORS
export default {
    name: '报警及处理情况',
    components: {
        search
    },
    data () {
        return {
            headList: ALARM_HANDING_HEDR,
            tableData: [],
            searchForm:{
                dateType: "day",
                beginDate: "",
                endDate: ""
            },
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
                    that.drawChart('barChart', 'barChart', that.barOption )
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
            let param = this.getParam()
            let url = "/report/alarmAndDeal/export?beginDate=" +
            param.beginDate +
            "&endDate=" +
            param.endDate +
            "&dateType=" +
            param.dateType
            this.$axios.get(url).then(res1 => {
                let d_url = this.uploadBaseUrl + url;
                window.location = encodeURI(d_url)
            }).catch(error => {
                console.log(error);
            });
        },
        searchData() {
            let param = this.getParam()
            param.pageNumber = this.pager.currentPage
            param.pageRow = this.pager.pageSize
            this.$axios.post("/report/alarmAndDeal/getList",
                qs.stringify(param)
            ).then(res => {
                let result = res.data
                this.tableData = result.data.returnList || [];
                this.pager.totalCount = parseInt(result.data.total);
            }).catch(error => {
                console.log(error);
            });
        },
        onCurrentChange (val) {
            this.pager.currentPage = val
            this.searchData()
        },
        getParam () {
            let sendData = {}
            for (let key in this.searchForm) {
                if (key !== 'childTag' && key !== 'childTagName') {
                    sendData[key] = this.searchForm[key]
                }
            }
            sendData.beginDate = sendData.beginDate.replace(/-/g, '')
            sendData.endDate = sendData.endDate.replace(/-/g, '')
            return sendData
        },
        getBarChart () {
            let param = this.getParam()
            this.$axios.post('/report/alarmAndDeal/getChart',qs.stringify(param)).then(res => {
                if(res.data.code * 1 == 200){
                    let result = res.data
                    let xTit = ['数量(个)', '%']
                    let unit = ['个', '%']
                    this.barOption = this.initOption(xTit, 'axis', 'barChart', unit)
                    this.getChartAndData(result, 'data', this.barOption, 'barChart');
                    this.pager.currentPage = 1
                    this.tableData = []
                    this.searchData()
                }
            })
        },
        getChartAndData (result, chartName, option, modelChartName) {
            if(typeof result[chartName] !== 'undefined'){
                option.legend.data = ['报警数', '处理率']
                option.xAxis[0].data = result[chartName].times  //时间
                let serviceList = [
                    {
                        symbol: "none",// 去掉折线上面的小圆点
                        name: '报警数',
                        type: 'bar',
                        itemStyle:{
                            normal:{
                                color:color[2]  //改变珠子颜色
                            }
                        },
                        data: this.dostr(result[chartName].histogram)
                    },
                    {
                        symbol: "none",// 去掉折线上面的小圆点
                        name: '处理率',
                        type: 'line',
                        yAxisIndex: 1,
                        itemStyle:{
                            normal:{
                                color:color[3]  //改变珠子颜色
                            }
                        },
                        data: this.dostr(result[chartName].polyline)
                    }
                ]
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
            const _this = this
            return {
                title : {
                    text: '',
                    x: 'center',
                    textStyle: {
                        color: '#409EFF',
                        fontSize: '14px',
                        fontWeight: 'normal',
                        top : '-20px'
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
