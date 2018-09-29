<template>
    <div>
        <search
            :serachForm="searchForm"
            @searchData="getSChart1" 
            @hySelectedTag="hySelectedTag"
        >
        </search>
        <el-row class="d-box" :gutter="5">
            <el-col :span="6" v-for="i in 4" :key="i">
                <div :id="'chart' + i" :style="{width: '100%', height: '280px', 'margin': '0 auto'}"></div>
            </el-col>
        </el-row>
        <el-row class="d-box" :gutter="5">
            <el-col :span="6" v-for="i in 3" :key="i">
                <div :id="'chart' + (i + 4)" :style="{width: '100%', height: '280px', 'margin': '0 auto'}"></div>
            </el-col>
        </el-row>
        <search-two
            :serachForm="searchForm2"
            @searchData="getSChart2" 
        >
        </search-two>
        <el-row class="d-box" :gutter="5">
            <el-col :span="6" v-for="i in 4" :key="i">
                <div :id="'chart2' + i" :style="{width: '100%', height: '280px', 'margin': '0 auto'}"></div>
            </el-col>
        </el-row>
        <el-row class="d-box" :gutter="5">
            <el-col :span="6" v-for="i in 1" :key="i">
                <div :id="'chart2' + (i + 4)" :style="{width: '100%', height: '280px', 'margin': '0 auto'}"></div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import qs from "qs";
import search from './Partial/search.vue';
import searchTwo from './Partial/search-two.vue';
import {KYC} from '@/constants'
import {getStartDateAndEndDate} from "@/components/utils";
import echarts from 'echarts';
export default {
    components: {
        search,
        searchTwo
    },
    data () {
        return {
            searchForm:{
                dateType: "day",
                beginDate: "",
                endDate: "",
                source: 'all',
                cType: 92,
                branchName: '',
                customerNumber: '',
                customerSign: '',
                hyChild: [KYC.ALL],
                hyChildName: KYC.ALL_NAME
            },
            searchForm2:{
                dateType: "day",
                beginDate: "",
                endDate: "",
                branchName: '',
                customerNumber: '',
                customerSign: ''
            },
            hyIds: [],
            titleList: ['收单毛利商户数统计', '收单毛利商户数占比统计', '万元毛利水平', '日均收单毛利水平', '商户投诉率统计', '投诉商户数统计', '投诉商户来源统计'],
            titleList2: ['欺诈情况统计', '风险拦截覆盖情况', '报警及处理情况', '巡检情况统计', '特批及关闭情况']
        }
    },
    created() {
        this.getSDateAndEDate('searchForm')
        this.getSDateAndEDate('searchForm2')
        this.getChart()
    },
    mounted() {
        this.$nextTick(function () {
            let that = this;
            let resizeTimer = null;
            window.onresize = function () {
                if (resizeTimer) clearTimeout(resizeTimer);
                resizeTimer = setTimeout(function () {
                    for(let i = 1; i <= that.titleList.length; i++) {
                        that.commonChart('chart' + i, 'chart' + i, window['option' + i])
                        if (i <= that.titleList2.length) {
                            that.commonChart('chart2' + i, 'chart2' + i, window['option2' + i])
                        }
                    }
                }, 300);
            }
        });
    },
    methods: {
        getSDateAndEDate(searchForm) {
            let se = getStartDateAndEndDate(new Date(), this.searchForm.dateType, 10)
            this[searchForm].beginDate = se.startDate
            this[searchForm].endDate = se.endDate
        },
        getParam (searchForm) {
            let sendData = {}
            for (let key in this[searchForm]) {
                if (key !== 'hyChild' && key !== 'hyChildName') {
                    sendData[key] = this[searchForm][key]
                }
            }
            if (searchForm === 'searchForm') {
                sendData.heapTypes = this[searchForm].hyChildName === '全部' ? 'all' : this[searchForm].hyChildName
            }
            sendData.beginDate = sendData.beginDate.replace(/-/g, '')
            sendData.endDate = sendData.endDate.replace(/-/g, '')
            return sendData
        },
        getChart () {
            this.getSChart1()
            this.getSChart2()
        },
        getSChart1 () {
            let param = this.getParam('searchForm')
            this.$axios.post('/dashboard/hyAndKycData/query',qs.stringify(param)).then(res => {
                if(res.data.code * 1 == 200){
                    let result = res.data.data
                    let titles = this.titleList
                    // 初始化收单毛利商户数统计
                    for (let i=1; i <= titles.length; i++) {
                        this['chart' + i] = null
                        if (i === 1) {
                            window['option' + i] = this.initOption(['亿元/万元', '商户数(个)'], titles[i - 1])
                        }
                        if (i === 2 ||　i === 3 || i === 5) {
                            window['option' + i] = this.initOption(['%', ''], titles[i - 1])
                        }
                        if (i === 4) {
                            window['option' + i] = this.initOption(['亿元', '万元'], titles[i - 1])
                        }
                        if (i === 6 || i === 7) {
                            window['option' + i] = this.initOption(['投诉数(个)', ''], titles[i - 1])
                        }
                    }
                    this.drawChart(result.receiptMap, 'chart1', window.option1, 'bar', true)
                    this.drawChart(result.receiptRateMap, 'chart2', window.option2, 'bar', true)
                    this.drawChart(result.millionMap, 'chart3', window.option3, 'line', false)
                    this.drawChart(result.dayReceiptMap, 'chart4', window.option4, 'bar', true)
                    this.drawChart(result.complaintRateMap, 'chart5', window.option5, 'line', false)
                    this.drawChart(result.complaintCountMap, 'chart6', window.option6, 'bar', true)
                    this.drawChart(result.complaintSourceMap, 'chart7', window.option7, 'bar', true)
                }
            })
        },
        getSChart2 () {
            let param = this.getParam('searchForm2')
            this.$axios.post('/dashboard/basicData/query',qs.stringify(param)).then(res => {
                if(res.data.code * 1 == 200){
                    let result = res.data.data
                    let titles = this.titleList2
                    // 初始化收单毛利商户数统计
                    for (let i=1; i <= titles.length; i++) {
                        this['chart2' + i] = null
                        if (i === 1) {
                            window['option2' + i] = this.initOption(['亿元/万元', '商户数(个)'], titles[i - 1])
                        }
                        if (i === 2 ||　i === 3 || i === 5) {
                            window['option2' + i] = this.initOption(['%', ''], titles[i - 1])
                        }
                        if (i === 4) {
                            window['option2' + i] = this.initOption(['亿元', '万元'], titles[i - 1])
                        }
                        if (i === 6 || i === 7) {
                            window['option2' + i] = this.initOption(['投诉数(个)', ''], titles[i - 1])
                        }
                    }
                    this.drawChart(result.receiptMap, 'chart21', window.option21, 'bar', true)
                    this.drawChart(result.receiptRateMap, 'chart22', window.option22, 'bar', true)
                    this.drawChart(result.millionMap, 'chart23', window.option23, 'line', false)
                    this.drawChart(result.dayReceiptMap, 'chart24', window.option24, 'bar', true)
                    this.drawChart(result.complaintRateMap, 'chart25', window.option25, 'line', false)
                }
            })
        },
        hySelectedTag(item) {
            this.commonSelectChange(item, 'hyChild', 'hyIds')
        },
        commonSelectChange(item, tag, tagArr){
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
                    this.searchForm[tag + 'Name'] = KYC.ALL_NAME
                } else if (filterName.indexOf(KYC.NORMAL_NAME) >= 0) {
                    this.searchForm[tag + 'Name'] = filterName.replace(KYC.NORMAL_NAME + ',', '')
                } else  if (filterName.indexOf(KYC.RISK_NAME) >= 0) {
                    this.searchForm[tag + 'Name'] = filterName.replace(KYC.RISK_NAME +',', '')
                } else {
                    this.searchForm[tag + 'Name'] = filterName
                }
                
                let filterID = []
                ids.map(one => {
                    if (one !== '') {
                        filterID.push(one)
                    }
                })
                this[tagArr] = filterID
                this.searchForm[tag] = item.checkedKeys
            } else {
                // this.searchForm[tag] = [KYC.ALL]
                // this.searchForm[tag + 'Name'] = KYC.ALL_NAME
            }
        },
        commonChart(id, chart, option){
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
        initOption (yTtile, title) {
            return {
                title : {
                    text: title,
                    x: 'center',
                    textStyle: {
                        color: '#409EFF',
                        fontSize: '14px',
                        fontWeight: 'normal'
                    }
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
        },
        drawChart(result, idChart, option, type, isStack) {
            let serviceList = []
            for (let key in result) {
                if (key === 'times') {
                    option.xAxis[0].data = result[key] //时间
                } else {
                    if(typeof result[key] === 'undefined' || JSON.stringify(result[key]) == "{}"){
                        option.xAxis[0].data = []//时间
                        option.series = [{
                            symbol: "none",
                            name: '',
                            type: 'line',
                            data: []
                        }]
                        this.commonChart(idChart, idChart, option)
                    } else {
                        let k = 0
                        for (let childKey in result[key]) {
                            let two = {
                                symbol: "none",// 去掉折线上面的小圆点
                                name:  childKey,
                                type: type,
                                itemStyle:{
                                    normal:{
                                        color:color[k]  //改变珠子颜色
                                    }
                                },
                                data: this.dostr(result[key][childKey])
                            }
                            if (isStack) {
                                two.stack = key
                            }
                            serviceList.push(two)
                            k++
                        }
                        option.series = serviceList
                        this.commonChart(idChart, idChart, option)
                    }
                }

            }
        }
    }
}
let color= ['#E0CDD1','#FBEBDC','#788A72','#C8B8A9','#D6D4C8','#F2EEED','#B7C6B3','#A47C7C','#C2C8D8','#7A7385','#E0CDD3','#B3B1A4','#A0A5BB','#D7C9AF']
</script>
<style>
.d-box{
    margin: 10px 0 5px;
}
</style>
