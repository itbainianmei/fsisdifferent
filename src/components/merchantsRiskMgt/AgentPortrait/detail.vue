<!--非Epos交易查询detail-->
<template>
    <div class="detail-box">
        <el-row>
            <el-col :span="24">
                <el-card class="box-card" shadow="never">
                    <div slot="header" class="clear">
                        <h3>代理商基本信息</h3> 
                        <el-button class="btn" size="mini" @click="remarkDialog = true">备注</el-button>
                    </div>
                    <el-row :gutter="10">
                        <el-col :span="7" style="border-right: 1px solid rgb(219,219,219)">
                            <table  class="table-info-box" cellspacing="0" cellpadding="0"> 
                                <tr>
                                    <td>代理商编号:</td>
                                    <td>{{dataInfo.agencyNo}}</td>
                                </tr>
                                <tr>
                                    <td>代理商名称:</td>
                                    <td>{{dataInfo.agencyName}}</td>
                                </tr>
                                <tr>
                                    <td>代理商入网日期:</td>
                                    <td>{{dataInfo.accessTime}}</td>
                                </tr>
                                <tr>
                                    <td>分公司:</td>
                                    <td>{{dataInfo.branchCompany}}</td>
                                </tr>
                            </table>
                        </el-col>
                        <el-col :span="7" style="border-right: 1px solid rgb(219,219,219)">
                            <table class="table-info-box" cellspacing="0" cellpadding="0"> 
                                <tr>
                                    <td>销售:</td>
                                    <td>{{dataInfo.sales}}</td>
                                </tr>
                                <tr>
                                    <td>行业业绩属性:</td>
                                    <td>{{dataInfo.industryAttribute}}</td>
                                </tr>
                                <tr>
                                    <td>名下商户数:</td>
                                    <td>{{dataInfo.merchantCount}}</td>
                                </tr>
                                <tr>
                                    <td>代理商自然属性一级:</td>
                                    <td>{{dataInfo.agencyAttribute}}</td>
                                </tr>
                            </table>
                        </el-col>
                        <el-col :span="10">
                            <table class="table-info-box" cellspacing="0" cellpadding="0"> 
                                <tr>
                                    <td style="width: 15%;min-width:50px">备注:</td>
                                    <td style="line-height:20px">
                                        <div style="overflow-y:auto;height:130px">{{dataInfo.remark.join(',')}}</div></td>
                                </tr>
                            </table>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-card class="box-card" shadow="never">
                    <div slot="header" class="clear">
                        <h3>商户交易毛利欺诈情况</h3> 
                    </div>
                    <div class="chart-btn">
                       <span class="active time" @click='getChartData("myChart1","day",14,  $event)'>近14天</span>
                        <span class="time" @click='getChartData("myChart1","week",8,  $event)'>近8周</span>
                        <span class="time" @click='getChartData("myChart1","month", 6,  $event)'>近6个月</span>
                    </div>
                    <span class="ts-box" v-show="tsObj.length" style="top: 70px;right: 0">
                        友情提示:&nbsp;&nbsp;
                        <span v-for="(item, k) in tsObj" :key="k * 20"><i>柱子{{k + 1}}</i>: {{item}}&nbsp; &nbsp;</span>
                    </span>
                    <div id="myChart1" class="center" :style="{width: '100%', height: '350px'}"></div>
                </el-card>
            </el-col>
        </el-row>
         <el-row :gutter="10">
            <el-col :span="12">
                <el-card class="box-card" shadow="never">
                    <div slot="header" class="clear">
                        <h3>商户情况</h3> 
                    </div>
                    <div class="chart-btn">
                        <span class="active time" @click='getChartData("myChart2","day",14, $event)'>近14天</span>
                        <span class="time" @click='getChartData("myChart2","week",8,  $event)'>近8周</span>
                        <span class="time" @click='getChartData("myChart2","month",6,  $event)'>近6个月</span>
                    </div>
                    <div id="myChart2" class="center" :style="{width: '100%', height: '280px'}"></div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card class="box-card" shadow="never">
                    <div slot="header" class="clear">
                        <h3>商户投诉情况</h3> 
                    </div>
                    <div class="chart-btn">
                        <span class="active time" @click='getChartData("myChart3","day",14,  $event)'>近14天</span>
                        <span class="time" @click='getChartData("myChart3","week",8,  $event)'>近8周</span>
                        <span class="time" @click='getChartData("myChart3","month",6,  $event)'>近6个月</span>
                    </div>
                    <div id="myChart3" class="center" :style="{width: '100%', height: '280px'}"></div>
                </el-card>
            </el-col>
        </el-row>
        <!-- 图表 -->
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
import {COLORS} from '@/constants'
import {formatterChartDialog} from "@/components/utils";
let color = COLORS
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
            tsObj: []
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
                    title.push('商户投诉率(金额)')
                    title.push('商户投诉率(笔数)')
                    title.push('投诉商户占比')
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
                option.series = [{
                    symbol: "none",
                    name: '',
                    type: 'line',
                    data: []
                }]
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
                            let option1 = this.initOption(['亿元/万元', '欺诈BP(0.01BP)'], 'item', id, ['0.01BP', ''])
                            this.getChartAndData(result, 'data', option1, id);
                        break;
                        case 'myChart2':
                            let option2 = this.initOption(['商户数（个）', ''], 'axis', id, ['个', ''], day)
                            this.getChartAndData(result, 'data', option2, id);
                        break;
                        case 'myChart3':
                            let option3 = this.initOption(['%', ''], 'axis', id, ['%'], day)
                            this.getChartAndData(result, 'data', option3, id);
                        break;
                    }
                }
            })
        },
        getChart1(result){
            let serviceList = []
            let title = []
            this.tsObj = []
            for (let item in result.data) {
                if (item !== 'times' && item !== 'fraudRateList') {
                    let name = ''
                    let type = 'bar'
                    if (item === 'receiptAmountList') {
                        name = '成功收单交易金额(亿元)'
                    }
                    if (item === 'grossProfitList') {
                        name = '毛利(万元)'
                    }
                    this.tsObj.push(name)
                    if (JSON.stringify(result.data[item]) !== '{}') {
                        let k = 4
                        for(let key in result.data[item]){
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
                                data: this.dostr(result.data[item][key])
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
                } else if (item === 'fraudRateList'){
                    title.push('欺诈损失率')
                    let two = 
                    {
                        name: '欺诈损失率',
                        type: 'line',
                        itemStyle:{
                            normal:{
                                color:color[color.length - 1]  //改变珠子颜色
                            }
                        },
                        yAxisIndex: 1,
                        data: this.dostr(result.data[item]) 
                    }
                    serviceList.push(two)
                }
            }
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
        initOption (yTtile, toolTipType, chart, unit, day) {
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
                        rotate: day * 1 === 14 ? 50 : 30,
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
