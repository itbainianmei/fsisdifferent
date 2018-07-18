<template>
  <!--线上核查单详情-->
  <div>
    <div class="htmlHead">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>核查单管理</el-breadcrumb-item>
        <el-breadcrumb-item>线上核查单</el-breadcrumb-item>
        <el-breadcrumb-item>线上核查单详情</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="btnBoxClass leftBtn">
           <el-button @click="blackAdd" class="blackAddBtn leftBtn" round style="border: 1px solid rgb(63, 170, 249);color: rgb(63, 170, 249);" v-if="addblackPermission" >加入黑名单</el-button>
           <el-button @click="blackRemove" round class="leftBtn" style="border: 1px solid rgb(63, 170, 249);color: rgb(63, 170, 249);" v-if="delblackPermission">删除黑名单</el-button>
           <el-button @click="grayAdd" round class="leftBtn" style="border: 1px solid rgb(63, 170, 249);color: rgb(63, 170, 249);" v-if="addgrayPermission">加入灰名单</el-button>
           <el-button @click="remarkDialog = true" round class="leftBtn" style="border: 1px solid rgb(63, 170, 249);color: rgb(63, 170, 249);" v-if="remarkPermission">备注</el-button>
           <el-button type="primary" round class="rightBtn" style="margin-right:10px;" @click="create" v-if="casePermission">生成案件</el-button>
      </div>
      <div class="clearBox"></div>
    </div>

    <div style="border: 1px solid #E0E0E0;width:97%;margin:0 auto;height:auto;">
        <div class="divHead">
            <span class="rideus"></span>支付方
            <div class="divContent">
                <div class="text">

                  <div class="boxOnly" >
                    <div class="labelC">银行卡号:</div>
                    <div class="text-box">
                        <el-popover trigger="hover" placement="right">
                        {{ bankCardNum }}
                        <span slot="reference">
                        {{ _bankCardNum }}
                        </span>
                        </el-popover>
                    </div>
                  </div>

                  <div class="boxOnly">
                    <div class="labelC">银行名称:</div>
                    <div class="text-box">
                        <span>{{bankCardName}}</span>
                    </div>
                  </div>

                  <div class="boxOnly">
                    <div class="labelC">持卡人姓名:</div>
                    <div class="text-box">
                        <span>{{cardholderName}}</span>
                    </div>
                  </div>

                    <div class="boxOnly">
                      <div class="labelC">持卡人性别:</div>
                      <div class="text-box">
                          <span>{{cardholderGender}}</span>
                      </div>
                    </div>

                    <div class="boxOnly">
                      <div class="labelC">身份证号:</div>
                      <div class="text-box">
                          <el-popover trigger="hover" placement="right">
                          {{ idCard }}
                          <span slot="reference">
                          {{ _idCard }}
                          </span>
                          </el-popover>
                      </div>
                    </div>

                </div>
                <div class="text">

                    <div class="boxOnly" >
                      <div class="labelC">持卡人手机号:</div>
                      <div class="text-box">
                          <el-popover trigger="hover" placement="right">
                          {{ cardholderPhone }}
                          <span slot="reference">
                          {{ _cardholderPhone }}
                          </span>
                          </el-popover>
                      </div>
                    </div>

                    <div class="boxOnly">
                      <div class="labelC">身份证归属地:</div>
                      <div class="text-box">
                          <span>{{idCardAttribution}}</span>
                      </div>
                    </div>

                    <div class="boxOnly">
                      <div class="labelC">手机号归属地:</div>
                      <div class="text-box">
                          <span>{{phoneAttribution}}</span>
                      </div>
                    </div>

                    <div class="boxOnly">
                      <div class="labelC">银行卡归属地:</div>
                      <div class="text-box">
                          <span>{{bankCardAttribution}}</span>
                      </div>
                    </div>

                </div>
            </div>
            <div class="flootText">
                <!-- <div style="float:left;margin-top:8px;margin-left:10px;">匹配本地黑名单<span>{{payblackCout}}</span>个</div>
                <div style="float:left;margin-left:10px;margin-top:8px;">数据服务<span>{{payserviceCount}}</span>个</div> -->
                <div style="float:right;">
                      <label>外呼状态:</label>

                         <el-select v-model="callStateTtitle" placeholder="请选择" style="width:225px;" @focus="getOutboundList">
                            <el-option :label="item.sysname" :value="item.sysconid" v-for='(item,index) in outboundList' :key='index'></el-option>

                        </el-select>
                      <el-button @click="callStateChoos" type="primary" round class="rightBtn" style="margin-right:10px;margin-left:10px;height: 36px;line-height: 12px;" v-if="confirmPermission">确定</el-button>
                </div>
            </div>
        </div>
        <hr class="hr">
        <div class="divHead">
            <span class="rideus"></span>收款方
            <div class="divContent">
                <div class="text">

                  <div class="boxOnly" >
                    <div class="labelC">商户编号:</div>
                    <div class="text-box">
                        <span>{{merchantId}}</span>
                    </div>
                  </div>

                  <div class="boxOnly" >
                    <div class="labelC">商户名称:</div>
                    <div class="text-box">
                        <span>{{merchantName}}</span>
                    </div>
                  </div>

                </div>
            </div>
        </div>
        <hr class="hr">
        <div class="divHead">
            <p @click='showIntroduceClick'>
               <!-- <span class="rideus" ></span>外呼话术 -->
               <i class='el-icon-arrow-down' id='elIconArrowUp'></i> 外呼话术
            </p>

            <el-collapse-transition>
              <div class="divContent" v-show="showIntroduce">
                  <p>
                      本人接听,确认交易<br>
                      您好，先生/女士，抱歉打扰您了，这里是与XX银行合作的第三方支付平台易宝支付<br>
                      结束语：<br>
                      配合的：好的，先生/女士，感谢您的配合，这边不打扰您了，祝您生活愉快，再见！<br>
                      不配合的：好的，先生/女士，为了您的账户安全，建议您去银行查询一下您的近期交易流水，核实是否均为您本人交易，如不是您本人交易，建议您尽快冻结银行卡和报警处理，如您有问题，也可以随时和我司联系，这边不打扰您了， 祝您生活愉快，再见！
                  </p>
                  <p>
                      开始语：<br>
                      易宝：请问您是否使用卡号后四位为XXXX的银行卡在XX商户提交一笔XXX元的交易，请问是您本人支付的吗？<br>
                      持卡人：是的<br>
                      鉴权成功：<br>
                      易宝：好的，先生/女士，感谢您的配合，这边不打扰您了，祝您生活愉快，再见！<br>
                      鉴权失败或未鉴权：<br>
                      易宝：感谢您的配合，为了确认此笔交易为您本人支付，需要与您核实几项问题（身份证归属地、身份证上面的出生年月日）<br>
                      持卡人：报信息<br>
                      易宝：好的，先生/女士，感谢您的配合，这边不打扰您了，祝您生活愉快，再见！<br>
                  </p>
                  <p>
                      本人接听，否认交易<br>
                      易宝：请问您是否使用卡号后四位为XXXX的银行卡在XX商户提交一笔XXX元的交易，请问是您本人支付的吗？<br>
                      持卡人：不是我交易的/没有啊我不知道<br>
                      易宝：这几笔交易都不是您本人支付的吗？<br>
                      持卡人：不是我交易的<br>
                      易宝：请问您这张尾号XXXX的银行卡是您本人的吗？是否借给你的家人朋友使用？<br>
                      持卡人：卡是我本人的，没有借给家人朋友使用过<br>
                      易宝：好的，为了您的账户安全，如不是您本人交易，建议您尽快冻结银行卡和报警处理。这边不打扰您了，祝您生活愉快，再见！<br>
                  </p>
                  <p>
                      持卡人接听，不配合<br>
                      易宝：请问您是否使用卡号后四位为XXXX的银行卡在XX商户提交一笔XXX元的交易，请问是您本人支付的吗？<br>
                      持卡人：我没时间（不配合）<br>
                      易宝：好的，为了您的账户安全，建议您去银行查询依稀啊您近期的交易流水，核实是否均为您本人交易，如不是您本人交易，建议您尽快冻结银行卡和报警处理。如您有问题，也可以随时与我司联系，这边不打扰您了，祝您生活愉快，再见！<br>
                  </p>
                  <p>
                    为了您的用卡安全，现需要与您核实一下您卡号后四位的借记卡（Debit）/信用卡（Credit）的支付交易，请问您现在方便接听电话吗？
                  </p>
              </div>
            </el-collapse-transition>
        </div>
        <hr class="hr">


        <!-- 普通行业核查单详情 -->
        <!-- <div v-if="pthyDetails">
          <div class="divHead">
              <span class="rideus"></span>交易信息
              <div class="divContent">
                  <div class="text">

                    <div class="boxOnly" >
                      <div class="labelC">商户订单号:</div>
                      <div class="text-box">
                          <span>{{ceshi}}</span>
                      </div>
                    </div>

                    <div class="boxOnly">
                      <div class="labelC">产品:</div>
                      <div class="text-box">
                          <span>{{ceshi}}</span>
                      </div>
                    </div>

                    <div class="boxOnly">
                      <div class="labelC">交易金额:</div>
                      <div class="text-box">
                          <span>{{ceshi}}</span>
                      </div>
                    </div>

                      <div class="boxOnly">
                        <div class="labelC">交易时间:</div>
                        <div class="text-box">
                            <span>{{ceshi}}</span>
                        </div>
                      </div>

                      <div class="boxOnly">
                        <div class="labelC">交易状态:</div>
                        <div class="text-box">
                            <span>{{ceshi}}</span>
                        </div>
                      </div>

                      <div class="boxOnly">
                        <div class="labelC">交易IP:</div>
                        <div class="text-box">
                            <span>{{ceshi}}</span>
                        </div>
                      </div>

                  </div>
                  <div class="text">

                      <div class="boxOnly" >
                        <div class="labelC">交易IP归属地:</div>
                        <div class="text-box">
                            <span>{{ceshi}}</span>
                        </div>
                      </div>

                      <div class="boxOnly">
                        <div class="labelC">GPS定位:</div>
                        <div class="text-box">
                            <span>{{ceshi}}</span>
                        </div>
                      </div>

                      <div class="boxOnly">
                        <div class="labelC">IMEI:</div>
                        <div class="text-box">
                            <span>{{ceshi}}</span>
                        </div>
                      </div>

                      <div class="boxOnly">
                        <div class="labelC">登录名:</div>
                        <div class="text-box">
                            <span>{{ceshi}}</span>
                        </div>
                      </div>

                      <div class="boxOnly">
                        <div class="labelC">网址:</div>
                        <div class="text-box">
                            <span>{{ceshi}}</span>
                        </div>
                      </div>

                      <div class="boxOnly">
                        <div class="labelC">终端号:</div>
                        <div class="text-box">
                            <span>{{ceshi}}</span>
                        </div>
                      </div>

                  </div>
              </div>
              <div class="flootText">
                  <div style="float:left;margin-top:8px;margin-left:10px;">匹配本地黑名单<span>0</span>个</div>
                  <div style="float:left;margin-left:10px;margin-top:8px;">数据服务<span>0</span>个</div>
              </div>
          </div>
        </div> -->

        <!-- 航旅核查单详情 -->
        <div >
          <div class="divHead">
              <span class="rideus"></span>交易信息
              <div class="divContent">
                  <div class="text">

                    <div class="boxOnly" >
                      <div class="labelC">商户订单号:</div>
                      <div class="text-box">
                          <span>{{merchantOrder}}</span>
                      </div>
                    </div>

                    <div class="boxOnly">
                      <div class="labelC">产品:</div>
                      <div class="text-box">
                          <span>{{product}}</span>
                      </div>
                    </div>

                    <div class="boxOnly">
                      <div class="labelC">交易金额:</div>
                      <div class="text-box">
                          <span>{{transactionMoney}}</span>
                      </div>
                    </div>

                      <div class="boxOnly">
                        <div class="labelC">交易时间:</div>
                        <div class="text-box">
                            <span>{{transactionTime}}</span>
                        </div>
                      </div>

                      <div class="boxOnly">
                        <div class="labelC">交易状态:</div>
                        <div class="text-box">
                            <span>{{transactionState}}</span>
                        </div>
                      </div>

                      <div class="boxOnly">
                        <div class="labelC">交易IP:</div>
                        <div class="text-box">
                            <span>{{transactionIp}}</span>
                        </div>
                      </div>

                      <div class="boxOnly" >
                        <div class="labelC">交易IP归属地:</div>
                        <div class="text-box">
                            <span>{{transactionIpAttribution}}</span>
                        </div>
                      </div>

                      <div class="boxOnly">
                        <div class="labelC">GPS定位:</div>
                        <div class="text-box">
                            <span>{{gps}}</span>
                        </div>
                      </div>

                      <div class="boxOnly">
                        <div class="labelC">IMEI:</div>
                        <div class="text-box">
                            <span>{{imei}}</span>
                        </div>
                      </div>

                      <div class="boxOnly">
                        <div class="labelC">登录名:</div>
                        <div class="text-box">
                            <span>{{loginName}}</span>
                        </div>
                      </div>

                      <div class="boxOnly">
                        <div class="labelC">网址:</div>
                        <div class="text-box">
                            <span>{{url}}</span>
                        </div>
                      </div>

                      <div class="boxOnly">
                        <div class="labelC">终端号:</div>
                        <div class="text-box">
                            <span>{{terminalNum}}</span>
                        </div>
                      </div>

                  </div>
                  <div class="text" v-if="hyhyDetails">

                      <div class="boxOnly">
                        <div class="labelC">起飞时间:</div>
                        <div class="text-box">
                            <span>{{departureTime}}</span>
                        </div>
                      </div>

                      <div class="boxOnly">
                        <div class="labelC">到达时间:</div>
                        <div class="text-box">
                            <span>{{arrivalTime}}</span>
                        </div>
                      </div>

                      <div class="boxOnly">
                        <div class="labelC">起飞城市:</div>
                        <div class="text-box">
                            <span>{{departureCity}}</span>
                        </div>
                      </div>

                      <div class="boxOnly">
                        <div class="labelC">目的地:</div>
                        <div class="text-box">
                            <span>{{arrivalCity}}</span>
                        </div>
                      </div>

                      <div class="boxOnly">
                        <div class="labelC">乘机人姓名:</div>
                        <div class="text-box">
                            <span>{{passengerName}}</span>
                        </div>
                      </div>

                      <div class="boxOnly">
                        <div class="labelC">预定人手机号:</div>
                        <div class="text-box">
                            <span>{{reservationPhone}}</span>
                        </div>
                      </div>

                      <div class="boxOnly">
                        <div class="labelC">乘机人证件号:</div>
                        <div class="text-box">
                            <span>{{passengerPaper}}</span>
                        </div>
                      </div>

                      <div class="boxOnly">
                        <div class="labelC">联系人姓名:</div>
                        <div class="text-box">
                            <span>{{contactsName}}</span>
                        </div>
                      </div>

                      <div class="boxOnly">
                        <div class="labelC">联系人手机号:</div>
                        <div class="text-box">
                            <span>{{contactsPhone}}</span>
                        </div>
                      </div>
                  </div>
              </div>
              <!-- <div class="flootText">
                  <div style="float:left;margin-top:8px;margin-left:10px;">匹配本地黑名单<span>{{tblackCount}}</span>个</div>
                  <div style="float:left;margin-left:10px;margin-top:8px;">数据服务<span>{{tserviceCount}}</span>个</div>
              </div> -->
          </div>
        </div>


        <hr class="hr">
        <div class="divHead">
            <span class="rideus"></span>核查信息
            <div class="divContent">
                <div class="text">

                  <div class="boxOnly" >
                    <div class="labelC">核查单编号:</div>
                    <div class="text-box">
                        <span>{{id}}</span>
                    </div>
                  </div>

                  <div class="boxOnly">
                    <div class="labelC">规则编码:</div>
                    <div class="text-box">
                        <span>{{scenesCode}}</span>
                    </div>
                  </div>

                  <div class="boxOnly" v-if='hyhyDetails'>
                    <div class="labelC">事件类型:</div>
                    <div class="text-box">
                        <span>{{eventType}}</span>
                    </div>
                  </div>

                  <div class="boxOnly">
                    <div class="labelC">规则分值:</div>
                    <div class="text-box">
                        <span>{{ruleValue}}</span>
                    </div>
                  </div>

                    <div class="boxOnly">
                      <div class="labelC">通知策略:</div>
                      <div class="text-box">
                          <span>{{notificationPolicy}}</span>
                      </div>
                    </div>

                    <div class="boxOnly">
                      <div class="labelC">验证策略:</div>
                      <div class="text-box">
                          <span>{{verifyPolicy}}</span>
                      </div>
                    </div>

                    <div class="boxOnly">
                      <div class="labelC">鉴权项:</div>
                      <div class="text-box">
                          <span>{{authenticationItem}}</span>
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
                      <div class="labelC">核查状态:</div>
                      <div class="text-box">
                          <span>{{checkStatus}}</span>
                      </div>
                    </div>

                    <div class="boxOnly">
                      <div class="labelC">处理结果:</div>
                      <div class="text-box">
                          <span>{{processResult}}</span>
                      </div>
                    </div>

                    <div class="boxOnly">
                      <div class="labelC">处理人员:</div>
                      <div class="text-box">
                          <span>{{processStaff}}</span>
                      </div>
                    </div>

                    <div class="boxOnly">
                      <div class="labelC">操作时间:</div>
                      <div class="text-box">
                          <span>{{operationTime}}</span>
                      </div>
                    </div>

                    <div class="boxOnly">
                      <div class="labelC">备注:</div>
                      <div class="text-box">
                          <span>{{remark}}</span>
                      </div>
                    </div>
                </div>
            </div>
        </div>
        <hr class="hr">
        <div class="divHead">
            <span class="rideus"></span>触发规则详情
                  <el-table
                    :data="ruleControlTableData"
                    border
                    style="width: 100%">
                    <el-table-column
                      prop="bankCard"
                      label="银行卡号"
                      align='center'>
                    </el-table-column>
                    <el-table-column
                      prop="checkId"
                      label="核查单编号"
                      align='center'>
                    </el-table-column>
                    <el-table-column
                      prop="ruleContent"
                      label="触发规则名称"
                      align='center'>
                    </el-table-column>
                    <el-table-column
                      prop="menuName"
                      label="规则所在包"
                      align='center'>
                    </el-table-column>
                  </el-table>
                  <div class="clearBox"></div>
                  <el-pagination
                    layout="prev, pager, next"
                   :total=totalSizeNum

                    :current-page.sync="currentPage"
                     @current-change="handleCurrentChange"
                    style="display: inline-block;float: right;margin-bottom: 15px;margin-top: 15px;">
                  </el-pagination>
        </div>
        <div class="divHead">
            <span class="rideus"></span>银行卡历史详情
                  <el-table
                    :data="bankHisTable"
                    border
                    style="width: 100%">
                    <el-table-column
                      prop="bankCardNum"
                      label="银行卡号"
                      align='center'>
                      <template slot-scope="scope">
                          <el-popover trigger="hover" placement="top">
                          {{ scope.row.bankCardNum }}
                          <div slot="reference">
                          {{ scope.row._bankCardNum }}
                          </div>
                          </el-popover>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="checkId"
                      label="核查单编号"
                      align='center'>
                    </el-table-column>
                    <el-table-column
                      prop="operationTime"
                      label="时间"
                      align='center'>
                    </el-table-column>
                    <el-table-column
                      prop="processStaff"
                      label="操作员"
                      align='center'>
                    </el-table-column>
                    <el-table-column
                      prop="processResult"
                      label="处理"
                      align='center'>
                    </el-table-column>
                    <el-table-column
                      prop="processContent"
                      label="处理内容"
                      align='center'>
                    </el-table-column>
                  </el-table>

                  <el-pagination
                    layout="prev, pager, next"
                    :total=totalSize
                    @current-change="handleCurrentChangeBank"
                    style="display: inline-block;float: right;margin-bottom: 15px;margin-top: 15px;">
                  </el-pagination>
        </div>
    </div>
    <el-dialog title="备注" :visible.sync="remarkDialog" width="30%" >
        <el-input type="textarea" :rows="5" placeholder="请输入备注" v-model="remarkContent" style="width: 90%;margin-left: 5%;margin-bottom: 12px;"></el-input>
        <span slot="footer" class="dialog-footer">
            <el-button @click="remarkDialog = false">取 消</el-button>
            <el-button type="primary" @click="remarkAdd">确 定</el-button>
        </span>
    </el-dialog>

    <!-- 修改外呼 -->
    <el-dialog title="提示" :visible.sync="changeOutBoundDialog" width="30%" >
      <div style='width:100%;text-align:center'>
        <i class='el-icon-warning' style='color:#F1F2F5;font-size:25px;'></i>
        <span>确认修改已选核查单的外呼状态为：{{this.str}}</span>
      </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="changeOutBoundDialog = false">取 消</el-button>
            <el-button type="primary" @click="outBoundBtn">确 定</el-button>
        </span>
    </el-dialog>
    <!-- 加入黑名单 -->
    <el-dialog title="提示" :visible.sync="addBlackList" width="30%" >
      <div style='width:100%;text-align:center'>
        <i class='el-icon-warning' style='color:#F1F2F5;font-size:25px;'></i>
        <span>确定加入黑名单吗?</span>
      </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="addBlackList = false">取 消</el-button>
            <el-button type="primary" @click="addBlackListBtn">确 定</el-button>
        </span>
    </el-dialog>
    <!-- 删除黑名单 -->
    <el-dialog title="提示" :visible.sync="removeBlackList" width="30%" >
      <div style='width:100%;text-align:center'>
        <i class='el-icon-warning' style='color:#F1F2F5;font-size:25px;'></i>
        <span>确定删除黑名单吗?</span>
      </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="removeBlackList = false">取 消</el-button>
            <el-button type="primary" @click="removeBlackListBtn">确 定</el-button>
        </span>
    </el-dialog>
    <!-- 加入灰名单 -->
    <el-dialog title="提示" :visible.sync="addGrayList" width="30%" >
      <div style='width:100%;text-align:center'>
        <i class='el-icon-warning' style='color:#F1F2F5;font-size:25px;'></i>
        <span>确定加入灰名单吗?</span>
      </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="addGrayList = false">取 消</el-button>
            <el-button type="primary" @click="addGrayListBtn">确 定</el-button>
        </span>
    </el-dialog>

  </div>
</template>
<script>
import qs from 'qs'
import {idCard, phone, card} from '../utils/index.js'
export default {
      data() {
        return {
            addblackPermission: true,//加入黑名单
            delblackPermission: true,//删除黑名单
            addgrayPermission: true,//加入灰名单
            remarkPermission: true,//备注
            casePermission: true,//生成案件
            confirmPermission: true,//确定
            showIntroduce:false,
            addBlackList:false,
            removeBlackList:false,
            addGrayList:false,
            str:'',
            changeOutBoundDialog:false,
            currentPage:1,
            pthyDetails:false,
            hyhyDetails:false,
            totalSizeNum:0,
            callStateTtitle:'',
            remarkContent:'',
            remarkDialog:false,
            tableData:[],
            tableData2:[],
            bankHisTable:[],
            ceshi:'测试数据咩咩咩喵喵喵',
            options:[{
              value: '选项1',
              label: '黄金糕'
            }, {
              value: '选项2',
              label: '双皮奶'
            }],
            pageNumBank:1,
            pageSizeBank:10,
            merchantsState:'',
            value:'',
            outboundList:[],
            arr:[],
            bankCardNum:'',
            bankCardName:'',
            cardholderName:'',
            cardholderGender:'',
            idCard:'',
            cardholderPhone:'',
            idCardAttribution:'',
            phoneAttribution:'',
            bankCardAttribution:'',
            payblackCout: '',
            payserviceCount: '',
            merchantId:'',
            merchantName:'',
            merchantOrder:'',
            product:'',
            transactionMoney:'',
            transactionTime:'',
            transactionState:'',
            transactionIp:'',
            transactionIpAttribution:'',
            gps:'',
            imei:'',
            loginName:'',
            url:'',
            terminalNum:'',
            departureTime:'',
            arrivalTime:'',
            departureCity:'',
            arrivalCity:'',
            passengerName:'',
            reservationPhone:'',
            passengerPhone:'',
            passengerPaper:'',
            contactsName:'',
            contactsPhone:'',
            tblackCount: '',
            tserviceCount: '',
            id:'',
            scenesCode:'',
            eventType:'',
            ruleValue:'',
            notificationPolicy:'',
            verifyPolicy:'',
            authenticationItem:'',
            riskLevel:'',
            checkStatus:'',
            processResult:'',
            processStaff:'',
            operationTime:'',
            remark:'',
            totalSize:0,
            pageNum:1,
            pageSize:10,
            ruleControlTableData:[],
            _bankCardNum: '',
            _idCard: '',
            _cardholderPhone: ''
        }
      },
      created() {
        // 按钮权限
        const idList = JSON.parse(localStorage.getItem('ARRLEVEL'));
        this.addblackPermission = idList.indexOf(59) === -1 ? false : true;
        this.delblackPermission = idList.indexOf(263) === -1 ? false : true;
        this.addgrayPermission = idList.indexOf(264) === -1 ? false : true;
        this.remarkPermission = idList.indexOf(60) === -1 ? false : true;
        this.casePermission = idList.indexOf(116) === -1 ? false : true;
        this.confirmPermission = idList.indexOf(65) === -1 ? false : true;
    },
      methods:{
        showIntroduceClick(){
          this.showIntroduce = !this.showIntroduce
          if(this.showIntroduce === true){
            document.querySelector('#elIconArrowUp').style.transform = 'rotate(0deg)'
            document.querySelector('#elIconArrowUp').style.transition = '1s all'
          }else if(this.showIntroduce === false){
            document.querySelector('#elIconArrowUp').style.transform = 'rotate(180deg)'
            document.querySelector('#elIconArrowUp').style.transition = '1s all'
          }

        },
        init(){
            this.arr = []
            this.arr = this.arr.concat(window.location.href.split('?')[1].split('&'))
            if(this.arr[0] === '1'){
              // 航旅
              console.log('航旅')
              this.hyhyDetails = true
              // this.pthyDetails = false
              this.getHyhyDetails()
            }else if(this.arr[0] === '2'){
              console.log('普通')
              this.hyhyDetails = false
              // this.pthyDetails = true
              this.getPthyDetails()
              // 普通
            }

        },

        // 获取普通行业详情
        getPthyDetails(){
            this.$axios.post('/OnlineChecklistController/queryOrdinaryDetail',qs.stringify({
              sessionId: localStorage.getItem('SID'),
              id: this.arr[1],
              transactionTime: this.arr[2]
            }))
            .then(res => {
              console.log(res.data)
              if (res.data.payer) {
                  if (res.data.payer.bankCardNum) {
                      this._bankCardNum = card(res.data.payer.bankCardNum)
                  }
                  if (res.data.payer.cardholderPhone) {
                      this._cardholderPhone = phone(res.data.payer.cardholderPhone)
                  }
                  if (res.data.payer.idCard) {
                      this._idCard = idCard(res.data.payer.idCard)
                  }
              }

              this.bankCardNum = res.data.payer.bankCardNum
              this.bankCardName = res.data.payer.bankCardName
              this.cardholderName = res.data.payer.cardholderName
              this.cardholderGender = res.data.payer.cardholderGender
              this.idCard = res.data.payer.idCard
              this.cardholderPhone = res.data.payer.cardholderPhone
              this.idCardAttribution = res.data.payer.idCardAttribution
              this.phoneAttribution = res.data.payer.phoneAttribution
              this.bankCardAttribution = res.data.payer.bankCardAttribution
              this.payblackCout = res.data.payer.payblackCout
              this.payserviceCount = res.data.payer.payserviceCount
              this.merchantId = res.data.payee.merchantId
              this.merchantName = res.data.payee.merchantName
              this.merchantOrder = res.data.transactionInfo.merchantOrder
              this.product = res.data.transactionInfo.product
              this.transactionMoney = res.data.transactionInfo.transactionMoney
              this.transactionTime = res.data.transactionInfo.transactionTime
              this.transactionState = res.data.transactionInfo.transactionState
              this.transactionIp = res.data.transactionInfo.transactionIp
              this.transactionIpAttribution = res.data.transactionInfo.transactionIpAttribution
              this.gps = res.data.transactionInfo.gps
              this.imei = res.data.transactionInfo.imei
              this.loginName = res.data.transactionInfo.loginName
              this.url = res.data.transactionInfo.url
              this.terminalNum = res.data.transactionInfo.terminalNum
              this.tblackCount = res.data.transactionInfo.tblackCount
              this.tserviceCount = res.data.transactionInfo.tserviceCount
              this.id = res.data.checkInfo.id
              this.scenesCode = res.data.checkInfo.scenesCode
              this.ruleValue = res.data.checkInfo.ruleValue
              this.notificationPolicy = res.data.checkInfo.notificationPolicy
              this.verifyPolicy = res.data.checkInfo.verifyPolicy
              this.authenticationItem = res.data.checkInfo.authenticationItem
              this.riskLevel = res.data.checkInfo.riskLevel
              this.checkStatus = res.data.checkInfo.checkStatus
              this.processResult = res.data.checkInfo.processResult
              this.processStaff = res.data.checkInfo.processStaff
              this.operationTime = res.data.checkInfo.operationTime
              this.remark = res.data.checkInfo.remark

               this.getRuleControlList()
               this.getBankHisList()

            })
            .catch(error => {
              console.log(error)
            })
        },

        // 获取航旅行业详情
        getHyhyDetails(){
            this.$axios.post('/OnlineChecklistController/queryAirTravelDetail',qs.stringify({
              sessionId:localStorage.getItem('SID'),
              id:this.arr[1],
              transactionTime: this.arr[2]
            }))
            .then(res => {
              console.log(res.data)
              if (res.data.payer) {
                  if (res.data.payer.bankCardNum) {
                      this._bankCardNum = card(res.data.payer.bankCardNum)
                  }
                  if (res.data.payer.cardholderPhone) {
                      this._cardholderPhone = phone(res.data.payer.cardholderPhone)
                  }
                  if (res.data.payer.idCard) {
                      this._idCard = idCard(res.data.payer.idCard)
                  }
              }

              this.bankCardNum = res.data.payer.bankCardNum
              this.bankCardName = res.data.payer.bankCardName
              this.cardholderName = res.data.payer.cardholderName
              this.cardholderGender = res.data.payer.cardholderGender
              this.idCard = res.data.payer.idCard
              this.cardholderPhone = res.data.payer.cardholderPhone
              this.idCardAttribution = res.data.payer.idCardAttribution
              this.phoneAttribution = res.data.payer.phoneAttribution
              this.bankCardAttribution = res.data.payer.bankCardAttribution
              this.payblackCout = res.data.payer.payblackCout
              this.payserviceCount = res.data.payer.payserviceCount
              this.merchantId = res.data.payee.merchantId
              this.merchantName = res.data.payee.merchantName
              this.merchantOrder = res.data.transactionInfo.merchantOrder
              this.product = res.data.transactionInfo.product
              this.transactionMoney = res.data.transactionInfo.transactionMoney
              this.transactionTime = res.data.transactionInfo.transactionTime
              this.transactionState = res.data.transactionInfo.transactionState
              this.transactionIp = res.data.transactionInfo.transactionIp
              this.transactionIpAttribution = res.data.transactionInfo.transactionIpAttribution
              this.gps = res.data.transactionInfo.gps
              this.imei = res.data.transactionInfo.imei
              this.loginName = res.data.transactionInfo.loginName
              this.url = res.data.transactionInfo.url
              this.terminalNum = res.data.transactionInfo.terminalNum
              this.departureTime = res.data.transactionInfo.departureTime
              this.arrivalTime = res.data.transactionInfo.arrivalTime
              this.departureCity = res.data.transactionInfo.departureCity
              this.arrivalCity = res.data.transactionInfo.arrivalCity
              this.passengerName = res.data.transactionInfo.passengerName
              this.reservationPhone = res.data.transactionInfo.reservationPhone
              this.passengerPhone = res.data.transactionInfo.passengerPhone
              this.passengerPaper = res.data.transactionInfo.passengerPaper
              this.contactsName = res.data.transactionInfo.contactsName
              this.contactsPhone = res.data.transactionInfo.contactsPhone
              this.tblackCount = res.data.transactionInfo.tblackCount
              this.tserviceCount = res.data.transactionInfo.tserviceCount
              this.id = res.data.checkInfo.id
              this.scenesCode = res.data.checkInfo.scenesCode
              this.eventType = res.data.checkInfo.eventType
              this.ruleValue = res.data.checkInfo.ruleValue
              this.notificationPolicy = res.data.checkInfo.notificationPolicy
              this.verifyPolicy = res.data.checkInfo.verifyPolicy
              this.authenticationItem = res.data.checkInfo.authenticationItem
              this.riskLevel = res.data.checkInfo.riskLevel
              this.checkStatus = res.data.checkInfo.checkStatus
              this.processResult = res.data.checkInfo.processResult
              this.processStaff = res.data.checkInfo.processStaff
              this.operationTime = res.data.checkInfo.operationTime
              this.remark = res.data.checkInfo.remark

              this.getRuleControlList()
              this.getBankHisList()
            })
            .catch(error => {
              console.log(error)
            })
        },

        outBoundBtn(){
              let buttonType = ''
              let type = ''
              console.log(this.callStateTtitle)
              if(this.callStateTtitle == 701){
                  buttonType = 'check_detail_white'
                  type = ''
              }else if(this.callStateTtitle == 702 || this.callStateTtitle == 703 || this.callStateTtitle == 706){
                  buttonType = 'check_detail_grey'
                  type = 'gray'
              }else if(this.callStateTtitle == 704 || this.callStateTtitle == 705){
                  buttonType = 'check_detail_black'
                  type = 'black'
              }

              let dataArr = []
              dataArr.push({
                  id: this.arr[1],
                  transactionTime: this.arr[2],
                  online_bankCardNoBl: this.bankCardNum,
                  online_idNoBl: this.idCard,
                  online_loginNameBl: this.loginName,
                  online_userPhoneBl: this.cardholderPhone,
                  offline_merchantId: this.merchantId,
                  paramMerchantId: this.merchantId,
                  paramMerchantOrder: this.merchantOrder,
                  online_imeiBl: this.imei,
                  online_terminalIdBl: this.terminalNum,
                  online_userIpBl: this.transactionIp,
                  online_referBl: this.url
              });

              this.$axios.post('/OnlineChecklistController/updateOutCallStatus',qs.stringify({
                  sessionId: localStorage.getItem('SID'),
                  outCallStatus: this.callStateTtitle,
                  source: '753',
                  type: type,
                  bizLine: 'online',
                  comments: '',
                  buttonType: buttonType,
                  data:  JSON.stringify(dataArr),
                  loginPerson: localStorage.getItem('testName')
                }))
                .then(res => {
                    console.log(res.data)
                    if(res.data.code == 1){
                        this.changeOutBoundDialog = false

                        this.$alert('修改成功', '系统提示', {
                            confirmButtonText: '确定',
                            type:'success',
                            callback:actions => {
                                this.callStateTtitle = ''
                            }
                        });
                    }
                })
        },

        callStateChoos(){
                if(this.callStateTtitle == ''){
                    return false;
                }
                var str = ''
                this.outboundList.forEach(ele => {
                    if(this.callStateTtitle === ele.sysconid){
                        this.str = ele.sysname
                    }
                })
                this.changeOutBoundDialog = true

                // this.$confirm('确认修改已选核查单的外呼状态为：'+ str, '提示', {
                //   confirmButtonText: '确定',
                //   cancelButtonText: '取消',
                //   closeOnClickModal:false,
                //   type: 'warning'
                // }).then(() => {}
        },
        remarkAdd(){
          // 数据请求后弹出
          this.$axios.post('/OnlineChecklistController/updateRemark',qs.stringify({
              sessionId: localStorage.getItem('SID'),
              id: this.arr[1],
              remark: this.remarkContent,
              transactionTime: this.arr[2]
          }))
          .then(res => {
            console.log(res.data)
            if(res.data.code === 1){
                this.$alert(res.data.message, '系统提示', {
                    confirmButtonText: '确定',
                    type:'success',
                    callback:actions => {
                       this.remarkDialog = false
                    }
                });

            }else if(res.data.code !== 1){
              this.$alert(res.data.message,'系统提示',{
                confirmButtonText:'确定',
                type:'warning'
              })
            }
          })
          .catch(error => {
            console.log(error)
          })

        },
        addGrayListBtn(){
            let dataArr = []
            dataArr.push({
                id: this.arr[1],
                transactionTime: this.arr[2],
                online_bankCardNoBl: this.bankCardNum,
                online_idNoBl: this.idCard,
                online_loginNameBl: this.loginName,
                online_userPhoneBl: this.cardholderPhone,
                offline_merchantId: this.merchantId,
                paramMerchantId: this.merchantId,
                paramMerchantOrder: this.merchantOrder,
                online_imeiBl: this.imei,
                online_terminalIdBl: this.terminalNum,
                online_userIpBl: this.transactionIp,
                online_referBl: this.url
            });


            this.$axios.post('/NameListController/batchSaveName',qs.stringify({
                sessionId:localStorage.getItem('SID'),
                source:'753',
                type:'gray',
                bizLine:'online',
                comments:'',
                data: JSON.stringify(dataArr),
                buttonType:'check_detail_grey',
                loginPerson:localStorage.getItem('testName')
            }))
            .then(res => {
                console.log(res.data)
                if(res.data.code === 1){
                  this.$alert(res.data.message, '系统提示', {
                      confirmButtonText: '确定',
                      type:'success',
                      callback:action=>{
                        this.addGrayList = false
                      }
                  });
                }else if(res.data.code !== 1){
                  this.$alert(res.data.message,'系统提示',{
                    confirmButtonText:'确定',
                    type:'warning'
                  })
                }
            })
        },
        grayAdd(){
            this.addGrayList = true
        },
        addBlackListBtn(){
            let dataArr = []
            dataArr.push({
                id: this.arr[1],
                transactionTime: this.arr[2],
                online_bankCardNoBl: this.bankCardNum,
                online_idNoBl: this.idCard,
                online_loginNameBl: this.loginName,
                online_userPhoneBl: this.cardholderPhone,
                offline_merchantId: this.merchantId,
                paramMerchantId: this.merchantId,
                paramMerchantOrder: this.merchantOrder,
                online_imeiBl: this.imei,
                online_terminalIdBl: this.terminalNum,
                online_userIpBl: this.transactionIp,
                online_referBl: this.url
            });

            this.$axios.post('/NameListController/batchSaveName',qs.stringify({
                sessionId:localStorage.getItem('SID'),
                source:'753',
                type:'black',
                bizLine:'online',
                comments:'',
                data: JSON.stringify(dataArr),
                buttonType:'check_detail_black',
                loginPerson:localStorage.getItem('testName')
            }))
            .then(res => {
              console.log(res.data)
              if(res.data.code === 1){
                this.$alert(res.data.message, '系统提示', {
                    confirmButtonText: '确定',
                    type:'success',
                    callback:action=>{
                      this.addBlackList = false
                    }
                });
              }else if(res.data.code !== 1){
                this.$alert(res.data.message,'系统提示',{
                  confirmButtonText:'确定',
                  type:'warning'
                })
              }
            })
        },
        blackAdd(){
            this.addBlackList = true
        },
        removeBlackListBtn(){
            let dataArr = []
            dataArr.push({
                id: this.arr[1],
                transactionTime: this.arr[2],
                online_bankCardNoBl: this.bankCardNum,
                online_idNoBl: this.idCard,
                online_loginNameBl: this.loginName,
                online_userPhoneBl: this.cardholderPhone,
                offline_merchantId: this.merchantId,
                paramMerchantId: this.merchantId,
                paramMerchantOrder: this.merchantOrder,
                online_imeiBl: this.imei,
                online_terminalIdBl: this.terminalNum,
                online_userIpBl: this.transactionIp,
                online_referBl: this.url
            });
            this.$axios.post('/NameListController/batchSaveName',qs.stringify({
                sessionId:localStorage.getItem('SID'),
                source:'753',
                type:'black',
                bizLine:'online',
                comments:'',
                data: JSON.stringify(dataArr),
                buttonType:'check_detail_delBlack',
            }))
            .then(res => {
              console.log(res.data)
              if(res.data.code === 1){
                  this.$alert('删除黑名单成功', '系统提示', {
                      confirmButtonText: '确定',
                      type:'success',
                      callback:action=>{
                         this.removeBlackList = false
                      }
                  });

              }else if(res.data.code !== 1){
                this.$alert(res.data.message,'系统提示',{
                  confirmButtonText:'确定',
                  type:'warning'
                })
              }
            })
        },
        blackRemove(){
          // this.$confirm('确定删除黑名单吗', '提示', {
          //     confirmButtonText: '确定',
          //     cancelButtonText: '取消',
          //     closeOnClickModal:false,
          //     type: 'warning'
          // }).then(() => {
            this.removeBlackList = true



        },
        create(){
          localStorage.setItem('MERCHANID',this.merchantId)
          localStorage.setItem('MERID',this.merchantOrder)
          localStorage.setItem('transactionTime',this.transactionTime)
          window.open(window.location.href.split('#')[0] + '#/newCase?from=' + 1 + '&transactionTime=' + this.arr[2])
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
        // 银行卡历史记录
        getBankHisList(){
          this.$axios.post('/OnlineChecklistController/queryBankCardList',qs.stringify({
            sessionId: localStorage.getItem('SID'),
            id: this.arr[1],
            pageNum: this.pageNumBank,
            pageSize: this.pageSizeBank,
            transactionTime: this.arr[2],
            bankCardNum: this.bankCardNum
          }))
          .then(res => {
             console.log(res.data)
            if (res.data.recordList && res.data.recordList.length > 0) {
                res.data.recordList.forEach(item => {
                    item._bankCardNum = card(item.bankCardNum)
                });
            }
            this.bankHisTable = res.data.recordList
            this.totalSize = res.data.totalSize
          })
          .catch(error => {
            console.log(error)
          })
        },
        handleCurrentChange(val){
          this.pageNum = val
          this.getRuleControlList()
        },
        handleCurrentChangeBank(val){
          this.pageNumBank = val
          this.getBankHisList()
        },
         // 触发规则详情
        getRuleControlList(){
            this.$axios.post('/RulesController/queryRulesByRuleId',qs.stringify({
                'sessionId':localStorage.getItem('SID'),
                'scenesCode':this.scenesCode.trim(),
                'detailType':1,
                'bankCard':this.bankCardNum,
                'checkId':this.id,
                'pageNum':this.pageNum,
                'pageSize':this.pageSize
            }))
            .then(res => {
                console.log(res.data)

                if (res.data.recordList && res.data.recordList.length > 0) {
                    res.data.recordList.forEach(item => {
                        item.bankCard = card(item.bankCard)
                    });
                }
                this.ruleControlTableData = res.data.recordList
                this.totalSizeNum = res.data.totalSize


            })
            .catch(error => {
                console.log(error)
            })
        },
      },
      mounted(){
        this.init()
      },
    }
</script>
<style scoped>
.text-box span{
    font-size: 13px;
    text-align: left;
    color: #333;
    margin-left: 13px;
    float: left;
    white-space: nowrap;
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
  padding-top: 15px;
}
.divContent .text input{
  border:0;
}
.text{
  width:40%;
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
  width: 20%;
  color: rgb(142, 142, 142)
}
.boxOnly{
  display: block;
  width: 100%;
  height: 50px;
  line-height: 40px;
  overflow: hidden;
}
.divContent p {
  font-size: 13px;
  color:#606266;
  padding: 10px;
  line-height: 26px;
}
/* .boxOnly input{
  border: none;
}  */
.el-icon-arrow-down{
  transform: rotate(180deg);
  -webkit-transform: rotate(180deg);
  -moz-transform: rotate(180deg);
  -ms-transform: rotate(180deg)
}
</style>
