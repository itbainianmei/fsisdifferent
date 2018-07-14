<template>
  <!--处理线下核查单-->
  <div>
    <div class="htmlHead">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>核查单管理平台</el-breadcrumb-item>
        <el-breadcrumb-item>线下核查单管理</el-breadcrumb-item>
        <el-breadcrumb-item>处理线下核查单</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="btnBoxClass leftBtn">
           <div class="leftBtn" v-if="controllPermission">

               <el-dropdown  trigger='click' placement='bottom-start' @click.native="controlStatus">
                    <span  id="selectClass">管控<i class="el-icon-arrow-down el-icon--right controlIcon"></i></span>
                    <el-dropdown-menu slot="dropdown" class="controlItem">
                        <el-dropdown-item v-for='(item,index) in controlList' :key='index' @click.native='controlItemClick(item.sysname,item.sysconid)'>{{item.sysname}} </el-dropdown-item>
                     </el-dropdown-menu>
                </el-dropdown>
            </div>
           <el-button round class="leftBtn" style="border: 1px solid rgb(63, 170, 249);color: rgb(63, 170, 249);" @click='addBlackList' v-if="blackPermission">一键加黑</el-button>
           <el-button round class="leftBtn" style="border: 1px solid rgb(63, 170, 249);color: rgb(63, 170, 249);" @click='makeCaseSave' v-if="casePermission">生成案件</el-button>
           <!-- <el-button type="primary" round class="rightBtn" style="margin-right:10px;" @click="create">商户风险管理</el-button> -->
      </div>
      <div class="clearBox"></div>
    </div>

    <div style="border: 1px solid #E0E0E0;width:97%;margin:0 auto;height:auto;">
        <div class="leftContent">
            <div v-show="estInformationCon">
                <div class="divHead">
                    <span class="rideus"></span>
                    <span class='rideusText'>核查单信息</span>
                    <div class="contentBotoom" style="float:right;margin-right:30px;">

                        <div class="button" >

                            <!-- <el-button type="primary" round>提交审核</el-button> -->
                            <!-- <el-button type="primary" round>代理商回退</el-button> -->
                        </div>
                    </div>
                    <div class="divContent">
                     <div class="text">

                        <div class="boxOnly" >
                            <div class="labelC">核查单号:</div>
                            <div class="text-box" >
                                <span>{{checkId}}</span>
                            </div>
                        </div>

                        <div class="boxOnly">
                            <div class="labelC">状态:</div>
                            <div class="text-box">
                                <span>{{checkStatus}}</span>
                            </div>
                        </div>

                        <div class="boxOnly">
                            <div class="labelC">完成日期:</div>
                            <div class="text-box">
                                <span>{{showFinishTime}}</span>
                            </div>
                        </div>

                        </div>
                        <div class="text">

                            <div class="boxOnly" >
                            <div class="labelC">风险得分:</div>
                            <div class="text-box">
                                <span>{{riskScore}}</span>
                            </div>
                            </div>

                            <div class="boxOnly">
                            <div class="labelC">生成日期:</div>
                            <div class="text-box">
                                <span>{{showCreateTime}}</span>
                            </div>
                            </div>


                        </div>
                        <div class="text">

                        <div class="boxOnly" >
                            <div class="labelC">风险等级:</div>
                            <div class="text-box">
                                <span>{{riskLevel}}</span>
                            </div>
                        </div>

                        <div class="boxOnly">
                            <div class="labelC">风险定性:</div>
                            <div class="text-box">
                                <span>{{riskQualitative}}</span>
                            </div>
                        </div>

                        </div>
                        <div class="text">

                            <div class="boxOnly">
                            <div class="labelC">风险类型:</div>
                            <div class="text-box">
                                <span>{{riskType}}</span>
                            </div>
                            </div>

                            <div class="boxOnly">
                            <div class="labelC">管控状态:</div>
                            <div class="text-box">
                                <span>{{controlState}}</span>
                            </div>
                            </div>

                        </div>
                    </div>
                </div>
                <hr class="hr">
                <div class="divHead">
                    <span class="rideus"></span>
                    <span class='rideusText'>商户信息</span>
                    <div class="divContent">
                        <div class="text">

                            <div class="boxOnly" >
                                <div class="labelC">分公司:</div>
                                <div class="text-box">
                                    <span>{{branchCompany}}</span>
                                </div>
                            </div>

                            <div class="boxOnly" >
                                <div class="labelC">代理商编号:</div>
                                <div class="text-box">
                                    <span>{{agentNum}}</span>
                                </div>
                            </div>

                            <div class="boxOnly" >
                                <div class="labelC">商户状态:</div>
                                <div class="text-box">
                                    <span>{{merchantActive}}</span>
                                </div>
                            </div>

                            <div class="boxOnly" >
                                <div class="labelC">法人姓名:</div>
                                <div class="text-box">
                                    <span>{{legalName}}</span>
                                </div>
                            </div>

                            <div class="boxOnly" >
                                <div class="labelC">联系人电话:</div>
                                <div class="text-box">
                                    <span>{{contactPhone}}</span>
                                </div>
                            </div>

                            <div class="boxOnly" >
                                <div class="labelC">入网时间:</div>
                                <div class="text-box">
                                    <span>{{networkTime}}</span>
                                </div>
                            </div>

                        </div>
                        <div class="text">

                        <div class="boxOnly" >
                            <div class="labelC">商户编号:</div>
                            <div class="text-box">
                                <span>{{merchantId}}</span>
                            </div>
                        </div>

                        <div class="boxOnly" >
                            <div class="labelC">代理商名称:</div>
                            <div class="text-box">
                                <span>{{agentName}}</span>
                            </div>
                        </div>

                        <div class="boxOnly" >
                            <div class="labelC">营业执照号:</div>
                            <div class="text-box">
                                <span>{{businessLicense}}</span>
                            </div>
                        </div>

                        <div class="boxOnly" >
                            <div class="labelC">法人证件类型:</div>
                            <div class="text-box">
                                <span>{{legalPaperWorkType}}</span>
                            </div>
                        </div>

                        <div class="boxOnly" >
                            <div class="labelC">联系人邮箱:</div>
                            <div class="text-box">
                                <span>{{contactEmail}}</span>
                            </div>
                        </div>

                        <div class="boxOnly" >
                            <div class="labelC">结算账户名:</div>
                            <div class="text-box">
                                <span>{{settleAccounts}}</span>
                            </div>
                        </div>

                        </div>
                        <div class="text">

                        <div class="boxOnly" >
                            <div class="labelC">商户签约名称:</div>
                            <div class="text-box">
                                <span>{{merchantSign}}</span>
                            </div>
                        </div>

                        <div class="boxOnly" >
                            <div class="labelC">销售:</div>
                            <div class="text-box">
                                <span>{{sale}}</span>
                            </div>
                        </div>

                        <div class="boxOnly" >
                            <div class="labelC">注册资本:</div>
                            <div class="text-box">
                                <span>{{registeredCapital}}</span>
                            </div>
                        </div>

                        <div class="boxOnly" >
                            <div class="labelC">法人证件号码:</div>
                            <div class="text-box">
                                <span>{{legalPaperWorkNum}}</span>
                            </div>
                        </div>

                        <div class="boxOnly" >
                            <div class="labelC">商户省份:</div>
                            <div class="text-box">
                                <span>{{merchantProvince}}</span>
                            </div>
                        </div>

                        <div class="boxOnly" >
                            <div class="labelC">结算银行卡:</div>
                            <div class="text-box">
                                <span>{{settleBankCard}}</span>
                            </div>
                        </div>

                        </div>
                        <div class="text">

                        <div class="boxOnly" >
                            <div class="labelC">MCC:</div>
                            <div class="text-box">
                                <span>{{mcc}}</span>
                            </div>
                        </div>

                        <div class="boxOnly" >
                            <div class="labelC">商户类型:</div>
                            <div class="text-box">
                                <span>{{merchantType}}</span>
                            </div>
                        </div>

                        <div class="boxOnly" >
                            <div class="labelC">收款账户性质:</div>
                            <div class="text-box">
                                <span>{{receiptAccountNature}}</span>
                            </div>
                        </div>

                        <div class="boxOnly" >
                            <div class="labelC">联系人:</div>
                            <div class="text-box">
                                <span>{{contactName}}</span>
                            </div>
                        </div>

                        <div class="boxOnly" >
                            <div class="labelC">商户城市:</div>
                            <div class="text-box">
                                <span>{{merchantCity}}</span>
                            </div>
                        </div>

                        <div class="boxOnly" >
                            <div class="labelC">商户唯一标识:</div>
                            <div class="text-box">
                                <span>{{merchantUniqueId}}</span>
                            </div>
                        </div>

                        </div>
                    </div>
                </div>
                <hr class="hr">
                <div class="divHead">
                    <span class="rideus"></span>
                    <span class='rideusText'>终端信息</span>
                    <div class="divContent">
                        <div class="text">

                        <div class="boxOnly" >
                            <div class="labelC">终端号:</div>
                            <div class="text-box">
                                <span>{{terminalNum}}</span>
                            </div>
                        </div>

                        <div class="boxOnly">
                            <div class="labelC">终端状态:</div>
                            <div class="text-box">
                                <span>{{terminalState}}</span>
                            </div>
                        </div>

                        </div>
                        <div class="text">

                            <div class="boxOnly" >
                            <div class="labelC">终端机型:</div>
                            <div class="text-box">
                                <span>{{terminalModel}}</span>
                            </div>
                            </div>

                        </div>
                        <div class="text">

                        <div class="boxOnly" >
                            <div class="labelC">安装地点:</div>
                            <div class="text-box">
                                <span>{{installationSite}}</span>
                            </div>
                        </div>

                        </div>
                        <div class="text">

                            <div class="boxOnly">
                            <div class="labelC">柜台电话:</div>
                            <div class="text-box">
                                <span>{{counterTelephone}}</span>
                            </div>
                            </div>

                        </div>
                    </div>
                </div>
                <hr class="hr">
                <div class="divHead">
                    <span class="rideus"></span>
                    <span class='rideusText'>交易信息</span>
                    <div class="divContent">
                        <div class="text">

                        <div class="boxOnly" >
                            <div class="labelC">商户订单号:</div>
                            <div class="text-box">
                                <span>{{merchantOrder}}</span>
                            </div>
                        </div>

                        <div class="boxOnly">
                            <div class="labelC">交易类型:</div>
                            <div class="text-box">
                                <span>{{transactionType}}</span>
                            </div>
                        </div>

                        <div class="boxOnly">
                            <div class="labelC">发卡行:</div>
                            <div class="text-box">
                                <span>{{issuingBank}}</span>
                            </div>
                        </div>

                            <div class="boxOnly">
                            <div class="labelC">交易终端号:</div>
                            <div class="text-box">
                                <span>{{transactionTerminalNum}}</span>
                            </div>
                            </div>

                        </div>
                        <div class="text">

                            <div class="boxOnly" >
                            <div class="labelC">易宝交易流水号:</div>
                            <div class="text-box">
                                <span>{{transactionalNumber}}</span>
                            </div>
                            </div>

                            <div class="boxOnly">
                            <div class="labelC">交易卡号:</div>
                            <div class="text-box">
                                <span>{{transactionCard}}</span>
                            </div>
                            </div>

                            <div class="boxOnly">
                            <div class="labelC">应答码:</div>
                            <div class="text-box">
                                <span>{{replyCode}}</span>
                            </div>
                            </div>

                        </div>
                        <div class="text">

                            <div class="boxOnly" >
                            <div class="labelC">交易时间:</div>
                            <div class="text-box">
                                <span>{{showTransactionTime}}</span>
                            </div>
                            </div>

                            <div class="boxOnly">
                            <div class="labelC">卡类型:</div>
                            <div class="text-box">
                                <span>{{cardType}}</span>
                            </div>
                            </div>

                            <div class="boxOnly">
                            <div class="labelC">授权号:</div>
                            <div class="text-box">
                                <span>{{authorizationNum}}</span>
                            </div>
                            </div>

                        </div>
                        <div class="text">

                            <div class="boxOnly" >
                            <div class="labelC">交易金额:</div>
                            <div class="text-box">
                                <span>{{transactionMoney}}</span>
                            </div>
                            </div>

                            <div class="boxOnly">
                            <div class="labelC">卡介质:</div>
                            <div class="text-box">
                                <span>{{cardMedia}}</span>
                            </div>
                            </div>

                            <div class="boxOnly">
                            <div class="labelC">系统参考号:</div>
                            <div class="text-box">
                                <span>{{sysReferenceNum}}</span>
                            </div>
                            </div>

                        </div>
                    </div>
                </div>
                <hr class="hr">
                <div class="divHead">
                    <span class="rideus"></span>
                    <span class='rideusText'>触发规则详情</span>
                    <div class="divContent" style="padding-top:0px;border:0;">
                        <el-table
                            :data="ruleControlTableData"
                            border
                            style="width: 100%">
                            <el-table-column
                            prop="id"
                            label="规则ID"
                            align='center'>
                            </el-table-column>
                            <el-table-column
                            prop="globalId"
                            label="规则编号"
                            align='center'>
                            </el-table-column>
                            <el-table-column
                            prop="ruleContent"
                            label="规则名称"
                            align='center'>
                            </el-table-column>
                            <el-table-column
                            prop="riskType"
                            label="风险类型"
                            align='center'>
                            </el-table-column>
                            <el-table-column
                            prop="menuName"
                            label="规则所在包"
                            align='center'>
                            </el-table-column>
                            <el-table-column
                            prop="rulesScore"
                            label="分值"
                            align='center'>
                            </el-table-column>
                            <el-table-column
                            prop="rulesRemark"
                            label="规则描述"
                            align='center'>
                            </el-table-column>
                        </el-table>
                        <div class="clearBox"></div>
                        <el-pagination
                            layout="prev, pager, next"
                            :total=totalSize
                            style="display: inline-block;float: right;margin-bottom: 15px;margin-top: 15px;">
                        </el-pagination>
                    </div>
                </div>
                <hr class="hr">


                <div class="divHead">
                    <span class="rideus"></span>
                     <span class='rideusText'>操作记录</span>
                    <div class="divContent" style="padding-top:0px;border:0;">
                        <el-table
                            :data="operatRecordTableData"
                            border
                            style="width: 100%">
                            <el-table-column
                            prop="date"
                            label="操作记录"
                            align='center'>
                            </el-table-column>
                            <el-table-column
                            prop="name"
                            label="操作人"
                            align='center'>
                            </el-table-column>
                            <el-table-column
                            prop="address"
                            label="角色"
                            align='center'>
                            </el-table-column>
                            <el-table-column
                            prop="address"
                            label="所属机构"
                            align='center'>
                            </el-table-column>
                            <el-table-column
                            prop="address"
                            label="操作类型"
                            align='center'>
                            </el-table-column>
                            <el-table-column
                            prop="address"
                            label="备注"
                            align='center'>
                            </el-table-column>
                            <el-table-column
                            prop="address"
                            label="快照"
                            >
                            <template slot-scope="scope">
                                <el-button @click="snapshotView()" type="text" size="small">查看</el-button>
                            </template>
                            </el-table-column>
                        </el-table>
                        <el-pagination
                            layout="prev, pager, next"
                            :total="50"
                            style="display: inline-block;float: right;margin-bottom: 15px;margin-top: 15px;">
                        </el-pagination>
                    </div>
                </div>
            </div>
             <!--调查信息编辑  -->
            <div v-show="surveyInformationCon">
                <div class="divHead">
                        <span class="rideus"></span>
                        <span class='rideusText'>调查情况</span>
                        <div class="contentBotoom" style="float:right;margin-right:30px;">

                            <div class="button" v-if="submitPermission">

                                <el-button type="primary" round @click='sendCheck'>提交审核</el-button>
                                <!-- <el-button type="primary" round>代理商回退</el-button> -->
                            </div>
                        </div>
                        <div class="divContent">
                            <div class="text"  style="width:25%">
                                <div class="boxOnly" >
                                    <div class="labelC textborder">是否调取签购单:</div>

                                    <div class="text-box" >
                                        <el-select v-model="isRecallPurorderInfo" placeholder="请选择" @focus="getRetrieveList" v-bind:disabled='setDisabled'>
                                            <el-option :label='item.sysname' :value='item.sysconid' v-for='(item,index) in retrieveList' :key='index'></el-option>


                                        </el-select>
                                    </div>
                                </div>
                                <div class="boxOnly" >
                                    <div class="labelC textborder">
                                        <span class='starColorChange' >*</span>调单方式:</div>

                                    <div class="text-box" >
                                         <el-select v-model="recallWayInfo" placeholder="请选择" @focus='getOrderWay' id='recallWay' v-bind:disabled='setDisabled'>
                                            <el-option :label='item.sysname' :value='item.sysconid' v-for='(item,index) in orderWayList' :key='index'></el-option>

                                        </el-select>
                                    </div>
                                </div>
                                <div class="boxOnly" >
                                    <div class="labelC textborder">
                                        <span class='starColorChange' >*</span>
                                        处理措施建议:
                                    </div>

                                    <div class="text-box" >
                                         <el-select v-model="treatmentMeasuresInfo" placeholder="请选择" @focus="getMeasureSuggest" id='treatmentMeasures' v-bind:disabled='setDisabled'>
                                            <el-option :label='item.sysname' :value='item.sysconid' v-for='(item,index) in measureSuggestList' :key='index'></el-option>

                                        </el-select>
                                    </div>
                                </div>
                                <div class="boxOnly" >
                                    <div class="labelC textborder">
                                        <span class='starColorChange' >*</span>
                                        风险性质建议:
                                    </div>

                                    <div class="text-box" >
                                        <el-select v-model="riskNatureInfo" placeholder="请选择" @focus="getriskQualiteSelelist" id='riskNature' v-bind:disabled='setDisabled'>
                                            <el-option :label='item.sysname' :value='item.sysconid' v-for='(item,index) in riskQualiteSelelist' :key='index'></el-option>

                                        </el-select>
                                    </div>
                                </div>
                            </div>
                            <div class="text" style="width:25%">
                                <div class="boxOnly" >
                                    <div class="labelC textborder">
                                        <span class='starColorChange' >*</span>
                                        签购单是否合规:
                                    </div>

                                    <div class="text-box" >
                                        <el-select v-model="purorderIsauthorizedInfo" placeholder="请选择" @focus="getRetrieveList" id='purorderIsauthorized' v-bind:disabled='setDisabled'>
                                            <el-option :label='item.sysname' :value='item.sysconid' v-for='(item,index) in retrieveList' :key='index'></el-option>


                                        </el-select>
                                    </div>
                                </div>

                                <div class="boxOnly" >
                                    <div class="labelC textborder">签购单不合规原因:</div>

                                    <div class="text-box"  >
                                        <el-input  type="textarea"  style="margin-bottom: 20px;" :rows="7" v-model="purorderFailReaseon" id='purorderFailReaseon' v-bind:disabled='setDisabled'>
                                        </el-input>
                                    </div>
                                </div>
                            </div>
                            <div class="text" style="width:25%">
                                <div class="boxOnly" >
                                    <div class="labelC textborder">
                                        <span class='starColorChange' >*</span>
                                        其他单据数量:
                                    </div>

                                    <div class="text-box"  >
                                        <el-input type='number'  :min='0' v-model='otherInvoiceNumInfo' id='otherInvoiceNum' v-bind:disabled='setDisabled'></el-input>
                                    </div>
                                </div>

                                <div class="boxOnly" >
                                    <div class="labelC textborder">其他单据说明:</div>

                                    <div class="text-box" >
                                        <el-input  type="textarea"  style="margin-bottom: 20px;" :rows="7" v-model="otherInvoiceDirectionInfo" id='otherInvoiceDirection' v-bind:disabled='setDisabled'>
                                        </el-input>
                                    </div>

                                </div>
                            </div>
                            <div class="text" style="width:23%">

                                <div class="boxOnly" >
                                    <div class="labelC textborder">
                                        <span class='starColorChange' >*</span>
                                        调单情况说明:
                                    </div>

                                    <div class="text-box">
                                        <el-input  type="textarea"  style="margin-bottom: 20px;" :rows="9" v-model="orderInstructionsInfo" id='orderInstructions' v-bind:disabled='setDisabled'>
                                        </el-input>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flootText" v-if="uploadPermission">
                            <el-button  type="primary" round class="leftBtn"  style="margin-right:10px;margin-left:10px;height: 36px;line-height: 12px;" @click='uploadBill'>上传单据</el-button>
                        </div>
                </div>
                <hr class="hr">
                <div class="divHead">
                        <span class="rideus"></span>
                        <span class='rideusText'>调查结论</span>
                        <div class="divContent">
                            <div class="text" style="width:30%">
                                <div class="boxOnly" >
                                    <div class="labelC textborder">
                                        <span class='starColorChange' >*</span>
                                        风险定性:
                                    </div>

                                    <div class="text-box" >
                                        <el-select v-model="riskQualitativeInfo" placeholder="请选择" @focus="getriskQualiteSelelist" id='riskQualitative' v-bind:disabled='setDisabled'>
                                            <el-option :label='item.sysname' :value='item.sysconid' v-for='(item,index) in riskQualiteSelelist' :key='index'></el-option>

                                        </el-select>
                                    </div>
                                </div>
                                <div class="boxOnly" >
                                    <div class="labelC textborder">
                                        <span class='starColorChange' >*</span>
                                        风险程度:
                                    </div>

                                    <div class="text-box" >
                                        <el-select v-model="riskDegreeInfo" placeholder="请选择" @focus="getRiskLevelList" id='riskDegree' v-bind:disabled='setDisabled'>
                                            <el-option :label='item.sysname' :value='item.sysconid' v-for='(item,index) in riskLevelList' :key='index'></el-option>

                                        </el-select>
                                    </div>
                                </div>
                                <div class="boxOnly" >
                                    <div class="labelC textborder">
                                        <span class='starColorChange' >*</span>
                                        风险类型:
                                    </div>

                                    <div class="text-box" >
                                        <el-select v-model="riskTypeInfo" placeholder="请选择" @focus="getRiskTypeList" id='riskType' v-bind:disabled='setDisabled'>
                                            <el-option :label='item.sysname' :value='item.sysconid' v-for='(item,index) in riskTypeList' :key='index'></el-option>


                                        </el-select>
                                    </div>
                                </div>
                            </div>
                            <div class="text" style="width:67%">
                                <div class="boxOnly" >
                                    <div class="labelC textborder" style="width:16%">结案陈词:</div>

                                    <div class="text-box" style="width:67%" >
                                        <el-input  type="textarea"   style="margin-bottom: 20px;" :rows="6" v-model="closingArgumentsInfo" v-bind:disabled='setDisabled'>
                                        </el-input>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
                    <hr class="hr">
                    <div class="divHead">
                        <span class="rideus"></span>
                        <span class='rideusText'>处理情况</span>
                        <div class="divContent">
                            <div class="text" style="width: 30%;display: block;float: none;">
                                <div class="boxOnly" >
                                    <div class="labelC textborder" style="width: 22%;margin-left: 9%;">处理情况:</div>

                                    <div class="text-box" >
                                        <el-select v-model="processingSituationInfo" placeholder="请选择" @focus="getMeasureSuggest" v-bind:disabled='setDisabled'>
                                            <el-option :label='item.sysname' :value='item.sysconid' v-for='(item,index) in measureSuggestList' :key='index'></el-option>
                                        </el-select>
                                    </div>

                                </div>
                            </div>
                            <div class="text" style="width: 100%;display: block;float: none;">
                                <div class="boxOnly" >
                                    <div class="labelC textborder" style="width: 8%;margin-left: 1%;">其他处理说明:</div>

                                    <div class="text-box"  >
                                        <el-input   type="textarea" :rows="5" v-model="otherProcessInstructionsInfo" style="width: 153%;margin-bottom: 20px;" v-bind:disabled='setDisabled'>
                                        </el-input>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
            </div>



        </div>

        <div class="rightContent">
            <div class="tabDiv"  @click="estInformation">
                <span>基</span>
                <span>本</span>
                <span>信</span>
                <span>息</span>
            </div>
            <div class="tabDiv"  @click="surveyInformation">
                <span>调</span>
                <span>查</span>
                <span>信</span>
                <span>息</span>
            </div>
        </div>
        <div class='rightContentActive'>

        </div>
        <div class="clearBox"></div>
    </div>
    <!-- 暂缓交易资金 -->
    <el-dialog title="交易资金暂缓" :visible.sync="reprieveDialog" width="400px">

        <el-input type='textarea' v-model='reprieveDesc' :rows="10" class='reprieveTextarea' placeholder="限制50字" :maxlength="50"></el-input>


        <span slot="footer" class="dialog-footer">
            <el-button @click="reprieveDialog = false">取 消</el-button>
            <el-button type="primary" @click='reprieveSave'>确 定</el-button>
        </span>
    </el-dialog>
     <!-- 解缓交易资金 -->
    <el-dialog title="交易资金解缓" :visible.sync="solwDownDialog" width="400px">

        <el-input type='textarea' v-model='solwDownDesc' :rows="10" class='reprieveTextarea' placeholder="限制50字" :maxlength="50"></el-input>


        <span slot="footer" class="dialog-footer">
            <el-button @click="solwDownDialog = false">取 消</el-button>
            <el-button type="primary" @click='solwDownSave'>确 定</el-button>
        </span>
    </el-dialog>
     <!-- 暂缓商户资金 -->
    <el-dialog title="商户资金暂缓" :visible.sync="reprieveBusiDialog" width="400px">

        <el-input type='textarea' v-model='reprieveBusiDesc' :rows="10" class='reprieveTextarea' placeholder="限制50字" :maxlength="50"></el-input>


        <span slot="footer" class="dialog-footer">
            <el-button @click="reprieveBusiDialog = false">取 消</el-button>
            <el-button type="primary" @click='reprieveBusiSave'>确 定</el-button>
        </span>
    </el-dialog>
    <!-- 解缓商户资金 -->
    <el-dialog title="商户资金解缓" :visible.sync="solwDownBusiDialog" width="400px">

        <el-input type='textarea' v-model='solwDownBusiDesc' :rows="10" class='reprieveTextarea' placeholder="限制50字" :maxlength="50"></el-input>


        <span slot="footer" class="dialog-footer">
            <el-button @click="solwDownBusiDialog = false">取 消</el-button>
            <el-button type="primary" @click='solwDownBusiSave'>确 定</el-button>
        </span>
    </el-dialog>
     <!-- 审核 -->
    <el-dialog title="审核" :visible.sync="verifyDialog" width="450px">
        <el-form  :model="verifyDialogForm" class="demo-form-inline"  label-width="100px">
            <el-form-item label="审核意见:">
                <el-select v-model="verifyDialogForm.region" style='width:90%'>
                    <el-option label="通过" value="通过"></el-option>
                    <el-option label="不通过" value="不通过"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="备注:">
                <el-input type='textarea' v-model='verifyDialogForm.desc' style='width:90%' placeholder="限制150字" maxlength="150" rows='6'></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="verifyDialog = false">取 消</el-button>
            <el-button type="primary" @click='verifySave'>确 定</el-button>
        </span>
    </el-dialog>
    <!-- 提交审核 -->
    <el-dialog title="提示" :visible.sync="sendVerifyDialog" width="450px">
        <div style='width:100%;text-align:center;'>
            <p><i class='el-icon-warning' style='color:#F1F2F5;font-size:25px;'></i></p>
            <p>直接提交审核,确定要提交么?</p>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="sendVerifyDialog = false">取 消</el-button>
            <el-button type="primary" @click='sendVerify'>确 定</el-button>
        </span>
    </el-dialog>
      <!-- 上传单据 -->
    <el-dialog title="核查单单据" :visible.sync="uploadBillDialog" width="750px">
        <!-- <img :src="dialogImageUrl" alt="" style='width:140px;height:140px;display:inline-height;'> -->
        <!-- <ul style='float:left'>
            <li class='el-upload-list'>
                <img :src="dialogImageUrl"/>
            </li>
        </ul>
        <el-upload

            action="http://localhost:80"
           list-type="picture-card"
            :auto-upload="false"
            :show-file-list="false"
            :on-change="handleAvatarSuccess">

            <i class="el-icon-plus"></i>
        </el-upload>     -->
        <ul class='el-upload-list' style='float:left' id="uploadUL">
            <li class="el-upload-list-li" style="float:left;" v-for="item in billImageList">
                <img :src="item.url" :name="item.name" style="width:140px;height:140px;margin-left:20px;"/>
                <i :src="item.url" :name="item.name" @click="deleteView" id="deleteItem">删除</i>
            </li>
        </ul>
        <label for="inp" id='inpLabel'>
            <i class="el-icon-plus" style='color:#ffffff;font-size:30px;'></i>
        </label>
        <input type="file" id='inp' style='display:none' @change='handleAvatarSuccess'>
        <span slot="footer" class="dialog-footer">
            <el-button @click="uploadBillDialog = false; billImageList = [];">取 消</el-button>
            <el-button type="primary" @click='uploadBillSave'>确 定</el-button>
        </span>
    </el-dialog>

  </div>
</template>
<script>
import qs from 'qs'
const uploadFormData = new FormData();
export default {
      data() {
        return {
            controllPermission: true,
            blackPermission: true,
            casePermission: true,
            submitPermission: true,
            uploadPermission: true,
            dialogVisible:false,
            dialogImageUrl:'',
            uploadBillDialog:false,
            sendVerifyDialog:false,
            setDisabled:false,
            estInformationCon:true,
            surveyInformationCon:false,
            tableData:[],
            ceshi:'测试数据咩咩咩喵喵喵',
            options:[{
              value: '选项1',
              label: '黄金糕'
            }, {
              value: '选项2',
              label: '双皮奶'
            }],
            merchantsState:'',
            value:'',
            operatRecordTableData:[
               {address:'1'}
            ],
            controlInp:'管控',
            showListHide:true,
            reprieveDialog:false,
            reprieveDesc:'',
            solwDownDialog:false,
            solwDownDesc:'',
            reprieveBusiDialog:false,
            reprieveBusiDesc:'',
            solwDownBusiDialog:false,
            solwDownBusiDesc:'',
            verifyDialog:false,
            verifyDialogForm:{
                region:'',
                desc:'',
            },
            editShowTrue:false,
            controlList:[],
            offlineCheckDetail:{
                checkInfo:{ },
                merchantInfo:{},
                terMinalInfo:{},
                transaction:{},
            },
            SurveyInfo:{
                surveyConclusion:{},
                surveyInfo:{},
                surveyState:{}
            },
            isRecallPurorder:'',
            purorderIsauthorized:'',
            recallWay:'',
            treatmentMeasures:'',
            riskNature:'',
            purorderFailReaseon:'',
            otherInvoiceNum:'',
            otherInvoiceDirection:'',
            orderInstructions:'',
            riskQualitative:'',
            riskDegree:'',
            riskType:'',
            closingArguments:'',
            processingSituation:'',
            otherProcessInstructions:'',
            retrieveList:[],
            orderWayList:[],
            measureSuggestList:[],
            riskQualiteSelelist:[],
            riskLevelList:[],
            riskTypeList:[],
            isRecallPurorder:'',
            recallWay:'',
            treatmentMeasures:'',
            riskNature:'',
            purorderFailReaseon:'',
            purorderIsauthorized:'',
            otherInvoiceNum:'',
            otherInvoiceDirection:'',
            orderInstructions:'',
            riskQualitative:'',
            riskDegree:'',
            riskType:'',
            closingArguments:'',
            processingSituation:'',
            otherProcessInstructions:'',

            checkId:'',
           riskScore :'',
           riskLevel :'',
           riskType :'',
           checkStatus :'',
           showCreateTime :'',
           riskQualitative :'',
           controlState :'',
           showFinishTime :'',
           branchCompany :'',
           merchantName :'',
           merchantId :'',
           merchantSign :'',
           mcc :'',
           agentNum :'',
           agentName :'',
           sale :'',
           merchantType :'',
           merchantActive :'',
           businessLicense :'',
           registeredCapital :'',
           receiptAccountNature :'',
           legalName :'',
           legalPaperWorkType :'',
           legalPaperWorkNum :'',
           contactName :'',
           contactPhone :'',
           contactEmail :'',
           merchantProvince :'',
           merchantCity :'',
           networkTime :'',
           settleAccounts :'',
           settleBankCard :'',
           merchantUniqueId :'',
           terminalNum :'',
           terminalModel :'',
           installationSite :'',
           counterTelephone :'',
           terminalState :'',
           merchantOrder:'',
           transactionalNumber :'',
           transactionMoney :'',
           showTransactionTime:'',
           transactionType :'',
           transactionCard :'',
           cardType :'',
           cardMedia :'',
           issuingBank :'',
           replyCode :'',
           authorizationNum :'',
           sysReferenceNum:'',
           transactionTerminalNum :'',
           pageNum:1,
           pageSize:10,
           ruleControlTableData:[],
           totalSize:0,
           controlStateId:'',
           isRecallPurorderInfo:'',
            purorderIsauthorizedInfo:'',
            recallWayInfo:'',
            treatmentMeasuresInfo:'',
            riskNatureInfo:'',

            purorderFailReaseonInfo:'',
            otherInvoiceNumInfo:'',
            otherInvoiceDirectionInfo:'',
            orderInstructionsInfo:'',
            riskQualitativeInfo:'',
            riskDegreeInfo:'',
            riskTypeInfo:'',
            closingArgumentsInfo:'',
            processingSituationInfo:'',
            otherProcessInstructionsInfo:'',
            formData:'',
            billImageList: [],
        }
      },
      created() {
      // 按钮权限
      const idList = JSON.parse(localStorage.getItem('ARRLEVEL'));
      this.controllPermission = idList.indexOf(72) === -1 ? false : true;
      this.blackPermission = idList.indexOf(78) === -1 ? false : true;
      this.casePermission = idList.indexOf(79) === -1 ? false : true;
      this.submitPermission = idList.indexOf(71) === -1 ? false : true;
    //   this.uploadPermission = idList.indexOf(55) === -1 ? false : true;
    },
      methods:{
        snapshotView(row){
            // console.log(row)
            // window.open('http://172.19.40.129:8080/#/snapshotView')
        // window.open('http://172.19.40.47:8080/#/snapshotView?' + window.location.href.split('?')[1])
        // window.open('http://10.151.30.148:8080/business-view/#/snapshotView?' + window.location.href.split('?')[1])
        window.open( window.location.href.split('#')[0] + '#/snapshotView?' + window.location.href.split('?')[1])

        },
        surveyInformation(){
            this.estInformationCon = false;
            this.surveyInformationCon = true;
            if(this.surveyInformationCon === true){
                 document.querySelector('.rightContentActive').style.top = '270px'
                document.querySelector('.rightContentActive').style.transition = 'all 1s'
            }
        },
        estInformation(){
            this.estInformationCon = true;
            this.surveyInformationCon = false;
            if(this.estInformationCon === true){
                document.querySelector('.rightContentActive').style.top = '116px'
                document.querySelector('.rightContentActive').style.transition = 'all 1s'
            }
        },
        create(){
        //   window.open('http://172.19.40.129:8080/#/merchantRiskManagement')
        //   window.open('http://10.151.30.148:8080/business-view/#/merchantRiskManagement')
          window.open( window.location.href.split('#')[0] + '#/merchantRiskManagement')

        },


        merchantsStateChange(){
            console.log(this.merchantsState)
        },
        // 暂缓交易资金
        reprieveSave(){
            console.log(this.riskScore)
            console.log(this.merchantName)
            console.log(this.controlStateId)
            this.$axios.post('/OfflineChecklistController/updateControlState',qs.stringify({
                'sessionId':localStorage.getItem('SID'),
                'checkId':window.location.href.split('?')[1],
                'controlState':this.controlStateId,
                'controlMoney':this.transactionMoney,
                'merchantId':this.merchantId,
                'remark':this.reprieveDesc,
                'userId':localStorage.getItem('USERID'),
                'lineMech':localStorage.getItem('LINEMEID'),
                'merchantName':this.merchantName,

            }))
            .then(res => {
                console.log(res.data)
                if(res.data.code === 1){
                    this.$alert('成功','提示',{
                        confirmButtonText:'确定',
                        type:'success',
                        callback:action => {
                            this.reprieveDialog = false
                        }
                    })
                }else if(res.data.code !== 1){
                    this.$alert('失败','提示',{
                        confirmButtonText:'确定',
                        type:'success',
                        callback:action => {

                        }
                    })
                }
            })
            .catch(error => {
                console.log(error)
            })
        },
        // 解缓交易资金
        solwDownSave(){
            // console.log(this.solwDownDesc)
            // console.log(this.merchantName)
            this.$axios.post('/OfflineChecklistController/updateControlState',qs.stringify({
                'sessionId':localStorage.getItem('SID'),
                'checkId':window.location.href.split('?')[1],
                'controlState':this.controlStateId,
                'controlMoney':this.transactionMoney,
                'merchantId':this.merchantId,
                'remark':this.solwDownDesc,
                'userId':localStorage.getItem('USERID'),
                'lineMech':localStorage.getItem('LINEMEID'),
                'merchantName':this.merchantName,
                'riskValue':this.riskScore
            }))
            .then(res => {
                console.log(res.data)
                if(res.data.code === 1){
                    this.$alert(res.data.message,'提示',{
                        confirmButtonText:'确定',
                        type:'success',
                        callback:action => {
                            this.solwDownDialog = false
                        }
                    })
                }else if(res.data.code !== 1){
                    this.$alert(res.data.message,'提示',{
                        confirmButtonText:'确定',
                        type:'success',
                        callback:action => {

                        }
                    })
                }
            })
            .catch(error => {
                console.log(error)
            })
        },
        // 暂缓商户资金
        reprieveBusiSave(){
            // console.log(this.reprieveBusiDesc)
            // console.log(this.merchantName)
            this.$axios.post('/OfflineChecklistController/updateControlState',qs.stringify({
                'sessionId':localStorage.getItem('SID'),
                'checkId':window.location.href.split('?')[1],
                'controlState':this.controlStateId,
                'controlMoney':this.transactionMoney,
                'merchantId':this.merchantId,
                'remark':this.reprieveBusiDesc,
                'userId':localStorage.getItem('USERID'),
                'lineMech':localStorage.getItem('LINEMEID'),
                'merchantName':this.merchantName,

            }))
            .then(res => {
                console.log(res.data)
                if(res.data.code === 1){
                    this.$alert('成功','提示',{
                        confirmButtonText:'确定',
                        type:'success',
                        callback:action => {
                            this.reprieveBusiDialog = false
                        }
                    })
                }else if(res.data.code !== 1){
                    this.$alert('失败','提示',{
                        confirmButtonText:'确定',
                        type:'success',
                        callback:action => {

                        }
                    })
                }
            })
            .catch(error => {
                console.log(error)
            })
        },
        // 解缓商户资金
       solwDownBusiSave(){
        //    console.log(this.solwDownBusiDesc)
        //    console.log(this.merchantName)
           this.$axios.post('/OfflineChecklistController/updateControlState',qs.stringify({
                'sessionId':localStorage.getItem('SID'),
                'checkId':window.location.href.split('?')[1],
                'controlState':this.controlStateId,
                'controlMoney':this.transactionMoney,
                'merchantId':this.merchantId,
                'remark':this.solwDownBusiDesc,
                'userId':localStorage.getItem('USERID'),
                'lineMech':localStorage.getItem('LINEMEID'),
                'merchantName':this.merchantName,
                'riskValue':this.riskScore
            }))
            .then(res => {
                console.log(res.data)
                if(res.data.code === 1){
                    this.$alert(res.data.message,'提示',{
                        confirmButtonText:'确定',
                        type:'success',
                        callback:action => {
                            this.solwDownBusiDialog = false
                        }
                    })
                }else if(res.data.code !== 1){
                    this.$alert(res.data.message,'提示',{
                        confirmButtonText:'确定',
                        type:'success',
                        callback:action => {

                        }
                    })
                }
            })
            .catch(error => {
                console.log(error)
            })
       },
        //   审核
        verifySave(){
            console.log(this.verifyDialogForm.region)
            console.log(this.verifyDialogForm.desc)
        },
        handleClick(){
            this.editShowTrue = true

        },
        // 管控下拉框获取
        controlStatus(){
            this.$axios.post('/SysConfigController/queryEnum',qs.stringify({
                'sessionId':localStorage.getItem('SID'),
                'type':63
            }))
            .then(res => {
                //console.log(res.data)
                this.controlList = res.data
            })
            .catch(error => {
                console.log(error)
            })
        },
        // 点击管控
        controlItemClick(val,id){
            //console.log(val)
             this.controlStateId = id
            if(val === '暂缓交易资金'){
                this.reprieveDialog = true
            }else if(val === '解缓交易资金'){
                this.solwDownDialog = true
            }else if(val === '暂缓商户资金'){
                this.reprieveBusiDialog = true
            }else if(val === '解缓商户资金'){
                this.solwDownBusiDialog = true
            }
        },
        getCheckListDetail(){
            let id = window.location.href.split('?')[1]

            this.$axios.post('/OfflineChecklistController/queryChecklistDetailById',qs.stringify({
                'sessionId':localStorage.getItem('SID'),
                'checkId': parseInt(id)
            }))
            .then(res => {
                console.log(res.data)
                this.offlineCheckDetail = res.data
            // console.log( this.offlineCheckDetail)
             this.checkId = res.data.checkInfo.checkId
           this.riskScore = res.data.checkInfo.riskScore
           this.riskLevel = res.data.checkInfo.riskLevel
           this.riskType = res.data.checkInfo.riskType
           this.checkStatus = res.data.checkInfo.checkStatus
           this.showCreateTime = res.data.checkInfo.showCreateTime
           this.riskQualitative = res.data.checkInfo.riskQualitative
           this.controlState = res.data.checkInfo.controlState
           this.showFinishTime = res.data.checkInfo.showFinishTime
           this.branchCompany = res.data.merchantInfo.branchCompany
           this.merchantName = res.data.merchantInfo.merchantName
           this.merchantId = res.data.merchantInfo.merchantId
           this.merchantSign = res.data.merchantInfo.merchantSign
           this.mcc = res.data.merchantInfo.mcc
           this.agentNum = res.data.merchantInfo.agentNum
           this.agentName = res.data.merchantInfo.agentName
           this.sale = res.data.merchantInfo.sale
           this.merchantType = res.data.merchantInfo.merchantType
           this.merchantActive = res.data.merchantInfo.merchantActive
           this.businessLicense = res.data.merchantInfo.businessLicense
           this.registeredCapital = res.data.merchantInfo.registeredCapital
           this.receiptAccountNature = res.data.merchantInfo.receiptAccountNature
           this.legalName = res.data.merchantInfo.legalName
           this.legalPaperWorkType = res.data.merchantInfo.legalPaperWorkType
           this.legalPaperWorkNum = res.data.merchantInfo.legalPaperWorkNum
           this.contactName = res.data.merchantInfo.contactName
           this.contactPhone = res.data.merchantInfo.contactPhone
           this.contactEmail = res.data.merchantInfo.contactEmail
           this.merchantProvince = res.data.merchantInfo.merchantProvince
           this.merchantCity = res.data.merchantInfo.merchantCity
           this.networkTime = res.data.merchantInfo.networkTime
           this.settleAccounts = res.data.merchantInfo.settleAccounts
           this.settleBankCard = res.data.merchantInfo.settleBankCard
           this.merchantUniqueId = res.data.merchantInfo.merchantUniqueId
           this.terminalNum = res.data.terMinalInfo.terminalNum
           this.terminalModel = res.data.terMinalInfo.terminalModel
           this.installationSite = res.data.terMinalInfo.installationSite
           this.counterTelephone = res.data.terMinalInfo.counterTelephone
           this.terminalState = res.data.terMinalInfo.terminalState
           this.merchantOrder = res.data.transaction.merchantOrder
           this.transactionalNumber = res.data.transaction.transactionalNumber
           this.transactionMoney = res.data.transaction.transactionMoney
           this.showTransactionTime = res.data.transaction.showTransactionTime
           this.transactionType = res.data.transaction.transactionType
           this.transactionCard = res.data.transaction.transactionCard
           this.cardType = res.data.transaction.cardType
           this.cardMedia = res.data.transaction.cardMedia
           this.issuingBank = res.data.transaction.issuingBank
           this.replyCode = res.data.transaction.replyCode
           this.authorizationNum = res.data.transaction.authorizationNum
           this.sysReferenceNum = res.data.transaction.sysReferenceNum
           this.transactionTerminalNum = res.data.transaction.transactionTerminalNum


            })
            .catch(error => {
                console.log(error)
            })
        },
         // 调查信息获取
        querySurveyInfo(){
            this.$axios.post('/OfflineChecklistController/querySurveyInfo',qs.stringify({
                'sessionId':localStorage.getItem('SID'),
                'checkId': parseInt(window.location.href.split('?')[1]) ,

            }))
            .then(res => {
                console.log('1121')
                console.log(res.data)
                this.SurveyInfo = res.data
                this.isRecallPurorderInfo = res.data.surveyInfo.isRecallPurorder
                this.purorderIsauthorizedInfo = res.data.surveyInfo.purorderIsauthorized
                this.recallWayInfo = res.data.surveyInfo.recallWay
                this.treatmentMeasuresInfo = res.data.surveyInfo.treatmentMeasures
                this.riskNatureInfo = res.data.surveyInfo.riskNature

                this.purorderFailReaseonInfo = res.data.surveyInfo.purorderFailReaseon
                this.otherInvoiceNumInfo = res.data.surveyInfo.otherInvoiceNum
                this.otherInvoiceDirectionInfo = res.data.surveyInfo.otherInvoiceDirection
                this.orderInstructionsInfo = res.data.surveyInfo.orderInstructions

                this.riskQualitativeInfo = res.data.surveyConclusion.riskQualitative
                this.riskDegreeInfo = res.data.surveyConclusion.riskDegree
                this.riskTypeInfo = res.data.surveyConclusion.riskType
                this.closingArgumentsInfo = res.data.surveyConclusion.closingArguments

                this.processingSituationInfo = res.data.surveyInfo.processingSituation
                this.otherProcessInstructionsInfo = res.data.surveyInfo.otherProcessInstructions

                console.log(this.riskQualitative)
                console.log(this.riskDegree)
            })
            .catch(error => {
                console.log(error)
            })
        },
        // 调取签购单
        getRetrieveList(){
            this.$axios.post('/SysConfigController/queryEnum',qs.stringify({
                'sessionId':localStorage.getItem('SID'),
                'type':65
            }))
            .then(res => {
                //console.log(res.data)
                this.retrieveList = res.data
            })
            .catch(error => {
                console.log(error)
            })
        },
         // 调单方式
        getOrderWay(){

            this.$axios.post('/SysConfigController/queryEnum',qs.stringify({
                'sessionId':localStorage.getItem('SID'),
                'type':66
            }))
            .then(res => {
                console.log(res.data)
                this.orderWayList = res.data
            })
            .catch(error => {
                console.log(error)
            })
        },
         // 处理措施建议
        getMeasureSuggest(){
            this.$axios.post('/SysConfigController/queryEnum',qs.stringify({
                'sessionId':localStorage.getItem('SID'),
                'type':67
            }))
            .then(res => {
                console.log(res.data)
                this.measureSuggestList = res.data
            })
            .catch(error => {
                console.log(error)
            })
        },
        // 风险定性建议
        getriskQualiteSelelist(){
            this.$axios.post('/SysConfigController/queryEnum',qs.stringify({
                'sessionId':localStorage.getItem('SID'),
                'type':59
            }))
            .then(res => {
                console.log(res.data)
                this.riskQualiteSelelist = res.data
            })
            .catch(error => {
                console.log(error)
            })
        },
        // 风险程度
        getRiskLevelList(){
            this.$axios.post('/SysConfigController/queryEnum',qs.stringify({
                'sessionId':localStorage.getItem('SID'),
                'type':69
            }))
            .then(res => {
                console.log(res.data)
                this.riskLevelList = res.data
            })
            .catch(error => {
                console.log(error)
            })
        },
        // 风险类型
        getRiskTypeList(){

            this.$axios.post('/SysConfigController/queryEnum',qs.stringify({
                'sessionId':localStorage.getItem('SID'),
                'type':57
            }))
            .then(res => {
                console.log(res.data)
                this.riskTypeList = res.data
            })
            .catch(error => {
                console.log(error)
            })
        },
        sendCheckBtn(){
            console.log(this.isRecallPurorderInfo)
            console.log(this.recallWayInfo)
            console.log(this.treatmentMeasuresInfo)
            console.log(this.riskNatureInfo)
            console.log(this.purorderFailReaseonInfo)
            console.log(this.purorderIsauthorizedInfo)
            console.log(this.otherInvoiceNumInfo)
            console.log(this.riskQualitativeInfo)
            console.log(this.riskDegreeInfo   )
            console.log(this.riskTypeInfo)
            console.log(this.closingArgumentsInfo   )
            console.log(this.processingSituationInfo)
            console.log(this.otherProcessInstructionsInfo)

            this.$axios.post('/OfflineChecklistController/addSurveyInfo',qs.stringify({
                'sessionId':localStorage.getItem('SID'),
                'checkId':window.location.href.split('?')[1],
                'isRecallPurorder':this.isRecallPurorderInfo,
                'recallWay':this.recallWayInfo,
                'treatmentMeasures':this.treatmentMeasuresInfo,
                'riskNature':this.riskNatureInfo,
                'purorderFailReaseon':this.purorderFailReaseonInfo,
                'purorderIsauthorized':this.purorderIsauthorizedInfo,
                'otherInvoiceNum':this.otherInvoiceNumInfo,
                'otherInvoiceDirection':this.otherInvoiceDirectionInfo,
                'orderInstructions':this.orderInstructionsInfo,
                'riskQualitative':this.riskQualitativeInfo,
                'riskDegree':this.riskDegreeInfo,
                'riskType':this.riskTypeInfo,
                'closingArguments':this.closingArgumentsInfo,
                'processingSituation':this.processingSituationInfo,
                'otherProcessInstructions':this.otherProcessInstructionsInfo
            }))
            .then(res => {
                console.log(res.data)
                if(res.data.code === 1){
                    this.$alert('提交成功','提示',{
                        confirmButtonText:'确定',
                        type:'success',
                        callback:action => {
                            // this.getCheckListDetail()
                            // this.setDisabled = true
                            window.close()
                        }
                    })
                }
            })
            .catch(error => {
                console.log(error)
            })
        },
        // 生成案件
        makeCaseSave(){
            this.$axios.post('/CaseInquiryController/generateCase',qs.stringify({
                'sessionId':localStorage.getItem('SID'),
                'merchantId':this.merchantId,
                'merchantOrder':this.merchantOrder,
                'stolenCardNumber':'',
                'source':670,
                'businessLine':672,
                'ids':window.location.href.split('?')[1],
                'created':'',
                'transactionTime':this.showTransactionTime
            }))
            .then(res => {
                console.log(res.data)
                if(res.data.code === 1){
                    this.$alert('案件生成成功','提示',{
                        confirmButtonText:'确定',
                        type:'success',
                        callback:action=>{

                        }
                    })
                }else if(res.data.code !== 1){
                    this.$alert(res.data.message,'提示',{
                        confirmButtonText:'确定',
                        type:'warning',
                        callback:action=>{

                        }
                    })
                }
            })
            .catch(error => {
                console.log(error)
            })
        },
        // 一键加黑
        addBlackList(){
            let dataArr = []
            let data = {}
            data.offline_merchantId = this.merchantId
            data.offline_terminalIdBl = this.terminalNum
            data.offline_corporateName = this.legalName
            data.offline_corporateNo = this.legalPaperWorkNum
            data.offline_settlementAcct = this.settleBankCard
            data.offline_settlementAcctName = this.settleAccounts
            data.offline_businessId = this.businessLicense
            data.offline_merchantGuid = this.merchantUniqueId
            data.online_imeiBl = ''
            data.online_terminalIdBl = ''
            data.online_loginNameBl = ''
            data.online_userIpBl = ''
            data.online_userPhoneBl = ''
            data.online_idNoBl = ''
            data.online_referBl = ''
            data.online_bankCardNoBl = ''
            data.paramMerchantId = this.merchantId
            data.paramMerchantOrder = this.merchantOrder
            dataArr.push(data)

            this.$axios.post('/NameListController/batchSaveName',qs.stringify({
                'sessionId':localStorage.getItem('SID'),
                'source':754,
                'type':'black',
                'bizLine':'offline',
                'comments':'',
                'data': JSON.stringify(dataArr),
                'buttonType':'check_detail_black',
                'loginPerson':localStorage.getItem('testName')
            }))
            .then(res => {
                console.log(res.data)
                if(res.data.code === 1){
                    this.$alert('操作成功','提示',{
                        confirmButtonText:'确定',
                        type:'success',
                        callback:action=>{

                        }
                    })
                }else if(res.data.code !== 1){
                    this.$alert(res.data.message,'提示',{
                        confirmButtonText:'确定',
                        type:'warning',
                        callback:action=>{

                        }
                    })
                }
            })
            .catch(error => {
                console.log(error)
            })
        },
        // 提交审核
        sendCheck(){
           console.log(this.purorderIsauthorizedInfo)
            if(this.purorderIsauthorizedInfo === ''){
                document.querySelector('#purorderIsauthorized').style.border = '1px solid #f56c6c'
                return
            }else if(this.purorderIsauthorizedInfo !== ''){
                document.querySelector('#purorderIsauthorized').style.border = '1px solid #dcdfe6'
                if(this.otherInvoiceNumInfo === ''){
                     document.querySelector('#otherInvoiceNum').style.border = '1px solid #f56c6c'
                     return
                }else if(this.otherInvoiceNumInfo !== ''){
                    document.querySelector('#otherInvoiceNum').style.border = '1px solid #dcdfe6'
                    if(this.orderInstructionsInfo === ''){
                        document.querySelector('#orderInstructions').style.border = '1px solid #f56c6c'
                        return
                    }else if(this.orderInstructionsInfo !== ''){
                        document.querySelector('#orderInstructions').style.border = '1px solid #dcdfe6'
                        if(this.recallWayInfo === ''){
                            document.querySelector('#recallWay').style.border = '1px solid #f56c6c'
                            return
                        }else if(this.recallWayInfo !== ''){
                            document.querySelector('#recallWay').style.border = '1px solid #dcdfe6'
                            if(this.treatmentMeasuresInfo === ''){
                                document.querySelector('#treatmentMeasures').style.border = '1px solid #f56c6c'
                                return
                            }else if(this.treatmentMeasuresInfo !== ''){
                                document.querySelector('#treatmentMeasures').style.border = '1px solid #dcdfe6'
                                if(this.riskNatureInfo === ''){
                                    document.querySelector('#riskNature').style.border = '1px solid #f56c6c'
                                    return
                                }else if(this.riskNatureInfo !== ''){
                                    document.querySelector('#riskNature').style.border = '1px solid #dcdfe6'
                                    if(this.riskQualitativeInfo === ''){
                                        document.querySelector('#riskQualitative').style.border = '1px solid #f56c6c'
                                        return
                                    }else if(this.riskQualitativeInfo !== ''){
                                        document.querySelector('#riskQualitative').style.border = '1px solid #dcdfe6'
                                        if(this.riskDegreeInfo === ''){
                                            document.querySelector('#riskDegree').style.border = '1px solid #f56c6c'
                                            return
                                        }else if(this.riskDegreeInfo !== ''){
                                            document.querySelector('#riskDegree').style.border = '1px solid #dcdfe6'
                                            if(this.riskTypeInfo === ''){
                                                document.querySelector('#riskType').style.border = '1px solid #f56c6c'
                                                return
                                            }else if(this.riskTypeInfo !== ''){
                                                document.querySelector('#riskType').style.border = '1px solid #dcdfe6'

                                            }

                                        }
                                    }
                                }
                            }
                        }
                    }

                }
            }
            this.sendVerifyDialog = true
        },
        sendVerify(){
            this.sendCheckBtn()
        },

        // 触发规则详情
        getRuleControlList(){
            this.$axios.post('/RulesController/queryRulesByRuleId',qs.stringify({
                'sessionId':localStorage.getItem('SID'),
                'scenesCode':this.scenesCode,
                'detailType':2,
                'bankCard':this.settleBankCard,
                'checkId':this.checkId,
                'pageNum':this.pageNum,
                'pageSize':this.pageSize
            }))
            .then(res => {
                // console.log(res.data)
                this.ruleControlTableData = []
                this.ruleControlTableData = this.ruleControlTableData.concat(res.data.recordList)
                this.totalSize = res.data.totalSize


            })
            .catch(error => {
                console.log(error)
            })
        },
        // 获取上传单据
        uploadBill(){
          this.$axios.post('/OfflineChecklistController/downloadInvoice', qs.stringify({
            id: window.location.href.split('?')[1]
          }))
          .then(res => {
            if(res.data.code == 1){
              this.uploadBillDialog = true;
              this.billImageList = res.data.pics;
            }else {
              this.$alert(res.data.message);
            }
          })
          .catch(error => {
            this.$alert(error);
          });
        },
        // 上传单据
        handleAvatarSuccess(e) {
            this.$nextTick(() => {

                if (document.getElementsByClassName('el-upload-list')[0].getElementsByTagName("img").length >= 9) {
                  alert("不能超过9张图片！");
                  return;
                }
                let upload_list_li = document.getElementsByClassName('el-upload-list')[0].children;
                this.formData = uploadFormData;
                let upload_list_ul = document.getElementById("uploadUL");
                for (let i = 0; i < upload_list_li.length; i++) {
                    let liElement = document.createElement("li")
                    let imgElement = document.createElement("img")
                    var windowURL = window.URL || window.webkitURL
                    let iElement = document.createElement("i")

                    if (this.formData.get(e.target.files[0].name) == undefined) {
                      liElement.setAttribute('class', "el-upload-list-li")
                      liElement.setAttribute('style', "float:left;")
                      imgElement.setAttribute('src', windowURL.createObjectURL(e.target.files[0]))
                      imgElement.setAttribute('name', this.formData.get(e.target.files[0].name))
                      imgElement.setAttribute('style', "width:140px;height:140px;margin-left:20px;")
                      iElement.setAttribute('src', windowURL.createObjectURL(e.target.files[0]))
                      iElement.setAttribute('name', this.formData.get(e.target.files[0].name))
                      iElement.setAttribute('value', "删除")
                      iElement.innerHTML = "删除"
                      iElement.addEventListener('click', this.$options.methods.deleteView,false);
                      liElement.appendChild(imgElement);
                      liElement.appendChild(iElement);
                      upload_list_ul.appendChild(liElement);
                      this.formData.append(e.target.files[0].name, e.target.files[0]);
                    }
                }
            })
        },
        uploadBillSave(){
          let imgList = document.getElementsByClassName('el-upload-list')[0].getElementsByTagName("img");
          var remain = [];
          for (var i = 0; i < imgList.length; i++) {
            let name = imgList[i].name;
            if (name != "null") {
              remain.push(name);
            }
          }
          this.$axios.post('/OfflineChecklistController/uploadInvoice?sessionId='+localStorage.getItem('SID') + '&remain='+ remain + '&id='+ window.location.href.split('?')[1],this.formData)
          .then(res => {
              this.$alert(res.data.message);
              if (res.data.code === 1) {
                this.uploadBillDialog = false;
                this.billImageList = [];
              }
              console.log(res.data)
          })
          .catch(error => {
              console.log(res.data)
              this.$alert(error);
          })
        },
        deleteView(e){
            if (e.target == undefined) {
              return;
            }
          this.formData = uploadFormData;
          let name = e.target.getAttribute("name");
          e.target.parentNode.remove();
          if (this.formData.get(name) != undefined) {
            this.formData.delete(name);
          }
        },

      },
      mounted(){
        this.getCheckListDetail()
        this.getRuleControlList()
        this.querySurveyInfo()
        this.getriskQualiteSelelist()
        this.getRiskLevelList()
        this.getRiskTypeList()

      },
      watch:{
          reprieveDialog(){
              if(this.reprieveDialog === false){
                  this.reprieveDesc = ''
              }
          },
          solwDownDialog(){
              if(this.solwDownDialog === false){
                  this.solwDownDesc = ''
              }
          },
          reprieveBusiDialog(){
              if(this.reprieveBusiDialog === false){
                  this.reprieveBusiDesc = ''
              }
          },
          solwDownBusiDialog(){
              if(this.solwDownBusiDialog === false){
                  this.solwDownBusiDesc = ''
              }
          },
          verifyDialog(){
              if(this.verifyDialog === false){
                  this.verifyDialogForm.region = ''
                  this.verifyDialogForm.desc = ''
              }
          },


      }
    }
</script>
<style scoped>
.text-box span{
    font-size: 13px;
    text-align: left;
    color: #333;
    margin-left: 13px;
    float: left;
}
.textborder{
    margin-right: 15px;
}
.leftContent{
    width:97%;
    float: left;
    border-right: 1px solid #E0E0E0;
}
.rightContent{

    height: 100%;
    width:35px;

}
.rightContentActive{
    height:130px;
    width:4px;
    background-color: rgb(63, 170, 249);
    position:absolute;
    right: 4.2%;
    top:116px;
}
.tabDiv{
    cursor: pointer;
    margin-top: 20px;
    height: 140px;
    text-align: center;
    font-size: 14px;
    color:#333333;
}
.tabDivH{
    cursor: pointer;
    margin-top: 38px;
    height: 87px;
    border-left: 6px solid rgb(63, 170, 249);
    padding-left: 6px;
}
.tabDiv span{
    display: block;
}
.text input{
    border: none;
}
.hr{
    margin-top: 25px;
    margin-bottom: 25px;
    border: none;
    height: 1px;
    background-color: #E0E0E0;
}
.flootText{
  width: 98%;
  height: 51px;
  overflow: hidden;
  border: 1px solid #E0E0E0;
  margin: -32px 10px 20px 0px;
  border-top: 0;
  padding-top: 17px;
}
.leftBtn{
  float: left;
  height:36px;
  line-height: 0;
}
.rightBtn{
  float: right;
}
.blackAddBtn{
  margin-left: 20px;
}
.btnBoxClass{
  width: 98%;
  background-color: rgb(245, 246, 250);
  height: 54px;
  margin-top: 14px;
  padding-top: 14px;
}
.clearBox{
  clear:both
}
.divHead{
  margin-top:20px;
  margin-left:20px;
}
.rideus{
  display:block;
  width:8px;
  height:8px;
  background-color:#333333;
  border-radius:5px;
  float:left;
  margin-top: 7px;
  margin-right: 15px;
  vertical-align: middle;
}
.htmlHead{
  width:98%;
  margin-top:20px;
  margin-left:20px;
}
.divContent{
  width:98%;
  overflow: hidden;
  margin-top:20px;
  margin-bottom:30px;
  height:100%;
  border: 1px solid #E0E0E0;
  /* padding: 30px 20px 30px 20px; */
  padding-top: 15px;
}
.divContent .text input{
  border:0;
}
.text{
  width:24%;
  float:left;
  text-align: right;
}
.text-box{
  width: 50%;
  float: left;
}
.labelC{
  float: left;
  font-size: 13px;
  width: 35%;
  color: rgb(142, 142, 142)
}
.boxOnly{
  display: block;
  width: 100%;
  height: 50px;
  line-height: 40px;
}
.divContent p {
  font-size: 13px;
  color:#606266;
  padding: 10px;
  line-height: 26px;
}
.boxOnly input{
  border: none !important;
}
.contentBotoom {
    height: 60px;
    font-size: 13px;
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
.icon3{
    background: url(../../images/off3.png) no-repeat;
    width: 39px;
    height: 28px;
}
.icon4{
    background: url(../../images/off4.png) no-repeat;
    width: 39px;
    height: 28px;
}
.sp{
    background: url(../../images/sp.png) no-repeat;
    width: 39px;
    height: 28px;
}
.icon3:hover{
    background: url(../../images/pfHover.png) no-repeat;
    width: 39px;
    height: 28px;
}
.icon4:hover{
    background: url(../../images/clHover.png) no-repeat;
    width: 39px;
    height: 28px;
}
.sp:hover{
    background: url(../../images/spH.png) no-repeat;
    width: 39px;
    height: 28px;
}
.controlInpCss{
    height:34px;
    border:1px solid #3FAAF9;
    border-radius:50px;
    line-height: 34px;
    color:#3FAAF9;
    display:inline-block;
    width:200px;
    background-color:#ffffff;
    font-size:13px;
    text-indent: 16px;
    margin-left:36px;
    margin-right: 20px;
}
.controlIcon{
    float: right;
    display:inline-block;
    margin-top:10px;
    margin-right: 16px;
}
.showListHide{
    position: absolute;
    z-index: 10000;
    height: 100px;
    width: 189px;
    background-color: #ffffff;
    top: 100px;
    border: 1px solid #3FAAF9;
    left: 49px;
}
.showListHide ul{
    width:100%;
    height:100%;
    padding: 0;
    margin: 0;


}
.showListHide ul li{
    list-style-type: none;
    font-size:12px;
    color:#333333;
    line-height: 25px;
    text-indent: 25px;
    cursor:pointer;
}
#selectClass{
    width:200px;
    height:34px;
    border: 1px solid #3FAAF9;
    display:inline-block;
    text-indent: 25px;
    line-height: 34px;
    font-size:13px;
    color:#3FAAF9;
    border-radius: 50px;
    margin:0 20px;
    background-color: #ffffff;
    cursor: pointer;

}
.controlItem{
    width:200px;
    margin-left:20px;
}
.reprieveTextarea{
    width:90%;
    margin-left:5%;
}
.rideusText{
    font-size:15px;
    color:#333333;
}
.starColorChange{
    color:#f56c6c;
}

#inpLabel{
    display:inline-block;
    width:140px;
    height:140px;
    border: 1px solid #e0e0e0;
    background-color: rgba(0,0,0,0.6);
    text-align: center;
    line-height: 140px;
    margin-left:20px;

}
</style>
