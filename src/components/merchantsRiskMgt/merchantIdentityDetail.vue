<!--非Epos交易查询detail-->
<template>
    <div id="MerchantIdentityDetail">
        <!-- 各种table 开始 -->
        <div class="fs18 ">
            <h3 class="dis-inline fs18">基本信息</h3>
        </div>
        <table  cellspacing="0" cellpadding="0" style="width:100%;"> 
            <tr>
                <td  class="bgf5 fs12" style="min-width:100px;font-weight:700;">商户唯一标识</td>
                <td style="min-width:100px;">{{detailList.userId}}</td>
                <td  class="bgf5 fs12" style="min-width:100px;font-weight:700;">唯一标识风险评级</td>
                <td style="min-width:100px;font-weight:700;">{{detailList.fromCity}}</td>
                <td  class="bgf5 fs12" style="min-width:100px;font-weight:700;">下属商编数</td>
                <td style="min-width:100px;">{{detailList.ip}}</td>
            </tr>
        </table>
         <!-- end -->
        <div class="fs18 mt30">
            <h3 class="dis-inline fs18">商户情况</h3><i class="el-icon-arrow-down fs24 mr30" @click='openandclose("shqk",$event)'></i> 
        </div>
        <el-table
            :data="shqk"
            border
            style="width: 100%">
            <el-table-column
              prop="date"
              label="商户编号"
              width="120">
            </el-table-column>
            <el-table-column
              prop="name"
              label="商户签约名"
              width="220">
            </el-table-column>
            <el-table-column
              prop="hhh"
              width="100"
              label="商户名称">
            </el-table-column>
            <el-table-column
              prop="fff"
              width="100"
              label="商户KYC">
            </el-table-column>
            <el-table-column
              prop="jjj"
              width="100"
              label="商户自然属性一级">
            </el-table-column>
            <el-table-column
              prop="mmm"
              width="200"
              label="代理商名编号">
            </el-table-column>
            <el-table-column
              prop="yyy"
              width="100"
              label="代理商名编号">
            </el-table-column>
            <el-table-column
              prop="ppp"
              width="140"
              label="商户入网日期">
            </el-table-column>
            <el-table-column
              prop="ooo"
              width="100"
              label="销售">
            </el-table-column>
            <el-table-column
              prop="lll"
              width="120"
              label="分公司">
            </el-table-column>
            <el-table-column
              prop="kkk"
              width="100"
              label="行业业绩属性">
            </el-table-column>
            <el-table-column
              prop="eee"
              width="100"
              label="商户状态">
            </el-table-column>
            <el-table-column
              prop="qqq"
              width="240"
              label="商户评级">
            </el-table-column>
            <el-table-column
              prop="bbb"
              width="220"
              label="舆情次数">
            </el-table-column>
            <el-table-column
              prop="nnn"
              width="100"
              label="投诉举报次数">
            </el-table-column>
            <el-table-column
              prop="rrr"
              width="200"
              label="上一次巡检结果">
            </el-table-column>
            <el-table-column
              prop="ttt"
              width="180"
              label="上一次巡检日期">
            </el-table-column>
            <el-table-column
              prop="ccc"
              width="180"
              label="APP名称">
            </el-table-column>
            <el-table-column
              prop="xxx"
              width="180"
              label="公众号名称">
            </el-table-column>
            <el-table-column
              prop="ddd"
              width="180"
              label="报备网址">
            </el-table-column>
          </el-table>
          <div class="block">
            <div class='paginationRight'>
               <el-pagination
                layout="total,prev, pager, next"
                :total=length
                @current-change="handleCurrentChange">
               </el-pagination>
               
            </div>
        </div>
        <!-- end -->
        <div class="fs18 mt30">
            <h3 class="dis-inline fs18">商户开通产品情况</h3><i class="el-icon-arrow-down fs24 mr30" @click='openandclose("shktqk",$event)'></i> 
        </div>
        <el-table
            border
          :data="shktqk"
          style="width: 100%">
          <el-table-column
            prop="date"
            label="商户编号"
            >
          </el-table-column>
          <el-table-column
            prop="name"
            label="商户签约名"
           >
          </el-table-column>
          <el-table-column
            prop="address"
            label="基础产品">
          </el-table-column>
          <el-table-column
            prop="address"
            label="零售产品">
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
         
        <!-- 图表 -->
        <div class="mt20 mb30 w clear">
            <div class="fl " style="width:44%;margin-left:1%;">
                <h3 class="dis-inline fs18 ml30" style="background:#409EFF;color:white;padding:5px 10px;">商户交易毛利情况趋势</h3> 
                <div class="mb20 ml30">
                    <span class="active time mr30" @click='getChartData("myChart1","1",$event)'>近14天</span>
                    <span class="time mr30" @click='getChartData("myChart1","2",$event)'>近8周</span>
                    <span class="time" @click='getChartData("myChart1","3",$event)'>近6个月</span> &nbsp; &nbsp;
                    <span style="color:#FBE9D5;font-size:10px;">友情提示:&nbsp;&nbsp;</i><i style="color:#B7C6B3;font-style:normal;">柱子左: </i>收单金额 &nbsp; &nbsp;<i style="color:#B7C6B3;font-style:normal;">柱子右: </i>毛利</span>
                </div>
                <div id="myChart1" class="center dis-inline" :style="{width: '100%', height: '300px'}"></div>
                
            </div>
            <div class="fl" style="width:26%;margin-left:1%;">
                <h3 class="dis-inline fs18 ml30" style="background:#409EFF;color:white;padding:5px 10px;">商户投诉情况</h3> 
                <div class="mb20 ml30">
                    <span class="active time mr30" @click='getChartData("myChart2","1",$event)'>近14天</span>
                    <span class="time mr30" @click='getChartData("myChart2","2",$event)'>近8周</span>
                    <span class="time" @click='getChartData("myChart2","3",$event)'>近6个月</span>
                </div>
                <div id="myChart2" class="center" :style="{width: '100%', height: '300px'}"></div>
            </div> 
            <div class="fl" style="width:26%;margin-left:1%;margin-right:1%;">
                <h3 class="dis-inline fs18 ml30" style="background:#409EFF;color:white;padding:5px 10px;">商户综合费率及万元毛利收益</h3> 
                <div class="mb20 ml30">
                    <span class="active time mr30" @click='getChartData("myChart3","1",$event)'>近14天</span>
                    <span class="time mr30" @click='getChartData("myChart3","2",$event)'>近8周</span>
                    <span class="time" @click='getChartData("myChart3","3",$event)'>近6个月</span>
                </div>
                <div id="myChart3" class="center" :style="{width: '100%', height: '300px'}"></div>
            </div> 
        </div>
           
    </div>
</template>
<script>
import qs from 'qs';
var loadingTicket1,loadingTicket2,loadingTicket3,myChart1,myChart2,myChart3
export default {
    name:"商户唯一标识详情",
    data(){
        return{
           pageNumber:1,
           pageRow:10,
           length:0,  
            xxx:true,
            ahthpf:true,
            ahthcl:true,
            ahthsh:true,
            detailList:[],//商户信息
            expandshqk:[],
            expandshktqk:[],
            shqk:[{
              "date":'1',
              "name":'xx',
              "ddd":'xx',
              "fff":'xx',
              "sss":'xx',
              "ccc":'xx',
              "www":'xx',
            },{
              "date":'2',
              "name":'xx',
              "ddd":'xx',
              "fff":'xx',
              "sss":'xx',
              "ccc":'xx',
              "www":'xx',
            },{
              "date":'3',
              "name":'xx',
              "ddd":'xx',
              "fff":'xx',
              "sss":'xx',
              "ccc":'xx',
              "www":'xx',
            }],//商户情况
            shktqk:[{
              "date":'xx',
              "name":'xx',
              "ddd":'xx',
              "fff":'xx',
              "sss":'xx',
              "ccc":'xx',
              "www":'xx',
            },{
              "date":'xx',
              "name":'xx',
              "ddd":'xx',
              "fff":'xx',
              "sss":'xx',
              "ccc":'xx',
              "www":'xx',
            },{
              "date":'xx',
              "name":'xx',
              "ddd":'xx',
              "fff":'xx',
              "sss":'xx',
              "ccc":'xx',
              "www":'xx',
            }]//商户开通产品情况
        }
    },
    mounted(){  //取详情列表
         this.drawLine1();
         this.drawLine2();
         this.drawLine3();
         this.expandshqk = this.shqk
         this.expandshktqk = this.shktqk
    },
    methods:{
      getMerchantIdDetailList(){  //商户唯一标识详情   /////
        var self = this
        var param = {
          customerSignArr : self.$route.params.customerSign,
          pageNumber : self.pageNumber,
          pageRow : 10,
        }
        this.$axios.post('/CustomerUniqueMarker/getDetailList',qs.stringify(param)).then(res => {
          var response = res.data
          if(response.code == '200'){
            console.log(response.data)
            // self.shyqxx = response.data.returnList
          }else{
            this.failTip(response.msg)
          }
        }) 
      },
      handleCurrentChange(val) {  //处理当前页
         this.pageNumber = `${val}`  //当前页
         this.getChartData()
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
      clearData1(){
        option1.xAxis[0].data = []//时间
          option1.series[0].data =[] // 
          option1.series[1].data = [] // 
      },
      clearData2(){
        option2.xAxis[0].data = []//时间
        option2.series[0].data =[] // 
        option2.series[1].data = [] // 
      },
      clearData3(){
        option3.xAxis[0].data = []//时间
        option3.series[0].data =[] // 
        option3.series[1].data = [] // 
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
          // console.log(params)
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
            if(index == (params.length-1)){
              str+=Number(item[2]).toFixed(2)+'\<br>'
            }else{
              str+=addCommas(Number(item[2]).toFixed(2))+'\<br>'
            }
          })
          // return str0+str
        }
    },
    toolbox: {
        show : true,
        feature : {
            saveAsImage : {show: true}
        }
    },
    grid:{
      x2:36
    },
    legend: {
        y:'10px',
        y2:'30px',
        x:'center',
        data:['收单金额1','收单金额2','收单金额3','收单金额4','收单金额5','收单金额6','收单金额7','毛利1','毛利2','毛利3','毛利4','毛利5','毛利6','毛利7','xxx(0.01BP)']
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
            name:'收单金额1',
            type:'bar',
            barMaxWidth:10,
            stack: '收单金额2',
            data:[620, 732],
            itemStyle:{
                normal:{
                    color:color[0]  //改变珠子颜色
                }
            }
        },
        {
            name:'收单金额2',
            type:'bar',
            barMaxWidth:10,
            stack: '收单金额2',
            data:[120, 132],
            itemStyle:{
                normal:{
                    color:color[1]  //改变珠子颜色
                }
            }
        },
        {
            name:'收单金额3',
            type:'bar',
             barMaxWidth:10,
            stack: '收单金额2',
            data:[60, 72],
            itemStyle:{
                normal:{
                    color:color[2]  //改变珠子颜色
                }
            }
        },
        {
            name:'收单金额4',
            type:'bar',
             barMaxWidth:10,
            stack: '收单金额2',
            data:[60, 72],
            itemStyle:{
                normal:{
                    color:color[3]  //改变珠子颜色
                }
            }
        },
        {
            name:'收单金额5',
            type:'bar',
             barMaxWidth:10,
            stack: '收单金额2',
            data:[60, 72],
            itemStyle:{
                normal:{
                    color:color[4]  //改变珠子颜色
                }
            }
        },
        {
            name:'收单金额6',
            type:'bar',
             barMaxWidth:10,
            stack: '收单金额2',
            data:[60, 72],
            itemStyle:{
                normal:{
                    color:color[5]  //改变珠子颜色
                }
            }
        },
        {
            name:'收单金额7',
            type:'bar',
             barMaxWidth:10,
            stack: '收单金额2',
            data:[60, 72],
            itemStyle:{
                normal:{
                    color:color[6]  //改变珠子颜色
                }
            }
        },
        {
          symbol: "none",// 去掉折线上面的小圆点
          barMaxWidth:10,
            name:'毛利1',
            type:'bar',
            data:[2220,300],
            stack: '毛利',
            yAxisIndex: 1,
            itemStyle:{
                normal:{
                    color:color[color.length-1]  //改变珠子颜色
                }
            }
        },
        {
          symbol: "none",// 去掉折线上面的小圆点
          barMaxWidth:10,
            name:'毛利2',
            type:'bar',
            data:[720,100],
            stack: '毛利',
            yAxisIndex: 1,
            itemStyle:{
                normal:{
                    color:color[color.length-2]  //改变珠子颜色
                }
            }
        },
        {
          symbol: "none",// 去掉折线上面的小圆点
          barMaxWidth:10,
            name:'毛利3',
            type:'bar',
            data:[220,500],
            stack: '毛利',
            yAxisIndex: 1,
            itemStyle:{
                normal:{
                    color:color[color.length-3]  //改变珠子颜色
                }
            }
        },
        {
          symbol: "none",// 去掉折线上面的小圆点
          barMaxWidth:10,
            name:'毛利4',
            type:'bar',
            data:[220,500],
            stack: '毛利',
            yAxisIndex: 1,
            itemStyle:{
                normal:{
                    color:color[color.length-4]  //改变珠子颜色
                }
            }
        },
        {
          symbol: "none",// 去掉折线上面的小圆点
          barMaxWidth:10,
            name:'毛利5',
            type:'bar',
            data:[20,400],
            stack: '毛利',
            yAxisIndex: 1,
            itemStyle:{
                normal:{
                    color:color[color.length-5]  //改变珠子颜色
                }
            }
        },
        {
          symbol: "none",// 去掉折线上面的小圆点
          barMaxWidth:10,
            name:'毛利6',
            type:'bar',
            data:[420,220],
            stack: '毛利',
            yAxisIndex: 1,
            itemStyle:{
                normal:{
                    color:color[color.length-6]  //改变珠子颜色
                }
            }
        },
        {
          symbol: "none",// 去掉折线上面的小圆点
          barMaxWidth:10,
            name:'毛利7',
            type:'bar',
            data:[420,220],
            stack: '毛利',
            yAxisIndex: 1,
            itemStyle:{
                normal:{
                    color:color[color.length-7]  //改变珠子颜色
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
                    color:'#A47C7C'  //改变珠子颜色
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
    
            boundaryGap : true,   
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
                    color:'#797284'  //改变珠子颜色
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
                    color:'#A47C7C'  //改变珠子颜色
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
                    color:'#D7C9AF'  //改变珠子颜色
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
                    color:'#A4A4A4'  //改变珠子颜色
                }
            },
            data: [30,100,20,60,10,90,30,40]
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
