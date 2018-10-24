<template>
  <!--线下核查单详情-->
  <div>
    <div class="htmlHead">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>核查单管理平台</el-breadcrumb-item>
        <el-breadcrumb-item>线下核查单管理</el-breadcrumb-item>
        <el-breadcrumb-item>线下核查单详情</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="btnBoxClass leftBtn" >
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
           <!-- <el-button type="primary" round class="rightBtn" style="margin-right:10px;" @click="create" v-if="managePermission">商户风险管理</el-button> -->
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
                        <div class="button" v-if='editShowTrue === false'>
                            <div class="leftButton clear">
                                <div class="BotoomBtn leftRadius" title='派发' @click='distribute = true' v-if="distributePermission">
                                    <div class="icon3"></div>
                                </div>
                                <div class="BotoomBtn" title='处理' @click='handleClick' v-if="dealPermission">
                                    <div class="icon4"></div>
                                </div>
                                <div class="BotoomBtn rightRadius" title='审核' @click='verifyDialog = true' v-if="checkPermission">
                                    <div class="sp"></div>
                                </div>
                            </div>
                        </div>
                        <div class="button" v-if='editShowTrue === true'>

                            <el-button type="primary" round>提交审核</el-button>
                            <!-- <el-button type="primary" round>代理商回退</el-button> -->
                        </div>
                    </div>
                    <div class="divContent">
                     <div class="text">

                        <div class="boxOnly" >
                            <div class="labelC">核查单号:</div>
                            <div class="text-box" >
                                <span class="txt_span">{{checkCode}}</span>
                            </div>
                        </div>

                        <div class="boxOnly">
                            <div class="labelC">状态:</div>
                            <div class="text-box">
                                <span class="txt_span">{{checkStatus}}</span>
                            </div>
                        </div>

                        <div class="boxOnly">
                            <div class="labelC">完成日期:</div>
                            <div class="text-box">
                                <span class="txt_span">{{showFinishTime}}</span>
                            </div>
                        </div>

                        </div>
                        <div class="text">

                            <div class="boxOnly" >
                            <div class="labelC">风险得分:</div>
                            <div class="text-box">
                                <span class="txt_span">{{riskScore}}</span>
                            </div>
                            </div>

                            <div class="boxOnly">
                            <div class="labelC">生成日期:</div>
                            <div class="text-box">
                                <span class="txt_span">{{showCreateTime}}</span>
                            </div>
                            </div>


                        </div>
                        <div class="text">

                        <div class="boxOnly" >
                            <div class="labelC">风险等级:</div>
                            <div class="text-box">
                                <span class="txt_span">{{riskLevel}}</span>
                            </div>
                        </div>

                        <div class="boxOnly">
                            <div class="labelC">风险定性:</div>
                            <div class="text-box">
                                <span class="txt_span">{{riskQualitative}}</span>
                            </div>
                        </div>

                        </div>
                        <div class="text">

                            <div class="boxOnly">
                            <div class="labelC">风险类型:</div>
                            <div class="text-box">
                                <span class="txt_span">{{riskType}}</span>
                            </div>
                            </div>

                            <div class="boxOnly">
                            <div class="labelC">管控状态:</div>
                            <div class="text-box">
                                <span class="txt_span">{{controlState}}</span>
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
                                    <el-popover trigger="hover" placement="right">
                                      {{ branchCompany }}
                                      <span class="txt_span" slot="reference">
                                      {{ branchCompany }}
                                      </span>
                                    </el-popover>
                                </div>
                            </div>

                            <div class="boxOnly" >
                                <div class="labelC">代理商编号:</div>
                                <div class="text-box">
                                    <el-popover trigger="hover" placement="right">
                                      {{ agentNum }}
                                      <span class="txt_span" slot="reference">
                                      {{ agentNum }}
                                      </span>
                                    </el-popover>
                                </div>
                            </div>

                            <div class="boxOnly" >
                                <div class="labelC">商户状态:</div>
                                <div class="text-box">
                                    <span class="txt_span">{{merchantActive}}</span>
                                </div>
                            </div>

                            <div class="boxOnly" >
                                <div class="labelC">法人姓名:</div>
                                <div class="text-box">
                                    <span class="txt_span">{{legalName}}</span>
                                </div>
                            </div>

                            <div class="boxOnly" >
                                <div class="labelC">联系人电话:</div>
                                <div class="text-box">
                                    <el-popover trigger="hover" placement="right">
                                    {{ contactPhone }}
                                    <span class="txt_span" slot="reference">
                                    {{ _contactPhone }}
                                    </span>
                                    </el-popover>
                                </div>
                            </div>

                            <div class="boxOnly" >
                                <div class="labelC">入网时间:</div>
                                <div class="text-box">
                                    <span class="txt_span">{{networkTime}}</span>
                                </div>
                            </div>

                        </div>
                        <div class="text">

                        <div class="boxOnly" >
                            <div class="labelC">商户编号:</div>
                            <div class="text-box">
                                <span class="txt_span">{{merchantId}}</span>
                            </div>
                        </div>

                        <div class="boxOnly" >
                            <div class="labelC">代理商名称:</div>
                            <div class="text-box">
                                <el-popover trigger="hover" placement="right">
                                  {{ agentName }}
                                  <span class="txt_span" slot="reference">
                                  {{ agentName }}
                                  </span>
                                </el-popover>
                            </div>
                        </div>

                        <div class="boxOnly" >
                            <div class="labelC">营业执照号:</div>
                            <div class="text-box">
                                <span class="txt_span">{{businessLicense}}</span>
                            </div>
                        </div>

                        <div class="boxOnly" >
                            <div class="labelC">法人证件类型:</div>
                            <div class="text-box">
                                <span class="txt_span">{{legalPaperWorkType}}</span>
                            </div>
                        </div>

                        <div class="boxOnly" >
                            <div class="labelC">联系人邮箱:</div>
                            <div class="text-box">
                                <el-popover trigger="hover" placement="right">
                                {{ contactEmail }}
                                <span class="txt_span" slot="reference">
                                {{ _contactEmail }}
                                </span>
                                </el-popover>
                            </div>
                        </div>

                        <div class="boxOnly" >
                            <div class="labelC">结算账户名:</div>
                            <div class="text-box">
                                <span class="txt_span">{{settleAccounts}}</span>
                            </div>
                        </div>

                        </div>
                        <div class="text">

                        <div class="boxOnly" >
                            <div class="labelC">商户签约名称:</div>
                            <div class="text-box">
                                <span class="txt_span">{{merchantSign}}</span>
                            </div>
                        </div>

                        <div class="boxOnly" >
                            <div class="labelC">销售:</div>
                            <div class="text-box">
                                <span class="txt_span">{{sale}}</span>
                            </div>
                        </div>

                        <div class="boxOnly" >
                            <div class="labelC">注册资本:</div>
                            <div class="text-box">
                                <span class="txt_span">{{registeredCapital}}</span>
                            </div>
                        </div>

                        <div class="boxOnly" >
                            <div class="labelC">法人证件号码:</div>
                            <div class="text-box">
                                <el-popover trigger="hover" placement="right">
                                {{ legalPaperWorkNum }}
                                <span class="txt_span" slot="reference">
                                {{ _legalPaperWorkNum }}
                                </span>
                                </el-popover>
                            </div>
                        </div>

                        <div class="boxOnly" >
                            <div class="labelC">商户省份:</div>
                            <div class="text-box">
                                <span class="txt_span">{{merchantProvince}}</span>
                            </div>
                        </div>

                        <div class="boxOnly" >
                            <div class="labelC">结算银行卡:</div>
                            <div class="text-box">
                                <el-popover trigger="hover" placement="right">
                                {{ settleBankCard }}
                                <span class="txt_span" slot="reference">
                                {{ _settleBankCard }}
                                </span>
                                </el-popover>
                            </div>
                        </div>

                        </div>
                        <div class="text">

                        <div class="boxOnly" >
                            <div class="labelC">MCC:</div>
                            <div class="text-box">
                                <span class="txt_span">{{mcc}}</span>
                            </div>
                        </div>

                        <div class="boxOnly" >
                            <div class="labelC">商户类型:</div>
                            <div class="text-box">
                                <span class="txt_span">{{merchantType}}</span>
                            </div>
                        </div>

                        <div class="boxOnly" >
                            <div class="labelC">收款账户性质:</div>
                            <div class="text-box">
                                <span class="txt_span">{{receiptAccountNature}}</span>
                            </div>
                        </div>

                        <div class="boxOnly" >
                            <div class="labelC">联系人:</div>
                            <div class="text-box">
                                <span class="txt_span">{{contactName}}</span>
                            </div>
                        </div>

                        <div class="boxOnly" >
                            <div class="labelC">商户城市:</div>
                            <div class="text-box">
                                <span class="txt_span">{{merchantCity}}</span>
                            </div>
                        </div>

                        <div class="boxOnly" >
                            <div class="labelC">商户唯一标识:</div>
                            <div class="text-box">
                                <span class="txt_span">{{merchantUniqueId}}</span>
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
                                <span class="txt_span">{{terminalNum}}</span>
                            </div>
                        </div>

                        <div class="boxOnly">
                            <div class="labelC">终端状态:</div>
                            <div class="text-box">
                                <span class="txt_span">{{terminalState}}</span>
                            </div>
                        </div>

                        </div>
                        <div class="text">

                            <div class="boxOnly" >
                            <div class="labelC">终端机型:</div>
                            <div class="text-box">
                                <span class="txt_span">{{terminalModel}}</span>
                            </div>
                            </div>

                        </div>
                        <div class="text">

                        <div class="boxOnly" >
                            <div class="labelC">安装地点:</div>
                            <div class="text-box">
                                <span class="txt_span">{{installationSite}}</span>
                            </div>
                        </div>

                        </div>
                        <div class="text">

                            <div class="boxOnly">
                            <div class="labelC">柜台电话:</div>
                            <div class="text-box">
                                <span class="txt_span">{{counterTelephone}}</span>
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
                                <el-popover trigger="hover" placement="right">
                                {{ merchantOrder }}
                                <span class="txt_span" slot="reference">
                                {{ merchantOrder }}
                                </span>
                                </el-popover>
                            </div>
                        </div>

                        <div class="boxOnly">
                            <div class="labelC">交易类型:</div>
                            <div class="text-box">
                                <span class="txt_span">{{transactionType}}</span>
                            </div>
                        </div>

                        <div class="boxOnly">
                            <div class="labelC">发卡行:</div>
                            <div class="text-box">
                                <span class="txt_span">{{issuingBank}}</span>
                            </div>
                        </div>

                            <div class="boxOnly">
                            <div class="labelC">交易终端号:</div>
                            <div class="text-box">
                                <el-popover trigger="hover" placement="right">
                                {{ transactionTerminalNum }}
                                <span class="txt_span" slot="reference">
                                {{ transactionTerminalNum }}
                                </span>
                                </el-popover>
                            </div>
                            </div>

                        </div>
                        <div class="text">

                            <div class="boxOnly" >
                            <div class="labelC">易宝交易流水号:</div>
                            <div class="text-box">
                                <el-popover trigger="hover" placement="right">
                                {{ transactionalNumber }}
                                <span class="txt_span" slot="reference">
                                {{ transactionalNumber }}
                                </span>
                                </el-popover>
                            </div>
                            </div>

                            <div class="boxOnly">
                            <div class="labelC">交易卡号:</div>
                            <div class="text-box">
                                <el-popover trigger="hover" placement="right">
                                {{ transactionCard }}
                                <span class="txt_span" slot="reference">
                                {{ _transactionCard }}
                                </span>
                                </el-popover>
                            </div>
                            </div>

                            <div class="boxOnly">
                            <div class="labelC">应答码:</div>
                            <div class="text-box">
                                <span class="txt_span">{{replyCode}}</span>
                            </div>
                            </div>

                        </div>
                        <div class="text">

                            <div class="boxOnly" >
                            <div class="labelC">交易时间:</div>
                            <div class="text-box">
                                <span class="txt_span">{{showTransactionTime}}</span>
                            </div>
                            </div>

                            <div class="boxOnly">
                            <div class="labelC">卡类型:</div>
                            <div class="text-box">
                                <span class="txt_span">{{cardType}}</span>
                            </div>
                            </div>

                            <div class="boxOnly">
                            <div class="labelC">授权号:</div>
                            <div class="text-box">
                                <span class="txt_span">{{authorizationNum}}</span>
                            </div>
                            </div>

                        </div>
                        <div class="text">

                            <div class="boxOnly" >
                            <div class="labelC">交易金额:</div>
                            <div class="text-box">
                                <span class="txt_span">{{transactionMoney}}</span>
                            </div>
                            </div>

                            <div class="boxOnly">
                            <div class="labelC">卡介质:</div>
                            <div class="text-box">
                                <span class="txt_span">{{cardMedia}}</span>
                            </div>
                            </div>

                            <div class="boxOnly">
                            <div class="labelC">系统参考号:</div>
                            <div class="text-box">
                                <span class="txt_span">{{sysReferenceNum}}</span>
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
                            prop="ruleCode"
                            label="规则编号"
                            align='center'>
                            </el-table-column>
                            <el-table-column
                            prop="ruleContent"
                            label="规则名称"
                            align='center'>
                            </el-table-column>
                            <el-table-column
                            prop="riskTypeStr"
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
                            layout="total, prev, pager, next"
                            :total=totalSize

                            :current-page.sync="currentPage"
                            @current-change="handleCurrentChange"
                            :page-sizes="[10, 20, 30, 40]"
                            style="display: inline-block;float: right;margin-bottom: 15px;margin-top: 15px;">
                        </el-pagination>
                    </div>
                </div>
                <hr class="hr">

                <!-- <div class="divHead">
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
                            label="快照">
                            <template slot-scope="scope">
                                <el-button @click="snapshotView()" type="text" size="small" v-if="viewDetailPermission">查看</el-button>
                            </template>
                            </el-table-column>
                        </el-table>
                        <el-pagination
                            layout="prev, pager, next"
                            :total="50"
                            :current-page.sync="currentPage2"
                             @current-change="handleCurrentChange2"
                            style="display: inline-block;float: right;margin-bottom: 15px;margin-top: 15px;">
                        </el-pagination>
                    </div>
                </div> -->
            </div>
             <!--调查信息  -->
            <div v-show="surveyInformationCon">
                <div class="divHead">
                        <span class="rideus"></span>
                        <span class='rideusText'>调查情况</span>
                        <div class="contentBotoom" style="float:right;margin-right:30px;">
                            <div class="button" v-if='editShowTrue === false'>
                                <div class="leftButton clear">
                                    <div class="BotoomBtn leftRadius" title='派发' @click='distribute = true' v-if="distributePermission">
                                        <div class="icon3"></div>
                                    </div>
                                    <div class="BotoomBtn" title='处理' @click='handleClick' v-if="dealPermission">
                                        <div class="icon4"></div>
                                    </div>
                                    <div class="BotoomBtn rightRadius" title='审核' @click='verifyDialog = true' v-if="checkPermission">
                                        <div class="sp"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="button" v-if='editShowTrue === true'>
                                <el-button type="primary" round>提交审核</el-button>
                                <!-- <el-button type="primary" round>代理商回退</el-button> -->
                            </div>
                        </div>
                        <div class="divContent">
                            <div class="text"  style="width:25%">
                                <div class="boxOnly" >
                                    <div class="labelC textborder">是否调取签购单:</div>
                                    <div class="text-box" v-if='editShowTrue === false'>
                                        <el-input    readonly="readonly"  v-model='isRecallPurorderStr'></el-input>
                                    </div>
                                    <div class="text-box" v-if='editShowTrue === true'>
                                        <el-select v-model="value" placeholder="请选择" @focus="getRetrieveList">
                                            <el-option :label='item.sysname' :value='item.sysconid' v-for='(item,index) in retrieveList' :key='index'></el-option>


                                        </el-select>
                                    </div>
                                </div>
                                <div class="boxOnly" >
                                    <div class="labelC textborder">
                                        <span class='starColorChange' v-if='editShowTrue === true'>*</span>调单方式:</div>
                                    <div class="text-box" v-if='editShowTrue === false'>
                                        <el-input  readonly v-model="recallWayStr" ></el-input>
                                    </div>
                                    <div class="text-box" v-if='editShowTrue === true'>
                                        <el-select v-model="value" placeholder="请选择" @focus='getOrderWay'>
                                            <el-option :label='item.sysname' :value='item.sysconid' v-for='(item,index) in orderWayList' :key='index'></el-option>

                                        </el-select>
                                    </div>
                                </div>
                                <div class="boxOnly" >
                                    <div class="labelC textborder">
                                        <span class='starColorChange' v-if='editShowTrue === true'>*</span>
                                        处理措施建议:
                                    </div>
                                    <div class="text-box" v-if='editShowTrue === false'>
                                        <el-input  readonly v-model="treatmentMeasuresStr" ></el-input>
                                    </div>
                                    <div class="text-box" v-if='editShowTrue === true'>
                                        <el-select v-model="value" placeholder="请选择" @focus="getMeasureSuggest">
                                            <el-option :label='item.sysname' :value='item.sysconid' v-for='(item,index) in measureSuggestList' :key='index'></el-option>

                                        </el-select>
                                    </div>
                                </div>
                                <div class="boxOnly" >
                                    <div class="labelC textborder">
                                        <span class='starColorChange' v-if='editShowTrue === true'>*</span>
                                        风险性质建议:
                                    </div>
                                    <div class="text-box" v-if='editShowTrue === false'>
                                        <el-input readonly="readonly"   style="margin-bottom: 20px;"  v-model="riskNatureStr">
                                        </el-input>
                                    </div>
                                    <div class="text-box" v-if='editShowTrue === true'>
                                        <el-select v-model="value" placeholder="请选择">
                                            <el-option label='无风险' value='无风险'></el-option>
                                            <el-option label='有风险隐患' value='有风险隐患'></el-option>
                                            <el-option label='有风险' value='有风险'></el-option>
                                        </el-select>
                                    </div>
                                </div>
                            </div>
                            <div class="text" style="width:25%">
                                <div class="boxOnly" >
                                    <div class="labelC textborder">
                                        <span class='starColorChange' v-if='editShowTrue === true'>*</span>
                                        签购单是否合规:
                                    </div>
                                    <div class="text-box" v-if='editShowTrue === false'>
                                        <el-input   v-model="purorderIsauthorizedStr" readonly="readonly"></el-input>
                                    </div>
                                    <div class="text-box" v-if='editShowTrue === true'>
                                        <el-select v-model="value" placeholder="请选择" @focus="getOrderCompliance">
                                            <el-option :label='item.sysname' :value='item.sysconid' v-for='(item,index) in orderCompliance' :key='index'></el-option>
                                            <!-- <el-option label='否' value='否'></el-option> -->

                                        </el-select>
                                    </div>
                                </div>

                                <div class="boxOnly" >
                                    <div class="labelC textborder">签购单不合规原因:</div>
                                    <div class="text-box" v-if='editShowTrue === false'>
                                        <el-input  type="textarea" readonly="readonly" style="margin-bottom: 20px;" :rows="7" v-model="purorderFailReaseon">
                                        </el-input>
                                    </div>
                                    <div class="text-box"  v-if='editShowTrue === true'>
                                        <el-input  type="textarea"  style="margin-bottom: 20px;" :rows="7" v-model="ceshi">
                                        </el-input>
                                    </div>
                                </div>
                            </div>
                            <div class="text" style="width:25%">
                                <div class="boxOnly" >
                                    <div class="labelC textborder">
                                        <span class='starColorChange' v-if='editShowTrue === true'>*</span>
                                        其他单据数量:
                                    </div>
                                    <div class="text-box" v-if='editShowTrue === false'>
                                        <el-input   v-model="otherInvoiceNum" readonly="readonly"></el-input>
                                    </div>
                                    <div class="text-box"  v-if='editShowTrue === true'>
                                        <el-input type='number'  :min='0' ></el-input>
                                    </div>
                                </div>

                                <div class="boxOnly" >
                                    <div class="labelC textborder">其他单据说明:</div>
                                    <div class="text-box" v-if='editShowTrue === false'>
                                        <el-input  type="textarea" readonly="readonly" style="margin-bottom: 20px;" :rows="7" v-model="otherInvoiceDirection">
                                        </el-input>
                                    </div>
                                    <div class="text-box" v-if='editShowTrue === true'>
                                        <el-input  type="textarea"  style="margin-bottom: 20px;" :rows="7" v-model="ceshi">
                                        </el-input>
                                    </div>

                                </div>
                            </div>
                            <div class="text" style="width:23%">

                                <div class="boxOnly" >
                                    <div class="labelC textborder">
                                        <span class='starColorChange' v-if='editShowTrue === true'>*</span>
                                        调单情况说明:
                                    </div>
                                    <div class="text-box" v-if='editShowTrue === false'>
                                        <el-input  type="textarea" readonly="readonly" style="margin-bottom: 20px;" :rows="9" v-model="orderInstructions">
                                        </el-input>
                                    </div>
                                    <div class="text-box" v-if='editShowTrue === true'>
                                        <el-input  type="textarea"  style="margin-bottom: 20px;" :rows="9" v-model="ceshi">
                                        </el-input>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flootText" v-if="billPermission">
                            <el-button  type="primary" round class="leftBtn" style="margin-right:10px;margin-left:10px;height: 36px;line-height: 12px;" @click="getBill">查看单据</el-button>
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
                                        <span class='starColorChange' v-if='editShowTrue === true'>*</span>
                                        风险定性:
                                    </div>
                                    <div class="text-box" v-if='editShowTrue === false'>
                                        <el-input   v-model="riskQualitativeStr" readonly="readonly"></el-input>
                                    </div>
                                    <div class="text-box" v-if='editShowTrue === true'>
                                        <el-select v-model="value" placeholder="请选择">
                                            <el-option label='无风险' value='无风险'></el-option>
                                            <el-option label='有风险隐患' value='有风险隐患'></el-option>
                                            <el-option label='有风险' value='有风险'></el-option>
                                        </el-select>
                                    </div>
                                </div>
                                <div class="boxOnly" >
                                    <div class="labelC textborder">
                                        <span class='starColorChange' v-if='editShowTrue === true'>*</span>
                                        风险程度:
                                    </div>
                                    <div class="text-box" v-if='editShowTrue === false'>
                                        <el-input  readonly v-model="riskDegreeStr"></el-input>
                                    </div>
                                    <div class="text-box" v-if='editShowTrue === true'>
                                        <el-select v-model="value" placeholder="请选择">
                                            <el-option label='低风险' value='低风险'></el-option>
                                            <el-option label='中风险' value='中风险'></el-option>
                                            <el-option label='高风险' value='高风险'></el-option>
                                            <el-option label='超高风险' value='超高风险'></el-option>
                                        </el-select>
                                    </div>
                                </div>
                                <div class="boxOnly" >
                                    <div class="labelC textborder">
                                        <span class='starColorChange' v-if='editShowTrue === true'>*</span>
                                        风险类型:
                                    </div>
                                    <div class="text-box" v-if='editShowTrue === false'>
                                        <el-input  readonly v-model="riskTypeStr"></el-input>
                                    </div>
                                    <div class="text-box" v-if='editShowTrue === true'>
                                        <el-select v-model="value" placeholder="请选择">
                                            <el-option label='洗卡' value='洗卡'></el-option>
                                            <el-option label='盗单' value='盗单'></el-option>

                                        </el-select>
                                    </div>
                                </div>
                            </div>
                            <div class="text" style="width:67%">
                                <div class="boxOnly" >
                                    <div class="labelC textborder" style="width:16%">结案陈词:</div>
                                    <div class="text-box" style="width:67%" v-if='editShowTrue === false'>
                                        <el-input  type="textarea" readonly="readonly"  style="margin-bottom: 20px;" :rows="6" v-model="closingArguments">
                                        </el-input>
                                    </div>
                                    <div class="text-box" style="width:67%" v-if='editShowTrue === true'>
                                        <el-input  type="textarea"   style="margin-bottom: 20px;" :rows="6" v-model="ceshi">
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
                                    <div class="text-box" v-if='editShowTrue === false'>
                                        <el-input   v-model="processingSituationStr" readonly="readonly"></el-input>
                                    </div>
                                    <div class="text-box"  v-if='editShowTrue === true'>
                                        <el-select v-model="value" placeholder="请选择">
                                            <el-option label='注销商户' value='注销商户'></el-option>
                                            <el-option label='关闭交易' value='关闭交易'></el-option>
                                            <el-option label='暂缓资金' value='暂缓资金'></el-option>
                                            <el-option label='冻结账户' value='冻结账户'></el-option>
                                            <el-option label='风险可控' value='风险可控'></el-option>
                                        </el-select>
                                    </div>

                                </div>
                            </div>
                            <div class="text" style="width: 100%;display: block;float: none;">
                                <div class="boxOnly" >
                                    <div class="labelC textborder" style="width: 8%;margin-left: 1%;">其他处理说明:</div>
                                    <div class="text-box" v-if='editShowTrue === false'>
                                        <el-input  readonly="readonly" type="textarea" :rows="5" v-model="otherProcessInstructions" style="width: 153%;margin-bottom: 20px;">
                                        </el-input>
                                    </div>
                                    <div class="text-box"  v-if='editShowTrue === true'>
                                        <el-input   type="textarea" :rows="5" v-model="ceshi" style="width: 153%;margin-bottom: 20px;">
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

        <el-input type='textarea' v-model='reprieveDesc' :rows='10' class='reprieveTextarea' placeholder="限制50字" :maxlength='50'></el-input>


        <span slot="footer" class="dialog-footer">
            <el-button @click="reprieveDialog = false">取 消</el-button>
            <el-button type="primary" @click='reprieveSave'>确 定</el-button>
        </span>
    </el-dialog>
     <!-- 解缓交易资金 -->
    <el-dialog title="交易资金解缓" :visible.sync="solwDownDialog" width="400px">

        <el-input type='textarea' v-model='solwDownDesc' :rows="10" class='reprieveTextarea' placeholder="限制50字" :maxlength='50'></el-input>


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
                <el-select v-model="verifyDialogForm.region" style='width:88%' @focus='getVerifyList'>
                    <el-option :label="item.sysname" :value="item.sysconid" v-for='(item,index) in verifyList' :key='index'></el-option>

                </el-select>
            </el-form-item>
            <el-form-item label="备注:">
                <el-input type='textarea' v-model='verifyDialogForm.desc' style='width:90%' placeholder="限制150字" :maxlength="150" :rows='6'></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="verifyDialog = false">取 消</el-button>
            <el-button type="primary" @click='verifySave'>确 定</el-button>
        </span>
    </el-dialog>
    <!-- 派发 -->
    <el-dialog title="派发" :visible.sync="distribute" width="370px">
        <el-form :inline="true" :model="distributeForm" class="demo-form-inline"  label-width="100px">
            <el-form-item label="派发至:">
                <el-select v-model="distributeForm.region" style='width:88%' @focus='getdistribute'>
                    <el-option :label="item.mechname" :value="item.mechid" v-for='(item,index) in distributeList' :key='index'></el-option>

                </el-select>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="distribute = false">取 消</el-button>
            <el-button type="primary" @click='distributeBtn'>确 定</el-button>
        </span>
    </el-dialog>

      <!-- 查看单据 -->
    <el-dialog title="核查单单据" :visible.sync="BillDialogVisible" width="750px">
        <ul class='el-upload-list' style='float:left' id="uploadUL">
            <li class="el-upload-list-li" style="float:left;" v-for="item in billImageList">
                <img :src="item.url" :name="item.name" style="width:140px;height:140px;margin-left:20px;"/>
                <!-- <i :src="item.url" :name="item.name" @click="deleteView" id="deleteItem">删除</i> -->
            </li>
        </ul>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="BillDialogVisible = false; billImageList = [];">确 定</el-button>
        </span>
    </el-dialog>

  </div>
</template>
<script>
import qs from 'qs'
import {idCard, phone, card, email} from '../utils/index.js'
export default {
      data() {
        return {
            viewDetailPermission: false,//查看详情
            controllPermission: true,//管控
            blackPermission: true,//一键加黑
            casePermission: true,//生成案件
            managePermission: true,//商户管理
            distributePermission: true,//派发
            dealPermission: true,//处理
            checkPermission: true,//审核
            billPermission: true,//查看单据
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
            isRecallPurorderStr:'',
            purorderIsauthorizedStr:'',
            recallWayStr:'',
            treatmentMeasuresStr:'',
            riskNatureStr:'',
            purorderFailReaseon:'',
            otherInvoiceNum:'',
            otherInvoiceDirection:'',
            orderInstructions:'',
            riskQualitativeStr:'',
            riskDegreeStr:'',
            riskTypeStr:'',
            closingArguments:'',
            processingSituationStr:'',
            otherProcessInstructions:'',
            controlList:[],
            retrieveList:[],
            measureSuggestList:[],
            orderWayList:[],
            verifyList:[],
            distribute:false,
            distributeForm:{},
            distributeList:[],
            controlState:'',
            merchantId:'',
            transactionMoney:'',

            // 详情
           checkId:'',
           checkCode:'',
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
           _legalPaperWorkNum: '',
           contactName :'',
           contactPhone :'',
           _contactPhone: '',
           contactEmail :'',
           _contactEmail: '',
           merchantProvince :'',
           merchantCity :'',
           networkTime :'',
           settleAccounts :'',
           settleBankCard :'',
           _settleBankCard: '',
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
           _transactionCard: '',
           cardType :'',
           cardMedia :'',
           issuingBank :'',
           replyCode :'',
           authorizationNum :'',
           sysReferenceNum:'',
           transactionTerminalNum :'',
           currentPage2:1,
           currentPage:1,
           pageNum:1,
           ruleControlTableData:[],
           totalSize:0,
           pageSize:10,
           totalPage:0,
           scenesCode:'',
           controlStateID:'',
           BillDialogVisible: false,
            billImageList: []
        }
      },
      created() {
        // 按钮权限
        const idList = JSON.parse(localStorage.getItem('ARRLEVEL'));
        this.controllPermission = idList.indexOf(72) === -1 ? false : true;
        this.blackPermission = idList.indexOf(78) === -1 ? false : true;
        this.casePermission = idList.indexOf(79) === -1 ? false : true;
        this.managePermission = idList.indexOf(70) === -1 ? false : true;
        this.distributePermission = idList.indexOf(67) === -1 ? false : true;
        this.dealPermission = idList.indexOf(68) === -1 ? false : true;
        this.checkPermission = idList.indexOf(69) === -1 ? false : true;
        this.billPermission = idList.indexOf(261) === -1 ? false : true;
        this.viewDetailPermission = idList.indexOf(321) === -1 ? false : true;
      },
      methods:{
          getBill () {
            this.$axios.post('/OfflineChecklistController/downloadInvoice', qs.stringify({
                id: window.location.href.split('?')[1]
            }))
            .then(res => {
                if(res.data.code == 1){
                    this.BillDialogVisible = true;
                    this.billImageList = res.data.pics;
                } else {
                    this.$alert(res.data.message);
                }
            })
            .catch(error => {
                this.$alert(error);
            });
          },
        snapshotView(row){
            window.open(window.location.href.split('#')[0] + '#/snapshotView?' + window.location.href.split('?')[1])
        },
        surveyInformation(){
            this.estInformationCon = false;
            this.surveyInformationCon = true;
            if(this.surveyInformationCon === true){
                 document.querySelector('.rightContentActive').style.top = '290px'
            }
        },
        estInformation(){
            this.estInformationCon = true;
            this.surveyInformationCon = false;
            if(this.estInformationCon === true){
                document.querySelector('.rightContentActive').style.top = '129px'
            }
        },
        create(){
          window.open(window.location.href.split('#')[0] + '#/merchantRiskManagement')
        },
        merchantsStateChange(){
            console.log(this.merchantsState)
        },
        // 暂缓交易资金
        reprieveSave(){
            this.$axios.post('/OfflineChecklistController/updateControlState',qs.stringify({
                'sessionId':localStorage.getItem('SID'),
                'checkId':window.location.href.split('?')[1],
                'controlState':this.controlStateID,
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
                    this.$alert(res.data.message, '系统提示', {
                        confirmButtonText:'确定',
                        type:'success',
                        callback:action => {
                            this.reprieveDialog = false
                        }
                    })
                }else if(res.data.code !== 1){
                    this.$alert(res.data.message, '系统提示', {
                        confirmButtonText:'确定',
                        type:'warning',
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
             this.$axios.post('/OfflineChecklistController/updateControlState',qs.stringify({
                'sessionId':localStorage.getItem('SID'),
                'checkId':window.location.href.split('?')[1],
                'controlState':this.controlStateID,
                'controlMoney':this.transactionMoney,
                'merchantId':this.merchantId,
                'remark':this.solwDownDesc,
                'userId':localStorage.getItem('USERID'),
                'lineMech':localStorage.getItem('LINEMEID'),
                'merchantName':this.merchantName,
                'riskValue':this.riskScore
            }))
            .then(res => {
                if(res.data.code === 1){
                    this.$alert(res.data.message, '系统提示', {
                        confirmButtonText:'确定',
                        type:'success',
                        callback:action => {
                            this.solwDownDialog = false
                        }
                    })
                }else if(res.data.code !== 1){
                    this.$alert(res.data.message, '系统提示', {
                        confirmButtonText:'确定',
                        type:'warning',
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
            this.$axios.post('/OfflineChecklistController/updateControlState',qs.stringify({
                'sessionId':localStorage.getItem('SID'),
                'checkId':window.location.href.split('?')[1],
                'controlState':this.controlStateID,
                'controlMoney':this.transactionMoney,
                'merchantId':this.merchantId,
                'remark':this.reprieveBusiDesc,
                'userId':localStorage.getItem('USERID'),
                'lineMech':localStorage.getItem('LINEMEID'),
                'merchantName':this.merchantName,

            }))
            .then(res => {
                if(res.data.code === 1){
                    this.$alert(res.data.message, '系统提示', {
                        confirmButtonText:'确定',
                        type:'success',
                        callback:action => {
                            this.reprieveBusiDialog = false
                        }
                    })
                }else if(res.data.code !== 1){
                    this.$alert(res.data.message, '系统提示', {
                        confirmButtonText:'确定',
                        type:'warning',
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
           this.$axios.post('/OfflineChecklistController/updateControlState',qs.stringify({
                'sessionId':localStorage.getItem('SID'),
                'checkId':window.location.href.split('?')[1],
                'controlState':this.controlStateID,
                'controlMoney':this.transactionMoney,
                'merchantId':this.merchantId,
                'remark':this.solwDownBusiDesc,
                'userId':localStorage.getItem('USERID'),
                'lineMech':localStorage.getItem('LINEMEID'),
                'merchantName':this.merchantName,
                'riskValue':this.riskScore
            }))
            .then(res => {
                if(res.data.code === 1){
                    this.$alert(res.data.message, '系统提示', {
                        confirmButtonText:'确定',
                        type:'success',
                        callback:action => {
                            this.solwDownBusiDialog = false
                        }
                    })
                }else{
                    this.$alert(res.data.message, '系统提示', {
                        confirmButtonText:'确定',
                        type:'warning',
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
            let ids = []
            ids.push(window.location.href.split('?')[1])
            this.$axios.post('/OfflineChecklistController/updateVerify',qs.stringify({
                'sessionId':localStorage.getItem('SID'),
                'checkIds':ids,
                'checkStatus':this.verifyDialogForm.region,
                'remark':this.verifyDialogForm.desc,
                'userId':localStorage.getItem('USERID'),
            }))
            .then(res => {
                if(res.data.code === 1){
                    this.$alert(res.data.message, '系统提示', {
                        confirmButtonText: '确定',
                        type:'success',
                        callback:action=>{
                            this.verifyDialog = false
                        }
                    })
                }else{
                    this.$alert(res.data.message, '系统提示', {
                        confirmButtonText: '确定',
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
        // 派发下拉框获取
        getdistribute(){
            this.$axios.get('/OfflineChecklistController/queryLineMechmang?sessionId=' + localStorage.getItem('SID'))
            .then(res => {
                this.distributeList = res.data.recordList
                this.agencyID = res.data.recordList.mechid
            })
            .catch(error => {
                console.log(error)
            })
        },
        // 派发
        distributeBtn(){
             this.$axios.post('/OfflineChecklistController/distribute',qs.stringify({
              'sessionId':localStorage.getItem('SID'),
              'ids':window.location.href.split('?')[1],
              'agencyId':this.distributeForm.region,
              'userId':localStorage.getItem('USERID'),
            }))
            .then(res => {
                if(res.data.code == 1){
                    this.$alert(res.data.message, '系统提示', {
                        confirmButtonText:'确定',
                        type:'success',
                        callback:action=>{
                            this.distribute = false
                            this.distributeForm.region = ''
                        }
                    })
                }else{
                    this.$alert(res.data.message, '系统提示', {
                        confirmButtonText:'确定',
                        type:'warning',
                        callback:action => {

                        }
                    })
                }

            })
            .catch(error => {
                console.log(error)
            })
        },
        handleClick(){
              window.open(window.location.href.split('#')[0] + '#/dealwithoffline?' + window.location.href.split('?')[1])
              window.close()
        },
        // 管控下拉框获取
        controlStatus(){
            this.$axios.post('/SysConfigController/queryEnum',qs.stringify({
                'sessionId':localStorage.getItem('SID'),
                'type':63
            }))
            .then(res => {
                this.controlList = []
                this.controlList = this.controlList.concat(res.data)
            })
            .catch(error => {
                console.log(error)
            })
        },
        // 点击管控
        controlItemClick(val,id){
            this.controlStateID = id
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
        // 调查信息获取
        querySurveyInfo(){
            this.$axios.post('/OfflineChecklistController/querySurveyInfo',qs.stringify({
                'sessionId':localStorage.getItem('SID'),
                'checkId':window.location.href.split('?')[1],

            }))
            .then(res => {
                this.SurveyInfo = res.data
                this.isRecallPurorderStr = res.data.surveyInfo.isRecallPurorderStr
                this.purorderIsauthorizedStr = res.data.surveyInfo.purorderIsauthorizedStr
                this.recallWayStr = res.data.surveyInfo.recallWayStr
                this.treatmentMeasuresStr = res.data.surveyInfo.treatmentMeasuresStr
                this.riskNatureStr = res.data.surveyInfo.riskNatureStr
                this.purorderFailReaseon = res.data.surveyInfo.purorderFailReaseon
                this.otherInvoiceNum = res.data.surveyInfo.otherInvoiceNum
                this.otherInvoiceDirection = res.data.surveyInfo.otherInvoiceDirection
                this.orderInstructions = res.data.surveyInfo.orderInstructions

                this.riskQualitativeStr = res.data.surveyConclusion.riskQualitativeStr
                this.riskDegreeStr = res.data.surveyConclusion.riskDegreeStr
                this.riskTypeStr = res.data.surveyConclusion.riskTypeStr
                this.closingArguments = res.data.surveyConclusion.closingArguments

                this.processingSituationStr = res.data.processInfo.processingSituationStr
                this.otherProcessInstructions = res.data.processInfo.otherProcessInstructions
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
                this.retrieveList = []
                this.retrieveList = this.retrieveList.concat(res.data)
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
                this.measureSuggestList = []
                this.measureSuggestList = this.measureSuggestList.concat(res.data)
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
                this.orderWayList = []
                this.orderWayList = this.orderWayList.concat(res.data)
            })
            .catch(error => {
                console.log(error)
            })
        },
        // 签购单是否合规
        getOrderCompliance(){
            this.$axios.post('/SysConfigController/queryEnum',qs.stringify({
                'sessionId':localStorage.getItem('SID'),
                'type':68
            }))
            .then(res => {
                this.orderCompliance = []
                this.orderCompliance = this.orderCompliance.concat(res.data)
            })
            .catch(error => {
                console.log(error)
            })
        },
        // 审核
        getVerifyList(){
            console.log(111)
            this.$axios.post('/SysConfigController/queryEnum',qs.stringify({
                'sessionId':localStorage.getItem('SID'),
                'type':64
            }))
            .then(res => {
                this.verifyList = []
                this.verifyList = this.verifyList.concat(res.data)
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
                'stolenCardNumber':this.transactionCard,
                'businessLine':2,
                'userId':localStorage.getItem('USERID'),
                'transactionTime':this.showTransactionTime,
                OnLineOrdinaryDetailBean: JSON.stringify(this.offlineCheckDetail)
            })).then(res => {
                console.log(res.data)
                if(res.data.code === 1){
                    this.addBlackList()
                    // this.$alert(res.data.message, '系统提示', {
                    //     confirmButtonText:'确定',
                    //     type:'success',
                    //     callback:action=>{
                            
                    //     }
                    // })
                }
            })
            .catch(error => {
                console.log(error)
            })
        },
        // 触发规则详情
        getRuleControlList(){
            this.$axios.post('/RulesController/queryRulesByRuleId',qs.stringify({
                'sessionId':localStorage.getItem('SID'),
                'scenesCode':this.scenesCode.trim(),
                'detailType':2,
                'bankCard':this.settleBankCard,
                'checkId':this.checkId,
                'pageNum':this.pageNum,
                'pageSize':this.pageSize
            }))
            .then(res => {
                this.ruleControlTableData = []
                this.ruleControlTableData = this.ruleControlTableData.concat(res.data.recordList)
                this.totalSize = res.data.totalSize
            })
            .catch(error => {
                console.log(error)
            })
        },

        handleCurrentChange(val){
            console.log(val)
            this.pageNum = val
        },
        handleCurrentChange2(val){
            console.log(val)
        },
        // 风险程度
        // 一键加黑
        addBlackList(){
            let dataArr = []
            let data = {}
            data.bankCardNo = ''
            data.userPhone = ''
            data.userIp = ''
            data.idNo = ''
            data.terminalId = this.terminalNum // 终端号
            data.longitude = ''
            data.latitude = ''
            data.legalIdNo = this.legalPaperWorkType === '身份证' ? this.legalPaperWorkNum : ''
            data.linePhone = ''
            data.signName = this.merchantSign
            data.icp = ''
            data.bankCardNo = this.settleBankCard
            data.remitIdNo = ''
            data.contactPhone = ''
            data.otherIdNo = ''
            data.merchantLicence = this.businessLicense
            data.registMail = this.contactEmail
            data.merchantBindWebSite = ''
            dataArr.push(data)

            this.$axios.post('/changeName/changeName',qs.stringify({
                'source':753,
                'buttonType':'off_check_black',
                'data': JSON.stringify(dataArr),
                'loginPerson':sessionStorage.getItem('testName'),
            }))
            .then(res => {
                console.log(res.data)
                if(res.data.code === 200){
                    this.$alert(res.data.msg, '系统提示', {
                        confirmButtonText:'确定',
                        type:'success',
                        callback:action=>{

                        }
                    })
                }
            })
            .catch(error => {
                console.log(error)
            })
        }
      },
      mounted(){
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
            this.checkCode = res.data.checkInfo.checkCode
            this.riskScore = res.data.checkInfo.riskScore
            this.riskLevel = res.data.checkInfo.riskLevel
            this.riskType = res.data.checkInfo.riskType
            this.checkStatus = res.data.checkInfo.checkStatus
            this.showCreateTime = res.data.checkInfo.showCreateTime
            this.riskQualitative = res.data.checkInfo.riskQualitative
            this.controlState = res.data.checkInfo.controlState
            this.showFinishTime = res.data.checkInfo.showFinishTime
            if (res.data.merchantInfo) {
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
                if (res.data.merchantInfo.contactPhone) {
                    this._contactPhone = phone(res.data.merchantInfo.contactPhone)
                }
                if (res.data.merchantInfo.contactEmail) {
                    this._contactEmail = email(res.data.merchantInfo.contactEmail)
                }
                if (res.data.merchantInfo.legalPaperWorkNum) {
                    this._legalPaperWorkNum = idCard(res.data.merchantInfo.legalPaperWorkNum)
                }
                if (res.data.merchantInfo.settleBankCard) {
                    this._settleBankCard = card(res.data.merchantInfo.settleBankCard)
                }
            }
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
            this.scenesCode = res.data.checkInfo.scenesCode
            if (res.data.transaction.transactionCard) {
                this._transactionCard = card(res.data.transaction.transactionCard)
            }

            this.getRuleControlList()
        })
        .catch(error => {
            console.log(error)
        })
        this.querySurveyInfo()

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
          }
      }
    }
</script>
<style scoped>
.text-box span.txt_span{
    font-size: 13px;
    text-align: left;
    color: #333;
    margin-left: 13px;
    float: left;
    display: block;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.textborder{
    margin-right: 15px;
}
.leftContent{
    width:97%;
    float: left;
    /* border-right: 1px solid #E0E0E0; */
    box-sizing: border-box;
}
.rightContent{
    position: relative;
    box-sizing: border-box;
    height: 100%;
    width: 3%;
    float:left;
    text-align: center;
}
.rightContentActive{
    height:130px;
    width:4px;
    background-color: rgb(63, 170, 249);
    position:absolute;
    right: 4.7%;
    top: 129px;
    transition: all 0.5s;
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
  width: 60%;
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
</style>
