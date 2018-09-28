<template>
    <div>
        <search
            :serachForm="searchForm"
            @searchData="getBarChart" 
            @onDownload="downloadPage" 
        >
        </search>
        <el-row class="chart-box">
            <el-col :span="22">
                <div id="barChart" :style="{width: '50%', height: '350px', 'margin': '0 auto'}"></div>
            </el-col>
        </el-row>
        <table-pager 
            :headList="headList"
            :dataList="tableData"
            :pageInfo="pager"
            @onCurrentChange="onCurrentChange"
        ></table-pager>
    </div>
</template>
<script>
import qs from "qs";
import search from './Partial/search.vue';
import {ALARM_HANDING_HEDR} from '@/constants'
import {getStartDateAndEndDate} from "@/components/utils";
import echarts from 'echarts';
export default {
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
                pageSize: 20,
                maxPageNum: 0
            }
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
                    that.drawChart('barChart', 'barChart', barOption)
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
            let url = "/report/alarmAndDeal/export?beginDate=" +
            this.searchForm.beginDate +
            "&endDate=" +
            this.searchForm.endDate +
            "&dateType=" +
            this.searchForm.dateType
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
                    this.getChartAndData(result, 'data', barOption, 'barChart');
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
                option.series[0].data =[] // 
                option.series[1].data = [] // 
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
        }
    }
}
let color= ['#E0CDD1','#FBEBDC','#788A72','#C8B8A9','#D6D4C8','#F2EEED','#B7C6B3','#A47C7C','#C2C8D8','#7A7385','#E0CDD3','#B3B1A4','#A0A5BB','#D7C9AF']
let barOption = {
    title : {
        text: '',
         x: 'center'
    },
    tooltip: {
        trigger: 'axis',
        formatter:function (params) {
        function addCommas(nStr){  //每三位分隔符
             nStr += '';
             let x = nStr.split('.');
             let x1 = x[0];
             let x2 = x.length > 1 ? '.' + x[1] : '';
             let rgx = /(\d+)(\d{3})/;
             while (rgx.test(x1)) {
              x1 = x1.replace(rgx, '$1' + ',' + '$2');
             }
             return x1 + x2;
          }
          let str0=''
          let str=''
          params.map(function(item,index){
            str0=item[1]+'\<br>'
            str+=item[0]+': '
            if(index==0 || index==1){
              str+=addCommas(Number(item[2]).toFixed(2))+'\<br>'
            }
            if(index == 2){
              str+=Number(item[2]).toFixed(2)+'\<br>'
            }
          })
          return str0+str
        }
    },
    toolbox: {
        show : true,
        feature : {
            saveAsImage : {show: true}
        }
    },
    grid:{
      x2:30,
    },
    legend: {
        y:'10px',
        x:'center',
        data:[]
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
            name: '数量(个)',
           splitNumber:5,
            axisLabel: {
                formatter: '{value}'
            }
        },
        {
            type: 'value',
            name:'%',
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
