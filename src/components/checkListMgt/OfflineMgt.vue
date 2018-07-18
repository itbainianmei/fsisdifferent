<!--线下核查单管理-->
<template>
    <div>
        <div class="searchBasic">
            <div class="title" @click="serchToggleC" style="cursor:pointer">
                <i class="el-icon-arrow-down toggleIcon" id="ordinarySerch"></i>
                <span>基础查询</span>
            </div>
            <el-collapse-transition>
                <div class="searchContentgray" id="searchContentgray" v-show="serchToggle">
                    <div class="leftContent">
                        <el-form ref="form" :model="form" label-width="115px"  class="demo-ruleForm formClass">
                            <div class="formConClass">
                                <el-form-item label="开始时间:">
                                    <el-date-picker
                                    v-model="form.beginTime"
                                    type="datetime"
                                    placeholder="选择日期时间"
                                    style="width: 90%;max-width:225px;"
                                    :editable=false
                                    value-format='yyyy-MM-dd HH:mm:ss'></el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="结束时间:" >
                                    <el-date-picker
                                    v-model="form.endTime"
                                    type="datetime"
                                    placeholder="选择日期时间"
                                    style="width: 90%;max-width:225px;"
                                    :editable=false
                                    value-format='yyyy-MM-dd HH:mm:ss'></el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="核查单号:">
                                    <el-input v-model="form.checkListNo" placeholder="支持批量查询"
                                            style="width: 90%;max-width:225px;"
                                            readonly="readonly"
                                            @click.native="showInpMouse"
                                            suffix-icon='el-icon-arrow-down'
                                           >
                                    </el-input>
                                    <div class='inpListShow' >
                                       <el-input style='border:0 !important' type="textarea" class='checkListNoInp' placeholder="最多输入100条记录，换行符区分"
                                                :autosize="{ minRows: 4, maxRows: 4}"  wrap="hard" v-model='checkListNoTextarea' @input.native='changeCheckNoInp'></el-input>
                                        <div class='footerBtn' v-show='showFooterDiv'>
                                            <span class='inputClass' @click='checkListCancel'>取消</span>
                                            <span class='inputClass' @click='checkListConfirm'>确定</span>

                                        </div>

                                    </div>
                                </el-form-item>

                            </div>
                            <div class="formConClass">
                                <el-form-item label="易宝交易流水号:">
                                    <el-input v-model="form.streamNo" placeholder="支持批量查询"
                                              style="width: 90%;max-width:225px;"  readonly="readonly"
                                              @click.native="showstreamNoInpList"
                                              suffix-icon='el-icon-arrow-down'></el-input>
                                    <div class='streamNoInpListShow' >
                                       <el-input type="textarea" class='checkListNoInp' placeholder="最多输入100条记录，换行符区分"
                                                :autosize="{ minRows: 4, maxRows: 4}"  wrap="hard" v-model='streamText' @input.native='changeStreamNo'></el-input>
                                        <div class='footerBtn' v-show='showStream'>
                                            <span class='inputClass' @click='streamNoInpListCancel'>取消</span>
                                            <span class='inputClass' @click='streamNoInpListConfirm'>确定</span>

                                        </div>

                                    </div>
                               </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="商户编号:">
                                    <el-input v-model="form.busiNum" placeholder="支持批量查询"
                                              style="width: 90%;max-width:225px;"
                                              readonly="readonly" @click.native="busiNumTextShow"
                                              suffix-icon='el-icon-arrow-down'></el-input>
                                    <div class='busiNumInpListShow' >
                                        <el-input type="textarea" class='checkListNoInp' placeholder="最多输入100条记录，换行符区分"
                                                    :autosize="{ minRows: 4, maxRows: 4}"  wrap="hard" v-model='busiNumTextarea' @input.native='changeBusiNo'></el-input>
                                            <div class='footerBtn' v-show='showBusiNo'>
                                                <span class='inputClass' @click='busiNumCancel'>取消</span>
                                                <span class='inputClass' @click='busiNumConfirm'>确定</span>

                                            </div>
                                    </div>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="商户签约名称:">
                                    <el-input v-model="form.signName" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="风险类型:" >
                                    <el-select v-model="form.riskType" placeholder="请选择" style="width: 90%;max-width:225px;" @focus='riskTypeSeleList'>
                                        <el-option  :value="item.sysconid" :label='item.sysname' v-for='(item,index) in riskType' :key='index'></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="风险等级:">
                                    <el-select v-model="form.riskLevel" placeholder="请选择" style="width: 90%;max-width:225px;" @focus="riskLevelSeleList">
                                        <el-option :label="item.riskName" :value="item.riskId" v-for='(item,index) in riskLevelList' :key='index'></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="检查状态:" >
                                    <el-select v-model="form.checkStatus" placeholder="请选择" style="width: 90%;max-width:225px;" @focus="checkStatusSeleList">
                                        <el-option :label="item.sysname" :value="item.sysconid" v-for='(item,index) in checkStatusList' :key='index'></el-option>

                                    </el-select>
                                </el-form-item>
                            </div>
                        </el-form>
                    </div>
                    <div class="rightContent">
                        <el-button type="primary" class="serchbtn baseSearchBtn" icon="el-icon-search" style="margin-top: 45px;" @click='search(1)' v-if="searchPermission1"></el-button>
                        <el-button type="primary" class="serchbtn baseSearchBtn" icon="el-icon-refresh" @click='reset' ></el-button>
                    </div>
                </div>
            </el-collapse-transition>
        </div>
        <div class="seniorSearch" v-if="searchPermission2">
            <div class="title" style="cursor:pointer"  @click="seniorSearchToggleC" v-if="searchPermission2">
                <i class="el-icon-arrow-down toggleIcon" id="advancedSerch"></i>
                <span >高级查询</span>
            </div>
            <el-collapse-transition>
                <div class="seniorSearchContent activeToggle" v-show="seniorSearchToggle">
                    <div class="leftContent" >
                        <el-form ref="form" :model="form" label-width="100px"  class="demo-ruleForm">
                            <div class="formConClass">
                                <el-form-item label="风险定性:" >
                                    <el-select v-model="form.riskQualitative" placeholder="请选择" style="width: 90%;max-width:225px;" @focus="riskQualiteSelelist">
                                        <el-option :label="item.sysname" :value="item.sysconid" v-for='(item,index) in riskQualitativeList' :key='index'></el-option>

                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="规则编码:">
                                    <!-- <el-select v-model="form.scene" placeholder="请选择" style="width: 90%;max-width:225px;" @focus="sceneSeleList">
                                        <el-option :label="item.sysname" :value="item.sysconid" v-for='(item,index) in sceneList' :key='index'></el-option>

                                    </el-select> -->
                                    <el-input v-model="form.scene" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="来源:">
                                    <el-select v-model="form.source" placeholder="请选择" style="width: 90%;max-width:225px;" @focus="sourceSeleList">
                                        <el-option :label="item.sysname" :value="item.sysconid" v-for='(item,index) in sourceList' :key='index'></el-option>

                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="创建来源:">
                                    <el-select v-model="form.makeScource" placeholder="请选择" style="width: 90%;max-width:225px;" @focus="makeScourceSeleList">
                                        <el-option :label="item.sysname" :value="item.sysconid" v-for='(item,index) in makeScourceList' :key='index'></el-option>

                                    </el-select>
                                </el-form-item>
                            </div>
                        </el-form>
                    </div>
                    <div class="rightContent1">
                        <el-button type="primary" class="serchbtn" icon="el-icon-search" style="margin-top: 17px;" @click='search(1)'></el-button>
                        <el-button type="primary" class="serchbtn" icon="el-icon-refresh" @click='reset'></el-button>
                    </div>
                </div>
            </el-collapse-transition>
        </div>
        <div class="tableData">
            <div v-if="switchPermission">
                <div class="onf">
                <span>视图切换:</span>
                </div>
                <div class="lsst" id="stIcon" @click="toggleSt"></div>
            </div>
            <div class="contentBotoom">
                <div class="button">
                    <div class="leftButton clear">
                        <div class="BotoomBtn leftRadius" @click="newOffMgt" title='添加' v-if="addPermission">
                            <div class="icon1"></div>
                        </div>
                        <div class="BotoomBtn" title='导入' @click='importCheckList = true' v-if="importPermission">
                            <div class="icon2"></div>
                        </div>
                        <div class="BotoomBtn" data-title='下载' id="offlineDownLoad" v-if="downloadPermission">
                            <div class="icon7" @click="downloadOffLine=true"></div>
                        </div>
                        <div class="BotoomBtn" title='派发' @click='distrubuteDialog' v-if="dispatchPermission">
                            <div class="icon3"></div>
                        </div>
                        <div class="BotoomBtn" @click="disposeOffline" title='处理' v-if="dellPermission">
                            <div class="icon4"></div>
                        </div>
                        <div class="BotoomBtn" title='审核' @click='verifyShow' v-if="checkPermission">
                            <div class="icon5"></div>
                        </div>
                        <div class="BotoomBtn rightRadius" id='dataTitle' title='风险定性修改' @click='riskQualitativeShow' v-if="riskPermission">
                            <div class="icon6"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div >
                <!-- 流水视图 -->
                <el-table
                    :data="lsstTable"
                    border
                    style="width: 100%"
                    v-if="lsstShow"
                    @row-dblclick="offlineDetails($event)"
                    class='tableStyle'
                    @selection-change="handleSelectionChange"
                    >
                    <el-table-column
                        type="selection"
                        width="50"
                        align='center'
                    >
                    </el-table-column>
                    <el-table-column
                        prop="checkCode"
                        label="核查单编号"
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
                        prop="merchantSignName"
                        label="商户签约名称"
                        width="150"
                        align='center'>
                    </el-table-column>
                    <el-table-column
                        prop="agentCode"
                        label="代理商编号"
                        width="150"
                        align='center'>
                    </el-table-column>
                    <el-table-column
                        prop="agentName"
                        label="代理商名称"
                        width="150"
                        align='center'>
                    </el-table-column>
                    <el-table-column
                        prop="sale"
                        label="销售"
                        width="150"
                        align='center'>
                    </el-table-column>
                    <el-table-column
                        prop="branchCompany"
                        label="分公司"
                        width="150"
                        align='center'>
                    </el-table-column>
                    <el-table-column
                        prop="transactionMoney"
                        label="交易金额"
                        width="150"
                        align='center'>
                    </el-table-column>
                    <el-table-column
                        prop="transactionalNumber"
                        label="易宝交易流水号"
                        width="150"
                        align='center'>
                    </el-table-column>
                    <el-table-column
                        prop="createTime"
                        label="生成时间"
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
                        prop="finishTime"
                        label="完成时间"
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
                        prop="source"
                        label="来源"
                        width="150"
                        align='center'>
                    </el-table-column>
                    <el-table-column
                        prop="riskType"
                        label="风险类型"
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
                        prop="riskQualitative"
                        label="风险定性"
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
                        prop="operationTime"
                        label="操作时间"
                        width="150"
                        align='center'>
                    </el-table-column>
                    <el-table-column
                        prop="processingStaff"
                        label="处理人员"
                        width="150"
                        align='center'>
                    </el-table-column>
                </el-table>
            </div>
            <div >
              <!-- 主体视图 -->
              <!-- <div>{{chackboxChoose}}</div> -->
                <el-table
                    :data="ztstTable"
                    border
                    style="width: 100%"
                    v-if="ztstShow"
                    @selection-change="pipeliningviewChange"
                    @change.native='selectAll'>

                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <tr v-for='(item,index) in props.row.childs' :key='index' class='expandTableTd'>
                                 <td class='tableExpandIcon' ></td>
                                 <td class='tableExpandCheck' >
                                       <el-checkbox :label='item.id'  :value='item.id' v-model='chackboxChoose' ></el-checkbox>
                                 </td>
                                 <td class='tableExpandTd' >
                                     <div class='tableExpandTdText'>{{item.merchantId}}</div>
                                 </td>
                                 <td class='tableExpandTd'>
                                     <div class='tableExpandTdText'>{{item.checkCode}}</div>
                                 </td>
                                 <td class='tableExpandTd' >
                                     <div class='tableExpandTdText'>{{item.merchantSignName}}</div>
                                 </td>
                                 <td class='tableExpandTd' >
                                     <div class='tableExpandTdText'>{{item.agentCode}}</div>
                                 </td>
                                 <td class='tableExpandTd' >
                                     <div class='tableExpandTdText'>{{item.agentName}}</div>
                                 </td>
                                 <td class='tableExpandTd' >
                                     <div class='tableExpandTdText'>{{item.sale}}</div>
                                 </td>
                                 <td class='tableExpandTd' >
                                     <div class='tableExpandTdText'>{{item.branchCompany}}</div>
                                 </td>
                                 <td class='tableExpandTd' >
                                     <div class='tableExpandTdText'>{{item.transactionMoney}}</div>
                                 </td>
                                 <td class='tableExpandTd' >
                                     <div class='tableExpandTdText'>{{item.transactionalNumber}}</div>
                                 </td>
                                 <td class='tableExpandTd'>
                                     <div class='tableExpandTdText'>{{item.createTime}}</div>
                                 </td>
                                 <td class='tableExpandTd' >
                                     <div class='tableExpandTdText'>{{item.transactionTime}}</div>
                                 </td>
                                 <td class='tableExpandTd' >
                                      <div class='tableExpandTdText'>{{item.finishTime}}</div>
                                 </td>
                                 <td class='tableExpandTd' >
                                     <div class='tableExpandTdText'>{{item.riskValue}}</div>
                                 </td>
                                 <td class='tableExpandTd' >
                                     <div class='tableExpandTdText'>{{item.scenesCode}}</div>
                                 </td>
                                 <td class='tableExpandTd' >
                                     <div class='tableExpandTdText'>{{item.source}}</div>
                                 </td>
                                 <td class='tableExpandTd' >
                                     <div class='tableExpandTdText'>{{item.riskType}}</div>
                                 </td>
                                 <td class='tableExpandTd' >
                                     <div class='tableExpandTdText'>{{item.riskLevel}}</div>
                                 </td>
                                 <td class='tableExpandTd'>
                                     <div class='tableExpandTdText'>{{item.riskQualitative}}</div>
                                 </td>
                                 <td class='tableExpandTd' >
                                     <div class='tableExpandTdText'>{{item.checkStatus}}</div>
                                 </td>
                                 <td class='tableExpandTd'>
                                     <div class='tableExpandTdText'>{{item.operationTime}}</div>
                                 </td>
                                 <td class='tableExpandTd' >
                                     <div class='tableExpandTdText'>{{item.processingStaff}}</div>
                                 </td>
                            </tr>
                        </template>
                    </el-table-column>

                    <el-table-column
                        type='selection'
                        align='center'
                        width='50'>
                    </el-table-column>
                    <el-table-column
                        prop="merchantId"
                        label="商户编号"
                        width="150"
                        align='center'>
                    </el-table-column>
                    <el-table-column
                        prop="checkCode"
                        label="核查单"
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
                        prop="agentCode"
                        label="代理商编号"
                        width="150"
                        align='center'>
                    </el-table-column>
                    <el-table-column
                        prop="agentName"
                        label="代理商名称"
                        width="150"
                        align='center'>
                    </el-table-column>
                    <el-table-column
                        prop="sale"
                        label="销售"
                        width="150"
                        align='center'>
                    </el-table-column>
                    <el-table-column
                        prop="branchCompany"
                        label="分公司"
                        width="150"
                        align='center'>
                    </el-table-column>
                    <el-table-column
                        prop="transactionMoney"
                        label="交易金额"
                        width="150"
                        align='center'>
                    </el-table-column>
                    <el-table-column
                        prop="transactionalNumber"
                        label="易宝交易流水号"
                        width="150"
                        align='center'>
                    </el-table-column>
                    <el-table-column
                        prop="createTime"
                        label="生成时间"
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
                        prop="finishTime"
                        label="完成时间"
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
                        prop="scenesCode"
                        label="规则编码"
                        width="150"
                        align='center'>
                    </el-table-column>
                     <el-table-column
                        prop="source"
                        label="来源"
                        width="150"
                        align='center'>
                    </el-table-column>
                    <el-table-column
                        prop="riskType"
                        label="风险类型"
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
                        prop="riskQualitative"
                        label="风险定性"
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
                        prop="operationTime"
                        label="操作时间"
                        width="150"
                        align='center'>
                    </el-table-column>
                    <el-table-column
                        prop="processingStaff"
                        label="处理人员"
                        width="150"
                        align='center'>
                    </el-table-column>
                </el-table>

            </div>
            <div class="block">
                <div class='pagination'>
                  <span>每页显示</span>
                  <select  class="evetotal"    @change='changeEvent($event)'>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="40">40</option>
                  </select>
              </div>
              <div class='paginationRight'>
                  <el-pagination
                    layout="prev, pager, next"
                    :page-sizes= "[10,20,30,40]"
                    :page-size= pageSize
                    :current-page.sync="currentPage"
                    @current-change="handleCurrentChange"
                    :total= pageCount>
                  </el-pagination>
              </div>
            </div>
        </div>
        <el-dialog title="核查单下载：分页选择下载" :visible.sync="downloadOffLine" width="30%" >
            <div style="text-align: center; margin-bottom:20px;">选择下载从<input type="number" v-model="loadStartNum" min="1" class="downClass" >到<input type="number" min="1"  class="downClass" v-model="loadEndNum" >页的数据</div>
            <h4 style="text-align: center">当前共<span>{{totalSize}}</span>页</h4>
            <span slot="footer" class="dialog-footer">
            <el-button @click="downloadOffLineClose">取 消</el-button>
            <el-button type="primary" @click="uploadList">下 载</el-button>
            </span>
        </el-dialog>
        <el-dialog title="从Excel导入核查单" :visible.sync="importCheckList" width="570px" v-dialogDrag>
            <div>
                <span style='margin-left:15px'>本地文件：</span>
                <el-input placeholder="点击帮助以查看具体格式要求"  class="listValInp" v-model='inputFileName' readonly="readonly"></el-input>
                <label class="ui_button" for="filename">选择</label>
                <form enctype="multipart/form-data" id="formsubmit">
                  <input  class="formIpt" type="file" id="filename" name="filename"
                  style="position:absolute;clip:rect(0 0 0 0);width:60%;"
                  @change='fileUpload'
                  accept='.csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                >
                </form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" style="float:left;margin-left:15px;" @click='uploadTemplet'>下载模板</el-button>
                <el-button type="primary" @click="innerVisible = true">帮 助</el-button>
                <el-button type="primary" @click='uploadFileBtn'>确 定</el-button>
                <el-button @click="cancalUploadFile">取 消</el-button>
            </span>
          <!-- 帮助信息提示弹框 -->
            <el-dialog width="800px" title="导入的文件格式要求" :visible.sync="innerVisible" append-to-body v-dialogDrag>
                <table class="importData">
                    <thead>
                        <tr>
                            <th>字段名

                            </th>
                            <th style='padding-left:0'>格式要求</th>
                        </tr>
                    </thead>
                    <tr>
                        <th>商户号
                            <span class='changeColor'>(必填项)</span>
                        </th>
                        <td >数字(15位)</td>
                    </tr>
                    <tr>
                        <th>交易流水号
                            <span class='changeColor'>(必填项)</span>
                        </th>
                        <td>
                            数字
                        </td>
                    </tr>
                    <tr>
                        <th>交易类型</th>
                        <td>

                            <span>可选：消费、消费撤销、预授权完成、预授权撤销、预授权完成撤销、微信、被扫、网银、H5、APP、B2C、B2B</span>
                        </td>
                    </tr>
                    <tr>
                        <th>终端号</th>
                        <td>

                            <span>数字</span>
                        </td>
                    </tr>
                    <tr>
                        <th>来源
                            <span class='changeColor'>(必填项)</span>
                        </th>
                        <td>

                            <span>可选：银联、警方、自查、其他</span>
                        </td>
                    </tr>
                    <tr>
                        <th>风险类型
                            <span class='changeColor'>(必填项)</span>
                        </th>
                        <td>

                            <span>必须与系统预设的风险类型相符</span>
                        </td>
                    </tr>
                    <tr>
                        <th>风险等级
                            <span class='changeColor'>(必填项)</span>
                        </th>
                        <td>

                            <span>必须与系统预设的风险等级相符</span>
                        </td>
                    </tr>
                    <tr>
                        <th>备注

                        </th>
                        <td>

                            <span>字数不能多于50个字</span>
                        </td>
                    </tr>

                </table>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="innerVisible = false">已了解</el-button>
                </span>
            </el-dialog>
        </el-dialog>
        <!-- 审核 -->
        <el-dialog title="请填写审核意见" :visible.sync="verify" width="370px">
            <el-form :inline="true" :model="verifyForm" class="demo-form-inline"  label-width="100px">
                <el-form-item label="审核意见:">
                    <el-select v-model="verifyForm.region" style='width:88%' @focus='getVerifyList'>
                        <el-option :label="item.sysname" :value="item.sysconid" v-for='(item,index) in verifyList' :key='index'></el-option>

                    </el-select>
                </el-form-item>
                <el-form-item label="备注:">
                    <el-input type='textarea' v-model='verifyForm.desc' style='width:100%'></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="verify = false">取 消</el-button>
                <el-button type="primary" @click='verifyBtn'>确 定</el-button>
            </span>
        </el-dialog>
        <!-- 风险定性 -->
        <el-dialog title="请填写风险定性意见" :visible.sync="riskQualitative" width="370px">
            <el-form :inline="true" :model="riskForm" class="demo-form-inline"  label-width="100px">
                <el-form-item label="风险定性:">
                    <el-select v-model="riskForm.riskQualitative" style='width:88%' @focus="riskQualiteSelelist">
                        <el-option :label="item.sysname" :value="item.sysconid" v-for='(item,index) in riskQualitativeList' :key='index'></el-option>

                    </el-select>
                </el-form-item>
                <el-form-item label="备注:">
                    <el-input type='textarea' v-model='riskForm.desc'></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="riskQualitative = false">取 消</el-button>
                <el-button type="primary" @click='riskFormBtn'>确 定</el-button>
            </span>
        </el-dialog>
        <!-- 派发 -->
        <el-dialog title="派发" :visible.sync="distribute" width="370px">
            <el-form :inline="true" v-model="distributeForm" class="demo-form-inline"  label-width="100px">
                <el-form-item label="派发至:">
                    <el-select v-model="distributeForm.region" style='width:88%' @focus='getdistribute' >
                        <el-option :label="item.mechname" :value="item.mechid" v-for='(item,index) in distributeList' :key='index'></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="distribute = false">取 消</el-button>
                <el-button type="primary" @click='distributeBtn'>确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import qs from 'qs'
export default {
    name:'线下核查单管理',
  data(){
      return{
          searchPermission1: true,//基础搜索权限
          searchPermission2: true,//高级搜索权限
          switchPermission: true,//视图切换权限
          addPermission: true,//添加权限
          importPermission: true,//导入权限
          downloadPermission: true,//下载权限
          dispatchPermission: true,//分发权限
          dellPermission: true,//处理权限
          checkPermission: true,//审核权限
          riskPermission: true,//风险定制修改权限
          detailPermission: true,//双击查看详情的权限
          labelText:true,
          currentPage:1,
          seniorSearchToggle:false,
          serchToggle:true,
          ztstShow:false,
          lsstShow:true,
          lsstTable:[],
          chackboxChoose:[],
          totalSize:0,
          pageSizeCount:10,
          showFooterDiv:false,
          showStream:false,
          showBusiNo:false,
          downloadOffLine:false,
          loadStartNum: 0,
          loadEndNum: 0,

          ztstTable:[],
          form:{
            beginTime:'',
            endTime:'',
            checkListNo:'',
            streamNo:'',
            busiNum:'',
            signName:'',
            riskType:'',
            riskLevel:'',
            checkStatus:'',

            riskQualitative:'',
            scene:'',
            source:'',
            makeScource:'',
          },
          rules: {},
          riskType:[],
          riskLevelList:[],
          checkStatusList:[],
          riskQualitativeList:[],
          sceneList:[],
          sourceList:[],
          makeScourceList:[],
          verifyList:[],
          importCheckList:false,
          innerVisible:false,
          inputFileName:'',
          file:'',
          verify:false,
          verifyForm:{
              region:'',
              desc:'',
          },
          riskQualitative:false,
          riskForm:{
              riskQualitative:'',
              desc:''
          },
          checkListNoTextarea:'',
          streamText:'',
          busiNumTextarea:'',
          checkItem:[],
          pageSize:10,
          pageCount:0,
          streamView:false,
          distribute:false,
          distributeForm:{
              region:'',
          },
          distributeList:[],
          agencyID:[],
          pageNum:1,
          checkboxItem:[],
          rowCheckList:[],
          rowCheckItem:'',
      }
  },
  created() {
      // 按钮权限
      const idList = JSON.parse(localStorage.getItem('ARRLEVEL'));
      this.searchPermission1 = idList.indexOf(257) === -1 ? false : true;
      this.searchPermission2 = idList.indexOf(258) === -1 ? false : true;
      this.switchPermission = idList.indexOf(76) === -1 ? false : true;
      this.addPermission = idList.indexOf(73) === -1 ? false : true;
      this.importPermission = idList.indexOf(74) === -1 ? false : true;this.downloadPermission = idList.indexOf(77) === -1 ? false : true;this.dispatchPermission = idList.indexOf(67) === -1 ? false : true;this.dellPermission = idList.indexOf(68) === -1 ? false : true;
      this.checkPermission = idList.indexOf(69) === -1 ? false : true;
      this.riskPermission = idList.indexOf(75) === -1 ? false : true;
      this.detailPermission = idList.indexOf(266) === -1 ? false : true;
    },
  methods:{
      dispose(){
        //   window.open('http://172.19.40.129:8080/#/OfflineMgtDetails')
        //   window.open(' http://10.151.30.148:8080/business-view/#/OfflineMgtDetails')
          window.open(window.location.href.split('#')[0] + '#/OfflineMgtDetails')

      },
      newOffMgt(){
        //   window.open('http://172.19.40.129:8080/#/NewOfflineMgt')
        //   window.open('http://10.151.30.148:8080/business-view/#/NewOfflineMgt')
          window.open( window.location.href.split('#')[0] + '#/NewOfflineMgt')
      },
      offlineDetails(row){
          //如果没有查看详情的权限，则返回
          if (this.detailPermission === false) {
              return;
          }
          console.log(row)
        //   window.open('http://172.19.40.129:8080/#/OfflineMgtDetails?'+row.id)
        //   window.open('http://10.151.30.148:8080/business-view/#/OfflineMgtDetails?'+row.id)
          window.open(window.location.href.split('#')[0] + '#/OfflineMgtDetails?'+row.id)
      },
      serchLocation(){
          var searchBasic = document.getElementsByClassName("rightContent")
          if(this.seniorSearchToggle){
             searchBasic.style.display = "none"
          }
      },
      toggleSt(){
          var onOff = document.getElementById("stIcon");
          if(onOff.className == "lsst"){
              onOff.classList.remove("lsst")
              this.lsstShow = false;
              onOff.classList.add("ztst")
              this.ztstShow = true;
              this.mainViewGet()

          }else if(onOff.className == "ztst"){
              onOff.classList.remove("ztst")
              this.ztstShow = false;
              onOff.classList.add("lsst")
              this.lsstShow = true;
              this.getstreamView();
          }
      },
      downloadOffLineClose(){
        this.downloadOffLine = false
        this.loadStartNum = 0
        this.loadEndNum = 0
      },
      toggleOnOff(){
          var onOff = document.getElementById("onOff");
          if(onOff.className == "onOff"){
              onOff.classList.remove("onOff")
              onOff.classList.add("offOn")
          }else{
              onOff.classList.remove("offOn")
              onOff.classList.add("onOff")
          }
      },
      uploadList(){
        console.log("下载");
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

        window.location = encodeURI(this.uploadBaseUrl + '/OfflineChecklistController/downLoadOffline?startPage=' + this.loadStartNum + '&endPage=' + this.loadEndNum
          + '&sessionId=' + localStorage.getItem('SID')
          + '&startDate=' + this.form.beginTime
          + '&endDate=' + this.form.endTime
          + '&checkId=' + this.form.checkListNo
          + '&transactionalNumber=' + this.form.streamNo
          + '&merchantId=' + this.form.busiNum
          + '&merchantSign=' + this.form.signName
          + '&riskType=' + this.form.riskType
          + '&riskLevel=' + this.form.riskType
          + '&checkStatus=' + this.form.checkStatus
          + '&riskQualitative=' + this.form.riskQualitative
          + '&scenesCode=' + this.form.scene
          + '&source=' + this.form.source
          + '&createSource=' + this.form.makeScource
          + '&pageNum=' + parseInt(this.pageNum)
          + '&pageSize=' + parseInt(this.pageSize)
          + '&agency=' + localStorage.getItem('Agency'));

        this.offlineDownLoad = false
        this.loadStartNum = 0
        this.loadEndNum = 0
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      reset(){
          this.initTimeSet()
          this.form.checkListNo = ''
          this.form.streamNo = ''
          this.form.busiNum = ''
          this.form.signName = ''
          this.form.riskType = ''
          this.form.riskLevel = ''
          this.form.checkStatus = ''
          this.form.riskQualitative = ''
          this.form.scene = ''
          this.form.source = ''
          this.form.makeScource = ''

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
          var advancedSerch = document.getElementById("advancedSerch")


          if(this.seniorSearchToggle){
              document.querySelectorAll('.baseSearchBtn').forEach(ele => {
                  ele.style.opacity = '0'
                  ele.style.transition = 'all 2s'
                  advancedSerch.style.transform = 'rotate(0deg)'
              });
          }else if(!this.seniorSearchToggle){
               document.querySelectorAll('.baseSearchBtn').forEach(ele => {
                  ele.style.opacity = '1'
                  ele.style.transition = 'all 2s'
                  advancedSerch.style.transform = 'rotate(180deg)'
              });
          }
      },
    //   基础查询
      search(current = 1){
        if(this.ztstShow === true && this.lsstShow === false){
          this.mainViewGet(current);
        }

        if(this.lsstShow === true && this.ztstShow === false){
            this.getstreamView(current)
        }
      },
    //   流水视图查询
    getstreamView(current = 1){
          console.log('流水视图')
        //   console.log(this.form.beginTime)
        //   console.log(this.form.endTime)
        //   console.log(this.pageNum)
        //   console.log(this.pageSize)
        console.log(this.form.checkListNo)
        console.log(this.form.streamNo)
        console.log(this.form.busiNum)


          this.$axios.post('/OfflineChecklistController/queryAllForTurnover',qs.stringify({
              'sessionId':localStorage.getItem('SID'),
              'startDate':this.form.beginTime,
              'endDate':this.form.endTime,
              'checkId':this.form.checkListNo,
              'transactionalNumber':this.form.streamNo,
              'merchantId':this.form.busiNum,
              'merchantSign':this.form.signName,
              'riskType':this.form.riskType,
              'riskLevel':this.form.riskLevel,
              'checkStatus':this.form.checkStatus,
              'riskQualitative':this.form.riskQualitative,
              'scenesCode':this.form.scene,
              'source':this.form.source,
              'createSource':this.form.makeScource,
            //   'pageNum': parseInt(this.pageNum) ,
              'pageNum': current ,
              'pageSize': parseInt(this.pageSize),
              'agency':localStorage.getItem('Agency'),

          }))
          .then(res => {
              this.lsstTable = res.data.recordList
              this.pageCount = res.data.totalSize
              this.totalSize = res.data.totalPage
              this.currentPage = current;//默认第一页
          })
          .catch(error => {
              console.log(error)
          })
    },
    //   主体视图查询
      mainViewGet(current = 1){
           console.log('主体视图')

            this.$axios.post('/OfflineChecklistController/queryAllForSubject',qs.stringify({
                'sessionId':localStorage.getItem('SID'),
                'agency':localStorage.getItem('Agency'),
                'startDate':this.form.beginTime,
                'endDate':this.form.endTime,
                'checkId':this.form.checkListNo,
                'transactionalNumber':this.form.streamNo,
                'merchantId':this.form.busiNum,
                'merchantSign':this.form.signName,
                'riskType':this.form.riskType,
                'riskLevel':this.form.riskLevel,
                'checkStatus':this.form.checkStatus,
                'riskQualitative':this.form.riskQualitative,
                'scenesCode':this.form.scene,
                'source':this.form.source,
                'createSource':this.form.makeScource,
                // 'pageNum': parseInt(this.pageNum),
                'pageNum': current,
                'pageSize': parseInt(this.pageSize)
            }))
            .then(res => {
                this.ztstTable = res.data.recordList
                this.pageCount = res.data.totalSize
                this.checkboxItem = []
                this.totalSize = res.data.totalPage
                this.currentPage = current;//默认第一页

                // res.data.recordList.forEach(ele => {
                //     if(ele.childs.length !== 0){
                //         ele.childs.forEach((item,index) => {

                //             this.checkboxItem.push(item.id)
                //         })
                //     }

                // })
            })
            .catch(error => {
                console.log(error)
            })
      },

    //   高级查询

      fileUpload(e){
          //console.log(e.target.files[0])
          this.inputFileName = e.target.files[0].name
          this.file = e.target.files[0]
      },
    //   模板下载
      uploadTemplet(){
        window.location=encodeURI(this.uploadBaseUrl + '/OfflineChecklistController/downloadChecklistModel')
      },
      // 导入核查单
      uploadFileBtn(){
        if(this.file === ''){
          this.$alert('不能上传空文件','文件类别错误',{
            confirmButtonText:'确定',
            callback: action => {

            }
          })
          return
        }
        var formData = new FormData();
        formData.append('file', this.file);

        this.$axios.post('/OfflineChecklistController/importChecklist', qs.stringify(formData))
          .then((res) => {
            if(res.data.code == 1){
              this.$alert(res.data.message);
              this.importCheckList = false;
              this.inputFileName = '';
              this.file = ''
            }else {
              this.$alert(res.data.message);
            }
          })
          .catch((error) => {
            this.$alert(error);
          });
      },
      // 取消导入核查单
      cancalUploadFile() {
        this.importCheckList = false;
        this.inputFileName = '';
        this.file = ''
      },
    //   审核
      verifyBtn(){
          let ids = []
            if(this.ztstShow == true){
                ids = this.chackboxChoose
            }else if(this.lsstShow == true){
                ids = this.checkItem
            }

          this.$axios.post('/OfflineChecklistController/updateVerify',qs.stringify({
              'sessionId':localStorage.getItem('SID'),
              'checkIds':ids,
              'checkStatus':this.verifyForm.region,
              'remark':this.verifyForm.desc,
              'userId':localStorage.getItem('USERID')
          }))
          .then(res => {
              if(res.data.code === 1){
                  this.$alert(res.data.message, '系统提示', {
                      confirmButtonText:'确定',
                      type:'success',
                      callback:action => {
                           this.verify = false
                           this.search(1)
                      }
                  })
              } else {
                   this.$alert(res.data.message, '系统提示', {
                      confirmButtonText:'确定',
                      type:'warning',
                      callback:action => {
                           this.verify = false
                      }
                  })
              }
          })
          .catch(error => {
              console.log(error)
          })
      },
    //   风险定性
    riskFormBtn(){
        let ids = []
        if(this.ztstShow == true){
            ids = this.chackboxChoose
        }else if(this.lsstShow == true){
            ids = this.checkItem
        }

        this.$axios.post('/OfflineChecklistController/updateRiskQualitative',qs.stringify({
            'sessionId':localStorage.getItem('SID'),
            'checkIds':ids,
            'riskQualitative':this.riskForm.riskQualitative,
            'remark':this.riskForm.desc,
            'userId':localStorage.getItem('USERID'),
        }))
        .then(res => {
            if(res.data.code === 1){
                this.$alert(res.data.message, '系统提示', {
                    confirmButtonText:'确定',
                    type:'success',
                    callback:action => {
                        this.riskForm.riskQualitative = ''
                        this.riskForm.desc = ''
                        this.riskQualitative = false
                        this.search(1)
                    }
                })
            }else{
                this.$alert(res.data.message, '系统提示', {
                    confirmButtonText:'确定',
                    type:'warning',
                    callback:action => {
                        this.riskQualitative = false
                    }
                })
            }

        })
        .catch(error => {
            console.log(error)
        })
    },
    showInpMouse(){
        document.querySelector('.inpListShow').style.display = 'block'

    },
    hideInpMouse(){
      //document.querySelector('.inpListShow').style.display = 'none'
    },
    checkListConfirm(){
        let str = this.checkListNoTextarea
        var regRN = /\n/g
        str = str.replace(regRN,",")
        this.form.checkListNo = str
        document.querySelector('.inpListShow').style.display = 'none'


    },
    checkListCancel(){
        this.checkListNoTextarea = ''
        this.form.checkListNo = ''
        document.querySelector('.inpListShow').style.display = 'none'
        this.showFooterDiv = false
    },
    changeEvent(val){
        console.log(val.target.value)
        this.pageSize = parseInt(val.target.value)
        this.search(1)
    },
    handleCurrentChange(val){
        console.log(val)
        this.pageNum = val
        this.search(parseInt(val))
    },
    showstreamNoInpList(){

        document.querySelector('.streamNoInpListShow').style.display = 'block'
    },
    streamNoInpListCancel(){
        this.streamText = ''
        this.form.streamNo = ''
         document.querySelector('.streamNoInpListShow').style.display = 'none'
         this.showStream = false
    },
    streamNoInpListConfirm(){
        let str = this.streamText
        let regRN = /\n/g
        str = str.replace(regRN,',')
        this.form.streamNo = str
        document.querySelector('.streamNoInpListShow').style.display = 'none'

    },
    busiNumCancel(){
        this.form.busiNum = ''
        this.busiNumTextarea = ''
        document.querySelector('.busiNumInpListShow').style.display = 'none'
        this.showBusiNo = false
    },
    busiNumConfirm(){
        let str = this.busiNumTextarea
        let regRN = /\n/g
        str = str.replace(regRN,',')
        console.log(str)
        this.form.busiNum = str
        document.querySelector('.busiNumInpListShow').style.display = 'none'
    },
    busiNumTextShow(){
         document.querySelector('.busiNumInpListShow').style.display = 'block'
    },
    // 处理线下核查单
    disposeOffline(){
        if(this.lsstShow == true){
            if(this.checkItem.length === 0){
                this.$alert('请至少选择一条需要处理的数据','系统提示',{
                    confirmButtonText:'确定',
                    type:'warning',
                    callback:action => {

                    }
                })
                return
            }

            window.open( window.location.href.split('#')[0] + '#/dealwithoffline?'+this.checkItem[0])
        }else if(this.ztstShow == true){
            if(this.chackboxChoose.length === 0){
                this.$alert('请至少选择一条需要处理的数据','系统提示',{
                    confirmButtonText:'确定',
                    type:'warning',
                    callback:action => {

                    }
                })
                return
            }
            window.open( window.location.href.split('#')[0] + '#/dealwithoffline?'+this.chackboxChoose[0])
        }
    },
    // 审核
    verifyShow(){
        if(this.lsstShow == true){
            if(this.checkItem.length === 0){
                this.$alert('请至少选择一条需要审核的数据!','系统提示',{
                    confirmButtonText:'确定',
                    type:'warning',
                    callback:action => {

                    }
                })
                return
            }
             this.verify = true
        }else if(this.ztstShow == true){
            if(this.chackboxChoose.length === 0){
                this.$alert('请至少选择一条需要审核的数据!','系统提示',{
                    confirmButtonText:'确定',
                    type:'warning',
                    callback:action => {

                    }
                })
                return
            }
            this.verify = true
        }

    },
    // 风险定性修改
    riskQualitativeShow(){

        if(this.lsstShow == true){
            if(this.checkItem.length === 0){
                this.$alert('请至少选择一条需要风险定性修改的数据!','系统提示',{
                    confirmButtonText:'确定',
                    type:'warning',
                    callback:action => {

                    }
                })
                return
            }
             this.riskQualitative = true
        }else if(this.ztstShow == true){
            if(this.chackboxChoose.length === 0){
                this.$alert('请至少选择一条需要风险定性修改的数据!','系统提示',{
                    confirmButtonText:'确定',
                    type:'warning',
                    callback:action => {

                    }
                })
                return
            }
            this.riskQualitative = true
        }
    },
    handleSelectionChange(row){
        this.checkItem = []
        row.forEach(ele => {
            this.checkItem.push(ele.id)
        })
    },
    // 主体视图选择框
    pipeliningviewChange(row){
        console.log(row)
        this.rowCheckList = row
        // if(row.length !== 0){
        //     row.forEach(ele => {
        //         this.chackboxChoose.push(ele.id)
        //         ele.childs && ele.childs.forEach(item => {
        //             this.chackboxChoose = this.chackboxChoose.concat(item.id)
        //         })
        //     })
        // }else if(row.length === 0){
        //    this.chackboxChoose = []
        // }
    },
    selectAll(event){
        if (event.target.value == '') return
        if(event.target.checked == false){
            this.chackboxChoose.forEach((ele,index) => {
                if (ele == event.target.value) {
                    this.chackboxChoose.splice(index,1)
                }
            })
        }
    },

    // 风险类型选择框
    riskTypeSeleList(){
        this.$axios.post('/SysConfigController/queryEnum',qs.stringify({
            'sessionId':localStorage.getItem('SID'),
            'type':57
        }))
        .then(res => {
            this.riskType = []
            this.riskType = this.riskType.concat(res.data)
        })
        .catch(error => {
            console.log(error)
        })

    },

    // 风险等级选择框
    riskLevelSeleList(){
        this.$axios.get('/OfflineChecklistController/queryRiskLevel?sessionId=' + localStorage.getItem('SID'))
        .then(res => {
            this.riskLevelList = []
            this.riskLevelList = this.riskLevelList.concat(res.data.riskLevel)
        })
        .catch(error => {
            console.log(error)
        })
    },
    // 检查状态选择框
    checkStatusSeleList(){
        this.$axios.post('/SysConfigController/queryEnum',qs.stringify({
            'sessionId':localStorage.getItem('SID'),
            'type':58
        }))
        .then(res => {
            this.checkStatusList = []
            this.checkStatusList = this.checkStatusList.concat(res.data)
        })
        .catch(error => {
            console.log(error)
        })

    },
    // 风险定性
    riskQualiteSelelist(){
        this.$axios.post('/SysConfigController/queryEnum',qs.stringify({
            'sessionId':localStorage.getItem('SID'),
            'type':59
        }))
        .then(res => {
            this.riskQualitativeList = []
            this.riskQualitativeList = this.riskQualitativeList.concat(res.data)
        })
        .catch(error => {
            console.log(error)
        })
    },
    // 规则编码
    sceneSeleList(){
        this.$axios.post('/SysConfigController/queryEnum',qs.stringify({
            'sessionId':localStorage.getItem('SID'),
            'type':60
        }))
        .then(res => {
            this.sceneList = []
            this.sceneList = this.sceneList.concat(res.data)
        })
        .catch(error => {
            console.log(error)
        })
    },
    // 来源
    sourceSeleList(){
        this.$axios.post('/SysConfigController/queryEnum',qs.stringify({
            'sessionId':localStorage.getItem('SID'),
            'type':61
        }))
        .then(res => {
            this.sourceList = []
            this.sourceList = this.sourceList.concat(res.data)
        })
        .catch(error => {
            console.log(error)
        })
    },
    // 创建来源
    makeScourceSeleList(){
        this.$axios.post('/SysConfigController/queryEnum',qs.stringify({
            'sessionId':localStorage.getItem('SID'),
            'type':62
        }))
        .then(res => {
            this.makeScourceList = []
            this.makeScourceList = this.makeScourceList.concat(res.data)
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
    distrubuteDialog(){
        console.log(this.ztstShow)
        console.log(this.lsstShow)

        if(this.lsstShow == true){
            if(this.checkItem.length === 0){
                this.$alert('请至少选择一条需要派发的数据!','系统提示',{
                    confirmButtonText:'确定',
                    type:'warning',
                    callback:action => {

                    }
                })
                return
            }
             this.distribute = true
        }else if(this.ztstShow == true){
            if(this.chackboxChoose.length === 0){
                this.$alert('请至少选择一条需要派发的数据!','系统提示',{
                    confirmButtonText:'确定',
                    type:'warning',
                    callback:action => {

                    }
                })
                return
            }
            this.distribute = true

        }




    },
    // 派发下拉框获取
    getdistribute(){
        this.$axios.get('/OfflineChecklistController/queryLineMechmang?sessionId=' + localStorage.getItem('SID'))
          .then(res => {
              console.log(res.data.recordList)
              this.distributeList = res.data.recordList
              this.agencyID = res.data.recordList.mechid
          })
          .catch(error => {
              console.log(error)
          })
    },
    // 派发提交
    distributeBtn(){

        console.log(this.distributeForm.region)
        let ids = ''
        if(this.ztstShow == true){
            ids = this.chackboxChoose.join(',')
        }else if(this.lsstShow == true){
            ids = this.checkItem.join(",")
        }
        // console.log(ids)

        this.$axios.post('/OfflineChecklistController/distribute',qs.stringify({
              'sessionId':localStorage.getItem('SID'),
              'ids':ids,
              'agencyId':this.distributeForm.region,
              'userId':localStorage.getItem('USERID')
          }))
          .then(res => {
               if(res.data.code == 1){
                    this.$alert('派发成功','系统提示',{
                        confirmButtonText:'确定',
                        type:'success',
                        callback:action=>{
                            this.distribute = false
                            this.search(1)
                        }
                    }
                )}

          })
          .catch(error => {
              console.log(error)
          })
    },
      // 设置默认时间
    initTimeSet(){
        let date = new Date()
        let y = date.getFullYear()
        let m = "0"+(date.getMonth()+1)
        let d = "0"+date.getDate()
        // console.log(y+'-'+m+'-'+d)
        this.form.beginTime = y+'-'+m.substring(m.length-2,m.length)+'-'+d.substring(d.length-2,d.length) + ' '+  '00:00:00'
        this.form.endTime = y+'-'+m.substring(m.length-2,m.length)+'-'+d.substring(d.length-2,d.length) +' '+  '23:59:59'
    },
    changeCheckbox(e){
         console.log(e)
    },
    //   核查单样式
    changeCheckNoInp(){
        console.log(this.checkListNoTextarea)
        if(this.checkListNoTextarea !== ''){
            this.showFooterDiv = true
        }else if(this.checkListNoTextarea == ''){
            this.showFooterDiv = false
        }
    },
    // 易宝交易流水号
    changeStreamNo(){
        if(this.streamText !== ''){
            this.showStream = true
        }else if(this.streamText === ''){
            this.showStream = false
        }
    },
    // 商户编号
    changeBusiNo(){
        if(this.busiNumTextarea !== ''){
            this.showBusiNo = true
        }else if(this.busiNumTextarea === ''){
            this.showBusiNo = false
        }
    },

  },

  watch:{
      verify(){
          if(this.verify === false){
              this.verifyForm.region = ''
              this.verifyForm.desc = ''
          }
      },
      riskQualitative(){
          if(this.riskQualitative === false){
              this.riskForm.riskQualitative = ''
              this.riskForm.desc = ''
          }
      },

  },
  mounted(){
      //console.log(this.$cookie.get('SID'))
      this.initTimeSet()
    //   console.log(window.location.href.split('#')[0])


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
    margin-left: 15px;
    vertical-align: middle;
}
.ztst{

    width: 84px;
    height: 26px;
    cursor: pointer;
    background: url(../../images/ztst.png) no-repeat ;
    display: inline-block;
    margin-left: 15px;
    vertical-align: middle;
}
.onOff{
    margin-top: 15px;
    width: 50px;
    height: 26px;
    cursor: pointer;
    background: url(../../images/on.png) no-repeat;
     display: inline-block;
    margin-left: 15px;
}
.offOn{
    margin-top: 15px;
    width: 50px;
    height: 26px;
    cursor: pointer;
    background: url(../../images/off.png) no-repeat;
    display: inline-block;
    margin-left: 15px;
}
.tableData{
    width: 100%;
    height: auto;
    border-top: 1px solid #E0E0E0;
    padding-top: 22px;
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
    /* line-height: 76px; */
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
    height: 187px;
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
.contentBotoom {
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
    background: url(../../images/off1.png) no-repeat;
    width: 39px;
    height: 28px;
    border-top-left-radius: 7px;
    border-bottom-left-radius: 7px;
}
.icon2{
    background: url(../../images/off2.png) no-repeat;
    width: 39px;
    height: 28px;
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
.icon5{
    background: url(../../images/off5.png) no-repeat;
    width: 39px;
    height: 28px;
}
.icon6{
    background: url(../../images/off6.png) no-repeat;
    width: 39px;
    height: 28px;
}
.icon7{
    background: url(../../images/icon4.png) no-repeat;
    width: 39px;
    height: 28px;
    border-top-right-radius: 7px;
    border-bottom-right-radius: 7px;
}
.icon1:hover{
    background: url(../../images/addHover.png) no-repeat;
    width: 39px;
    height: 28px;
    border-top-left-radius: 7px;
    border-bottom-left-radius: 7px;
}
.icon2:hover{
    background: url(../../images/import_actived.png) no-repeat;
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
.icon5:hover{
    background: url(../../images/shHover.png) no-repeat;
    width: 39px;
    height: 28px;
}
.icon6:hover{
    background: url(../../images/fxdx.png) no-repeat;
    width: 39px;
    height: 28px;
}
.icon7:hover{
    background: url(../../images/icon4-2.png) no-repeat;
    width: 39px;
    height: 28px;
    border-top-right-radius: 7px;
    border-bottom-right-radius: 7px;
}
.serch{
    float: right;
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
   .block{margin-top:34px;width:100%}
  .pagination{margin-left:34px;font-size:12px;color:#333333;display:inline-block}
  .evetotal{
    margin-left: 3px; padding-left: 10px;
    background:url(../../images/xxjt.png) no-repeat;
    background-position: 34px 8px; background-size:7px 5px;
    outline: none;
    appearance:none;-moz-appearance:none;
    -webkit-appearance:none;width:50px;height:22px;
    border: 1px solid #E0E0E0;
    border-radius: 100px;
    font-family: PingFangSC-Regular;
    font-size: 12px;  color: #333333;
  }
  .paginationRight{display:inline-block;float: right;}
  .listValInp{width: 60%;height: 36px;}
   .ui_button{
        display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #409EFF;
    border-color: #409EFF;
    color: #409EFF;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: none;
    margin: 0;
    -webkit-transition: .1s;
    transition: .1s;
    font-weight: 500;
    padding: 9px 23px;
    font-size: 14px;
    border-radius: 34px;
  }
  .ui_button:hover{
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #409EFF;
    border: 1px solid #409EFF;
    border-color: #409EFF;
    color: #FFF;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: none;
    margin: 0;
    -webkit-transition: .1s;
    transition: .1s;
    font-weight: 500;
    padding: 9px 23px;
    font-size: 14px;
    border-radius: 34px;
  }
.importData th{
    width:150px;
    text-align: left;
    padding-left:15px;
}

.importData .changeColor{
    color:#f56c6c;

}

.importData tr:nth-child(odd){

    background-color: #f1f2f5
}
.checkListNoInp{
    width:100%;
    background-color: #ffffff;
    height:auto;

}

.inpListShow,.streamNoInpListShow,.busiNumInpListShow{
     position: absolute;
    z-index: 111;
    display:none;
    border:1px solid #e0e0e0;
    margin-left: 1px;
    /* border-radius:15px; */
    border-style:solid
}
.footerBtn{
    line-height: 0;
    display:flex;
    justify-content: space-around;
    background-color: #ffffff;
    padding-top:8px;
    padding-bottom:7px;
}
.inputClass{
    display:inline-block;
    height:24px;
    line-height: 24px;
    width:50px;
    background-color: #409EFF;
    color:#ffffff;
    font-size:12px;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
}
.tableExpandIcon{
    min-width:48px !important;text-align:center;

    line-height: 17px;
}
.tableExpandCheck{
    min-width:50px !important;text-align:center;
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

/* #dataTitle{position: relative;}
#dataTitle:hover::after{
    content: attr(data-title);
    display: inline-block;
    background-color: #ffffff;
    width:100px;
    text-align: center;
    border: 1px solid #ddd;
    border-radius: 5px;
    position: absolute;
    top: 35px;
    font-size:12px;
    left: 0px;

} */
#advancedSerch{
    transform: rotate(180deg);
    -webkit-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -ms-transform: rotate(180deg)
}
#offlineDownLoad{position: relative}
#offlineDownLoad:hover::after{
  content: attr(data-title);
  position: absolute;
  top:35px;
  left:0px;
  line-height:26px;
  height:26px;
  width:44px;
  text-align: center;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px 0 rgba(204,204,204,0.50);
  z-index:11;
  font-size:12px;
  color:#333333;
}
</style>
