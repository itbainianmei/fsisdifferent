<template>
    <div>
        <search
            :serachForm="searchForm"
            @searchData="searchData" 
            @onDownload="downloadPage" 
            @onTarget="goDetail" 
            @selectedChange="selectedChange"
        >
        </search>
        <el-row class="chart-box">
            <el-col :span="10" :offset="1">
                <div id="barChart" :style="{width: '100%', height: '280px'}"></div>
            </el-col>
             <el-col :span="10" :offset="1">
                <div id="lineChart" :style="{width: '100%', height: '280px'}"></div>
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
import {MERCHANT_COMPLAINT_SATISTICS_TABLE_HEAD, KYC} from '@/constants'
import {getStartDateAndEndDate} from "@/components/utils";
import echarts from 'echarts';
export default {
    components: {
        search
    },
    data () {
        return {
            headList: MERCHANT_COMPLAINT_SATISTICS_TABLE_HEAD,
            tableData: [],
            searchForm:{
                dateType: "0",
                beginDate: "",
                endDate: "", 
                tagType: "kyc", 
                customerNo: "", 
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
        }
    },
    created() {
        this.getSDateAndEDate()
    },
    mounted() {
        this.$nextTick(function () {
            this.drawChart('barChart', 'barChart', barOption);
            this.drawChart('lineChart', 'lineChart', lineOption)
            let that = this;
            let resizeTimer = null;
            window.onresize = function () {
                if (resizeTimer) clearTimeout(resizeTimer);
                resizeTimer = setTimeout(function () {
                    that.drawChart('barChart', 'barChart', barOption)
                    that.drawChart('lineChart', 'lineChart', lineOption)
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
        downloadPage(){
            let url = "/report/merchantComplaint/exportInfo?beginDate=" +
            this.searchForm.beginDate +
            "&endDate=" +
            this.searchForm.endDate +
            "&dateType=" +
            this.searchForm.dateType +
            "&agencyName=" +
            this.searchForm.agencyName +
            "&tagType=" +
            this.searchForm.tagType +
            "&customerNo=" +
            this.searchForm.customerNo +
            "&branchName=" +
            this.searchForm.branchName +
            "&tag=" +
            this.ids.join(',') 
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
            let router = {path: obj.path}
            window.searchForm = this.searchForm
            window.searchForm.ids = this.ids
            // router.query = {
            //     searchForm: encodeURI(this.searchForm)
            // }
            this.$router.push(router)
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
            sendData.tag = this.ids.join(',')
            param.tag = this.ids.join(',')
            sendData.pageNum = this.pager.currentPage
            sendData.pageSize = this.pager.pageSize
            this.$axios.post("/report/merchantComplaint/merchantComplaintInfo",
                qs.stringify(sendData)
            ).then(res => {
                console.log(JSON.stringify(res.data.returnList, null, 2))
                let result = res.data
                this.tableData = result.data.returnList;
                this.pager.totalCount = parseInt(result.data.total);
                if (type !== 'pager') {
                    this.getBarChart(param)
                    this.getLineChart(param)
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
            this.$axios.post('/report/merchantComplaint/histogram',qs.stringify(param)).then(res => {
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
        getLineChart (param) {
            this.$axios.post('/report/merchantComplaint/polyline',qs.stringify(param)).then(res => {
                let response = res.data
                if(response.code * 1 == 200){
                    if(JSON.stringify(response.data) == "{}"){
                        lineOption.xAxis[0].data = []//时间
                        lineOption.series[0].data =[] // 
                        lineOption.series[1].data = [] // 
                        this.drawChart('lineChart', 'lineChart', lineOption)
                        return false
                    }
                    lineOption.xAxis[0].data = response.data.times  //时间
                    lineOption.series[0].data = this.dostr(response.data.transactionMoney) //成功交易额(yi元)
                    lineOption.series[1].data = this.dostr(response.data.fraudMoney) //成功欺诈额(万元)
                    this.drawChart('lineChart', 'lineChart', lineOption)
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
let lineOption = {
    title : {
        text: '',
         x: 'center'
    },
    toolbox: {
       show : true,
        feature : {
            saveAsImage : {show: true}
        }
    },
    tooltip: {
        trigger: 'axis',
        formatter:function (params) {
          let str0=''
          let str=''
          params.map(function(item,index){
            str0=item[1]+'\<br>'
            str+=item[0]+': '
            if(item[2].toString().indexOf('%') == -1){
              str+=item[2].toFixed(2)+'%\<br>'
            }else{
              str+=item[2]+'\<br>'
            }
            
          })
          return str0+str
        },
    },
    legend: {
        y:'10px',
        textStyle:{
            fontSize:10,
            color:'black'

        },
        itemGap:-1,
        data:['商户投诉率(交易笔数)','商户投诉率(交易金额)']
    },
    xAxis: [
        {
          splitLine:{show: false},//去除网格线
            type: 'category',
            data: ['08/01-09/01','08/01-09/01','08/01-09/01','08/01-09/01','08/01-09/01','08/01-09/01','08/01-09/01','08/01-09/01'],
    
            boundaryGap : true,   ////////控制 
            axisLabel: {  
             interval:0, ////////控制 
             rotate:20 ,
             textStyle:{
                fontSize:12,
                color:'black',
                fontWeight:700
              }
            }
        }
  ],
    grid: {
        x2:6,
        y2: 60,// y2可以控制 X轴跟Zoom控件之间的间隔，避免以为倾斜后造成 label重叠到zoom上  控制x轴刻度线高度
    },
    yAxis: [
        {
            type: 'value',
            name: '投诉率',
           splitNumber:5,
            axisLabel: {
                formatter: '{value}%'
            }
        }
    ],
    series: [
        {
           symbol: "none",// 去掉折线上面的小圆点
            name: '商户投诉率(交易笔数)',
            type: 'line',
            itemStyle:{
                normal:{
                    color:color[0]  //改变珠子颜色
                }
            },
            data: [30,20,40,90,80,40,10.5,50]
        },
        {
           symbol: "none",// 去掉折线上面的小圆点
            name: '商户投诉率(交易金额)',
            type: 'line',
            itemStyle:{
                normal:{
                    color:color[1]  //改变珠子颜色
                }
            },
            data: [10,90,70,40,80,20,30,50]
        }
    ]
}
</script>
<style>
.chart-box{
    margin: 40px 0;
}
</style>
