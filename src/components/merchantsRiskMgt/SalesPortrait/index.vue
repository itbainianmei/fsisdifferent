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
                <td style="min-width:100px;">{{dataInfo.entryDate}}</td>
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
            <div class="fl" style="width:44%;margin-left:1%;">
                <h3 class="dis-inline fs18 ml30" style="background:#409EFF;color:white;padding:5px 10px;">名下商户情况</h3> 
                <div class="mb20 ml30">
                    <span class="active time mr30" @click='clickChart("day", 14,  $event)'>近14天</span>
                    <span class="time mr30" @click='clickChart("week", 8,  $event)'>近8周</span>
                    <span class="time" @click='clickChart("month", 6,  $event)'>近6个月</span>
                </div>
                <div id="barChart" :style="{width: '100%', height: '280px'}"></div>
            </div>
        </div> 
    </div>
</template>
<script>
import qs from 'qs';
import {SALES_GRADE_TABLE_HEAD} from '@/constants';
import echarts from 'echarts';
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
            gradeTableHead: SALES_GRADE_TABLE_HEAD
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
                    that.drawChart('barChart', 'barChart', barOption)
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
        getChart (flag, day){
            let param = {
                saleId: this.$route.params.id,
                dateType: flag,
                dateCount: day
            }
            this.$axios.post('/SalePortraitController/getCustomerChart',qs.stringify(param)).then(res => {
                let response = res.data
                if(response.code * 1 == 200){
                    if(JSON.stringify(response.data) == "{}"){
                        barOption.xAxis[0].data = []//时间
                        barOption.series[0].data =[] // 
                        barOption.series[1].data = [] // 
                        this.drawChart('barChart', 'barChart', barOption)
                        return false
                    }
                    let serviceList = []
                    let title = []
                    if (JSON.stringify(response.data.Money)  !== "{}") {
                        let k = 0
                        for (let key in response.data.Money) {
                            if (title.join(',').indexOf(key + ',') < 0) {
                                title.push(key)
                            }
                            let two = 
                            {
                                symbol: "none",// 去掉折线上面的小圆点
                                name: title.join(',').indexOf(key + ',') < 0 ? '' : key,
                                type: 'bar',
                                stack: 'Money',
                                itemStyle:{
                                    normal:{
                                        color:color[k]  //改变珠子颜色
                                    }
                                },
                                data: this.dostr(response.data.Money[key])
                            }
                            serviceList.push(two)
                            k++
                        }
                    }
                    console.log(title)
                    if (JSON.stringify(response.data.Profit)  !== "{}") {
                        let k = 3
                        for (let key in response.data.Profit) {
                            if (title.join(',').indexOf(key + ',') < 0) {
                                title.push(key)
                            }
                            let two = 
                            {
                                symbol: "none",// 去掉折线上面的小圆点
                                name: title.join(',').indexOf(key + ',') < 0 ? '' : key,
                                type: 'bar',
                                stack: 'Profit',
                                itemStyle:{
                                    normal:{
                                        color:color[k]  //改变珠子颜色
                                    }
                                },
                                data: this.dostr(response.data.Profit[key])
                            }
                            serviceList.push(two)
                            k++
                        }
                    }
                    title.push('欺诈BP(0.01BP)')
                    title.push('投诉商户占比')
                    serviceList.push(
                        {
                            name:'欺诈BP(0.01BP)',
                            type:'line',
                            yAxisIndex: 1,
                            data: this.dostr(response.data.returnList.fraudLossRate) 
                        },
                        {
                            name:'投诉商户占比',
                            type:'line',
                            yAxisIndex: 1,
                            data: this.dostr(response.data.returnList.merchantComplaintsRate) 
                        }
                    )
                    console.log(JSON.stringify(serviceList, null,))
                    barOption.series = serviceList
                    barOption.legend.data = [...new Set(title)]
                    this.drawChart('barChart', 'barChart', barOption)
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
        }
    }
}
let color= ['#E0CDD1','#FBEBDC','#788A72','#C8B8A9','#C8B8A9','#D6D4C8','#F2EEED','#FBE8DA','#FBE8DA','#B7C6B3','#A47C7C','#C2C8D8','#7A7385','#E0CDD3','#B3B1A4','#A0A5BB','#D7C9AF']

let barOption = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            crossStyle: {
                color: '#999'
            }
        },
        formatter:function (params) {
            function addCommas(nStr){  //每三位分隔符
                nStr += '';
                var x = nStr.split('.');
                var x1 = x[0];
                var x2 = x.length > 1 ? '.' + x[1] : '';
                var rgx = /(\d+)(\d{3})/;
                while (rgx.test(x1)) {
                x1 = x1.replace(rgx, '$1' + ',' + '$2');
                }
                return x1 + x2;
            }
            var str0=''
            var str=''
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
        feature: {
            saveAsImage: {show: true}
        }
    },
    legend: {
        data:['交易金额','毛利','欺诈BP(0.01BP)', '投诉商户占比']
    },
    grid:{
        x2:106
    },
    xAxis: [
        {
            splitLine:{show: false},//去除网格线
            type: 'category',
            data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
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
                length: 1,    // 设置x轴上标点显示长度
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
            name: '亿元/万元',
            splitNumber:5,
            axisLabel: {
                formatter: '{value}'
            }
        },
        {
            type: 'value',
            name: '欺诈BP(0.01BP)',
            splitNumber:5,
            axisLabel: {
                formatter: '{value}'
            }
        }
    ],
    series: [
        {
            name:'交易金额',
            type:'bar',
            itemStyle:{
                normal:{
                    color: 'rgb(84,145,246)'  //改变珠子颜色
                }
            },
            data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
        },
        {
            name:'毛利',
            type:'bar',
            itemStyle:{
                normal:{
                    color: 'rgb(211,72,95)'  //改变珠子颜色
                }
            },
            data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
        },
        {
            name:'欺诈BP(0.01BP)',
            type:'line',
            yAxisIndex: 1,
            data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
        }, {
            name:'投诉商户占比',
            type:'line',
            yAxisIndex: 1,
            data:[1.0, 1.2, 1.3,14.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
        }
    ]
};

</script>
<style lang="less">
    @import '../less/style.less';
</style>
