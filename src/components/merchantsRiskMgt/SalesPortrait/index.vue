<!--非Epos交易查询detail-->
<template>
    <div class="detail-box">
        <!-- 各种table 开始 -->
        <div class="fs18 ">
            <h3 class="dis-inline fs18">销售基本信息
            </h3>
        </div>
        <table class="base-box" cellspacing="0" cellpadding="0" style="width:100%;"> 
            <tr>
                <td  class="bgf5" style="min-width:100px;">销售</td>
                <td style="min-width:100px;">{{dataInfo.saleName}}</td>
                <td  class="bgf5" style="min-width:100px;">直属上级</td>
                <td style="min-width:100px;">{{dataInfo.leader}}</td>
                <td  class="bgf5" style="min-width:100px;">分公司</td>
                <td style="min-width:100px;">{{dataInfo.branchCompany}}</td>
                <td class="bgf5" style="min-width:100px;">入职日期</td>
                <td style="min-width:100px;">{{dataInfo.entryDateStr}}</td>
                  <td class="bgf5" style="min-width:100px;">名下商户数</td>
                <td style="min-width:100px;">{{dataInfo.customerCount}}</td>
            </tr>
            <tr>
                <td class="bgf5" style="min-width:100px;">失信次数</td>
                <td style="min-width:100px;">{{dataInfo.loseCreditCount}}</td>
                <td class="bgf5" style="min-width:100px;">特批商户数</td>
                <td style="min-width:100px;">{{dataInfo.orderNo}}</td>
                <td class="bgf5" style="min-width:100px;">特批商户数占比</td>
                <td style="min-width:100px;">{{dataInfo.approvedCustomerRate}}</td>
                <td class="bgf5" style="min-width:100px;">月活商户数</td>
                <td style="min-width:100px;">{{dataInfo.monthActiveCustomerCount}}</td>
                 <td class="bgf5" style="min-width:100px;">风险商户数</td>
                <td style="min-width:100px;">{{dataInfo.riskCustomerCount}}</td>
            </tr>
        </table>
        <!-- end -->
        <div class="fs18 mt30">
            <h3 class="dis-inline fs18">销售评级详情</h3>
        </div>
        <el-table
            border
            :data="gradeList"
            style="width: 100%">
            <template v-for="item in gradeTableHead">
                <el-table-column :type="item.type" :key="item.id" :label="item.label" :prop="item.prop" align="center"></el-table-column>
            </template>
        </el-table>
        <!-- 图表 -->
        <div class="mt20 mb30 w clear">
            <div class="fl" style="width:44%;margin-left:1%;position:relative">
                <h3 class="dis-inline fs18 ml30" style="background:#409EFF;color:white;padding:5px 10px;">名下商户情况</h3> 
                <div class="mb20 ml30">
                    <span class="active time mr30" @click='clickChart("day", 14,  $event)'>近14天</span>
                    <span class="time mr30" @click='clickChart("week", 8,  $event)'>近8周</span>
                    <span class="time" @click='clickChart("month", 6,  $event)'>近6个月</span>
                </div>
                <span class="ts-box" v-show="tsObj.length" style="top: 70px;right: 0">
                    友情提示:&nbsp;&nbsp;
                    <span v-for="(item, k) in tsObj" :key="k * 20"><i>柱子{{k + 1}}</i>: {{item}}&nbsp; &nbsp;</span>
                </span>
                <div id="barChart" :style="{width: '100%', height: '280px'}"></div>
            </div>
        </div> 
    </div>
</template>
<script>
import qs from 'qs';
import {SALES_GRADE_TABLE_HEAD, COLORS} from '@/constants';
import echarts from 'echarts';
import {formatterChartDialog} from "@/components/utils";
let color = COLORS
export default {
    data(){
        return{
            idList:[],//表格中选中的行idlist
            dataInfo:{},//商户基本信息
            expandshhcdqk:[],
            expandshyqxx:[],
            expandshktcp:[],
            expandshtsqk:[],
            gradeList: [],
            gradeTableHead: SALES_GRADE_TABLE_HEAD,
            tsObj: []
        }
    },
    mounted(){  
        //取详情列表
        this.getDetail();
        this.$nextTick(function () {
            let that = this;
            let resizeTimer = null;
            window.onresize = function () {
                if (resizeTimer) clearTimeout(resizeTimer);
                resizeTimer = setTimeout(function () {
                    that.drawChart('barChart', 'barChart', that.barOption)
                }, 300);
            }
        });
    },
    methods:{
        getDetail() {
            this.$axios.post("/SalePortraitController/querySaleBySaleId",
                qs.stringify({
                    saleId: this.$route.params.id,
                    saleName: this.$route.params.name
                })
            ).then(res => {
                this.dataInfo = res.data.data.baseInfo
                this.gradeList.push(res.data.data.saleLevel)
                this.getChart("day",14)
            });
        },
        clickActive(targ){
            Array.from(targ.parentNode.children).map(function(ele){
            ele.classList.remove('active')
            })
        },
        clickChart(flag, day, targ){
            var otarg = targ.target
            this.clickActive(otarg)
            otarg.classList.add('active')
            this.getChart(flag, day)
        },
        getOption(result){
            let serviceList = []
            let title = []
            this.tsObj = []
            for (let item in result) {
                if (item !== 'times' && item !== 'returnList' && item.indexOf('_name') < 0) {
                    let name = ''
                    let type = 'bar'
                    if (item === 'Money') {
                        name = '交易金额(亿元)'
                    }
                    if (item === 'Profit') {
                        name = '毛利(万元)'
                    }
                    this.tsObj.push(name)
                    let k = 0
                    if (JSON.stringify(result[item]) !== '{}') {
                        for(let key in result[item]){
                            let two = 
                            {
                                name: (name === '' ? '' : name + '-') + key,
                                type: type,
                                stack: item,
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
                            symbol: "none",// 去掉折线上面的小圆点
                            name: '',
                            type: 'bar',
                            data: []
                        }
                        serviceList.push(two)
                    }
                } else if (item === 'returnList'){
                    let i = color.length - 1
                    for (let key in result[item]) {
                        let name = '欺诈损失率'
                        if (key === 'merchantComplaintsRate') {
                            name = '投诉商户占比'
                        }
                        title.push(name)
                        let two = 
                        {
                            name: name,
                            type: 'line',
                            itemStyle:{
                                normal:{
                                    color:color[i]  //改变珠子颜色
                                }
                            },
                            yAxisIndex: 1,
                            data: this.dostr(result[item][key]) 
                        }
                        serviceList.push(two)
                        i--
                    }
                }
            }
            return {
                serviceList: serviceList,
                title: title
            }
        },
        getChart (flag, day){
            let param = {
                saleId: this.$route.params.id,
                dateType: flag,
                dateCount: day
            }
            this.$axios.post('/SalePortraitController/getCustomerChart',qs.stringify(param)).then(res => {
                let response = res.data
                if(response.code * 1 == 200){
                    this.barOption = this.initOption(['亿元/万元', '欺诈BP(0.01BP)'], 'item', 'barChart', ['%', ''])
                    if(JSON.stringify(response.data) == "{}"){
                        this.barOption.xAxis[0].data = []//时间
                        this.barOption.series[0].data =[] // 
                        this.barOption.series[1].data = [] // 
                        this.drawChart('barChart', 'barChart', this.barOption)
                        return false
                    }
                    let chartObj = this.getOption(response.data)
                    this.barOption.series = chartObj.serviceList
                    this.barOption.legend.data = [...new Set(chartObj.title)]
                    this.barOption.xAxis[0].data = response.data.times
                    this.drawChart('barChart', 'barChart', this.barOption)
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
        },
        cancelDialog(){
            this.remark = ""
            this.remarkDialog = false
        },
        submitForm () {
            this.$axios.post( "/ProtraitAgency/addRemark",
                qs.stringify({
                    agencyNo: this.$route.params.id,
                    remark: this.form.remark
                })
            ).then(res => {
                this.getDetail()
            });
        },
        initOption (yTtile, toolTipType, chart, unit) {
            const _this = this
            return {
                title : {
                    text: '',
                    x: 'center'
                },
                tooltip: {
                    trigger: toolTipType,
                    textStyle: {
                        fontSize: 12
                    },
                    formatter: function (params, ticket, callback) {
                        return formatterChartDialog(toolTipType, params, _this[chart], unit)
                    },
                    position: function (point, params, dom, rect, size) {
                        return [point[0], point[1] + 40];
                    }
                },
                toolbox: {
                    show : true,
                    feature : {
                        saveAsImage : {show: true}
                    }
                },
                grid:{
                    x2: 60,
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
<style lang="less">
    @import '../less/style.less';
</style>
