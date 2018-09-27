<template>
    <div>
        <search
            :serachForm="searchForm"
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
        downloadPage(){
            let url = "/merchantInspect/downReport?startMonth=" +
            this.searchForm.startMonth +
            "&endMonth=" +
            this.searchForm.endMonth 
            this.$axios.get(url).then(res1 => {
                let d_url = this.uploadBaseUrl + url;
                window.location = encodeURI(d_url)
            }).catch(error => {
                console.log(error);
            });
        },
        // 常规巡检图表
        fetchNormalChart() {
            this.$axios.post('/merchantInspect/normalChart',
                qs.stringify(this.searchForm)
            ).then(response => {
                if(response.data.code * 1 == 200){
                    let result = response.data.data
                    let serviceList = []
                    let k = 0
                    for (let key in result.dealRate) {
                        let two = 
                        {
                            symbol: "none",// 去掉折线上面的小圆点
                            name:  result.dealRate,
                            type: 'bar',
                            stack: 'grossProfit',
                            itemStyle:{
                                normal:{
                                    color:color[k]  //改变珠子颜色
                                }
                            },
                            data: this.dostr(result[chartName].grossProfitList[key])
                        }
                        serviceList.push(two)
                        k++
                    }
                    let i = 4
                    for (let key in result[chartName].receiptAmountList) {
                        title.push('成功收单交易金额-' + key)
                        let two = 
                        {
                            symbol: "none",// 去掉折线上面的小圆点
                            name: '成功收单交易金额-' + key,
                            type: 'bar',
                            stack: 'receiptAmount',
                            itemStyle:{
                                normal:{
                                    color:color[i]  //改变珠子颜色
                                }
                            },
                            data: this.dostr(result[chartName].receiptAmountList[key])
                        }
                        serviceList.push(two)
                        i++
                    }
                }
            }).catch(error => {
                console.log(error);
            });
        },
        // 专项巡检图表
        fetchSpecialChart () {
            this.$axios.post('/merchantInspect/specialChart',
                qs.stringify(this.searchForm)
            ).then(response => {
                if(response.data.code * 1 == 200){
                    let result = response.data.data
                }
            }).catch(error => {
                console.log(error);
            });
        },
        queryChart() {
            this.fetchNormalChart()
            this.fetchSpecialChart()
            this.queryList()
        },
         getParam () {
            let sendData = {}
            for (let key in this.searchForm) {
                if (key !== 'childTag' && key !== 'childTagName') {
                    sendData[key] = this.searchForm[key]
                }
            }
            return sendData
        },
        queryList () {
            let param = this.getParam()
            // param.pageNum = this.modelPager.currentPage
            // param.pageSize = this.modelPager.pageSize
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
        trigger: 'axis',
        formatter:function (params) {
          let str0=''
          let str=''
          params.map(function(item,index){
            str0=item[1]+'\<br>'
            str+=item[0]+': '
            if(item[2].toString().indexOf('%') == -1){
              str+=item[2].toFixed(2)+'%\<br>'
            }else{
              str+=item[2]+'\<br>'
            }
            
          })
          return str0+str
        },
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
        trigger: 'axis',
        formatter:function (params) {
          let str0=''
          let str=''
          params.map(function(item,index){
            str0=item[1]+'\<br>'
            str+=item[0]+': '
            if(item[2].toString().indexOf('%') == -1){
              str+=item[2].toFixed(2)+'%\<br>'
            }else{
              str+=item[2]+'\<br>'
            }
            
          })
          return str0+str
        },
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
