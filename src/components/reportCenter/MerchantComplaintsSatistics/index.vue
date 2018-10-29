<template>
    <div>
        <search
            :searchBtnPower="searchBtnPower"
            :downloadBtnPower="downloadBtnPower"
            :detailBtnPower="detailBtnPower"
            :searchForm="searchForm"
            @searchData="queryChart"
            @onDownload="downloadPage"
            @onTarget="goDetail"
            @selectedChange="selectedChange"
        >
        </search>
        <div class="chart1-box" v-if="searchBtnPower">
            <el-row>
                <el-col :span="12">
                    <div id="barChart" :style="{width: '100%', height: '280px'}"></div>
                </el-col>
                <el-col :span="12">
                    <div id="chart6" :style="{width: '100%', height: '280px'}"></div>
                </el-col>
            </el-row>
        </div>
        <table-pager v-if="searchBtnPower"
            :headList="headList"
            :dataList="tableData"
            :pageInfo="pager"
            @onCurrentChange="onCurrentChange"
            @checkSelect="checkSelect"
        ></table-pager>
    </div>
</template>
<script>
import qs from "qs";
import search from './Partial/search.vue';
import {MERCHANT_COMPLAINT_SATISTICS_TABLE_HEAD, KYC, COLORS, PAGESIZE_10} from '@/constants'
import {getStartDateAndEndDate, initChartOption} from "@/components/utils";
import echarts from 'echarts';
let color = COLORS
export default {
    name: '投诉情况统计',
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
            chart6: null,
            pager: {
                totalCount: 0,
                currentPage: 1,
                pageSize: PAGESIZE_10,
                maxPageNum: 0
            },
            onFetch: false,
            searchBtnPower: false,
            downloadBtnPower: false,
            detailBtnPower: false
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
        const idList = JSON.parse(localStorage.getItem("ARRLEVEL"));
        this.searchBtnPower = idList.indexOf(582) === -1 ? false : true;
        this.downloadBtnPower = idList.indexOf(583) === -1 ? false : true;
        this.detailBtnPower = idList.indexOf(584) === -1 ? false : true;
        this.getSDateAndEDate();
        if (this.searchBtnPower) {
            this.queryChart();
        }
    },
    mounted() {
        this.$nextTick(function () {
            let that = this;
            let resizeTimer = null;
            window.onresize = function () {
                this.onFetch = true
                if (resizeTimer) clearTimeout(resizeTimer);
                resizeTimer = setTimeout(function () {
                    that.drawChart('barChart', 'barChart', that.barOption)
                    that.drawChart('chart6', 'chart6', that.lineOption)
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
            let url = "/report/merchantComplaint/exportInfo?" + qs.stringify(param)
            let d_url = this.uploadBaseUrl + url;
            window.location = d_url
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
                    if(JSON.stringify(response.data.returnList) == "{}"){
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
            let title = []
            let k = 0
            for (let key in result) {
                title.push(key)
                let two =
                {
                    // symbol: "none",// 去掉折线上面的小圆点
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
            this.barOption.legend.data = title
            return serviceList
        },
        getLineChart () {
            this.onFetch = true
            let param = this.getParam()
            this.$axios.post('/report/merchantComplaint/polyline',qs.stringify(param)).then(res => {
                let response = res.data
                if(response.code * 1 == 200){
                    let xTit = ['%', '']
                    let unit = ['%', '']
                    this.lineOption = this.initOption(xTit, 'axis', 'chart6', unit)
                    if(JSON.stringify(response.data) == "{}"){
                        this.lineOption.xAxis[0].data = []//时间
                        this.lineOption.series = [{
                            // symbol: "none",
                            name: '',
                            type: 'line',
                            data: []
                        }]
                        this.drawChart('chart6', 'chart6', this.lineOption)
                        return false
                    }
                    this.lineOption.xAxis[0].data = response.data.times  //时间
                    this.lineOption.series = this.getLineOption(response.data.returnList)
                    this.drawChart('chart6', 'chart6', this.lineOption)
                }
            })
        },
        getLineOption (result) {
            let serviceList = []
            let j = 0
            let legendList = []
            for (let item in result) {
                if (item !== 'times') {
                    let name = ''
                    let symbol = ''
                    if (item === 'complaintRateMoney') {
                        name = '投诉率(金额)'
                        symbol = 'diamond'
                        legendList[0] = name
                    }
                    if (item === 'complaintRateNumber') {
                        name = '投诉率(笔数)'
                        symbol = 'circle'
                        legendList[1] = name
                    }
                    if (item === 'merchantRate') {
                        name = '投诉商户占比'
                        symbol = 'triangle'
                        legendList[2] = name
                    }
                    // serviceList.push(
                    //     {
                    //         symbol: symbol,
                    //         marker: symbol,
                    //         name: name,
                    //         type: 'line',
                    //         data: [],
                    //         itemStyle:{
                    //             normal:{
                    //                 color: '#333' //改变珠子颜色
                    //             }
                    //         }
                    //     }
                    // )
                    let k = 0
                    if (JSON.stringify(result[item]) !== '{}') {
                        for(let key in result[item]){
                            let two =
                            {
                                symbol: symbol,
                                name: name,
                                childName: key,
                                type: 'line',
                                itemStyle:{
                                    normal:{
                                        color:color[k]  //改变珠子颜色
                                    }
                                },
                                data: this.dostr(result[item][key])
                            }
                            serviceList.push(two)
                            k++
                        }
                    } else {
                        let two =
                        {
                            name: '',
                            type: 'line',
                            data: []
                        }
                        serviceList.push(two)
                    }
                }
            }
            this.lineOption.legend.data = [...new Set(legendList)]
            // this.lineOption.legend.selectedMode = false
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
                if (chart === 'chart6') {
                    _this.onFetch = false
                    document.querySelector('#chart6 > div').style.overflow = 'inherit'
                    document.querySelector('#chart6 > div').style.zIndex = '2000'
                    _this.chart6.component.legend.setColor("投诉率(金额)", color[0]);
                    _this.chart6.component.legend.setColor("投诉率(笔数)", color[1]);
                    _this.chart6.component.legend.setColor("投诉商户占比", color[2]);
                    _this.chart6.refresh()
                }
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
            return initChartOption(yTtile, toolTipType, chart, this[chart], unit)
        }
    }
}
</script>
