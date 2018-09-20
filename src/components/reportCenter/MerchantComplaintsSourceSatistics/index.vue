<template>
    <div>
        <search :serachForm="searchForm" @searchData="searchData" @onDownload="downloadPage" @changeTime="changeTime"></search>
        <!-- 图表 -->
        <div class="pr">
            <span style="color:#FBE9D5;font-size:10px;position:absolute;right:5%;">友情提示:&nbsp;&nbsp;</i><i style="color:#B7C6B3;font-style:normal;">柱子左: </i>日均收单交易金额 &nbsp; &nbsp;<i style="color:#B7C6B3;font-style:normal;">柱子右: </i>日均毛利</span>
            <div id="myChart" class="center" :style="{width: '100%', height: '400px'}"></div>
        </div>
        <div class="dataTable clear">
            <el-table
                :data="tableData"
                border
                style="width: 100%"
                <el-table-column
                    v-for="item in headList"
                    align="center"
                    :key="item.id"
                    :label="item.label"
                    :prop="item.prop"
                    :width="item.width">
                </el-table-column>
            </el-table>
        </div>
        <Page :pageInfo="page"></Page>
    </div>
</template>
<script>
import qs from "qs";
import search from './Partial/search.vue';
import {getStartDateAndEndDate} from "@/components/utils";
var loadingTicket, myChart;
var rotate = 0;
export default {
    components: {
        search
    },
    data () {
        return {
            headList: [
                { prop: 'time', label: '时间', width: '300' },
                { prop: 'source', label: '投诉来源' },
                { prop: 'number', label: '投诉商户数', width: '200' },
            ],
            tableData: [],
            searchForm:{
                dateType: "day",
                beginDate: "",
                endDate: "",
                source: "",
                branchName: "",
                customerNo: "",
            },
            page: {
                isShowSizeChange: true,
                totalCount: 0,
                currentPage: 1,
                pageSize: 10,
                sizeList: [10, 20, 30, 40],
                maxPageNum: 0
            },
        }
    },
    created() {

    },
    methods: {
        getSDateAndEDate() {
            let se = getStartDateAndEndDate(new Date(), this.searchForm.dateType);
            this.searchForm.beginDate = se.startDate;
            this.searchForm.endDate = se.endDate;
        },
        searchData() {
            this.page.currentPage = 1;
            this.getChartData();
            this.getTableData();
        },
        //统计图
        getChartData() {
            let self = this;
            let newp = this.addSessionId(self.searchForm);
            // todo url: '/report/merchantComplaint'
            this.$axios.post('/report/getFraudAndHitP',qs.stringify(newp))
            .then(res => {
                let response = res.data
                if (response.code == '200') {
                    if (JSON.stringify(response.data) == "{}") {
                        self.clearData()
                        this.drawLine()
                        return false;
                    }
                    option.xAxis[0].data = response.data.times  //时间

                    if(response.data.times.length>12){  //控制x轴显示行为  数据量大的时候
                        option.xAxis[0].axisLabel.rotate=30
                    }else if(response.data.times.length>24){
                        option.xAxis[0].axisLabel.rotate=60
                    }
                    option.series[0].data = this.dostr(response.data.transactionMoney) //成功交易额(yi元)
                    option.series[1].data = this.dostr(response.data.fraudMoney) //成功欺诈额(万元)
                    option.series[2].data = this.dostr(response.data.interceptMoney) //拦截欺诈额(万元)
                    this.drawLine();
                } else {
                    this.$message.error({message:response.msg,center: true});
                }
            });
        },
        //统计表
        getTableData() {
            let sendData = this.searchForm;
            sendData.pageNum = this.page.currentPage;
            sendData.pageSize = this.page.pageSize;
            let newp = this.addSessionId(sendData)
            this.$axios.post('/report/merchantComplaint/merchantComplaintSource', qs.stringify(newp))
            .then(res => {
                let response = res.data;
                if (response.code == '200') {
                    this.tableData = response.data.returnList;
                    this.page.totalCount = response.data.total;
                    this.page.maxPageNum = Math.ceil(this.page.totalCount / this.page.pageSize);
                } else {
                    this.tableData = [];
                    this.page.totalCount = 0;
                    this.$message.error({message: response.msg, center: true});
                }
            });
        },
        downloadPage(pageDownInfo) {
            let url = '/report/merchantComplaint/exportSource?beginDate=' + this.searchForm.beginDate +
                "&endDate=" + this.searchForm.endDate + "&dateType=" + this.searchForm.dateType +
                "&source=" + this.searchForm.source + "&branchName=" + this.searchForm.branchName +
                "&customerNo=" + this.searchForm.customerNo + "&startPage=" + pageDownInfo.startPage * 1  +
                "&endPage=" + pageDownInfo.endPage * 1 + "&pageSize=" + this.page.pageSize;
            this.$axios.get(url).then(res => {
                // this.download = false
                window.location = encodeURI(this.url + url)
            }).catch(error => {
                console.log(error);
            });
        },
        changeTime() {
            this.page.currentPage = 1;
            this.searchData();
        },
        clearData() {
            option.xAxis.data = [];  //时间轴
            option.series[0].data =[]; //限额限次拦截率
            option.series[1].data = []; //黑名单拦截率
            option.series[2].data = []; //规则拦截率
            option.series[3].data = []; //风控拦截率
        },
        drawLine() {
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('myChart'));
            // 绘制图表
            myChart.clear();
            // myChart.setOption(option);
            loadingTicket = setTimeout(function () {
                myChart.hideLoading();
                myChart.setOption(option);
                clearTimeout(loadingTicket);

            }, 2000);

            myChart.showLoading({
                text : '数据拼命加载中...',
                effect :"whirling" ,
                textStyle : {
                    fontSize : 16
                },
                effectOption: {backgroundColor: 'rgba(0, 0, 0, 0.05)'}
            });
        },
    },
    mounted() {
        this.getSDateAndEDate();
        this.searchData();
    },
};
var color= ['#E0CDD1','#FBEBDC','#788A72','#C8B8A9','#C8B8A9','#D6D4C8','#F2EEED','#FBE8DA','#FBE8DA','#B7C6B3','#A47C7C','#C2C8D8','#7A7385','#E0CDD3','#B3B1A4','#A0A5BB','#D7C9AF',]
const option = {
  title: {
    x:'center',
    text: ''
    },
  tooltip: {
        trigger: 'axis',
        // formatter:function (params) {
        //  function addCommas(nStr){  //每三位分隔符
        //      nStr += '';
        //      var x = nStr.split('.');
        //      var x1 = x[0];
        //      var x2 = x.length > 1 ? '.' + x[1] : '';
        //      var rgx = /(\d+)(\d{3})/;
        //      while (rgx.test(x1)) {
        //       x1 = x1.replace(rgx, '$1' + ',' + '$2');
        //      }
        //      return x1 + x2;
        //   }
        //   var str0=''
        //   var str=''
        //   params.map(function(item,index){
        //     str0=item[1]+'\<br>'
        //     str+=item[0]+': '
        //     if(index==0 || index==1 || index==2 || index==3){
        //       str+=addCommas(Number(item[2]).toFixed(2))+'\<br>'
        //     }
        //     if(index==4){
        //       str+=Number(item[2]).toFixed(2)+'\<br>'
        //     }

        //   })
        //   return str0+str
        // }
    },
    toolbox: {
        show : true,
        feature : {
            saveAsImage : {show: true}
        }
    },
    grid:{
      x2:100,
    },
    legend: {
        y:'30px',
        x:'center',
        data:['收单交易金额','活跃商户数1','活跃商户数2']
    },
    xAxis: [
        {
          splitLine:{show: false},//去除网格线
          type: 'category',
          data: ['08/01','08/01'],
          axisLabel:{
              rotate: 30,
              show: true,
              interval: 'auto'
          },
          axisTick: {
                show: true,     //设置x轴上标点显示
                length: 10,    // 设置x轴上标点显示长度
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
          name: '亿元',
          splitNumber:5,
          axisLabel: {
              formatter: '{value}'
          }
        },
        {
          type: 'value',
          name:'万元',
          splitNumber:5,
          axisLabel: {
              formatter: '{value}'
          }
        }
    ],
    series: [
        {
          symbol: "none",// 去掉折线上面的小圆点
          barMaxWidth:20,
          name:'收单交易金额',
          type:'bar',
          stack: 'stack0',
          data:[10, 172],
          itemStyle:{
              normal:{
                  color:color[0]  //改变珠子颜色
              }
          }
        },
        {
          symbol: "none",// 去掉折线上面的小圆点
          barMaxWidth:20,
          name:'收单交易金额',
          type:'bar',
          stack: 'stack0',
          data:[110, 72],
          itemStyle:{
              normal:{
                  color:color[1]  //改变珠子颜色
              }
          }
        },
        {
          symbol: "none",// 去掉折线上面的小圆点
          name:'活跃商户数1',
          barMaxWidth:20,
          type:'bar',
          stack: 'stack1',
          yAxisIndex: 1,
          data:[160, 22],
          itemStyle:{
              normal:{
                  color:color[10]  //改变珠子颜色
              }
          }
        },
        {
          symbol: "none",// 去掉折线上面的小圆点
          name:'活跃商户数2',
          barMaxWidth:20,
          type:'bar',
          stack: 'stack1',
          yAxisIndex: 1,
          data:[160, 22],
          itemStyle:{
              normal:{
                  color:color[9]  //改变珠子颜色
              }
          }
        }

    ]
}
</script>
