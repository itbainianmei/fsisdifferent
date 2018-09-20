<template>
    <div>
        <search :serachForm="searchForm" @searchData="searchData" @onDownload="downloadPage" @changeTime="changeTime"></search>
        <!-- 图表 -->
        <div id="myChart" class="center" :style="{width: '100%', height: '400px'}"></div>
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
import {MERCHANT_COMPLAINT_SATISTICS_ENUM} from '@/constants'
import {getStartDateAndEndDate} from "@/components/utils";
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
            let newp = this.addSessionId(self.searchForm)
            this.$axios.post('/report/merchantComplaint/',qs.stringify(newp))
            .then(res => {
                let response = res.data
                if (response.code == '200') {
                    if (JSON.stringify(response.data) == "{}") {
                        self.clearData()
                        this.drawLine()
                        return false;
                    }
                    option.xAxis.data = response.data.times;  //时间轴
                    option.xAxis.axisLabel.interval = (response.data.times.length < 66) ? 0 : 1;
                    for (let key in response.data.returnList) {
                        // option.series[index].data = response.data.returnList[key];
                    }

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
}
</script>
