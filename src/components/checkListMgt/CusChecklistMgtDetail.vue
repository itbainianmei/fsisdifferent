<!--非Epos交易查询detail-->
<template>
    <div id="CusChecklistMgtDetail">
        <div class="contentBotoom clear">
            <div class="button fl">
                <div class="leftButton clear ">
                    <div class="BotoomBtn leftRadius" v-show="addCase" title="生成商户案件" @click="addCaseevent">
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
        <table  cellspacing="0" cellpadding="0" style="width:100%;" align="center"> 
                <tr align="center">
                    <td  class="bgf5" style="min-width:100px;">商户唯一标识</td>
                    <td style="min-width:100px;"><a href="javascript:void(0)" @click="gomidentity">{{detailList.customerSign}}</a></td>
                    <td  class="bgf5" style="min-width:100px;">商户编号</td>
                    <td style="min-width:100px;"><a href="javascript:void(0)" @click="gomphoto">{{detailList.customerNumber}}</a></td>
                    <td  class="bgf5" style="min-width:100px;">商户签约名</td>
                    <td style="min-width:100px;">{{detailList.signName}}</td>
                    <td class="bgf5" style="min-width:100px;">商户名称</td>
                    <td style="min-width:100px;">{{detailList.signName}}</td>
                     <td class="bgf5" style="min-width:100px;">KYC认定</td>
                    <td style="min-width:100px;">{{detailList.KYCCognizance}}</td>
                     <td class="bgf5" style="min-width:100px;">初始结果</td>
                    <td style="min-width:100px;">{{detailList.kycFirstResult}}</td>
                     <td class="bgf5" style="min-width:100px;">复核结果</td>
                    <td style="min-width:100px;">{{detailList.kycReviewResult}}</td>
                </tr>
                <tr align="center">
                    <td class="bgf5">人工识别结果</td>
                    <td>{{detailList.artificialResults}}</td>
                    <td class="bgf5">唯一标识下商编数</td>
                    <td>{{detailList.customerNumOfcustomerSign}}</td>
                     <td class="bgf5">商户报备标签</td>
                    <td>{{detailList.customerLabel}}</td>
                     <td class="bgf5">商户评级</td>
                    <td>{{detailList.customerCredentialLevel}}</td>
                    <td class="bgf5">销售</td>
                    <td>{{detailList.saleName}}<a href="javascript:void(0)" @click="gosalephoto">{{detailList.saleLevel}}</a></td>
                    <td class="bgf5">分公司</td>
                    <td>{{detailList.YEJISHUXING}}<a href="javascript:void(0)" @click="gotoBranchCompanyPhoto">{{detailList.YEJISHUXINGLevel}}</a></td>
                    <td class="bgf5">商户入网日期</td>
                    <td>{{detailList.createDate}}</td>
                </tr>
                 <tr align="center">
                    <td class="bgf5">商户自然属性一级</td>
                    <td>{{detailList.businessCat}}</td>
                    <td class="bgf5">商户自然属性二级</td>
                    <td>{{detailList.subBusinessCat}}</td>
                     <td class="bgf5">行业业绩属性</td>
                    <td>{{detailList.productLine}}</td>
                     <td class="bgf5">代理商编号</td>
                    <td>{{detailList.agentCode}}</td>
                    <td class="bgf5">代理商名称</td>
                    <td>{{detailList.agentName}}</td>
                    <td class="bgf5">营业执照号</td>
                    <td>{{detailList.businessLicence}}</td>
                    <td class="bgf5">特批情况</td>
                    <td>{{detailList.approved}}</td>
                </tr>
                <tr align="center">
                    <td class="bgf5">法人姓名</td>
                    <td>{{detailList.legalName}}</td>
                    <td class="bgf5">法人身份证号</td>
                    <td>{{detailList.legalIdcard}}</td>
                     <td class="bgf5">APP名称</td>
                    <td>{{detailList.appName}}</td>
                    <td class="bgf5">公众号名称</td>
                    <td>{{detailList.officialAccountName}}</td>
                    <td class="bgf5">上一次巡检结果</td>
                    <td>{{detailList.inspectionResult}}</td>
                    <td class="bgf5">上一次巡检日期</td>
                    <td>{{detailList.inspectionDate}}</td>
                    <td class="bgf5"></td>
                    <td></td>
                </tr>
                <tr align="center">
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
            <h3 class="dis-inline fs18">商户核查单情况(近30天)</h3><i class="el-icon-arrow-down fs24 mr30"  @click='openandclose("shhcdqk",$event)'></i>总计：<span>{{shhcdqkTotal}}</span> 条
        </div>
        <el-table
            :data="shhcdqk"
            border
            style="width: 100%">
            <el-table-column
              prop="date"
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
              prop="acceptanceTime"
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
              prop="KYCResult"
              width="100"
              label="KYC结果值">
            </el-table-column>
            <el-table-column
              prop="ruleScore"
              width="100"
              label="规则分值">
            </el-table-column>
            <el-table-column
              prop="address"
              width="240"
              label="舆情新闻">
            </el-table-column>
            <el-table-column
              prop="publicSentimentAbstract"
              width="240"
              label="舆情摘要">
            </el-table-column>
            <el-table-column
              prop="publicSentimentNews"
              width="220"
              label="舆情摘要">
            </el-table-column>
            <el-table-column
              prop="lastModifiedBy"
              width="100"
              label="最后操作人">
            </el-table-column>
            <el-table-column
              prop="lastModifiedTime"
              width="200"
              label="最后操作时间">
            </el-table-column>
            <el-table-column
              prop="remark"
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
        <!-- end -->
        <div class="fs18 mt30">
            <h3 class="dis-inline fs18">商户舆情信息</h3><i class="el-icon-arrow-down fs24 mr30"></i>总计：<span>{{shyqxxTotal}}</span> 条
        </div>
        <el-table
          border
          :data="shyqxx"
          style="width: 100%">
          <el-table-column
            prop="publicSentimentTime"
            label="舆情日期"
            >
          </el-table-column>
          <el-table-column
            prop="publicSentimentNews"
            label="舆情新闻"
           >
          </el-table-column>
          <el-table-column
            prop="publicSentimentAbstract"
            label="舆情摘要">
          </el-table-column>
          <el-table-column
            prop="publicSentimentLevel"
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
        <table class="table" cellspacing="0" cellpadding="0" border="0" style="width:100%;">  <tr>
              <th class="bgf5">类型</th>
              <th class="bgf5">当前状态</th>
              <th class="bgf5">备注</th>
              <th class="bgf5">最后操作日期</th>
              <th class="bgf5">操作</th>
          </tr>
          <tbody>
              <tr :data="zhdata">
                  <td class="bgf5">{{zhdata.statusType}}</td>
                  <td>{{zhdata.statusValue}}</td>
                  <td>{{zhdata.remark}}</td>
                  <td>{{zhdata.updateDate}}</td>
                  <td><a class="blue" href="javascript:;" @click="caozuo('关闭')">{{statusText(zhdata.statusValue)}}</a></td>
              </tr>
              <tr :data="khdata">
                  <td class="bgf5">{{zhdata.statusType}}</td>
                  <td>{{zhdata.statusValue}}</td>
                  <td>{{zhdata.remark}}</td>
                  <td>{{zhdata.updateDate}}</td>
                  <td><a class="blue" href="javascript:;" @click="caozuo('关闭')">{{statusText(zhdata.statusValue)}}</a></td>
              </tr>
          </tbody>
        </table>
         <!-- end -->
        <div class="fs18 mt30">
            <h3 class="dis-inline fs18">商户开通产品</h3><i class="el-icon-arrow-down fs24 mr30" @click='openandclose("shktcp",$event)'></i>  <span class="blue " style="margin-left:50px;">批量操作</span>
        </div>
        <el-table
          border
          @cell-click="yyy"
          @selection-change="selectedItemsid"
          :data="shktcp"
          style="width: 100%">
          <el-table-column
              type="selection"
              width="50">
          </el-table-column>
          <el-table-column
            prop="date"
            align="center"
            label="基础产品"
            >
          </el-table-column>
          <el-table-column
            prop="name"
            align="center"
            label="零售产品"
           >
          </el-table-column>
          <el-table-column
            prop="address"
            align="center"
            label="状态">
          </el-table-column>
          <el-table-column
            prop="address"
            align="center"
            label="更新日期">
          </el-table-column>
          <el-table-column
            prop="address"
            align="center"
            label="关闭/开通原因">
          </el-table-column>
          <el-table-column
            align="center"
            label="操作"
            >
            <template slot-scope="scope">
              <span class="blue" @click="caozuo(scope.row.caozuo)">{{scope.row.caozuo}}</span>
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
         <!-- end -->
        <div class="fs18 mt30">
            <h3 class="dis-inline fs18">商户投诉情况</h3> <i class="el-icon-arrow-down fs24 mr30"></i>
        </div>
        <el-table
          border
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
            prop="somplaintType"
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
        <!-- 派发弹框 -->
        <el-dialog title="" :visible.sync="dispatchformElementVisible" width="600px">  
          <el-form :model="dispatchform" :rules="rules" ref="dispatchformElement">
            <el-form-item label="派发至" :label-width="formLabelWidth" prop="companyId">
              <el-select v-model="dispatchform.companyId" @change="isDispatchErro" placeholder="请选择" style="width: 80%;max-width:225px;">
                    <el-option
                        v-for="item in dispatchformArray"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                 <span class="errorbox" v-show="companyId" v-html="companyIdtext"></span>
            </el-form-item>
            <el-form-item label="备注" :label-width="formLabelWidth" >
              <el-input v-model="dispatchform.remark" maxlength="100" placeholder="请填写备注" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dispatchformElementVisible = false">取 消</el-button>
            <el-button type="primary" @click='dispatchForm("dispatchformElement",dispatchform,"dispatchformElementVisible")'>确 定</el-button>
          </div>
        </el-dialog>
        <!-- 审核弹框 -->
        <el-dialog title="" :visible.sync="auditformElementVisible" width="600px">  
          <el-form :model="auditform" :rules="rules" ref="auditformElement">
            <el-form-item label="审核结果:" :label-width="formLabelWidth" prop="auditResult">
              <el-select v-model="auditform.auditResult" @change="isauditResultErro"  placeholder="请选择" style="width: 80%;max-width:225px;">
                    <el-option label="审核通过" value="1"></el-option>
                    <el-option label="审核拒绝" value="0"></el-option>
                </el-select>
                <span class="errorbox" v-show="auditResult" v-html="auditResulttext"></span>
            </el-form-item>
                <!--！！！！ 审核结果为拒绝时，审核意见为必填项 start 额外做了判空 -->
                <el-form-item label="审核意见:" :label-width="formLabelWidth" prop="auditOpinion" >
                   
                  <el-input v-model="auditform.auditOpinion" maxlength="100" placeholder="请输入审核意见" auto-complete="off"></el-input>
                </el-form-item>
                 <div style="position:relative;top:-30px;font-size:10px;width:120px;text-align:right;color:#666;">(审核拒绝时必填)</div>
                <!--！！！！ 审核结果为拒绝时，审核意见为必填项 end-->
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="auditformElementVisible = false">取 消</el-button>
            <el-button type="primary" :disabled="isdisable" @click='doauditForm("auditformElement",auditform,"auditformElementVisible")'>确 定</el-button>
          </div>
        </el-dialog>
        <!-- 商户核查单  处理弹框 -->
        <el-dialog title="" :visible.sync="processElementVisible1"  width="700px">  
          <el-form :model="processform" :rules="rules" ref="processElement">
            <div v-if='source == "自动KYC"'>
                <el-form-item label="自动KYC结果值:" :label-width="formLabelWidth" prop="xx">
                    <span v-text="processform.xx"></span>
                </el-form-item>
                <el-form-item label="次数:" :label-width="formLabelWidth" prop="knowkyc">
                    <span v-text="processform.knowkyc"></span>
                </el-form-item>
            </div>
            <div v-if="source == 'others' || source == '巡检KYC'">
                <el-form-item label="活动性质:" :label-width="formLabelWidth" prop="riskDeal">
                    <el-checkbox-group v-model="processform.riskDeal">
                      <el-checkbox label="关闭支付接口" name="riskDeal" @change="liandongselect" class="ml30" :disabled="open"></el-checkbox>
                      <el-checkbox label="冻结账户状态" name="riskDeal" @change="liandongselect" :disabled="jiedong"></el-checkbox>
                      <el-checkbox label="冻结客户状态" name="riskDeal" @change="liandongselect" :disabled="jiedong2"></el-checkbox>
                      <el-checkbox label="加入黑名单" name="riskDeal" @change="liandongselect" :disabled="removeblack"></el-checkbox>
                      <el-checkbox label="开通支付接口" name="riskDeal" @change="liandongselect" :disabled="close"></el-checkbox>
                      <el-checkbox label="解冻账户状态" name="riskDeal" @change="liandongselect" :disabled="dongjie"></el-checkbox>
                      <el-checkbox label="解冻客户状态" name="riskDeal" @change="liandongselect" :disabled="dongjie2"></el-checkbox>
                      <el-checkbox label="删除黑名单" name="riskDeal" @change="liandongselect" :disabled="addblack"></el-checkbox>
                      <el-checkbox label="无风险" name="riskDeal"></el-checkbox>
                      <el-checkbox v-if="source == '巡检KYC'" label="整改完成" name="riskDeal"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="产品:" :label-width="formLabelWidth" v-show="open || close" prop="product">
                    <el-checkbox-group v-model="processform.product"  @change="hasOne">
                      <el-checkbox label="一键支付" name="product" class="ml30"></el-checkbox>
                      <el-checkbox label="无卡支付" name="product"></el-checkbox>
                      <el-checkbox label="预授权" name="product"></el-checkbox>
                      <el-checkbox label="网银" name="product"></el-checkbox>
                      <el-checkbox label="代付代发" name="product"></el-checkbox>
                      <el-checkbox label="日结通" name="product"></el-checkbox>
                      <el-checkbox label="企业账户支付" name="product"></el-checkbox>
                      <el-checkbox label="分期聚合" name="product"></el-checkbox>
                      <el-checkbox label="银行卡分期" name="product"></el-checkbox>
                      <el-checkbox label="三代会员转账" name="product"></el-checkbox>
                      <el-checkbox label="三代会员支付" name="product"></el-checkbox>
                    </el-checkbox-group>
                     <span class="errorbox" v-show="prtype" v-html="isprtypetext"></span>
                </el-form-item>
            </div>
            <el-form-item label="人工识别商户KYC:" :label-width="formLabelWidth" prop="artificialKYC">
                <el-input v-model="processform.artificialKYC" placeholder="请填写人工识别商户KYC" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="调查信息:" :label-width="formLabelWidth" prop="investigationInfo">
                <el-input v-model="processform.investigationInfo" placeholder="请填写调查信息" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="备注:" :label-width="formLabelWidth" >
              <el-input v-model="processform.remark" maxlength="100" placeholder="请填写备注" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="processElementVisible1 = false">取 消</el-button>
            <el-button type="primary" @click='processForm("processElement",processform,"processElementVisible1")'>确 定</el-button>
          </div>
        </el-dialog>
        <!-- 图表 -->
        <div class="mt20 mb30 w clear">
            <div class="fl" style="width:44%;margin-left:1%;">
                <h3 class="dis-inline fs18 ml30" style="background:#409EFF;color:white;padding:5px 10px;">商户交易毛利情况趋势</h3> 
                <div class="mb20 ml30">
                     <span class="active time mr30" ref="chart1time1" @click='getChartData("myChart1","1",$event)'>近14天</span>
                    <span class="time mr30" @click='getChartData("myChart1","2",$event)'>近8周</span>
                    <span class="time" @click='getChartData("myChart1","3",$event)'>近6个月</span>
                </div>
                <div id="myChart1" class="center" :style="{width: '100%', height: '280px'}"></div>
            </div>
            <div class="fl" style="width:26%;margin-left:1%;">
                <h3 class="dis-inline fs18 ml30" style="background:#409EFF;color:white;padding:5px 10px;">商户投诉情况</h3> 
                <div class="mb20 ml30">
                    <span class="active time mr30" ref="chart2time1" @click='getChartData("myChart2","1",$event)'>近14天</span>
                    <span class="time mr30" @click='getChartData("myChart2","2",$event)'>近8周</span>
                    <span class="time" @click='getChartData("myChart2","3",$event)'>近6个月</span>
                </div>
                <div id="myChart2" class="center" :style="{width: '100%', height: '280px'}"></div>
            </div> 
            <div class="fl" style="width:26%;margin-left:1%;margin-right:1%;">
                <h3 class="dis-inline fs18 ml30" style="background:#409EFF;color:white;padding:5px 10px;">商户综合费率及万元毛利收益</h3> 
                <div class="mb20 ml30">
                     <span class="active time mr30" ref="chart3time1" @click='getChartData("myChart3","1",$event)'>近14天</span>
                    <span class="time mr30" @click='getChartData("myChart3","2",$event)'>近8周</span>
                    <span class="time" @click='getChartData("myChart3","3",$event)'>近6个月</span>
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
    computed:{
        isdisable:function(){  //审核拒绝才能确定
            return this.auditform.auditResult == 0 &&  this.auditform.auditOpinion == '' ? true : false
        }
    },
    data(){
        return{
            formLabelWidth: '150px',
            isprtypetext:'请至少选择一种产品类型',
            dispatchformElementVisible:false,//派发弹框显示与隐藏
            auditformElementVisible:false,//审核核查单弹框显示与隐藏
            processElementVisible1:false,//处理弹框显示与隐藏
            source:'',
            dispatchform:{  //派发商户核查单
             companyId:'', 
             remark:''
            },
            auditform:{
              auditResult:'',
              auditOpinion:''
            },
            processform:{  //处理商户核查单
             knowkyc:'xxx', 
             artificialKYC:'', 
             investigationInfo:'',
             remark:'',
             riskDeal: [],
             product: []
            },
            prtype: false,
            close:false,
            dongjie:false,
            dongjie2:false,
            addblack:false,
            open:false,
            jiedong:false,
            jiedong2:false,
            removeblack:false,
            companyId:false,  //派发
            companyIdtext:'',
            auditResult:false,  //审核结果
            auditResulttext:'',
            rules:{
              checkListSource:[
                  {required: true, message: '请选择核查单来源', trigger: 'change'}
              ],
              merchantNo:[
                  {required: true, message: ' ', trigger: 'blur'}
              ],
              riskQualitativeAnalysis:[
                  {required: true, message: '请输入人工识别商户KYC', trigger: 'blur'}
              ],
              riskDeal:[
                  {required: true, message: '请输入调查信息', trigger: 'blur'}
              ],
              type: [
                  { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
              ],
              prtype: [
                  { type: 'array', required: true, message: ' ', trigger: 'change' }
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
            dispatchformArray:[],//派发到哪哪
            addCase:true,
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
            ahthpf:true,
            ahthcl:true,
            ahthsh:true,
            zhdata:{},
            khdata:{},
            detailList:[],//商户基本信息
            shztgl:[],
            shpjxq:[],
            expandshhcdqk:[],
            expandshyqxx:[],
            expandshktcp:[],
            expandshtsqk:[],
            shtsqk:[],
            shhcdqkTotal:0,
            shhcdqk:[],//商户核查单情况(近30天
            shyqxxTotal:0,
            shyqxx:[],//商户舆情信息
            shktcp:[],//商户开通产品
        }
    },
    created(){
      this.source = this.$route.params.checkListType
    },
    mounted(){  //取详情列表
      // this.drawLine1();
      // this.drawLine2();
      // this.drawLine3();
      this.getRiskDeal()//风险处理
      this.getRiskDeal2()//弹框中的  风险处理
      this.getMerchantFirst()//商户自然属性一级
      this.getIndustryAchievementProperty()//商户业绩属性
      this.getDealStatus()//处理状态查询
      this.getCheckListSource()//核查单来源
      this.getCheckListSource2()//弹框中的 核查单来源
      this.getSubCompany()//派发至 分公司
      /* 那些个详情 开始 */
      this.getcheckListDetail() //商户核查单情况近30天
      this.getMerchantDetails() //商户基本信息
      this.getPublicSentimentDetails() //商户舆情情况
      this.getSomplaintDetails() //商户投诉情况表
      this.getChartData("myChart1","1")  //商户投诉情况图
      this.getChartData("myChart2","1")  //商户投诉情况图
      this.getChartData("myChart3","1")  //商户投诉情况图
    },
    methods:{
      hasOne(){
        if(this.processform.product != ''){
            this.product = false
        }else{
            this.product = true
        }
      },
      handleCurrentChange1(val) {  //商户核查单
         this.pageNumber1 = `${val}`   
         this.getcheckListDetail()
      },
      handleCurrentChange2(val) {  //商户舆情
         this.pageNumber2 = `${val}`   
         this.getPublicSentimentDetails()
      },
      handleCurrentChange3(val) {  //开通产品
         this.pageNumber3 = `${val}`   
         this.getChartData()
      },
      handleCurrentChange4(val) {  //商户投诉
         this.pageNumber4 = `${val}`   
         this.getSomplaintDetails()
      },
      yyy(row, column, cell, event){
        if(column.label == '操作'){
          this.caozuo(row.caozuo)
        }
      },
      caozuo(text){
        var self = this
        this.$confirm('确认'+text+'?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          callback:function(item){
            if(item == 'confirm'){
              params.id = self.$route.params.id
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
      statusText(txt){  
        if(txt == '正常'){
          return '冻结'
        }else{
          return '正常'
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
      gomidentity(){
        var customerSign = this.$route.params.customerSign
        var level = this.$route.params.level
        var bussineNumberCounts = this.$route.params.bussineNumberCounts
          window.open('#/merchantIdentityDetail/'+ customerSign + '/'+ level+ '/'+ bussineNumberCounts)
      },
      gomphoto(){
        window.open('#/merchantPhoto/')
      },
      gosalephoto(){
        window.open('#/salesPortrait/' + this.detailList.saleId + '/' + this.detailList.saleName)
      },
      gotoBranchCompanyPhoto(){  //跳转分公司画像
         window.open('#/branchCompanyPhoto/'+this.detailList.YEJISHUXING)
      },
      getCheckListSource2(){ //核查单来源
        var param = this.addSessionId({})
        this.$axios.post("/param/getCheckListSourceAdd",qs.stringify(param)).then(res => {
            var response = res.data
            if(response.code == '200'){
                this.hcdlyArray2 = response.data.returnList
            }else{
                this.$message.error({message:response.msg,center: true});
            }
        })
      }, 
      getRiskDeal2(){ //风险处理
        var param = this.addSessionId({})
        this.$axios.post("/param/getRiskDealFrame",qs.stringify(param)).then(res => {
            var response = res.data
            if(response.code == '200'){
                this.fxclArray2 = response.data.returnList
            }else{
                this.$message.error({message:response.msg,center: true});
            }
        })
      },
      doauditForm(formName,params,hiddenElement){
        /*  审核
          formName: 表单id  string
          params: 传入参数  {}
          hiddenElement: 控制表单显示的数据  string
        */
        var flag = this.isauditResultErro()
        if(flag){
            var subParam = params
            subParam.id= this.$route.params.id
            this[hiddenElement] = false 
             subParam.sessionId = localStorage.getItem('SID') ? localStorage.getItem('SID'):''
            this.$axios.post('/checklist/examine',qs.stringify(subParam)).then(res => {
              var response = res.data
              if(response.code == '200'){
                this.listQuery("/checklist/getAll","cuscheck")
                this.auditform={
                    auditResult:'请选择',
                    auditOpinion:''
                }
                this.successTip(response.msg)
              }else{
                this.failTip(response.msg)
              }
            }) 
        }
     },
     dispatchForm(formName,params,hiddenElement){    
        /* 派发
          formName: 表单id  string
          params: 传入参数  {}
          hiddenElement: 控制表单显示的数据  string
        */
        var flag = this.isDispatchErro()
        if(flag){
            var subParam = params
            subParam.id= this.$route.params.id
            this[hiddenElement] = false 
            this.$axios.post('/checklist/send',qs.stringify(subParam)).then(res => {
              var response = res.data
              if(response.code =='200'){
               
                this.dispatchform = {  //派发商户核查单
                     companyId:'请选择',
                     remark:''
                }
                 this.query()   
                 this.successTip(response.msg)
              }else{
                this.failTip(response.msg)
              }
          }) 
        }
     }, 
     processForm(formName,params,hiddenElement){
        /*  处理
          formName: 表单id  string
          params: 传入参数  {}
          hiddenElement: 控制表单显示的数据  string
        */
        var self = this
        this.hasOne()
        this.$refs[formName].validate((valid) => {
            if(valid){
                var subParam = {}
                subParam.id= self.$route.params.id
                subParam.knowkyc= this.processform.knowkyc
                subParam.artificialKYC= this.processform.artificialKYC
                subParam.investigationInfo= this.processform.investigationInfo
                subParam.remark= this.processform.remark
                subParam.riskDeal= this.processform.riskDeal.join(',')
                subParam.product= this.processform.product.join(',')
                this[hiddenElement] = false 
                this.$axios.post('/checklist/handle',qs.stringify(subParam)).then(res => {
                  var response = res.data
                  if(response.code == '200'){
                     // this.getcheckListDetail()
                     this.processform = {  //处理商户核查单
                         knowkyc:'xxx', 
                         artificialKYC:'', 
                         investigationInfo:'',
                         remark:'',
                         riskDeal: [],
                         product: []
                      }
                      self.successTip(response.msg)
                  }else{
                    self.failTip(response.msg)
                  }
              }) 
            }
        })
     },
     addCaseevent(){ // 生成案件   
        var self = this
        var params = {}
        params.id = self.$route.params.id
        this.$axios.post("/checklist/addCase",qs.stringify(params)).then(res => {
            var response = res.data
            if(response.code != '200'){
                 this.$message.error({message:response.msg,center: true});
            }
        })
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
            "customerNumber":self.$route.params.merchantNo,  //商户编号
            "dateType":dateType,
            "dateCount":dateCount,
          }
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
      getChartData1(id,flag){
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
            // option.series[2].data = response.data.synthetical //欺诈率
            self.drawLine1() 
          }else{
            this.$message.error({message:response.msg,center: true});
          }
        })
      },
      getChartData2(id,flag){
        var self = this
        var param = {
          "merchantNo":self.$route.params.merchantNo,
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
            option2.xAxis[0].data = response.data.times
            option2.series[0].data = response.data.somplaintCountRate//商户投诉率(交易笔数)
            option2.series[1].data = response.data.somplaintAmountRate//商户投诉率(交易金额)
            self.drawLine2() 
          }else{
            this.$message.error({message:response.msg,center: true});
          }
        })
      },
      getChartData3(id,flag){
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
          }else{
            this.$message.error({message:response.msg,center: true});
          }
        })
      },
        pf(){  //怕发
            var self = this
            this.dispatchformElementVisible = true
        },
        cl(){  //处理
            var self = this
             this.processElementVisible1 = true
        },
        sh(){  //审核
            var self = this
            this.auditformElementVisible = true
        },
        isDispatchErro(){
           if(this.dispatchform.companyId == '请选择' || this.dispatchform.companyId == ''){
                this.companyId=true
                this.companyIdtext='请选择分公司'
                return false
            }else{
                this.companyId=false
                return true
            }   
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
        doauditForm(formName,params,hiddenElement){
          /*  审核
            formName: 表单id  string
            params: 传入参数  {}
            hiddenElement: 控制表单显示的数据  string
          */
          var flag = this.isauditResultErro()
          if(flag){
              var subParam = params
              subParam.id= this.idList.concat(this.chackboxChoose).join(',')
              this[hiddenElement] = false 
              this.$axios.post('/checklist/examine',qs.stringify(subParam)).then(res => {
                var response = res.data
                if(response.code == '200'){
                  this.listQuery("/checklist/getAll","cuscheck")
                  this.auditform={
                      auditResult:'请选择',
                      auditOpinion:''
                  }
                  this.successTip(response.msg)
                }else{
                  this.failTip(response.msg)
                }
              }) 
          }
        },
        getcheckListDetail(){  //商户核查单情况近30天
          var self = this
          var param = {
            merchantNo : self.$route.params.merchantNo
          }
          this.$axios.post('/checklist/getDetailList',qs.stringify(param)).then(res => {
            var response = res.data
            if(response.code == '200'){
              self.shhcdqk = self.expandshhcdqk  = response.data.returnList
              self.shhcdqkTotal = self.length1 = response.data.total
            }else{
              console.log(response.msg)
            }
          }) 
        },
        getMerchantDetails(){  //商户基本信息   
          var self = this
          var param = {
            customerNumber : self.$route.params.merchantNo,
            pageNumber:self.pageNumber1,
            pageRow:self.pageRow1,
          }
          this.$axios.post('/CustomerInfoController/queryPortaritDetailsByCustomerNum',qs.stringify(param)).then(res => {
            var response = res.data
            if(response.code == '200'){
              self.detailList = response.data.baseInfo   //基本信息
            }else{
              console.log(response.msg)
            }
          }) 
        },
        getPublicSentimentDetails(){  //商户舆情情况   
          var self = this
          var param = {
            merchantNo : self.$route.params.merchantNo,
            pageNumber:self.pageNumber2,
            pageRow:self.pageRow2,
          }
          this.$axios.post('/checklist/getPublicSentiment',qs.stringify(param)).then(res => {
            var response = res.data
            if(response.code == '200'){
              self.shyqxx = self.expandshyqxx = response.data.returnList
              self.shyqxxTotal = self.length2 = response.data.total
            }else{
              console.log(response.msg)
            }
          }) 
        },
        getSomplaintDetails(){  //商户投诉情况  表    /////////
          var self = this
          var param = {
            merchantNo : self.$route.params.merchantNo,
            pageNumber:self.pageNumber4,
            pageRow:self.pageRow4,
          }
          this.$axios.post('/checklist/getSomplaintList',qs.stringify(param)).then(res => {
            var response = res.data
            if(response.code == '200'){
              self.shtsqk =  self.expandshtsqk = response.data.returnList
              self.length4 = response.data.total
            }else{
              console.log(response.msg)
            }
          }) 
        },
       
        liandongselect(){  //联动控制
          if(this.processform.riskDeal.join(',').indexOf('关闭支付接口') != -1){
              this.close = true
          }else{
              this.close = false
          }
          if(this.processform.riskDeal.join(',').indexOf('开通支付接口') != -1){
              this.open = true
          }else{
              this.open = false
          } 
          if(this.processform.riskDeal.join(',').indexOf('冻结账户状态') != -1){
              this.dongjie = true
          }else{
              this.dongjie = false
          }
          if(this.processform.riskDeal.join(',').indexOf('解冻账户状态') != -1){
              this.jiedong = true
          }else{
              this.jiedong = false
          } 
          if(this.processform.riskDeal.join(',').indexOf('冻结客户状态') != -1){
              this.dongjie2 = true
          }else{
              this.dongjie2 = false
          } 
          if(this.processform.riskDeal.join(',').indexOf('解冻客户状态') != -1){
              this.jiedong2 = true
          }else{
              this.jiedong2 = false
          } 
          if(this.processform.riskDeal.join(',').indexOf('加入黑名单') != -1){
              this.addblack = true
          }else{
              this.addblack = false
          }
          if(this.processform.riskDeal.join(',').indexOf('删除黑名单') != -1){
              this.removeblack = true
          }else{
              this.removeblack = false
          } 
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
            if(index==0 || index==1){
              str+=addCommas(Number(item[2]).toFixed(2))+'\<br>'
            }
            if(index == 2){
              str+=Number(item[2]).toFixed(2)+'%\<br>'
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
        data:['收单金额','毛利','欺诈损失率']
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
     
          params.map(function(item,index){
            str0=item[1]+'\<br>'
            str+=item[0]+': '
            if(index==1){
              str+=addCommas(Number(item[2]).toFixed(2))+'\<br>'
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
.blue{
color:#409eff;
cursor: pointer;
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
