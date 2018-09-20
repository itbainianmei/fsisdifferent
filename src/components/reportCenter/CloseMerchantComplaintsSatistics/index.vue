<template>
    <div>
        <search
            :serachForm="searchForm"
            @searchData="searchData" 
            @onDownload="downloadPage" 
            @selectedChange="selectedChange"
        >
        </search>
        <el-row class="chart-box">
            <el-col :span="22" :offset="1">
                <div id="barChart" :style="{width: '100%', height: '280px'}"></div>
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
import {CLOSE_TABLE_HEAD, KYC} from '@/constants'
import {getStartDateAndEndDate} from "@/components/utils";
import echarts from 'echarts';
export default {
    components: {
        search
    },
    data () {
        return {
            headList: CLOSE_TABLE_HEAD,
            tableData: [],
            searchForm:{
                dateType: "0",
                beginDate: "",
                endDate: "", 
                childTag: [KYC.ALL],
                childTagName: KYC.ALL_NAME
            },
            ids: [],
            barChart: null,
            pager: {
                totalCount: 0,
                currentPage: 1,
                pageSize: 20,
                maxPageNum: 0
            }
        }
    },
    created() {
        this.getSDateAndEDate()
    },
    mounted() {
        this.$nextTick(function () {
            this.drawChart('barChart', 'barChart', barOption);
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
    methods: {
        getSDateAndEDate() {
            let se = getStartDateAndEndDate(new Date(), this.searchForm.dateType)
            this.searchForm.beginDate = se.startDate
            this.searchForm.endDate = se.endDate
        },     
        downloadPage(pageDownInfo){
            console.log(pageDownInfo)
            let url = "/ProtraitAgency/downloadAgencyList?beginDate=" +
            this.searchForm.beginDate +
            "&endDate=" +
            this.searchForm.endDate +
            "&dateType=" +
            this.searchForm.dateType +
            "&heapTypes=" +
            this.ids.join(',')
            this.$axios.get(url).then(res1 => {
                let d_url = this.uploadBaseUrl + url;
                window.location = encodeURI(d_url)
            }).catch(error => {
                console.log(error);
            });
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
                this.searchForm.childTag = [KYC.ALL]
                this.searchForm.childTagName = KYC.ALL_NAME
            }
        },
        searchData(type) {
             let sendData = {}
            let param = {}
            for (let key in this.searchForm) {
                if (key !== 'childTag' && key !== 'childTagName') {
                    sendData[key] = this.searchForm[key]
                    param[key] = this.searchForm[key]
                }
            }
            sendData.heapTypes = this.searchForm.childTagName
            param.heapTypes = this.searchForm.childTagName
            sendData.pageNum = this.pager.currentPage
            sendData.pageSize = this.pager.pageSize
            this.$axios.post("/ProtraitAgency/findList",
                qs.stringify(sendData)
            ).then(res => {
                console.log(JSON.stringify(res.data.returnList, null, 2))
                let result = res.data
                this.tableData = result.data.returnList;
                this.pager.totalCount = parseInt(result.data.total);
                if (type !== 'pager') {
                    this.getBarChart(param)
                }
            }).catch(error => {
                console.log(error);
            });
        },
        onCurrentChange (val) {
            this.pager.currentPage = val
            this.searchData('pager')
        },
        getBarChart (param) {
            this.$axios.post('/report/business/queryTXChart',qs.stringify(param)).then(res => {
                let response = res.data
                if(response.code * 1 == 200){
                    if(JSON.stringify(response.data) == "{}"){
                        barOption.xAxis[0].data = []//时间
                        barOption.series[0].data =[] // 
                        barOption.series[1].data = [] // 
                        this.drawChart('barChart', 'barChart', barOption)
                        return false
                    }
                    barOption.xAxis[0].data = response.data.times  //时间
                    barOption.series[0].data = this.dostr(response.data.transactionMoney) //成功交易额(yi元)
                    barOption.series[1].data = this.dostr(response.data.fraudMoney) //成功欺诈额(万元)
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
        data:['收单金额','毛利','xxx(0.01BP)']
    },
    xAxis: [
        {
          splitLine:{show: false},//去除网格线
          type: 'category',
          data: ['08/01','08/01','08/01','08/01','08/01','08/01','08/01','08/01','08/01','08/01','08/01','08/01','08/01','08/01'],
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
            name: '亿元/万元',
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
    series: [
        {
          symbol: "none",// 去掉折线上面的小圆点
          barMaxWidth:10,
            name:'收单金额',
            type:'bar',
            data:[1000,200],
            itemStyle:{
                normal:{
                    color:color[9]  //改变珠子颜色
                }
            }
        },
        {
          symbol: "none",// 去掉折线上面的小圆点
          barMaxWidth:10,
            name:'毛利',
            type:'bar',
            data:[2220,300],
            yAxisIndex: 1,
            itemStyle:{
                normal:{
                    color:color[3]  //改变珠子颜色
                }
            }
        },
        {
          symbol: "none",// 去掉折线上面的小圆点
            name:'xxx(0.01BP)',
            type:'line',
            yAxisIndex: 1,
            itemStyle:{
                normal:{
                    color:color[10]  //改变珠子颜色
                }
            },
            data:[70.5,4.66,200] },
    ]
};
</script>
<style>
.chart-box{
    margin: 40px 0;
}
</style>
