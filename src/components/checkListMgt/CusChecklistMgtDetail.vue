<!--非Epos交易查询detail-->
<template>
    <div id="CusChecklistMgtDetail">
        <div class="contentBotoom clear">
            <div class="button fl">
                <div class="leftButton clear ">
                    <div class="BotoomBtn leftRadius" v-show="xxx" title="生成商户案件" >
                        <div class="scshaj"></div>
                    </div>
                    <div class="BotoomBtn" v-show="ahthpf"  title="派发" @click="pf">
                        <div class="pf"></div>
                    </div>
                     <div class="BotoomBtn" v-show="ahthcl"  title="处理" @click="cl">
                        <div class="cl"></div>
                    </div>
                    <div class="BotoomBtn rightRadius" v-show="ahthsh"  title="审核" @click="sh">
                        <div class="sh"></div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 各种table 开始 -->
        <div class="fs18 ">
            <h3 class="dis-inline fs18">商户基本信息</h3>
        </div>
        <table  cellspacing="0" cellpadding="0" style="width:100%;"> 
                <tr>
                    <td  class="bgf5" style="min-width:100px;">商户唯一标识</td>
                    <td style="min-width:100px;">{{detailList.userId}}</td>
                    <td  class="bgf5" style="min-width:100px;">商户编号</td>
                    <td style="min-width:100px;">{{detailList.fromCity}}</td>
                    <td  class="bgf5" style="min-width:100px;">商户签约名</td>
                    <td style="min-width:100px;">{{detailList.ip}}</td>
                    <td class="bgf5" style="min-width:100px;">商户名称</td>
                    <td style="min-width:100px;">{{detailList.orderNo}}</td>
                     <td class="bgf5" style="min-width:100px;">KYC认定</td>
                    <td style="min-width:100px;">{{detailList.orderNo}}</td>
                     <td class="bgf5" style="min-width:100px;">初始结果</td>
                    <td style="min-width:100px;">{{detailList.orderNo}}</td>
                     <td class="bgf5" style="min-width:100px;">复核结果</td>
                    <td style="min-width:100px;">{{detailList.orderNo}}</td>

                </tr>
                <tr>
                    <td class="bgf5">人工识别结果</td>
                    <td>{{detailList.mac}}</td>
                    <td class="bgf5">唯一标识下商编数</td>
                    <td>{{detailList.faileReason}}</td>
                     <td class="bgf5">商户报备标签</td>
                    <td>{{detailList.bankName}}</td>
                     <td class="bgf5">商户评级</td>
                    <td>{{detailList.merchantWay}}</td>
                    <td class="bgf5">销售</td>
                    <td>{{detailList.merchantWay}}</td>
                    <td class="bgf5">分公司</td>
                    <td>{{detailList.merchantWay}}</td>
                    <td class="bgf5">商户入网日期</td>
                    <td>{{detailList.merchantWay}}</td>
                </tr>
                 <tr>
                    <td class="bgf5">商户自然属性一级</td>
                    <td>{{detailList.passengerId}}</td>
                    <td class="bgf5">商户自然属性二级</td>
                    <td>{{detailList.passengerIdType}}</td>
                     <td class="bgf5">行业业绩属性</td>
                    <td>{{detailList.passengerMobile}}</td>
                     <td class="bgf5">代理商编号</td>
                    <td>{{detailList.passengerName}}</td>
                    <td class="bgf5">代理商名称</td>
                    <td>{{detailList.passengerMobile}}</td>
                    <td class="bgf5">营业执照号</td>
                    <td>{{detailList.passengerMobile}}</td>
                    <td class="bgf5">特批情况</td>
                    <td>{{detailList.passengerMobile}}</td>
                </tr>
                <tr>
                    <td class="bgf5">法人姓名</td>
                    <td>{{detailList.isCardholderPassenger}}</td>
                    <td class="bgf5">法人身份证号</td>
                    <td>{{detailList.isOneWay}}</td>
                     <td class="bgf5">APP名称</td>
                    <td>{{detailList.userScene}}</td>
                    <td class="bgf5">公众号名称</td>
                    <td>{{detailList.bankChannelId}}</td>
                    <td class="bgf5">上一次巡检结果</td>
                    <td>{{detailList.isOneWay}}</td>
                    <td class="bgf5">上一次巡检日期</td>
                    <td>{{detailList.isOneWay}}</td>
                    <td class="bgf5"></td>
                    <td>{{detailList.isOneWay}}</td>
                </tr>
                 <tr>
                    <td class="bgf5" style="border-bottom:1px solid #ebeef5;">报备网址</td>
                    <td colspan="3">{{detailList.timeInterval}}</td>
                     <td class="bgf5" style="border-bottom:1px solid #ebeef5;">投诉举报次数</td>
                    <td>{{detailList.contactMobile}}</td>
                     <td class="bgf5" style="border-bottom:1px solid #ebeef5;">舆情次数</td>
                    <td>{{detailList.cardNo}}</td>
                     <td class="bgf5" style="border-bottom:1px solid #ebeef5;"></td>
                    <td>{{detailList.cardHolderId}}</td>
                    <td class="bgf5" style="border-bottom:1px solid #ebeef5;"></td>
                    <td>{{detailList.cardHolderId}}</td>
                    <td class="bgf5" style="border-bottom:1px solid #ebeef5;"></td>
                    <td>{{detailList.cardHolderId}}</td>
                </tr>
        </table>
         <!-- end -->
        <div class="fs18 mt30">
            <h3 class="dis-inline fs18">商户核查单情况(近30天)</h3><i class="el-icon-arrow-down fs24 mr30"></i>总计：<span>2</span> 条
        </div>
        <el-table
            :data="shhcdqk"
            height="250"
            border
            style="width: 100%">
            <el-table-column
              prop="date"
              label="核查单号"
              width="120">
            </el-table-column>
            <el-table-column
              prop="name"
              label="生成时间"
              width="220">
            </el-table-column>
            <el-table-column
              prop="address"
              width="100"
              label="处理状态">
            </el-table-column>
            <el-table-column
              prop="address"
              width="100"
              label="风险处理">
            </el-table-column>
            <el-table-column
              prop="address"
              width="100"
              label="核查单来源">
            </el-table-column>
            <el-table-column
              prop="address"
              width="200"
              label="受理日期">
            </el-table-column>
            <el-table-column
              prop="address"
              width="100"
              label="投诉来源">
            </el-table-column>
            <el-table-column
              prop="address"
              width="140"
              label="投诉原因">
            </el-table-column>
            <el-table-column
              prop="address"
              width="100"
              label="举报类型">
            </el-table-column>
            <el-table-column
              prop="address"
              width="120"
              label="触发规则">
            </el-table-column>
            <el-table-column
              prop="address"
              width="100"
              label="KYC结果值">
            </el-table-column>
            <el-table-column
              prop="address"
              width="100"
              label="规则分值">
            </el-table-column>
            <el-table-column
              prop="address"
              width="240"
              label="舆情新闻">
            </el-table-column>
            <el-table-column
              prop="address"
              width="220"
              label="舆情摘要">
            </el-table-column>
            <el-table-column
              prop="address"
              width="100"
              label="最后操作人">
            </el-table-column>
            <el-table-column
              prop="address"
              width="200"
              label="最后操作时间">
            </el-table-column>
            <el-table-column
              prop="address"
              width="180"
              label="备注">
            </el-table-column>
          </el-table>
        <!-- end -->
        <div class="fs18 mt30">
            <h3 class="dis-inline fs18">商户舆情信息</h3><i class="el-icon-arrow-down fs24 mr30"></i>总计：<span>2</span> 条
        </div>
        <el-table
            border
          :data="shyqxx"
          style="width: 100%">
          <el-table-column
            prop="date"
            label="舆情日期"
            >
          </el-table-column>
          <el-table-column
            prop="name"
            label="舆情新闻"
           >
          </el-table-column>
          <el-table-column
            prop="address"
            label="舆情摘要">
          </el-table-column>
          <el-table-column
            prop="address"
            label="舆情等级">
          </el-table-column>
        </el-table>
         <!-- end -->
        <div class="fs18 mt30">
            <h3 class="dis-inline fs18">商户评级详情</h3>
        </div>
        <el-table
            border
          :data="shpjxq"
          style="width: 100%">
          <el-table-column
            prop="date"
            label="评级日期"
            >
          </el-table-column>
          <el-table-column
            prop="name"
            label="评级结果"
           >
          </el-table-column>
          <el-table-column
            prop="address"
            label="计算公式(权重*欺诈金额/交易金额+权重*投诉金额/交易金额)">
          </el-table-column>
        </el-table>
        <!-- end -->
        <div class="fs18 mt30">
            <h3 class="dis-inline fs18">商户状态管理</h3> 
        </div>
         <table class="table" :data="shztgl" cellspacing="0" cellpadding="0" border="0" style="width:100%;"> 
                <tr>
                    <th class="bgf5">类型</th>
                    <th class="bgf5">当前状态</th>
                    <th class="bgf5">备注</th>
                    <th class="bgf5">最后操作日期</th>
                </tr>
                <tbody>
                    <tr>
                        <td class="bgf5">账户状态</td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td class="bgf5">客户状态</td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
                
        </table>
         <!-- end -->
        <div class="fs18 mt30">
            <h3 class="dis-inline fs18">商户开通产品</h3><i class="el-icon-arrow-down fs24 mr30"></i>
        </div>
        <el-table
            border
          :data="shktcp"
          style="width: 100%">
          <el-table-column
            prop="date"
            label="基础产品"
            >
          </el-table-column>
          <el-table-column
            prop="name"
            label="零售产品"
           >
          </el-table-column>
          <el-table-column
            prop="address"
            label="状态">
          </el-table-column>
          <el-table-column
            prop="address"
            label="更新日期">
          </el-table-column>
          <el-table-column
            prop="address"
            label="关闭/开通原因">
          </el-table-column>
        </el-table>
         <!-- end -->
        <div class="fs18 mt30">
            <h3 class="dis-inline fs18">商户投诉情况</h3> <i class="el-icon-arrow-down fs24 mr30"></i>
        </div>
        <el-table
            border
          :data="shtsqk"
          style="width: 100%">
          <el-table-column
            prop="date"
            label="受理日期"
            >
          </el-table-column>
          <el-table-column
            prop="name"
            label="投诉类型"
           >
          </el-table-column>
          <el-table-column
            prop="address"
            label="投诉来源">
          </el-table-column>
          <el-table-column
            prop="address"
            label="举报方式">
          </el-table-column>
          <el-table-column
            prop="address"
            label="举报人信息">
          </el-table-column>
          <el-table-column
            prop="address"
            label="举报类型">
          </el-table-column>
          <el-table-column
            prop="address"
            label="备注">
          </el-table-column>
        </el-table>
        <!-- 图表 -->
        <div class="mt20 mb30 w clear">
            <div class="fl" style="width:31%;margin-left:1%;">
                <h3 class="dis-inline fs18 ml30" style="background:#409EFF;color:white;padding:5px 10px;">商户交易毛利情况趋势</h3> 
                <div class="mb20 ml30">
                    <span class="active time mr30">近14天</span>
                    <span class="time mr30">近8周</span>
                    <span class="time">近6个月</span>
                </div>
                <div id="myChart1" class="center" :style="{width: '100%', height: '280px'}"></div>
            </div>
            <div class="fl" style="width:31%;margin-left:1%;">
                <h3 class="dis-inline fs18 ml30" style="background:#409EFF;color:white;padding:5px 10px;">商户投诉情况</h3> 
                <div class="mb20 ml30">
                    <span class="active time mr30">近14天</span>
                    <span class="time mr30">近8周</span>
                    <span class="time">近6个月</span>
                </div>
                <div id="myChart2" class="center" :style="{width: '100%', height: '280px'}"></div>
            </div> 
            <div class="fl" style="width:31%;margin-left:1%;margin-right:1%;">
                <h3 class="dis-inline fs18 ml30" style="background:#409EFF;color:white;padding:5px 10px;">商户综合费率及万元毛利收益</h3> 
                <div class="mb20 ml30">
                    <span class="active time mr30">近14天</span>
                    <span class="time mr30">近8周</span>
                    <span class="time">近6个月</span>
                </div>
                <div id="myChart3" class="center" :style="{width: '100%', height: '280px'}"></div>
            </div> 
        </div>
           
    </div>
</template>
<script>
import qs from 'qs';
var loadingTicket1,loadingTicket2,loadingTicket3,myChart1,myChart2,myChart3
export default {
    name:"商户核查单详情",
    data(){
        return{
            xxx:true,
            ahthpf:true,
            ahthcl:true,
            ahthsh:true,
            detailList:[],//商户基本信息
            shhcdqk:[],//商户核查单情况(近30天
            shyqxx:[],//商户舆情信息
            shpjxq:[],//商户评级详情
            shztgl:[],//商户状态管理
            shktcp:[],//商户开通产品
            shtsqk:[],//商户投诉情况
        }
    },
    mounted(){  //取详情列表
         this.drawLine();
    },
    methods:{
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
        drawLine(){
            // 基于准备好的dom，初始化echarts实例
             myChart1 = this.$echarts.init(document.getElementById('myChart1'))
             myChart2 = this.$echarts.init(document.getElementById('myChart2'))
             myChart3 = this.$echarts.init(document.getElementById('myChart3'))
            // 绘制图表
            myChart1.clear()
            myChart2.clear()
            myChart3.clear()
             loadingTicket1 = setTimeout(function (){
                  myChart1.hideLoading();
                  myChart1.setOption(option1);
                  clearTimeout(loadingTicket1);
                 
              },2000);
            loadingTicket2 = setTimeout(function (){
                  myChart2.hideLoading();
                  myChart2.setOption(option2);
                  clearTimeout(loadingTicket2);
                 
              },2000);
            loadingTicket3 = setTimeout(function (){
                  myChart3.hideLoading();
                  myChart3.setOption(option3);
                  clearTimeout(loadingTicket3);
                 
              },2000);
            myChart1.showLoading({
                text : '数据拼命加载中...',
                effect :"whirling" ,
                textStyle : {
                    fontSize : 16
                },
                effectOption: {backgroundColor: 'rgba(0, 0, 0, 0.05)'}
            });
            myChart2.showLoading({
                text : '数据拼命加载中...',
                effect :"whirling" ,
                textStyle : {
                    fontSize : 16
                },
                effectOption: {backgroundColor: 'rgba(0, 0, 0, 0.05)'}
            });
            myChart3.showLoading({
                text : '数据拼命加载中...',
                effect :"whirling" ,
                textStyle : {
                    fontSize : 16
                },
                effectOption: {backgroundColor: 'rgba(0, 0, 0, 0.05)'}
            });
        },
    }
}
var option1 = {
    title : {
        text: '',
         x: 'center'
    },
    tooltip: {
        trigger: 'axis',
    //     formatter:function (params) {
    //      function addCommas(nStr){  //每三位分隔符
    //          nStr += '';
    //          var x = nStr.split('.');
    //          var x1 = x[0];
    //          var x2 = x.length > 1 ? '.' + x[1] : '';
    //          var rgx = /(\d+)(\d{3})/;
    //          while (rgx.test(x1)) {
    //           x1 = x1.replace(rgx, '$1' + ',' + '$2');
    //          }
    //          return x1 + x2;
    //       }
    //       var str0=''
    //       var str=''
    //       params.map(function(item,index){
    //         str0=item[1]+'\<br>'
    //         str+=item[0]+': '
    //         if(index==0 || index==1 || index==2 || index==3){
    //           str+=addCommas(Number(item[2]).toFixed(2))+'\<br>'
    //         }
    //         if(index==4){
    //           str+=Number(item[2]).toFixed(2)+'\<br>'
    //         }
            
    //       })
    //       return str0+str
    //     }
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
        data:['收单金额','毛利']
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
          barMaxWidth:10,
            name:'收单金额',
            type:'bar',
            data:[100,200],
            itemStyle:{
                normal:{
                    color:'#f00'  //改变珠子颜色
                }
            }
        },
        {
          symbol: "none",// 去掉折线上面的小圆点
          barMaxWidth:10,
            name:'毛利',
            type:'bar',
            data:[220,300],
            yAxisIndex: 1,
            itemStyle:{
                normal:{
                    color:'#0f0'  //改变珠子颜色
                }
            }
        } 
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
        // formatter:function (params) {
        //   var str0=''
        //   var str=''
        //   params.map(function(item,index){
        //     str0=item[1]+'\<br>'
        //     str+=item[0]+': '
        //     if(item[2].toString().indexOf('%') == -1){
        //       str+=item[2].toFixed(2)+'%\<br>'
        //     }else{
        //       str+=item[2]+'\<br>'
        //     }
            
        //   })
        //   return str0+str
        // },
    },
    legend: {
        y:'10px',
        textStyle:{
            fontSize:10,
            color:'black'

        },
        itemGap:-1,
        data:['总投诉率(交易笔数)','总投诉率(交易笔数)','商户投诉率(交易笔数)','商户投诉率(交易笔数)','欺诈率']
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
        },
        {
            type: 'value',
            name:'欺诈率',
           splitNumber:5,
            axisLabel: {
                formatter: '{value}%'
            }
        }
    ],
    series: [
        {
            symbol: "none",// 去掉折线上面的小圆点
            name: '总投诉率(交易笔数)',
            type: 'line',
            data: [60,80,20,90,100,10,30,40]
        },
        {
             symbol: "none",// 去掉折线上面的小圆点
            name: '总投诉率(交易笔数)',
            type: 'line',
            data: [50,20,70,10,90,60,50,40]
        },
        {
           symbol: "none",// 去掉折线上面的小圆点
            name: '商户投诉率(交易笔数)',
            type: 'line',
            data: [30,20,40,90,80,40,10,50]
        },
        {
           symbol: "none",// 去掉折线上面的小圆点
            name: '商户投诉率(交易笔数)',
            type: 'line',
            data: [10,90,70,40,80,20,30,50]
        },
        {
           symbol: "none",// 去掉折线上面的小圆点
            name: '欺诈率',
            type: 'line',
            yAxisIndex: 1,
            data: [0.6,0.4,0.8,0.3,0.7,0.1,0.7,0.2]
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
        // formatter:function (params) {
        //   var str0=''
        //   var str=''
        //   params.map(function(item,index){
        //     str0=item[1]+'\<br>'
        //     str+=item[0]+': '
        //     if(item[2].toString().indexOf('%') == -1){
        //       str+=item[2].toFixed(2)+'%\<br>'
        //     }else{
        //       str+=item[2]+'\<br>'
        //     }
            
        //   })
        //   return str0+str
        // },
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
            data: [60,80,20,90,100,10,30,40]
        },
        {
           symbol: "none",// 去掉折线上面的小圆点
            name: '万元毛利收益',
            type: 'line',
            yAxisIndex: 1,
            data: [60,80,20,90,100,10,30,40]
        }
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
