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
                     <span class="active time mr30" @click='getChartData("myChart1","1",$event)'>近14天</span>
                    <span class="time mr30" @click='getChartData("myChart1","2",$event)'>近8周</span>
                    <span class="time" @click='getChartData("myChart1","3",$event)'>近6个月</span>
                </div>
                <div id="myChart1" class="center" :style="{width: '100%', height: '280px'}"></div>
            </div>
        </div> 
    </div>
</template>
<script>
import qs from 'qs';
import {SALES_GRADE_TABLE_HEAD} from '@/constants';
var loadingTicket1,loadingTicket2,loadingTicket3,myChart1,myChart2,myChart3
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
        // this.drawLine1();
        // this.drawLine2();
        // this.drawLine3();
        // this.expandshhcdqk = this.shhcdqk
        // this.expandshyqxx = this.shyqxx
        // this.expandshktcp = this.shktcp
        // this.expandshtsqk = this.shtsqk
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
            });
        },
        xxx(row, column, cell, event){
            if(column.label == '操作'){
                this.caozuo(row.caozuo)
            }
        },
        caozuo(text){
            this.$confirm('确认'+text+'?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            callback:function(item){
                if(item == 'confirm'){
                params.id = self.idList.join(',')
                self.$axios.post('/url',qs.stringify(params)).then(res => {
                    var response = res.data
                    if(response.code == '200'){
                    self.listQuery("/xxx","cuscheckimmune")
                    self.$message({  //成功弹框
                        showClose: true,
                        message: '删除成功',
                        type: 'success'
                    });
                    }else{
                    this.$message.error({message:response.msg,center: true});
                    }
                }) 
                
                }
            }
            }) 
        },
        clickActive(targ){
            Array.from(targ.parentNode.children).map(function(ele){
            ele.classList.remove('active')
            })
        },
        getChartData(id,flag,targ){
            var otarg = targ.target
            this.clickActive(otarg)
            otarg.classList.add('active')
            
            switch(id){
            case 'myChart1':
                this.getChartData1(id,flag)
            break;
            case 'myChart2':
                this.getChartData2(id,flag)
            break;
            case 'myChart3':
                this.getChartData3(id,flag)
            break;
            }
        },
        getChartData1(id,flag){
            var self = this
            var param = {
            "merchantno":1,
            "time":flag
            }
            this.$axios.post('url1',qs.stringify(param)).then(res => {
            var response = res.data
            if(response.code == '200'){
                if(JSON.stringify(response.data) == "{}"){
                self.clearData1()
                self.drawLine1()
                return false
                }
                option1.xAxis[0].data = response.data.times  //时间
                option1.series[0].data = this.dostr(response.data.transactionMoney) //成功交易额(yi元)
                option1.series[1].data = this.dostr(response.data.fraudMoney) //成功欺诈额(万元)
                self.drawLine1() 
            }else{
                this.$message.error({message:response.msg,center: true});
            }
            })
        },
        getChartData2(id,flag){
            var self = this
            var param = {
            "merchantno":1,
            "time":flag
            }
            this.$axios.post('url3',qs.stringify(param)).then(res => {
            var response = res.data
            if(response.code == '200'){
                if(JSON.stringify(response.data) == "{}"){
                self.clearData2()
                self.drawLine2()
                return false
                }
                option2.xAxis[0].data = response.data.times  //时间
                option2.series[0].data = this.dostr(response.data.transactionMoney) //成功交易额(yi元)
                option2.series[1].data = this.dostr(response.data.fraudMoney) //成功欺诈额(万元)
                self.drawLine2() 
            }else{
                this.$message.error({message:response.msg,center: true});
            }
            })
        },
        getChartData3(id,flag){
            var self = this
            var param = {
            "merchantno":1,
            "time":flag
            }
            this.$axios.post('url3',qs.stringify(param)).then(res => {
            var response = res.data
            if(response.code == '200'){
                if(JSON.stringify(response.data) == "{}"){
                self.clearData3()
                self.drawLine3()
                return false
                }
                option3.xAxis[0].data = response.data.times  //时间
                option3.series[0].data = this.dostr(response.data.transactionMoney) //成功交易额(yi元)
                option3.series[1].data = this.dostr(response.data.fraudMoney) //成功欺诈额(万元)
                self.drawLine3() 
            }else{
                this.$message.error({message:response.msg,center: true});
            }
            })
        },
        drawLine1(){
            // 基于准备好的dom，初始化echarts实例
             myChart1 = this.$echarts.init(document.getElementById('myChart1'))
            // 绘制图表
            myChart1.clear()
             loadingTicket1 = setTimeout(function (){
                  myChart1.hideLoading();
                  myChart1.setOption(option1);
                  clearTimeout(loadingTicket1);
                 
              },2000);
            myChart1.showLoading({
                text : '数据拼命加载中...',
                effect :"whirling" ,
                textStyle : {
                    fontSize : 16
                },
                effectOption: {backgroundColor: 'rgba(0, 0, 0, 0.05)'}
            });
        },
        drawLine2(){
            // 基于准备好的dom，初始化echarts实例
             myChart2 = this.$echarts.init(document.getElementById('myChart2'))
            // 绘制图表
            myChart2.clear()
            loadingTicket2 = setTimeout(function (){
                  myChart2.hideLoading();
                  myChart2.setOption(option2);
                  clearTimeout(loadingTicket2);
                 
              },2000);
            myChart2.showLoading({
                text : '数据拼命加载中...',
                effect :"whirling" ,
                textStyle : {
                    fontSize : 16
                },
                effectOption: {backgroundColor: 'rgba(0, 0, 0, 0.05)'}
            });
        },
        drawLine3(){
            // 基于准备好的dom，初始化echarts实例
             myChart3 = this.$echarts.init(document.getElementById('myChart3'))
            // 绘制图表
            myChart3.clear()
            loadingTicket3 = setTimeout(function (){
                  myChart3.hideLoading();
                  myChart3.setOption(option3);
                  clearTimeout(loadingTicket3);
                 
              },2000);
            myChart3.showLoading({
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
var color= ['#E0CDD1','#FBEBDC','#788A72','#C8B8A9','#C8B8A9','#D6D4C8','#F2EEED','#FBE8DA','#FBE8DA','#B7C6B3','#A47C7C','#C2C8D8','#7A7385','#E0CDD3','#B3B1A4','#A0A5BB','#D7C9AF',]
var option1 = {
    title : {
        text: '',
         x: 'center'
    },
    tooltip: {
        trigger: 'axis',
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
var option2 = {
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
          var str0=''
          var str=''
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
var option3 = {
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
          if(item[2].toString().indexOf('%') == -1){
              str+=item[2].toFixed(2)+'%\<br>'
            }else{
              str+=item[2]+'\<br>'
            }
          params.map(function(item,index){
            str0=item[1]+'\<br>'
            str+=item[0]+': '
            if(index==1){
              str+=addCommas(Number(item[2]).toFixed(2))+'\<br>'
            }
            if(index == 0){
              str+=Number(item[2]).toFixed(2)+'\<br>'
            }
          })
          return str0+str
        }
    },
    legend: {
        y:'10px',
        textStyle:{
            fontSize:10,
            color:'black'

        },
        itemGap:-1,
        data:['商户综合费率','万元毛利收益']
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
        x2:36,
        y2: 60,// y2可以控制 X轴跟Zoom控件之间的间隔，避免以为倾斜后造成 label重叠到zoom上  控制x轴刻度线高度
    },
    yAxis: [
        {
            type: 'value',
            name: '',
           splitNumber:5,
            axisLabel: {
                formatter: '{value}%'
            }
        },
        {
            type: 'value',
            name:'',
           splitNumber:5,
            axisLabel: {
                formatter: '{value}'
            }
        }
    ],
    series: [
        {
            symbol: "none",// 去掉折线上面的小圆点
            name: '商户综合费率',
            type: 'line',
            itemStyle:{
                normal:{
                    color:color[7]  //改变珠子颜色
                }
            },
            data: [60,80,20,90,100,10,30,40]
        },
        {
           symbol: "none",// 去掉折线上面的小圆点
            name: '万元毛利收益',
            type: 'line',
            yAxisIndex: 1,
            itemStyle:{
                normal:{
                    color:color[10]  //改变珠子颜色
                }
            },
            data: [30,100,20,60,10,90,30,40]
        }
    ]
};
</script>
<style lang="less">
    @import '../less/style.less';
</style>
