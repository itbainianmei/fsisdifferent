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
        <!-- <el-dialog title="黑名单查询：分页选择下载" :visible.sync="isShowDownload" width="30%" v-dialogDrag>
            <div style="text-align: center; margin-bottom:20px;">选择下载从
              <input type="number" v-model="startPage" min="0" class="downClass" @input='startPage'>到
              <input type="number" min="0"  class="downClass" :max="maxPage" v-model="endPage">页的数据</div>
            <h4 style="text-align: center">当前共<span>{{maxPage}}</span>页</h4>
            <span slot="footer" class="dialog-footer">
            <el-button @click="closeDownload">取 消</el-button>
            <el-button type="primary" @click="downloadAction" v-show='isShowDownloadBtn'>下 载</el-button>
            </span>
        </el-dialog> -->
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
            let se = getStartDateAndEndDate(new Date(), this.searchForm.dateType)
            this.searchForm.beginDate = se.startDate
            this.searchForm.endDate = se.endDate
        },     
        downloadPage(pageDownInfo){
            console.log(pageDownInfo)
            let url = "/ProtraitAgency/downloadAgencyList?beginDate=" +
            this.searchForm.beginDate +
            "&endDate=" +
            this.searchForm.endDate +
            "&dateType=" +
            this.searchForm.dateType +
            "&heapTypes=" +
            this.ids.join(',')
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
                this.searchForm.childTag = [KYC.ALL]
                this.searchForm.childTagName = KYC.ALL_NAME
            }
        },
        queryChart() {
            let sendData = {}
            for (let key in this.searchForm) {
                if (key !== 'childTag' && key !== 'childTagName') {
                    sendData[key] = this.searchForm[key]
                }
            }
            sendData.beginDate = sendData.beginDate.replace(/-/g, '')
            sendData.endDate = sendData.endDate.replace(/-/g, '')
            sendData.heapTypes = this.ids.join(',')
            sendData.pageNum = this.modelPager.currentPage
            sendData.pageSize = this.modelPager.pageSize
            let url = "/report/kyc/queryChart"
            this.$axios.post(url,
                qs.stringify(sendData)
            ).then(response => {
                this.queryList()
                if(response.data.code * 1 == 200){
                    let result = response.data.data
                    if(typeof result.chart1 !== 'undefined'){
                        modelOption.legend.data = result.chart1.names
                        modelOption.xAxis[0].data = result.chart1.times  //时间
                        let serviceList = []
                        let k = 0
                        for (let key in result.chart1.rate) {
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
                                data: this.dostr(result.chart1.rate[key])
                            }
                            serviceList.push(two)
                            k++
                        }
                        modelOption.series = serviceList
                        this.drawChart('modelChart', 'modelChart', modelOption)
                    } else {
                        modelOption.xAxis[0].data = []//时间
                        modelOption.series[0].data =[] // 
                        modelOption.series[1].data = [] // 
                        this.drawChart('modelChart', 'modelChart', modelOption)
                    }
                    if(typeof result.chart2 !== 'undefined'){
                        timeOption.legend.data = result.chart2.times
                        timeOption.xAxis[0].data = result.chart2.names  //时间
                        let serviceList = []
                        let k = 7
                        for (let key in result.chart2.rate) {
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
                                data: this.dostr(result.chart2.rate[key])
                            }
                            serviceList.push(two)
                            k++
                        }
                        timeOption.series = serviceList
                        this.drawChart('timeChart', 'timeChart', timeOption)
                    } else {
                        timeOption.xAxis[0].data = []//时间
                        timeOption.series[0].data =[] // 
                        timeOption.series[1].data = [] // 
                        this.drawChart('timeChart', 'timeChart', timeOption)
                    }
                }
            }).catch(error => {
                console.log(error);
            });
        },
        queryList () {
            let sendData = {}
            for (let key in this.searchForm) {
                if (key !== 'childTag' && key !== 'childTagName') {
                    sendData[key] = this.searchForm[key]
                }
            }
            sendData.beginDate = sendData.beginDate.replace(/-/g, '')
            sendData.endDate = sendData.endDate.replace(/-/g, '')
            sendData.heapTypes = this.ids.join(',')
            sendData.pageNum = this.modelPager.currentPage
            sendData.pageSize = this.modelPager.pageSize
            let url = "/report/kyc/queryList"
            this.$axios.post(url,
                qs.stringify(sendData)
            ).then(res => {
                let result = res.data
                console.log(result.data.names)
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
                    this.modelPager.totalCount = parseInt(result.data.totalPage);
                }
                console.log(JSON.stringify(this.headList, null, 2))
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
let color= ['#E0CDD1','#FBEBDC','#788A72','#C8B8A9','#C8B8A9','#D6D4C8','#F2EEED','#FBE8DA','#FBE8DA','#B7C6B3','#A47C7C','#C2C8D8','#7A7385','#E0CDD3','#B3B1A4','#A0A5BB','#D7C9AF']
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
