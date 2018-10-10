<!--非Epos交易查询detail-->
<template>
    <div id="MerchantIdentityDetail">
        <!-- 各种table 开始 -->
        <div class="fs18 ">
            <h3 class="dis-inline fs18">分公司基本信息</h3>
        </div>
        <table  cellspacing="0" cellpadding="0" style="width:100%;"> 
            <tr align="center">
                <td  class="bgf5 fs12" style="min-width:100px;font-weight:700;">分公司</td>
                <td style="min-width:100px;">{{company}}</td>
                <td  class="bgf5 fs12" style="min-width:100px;font-weight:700;">风险商户数</td>
                <td style="min-width:100px;font-weight:700;">{{detailList.allCustomer}}</td>
                <td  class="bgf5 fs12" style="min-width:100px;font-weight:700;">风险商户数占比</td>
                <td style="min-width:100px;">{{detailList.riskCustomerPercent}}</td>
                <td  class="bgf5 fs12" style="min-width:100px;font-weight:700;">A类销售占比</td>
                <td style="min-width:100px;">{{detailList.aSalePercent}}</td>
                <td  class="bgf5 fs12" style="min-width:100px;font-weight:700;">B类销售占比</td>
                <td style="min-width:100px;">{{detailList.bSalePercent}}</td>
                <td  class="bgf5 fs12" style="min-width:100px;font-weight:700;">C类销售占比</td>
                <td style="min-width:100px;">{{detailList.cSalePercent}}</td>
            </tr>
        </table>
         <!-- end -->
        <div class="fs18 mt30">
            <h3 class="dis-inline fs18">分公司评级详情</h3>
        </div>
        <el-table
          border
          :data="shpjxq"
          style="width: 100%">
          <el-table-column
            prop="date"
            align="center"
            label="评级日期"
            >
          </el-table-column>
          <el-table-column
            prop="level"
            align="center"
            label="评级结果"
           >
          </el-table-column>
          <el-table-column
            prop="formula"
            label="计算公式(权重*欺诈金额/成功收单金额+权重*投诉金额/成功收单金额)">
          </el-table-column>
        </el-table>
        <!-- end -->
        <!-- 图表 -->
        <div class="mt20 mb30 ">
            <div>
                <h3 class="dis-inline fs18 ml30" style="background:#409EFF;color:white;padding:5px 10px;">商户情况</h3> 
                <div class="mb20 ml30">
                    <span class="active time mr30" @click='getChartData("myChart1","1",$event)'>近14天</span>
                    <span class="time mr30" @click='getChartData("myChart1","2",$event)'>近8周</span>
                    <span class="time" @click='getChartData("myChart1","3",$event)'>近6个月</span> &nbsp; &nbsp;
                    <span style="color:#f7b980;font-size:10px;">友情提示:&nbsp;&nbsp;</i><i style="color:#7a8d74;font-style:normal;">柱子左: </i>交易金额 &nbsp; &nbsp;<i style="color:#7a8d74;font-style:normal;">柱子右: </i>毛利</span>
                    <div id="myChart1" class="mt20" :style="{width: '70%', height: '300px'}">
                </div>
               </div>
                 
            </div>
            
        </div>
           
    </div>
</template>
<script>
import qs from 'qs';
var loadingTicket1,myChart1 
export default {
    name:"分公司画像",
    data(){
        return{
           pageNumber:1,
           pageRow:10,
           length:0,  
            xxx:true,
            ahthpf:true,
            ahthcl:true,
            ahthsh:true,
            detailList:{},//商户信息
            shqk:[{
              "date":'1',
              "name":'xx',
              "ddd":'xx',
              "fff":'xx',
              "sss":'xx',
              "ccc":'xx',
              "www":'xx',
            }],//商户情况
            shpjxq:[{
              "date":'xx',
              "name":'xx',
              "ddd":'xx',
              "fff":'xx',
              "sss":'xx',
              "ccc":'xx',
              "www":'xx',
            }],//商户开通产品情况
            company:''
        }
    },
    mounted(){  //取详情列表
         // this.drawLine1();
         this.getBranchPortraitList()//详情信息
         this.getChartData('myChart1','1')
         this.company = this.$route.params.branchCompany
    },
    methods:{
      getBranchPortraitList(){  //详情信息
        var self = this
        // var param = {
        //   customerSignArr : self.$route.params.customerSign,
        //   pageNumber : self.pageNumber,
        //   pageRow : self.pageRow,
        // }
        var branchName = {
          branchName:self.$route.params.branchCompany
        }
        this.$axios.get('/branchPortraitController/getBranchPortrait',{params:branchName}).then(res => {
          var response = res.data
          if(response.code == '200'){

            self.detailList= response.data.branchBaseInfo[0]
            self.shpjxq = response.data.branchLevel
          }else{
            this.failTip(response.errMsg)
          }
        }) 
      },
      handleCurrentChange(val) {  //处理当前页
         this.pageNumber = `${val}`  //当前页
         this.getChartData('myChart1','1')
      },
      clickActive(targ){
        Array.from(targ.parentNode.children).map(function(ele){
          ele.classList.remove('active')
        })
      },
      getPara(flag){
        var self = this,dateType,dateCount
        if(flag == '1'){
            dateType = 'day'
            dateCount = 14
          }else if(flag == '2'){
            dateType = 'week'
            dateCount = 8
          }else if(flag == '3'){
            dateType = 'month'
            dateCount = 6
          }
          return {
            "branchName":self.$route.params.branchCompany,  //商户唯一标识
            "dateType":dateType,
            "dateCount":dateCount,
          }
      },
      getChartData(id,flag,targ){  //商户交易毛利欺诈情况
        var self = this
        if(targ){
          var otarg = targ.target
          this.clickActive(otarg)
          otarg.classList.add('active')
        }
        var param = this.getPara(flag)
        this.$axios.post('/branchPortraitController/getMerchantChart',qs.stringify(param)).then(res => {
          var response = res.data
          if(response.code == '200'){
            if(JSON.stringify(response.data) == "{}"){
              self.clearData1()
              self.drawLine1()
              return false
            }
            option1.series = [] //清空
            // option1.legend.data = [] //清空
            option1.xAxis[0].data = response.data.times  //时间轴
            var ms = response.data.Money
            var moneyName = response.data.Money_name
            var index0 = -1
            for(var ele in ms){  //收单金额堆积效果
              index0++
              var seriesItem = {
                name: ele,
                type: 'bar',
                barMaxWidth: 10,
                stack: 'money',
                data: ms[ele],
                itemStyle:{
                    normal:{
                        color:color[index0]  //改变颜色
                    }
                }
              }
              option1.series.push(seriesItem)
            }
            var ps = response.data.Profit
            var profitName = response.data.Profit_name
            var index1 = -1
            for(var ele in ps){  //毛利堆积效果
              index1++
              var seriesItem = {
                name: ele,
                type: 'bar',
                barMaxWidth: 10,
                stack: 'money2',
                data: ps[ele],
                itemStyle:{
                    normal:{
                        color:color[index1]  //改变颜色
                    }
                }
              }
              option1.series.push(seriesItem)
            }
            var rateItem = {
              symbol: "none",// 去掉折线上面的小圆点
                name:'欺诈损失率(0.01BP)',
                type:'line',
                yAxisIndex: 1,
                itemStyle:{
                    normal:{
                        color:color[2]   
                    }
                },
                data:response.data.returnList.fraudLossRate
            }
            option1.series.push(rateItem)

            var rateItem2 = {
              symbol: "none",// 去掉折线上面的小圆点
                name:'投诉商户占比',
                type:'line',
                yAxisIndex: 1,
                itemStyle:{
                    normal:{
                        color:color[8]   
                    }
                },
                data:response.data.returnList.merchantComplaintsRate
            }
            option1.series.push(rateItem2)
            console.log(JSON.stringify(option1, null, 2))
            self.drawLine1() 
          }else{
            this.$message.error({message:response.msg,center: true});
          }
        })
      },
      clearData1(){
        option1.xAxis[0].data = []//时间
          option1.series[0].data =[] // 
          option1.series[1].data = [] // 
      },
      openandclose(data,obj){  //表格得收缩与展开显示
        var self = this
        if(obj.target.classList.contains('el-icon-arrow-down')){
          obj.target.classList.remove('el-icon-arrow-down')
          obj.target.classList.add('el-icon-arrow-up')
          switch(data){
            case 'shqk':
              var temp = self.shqk
              self.shqk = [temp[0]]
            break;
            case 'shktqk':
              var temp = self.shqk
              self.shktqk = [temp[0]]
            break;
          }
           
        }else{
          obj.target.classList.add('el-icon-arrow-down')
          obj.target.classList.remove('el-icon-arrow-up')
          switch(data){
            case 'shqk':
              self.shqk  = self.expandshqk
            break;
            case 'shktqk':
              self.shktqk  = self.expandshktqk
            break;
          } 
        }
      },
      pf(){  //怕发
            var self = this
            if(self.lsstShow){
                if(self.idList.length < 1){
                    this.atleastOne()
                    return false
                }
            }else if(self.ztstShow){
                if(self.chackboxChoose.length < 1){
                    this.atleastOne()
                    return false
                }
            }
            
            this.dispatchformElementVisible = true
        },
        cl(){  //处理
            var self = this
           if(self.lsstShow){
                if(self.idList.length < 1){
                    this.atleastOne()
                    return false
                }
            }else if(self.ztstShow){
                if(self.chackboxChoose.length < 1){
                    this.atleastOne()
                    return false
                }
            }
             this.processElementVisible = true
        },
        sh(){  //审核
            var self = this
           if(self.lsstShow){
                if(self.idList.length < 1){
                    this.atleastOne()
                    return false
                }
            }else if(self.ztstShow){
                if(self.chackboxChoose.length < 1){
                    this.atleastOne()
                    return false
                }
            }
            this.auditformElementVisible = true
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
                color:'black',
                effectOption: {backgroundColor: 'rgba(0, 0, 0, 0.05)'}
            });
        },
    }
}
var color= ['#c49d97','#7a8d76','#eac0ac','#eac0ac','#8f8a7d','#faeacc','#818597','#aa8c8c','#91859c','#8f8d7e','#ea8f6a','#809668','#f7e3bf','#8ab483','#b2969c','#d0b7f5']
var option1 = {
    title : {
        text: '',
         x: 'left'
    },
    tooltip: {
      show:true,
        trigger: 'item',
    },
    toolbox: {
        show : true,
        feature : {
            saveAsImage : {
              show: true,
              type:'png',
              name:''
            }
        }
    },
    grid:{
      x2:106
    },
    legend: {
      show:true,
      bottom:'100px',
        y:'10px',
        y2:'60px',
        x:'center',
        data:['欺诈损失率(0.01BP)','投诉商户占比']
    },
    xAxis: [
        {
          splitLine:{show: false},//去除网格线
          type: 'category',
          data: ['08/01'],
          axisLabel:{
              rotate: 30,
              show: true,
              interval: 0,
              textStyle:{
                fontSize:12,
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
            },
            position:'left',
        },
        {
            type: 'value',
            name:'0.01BP/%',
           splitNumber:5,
            axisLabel: {
                formatter: '{value}'
            },
            position:'right',
        }
       
    ],
    series: [
        //  {
        //     name:'收单金额1',
        //     type:'bar',
        //     barMaxWidth:10,
        //     stack: '收单金额2',
        //     data:[620, 732],
        //     itemStyle:{
        //         normal:{
        //             color:color[0]  //改变珠子颜色
        //         }
        //     },
        // },
        // {
        //     name:'收单金额2',
        //     type:'bar',
        //     barMaxWidth:10,
        //     stack: '收单金额2',
        //     data:[120, 132],
        //     itemStyle:{
        //         normal:{
        //             color:color[1]  //改变珠子颜色
        //         }
        //     },
        //     yAxisIndex:0,
        // },
        // {
        //     name:'收单金额3',
        //     type:'bar',
        //      barMaxWidth:10,
        //     stack: '收单金额2',
        //     data:[60, 72],
        //     itemStyle:{
        //         normal:{
        //             color:color[2]  //改变珠子颜色
        //         }
        //     },
        //     yAxisIndex:0,
        // },
        // {
        //     name:'收单金额7',
        //     type:'bar',
        //      barMaxWidth:10,
        //     stack: '收单金额2',
        //     data:[60, 72],
        //     itemStyle:{
        //         normal:{
        //             color:color[6]  //改变珠子颜色
        //         }
        //     },
        //     yAxisIndex:0,
        // },
        // {
        //   symbol: "none",// 去掉折线上面的小圆点
        //   barMaxWidth:10,
        //     name:'毛利1',
        //     type:'bar',
        //     data:[2220,300],
        //     stack: '毛利',
        //     itemStyle:{
        //         normal:{
        //             color:color[color.length-1]  //改变珠子颜色
        //         }
        //     },
        //     yAxisIndex:0,
        // },
        // {
        //   symbol: "none",// 去掉折线上面的小圆点
        //   barMaxWidth:10,
        //     name:'毛利6',
        //     type:'bar',
        //     data:[420,220],
        //     stack: '毛利',
        //     itemStyle:{
        //         normal:{
        //             color:color[color.length-6]  //改变珠子颜色
        //         }
        //     },
        //     yAxisIndex:0,
        // },
        // {
        //   symbol: "none",// 去掉折线上面的小圆点
        //   barMaxWidth:10,
        //     name:'毛利7',
        //     type:'bar',
        //     data:[420,220],
        //     stack: '毛利',
        //     itemStyle:{
        //         normal:{
        //             color:color[color.length-7]  //改变珠子颜色
        //         }
        //     },
        //     yAxisIndex:0,
        // },
        // {
        //   symbol: "none",// 去掉折线上面的小圆点
        //     name:'xxx(0.01BP)',  
        //     type:'line',
        //     data:[70.5,4.66,200] ,
        //     yAxisIndex: 1,
        //     itemStyle:{
        //         normal:{
        //             color:'#A47C7C'  //改变珠子颜色
        //         }
        //     },
        //     yAxisIndex:1,
        // },
        // {
        //   symbol: "none",// 去掉折线上面的小圆点
        //     name:'投诉商户占比',  
        //     type:'line',
        //     data:[20,100,80] ,
        //     yAxisIndex: 1,
        //     itemStyle:{
        //         normal:{
        //             color:'#A47C7C'  //改变珠子颜色
        //         }
        //     },
        // }

    ]
};
</script>
<style scoped lang="less">
.active{background:#ecf5ff;color:#409eff;border-color:#b3d8ff;padding:6px 10px;border-radius: 100%;}
.time{padding:6px 10px;border-radius: 100%;}
.time:hover{background: #409eff;color:white;cursor:pointer;}
.el-icon-arrow-up:before{color:#999;}
.el-icon-arrow-down:before{font-weight:800;color:#999;}
table{border-right:1px solid #ebeef5;font-size:12px;border-bottom: 1px solid #ebeef5;}
td{border:solid #ebeef5; border-width:1px 0px 0px 1px;height: 50px;color:#636363;}
.bgf5{background: #F5F6FA;text-align: center;}  
table.table{
    border:1px solid #ebeef5;
    td{border-top:1px solid #ebeef5; border-right:none;height: 50px;text-align: center;color:#636363;}
    th{color:#636363;height: 50px;}
}
.contentBotoom {
    height: 60px;
    font-size: 13px;
    padding-top: 20px;
    margin-left: 45px;
}
.BotoomBtn {
    width: 44px;
    height: 30px;
    margin: 0;
    margin-left: -1px;
    border: 1px solid #38e139;
    float: left;
    cursor: pointer;
}
  .BotoomBtn:hover {
    background-color: #38e139;
  }
.leftRadius {
    border-top-left-radius: 7px;
    border-bottom-left-radius: 7px;
}
.rightRadius {
    border-top-right-radius: 7px;
    border-bottom-right-radius: 7px;
}  
</style>
