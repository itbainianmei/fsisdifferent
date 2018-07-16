<!--线上核查单管理-->
<template>
    <div>
        <el-form ref="form" :model="form" label-width="110px" :rules="rules" class="demo-ruleForm">
            <div class="searchBasic">
                <div class="title" @click="serchToggleC" style="cursor:pointer">
                    <i class="el-icon-arrow-down toggleIcon" id="ordinarySerch"></i>
                    <span>基础查询</span>
                </div>
                <el-collapse-transition>
                    <div class="searchContentgray" id="searchContentgray" v-show="serchToggle">
                        <div class="leftContent" >
                            <!-- <el-form ref="form" :model="form" label-width="100px" :rules="rules" class="demo-ruleForm"> -->
                                <div class="formConClass">
                                    <el-form-item label="交易开始时间:" prop="jyStartTime">
                                        <el-date-picker  v-model="form.jyStartTime"
                                        type="datetime"
                                        placeholder="选择日期时间"
                                        style="width: 90%;max-width:225px;"
                                        value-format='yyyy-MM-dd HH:mm:ss'></el-date-picker>
                                    </el-form-item>
                                </div>
                                <div class="formConClass">
                                    <el-form-item label="交易结束时间:" prop="jyEndTime">
                                        <el-date-picker
                                        v-model="form.jyEndTime"
                                        type="datetime"
                                        placeholder="选择日期时间"
                                        style="width: 90%;max-width:225px;"
                                        value-format='yyyy-MM-dd HH:mm:ss'></el-date-picker>
                                    </el-form-item>
                                </div>
                                <div class="formConClass">
                                    <el-form-item label="业务线:" prop="yewuLine">
                                        <el-select v-model="form.yewuLine" placeholder="请选择" style="width: 90%;max-width:225px;" @focus="getBusiList">
                                            <el-option :label="item.sysname" :value="item.sysconid" v-for='(item,index) in busiList' :key='index'></el-option>

                                        </el-select>
                                    </el-form-item>
                                </div>
                                <div class="formConClass">
                                    <el-form-item label="操作开始时间:" prop="ccStartTime">
                                        <el-date-picker
                                        v-model="form.ccStartTime"
                                        type="datetime"
                                        placeholder="选择日期时间"
                                        style="width: 90%;max-width:225px;"
                                        value-format='yyyy-MM-dd HH:mm:ss'></el-date-picker>
                                    </el-form-item>
                                </div>
                                <div class="formConClass">
                                    <el-form-item label="操作结束时间:" prop="ccEndTime">
                                        <el-date-picker
                                        v-model="form.ccEndTime"
                                        type="datetime"
                                        placeholder="选择日期时间"
                                        style="width: 90%;max-width:225px;"
                                        value-format='yyyy-MM-dd HH:mm:ss'></el-date-picker>
                                    </el-form-item>
                                </div>
                                <div class="formConClass">
                                    <el-form-item label="产品:" prop="product">
                                        <el-select v-model="form.product" placeholder="请选择" style="width: 90%;max-width:225px;" @focus="getProductList">
                                             <el-option :label="item.sysname" :value="item.sysconid" v-for='(item,index) in productList' :key='index'></el-option>

                                        </el-select>
                                    </el-form-item>
                                </div>
                                <div class="formConClass">
                                    <el-form-item label="商户编号:" prop="merchantCode">
                                        <el-input v-model="form.merchantCode" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                    </el-form-item>
                                </div>
                                <div class="formConClass">
                                    <el-form-item label="持卡人手机号:" prop="humNumber">
                                        <el-input v-model="form.humNumber" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                    </el-form-item>
                                </div>
                                <div class="formConClass">
                                    <el-form-item label="银行卡号:" prop="creditCardNumbers">
                                        <el-input v-model="form.creditCardNumbers" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                    </el-form-item>
                                </div>
                                <div class="formConClass">
                                    <el-form-item label="商户订单号:" prop="MerchantsOrder">
                                        <el-input v-model="form.MerchantsOrder" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                    </el-form-item>
                                </div>
                                <div class="formConClass">
                                    <el-form-item label="外呼状态:" prop="outbound">
                                        <el-select v-model="form.outbound" placeholder="请选择" style="width: 90%;max-width:225px;" @focus="getOutboundList">
                                               <el-option :label="item.sysname" :value="item.sysconid" v-for='(item,index) in outboundList' :key='index'></el-option>

                                        </el-select>
                                    </el-form-item>
                                </div>
                                <div class="formConClass">
                                    <el-form-item label="处理人员:" prop="personnel">
                                        <el-select v-model="form.personnel" placeholder="请选择" style="width: 90%;max-width:225px;" @focus="getPersonList">
                                           <el-option :label="item.userName" :value="item.userId" v-for='(item,index) in personList' :key='index'></el-option>

                                        </el-select>
                                    </el-form-item>
                                </div>
                            <!-- </el-form> -->
                        </div>
                         <div class='rightContent divserchbtn' style='display:inline-block'>
                            <el-button type="primary" class="serchbtn" icon="el-icon-search" style="margin-top: 82px;" @click="serch" v-if="searchPermission1"></el-button>
                            <el-button type="primary" class="serchbtn" icon="el-icon-refresh" @click="refresh"></el-button>
                        </div>
                    </div>
                </el-collapse-transition>
            </div>
            <div class="seniorSearch" v-if="searchPermission2">
                <div class="title" style="cursor:pointer"  @click="seniorSearchToggleC">
                    <i class="el-icon-arrow-down toggleIcon" id="advancedSerch"></i>
                    <span >高级查询</span>
                </div>
                <el-collapse-transition>
                    <div class="seniorSearchContent activeToggle" v-show="seniorSearchToggle">
                        <div class="leftContent" >
                            <!-- <el-form ref="form" :model="form" label-width="100px" :rules="rules" class="demo-ruleForm"> -->
                                <div class="formConClass">
                                    <el-form-item label="风险等级:" prop="riskLevel">
                                        <el-select v-model="form.riskLevel" placeholder="请选择" style="width: 90%;max-width:225px;" @focus="getRiskLevelList">
                                             <el-option :label="item.sysname" :value="item.sysconid" v-for='(item,index) in riskLevelList' :key='index'></el-option>

                                        </el-select>
                                    </el-form-item>
                                </div>
                                <div class="formConClass">
                                    <el-form-item label="风险分数:">
                                        <el-input v-model="form.riskScoreLeft" placeholder="请输入" style="width:39%;max-width:98px" ></el-input>
                                        <span>至</span>
                                        <el-input v-model="form.riskScoreRight" placeholder="请输入" style="width:39%;max-width:98px" ></el-input>
                                    </el-form-item>
                                </div>
                                <div class="formConClass">
                                    <el-form-item label="核查状态:" prop="checkStatus">
                                        <el-select v-model="form.checkStatus" placeholder="请选择" style="width: 90%;max-width:225px;" @focus="getCheckStatusList">
                                            <el-option :label="item.sysname" :value="item.sysconid" v-for='(item,index) in checkStatuslList' :key='index'></el-option>

                                        </el-select>
                                    </el-form-item>
                                </div>
                                <div class="formConClass">
                                    <el-form-item label="规则编码:" prop="scenesCode">
                                        <el-input v-model="form.scenesCode" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                    </el-form-item>
                                </div>
                                <div class="formConClass">
                                    <el-form-item label="服务状态:" prop="serviceStatus">
                                        <el-select v-model="form.serviceStatus" placeholder="请选择" style="width: 90%;max-width:225px;" @focus="getServiceStatusList">
                                            <el-option :label="item.sysname" :value="item.sysconid" v-for='(item,index) in serviceStatusList' :key='index'></el-option>

                                        </el-select>
                                    </el-form-item>
                                </div>
                                <div class="formConClass">
                                    <el-form-item label="鉴权结果:" prop="authenticationResult">
                                        <el-select v-model="form.authenticationResult" placeholder="请选择" style="width: 90%;max-width:225px;" @focus="getAuthenticationResultList">
                                             <el-option :label="item.sysname" :value="item.sysconid" v-for='(item,index) in authenticationResultList' :key='index'></el-option>

                                        </el-select>
                                    </el-form-item>
                                </div>
                            <!-- </el-form> -->
                        </div>
                        <div class="rightContent1">
                            <el-button type="primary" class="serchbtn" icon="el-icon-search" style="margin-top: 17px;" @click="serch"></el-button>
                            <el-button type="primary" class="serchbtn" icon="el-icon-refresh" @click="refresh"></el-button>
                        </div>
                    </div>
                </el-collapse-transition>
            </div>
        </el-form>
        <div class="tableData">
            <div style="margin-top:20px;">
                <div class="onf"><span>预警分配开关:</span></div><div class="offOn" id="onOff" @click="toggleOnOff" v-if="switchPermission1"></div>
                <div class="onf"><span>视图切换:</span></div><div class="lsst" id="stIcon" @click="toggleSt" v-if="switchPermission2"></div>
            </div>
            <div class="contentBotoomDiv">
                <div class="button">
                    <div class="leftButton clear" style='float:left'>
                        <div class="BotoomBtn leftRadius" @click="blackAdd" title='加入黑名单' v-if="blackPermission">
                            <div class="icon1"></div>
                        </div>
                        <div class="BotoomBtn" @click="remarkOpen" title='备注' v-if="remarkPermission">
                            <div class="icon2"></div>
                        </div>
                        <div class="BotoomBtn" @click="allocationOpen" title='分配' v-if="distributePermission">
                            <div class="icon3"></div>
                        </div>
                        <div class="BotoomBtn rightRadius" @click="download=true" title='下载' v-if="downloadPermission">
                            <div class="icon4"></div>
                        </div>
                    </div>
                    <div style="float:right;margin-right:6%;">
                        外呼状态:
                        <el-select v-model="form.callStateTtitle" placeholder="请选择" style="width:225px;" @focus="getOutboundList">
                            <el-option :label="item.sysname" :value="item.sysconid" v-for='(item,index) in outboundList' :key='index'></el-option>
                        </el-select>
                        <el-button type="primary" style="" @click="callStateChoos" v-if="confirmPermission">确定</el-button>
                    </div>
                </div>
                <!-- <div   style='display:inline-block;float:right;margin-right:2%;'>

                </div> -->

            </div>
            <div >
                <!-- 流水视图的table -->
                <el-table
                    :data="lsstTable"
                    border
                    style="width: 100%;border-left: 10px solid #fff;border-right: 10px solid #fff;"
                    v-if="lsstShow"
                    @selection-change="handleSelectionChange"
                    @row-dblclick="dbDetails"
                    >
                    <el-table-column
                        type="selection"
                        width="50"
                        align='center'>
                    </el-table-column>
                    <el-table-column
                        prop="checkId"
                        label="核查单编号"
                        width="150"
                        align='center'
                        >
                    </el-table-column>
                    <el-table-column
                        prop="outCallStatus"
                        label="外呼状态"
                        width="150"
                        align='center'>
                    </el-table-column>
                    <el-table-column
                        prop="product"
                        label="产品"
                        width="150"
                        align='center'>
                    </el-table-column>
                    <el-table-column
                        prop="merchantId"
                        label="商户编号"
                        width="150"
                        align='center'>
                    </el-table-column>
                    <el-table-column
                        prop="merchantName"
                        label="商户名称"
                        width="150"
                        align='center'>
                    </el-table-column>
                    <el-table-column
                        prop="merchantSignName"
                        label="商户签约名称"
                        width="150"
                        align='center'>
                    </el-table-column>
                    <el-table-column
                        prop="merchantOrder"
                        label="商户订单号"
                        width="150"
                        align='center'>
                    </el-table-column>
                    <el-table-column
                        prop="bankCardNum"
                        label="银行卡号"
                        width="150"
                        align='center'>
                    </el-table-column>
                    <el-table-column
                        prop="bankName"
                        label="银行名称"
                        width="150"
                        align='center'>
                    </el-table-column>
                    <el-table-column
                        prop="cardholderPhone"
                        label="持卡人手机号"
                        width="150"
                        align='center'>
                    </el-table-column>
                    <el-table-column
                        prop="idCard"
                        label="身份证号"
                        width="150"
                        align='center'>
                    </el-table-column>
                    <el-table-column
                        prop="money"
                        label="金额（元）"
                        width="150"
                        align='center'>
                    </el-table-column>
                    <el-table-column
                        prop="scenesCode"
                        label="规则编码"
                        width="150"
                        align='center'>
                    </el-table-column>
                    <el-table-column
                        prop="riskValue"
                        label="风险值"
                        width="150"
                        align='center'>
                    </el-table-column>
                    <el-table-column
                        prop="riskLevel"
                        label="风险等级"
                        width="150"
                        align='center'>
                    </el-table-column>
                    <el-table-column
                        prop="checkStatus"
                        label="核查状态"
                        width="150"
                        align='center'>
                    </el-table-column>
                    <el-table-column
                        prop="remark"
                        label="备注"
                        width="150"
                        align='center'>
                    </el-table-column>
                    <el-table-column
                        prop="processStaff"
                        label="处理人员"
                        width="150"
                        align='center'>
                    </el-table-column>
                    <el-table-column
                        prop="operationTime"
                        label="操作时间"
                        width="150"
                        align='center'>
                    </el-table-column>
                    <el-table-column
                        prop="transactionTime"
                        label="交易时间"
                        width="150"
                        align='center'>
                    </el-table-column>
                    <el-table-column
                        prop="transactionStatus"
                        label="交易状态"
                        width="150"
                        align='center'>
                    </el-table-column>
                    <el-table-column
                        prop="serviceStatus"
                        label="服务状态"
                        width="150"
                        align='center'>
                    </el-table-column>
                    <el-table-column
                        prop="authenticationResult"
                        label="鉴权结果"
                        width="150"
                        align='center'>
                    </el-table-column>
                    <el-table-column
                        prop="businessLine"
                        label="业务线"
                        width="150"
                        align='center'>
                    </el-table-column>
                </el-table>
            </div>
            <div >
                <!-- 主体视图的table -->
                <!-- <div>{{chackboxChoose}}</div> -->

                <el-table
                    :data="ztstTable"
                    border
                    style="width: 100%"
                    v-if="ztstShow"
                    @selection-change="pipeliningviewChoose"


                    @change.native='selectAllEvent'>

                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <tr v-for='(item,index) in props.row.childs' :key='index' class='expandTableTd'>
                                <td class='tableExpandIcon' ></td>
                                <td class='tableExpandCheck'>
                                    <el-checkbox :label='item.id' :value="item.id" v-model="chackboxChoose"></el-checkbox>
                                </td>
                                <td class='tableExpandTd' >
                                   <div class='tableExpandTdText'>{{item.idCard}}</div>
                                </td>
                                <td class='tableExpandTd'>
                                    <div class='tableExpandTdText'>{{item.checkId}}</div>
                                </td>
                                <td class='tableExpandTd' >
                                    <div class='tableExpandTdText'>{{item.money}}</div>
                                </td>
                                <td class='tableExpandTd' >
                                    <div class='tableExpandTdText'>{{item.operationTime}}</div>
                                </td>
                                <td class='tableExpandTd' >
                                     <div class='tableExpandTdText'>{{item.outCallStatus}}</div>

                                </td>
                                <td class='tableExpandTd' >
                                    <div class='tableExpandTdText'> {{item.product}}</div>
                                </td>
                                <td class='tableExpandTd' >
                                    <div class='tableExpandTdText'> {{item.merchantId}}</div>
                                </td>
                                <td class='tableExpandTd' >
                                    <div class='tableExpandTdText'>{{item.merchantName}}</div>
                                </td>
                                <td class='tableExpandTd' >
                                    <div class='tableExpandTdText'>{{item.merchantOrder}}</div>
                                </td>
                                <td class='tableExpandTd' >
                                    <div class='tableExpandTdText'>{{item.cardholderPhone}}</div>
                                </td>
                                <td class='tableExpandTd' >
                                    <div class='tableExpandTdText'>{{item.bankCardNum}}</div>
                                </td>
                                <td class='tableExpandTd' >
                                    <div class='tableExpandTdText'>{{item.bankName}}</div>
                                </td>
                                <td class='tableExpandTd' >
                                    <div class='tableExpandTdText'>{{item.scenesCode}}</div>
                                </td>
                                <td class='tableExpandTd' >
                                    <div class='tableExpandTdText'>{{item.riskValue}}</div>
                                </td>
                                <td class='tableExpandTd' >
                                    <div class='tableExpandTdText'>{{item.riskLevel}}</div>
                                </td>
                                <td class='tableExpandTd' >
                                    <div class='tableExpandTdText'>{{item.checkStatus}}</div>
                                </td>
                                <td class='tableExpandTd' >
                                    <div class='tableExpandTdText'>{{item.remark}}</div>
                                </td>
                                <td class='tableExpandTd' >
                                    <div class='tableExpandTdText'>{{item.processStaff}}</div>
                                </td>
                                <td class='tableExpandTd' >
                                    <div class='tableExpandTdText'>{{item.transactionTime}}</div>
                                </td>
                                <td class='tableExpandTd' >
                                    <div class='tableExpandTdText'>{{item.transactionStatus}}</div>
                                </td>
                                <td class='tableExpandTd' >
                                    <div class='tableExpandTdText'>{{item.serviceStatus}}</div>
                                </td>
                                <td class='tableExpandTd' >
                                    <div class='tableExpandTdText'>{{item.authenticationResult}}</div>
                                </td>
                                <td class='tableExpandTd' >
                                    <div class='tableExpandTdText'>{{item.businessLine}}</div>
                                </td>
                            </tr>
                        </template>
                    </el-table-column>

                     <el-table-column
                    type="selection"
                    width="50"
                    align='center'>
                    </el-table-column>
                    <el-table-column
                        prop="idCard"
                        label="身份证号"
                        width="150"
                        align='center'>
                    </el-table-column>
                    <el-table-column
                        prop="checkId"
                        label="核查单"
                        width="150"
                        align='center'>
                    </el-table-column>
                    <el-table-column
                        prop="money"
                        label="金额（元）"
                        width="150"
                        align='center'>
                    </el-table-column>
                    <el-table-column
                        prop="operationTime"
                        label="操作时间"
                        width="150"
                        align='center'>
                    </el-table-column>
                    <el-table-column
                        prop="outCallStatus"
                        label="外呼状态"
                        width="150"
                        align='center'>
                    </el-table-column>
                    <el-table-column
                        prop="product"
                        label="产品"
                        width="150"
                        align='center'>
                    </el-table-column>
                    <el-table-column
                        prop="merchantId"
                        label="商户编号"
                        width="150"
                        align='center'>
                    </el-table-column>
                    <el-table-column
                        prop="merchantName"
                        label="商户名称"
                        width="150"
                        align='center'>
                    </el-table-column>
                    <el-table-column
                        prop="merchantOrder"
                        label="商户订单号"
                        width="150"
                        align='center'>
                    </el-table-column>
                    <el-table-column
                        prop="cardholderPhone"
                        label="持卡人手机号"
                        width="150"
                        align='center'>
                    </el-table-column>
                    <el-table-column
                        prop="bankCardNum"
                        label="银行卡号"
                        width="150"
                        align='center'>
                    </el-table-column>
                    <el-table-column
                        prop="bankName"
                        label="银行名称"
                        width="150"
                        align='center'>
                    </el-table-column>
                    <el-table-column
                        prop="scenesCode"
                        label="场景CODE"
                        width="150"
                        align='center'>
                    </el-table-column>
                    <el-table-column
                        prop="riskValue"
                        label="风险值"
                        width="150"
                        align='center'>
                    </el-table-column>
                    <el-table-column
                        prop="riskLevel"
                        label="风险等级"
                        width="150"
                        align='center'>
                    </el-table-column>
                    <el-table-column
                        prop="checkStatus"
                        label="核查状态"
                        width="150"
                        align='center'>
                    </el-table-column>
                    <el-table-column
                        prop="remark"
                        label="备注"
                        width="150"
                        align='center'>
                    </el-table-column>
                    <el-table-column
                        prop="processStaff"
                        label="处理人员"
                        width="150"
                        align='center'>
                    </el-table-column>
                    <el-table-column
                        prop="transactionTime"
                        label="交易时间"
                        width="150"
                        align='center'>
                    </el-table-column>
                    <el-table-column
                        prop="transactionStatus"
                        label="交易状态"
                        width="150"
                        align='center'>
                    </el-table-column>
                    <el-table-column
                        prop="serviceStatus"
                        label="服务状态"
                        width="150"
                        align='center'>
                    </el-table-column>
                    <el-table-column
                        prop="authenticationResult"
                        label="鉴权结果"
                        width="150"
                        align='center'>
                    </el-table-column>
                    <el-table-column
                        prop="businessLine"
                        label="业务线"
                        width="150"
                        align='center'>
                    </el-table-column>
                </el-table>
            </div>
            <div class="block">
              <div class='pagination'>
                <span>每页显示</span>
                <select  class="evetotal"  @change="handleSizeChange($event)" >
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="40">40</option>
                </select>
              </div>
              <div class='paginationRight'>
                  <el-pagination
                    layout="prev, pager, next"
                    :total= totalSize
                    @current-change="handleCurrentChange"
                    :page-size = pageSize
                    :page-sizes="[10,20,30,40]">
                  </el-pagination>
              </div>
            </div>
        </div>
        <el-dialog title="备注" :visible.sync="remark" width="30%"  >
            <el-input type="textarea" :rows="5" placeholder="请输入备注" v-model="remarkContent" style="width: 90%;margin-left: 5%;margin-bottom: 12px;"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="remark = false">取 消</el-button>
                <el-button type="primary" @click="remarkAdd">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="分配" :visible.sync="allocation" width="30%"  >
            <div style="width: 270px;margin: 0 auto;padding: 10px 0px 20px 0px;">
                <label>分配至</label>
                <el-select v-model="allocationText" placeholder="请选择" @focus="getProcessStaff">
                    <el-option :label="item.userName" :value="item.userId" v-for='(item,index) in processStaffList' :key='index'></el-option>

                </el-select>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="allocation = false">取 消</el-button>
                <el-button type="primary" @click="allocationAdd">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="核查单下载：分页选择下载" :visible.sync="download" width="30%" >
            <div style="text-align: center; margin-bottom:20px;">选择下载从<input type="number" v-model="loadStartNum" min="1" class="downClass" >到<input type="number" min="1"  class="downClass" v-model="loadEndNum" >页的数据</div>
            <h4 style="text-align: center">当前共<span>{{totalPage}}</span>页</h4>
            <span slot="footer" class="dialog-footer">
            <el-button @click="downloadClose">取 消</el-button>
            <el-button type="primary" @click="downloadList">下 载</el-button>
            </span>
        </el-dialog>
        <!-- 加入黑名单 -->
         <el-dialog title="加入黑名单" :visible.sync="addBlackList" width="30%" >
            <div style='width:100%;text-align:center'>
                <p><i class='el-icon-warning' style='color:#F1F2F5;font-size:25px;'></i></p>
                <p><span>确定加入黑名单吗?</span></p>

            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addBlackList = false">取 消</el-button>
                <el-button type="primary" @click="addBlackListBtn">确认</el-button>
            </span>
        </el-dialog>
        <!-- 修改外呼状态 -->
        <el-dialog title="提示" :visible.sync="changeOutBoundConfig" width="30%" >
            <div style='width:100%;text-align:center'>

                <p><i class='el-icon-warning' style='color:#F1F2F5;font-size:25px;'></i></p>
                <p><span>确认修改已选核查单的外呼状态为{{str}}?</span></p>

            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="changeOutBoundConfig = false">取 消</el-button>
                <el-button type="primary" @click="changeOutBoundConfigBtn">确认</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import qs from "qs"
import {idCard, phone, card} from '../utils/index.js'
export default {
    name:'线上核查单管理',
    data(){
      return{
        searchPermission1: true,
        searchPermission2: true,
        blackPermission: true,
        remarkPermission: true,
        distributePermission: true,
        downloadPermission: true,
        switchPermission1: true,
        switchPermission2: true,
        confirmPermission: true,
        detailPermission: true,//双击查看详情的权限
          changeOutBoundConfig:false,
          addBlackList:false,
          download:false,
          loadEndNum:0,
          loadStartNum:0,
          totalNum:0,
          allocationText:'',
          allocation:false,
          remark:false,
          seniorSearchToggle:false,
          serchToggle:true,
          ztstShow:false,
          lsstShow:true,
          evetotalNum:10,
          pageSize:10,
          pageNum:1,
          lsstTable:[],
          ztstTable:[],
          chackboxChoose:[],
          remarkContent:'',
          form:{
            callStateTtitle:'',
            jyStartTime:'',
            jyEndTime:'',
            yewuLine:'',
            ccStartTime:'',
            ccEndTime:'',
            product:'',
            merchantCode:'',
            humNumber:'',
            creditCardNumbers:'',
            MerchantsOrder:'',
            outbound:'',
            personnel:'',
            riskLevel:'',
            riskScore:'',   // *需要确定一下 两个数字是以-分割的集合吗
            checkStatus:'',
            scenesCode:'',
            serviceStatus:'',
            authenticationResult:'',
            riskScoreLeft:'',
            riskScoreRight:'',
          },
          multipleSelection:[],
          rules: {
            jyStartTime: [
              { required: true, message: '请选择日期', trigger: 'change' }
            ],
            jyEndTime: [
              { required: true, message: '请选择日期', trigger: 'change' }
            ]
          },
          busiList:[],
          productList:[],
          outboundList:[],
          personList:[],
          riskLevelList:[],
          checkStatuslList:[],
          serviceStatusList:[],
          authenticationResultList:[],
          processStaffList:[],
          totalSize:0,
          totalPage:0,
          chackboxChooseBusiModelID:[],
          chackboxChooseBusiModelOrder:[],
          checkboxChooseList:[],
          str:'',
          arrList:[],
          mainCheckedList:[]
      }
  },
  created(){
      // 按钮权限
      const idList = JSON.parse(localStorage.getItem('ARRLEVEL'));
      this.searchPermission1 = idList.indexOf(56) === -1 ? false : true;
      this.searchPermission2 = idList.indexOf(57) === -1 ? false : true;
      this.blackPermission = idList.indexOf(59) === -1 ? false : true;
      this.remarkPermission = idList.indexOf(60) === -1 ? false : true;
      this.distributePermission = idList.indexOf(61) === -1 ? false : true;
      this.downloadPermission = idList.indexOf(62) === -1 ? false : true;
      this.switchPermission1 = idList.indexOf(64) === -1 ? false : true;
      this.switchPermission2 = idList.indexOf(66) === -1 ? false : true;
      this.confirmPermission = idList.indexOf(65) === -1 ? false : true;
      this.detailPermission = idList.indexOf(265) === -1 ? false : true;
  },
  methods:{
      // 外呼状态修改
      callStateChoos(){
          let arr = []
          if( this.lsstShow == true){
              console.log(this.multipleSelection)
              this.multipleSelection.forEach(ele => {
                  arr.push({
                      id: ele.id,
                      transactionTime: ele.transactionTime
                  });
              })
          }else if(this.ztstShow == true){
              console.info('ztstTable', this.ztstTable);
              console.info('chackboxChoose', this.chackboxChoose);
              this.ztstTable.forEach(ele => {
                  if(ele.childs && ele.childs.length){
                      ele.childs.forEach(item => {
                          this.chackboxChoose.forEach(id => {
                              if (item.id == id) {
                                  arr.push({
                                      id: item.id,
                                      transactionTime: item.transactionTime
                                  })
                              }
                          })
                      })
                  }
              })
          }

          //   console.log(this.form.callStateTtitle)
          if(arr.length === 0){
              this.$alert('请至少选择一条需要处理的数据','提示',{
                  confirmButtonText:'确定',
                  type:'warning',
                  callback:action=>{

                  }
              })
              return
          }

          if(this.form.callStateTtitle == ''){
              return false;
          }

          this.outboundList.forEach(ele => {
              if(this.form.callStateTtitle === ele.sysconid){
                  console.log(ele.sysname)
                  this.str = ele.sysname

              }
          })
          this.changeOutBoundConfig = true
          this.arrList = arr
      },
      //   修改外呼状态
      changeOutBoundConfigBtn(){
          // console.log(this.arrList.join(','))
          let buttonType = ''
          let type = ''
          console.log(this.form.callStateTtitle)
          if(this.form.callStateTtitle == 701){
              buttonType = 'check_detail_white'
              type = ''
          }else if(this.form.callStateTtitle == 702 || this.form.callStateTtitle == 703 || this.form.callStateTtitle == 706){
              buttonType = 'check_detail_grey'
              type = 'gray'
          }else if(this.form.callStateTtitle == 704 || this.form.callStateTtitle == 705){
              buttonType = 'check_detail_black'
              type = 'black'
          }
          // console.log(buttonType)
          // console.log(type)
          // console.log(JSON.stringify(this.arrList))
          this.$axios.post('/OnlineChecklistController/updateOutCallStatus',qs.stringify({
              'sessionId':localStorage.getItem('SID'),
              'outCallStatus':this.form.callStateTtitle,

              'sessionId':localStorage.getItem('SID'),
              'source':'753',
              'type':type,
              'bizLine':'online',
              'comments':'',
              'buttonType':buttonType,
              'data': JSON.stringify(this.arrList),
              'loginPerson':localStorage.getItem('testName')
          }))
          .then(res => {
              this.changeOutBoundConfig = false
              if(res.data.code === 1){
                  this.$alert('操作成功', '系统提示', {
                      confirmButtonText: '确定',
                      type:'success',
                      callback:action => {
                          this.form.callStateTtitle = ''
                          this.serch()
                      }
                  });
              }else{
                  this.$alert(res.data.message, '系统提示', {
                      confirmButtonText: '确定',
                      type:'warning',
                      callback:action => {
                          this.serch()
                      }
                  });
              }

          })
          .catch(error => {
              console.log(error)
          })
      },
      // 查询接口  在此判断视图状态搜索数据
      serch(){
        var onOff = document.getElementById("stIcon");
        this.submitForm('form')

        //   if(onOff.className == "lsst"){
              // this.lsTable()

        //   }else if(onOff.className == "ztst"){

        //   }
      },
      // 流水视图数据请求
      lsTable(){
          console.log('流水视图')

          console.log(this.pageNum)
          console.log(this.pageSize)
          console.log(this.form.jyStartTime)
          console.log(this.form.jyEndTime)
          console.log(this.form.ccStartTime)
          console.log(this.form.ccEndTime)
          this.$axios.post('/OnlineChecklistController/queryAllForTurnover',qs.stringify({
              'sessionId':localStorage.getItem('SID'),
              'sTransactionTime':this.form.jyStartTime,
              'eTransactionTime':this.form.jyEndTime,
              'businessLine':this.form.yewuLine,
              'sOperationTime':this.form.ccStartTime,
              'eOperationTime':this.form.ccEndTime,
              'product':this.form.product,
              'merchantId':this.form.merchantCode,
              'cardholderPhone':this.form.humNumber,
              'bankCardNum':this.form.creditCardNumbers,
              'merchantOrder':this.form.MerchantsOrder,
              'outCallStatus':this.form.outbound,
              'processStaff':this.form.personnel,
              'riskLevel':this.form.riskLevel,
              'leftRiskScore':this.form.riskScoreLeft,
              'rightRiskScore':this.form.riskScoreRiht,
              'checkStatus':this.form.checkStatus,
              'scenesCode':this.form.scenesCode,
              'serviceStatus':this.form.serviceStatus,
              'authenticationResult':this.form.authenticationResult,
              'pageNum':this.pageNum,
              'pageSize':this.pageSize,
          }))
          .then(res => {
              console.log(res.data)
              if (res.data.recordList && res.data.recordList.length > 0) {
                  res.data.recordList.forEach(item => {
                      item.idCard = idCard(item.idCard)
                      item.cardholderPhone = phone(item.cardholderPhone)
                      item.bankCardNum = card(item.bankCardNum)
                  });
              }

              this.lsstTable = res.data.recordList
              this.totalSize = res.data.totalSize
              this.totalPage = res.data.totalPage
          })
          .catch(error => {
              console.log(error)
          })
      },
      // 主体视图数据请求
      ztTable(){
          console.log('主体视图')
          if(this.pageNum === undefined){
              this.pageNum = 1
          }
          if(this.pageSize === undefined){
              this.pageSize = 10
          }

          this.$axios.post('/OnlineChecklistController/queryAllForSubject',qs.stringify({
              'sessionId':localStorage.getItem('SID'),
              'sTransactionTime':this.form.jyStartTime,
              'eTransactionTime':this.form.jyEndTime,
              'businessLine':this.form.yewuLine,
              'sOperationTime':this.form.ccStartTime,
              'eOperationTime':this.form.ccEndTime,
              'product':this.form.product,
              'merchantId':this.form.merchantCode,
              'cardholderPhone':this.form.humNumber,
              'bankCardNum':this.form.creditCardNumbers,
              'merchantOrder':this.form.MerchantsOrder,
              'outCallStatus':this.form.outbound,
              'processStaff':this.form.personnel,
              'riskLevel':this.form.riskLevel,

              'leftRiskScore':this.form.riskScoreLeft,
              'rightRiskScore':this.form.riskScoreRiht,
              'checkStatus':this.form.checkStatus,
              'scenesCode':this.form.scenesCode,
              'serviceStatus':this.form.serviceStatus,
              'authenticationResult':this.form.authenticationResult,
              'pageNum':this.pageNum,
              'pageSize':this.pageSize,
          }))
          .then(res => {
              console.log(res.data.recordList)
              if (res.data.recordList && res.data.recordList.length > 0) {
                  res.data.recordList.forEach(ele => {
                      ele.idCard = idCard(ele.idCard)
                      ele.cardholderPhone = phone(ele.cardholderPhone)
                      ele.bankCardNum = card(ele.bankCardNum)
                      if (ele.childs && ele.childs.length > 0) {
                          ele.childs.forEach(item => {
                              item.idCard = idCard(item.idCard)
                              item.cardholderPhone = phone(item.cardholderPhone)
                              item.bankCardNum = card(item.bankCardNum)
                          });
                      }
                  });
              }

              this.ztstTable = res.data.recordList
              this.totalSize = res.data.totalSize
              this.totalPage = res.data.totalPage
          })
          .catch(error => {
              console.log(error)
          })
      },
      downloadClose(){
        this.download = false
        this.loadStartNum = 0
        this.loadEndNum = 0
      },
      downloadList(){
          if (this.loadStartNum == 0 || this.loadEndNum == 0) {
              this.$alert('值必须大于或等于1', '系统提示', {
                  type:'warning',
                  confirmButtonText: '确定',
              });
              return
          }

          if (this.totalSize == 0 || this.loadStartNum > this.totalSize || this.loadEndNum > this.totalSize) {
              this.$alert('值必须小于或等于总页数，且不能为0', '系统提示', {
                  type:'warning',
                  confirmButtonText: '确定',
              });
              return
          }

          if( parseInt(this.loadStartNum)  > parseInt(this.loadEndNum) ){
              this.$alert('起始值需小于结束值', '系统提示', {
                  type:'warning',
                  confirmButtonText: '确定',
              });
              return
          }

          window.location = encodeURI(this.uploadBaseUrl + '/OnlineChecklistController/dowonLoadOnline?startPage=' + this.loadStartNum + '&endPage=' + this.loadEndNum + '&jyStartTime=' + this.form.jyStartTime + '&jyEndTime=' + this.form.jyEndTime);
          this.download = false
          this.loadStartNum = 0
          this.loadEndNum = 0
      },
    //   分配
      allocationAdd(){
          console.log(this.allocationText)

          let arr = []
          let ids = ''
          if(this.lsstShow == true){
              this.multipleSelection.forEach(ele => {
                  arr.push(ele.id)
              })
              ids = arr.join(',')
          }else if(this.ztstShow == true){
              ids = this.chackboxChoose.join(',')
          }
          console.log(ids)
          this.$axios.post('/OnlineChecklistController/distribution',qs.stringify({
              sessionId:localStorage.getItem('SID'),
              ids:ids,
              userId:this.allocationText,
              jyStartTime: this.form.jyStartTime,
              jyEndTime: this.form.jyEndTime
          }))
          .then(res => {
              console.log(res.data)
              this.allocation = false
              this.allocationText = ''
              if(res.data.code === 1){
                     this.$alert('操作成功', '系统提示', {
                         confirmButtonText: '确定',
                         type:'success',
                         callback:action=>{
                            this.serch()
                         }
                     });


              }else if(res.data.code !== 1){
                    this.$alert('操作失败', '系统提示', {
                         confirmButtonText: '确定',
                         type:'warning',
                         callback:action=>{
                            this.serch()
                         }
                     });
              }
          })
          .catch(error => {
              this.$alert(error)
              console.log(error)
          })

      },
      allocationOpen(){
          if(this.lsstShow == true){
              if(this.multipleSelection.length == 0){
                  this.$alert('请选择至少一条需要分配的数据', '系统提示', {
                      confirmButtonText: '确定',
                      type: 'warning'
                  });
              }else{

                  this.allocation = true;
              }

          }else if(this.ztstShow == true){
              if(this.chackboxChoose.length == 0){
                  this.$alert('请选择至少一条需要分配的数据', '系统提示', {
                      confirmButtonText: '确定',
                      type: 'warning'
                  });
              }else{

                  this.allocation = true;
              }
          }
      },
      // 备注
      remarkAdd(){
          let arr = []
          if (this.lsstShow == true) {
              this.multipleSelection.forEach(ele => {
                  arr.push(ele.id);
              });
          } else if (this.ztstShow == true) {
              arr = this.chackboxChoose
          }

          this.$axios.post('/OnlineChecklistController/updateRemark',qs.stringify({
              sessionId: localStorage.getItem('SID'),
              ids: arr,
              remark: this.remarkContent,
              jyStartTime: this.form.jyStartTime,
              jyEndTime: this.form.jyEndTime
          }))
          .then(res => {
              console.log(res)
              this.remark = false
              this.remarkContent = ''
              if(res.data.code === 1){
                  this.$alert('操作成功', '系统提示', {
                      confirmButtonText: '确定',
                      type:'success',
                      callback:action=>{
                          this.serch()
                      }
                  });

              }else{
                  this.$alert('操作失败', '系统提示', {
                      confirmButtonText: '确定',
                      type:'warning',
                      callback:action=>{
                          this.serch()
                      }
                  });
              }

          })
          .catch(error => {
              this.$alert(error)
          })
      },
      remarkOpen(){
          if(this.lsstShow == true){
              if(this.multipleSelection.length == 0){
                  this.$alert('请选择一条需要备注的数据', '系统提示', {
                      confirmButtonText: '确定',
                      type: 'warning'
                  });
              }else{

                  this.remark = true
              }

          }else if(this.ztstShow == true){
              if(this.chackboxChoose.length == 0){
                  this.$alert('请选择一条需要备注的数据', '系统提示', {
                      confirmButtonText: '确定',
                      type: 'warning'
                  });
              }else{

                  this.remark = true
              }
          }
      },
      addBlackListBtn(){
          let arr = []
          if( this.lsstShow == true){
              console.log(this.multipleSelection)
              this.multipleSelection.forEach(ele => {
                  arr.push({
                      id: ele.id,
                      transactionTime: ele.transactionTime
                  });
              })
          }else if(this.ztstShow == true){
              console.info('ztstTable', this.ztstTable);
              console.info('chackboxChoose', this.chackboxChoose);
              this.ztstTable.forEach(ele => {
                  if(ele.childs && ele.childs.length){
                      ele.childs.forEach(item => {
                          this.chackboxChoose.forEach(id => {
                              if (item.id == id) {
                                  arr.push({
                                      id: item.id,
                                      transactionTime: item.transactionTime
                                  })
                              }
                          })
                      })
                  }
              })
          }

          console.log(JSON.stringify(arr) )
          this.$axios.post('/NameListController/batchSaveName',qs.stringify({
              'sessionId':localStorage.getItem('SID'),
              'source':'753',
              'type':'black',
              'bizLine':'online',
              'comments':'',
              'buttonType':'check_detail_black',
              'data': JSON.stringify(arr),
              'loginPerson':localStorage.getItem('testName')
          }))
          .then(res => {
              console.log(res.data)
              if(res.data.code === 1){
                  this.$alert('操作成功', '系统提示', {
                      confirmButtonText: '确定',
                      type:'success',
                      callback:action=>{
                          this.serch()
                          this.addBlackList = false
                      }
                  })
              }else if(res.data.code !== 1){
                  this.$alert(res.data.message, '系统提示', {
                      confirmButtonText: '确定',
                      type:'warning',
                      callback:action=>{
                          this.addBlackList = false
                      }
                  })
              }
          })
          .catch(error => {
              console.log(error)
              this.$alert(error)
          })
      },
      blackAdd(){
          if(this.lsstShow == true){
              console.log(111)
              if(this.multipleSelection.length == 0){
                  this.$alert('请至少选择一条需要拉黑的数据', '系统提示', {
                      confirmButtonText: '确定',
                      type: 'warning'
                  });
                  return
              }

              this.addBlackList = true

          }else if(this.ztstShow == true){
              console.log(123)
              if(this.chackboxChoose.length == 0){
                  this.$alert('请至少选择一条需要拉黑的数据', '系统提示', {
                      confirmButtonText: '确定',
                      type: 'warning'
                  });
                   return
              }

              this.addBlackList = true
          }
         // 判断核查单加黑内容是否在白名单中已存在，若有则弹窗提示，加黑不成功，若无，则加黑成功提示
      },

      dbDetails(row){
          // 没有查看详情的权限则返回
          if (this.detailPermission === false) {
              return;
          }
          console.log(row)
          // window.open('http://127.0.0.1:8080/#/detailLevel?' + row.merchant_id)
            console.log(row.businessLine)
            let num = ''
            if(row.businessLine === undefined || row.businessLine === ''){
                row.businessLine = '非EPOS'
            }
            if(row.businessLine == 'EPOS'){
                // 航旅
                num = 1
            }else if(row.businessLine == '非EPOS'){
                // 普通
                num = 2
            }
            // window.open('http://172.19.40.129:8080/#/OnlineMgtDetails?' + num + '&' + row.id)
            // window.open('http://10.151.30.148:8080/business-view/#/OnlineMgtDetails?' + num + '&' + row.id)
            window.open(window.location.href.split('#')[0] + '#/OnlineMgtDetails?' + num + '&' + row.id + '&' + row.transactionTime)
      },
      toggleSt(){
          var onOff = document.getElementById("stIcon");
          if(onOff.className == "lsst"){
              onOff.classList.remove("lsst")
              this.lsstShow = false;
              onOff.classList.add("ztst")
              this.ztstShow = true;
              this.ztTable()
          }else if(onOff.className == "ztst"){
              onOff.classList.remove("ztst")
              this.ztstShow = false;
              onOff.classList.add("lsst")
              this.lsstShow = true;
          }
      },
      toggleOnOff(){
          var statusCode = localStorage.getItem('STATUS') == 0 ? 1 : 0;
          this.updateStatus(statusCode)
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(valid, 'submit!');
            this.lsTable()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      serchToggleC(){
          this.serchToggle = !this.serchToggle

         var ordinarySerch = document.getElementById("ordinarySerch")
         if(this.serchToggle == false){
            ordinarySerch.style.transform = 'rotate(180deg)'
         }else if (this.serchToggle != false){
            ordinarySerch.style.transform = 'rotate(0deg)'
         }
      },
      seniorSearchToggleC(){
        this.seniorSearchToggle = !this.seniorSearchToggle
        let serchbtn = document.querySelector('.divserchbtn')
        var advancedSerch = document.getElementById("advancedSerch")

        if(this.seniorSearchToggle == true){
          serchbtn.style.display = 'none'
          serchbtn.style.transition = 'all 2s'
          advancedSerch.style.transform = 'rotate(0deg)'
        }else if(this.seniorSearchToggle == false){
          serchbtn.style.display = 'inline-block'
          serchbtn.style.transition = 'all 2s'
          advancedSerch.style.transform = 'rotate(180deg)'
        }
      },
      refresh(){
        for(var name in this.$data.form) {
            this.$data.form[name] = ""
        }
        this.initTimeSet()

      },
      handleSelectionChange(row) {
        this.multipleSelection = row;
        console.log(this.multipleSelection)

      },
    //   主体视图选择框
      pipeliningviewChoose(row){
          console.log(row)
        // this.mainCheckedList = row
        //    if(row.length !== 0){
        //         row.forEach(ele => {
        //             ele.childs.forEach(item => {
        //                 this.checkboxChooseList = this.checkboxChooseList.concat(item)
        //                 this.chackboxChoose = this.chackboxChoose.concat(item.id)
        //                 this.chackboxChooseBusiModelID = this.chackboxChooseBusiModelID.concat(item.merchantId)
        //                 this.chackboxChooseBusiModelOrder = this.chackboxChooseBusiModelOrder.concat(item.merchantOrder)
        //             })
        //         })
        //     }else if(row.length === 0){
        //         this.chackboxChoose = []
        //         this.chackboxChooseBusiModelID = []
        //         this.chackboxChooseBusiModelOrder = []
        //         this.checkboxChooseList = []
        //     }

      },
      selectAllEvent(row){
            console.log(row.target.checked)
            // if(row.target.checked){
            //     this.mainCheckedList.forEach(ele => {
            //         ele.childs.forEach(item => {
            //             this.checkboxChooseList = this.checkboxChooseList.concat(item)
            //             this.chackboxChoose = this.chackboxChoose.concat(item.id)
            //             this.chackboxChooseBusiModelID = this.chackboxChooseBusiModelID.concat(item.merchantId)
            //             this.chackboxChooseBusiModelOrder = this.chackboxChooseBusiModelOrder.concat(item.merchantOrder)
            //         })
            //     })
            // }else{
            //     this.chackboxChoose.forEach((ele,index) => {
            //         if(ele == row.target.value){
            //             console.log(ele)
            //             console.log(row.target.value)
            //             this.chackboxChoose.splice(index,1)
            //             this.checkboxChooseList.splice(index,1)
            //         }
            //     })
            // }
      },
      handleSizeChange(val) {
        console.log(val.target.value);
        this.pageSize = parseInt(val.target.value)
        this.serch()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val} 条`);
        this.pageNum = parseInt(val)
        this.serch()
      },
      getBusiList(){
          this.$axios.post('/SysConfigController/queryEnum',qs.stringify({
              'sessionId':localStorage.getItem('SID'),
              'type':76
          }))
          .then(res => {
            this.busiList = []
              this.busiList = this.busiList.concat(res.data)

          })
      },
      getProductList(){
          this.$axios.post('/SysConfigController/queryEnum',qs.stringify({
              'sessionId':localStorage.getItem('SID'),
              'type':77
          }))
          .then(res => {
               this.productList = []
              this.productList = this.productList.concat(res.data)

          })
      },
      getOutboundList(){
          this.$axios.post('/SysConfigController/queryEnum',qs.stringify({
              'sessionId':localStorage.getItem('SID'),
              'type':85
          }))
          .then(res => {
              this.outboundList = []
              this.outboundList = this.outboundList.concat(res.data)

          })
      },
      getPersonList(){
        this.$axios.get('/OnlineChecklistController/queryProcessStaff?sessionId=' + localStorage.getItem('SID'))
            .then(res => {
                console.log(res.data)
                this.personList = []
                this.personList = this.personList.concat(res.data.recordList)
            })
            .catch(error => {
                console.log(res.data)
            })
      },
      getRiskLevelList(){
          this.$axios.post('/SysConfigController/queryEnum',qs.stringify({
              'sessionId':localStorage.getItem('SID'),
              'type':69
          }))
          .then(res => {
              this.riskLevelList = []
              this.riskLevelList = this.riskLevelList.concat(res.data)

          })
      },
      getCheckStatusList(){
          this.$axios.post('/SysConfigController/queryEnum',qs.stringify({
              'sessionId':localStorage.getItem('SID'),
              'type':83
          }))
          .then(res => {
              console.log(res.data)
              this.checkStatuslList = []
              this.checkStatuslList = this.checkStatuslList.concat(res.data)

          })
      },
      getServiceStatusList(){
           this.$axios.post('/SysConfigController/queryEnum',qs.stringify({
              'sessionId':localStorage.getItem('SID'),
              'type':86
          }))
          .then(res => {
              this.serviceStatusList = []
              this.serviceStatusList = this.serviceStatusList.concat(res.data)

          })
      },
      getAuthenticationResultList(){
          this.$axios.post('/SysConfigController/queryEnum',qs.stringify({
              'sessionId':localStorage.getItem('SID'),
              'type':82
          }))
          .then(res => {
              this.authenticationResultList = []
              this.authenticationResultList = this.authenticationResultList.concat(res.data)

          })
      },
    //   获取分配人员
    getProcessStaff(){
        this.$axios.get('/OnlineChecklistController/queryProcessStaff?sessionId=' + localStorage.getItem('SID'))
        .then(res => {
            console.log(res.data)
            this.processStaffList = []
            this.processStaffList = this.processStaffList.concat(res.data.recordList)
        })
    },
    // 设置默认时间
    initTimeSet(){
        let date = new Date()
        let y = date.getFullYear()
        let m = "0"+(date.getMonth()+1)
        let d = "0"+date.getDate()
        // console.log(y+'-'+m+'-'+d)
        this.form.jyStartTime = y+'-'+m.substring(m.length-2,m.length)+'-'+d.substring(d.length-2,d.length) + ' ' + '00:00:00'
        this.form.jyEndTime = y+'-'+m.substring(m.length-2,m.length)+'-'+d.substring(d.length-2,d.length) + ' ' + '23:59:59'
        this.form.ccStartTime = y+'-'+m.substring(m.length-2,m.length)+'-'+d.substring(d.length-2,d.length) + ' ' + '00:00:00'
        this.form.ccEndTime = y+'-'+m.substring(m.length-2,m.length)+'-'+d.substring(d.length-2,d.length) + ' ' + '23:59:59'

    },
    // 预警分配开关
    updateStatus(statusCode) {
        var onOff = document.getElementById("onOff");

        this.$axios.post('/OnlineChecklistController/updateStatus', qs.stringify({
            userId: localStorage.getItem('USERID'),
            status: statusCode
        })).then(res => {
            if (res.data.code == 1) {
                localStorage.setItem('STATUS', res.data.status)
                onOff.className = (onOff.className == 'offOn') ? 'onOff' : 'offOn'
                this.$alert(res.data.message, '系统提示', {
                    confirmButtonText: '确定'
                })
            }
        });
    },
    getStatus() {
        this.$axios.post('/OnlineChecklistController/initUserStatus', qs.stringify({
            userId: localStorage.getItem('USERID'),
            status: localStorage.getItem('STATUS') || 0
        })).then(res => {
            if (res.data.code === 1) {
                localStorage.setItem('STATUS', res.data.status)
            }
        });
    }
  },
  mounted(){
      var onOff = document.getElementById("onOff");
      if (localStorage.getItem('STATUS') && localStorage.getItem('STATUS') == 1) {
          onOff.className = 'onOff';
      } else {
          onOff.className = 'offOn';
      }
      this.getStatus()
      this.initTimeSet()
  }
}
</script>
<style scoped>
.onf{
    display: inline;
    margin-left: 45px;
    font-size: 14px;
    color: #606266;
}
.lsst{
    width: 84px;
    height: 26px;
    cursor: pointer;
    background: url(../../images/lsst.png) no-repeat ;
    display: inline-block;
    vertical-align:middle;
    margin-left: 15px;
}
.ztst{
    width: 84px;
    height: 26px;
    cursor: pointer;
    background: url(../../images/ztst.png) no-repeat ;
    display: inline-block;
    margin-left: 15px;
    vertical-align:middle
}
.onOff{
    width: 50px;
    height: 26px;
    cursor: pointer;
    background: url(../../images/on.png) no-repeat;
    display: inline-block;
    margin-left: 15px;
    vertical-align:middle

}
.offOn{
    width: 50px;
    height: 26px;
    cursor: pointer;
    background: url(../../images/off.png) no-repeat;
    display: inline-block;
    margin-left: 15px;
    vertical-align:middle
}
.tableData{
    width: 100%;
    height: auto;
    border-top: 1px solid #E0E0E0;
}
.clear{
    clear: both;
}
.title{
    height: 50px;
    line-height: 50px;
    padding-left: 27px;
    font-size: 14px;
    color: #333333;
    box-shadow: 0 1px 4px 1px rgba(0,0,0,0.09);
}
.searchContentgray,.seniorSearchContent{
    height: auto;
    padding-left: 3%;
    padding-top: 20px;
    padding-bottom: 20px;
    -webkit-transition: all 1s;
    transition: all 1s;
}
.leftContent{
    width: 80%;
    height: auto;
    display: inline-block;
}
.rightContent{
    width: 18%;
    height: 248px;
    border-left: 1px solid #e0e0e0;
    float: right;
}
.rightContent1{
    width: 18%;
    height: 118px;
    border-left: 1px solid #e0e0e0;
    float: right;
}
.formConClass{
    display: inline-block;
    width: 32%;
}
.serchbtn{
    width: 100px;
    height:36px;
    margin-bottom: 15px;
    margin-left: 10px;
    margin-left: 30%;
    display: block;
}
.contentBotoomDiv {
    height: 60px;
    font-size: 13px;
    padding-top: 25px;
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
.icon1{
    background: url(../../images/icon1.png) no-repeat;
    width: 39px;
    height: 28px;
    border-top-left-radius: 7px;
    border-bottom-left-radius: 7px;
}
.icon2{
    background: url(../../images/icon2.png) no-repeat;
    width: 39px;
    height: 28px;
}
.icon3{
    background: url(../../images/icon3.png) no-repeat;
    width: 39px;
    height: 28px;
}
.icon4{
    background: url(../../images/icon4.png) no-repeat;
    width: 39px;
    height: 28px;
    border-top-right-radius: 7px;
    border-bottom-right-radius: 7px;
}
.icon1:hover{
    background: url(../../images/icon1-2.png) no-repeat;
    width: 39px;
    height: 28px;
    border-top-left-radius: 7px;
    border-bottom-left-radius: 7px;
}
.icon2:hover{
    background: url(../../images/icon2-2.png) no-repeat;
    width: 39px;
    height: 28px;
}
.icon3:hover{
    background: url(../../images/icon3-2.png) no-repeat;
    width: 39px;
    height: 28px;
}
.icon4:hover{
    background: url(../../images/icon4-2.png) no-repeat;
    width: 39px;
    height: 28px;
    border-top-right-radius: 7px;
    border-bottom-right-radius: 7px;
}
.serch{
    float: right;
    margin-top: -35px;
    width: 18%;
}
 .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
    .downClass{
    width: 77px;
    height: 29px;
    margin: 5px;
    border-radius: 19px;
    border: 1px solid #ccc;
    padding-right: 2px;
  }
.tableExpandIcon{
    min-width:48px !important;text-align:center;

    line-height: 17px;
}
.tableExpandCheck{
    max-width:50px !important;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 17px;
}
.tableExpandTd{
    min-width:150px !important;text-align:center;
    padding: 12px 0;
    min-width: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    text-overflow: ellipsis;
    vertical-align: middle;
    position: relative;

}
.tableExpandTdText{
    padding-right: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-left: 10px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    white-space: normal;
    word-break: break-all;
    line-height: 17px;}
#advancedSerch{
    transform: rotate(180deg);
    -webkit-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -ms-transform: rotate(180deg)
}
</style>
