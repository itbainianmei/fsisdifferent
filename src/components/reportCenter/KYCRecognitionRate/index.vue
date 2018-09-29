<template>
    <div>
        <search
            :serachForm="searchForm"
            @searchData="queryChart" 
            @onDownload="downloadPage" 
            @selectedChange="selectedChange"
        >
        </search>
        <el-row class="chart-box">
            <el-col :span="10" :offset="1">
                <div id="modelChart" :style="{width: '100%', height: '280px'}"></div>
            </el-col>
             <el-col :span="10" :offset="1">
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
import {KYC_RATE_TABLE_HEAD, KYC} from '@/constants'
import {getStartDateAndEndDate} from "@/components/utils";
import echarts from 'echarts';
export default {
    components: {
        search
    },
    data () {
        return {
            headList: [],
            modelList: [],
            timeList: [],
            searchForm:{
                dateType: "day",
                beginDate: "",
                endDate: "",
                childTag: [KYC.ALL],
                childTagName: KYC.ALL_NAME
            },
            ids: [],
            modelChart: null,
            timeChart: null,
            modelPager: {
                totalCount: 0,
                currentPage: 1,
                pageSize: 20,
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
                    that.drawChart('modelChart', 'modelChart', modelOption)
                    that.drawChart('timeChart', 'timeChart', timeOption)
                }, 300);
            }
        });
    },
    methods: {
        getSDateAndEDate() {
            let se = getStartDateAndEndDate(new Date(), this.searchForm.dateType, 10)
            this.searchForm.beginDate = se.startDate
            this.searchForm.endDate = se.endDate
        },     
        downloadPage(){
            let param = this.getParam()
            let url = "/report/kyc/download?beginDate=" +
            param.beginDate +
            "&endDate=" +
            param.endDate +
            "&dateType=" +
            param.dateType +
            "&heapTypes=" + param.heapTypes
            this.$axios.get(url).then(res1 => {
                let d_url = this.uploadBaseUrl + url;
                window.location = encodeURI(d_url)
            }).catch(error => {
                console.log(error);
            });
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
                // this.searchForm.childTag = [KYC.ALL]
                // this.searchForm.childTagName = KYC.ALL_NAME
            }
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
            sendData.heapTypes = this.searchForm.childTagName === '全部' ? 'all' : this.searchForm.childTagName
            return sendData
        },
        getChartAndData (result, chartName, option, modelChartName) {
            if(JSON.stringify(result) !== '{}' && typeof result[chartName] !== 'undefined'){
                if (chartName === 'chart1') {
                    option.legend.data = result[chartName].names
                    option.xAxis[0].data = result[chartName].times  //时间
                } else {
                    // option.legend.data = 'm1'
                    option.xAxis[0].data = result[chartName].names  //时间
                }
                let serviceList = []
                if (chartName === 'chart2') {
                    serviceList.push(
                        {
                            symbol: "none",// 去掉折线上面的小圆点
                            name: '',
                            type: 'bar',
                            itemStyle:{
                                normal:{
                                    color:color[6]  //改变珠子颜色
                                }
                            },
                            data: this.dostr(result[chartName].rate)
                        }
                    )
                } else {
                    let k = 0
                    for (let key in result[chartName].rate) {
                        let two = 
                        {
                            symbol: "none",// 去掉折线上面的小圆点
                            name: key,
                            type: 'line',
                            itemStyle:{
                                normal:{
                                    color:color[k]  //改变珠子颜色
                                }
                            },
                            data: this.dostr(result[chartName].rate[key])
                        }
                        serviceList.push(two)
                        k++
                    }
                }
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
        queryChart() {
            let param = this.getParam()
            let url = "/report/kyc/queryChart"
            this.$axios.post(url,
                qs.stringify(param)
            ).then(response => {
                if(response.data.code * 1 == 200){
                    let result = response.data.data
                    this.getChartAndData(result, 'chart1', modelOption, 'modelChart');
                    this.getChartAndData(result, 'chart2', timeOption, 'timeChart');
                    this.modelPager.currentPage = 1
                    this.modelList = []
                    this.headList = []
                    this.queryList()
                }
            }).catch(error => {
                console.log(error);
            });
        },
        queryList () {
            let param = this.getParam()
            param.pageNumber = this.modelPager.currentPage
            param.pageRow = this.modelPager.pageSize
            let url = "/report/kyc/queryList"
            this.$axios.post(url,
                qs.stringify(param)
            ).then(res => {
                let result = res.data
                this.headList = []
                if (typeof result.data.names !== 'undefined') {
                    for(let key in result.data.names) {
                        let one = {
                            prop: result.data.names[key],
                            align: 'center',
                            label:  result.data.names[key] + '(%)'
                        }
                        this.headList.push(one)
                    }
                    this.headList.unshift({
                        prop: 'time', align: 'center', label: '时间'
                    })
                    this.modelList = result.data.data;
                    this.modelPager.totalCount = parseInt(result.data.totalSize);
                }
            })
        },
        onCurrentChangeModel (val) {
            this.modelList = []
            this.headList = []
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
        }
    }
}
let color= ['#E0CDD1','#FBEBDC','#788A72','#C8B8A9','#D6D4C8','#F2EEED','#B7C6B3','#A47C7C','#C2C8D8','#7A7385','#E0CDD3','#B3B1A4','#A0A5BB','#D7C9AF']
let modelOption = {
    title : {
        text: '',
         x: 'center'
    },
    toolbox: {
       show : true,
        feature : {
            saveAsImage : {show: true}
        }
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        y:'10px',
        textStyle:{
            fontSize:10,
            color:'black'

        },
        itemGap:-1,
        data:[]
    },
    xAxis: [
        {
          splitLine:{show: false},//去除网格线
            type: 'category',
            data: [],
    
            boundaryGap : true,   ////////控制 
            axisLabel: {  
             interval:0, ////////控制 
             rotate:20 ,
             textStyle:{
                fontSize:12,
                color:'black',
                fontWeight:700
              }
            }
        }
  ],
    grid: {
        x2:6,
        y2: 60,// y2可以控制 X轴跟Zoom控件之间的间隔，避免以为倾斜后造成 label重叠到zoom上  控制x轴刻度线高度
    },
    yAxis: [
        {
            type: 'value',
            name: '准确率%',
           splitNumber:5,
            axisLabel: {
                formatter: '{value}'
            }
        }
    ],
    series: []
};
let timeOption = {
    title : {
        text: '',
         x: 'center'
    },
    toolbox: {
       show : true,
        feature : {
            saveAsImage : {show: true}
        }
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        y:'10px',
        textStyle:{
            fontSize:10,
            color:'black'

        },
        itemGap:-1,
        data:[]
    },
    xAxis: [
        {
          splitLine:{show: false},//去除网格线
            type: 'category',
            data: [],
            boundaryGap : true,   ////////控制 
            axisLabel: {  
             interval:0, ////////控制 
             rotate:20 ,
             textStyle:{
                fontSize:12,
                color:'black',
                fontWeight:700
              }
            }
        }
  ],
    grid: {
        x2:6,
        y2: 60,// y2可以控制 X轴跟Zoom控件之间的间隔，避免以为倾斜后造成 label重叠到zoom上  控制x轴刻度线高度
    },
    yAxis: [
        {
            type: 'value',
            name: '%',
           splitNumber:5,
            axisLabel: {
                formatter: '{value}'
            }
        }
    ],
    series: []
};
</script>
<style>
.chart-box{
    margin: 40px 0;
}
</style>
