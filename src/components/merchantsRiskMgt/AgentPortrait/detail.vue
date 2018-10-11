<!--非Epos交易查询detail-->
<template>
    <div class="detail-box">
        <!-- 各种table 开始 -->
        <div class="fs18 ">
            <h3 class="dis-inline fs18">代理商基本信息
                <el-button  size="mini"
                    @click="remarkDialog = true">备注</el-button>
            </h3>
        </div>
        <table  class="base-box" cellspacing="0" cellpadding="0" style="width:100%;"> 
            <tr>
                <td  class="bgf5" style="min-width:100px;">代理商编号</td>
                <td style="min-width:100px;">{{dataInfo.agencyNo}}</td>
                <td  class="bgf5" style="min-width:100px;">代理商名称</td>
                <td style="min-width:100px;">{{dataInfo.agencyName}}</td>
                <td  class="bgf5" style="min-width:100px;">代理商入网日期</td>
                <td style="min-width:100px;">{{dataInfo.industryAttribute}}</td>
                <td class="bgf5" style="min-width:100px;">分公司</td>
                <td style="min-width:100px;">{{dataInfo.branchCompany}}</td>
            </tr>
            <tr>
                <td class="bgf5" style="min-width:100px;">销售</td>
                <td style="min-width:100px;">{{dataInfo.sales}}</td>
                <td class="bgf5" style="min-width:100px;">行业业绩属性</td>
                <td style="min-width:100px;">{{dataInfo.industryAttribute}}</td>
                <td class="bgf5" style="min-width:100px;">名下商户数</td>
                <td style="min-width:100px;">{{dataInfo.merchantCount}}</td>
                <td class="bgf5" style="min-width:100px;">代理商自然属性一级</td>
                <td style="min-width:100px;">{{dataInfo.agencyAttribute}}</td>
            </tr>
                <tr>
                <td class="bgf5" style="min-width:100px;">备注</td>
                <td colspan="7">
                    {{dataInfo.remark.join(',')}}
                </td>
            </tr>
        </table>
        <!-- end -->
        <!-- 图表 -->
        <div class="mt20 mb30 w clear">
            <div class="fl" style="width:44%;margin-left:1%;">
                <h3 class="dis-inline fs18 ml30" style="background:#409EFF;color:white;padding:5px 10px;">商户交易毛利欺诈情况</h3> 
                <div class="mb20 ml30">
                    <span class="active time mr30" @click='getChartData("myChart1","day",14,  $event)'>近14天</span>
                    <span class="time mr30" @click='getChartData("myChart1","week",8,  $event)'>近8周</span>
                    <span class="time" @click='getChartData("myChart1","month", 6,  $event)'>近6个月</span>
                </div>
                <div id="myChart1" class="center" :style="{width: '100%', height: '280px'}"></div>
            </div>
            <div class="fl" style="width:26%;margin-left:1%;">
                <h3 class="dis-inline fs18 ml30" style="background:#409EFF;color:white;padding:5px 10px;">商户情况</h3> 
                <div class="mb20 ml30">
                    <span class="active time mr30" @click='getChartData("myChart2","day",14, $event)'>近14天</span>
                    <span class="time mr30" @click='getChartData("myChart2","week",8,  $event)'>近8周</span>
                    <span class="time" @click='getChartData("myChart2","month",6,  $event)'>近6个月</span>
                </div>
                <div id="myChart2" class="center" :style="{width: '100%', height: '280px'}"></div>
            </div> 
            <div class="fl" style="width:26%;margin-left:1%;margin-right:1%;">
                <h3 class="dis-inline fs18 ml30" style="background:#409EFF;color:white;padding:5px 10px;">商户投诉情况</h3> 
                <div class="mb20 ml30">
                    <span class="active time mr30" @click='getChartData("myChart3","day",14,  $event)'>近14天</span>
                    <span class="time mr30" @click='getChartData("myChart3","week",8,  $event)'>近8周</span>
                    <span class="time" @click='getChartData("myChart3","month",6,  $event)'>近6个月</span>
                </div>
                <div id="myChart3" class="center" :style="{width: '100%', height: '280px'}"></div>
            </div> 
        </div> 
        <el-dialog title="添加备注" :visible.sync="remarkDialog" width="35%" v-dialogDrag >
            <el-form ref="form" :model="form" :rules="rules"  class="demo-ruleForm" :label-position="'right'" label-width="100px"  style="margin-left:13%;">
                <el-form-item label="备注:" prop="remark">
                    <el-input clearable type="textarea" :maxlength="200" placeholder="最长长度不能超过200位" v-model="form.remark" style="width: 74%"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
            <el-button @click="cancelDialog">取 消</el-button>
            <el-button type="primary" @click="submitForm('form')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import qs from 'qs';
import echarts from 'echarts';
export default {
    data(){
        return{
            idList:[],//表格中选中的行idlist
            dataInfo:{
                remark: []
            },
            remarkDialog: false,
            form: {
                remark: ""
            },
            rules: {
                remark: [
                    { required: true, message: "备注不能为空", trigger: "blur" },
                    { max: 200, min: 0, message: " ", trigger: "blur" }]
            },
        }
    },
    mounted(){  
        //取详情列表
        this.getDetail();
        this.getChartData('myChart1', 'day', 14)
        this.getChartData('myChart2', 'day', 14)
        this.getChartData('myChart3', 'day', 14)
    },
    methods:{
        getDetail() {
            this.$axios.post( "/ProtraitAgency/findDetail",
                qs.stringify({
                    agencyNo: this.$route.params.id
                })
            ).then(res => {
                this.dataInfo = res.data.data.agencyModel
            });
        },
        clickActive(targ){
            Array.from(targ.parentNode.children).map(function(ele){
                ele.classList.remove('active')
            })
        },
        getChartData(id, flag, day, targ){
            if (typeof targ !== 'undefined') {
                let otarg = targ.target
                this.clickActive(otarg)
                otarg.classList.add('active')
            }
            switch(id){
                case 'myChart1':
                    this.fetchChart(id, flag, day, '/ProtraitAgency/queryBussiness')
                break;
                case 'myChart2':
                this.fetchChart(id, flag, day, '/ProtraitAgency/queryMerchant')
                break;
                case 'myChart3':
                this.fetchChart(id, flag, day, '/ProtraitAgency/querySomplaint')
                break;
            }
        },
        getChartAndData (result, chartName, option, modelChartName) {
            if(typeof result[chartName] !== 'undefined'){
                option.xAxis[0].data = result[chartName].times 
                let serviceList = []
                let title = []
                if (modelChartName === 'myChart1') {
                    let chartObj = this.getChart1(result, chartName)
                    serviceList = chartObj.serviceList
                    title = chartObj.title
                }
                if (modelChartName === 'myChart2') {
                    title.push('新增子商户数')
                    title.push('活跃子商户数')
                    serviceList.push(
                        {
                            symbol: "none",
                            name:'活跃子商户数',
                            type:'line',
                            data: this.dostr(result[chartName].activeList) 
                        },
                        {
                            symbol: "none",
                            name:'新增子商户数',
                            type:'line',
                            data: this.dostr(result[chartName].addedList) 
                        }
                    )
                }
                if (modelChartName === 'myChart3') {
                    title.push('投诉商户占比')
                    title.push('商户投诉率(笔数)')
                    title.push('商户投诉率(金额)')
                    serviceList.push(
                        {
                            symbol: "none",
                            name:'商户投诉率(笔数)',
                            type:'line',
                            data: this.dostr(result[chartName].complainCount) 
                        },
                        {
                            symbol: "none",
                            name:'商户投诉率(金额)',
                            type:'line',
                            data: this.dostr(result[chartName].complainMoney) 
                        },
                        {
                            symbol: "none",
                            name:'投诉商户占比',
                            type:'line',
                            data: this.dostr(result[chartName].complainRate) 
                        }
                    )
                }
                option.series = serviceList
                option.legend.data = [...new Set(title)]
                this.drawChart(modelChartName, modelChartName, option)
            } else {
                option.xAxis[0].data = []//时间
                option.series[0].data =[] // 
                option.series[1].data = [] // 
                this.drawChart(modelChartName, modelChartName, option)
            }
        },
        fetchChart(id, flag, day, url){
            let param = {
                agencyNo: this.$route.params.id,
                dateType: flag,
                dateCount: day
            }
            this.$axios.post(url,qs.stringify(param)).then(res => {
                if(res.data.code * 1 == 200){
                    let result = res.data
                    switch(id){
                        case 'myChart1':
                            let option1 = this.initOption(['亿元/万元', '欺诈BP(0.01BP)'], 'item', id)
                            this.getChartAndData(result, 'data', option1, id);
                        break;
                        case 'myChart2':
                            let option2 = this.initOption(['商户数（个）'], 'axis', id)
                            this.getChartAndData(result, 'data', option2, id);
                        break;
                        case 'myChart3':
                            let option3 = this.initOption(['%'], 'axis', id)
                            this.getChartAndData(result, 'data', option3, id);
                        break;
                    }
                }
            })
        },
        getChart1(result, chartName){
            let serviceList = []
            let title = []
            let k = 0
            title.push('左侧柱子:毛利')
            for (let key in result[chartName].grossProfitList) {
                let two = 
                {
                    symbol: "none",// 去掉折线上面的小圆点
                    name: '毛利-' + key,
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
           
            let i = 0
            title.push('右侧柱子:成功收单交易金额')
            for (let key in result[chartName].receiptAmountList) {
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
            title.push('欺诈损失率')
            serviceList.push(
                {
                    name:'欺诈损失率',
                    type:'line',
                    yAxisIndex: 1,
                    data: this.dostr(result[chartName].fraudRateList) 
                }
            )
            return {
                serviceList: serviceList,
                title: title
            }
        },
        drawChart(id, chart, option){
            // 基于准备好的dom，初始化echarts实例
            let _this = this
            this[chart] = this.$echarts.init(document.getElementById(id))
            // 绘制图表
            this[chart].clear()
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
            this.form.remark = ""
            this.remarkDialog = false
        },
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.$axios.post( "/ProtraitAgency/addRemark",
                        qs.stringify({
                            agencyNo: this.$route.params.id,
                            remark: this.form.remark
                        })
                    ).then(res => {
                        this.cancelDialog()
                        this.getDetail()
                    });
                }
            });
        },
        initOption (yTtile, toolTipType, chart) {
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
                        let arrLineStr = ''
                        if (toolTipType === 'item') {
                            let currDataIndex = params.dataIndex
                            _this[chart]._option.series.map(one => {
                                if (typeof one.stack === 'undefined' && one.type === 'line') {
                                    arrLineStr = arrLineStr +  one.name  + '：' + one.data[currDataIndex] + 'BP' + '<br/>';
                                }
                            })
                            if (arrLineStr.indexOf(params.seriesName + '：' + params.value) < 0) {
                                arrLineStr = params.seriesName + '：' + params.value + '<br/>' + arrLineStr;
                            } else {
                                arrLineStr =  arrLineStr;
                            }
                        } else if (toolTipType === 'axis') {
                            params.map(one => {
                                if (chart === 'myChart3') {
                                    arrLineStr = arrLineStr +  one.seriesName  + '：' + (one.value * 100) + '%' + '<br/>';
                                } else {
                                    arrLineStr = arrLineStr +  one.seriesName  + '：' + one.value + '<br/>';
                                }
                            })
                        }
                        return arrLineStr
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

let color= ['#E0CDD1','#FBEBDC','#788A72','#C8B8A9','#D6D4C8','#F2EEED','#B7C6B3','#A47C7C','#C2C8D8','#7A7385','#E0CDD3','#B3B1A4','#A0A5BB','#D7C9AF']
</script>
<style lang="less">
    @import '../less/style.less';
</style>
