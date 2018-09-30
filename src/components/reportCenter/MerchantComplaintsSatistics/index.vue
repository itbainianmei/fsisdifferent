<template>
    <div>
        <search
            :serachForm="searchForm"
            @searchData="queryChart" 
            @onDownload="downloadPage" 
            @onTarget="goDetail" 
            @selectedChange="selectedChange"
        >
        </search>
        <el-row class="chart-box">
            <el-col :span="10" :offset="1">
                <div id="barChart" :style="{width: '100%', height: '280px'}"></div>
            </el-col>
             <el-col :span="10" :offset="1">
                <div id="lineChart" :style="{width: '100%', height: '280px'}"></div>
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
import {MERCHANT_COMPLAINT_SATISTICS_TABLE_HEAD, KYC} from '@/constants'
import {getStartDateAndEndDate} from "@/components/utils";
import echarts from 'echarts';
export default {
    name: '商户投诉情况统计',
    components: {
        search
    },
    data () {
        return {
            headList: MERCHANT_COMPLAINT_SATISTICS_TABLE_HEAD,
            tableData: [],
            searchForm:{
                dateType: "day",
                beginDate: "",
                endDate: "", 
                tagType: "kyc", 
                customerNumber: "", 
                branchName: "", 
                childTag: [KYC.ALL],
                childTagName: KYC.ALL_NAME
            },
            ids: [],
            barChart: null,
            lineChart: null,
            pager: {
                totalCount: 0,
                currentPage: 1,
                pageSize: 20,
                maxPageNum: 0
            }
        }
    },
    watch: {
        'searchForm.tagType': function (val) {
            this.searchForm.childTag = [KYC.ALL]
            this.ids = []
            this.searchForm.childTagName = KYC.ALL_NAME
        }
    },
    created() {
        this.getSDateAndEDate();
        this.queryChart();
    },
    mounted() {
        this.$nextTick(function () {
            let that = this;
            let resizeTimer = null;
            window.onresize = function () {
                if (resizeTimer) clearTimeout(resizeTimer);
                resizeTimer = setTimeout(function () {
                    that.drawChart('barChart', 'barChart', barOption)
                    that.drawChart('lineChart', 'lineChart', lineOption)
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
            let url = "/report/merchantComplaint/exportInfo?beginDate=" +
            param.beginDate +
            "&endDate=" +
            param.endDate +
            "&dateType=" +
            param.dateType +
            "&cType=" +
            param.cType +
            "&customerNumber=" +
            param.customerNumber +
            "&branchName=" +
            param.branchName +
            "&heapTypes=" +
            param.heapTypes
            this.$axios.get(url).then(res1 => {
                let d_url = this.uploadBaseUrl + url;
                window.location = encodeURI(d_url)
            }).catch(error => {
                console.log(error);
            });
        },
        goDetail () {
            let obj = {}
            obj.path = '/manager/merchantComplaints/detail'
            obj.name = '投诉明细查询'
            obj.act  = false
            this.$router.push({path: obj.path})
            // 遍历循环看是否存在代理商画像详情 如果存在先删除在添加
            this.$store.state.tabsArr.map((one, index) =>{
                if (one.name === '投诉明细查询') {
                    this.$store.dispatch('deltab',index);
                    this.$store.dispatch('updateTabCache',index);
                } 
            })
            this.$store.dispatch('addtab', obj);
            this.$store.dispatch('updateTabCache');
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
                this.searchForm.childTag = ""
            }
        },
        getParam () {
            let sendData = {}
            for (let key in this.searchForm) {
                if (key !== 'childTag' && key !== 'childTagName' && key !== 'tagType') {
                    sendData[key] = this.searchForm[key]
                }
            }
            sendData.cType = this.searchForm.tagType
            sendData.heapTypes = this.searchForm.childTagName === '全部' ? 'all' : this.searchForm.childTagName
            sendData.beginDate = sendData.beginDate.replace(/-/g, '')
            sendData.endDate = sendData.endDate.replace(/-/g, '')
            return sendData
        },
        searchData() {
            let sendData = this.getParam()
            sendData.pageNumber = this.pager.currentPage
            sendData.pageRow = this.pager.pageSize
            this.$axios.post("/report/merchantComplaint/merchantComplaintInfo",
                qs.stringify(sendData)
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
        getBarChart () {
            let param = this.getParam()
            this.$axios.post('/report/merchantComplaint/histogram',qs.stringify(param)).then(res => {
                let response = res.data
                if(response.code * 1 == 200){
                    if(JSON.stringify(response.data) == "{}"){
                        barOption.xAxis[0].data = []//时间
                        barOption.series = [{
                            symbol: "none",
                            name: '',
                            type: 'line',
                            data: []
                        }]
                        this.drawChart('barChart', 'barChart', barOption)
                        return false
                    }
                    barOption.xAxis[0].data = response.data.times  //时间
                    barOption.series = this.getOption(response.data.returnList)
                    this.drawChart('barChart', 'barChart', barOption)
                }
            })
        },
        getOption (result) {
            let serviceList = []
            let k = 0
            for (let key in result) {
                let two = 
                {
                    symbol: "none",// 去掉折线上面的小圆点
                    name:  key,
                    type: 'bar',
                    stack: 'result',
                    itemStyle:{
                        normal:{
                            color:color[k]  //改变珠子颜色
                        }
                    },
                    data: this.dostr(result[key])
                }
                serviceList.push(two)
                k++
            }
            return serviceList
        },
        getLineChart () {
            let param = this.getParam()
            this.$axios.post('/report/merchantComplaint/polyline',qs.stringify(param)).then(res => {
                let response = res.data
                if(response.code * 1 == 200){
                    if(JSON.stringify(response.data) == "{}"){
                        lineOption.xAxis[0].data = []//时间
                        lineOption.series = [{
                            symbol: "none",
                            name: '',
                            type: 'line',
                            data: []
                        }]
                        this.drawChart('lineChart', 'lineChart', lineOption)
                        return false
                    }
                    lineOption.xAxis[0].data = response.data.times  //时间
                    lineOption.series = this.getLineOption(response.data.returnList)
                    this.drawChart('lineChart', 'lineChart', lineOption)
                }
            })
        },
        getLineOption (result) {
            let serviceList = []
            let j = 0
            for (let key in result.complaintRateMoney) {
                let two = 
                {
                    symbol: "none",// 去掉折线上面的小圆点
                    name: key,
                    type: 'line',
                    itemStyle:{
                        normal:{
                            color:color[j]  //改变珠子颜色
                        }
                    },
                    data: this.dostr(result.complaintRateMoney[key])
                }
                serviceList.push(two)
                j++
            }
            let i = 6
            for (let key in result.complaintRateNumber) {
                let two = 
                {
                    symbol: "none",// 去掉折线上面的小圆点
                    name: key,
                    type: 'line',
                    itemStyle:{
                        normal:{
                            color:color[i]  //改变珠子颜色
                        }
                    },
                    data: this.dostr(result.complaintRateNumber[key])
                }
                serviceList.push(two)
                i++
            }
            let k = 6
            for (let key in result.merchantRate) {
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
                    data: this.dostr(result.merchantRate[key])
                }
                serviceList.push(two)
                k++
            }
            return serviceList
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
        queryChart() {
            this.getBarChart()
            this.getLineChart()
            this.pager.currentPage = 1
            this.tableData = []
            this.searchData()
        }
    }
}
let color= ['#E0CDD1','#FBEBDC','#788A72','#C8B8A9','#C8B8A9','#D6D4C8','#F2EEED','#FBE8DA','#FBE8DA','#B7C6B3','#A47C7C','#C2C8D8','#7A7385','#E0CDD3','#B3B1A4','#A0A5BB','#D7C9AF']
let barOption = {
    title : {
        text: '',
         x: 'center'
    },
    tooltip: {
        trigger: 'axis'
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
            name: '投诉数(个)',
           splitNumber:5,
            axisLabel: {
                formatter: '{value}'
            }
        },
        {
            type: 'value',
            name:'0.01BP',
           splitNumber:5,
            axisLabel: {
                formatter: '{value}'
            }
        }
    ],
    series: []
};
let lineOption = {
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
}
</script>
<style>
.chart-box{
    margin: 40px 0;
}
</style>
