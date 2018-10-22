<template>
    <div>
        <search
            :searchForm="searchForm"
            @searchData="getSChart1"
            @selectedTag="selectedTag"
        >
        </search>
        <div class="d-box">
            <el-row :gutter="5" v-for="i in 4" :key="i" >
                <el-col v-if="i === 1" :span="12" v-for="j in 2" :key="j - 1" style="position:relative">
                    <h5>{{titleList[i + j - 1 - 1]}}</h5>
                    <span class="ts-box" v-show="tsObj['chart' + (i + j - 1)].length">
                        友情提示:&nbsp;&nbsp;
                        <span v-for="(item, k) in tsObj['chart' + (i + j - 1)]" :key="k * 20"><i>柱子{{k + 1}}</i>: {{item}}&nbsp; &nbsp;</span>
                    </span>
                    <div style="z-index: 0;position:relative" :id="'chart' + (i + j - 1)" :style="{width: '100%', height: '280px', 'margin': '0 auto'}"></div>
                    <i @click="settingAction(i + j - 1)" v-show="onFetchIcon" style="color:#409EFF;z-index: 1;" class="el-icon-edit-outline"></i>
                </el-col>
                <el-col v-if="i === 2" :span="12" v-for="j in 2" :key="j" style="position:relative"  :style="i + j === 4 ? 'z-index: 2000': 'z-index:0'">
                    <h5>{{titleList[i + j - 1]}}</h5>
                    <span class="ts-box" v-if="i + j === 3"  v-show="tsObj['chart' + (i + j)].length">
                        友情提示:&nbsp;&nbsp;
                        <span v-for="(item, k) in tsObj['chart' + (i + j)]" :key="k * 20"><i>柱子{{k + 1}}</i>: {{item}}&nbsp; &nbsp;</span>
                    </span>
                    <div style="z-index: 0;position:relative" :id="'chart' + (i + j)" :style="{width: '100%', height: '280px', 'margin': '0 auto'}"></div>
                    <i @click="settingAction(i + j)" v-show="onFetchIcon" style="color:#409EFF;z-index: 1;" class="el-icon-edit-outline" v-if="i + j === 3"></i>
                </el-col>
                <el-col v-if="i === 3" :span="12" v-for="j in 2" :key="j + 1" style="position:relative" :style="i + j + 1 === 6 ? 'z-index: 1999': 'z-index:0'">
                    <h5>{{titleList[i + j + 1 - 1]}}</h5>
                    <span class="ts-box" v-if="i + j + 1 === 5"  v-show="tsObj['chart' + (i + j + 1)].length">
                        友情提示:&nbsp;&nbsp;
                        <span v-for="(item, k) in tsObj['chart' + (i + j + 1)]" :key="k * 20"><i>柱子{{k + 1}}</i>: {{item}}&nbsp; &nbsp;</span>
                    </span>
                    <div style="z-index: 0;position:relative" :id="'chart' + (i + j + 1)" :style="{width: '100%', height: '280px', 'margin': '0 auto'}"></div>
                </el-col>
                <el-col v-if="i === 4" :span="12" v-for="j in 2" :key="j + 2" style="position:relative">
                    <h5>{{titleList[i + j + 2 - 1]}}</h5>
                    <span class="ts-box" v-if="i + j + 2 === 7"  v-show="tsObj['chart' + (i + j + 2)].length">
                        友情提示:&nbsp;&nbsp;
                        <span v-for="(item, k) in tsObj['chart' + (i + j + 2)]" :key="k * 20"><i>柱子{{k + 1}}</i>: {{item}}&nbsp; &nbsp;</span>
                    </span>
                    <div style="z-index: 0;position:relative" :id="'chart' + (i + j + 2)" :style="{width: '100%', height: '280px', 'margin': '0 auto'}"></div>
                </el-col>
            </el-row>
        </div>
        <el-dialog :title="dialogForm.title" width="30%" :visible.sync="isSetting" v-dialogDrag >
            <el-form class="form-d-box" ref="tagsForm" :model="tagsForm" :label-position="'right'" label-width="135px"  style="margin-left:13%;">
                <el-form-item :label="item + ':'" prop="type"  v-for="(item , i) in headList" :key="i">
                    <el-input value="number" style="width: 50%;height: 25px;" clearable placeholder="请输入" class="listValInp" v-model="tagsForm['input' + (i + 1)]">
                        <!-- <i v-if="dialogForm.chartID * 1 === 2" slot="suffix" style="margin-right: 10px">%</i> -->
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="closeDialog()">关 闭</el-button>
                <el-button type="primary" @click="submitDialogForm()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import qs from "qs";
import search from './Partial/search.vue';
import {KYC, COLORS} from '@/constants'
import {getStartDateAndEndDate, formatterChartDialog, specialFormatChart} from "@/components/utils";
import echarts from 'echarts';
let color = COLORS
export default {
    name: '高级查询',
    components: {
        search
    },
    data () {
        return {
            searchForm:{
                dateType: "day",
                beginDate: "",
                endDate: "",
                source: 'all',
                cType: 'kyc',
                branchName: '',
                customerNumber: '',
                customerSign: '',
                childTag: [KYC.ALL],
                childTagName: KYC.ALL_NAME
            },
            ids: [],
            titleList: ['收单毛利商户数统计', '收单毛利商户数占比统计', '日均收单毛利水平', '万元毛利水平', '投诉商户数统计', '商户投诉率统计', '投诉商户来源统计', 'KYC模型识别率'],
            dialogForm: {
                title: '',
                itemTit: '',
                type: '商户KYC',
                chartID: ''
            },
            onFetchIcon: false,
            isSetting: false,
            settingObj: {},
            headList: [],
            tagsForm: {},
            tsObj: {},
        }
    },
    created() {
        for (let i=1; i <= this.titleList.length; i++) {
            this.tsObj['chart' + i] = []
        }
        this.getSDateAndEDate('searchForm')
        this.getChart()
    },
    mounted() {
        this.$nextTick(function () {
            let that = this;
            let resizeTimer = null;
            window.onresize = function () {
                if (resizeTimer) clearTimeout(resizeTimer);
                resizeTimer = setTimeout(function () {
                    that.onFetchIcon = false
                    for(let i = 1; i <= that.titleList.length; i++) {
                        that.commonChart('chart' + i, 'chart' + i, that['option' + i])
                    }
                }, 300);
            }
        });
    },
    methods: {
        settingAction (i) {
            switch(i){
                case 1:
                    this.dialogForm.title = "商户日收单交易金额目标值配置"
                    this.dialogForm.itemTit = "收单交易金额(亿元)"
                    this.dialogForm.chartID = i
                    this.getSetingVal()
                break
                case 2:
                    this.dialogForm.title = "商户日收单交易金额占比目标值配置"
                    this.dialogForm.itemTit = "收单交易金额"
                    this.dialogForm.chartID = i
                    this.getSetingVal()
                break
                case 4:
                    this.dialogForm.title = "商户日均收单交易金额目标配置值"
                    this.dialogForm.itemTit = "收单交易金额(亿元)"
                    this.dialogForm.chartID = i
                    this.getSetingVal()
                break
            }
        },
        getSetingVal(){
            this.$axios.post('/report/dashBoardConfig/getConfig',qs.stringify({
                table: this.dialogForm.title,
                type: this.dialogForm.type
            })).then(res => {
                this.headList = []
                if (res.data.code * 1 === 200) {
                    this.settingObj = res.data.data
                    let k = 0
                    for(let key in this.settingObj) {
                        this.headList.push(key)
                        this.tagsForm['input' + (k + 1)] = this.settingObj[key] === '' ? 0 : this.settingObj[key]
                        k++
                    }
                    this.isSetting = true
                }
            })
        },
        submitDialogForm() {
            let serviceList = []
            let tagsArr = []
            let chartIndex= this.dialogForm.chartID
            let option = this['option' + chartIndex]
            let k = 1
            let re = /^\d+(?=\.{0,1}\d+$|$)/;
            for(let key in this.settingObj) {
                let value = this.tagsForm['input' + (k)]
                if (!re.test(value)) {
                    this.$alert(key + ' - 请输入正确的数字，可以包含小数点', '系统提示', {
                        type:'warning',
                        confirmButtonText: '确定',
                    });
                    return
                }
                tagsArr.push({
                    key: key,
                    keyValue: this.tagsForm['input' + (k)]
                })
                let dataList = this.getSetingConfig(option.xAxis[0].data, this.tagsForm['input' + (k)])
                let two = {
                    symbol: "none",// 去掉折线上面的小圆点
                    name:  key,
                    type: 'bar',
                    stack: 'config',
                    itemStyle:{
                        normal:{
                            color:color[k]  //改变珠子颜色
                        }
                    },
                    data: this.dostr(dataList)
                }
                serviceList.push(two)
                k++
            }
            this.$axios.post('/report/dashBoardConfig/updateConfig',qs.stringify({
                table: this.dialogForm.title,
                type: this.dialogForm.type,
                tags: JSON.stringify(tagsArr)
            })).then(res => {
                if (res.data.code * 1 === 200) {
                    this.$message({
                        message: '修改成功',
                        type: 'success',
                        showClose: true
                    });
                    option.series.map(one =>　{
                        if (one.stack !== 'config') {
                            serviceList.push(one)
                        }
                    })
                    this.isSetting = false
                    option.series = serviceList
                    this.onFetchIcon = false
                    this.commonChart('chart' + chartIndex, 'chart' + chartIndex, option)
                }
            })
        },
        closeDialog() {
            this.isSetting = false
        },
        getSDateAndEDate(searchForm) {
            let se = getStartDateAndEndDate(new Date(), this.searchForm.dateType, 10)
            this[searchForm].beginDate = se.startDate
            this[searchForm].endDate = se.endDate
        },
        getParam (searchForm) {
            let sendData = {}
            for (let key in this[searchForm]) {
                if (key !== 'childTag' && key !== 'childTagName') {
                    sendData[key] = this[searchForm][key]
                }
            }
            sendData.heapTypes = this[searchForm].childTagName === '全部' || this[searchForm].childTagName === '' ? 'all' : this[searchForm].childTagName
            sendData.beginDate = sendData.beginDate.replace(/-/g, '')
            sendData.endDate = sendData.endDate.replace(/-/g, '')
            return sendData
        },
        getChart () {
            this.getSChart1()
        },
        getSChart1 () {
            let param = this.getParam('searchForm')
            this.$axios.post('/dashboard/hyAndKycData/query',qs.stringify(param)).then(res => {
                if(res.data.code * 1 == 200){
                    let result = res.data.data
                    let titles = this.titleList
                    for (let i=1; i <= titles.length; i++) {
                        this['chart' + i] = null
                        this.tsObj['chart' + i] = []
                        let toolTipType = 'item'
                        let xTit = []
                        let unit = ''
                        if (i === 4 || i === 6 || i === 8) {
                            toolTipType = 'axis'
                        }
                        if (i === 1) {
                            xTit = ['亿元/万元', '商户数(个)']
                            unit = '个'
                        }
                        if (i === 2 ||　i === 4 || i === 5 || i === 8) {
                            xTit = ['%', '']
                            unit = '%'
                        }
                        if (i === 3) {
                            xTit = ['亿元', '万元']
                        }
                        if (i === 5 || i === 7) {
                            xTit = ['投诉数(个)', '']
                        }
                        this['option' + i] = this.initOption(xTit, toolTipType, 'chart' + i, unit)
                    }
                    this.drawChart(result.receiptMap, 'chart1', this.option1, 'bar', true, ['亿元/万元', '个'])
                    this.drawChart(result.receiptRateMap, 'chart2', this.option2, 'bar', true, ['%'])
                    this.drawChart(result.dayReceiptMap, 'chart3', this.option3, 'bar', true, ['亿元', '万元'])
                    this.drawChart(result.millionMap, 'chart4', this.option4, 'line', false)
                    this.drawChart(result.complaintCountMap, 'chart5', this.option5, 'bar', true, ['个'])
                    this.drawChart(result.complaintRateMap, 'chart6', this.option6, 'line', false)
                    this.drawChart(result.complaintSourceMap, 'chart7', this.option7, 'bar', true, ['个'])
                    this.drawChart(result.kycModelMap.chart1, 'chart8', this.option8, 'line', false)
                }
            })
        },
        selectedTag(item) {
            this.commonSelectChange(item, 'childTag', 'ids')
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
                this.searchForm[tag + 'Name'] = ''
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
                _this.onFetchIcon = true
                clearTimeout(barLoading);
                if (chart === 'chart6' ||　chart === 'chart4') {
                    document.querySelector('#'+ chart +' > div').style.overflow = 'inherit'
                    document.querySelector('#'+ chart +' > div').style.zIndex = '2000'
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
                        if (chart === 'chart6') {
                            return specialFormatChart(params)
                        } else {
                            return formatterChartDialog(toolTipType, params, _this[chart], unit)
                        }
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
        },
        getSetingConfig(times, val) {
            let endBar = []
            times.map(one => {
                endBar.push(0)
            })
            endBar[times.length - 1] = val === '' ? 0 : val * 1
            return endBar
        },
        drawChart(result, idChart, option, type, isStack, unit) {
            if (typeof unit === 'undefined') {
                unit = []
            }

            if (result === null || typeof result === 'undefined' || JSON.stringify(result) == "{}") {
                option.xAxis[0].data = []//时间
                option.series = [{
                    symbol: "none",
                    name: '',
                    type: 'line',
                    data: []
                }]
                this.commonChart(idChart, idChart, option)
            } else {
                let serviceList = []
                let title = []
                let legendList = []
                this.tsObj[idChart] = []
                for (let key in result) {
                    title = result.times
                    if (typeof result[key].name !== 'undefined') {
                        this.tsObj[idChart].push(result[key].name instanceof Array ? result[key].name[0] : result[key].name)
                    } else if (key.indexOf('_name') >= 0){
                        this['ts' + idChart].push(result[key])
                    }
                    // })
                    if (key === 'config') {
                        title.push('目标值')
                        let k = 0
                        for (let childKey in result[key]) {
                            let dataList = this.getSetingConfig(result.times, result[key][childKey])
                            let two = {
                                symbol: "none",// 去掉折线上面的小圆点
                                name: childKey,
                                type: 'bar',
                                stack: 'config',
                                itemStyle:{
                                    normal:{
                                        color:color[k++]  //改变珠子颜色
                                    }
                                },
                                data: this.dostr(dataList)
                            }
                            serviceList.push(two)
                            k++
                        }
                    } else {
                        if (key !== 'times' && key.indexOf('_name') < 0 && key !== 'names') {
                            if(result[key] === null || typeof result[key] === 'undefined' || JSON.stringify(result[key]) == "{}"){
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
                                let name = ''
                                let symbol = 'none'
                                if (idChart === 'chart6') {
                                    if (key === 'complaintRateMoney') {
                                        name = '商户投诉率(金额)'
                                        symbol = 'diamond'
                                        legendList[0] = name
                                    }
                                    if (key === 'complaintRateNumber') {
                                        name = '商户投诉率(笔数)'
                                        symbol = 'circle'
                                        legendList[1] = name
                                    }
                                    if (key === 'merchantRate') {
                                        name = '投诉商户占比'
                                        symbol = 'triangle'
                                        legendList[2] = name
                                    }
                                    serviceList.push(
                                        {
                                            symbol: symbol,
                                            name: name,
                                            type: 'line',
                                            data: [],
                                            itemStyle:{
                                                normal:{
                                                    color: '#333' //改变珠子颜色
                                                }
                                            }
                                        }
                                    )
                                    option.legend.selectedMode = false
                                }
                                for (let childKey in result[key]) {
                                    if (childKey !== 'name') {
                                        let two = {
                                            symbol: symbol,// 去掉折线上面的小圆点
                                            name: childKey,
                                            type: type,
                                            itemStyle:{
                                                normal:{
                                                    color:color[k]  //改变珠子颜色
                                                }
                                            },
                                            data: this.dostr(result[key][childKey])
                                        }
                                        if ((idChart === 'chart1' && key === 'activeMerchant') || (idChart === 'chart4' && key === 'grossProfit')) {
                                            two.yAxisIndex = 1
                                        }
                                        if (isStack) {
                                            two.stack = key
                                            let ui01 =  typeof unit[0] !== 'undefined' ? '(' + unit[0] + ')' : ''
                                            let ui02 =  typeof unit[1] !== 'undefined' ? '(' + unit[1] + ')' : ''
                                            if (typeof result[key].name !== 'undefined') {
                                                two.name = result[key].name + ui01 + '-' + childKey
                                                if (two.yAxisIndex === 1) {
                                                    two.name = result[key].name + ui02 + '-' + childKey
                                                }
                                                // this.tsObj[idChart].push({
                                                //     key: index,
                                                //     value: result[key].name[0]
                                                // })
                                            } else {
                                                two.name = result[key + '_name'] + ui01 + '-' + childKey
                                                if (two.yAxisIndex === 1) {
                                                    two.name = result[key + '_name'] + ui02 + '-' + childKey
                                                }
                                                // this.tsObj[idChart].push({
                                                //     key: index,
                                                //     value: result[key + '_name']
                                                // })
                                            }
                                        } else if (idChart !== 'chart6'){
                                            legendList.push(childKey)
                                        }
                                        serviceList.push(two)
                                        k++
                                    }
                                }
                            }
                        }
                    }

                }
                option.legend.data = [...new Set(legendList)]
                option.xAxis[0].data = title //时间
                option.series = serviceList
                this.commonChart(idChart, idChart, option)
            }
        }
    }
}
</script>
<style lang="less" scoped>
@import '../less/dashboard.less';
.form-d-box .el-input--suffix .el-input__inner{
    height: 28px!important;
    line-height: 28px!important;
}
</style>
