<!--非Epos交易查询detail-->
<template>
    <div id="MerchantPhotoDetail" class="detail-box">
        <el-row>
            <el-col :span="24" >
                <el-card class="box-card" shadow="never">
                    <div slot="header" class="clear">
                      <h3 class="dis-inline ">商户基本信息</h3>
                    </div>
                    <el-col :span="8" >
                        <table  class="table-info-box" cellspacing="0" cellpadding="0"> 
                                <tr>
                                    <td>商户编号:</td>
                                    <td><a href="javascript:void(0)" @click="gotoDetail">{{detailList.customerNumber}}</a></td>
                                </tr>
                                <tr>
                                    <td>商户签约名:</td>
                                    <td>{{detailList.signName}}</td>
                                </tr>
                                <tr>
                                    <td>商户名称:</td>
                                    <td>{{detailList.fullname}}</td>
                                </tr>
                                <tr>
                                    <td>商户入网日期:</td>
                                    <td>{{detailList.createDate}}</td>
                                </tr>
                                <tr>
                                    <td>商户评级:</td>
                                    <td>{{detailList.customerCredentialLevel}}</td>
                                </tr>
                                 
                            </table>
                        </el-col>
                        <el-col :span="8" style="border-right: 1px solid rgb(219,219,219);border-left: 1px solid rgb(219,219,219)">
                            <table class="table-info-box" cellspacing="0" cellpadding="0"> 
                                <tr>
                                    <td>商户唯一标识:</td>
                                    <td><a href="javascript:void(0)" @click="gomidentity">{{detailList.customerSign}}</a></td>
                                </tr>
                                 <tr>
                                    <td>唯一标识下商编数:</td>
                                    <td>{{detailList.customerNumOfcustomerSign}}</td>
                                </tr>
                                <tr>
                                    <td>销售:</td>
                                    <td>{{detailList.saleName}}<a href="javascript:void(0)" @click="gotoSale">{{detailList.saleLevel}}</a></td>
                                </tr>
                                <tr>
                                    <td>分公司:</td>
                                    <td>{{detailList.YEJISHUXING}}<a href="javascript:void(0)" @click="gotoBranchCompanyPhoto">{{detailList.YEJISHUXINGLevel}}</a></td>
                                </tr>
                                <tr>
                                    <td>代理商编号:</td>
                                    <td><a href="javascript:void(0)" @click="gotoAgentPortraitDetail">{{detailList.agentCode}}</a></td>
                                </tr>
                                <tr>
                                    <td>代理商名称:</td>
                                    <td>{{detailList.agentName}}</td>
                                </tr>
                                
                            </table>
                          </el-col>
                          <el-col :span="8" >
                            <table class="table-info-box" cellspacing="0" cellpadding="0"> 
                                <tr>
                                    <td>法人姓名:</td>
                                    <td>{{detailList.legalName}}</td>
                                </tr>
                                 <tr>
                                    <td>法人身份证号:</td>
                                    <td  @mouseover="showsecretinfo" class="pr" ref="legalIdcard">{{detailList.legalIdcardSI}}<span  class="secret pa none" style="left:46%;">{{detailList.legalIdcard}}</span></td>
                                </tr>
                                 <tr>
                                    <td>营业执照号:</td>
                                    <td>{{detailList.businessLicence}}</td>
                                </tr>
                                <tr>
                                    <td>报备网址:</td>
                                    <td>{{detailList.webUrl}}</td>
                                </tr>
                                <tr>
                                    <td>APP名称:</td>
                                    <td>{{detailList.appName}}</td>
                                </tr>
                                <tr>
                                    <td>公众号名称:</td>
                                    <td>{{detailList.officialAccountName}}</td>
                                </tr>
                            </table>
                          </el-col>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="10" >
          <el-col :span="16" style="height:200px;" >
                <el-card class="box-card" shadow="never" style="height:92%;">
                    <div slot="header" class="clear">
                      <h3 class="dis-inline ">商户KYC及行业信息</h3>
                    </div>
                    <el-col :span="12" style="border-right: 1px solid rgb(219,219,219);height:200px;">
                        <table  class="table-info-box" cellspacing="0" cellpadding="0"> 
                          <tr>
                              <td>M1:</td>
                              <td>{{detailList.m1}}</td>
                          </tr>
                          <tr>
                              <td>M3:</td>
                              <td>{{detailList.m3}}</td>
                          </tr>
                          <tr>
                              <td>M7:</td>
                              <td>{{detailList.m7}}</td>
                          </tr>
                          <tr>
                              <td>M30:</td>
                              <td>{{detailList.m30}}</td>
                          </tr>
                          <tr>
                              <td>人工识别结果:</td>
                              <td>{{detailList.artificialResults}}{{detailList.artificialResultsDateStr}}</td>
                          </tr>
                          
                      </table>
                  </el-col>
                  <el-col :span="12" >
                        <table  class="table-info-box" cellspacing="0" cellpadding="0"> 
                           <tr>
                              <td>商户KYC:</td>
                              <td>{{detailList.KYCCognizance}}</td>
                          </tr>
                          <tr>
                              <td>商户报备标签:</td>
                              <td>{{detailList.customerLabel}}</td>
                          </tr>
                          <tr>
                              <td>行业业绩属性:</td>
                              <td>{{detailList.productLine}}</td>
                          </tr>
                           <tr>
                              <td>商户自然属性一级:</td>
                              <td>{{detailList.businessCat}}</td>
                          </tr>
                          <tr>
                              <td>商户自然属性二级:</td>
                              <td>{{detailList.subBusinessCat}}</td>
                          </tr>
                           
                      </table>
                  </el-col>
                </el-card>
            </el-col>
            <el-col :span="8" >
              <el-card class="box-card" shadow="never">
                    <div slot="header" class="clear">
                      <h3 class="dis-inline ">其他信息</h3>
                    </div>
                      <table class="table-info-box" style="line-height:22px;" cellspacing="0" cellpadding="0"> 
                          <tr>
                              <td>上一次巡检结果:</td>
                              <td>{{detailList.inspectionResult}}</td>
                          </tr>
                          <tr>
                              <td>上一次巡检日期:</td>
                              <td>{{detailList.inspectionDate}}</td>
                          </tr>
                           <tr>
                             <td>投诉举报次数</td>
                             <td>{{detailList.ComplaintCount}}</td>
                           </tr>
                           <tr>
                             <td>舆情次数</td>
                              <td>{{detailList.opinionCount}}</td>
                           </tr>
                           <tr>
                              <td>特批情况:</td>
                              <td>{{detailList.approved}}</td>
                          </tr>
                      </table>
                </el-card>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-card class="box-card" shadow="never">
                    <div slot="header" class="clear">
                      <h3 class="dis-inline fs18">商户核查单情况(近30天)</h3><i ref="shhcdqkbox" class="el-icon-arrow-up fs24 mr30" @click='openandclose("shhcdqk",$event)'></i>总计：<span>{{shhcdqkTotal}}</span> 条
                    </div>
                    <el-table
                      :data="shhcdqk"
                      style="width: 100%">
                      <el-table-column
                        prop="checkList"
                        label="核查单号"
                        width="120">
                      </el-table-column>
                      <el-table-column
                        prop="time"
                        label="生成时间"
                        width="220">
                      </el-table-column>
                      <el-table-column
                        prop="dealStatus"
                        width="100"
                        label="处理状态">
                      </el-table-column>
                      <el-table-column
                        prop="riskDeal"
                        width="100"
                        label="风险处理">
                      </el-table-column>
                      <el-table-column
                        prop="checkListSource"
                        width="100"
                        label="核查单来源">
                      </el-table-column>
                      <el-table-column
                        prop="acceptanceTimeStr"
                        width="200"
                        label="受理日期">
                      </el-table-column>
                      <el-table-column
                        prop="somplaintSource"
                        width="100"
                        label="投诉来源">
                      </el-table-column>
                      <el-table-column
                        prop="somplaintReason"
                        width="140"
                        label="投诉原因">
                      </el-table-column>
                      <el-table-column
                        prop="reportType"
                        width="100"
                        label="举报类型">
                      </el-table-column>
                      <el-table-column
                        prop="triggerRules"
                        width="120"
                        label="触发规则">
                      </el-table-column>
                      <el-table-column
                        prop="kycResult"
                        width="100"
                        label="KYC结果值">
                      </el-table-column>
                      <el-table-column
                        prop="ruleScore"
                        width="100"
                        label="规则分值">
                      </el-table-column>
                      <el-table-column
                        prop="publicSentimentNews"
                        width="240"
                        label="舆情新闻">
                      </el-table-column>
                      <el-table-column
                        prop="publicSentimentAbstract"
                        width="220"
                        label="舆情摘要">
                      </el-table-column>
                      <el-table-column
                        prop="publicSentimentAbstract"
                        width="100"
                        label="最后操作人">
                      </el-table-column>
                      <el-table-column
                        prop="lastModifedTime"
                        width="200"
                        label="最后操作时间">
                      </el-table-column>
                      <el-table-column
                        prop="remarks"
                        width="180"
                        label="备注">
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
        <el-row>
            <el-col :span="24">
                <el-card class="box-card" shadow="never">
                  <div slot="header" class="clear">
                      <h3 class="dis-inline ">商户开通产品</h3><i ref="shktcpbox" class="el-icon-arrow-up fs24 mr30" @click='openandclose("shktcp",$event)'></i> <span class="cfff" @click='ktcptip("批量启用")' style="margin-left:50px;">批量启用</span><span class="cfff" @click='ktcptip("批量禁用")' style="margin-left:50px;">批量禁用</span>
                    </div>
                    <el-table
                      @selection-change="selectedItems"
                      :data="shktcp"
                      style="width: 100%">
                      <el-table-column
                          type="selection"
                          width="50">
                      </el-table-column>
                      <el-table-column
                        prop="baseProdect"
                        align="center"
                        label="基础产品"
                        >
                      </el-table-column>
                      <el-table-column
                        prop="baseProductName"
                        align="center"
                        label="零售产品"
                       >
                      </el-table-column>
                      <el-table-column
                        align="center"
                        label="状态">
                        <template slot-scope="scope">
                          {{scope.row.status=='ENABLE' ? '启用' : '禁用'}}
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="updateTime"
                        align="center"
                        label="更新日期">
                      </el-table-column>
                      <el-table-column
                        prop="remark"
                        align="center"
                        label="关闭/开通原因">
                      </el-table-column>
                      <el-table-column
                        align="center"
                        label="操作">
                        <template slot-scope="scope">
                            <span class="blue" @click='cpcaozuo(scope.row)'>{{scope.row.operValue}}</span>
                        </template>
                      </el-table-column>
                    </el-table>
                    <div class="block">
                        <div class='paginationRight'>
                           <el-pagination
                            layout="total,prev, pager, next"
                            :total=length3
                            @current-change="handleCurrentChange3">
                           </el-pagination>
                           
                        </div>
                    </div>
                    
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="8" >
            <el-col :span="16">
                <el-card class="box-card" shadow="never">
                    <div slot="header" class="clear">
                      <h3 class="dis-inline fs18">商户评级详情</h3>
                    </div>
                    <el-table
                      :data="shpjxq">
                      <el-table-column
                        prop="ratingdate"
                        align="center"
                        label="评级日期"
                        >
                      </el-table-column>
                      <el-table-column
                        prop="ratingresults"
                        align="center"
                        label="评级结果"
                       >
                      </el-table-column>
                      <el-table-column
                       align="center"
                        prop="rateformulary"
                        label="计算公式(权重*欺诈金额/交易金额+权重*投诉金额/交易金额)">
                      </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card class="box-card" shadow="never">
                    <div slot="header" class="clear">
                      <h3 class="dis-inline fs18">商户状态管理</h3> 
                    </div>
                    <table class="table" cellspacing="0" cellpadding="0" border="0" style="width:100%;">  <tr>
                        <th class="bgf5" width="33.3%">类型</th>
                        <th class="bgf5" width="33.3%">当前状态</th>
                        <th class="bgf5" width="33.3%">操作</th>
                    </tr>
                    <tbody>
                      <tr :data="zhdata">
                          <td class="bgf5">账户状态</td>
                          <td>{{zhdata}}</td>
                          <td><a class="blue" href="javascript:;" @click="caozuo(zhdatatext,'ZH')">{{zhdatatext}}</a></td>
                      </tr>
                      <tr :data="khdata">
                          <td class="bgf5">商户状态</td>
                          <td>{{khdata}}</td>
                          <td v-if='khdatatext=="冻结"'><a class="blue" href="javascript:;" @click="caozuo(khdatatext,'KH')">{{khdatatext}}</a></td>
                          <td v-if='khdatatext=="解冻"'>{{khdatatext}}</td>
                      </tr>
                  </tbody>
                  </table>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="8">
            <el-col :span="10">
                <el-card class="box-card" shadow="never">
                    <div slot="header" class="clear">
                      <h3 class="dis-inline">商户舆情信息</h3><i ref="shyqxxbox" class="el-icon-arrow-up fs24 mr30" @click='openandclose("shyqxx",$event)'></i>总计：<span>{{shyqxxTotal}}</span> 条
                    </div>
                    <el-table
                      :data="shyqxx"
                      style="width: 100%">
                      <el-table-column
                        prop="publicSentimentTimeStr"
                        align="center"
                        width="160"
                        label="舆情日期"
                        >
                      </el-table-column>
                      <el-table-column
                        prop="publicSentimentNews"
                        align="center"
                        label="舆情新闻"
                       >
                      </el-table-column>
                      <el-table-column
                        prop="publicSentimentAbstract"
                        align="center"
                        label="舆情摘要">
                      </el-table-column>
                      <el-table-column
                        prop="publicSentimentLevel"
                        align="center"
                        label="舆情等级">
                      </el-table-column>
                    </el-table>
                    <div class="block">
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
            <el-col :span="14">
                <el-card class="box-card" shadow="never">
                    <div slot="header" class="clear">
                      <h3 class="dis-inline fs18">商户投诉情况</h3> <i ref="shtsqkbox" class="el-icon-arrow-up fs24 mr30" @click='openandclose("shtsqk",$event)'></i>
                    </div>
                    <el-table
                    :data="shtsqk"
                    style="width: 100%">
                    <el-table-column
                      prop="acceptanceTime"
                      label="受理日期"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="somplaintSource"
                      label="投诉来源">
                    </el-table-column>
                    <el-table-column
                      prop="somplaintReason"
                      label="投诉原因">
                    </el-table-column>
                    <el-table-column
                      prop="somplaintWay"
                      label="举报方式">
                    </el-table-column>
                    <el-table-column
                      prop="reportType"
                      label="举报类型">
                    </el-table-column>
                    <el-table-column
                      prop="somplaintBy"
                      label="投诉人">
                    </el-table-column>
                    <el-table-column
                      prop="contactWay"
                      label="联系方式">
                    </el-table-column>
                  </el-table>
                    <div class="block clear" >
                        <div class='paginationRight'>
                           <el-pagination
                            layout="total,prev, pager, next"
                            :total=length4
                            @current-change="handleCurrentChange4">
                           </el-pagination>
                           
                        </div>
                    </div>
                </el-card>
            </el-col>
          </el-row>
        <!-- 开通产品 -->
        <!-- <el-dialog title="" :visible.sync="auditformElementVisible2" width="600px">  
          <div slot="footer" class="dialog-footer">
            <el-button @click="auditformElementVisible2 = false">取 消</el-button>
            <el-button type="primary" @click='doauditForm2'>确 定</el-button>
          </div>
        </el-dialog> -->
        <!-- 图表 -->
        <el-row>
          <el-col :span="24">
            <el-card class="box-card" shadow="never">
              <div slot="header" class="clear">
                <h3>交易/毛利/欺诈情况</h3>
              </div>
              <div class="chart-btn ">
                 <span class="active time mr30" @click='getChartData("myChart1","1",$event)'>近14天</span>
                <span class="time mr30" @click='getChartData("myChart1","2",$event)'>近8周</span>
                <span class="time" @click='getChartData("myChart1","3",$event)'>近6个月</span>
            </div>
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
    name:"商户核查单详情",
    computed:{
        isdisable:function(){  //审核拒绝才能确定
            return this.auditform.auditResult == 0 &&  this.auditform.auditOpinion == '' ? true : false
        }
    },
    data(){
        return{
            formLabelWidth2: '80px',
            formLabelWidth: '150px',
             isprtypetext:'请至少选择一种产品类型',
            dispatchformElementVisible:false,//派发弹框显示与隐藏
            auditformElementVisible:true,//审核核查单弹框显示与隐藏
            processElementVisible1:false,//处理弹框显示与隐藏
            source:'kyc',
            shpjxq:[],
            idList:[],//表格中选中的行idlist
            length1:0,
            pageNumber1:1,
            pageRow1:10,
            length2:0,
            pageNumber2:1,
            pageRow2:10,
            length3:0,
            pageNumber3:1,
            pageRow3:10,
            length4:0,
            pageNumber4:1,
            pageRow4:10,
            detailList:{"YEJISHUXING":''},//商户基本信息
            expandshhcdqk:[],
            expandshyqxx:[],
            expandshktcp:[],
            expandshtsqk:[],
            shhcdqkTotal:0,
            shhcdqk:[],//商户核查单情况(近30天
            shyqxxTotal:0,
            shyqxx:[],
            shtsqk:[],
            shktcp:[],  //商户开通产品
            zhdata:'',
            khdata:'',
            zhdatatext:'',
            khdatatext:'',
            cpcaozuotext:'',
            items:[],
            processElementVisible2:false,//处理弹框显示与隐藏
            // auditformElementVisible2:false,//处理弹框显示与隐藏
            auditformElementparam:'',
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
      this.getChartData('myChart1','1')
      this.getChartData('myChart2','1')
      this.getChartData('myChart3','1')
      this.getAllDetail()  //所有详情
      this.getcheckListDetail(1)  //商户核查单情况近30天
      this.getPublicSentimentDetails(1)  //舆情
      this.getCustomerOpenList(1)  //开通产品
      this.getSomplaintDetails(1)  //商户投诉情况
    },
    methods:{

      statusText(txt){  
        if(txt == '正常'){
          return '冻结'
        }else{
          return '正常'
        }
      },
      ktcptip(flag){
        var self = this
        if(self.items.length == 0){
            self.atleastOne()
            return false
        }
        this.auditformElementparam = flag
        var text = flag
        this.$confirm('确认'+ text +'?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          callback:function(item){
            var params = {}
            if(item == 'confirm'){
              self.doauditForm2()
              
            }
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
      doauditForm2(){  //批量操作
        var self = this 
        var temp = []
        
        self.items.map(function(ele){
          temp.push({
            baseProdect:ele.baseProdect,
            marketingProductCode:ele.marketingProductCode,
            baseProductCode:ele.baseProductCode,
            versionFlag:ele.versionFlag
          })
        })
        var params = {
          status:self.auditformElementparam == '批量启用' ? 'ENABLE' : 'DISABLE',
          customerNumber:self.$route.params.customerNumber,
          operator:'',
          data:JSON.stringify(temp)
        }
        
        this.$axios.post('/CustomerInfoController/batchProductOperation',qs.stringify(params)).then(res => {
          var response = res.data
          if(response.code == '200'){
             self.getCustomerOpenList(1)
             self.successTip(response.msg)
          }
        }) 
      },
      
      getAllDetail(){  //获取所有列表信息
        var self = this
        var param = {
          customerNumber : self.$route.params.customerNumber
        }
        this.$axios.post('/CustomerInfoController/queryPortaritDetailsByCustomerNum',qs.stringify(param)).then(res => {
          var response = res.data
          if(response.code == '200'){
            self.detailList = response.data.baseInfo   //基本信息
            self.shpjxq = response.data.customerGrade  //商户评级详情
            if(response.data.customerStatusMan){
              self.zhdata = response.data.customerStatusMan.accountStatus == 'ACTIVE' ? '正常' : response.data.customerStatusMan.accountStatus == 'FROZEN' ? '冻结' : ''  //状态管理
              self.zhdatatext = response.data.customerStatusMan.accountStatus == 'ACTIVE' ? '冻结' : response.data.customerStatusMan.accountStatus == 'FROZEN' ? '解冻' : ''  //状态管理
              self.khdata = response.data.customerStatusMan.customerStatus == 'ACTIVE' ? '活跃' : response.data.customerStatusMan.customerStatus == 'FROZEN' ? '冻结' : ''  //状态管理 
              self.khdatatext = response.data.customerStatusMan.customerStatus == 'ACTIVE' ? '冻结' : response.data.customerStatusMan.customerStatus == 'FROZEN' ? '解冻' : ''  //状态管理
            }
          }else{
            console.log(response.msg)
          }
        }) 
      },
      getCustomerOpenList(page,collapse){  //开通产品   
          var self = this
          var param = {
            customerNumber : self.$route.params.customerNumber,
            pageNumber:page,
            pageRow:self.pageRow3,
          }
          this.$axios.post('/CustomerInfoController/getCustomerOpenList',qs.stringify(param)).then(res => {
            var response = res.data
            if(response.code == '200'){
                if(response.data && response.data.returnList.length == 0){
                  self.shktcp = [{'status':''}]
                  self.length3 = 0  
                  return false
                }
                self.shktcp = collapse ? response.data.returnList :[response.data.returnList[0]]
                self.expandshktcp = response.data.returnList  //开通产品
                self.length3 = response.data.total
                
            }else{
              console.log(response.msg)
            }
          }) 
        },
       getSomplaintDetails(page,collapse){  //商户投诉情况   
          var self = this
          var param = {
            merchantNo : self.$route.params.customerNumber,
            pageNumber:page,
            pageRow:self.pageRow4,
          }
          this.$axios.post('/checklist/getSomplaintList',qs.stringify(param)).then(res => {
            var response = res.data
            if(response.code == '200'){
              self.shtsqk = collapse ? response.data.returnList :[response.data.returnList[0]]
              self.expandshtsqk = response.data.returnList
              self.length4 = response.data.total
            }
          }) 
        },
      getcheckListDetail(page,collapse){  //商户核查单情况近30天
          var self = this
          var param = {
            merchantNo : self.$route.params.customerNumber,
            pageNumber:page,
            pageRow:self.pageRow1,
          }
          this.$axios.post('/checklist/getDetailList',qs.stringify(param)).then(res => {
            var response = res.data
            if(response.code == '200'){
              self.shhcdqk = collapse ? response.data.returnList : [response.data.returnList[0]]
              self.expandshhcdqk = response.data.returnList
              self.shhcdqkTotal = self.length1 = response.data.total
            }
          }) 
      },
      getPublicSentimentDetails(page,collapse){  //商户舆情情况   
          var self = this
          var param = {
            merchantNo : self.$route.params.customerNumber,
            pageNumber:page,
            pageRow:self.pageRow2,
          }
          this.$axios.post('/checklist/getPublicSentiment',qs.stringify(param)).then(res => {
            var response = res.data
            if(response.code == '200'){
              self.shyqxx = collapse ? response.data.returnList : [response.data.returnList[0]]
              self.expandshyqxx = response.data.returnList
              self.shyqxxTotal = self.length2 = response.data.total
            }
          }) 
        },
     
      getMerchantStatus(para){  //商户状态管理    
        var self = this
        var param = {
          type : self.$route.params.customerSign,
        }
        this.$axios.post('/CustomerInfoController/changeAccountStatus',qs.stringify(param)).then(res => {
          var response = res.data
          if(response.code == '200'){
            self.detailList[0] = self.$route.params.customerSign
            self.detailList[1] = self.$route.params.customerSignLevel
            self.detailList[2] = self.$route.params.bussineNumberCounts
            self.shqk = response.data.customerisituation
            self.shktqk = response.data.customeproduct
          }
        }) 
      },
       gomidentity(){
        var customerSign = this.$route.params.customerNumber
          window.open('#/merchantIdentityDetail/'+ customerSign)
      },
      gotoDetail(){
         //进入详情页
        window.open('#/merchantPhotoDetail/' + this.detailList.customerNumber)
      },
      gotoAgentPortraitDetail(){
        //代理商
        window.open('#/manager/agentPortrait/detail/' + this.detailList.agentCode)
      },
      gotoBranchCompanyPhoto(){  //跳转分公司画像
        window.open('#/branchCompanyPhoto/'+this.detailList.YEJISHUXING)
      },
      gotoSale(){  //跳转销售
        window.open('#/salesPortrait/' + this.detailList.saleId + '/' + this.detailList.saleName)
      },
      changetext(text){
        var self = this
        if(text == 'ENABLE'){
          self.cpcaozuotext = '正常'
        }else{
          self.cpcaozuotext =  '启用'
        }
        return self.cpcaozuotext
      },
      cpcaozuo(row){
        var self = this
        var text 
       if(row.status == 'ENABLE'){
           text = '禁用'
        }else if(row.status == 'DISABLE'){
           text = '启用'
        }
        this.$confirm('确认'+ text +'?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          callback:function(item){
            var params = {}
            if(item == 'confirm'){
              var status = ''
              if(row.status  == 'ENABLE'){
                status = 'DISABLE'
              }else if(row.status == 'DISABLE'){
                status = 'ENABLE'
              }
              params.customerNumber  = self.$route.params.customerNumber
              params.remark = row.remark
              params.operator=''
              params.status = row.operStatus  
              params.data = JSON.stringify([row])
              self.$axios.post('/CustomerInfoController/batchProductOperation',qs.stringify(params)).then(res => {
                var response = res.data
                if(response.code == '200'){
                  self.getCustomerOpenList(1)
                  self.successTip(response.msg)
                }
              }) 
              
            }
          }
        }) 
      },
      caozuo(text,type){
        var self = this
        this.$confirm('确认'+text+'?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          callback:function(item){
            var params = {}
            if(item == 'confirm'){
              if(text == '冻结'){
                params.status = 'FROZEN'
              }else if(text == '解冻'){
                params.status = 'ACTIVE'
              }else{
                params.status = ''
              }
              params.customerNumber = self.$route.params.customerNumber
              params.type = type
              
              self.$axios.post('/CustomerInfoController/changeAccountStatus',qs.stringify(params)).then(res => {
                var response = res.data
                if(response.code == '200'){
                  self.getMerchantDetails()
                  self.successTip(response.msg)
                }
              }) 
              
            }
          }
        }) 
      },
    showsecretinfo(){  //敏感字段鼠标移入效果
        var self = this
        if(self.$refs.legalIdcard.innerText.trim() != ''){
            self.$refs.legalIdcard.querySelector('.secret').classList.remove('none')
            var timer = null
            timer=setTimeout(() => {
               self.$refs.legalIdcard.querySelector('.secret').classList.add('none')
            }, 6000)
        }
      },
     openandclose(data,obj){  //表格得收缩与展开显示
        var self = this
        if(obj.target.classList.contains('el-icon-arrow-down')){
          obj.target.classList.remove('el-icon-arrow-down')
          obj.target.classList.add('el-icon-arrow-up')
          switch(data){
            case 'shhcdqk':  //商户核查单情况
              var temp = self.shhcdqk
              self.shhcdqk = [temp[0]]
            break;
            case 'shyqxx':  //商户舆情信息
              var temp = self.shyqxx
              self.shyqxx = [temp[0]]
            break;
            case 'shktcp':  //商户开通产品
              var temp = self.shktcp
              self.shktcp = [temp[0]]
            break;
            case 'shtsqk':  //商户投诉情况
              var temp = self.shtsqk
              self.shtsqk = [temp[0]]
            break;
          }
        }else{
          obj.target.classList.add('el-icon-arrow-down')
          obj.target.classList.remove('el-icon-arrow-up')
          switch(data){
            case 'shhcdqk':
              self.shhcdqk  = self.expandshhcdqk
            break;
            case 'shyqxx':
              self.shyqxx  = self.expandshyqxx
            break;
            case 'shktcp':
              self.shktcp  = self.expandshktcp
            break;
            case 'shtsqk':
              self.shtsqk  = self.expandshtsqk
            break;
          } 
        }
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
            "customerNumber":self.$route.params.customerNumber,  //商户编号
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
        this.$axios.post('/CustomerInfoController/getCustomerMaori',qs.stringify(param)).then(res => {
          var response = res.data
          if(response.code == '200'){
            if(JSON.stringify(response.data) == "{}"){
              self.clearData1()
              self.drawLine1()
              return false
            }
            option1.xAxis[0].data = response.data.times  //时间轴   ///////////
            // if(response.data.times.length < 66){
            //   option1.xAxis.axisLabel.interval = 0
            // }else{
            //   option1.xAxis.axisLabel.interval = 1
            // }
              option1.series[0].data = response.data.synthetical //收单金额
              option1.series[1].data = response.data.grossincome //毛利
            option1.series[2].data = response.data.fraudRateList //欺诈率

            self.drawLine1() 
          }
        })
      },
      getChartData2(id,flag){//报表商户投诉情况
        var self = this
        var param = {
          "merchantNo":self.$route.params.customerNumber,
          "timeType":flag
        }
        this.$axios.post('/checklist/getSomplaintP',qs.stringify(param)).then(res => {
          var response = res.data
          if(response.code == '200'){
            if(JSON.stringify(response.data) == "{}"){
              self.clearData2()
              self.drawLine2()
              return false
            }
            option2.xAxis[0].data = response.data.times  //时间
            option2.series[0].data = response.data.somplaintCountRate //商户投诉率(交易笔数)
            option2.series[1].data = response.data.somplaintAmountRate //商户投诉率(交易金额)
            self.drawLine2() 
          }
        })
      },
      getChartData3(id,flag){//报表3
        var self = this
        var param = this.getPara(flag)
        this.$axios.post('/CustomerInfoController/getCustomerRateIncome',qs.stringify(param)).then(res => {
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
        option.xAxis.data = []  //时间轴
        option.series[0].data =[] //限额限次拦截率
        option.series[1].data = [] //黑名单拦截率
        option.series[2].data = [] //黑名单拦截率
      },
      clearData2(){
        option2.xAxis[0].data = []//时间
        option2.series[0].data = [] 
        option2.series[1].data = [] 
        option2.series[2].data = [] 
      },
      clearData3(){
        option3.xAxis[0].data = [] //时间
        option3.series[0].data = [] // 
        option3.series[1].data = [] // 
      },
      handleCurrentChange1(val) { //商户核查单
         this.pageNumber1 = `${val}`  //当前页
         this.$refs.shhcdqkbox.classList.remove('el-icon-arrow-up')  
         this.$refs.shhcdqkbox.classList.add('el-icon-arrow-down')
         this.getcheckListDetail(val,true)
      },
      handleCurrentChange2(val) {  //商户舆情
         this.pageNumber2 = `${val}`  //当前页
         this.$refs.shyqxxbox.classList.remove('el-icon-arrow-up')  
         this.$refs.shyqxxbox.classList.add('el-icon-arrow-down')
         this.getPublicSentimentDetails(val,true)
      },
      handleCurrentChange3(val) {  //开通产品
        this.pageNumber3 = `${val}`  //当前页
        this.$refs.shktcpbox.classList.remove('el-icon-arrow-up')  
        this.$refs.shktcpbox.classList.add('el-icon-arrow-down')
        this.getCustomerOpenList(val,true)
      },
      handleCurrentChange4(val) {  //商户投诉
         this.pageNumber4 = `${val}`  //当前页
         this.$refs.shtsqkbox.classList.remove('el-icon-arrow-up')  
         this.$refs.shtsqkbox.classList.add('el-icon-arrow-down')
         this.getSomplaintDetails(val,true)
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
              str+=addCommas(Number(item[2]).toFixed(2))+'亿元\<br>'
            }
            if(index==1){
              str+=addCommas(Number(item[2]).toFixed(2))+'万元\<br>'
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
      x2:40,
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
            data:[] 
        },
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
        data:['投诉率(笔数)','投诉率(金额)']
    },
    xAxis: [
        {
          splitLine:{show: false},//去除网格线
            type: 'category',
            data: [],
    
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
                    color:color[0]  //改变珠子颜色
                }
            },
            data: [30,20,40,90,80,40,10.5,50]
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
     
          params.map(function(item,index){
            str0=item[1]+'\<br>'
            str+=item[0]+': '
            if(index==1){
              str+=addCommas(Number(item[2]).toFixed(2))+'元\<br>'
            }
            if(index == 0){
              str+=Number(item[2]).toFixed(2)+'%\<br>'
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
  @import '~@/less/common.less';
  @import '~@/less/detail.less';
</style>
<style scoped lang="less">
.active{background:#ecf5ff;color:#409eff;border-color:#b3d8ff;padding:6px 10px;border-radius: 100%;}
.time{padding:6px 10px;border-radius: 100%;}
.time:hover{background: #409eff;color:white;cursor:pointer;}
.el-icon-arrow-up:before{color:#fff;}
.el-icon-arrow-down:before{font-weight:800;color:#fff;}
.bgf5{background: #F5F6FA;text-align: center;}  
.bgf5{background: #F5F6FA;text-align: center;}  
table.table{
    border:1px solid #ebeef5;
    td{border-top:1px solid #ebeef5; border-right:none;height: 50px;text-align: center;color:#636363;}
    th{color:#636363;height: 50px;}
}

.blue{
color:#409eff;
cursor: pointer;
}
.secret{
   background: rgba(0,0,0,0.8);
   color:white;
   border-radius: 3px;
   line-height: 28px;
   padding:0 8px;
   font-size: 14px;
   top:8px;z-index:10;
   &:before{
    content: '';
    display: inline-block;
    position: absolute;
    left:-10px;
    top:6px;
    width: 0;
    height: 0;
    border-top: 5px solid white;
    border-right: 10px solid rgba(0,0,0,0.8);
    border-bottom: 5px solid white;
   }
}
</style>
