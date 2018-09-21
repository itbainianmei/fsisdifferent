<!-- 商户巡检覆盖情况 -->
<template>
    <div>
        <search
            :serachForm="searchForm"
            @searchData="searchData"
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
            :dataList="tableData"
            :pageInfo="modelPager"
            @onCurrentChange="onCurrentChangeModel"
        ></table-pager>
    </div>
</template>
<script>
import qs from "qs";
import search from './Partial/search.vue';
import {MERCHANT_INSPECTION_COVERAGE_DATA_TABLE_HEAD} from '@/constants';
import echarts from 'echarts';
export default {
    components: {
        search
    },
    data () {
        return {
            headList: MERCHANT_INSPECTION_COVERAGE_DATA_TABLE_HEAD,
            tableData: [],
            searchForm: {
                startMonth: '',
                endMonth: ''
            },
            ids: [],
            modelChart: null,
            timeChart: null,
            pager: {
                totalCount: 0,
                currentPage: 1,
                pageSize: 20,
                maxPageNum: 0
            },
            modelPager: {
                totalCount: 0,
                currentPage: 1,
                pageSize: 20,
                maxPageNum: 0
            }
        }
    },
    mounted() {
        this.initSetTime();
        this.$nextTick(function () {
            // this.searchData('model')
            // this.searchData('time')
            this.drawChart('modelChart', 'modelChart', modelOption)
            this.drawChart('timeChart', 'timeChart', timeOption)
            let that = this;
            let resizeTimer = null;
            window.onresize = function () {
                if (resizeTimer) clearTimeout(resizeTimer);
                resizeTimer = setTimeout(function () {
                    that.drawChart('barChart', 'barChart', barOption)
                    that.drawChart('timeChart', 'timeChart', timeOption)
                }, 300);
            }
        });
    },
    methods: {
        // 设置默认时间
        initSetTime() {
            let date = new Date();
            let y = date.getFullYear();
            let m = '0' + (date.getMonth() + 1);
            this.searchForm.startMonth = y + '-' + m.substring(m.length-2, m.length);
            this.searchForm.endMonth = y + '-' + m.substring(m.length-2, m.length);
        },
        downloadPage(pageDownInfo){
            let url = "/merchantInspect/downReport?startMonth=" + this.searchForm.startMonth + "&endMonth=" + this.searchForm.endMonth;
            this.$axios.get(url).then(res1 => {
                let d_url = this.url + url;
                window.location = encodeURI(d_url)
            }).catch(error => {
                console.log(error);
            });
        },
        searchData(chartType, type) {
            let sendData = this.searchForm;
            sendData.pageNum = this.pager.currentPage;
            sendData.pageSize = this.pager.pageSize;
            let newp = this.addSessionId(sendData);
            this.$axios.post('/merchantInspect/queryReport', qs.stringify(newp))
            .then(res => {
                let result = res.data;
                if (result.code == 200) {
                    this.tableData = result.data.recordList;
                    this.pager.totalCount = parseInt(result.data.totalCount);
                    this.pager.maxPageNum = parseInt(result.data.totalPageNum);
                } else {
                    this.tableData = [];
                    this.pager.totalCount = 0;
                    this.pager.maxPageNum = 0;
                    this.$message.error({message: result.msg, center: true});
                }
            }).catch(error => {
                console.log(error);
            });
        },
        onCurrentChangeModel (val) {
            this.pager.currentPage = val;
            this.searchData('model', 'pager');
        },
        getModelChart (param) {
             this.$axios.post('/report/merchantComplaint/polyline',qs.stringify(param)).then(res => {
                let response = res.data
                if(response.code * 1 == 200){
                    if(JSON.stringify(response.data) == "{}"){
                        modelOption.xAxis[0].data = []//时间
                        modelOption.series[0].data =[] //
                        modelOption.series[1].data = [] //
                        this.drawChart('modelChart', 'modelChart', modelOption)
                        return false
                    }
                    modelOption.xAxis[0].data = response.data.times  //时间
                    modelOption.series[0].data = this.dostr(response.data.transactionMoney) //成功交易额(yi元)
                    modelOption.series[1].data = this.dostr(response.data.fraudMoney) //成功欺诈额(万元)
                    this.drawChart('modelChart', 'modelChart', modelOption)
                }
            })
        },
        getTimeChart (param) {
            this.$axios.post('/report/merchantComplaint/polyline',qs.stringify(param)).then(res => {
                let response = res.data
                if(response.code * 1 == 200){
                    if(JSON.stringify(response.data) == "{}"){
                        timeOption.xAxis[0].data = []//时间
                        timeOption.series[0].data =[] //
                        timeOption.series[1].data = [] //
                        this.drawChart('timeChart', 'timeChart', timeOption)
                        return false
                    }
                    timeOption.xAxis[0].data = response.data.times  //时间
                    timeOption.series[0].data = this.dostr(response.data.transactionMoney) //成功交易额(yi元)
                    timeOption.series[1].data = this.dostr(response.data.fraudMoney) //成功欺诈额(万元)
                    this.drawChart('timeChart', 'timeChart', timeOption)
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
        }
    }
};
let color= ['#E0CDD1','#FBEBDC','#788A72','#C8B8A9','#C8B8A9','#D6D4C8','#F2EEED','#FBE8DA','#FBE8DA','#B7C6B3','#A47C7C','#C2C8D8','#7A7385','#E0CDD3','#B3B1A4','#A0A5BB','#D7C9AF']
let modelOption = {
    title : {
        text: '常规巡检情况统计',
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
        y:'40px',
        textStyle:{
            fontSize:10,
            color:'black'

        },
        itemGap:-1,
        data:['商户投诉率(交易笔数)','商户投诉率(交易金额)']
    },
    xAxis: [
        {
          splitLine:{show: false},//去除网格线
            type: 'category',
            data: ['08/01-09/01','08/01-09/01','08/01-09/01','08/01-09/01','08/01-09/01','08/01-09/01','08/01-09/01','08/01-09/01'],

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
            name: '投诉率',
           splitNumber:5,
            axisLabel: {
                formatter: '{value}%'
            }
        }
    ],
    series: [
        {
           symbol: "none",// 去掉折线上面的小圆点
            name: '商户投诉率(交易笔数)',
            type: 'line',
            itemStyle:{
                normal:{
                    color:color[0]  //改变珠子颜色
                }
            },
            data: [30,20,40,90,80,40,10.5,50]
        },
        {
           symbol: "none",// 去掉折线上面的小圆点
            name: '商户投诉率(交易金额)',
            type: 'line',
            itemStyle:{
                normal:{
                    color:color[1]  //改变珠子颜色
                }
            },
            data: [10,90,70,40,80,20,30,50]
        }
    ]
};
let timeOption = {
    title : {
        text: '专项巡检情况统计',
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
        y:'40px',
        textStyle:{
            fontSize:10,
            color:'black'

        },
        itemGap:-1,
        data:['商户投诉率(交易笔数)','商户投诉率(交易金额)']
    },
    xAxis: [
        {
          splitLine:{show: false},//去除网格线
            type: 'category',
            data: ['08/01-09/01','08/01-09/01','08/01-09/01','08/01-09/01','08/01-09/01','08/01-09/01','08/01-09/01','08/01-09/01'],

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
            name: '投诉率',
           splitNumber:5,
            axisLabel: {
                formatter: '{value}%'
            }
        }
    ],
    series: [
        {
           symbol: "none",// 去掉折线上面的小圆点
            name: '商户投诉率(交易笔数)',
            type: 'line',
            itemStyle:{
                normal:{
                    color:color[0]  //改变珠子颜色
                }
            },
            data: [30,20,40,90,80,40,10.5,50]
        },
        {
           symbol: "none",// 去掉折线上面的小圆点
            name: '商户投诉率(交易金额)',
            type: 'line',
            itemStyle:{
                normal:{
                    color:color[1]  //改变珠子颜色
                }
            },
            data: [10,90,70,40,80,20,30,50]
        }
    ]
};
</script>
<style>
.chart-box{
    margin: 40px 0;
}
</style>
