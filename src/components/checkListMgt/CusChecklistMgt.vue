<!--商户核查单管理-->
<template>
    <div id="cuschecklist">
        <div class="searchBasic">
            <el-collapse-transition>
                <div class="searchContentgray mt10 ml20" id="searchContentgray" >
                    <div class="clear">
                        <el-button type="primary" v-if="lsstShow && authsearch1" class=" fl" icon="el-icon-search" @click='listQuery("/checklist/getAll","cuscheck")'>查询</el-button>
                        <el-button type="primary" class=" fl" icon="el-icon-search" @click="del">删除</el-button>
                        <el-button type="primary" class=" fl" icon="el-icon-search" @click="sh">审核</el-button>
                    </div>
                </div>
            </el-collapse-transition>
        </div>
        <div>ffff</div>
        <div class="tableData mt20">
            <div class="pl10 pr10">
            <!-- 流水视图 -->
                <el-table
                    fixed
                    max-height="600"
                    @selection-change="selectedItemsid"
                    :data="lsstTable"
                    border
                    :default-sort = "{prop: 'time', order: 'descending'}"
                    style="width: 100%"
                    >
                    <el-table-column
                        type="selection"
                        width="50">
                    </el-table-column>
                    <el-table-column
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="checkList"
                        label="核查单号"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="merchantOnlyId"
                        label="商户唯一标识"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="merchantNo"
                        label="商户编号"
                        width="150">
                    </el-table-column>
                     <el-table-column
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="merchantContractName"
                        label="商户签约名"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="merchantKyc"
                        label="商户KYC"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="naturalPropertyOne"
                        label="商户自然属性一级"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="time"
                        label="生成时间"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="expiryTime"
                        label="过期时间"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="dealStatus"
                        label="处理状态"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="riskDeal"
                        label="风险处理"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="investigationInfo"
                        label="调查信息"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="checkListSource"
                        label="核查单来源"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="autoRiskDeal"
                        label="规则处理"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="sale"
                        label="销售"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="subCompany"
                        label="分公司"
                        width="150">
                    </el-table-column>
                   <el-table-column
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="achievementProperty"
                        label="行业业绩属性"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="merchantNetTime"
                        label="商户入网日期"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="agentNo"
                        label="代理商编号"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="agentName"
                        label="代理商名称"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="lastModifiedBy"
                        label="最后操作人"
                        width="150">
                    </el-table-column>
                     <el-table-column
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="lastModifiedTime"
                        label="最后操作时间"
                        width="150">
                    </el-table-column>
                     <el-table-column
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="remark"
                        label="备注"
                        width="150">
                    </el-table-column>
                </el-table>
            </div>
            <div>
            </div>
           
        </div>
        <!-- 审核弹框 -->
        <el-dialog title="" :visible.sync="auditformElementVisible" width="600px">
          <el-form :model="auditform" :rules="rules2" ref="auditformElement">
            <el-form-item label="审核结果:" :label-width="formLabelWidth" prop="auditResult">
              <el-select v-model="auditform.auditResult" @change="isauditResultErro"  placeholder="请选择" style="width: 80%;max-width:225px;">
                    <el-option label="审核通过" value="1"></el-option>
                    <el-option label="审核拒绝" value="0"></el-option>
                </el-select>
                <span class="errorbox" v-show="auditResult" v-html="auditResulttext"></span>
            </el-form-item>
                <!--！！！！ 审核结果为拒绝时，审核意见为必填项 start 额外做了判空 -->
                <el-form-item label="审核意见:" :label-width="formLabelWidth" prop="auditOpinion" >
                  <el-input v-model="auditform.auditOpinion" maxlength="100" placeholder="审核意见" auto-complete="off"></el-input>
                </el-form-item>
                 <div style="position:relative;top:-30px;font-size:10px;width:120px;text-align:right;color:#666;">(审核拒绝时必填)</div>
                <!--！！！！ 审核结果为拒绝时，审核意见为必填项 end-->
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="auditformElementVisible = false">取 消</el-button>
            <el-button type="primary" :disabled="isdisable" @click="checkProcess">确 定</el-button>
          </div>
        </el-dialog>
        <el-row>
          <el-col :span="24">
              <el-card class="box-card" shadow="never">
                  <div slot="header" class="clear">
                    <h3>交易/毛利/欺诈情况</h3>
                  </div>
                  <div class="chart-btn ">
                    <span class="active time mr30" ref="chart1time1" @click='getChartData("myChart1","1",$event)'>近14天</span>
                    <span class="time mr30" @click='getChartData("myChart1","2",$event)'>近8周</span>
                    <span class="time" @click='getChartData("myChart1","3",$event)'>近6个月</span>
                  </div>
                  <div id="myChart1" class="center mt10" :style="{width: '100%', height: '280px'}"></div>
              </el-card>
          </el-col>
        </el-row>
    </div>
</template>
<script>

import qs from 'qs'
var loadingTicket1,myChart1
export default {
    name:'CusChecklistMgt',
    computed:{
        isdisable:function(){  //审核拒绝才能确定
            return this.auditform.auditResult == 0 &&  this.auditform.auditOpinion == '' ? true : false
        }
    },
    data(){
        return{
            auditform:{
                auditResult:'',
                auditOpinion:''
            },
            auditResult:false,  //审核结果
            auditResulttext:'',
            auditformElementVisible:false,//审核核查单弹框显示与隐藏
            formLabelWidth: '150px',
            authsearch1:true,
            lsstShow:true,
            ahthsh:true,
            lsstTable:[],
            idList:[],
            rules2:{
                auditResult:[
                    {required: true, message: '请选择审核结果', trigger: 'change'}
                ],
                auditOpinion:[
                    {required: true, message: ' ', trigger: 'blur'}
                ]
          },
      }
  },
   created(){
    this.listQuery()
   },
   mounted(){
       this.getChartData("myChart1","1")  //交易毛利欺诈图
   },
  methods:{
    getChartData(id,flag,targ){
        if(targ){
          var otarg = targ.target
          this.clickActive(otarg)
          otarg.classList.add('active')
        }
        this.getChartData1(id,flag)
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
            "customerNumber":self.$route.params.merchantNo,  //商户编号
            "dateType":dateType,
            "dateCount":dateCount,
          }
      },
    getChartData1(id,flag){
        var self = this
        var param = this.getPara(flag)
        this.$axios.post('/api/querychart',qs.stringify(param)).then(res => {
          var response = res.data
          if(response.code == '200'){
            if(JSON.stringify(response.data) == "{}"){
              self.clearData1()
              self.drawLine1()
              return false
            }
            console.log(response.data)
            option1.xAxis[0].data = response.data.times  //时间轴   
            option1.series[0].data = response.data.synthetical //收单金额
            option1.series[1].data = response.data.grossincome //毛利
            option1.series[2].data = response.data.fraudRateList //欺诈率
            self.drawLine1() 
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
    listQuery(){  //查询列表
        this.$axios.get("/api/querylist").then(res => {
            var response = res.data
            this.lsstTable = response
        })
        this.getChartData("myChart1","1")  //交易毛利欺诈图
    },
    del(){   //删除
        if(this.idList.length < 1){
            this.atleastOne()
            return false
        }
        this.removeItem()
    },
    removeItem(){  //删除
        var idList = {}
        idList.id = this.idList.join(',')
        this.$axios.delete("/api/update",{data: qs.stringify(idList)}).then(res => {
            var response = res.data
            if(response.code == 200){
                this.listQuery()  //更新查询
                this.successTip(response.msg)
            }
        })
    },
    checkProcess(){  //审核
        var self = this
        var idList = {}
        idList.id = self.idList.join(',')
        idList.auditResult = self.auditform.auditResult
        idList.auditOpinion = self.auditform.auditOpinion
        this.auditformElementVisible = false
        this.$axios.put("/api/checkupdate",qs.stringify(idList)).then(res => {
            var response = res.data
            if(response.code == 200){
                this.listQuery()  //更新查询
                this.successTip(response.msg)
            }
        })
     },
     isauditResultErro(){
       if(this.auditform.auditResult == '请选择' || this.auditform.auditResult == ''){
            this.auditResult=true
            this.auditResulttext='请选择审核结果'
            return false
        }else{
            this.auditResult=false
            return true
        }
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
    clickActive(targ){
        Array.from(targ.parentNode.children).map(function(ele){
          ele.classList.remove('active')
        })
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
            
            if(index==0){
              str+=addCommas(Number(item[2]).toFixed(2))+' 亿元\<br>'
            }
            if(index==1){
              str+=addCommas(Number(item[2]).toFixed(2))+' 万元\<br>'
            }
            if(index == 2){
              str+=Number(item[2]).toFixed(2)+'(0.01BP)\<br>'
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
        data:['金额','毛利','欺诈损失率']
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
            name:'金额',
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
            name:'欺诈损失率',
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
<style lang="less" scoped>
.active{background:#ecf5ff;color:#409eff;border-color:#b3d8ff;padding:6px 10px;border-radius: 100%;}
.time{padding:6px 10px;border-radius: 100%;}
.time:hover{background: #409eff;color:white;cursor:pointer;}
</style>

   
