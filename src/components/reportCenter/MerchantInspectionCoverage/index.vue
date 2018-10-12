<template>
    <div>
        <search
            :searchForm="searchForm"
            @searchData="queryChart" 
            @onDownload="downloadPage" 
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
import {MERCHANT_INSPECTION_COVERAGE_DATA_TABLE_HEAD} from '@/constants'
import {getStartDateAndEndDate} from "@/components/utils";
import echarts from 'echarts';
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
                    if(JSON.stringify(response.data.data) === '{}') {
                        modelOption.xAxis[0].data = []
                        modelOption.series = [{
                            symbol: "none",
                            name: '',
                            type: 'line',
                            data: []
                        }]
                        this.drawChart('modelChart', 'modelChart', modelOption)
                        return false
                    }
                    let result = response.data.data
                    modelOption.series = this.getOption(result)
                    modelOption.xAxis[0].data = response.data.data.times
                    this.drawChart('modelChart', 'modelChart', modelOption)
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
                    name: '成功收单交易金额-' + key,
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
                    name: '成功收单交易金额-' + key,
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
                    if(JSON.stringify(response.data.data) === '{}') {
                        timeOption.xAxis[0].data = []
                        timeOption.series = [{
                            symbol: "none",
                            name: '',
                            type: 'line',
                            data: []
                        }]
                        this.drawChart('timeChart', 'timeChart', timeOption)
                        return false
                    }
                    let result = response.data.data
                    timeOption.xAxis[0].data = response.data.data.times
                    timeOption.series = this.getOption(result)
                    this.drawChart('timeChart', 'timeChart', timeOption)
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
        }
    }
}
let color= ['#E0CDD1','#FBEBDC','#788A72','#C8B8A9','#D6D4C8','#F2EEED','#B7C6B3','#A47C7C','#C2C8D8','#7A7385','#E0CDD3','#B3B1A4','#A0A5BB','#D7C9AF']
let modelOption = {
    title : {
        text: '常规巡检情况统计',
        x: 'center',
        textStyle: {
            fontWeight: 100
        }
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
            name: '数量(个)',
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
        text: '专项巡检情况统计',
        x: 'center',
        textStyle: {
            fontWeight: 100
        }
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
            name: '数量(个)',
           splitNumber:5,
            axisLabel: {
                formatter: '{value}'
            }
        }
    ],
    series: []
};
</script>
