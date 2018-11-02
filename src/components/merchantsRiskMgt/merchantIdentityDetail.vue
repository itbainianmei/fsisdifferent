<!--非Epos交易查询detail-->
<template>
    <div id="MerchantIdentityDetail" class="detail-box">
        <el-row>
            <el-col :span="8">
                <el-card class="box-card" shadow="never">
                    <div slot="header" class="clear">
                        <h3>基本信息</h3> 
                    </div>
                    <el-row :gutter="10">
                      <table :data="detailList" class="table-info-box" cellspacing="0" cellpadding="0"> 
                          <tr>
                              <td>商户唯一标识:</td>
                              <td>{{detailList.customerSign}}</td>
                          </tr>
                          <tr>
                              <td>唯一标识风险评级:</td>
                              <td>{{detailList.customerSignLevel}}</td>
                          </tr>
                          <tr>
                              <td>下属商编数:</td>
                              <td>{{detailList.bussineNumberCounts}}</td>
                          </tr>
                      </table>
                    </el-row>
                </el-card>
            </el-col>
        </el-row>
         <!-- end -->
         <el-row>
            <el-col :span="24">
                <el-card class="box-card" shadow="never">
                  <div slot="header" class="clear">
                      <h3 class="dis-inline fs18">商户情况</h3><i ref="shqkbox" class="el-icon-arrow-up fs24" @click='openandclose("shqk",$event)'></i> 
                  </div>
                  <el-table
                    :data="shqk"
                    style="width: 100%">
                    <el-table-column
                      label="商户编号"
                      width="120">
                      <template slot-scope="scope">
                        <a href="javascript:void(0)" @click='gotoDetail(scope.row)'>{{scope.row.customernumber}}</a>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="signedname"
                      label="商户签约名"
                      width="130">
                    </el-table-column>
                    <el-table-column
                      prop="fullname"
                      width="100"
                      label="商户名称">
                    </el-table-column>
                    <el-table-column
                      prop="kyccognizance"
                      width="100"
                      label="商户KYC">
                    </el-table-column>
                    <el-table-column
                      prop="businesscat"
                      width="130"
                      label="商户自然属性一级">
                    </el-table-column>
                    <el-table-column
                      prop="agentcode"
                      width="110"
                      label="代理商编号">
                    </el-table-column>
                    <el-table-column
                      prop="agentname"
                      width="100"
                      label="代理商名称">
                    </el-table-column>
                    <el-table-column
                      prop="createDateStr"
                      width="140"
                      label="商户入网日期">
                    </el-table-column>
                    <el-table-column
                      prop="salesname"
                      width="100"
                      label="销售">
                    </el-table-column>
                    <el-table-column
                      prop="yejishuxing"
                      width="120"
                      label="分公司">
                    </el-table-column>
                    <el-table-column
                      prop="productline"
                      width="100"
                      label="行业业绩属性">
                    </el-table-column>
                    <el-table-column
                      prop="active"
                      width="100"
                      label="商户状态">
                    </el-table-column>
                    <el-table-column
                      prop="accountStatus"
                      width="100"
                      label="账户状态">
                    </el-table-column>
                    <el-table-column
                      width="130"
                      prop="customerCredentialLevel"
                      label="商户评级">
                    </el-table-column>
                    <el-table-column
                      prop="opinionCount"
                      width="120"
                      label="舆情次数">
                    </el-table-column>
                    <el-table-column
                      prop="complaintCount"
                      width="100"
                      label="投诉举报次数">
                    </el-table-column>
                    <el-table-column
                      prop="inspectionResult"
                      width="120"
                      label="上一次巡检结果">
                    </el-table-column>
                    <el-table-column
                      prop="inspectionDate"
                      width="120"
                      label="上一次巡检日期">
                    </el-table-column>
                    <el-table-column
                      prop="appName"
                      width="100"
                      label="APP名称">
                    </el-table-column>
                    <el-table-column
                      prop="officialAccountName"
                      width="100"
                      label="公众号名称">
                    </el-table-column>
                    <el-table-column
                      prop="weburl"
                      width="140"
                      label="报备网址">
                    </el-table-column>
                  </el-table>
                  <div class="block">
                    <div class='paginationRight'>
                       <el-pagination
                        layout="total,prev, pager, next"
                        :total=length1
                        @current-change="handleCurrentChange1">
                       </el-pagination>
                       
                    </div>
                  </div>
                </el-card>
            </el-col>
          </el-row>
        <!-- end -->
        <el-row>
            <el-col :span="24">
                <el-card class="box-card" shadow="never">
                  <div slot="header" class="clear">
                      <h3 class="dis-inline fs18">商户开通产品</h3><i ref="shktcpbox" class="el-icon-arrow-up fs24 mr30" @click='openandclose("shktcp",$event)'></i> 
                  </div>
                  <el-table
                    border
                    @selection-change="selectedItems"
                    :data="shktcp"
                    style="width: 100%">
                   
                    </el-table-column>
                    <el-table-column
                      prop="customerNumber"
                      label="商户编号"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="signName"
                      label="商户签约名"
                     >
                    </el-table-column>
                    <el-table-column
                      prop="baseProdect" 
                      label="基础产品">
                    </el-table-column>
                    <el-table-column
                      prop="baseProductName"
                      label="零售产品">
                    </el-table-column>
                    <el-table-column
                      align="center"
                      label="状态">
                      <template slot-scope="scope">
                        {{changetext2(scope.row.status)}}
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="updateTime"
                      label="更新日期">
                    </el-table-column>
                    <el-table-column
                      prop="remark"
                      align="center"
                      label="关闭/开通原因">
                    </el-table-column>
                    <el-table-column
                      prop="operator"
                      label="操作人">
                    </el-table-column>
                    <el-table-column
                      align="center"
                      prop="versionFlag"
                      label="配置来源">
                    </el-table-column>
                  </el-table>
                    <div class="block clear">
                      <div class='paginationRight'>
                         <el-pagination
                          layout="total,prev, pager, next"
                          :total=length2
                          @current-change="handleCurrentChange2">
                         </el-pagination>
                      </div>
                  </div>
                </el-card>
            </el-col>
          </el-row>
        <!-- 图表 -->
        <el-row>
          <el-col :span="24">
            <el-card class="box-card pr" shadow="never">
              <div slot="header" class="clear">
                <h3>交易/毛利/欺诈情况</h3>
              </div>
              <div class="chart-btn ">
                 <span class="active time mr30" @click='getChartData("myChart1","1",$event)'>近14天</span>
                <span class="time mr30" @click='getChartData("myChart1","2",$event)'>近8周</span>
                <span class="time" @click='getChartData("myChart1","3",$event)'>近6个月</span>
            </div>
            <span style="color:#f7b980;font-size:10px;position:absolute;right:7%;">友情提示:&nbsp;&nbsp;</i><i style="color:#7a8d74;font-style:normal;">柱子1: </i>交易金额 &nbsp; &nbsp;<i style="color:#7a8d74;font-style:normal;">柱子2: </i>毛利</span>
            <div id="myChart1" class="center" :style="{width: '100%', height: '280px'}"></div>
            </el-card>
          </el-col>
        </el-row> 
        <el-row :gutter="10">
          <el-col :span="12">
            <el-card class="box-card" shadow="never"> 
              <div slot="header" class="clear">
                <h3>投诉情况</h3> 
              </div>
              <div  class="chart-btn">
                    <span class="active time mr30" @click='getChartData("myChart2","1",$event)'>近14天</span>
                    <span class="time mr30" @click='getChartData("myChart2","2",$event)'>近8周</span>
                    <span class="time" @click='getChartData("myChart2","3",$event)'>近6个月</span>
                </div>
                <div id="myChart2" class="center" :style="{width: '100%', height: '300px'}"></div>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card class="box-card" shadow="never"> 
              <div slot="header" class="clear">
                <h3>综合费率/万元毛利收益情况</h3> 
              </div>
              <div  class="chart-btn">
                  <span class="active time mr30" @click='getChartData("myChart3","1",$event)'>近14天</span>
                  <span class="time mr30" @click='getChartData("myChart3","2",$event)'>近8周</span>
                  <span class="time" @click='getChartData("myChart3","3",$event)'>近6个月</span>
              </div>
              <div id="myChart3" class="center" :style="{width: '100%', height: '300px'}"></div>
            </el-card>
          </el-col>
        </el-row>
    </div>
</template>
<script>
import qs from 'qs';
var loadingTicket1,loadingTicket2,loadingTicket3,myChart1,myChart2,myChart3
export default {
    name:"商户唯一标识详情",
    data(){
        return{
           formLabelWidth2: '80px',
           pageNumber1:1,
           pageRow1:10,
           length1:0,  
           pageNumber2:1,
           pageRow2:10,
           length2:0, 
            xxx:true,
            ahthpf:true,
            ahthcl:true,
            ahthsh:true,
            detailList:{},//商户信息
            expandshqk:[],
            expandshktcp:[],
            items:[],
            processElementVisible2:false,//处理弹框显示与隐藏
            auditformElementparam:'',
            processform2:{
              remark:''
            },
            shqk:[],//商户情况
            shktcp:[],//商户开通产品情况
            rules:{
              checkListSource:[
                  {required: true, message: '请选择核查单来源', trigger: 'change'}
              ],
              merchantNo:[
                  {required: true, message: ' ', trigger: 'blur'}
              ],
              artificialKYC:[
                  {required: true, message: ' ', trigger: 'blur'}
              ],
              investigationInfo:[
                  {required: true, message: ' ', trigger: 'blur'}
              ],
              auditResult:[
                  {required: true, message: '请选择审核结果', trigger: 'change'}
              ],
              auditOpinion:[
                  {required: true, message: ' ', trigger: 'blur'}
              ],
              companyId:[
                  {required: true, message: '请选择分公司', trigger: 'change'}
              ]
            },
        }
    },
    mounted(){  //取详情列表
         // this.drawLine1();
         // this.drawLine2();
         // this.drawLine3();
         this.getproduct(1)
         this.getChartData('myChart1','1')
         this.getChartData('myChart2','1')
         this.getChartData('myChart3','1')
         this.getCustomerInfo()//商户情况
         this.getYuTouCountBySign()//基本信息
    },
    methods:{
      getYuTouCountBySign(){
        var self = this
        var params = {
          customerSign : self.$route.params.customerSign
        }
        this.$axios.post('/CustomerUniqueMarker/getYuTouCountBySign',qs.stringify(params)).then(res => {
          var response = res.data
          if(response.code == 200){
            self.detailList = response.data
          }
        }) 
      },
      changetext2(text){
        var self = this
        if(text == 'ENABLE'){
          self.cpcaozuotext = '启用'
        }else if(text == 'DISABLE'){
          self.cpcaozuotext =  '禁用'
        }
        return self.cpcaozuotext
      },
       getCustomerInfo(){  //商户情况  

        var self = this
        var param = {
          customerSign : self.$route.params.customerSign,
          pageNumber : self.pageNumber1,
          pageRow : self.pageRow1,
        }
        this.$axios.post('/CustomerUniqueMarker/getCustomerInfo',qs.stringify(param)).then(res => {
          var response = res.data
          if(response.code == '200'){
            
            self.shqk = [response.data.returnList[0]]
            self.expandshqk = response.data.returnList    //////
            self.length1 = response.data.returnList.length
          }else{
            console.log('/CustomerUniqueMarker/getCustomerInfo'+response.msg)
          }
        }) 
      },
      getproduct(page,collapse){  //开通产品
        var self = this
        var param = {
          customerSign : self.$route.params.customerSign,
          pageNumber : page,
          pageRow : self.pageRow2,
        }
        this.$axios.post('CustomerUniqueMarker/getCustomerProduct',qs.stringify(param)).then(res => {
          var response = res.data
          if(response.code == '200'){
            if(response.data && response.data.returnList.length == 0){
              self.shktcp = []
              self.length2 = 0  
              return false
            }
            self.shktcp = collapse ? response.data.returnList :[response.data.returnList[0]]
            self.expandshktcp = response.data.returnList  //开通产品
            self.length2 = response.data.total
          }else{
            console.log('/CustomerUniqueMarker/getCustomerInfo'+response.msg)
          }
        }) 
      },
      
      gotoDetail(row){ //进入详情页
        window.open('#/merchantPhotoDetail/'+ row.customernumber)
      },
      handleCurrentChange1(val) {  //处理当前页
         this.pageNumber1 = `${val}`  //当前页
         this.$refs.shqkbox.classList.remove('el-icon-arrow-up')  
         this.$refs.shqkbox.classList.add('el-icon-arrow-down')
         this.getCustomerInfo()
      },
      handleCurrentChange2(val) {  //处理当前页
         this.pageNumber2 = `${val}`  //当前页
         this.$refs.shktcpbox.classList.remove('el-icon-arrow-up')  
         this.$refs.shktcpbox.classList.add('el-icon-arrow-down')
         this.getproduct(val,true)
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
            "customerSign":self.$route.params.customerSign,  //商户唯一标识
            "dateType":dateType,
            "dateCount":dateCount,
          }
      },
      clickActive(targ){
        Array.from(targ.parentNode.children).map(function(ele){
          ele.classList.remove('active')
        })
      },
      getChartData(id,flag,targ){
        if(targ){
          var otarg = targ.target
          this.clickActive(otarg)
          otarg.classList.add('active')
        }
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
      getChartData1(id,flag){  //商户交易毛利欺诈情况
        var self = this
        var param = this.getPara(flag)
        this.$axios.post('/CustomerUniqueMarker/grossfraud',qs.stringify(param)).then(res => {
          var response = res.data
          if(response.code == '200'){
            if(JSON.stringify(response.data.receiptAmount) == "{}" && response.data.lossrate.length == 0){
              self.clearData1()
              self.drawLine1()
              return false
            }
            option1.series = [] //清空
            option1.xAxis[0].data = response.data.times  //时间轴
            if(JSON.stringify(response.data.Money) == '{}'){
              var ms = {"xxx":[0]}
            }else{
              var ms = response.data.Money
            }
            var index0 = -1
            for(var ele in ms){  //收单金额堆积效果
              index0++
              var seriesItem = {
                name: '收单金额(亿元)-'+ele,
                type: 'bar',
                barMaxWidth: 10,
                stack: 'money1',
                data: ms[ele],
                itemStyle:{
                    normal:{
                        color:color[index0]  //改变颜色
                    }
                }
              }
              option1.series.push(seriesItem)
            }
           
            
            if(JSON.stringify(response.data.Profit) == '{}'){
              var ps = {"xxx":[0]}
            }else{
              var ps = response.data.Profit
            }
            var index1 = -1
            for(var ele in ps){  //毛利堆积效果
              index1++
              var seriesItem = {
                name: '毛利(万元)-'+ele,
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
                name:'欺诈损失率',
                type:'line',
                yAxisIndex: 1,
                itemStyle:{
                    normal:{
                        color:color[1]  //改变珠子颜色
                    }
                },
                data:response.data.lossrate
            }
            option1.series.push(rateItem)
            self.drawLine1() 
          }
        })
      },
      getChartData2(id,flag){//报表商户投诉情况
        var self = this
        var param = this.getPara(flag)
        this.$axios.post('/CustomerUniqueMarker/complaints',qs.stringify(param)).then(res => {
          var response = res.data
          if(response.code == '200'){
            if(JSON.stringify(response.data) == "{}" || response.data == null){
              self.clearData2()
              self.drawLine2()
              return false
            }
            option2.xAxis[0].data = response.data.times  //时间
            option2.series[0].data = response.data.complaintstCount //投诉笔数
            option2.series[1].data = response.data.complaintsMoney //投诉金额
            option2.series[2].data = response.data.proportion //投诉占比
            self.drawLine2() 
          }
        })
      },
      getChartData3(id,flag){//报表3
        var self = this
        var param = this.getPara(flag)
        this.$axios.post('/CustomerUniqueMarker/syntheticalgross',qs.stringify(param)).then(res => {
          var response = res.data
          if(response.code == '200'){
            if(JSON.stringify(response.data) == "{}"){
              self.clearData3()
              self.drawLine3()
              return false
            }
            option3.xAxis[0].data = response.data.times  //时间
            option3.series[0].data = response.data.synthetical //商户综合费率
            option3.series[1].data = response.data.grossincome //万元毛利收益
            self.drawLine3() 
          }
        })
      },
      clearData1(){
        option1.xAxis[0].data = []//时间
          option1.series[0] = []
      },
      clearData2(){
        option2.xAxis[0].data = []//时间
        option2.series[0].data =[] 
        option2.series[1].data = [] 
        option2.series[2].data = [] 
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
            case 'shktcp':
              var temp = self.shktcp
              self.shktcp = [temp[0]]
            break;
          }
           
        }else{
          obj.target.classList.add('el-icon-arrow-down')
          obj.target.classList.remove('el-icon-arrow-up')
          switch(data){
            case 'shqk':
              self.shqk  = self.expandshqk
            break;
            case 'shktcp':
              self.shktcp  = self.expandshktcp
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
var color= ['#c49d97','#7a8d76','#eac0ac','#eac0ac','#8f8a7d','#faeacc','#818597','#aa8c8c','#91859c','#8f8d7e','#ea8f6a','#809668','#f7e3bf','#8ab483','#b2969c','#d0b7f5']

var option1 = {
    title : {
        text: '',
         x: 'center'
    },
    tooltip: {
        trigger: 'item',
         formatter: function (params, ticket, callback) {
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
          let textTip= params.name + '<br/>'
          this._option.series.map(ele => {
            if (textTip.indexOf(params.seriesName) < 0) {
              if(params.series.name.indexOf('欺诈损失率') > -1){
                textTip += params.seriesName + '(0.01BP):'
              }else{
                textTip += params.seriesName + ':'
              }
                textTip +=  addCommas(params.value) + '<br/>' 
            } 
          })
          return  textTip
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
        data:['欺诈损失率']
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
                length: 1,    // 设置x轴上标点显示长度
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
              str+=Number(item[2]).toFixed(2)+'%\<br>'
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
        data:['投诉率(笔数)','投诉率(金额)','投诉商户占比']
    },
    xAxis: [
        {
          splitLine:{show: false},//去除网格线
            type: 'category',
            data: ['08/01-09/01'],
            boundaryGap : true,   
            axisLabel: {  
             interval:0, ////////控制 
             rotate:30 ,
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
            name: '%',
           splitNumber:5,
            axisLabel: {
                formatter: '{value}'
            }
        }
    ],
    series: [
        {
           symbol: "none",// 去掉折线上面的小圆点
            name: '投诉率(笔数)',
            type: 'line',
            itemStyle:{
                normal:{
                    color:color[5]  //改变珠子颜色
                }
            },
            data: [30,20]
        }, 
        {
           symbol: "none",// 去掉折线上面的小圆点
            name: '投诉率(金额)',
            type: 'line',
            itemStyle:{
                normal:{
                    color:color[1]  //改变珠子颜色
                }
            },
            data: [10,90]
        },
        {
           symbol: "none",// 去掉折线上面的小圆点
            name: '投诉商户占比',
            type: 'line',
            itemStyle:{
                normal:{
                    color:color[2]  //改变珠子颜色
                }
            },
            data: [10,90]
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
       
          params.map(function(item,index){
            str0=item[1]+'\<br>'
            str+=item[0]+': '
            if(index==0){
              str+=addCommas(Number(item[2]).toFixed(2))+'%\<br>'
            }
            if(index == 1){
              str+=Number(item[2]).toFixed(2)+'元\<br>'
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
        data:['综合费率','万元毛利收益']
    },
    xAxis: [
        {
          splitLine:{show: false},//去除网格线
            type: 'category',
            data: ['08/01-09/01','08/01-09/01','08/01-09/01','08/01-09/01','08/01-09/01','08/01-09/01','08/01-09/01','08/01-09/01'],
    
            boundaryGap : true,   ////////控制 
            axisLabel: {  
             interval:0, ////////控制 
             rotate:30 ,
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
            name: '%',
           splitNumber:5,
            axisLabel: {
                formatter: '{value}'
            }
        },
        {
            type: 'value',
            name:'元',
           splitNumber:5,
            axisLabel: {
                formatter: '{value}'
            }
        }
    ],
    series: [
        {
            symbol: "none",// 去掉折线上面的小圆点
            name: '综合费率',
            type: 'line',
            itemStyle:{
                normal:{
                    color:'#D7C9AF'  //改变珠子颜色
                }
            },
            data: [60,80]
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
            data: [30,100]
        }
    ]
};

</script>
<style lang="less">
  @import '~@/less/common.less';
  @import '~@/less/detail.less';
</style>
<style scoped lang="less">

.blue{
  color:#409eff;
  cursor: pointer;
}
.active{background:#ecf5ff;color:#409eff;border-color:#b3d8ff;padding:6px 10px;border-radius: 100%;}
.time{padding:6px 10px;border-radius: 100%;}
.time:hover{background: #409eff;color:white;cursor:pointer;}
.el-icon-arrow-up:before{color:#fff;}
.el-icon-arrow-down:before{font-weight:800;color:#fff;}
.bgf5{background: #F5F6FA;text-align: center;}  


 
</style>
