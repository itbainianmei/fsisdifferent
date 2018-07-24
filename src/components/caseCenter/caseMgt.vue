<template>
  <!--案件详情-->
  <div>
    <div class="htmlHead">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>案件中心</el-breadcrumb-item>
        <el-breadcrumb-item>案件查询</el-breadcrumb-item>
        <el-breadcrumb-item>案件详情</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="btnBoxClass leftBtn">
           <span class="btnBox">案件信息</span>
           <el-button type="primary" round class="rightBtn" style="margin-right: 10px;width: 134px;" @click="firstFinish"  v-if="state2 && firstFinishPermission">初审完结</el-button>
           <el-button type="primary" round class="rightBtn" style="margin-right: 10px;width: 134px;" @click="submit" v-if="state3 && submitPermission">提交</el-button>
           <el-button type="primary" round class="rightBtn" style="margin-right: 10px;width: 134px;" @click="state1save" v-if="state1 && state1savePermission">保存</el-button>  <!-- 复审完结状态 -->
           <el-button type="primary" round class="rightBtn" style="margin-right: 10px;width: 134px;" @click="state2save" v-if="state2 && state2savePermission">保存</el-button>  <!-- 初审未完结状态 -->
           <el-button type="primary" round class="rightBtn" style="margin-right: 10px;width: 134px;" @click="state3save" v-if="state3 && state3savePermission">保存</el-button>  <!-- 初审完结且复审未完结状态 -->
      </div>
      <div class="clearBox"></div>
    </div>

    <div style="border: 1px solid #E0E0E0;width:97%;margin:0 auto;height:auto;">
        <div class="divHead">
            <span class="rideus"></span>案件信息<span style="color:red;margin-left:10px;">(自动生成)</span>
                <div class="divContent" style="padding-top: 0px;" >
                    <div class="text" style="border-right: 1px solid #dcdcdc;padding: 18px 0px 10px 0px;">
                        <div class="boxOnly" >
                            <div class="labelC">案件号:</div>
                            <div class="text-box" >
                                <span>{{id}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="text" style="border-right: 1px solid #dcdcdc;padding: 18px 0px 10px 0px;">
                        <div class="boxOnly" >
                            <div class="labelC" style="margin-left: 25px;">被盗银行卡号:</div>
                            <div class="text-box">
                                <span style='display:inline-block;width:250px;text-overflow:ellipsis;overflow: hidden;white-space: nowrap;'>{{stolenCardNumber}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="text" style="padding: 18px 0px 10px 0px;">
                        <div class="boxOnly" >
                            <div class="labelC" style="margin-left: 25px;"><span style="color:red;font-size: 15px;font-weight: 500;">*</span>案件类型:</div>
                            <div class="text-box" style="margin-left:5px;">

                                 <el-select id='caseType' v-model="caseType" placeholder="请选择" style="width: 90%;max-width:225px;" @focus='getajlx'>
                                        <el-option v-for="item in ajlx" :key="item.sysconid" :label="item.sysname" :value="item.sysconid"></el-option>
                                </el-select>
                            </div>
                        </div>
                    </div>
                </div>
        </div>

        <!-- 复审完结状态 -->
        <div v-if="state1">
            <div class="divHead">
                <span class="rideus"></span>关联交易
                <div class="divContent">
                    <span style="margin-left: 31px;margin-bottom: 10px;display: block;">已关联交易</span>
                    <div class="divContent" style="border:0;padding-top:0px;margin-left: 20px;margin-right: -20px;width:97%;">
                    <el-table
                        :data="state1TableData"
                        border
                        style="width: 100%">
                        <el-table-column
                        prop="merchantOrder"
                        width="150px"
                        align='center'
                        label="商户订单号">
                        </el-table-column>
                        <el-table-column
                        prop="merchantId"
                          width="150px"
                        align='center'
                        label="商户号">
                        </el-table-column>
                        <el-table-column
                        prop="merchantName"
                          width="150px"
                        align='center'
                        label="商户名称">
                        </el-table-column>
                        <el-table-column
                        prop="product"
                          width="150px"
                        align='center'
                        label="业务产品">
                        </el-table-column>
                        <el-table-column
                        prop="bankNum"
                          width="150px"
                        align='center'
                        label="银行卡号">
                            <template slot-scope="scope">
                                <el-popover trigger="hover" placement="top">
                                    {{ scope.row.bankNum}}
                                <div slot="reference" >
                                    {{ scope.row.bankNumCopy }}
                                </div>
                                </el-popover>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="phone"
                          width="150px"
                        align='center'
                        label="手机号">
                            <template slot-scope="scope">
                                <el-popover trigger="hover" placement="top">
                                    {{ scope.row.phone}}
                                <div slot="reference" >
                                    {{ scope.row.phoneCopy }}
                                </div>
                                </el-popover>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="idCard"
                          width="150px"
                        align='center'
                        label="身份证号">
                            <template slot-scope="scope">
                                <el-popover trigger="hover" placement="top">
                                    {{ scope.row.idCard}}
                                <div slot="reference" >
                                    {{ scope.row.idCardCopy }}
                                </div>
                                </el-popover>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="transactionMoney"
                          width="150px"
                        align='center'
                        label="交易金额（元）">
                        </el-table-column>
                        <el-table-column
                        prop="transactionIp"
                          width="150px"
                        align='center'
                        label="交易IP">
                        </el-table-column>
                        <el-table-column
                        prop="transactionLocal"
                         width="150px"
                        align='center'
                        label="交易IP归属地">
                        </el-table-column>
                        <el-table-column
                        prop="transactionTime"
                          width="150px"
                        align='center'
                        label="交易时间">
                        </el-table-column>
                        <el-table-column
                        prop=""
                        align='center'
                        width="190px;"
                        label="商户和易宝承担金额（元）">
                        </el-table-column>
                        <el-table-column
                        prop=""
                        align='center'
                        width="190px;"
                        label="易宝实际赔付金额">
                        </el-table-column>
                    </el-table>
                    </div>
                </div>
            </div>
            <hr class="hr">
            <div class="divHead">
                <span class="rideus"></span>资金处理
                <div class="divContent" style="border:0;">
                    <div class="text" style="border: 1px solid #dcdcdc;padding: 18px 0px 10px 0px;width:50%;">
                        <div class="boxOnly" >
                            <div class="labelC">涉案资金:</div>
                            <div class="text-box" >
                                <span>{{retrialEnd_amountInvolved}}</span>
                                <span class="fl">元</span>
                            </div>
                        </div>
                        <div class="boxOnly" >
                            <div class="labelC">拒付资金:</div>
                            <div class="text-box" >
                                <span>{{retrialEnd_refusedAmount}}</span>
                                <span class="fl">元</span>
                            </div>
                        </div>
                    </div>
                    <div class="text" style="border: 1px solid #dcdcdc;padding: 18px 3px 10px 3px;margin-left: -1px;width:49%;">
                        <div class="boxOnly" >
                            <div class="labelC" style="margin-left: 25px;">商户和易宝承担金额:</div>
                            <div class="text-box" >
                                <span>{{retrialEnd_bearMoney}}</span>
                                <span class="fl">元</span>
                            </div>
                        </div>
                        <div class="boxOnly" >
                            <div class="labelC" style="margin-left: 25px;">易宝实际赔付:</div>
                            <div class="text-box" >
                                <span>{{retrialEnd_actualPaymentMoney}}</span>
                                <span class="fl">元</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr class="hr">
            <div class="divHead">
                <span class="rideus"></span>深度还原
                <div class="divContent" style="border:0;">
                    <div class="text" style="border: 1px solid #dcdcdc;padding: 18px 0px 10px 0px;width:32%;">
                        <div class="boxOnly" >
                            <div class="labelC">作案时间:</div>
                            <div class="text-box" >
                                <span>{{retrialEnd_crimesTime}}</span>
                            </div>
                        </div>
                        <div class="boxOnly" >
                            <div class="labelC">泄露方式:</div>
                            <div class="text-box" >
                                <span>{{retrialEnd_leakageMethod}}</span>
                            </div>
                        </div>
                        <div class="boxOnly" >
                            <div class="labelC">支付方式:</div>
                            <div class="text-box" >
                                <span>{{retrialEnd_payMethod}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="text" style="border: 1px solid #dcdcdc;padding: 18px 3px 10px 3px;margin-left: -1px;width:32%;">
                        <div class="boxOnly" >
                            <div class="labelC" style="margin-left: 25px;">业务类型:</div>
                            <div class="text-box" >
                                <span>{{retrialEnd_businessType}}</span>
                            </div>
                        </div>
                        <div class="boxOnly" >
                            <div class="labelC" style="margin-left: 25px;">风险原因:</div>
                            <div class="text-box" >
                                <span>{{retrialEnd_riskReason}}</span>
                            </div>
                        </div>

                        <div class="boxOnly" >
                            <div class="labelC" style="margin-left: 25px;">支付渠道:</div>
                            <div class="text-box" >
                                <span>{{retrialEnd_payChannel}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="text" style="border: 1px solid #dcdcdc;padding: 18px 3px 10px 3px;margin-left: -1px;width:32%;">
                        <div class="boxOnly" >
                            <div class="labelC" style="margin-left: 25px;">泄露渠道:</div>
                            <div class="text-box" >
                                <span>{{retrialEnd_leakageChannel}}</span>
                            </div>
                        </div>
                        <div class="boxOnly" >
                            <div class="labelC" style="margin-left: 25px;">手机换绑方式:</div>
                            <div class="text-box" >
                                <span>{{retrialEnd_bindMethod}}</span>
                            </div>
                        </div>
                        <div class="boxOnly" >
                            <div class="labelC" style="margin-left: 25px;">销账渠道:</div>
                            <div class="text-box" >
                                <span>{{retrialEnd_billingChannel}}</span>
                            </div>
                        </div>
                    </div>
                    <div v-for='(item,index) in retrialEndList' :key='index'>
                        <div class="text" style="border: 1px solid #dcdcdc;padding: 18px 0px 10px 0px;margin-top:-1px;width:32%;">
                            <div class="boxOnly" >
                                <div class="labelC" >资金来源:</div>
                                <div class="text-box" >
                                    <span>{{item.a}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="text" style="border: 1px solid #dcdcdc;padding: 18px 3px 10px 3px;margin-top:-1px;margin-left: -1px;width:32%;">
                            <div class="boxOnly" >
                                <div class="labelC" style="margin-left: 25px;">银行:</div>
                                <div class="text-box" >
                                    <span>{{item.c}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="text" style="border: 1px solid #dcdcdc;padding: 18px 3px 10px 3px;margin-top:-1px;margin-left: -1px;width:32%;">
                            <div class="boxOnly" >
                                <div class="labelC" style="margin-left: 25px;">金额:</div>
                                <div class="text-box" >
                                    <span>{{item.b}}</span>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
            <hr class="hr">
            <div class="divHead">
                <span class="rideus"></span>初审结案
                <div class="divContent" style="border:0;">
                    <div class="boxOnly" >
                        <div class="labelC" style="width: 57px;">初审结案:</div>
                        <div class="text-box" >
                            <span>{{retrialEnd_trialStatus}}</span>
                        </div>
                    </div>
                    <div class="textareaIpt">
                    <el-input
                        type="textarea"
                        :rows="5"
                        readonly="readonly"
                        placeholder="请输入备注，最大长度不超过200"
                        :maxlength="200"
                        v-model="retrialEnd_trialRemark">
                    </el-input>
                    </div>

                    <div class="boxOnly" style="margin-top:25px;margin-bottom:5px;">
                        <div class="labelC" style="width: 57px;">复审结案:</div>
                        <div class="text-box" >

                             <span>{{retrialEnd_reviewStatus}}</span>

                        </div>
                    </div>
                    <div class="textareaIpt">
                    <el-input
                        type="textarea"
                        :rows="5"
                        readonly="readonly"
                        placeholder="请输入备注，最大长度不超过200"
                        :maxlength="200"
                        v-model="retrialEnd_reviewRemark">
                    </el-input>
                    </div>

                </div>
            </div>
        </div>

        <!-- 初审未完结状态 -->
        <div v-if="state2">
            <div class="divHead">
                <span class="rideus"></span>关联交易
                <div class="divContent">
                    <span style="margin-left: 31px;margin-bottom: 10px;display: block;">新建关联交易</span>
                    <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="商户编号" prop="merchantIdProp">
                            <el-input v-model="merchantId" style='width:280px' id="merchantIdProp"></el-input>
                        </el-form-item>
                        <el-form-item label="商户订单号" prop="MerchantOrderNumber">
                            <el-input v-model="merchantOrder" id="MerchantOrderNumber" style='width:280px'></el-input>
                        </el-form-item>
                        <el-button @click="newCaseSerch" type="primary" class="iconStyle" icon="el-icon-search" style="margin-left: 8px;margin-top:3px;width:110px;" v-if="searchPermission"></el-button>
                        <el-button round @click="blackRemouve" style="float:right;margin-top:10px;border: 1px solid rgb(63, 170, 249);color: rgb(63, 170, 249);margin-right:20px;" v-if="delBlackPermission">删除黑名单</el-button>
                        <el-button round @click="blackAdd" style="float:right;margin-top:10px;border: 1px solid rgb(63, 170, 249);color: rgb(63, 170, 249);" v-if="addBlackPermission">加入黑名单</el-button>
                    </el-form>
                    <div class="divContent" style="border:0;padding-top:0px;margin-left: 20px;margin-right: -20px;width:97%;">
                        <el-table
                            :data="state2TableOne"
                            @selection-change="handleSelectionChange"
                            border
                            >
                            <el-table-column
                            type="selection"
                            align='center'
                            width="50">
                            </el-table-column>
                            <el-table-column
                            prop="merchantOrder"
                            width='150px'
                            align='center'
                            label="商户订单号">
                            </el-table-column>
                            <el-table-column
                            prop="merchantId"
                             width='150px'
                            align='center'
                            label="商户号">
                            </el-table-column>
                            <el-table-column
                            prop="merchantName"
                             width='150px'
                            align='center'
                            label="商户名称">
                            </el-table-column>
                            <el-table-column
                            prop="product"
                             width='150px'
                            align='center'
                            label="业务产品">
                            </el-table-column>
                            <el-table-column
                            prop="bankNum"
                             width='150px'
                            align='center'
                            label="银行卡号">
                                <template slot-scope="scope">
                                <el-popover trigger="hover" placement="top">
                                    {{ scope.row.bankNum}}
                                <div slot="reference" >
                                    {{ scope.row.bankNumCopy }}
                                </div>
                                </el-popover>
                            </template>
                            </el-table-column>
                            <el-table-column
                            prop="phone"
                             width='150px'
                            align='center'
                            label="手机号">
                                <template slot-scope="scope">
                                <el-popover trigger="hover" placement="top">
                                    {{ scope.row.phone}}
                                <div slot="reference" >
                                    {{ scope.row.phoneCopy }}
                                </div>
                                </el-popover>
                                </template>
                            </el-table-column>
                            <el-table-column
                            prop="idCard"
                             width='150px'
                            align='center'
                            label="身份证号">
                                <template slot-scope="scope">
                                <el-popover trigger="hover" placement="top">
                                    {{ scope.row.idCard}}
                                <div slot="reference" >
                                    {{ scope.row.idCardCopy }}
                                </div>
                                </el-popover>
                                </template>
                            </el-table-column>
                            <el-table-column
                             width='150px'
                            align='center'
                            prop="transactionMoney"
                            label="交易金额（元）">
                            </el-table-column>
                            <el-table-column
                            prop="transactionIp"
                             width='150px'
                            align='center'
                            label="交易IP">
                            </el-table-column>

                        </el-table>
                        <el-button @click="addChose"  round style="float:left;margin-top:10px;border: 1px solid rgb(63, 170, 249);color: rgb(63, 170, 249);" v-if="addSelectPermission">添加选中交易</el-button>
                        <el-button @click="addAllChose" round style="float:left;margin-top:10px;border: 1px solid rgb(63, 170, 249);color: rgb(63, 170, 249);" v-if="addAllPermission">添加全部交易</el-button>
                        <el-pagination
                            layout="prev, pager, next"
                            :total=totalSize
                            style="display: inline-block;float: right;margin-bottom: 15px;margin-top: 15px;">
                        </el-pagination>
                    </div>
                    <span style="margin-left: 31px;margin-bottom: 10px;display: block;">已关联交易</span>
                    <div class="divContent" style="border:1px solid #ffffff;padding-top:0px;margin-left: 20px;margin-right: -20px;width:97%;">
                    <el-table
                        :data="state2TableTwo"
                        @selection-change="handleSelection"
                        border
                        style="width: 100%">
                        <el-table-column
                            type="selection"
                            width="50">
                        </el-table-column>
                        <el-table-column
                            prop="merchantOrder"
                            width='150px'
                            align='center'
                            label="商户订单号">
                            </el-table-column>
                            <el-table-column
                            prop="merchantId"
                            width='150px'
                            align='center'
                            label="商户号">
                            </el-table-column>
                            <el-table-column
                            prop="merchantName"
                            width='150px'
                            align='center'
                            label="商户名称">
                            </el-table-column>
                            <el-table-column
                            prop="product"
                            width='150px'
                            align='center'
                            label="业务产品">
                            </el-table-column>
                            <el-table-column
                            prop="bankNum"
                            width='150px'
                            align='center'
                            label="银行卡号">
                                <template slot-scope="scope">
                                <el-popover trigger="hover" placement="top">
                                    {{ scope.row.bankNum}}
                                <div slot="reference" >
                                    {{ scope.row.bankNumCopy }}
                                </div>
                                </el-popover>
                                </template>
                            </el-table-column>
                            <el-table-column
                            prop="phone"
                            width='150px'
                            align='center'
                            label="手机号">
                                <template slot-scope="scope">
                                <el-popover trigger="hover" placement="top">
                                    {{ scope.row.phone}}
                                <div slot="reference" >
                                    {{ scope.row.phoneCopy }}
                                </div>
                                </el-popover>
                                </template>
                            </el-table-column>
                            <el-table-column
                            prop="idCard"
                            width='150px'
                            align='center'
                            label="身份证号">
                                <template slot-scope="scope">
                                <el-popover trigger="hover" placement="top">
                                    {{ scope.row.idCard}}
                                <div slot="reference" >
                                    {{ scope.row.idCardCopy }}
                                </div>
                                </el-popover>
                                </template>
                            </el-table-column>
                            <el-table-column
                            width='150px'
                            align='center'
                            prop="transactionMoney"
                            label="交易金额（元）">
                            </el-table-column>
                            <el-table-column
                            width='150px'
                            align='center'
                            prop="transactionIp"
                            label="交易IP">
                            </el-table-column>

                            <el-table-column
                            prop="ceshi"
                            width="190px;"
                            align='center'
                            label="商户和易宝承担金额（元）">
                            </el-table-column>
                            <el-table-column
                            prop="ceshi"
                            width="190px;"
                            align='center'
                            label="易宝实际赔付金额（元）">
                            </el-table-column>
                    </el-table>
                    <el-button round @click="remouveChose" style="float:left;margin-top:20px;border: 1px solid rgb(226, 34, 72);color: rgb(226, 34, 72);" v-if="delSelectPermission">删除选中交易</el-button>
                    <el-button round @click="remouveAllChose" style="float:left;margin-top:20px;border: 1px solid rgb(226, 34, 72);color: rgb(226, 34, 72);" v-if="delAllPermission">删除全部交易</el-button>
                    <el-pagination
                        layout="prev, pager, next"
                        :total=totalSizePage
                        style="display: inline-block;float: right;margin-bottom: 15px;margin-top: 15px;">
                    </el-pagination>
                    </div>
                </div>
            </div>
            <hr class="hr">
            <div class="divHead">
                <span class="rideus"></span>资金处理
                <div class="divContent" style="border:0;">
                    <div class="text" style="border: 1px solid #dcdcdc;padding: 18px 0px 10px 0px;width:50%;">
                        <div class="boxOnly" style="margin-top:10px;" >
                            <div class="labelC textborder">涉案资金:</div>
                            <div class="text-box">
                                <el-input style="margin-left:10px"   v-model="amountInvolved"></el-input>
                            </div>
                            <span class="fl" style="font-size: 13px;color: rgb(142, 142, 142);margin-left:15px;">元</span>
                         </div>
                         <div class="boxOnly" style="margin-top:10px;" >
                            <div class="labelC textborder">拒付资金:</div>
                            <div class="text-box">
                                <el-input style="margin-left:10px"   v-model="refusedAmount"></el-input>
                            </div>
                            <span class="fl" style="font-size: 13px;color: rgb(142, 142, 142);margin-left:15px;">元</span>
                         </div>
                    </div>
                    <div class="text" style="border: 1px solid #dcdcdc;padding: 18px 3px 10px 3px;margin-left: -1px;width:49%;">
                        <div class="boxOnly" style="margin-top:10px;" >
                            <div class="labelC" style="margin-left: 25px;">商户和易宝承担金额:</div>
                            <div class="text-box" >
                               <el-input style="margin-left:10px"   v-model="bearMoney"></el-input>
                            </div>
                            <span class="fl" style="font-size: 13px;color: rgb(142, 142, 142);margin-left:15px;">元</span>
                        </div>
                        <div class="boxOnly" style="margin-top:10px;" >
                            <div class="labelC" style="margin-left: 25px;">易宝实际赔付:</div>
                            <div class="text-box" >
                               <el-input style="margin-left:10px"   v-model="actualPaymentMoney"></el-input>
                            </div>
                            <span class="fl" style="font-size: 13px;color: rgb(142, 142, 142);margin-left:15px;">元</span>
                        </div>
                    </div>
                </div>
            </div>
            <hr class="hr">
            <div class="divHead">
                <span class="rideus"></span>深度还原
                <div class="divContent" style="padding-top:0;margin-bottom:0;">
                    <div class="text" style="border-right: 1px solid #dcdcdc;padding: 18px 0px 10px 0px;width:32%;">
                        <div class="boxOnly" style="margin-top:10px;" >
                            <div class="labelC">作案时间:</div>
                            <div class="text-box" >
                                <el-date-picker
                                v-model="crimesTime"
                                type="datetime"
                                value-format='yyyy-M-dd HH:mm:ss'
                                style="margin-left:10px;width: 199px;"
                                placeholder="选择日期时间">
                                </el-date-picker>
                            </div>
                        </div>
                        <div class="boxOnly" style="margin-top:10px;" >
                            <div class="labelC">泄露方式:</div>
                            <div class="text-box" >
                               <!-- <el-input style="margin-left:10px"   v-model="leakageMethod"></el-input> -->
                                <el-select v-model="leakageMethod" placeholder="请选择" style="width:200px;margin-left:10px" @focus="getleakageMethod">
                                    <el-option :label="item.sysname" :value="item.sysconid" v-for='(item,index) in leakageMethodList' :key='index'></el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="boxOnly" style="margin-top:10px;" >
                            <div class="labelC">支付方式:</div>
                            <div class="text-box" >
                               <!-- <el-input style="margin-left:10px"   v-model="payMethod"></el-input> -->
                                <el-select v-model="payMethod" placeholder="请选择" style="width:200px;margin-left:10px" @focus="getpayMethod">
                                    <el-option :label="item.sysname" :value="item.sysconid" v-for='(item,index) in payMethodList' :key='index'></el-option>

                                </el-select>
                            </div>
                        </div>
                    </div>
                    <div class="text" style="border-right: 1px solid #dcdcdc;padding: 18px 3px 10px 3px;margin-left: -1px;width:32%;">
                        <div class="boxOnly" style="margin-top:10px;" >
                            <div class="labelC" style="margin-left: 25px;">业务类型:</div>
                            <div class="text-box" >
                                <!-- <el-input style="margin-left:10px;" v-model="businessType"></el-input> -->
                                <el-select v-model="businessType" placeholder="请选择" style="width:200px;margin-left:10px" @focus="getbusinessType">
                                    <el-option :label="item.sysname" :value="item.sysconid" v-for='(item,index) in businessTypeList' :key='index'></el-option>

                                </el-select>
                            </div>
                        </div>
                        <div class="boxOnly" style="margin-top:10px;" >
                            <div class="labelC" style="margin-left: 25px;">风险原因:</div>
                            <div class="text-box" >
                                <!-- <el-input style="margin-left:10px;" v-model="riskReason"></el-input> -->
                                <el-select v-model="riskReason" placeholder="请选择" style="width:200px;margin-left:10px" @focus="getriskReason">
                                    <el-option :label="item.sysname" :value="item.sysconid" v-for='(item,index) in riskReasonList' :key='index'></el-option>

                                </el-select>
                            </div>
                        </div>

                        <div class="boxOnly" style="margin-top:10px;" >
                            <div class="labelC" style="margin-left: 25px;">支付渠道:</div>
                            <div class="text-box" >
                                <!-- <el-input style="margin-left:10px;" v-model="payChannel"></el-input> -->
                                <el-select v-model="payChannel" placeholder="请选择" style="width:200px;margin-left:10px" @focus="getpayChannel">
                                    <el-option :label="item.sysname" :value="item.sysconid" v-for='(item,index) in payChannelList' :key='index'></el-option>

                                </el-select>
                            </div>
                        </div>
                    </div>
                    <div class="text" style="width:32%;padding: 18px 3px 10px 3px;">
                        <div class="boxOnly" style="margin-top:10px;" >
                            <div class="labelC" style="margin-left: 25px;">泄露渠道:</div>
                            <div class="text-box" >
                                <!-- <el-input style="margin-left:10px;" v-model="leakageChannel"></el-input> -->
                                <el-select v-model="leakageChannel" placeholder="请选择" style="width:200px;margin-left:10px" @focus="getleakageChannel">
                                    <el-option :label="item.sysname" :value="item.sysconid" v-for='(item,index) in leakageChannellList' :key='index'></el-option>

                                </el-select>
                            </div>
                        </div>
                        <div class="boxOnly" style="margin-top:10px;" >
                            <div class="labelC" style="margin-left: 25px;">手机换绑方式:</div>
                            <div class="text-box" >
                                <!-- <el-input style="margin-left:10px;" v-model="bindMethod"></el-input> -->
                                 <el-select v-model="bindMethod" placeholder="请选择" style="width:200px;margin-left:10px" @focus="getbindMethod">
                                    <el-option :label="item.sysname" :value="item.sysconid" v-for='(item,index) in bindMethodList' :key='index'></el-option>

                                </el-select>
                            </div>
                        </div>
                        <div class="boxOnly" style="margin-top:10px;" >
                            <div class="labelC" style="margin-left: 25px;">销账渠道:</div>
                            <div class="text-box" >
                                <!-- <el-input style="margin-left:10px;" v-model="billingChannel"></el-input> -->
                                <el-select v-model="billingChannel" placeholder="请选择" style="width:200px;margin-left:10px" @focus="getbillingChannel">
                                    <el-option :label="item.sysname" :value="item.sysconid" v-for='(item,index) in billingChannelList' :key='index'></el-option>

                                </el-select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="divContent" style="margin-top:0px;padding-top:22px;margin-bottom:0px;border-top:0;">
                    <div class="add" v-for="(v,i) in list" :key="i">
                        <div class="fl addCon" >
                                <div class="labelC" style="margin-left:20px;margin-top:8px;">资金来源:</div>
                                <div class="text-box" style="width:70%;">
                                    <el-select v-model="list[i].a" placeholder="请选择" style="width:200px;margin-left:10px" @focus="getMoneyCome">
                                        <el-option :label="item.sysname" :value="item.sysconid" v-for='(item,index) in MoneyComeList' :key='index'></el-option>
                                    </el-select>
                                </div>
                        </div>
                        <div class="fl addCon" >
                                <div class="text-box" >
                                    <el-input style="margin-left:10px;" v-model="list[i].b"></el-input>
                                </div>
                                <span class="fl" style="font-size: 13px;color: rgb(142, 142, 142);margin-left:15px;margin-top: 8px;">元</span>
                        </div>
                        <div class="fl addCon" >
                                <div class="text-box" >
                                    <el-input style="margin-left:10px;" v-model="list[i].c"></el-input>
                                </div>
                                <span class="fl" style="font-size: 13px;color: rgb(142, 142, 142);margin-left:15px;margin-top: 8px;">银行</span>
                        </div>
                        <el-button type="primary"  style="margin-left: 8px;margin-top:3px;width:110px;" @click="addList" v-if="createPermission">新增</el-button>
                        <el-button type="primary"  style="margin-left: 8px;margin-top:3px;width:110px;" @click="remouveList(i)" id="getListFirst" v-if="delPermission">删除</el-button>
                    </div>
                </div>
            </div>
            <hr class="hr">
            <div class="divHead">
                <span class="rideus"></span>初审结案
                <div class="divContent" style="border:0;">
                    <div class="boxOnly" >
                        <div class="labelC" style="width: 57px;">初审结案:</div>
                        <div class="text-box" >
                            <!-- <el-select placeholder="请选择" v-model="trialStatus">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select> -->
                            <el-select v-model="trialStatus" placeholder="请选择" style="width:200px;margin-left:10px" @focus="gettrialStatus">
                                <el-option :label="item.sysname" :value="item.sysconid" v-for='(item,index) in trialStatusList' :key='index'></el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="textareaIpt" style="margin-top:10px;">
                        <el-input
                            type="textarea"
                            :rows="5"
                            placeholder="请输入备注，最大长度不超过200"
                            :maxlength="200"
                            v-model="trialRemark">
                        </el-input>
                    </div>
                </div>
            </div>
        </div>

        <!-- 初审完结且复审未完结状态 -->
        <div v-if="state3">
            <div class="divHead">
                <span class="rideus"></span>关联交易
                <div class="divContent">
                    <span style="margin-left: 31px;margin-bottom: 10px;display: block;">已关联交易</span>
                    <div class="divContent" style="border:0;padding-top:0px;margin-left: 20px;margin-right: -20px;width:97%;">
                    <el-table
                        :data="state3TableData"
                        border
                        style="width: 100%">
                        <el-table-column
                        prop="merchantOrder"
                        width='100px'
                        align='center'
                        label="商户订单号">
                        </el-table-column>
                        <el-table-column
                        prop="merchantId"
                        width='150px'
                        align='center'
                        label="商户号">
                        </el-table-column>
                        <el-table-column
                        prop="merchantName"
                        width='150px'
                        align='center'
                        label="商户名称">
                        </el-table-column>
                        <el-table-column
                        prop="product"
                        width='150px'
                        align='center'
                        label="业务产品">
                        </el-table-column>
                        <el-table-column
                        prop="bankNum"
                        width='150px'
                        align='center'
                        label="银行卡号">
                             <template slot-scope="scope">
                                <el-popover trigger="hover" placement="top">
                                    {{ scope.row.bankNum}}
                                <div slot="reference" >
                                    {{ scope.row.bankNumCopy }}
                                </div>
                                </el-popover>
                                </template>
                        </el-table-column>
                        <el-table-column
                        prop="phone"
                        width='150px'
                        align='center'
                        label="手机号">
                             <template slot-scope="scope">
                                <el-popover trigger="hover" placement="top">
                                    {{ scope.row.phone}}
                                <div slot="reference" >
                                    {{ scope.row.phoneCopy }}
                                </div>
                                </el-popover>
                            </template>

                        </el-table-column>
                        <el-table-column
                        prop="idCard"
                        width='150px'
                        align='center'
                        label="身份证号">
                            <template slot-scope="scope">
                                <el-popover trigger="hover" placement="top">
                                    {{ scope.row.idCard}}
                                <div slot="reference" >
                                    {{ scope.row.idCardCopy }}
                                </div>
                                </el-popover>
                            </template>

                        </el-table-column>
                        <el-table-column
                        prop="transactionMoney"
                        width='150px'
                        align='center'
                        label="交易金额（元）">
                        </el-table-column>
                        <el-table-column
                        prop="transactionIp"
                        width='150px'
                        align='center'
                        label="交易IP">
                        </el-table-column>
                        <el-table-column
                        prop="transactionLocal"
                        width='150px'
                        align='center'
                        label="交易IP归属地">
                        </el-table-column>
                        <el-table-column
                        prop="transactionTime"
                        width='180px'
                        align='center'
                        label="交易时间">
                        </el-table-column>
                        <el-table-column
                        prop=""
                        width='150px'
                        align='center'
                        label="商户和易宝承担金额">
                        </el-table-column>
                        <el-table-column
                        prop=""
                        width='150px'
                        align='center'
                        label="易宝实际赔付金额">
                        </el-table-column>
                    </el-table>

                    </div>
                </div>
            </div>
            <hr class="hr">
            <div class="divHead">
                <span class="rideus"></span>资金处理
                <div class="divContent" style="border:0;">
                    <div class="text" style="border: 1px solid #dcdcdc;padding: 18px 0px 10px 0px;width:50%;">
                        <div class="boxOnly" >
                            <div class="labelC">涉案资金:</div>
                            <div class="text-box" >
                                <span>{{Retrial_amountInvolved}}</span>
                                <span class="fl">元</span>
                            </div>
                        </div>
                        <div class="boxOnly" >
                            <div class="labelC">拒付资金:</div>
                            <div class="text-box" >
                                <span>{{Retrial_refusedAmount}}</span>
                                <span class="fl">元</span>
                            </div>
                        </div>
                    </div>
                    <div class="text" style="border: 1px solid #dcdcdc;padding: 18px 3px 10px 3px;margin-left: -1px;width:49%;">
                        <div class="boxOnly" >
                            <div class="labelC" style="margin-left: 25px;">商户和易宝承担金额:</div>
                            <div class="text-box" >
                                <span>{{Retrial_bearMoney}}</span>
                                <span class="fl">元</span>
                            </div>
                        </div>
                        <div class="boxOnly" >
                            <div class="labelC" style="margin-left: 25px;">易宝实际赔付:</div>
                            <div class="text-box" >
                                <span>{{Retrial_actualPaymentMoney}}</span>
                                <span class="fl">元</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr class="hr">
            <div class="divHead">
                <span class="rideus"></span>深度还原
                <div class="divContent">
                    <div class="text" style="border-right: 1px solid #dcdcdc;padding: 18px 0px 10px 0px;width:32%;border-bottom:1px solid #dcdcdc">
                        <div class="boxOnly" >
                            <div class="labelC">作案时间:</div>
                            <div class="text-box" >
                                <span>{{Retrial_crimesTime}}</span>
                            </div>
                        </div>
                        <div class="boxOnly" >
                            <div class="labelC">泄露方式:</div>
                            <div class="text-box" >
                                <span>{{Retrial_leakageMethod}}</span>
                            </div>
                        </div>
                        <div class="boxOnly" >
                            <div class="labelC">支付方式:</div>
                            <div class="text-box" >
                                <span>{{Retrial_payMethod}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="text" style="border-right: 1px solid #dcdcdc;padding: 18px 3px 10px 3px;margin-left: -1px;width:32%;border-bottom:1px solid #dcdcdc">
                        <div class="boxOnly" >
                            <div class="labelC" style="margin-left: 25px;">业务类型:</div>
                            <div class="text-box" >
                                <span>{{Retrial_businessType}}</span>
                            </div>
                        </div>
                        <div class="boxOnly" >
                            <div class="labelC" style="margin-left: 25px;">风险原因:</div>
                            <div class="text-box" >
                                <span>{{Retrial_riskReason}}</span>
                            </div>
                        </div>

                        <div class="boxOnly" >
                            <div class="labelC" style="margin-left: 25px;">支付渠道:</div>
                            <div class="text-box" >
                                <span>{{Retrial_payChannel}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="text" style="border-left: 1px solid #dcdcdc;padding: 18px 3px 10px 3px;margin-left: -1px;width:32%;border-bottom:1px solid #dcdcdc">
                        <div class="boxOnly" >
                            <div class="labelC" style="margin-left: 25px;">泄露渠道:</div>
                            <div class="text-box" >
                                <span>{{Retrial_leakageChannel}}</span>
                            </div>
                        </div>
                        <div class="boxOnly" >
                            <div class="labelC" style="margin-left: 25px;">手机换绑方式:</div>
                            <div class="text-box" >
                                <span>{{Retrial_bindMethod}}</span>
                            </div>
                        </div>
                        <div class="boxOnly" >
                            <div class="labelC" style="margin-left: 25px;">销账渠道:</div>
                            <div class="text-box" >
                                <span>{{Retrial_billingChannel}}</span>
                            </div>
                        </div>
                    </div>

                    <div v-for='(item,index) in RetrialList' :key='index'>
                        <div class="text" style="padding: 18px 0px 10px 0px;margin-top:-1px;width:32%;">
                            <div class="boxOnly" >
                                <div class="labelC" >资金来源:</div>
                                <div class="text-box" >
                                    <span>{{item.a}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="text" style="padding: 18px 3px 10px 3px;margin-top:-1px;margin-left: -1px;width:32%;">
                            <div class="boxOnly" >
                                <div class="labelC" style="margin-left: 25px;">银行:</div>
                                <div class="text-box" >
                                    <span>{{item.c}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="text" style="padding: 18px 3px 10px 3px;margin-top:-1px;margin-left: -1px;width:35%;">
                            <div class="boxOnly" >
                                <div class="labelC" style="margin-left: 25px;">金额:</div>
                                <div class="text-box" >
                                    <span>{{item.b}}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <hr class="hr">
            <div class="divHead">
                <span class="rideus"></span>初审结案
                <div class="divContent" style="border:0;">
                    <div class="boxOnly" >
                        <div class="labelC" style="width: 57px;">初审结案:</div>
                        <div class="text-box" >
                            <span>{{Retrial_trialStatus}}</span>
                        </div>
                    </div>
                    <div class="textareaIpt">
                    <el-input
                        type="textarea"
                        :rows="5"
                        readonly="readonly"
                        :maxlength="200"
                        placeholder="请输入备注，最大长度不超过200"
                        v-model="Retrial_trialRemark">
                    </el-input>
                    </div>

                    <div class="boxOnly" style="margin-top:25px;margin-bottom:5px;">
                        <div class="labelC" style="width: 57px;">复审结案:</div>
                        <div class="text-box" >
                            <!-- <el-select v-model='value' placeholder="请选择" style="margin-left:10px;">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select> -->
                            <el-select v-model="Retrial_reviewStatus" placeholder="请选择" style="width:200px;margin-left:10px" @focus="getreviewStatus">
                                <el-option :label="item.sysname" :value="item.sysconid" v-for='(item,index) in reviewStatusList' :key='index'></el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="textareaIpt">
                    <el-input
                        type="textarea"
                        :rows="5"
                        :maxlength="200"
                        placeholder="请输入备注，最大长度不超过200"
                        v-model="Retrial_reviewRemark">
                    </el-input>
                    </div>

                </div>
            </div>
        </div>

    </div>
        <!-- 加入黑名单 -->
        <el-dialog title="加入黑名单" :visible.sync="addBlackListCase" width="30%" >
            <div style='width:100%;text-align:center'>
                <p><i class='el-icon-warning' style='color:#F1F2F5;font-size:25px;'></i></p>
                <p><span>确定加入黑名单吗?</span></p>

            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addBlackListCase = false">取消</el-button>
                <el-button type="primary" @click="addBlackListBtn">确认</el-button>
            </span>
        </el-dialog>
        <!-- 删除黑名单 -->
        <el-dialog title="删除黑名单" :visible.sync="removeBlackListCase" width="30%" >
            <div style='width:100%;text-align:center'>
                <p><i class='el-icon-warning' style='color:#F1F2F5;font-size:25px;'></i></p>
                <p><span>确定删除黑名单吗?</span></p>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="removeBlackListCase = false">取消</el-button>
                <el-button type="primary" @click="removeBlackListBtn">确认</el-button>
            </span>
        </el-dialog>

</div>

</template>
<script>
import qs from 'qs'
import {card,phone,idCard} from '../utils'
export default {
      data() {
        return {
            firstFinishPermission: true,//初审完结权限
            submitPermission: true,//提交权限
            state1savePermission: true,//保存1权限
            state2savePermission: true,//保存2权限
            state3savePermission: true,//保存3权限
            searchPermission: true,//搜索权限
            addBlackPermission: true,//加入黑名单权限
            delBlackPermission: true,//删除黑名单权限
            addSelectPermission: true,//添加选中交易
            addAllPermission: true,//添加全部交易
            delSelectPermission: true,//删除选中交易
            delAllPermission: true,//添加全部交易
            createPermission: true,//新增交易
            delPermission: true,//删除交易

            removeBlackListCase:false,
            addBlackListCase:false,
            show:false,
            list:[
                {a:'',b:'',c:''},
            ],

            caseType:'',

            state2:true,
            state1:false,
            state3:false,
            textarea:'',

            // 关联交易涉及到的table
            state1TableData:[],
            state3TableData:[],
            state2TableOne:[],
            state2TableTwo:[],

            // 选中的table中的数据
            newDeal:[],
            chooseItem:[],

            tableData:[],
            tableData2:[],
            ajlx:[],

            ceshi:'测试数据',
            options:[{
              value: '选项1',
              label: '黄金糕'
            }, {
              value: '选项2',
              label: '双皮奶'
            }],

            value:'',

            // 初审未完结状态的关联交易
            ruleForm:{
                type:'',
                come:'',
                id:'',
                MerchantOrderNumber:'',
            },

            stateAjId:'',  // 从安监中心主页面获取到的单条数据ID

            pageSize:10,
            pageNum:1,

            rules: {
                type: [
                    { required: true, message: ' ', trigger: 'blur' },
                ],
                come: [
                    { required: true, message: ' ', trigger: 'change' }
                ],
                MerchantOrderNumber: [
                    { required: true, message: ' ', trigger: 'change' }
                ],
                merchantIdProp:[
                    { required: true, message: ' ', trigger: 'change' }
                ]
            },
            leakageMethodList:[],
            payMethodList:[],
            businessTypeList:[],
            riskReasonList:[],
            payChannelList:[],
            leakageChannellList:[],
            bindMethodList:[],
            billingChannelList:[],
            MoneyComeList:[],
            trialStatusList:[],
            reviewStatusList:[],

            tableDetail:{


            },
            amountInvolved:'',
            refusedAmount:'',
            bearMoney:'',
            actualPaymentMoney:'',
            leakageMethod:'',
            payMethod:'',
            businessType:'',
            riskReason:'',
            payChannel:'',
            leakageChannel:'',
            bindMethod:'',
            billingChannel:'',
            trialStatus:'',
            trialRemark:'',
            crimesTime:'',
            totalSize:0,
            totalSizePage:0,
            id:'',
            stolenCardNumber:'',
            merchantId:'',
            merchantOrder:'',
            amountInvolved:'',
            bearMoney:'',
            refusedAmount:'',
            actualPaymentMoney:'',
            crimesTime:'',
            businessType:'',
            leakageChannel:'',
            leakageMethod:'',
            riskReason:'',
            bindMethod:'',
            payMethod:'',
            payChannel:'',
            billingChannel:'',
            moneySourceOne:'',
            bankOne:'',
            moneyOne:'',
            moneySourceTwo:'',
            bankTwo:'',
            moneyTwo:'',
            trialStatus:'',
            trialRemark:'',
            state2TableOne:[],
            // 复审中
            Retrial_merchantId:'',
            Retrial_merchantOrder:'',
            Retrial_amountInvolved:'',
            Retrial_bearMoney:'',
            Retrial_refusedAmount:'',
            Retrial_actualPaymentMoney:'',
            Retrial_crimesTime :'',
            Retrial_businessType :'',
            Retrial_leakageChannel :'',
            Retrial_leakageMethod :'',
            Retrial_riskReason :'',
            Retrial_bindMethod :'',
            Retrial_payMethod :'',
            Retrial_payChannel :'',
            Retrial_billingChannel :'',
            Retrial_moneySourceOne :'',
            Retrial_bankOne :'',
            Retrial_moneyOne :'',
            Retrial_moneySourceTwo :'',
            Retrial_bankTwo :'',
            Retrial_moneyTwo :'',
            Retrial_trialStatus :'',
            Retrial_trialRemark:'',
            Retrial_reviewStatus:'',
            Retrial_reviewRemark:'',

            // 复审完结
            retrialEnd_merchantId :'',
            retrialEnd_merchantOrder :'',
            retrialEnd_amountInvolved :'',
            retrialEnd_bearMoney :'',
            retrialEnd_refusedAmount :'',
            retrialEnd_actualPaymentMoney :'',
            retrialEnd_crimesTime :'',
            retrialEnd_businessType :'',
            retrialEnd_leakageChannel :'',
            retrialEnd_leakageMethod :'',
            retrialEnd_riskReason :'',
            retrialEnd_bindMethod :'',
            retrialEnd_payMethod :'',
            retrialEnd_payChannel :'',
            retrialEnd_billingChannel :'',
            retrialEnd_moneySourceOne :'',
            retrialEnd_bankOne :'',
            retrialEnd_moneyOne :'',
            retrialEnd_trialStatus :'',
            retrialEnd_trialRemark :'',
            retrialEnd_reviewStatus :'',
            retrialEnd_reviewRemark :'',
            retrialEnd_refusedAmount:'',

            lineType:'',
            innerTransactionIds:'',

            listString:'',
            RetrialList:[{}],
            retrialEndList:[{}]
        }
      },
    methods:{
        // 获取查看初审状态的详情信息
        getSeeState2(){
            this.$axios.post('/CaseInquiryController/queryFirstTrialDetail',qs.stringify({
                sessionId:localStorage.getItem('SID'),
                operationType:'1',
                id:this.stateAjId,
                caseStatus:'0',
            }))
            .then(res => {
                this.tableDetail = res.data.detail
            })
            .catch(error => {
                console.log(error)
            })
        },
        // 初审时关联交易 添加所有数据到已关联
        addAllChose(){
            this.state2TableTwo = JSON.parse(JSON.stringify(this.state2TableOne))
            this.state2TableTwo.forEach(ele => {
                ele.bankNumCopy = ''
                if(ele.bankNum === ''){
                    ele.bankNumCopy = ele.bankNum
                }else if(ele.bankNum !== ''){
                    ele.bankNumCopy = card(ele.bankNum)
                }

                ele.phoneCopy = ''
                if(ele.phone === ''){
                    ele.phoneCopy = ele.phone
                }else if(ele.phone !== ''){
                    ele.phoneCopy = phone(ele.phone)
                }

                ele.phoneCopy = ''
                if(ele.idCard === ''){
                    ele.idCardCopy = ele.idCard
                }else if(ele.idCard !== ''){
                    ele.idCardCopy = idCard(ele.idCard)
                }

            })
            this.totalSizePage  = this.state2TableOne.length
        },
        // 初审时关联交易 添加选中到已关联
        addChose(){
            // this.state2TableTwo = this.state2TableTwo.concat(this.newDeal)
            //  this.state2TableTwo.forEach(ele => {
            //      this.newDeal.forEach(item => {
            //          if(ele.merchantId !== item.merchantId){
            //             this.state2TableTwo = this.state2TableTwo.push(item)
            //          }
            //      })
            //  })
             let arr = []
            for(let i = 0; i < this.newDeal.length; i++){
               for(let j = 0; j < this.newDeal.length; j++){
                   if(this.newDeal[i].bankNum !== this.newDeal[j].bankNum){
                       arr.push(this.newDeal[i])
                   }
               }
            }

            if(arr.length !== 0){
                this.$alert('交易中有不同卡号', '提示', {
                    confirmButtonText: '确定',
                    type:'warning',
                });
                return
            }else if(arr.length === 0){
                this.state2TableTwo = JSON.parse(JSON.stringify(this.newDeal))
                this.state2TableTwo.forEach(ele => {
                    ele.bankNumCopy = ''
                    if(ele.bankNum === ''){
                        ele.bankNumCopy = ele.bankNum
                    }else if(ele.bankNum !== ''){
                        ele.bankNumCopy = card(ele.bankNum)
                    }

                    ele.phoneCopy = ''
                    if(ele.phone === ''){
                        ele.phoneCopy = ele.phone
                    }else if(ele.phone !== ''){
                        ele.phoneCopy = phone(ele.phone)
                    }

                    ele.phoneCopy = ''
                    if(ele.idCard === ''){
                        ele.idCardCopy = ele.idCard
                    }else if(ele.idCard !== ''){
                        ele.idCardCopy = idCard(ele.idCard)
                    }

                })
                this.totalSizePage  = this.newDeal.length
            }
            // this.totalSizePage =  this.newDeal.length
        },
        // 初审时关联交易 删除所有选中到已关联的数据
        remouveAllChose(){
            this.state2TableTwo = []
            this.totalSizePage = 0
        },
        // 删除所选中的关联交易
        remouveChose(){

            let arr = []
            this.chooseItem.forEach(ele => {arr.push(ele.orderId)})

            for(let i=0;i<arr.length;i++){
                for(let j=0;j<this.state2TableTwo.length;j++){
                    if(arr[i] === this.state2TableTwo[j].orderId){
                        // console.log(this.state2TableTwo[j])
                        this.state2TableTwo.splice(j,1)
                    }
                }
            }
        },
        // 获取状态对应的初始页面
        init(){
            var state = window.location.href.split('?')[1]
            var stateName = state.split('&')[0].split('=')[1]
            var stateId = state.split('&')[1].split('=')[1]


            this.stateAjId = stateId

            if(stateName == '1'){
                // 初审中
                this.state2=true
                this.state1=false
                this.state3=false
                this.getState2()
            }else if(stateName == '2'){
                // 复审中
                this.state2=false
                this.state1=false
                this.state3=true
                this.getState3()
            }else if(stateName == '3'){
                // 复审完结
                this.state2=false
                this.state1=true
                this.state3=false
                this.getState1()
            }
            this.id = localStorage.getItem('ID')

           this.stolenCardNumber = localStorage.getItem('STOLENUM')
            if(this.stolenCardNumber == undefined || this.stolenCardNumber == ''){
                this.stolenCardNumber = ''
            }else if(this.stolenCardNumber !== undefined || this.stolenCardNumber !== ''){
                this.stolenCardNumber = localStorage.getItem('STOLENUM')
            }

             this.merchantOrder = localStorage.getItem('MERID')
                // console.log(this.merchantOrder)
            if(this.merchantOrder == 'undefined' || this.merchantOrder == ''){

                this.merchantOrder = ''
            }else if(this.merchantOrder !== 'undefined'){

                this.merchantOrder = localStorage.getItem('MERID')
            }

            if(this.merchantId == 'undefined' || this.merchantId == ''){

                this.merchantId = ''
            }else if(this.merchantId !== 'undefined'){

                this.merchantId = localStorage.getItem('merchantMgtCode')
            }

            this.newCaseSerch()

        },
        // 获取已关联交易
        getTransactionList(){
            let str = ''
            if(localStorage.getItem('BUSILINE') == '线上'){
                str = 671
            }else if(localStorage.getItem('BUSILINE') == '线下'){
                str = 672
            }

            console.log(this.innerTransactionIds)

            this.$axios.post('CaseInquiryController/queryInnerTransactionRecord',qs.stringify({
                'sessionId':localStorage.getItem('SID'),
                'lineType':parseInt(str),
                'dbIds':this.innerTransactionIds
            }))
            .then(res => {

                // console.log(res.data)
                this.state3TableData = []
                this.state3TableData = this.state3TableData.concat(res.data.recordList)
                this.state3TableData.forEach(ele => {
                    ele.bankNumCopy = ''
                    if(ele.bankNum === ''){
                        ele.bankNumCopy = ele.bankNum
                    }else if(ele.bankNum !== ''){
                        ele.bankNumCopy = card(ele.bankNum)
                    }

                    ele.phoneCopy = ''
                    if(ele.phone === ''){
                        ele.phoneCopy = ele.phone
                    }else if(ele.phone !== ''){
                        ele.phoneCopy = phone(ele.phone)
                    }

                    ele.phoneCopy = ''
                    if(ele.idCard === ''){
                        ele.idCardCopy = ele.idCard
                    }else if(ele.idCard !== ''){
                        ele.idCardCopy = idCard(ele.idCard)
                    }

                })

                this.state2TableTwo = []
                this.state2TableTwo = this.state2TableTwo.concat(res.data.recordList)
                this.state2TableTwo.forEach(ele => {
                    ele.bankNumCopy = ''
                    if(ele.bankNum === ''){
                        ele.bankNumCopy = ele.bankNum
                    }else if(ele.bankNum !== ''){
                        ele.bankNumCopy = card(ele.bankNum)
                    }

                    ele.phoneCopy = ''
                    if(ele.phone === ''){
                        ele.phoneCopy = ele.phone
                    }else if(ele.phone !== ''){
                        ele.phoneCopy = phone(ele.phone)
                    }

                    ele.phoneCopy = ''
                    if(ele.idCard === ''){
                        ele.idCardCopy = ele.idCard
                    }else if(ele.idCard !== ''){
                        ele.idCardCopy = idCard(ele.idCard)
                    }

                })

                this.state1TableData = []
                this.state1TableData = this.state1TableData.concat(res.data.recordList)
                this.state1TableData.forEach(ele => {
                    ele.bankNumCopy = ''
                    if(ele.bankNum === ''){
                        ele.bankNumCopy = ele.bankNum
                    }else if(ele.bankNum !== ''){
                        ele.bankNumCopy = card(ele.bankNum)
                    }

                    ele.phoneCopy = ''
                    if(ele.phone === ''){
                        ele.phoneCopy = ele.phone
                    }else if(ele.phone !== ''){
                        ele.phoneCopy = phone(ele.phone)
                    }

                    ele.phoneCopy = ''
                    if(ele.idCard === ''){
                        ele.idCardCopy = ele.idCard
                    }else if(ele.idCard !== ''){
                        ele.idCardCopy = idCard(ele.idCard)
                    }

                })

                console.log(this.state1TableData)
                console.log(this.state2TableTwo)
                console.log(this.state3TableData)

            })
            .catch(error => {
                console.log(error)
            })
        },
        // 获取商户编号到关联交易的input中
        getMerchantId(){
        //   console.log(localStorage.getItem('merchantMgtCode'))
          this.merchantId = localStorage.getItem('merchantMgtCode')
        },
        // 初审中 状态详情获取
        getState2(){
            this.$axios.post('/CaseInquiryController/queryFirstTrialDetail',qs.stringify({
                sessionId:localStorage.getItem('SID'),
                id:window.location.href.split('?')[1].split('&')[1].split('=')[1],   // 案件编号
                operationType:1
            }))
            .then(res => {
                console.log(res.data)
                // this.id = res.data.detail.id,
                // this.stolenCardNumber = res.data.detail.stolenCardNumber
                // this.merchantId = res.data.detail.merchantId
                // this.merchantOrder = res.data.detail.merchantOrder
                this.amountInvolved = res.data.detail.amountInvolved
                this.bearMoney = res.data.detail.bearMoney
                this.refusedAmount = res.data.detail.refusedAmount
                this.actualPaymentMoney = res.data.detail.actualPaymentMoney
                this.crimesTime = res.data.detail.crimesTime
                this.businessType = res.data.detail.businessType
                this.leakageChannel = res.data.detail.leakageChannel
                this.leakageMethod = res.data.detail.leakageMethod
                this.riskReason = res.data.detail.riskReason
                this.bindMethod = res.data.detail.bindMethod
                this.payMethod = res.data.detail.payMethod
                this.payChannel = res.data.detail.payChannel
                this.billingChannel = res.data.detail.billingChannel

                this.trialStatus = res.data.detail.trialStatus
                this.trialRemark = res.data.detail.trialRemark
                this.innerTransactionIds = res.data.detail.innerTransactionIds
                if(res.data.detail.moneySources !== ''){
                    this.list = JSON.parse(res.data.detail.moneySources)
                }

                this.getTransactionList()

                this.MoneyComeList.forEach(item => {
                    this.list.forEach(ele => {
                        if(item.sysconid === ele.a){
                            ele.a = item.sysname
                        }
                    })
                })


                // this.list = JSON.parse(res.data.detail.moneySources)
                //     console.log( this.list)

                // this.MoneyComeList.forEach(item => {
                //     this.list.forEach(ele => {
                //         if(item.sysconid === ele.a){
                //             ele.a = item.sysname
                //         }
                //     })
                // })

                // this.state2TableOne = []

                // if(res.data.detail.recordList !== undefined){

                //     this.state2TableOne = this.state2TableOne.concat(res.data.detail.recordList)
                // }else if(res.data.detail.recordList == undefined){

                //     this.state2TableOne = []
                // }



            })
            .catch(error => {
                console.log(error)
            })
        },
        // 复审未完结状态
        getState3(){
            this.$axios.post('/CaseInquiryController/queryFirstReviewDetail',qs.stringify({
                sessionId:localStorage.getItem('SID'),
                id:window.location.href.split('?')[1].split('&')[1].split('=')[1],   // 案件编号
                operationType:1,

            }))
            .then(res => {
                console.log(res.data)
                // this.id = res.data.detail.id
                // this.stolenCardNumber = res.data.detail.stolenCardNumber

                // this.Retrial_merchantId = res.data.detail.merchantId
                this.Retrial_merchantOrder = res.data.detail.merchantOrder
                this.Retrial_amountInvolved = res.data.detail.amountInvolved
                this.Retrial_bearMoney = res.data.detail.bearMoney
                this.Retrial_refusedAmount = res.data.detail.refusedAmount
                this.Retrial_actualPaymentMoney = res.data.detail.actualPaymentMoney
                this.Retrial_crimesTime = res.data.detail.crimesTime
                this.Retrial_businessType = res.data.detail.businessType
                this.Retrial_leakageChannel = res.data.detail.leakageChannel
                this.Retrial_leakageMethod = res.data.detail.leakageMethod
                this.Retrial_riskReason = res.data.detail.riskReason
                this.Retrial_bindMethod = res.data.detail.bindMethod
                this.Retrial_payMethod = res.data.detail.payMethod
                this.Retrial_payChannel = res.data.detail.payChannel
                this.Retrial_billingChannel = res.data.detail.billingChannel
                this.Retrial_moneySourceOne = res.data.detail.moneySourceOne
                this.Retrial_bankOne = res.data.detail.bankOne
                this.Retrial_moneyOne = res.data.detail.moneyOne
                this.Retrial_moneySourceTwo = res.data.detail.moneySourceTwo
                this.Retrial_bankTwo = res.data.detail.bankTwo
                this.Retrial_moneyTwo = res.data.detail.moneyTwo
                this.Retrial_trialStatus = res.data.detail.trialStatus
                this.Retrial_trialRemark = res.data.detail.trialRemark
                this.Retrial_reviewStatus = res.data.detail.reviewStatus
                this.Retrial_reviewRemark = res.data.detail.reviewRemark
                this.innerTransactionIds = res.data.detail.innerTransactionIds

                 if(res.data.detail.moneySources !== ''){
                    this.RetrialList = JSON.parse(res.data.detail.moneySources)
                }



                this.MoneyComeList.forEach(item => {

                    this.RetrialList.forEach(ele => {
                        if(item.sysconid === ele.a){
                            ele.a = item.sysname

                        }
                    })
                })
                this.getTransactionList()


                this.state3TableData = this.state3TableData.concat(res.data.recordList)

                // this.state3TableData.forEach(ele => {
                //     ele.bankNumCopy = ''
                //     if(ele.bankNum === ''){
                //         ele.bankNumCopy = ele.bankNum
                //     }else if(ele.bankNum !== ''){
                //         ele.bankNumCopy = card(ele.bankNum)
                //     }

                //     ele.phoneCopy = ''
                //     if(ele.phone === ''){
                //         ele.phoneCopy = ele.phone
                //     }else if(ele.phone !== ''){
                //         ele.phoneCopy = phone(ele.phone)
                //     }

                //     ele.phoneCopy = ''
                //     if(ele.idCard === ''){
                //         ele.idCardCopy = ele.idCard
                //     }else if(ele.idCard !== ''){
                //         ele.idCardCopy = idCard(ele.idCard)
                //     }

                // })

            })
            .catch(error => {
                console.log(error)
            })
        },
        // 复审完结状态
        getState1(){
            console.log(window.location.href.split('?')[1].split('&')[1].split('=')[1])
            this.$axios.post('/CaseInquiryController/queryReviewDetail',qs.stringify({
                sessionId:localStorage.getItem('SID'),
                id:window.location.href.split('?')[1].split('&')[1].split('=')[1],   // 案件编号
                operationType:1
            }))
            .then(res => {
                // console.log('1056')
                // console.log(res.data)
                // this.id = res.data.detail.id
                // this.stolenCardNumber = res.data.detail.stolenCardNumber
                // this.retrialEnd_merchantId = res.data.detail.merchantId
                this.retrialEnd_merchantOrder = res.data.detail.merchantOrder
                this.retrialEnd_amountInvolved = res.data.detail.amountInvolved
                this.retrialEnd_bearMoney = res.data.detail.bearMoney
                this.retrialEnd_refusedAmount = res.data.detail.refusedAmount
                this.retrialEnd_actualPaymentMoney = res.data.detail.actualPaymentMoney
                this.retrialEnd_crimesTime = res.data.detail.crimesTime
                this.retrialEnd_businessType = res.data.detail.businessType
                this.retrialEnd_leakageChannel = res.data.detail.leakageChannel
                this.retrialEnd_leakageMethod = res.data.detail.leakageMethod
                this.retrialEnd_riskReason = res.data.detail.riskReason
                this.retrialEnd_bindMethod = res.data.detail.bindMethod
                this.retrialEnd_payMethod = res.data.detail.payMethod
                this.retrialEnd_payChannel = res.data.detail.payChannel
                this.retrialEnd_billingChannel = res.data.detail.billingChannel
                this.retrialEnd_moneySourceOne = res.data.detail.moneySourceOne
                this.retrialEnd_bankOne = res.data.detail.bankOne
                this.retrialEnd_moneyOne = res.data.detail.moneyOne
                this.retrialEnd_trialStatus = res.data.detail.trialStatus
                this.retrialEnd_trialRemark = res.data.detail.trialRemark
                this.retrialEnd_reviewStatus = res.data.detail.reviewStatus
                this.retrialEnd_reviewRemark = res.data.detail.reviewRemark
                this.retrialEnd_refusedAmount = res.data.detail.refusedAmount
                this.innerTransactionIds = res.data.detail.innerTransactionIds

                console.log(this.retrialEnd_trialRemark)

                if(res.data.detail.moneySources !== ''){
                    this.retrialEndList = JSON.parse(res.data.detail.moneySources)
                }


                this.MoneyComeList.forEach(item => {
                    this.retrialEndList.forEach(ele => {
                        if(item.sysconid === ele.a){
                            ele.a = item.sysname
                        }
                    })
                })

                this.getTransactionList()



                // this.state1TableData.forEach(ele => {
                //     ele.bankNumCopy = ''
                //     if(ele.bankNum === ''){
                //         ele.bankNumCopy = ele.bankNum
                //     }else if(ele.bankNum !== ''){
                //         ele.bankNumCopy = card(ele.bankNum)
                //     }

                //     ele.phoneCopy = ''
                //     if(ele.phone === ''){
                //         ele.phoneCopy = ele.phone
                //     }else if(ele.phone !== ''){
                //         ele.phoneCopy = phone(ele.phone)
                //     }

                //     ele.phoneCopy = ''
                //     if(ele.idCard === ''){
                //         ele.idCardCopy = ele.idCard
                //     }else if(ele.idCard !== ''){
                //         ele.idCardCopy = idCard(ele.idCard)
                //     }

                // })



            })
            .catch(error => {
                console.log(error)
            })
        },
        // 动态增删数据的小功能
        addList(){
            this.list.push({a:'',b:'',c:''})
            // var listC = JSON.stringify(this.list)
            // console.log(listC)

            // var listC1 = listC.replace(/:/g,"|")
            // listC.replace(/"/g,"")
            // console.log(listC1)
        },
        // 动态增删数据的小功能
        remouveList(index){
            this.list.splice(index,1)
        },
        submit(){

            this.reviewStatusList.forEach(ele => {
                if(ele.sysname == this.Retrial_reviewStatus){
                    this.Retrial_reviewStatus = ele.sysconid
                }
            })

             this.$axios.post('/CaseInquiryController/queryFirstReviewDetail',qs.stringify({
                 'sessionId':localStorage.getItem('SID'),
                 'id':this.stateAjId,
                 'caseStatus':663,
                 'operationType':3,
                 'reviewStatus':this.Retrial_reviewStatus,
                 'reviewRemark':this.Retrial_reviewRemark,

             }))
             .then(res => {
                //  console.log(res.data)
                 if(res.data.code === 1){
                     this.$alert('成功','提示',{
                         confirmButtonText:'确定',
                         type:'success',
                         callback:action=>{
                            window.close()
                         }
                     })
                 }else if(res.data.code !== 1){
                     this.$alert('失败','提示',{
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
        // 初审完结按钮
        firstFinish(){
            if(this.caseType === undefined){
                document.querySelector("#caseType").style.border = "1px solid #f56c6c"
                this.$alert('案件类型不能为空', '提示', {
                    confirmButtonText: '确定',
                    type:'warning',
                });
                return
            }else if(this.caseType !== ''){
                document.querySelector("#caseType").style.border = "1px solid #dcdfe6"

                let arr = []
                this.state2TableTwo.forEach(ele => {
                    arr.push(ele.orderId)
                });
                 this.leakageMethodList.forEach(ele => {
                    if(ele.sysname == this.leakageMethod){
                        this.leakageMethod = ele.sysconid
                    }
                })

                this.payMethodList.forEach(ele => {
                    if(ele.sysname == this.payMethod){
                        this.payMethod = ele.sysconid
                    }
                })

                this.businessTypeList.forEach(ele => {
                    if(ele.sysname == this.businessType){
                        this.businessType = ele.sysconid
                    }
                })

                this.riskReasonList.forEach(ele => {
                    if(ele.sysname == this.riskReason){
                        this.riskReason = ele.sysconid
                    }
                })

                this.payChannelList.forEach(ele => {
                    if(ele.sysname == this.payChannel){
                        this.payChannel = ele.sysconid

                    }
                })

                this.leakageChannellList.forEach(ele => {
                    if(ele.sysname == this.leakageChannel){
                        this.leakageChannel = ele.sysconid
                    }
                })

                this.bindMethodList.forEach(ele => {
                    if(ele.sysname == this.bindMethod){
                        this.bindMethod = ele.sysconid
                    }
                })

                this.billingChannelList.forEach(ele => {
                    if(ele.sysname == this.billingChannel){
                        this.billingChannel = ele.sysconid
                    }
                });

                this.trialStatusList.forEach(ele => {
                    if(ele.sysname == this.trialStatus){
                        this.trialStatus = ele.sysconid
                    }
                })


                 if(this.state2TableTwo.length === 0){
                     this.$alert('请添加已关联交易','系统提示',{
                         confirmButtonText:'确定',
                         type:'warning',
                         callback:action=>{

                         }
                     })
                     return
                 }

                this.MoneyComeList.forEach(item => {
                    this.list.forEach(ele => {
                        if(item.sysname === ele.a){
                            ele.a = item.sysconid
                        }
                    })
                })

                this.$axios.post('/CaseInquiryController/queryFirstTrialDetail',qs.stringify({
                    sessionId:localStorage.getItem('SID'),
                    operationType:3,
                    caseStatus:661,
                    id:this.stateAjId,
                    merchantId:this.merchantId,
                    merchantOrder:this.merchantOrder,
                    ids:arr.join(','),
                    amountInvolved:this.amountInvolved,
                    bearMoney:this.bearMoney,
                    actualPaymentMoney:this.actualPaymentMoney,
                    crimesTime:this.crimesTime,
                    businessType:this.businessType,
                    leakageChannel:this.leakageChannel,
                    leakageMethod:this.leakageMethod,
                    riskReason:this.riskReason,
                    bindMethod:this.bindMethod,
                    payMethod:this.payMethod,
                    payChannel:this.payChannel,
                    billingChannel:this.billingChannel,

                    trialStatus:this.trialStatus,
                    trialRemark:this.trialRemark,
                    stolenCardNumber:this.state2TableTwo[0].bankNum,
                    refusedAmount:this.refusedAmount,
                    moneySources:JSON.stringify(this.list)
                }))
                .then(res => {
                    console.log(res)
                    if(res.data.code === 1){
                        this.$alert('案件初审成功','提示',{
                            confirmButtonText:'确定',
                            type:'success',
                            callback:action=>{
                                window.close()
                            }
                        })
                    }else if(res.data.code !== 1){
                        this.$alert('案件初审失败','提示',{
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

            }
        },
        // 保存 复审完结状态
        state1save(){
                if(this.caseType === undefined){
                document.querySelector("#caseType").style.border = "1px solid #f56c6c"
                this.$alert('案件类型不能为空', '提示', {
                    confirmButtonText: '确定',
                    type:'warning',
                });
                return
            }else if(this.caseType !== ''){
                document.querySelector("#caseType").style.border = "1px solid #dcdfe6"
                this.$axios.post('/CaseInquiryController/queryReviewDetail',qs.stringify({
                    'sessionId':localStorage.getItem('SID'),
                    'id':this.stateAjId,
                    'caseStatus':663,
                    'operationType':2,
                    'caseType':this.caseType,
                    'trialRemark':this.retrialEnd_trialRemark,
                    'reviewRemark':this.retrialEnd_reviewRemark,
                    'refusedAmount':this.retrialEnd_refusedAmount,
                }))
                .then(res => {
                    // console.log(res.data)
                    if(res.data.code === 1){
                        this.$alert('成功','提示',{
                            confirmButtonText:'确定',
                            type:'success',
                            callback:action=>{
                                window.close()
                            }
                        })
                    }else if(res.data.code !== 1){
                        this.$alert('失败','提示',{
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
            }
        },
        // 保存 初审未完结状态
        state2save(){
            // console.log(this.caseType)


            if(this.caseType === undefined){
                document.querySelector("#caseType").style.border = "1px solid #f56c6c"
                this.$alert('案件类型不能为空', '提示', {
                    confirmButtonText: '确定',
                    type:'warning',
                });
                return
            }else if(this.caseType !== ''){
                document.querySelector("#caseType").style.border = "1px solid #dcdfe6"
                let arr = []
                this.state2TableTwo.forEach(ele => {
                    arr.push(ele.orderId)
                });


                console.log(this.caseType)


                this.leakageMethodList.forEach(ele => {
                    if(ele.sysname == this.leakageMethod){
                        this.leakageMethod = ele.sysconid
                    }
                })

                this.payMethodList.forEach(ele => {
                    if(ele.sysname == this.payMethod){
                        this.payMethod = ele.sysconid
                    }
                })

                this.businessTypeList.forEach(ele => {
                    if(ele.sysname == this.businessType){
                        this.businessType = ele.sysconid
                    }
                })

                this.riskReasonList.forEach(ele => {
                    if(ele.sysname == this.riskReason){
                        this.riskReason = ele.sysconid
                    }
                })

                this.payChannelList.forEach(ele => {
                    if(ele.sysname == this.payChannel){
                        this.payChannel = ele.sysconid

                    }
                })

                this.leakageChannellList.forEach(ele => {
                    if(ele.sysname == this.leakageChannel){
                        this.leakageChannel = ele.sysconid
                    }
                })

                this.bindMethodList.forEach(ele => {
                    if(ele.sysname == this.bindMethod){
                        this.bindMethod = ele.sysconid
                    }
                })

                this.billingChannelList.forEach(ele => {
                    if(ele.sysname == this.billingChannel){
                        this.billingChannel = ele.sysconid
                    }
                });

                this.trialStatusList.forEach(ele => {
                    if(ele.sysname == this.trialStatus){
                        this.trialStatus = ele.sysconid
                    }
                })


                 if(this.state2TableTwo.length === 0){
                     this.$alert('请添加已关联交易','系统提示',{
                         confirmButtonText:'确定',
                         type:'warning',
                         callback:action=>{

                         }
                     })
                     return
                 }

                this.MoneyComeList.forEach(item => {
                    this.list.forEach(ele => {
                        if(item.sysname === ele.a){
                            ele.a = item.sysconid
                        }
                    })
                })

                this.$axios.post('/CaseInquiryController/queryFirstTrialDetail',qs.stringify({
                    sessionId:localStorage.getItem('SID'),
                    operationType:2,
                    id:this.stateAjId,
                    caseType:this.caseType,
                    merchantId:this.merchantId,
                    merchantOrder:this.merchantOrder,
                    ids:arr.join(','),
                    amountInvolved:this.amountInvolved,
                    bearMoney:this.bearMoney,
                    actualPaymentMoney:this.actualPaymentMoney,
                    crimesTime:this.crimesTime,
                    businessType:this.businessType,
                    leakageChannel:this.leakageChannel,
                    leakageMethod:this.leakageMethod,
                    riskReason:this.riskReason,
                    bindMethod:this.bindMethod,
                    payMethod:this.payMethod,
                    payChannel:this.payChannel,
                    billingChannel:this.billingChannel,

                    trialStatus:this.trialStatus,
                    trialRemark:this.trialRemark,
                    stolenCardNumber:this.state2TableTwo[0].bankNum,
                    refusedAmount:this.refusedAmount,
                    moneySources:JSON.stringify(this.list)

                }))
                .then(res => {
                    console.log(res)
                    if(res.data.code === 1){
                        this.$alert('成功','提示',{
                            confirmButtonText:'确定',
                            type:'success',
                            callback:action=>{
                                window.close()
                            }
                        })
                    }else if(res.data.code !== 1){
                        this.$alert(res.data.message,'提示',{
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
        // 保存 初审完结且复审未完结状态
        state3save(){
            // console.log(this.Retrial_reviewStatus)
            if(this.caseType === undefined){
                document.querySelector("#caseType").style.border = "1px solid #f56c6c"
                this.$alert('案件类型不能为空', '提示', {
                    confirmButtonText: '确定',
                    type:'warning',
                });
                return
            }else if(this.caseType !== ''){
                this.reviewStatusList.forEach(ele => {
                    if(ele.sysname == this.Retrial_reviewStatus){
                        this.Retrial_reviewStatus = ele.sysconid
                    }
                })
                // console.log(this.Retrial_reviewStatus)
                document.querySelector("#caseType").style.border = "1px solid #dcdfe6"
                this.$axios.post('/CaseInquiryController/queryFirstReviewDetail',qs.stringify({
                    'sessionId':localStorage.getItem('SID'),
                    'id':this.stateAjId,
                    'operationType':2,
                    'caseType':this.caseType,
                    'trialRemark':this.Retrial_trialRemark,
                    'reviewStatus':this.Retrial_reviewStatus,
                    'reviewRemark':this.Retrial_reviewRemark,
                    'refusedAmount':this.Retrial_refusedAmount
                }))
                .then(res => {
                    // console.log(res.data)
                    if(res.data.code === 1){
                        this.$alert('成功','提示',{
                            confirmButtonText:'确定',
                            type:'success',
                            callback:action=>{
                                window.close()
                            }
                        })
                    }
                })
            }
        },
        // 获取关联交易的table数据
        newCaseSerch(){
            // if(this.merchantId === ''){
            //     document.querySelector("#merchantIdProp").style.border = "1px solid #f56c6c"
            //     return
            // }else if(this.merchantId !== ''){
            //     document.querySelector("#merchantIdProp").style.border = "1px solid #dcdfe6"
            // }
            if(this.merchantOrder === ''){
                document.querySelector("#MerchantOrderNumber").style.border = "1px solid #f56c6c"
                return
            }else if(this.merchantOrder !== ''){
                document.querySelector("#MerchantOrderNumber").style.border = "1px solid #dcdfe6"


                this.$axios.post('/CaseInquiryController/queryInnerTransaction',qs.stringify({
                    sessionId:localStorage.getItem('SID'),
                    merchantId:this.merchantId,
                    merchantOrder:this.merchantOrder,
                    pageSize: parseInt(this.pageSize) ,
                    pageNum:parseInt(this.pageNum) ,

                }))
                .then(res => {
                    console.log(res.data)
                    if(res.data.recordList !== ''){
                        this.state2TableOne = res.data.recordList
                        this.totalSize = res.data.recordList.length
                        this.lineType = res.data.lineType

                        this.state2TableOne.forEach(ele => {
                            ele.bankNumCopy = ''
                            if(ele.bankNum === ''){
                                ele.bankNumCopy = ele.bankNum
                            }else if(ele.bankNum !== ''){
                                ele.bankNumCopy = card(ele.bankNum)
                            }

                            ele.phoneCopy = ''
                            if(ele.phone === ''){
                                ele.phoneCopy = ele.phone
                            }else if(ele.phone !== ''){
                                ele.phoneCopy = card(ele.phone)
                            }

                            ele.phoneCopy = ''
                            if(ele.idCard === ''){
                                ele.idCardCopy = ele.idCard
                            }else if(ele.idCard !== ''){
                                ele.idCardCopy = card(ele.idCard)
                            }

                        })

                    }

                })
                .catch(error => {
                    console.log(error)
                })




            }
        },
        addBlackListBtn(){
                    // console.log(this.newDeal)

                     let arr = []
                     this.newDeal.forEach(ele => {
                         ele.offline_merchantId = ele.merchantId
                         ele.offline_terminalIdBl = ''
                         ele.offline_corporateName = ''
                         ele.offline_corporateNo = ''
                         ele.offline_settlementAcct = ''
                         ele.offline_settlementAcctName = ''
                         ele.offline_businessId = ''
                         ele.offline_merchantGuid = ''
                         ele.online_imeiBl = ''
                         ele.online_terminalIdBl = ''
                         ele.online_loginNameBl = localStorage.getItem('testName')
                         ele.online_userIpBl = ele.transactionIp
                         ele.online_userPhoneBl = ele.phone
                         ele.online_idNoBl = ele.idCard
                         ele.online_referBl = ''
                         ele.online_bankCardNoBl = ele.bankNum
                        ele.paramMerchantId = ele.merchantId
                        ele.paramMerchantOrder = ele.merchantOrder
                         arr.push(ele)
                     })
                     let busiStr = ''
                    if(localStorage.getItem('BUSILINE') == '线上'){
                        busiStr = 'online'
                    }else if(localStorage.getItem('BUSILINE') == '线下'){
                        busiStr = 'offline'
                    }
                    // console.log(JSON.stringify(arr))
                    this.$axios.post('/NameListController/batchSaveName',qs.stringify({
                        'sessionId':localStorage.getItem('SID'),
                        'source':'753',
                        'type':'black',
                        'bizLine':'online',
                        'comments':'',
                        'buttonType':'case_detail_black',
                        'data': JSON.stringify(arr),
                        'loginPerson':localStorage.getItem('testName')

                    }))
                    .then(res => {
                        // console.log(res.data)
                        if(res.data.code === 1){
                            this.$alert(res.data.message,'提示',{
                                confirmButtonText:'确定',
                                type:'success',
                                callback:action=>{
                                    this.addBlackListCase = false

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
        // 加黑
        blackAdd(){
            if(this.newDeal.length === 0){
                this.$alert('请选择一条加黑的数据','系统提示',{
                    confirmButtonText:'确定',
                    type:'warning'
                })
                return
            }
                this.addBlackListCase = true
        },
        // 删黑
        blackRemouve(){
            if(this.newDeal.length == 0){
                this.$alert('请至少选择一条需要操作的数据', '系统提示', {
                    confirmButtonText: '确定',
                    type: 'warning'
                });
            }else{
                this.removeBlackListCase = true

                    // console.log(this.stolenCardNumber)


            }
        },
        // 批量删除黑名单
        removeBlackListBtn(){
            console.log(this.newDeal)
             let arr = []
            this.newDeal.forEach(ele => {
                ele.offline_merchantId = ele.merchantId
                ele.offline_terminalIdBl = ''
                ele.offline_corporateName = ''
                ele.offline_corporateNo = ''
                ele.offline_settlementAcct = ''
                ele.offline_settlementAcctName = ''
                ele.offline_businessId = ''
                ele.offline_merchantGuid = ''
                ele.online_imeiBl = ''
                ele.online_terminalIdBl = ''
                ele.online_loginNameBl = localStorage.getItem('testName')
                ele.online_userIpBl = ele.transactionIp
                ele.online_userPhoneBl = ele.phone
                ele.online_idNoBl = ele.idCard
                ele.online_referBl = ''
                ele.online_bankCardNoBl = ele.bankNum
                ele.paramMerchantId = ele.merchantId
                ele.paramMerchantOrder = ele.merchantOrder
                arr.push(ele)
            })

            // console.log(typeof(arr.join(',')))
            this.$axios.post('/NameListController/batchSaveName',qs.stringify({
                'sessionId':localStorage.getItem('SID'),
                'source':'753',
                'type':'black',
                'bizLine':'online',
                'comments':'',
                'buttonType':'case_detail_delBlack',
                'data': JSON.stringify(arr),
                'loginPerson':localStorage.getItem('testName')
            }))
            .then(res => {
                // console.log(res.data)
                if(res.data.code === 1){
                    this.$alert(res.data.message,'提示',{
                        confirmButtonText:'确定',
                        type:'success',
                        callback:action=>{
                            this.removeBlackListCase = false
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
        },
        handleSelectionChange(val) {
            this.newDeal = JSON.parse(JSON.stringify(val)) ;
            // console.log(this.newDeal)
        },
        handleSelection(row){
            // console.log(row)
            this.chooseItem = JSON.parse(JSON.stringify(row)) ;
        },
        hiddenListFirst(){
            var getListFirst = document.getElementById("getListFirst")
            getListFirst.style.display = "none"
        },
        // 泄漏方式
        getleakageMethod(){
            this.$axios.post('/SysConfigController/queryEnum',qs.stringify({
                'sessionId':localStorage.getItem('SID'),
                'type':22
            }))
            .then(res => {
                // console.log(res.data)
                this.leakageMethodList = []
                this.leakageMethodList = this.leakageMethodList.concat(res.data)
            })
        },
        // 支付方式
        getpayMethod(){
            this.$axios.post('/SysConfigController/queryEnum',qs.stringify({
                'sessionId':localStorage.getItem('SID'),
                'type':11
            }))
            .then(res => {
                // console.log(res.data)
                this.payMethodList = []
                this.payMethodList = this.payMethodList.concat(res.data)
            })
        },
        // 业务类型
        getbusinessType(){
            this.$axios.post('/SysConfigController/queryEnum',qs.stringify({
                'sessionId':localStorage.getItem('SID'),
                'type':56
            }))
            .then(res => {
                // console.log(res.data)
                this.businessTypeList = []
                this.businessTypeList = this.businessTypeList.concat(res.data)
            })
        },
        // 风险原因
        getriskReason(){
            this.$axios.post('/SysConfigController/queryEnum',qs.stringify({
                'sessionId':localStorage.getItem('SID'),
                'type':9
            }))
            .then(res => {
                // console.log(res.data)
                this.riskReasonList = []
                this.riskReasonList = this.riskReasonList.concat(res.data)
            })
        },
        // 支付渠道
        getpayChannel(){
            this.$axios.post('/SysConfigController/queryEnum',qs.stringify({
                'sessionId':localStorage.getItem('SID'),
                'type':12
            }))
            .then(res => {
                // console.log(res.data)
                this.payChannelList = []
                this.payChannelList = this.payChannelList.concat(res.data)
            })
        },
        // 泄漏渠道
        getleakageChannel(){
            this.$axios.post('/SysConfigController/queryEnum',qs.stringify({
                'sessionId':localStorage.getItem('SID'),
                'type':8
            }))
            .then(res => {
                // console.log(res.data)
                this.leakageChannellList = []
                this.leakageChannellList = this.leakageChannellList.concat(res.data)
            })
        },
        //手机换绑方式
        getbindMethod(){
            this.$axios.post('/SysConfigController/queryEnum',qs.stringify({
                'sessionId':localStorage.getItem('SID'),
                'type':10
            }))
            .then(res => {
                // console.log(res.data)
                this.bindMethodList = []
                this.bindMethodList = this.bindMethodList.concat(res.data)
            })
        },
        // 销账渠道
        getbillingChannel(){
            this.$axios.post('/SysConfigController/queryEnum',qs.stringify({
                'sessionId':localStorage.getItem('SID'),
                'type':13
            }))
            .then(res => {
                // console.log(res.data)
                this.billingChannelList = []
                this.billingChannelList = this.billingChannelList.concat(res.data)
            })
        },
        // 资金来源
        getMoneyCome(){
            this.$axios.post('/SysConfigController/queryEnum',qs.stringify({
                'sessionId':localStorage.getItem('SID'),
                'type':31
            }))
            .then(res => {
                // console.log(res.data)
                this.MoneyComeList = []
                this.MoneyComeList = this.MoneyComeList.concat(res.data)
            })
        },
        // 初审结案
        gettrialStatus(){
            this.$axios.post('/SysConfigController/queryEnum',qs.stringify({
                'sessionId':localStorage.getItem('SID'),
                'type':'15'
            }))
            .then(res => {
                // console.log(res.data)
                this.trialStatusList = []
                this.trialStatusList = this.trialStatusList.concat(res.data)
            })
        },
        // 复审结案
        getreviewStatus(){
            this.$axios.post('/SysConfigController/queryEnum',qs.stringify({
                'sessionId':localStorage.getItem('SID'),
                'type':'16'
            }))
            .then(res => {
                // console.log(res.data)
                this.reviewStatusList = []
                this.reviewStatusList = this.reviewStatusList.concat(res.data)
            })
        },
        // 案件类型
        getajlx(){
            this.$axios.post('/SysConfigController/queryEnum',qs.stringify({
                sessionId:localStorage.getItem('SID'),
                type:'73',
            }))
            .then(res => {
                this.ajlx = []
                this.ajlx = this.ajlx.concat(res.data)
                this.ajlx.forEach(ele => {
                    if(ele.sysname == localStorage.getItem('CASETYPE')){
                        this.caseType = ele.sysconid

                    }
                })


            })
            .catch(error => {
                console.log(error)
            })
        },

    },
    mounted(){
        this.init()
        this.getajlx()
        this.hiddenListFirst()
    },
    created(){
        // 权限控制
        const idList = JSON.parse(localStorage.getItem('ARRLEVEL'));
        this.firstFinishPermission = idList.indexOf(121) === -1 ? false : true;
        this.submitPermission = idList.indexOf(122) === -1 ? false : true;
        this.state1savePermission = idList.indexOf(123) === -1 ? false : true;
        this.state2savePermission = idList.indexOf(121) === -1 ? false : true;//初审未完结，保存
        this.state3savePermission = idList.indexOf(122) === -1 ? false : true;
        this.searchPermission = idList.indexOf(299) === -1 ? false : true;
        this.addBlackPermission = idList.indexOf(126) === -1 ? false : true;
        this.delBlackPermission = idList.indexOf(127) === -1 ? false : true;
        this.addSelectPermission = idList.indexOf(322) === -1 ? false : true;
        this.addAllPermission = idList.indexOf(323) === -1 ? false : true;
        this.delSelectPermission = idList.indexOf(324) === -1 ? false : true;
        this.delAllPermission = idList.indexOf(325) === -1 ? false : true;
        this.createPermission = idList.indexOf(119) === -1 ? false : true;
        this.delPermission = idList.indexOf(120) === -1 ? false : true;

        this.getbusinessType()
        this.getriskReason()
        this.getpayChannel()
        this.getpayMethod()
        this.getleakageMethod()
        this.getleakageChannel()
        this.getbindMethod()
        this.getbillingChannel()
        this.gettrialStatus()
        this.getreviewStatus()
        this.getMerchantId()
        this.getMoneyCome()
    }
}
</script>
<style scoped>
.add{
    width: 100%;
    height: 56px;
}
.addCon{
    display:inline-block;
    margin-right:15px;
    margin-bottom:20px;
}
.text-box span{
    font-size: 13px;
    text-align: left;
    color: #333;
    margin-left: 13px;
    float: left;
}
.inline-box{
    display: inline-block;
}
.fl{
    float: left;
}
.fr{
    float: right;
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
.btnBox{
    margin-left: 20px;
    font-size: 18px;
    line-height: 41px;
    color: #000;
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
  width:10px;
  height:10px;
  background-color:#000;
  border-radius:5px;
  float:left;
  margin-top: 7px;
  margin-right: 15px;
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
  /* padding-top: 15px; */
}
.divContent .text input{
  border:0;
}
.text{
  width:33%;
  float:left;
  text-align: right;
}
.text-box{
  /* width: 50%; */
  float: left;
}
.labelC{
  float: left;
  font-size: 13px;
  width: 22%;
  color: rgb(142, 142, 142)
}
.boxOnly{
    display: block;
    width: 100%;
    height: 40px;
    line-height: 36px;
}
.divContent p {
  font-size: 13px;
  color:#606266;
  padding: 10px;
  line-height: 26px;
}
.textareaIpt input{
    border-radius: 30px;
}

/* .boxOnly input{
  border: none;
}  */
</style>
