<template>
    <div>
        <template v-if="search01btnPower">
            <search
                :btnPower="search01btnPower"
                :searchForm="searchForm"
                @searchData="getSChart1"
                @hySelectedTag="hySelectedTag"
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
                        <div style="position:relative" :id="'chart' + (i + j + 1)" :style="{width: '100%', height: '280px', 'margin': '0 auto'}"></div>
                    </el-col>
                    <el-col v-if="i === 4" :span="12" v-for="j in 1" :key="j + 2" style="position:relative">
                        <h5>{{titleList[i + j + 2 - 1]}}</h5>
                        <span class="ts-box" v-if="i + j + 2 === 7"  v-show="tsObj['chart' + (i + j + 2)].length">
                            友情提示:&nbsp;&nbsp;
                            <span v-for="(item, k) in tsObj['chart' + (i + j + 2)]" :key="k * 20"><i>柱子{{k + 1}}</i>: {{item}}&nbsp; &nbsp;</span>
                        </span>
                        <div style="z-index: 0;position:relative" :id="'chart' + (i + j + 2)" :style="{width: '100%', height: '280px', 'margin': '0 auto'}"></div>
                    </el-col>
                </el-row>
            </div>
        </template>
        <template v-if="search02btnPower">
            <search-two
                :btnPower="search02btnPower"
                :searchForm="searchForm2"
                @searchData="getSChart2">
            </search-two>
            <div class="d-box">
                <el-row :gutter="5" v-for="i in 3" :key="i * 10" >
                    <el-col v-if="i === 1" :span="12" v-for="j in 2" :key="j - 1 * 10" style="position:relative">
                        <h5>{{titleList2[i + j - 1 - 1]}}</h5>
                        <div style="z-index: 0;position:relative" :id="'chart2' + (i + j - 1)" :style="{width: '100%', height: '280px', 'margin': '0 auto'}"></div>
                    </el-col>
                    <el-col v-if="i === 2" :span="12" v-for="j in 2" :key="j * 10" style="position:relative">
                        <h5>{{titleList2[i + j - 1]}}</h5>
                        <span class="ts-box" v-if="i + j === 4" v-show="tschart24.length" style="top: 3px;right:0">
                            友情提示:&nbsp;&nbsp;
                            <span v-for="(item, k) in tschart24" :key="k * 20"><i>柱子{{k + 1}}</i>: {{item}}&nbsp; &nbsp;</span>
                        </span>
                        <div style="z-index: 0;position:relative" :id="'chart2' + (i + j)" :style="{width: '100%', height: '280px', 'margin': '0 auto'}"></div>
                    </el-col>
                    <el-col v-if="i === 3" :span="12" v-for="j in 1" :key="j + 1 * 10" style="position:relative">
                        <h5>{{titleList2[i + j + 1 - 1]}}</h5>
                        <span class="ts-box" v-if="i + j + 1 === 5" v-show="tschart25.length">
                            友情提示:&nbsp;&nbsp;
                            <span v-for="(item, k) in tschart25" :key="k * 20"><i>柱子{{k + 1}}</i>: {{item}}&nbsp; &nbsp;</span>
                        </span>
                        <div style="z-index: 0;position:relative" :id="'chart2' + (i + j + 1)" :style="{width: '100%', height: '280px', 'margin': '0 auto'}"></div>
                    </el-col>
                </el-row>
            </div>
        </template>
        <el-dialog :title="dialogForm.title" width="30%" :visible.sync="isSetting" v-dialogDrag >
            <el-form class="form-d-box" ref="tagsForm" :model="tagsForm" :label-position="'right'" label-width="135px"  style="margin-left:13%;">
                <el-form-item :label="item + ':'" :prop="'input' + (i + 1)"  v-for="(item , i) in headList" :key="i">
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
import searchTwo from './Partial/search-two.vue';
import {KYC, COLORS} from '@/constants'
import {getStartDateAndEndDate, initChartOption} from "@/components/utils";
import echarts from 'echarts';
let color = COLORS
export default {
    name: '基础查询',
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
            titleList: ['收单毛利商户数统计', '收单毛利商户数占比统计', '日均收单毛利水平', '万元毛利水平', '投诉商户数统计', '商户投诉率统计', '投诉商户来源统计'],
            titleList2: ['欺诈情况统计', '风险拦截覆盖情况', '报警及处理情况', '巡检情况统计', '特批及关闭情况'],
            dialogForm: {
                title: '',
                itemTit: '',
                type: '行业业绩属性',
                chartID: ''
            },
            onFetchIcon: false,
            isSetting: false,
            settingObj: {},
            headList: [],
            tagsForm: {},
            tsObj: {},
            tschart24: [],
            tschart25: [],
            search01btnPower: false,
            search02btnPower: false
        }
    },
    watch: {
        'searchForm.dateType': function() {
            if (this.search01btnPower) {
                this.getSChart1()
            }
        },
        'searchForm2.dateType': function() {
            if (this.search02btnPower) {
                this.getSChart2()
            }
        }
    },
    created() {
        const idList = JSON.parse(localStorage.getItem('ARRLEVEL'))
        this.search01btnPower = idList.indexOf(655) === -1 ? false : true
        this.search02btnPower = idList.indexOf(656) === -1 ? false : true
        for (let i=1; i <= this.titleList.length; i++) {
            this.tsObj['chart' + i] = []
        }
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
                    that.onFetchIcon = false
                    for(let i = 1; i <= that.titleList.length; i++) {
                        that.commonChart('chart' + i, 'chart' + i, that['option' + i])
                        if (i <= that.titleList2.length) {
                            that.commonChart('chart2' + i, 'chart2' + i, that['option2' + i])
                        }
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
                if (key !== 'hyChild' && key !== 'hyChildName') {
                    sendData[key] = this[searchForm][key]
                }
            }
            if (searchForm === 'searchForm') {
                sendData.heapTypes = this[searchForm].hyChildName === '全部' ||　this[searchForm].hyChildName === '' ? 'all' : this[searchForm].hyChildName
            }
            sendData.beginDate = sendData.beginDate.replace(/-/g, '')
            sendData.endDate = sendData.endDate.replace(/-/g, '')
            return sendData
        },
        getChart () {
            if (this.search01btnPower) {
                this.getSChart1()
            }
            if (this.search02btnPower) {
                this.getSChart2()
            }
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
                        this.tsObj['chart' + i] = []
                        let toolTipType = 'item'
                        let xTit = []
                        let unit = ''
                        if (i === 4 || i === 6) {
                            toolTipType = 'axis'
                        }
                        if (i === 1) {
                            xTit = ['亿元/万元', '商户数(个)']
                            unit = '个'
                        }
                        if (i === 2 ||　i === 4 || i === 6) {
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
                }
            })
        },
        getSChart2 () {
            let param = this.getParam('searchForm2')
            this.$axios.post('/dashboard/basicData/query',qs.stringify(param)).then(res => {
                if(res.data.code * 1 == 200){
                    let result = res.data.data
                    let titles = this.titleList2
                    this.tschart24 = []
                    this.tschart25 = []
                    // 初始化收单毛利商户数统计
                    for (let i=1; i <= titles.length; i++) {
                        this['chart2' + i] = null
                        let toolTipType = 'axis'
                        let xTit = []
                        let unit = ''
                        if (i === 4 || i === 5) {
                            toolTipType = 'item'
                        }
                        if (i === 1) {
                            xTit = ['亿元/万元', '欺诈率(0.01BP)']
                            unit = ['亿元/万元', '%']
                        }
                        if (i === 2) {
                            xTit = ['覆盖率%', '拦截率%']
                            unit = ['%', '%']
                        }
                        if (i === 3) {
                            xTit = ['数量(个)', '%']
                            unit = ['个', '%']
                        }
                        if (i === 4) {
                            xTit = ['数量(个)', '']
                            unit = ['个', '']
                        }
                        if (i === 5) {
                            xTit = ['商户数(个)', '']
                            unit = ['个', '']
                        }
                        this['option2' + i] = this.initOption(xTit, toolTipType, 'chart' + i, unit)
                    }
                    this.drawChart2(result.tradeFraud, 'chart21', this.option21, 'bar', false)
                    this.drawChart2(result.riskInterceptMap, 'chart22', this.option22, 'line', false)
                    this.drawChart2(result.alarmMap, 'chart23', this.option23, 'bar', false)
                    this.drawChart(result.inspectMap, 'chart24', this.option24, 'bar', true, ['个'])
                    this.drawChart(result.approvalMap, 'chart25', this.option25, 'bar', true, ['个'])
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
                    if (chart === 'chart6') {
                        _this.chart6.component.legend.setColor("投诉率(金额)", color[0]);
                        _this.chart6.component.legend.setColor("投诉率(笔数)", color[1]);
                        _this.chart6.component.legend.setColor("投诉商户占比", color[2]);
                        _this.chart6.refresh()
                    }
                }
            },200);
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
            return initChartOption(yTtile, toolTipType, chart, this[chart], unit)
        },
        getSetingConfig(times, val) {
            let endBar = []
            times.map(one => {
                endBar.push('0')
            })
            endBar[times.length - 1] = val === '' ? '0' : val * 1
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
                    if (key === 'config') {
                        title.push('目标值')
                        let k = 0
                        for (let childKey in result[key]) {
                            let dataList = this.getSetingConfig(result.times, result[key][childKey])
                            let two = {
                                symbol: "none",// 去掉折线上面的小圆点
                                name:  childKey,
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
                        if (key !== 'times' && key.indexOf('_name') < 0) {
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
                                if (idChart === 'chart24' && key === 'inspectRate') {
                                    k = 3
                                }
                                if (idChart === 'chart24' && key === 'passRate') {
                                    k = 5
                                }
                                let name = ''
                                let symbol = 'none'
                                if (idChart === 'chart6') {
                                    if (key === 'complaintRateMoney') {
                                        name = '投诉率(金额)'
                                        symbol = 'diamond'
                                        legendList[0] = name
                                    }
                                    if (key === 'complaintRateNumber') {
                                        name = '投诉率(笔数)'
                                        symbol = 'circle'
                                        legendList[1] = name
                                    }
                                    if (key === 'merchantRate') {
                                        name = '投诉商户占比'
                                        symbol = 'triangle'
                                        legendList[2] = name
                                    }
                                }
                                for (let childKey in result[key]) {
                                    if (childKey !== 'name' && childKey.indexOf('_name') < 0) {
                                        let two = {
                                            symbol: symbol,// 去掉折线上面的小圆点
                                            name: idChart === 'chart6' ? name : childKey,
                                            childName: childKey,
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
                                            } else {
                                                two.name = typeof result[key + '_name'] !== 'undefined' ? result[key + '_name'] + ui01 + '-' + childKey : childKey
                                                if (two.yAxisIndex === 1) {
                                                    two.name = typeof result[key + '_name'] !== 'undefined' ? result[key + '_name'] + ui02 + '-' + childKey : childKey
                                                }
                                            }
                                            if (idChart === 'chart24'){
                                                if (typeof result[key + '_name'] === 'undefined') {
                                                    legendList.push(childKey)
                                                }
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
        },
        drawChart2(result, idChart, option, type, isStack) {
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
                let legendList = []
                let title = []
                let k = 0
                for (let key in result) {
                    title = result.times
                    if (key !== 'times' && key.indexOf('_name') < 0) {
                        let two = {
                            symbol: "none",// 去掉折线上面的小圆点
                            name:  result[key + '_name'],
                            type: type,
                            itemStyle:{
                                normal:{
                                    color:color[k]  //改变珠子颜色
                                }
                            },
                            data: this.dostr(result[key])
                        }
                        if (key === 'fraudLossRate' || key === 'polyline' || key === 'black' || key === 'rule'|| key === 'limit'|| key === 'risk') {
                            two.type = 'line'
                            two.yAxisIndex = 1
                        }
                        legendList.push(result[key + '_name'])
                        serviceList.push(two)
                    }
                    k++
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
