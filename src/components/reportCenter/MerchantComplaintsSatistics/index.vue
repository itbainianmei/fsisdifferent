<template>
    <div>
        <search
            :searchForm="searchForm"
            @searchData="queryChart" 
            @onDownload="downloadPage" 
            @onTarget="goDetail" 
            @selectedChange="selectedChange"
        >
        </search>
        <div class="chart1-box">
            <el-row>
                <el-col :span="12">
                    <div id="barChart" :style="{width: '100%', height: '280px'}"></div>
                </el-col>
                <el-col :span="12">
                    <div id="lineChart" :style="{width: '100%', height: '280px'}"></div>
                </el-col>
            </el-row>
        </div>
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
import {MERCHANT_COMPLAINT_SATISTICS_TABLE_HEAD, KYC, COLORS} from '@/constants'
import {getStartDateAndEndDate, formatterChartDialog} from "@/components/utils";
import echarts from 'echarts';
let color = COLORS
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
        },
        'searchForm.dateType': function() {
            this.queryChart()
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
                    that.drawChart('barChart', 'barChart', that.barOption)
                    that.drawChart('lineChart', 'lineChart', that.lineOption)
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
                this.searchForm.childTagName = ""
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
            sendData.heapTypes = this.searchForm.childTagName === '全部' || this.searchForm.childTagName === '' ? 'all' : this.searchForm.childTagName
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
                    let xTit = ['投诉数(个)', '0.01BP']
                    let unit = ['个', '%']
                    this.barOption = this.initOption(xTit, 'item', 'barChart', unit)
                    if(JSON.stringify(response.data) == "{}"){
                        this.barOption.xAxis[0].data = []//时间
                        this.barOption.series = [{
                            symbol: "none",
                            name: '',
                            type: 'line',
                            data: []
                        }]
                        this.drawChart('barChart', 'barChart', this.barOption)
                        return false
                    }
                    this.barOption.xAxis[0].data = response.data.times  //时间
                    this.barOption.series = this.getOption(response.data.returnList)
                    this.drawChart('barChart', 'barChart', this.barOption)
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
                    let xTit = ['%', '']
                    let unit = ['%', '']
                    this.lineOption = this.initOption(xTit, 'item', 'lineChart', unit)
                    if(JSON.stringify(response.data) == "{}"){
                        this.lineOption.xAxis[0].data = []//时间
                        this.lineOption.series = [{
                            symbol: "none",
                            name: '',
                            type: 'line',
                            data: []
                        }]
                        this.drawChart('lineChart', 'lineChart', this.lineOption)
                        return false
                    }
                    this.lineOption.xAxis[0].data = response.data.times  //时间
                    this.lineOption.series = this.getLineOption(response.data.returnList)
                    this.drawChart('lineChart', 'lineChart', this.lineOption)
                }
            })
        },
        getLineOption (result) {
            let serviceList = []
            let j = 0
            let legendList = []
            for (let key in result.complaintRateMoney) {
                legendList.push(key)
                let two = 
                {
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
                legendList.push(key)
                let two = 
                {
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
                legendList.push(key)
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
            this.lineOption.legend.data = [...new Set(legendList)]  //时间
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
