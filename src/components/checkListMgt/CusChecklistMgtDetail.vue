<!--非Epos交易查询detail-->
<template>
    <div id="CusChecklistMgtDetail" class="detail-box">
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
        <el-row :gutter="10">
            <el-col :span="11" >
                <el-card class="box-card" shadow="never">
                    <div slot="header" class="clear">
                      <h3 class="dis-inline ">商户基本信息</h3>
                    </div>
                    <el-col :span="12" style="border-right: 1px solid rgb(219,219,219)">
                        <table  class="table-info-box" cellspacing="0" cellpadding="0"> 
                                <tr>
                                    <td>商户编号:</td>
                                    <td>{{detailList.customerNumber}}</td>
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
                                    <td>法人姓名:</td>
                                    <td>{{detailList.legalName}}</td>
                                </tr>
                                 <tr>
                                    <td>法人身份证号:</td>
                                    <td  @mouseover="showsecretinfo" class="pr" ref="legalIdcard">{{detailList.legalIdcardSI}}<span  class="secret pa none" style="left:26%;">{{detailList.legalIdcard}}</span></td>
                                </tr>
                                 <tr>
                                    <td>营业执照号:</td>
                                    <td>{{detailList.businessLicence}}</td>
                                </tr>
                                 <tr>
                                    <td>商户唯一标识:</td>
                                    <td>{{detailList.customerSign}}</td>
                                </tr>
                                 <tr>
                                    <td>唯一标识下商编数:</td>
                                    <td>{{detailList.customerNumOfcustomerSign}}</td>
                                </tr>
                            </table>
                        </el-col>
                        <el-col :span="10" >
                            <table class="table-info-box" cellspacing="0" cellpadding="0"> 
                                <tr>
                                    <td>商户评级:</td>
                                    <td>{{detailList.customerCredentialLevel}}</td>
                                </tr>
                                <tr>
                                    <td>销售:</td>
                                    <td>{{detailList.saleName}}<a href="javascript:void(0)" @click="gosalephoto">{{detailList.saleLevel}}</a></td>
                                </tr>
                                <tr>
                                    <td>分公司:</td>
                                    <td>{{detailList.YEJISHUXING}}<a href="javascript:void(0)" @click="gotoBranchCompanyPhoto">{{detailList.YEJISHUXINGLevel}}</a></td>
                                </tr>
                                <tr>
                                    <td>代理商编号:</td>
                                    <td>{{detailList.agentCode}}</td>
                                </tr>
                                <tr>
                                    <td>代理商名称:</td>
                                    <td>{{detailList.agentName}}</td>
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
            <el-col :span="6" style="height:300px;">
                <el-card class="box-card" shadow="never">
                    <div slot="header" class="clear">
                      <h3 class="dis-inline ">商户KYC及行业信息</h3>
                    </div>
                        <table  class="table-info-box" cellspacing="0" cellpadding="0"> 
                                <tr>
                                    <td>商户KYC:</td>
                                    <td>{{detailList.KYCCognizance}}</td>
                                </tr>
                                <tr>
                                    <td>初始结果:</td>
                                    <td>{{detailList.kycFirstResult}}{{detailList.kycFirstResultDateStr}}</td>
                                </tr>
                                <tr>
                                    <td>复核结果:</td>
                                    <td>{{detailList.kycReviewResult}}{{detailList.kycReviewResultDateStr}}</td>
                                </tr>
                                <tr>
                                    <td>人工识别结果:</td>
                                    <td>{{detailList.artificialResults}}{{detailList.artificialResultsDateStr}}</td>
                                </tr>
                                 <tr>
                                    <td>商户自然属性一级:</td>
                                    <td>{{detailList.businessCat}}</td>
                                </tr>
                                <tr>
                                    <td>商户自然属性二级:</td>
                                    <td>{{detailList.subBusinessCat}}</td>
                                </tr>
                                 <tr>
                                    <td>行业业绩属性:</td>
                                    <td>{{detailList.productLine}}</td>
                                </tr>
                            </table>
                </el-card>
            </el-col>
            <el-col :span="7" >
              <el-card class="box-card" shadow="never">
                    <div slot="header" class="clear">
                      <h3 class="dis-inline ">其他信息</h3>
                    </div>
                    <el-col :span="10" >
                        <table class="" style="line-height:22px;" cellspacing="0" cellpadding="0"> 
                            <tr>
                                <td>特批情况:</td>
                                <td>{{detailList.approved}}</td>
                            </tr>
                            <tr>
                                <td>上一次巡检结果:</td>
                                <td>{{detailList.inspectionResult}}</td>
                            </tr>
                            <tr>
                                <td>上一次巡检日期:</td>
                                <td>{{detailList.inspectionDate}}</td>
                            </tr>
                        </table>
                      </el-col>
                </el-card>
            </el-col>
          </el-row>
        <el-row>
          <el-col :span="24">
              <el-card class="box-card" shadow="never">
                  <div slot="header" class="clear">
                     <h3 class="dis-inline fs18">商户核查单情况(近30天)</h3><i ref="shhcdqkbox" class="el-icon-arrow-up fs24 mr30"  @click='openandclose("shhcdqk",$event)'></i>总计：<span>{{shhcdqkTotal}}</span> 条
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
                      prop="acceptanceTimeStr "
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
              </el-card>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="24">
              <el-card class="box-card" shadow="never">
                  <div slot="header" class="clear">
                    <h3 class="dis-inline fs18">商户舆情信息</h3><i ref="shyqxxbox" class="el-icon-arrow-up fs24 mr30" @click='openandclose("shyqxx",$event)'></i>总计：<span>{{shyqxxTotal}}</span> 条
                  </div>
                  <el-table
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
              </el-card>
          </el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :span="12">
                <el-card class="box-card" shadow="never">
                    <div slot="header" class="clear">
                      <h3 class="dis-inline fs18">商户状态管理</h3> 
                    </div>
                    <table class="table" cellspacing="0" cellpadding="0" border="0" style="width:100%;">  <tr>
                        <th class="bgf5">类型</th>
                        <th class="bgf5">当前状态</th>
                        <th class="bgf5">操作</th>
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
                            <td><a class="blue" href="javascript:;" @click="caozuo(khdatatext,'KH')">{{khdatatext}}</a></td>
                        </tr>
                    </tbody>
                  </table>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card class="box-card" shadow="never">
                    <div slot="header" class="clear">
                      <h3 class="dis-inline fs18">商户评级详情</h3>
                    </div>
                    <el-table
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
                </el-card>
            </el-col>
            
          </el-row>
        <el-row>
          <el-col :span="24">
              <el-card class="box-card" shadow="never">
                  <div slot="header" class="clear">
                    <h3 class="dis-inline fs18">商户开通产品</h3><i ref="shktcpbox" class="el-icon-arrow-up fs24 mr30" @click='openandclose("shktcp",$event)'></i>  <span class="cfff " @click='ktcptip("批量启用")' style="margin-left:50px;">批量启用</span><span class="cfff " @click='ktcptip("批量禁用")' style="margin-left:50px;">批量禁用</span>
                  </div>
                  <el-table
                    @cell-click="ppp"
                    @selection-change="selectedItems"
                    :data="shktcp"
                    style="width: 100%">
                    <el-table-column
                        type="selection"
                        width="40">
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
                        {{changetext2(scope.row.status)}}
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
                      prop="operator"
                      label="操作人">
                    </el-table-column>
                    <el-table-column
                      prop="versionFlag"
                      label="配置来源">
                    </el-table-column>
                     <el-table-column
                      align="center"
                      label="操作"
                      >
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
        <el-row>
          <el-col :span="24">
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
        <!-- 开通产品 -->
        <el-dialog title="" :visible.sync="auditformElementVisible2" width="600px">  
          <el-form  :rules="rules" ref="auditformElement2">
              <el-form-item label="备注:" :label-width="formLabelWidth2" style="margin-right:30px;" >
                <el-input  v-model="processform2.remark" maxlength="100" placeholder="请填写备注" auto-complete="off"></el-input>
              </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="auditformElementVisible2 = false">取 消</el-button>
            <el-button type="primary" @click='doauditForm2'>确 定</el-button>
          </div>
        </el-dialog>
        <!-- 商户核查单  处理弹框 -->
        <el-dialog title="" :visible.sync="processElementVisible1"  width="780px">  
          <el-form :model="processform" :rules="rules" ref="processElement">
            <div v-if='source == "自动KYC"'>
                <el-form-item label="自动KYC结果值:" :label-width="formLabelWidth" prop="knowkyc">
                    <span v-text="knowkyc"></span>
                </el-form-item>
                <el-form-item label="次数:" :label-width="formLabelWidth" prop="times">
                    <span v-text="times"></span>
                </el-form-item>
            </div>
            <div v-if="source == 'others' || source == '巡检KYC'" id="source">
                <el-form-item label="风险处理:" :label-width="formLabelWidth" prop="riskDeal">
                    <el-checkbox-group v-model="processform.riskDeal">
                      <el-checkbox label="关闭支付接口" name="riskDeal" @change="liandongselect" class="ml30" :disabled="open"></el-checkbox>
                      <el-checkbox label="冻结账户状态" name="riskDeal" @change="liandongselect" :disabled="jiedong"></el-checkbox>
                      <el-checkbox label="冻结商户状态" name="riskDeal" @change="liandongselect" :disabled="jiedong2"></el-checkbox>
                      <el-checkbox label="加入黑名单" name="riskDeal" @change="liandongselect" :disabled="removeblack"></el-checkbox>
                      <el-checkbox label="开通支付接口" name="riskDeal" @change="liandongselect" :disabled="close"></el-checkbox>
                      <el-checkbox label="解冻账户状态" name="riskDeal" @change="liandongselect" :disabled="dongjie"></el-checkbox>
                      <el-checkbox label="解冻商户状态" name="riskDeal" @change="liandongselect" :disabled="dongjie2"></el-checkbox>
                      <el-checkbox label="删除黑名单" name="riskDeal" @change="liandongselect" :disabled="addblack"></el-checkbox>
                      <el-checkbox label="无风险" name="riskDeal"></el-checkbox>
                      <el-checkbox v-if="source == '巡检KYC'" label="整改完成" name="riskDeal"></el-checkbox>
                      <span class="errorbox" v-show="riskDealtype" v-html="isriskDealtext"></span>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="产品:" id="product" :label-width="formLabelWidth" v-show="open || close" prop="product">
                    <el-checkbox-group v-model="processform.product"  @change="hasOne">
                      <el-checkbox label="快捷" name="product" class="ml30"></el-checkbox>
                      <el-checkbox label="网银" name="product"></el-checkbox>
                      <el-checkbox label="聚合" name="product"></el-checkbox>
                      <el-checkbox label="预授权" name="product"></el-checkbox>
                      <el-checkbox label="账户" name="product"></el-checkbox>
                      <el-checkbox label="分期" name="product"></el-checkbox>
                      <el-checkbox label="POS" name="product"></el-checkbox>
                      <el-checkbox label="充值汇入" name="product"></el-checkbox>
                      <el-checkbox label="转账" name="product"></el-checkbox>
                    </el-checkbox-group>
                     <span class="errorbox" v-show="prtype" v-html="isprtypetext"></span>
                </el-form-item>
            </div>
            <el-form-item class="mt10" label="人工识别商户KYC:" :label-width="formLabelWidth" prop="artificialKYC">
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
        <el-row>
          <el-col :span="24">
              <el-card class="box-card" shadow="never">
                  <div slot="header" class="clear">
                    <h3>商户交易毛利欺诈情况</h3>
                  </div>
                  <div class="chart-btn ">
                    <span class="active time mr30" ref="chart1time1" @click='getChartData("myChart1","1",$event)'>近14天</span>
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
                <h3>商户投诉情况</h3> 
              </div>
              <div  class="chart-btn">
                   <span class="active time mr30" ref="chart2time1" @click='getChartData("myChart2","1",$event)'>近14天</span>
                    <span class="time mr30" @click='getChartData("myChart2","2",$event)'>近8周</span>
                    <span class="time" @click='getChartData("myChart2","3",$event)'>近6个月</span>
                </div>
                <div id="myChart2" class="center" :style="{width: '100%', height: '280px'}"></div>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card class="box-card" shadow="never"> 
              <div slot="header" class="clear">
                <h3>商户综合费率及万元毛利收益</h3> 
              </div>
              <div  class="chart-btn">
                  <span class="active time mr30" ref="chart3time1" @click='getChartData("myChart3","1",$event)'>近14天</span>
                  <span class="time mr30" @click='getChartData("myChart3","2",$event)'>近8周</span>
                  <span class="time" @click='getChartData("myChart3","3",$event)'>近6个月</span>
              </div>
              <div id="myChart3" class="center" :style="{width: '100%', height: '280px'}"></div>
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
            formLabelWidth: '150px',
            formLabelWidth2: '80px',
            isprtypetext:'请至少选择一种产品类型',
            isriskDealtext:'请至少选择一种风险处理',
            items:[],

            dispatchformElementVisible:false,//派发弹框显示与隐藏
            auditformElementVisible:false,//审核核查单弹框显示与隐藏
            processElementVisible1:false,//处理弹框显示与隐藏
            auditformElementVisible2:false,//处理弹框显示与隐藏
            auditformElementparam:'', //批量启用  批量禁用
            source:'',
            dispatchform:{  //派发商户核查单
             companyId:'', 
             remark:''
            },
            auditform:{
              auditResult:'',
              auditOpinion:''
            },
            processform2:{
              remark:''
            },
             knowkyc:'', 
             times:'',
            processform:{  //处理商户核查单
             artificialKYC:'', 
             investigationInfo:'',
             remark:'',
             riskDeal: [],
             product: []
            },
            prtype: false,
            riskDealtype: false,
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
            zhdata:'',
            zhdatatext:'',
            khdata:'',
            khdatatext:'',
            cpcaozuotext:'',
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
      this.getcheckListDetail(1) //商户核查单情况近30天
      this.getMerchantDetails() //商户基本信息
      this.getPublicSentimentDetails(1) //商户舆情情况
      this.getSomplaintDetails(1) //商户投诉情况表
      this.getCustomerOpenList(1)  //开通产品
      this.getChartData("myChart1","1")  //商户投诉情况图
      this.getChartData("myChart2","1")  //商户投诉情况图
      this.getChartData("myChart3","1")  //商户投诉情况图
      this.times = this.$route.params.times
      this.knowkyc = this.$route.params.autoKyc
    },
    methods:{
      
      handleCurrentChange1(val) {  //商户核查单
         this.pageNumber1 = `${val}` 
         this.$refs.shhcdqkbox.classList.remove('el-icon-arrow-up')  
         this.$refs.shhcdqkbox.classList.add('el-icon-arrow-down')
         this.getcheckListDetail(val,true)
      },
      handleCurrentChange2(val) {  //商户舆情
         this.pageNumber2 = `${val}`   
         this.$refs.shyqxxbox.classList.remove('el-icon-arrow-up')  
         this.$refs.shyqxxbox.classList.add('el-icon-arrow-down')
         this.getPublicSentimentDetails(val,true)
      },
      handleCurrentChange3(val) {  //开通产品
        this.$refs.shktcpbox.classList.remove('el-icon-arrow-up')  
        this.$refs.shktcpbox.classList.add('el-icon-arrow-down')
        this.getCustomerOpenList(val,true)
        this.pageNumber3 = `${val}`   
      },
      handleCheckAllproductChange(val){

      },
      handleCurrentChange4(val) {  //商户投诉
         this.pageNumber4 = `${val}`   
         this.$refs.shtsqkbox.classList.remove('el-icon-arrow-down')  
         this.$refs.shtsqkbox.classList.add('el-icon-arrow-up')
         this.getSomplaintDetails(val,true)
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
       ppp(row, column, cell, event){
        if(column.label == '操作'){
          this.cpcaozuo(row)
        }
      },
      cpcaozuo(row){
        var self = this
        var text = row.status
       if(text == 'ENABLE'){
          text = '禁用'
        }else if(text == 'DISABLE'){
          text = '启用'
        }
        this.$confirm('确认'+text+'?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          callback:function(item){
            var params = {}
            if(item == 'confirm'){
              if(text == '启用'){
                params.payStatus = 'DISABLE'
              }else if(text == '禁用'){
                params.payStatus = 'ENABLE'
              }
              params.payCustomerNumber  = self.$route.params.merchantNo
              params.baseProductCode  = row.baseProductCode
              params.marketingProductCode  =  row.marketingProductCode
              params.versionFlag  = row.versionFlag
              params.status=self.auditformElementparam == '批量启用' ? 'ENABLE' : 'DISABLE'
              params.customerNumber=self.$route.params.merchantNo
              params.operator=''
              params.remark=self.processform2.remark
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
              params.customerNumber = self.$route.params.merchantNo
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
      ktcptip(flag){
        var self = this
        if(self.items.length == 0){
            self.atleastOne()
            return false
        }
        this.auditformElementparam = flag
        this.auditformElementVisible2 = true
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
      gomidentity(){
        var customerSign = this.$route.params.merchantNo
        var level = this.$route.params.level
        var bussineNumberCounts = this.$route.params.bussineNumberCounts
          window.open('#/merchantIdentityDetail/'+ customerSign + '/'+ level+ '/'+ bussineNumberCounts)
      },
      gomphoto(){
        var customerSign = this.$route.params.merchantNo
        window.open('#/merchantPhotoDetail/'+ customerSign)
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
                 this.successTip(response.msg)
              }
          }) 
        }
     }, 
     hasOne(){
        if(this.processform.product != ''){
            this.product = false
        }else{
            this.product = true
        }
      },
      checkalls(){
        var self = this
        if(self.source == 'others' || self.source == '巡检KYC'){
          if(self.processform.riskDeal.length == 0){
            self.riskDealtype = true
            self.prtype = false
            return false
          }else{
            self.riskDealtype = false
            if(self.open || self.close){
              if(self.processform.product.length == 0){
                self.prtype = true
                return false
              }else{
                self.prtype = false
                return true
              }
            }else{
              return true
            }
          }
        }else{
          return true
        }
      },
      doauditForm2(){  //批量操作
        var self = this 
        var temp = []
        
        self.items.map(function(ele){
          temp.push({
            baseProdect:ele.baseProdect,
            marketingProductCode:ele.marketingProductCode,
            versionFlag:ele.versionFlag
          })
        })
        var params = {
          status:self.auditformElementparam == '批量启用' ? 'ENABLE' : 'DISABLE',
          customerNumber:self.$route.params.merchantNo,
          operator:'',
          remark: self.processform2.remark,
          data:JSON.stringify(temp)
        }
        
        this.$axios.post('/CustomerInfoController/batchProductOperation',qs.stringify(params)).then(res => {
          var response = res.data
          if(response.code == '200'){
             this.processform = {  //处理商户核查单
                 artificialKYC:'', 
                 investigationInfo:'',
                 remark:'',
                 riskDeal: [],
                 product: []
              }
              self.successTip(response.msg)
          }
        }) 
      },
     processForm(formName,params,hiddenElement){
        /*  处理
          formName: 表单id  string
          params: 传入参数  {}
          hiddenElement: 控制表单显示的数据  string
        */
        var self = this
        this.hasOne()
        var result = this.checkalls()
        // console.log(result)
        this.$refs[formName].validate((valid) => {   //泽霖的处理结果
            // if&& self.processform.riskDeal
            if(valid && result){
                var subParam = {}
                subParam.id = self.$route.params.id
                subParam.knowkyc = this.$route.params.autoKyc
                subParam.artificialKYC = this.processform.artificialKYC
                subParam.investigationInfo= this.processform.investigationInfo
                subParam.remark= this.processform.remark
                subParam.riskDeal= this.processform.riskDeal.join(',')
                subParam.product= this.processform.product.join(',')
                this[hiddenElement] = false 
                this.$axios.post('/checklist/handle',qs.stringify(subParam)).then(res => {
                  var response = res.data
                  if(response.code == '200'){
                     this.processform = {  //处理商户核查单
                         artificialKYC:'', 
                         investigationInfo:'',
                         remark:'',
                         riskDeal: [],
                         product: []
                      }
                      self.successTip(response.msg)
                  }
                }) 
                this.gks()//管控接口
            }
        })
        
     },
     gks(){ //管控接口 尚振
      var self = this
      var controlFunctionparams = {}
        controlFunctionparams.riskDeal= this.processform.riskDeal.join(',')
        controlFunctionparams.product= this.processform.product.join(',')
        controlFunctionparams.payCustomerNumber= this.$route.params.merchantNo
        controlFunctionparams.payOperator= ''
        controlFunctionparams.payRemark= this.processform.remark
        controlFunctionparams.payStatus = this.processform.riskDeal.join(',').indexOf('关闭支付接口') > -1 ? 'DISABLE':this.processform.riskDeal.join(',').indexOf('开通支付接口')>-1?'ENABLE' :''
        controlFunctionparams.accountCustomerNumber= this.$route.params.merchantNo
        controlFunctionparams.accountStatus= this.processform.riskDeal.join(',').indexOf('冻结账户状态') > -1 ? 'FROZEN':this.processform.riskDeal.join(',').indexOf('解冻账户状态')>-1?'ACTIVE' :''
        controlFunctionparams.accountReason= this.processform.remark
        controlFunctionparams.customerNumber = this.$route.params.merchantNo
        controlFunctionparams.customerOperator = ''
        controlFunctionparams.customerReason = this.processform.remark
        controlFunctionparams.customerStatus= this.processform.riskDeal.join(',').indexOf('冻结商户状态') > -1 ? 'FROZEN':this.processform.riskDeal.join(',').indexOf('解冻商户状态')>-1?'ACTIVE' :''
        controlFunctionparams.source= '753'
        controlFunctionparams.loginPerson= ''
        controlFunctionparams.buttonType= this.processform.riskDeal.join(',').indexOf('加入黑名单') > -1 ? 'cus_check_black':this.processform.riskDeal.join(',').indexOf('删除黑名单')>-1?'cus_control_delBlack' :''
        controlFunctionparams.data= JSON.stringify({
          "signName":this.$route.params.signName,
          "bankCardNo":self.detailList.settleBankaccount,
          "merchantLicence":self.detailList.businessLicence,
          "icp":self.detailList.icp,
          "contactPhone":self.detailList.mobile,
          "legalIdNo":self.detailList.legalIdcard,
          "registMail":self.detailList.email,
          "merchantBindWebSite":self.detailList.webUrl
        })
        this.$axios.post('/CustomerControlController/controlFunction',qs.stringify(controlFunctionparams)).then(res => { //尚振 的4合1管控接口
          var response = res.data
          if(response.code == '200'){
              this.getMerchantDetails()
              this.getCustomerOpenList(1,false)
          }
        }) 
     },
     addCaseevent(){ // 生成案件   
        var self = this
        var params = {}
        params.id = self.$route.params.id
        this.$axios.post("/checklist/addCase",qs.stringify(params)).then(res => {
            var response = res.data
           if(response.code == '200'){
                this.successTip(response.msg)
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
            option1.series[2].data = response.data.synthetical //欺诈率
            self.drawLine1() 
          }else{
            this.$message.error({message:response.msg,center: true});
          }
        })
      },
      getChartData2(id,flag){  
        var self = this
        var param = this.getPara(flag)
        param.merchantNo = self.$route.params.merchantNo
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
            this.close = false
            this.dongjie = false
            this.dongjie2 = false
            this.addblack = false
            this.open = false
            this.jiedong = false
            this.jiedong2 = false
            this.removeblack = false
            this.processform = {  //处理商户核查单
                    remark:'',
                    riskDeal: [],
                    product: []
                },
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
              subParam.id= this.$route.params.id
              this[hiddenElement] = false 
              this.$axios.post('/checklist/examine',qs.stringify(subParam)).then(res => {
                var response = res.data
                if(response.code == '200'){
                  this.getcheckListDetail(1,false)
                  this.successTip(response.msg)
                }
              }) 
          }
        },
        getcheckListDetail(page,collapse){  //商户核查单情况近30天
          var self = this
          var param = {
            merchantNo : self.$route.params.merchantNo,
            pageNumber:page,
            pageRow:self.pageRow1,
          }
          this.$axios.post('/checklist/getDetailList',qs.stringify(param)).then(res => {
            var response = res.data
            if(response.code == '200'){
              self.shhcdqk = collapse ? response.data.returnList : [response.data.returnList[0]]
              self.expandshhcdqk = response.data.returnList
              self.shhcdqkTotal = self.length1 = response.data.total
            }else{
              console.log(response.msg)
            }
          }) 
        },
        getMerchantDetails(){  //商户基本信息    
          var self = this
          var param = {
            customerNumber : self.$route.params.merchantNo
          }
          this.$axios.post('/CustomerInfoController/queryPortaritDetailsByCustomerNum',qs.stringify(param)).then(res => {
            var response = res.data
            if(response.code == '200'){
              self.detailList = response.data.baseInfo   //基本信息
              self.shpjxq = response.data.customerGrade  //商户评级详情
              if(response.data.customerStatusMan){
                self.zhdata = response.data.customerStatusMan.accountStatus == 'ACTIVE' ? '正常' : response.data.customerStatusMan.accountStatus == 'FROZEN' ? '冻结' : ' '  //状态管理
                self.zhdatatext = response.data.customerStatusMan.accountStatus == 'ACTIVE' ? '冻结' : response.data.customerStatusMan.accountStatus == 'FROZEN' ? '解冻' : ' '  //状态管理
                self.khdata = response.data.customerStatusMan.customerStatus == 'ACTIVE' ? '活跃' : response.data.customerStatusMan.customerStatus == 'FROZEN' ? '冻结' : ' '  //状态管理 
                self.khdatatext = response.data.customerStatusMan.customerStatus == 'ACTIVE' ? '冻结' : response.data.customerStatusMan.customerStatus == 'FROZEN' ? '解冻' : ' '  //状态管理
              }
            }else{
              console.log(response.msg)
            }
          }) 
        },
        getCustomerOpenList(page,collapse){  //开通产品   
          var self = this
          var param = {
            customerNumber : self.$route.params.merchantNo,
            pageNumber:page,
            pageRow:self.pageRow3,
          }
          this.$axios.post('/CustomerInfoController/getCustomerOpenList',qs.stringify(param)).then(res => {
            var response = res.data
            if(response.code == '200'){
                if(response.data && response.data.returnList.length == 0){
                  self.shktcp = []
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
        getPublicSentimentDetails(page,collapse){  //商户舆情情况   
          var self = this
          var param = {
            merchantNo : self.$route.params.merchantNo,
            pageNumber:page,
            pageRow:self.pageRow2,
          }
          this.$axios.post('/checklist/getPublicSentiment',qs.stringify(param)).then(res => {
            var response = res.data
            if(response.code == '200'){
              self.shyqxx = collapse ? response.data.returnList : [response.data.returnList[0]]
              self.expandshyqxx = response.data.returnList
              self.shyqxxTotal = self.length2 = response.data.total
            }else{
              console.log(response.msg)
            }
          }) 
        },
        getSomplaintDetails(page,collapse){  //商户投诉情况  表   
          var self = this
          var param = {
            merchantNo : self.$route.params.merchantNo,
            pageNumber:page,
            pageRow:self.pageRow4,
          }
          this.$axios.post('/checklist/getSomplaintList',qs.stringify(param)).then(res => {
            var response = res.data
            if(response.code == '200'){
              self.shtsqk = collapse ? response.data.returnList :[response.data.returnList[0]]
              self.expandshtsqk = response.data.returnList
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
          if(this.processform.riskDeal.join(',').indexOf('冻结商户状态') != -1){
              this.dongjie2 = true
          }else{
              this.dongjie2 = false
          } 
          if(this.processform.riskDeal.join(',').indexOf('解冻商户状态') != -1){
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
              str+=Number(item[2]).toFixed(2)+'0.01BP\<br>'
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
              str+=addCommas(Number(item[2]).toFixed(2))+'万元\<br>'
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
  @import '~@/less/common.less';
  @import '~@/less/detail.less';
</style>
<style scoped lang="less">

.active{background:#ecf5ff;color:#409eff;border-color:#b3d8ff;padding:6px 10px;border-radius: 100%;}
.time{padding:6px 10px;border-radius: 100%;}
.time:hover{background: #409eff;color:white;cursor:pointer;}
.el-icon-arrow-up:before{color:#999;}
.el-icon-arrow-down:before{font-weight:800;color:#999;}
// table{border-right:1px solid #ebeef5;font-size:12px;border-bottom: 1px solid #ebeef5;}
// td{border:solid #ebeef5; border-width:1px 0px 0px 1px;height: 50px;color:#636363;}
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
    height: 36px;
    font-size: 13px;
    margin-left: 45px;
    margin-bottom: 10px;
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
    overflow:hidden;
}
.rightRadius {
    border-top-right-radius: 7px;
    border-bottom-right-radius: 7px;
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
    top:10px;
    width: 0;
    height: 0;
    border-top: 5px solid white;
    border-right: 10px solid rgba(0,0,0,0.8);
    border-bottom: 5px solid white;
   }
}
.errorbox{color:red;}
</style>
